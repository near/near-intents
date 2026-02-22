import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import { LargeEcosystemLogo, SmallEcosystemLogo } from '@/components/shared/EcosystemLogo';

const LOGO = '/images/slider-logos/near-protocol-near-logo.png';
const PRUEBA_LOGO = '/images/slider-logos/prueba-logo-seg.png';

const FEATURED: string[] = [
  'Solana', 'Aurora', 'Arbitrum', 'Avalanche', 'Ethereum', 'Polygon',
];

const ROW: string[] = [
  'Solana', 'Aurora', 'Arbitrum', 'Avalanche', 'Optimism', 'Base',
  'Polygon', 'Bitcoin', 'Cosmos', 'TON', 'Sui', 'NEAR',
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
          {FEATURED.map((name, i) => (
            <LargeEcosystemLogo
              key={i}
              name={name}
              src={i === 0 ? PRUEBA_LOGO : LOGO}
              variant="dark"
              logoColor={i === 0 ? 'white' : 'black'}
            />
          ))}
        </div>

        {/* Row 2 and Row 3 — with overlay on desktop */}
        <div className="relative">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:[grid-template-columns:repeat(12,minmax(0,1fr))] gap-3 md:gap-4 lg:gap-4 mb-6 md:mb-8 lg:mb-10">
            {ROW.map((name, i) => (
              <SmallEcosystemLogo key={i} name={name} src={LOGO} variant="dark" logoColor="black" />
            ))}
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:[grid-template-columns:repeat(12,minmax(0,1fr))] gap-3 md:gap-4 lg:gap-4">
            {ROW.map((name, i) => (
              <SmallEcosystemLogo key={i} name={name} src={LOGO} variant="dark" logoColor="black" />
            ))}
          </div>

          {/* Overlay - covers last 3 rows */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.93))' }}></div>
        </div>

      </div>
    </section>
  );
}
