'use client';

import Image from 'next/image';

const icons = [
  '/images/icon-Instant Execution.svg',
  '/images/icon-Verifiable Infrastructure.svg',
  '/images/icon-Unified Liquidity.svg',
];

export function FeatureHighlights() {
  return (
    <section className="py-20 px-8 md:px-20 relative bg-[#000000]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
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
            <div key={i} className="bg-[#FB4D01] rounded-[16px] p-8 flex flex-col justify-between">
              <div>
                <div className="flex gap-3 items-center mb-10">
                  <Image
                    src={icons[i]}
                    alt={card.title}
                    width={24}
                    height={24}
                    className="flex-shrink-0"
                  />
                  <h3 className="text-base md:text-lg font-bold text-white">
                    {card.title}
                  </h3>
                </div>
                <p className="text-[#ECECE9] text-[16px] leading-relaxed font-normal">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
