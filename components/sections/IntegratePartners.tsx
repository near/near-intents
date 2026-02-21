'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PARTNERS = [
  { name: 'Idea Finance', description: 'The chain-abstracted liquidity solution.', href: '#' },
  { name: 'Sailor Send', description: 'Instant Loans using Bitcoin as Collateral | Trustless | Self-Custodial | No KYC', href: '#' },
  { name: 'Swap Kit', description: 'SwapKit SDK+API provides access to a powerful suite of DeFi cross-chain tools.', href: '#' },
  { name: 'Frax Finance', description: 'The world\'s most innovative decentralized stablecoins and DeFi stablecoin infrastructure.', href: '#' },
  { name: 'Delta Trade', description: 'Multi-chain decentralized trading vault, including Grid, DCA, Rebalancing-Grid, and AI-powered strategy.', href: '#' },
  { name: 'Bitte', description: 'Cross-chain AI Execution.', href: '#' },
];

const LOGO_PLACEHOLDER = '/images/slider-logos/near-protocol-near-logo.png';
const ITEMS_PER_VIEW = 3; // Mostrar 3 items por defecto
const ITEM_WIDTH = 220; // ancho de cada item
const GAP_SIZE = 64; // gap entre items (gap-16 = 64px)

export function IntegratePartners() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    const maxIndex = Math.max(0, PARTNERS.length - ITEMS_PER_VIEW);
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const offset = currentIndex * (ITEM_WIDTH + GAP_SIZE);

  return (
    <section id="integrate" className="py-16 bg-[#242424] px-8 md:px-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <h2 className="text-4xl font-bold mb-3">Integrate NEAR Intents</h2>
        <div className="w-full h-px mb-4" style={{ background: 'linear-gradient(to right, #FB4D01, #242424)' }} />
        <p className="text-white/50 text-[16px] max-w-2xl leading-relaxed [text-wrap:balance]">
          Join the fast-growing ecosystem of cross-chain dApps, wallets, infrastructure providers, and more who are building with Intents.
        </p>
      </div>

      {/* Carousel with arrows */}
      <div className="relative max-w-7xl mx-auto">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-12 z-20 p-2 text-white/50 hover:text-white disabled:text-white/20 transition-colors duration-200"
          aria-label="Previous"
        >
          <ChevronLeft size={32} />
        </button>

        {/* Carousel container */}
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-16 transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${offset}px)` }}
          >
            {PARTNERS.map((partner, i) => (
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

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          disabled={currentIndex >= PARTNERS.length - ITEMS_PER_VIEW}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-12 z-20 p-2 text-white/50 hover:text-white disabled:text-white/20 transition-colors duration-200"
          aria-label="Next"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </section>
  );
}
