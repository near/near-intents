import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import { ArrowRight } from 'lucide-react';

export function TestimonialsSection() {
  return (
    <section className="py-12 px-8 md:px-20 relative" style={{ background: 'linear-gradient(to bottom, #242424, #000000)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <RevealOnScroll>
              <div>
                <div className="flex gap-2 mb-4 text-brand-orange">
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
                <div className="flex gap-2 mb-4 justify-end text-brand-orange">
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
          <div className="mt-2 max-w-4xl mx-auto text-center">
            <RevealOnScroll delay={0}>
              <p className="text-2xl md:text-3xl font-bold leading-tight tracking-tight">
                «This integration is what crypto is all about:{' '}
                <span className="text-brand-orange">empowering</span> users to exchange value directly, on their terms.»
              </p>
              <div className="mt-4 md:mt-8 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest">
                <span className="text-brand-orange font-bold">-</span> <span className="text-white">Christian Thompson</span>, <span className="text-zinc-500">SUI Foundation Managing Director</span>{' '}
                <ArrowRight size={10} className="-rotate-45" />
              </div>
            </RevealOnScroll>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <RevealOnScroll delay={0}>
              <div>
                <div className="flex gap-2 mb-4 text-brand-orange tracking-[0.5em] text-xs">
                  |||||||||||||||||
                </div>
                <p className="text-xl md:text-2xl font-bold leading-tight text-zinc-300">
                  «With NEAR, we can bring the same functionality to chains like Bitcoin, offering users genuine
                  self-custody of native assets <span className="text-brand-orange">without compromise</span>.»
                </p>
                <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-widest">
                  <span className="text-brand-orange font-bold">-</span> <span className="text-white">Jed Watson</span>, <span className="text-zinc-500">Infinex CTO</span>{' '}
                  <ArrowRight size={10} className="-rotate-45" />
                </div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0}>
              <div className="md:text-right">
                <div className="flex gap-2 mb-4 justify-end text-brand-orange">
                  <span className="text-xs">/</span>
                  <span className="text-xs">/</span>
                  <span className="text-xs">/</span>
                  <span className="text-xs">/</span>
                </div>
                <p className="text-xl md:text-2xl font-bold leading-tight">
                  «NEAR Protocol is rolling out Confidential Intents, enabling <span className="text-brand-orange">confidential execution</span> for cross-chain transactions. This is the way. Privacy first.»
                </p>
                <div className="mt-4 flex items-center justify-end gap-2 text-[10px] uppercase tracking-widest">
                  <span className="text-brand-orange font-bold">-</span> <span className="text-white">Tyler Winklevoss</span>, <span className="text-zinc-500">Co-founder, Gemini</span>{' '}
                  <ArrowRight size={10} className="-rotate-45" />
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
