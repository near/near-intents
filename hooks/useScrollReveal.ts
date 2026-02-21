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
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: options.y ?? 40, scale: options.scale ?? 1 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: options.duration ?? 1,
          delay: options.delay ?? 0,
          ease: 'power2.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [options.y, options.scale, options.duration, options.delay]);

  return ref;
}
