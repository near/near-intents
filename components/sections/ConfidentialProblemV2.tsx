'use client';

import { RevealOnScroll } from '@/components/shared/RevealOnScroll';

export function ConfidentialProblemV2() {
  return (
    <section className="py-20 px-8 md:px-20 bg-[#000000] relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          {/* Left column: Sticky title and line */}
          <div className="sticky top-20 h-fit">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Confidentiality built into execution</h2>
            <div className="w-full h-px" style={{ background: 'linear-gradient(to right, #FB4D01, transparent)' }} />
          </div>

          {/* Right column: Text cards and image */}
          <div className="space-y-6">
            <RevealOnScroll>
              <div className="bg-[#242424] border border-white/10 p-6 md:p-8 rounded-[16px] hover:border-white/20 transition-colors duration-300">
                <p className="text-lg text-zinc-400 leading-relaxed">
                  In DeFi today, your order size, token pair, direction, and timing are all visible before your transaction settles. MEV bots frontrun pending swaps. Sandwich attacks extract value on both sides of your order. Anyone watching the mempool can trade against your position before you're filled.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <div className="bg-[#242424] border border-white/10 p-6 md:p-8 rounded-[16px] hover:border-white/20 transition-colors duration-300">
                <p className="text-lg text-zinc-400 leading-relaxed">
                  Confidential Intents provides restricted visibility for anyone managing cross-chain positions with real capital at stake. Powered by a NEAR private shard and connected to NEAR mainnet via a TEE-based bridge, it delivers cryptographically-secured execution without the complexity of ZK-only systems—no client-side proof generation, no state sync, no bespoke wallet setup.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <div className="bg-[#242424] border border-white/10 p-6 md:p-8 rounded-[16px] hover:border-white/20 transition-colors duration-300 flex gap-3 items-start">
                <span className="text-brand-orange font-mono font-bold shrink-0 mt-1">+</span>
                <p className="text-zinc-400 leading-relaxed">
                  Opt into confidentiality when you need it by toggling between your Main Account and Confidential Account directly on near.com.
                </p>
              </div>
            </RevealOnScroll>

          </div>
        </div>
      </div>
    </section>
  );
}
