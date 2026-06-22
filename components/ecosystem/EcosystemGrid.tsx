'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import type { BridgeProject } from '@/lib/airtable';

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

export default function EcosystemGrid() {
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
          setProjects(fallbackProjects as any);
        }
      } catch {
        setProjects(fallbackProjects as any);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="py-20 px-8 text-center">
        <p className="text-zinc-400">Loading projects...</p>
      </div>
    );
  }

  return (
    <section className="flex-1 pb-12 md:pb-16 px-8 md:px-20 relative bg-[#000000]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => {
            const url = project.brandkit_url || (project as any).url;
            const cardContent = (
              <div className="border border-white/10 p-5 md:p-6 rounded-[16px] relative group hover:border-brand-orange shadow-lg flex gap-4 overflow-hidden transition-colors duration-300 bg-[#242424]">
                <div className="relative z-10 flex gap-4 w-full">
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
  );
}
