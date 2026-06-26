'use client'

import { useEffect, useRef } from 'react'

const INFLUENCE    = 0.30   // influence radius as fraction of canvas width
const MAX_DISPLACE = 6      // max pixel warp at cursor center
const GRID_SIZE    = 6      // mesh tile size (px) — smaller = smoother warp


export function HowItWorksInteractiveV2({ svgContent }: { svgContent: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const mouse        = useRef({ x: -99999, y: -99999 })
  const lastMouse    = useRef({ x: 0, y: 0 })  // last valid cursor position on canvas
  const fade         = useRef(0)   // 0 = no warp, 1 = full warp — lerps on enter/leave
  const raf          = useRef(0)
  const offscreen    = useRef<HTMLCanvasElement | null>(null)
  const imgReady     = useRef(false)

  useEffect(() => {
    const canvas    = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new window.Image()

    const buildOffscreen = (W: number, H: number) => {
      if (!imgReady.current) return
      const off    = document.createElement('canvas')
      off.width    = W
      off.height   = H
      const offCtx = off.getContext('2d')
      if (!offCtx) return
      offCtx.drawImage(img, 0, 0, W, H)
      offscreen.current = off
    }

    img.onload = () => {
      imgReady.current = true
      buildOffscreen(canvas.width, canvas.height)
    }
    img.src = '/images/how-it-works/NI_Howitworks_L_03_dots.svg'

    const resize = () => {
      const W      = container.clientWidth
      const H      = container.clientHeight
      canvas.width  = W
      canvas.height = H
      buildOffscreen(W, H)
    }

    const draw = () => {
      const W   = canvas.width
      const H   = canvas.height
      ctx.clearRect(0, 0, W, H)

      const rawX   = mouse.current.x
      const rawY   = mouse.current.y
      const inside = rawX > 0 && rawX < W && rawY > 0 && rawY < H

      // Keep last valid position so warp fades in-place instead of snapping to 0
      if (inside) {
        lastMouse.current.x = rawX
        lastMouse.current.y = rawY
      }

      fade.current += ((inside ? 1 : 0) - fade.current) * (inside ? 0.10 : 0.04)

      const mx   = lastMouse.current.x
      const my   = lastMouse.current.y
      const infR = W * INFLUENCE
      const off  = offscreen.current

      if (off) {
        // Mesh warp: draw each tile from a displaced source position
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

            if (dist < infR && dist > 0.5) {
              const outer  = Math.pow(1 - dist / infR, 2)   // fades out toward edge
              const inner  = Math.min(1, dist / (GRID_SIZE * 5))  // fades in from cursor center (~30px dead zone)
              const factor = outer * inner
              const displace = MAX_DISPLACE * factor * fade.current
              // Sample source pixels from the opposite direction (creates convergence toward cursor)
              srcOffX = -(mx - cx) / dist * displace
              srcOffY = -(my - cy) / dist * displace
            }

            const srcX = Math.max(0, Math.min(W - GRID_SIZE, destX + srcOffX))
            const srcY = Math.max(0, Math.min(H - GRID_SIZE, destY + srcOffY))

            ctx.drawImage(off, srcX, srcY, GRID_SIZE, GRID_SIZE, destX, destY, GRID_SIZE, GRID_SIZE)
          }
        }

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
      {/* Canvas draws the background image directly with mesh warp on hover */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      {/* Diagram SVG inlined so it inherits the page's @font-face declarations */}
      <div
        className="relative w-full"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
  )
}
