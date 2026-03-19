'use client';

import { CTAButton } from '@/components/shared/CTAButton';
import { AuroraRing } from '@/components/effects/AuroraRing';
import { HeroCarouselLogo } from '@/components/shared/HeroCarouselLogo';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

export function Hero({ initialLogos }: { initialLogos: { src: string; alt: string; logoColor?: 'white' | 'black' }[] }) {
  const [logos] = useState(initialLogos);
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let target = 0;
    let current = 0;
    let rafId: number;
    /* Mouse-tracking glow — comentado temporalmente
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const dist = Math.hypot(e.clientX - rect.right, e.clientY - rect.top);
      const maxDist = Math.hypot(rect.width, rect.height) * 0.65;
      const raw = Math.max(0, 1 - dist / maxDist);
      // smooth-step: ease in/out en los extremos
      target = raw * raw * (3 - 2 * raw);
    };
    window.addEventListener('mousemove', handleMouseMove);
    */

    const handleButtonEnter = () => { target = 1; };
    const handleButtonLeave = () => { target = 0; };

    const tick = () => {
      // lerp: sigue al target con inercia
      current += (target - current) * 0.06;

      // eclipse: fade a 0 conforme baja el scroll (completo al 60% de la altura del viewport)
      const scrollFactor = Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.4));

      if (imageWrapperRef.current) {
        if (current > 0.001) {
          const blur = current * 0.3;
          const spread = current * 10;
          const glowOpacity = current * 0.06;
          const imgOpacity = (0.6 + current * 0.2) * scrollFactor;
          const brightness = 0.85 + current * 0.2;
          imageWrapperRef.current.style.opacity = imgOpacity.toFixed(3);
          imageWrapperRef.current.style.filter = `brightness(${brightness.toFixed(3)}) blur(${blur.toFixed(2)}px) drop-shadow(0 0 ${spread.toFixed(1)}px rgba(255, 100, 20, ${glowOpacity.toFixed(2)}))`;
        } else {
          imageWrapperRef.current.style.opacity = (0.6 * scrollFactor).toFixed(3);
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
      /* window.removeEventListener('mousemove', handleMouseMove); */
      cancelAnimationFrame(rafId);
      buttons?.removeEventListener('mouseenter', handleButtonEnter);
      buttons?.removeEventListener('mouseleave', handleButtonLeave);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden min-h-screen flex flex-col bg-[#000000]">
      {/* Aurora Effect — oculto, disponible para iterar */}
      <div className="hidden">
        <AuroraRing />
      </div>


      {/* Hero background image */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          ref={imageWrapperRef}
          className="relative w-full h-full translate-x-[10%] rotate-[-15deg] scale-[1.1] origin-top"
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

      {/* Content */}
      <div className="flex-grow flex flex-col justify-center px-8 md:px-20 relative z-10 pt-20 md:pt-32 pb-10">
        <div className="max-w-7xl mx-auto w-full">

          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-8xl font-bold tracking-normal leading-[0.9]">
              <span className="text-3xl md:text-5xl text-brand-orange-500 tracking-normal">NEAR Intents</span> <br />
              The universal <br />
              liquidity protocol
            </h1>

            <div className="w-full md:w-1/2 h-px my-6" style={{ background: 'linear-gradient(to right, #FB4D01, transparent)' }}></div>

            <p className="mt-4 text-[18px] text-zinc-400 max-w-2xl leading-relaxed [text-wrap:balance]">
              NEAR Intents powers one-click cross-chain swaps, unified liquidity,
              and universal execution for onchain markets.
            </p>

            <div ref={buttonsRef} className="mt-10 flex flex-wrap gap-4">
              <CTAButton text="Start Swapping" href="https://near.com/" />
              <CTAButton text="Build With Intents" href="https://docs.near-intents.org/near-intents" />
            </div>

          </div>
        </div>
      </div>

      {/* Stat — just above the marquee */}
      <div className="relative z-10 px-8 md:px-20 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-3xl md:text-4xl font-bold text-brand-orange tracking-tight">
            $13B+
          </div>
          <div className="text-white mt-1 text-3xl md:text-4xl font-medium">
            all-time volume across <span className="text-brand-orange font-bold">35+ chains</span>
          </div>
        </div>
      </div>

      {/* Marquee */}
      {logos.length > 0 && (
        <div className="relative z-10 w-full pb-0">
          <div className="w-full overflow-hidden py-8 border-y border-white/5">
            <div className="inline-flex animate-marquee will-change-transform">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((copy) => (
                <div key={copy} className="flex items-center gap-16 flex-shrink-0 pr-16" aria-hidden={copy > 0}>
                  {logos.map((logo, i) => (
                    <HeroCarouselLogo key={i} src={logo.src} alt={logo.alt} logoColor={logo.logoColor} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
