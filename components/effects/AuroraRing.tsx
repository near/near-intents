'use client';

import { useEffect, useRef } from 'react';

export function AuroraRing() {
  const auroraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const aurora = auroraRef.current;
    if (!aurora) return;

    const rings = Array.from(aurora.querySelectorAll<HTMLElement>('.aurora-ring-layer'));
    const ringBlurs = rings.map((_, i) => `blur(${20 + i * 5}px)`);
    const animated = Array.from(aurora.querySelectorAll<HTMLElement>('[class*="animate-"]'));

    let visible = false;
    let frame = 0;
    let lastX = 0;
    let lastY = 0;

    // At most one update per frame, and none while the effect is off-screen or hidden.
    const update = () => {
      frame = 0;
      const rect = aurora.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dist = Math.hypot(lastX - centerX, lastY - centerY);
      const maxDist = window.innerWidth;
      const intensity = Math.max(0, 1 - dist / maxDist);
      const opacity = 0.8 + (intensity * 0.2);
      const scale = 1 + (intensity * 0.05);
      const moveX = (lastX - centerX) * 0.03;
      const moveY = (lastY - centerY) * 0.03;

      aurora.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale})`;
      aurora.style.opacity = opacity.toString();

      rings.forEach((ring, i) => {
        ring.style.filter = `${ringBlurs[i]} brightness(${1 + intensity * 0.5}) saturate(${1 + intensity})`;
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (visible && !frame) frame = requestAnimationFrame(update);
    };

    // Pause the spinning/pulsing layers while the effect is not on screen.
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      animated.forEach((el) => {
        el.style.animationPlayState = visible ? 'running' : 'paused';
      });
    });
    observer.observe(aurora);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={auroraRef}
      className="absolute -top-[20%] -right-[15%] w-[700px] h-[700px] md:w-[900px] md:h-[900px] pointer-events-none transition-transform duration-100 ease-out z-0"
      style={{ opacity: 0.8 }}
    >
      <div className="absolute inset-0 rounded-full aurora-ring-layer opacity-60 animate-aurora-spin" />
      <div
        className="absolute inset-8 rounded-full aurora-ring-layer opacity-100 animate-aurora-spin-reverse"
        style={{ mixBlendMode: 'screen' }}
      />
      <div className="absolute inset-20 rounded-full bg-brand-orange-900/40 blur-[60px] animate-pulse" />
      <div className="absolute inset-28 rounded-full bg-[#1E1E1E] blur-2xl z-10" />
      <div className="absolute -inset-20 rounded-full bg-brand-orange-900/20 blur-[120px] z-[-1]" />
    </div>
  );
}
