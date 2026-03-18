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
    blackIcon: false,
    verified: true,
  },
  {
    id: 2,
    name: 'Router Protocol',
    logo: '/images/ecosystem-logos/Router Protocol.svg',
    description: 'Cross-chain liquidity infrastructure for instant swaps',
    blackIcon: true,
    verified: true,
  },
  {
    id: 3,
    name: 'OpenOcean',
    logo: '/images/ecosystem-logos/OpenOcean.svg',
    description: 'DEX aggregator with cross-chain bridging capabilities',
    blackIcon: false,
    verified: true,
  },
  {
    id: 4,
    name: 'CoW Swap',
    logo: '/images/ecosystem-logos/CoW Swap.svg',
    description: 'Intent-based swapping with MEV protection',
    blackIcon: true,
    verified: true,
  },
  {
    id: 5,
    name: 'Kyber Swap',
    logo: '/images/ecosystem-logos/Kyber Swap.svg',
    description: 'Leading DEX with multi-chain liquidity pools',
    blackIcon: false,
    verified: true,
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
      <div className="min-h-screen bg-[#000000] text-white font-sans">
        <Navigation />
        <div className="py-20 px-8 text-center">
          <p className="text-zinc-400">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#000000] text-white font-sans selection:bg-brand-orange-500 selection:text-black">
      <Navigation />

      {/* Header */}
      <section className="pt-28 pb-12 md:pt-32 md:pb-16 px-8 md:px-20 relative" style={{ background: '#000000' }}>
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
      <section className="flex-1 pb-12 md:pb-16 px-8 md:px-20 relative bg-[#000000]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project) => {
              const url = project.brandkit_url || (project as any).url;
              const cardContent = (
                <div className="border border-white/10 p-5 md:p-6 rounded-[16px] relative group hover:border-brand-orange shadow-lg flex gap-4 overflow-hidden transition-colors duration-300 bg-[#242424]">
                  {/* Content */}
                  <div className="relative z-10 flex gap-4 w-full">
                    {/* Logo */}
                    <div className="shrink-0">
                      <div
                        className={`w-16 h-16 md:w-20 md:h-20 rounded-[12px] border border-white/10 flex items-center justify-center overflow-hidden ${
                          (project as any).blackIcon ? 'bg-gray-300' : 'bg-white/5'
                        }`}
                      >
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
                      <h3 className="text-lg md:text-xl font-bold mb-2 text-white">
                        {project.name}
                      </h3>
                      <p className="text-sm text-zinc-400 mb-3 leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
              );

              return (
                <RevealOnScroll key={project.id} delay={0}>
                  {url ? (
                    <a href={url} target="_blank" rel="noopener noreferrer" className="block h-full">
                      {cardContent}
                    </a>
                  ) : (
                    cardContent
                  )}
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      <FooterCTA />
    </div>
  );
}
