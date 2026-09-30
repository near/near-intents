// Mesh-warp renderer for the "How It Works" dotted background.
// The image is split into GRID_SIZE tiles; each tile samples the source from a position
// displaced toward the cursor. WebGL does this per pixel on the GPU in a single draw;
// the Canvas 2D fallback draws every tile with drawImage (same math, much slower).

export const INFLUENCE    = 0.30   // influence radius as fraction of canvas width
export const MAX_DISPLACE = 6      // max pixel warp at cursor center
export const GRID_SIZE    = 6      // mesh tile size (px) — smaller = smoother warp

export interface WarpRenderer {
  /** Set the canvas-sized, pre-rasterized background image. */
  setSource(source: HTMLCanvasElement): void
  /** Draw the background warped toward (mx, my); amount 0 draws the resting frame. */
  render(mx: number, my: number, amount: number): void
  dispose(): void
}

export function createWarpRenderer(canvas: HTMLCanvasElement): WarpRenderer | null {
  return createWebGLRenderer(canvas) ?? createCanvas2DRenderer(canvas)
}

const VERTEX_SHADER = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

// Same per-tile math as the Canvas 2D path, evaluated for every pixel of its tile.
const FRAGMENT_SHADER = `
precision highp float;

uniform sampler2D u_source;
uniform vec2  u_size;    // canvas size in px
uniform vec2  u_mouse;   // cursor, px from top-left
uniform float u_amount;  // 0 = no warp, 1 = full warp

const float GRID_SIZE    = ${GRID_SIZE.toFixed(1)};
const float MAX_DISPLACE = ${MAX_DISPLACE.toFixed(1)};
const float INFLUENCE    = ${INFLUENCE.toFixed(2)};

void main() {
  vec2 p      = vec2(gl_FragCoord.x, u_size.y - gl_FragCoord.y);
  vec2 dest   = floor(p / GRID_SIZE) * GRID_SIZE;
  vec2 center = dest + GRID_SIZE / 2.0;
  vec2 d      = center - u_mouse;
  float dist  = length(d);
  float infR  = u_size.x * INFLUENCE;

  vec2 srcOff = vec2(0.0);
  if (u_amount > 0.0 && dist < infR && dist > 0.5) {
    float outer    = pow(1.0 - dist / infR, 2.0);            // fades out toward edge
    float inner    = min(1.0, dist / (GRID_SIZE * 5.0));     // ~30px dead zone at cursor
    float displace = MAX_DISPLACE * outer * inner * u_amount;
    // Sample source pixels from the opposite direction (creates convergence toward cursor)
    srcOff = d / dist * displace;
  }

  vec2 src = clamp(dest + srcOff, vec2(0.0), u_size - GRID_SIZE);
  gl_FragColor = texture2D(u_source, (src + (p - dest)) / u_size);
}
`

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function createWebGLRenderer(canvas: HTMLCanvasElement): WarpRenderer | null {
  const gl = canvas.getContext('webgl', { antialias: false, depth: false, stencil: false })
  if (!gl) return null

  let source: HTMLCanvasElement | null = null
  let program: WebGLProgram | null = null
  let texture: WebGLTexture | null = null
  let uSize: WebGLUniformLocation | null = null
  let uMouse: WebGLUniformLocation | null = null
  let uAmount: WebGLUniformLocation | null = null

  const init = (): boolean => {
    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    if (!vs || !fs) return false

    program = gl.createProgram()
    if (!program) return false
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return false
    gl.useProgram(program)

    // Full-canvas quad
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const aPosition = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(aPosition)
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)

    texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    // Bilinear sampling, like drawImage with image smoothing
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    // Canvas pixels are premultiplied; keep them that way so edges blend like Canvas 2D
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true)

    uSize   = gl.getUniformLocation(program, 'u_size')
    uMouse  = gl.getUniformLocation(program, 'u_mouse')
    uAmount = gl.getUniformLocation(program, 'u_amount')
    gl.uniform1i(gl.getUniformLocation(program, 'u_source'), 0)

    if (source) upload(source)
    return true
  }

  const upload = (src: HTMLCanvasElement) => {
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src)
  }

  if (!init()) return null

  // A lost context is re-created on restore; frames are skipped until then.
  const onLost = (e: Event) => e.preventDefault()
  const onRestored = () => { init() }
  canvas.addEventListener('webglcontextlost', onLost)
  canvas.addEventListener('webglcontextrestored', onRestored)

  return {
    setSource(src) {
      source = src
      if (!gl.isContextLost()) upload(src)
    },
    render(mx, my, amount) {
      if (!source || gl.isContextLost()) return
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uSize, canvas.width, canvas.height)
      gl.uniform2f(uMouse, mx, my)
      gl.uniform1f(uAmount, amount)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    },
    dispose() {
      canvas.removeEventListener('webglcontextlost', onLost)
      canvas.removeEventListener('webglcontextrestored', onRestored)
    },
  }
}

function createCanvas2DRenderer(canvas: HTMLCanvasElement): WarpRenderer | null {
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  let source: HTMLCanvasElement | null = null
  // Resting (no-warp) frame, rendered once with the same tile pass so it is pixel-identical
  let restFrame: HTMLCanvasElement | null = null

  const drawTiles = (target: CanvasRenderingContext2D, off: HTMLCanvasElement, mx: number, my: number, amount: number) => {
    const W    = off.width
    const H    = off.height
    const infR = W * INFLUENCE
    const cols = Math.ceil(W / GRID_SIZE) + 1
    const rows = Math.ceil(H / GRID_SIZE) + 1

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const destX = c * GRID_SIZE
        const destY = r * GRID_SIZE
        const cx    = destX + GRID_SIZE / 2
        const cy    = destY + GRID_SIZE / 2
        const dx    = cx - mx
        const dy    = cy - my
        const dist  = Math.sqrt(dx * dx + dy * dy)

        let srcOffX = 0
        let srcOffY = 0

        if (amount > 0 && dist < infR && dist > 0.5) {
          const outer  = Math.pow(1 - dist / infR, 2)   // fades out toward edge
          const inner  = Math.min(1, dist / (GRID_SIZE * 5))  // fades in from cursor center (~30px dead zone)
          const factor = outer * inner
          const displace = MAX_DISPLACE * factor * amount
          // Sample source pixels from the opposite direction (creates convergence toward cursor)
          srcOffX = -(mx - cx) / dist * displace
          srcOffY = -(my - cy) / dist * displace
        }

        const srcX = Math.max(0, Math.min(W - GRID_SIZE, destX + srcOffX))
        const srcY = Math.max(0, Math.min(H - GRID_SIZE, destY + srcOffY))

        target.drawImage(off, srcX, srcY, GRID_SIZE, GRID_SIZE, destX, destY, GRID_SIZE, GRID_SIZE)
      }
    }
  }

  return {
    setSource(src) {
      source = src
      const rest    = document.createElement('canvas')
      rest.width    = src.width
      rest.height   = src.height
      const restCtx = rest.getContext('2d')
      if (!restCtx) return
      drawTiles(restCtx, src, 0, 0, 0)
      restFrame = rest
    },
    render(mx, my, amount) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (amount <= 0) {
        if (restFrame) ctx.drawImage(restFrame, 0, 0)
      } else if (source) {
        drawTiles(ctx, source, mx, my, amount)
      }
    },
    dispose() {},
  }
}
