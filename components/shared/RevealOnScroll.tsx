'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

export function RevealOnScroll({
  children,
  delay = 0,
  y = 48,
  className = ''
}: RevealOnScrollProps) {
  const ref = useScrollReveal({ delay, y });

  return (
    <div ref={ref} className={className} style={{ opacity: 0, transform: `translateY(${y}px)` }}>
      {children}
    </div>
  );
}
