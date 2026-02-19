'use client';

import { useEffect, useRef } from 'react';

export function AuroraRing() {
  const auroraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!auroraRef.current) return;

      const rect = auroraRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
      const maxDist = window.innerWidth;
      const intensity = Math.max(0, 1 - dist / maxDist);
      const opacity = 0.8 + (intensity * 0.2);
      const scale = 1 + (intensity * 0.05);
      const moveX = (e.clientX - centerX) * 0.03;
      const moveY = (e.clientY - centerY) * 0.03;

      auroraRef.current.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale})`;
      auroraRef.current.style.opacity = opacity.toString();

      const rings = auroraRef.current.querySelectorAll('.aurora-ring-layer');
      rings.forEach((ring) => {
        (ring as HTMLElement).style.filter = `blur(${20 + Array.from(rings).indexOf(ring) * 5}px) brightness(${1 + intensity * 0.5}) saturate(${1 + intensity})`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={auroraRef}
      className="absolute -top-[20%] -right-[15%] w-[700px] h-[700px] md:w-[900px] md:h-[900px] pointer-events-none transition-transform duration-100 ease-out z-0"
      style={{ opacity: 0.8 }}
    >
      <div className="absolute inset-0 rounded-full aurora-ring-gradient aurora-ring-layer opacity-60 animate-aurora-spin" />
      <div
        className="absolute inset-8 rounded-full aurora-ring-gradient aurora-ring-layer opacity-100 animate-aurora-spin-reverse"
        style={{ mixBlendMode: 'screen' }}
      />
      <div className="absolute inset-20 rounded-full bg-gradient-to-tr from-black via-brand-orange-900/40 to-black blur-[60px] animate-pulse" />
      <div className="absolute inset-28 rounded-full bg-[#1E1E1E] blur-2xl z-10" />
      <div className="absolute -inset-20 rounded-full bg-brand-orange-900/20 blur-[120px] z-[-1]" />
    </div>
  );
}
