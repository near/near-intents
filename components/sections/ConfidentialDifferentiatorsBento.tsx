'use client';

import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import { TickWave } from '@/components/effects/TickWave';
import { GlitchPlus } from '@/components/effects/GlitchPlus';
import { SlidingBars } from '@/components/effects/SlidingBars';
import { useAnimationVisibility } from '@/hooks/useAnimationVisibility';

const differentiators = [
  {
    number: '01',
    title: 'No MEV. No Frontrunning.',
    description:
      'Transactions execute on a NEAR private shard—invisible to bots, invisible to the mempool, invisible to anyone who would trade against your position.',
  },
  {
    number: '02',
    title: 'Selective Disclosure for Compliance.',
    description:
      'Confidential Intents supports selective disclosure and auditable execution, meaning institutions can meet required disclosure obligations without broadcasting position details to the public chain.',
  },
  {
    number: '03',
    title: 'Full Cross-Chain Reach.',
    description:
      "Move funds between your confidential and public NEAR Intents accounts at any time, or withdraw to any foreign chain. Confidentiality doesn't mean confinement.",
  },
];

export function ConfidentialDifferentiatorsBento() {
  const ref = useAnimationVisibility({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 px-8 md:px-20 bg-[#0A0D14] relative" style={{ contain: 'layout style paint' }}>
      <div className="max-w-7xl mx-auto">
        <div className="bento-grid">
          {differentiators.map((item, idx) => (
            <RevealOnScroll key={idx} delay={idx * 0.15}>
              <div
                className="bg-[#111317] border border-white/10 p-5 md:p-8 rounded-[16px] h-full relative group hover:border-brand-orange-500/40 hover:shadow-lg hover:shadow-brand-orange-500/10 shadow-lg flex flex-col transition-all duration-300 overflow-hidden bento-item"
                style={{ contain: 'layout style' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-orange-500/0 to-brand-orange-500/0 group-hover:from-brand-orange-500/5 group-hover:to-brand-orange-500/0 pointer-events-none transition-all duration-300" />

                <div className="text-sm md:text-[16px] font-mono text-brand-orange-500 mb-4 relative z-10">
                  {item.number}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-[1.1] relative z-10">
                  {item.title}
                </h3>
                <p className="text-base text-zinc-400 leading-relaxed flex-grow relative z-10">
                  {item.description}
                </p>

                {/* Animated effects at bottom */}
                <div className="mt-auto pt-8 relative z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  {idx === 0 && <TickWave />}
                  {idx === 1 && <GlitchPlus count={14} />}
                  {idx === 2 && <SlidingBars />}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
