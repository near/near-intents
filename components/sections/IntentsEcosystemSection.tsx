'use client';

import { useEffect, useState } from 'react';
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import Link from 'next/link';
import Image from 'next/image';
import type { BridgeProject } from '@/lib/airtable';

const fallbackFeaturedProjects = [
  {
    id: 1,
    name: 'Rango Exchange',
    logo: '/images/ecosystem-logos/Rango Exchange.svg',
    description: 'Multi-chain DEX aggregator enabling seamless token swaps',
    blackIcon: false,
    verified: true,
    featured: true,
  },
  {
    id: 2,
    name: 'Router Protocol',
    logo: '/images/ecosystem-logos/Router Protocol.svg',
    description: 'Cross-chain liquidity infrastructure for instant swaps',
    blackIcon: true,
    verified: true,
    featured: true,
  },
  {
    id: 3,
    name: 'OpenOcean',
    logo: '/images/ecosystem-logos/OpenOcean.svg',
    description: 'DEX aggregator with cross-chain bridging capabilities',
    blackIcon: false,
    verified: true,
    featured: true,
  },
  {
    id: 4,
    name: 'CoW Swap',
    logo: '/images/ecosystem-logos/CoW Swap.svg',
    description: 'Intent-based swapping with MEV protection',
    blackIcon: true,
    verified: true,
    featured: true,
  },
  {
    id: 5,
    name: 'Kyber Swap',
    logo: '/images/ecosystem-logos/Kyber Swap.svg',
    description: 'Leading DEX with multi-chain liquidity pools',
    blackIcon: false,
    verified: true,
    featured: true,
  },
];

export function IntentsEcosystemSection() {
  const [projects, setProjects] = useState<BridgeProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedProjects() {
      try {
        const response = await fetch('/api/featured-projects');
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        } else {
          // Fallback to hardcoded data if API returns empty
          setProjects(fallbackFeaturedProjects as any);
        }
      } catch (error) {
        console.error('Error fetching featured projects:', error);
        // Fallback to hardcoded data if API fails
        setProjects(fallbackFeaturedProjects as any);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedProjects();
  }, []);

  if (loading) {
    return (
      <section className="py-12 px-8 md:px-20 relative bg-[#000000]">
        <div className="max-w-7xl mx-auto">
          <p className="text-zinc-400">Loading ecosystem partners...</p>
        </div>
      </section>
    );
  }

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
          {projects.map((project) => {
            const cardContent = (
              <div className="border border-white/10 p-5 md:p-6 rounded-[16px] relative group hover:border-brand-orange/30 shadow-lg flex gap-4 overflow-hidden transition-colors duration-300 bg-[#242424]">

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
            );

            return (
              <RevealOnScroll key={project.id} delay={0}>
                {(project as any).brandkit_url ? (
                  <a
                    href={(project as any).brandkit_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-full block"
                  >
                    {cardContent}
                  </a>
                ) : (
                  cardContent
                )}
              </RevealOnScroll>
            );
          })}

          {/* CTA Card - See More */}
          <RevealOnScroll delay={0}>
            <Link href="/bridge" className="h-full">
              <div className="border border-white/10 p-5 md:p-6 rounded-[16px] h-full flex flex-col items-center justify-center cursor-pointer overflow-hidden hover:border-brand-orange transition-colors duration-300 group bg-[#242424]">

                {/* Content */}
                <div className="relative z-10 text-center flex flex-col items-center justify-center gap-3">
                  <div className="text-4xl font-bold text-brand-orange group-hover:scale-110 transition-transform duration-300">
                    +
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white">
                    See more
                  </h3>
                </div>
              </div>
            </Link>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
