'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { CTAButton } from '@/components/shared/CTAButton';

export function ConfidentialCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let target = 0;
    let current = 0;
    let rafId: number;
    let buttonHovered = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (buttonHovered) return;
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const dist = Math.hypot(e.clientX - rect.right, e.clientY - rect.bottom);
      const maxDist = Math.hypot(rect.width, rect.height) * 0.65;
      const raw = Math.max(0, 1 - dist / maxDist);
      target = raw * raw * (3 - 2 * raw);
    };

    const handleButtonEnter = () => { buttonHovered = true; target = 1; };
    const handleButtonLeave = () => { buttonHovered = false; };

    const tick = () => {
      current += (target - current) * 0.06;

      if (imageWrapperRef.current) {
        if (current > 0.001) {
          const blur = current * 4;
          const imgOpacity = 0.5 + current * 0.35;
          const brightness = 0.85 + current * 0.35;
          imageWrapperRef.current.style.opacity = imgOpacity.toFixed(3);
          imageWrapperRef.current.style.filter = `brightness(${brightness.toFixed(3)}) blur(${blur.toFixed(2)}px)`;
        } else {
          imageWrapperRef.current.style.opacity = '0.5';
          imageWrapperRef.current.style.filter = 'brightness(0.85)';
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(tick);

    const buttons = buttonsRef.current;
    buttons?.addEventListener('mouseenter', handleButtonEnter);
    buttons?.addEventListener('mouseleave', handleButtonLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
      buttons?.removeEventListener('mouseenter', handleButtonEnter);
      buttons?.removeEventListener('mouseleave', handleButtonLeave);
    };
  }, []);

  return (
    <footer ref={sectionRef} className="py-8 md:py-12 px-8 md:px-20 pb-32 bg-[#000000] relative">

      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div ref={imageWrapperRef} className="relative w-full h-full">
          <Image
            src="/images/footer-bg.jpg"
            alt=""
            fill
            className="object-cover object-right-top"
            style={{ transform: 'scaleX(-1)' }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto relative z-10 pb-20">
        <h2 className="text-4xl md:text-6xl font-bold text-white leading-[1.05] mb-6">
          Try Confidential Intents today
        </h2>

        <div
          className="w-full h-px mb-8"
          style={{ background: 'linear-gradient(to right, #FB4D01, transparent)' }}
        />

        <div ref={buttonsRef} className="flex flex-wrap gap-4">
          <CTAButton
            text="Go confidential on near.com"
            href="https://near.com"
            variant="solid"
          />
          <CTAButton
            text="Talk with the team"
            href="https://t.me/near_intents"
            variant="ghost"
          />
        </div>
      </div>
    </footer>
  );
}
