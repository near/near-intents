'use client';

import Image from 'next/image';
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';

export function ConfidentialHowItWorksV2() {
  return (
    <section id="confidential-how-it-works" className="py-20 px-8 md:px-20 bg-[#0A0D14] relative">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How it works</h2>

          <div className="w-full h-px mb-6" style={{ background: 'linear-gradient(to right, #FB4D01, transparent)' }} />

          <div className="mb-12 max-w-4xl">
            <p className="text-lg text-zinc-400 leading-relaxed">
              Confidential Intents runs on a dedicated NEAR private shard, operated by a decentralized set of independent permissioned validators. A TEE-based bridge connects the private shard to NEAR mainnet.
            </p>
          </div>

          <div className="bg-[#111317] border border-white/10 rounded-[16px] p-8 overflow-hidden hover:border-white/20 transition-colors duration-300">
            <Image
              src="/images/near-intents-confidential-img1.png"
              alt="Confidential Intents architecture diagram"
              width={1200}
              height={600}
              className="w-full h-auto invert mix-blend-screen opacity-90"
              priority
            />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
