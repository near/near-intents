'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function SlidingBars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const line2Ref    = useRef<HTMLDivElement>(null);
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

    // Medición síncrona — disponible desde el primer frame
    const travel = Math.max(0, container.clientWidth - 56 - 8 - 56 - 32);

    const duration = 4; // segundos (gsap.ticker.add recibe time en segundos)

    const tick = (time: number) => {
      if (!isVisibleRef.current) return;

      const t = (time % duration) / duration; // 0 → 1
      const ease = Math.pow(Math.sin(t * Math.PI), 2);
      const x = travel * (1 - ease);

      if (line2Ref.current) {
        line2Ref.current.style.transform = `translateX(${x.toFixed(1)}px)`;
      }
    };

    gsap.ticker.add(tick);
    return () => {
      observer.disconnect();
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-14 h-[2px] bg-[#FDEB8F]/60 shrink-0" />
        <div ref={line2Ref} className="w-14 h-[2px] bg-[#FDEB8F]/60 shrink-0" />
      </div>
      <span className="text-[#FDEB8F]/60 font-mono text-lg">)</span>
    </div>
  );
}
