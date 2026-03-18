'use client';

import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import { TickWave } from '@/components/effects/TickWave';
import { GlitchPlus } from '@/components/effects/GlitchPlus';
import { SlidingBars } from '@/components/effects/SlidingBars';
import { useAnimationVisibility } from '@/hooks/useAnimationVisibility';

export function FeatureCards() {
  const ref = useAnimationVisibility({ threshold: 0.1 });

  return (
    <section ref={ref} id="features" className="py-16 px-8 md:px-20 bg-[#000000] relative" style={{ contain: 'layout style paint' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
        {/* Card 1: SWAP */}
        <RevealOnScroll delay={0}>
          <div className="bg-[#242424] border border-white/10 p-5 md:p-8 rounded-[16px] h-full relative group hover:border-brand-orange/30 shadow-lg min-h-[280px] md:min-h-[340px] flex flex-col overflow-hidden" style={{ contain: 'layout style' }}>
            {/* Label */}
            <span className="text-sm md:text-[16px] font-mono text-white mb-6 block">{`SWAP`}</span>

            {/* Título */}
            <div className="mb-4">
              <h3 className="text-2xl md:text-[32px] font-bold text-[#FFFFFF] leading-[1.1]">
                Cross-chain,<br />
                simplified
              </h3>
            </div>

            {/* Descripción con + prefijo */}
            <div className="flex gap-3">
              <span className="text-[#FB4D01] text-[18px] mt-px shrink-0 [font-family:var(--font-grotesk-mono)]">+</span>
              <p className="text-sm md:text-[16px] font-normal text-[#FFFFFF] leading-relaxed uppercase tracking-wider [font-family:var(--font-grotesk-mono)]">
                NO MANUAL GAS JUGGLING OR BRIDGE MANAGEMENT REQUIRED. EXCHANGE-GRADE EXECUTION, WITHOUT GIVING UP CONTROL OF YOUR WALLET
              </p>
            </div>

            <div className="mt-auto pt-3">
              <TickWave />
            </div>
          </div>
        </RevealOnScroll>

        {/* Card 2: EARN */}
        <RevealOnScroll delay={0}>
          <div className="bg-[#242424] border border-white/10 p-5 md:p-8 rounded-[16px] h-full relative group hover:border-brand-orange/30 shadow-lg min-h-[280px] md:min-h-[340px] flex flex-col overflow-hidden" style={{ contain: 'layout style' }}>
            {/* Label */}
            <span className="text-sm md:text-[16px] font-mono text-white mb-6 block">{`EARN`}</span>

            {/* Contenido */}
            <div>
              <h3 className="text-2xl md:text-[32px] font-bold mb-4 text-[#FFFFFF] leading-[1.1]">
                Idle assets?<br />
                Put them to work.
              </h3>

              <div className="flex gap-3">
                <span className="text-[#FB4D01] text-[16px] mt-px shrink-0 [font-family:var(--font-grotesk-mono)]">+</span>
                <p className="text-sm md:text-[16px] font-normal text-[#FFFFFF] leading-relaxed uppercase tracking-wider [font-family:var(--font-grotesk-mono)]">
                  ACCESS ONCHAIN YIELD ACROSS SUPPORTED TOKENS AND CHAINS– BUILT AROUND YOUR CONTROL.
                </p>
              </div>
            </div>

            <div className="mt-auto pt-3">
              <GlitchPlus count={14} />
            </div>
          </div>
        </RevealOnScroll>

        {/* Card 3: CONFIDENTIAL */}
        <RevealOnScroll delay={0}>
          <div className="bg-[#242424] border border-white/10 p-5 md:p-8 rounded-[16px] h-full relative group hover:border-brand-orange/30 shadow-lg min-h-[280px] md:min-h-[340px] flex flex-col overflow-hidden" style={{ contain: 'layout style' }}>
            {/* Label */}
            <span className="text-sm md:text-[16px] font-mono text-white mb-6 block">{`CONFIDENTIAL`}</span>

            {/* Contenido */}
            <div>
              <h3 className="text-2xl md:text-[32px] font-bold mb-4 text-[#FFFFFF] leading-[1.1]">
                Your transactions.<br />
                Your business.
              </h3>

              <div className="flex gap-3">
                <span className="text-[#FB4D01] text-[16px] mt-px shrink-0 [font-family:var(--font-grotesk-mono)]">+</span>
                <p className="text-sm md:text-[16px] font-normal text-[#FFFFFF] leading-relaxed uppercase tracking-wider [font-family:var(--font-grotesk-mono)]">
                  KEEP TRANSACTIONS OUT OF PUBLIC VIEW AND PROTECT YOUR CROSS-CHAIN POSITIONS.
                </p>
              </div>
            </div>

            <div className="mt-auto pt-3">
              <SlidingBars />
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
