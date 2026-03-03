'use client';

import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import Link from 'next/link';
import Image from 'next/image';

const bridgeProjects = [
  {
    id: 1,
    name: 'Rango Exchange',
    logo: '/images/ecosystem-logos/Rango Exchange.svg',
    category: 'DEX Aggregator',
    description: 'Multi-chain DEX aggregator enabling seamless token swaps',
  },
  {
    id: 2,
    name: 'Router Protocol',
    logo: '/images/ecosystem-logos/Router Protocol.svg',
    category: 'Bridge',
    description: 'Cross-chain liquidity infrastructure for instant swaps',
  },
  {
    id: 3,
    name: 'OpenOcean',
    logo: '/images/ecosystem-logos/OpenOcean.svg',
    category: 'DEX Aggregator',
    description: 'DEX aggregator with cross-chain bridging capabilities',
  },
  {
    id: 4,
    name: 'CoW Swap',
    logo: '/images/ecosystem-logos/CoW Swap.svg',
    category: 'Intent Protocol',
    description: 'Intent-based swapping with MEV protection',
  },
  {
    id: 5,
    name: 'Kyber Swap',
    logo: '/images/ecosystem-logos/Kyber Swap.svg',
    category: 'DEX',
    description: 'Leading DEX with multi-chain liquidity pools',
  },
];

export function IntentsEcosystemSection() {
  return (
    <section className="py-12 px-8 md:px-20 relative bg-[#000000]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <RevealOnScroll>
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Intents Ecosystem
            </h2>
            <div className="w-full h-px mb-6" style={{
              background: 'linear-gradient(to right, #fa4b00, #000000)'
            }}></div>
            <p className="text-lg text-zinc-400">
              Swap across every major blockchain.
            </p>
          </div>
        </RevealOnScroll>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Project Cards */}
          {bridgeProjects.map((project) => (
            <RevealOnScroll key={project.id} delay={0}>
              <div className="border border-white/10 p-5 md:p-6 rounded-[16px] relative group hover:border-brand-orange/30 shadow-lg flex gap-4 overflow-hidden transition-colors duration-300 bg-[#242424]">

                {/* Content */}
                <div className="relative z-10 flex gap-4 w-full">
                  {/* Logo */}
                  <div className="shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-[12px] bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                      <Image
                        src={project.logo}
                        alt={project.name}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col flex-1 min-w-0">
                    {/* Project Name */}
                    <h3 className="text-lg md:text-xl font-bold mb-2 text-white">
                      {project.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-zinc-400 mb-3 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* Category Badges */}
                    <div className="flex gap-2 flex-wrap">
                      <span className="text-xs px-3 py-1 rounded-md bg-white/5 text-zinc-300 border border-white/10">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}

          {/* CTA Card - See More */}
          <RevealOnScroll delay={0}>
            <Link href="/bridge">
              <div className="border border-white/10 p-5 md:p-6 rounded-[16px] h-full flex flex-col items-center justify-center cursor-pointer overflow-hidden hover:border-brand-orange transition-colors duration-300 group bg-[#242424]">

                {/* Content */}
                <div className="relative z-10 text-center flex flex-col items-center justify-center gap-3">
                  <div className="text-4xl font-bold text-brand-orange group-hover:scale-110 transition-transform duration-300">
                    +
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white">
                    See more
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-brand-orange group-hover:gap-2 transition-all duration-300">
                    <span className="uppercase tracking-wider">Explore</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            </Link>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
