import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import { LargeEcosystemLogo, SmallEcosystemLogo } from '@/components/shared/EcosystemLogo';

const FEATURED = [
  { name: 'Solana', src: '/images/hero-carousel-logos/Solana.svg' },
  { name: 'Aurora', src: '/images/hero-carousel-logos/Aurora.svg' },
  { name: 'Arbitrum', src: '/images/hero-carousel-logos/Arbitrum.svg' },
  { name: 'Avalanche', src: '/images/hero-carousel-logos/Avalanche.svg' },
  { name: 'Ethereum', src: '/images/hero-carousel-logos/Ethereum.svg' },
  { name: 'Polygon', src: '/images/hero-carousel-logos/Polygon.svg' },
];

const ROW = [
  { name: 'Optimism', src: '/images/hero-carousel-logos/Optimism.svg' },
  { name: 'Base', src: '/images/hero-carousel-logos/Base.svg' },
  { name: 'Bitcoin', src: '/images/hero-carousel-logos/Bitcoin.svg' },
  { name: 'TON', src: '/images/hero-carousel-logos/TON.svg' },
  { name: 'Sui', src: '/images/hero-carousel-logos/Sui.svg' },
  { name: 'NEAR chain', src: '/images/hero-carousel-logos/NEAR chain.svg' },
];

export function Ecosystem() {
  return (
    <section id="ecosystem" className="relative py-12 px-8 md:px-20 bg-[#000]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <RevealOnScroll>
          <div className="mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-3">Intents Ecosystem</h2>
            <div className="w-full h-px mb-4" style={{ background: 'linear-gradient(to right, #FB4D01, transparent)' }} />
            <p className="text-white/60 text-sm md:text-[16px]">Swap across every major blockchain.</p>
          </div>
        </RevealOnScroll>

        {/* Row 1 — 6 large logos */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 lg:gap-6 mb-8 md:mb-12 lg:mb-16 pt-4 lg:pt-6">
          {FEATURED.map((logo, i) => (
            <LargeEcosystemLogo
              key={i}
              name={logo.name}
              src={logo.src}
              variant="dark"
              logoColor="black"
            />
          ))}
        </div>

        {/* Row 2 — Ecosystem blockchains */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:[grid-template-columns:repeat(12,minmax(0,1fr))] gap-3 md:gap-4 lg:gap-4">
          {ROW.map((logo, i) => (
            <SmallEcosystemLogo key={i} name={logo.name} src={logo.src} variant="dark" logoColor="black" />
          ))}
        </div>

      </div>
    </section>
  );
}
