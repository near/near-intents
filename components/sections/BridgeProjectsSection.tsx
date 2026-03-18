'use client';

import { useEffect, useState } from 'react';
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import Link from 'next/link';
import Image from 'next/image';
import { BridgeProject } from '@/lib/airtable';

export function BridgeProjectsSection() {
  const [projects, setProjects] = useState<BridgeProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/bridge-projects');
        const data = await response.json();
        setProjects(data.slice(0, 5)); // Only first 5
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="py-12 px-8 md:px-20 relative bg-[#000000]">
        <div className="max-w-7xl mx-auto">
          <p className="text-zinc-400">Loading...</p>
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
            <div className="flex gap-2 text-brand-orange mb-4">
              <span className="text-xs">→</span>
              <span className="text-xs">→</span>
              <span className="text-xs">→</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Bridge <span className="text-brand-orange">Partners</span>
            </h2>
          </div>
        </RevealOnScroll>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Project Cards */}
          {projects.map((project) => (
            <RevealOnScroll key={project.id} delay={0}>
              <div
                className="border border-white/10 p-5 md:p-6 rounded-[16px] relative group hover:border-brand-orange/30 shadow-lg flex gap-4 overflow-hidden transition-colors duration-300"
                style={{
                  background: 'rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(10px)',
                }}
              >
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
                        src={project.logo_url}
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

          {/* CTA Card - See More */}
          <RevealOnScroll delay={0}>
            <Link href="/ecosystem" className="h-full">
              <div
                className="border border-white/10 p-5 md:p-6 rounded-[16px] h-full flex flex-col items-center justify-center cursor-pointer overflow-hidden hover:border-brand-orange transition-colors duration-300 group"
                style={{
                  background: 'rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(10px)',
                }}
              >
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
