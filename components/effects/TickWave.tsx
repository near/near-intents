'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const COUNT = 40;

const configs = Array.from({ length: COUNT }, () => ({
  freq: 0.2 + Math.random() * 0.6,
  phase: Math.random() * Math.PI * 2,
  minH: 2,
  maxH: 10 + Math.random() * 8,
}));

export function TickWave() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Intersection Observer para pausar RAF cuando está fuera de viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );

    observer.observe(container);

    const ticks = Array.from(container.children) as HTMLElement[];

    // Usa gsap.ticker en lugar de requestAnimationFrame propio
    // para correr en el mismo loop que Lenis y evitar RAF loops competidores
    const tick = (time: number) => {
      if (!isVisibleRef.current) return;
      ticks.forEach((el, i) => {
        const { freq, phase, minH, maxH } = configs[i];
        const h = minH + (maxH - minH) * (0.5 + 0.5 * Math.sin(time * freq * Math.PI * 2 + phase));
        el.style.transform = `scaleY(${(h / 18).toFixed(3)})`;
      });
    };

    gsap.ticker.add(tick);
    return () => {
      observer.disconnect();
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex gap-[3px] items-end mt-auto h-[20px]">
      {Array.from({ length: COUNT }).map((_, i) => (
        <div key={i} className="w-px bg-[#FDEB8F]/60" style={{ height: '18px', transformOrigin: 'bottom', transform: 'scaleY(0.2)' }} />
      ))}
    </div>
  );
}
