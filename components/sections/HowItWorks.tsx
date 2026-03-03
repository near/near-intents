import Image from 'next/image';
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import { CTAButton } from '@/components/shared/CTAButton';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 px-8 md:px-20 relative" style={{ background: 'linear-gradient(to bottom, #000000, #242424)' }}>
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <div className="w-full h-px mb-6" style={{
              background: 'linear-gradient(to right, #fa4b00, #000000)'
            }}></div>
            <p className="text-lg text-zinc-400 mb-8">
              NEAR Intents uses a novel transaction architecture to abstract away cross-chain complexity and maximize performance, security, and efficiency for DeFi apps, AI agents and end users.
            </p>
            <CTAButton text="Read Technical Overview" href="https://www.notion.so/defuse/Technical-overview-of-NEAR-Intents-1bdf8a584c7c808b97c4e566ba1be28d" />
          </div>
        </RevealOnScroll>

        <div className="relative w-full">
          {/* Mobile */}
          <img
            src="/images/how-it-works/grafico-vertical-f.svg"
            alt="How NEAR Intents Works"
            className="w-full h-auto object-contain mix-blend-lighten md:hidden"
          />
          {/* Desktop */}
          <img
            src="/images/how-it-works/grafico-horizontal-f.svg"
            alt="How NEAR Intents Works"
            className="hidden w-full h-auto object-contain mix-blend-lighten md:block"
          />
        </div>
      </div>
    </section>
  );
}
