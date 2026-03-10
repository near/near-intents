'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { FooterCTA } from '@/components/sections/FooterCTA';
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import type { BridgeProject } from '@/lib/airtable';

// Fallback data - used if Airtable is not configured
const fallbackProjects = [
  {
    id: 1,
    name: 'Rango Exchange',
    logo: '/images/ecosystem-logos/Rango Exchange.svg',
    description: 'Multi-chain DEX aggregator enabling seamless token swaps',
  },
  {
    id: 2,
    name: 'Router Protocol',
    logo: '/images/ecosystem-logos/Router Protocol.svg',
    description: 'Cross-chain liquidity infrastructure for instant swaps',
  },
  {
    id: 3,
    name: 'OpenOcean',
    logo: '/images/ecosystem-logos/OpenOcean.svg',
    description: 'DEX aggregator with cross-chain bridging capabilities',
  },
  {
    id: 4,
    name: 'CoW Swap',
    logo: '/images/ecosystem-logos/CoW Swap.svg',
    description: 'Intent-based swapping with MEV protection',
  },
  {
    id: 5,
    name: 'Kyber Swap',
    logo: '/images/ecosystem-logos/Kyber Swap.svg',
    description: 'Leading DEX with multi-chain liquidity pools',
  },
  {
    id: 6,
    name: 'Rubic Exchange',
    logo: '/images/ecosystem-logos/Rubic Exchange.svg',
    description: 'Cross-chain swapping with competitive rates',
  },
  {
    id: 7,
    name: 'FluidKey',
    logo: '/images/ecosystem-logos/FluidKey.svg',
    description: 'Wallet infrastructure with bridge functionality',
  },
  {
    id: 8,
    name: 'Hot Protocol',
    logo: '/images/ecosystem-logos/Hot Protocol.svg',
    description: 'Smart protocol for optimized cross-chain transactions',
  },
  {
    id: 9,
    name: 'Avnu',
    logo: '/images/ecosystem-logos/Avnu.svg',
    description: 'Multi-chain liquidity aggregator with advanced routing',
  },
  {
    id: 10,
    name: 'Rhea Finance',
    logo: '/images/ecosystem-logos/Rhea Finance.svg',
    description: 'Cross-chain yield optimization',
  },
  {
    id: 11,
    name: 'Zashi Wallet',
    logo: '/images/ecosystem-logos/Zashi Wallet.svg',
    description: 'Privacy-focused wallet with bridge capabilities',
  },
  {
    id: 12,
    name: 'CoolWallet',
    logo: '/images/ecosystem-logos/CoolWallet.svg',
    description: 'Hardware wallet with cross-chain support',
  },
  {
    id: 13,
    name: 'Ctrl',
    logo: '/images/ecosystem-logos/Ctrl.svg',
    description: 'Cross-chain control and execution platform',
  },
  {
    id: 14,
    name: 'Trust Wallet',
    logo: '/images/ecosystem-logos/Trust Wallet.svg',
    description: 'Leading mobile wallet with multi-chain bridge',
  },
  {
    id: 15,
    name: 'OneKey',
    logo: '/images/ecosystem-logos/OneKey.svg',
    description: 'Universal wallet supporting multiple chains',
  },
  {
    id: 16,
    name: 'Keystone',
    logo: '/images/ecosystem-logos/Keystone.svg',
    description: 'Secure hardware wallet with cross-chain support',
  },
  {
    id: 17,
    name: 'Kamino Swap',
    logo: '/images/ecosystem-logos/Kamino Swap.svg',
    description: 'Specialized DEX for stable swaps',
  },
  {
    id: 18,
    name: 'Bitget Wallet',
    logo: '/images/ecosystem-logos/Bitget Wallet.svg',
    description: 'Exchange-integrated wallet with bridge options',
  },
  {
    id: 19,
    name: 'Templar Protocol',
    logo: '/images/ecosystem-logos/Templar Protocol.svg',
    description: 'Advanced cross-chain settlement protocol',
  },
  {
    id: 20,
    name: 'ThorWallet',
    logo: '/images/ecosystem-logos/ThorWallet.svg',
    description: 'Multi-asset wallet with seamless bridge',
  },
  {
    id: 21,
    name: 'Peanut Trade',
    logo: '/images/ecosystem-logos/Peanut Trade.svg',
    description: 'Trading platform with cross-chain liquidity',
  },
  {
    id: 22,
    name: 'Ellipal',
    logo: '/images/ecosystem-logos/Ellipal.svg',
    description: 'Cold storage wallet with cross-chain support',
  },
  {
    id: 23,
    name: 'ShapeShift',
    logo: '/images/ecosystem-logos/ShapeShift.svg',
    description: 'Self-custody platform with integrated bridge',
  },
  {
    id: 24,
    name: 'Ledger Wallet',
    logo: '/images/ecosystem-logos/Ledger Wallet.svg',
    description: 'Industry-leading hardware wallet',
  },
  {
    id: 25,
    name: 'Zypto',
    logo: '/images/ecosystem-logos/Zypto.svg',
    description: 'Cross-chain dApp with bridge services',
  },
];

export default function BridgePage() {
  const [projects, setProjects] = useState<BridgeProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/bridge-projects');
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        } else {
          // Fallback to hardcoded data if API returns empty
          setProjects(fallbackProjects as any);
        }
      } catch (error) {
        console.error('Error fetching projects from Airtable:', error);
        // Fallback to hardcoded data if API fails
        setProjects(fallbackProjects as any);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1E1E1E] text-white font-sans">
        <Navigation />
        <div className="py-20 px-8 text-center">
          <p className="text-zinc-400">Loading projects...</p>
        </div>
      </div>
    );
  }

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

      {/* Projects Grid */}
      <section className="py-12 md:py-16 px-8 md:px-20 relative bg-[#1E1E1E]" style={{ minHeight: '420px' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project) => (
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
                          src={(project as any).logo_url || (project as any).logo}
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
