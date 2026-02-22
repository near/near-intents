'use client';

import { CTAButton } from '@/components/shared/CTAButton';
import { AuroraRing } from '@/components/effects/AuroraRing';
import Image from 'next/image';
import { useRef, useEffect } from 'react';

const LOGOS = [
  { src: '/images/hero-carousel-logos/Bitcoin.svg', alt: 'Bitcoin' },
  { src: '/images/hero-carousel-logos/Ethereum.svg', alt: 'Ethereum' },
  { src: '/images/hero-carousel-logos/Solana.svg', alt: 'Solana' },
  { src: '/images/hero-carousel-logos/Polygon.svg', alt: 'Polygon' },
  { src: '/images/hero-carousel-logos/Arbitrum.svg', alt: 'Arbitrum' },
  { src: '/images/hero-carousel-logos/Optimism.svg', alt: 'Optimism' },
  { src: '/images/hero-carousel-logos/Base.svg', alt: 'Base' },
  { src: '/images/hero-carousel-logos/Avalanche.svg', alt: 'Avalanche' },
  { src: '/images/hero-carousel-logos/Aurora.svg', alt: 'Aurora' },
  { src: '/images/hero-carousel-logos/BNB Chain.svg', alt: 'BNB Chain' },
  { src: '/images/hero-carousel-logos/Cardano.svg', alt: 'Cardano' },
  { src: '/images/hero-carousel-logos/Starknet.svg', alt: 'Starknet' },
  { src: '/images/hero-carousel-logos/TON.svg', alt: 'TON' },
  { src: '/images/hero-carousel-logos/Sui.svg', alt: 'Sui' },
  { src: '/images/hero-carousel-logos/Aptos.svg', alt: 'Aptos' },
  { src: '/images/hero-carousel-logos/Aleo.svg', alt: 'Aleo' },
  { src: '/images/hero-carousel-logos/Gnosis.svg', alt: 'Gnosis' },
  { src: '/images/hero-carousel-logos/Berachain.svg', alt: 'Berachain' },
  { src: '/images/hero-carousel-logos/XLayer.svg', alt: 'XLayer' },
  { src: '/images/hero-carousel-logos/Monad.svg', alt: 'Monad' },
  { src: '/images/hero-carousel-logos/Stellar.svg', alt: 'Stellar' },
  { src: '/images/hero-carousel-logos/Ripple.svg', alt: 'Ripple' },
  { src: '/images/hero-carousel-logos/Litecoin.svg', alt: 'Litecoin' },
  { src: '/images/hero-carousel-logos/Dogecoin.svg', alt: 'Dogecoin' },
  { src: '/images/hero-carousel-logos/Zcash.svg', alt: 'Zcash' },
  { src: '/images/hero-carousel-logos/Bitcoin Cash.svg', alt: 'Bitcoin Cash' },
  { src: '/images/hero-carousel-logos/Tron.svg', alt: 'Tron' },
  { src: '/images/hero-carousel-logos/NEAR chain.svg', alt: 'NEAR Chain' },
  { src: '/images/hero-carousel-logos/Plasma.svg', alt: 'Plasma' },
  { src: '/images/hero-carousel-logos/ADI.svg', alt: 'ADI' },
];

