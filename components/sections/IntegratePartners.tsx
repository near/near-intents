'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';

const PARTNERS = [
  { name: 'Idea Finance', description: 'The chain-abstracted liquidity solution.', href: '#' },
  { name: 'Sailor Send', description: 'Instant Loans using Bitcoin as Collateral | Trustless | Self-Custodial | No KYC', href: '#' },
  { name: 'Swap Kit', description: 'SwapKit SDK+API provides access to a powerful suite of DeFi cross-chain tools.', href: '#' },
  { name: 'Frax Finance', description: 'The world\'s most innovative decentralized stablecoins and DeFi stablecoin infrastructure.', href: '#' },
  { name: 'Delta Trade', description: 'Multi-chain decentralized trading vault, including Grid, DCA, Rebalancing-Grid, and AI-powered strategy.', href: '#' },
  { name: 'Bitte', description: 'Cross-chain AI Execution.', href: '#' },
];

const LOGO_PLACEHOLDER = '/images/slider-logos/near-protocol-near-logo.png';
const SPEED = 0.6; // px per frame

export function IntegratePartners() {
  const clipRef  = useRef<HTMLDivElement>(null); // contenedor con overflow:hidden
  const trackRef = useRef<HTMLDivElement>(null); // fila de items
  const xRef     = useRef(0);
  const isDragging = useRef(false);
  const isPaused   = useRef(false);
  const startX     = useRef(0);
  const dragBase   = useRef(0);

  // Duplicate for seamless loop
  const items = [...PARTNERS, ...PARTNERS];

  useEffect(() => {
    const clip  = clipRef.current;
    const track = trackRef.current;
    if (!clip || !track) return;

    let rafId: number;
    let halfWidth = 0;

    const tick = () => {
      if (!halfWidth) halfWidth = track.offsetWidth / 2;

      if (!isPaused.current) {
        xRef.current += SPEED;
        if (xRef.current >= halfWidth) xRef.current -= halfWidth;
        track.style.transform = `translateX(-${xRef.current.toFixed(2)}px)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      isPaused.current   = true;
      startX.current     = e.pageX;
      dragBase.current   = xRef.current;
      clip.style.cursor  = 'grabbing';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      let next = dragBase.current + (startX.current - e.pageX);
      if (next < 0) next += halfWidth;
      if (next >= halfWidth) next -= halfWidth;
      xRef.current = next;
      track.style.transform = `translateX(-${next.toFixed(2)}px)`;
    };

    const onMouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      isPaused.current   = false;
      clip.style.cursor  = 'grab';
    };

    clip.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      cancelAnimationFrame(rafId);
      clip.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <section id="integrate" className="py-24 bg-[#242424] px-8 md:px-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <h2 className="text-4xl font-bold mb-3">Integrate NEAR Intents</h2>
        <div className="w-full h-px mb-4" style={{ background: 'linear-gradient(to right, #FB4D01, #242424)' }} />
        <p className="text-white/50 text-[16px] max-w-2xl leading-relaxed [text-wrap:balance]">
          Join the fast-growing ecosystem of cross-chain dApps, wallets, infrastructure providers, and more who are building with Intents.
        </p>
      </div>

      {/* Slider */}
      <div className="relative">
        {/* Fade izquierda */}
        <div className="hidden md:block absolute left-0 top-0 h-full w-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #242424, transparent)' }} />
        {/* Fade derecha */}
        <div className="hidden md:block absolute right-0 top-0 h-full w-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #242424, transparent)' }} />
      <div ref={clipRef} className="overflow-hidden cursor-grab select-none">
        <div ref={trackRef} className="flex gap-16 w-max">
        {items.map((partner, i) => (
          <div key={i} className="shrink-0 w-[220px] flex flex-col items-center text-center">
            <div className="w-[220px] h-[220px] rounded-2xl overflow-hidden mb-4 bg-zinc-900 flex items-center justify-center">
              <Image
                src={LOGO_PLACEHOLDER}
                alt={partner.name}
                width={120}
                height={120}
                className="object-contain invert"
              />
            </div>
            <h3 className="font-bold text-base mb-2">{partner.name}</h3>
            <p className="text-white/50 text-sm mb-3 leading-relaxed">{partner.description}</p>
            <a href={partner.href} className="text-brand-orange-500 text-sm hover:underline">
              Learn more ↗
            </a>
          </div>
        ))}
        </div>
      </div>
      </div>
    </section>
  );
}
