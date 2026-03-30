'use client';

import Image from 'next/image';
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';

export function ConfidentialHowItWorks() {
  return (
    <section id="confidential-how-it-works" className="py-20 px-8 md:px-20 bg-[#000000] relative">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How it works</h2>

          <div className="w-full h-px mb-6" style={{ background: 'linear-gradient(to right, #FB4D01, transparent)' }} />

          <div className="mb-12 max-w-4xl">
            <p className="text-lg text-zinc-400 leading-relaxed">
              Confidential Intents runs on a dedicated NEAR private shard, operated by a decentralized set of independent permissioned validators. A TEE-based bridge connects the private shard to NEAR mainnet.
            </p>
          </div>

          <Image
            src="/images/IN_confindentialpaper_P_01 v2.png"
            alt="Confidential Intents architecture diagram"
            width={1200}
            height={600}
            className="w-full h-auto"
            priority
          />
        </RevealOnScroll>
      </div>
    </section>
  );
}
