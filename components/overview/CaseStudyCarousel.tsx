'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { CaseStudy } from '@/lib/types/content';

interface Props {
  caseStudies: CaseStudy[];
}

export default function CaseStudyCarousel({ caseStudies }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [logoErrors, setLogoErrors] = useState<Set<string>>(new Set());
  const [screenshotErrors, setScreenshotErrors] = useState<Set<string>>(new Set());

  const goTo = useCallback((i: number) => setActiveIndex(i), []);
  const next = useCallback(() => setActiveIndex((i) => (i + 1) % caseStudies.length), [caseStudies.length]);
  const prev = useCallback(() => setActiveIndex((i) => (i - 1 + caseStudies.length) % caseStudies.length), [caseStudies.length]);

  useEffect(() => {
    if (paused || caseStudies.length <= 1) return;
    const t = setInterval(next, 8000);
    return () => clearInterval(t);
  }, [paused, next, caseStudies.length]);

  if (!caseStudies.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between sm:mb-8">
        <div>
          <h2 className="text-xl font-bold text-white sm:text-2xl">Case Studies</h2>
          <p className="mt-1 text-sm text-white/60">Real partners building with NEAR Intents</p>
        </div>
        <Link href="/case-studies" className="text-sm font-medium text-[#fb4d01] hover:underline">
          View all →
        </Link>
      </div>

      <div
        className="overflow-hidden rounded-2xl border border-white/10 bg-[#242424] shadow-sm"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Stack all slides in the same grid cell so height = tallest slide */}
        <div className="grid">
          {caseStudies.map((cs, idx) => {
            const screenshots: string[] = (cs.useCases?.[0]?.screenshots ?? []).filter(Boolean).slice(0, 2);
            const isActive = idx === activeIndex;
            return (
              <div
                key={cs.slug}
                className={`col-start-1 row-start-1 grid grid-cols-1 lg:grid-cols-2 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                aria-hidden={!isActive}
              >
                {/* Left: info panel */}
                <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
                  <div>
                    {/* Partner header */}
                    <div className="mb-4 flex items-center gap-4 sm:mb-5">
                      {cs.logo && !logoErrors.has(cs.slug) ? (
                        <Image
                          src={cs.logo}
                          alt={`${cs.name} logo`}
                          width={64}
                          height={64}
                          className="h-14 w-14 rounded-xl shadow-sm sm:h-16 sm:w-16 object-contain bg-white/5 p-1"
                          onError={() => setLogoErrors((s) => new Set(s).add(cs.slug))}
                        />
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 text-lg font-bold text-white/40 sm:h-16 sm:w-16">
                          {cs.name.slice(0, 2)}
                        </div>
                      )}
                      <div>
                        <h3 className="text-xl font-bold text-white sm:text-2xl">{cs.name}</h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-white/60 leading-relaxed sm:text-base">{cs.description}</p>

                    {/* Use cases list */}
                    {cs.useCases?.length > 0 && (
                      <div className="mt-5 space-y-2 sm:mt-6">
                        {cs.useCases.slice(0, 3).map((uc) => (
                          <div key={uc.useCase} className="flex items-baseline gap-2.5">
                            <div className="h-1.5 w-1.5 shrink-0 translate-y-[-1px] rounded-full bg-[#fb4d01]" />
                            <Link
                              href={`/use-cases/${uc.useCase}`}
                              className="text-sm text-white hover:text-[#fb4d01] transition-colors"
                              tabIndex={isActive ? 0 : -1}
                            >
                              <span className="font-medium capitalize">{uc.useCase.replace(/-/g, ' ')}</span>
                              {uc.summary && (
                                <span className="text-white/50"> — {uc.summary.slice(0, 60)}{uc.summary.length > 60 ? '…' : ''}</span>
                              )}
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="mt-6 sm:mt-8">
                    <Link
                      href={`/case-studies/${cs.slug}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#fb4d01] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                      tabIndex={isActive ? 0 : -1}
                    >
                      Read full case study
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>

                {/* Right: screenshots panel */}
                <div className="flex items-center justify-center border-t border-white/10 bg-[#1a1a1a] p-6 sm:p-8 lg:border-l lg:border-t-0 min-h-[200px] overflow-hidden">
                  {screenshots.length > 0 ? (
                    <div className={`flex max-h-full ${screenshots.length === 1 ? 'items-center justify-center' : 'items-end gap-3 sm:gap-4 justify-center'}`}>
                      {screenshots.map((src, i) => (
                        !screenshotErrors.has(src) ? (
                          <Link
                            key={i}
                            href={`/case-studies/${cs.slug}`}
                            className={`overflow-hidden rounded-xl shadow-lg transition-transform hover:scale-[1.02] ${
                              screenshots.length >= 3 ? 'max-w-[130px] sm:max-w-[160px]' :
                              screenshots.length === 2 ? 'max-w-[170px] sm:max-w-[200px]' : ''
                            }`}
                            tabIndex={isActive ? 0 : -1}
                          >
                            <Image
                              src={src}
                              alt={`${cs.name} screenshot ${i + 1}`}
                              width={200}
                              height={300}
                              className={`h-auto w-full rounded-xl ${screenshots.length === 1 ? 'max-h-[400px] object-contain' : ''}`}
                              onError={() => setScreenshotErrors((s) => new Set(s).add(src))}
                            />
                          </Link>
                        ) : null
                      ))}
                    </div>
                  ) : (
                    cs.logo && !logoErrors.has(`fallback-${cs.slug}`) ? (
                      <Image
                        src={cs.logo}
                        alt={cs.name}
                        width={80}
                        height={80}
                        className="h-20 w-20 rounded-2xl opacity-30 object-contain"
                        onError={() => setLogoErrors((s) => new Set(s).add(`fallback-${cs.slug}`))}
                      />
                    ) : null
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        {caseStudies.length > 1 && (
          <div className="flex items-center justify-between border-t border-white/10 px-6 py-3 sm:px-8">
            <button
              onClick={() => { prev(); setPaused(true); }}
              className="rounded-full p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
              {caseStudies.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { goTo(i); setPaused(true); }}
                  className={`h-2 rounded-full transition-all ${i === activeIndex ? 'w-6 bg-[#fb4d01]' : 'w-2 bg-white/20 hover:bg-white/30'}`}
                  aria-label={`Go to case study ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => { next(); setPaused(true); }}
              className="rounded-full p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
