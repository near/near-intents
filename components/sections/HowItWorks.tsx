import Image from 'next/image';
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import { CTAButton } from '@/components/shared/CTAButton';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 px-8 md:px-20 relative" style={{ background: 'linear-gradient(to bottom, #000000, #242424)' }}>
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-6 tracking-tight text-white">How it works</h2>
            <div className="w-full h-px bg-gradient-to-r from-brand-orange-500 to-transparent my-6"></div>
            <p className="text-zinc-400 leading-relaxed mb-8 text-[18px] max-w-2xl">
              NEAR Intents uses a novel transaction architecture to abstract away cross-chain complexity and maximize performance, security, and efficiency for DeFi apps, AI agents and end users.
            </p>
            <CTAButton text="Read Technical Overview" href="https://www.notion.so/defuse/Technical-overview-of-NEAR-Intents-1bdf8a584c7c808b97c4e566ba1be28d" small={true} />
          </div>
        </RevealOnScroll>

        <div className="relative w-full">
          <Image
            src="/images/telemetry.png"
            alt="How NEAR Intents Works"
            width={1200}
            height={600}
            quality={100}
            priority={false}
            className="w-full h-auto object-contain mix-blend-lighten"
          />
        </div>
      </div>
    </section>
  );
}
