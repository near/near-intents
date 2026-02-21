import Image from 'next/image';
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';

const LOGO = '/images/slider-logos/near-protocol-near-logo.png';

const FEATURED: string[] = [
  'Solana', 'Aurora', 'Arbitrum', 'Avalanche', 'Ethereum', 'Polygon',
];

const ROW: string[] = [
  'Solana', 'Aurora', 'Arbitrum', 'Avalanche', 'Optimism',
  'Base', 'Polygon', 'Bitcoin', 'Cosmos', 'TON', 'Sui',
];

function LargeLogo({ name }: { name: string }) {
  return (
    <div className="relative flex flex-col items-center">
      <span className="absolute -top-5 right-2 text-brand-orange text-xs font-mono select-none">+</span>
      <div className="group w-16 h-16 md:w-[120px] md:h-[120px] rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center">
        <Image
          src={LOGO}
          alt={name}
          width={68}
          height={68}
          className="object-contain w-8 h-8 md:w-[68px] md:h-[68px] grayscale opacity-[0.85] group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
        />
      </div>
      <span className="mt-2 text-white font-bold text-[10px] md:text-sm tracking-wide [font-family:var(--font-grotesk)]">{name}</span>
    </div>
  );
}

function SmallLogo({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="group w-[58px] h-[58px] rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center">
        <Image
          src={LOGO}
          alt={name}
          width={32}
          height={32}
          className="object-contain grayscale opacity-[0.85] group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
        />
      </div>
      <span className="text-white font-bold text-[11px] tracking-wide text-center leading-tight [font-family:var(--font-grotesk)]">{name}</span>
    </div>
  );
}

export function Ecosystem() {
  return (
    <section id="ecosystem" className="relative py-12 md:py-16 px-8 md:px-20 bg-[#000]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <RevealOnScroll>
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-3">Intents Ecosystem</h2>
            <div className="w-full h-px mb-4" style={{ background: 'linear-gradient(to right, #FB4D01, transparent)' }} />
            <p className="text-white/60 text-[16px]">Swap across every major blockchain.</p>
          </div>
        </RevealOnScroll>

        {/* Row 1 — 6 large logos */}
        <RevealOnScroll delay={0.1}>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 mb-10 md:mb-16 pt-6">
            {FEATURED.map((name, i) => (
              <LargeLogo key={i} name={name} />
            ))}
          </div>
        </RevealOnScroll>

        {/* Row 2 — 11 small logos */}
        <RevealOnScroll delay={0.2}>
          <div className="grid grid-cols-4 md:[grid-template-columns:repeat(11,minmax(0,1fr))] gap-4 mb-8 md:mb-10">
            {ROW.map((name, i) => (
              <SmallLogo key={i} name={name} />
            ))}
          </div>
        </RevealOnScroll>

        {/* Row 3 — 11 small logos */}
        <RevealOnScroll delay={0.3}>
          <div className="grid grid-cols-4 md:[grid-template-columns:repeat(11,minmax(0,1fr))] gap-4">
            {ROW.map((name, i) => (
              <SmallLogo key={i} name={name} />
            ))}
          </div>
        </RevealOnScroll>

      </div>
    </section>
  );
}
