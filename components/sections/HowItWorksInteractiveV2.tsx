'use client'

import { useEffect, useRef } from 'react'
import { createWarpRenderer } from '@/lib/warp-renderer'

export function HowItWorksInteractiveV2({ svgContent }: { svgContent: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const mouse        = useRef({ x: -99999, y: -99999 })
  const lastMouse    = useRef({ x: 0, y: 0 })  // last valid cursor position on canvas
  const fade         = useRef(0)   // 0 = no warp, 1 = full warp — lerps on enter/leave
  const raf          = useRef(0)
  const imgReady     = useRef(false)
  const startLoop    = useRef<() => void>(() => {})

  useEffect(() => {
    const canvas    = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const renderer = createWarpRenderer(canvas)
    if (!renderer) return

    const img = new window.Image()

    let running = false
    let visible = false

    const buildSource = (W: number, H: number) => {
      if (!imgReady.current) return
      const off    = document.createElement('canvas')
      off.width    = W
      off.height   = H
      const offCtx = off.getContext('2d')
      if (!offCtx) return
      offCtx.drawImage(img, 0, 0, W, H)
      renderer.setSource(off)
    }

    const drawRest = () => renderer.render(0, 0, 0)

    img.onload = () => {
      imgReady.current = true
      buildSource(canvas.width, canvas.height)
      drawRest()
    }
    img.src = '/images/how-it-works/NI_Howitworks_L_03_dots.svg'

    const resize = () => {
      const W      = container.clientWidth
      const H      = container.clientHeight
      canvas.width  = W
      canvas.height = H
      buildSource(W, H)
      drawRest()
      startLoop.current()
    }

    // The warp loop only runs while the cursor is over the canvas or the warp is fading out,
    // and never while the section is off-screen; otherwise the resting frame is shown.
    const draw = () => {
      const W = canvas.width
      const H = canvas.height

      const rawX   = mouse.current.x
      const rawY   = mouse.current.y
      const inside = rawX > 0 && rawX < W && rawY > 0 && rawY < H

      // Keep last valid position so warp fades in-place instead of snapping to 0
      if (inside) {
        lastMouse.current.x = rawX
        lastMouse.current.y = rawY
      }

      fade.current += ((inside ? 1 : 0) - fade.current) * (inside ? 0.10 : 0.04)

      if (!inside && fade.current < 0.001) {
        fade.current = 0
        running = false
        drawRest()
        return
      }

      renderer.render(lastMouse.current.x, lastMouse.current.y, fade.current)

      if (!visible) {
        running = false
        return
      }
      raf.current = requestAnimationFrame(draw)
    }

    startLoop.current = () => {
      if (running || !visible) return
      running = true
      raf.current = requestAnimationFrame(draw)
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    resize()

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) startLoop.current()
    })
    visibilityObserver.observe(container)

    return () => {
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      cancelAnimationFrame(raf.current)
      running = false
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full hidden md:block"
      onMouseMove={(e) => {
        const r = canvasRef.current?.getBoundingClientRect()
        if (r) mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top }
        startLoop.current()
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
