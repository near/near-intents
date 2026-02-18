'use client';

import { CTAButton } from '@/components/shared/CTAButton';
import { AuroraRing } from '@/components/effects/AuroraRing';

const LOGOS = [
  'Ethereum',
  'Solana',
  'Bitcoin',
  'NEAR',
  'Avalanche',
  'Polygon',
  'Arbitrum',
  'Optimism',
  'Base',
  'Cosmos',
  'Cardano',
  'Polkadot',
];

export function Hero() {
  // Duplicate logos for seamless infinite scroll
  const doubledLogos = [...LOGOS, ...LOGOS];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Aurora Effect - Top Right */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
        <AuroraRing />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight max-w-4xl">
          The universal
          <br />
          <span className="text-orange-600">liquidity protocol</span>
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-white/70 mb-12 max-w-3xl">
          NEAR Intents powers one-click cross-chain swaps, unified liquidity,
          and universal execution for onchain markets.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          <CTAButton text="Start Swapping" variant="ghost" />
          <CTAButton text="Integrate Intents" variant="solid" />
        </div>

        {/* Stats */}
        <div className="mb-16">
          <div className="text-5xl sm:text-6xl font-bold text-orange-600 mb-2">
            $13B+
          </div>
          <div className="text-sm sm:text-base text-white/60">
            All-time volume across 35+ chains
          </div>
        </div>

        {/* Marquee */}
        <div className="relative overflow-hidden w-full">
          <div className="flex items-center gap-8 animate-marquee whitespace-nowrap">
            {doubledLogos.map((logo, index) => (
              <div
                key={`${logo}-${index}`}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm min-w-[140px]"
              >
                <span className="text-sm font-medium text-white/80">
                  {logo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
