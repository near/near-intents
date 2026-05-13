'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { CaseStudy } from '@/lib/types/content';

interface Props {
  caseStudies: CaseStudy[];
}

export default function CaseStudyCarousel({ caseStudies }: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setActive((i) => (i + 1) % caseStudies.length), [caseStudies.length]);
  const prev = useCallback(() => setActive((i) => (i - 1 + caseStudies.length) % caseStudies.length), [caseStudies.length]);

  useEffect(() => {
    if (paused || caseStudies.length <= 1) return;
    const t = setInterval(next, 8000);
    return () => clearInterval(t);
  }, [paused, next, caseStudies.length]);

  if (!caseStudies.length) return null;
  const cs = caseStudies[active];

  return (
    <section className="py-16 md:py-20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">Case Studies</h2>
          <Link href="/case-studies" className="text-[13px] font-semibold text-[#fb4d01] hover:underline">
            View all →
          </Link>
        </div>

        <div
          className="bg-[#242424] rounded-2xl border border-white/10 p-6 md:p-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left */}
            <div className="flex flex-col">
              <div className="flex items-center gap-4 mb-5">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-white/10 bg-white/5 shrink-0">
                  <Image src={cs.logo} alt={cs.name} fill className="object-contain p-2" sizes="56px" />
                </div>
                <div>
                  <h3 className="font-bold text-[18px] text-white">{cs.name}</h3>
                  <span className="text-[11px] text-emerald-400 bg-emerald-900/30 border border-emerald-500/20 rounded-full px-2 py-0.5 capitalize">
                    {cs.status}
                  </span>
                </div>
              </div>

              <p className="text-white/60 text-[14px] leading-relaxed mb-6 flex-1">{cs.description}</p>

              {cs.useCases?.length > 0 && (
                <div className="flex flex-col gap-2 mb-6">
                  {cs.useCases.slice(0, 3).map((uc) => (
                    <div key={uc.useCase} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#fb4d01] shrink-0" />
                      <span className="text-[13px] text-white/60 capitalize">{uc.useCase.replace(/-/g, ' ')}</span>
                    </div>
                  ))}
                </div>
              )}

              <Link
                href={`/case-studies/${cs.slug}`}
                className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#fb4d01] hover:underline mt-auto"
              >
                Read full case study →
              </Link>
            </div>

            {/* Right: metrics */}
            {cs.metrics?.length > 0 && (
              <div className="flex flex-col justify-center gap-4">
                {cs.metrics.map((m) => (
                  <div key={m.label} className="bg-black/30 rounded-xl border border-white/5 p-5">
                    <p className="text-3xl font-black text-[#fb4d01]">{m.value}</p>
                    <p className="text-[12px] text-white/50 mt-1">{m.label}</p>
                    {m.period && <p className="text-[11px] text-white/30">{m.period}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          {caseStudies.length > 1 && (
            <div className="flex items-center justify-center gap-3 mt-6 pt-6 border-t border-white/10">
              <button
                onClick={() => { prev(); setPaused(true); }}
                className="w-8 h-8 rounded-full border border-white/15 hover:border-white/30 flex items-center justify-center text-white/50 hover:text-white transition-all"
              >
                ←
              </button>
              <div className="flex gap-2">
                {caseStudies.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setActive(i); setPaused(true); }}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === active ? 16 : 6,
                      height: 6,
                      backgroundColor: i === active ? '#fb4d01' : 'rgba(255,255,255,0.2)',
                    }}
                  />
                ))}
              </div>
              <button
                onClick={() => { next(); setPaused(true); }}
                className="w-8 h-8 rounded-full border border-white/15 hover:border-white/30 flex items-center justify-center text-white/50 hover:text-white transition-all"
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
