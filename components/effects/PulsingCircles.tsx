'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function PulsingCircles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
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

    const freq1  = 0.3;
    const freq2  = 1.0;
    const phase1 = Math.random() * Math.PI * 2;
    const phase2 = Math.random() * Math.PI * 2;

    const tick = (time: number) => {
      if (!isVisibleRef.current) return;

      if (ref1.current) {
        const s = 0.8 + 0.4 * (0.5 + 0.5 * Math.sin(time * freq1 * Math.PI * 2 + phase1));
        ref1.current.style.transform = `scale(${s.toFixed(3)})`;
      }
      if (ref2.current) {
        const s = 0.7 + 0.5 * (0.5 + 0.5 * Math.sin(time * freq2 * Math.PI * 2 + phase2));
        ref2.current.style.transform = `scale(${s.toFixed(3)})`;
      }
    };

    gsap.ticker.add(tick);
    return () => {
      observer.disconnect();
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex justify-center">
      <div className="relative flex items-center justify-center w-[90px] h-[90px]">
        {/* Círculo exterior — lento, max 90px */}
        <div ref={ref1} className="absolute w-[75px] h-[75px] rounded-full border border-[#FB4D01]/40" />
        {/* Círculo interior — rápido */}
        <div ref={ref2} className="absolute w-[42px] h-[42px] rounded-full border border-[#FB4D01]/70" />
      </div>
    </div>
  );
}
