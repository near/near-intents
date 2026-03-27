'use client';

import Image from 'next/image';
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';

export function ConfidentialProblemV2() {
  return (
    <section className="py-20 px-8 md:px-20 bg-[#000000] relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Confidentiality built into execution v2</h2>
        <div className="w-full h-px mb-12" style={{ background: 'linear-gradient(to right, #FB4D01, transparent)' }} />

        <RevealOnScroll>
          {/* Main grid - 2 columns */}
          <div className="grid grid-cols-1 gap-16 items-start" style={{ gridTemplateColumns: '52% 48%', marginBottom: '25px' }}>
            {/* Left column: Paragraphs */}
            <div className="space-y-6">
              <p className="text-lg text-zinc-400 leading-relaxed">
                In DeFi today, your order size, token pair, direction, and timing are all visible before your transaction settles. MEV bots frontrun pending swaps. Sandwich attacks extract value on both sides of your order. Anyone watching the mempool can trade against your position before you're filled.
              </p>

              <p className="text-lg text-zinc-400 leading-relaxed">
                Confidential Intents provides restricted visibility for anyone managing cross-chain positions with real capital at stake. Powered by a NEAR private shard and connected to NEAR mainnet via a TEE-based bridge, it delivers cryptographically-secured execution without the complexity of ZK-only systems—no client-side proof generation, no state sync, no bespoke wallet setup.
              </p>
            </div>

            {/* Right column: Image */}
            <div className="relative w-full overflow-hidden">
              <Image
                src="/images/intents-confidential-2.png"
                alt="Confidentiality built into execution illustration"
                width={500}
                height={400}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Card - 50% width centered */}
          <div className="max-w-[50%] mx-auto flex justify-center">
            <div className="bg-[#242424] border border-white/10 p-5 rounded-[16px] flex gap-3 items-start">
              <span className="text-brand-orange font-mono font-bold shrink-0 mt-1">+</span>
              <p className="text-zinc-400 leading-relaxed text-center">
                Opt into confidentiality when you need it by toggling between your Main Account and Confidential Account directly on near.com.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
