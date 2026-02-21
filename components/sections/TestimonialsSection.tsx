import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import { ArrowRight } from 'lucide-react';

export function TestimonialsSection() {
  return (
    <section className="py-12 px-8 md:px-20 relative" style={{ background: 'linear-gradient(to bottom, #242424, #000000)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <RevealOnScroll>
              <div>
                <div className="flex gap-2 mb-4 text-brand-orange/50">
                  <span className="text-xs">/</span>
                  <span className="text-xs">/</span>
                  <span className="text-xs">/</span>
                  <span className="text-xs">/</span>
                </div>
                <p className="text-xl md:text-2xl font-bold leading-tight">
                  «Intents are the <span className="text-brand-orange">future</span> of crypto.»
                </p>
                <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-widest">
                  <span className="text-brand-orange font-bold">-</span> <span className="text-white">Charles Hoskinson</span>, <span className="text-zinc-500">Cardano</span>{' '}
                  <ArrowRight size={10} className="-rotate-45" />
                </div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0}>
              <div className="md:text-right">
                <div className="flex gap-2 mb-4 justify-end text-brand-orange/50">
                  <span className="text-xs">+</span>
                  <span className="text-xs">+</span>
                  <span className="text-xs">+</span>
                  <span className="text-xs">+</span>
                  <span className="text-xs">+</span>
                </div>
                <p className="text-xl md:text-2xl font-bold leading-tight">
                  «NEAR Intents is an <span className="text-brand-orange">insanely good</span> product.»
                </p>
                <div className="mt-4 flex items-center justify-end gap-2 text-[10px] uppercase tracking-widest">
                  <span className="text-brand-orange font-bold">-</span> <span className="text-white">Dan Smith</span>, <span className="text-zinc-500">Blockworks Research</span>{' '}
                  <ArrowRight size={10} className="-rotate-45" />
                </div>
              </div>
            </RevealOnScroll>
          </div>
          <div className="max-w-4xl mx-auto text-center">
            <RevealOnScroll delay={0}>
              <p className="text-2xl md:text-3xl font-bold leading-tight tracking-tight">
                «This integration is what crypto is all about:{' '}
                <span className="text-brand-orange">empowering</span> users to exchange value directly, on their terms.»
              </p>
              <div className="mt-8 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest">
                <span className="text-brand-orange font-bold">-</span> <span className="text-white">Christian Thompson</span>, <span className="text-zinc-500">SUI Foundation Managing Director</span>{' '}
                <ArrowRight size={10} className="-rotate-45" />
              </div>
            </RevealOnScroll>
          </div>
          <div className="flex justify-end">
            <div className="max-w-3xl text-right">
              <RevealOnScroll delay={0}>
                <div className="flex gap-2 mb-4 justify-end text-brand-orange/50 opacity-50 tracking-[0.5em] text-xs">
                  |||||||||||||||||
                </div>
                <p className="text-xl md:text-2xl font-bold leading-tight text-zinc-300">
                  «With NEAR, we can bring the same functionality to chains like Bitcoin, offering users genuine
                  self-custody of native assets <span className="text-brand-orange">without compromise</span>.»
                </p>
                <div className="mt-6 flex items-center justify-end gap-2 text-[10px] uppercase tracking-widest">
                  <span className="text-brand-orange font-bold">-</span> <span className="text-white">Jed Watson</span>, <span className="text-zinc-500">Infinex CTO</span>{' '}
                  <ArrowRight size={10} className="-rotate-45" />
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {[
            {
              title: 'INSTANT EXECUTION',
              desc: 'Execute cross-chain swaps in milliseconds with optimized routing and low, predictable fees. With NEAR Intents, users experience faster transactions, near-zero slippage, and reliable performance.',
            },
            {
              title: 'VERIFIABLE INFRASTRUCTURE',
              desc: 'Intents is run on secure, verifiable infrastructure with no single points of failure. Every swap completes safely and transparently so users can execute with confidence.',
            },
            {
              title: 'UNIFIED LIQUIDITY',
              desc: 'Integrate once through a single API and access liquidity across every major chain, so your dApp can accelerate time to market, reduce operational overhead, and stay competitive with faster, cheaper, safer swaps across 125+ assets.',
            },
          ].map((card, i) => (
            <div key={i} className="bg-[#FB4D01] rounded-[16px] p-8 min-h-[300px] flex flex-col justify-between">
              <div className="flex gap-1">
                <span className="text-[20px] text-white leading-none mt-0 flex-shrink-0">+</span>
                <div>
                  <h3 className="font-light text-[24px] leading-none tracking-wide uppercase font-mono mb-6 flex flex-col gap-0">
                    <span className="text-[#ECECE9]">{card.title.split(' ')[0]}</span>
                    <span className="text-[#1E1E1E]">{card.title.split(' ').slice(1).join(' ')}</span>
                  </h3>
                  <p className="text-[#ECECE9] text-[16px] leading-relaxed font-normal">{card.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