export function Hero() {
  const doubledLogos = [...LOGOS, ...LOGOS];
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
      const dist = Math.hypot(e.clientX - rect.right, e.clientY - rect.top);
      const maxDist = Math.hypot(rect.width, rect.height) * 0.65;
      const raw = Math.max(0, 1 - dist / maxDist);
      // smooth-step: ease in/out en los extremos
      target = raw * raw * (3 - 2 * raw);
    };

    const handleButtonEnter = () => { buttonHovered = true; target = 1; };
    const handleButtonLeave = () => { buttonHovered = false; };

    const tick = () => {
      // lerp: sigue al target con inercia
      current += (target - current) * 0.06;

      // eclipse: fade a 0 conforme baja el scroll (completo al 60% de la altura del viewport)
      const scrollFactor = Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.4));

      if (imageWrapperRef.current) {
        if (current > 0.001) {
          const blur = current * 12;
          const spread = current * 160;
          const glowOpacity = current * 0.85;
          const imgOpacity = (0.6 + current * 0.4) * scrollFactor;
          const brightness = 0.85 + current * 0.45;
          imageWrapperRef.current.style.opacity = imgOpacity.toFixed(3);
          imageWrapperRef.current.style.filter = `brightness(${brightness.toFixed(3)}) blur(${blur.toFixed(2)}px) drop-shadow(0 0 ${spread.toFixed(1)}px rgba(255, 100, 20, ${glowOpacity.toFixed(2)}))`;
        } else {
          imageWrapperRef.current.style.opacity = (0.6 * scrollFactor).toFixed(3);
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
    <section ref={sectionRef} className="relative overflow-hidden min-h-screen flex flex-col bg-[#000]">
      {/* Aurora Effect — oculto, disponible para iterar */}
      <div className="hidden">
        <AuroraRing />
      </div>


      {/* Hero background image */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          ref={imageWrapperRef}
          className="relative w-full h-full"
        >
          <Image
            src="/images/hero-bg.jpg"
            alt=""
            fill
            className="object-cover object-right-top"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col justify-center px-8 md:px-20 relative z-10 pt-20 md:pt-32 pb-10">
        <div className="max-w-7xl mx-auto w-full">

          {/* Top row: badge + tick marks a la misma altura */}
          <div className="relative flex items-center mb-6 text-zinc-500 text-sm">
            <span>(</span>
            <span className="text-brand-orange">+</span>
            <span>)</span>
            <div className="w-12 h-[1px] bg-zinc-800 mx-2" />
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-[3px]">
              {Array.from({ length: 13 }).map((_, i) => (
                <div key={i} className="w-px h-3 bg-white/30" />
              ))}
            </div>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-8xl font-bold tracking-normal leading-[0.9]">
              <span className="text-3xl md:text-5xl text-brand-orange-500 tracking-normal">NEAR Intents</span> <br />
              The universal <br />
              liquidity protocol
            </h1>

            <div className="w-full md:w-1/2 h-px bg-gradient-to-r from-brand-orange-500 to-transparent my-6"></div>

            <p className="mt-4 text-[18px] text-zinc-400 max-w-2xl leading-relaxed [text-wrap:balance]">
              NEAR Intents powers one-click cross-chain swaps, unified liquidity,
              and universal execution for onchain markets.
            </p>

            <div ref={buttonsRef} className="mt-10 flex flex-wrap gap-4">
              <CTAButton text="Start Swapping" href="https://near.com/" />
              <CTAButton text="Build With Intents" href="https://docs.near-intents.org/near-intents" />
            </div>

            {/* Decorative +++ pattern */}
            <div className="mt-12 font-mono text-sm text-zinc-600 tracking-[0.15em]">
              {'+'  .repeat(26)}
            </div>

            <div className="mt-12">
              <div className="text-3xl md:text-4xl font-bold text-brand-orange tracking-tight">
                $13B+
              </div>
              <div className="text-white mt-1 text-3xl md:text-4xl font-medium">
                all-time volume across <span className="text-brand-orange font-bold">35+ chains</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative z-10 w-full pb-0">
        <div className="w-full overflow-hidden py-8 border-y border-white/5">
          <div className="animate-marquee [animation-duration:8s] md:[animation-duration:30s] flex items-center gap-16 px-8">
            {doubledLogos.map((logo, i) => (
              <div key={i} className="shrink-0 rounded-full border border-[#333333] bg-[#A7A7A7] p-3 group hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-all duration-300">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={132}
                  height={44}
                  className="object-contain h-[35px] w-auto opacity-60 group-hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
