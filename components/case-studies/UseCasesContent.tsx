'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { CaseStudyUseCase } from '@/lib/types/content';

const UC_COLORS = [
  { border: 'border-blue-500/40',    bg: 'bg-blue-900/20',    text: 'text-blue-400' },
  { border: 'border-purple-500/40',  bg: 'bg-purple-900/20',  text: 'text-purple-400' },
  { border: 'border-emerald-500/40', bg: 'bg-emerald-900/20', text: 'text-emerald-400' },
  { border: 'border-amber-500/40',   bg: 'bg-amber-900/20',   text: 'text-amber-400' },
];

// Collect all screenshots across all use cases for global lightbox navigation
function collectAll(useCases: CaseStudyUseCase[]) {
  return useCases.flatMap((uc) =>
    (uc.screenshots ?? []).slice(0, 2).map((src, j) => ({
      src,
      caption: uc.captions?.[j] ?? '',
      label: uc.useCase.replace(/-/g, ' '),
    }))
  );
}

interface Props {
  useCases: CaseStudyUseCase[];
}

export default function UseCasesContent({ useCases }: Props) {
  const allImages = collectAll(useCases);
  const [selected, setSelected] = useState<number | null>(null);

  const close = useCallback(() => setSelected(null), []);
  const prev = useCallback(() =>
    setSelected((i) => (i !== null ? (i - 1 + allImages.length) % allImages.length : null)),
    [allImages.length]);
  const next = useCallback(() =>
    setSelected((i) => (i !== null ? (i + 1) % allImages.length : null)),
    [allImages.length]);

  useEffect(() => {
    if (selected === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selected, close, prev, next]);

  // Build a flat index map: for each (ucIndex, imgIndex) → globalIndex
  let globalIdx = 0;
  const indexMap: number[][] = useCases.map((uc) => {
    const screenshots = (uc.screenshots ?? []).slice(0, 2);
    const indices = screenshots.map(() => globalIdx++);
    return indices;
  });

  if (!useCases?.length) return null;

  const active = selected !== null ? allImages[selected] : null;

  return (
    <>
      <div className="space-y-6 sm:space-y-8">
        {useCases.map((uc, i) => {
          const c = UC_COLORS[i % UC_COLORS.length];
          const screenshots = (uc.screenshots ?? []).slice(0, 2);
          return (
            <div key={uc.useCase} className="overflow-hidden rounded-xl border border-white/10 bg-[#242424] shadow-sm">
              {/* Header */}
              <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4 sm:px-6">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${c.border} ${c.bg}`}>
                  <span className={`text-sm font-bold ${c.text}`}>{i + 1}</span>
                </div>
                <h3 className="flex-1 text-base font-semibold capitalize text-white sm:text-lg">
                  {uc.useCase.replace(/-/g, ' ')}
                </h3>
                <Link href={`/use-cases/${uc.useCase}`} className="text-xs font-medium text-[#fb4d01] hover:underline sm:text-sm">
                  Learn more →
                </Link>
              </div>

              {/* Content grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left: summary + flow */}
                <div className="p-5 sm:p-6">
                  <p className="text-sm leading-relaxed text-white/60 sm:text-base">{uc.summary}</p>
                  {uc.flow?.length > 0 && (
                    <div className="mt-4 sm:mt-5">
                      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-white/40">Flow</p>
                      <div className="flex flex-wrap items-center gap-2">
                        {uc.flow.map((step, j) => (
                          <span key={j} className="flex items-center gap-2">
                            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70">{step}</span>
                            {j < uc.flow.length - 1 && <span className="text-white/30 text-sm">→</span>}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right: screenshots */}
                <div className="flex items-center justify-center border-t border-white/10 bg-[#1a1a1a] p-4 sm:p-6 lg:border-l lg:border-t-0 min-h-[160px]">
                  {screenshots.length > 0 ? (
                    <div className={`flex max-h-full ${screenshots.length === 1 ? 'items-center justify-center' : 'items-end gap-3 sm:gap-4 justify-center'}`}>
                      {screenshots.map((src, j) => (
                        <button
                          key={j}
                          onClick={() => setSelected(indexMap[i][j])}
                          className={`group overflow-hidden rounded-xl shadow-lg transition-transform hover:scale-[1.02] cursor-zoom-in ${
                            screenshots.length >= 2 ? 'max-w-[180px] sm:max-w-[200px]' : 'max-w-full'
                          }`}
                        >
                          <Image
                            src={src}
                            alt={uc.captions?.[j] ?? ''}
                            width={200}
                            height={300}
                            className={`h-auto w-full rounded-xl ${screenshots.length === 1 ? 'max-h-[300px] object-contain' : ''}`}
                          />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex h-40 w-full max-w-[240px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 text-center">
                      <span className="text-2xl text-white/20">🔗</span>
                      <p className="mt-2 text-xs font-medium text-white/30">Integration screenshot</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {active && selected !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={close}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xl transition-colors"
            onClick={close}
          >
            ×
          </button>

          {allImages.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                onClick={(e) => { e.stopPropagation(); prev(); }}
              >←</button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                onClick={(e) => { e.stopPropagation(); next(); }}
              >→</button>
            </>
          )}

          <div className="flex flex-col items-center gap-4 max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full rounded-xl overflow-hidden">
              <Image
                src={active.src}
                alt={active.caption}
                width={900}
                height={700}
                className="w-full h-auto max-h-[78vh] object-contain rounded-xl"
              />
            </div>
            {(active.caption || active.label) && (
              <div className="text-center">
                <p className="text-[11px] font-semibold text-[#fb4d01] uppercase tracking-wider mb-1 capitalize">{active.label}</p>
                {active.caption && <p className="text-[13px] text-white/60">{active.caption}</p>}
              </div>
            )}
            {allImages.length > 1 && (
              <div className="flex gap-2">
                {allImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelected(idx)}
                    className="w-2 h-2 rounded-full transition-all"
                    style={{ backgroundColor: idx === selected ? '#fb4d01' : 'rgba(255,255,255,0.3)' }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
