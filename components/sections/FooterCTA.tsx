'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { CTAButton } from '@/components/shared/CTAButton';
import { FooterBar } from '@/components/sections/FooterBar';

export function FooterCTA({ hideCTA = false }: { hideCTA?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let target = 0;
    let current = 0;
    let rafId: number;
    let buttonHovered = false;
    // The loop only runs while the glow is easing toward its target,
    // and skips style writes when values are unchanged.
    let running = false;
    let lastOpacity = '';
    let lastFilter = '';

    const tick = () => {
      current += (target - current) * 0.06;

      if (imageWrapperRef.current) {
        let opacity: string;
        let filter: string;
        if (current > 0.001) {
          const blur = current * 4;
          const imgOpacity = 0.6 + current * 0.4;
          const brightness = 0.85 + current * 0.45;
          opacity = imgOpacity.toFixed(3);
          filter = `brightness(${brightness.toFixed(3)}) blur(${blur.toFixed(2)}px)`;
        } else {
          opacity = '0.6';
          filter = 'brightness(0.85)';
        }
        if (opacity !== lastOpacity) {
          imageWrapperRef.current.style.opacity = opacity;
          lastOpacity = opacity;
        }
        if (filter !== lastFilter) {
          imageWrapperRef.current.style.filter = filter;
          lastFilter = filter;
        }
      }

      if (Math.abs(target - current) < 0.001) {
        running = false;
        return;
      }
      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(tick);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (buttonHovered) return;
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // focal point: bottom-right corner
      const dist = Math.hypot(e.clientX - rect.right, e.clientY - rect.bottom);
      const maxDist = Math.hypot(rect.width, rect.height) * 0.65;
      const raw = Math.max(0, 1 - dist / maxDist);
      target = raw * raw * (3 - 2 * raw);
      start();
    };

    const handleButtonEnter = () => { buttonHovered = true; target = 1; start(); };
    const handleButtonLeave = () => { buttonHovered = false; };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    start();

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
    <footer ref={sectionRef} className="bg-[#000000] relative overflow-hidden">

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
      <div className="relative z-10">
        {/* CTA Section */}
        <div className={`px-8 md:px-20 py-12 md:py-16${hideCTA ? ' hidden' : ''}`}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-[28px] sm:text-[36px] md:text-[48px] font-bold text-white leading-[1.05] mb-6">
              Integrate and swap with Intents today
            </h2>

            <div
              className="w-full h-px mb-6"
              style={{ background: 'linear-gradient(to right, #FB4D01, transparent)' }}
            />

            <div ref={buttonsRef} className="flex flex-wrap gap-4">
              <CTAButton text="Go To near.org" href="https://www.near.org/intents" />
              <CTAButton text="Start Swapping" href="https://near.com/" />
            </div>
          </div>
        </div>


        {/* Main Footer */}
        <FooterBar />
      </div>
    </footer>
  );
}
