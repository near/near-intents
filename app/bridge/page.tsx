'use client';

import { useState, useMemo } from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { FooterCTA } from '@/components/sections/FooterCTA';
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

const allBridgeProjects = [
  {
    id: 1,
    name: 'Rango Exchange',
    logo: '/images/ecosystem-logos/Rango Exchange.svg',
    description: 'Multi-chain DEX aggregator enabling seamless token swaps',
    category: 'DEX Aggregator',
  },
  {
    id: 2,
    name: 'Router Protocol',
    logo: '/images/ecosystem-logos/Router Protocol.svg',
    description: 'Cross-chain liquidity infrastructure for instant swaps',
    category: 'Bridge',
  },
  {
    id: 3,
    name: 'OpenOcean',
    logo: '/images/ecosystem-logos/OpenOcean.svg',
    description: 'DEX aggregator with cross-chain bridging capabilities',
    category: 'DEX Aggregator',
  },
  {
    id: 4,
    name: 'CoW Swap',
    logo: '/images/ecosystem-logos/CoW Swap.svg',
    description: 'Intent-based swapping with MEV protection',
    category: 'Intent Protocol',
  },
  {
    id: 5,
    name: 'Kyber Swap',
    logo: '/images/ecosystem-logos/Kyber Swap.svg',
    description: 'Leading DEX with multi-chain liquidity pools',
    category: 'DEX',
  },
  {
    id: 6,
    name: 'Rubic Exchange',
    logo: '/images/ecosystem-logos/Rubic Exchange.svg',
    description: 'Cross-chain swapping with competitive rates',
    category: 'DEX Aggregator',
  },
  {
    id: 7,
    name: 'FluidKey',
    logo: '/images/ecosystem-logos/FluidKey.svg',
    description: 'Wallet infrastructure with bridge functionality',
    category: 'Wallet',
  },
  {
    id: 8,
    name: 'Hot Protocol',
    logo: '/images/ecosystem-logos/Hot Protocol.svg',
    description: 'Smart protocol for optimized cross-chain transactions',
    category: 'Protocol',
  },
  {
    id: 9,
    name: 'Avnu',
    logo: '/images/ecosystem-logos/Avnu.svg',
    description: 'Multi-chain liquidity aggregator with advanced routing',
    category: 'DEX Aggregator',
  },
  {
    id: 10,
    name: 'Rhea Finance',
    logo: '/images/ecosystem-logos/Rhea Finance.svg',
    description: 'Cross-chain yield optimization',
    category: 'Finance',
  },
  {
    id: 11,
    name: 'Zashi Wallet',
    logo: '/images/ecosystem-logos/Zashi Wallet.svg',
    description: 'Privacy-focused wallet with bridge capabilities',
    category: 'Wallet',
  },
  {
    id: 12,
    name: 'CoolWallet',
    logo: '/images/ecosystem-logos/CoolWallet.svg',
    description: 'Hardware wallet with cross-chain support',
    category: 'Wallet',
  },
  {
    id: 13,
    name: 'Ctrl',
    logo: '/images/ecosystem-logos/Ctrl.svg',
    description: 'Cross-chain control and execution platform',
    category: 'Protocol',
  },
  {
    id: 14,
    name: 'Trust Wallet',
    logo: '/images/ecosystem-logos/Trust Wallet.svg',
    description: 'Leading mobile wallet with multi-chain bridge',
    category: 'Wallet',
  },
  {
    id: 15,
    name: 'OneKey',
    logo: '/images/ecosystem-logos/OneKey.svg',
    description: 'Universal wallet supporting multiple chains',
    category: 'Wallet',
  },
  {
    id: 16,
    name: 'Keystone',
    logo: '/images/ecosystem-logos/Keystone.svg',
    description: 'Secure hardware wallet with cross-chain support',
    category: 'Wallet',
  },
  {
    id: 17,
    name: 'Kamino Swap',
    logo: '/images/ecosystem-logos/Kamino Swap.svg',
    description: 'Specialized DEX for stable swaps',
    category: 'DEX',
  },
  {
    id: 18,
    name: 'Bitget Wallet',
    logo: '/images/ecosystem-logos/Bitget Wallet.svg',
    description: 'Exchange-integrated wallet with bridge options',
    category: 'Wallet',
  },
  {
    id: 19,
    name: 'Templar Protocol',
    logo: '/images/ecosystem-logos/Templar Protocol.svg',
    description: 'Advanced cross-chain settlement protocol',
    category: 'Protocol',
  },
  {
    id: 20,
    name: 'ThorWallet',
    logo: '/images/ecosystem-logos/ThorWallet.svg',
    description: 'Multi-asset wallet with seamless bridge',
    category: 'Wallet',
  },
  {
    id: 21,
    name: 'Peanut Trade',
    logo: '/images/ecosystem-logos/Peanut Trade.svg',
    description: 'Trading platform with cross-chain liquidity',
    category: 'Trading',
  },
  {
    id: 22,
    name: 'Ellipal',
    logo: '/images/ecosystem-logos/Ellipal.svg',
    description: 'Cold storage wallet with cross-chain support',
    category: 'Wallet',
  },
  {
    id: 23,
    name: 'ShapeShift',
    logo: '/images/ecosystem-logos/ShapeShift.svg',
    description: 'Self-custody platform with integrated bridge',
    category: 'Platform',
  },
  {
    id: 24,
    name: 'Ledger Wallet',
    logo: '/images/ecosystem-logos/Ledger Wallet.svg',
    description: 'Industry-leading hardware wallet',
    category: 'Wallet',
  },
  {
    id: 25,
    name: 'Zypto',
    logo: '/images/ecosystem-logos/Zypto.svg',
    description: 'Cross-chain dApp with bridge services',
    category: 'dApp',
  },
];

const categories = ['All', ...Array.from(new Set(allBridgeProjects.map(p => p.category)))];

export default function BridgePage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return allBridgeProjects;
    return allBridgeProjects.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white font-sans selection:bg-brand-orange-500 selection:text-black">
      <Navigation />

      {/* Header */}
      <section className="py-12 md:py-16 px-8 md:px-20 relative" style={{ background: 'linear-gradient(to bottom, #121212, #1f1f1f)' }}>
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-brand-orange transition-colors mb-8">
            <ArrowLeft size={16} />
            <span className="text-sm">Back</span>
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Intents <span className="text-brand-orange">Ecosystem</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl">
            Explore all our ecosystem partners for seamless cross-chain interactions
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 px-8 md:px-20 relative bg-[#1E1E1E]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-brand-orange text-black border border-brand-orange'
                    : 'bg-white/5 text-white border border-white/10 hover:border-brand-orange/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 md:py-16 px-8 md:px-20 relative bg-[#1E1E1E]" style={{ minHeight: '420px' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProjects.map((project) => (
              <RevealOnScroll key={project.id} delay={0}>
                <div className="border border-white/10 p-5 md:p-6 rounded-[16px] relative group hover:border-brand-orange/30 shadow-lg flex gap-4 overflow-hidden transition-colors duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.4) 100%)',
                    backdropFilter: 'blur(10px)'
                  }}>

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
          </div>
        </div>
      </section>

      <FooterCTA />
    </div>
  );
}
