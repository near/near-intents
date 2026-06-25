'use client'

import { useEffect, useRef } from 'react'

const LEFT_COLOR   = [204, 204, 204] as const  // #cccccc
const RIGHT_COLOR  = [251,  77,   1] as const  // #fb4d01
const DOT_SPACING  = 24    // px between dot centers (~2x dot count vs 34)
const BASE_RADIUS  = 1.7   // default dot radius (px)
const BASE_ALPHA_L = 0.25  // resting opacity — gray dots (left)
const BASE_ALPHA_R = 0.30  // resting opacity — orange dots (right)
const HOVER_ALPHA  = 0.85  // opacity at cursor center
const INFLUENCE    = 0.16  // influence radius as fraction of canvas width
const MAX_DISPLACE = DOT_SPACING * 0.25  // max px a dot moves toward cursor
const LERP         = 0.10  // animation smoothness

interface Dot {
  px: number; py: number   // rest position
  rx: number; ry: number   // current rendered position
  a:  number               // current animated alpha
  ba: number               // base alpha for this dot
  fr: number; fg: number; fb: number
}

export function HowItWorksInteractive({ svgContent }: { svgContent: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const mouse        = useRef({ x: -99999, y: -99999 })
  const raf          = useRef(0)
  const dots         = useRef<Dot[]>([])

  useEffect(() => {
    const canvas    = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const buildGrid = (W: number, H: number) => {
      dots.current = []
      const cols    = Math.ceil(W / DOT_SPACING)
      const rows    = Math.ceil(H / DOT_SPACING)
      const offsetX = (W - (cols - 1) * DOT_SPACING) / 2
      const offsetY = (H - (rows - 1) * DOT_SPACING) / 2

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const px = offsetX + col * DOT_SPACING
          const py = offsetY + row * DOT_SPACING
          const isLeft = px / W < 0.5
          const [fr, fg, fb] = isLeft ? LEFT_COLOR : RIGHT_COLOR
          const ba = isLeft ? BASE_ALPHA_L : BASE_ALPHA_R
          dots.current.push({ px, py, rx: px, ry: py, a: ba, ba, fr, fg, fb })
        }
      }
    }

    const resize = () => {
      const W = container.clientWidth
      const H = container.clientHeight
      canvas.width  = W
      canvas.height = H
      buildGrid(W, H)
    }

    const draw = () => {
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      const mx   = mouse.current.x
      const my   = mouse.current.y
      const infR = W * INFLUENCE

      for (const d of dots.current) {
        const dx   = d.px - mx
        const dy   = d.py - my
        const dist = Math.sqrt(dx * dx + dy * dy)

        let targetRX = d.px
        let targetRY = d.py
        let targetA  = d.ba

        if (dist < infR && dist > 0.5) {
          const t      = 1 - dist / infR   // 1 at cursor, 0 at edge
          const factor = t * t             // quadratic falloff — stronger near center
          // Displace toward cursor (creates the "gathering/sinking" convergence)
          const displace = MAX_DISPLACE * factor
          targetRX = d.px + (mx - d.px) / dist * displace
          targetRY = d.py + (my - d.py) / dist * displace
          targetA = d.ba + (HOVER_ALPHA - d.ba) * factor
        }

        d.rx += (targetRX - d.rx) * LERP
        d.ry += (targetRY - d.ry) * LERP
        d.a  += (targetA  - d.a)  * LERP

        if (d.a < 0.005) continue

        ctx.beginPath()
        ctx.arc(d.rx, d.ry, BASE_RADIUS, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${d.fr},${d.fg},${d.fb},${d.a.toFixed(3)})`
        ctx.fill()
      }

      raf.current = requestAnimationFrame(draw)
    }

    const observer = new ResizeObserver(resize)
    observer.observe(container)
    resize()
    draw()

    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full hidden md:block"
      onMouseMove={(e) => {
        const r = canvasRef.current?.getBoundingClientRect()
        if (r) mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top }
      }}
      onMouseLeave={() => { mouse.current = { x: -99999, y: -99999 } }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      {/* SVG inlined so it inherits the page's @font-face declarations */}
      <div
        className="relative w-full"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
  )
}
