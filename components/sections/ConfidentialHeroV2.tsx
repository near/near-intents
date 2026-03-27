'use client';

import { CTAButton } from '@/components/shared/CTAButton';
import { GlitchPlus } from '@/components/effects/GlitchPlus';
import { useRef, useEffect } from 'react';

export function ConfidentialHeroV2() {
  const sectionRef = useRef<HTMLElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gradientRef.current || !sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gradientRef.current.style.background = `
        repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(0, 0, 0, 0.8) 30px, rgba(0, 0, 0, 0.8) 31px),
        repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(0, 0, 0, 0.8) 30px, rgba(0, 0, 0, 0.8) 31px),
        radial-gradient(600px at ${x}px ${y}px, rgba(251, 77, 1, 0.35) 0%, transparent 80%)
      `;
    };

    const section = sectionRef.current;
    section?.addEventListener('mousemove', handleMouseMove);

    return () => {
      section?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden min-h-screen flex flex-col bg-[#000000]">
      {/* Cursor-following gradient effect */}
      <div
        ref={gradientRef}
        className="absolute inset-0 pointer-events-none z-0 transition-all duration-75"
      />

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
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #FB4D01 0%, #FFA500 50%, #FFD700 100%)'
                }}
              >
                Confidential by Default.
              </span>
            </h1>

            <div className="w-full md:w-1/2 h-px my-6" style={{ background: 'linear-gradient(to right, #FB4D01, transparent)' }} />

            <p className="mt-4 text-lg text-zinc-400 max-w-2xl leading-relaxed [text-wrap:balance]">
              Confidential Intents brings institutional-grade confidentiality to cross-chain DeFi—no MEV, no frontrunning, no strategy exposure. Built into the execution environment itself.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <CTAButton
                text="Try Confidential Intents"
                href="https://near.com"
                variant="solid"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
