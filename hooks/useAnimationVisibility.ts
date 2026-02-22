'use client';

import { useEffect, useRef } from 'react';

interface UseAnimationVisibilityOptions {
  threshold?: number;
}

/**
 * Pausa animaciones CSS cuando un elemento está fuera del viewport
 * y las reanuda cuando entra nuevamente.
 * Mejora performance significativamente durante scroll.
 */
export function useAnimationVisibility(options: UseAnimationVisibilityOptions = {}) {
  const { threshold = 0.1 } = options;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Elemento visible: reanudar animaciones
          element.style.animationPlayState = 'running';
          // También permitir RAF en children
          element.querySelectorAll('[data-animated]').forEach((child) => {
            (child as HTMLElement).style.opacity = '1';
          });
        } else {
          // Elemento fuera de vista: pausar animaciones
          element.style.animationPlayState = 'paused';
          // También pausar RAF en children estableciendo opacity a prevenir parpadeos
          element.querySelectorAll('[data-animated]').forEach((child) => {
            (child as HTMLElement).style.opacity = '0.5';
          });
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
