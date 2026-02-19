import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import { CTAButton } from '@/components/shared/CTAButton';
import { User, FileText, Activity, CheckCircle, Network, Box, ArrowRight } from 'lucide-react';

export function HowItWorks() {
  return (
    <section className="py-32 px-8 md:px-20 bg-[#1E1E1E] relative">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-6 tracking-tight text-white">How it works</h2>
            <div className="w-full h-px bg-gradient-to-r from-brand-orange-500 to-transparent my-6"></div>
            <p className="text-zinc-400 leading-relaxed mb-8 text-sm md:text-base max-w-2xl">
              NEAR Intents uses a novel transaction architecture to abstract away cross-chain complexity and maximize performance, security, and efficiency for DeFi apps, AI agents and end users.
            </p>
            <CTAButton text="Read Technical Overview" />
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <div className="relative w-full rounded-[16px] border border-white/10 bg-[#0a0a0a] overflow-hidden dot-pattern min-h-[500px] flex items-center justify-center p-8">
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 pointer-events-none" />
            <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">

              {/* OFF CHAIN - flex-1 */}
              <div className="flex-1 flex flex-col items-center gap-12 relative p-6 border border-white/5 rounded-[16px] bg-black/40">
                <span className="absolute top-4 left-4 text-[10px] text-zinc-500 font-mono uppercase tracking-widest">OFF Chain</span>

                {/* User Agent (grande) */}
                <div className="flex flex-col items-center gap-3 pt-4">
                  <div className="w-16 h-16 rounded-full border-2 border-white text-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    <User size={28} />
                  </div>
                  <span className="text-xs font-bold text-white uppercase tracking-wider">User Agent</span>
                </div>

                {/* Fila con Quote Request → Market Maker */}
                <div className="flex items-center gap-8 flex-wrap justify-center">
                  <div className="flex flex-col items-center gap-2 opacity-70">
                    <div className="w-10 h-10 rounded-full border border-zinc-600 flex items-center justify-center text-zinc-400">
                      <FileText size={16} />
                    </div>
                    <span className="text-[9px] text-zinc-500 uppercase">Quote Request</span>
                  </div>
                  <ArrowRight size={20} className="text-zinc-600" />
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-[16px] border border-brand-orange-500/50 bg-brand-orange-900/10 flex items-center justify-center text-brand-orange">
                      <Activity size={20} />
                    </div>
                    <span className="text-[9px] text-brand-orange font-bold uppercase">Market Maker</span>
                  </div>
                </div>
              </div>

              {/* Conector horizontal/vertical */}
              <div className="hidden md:flex h-px w-16 bg-gradient-to-r from-zinc-700 to-brand-orange-600"></div>
              <ArrowRight className="md:hidden text-zinc-600 rotate-90" />

              {/* ON CHAIN - flex-[2] */}
              <div className="flex-[2] flex flex-col gap-8 relative p-6 border border-white/5 rounded-[16px] bg-black/40 w-full">
                <span className="absolute top-4 right-4 text-[10px] text-zinc-500 font-mono uppercase tracking-widest">ON Chain</span>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative pt-4">
                  {/* Approved Quote */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full border border-brand-orange-500 text-brand-orange flex items-center justify-center bg-brand-orange-500/10">
                      <CheckCircle size={20} />
                    </div>
                    <span className="text-[9px] text-brand-orange font-bold uppercase text-center">Approved<br/>Quote</span>
                  </div>

                  <div className="h-8 w-px md:w-12 md:h-px bg-brand-orange-600/50"></div>

                  {/* Intents Smart Contract */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 rounded-[16px] border-2 border-brand-orange-600 text-white bg-zinc-900 flex items-center justify-center shadow-[0_0_30px_rgba(234,88,12,0.2)]">
                      <FileText size={24} />
                    </div>
                    <span className="text-[9px] text-white font-bold uppercase text-center">Intents<br/>Smart Contract</span>
                  </div>

                  <div className="h-8 w-px md:w-12 md:h-px bg-brand-orange-600/50"></div>

                  {/* Omnibridge */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full border border-brand-orange-500 text-brand-orange flex items-center justify-center bg-brand-orange-500/10">
                      <Network size={20} />
                    </div>
                    <span className="text-[9px] text-brand-orange font-bold uppercase text-center">Omnibridge</span>
                  </div>

                  <div className="h-8 w-px md:w-12 md:h-px bg-gradient-to-r from-brand-orange-600/50 to-zinc-700"></div>

                  {/* 4 Chains pequeñas */}
                  <div className="flex flex-col gap-2 p-3 border-l border-zinc-800 pl-6">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="flex items-center gap-3 opacity-60">
                        <div className="w-2 h-2 rounded-full bg-zinc-500"></div>
                        <div className="h-1 w-8 bg-zinc-800 rounded-full"></div>
                        <div className="w-6 h-6 rounded-full border border-zinc-700 flex items-center justify-center">
                          <Box size={10} className="text-zinc-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
