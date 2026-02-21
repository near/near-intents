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

    // Establecer estilos iniciales para evitar parpadeo
    ref.current.style.opacity = '0';
    ref.current.style.transform = `translateY(${options.y ?? 40}px)`;

    const ctx = gsap.context(() => {
      gsap.to(
        ref.current,
        {
          opacity: 1,
          y: 0,
          duration: options.duration ?? 1,
          delay: options.delay ?? 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [options.y, options.scale, options.duration, options.delay]);

  return ref;
}
