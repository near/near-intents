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
const ITEM_WIDTH = 220; // ancho de cada item
const GAP_SIZE = 64; // gap entre items (gap-16 = 64px)

export function IntegratePartners() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Triplicar items para carrusel infinito sin espacios vacíos
  const items = [...PARTNERS, ...PARTNERS, ...PARTNERS];

  const handleNext = () => {
    let next = currentIndex + 1;
    // Resetear suavemente al inicio cuando se llega al final de la primera duplicación
    if (next >= PARTNERS.length * 2) {
      next = PARTNERS.length;
    }
    setCurrentIndex(next);
  };

  const handlePrev = () => {
    let prev = currentIndex - 1;
    // Resetear suavemente al final cuando se va atrás desde el inicio de la segunda duplicación
    if (prev < PARTNERS.length) {
      prev = PARTNERS.length * 2 - 1;
    }
    setCurrentIndex(prev);
  };

  const offset = currentIndex * (ITEM_WIDTH + GAP_SIZE);

  return (
    <section id="integrate" className="py-12 bg-[#242424] px-8 md:px-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h2 className="text-4xl font-bold mb-3">Integrate NEAR Intents</h2>
        <div className="w-full h-px mb-4" style={{ background: 'linear-gradient(to right, #FB4D01, #242424)' }} />
        <p className="text-white/50 text-[16px] max-w-2xl leading-relaxed [text-wrap:balance]">
          Join the fast-growing ecosystem of cross-chain dApps, wallets, infrastructure providers, and more who are building with Intents.
        </p>
      </div>

      {/* Carousel with arrows */}
      <div className="relative max-w-7xl mx-auto flex flex-col items-center justify-center gap-2">
        {/* Carousel container */}
        <div className="overflow-hidden w-full">
          <div
            ref={trackRef}
            className="flex gap-16 transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${offset}px)` }}
          >
            {items.map((partner, i) => (
              <div key={i} className="shrink-0 w-[160px] sm:w-[200px] md:w-[220px] flex flex-col items-center text-center">
                <div className="w-[160px] sm:w-[200px] md:w-[220px] h-[160px] sm:h-[200px] md:h-[220px] rounded-2xl overflow-hidden mb-4 bg-zinc-900 flex items-center justify-center">
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

        {/* Navigation arrows - bottom left */}
        <div className="flex items-center justify-start gap-4 w-full mt-8">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="z-20 p-2 bg-white/10 hover:bg-white/20 text-white/50 hover:text-white transition-all duration-200 rounded-lg"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="z-20 p-2 bg-white/10 hover:bg-white/20 text-white/50 hover:text-white transition-all duration-200 rounded-lg"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
