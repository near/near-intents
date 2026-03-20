'use client';

import { CTAButton } from '@/components/shared/CTAButton';
import { GlitchPlus } from '@/components/effects/GlitchPlus';
import Image from 'next/image';
import { useRef, useEffect } from 'react';

export function ConfidentialHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let target = 0;
    let current = 0;
    let rafId: number;

    const handleButtonEnter = () => { target = 1; };
    const handleButtonLeave = () => { target = 0; };

    const tick = () => {
      current += (target - current) * 0.06;

      const scrollFactor = Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.5));

      if (imageWrapperRef.current) {
        if (current > 0.001) {
          const blur = current * 0.3;
          const imgOpacity = (0.45 + current * 0.3) * scrollFactor;
          const brightness = 0.85 + current * 0.25;
          imageWrapperRef.current.style.opacity = imgOpacity.toFixed(3);
          imageWrapperRef.current.style.filter = `brightness(${brightness.toFixed(3)}) blur(${blur.toFixed(2)}px)`;
        } else {
          imageWrapperRef.current.style.opacity = (0.45 * scrollFactor).toFixed(3);
          imageWrapperRef.current.style.filter = 'brightness(0.85)';
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const buttons = buttonsRef.current;
    buttons?.addEventListener('mouseenter', handleButtonEnter);
    buttons?.addEventListener('mouseleave', handleButtonLeave);

    return () => {
      cancelAnimationFrame(rafId);
      buttons?.removeEventListener('mouseenter', handleButtonEnter);
      buttons?.removeEventListener('mouseleave', handleButtonLeave);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden min-h-screen flex flex-col bg-[#000000]">
      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          ref={imageWrapperRef}
          className="relative w-full h-full translate-x-[15%] translate-y-[-5%] rotate-[15deg] scale-[1.15] origin-top-right"
        >
          <Image
            src="/images/background-grd.jpg"
            alt=""
            fill
            className="object-contain object-left-top scale-x-[-1]"
            priority
          />
        </div>
      </div>

      {/* Glitch decoration */}
      <div className="absolute bottom-12 right-12 md:right-20 opacity-25 pointer-events-none z-5">
        <GlitchPlus count={24} />
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col justify-center px-8 md:px-20 relative z-10 pt-20 md:pt-32 pb-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-8xl font-bold tracking-normal leading-[0.9] mb-6">
              Cross-Chain Execution.
              <br />
              <span className="text-brand-orange-500">Confidential by Default.</span>
            </h1>

            <div className="w-full md:w-1/2 h-px my-6" style={{ background: 'linear-gradient(to right, #FB4D01, transparent)' }} />

            <p className="mt-4 text-lg text-zinc-400 max-w-2xl leading-relaxed [text-wrap:balance]">
              Confidential Intents brings institutional-grade confidentiality to cross-chain DeFi—no MEV, no frontrunning, no strategy exposure. Built into the execution environment itself.
            </p>

            <div ref={buttonsRef} className="mt-10 flex flex-wrap gap-4">
              <CTAButton
                text="Try Confidential Intents"
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
        </div>
      </div>
    </section>
  );
}
