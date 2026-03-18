'use client';

import { useEffect, useRef } from 'react';

interface GlitchPlusProps {
  count?: number;
  className?: string;
}

export function GlitchPlus({ count = 19, className = '' }: GlitchPlusProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const spans = Array.from(container.children) as HTMLElement[];
    const timers: ReturnType<typeof setTimeout>[] = [];

    const glitch = (el: HTMLElement) => {
      const delay = Math.random() * 2500 + 400;
      const t = setTimeout(() => {
        el.style.opacity = '0';
        const restore = setTimeout(() => {
          el.style.opacity = '1';
          glitch(el);
        }, 60 + Math.random() * 130);
        timers.push(restore);
      }, delay);
      timers.push(t);
    };

    spans.forEach(el => glitch(el));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div ref={containerRef} className={`flex justify-end gap-[3px] flex-wrap ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="font-mono text-[20px] text-[#FB4D01]/50 [font-family:var(--font-grotesk-mono)]">
          +
        </span>
      ))}
    </div>
  );
}
