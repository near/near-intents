import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseScrollRevealOptions {
  y?: number;
  opacity?: number;
  scale?: number;
  duration?: number;
  delay?: number;
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y: options.y ?? 40,
        opacity: options.opacity ?? 0,
        scale: options.scale ?? 1,
        duration: options.duration ?? 1,
        delay: options.delay ?? 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [options.y, options.opacity, options.scale, options.duration, options.delay]);

  return ref;
}
