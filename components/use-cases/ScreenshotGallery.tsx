'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import type { Screenshot } from '@/lib/types/content';

interface Props {
  screenshots: Screenshot[];
}

export default function ScreenshotGallery({ screenshots }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const close = useCallback(() => setSelected(null), []);
  const prev = useCallback(() =>
    setSelected((i) => (i !== null ? (i - 1 + screenshots.length) % screenshots.length : null)),
    [screenshots.length]);
  const next = useCallback(() =>
    setSelected((i) => (i !== null ? (i + 1) % screenshots.length : null)),
    [screenshots.length]);

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

  if (!screenshots?.length) return null;

  const shot = selected !== null ? screenshots[selected] : null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {screenshots.map((s, i) => (
          <div
            key={i}
            className="group rounded-xl border border-white/10 overflow-hidden cursor-pointer bg-white/5"
            onClick={() => setSelected(i)}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={s.src}
                alt={s.caption}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Zoom hint overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-lg">
                  ⤢
                </span>
              </div>
            </div>
            <div className="px-3 py-2.5">
              {s.source && (
                <p className="text-[10px] font-semibold text-[#fb4d01] uppercase tracking-wider mb-0.5">
                  {s.source}
                </p>
              )}
              <p className="text-[11px] text-white/50 leading-relaxed line-clamp-2">{s.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {shot && selected !== null && (
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

          {screenshots.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                onClick={(e) => { e.stopPropagation(); prev(); }}
              >
                ←
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                onClick={(e) => { e.stopPropagation(); next(); }}
              >
                →
              </button>
            </>
          )}

          <div
            className="flex flex-col items-center gap-4 max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-h-[75vh] rounded-xl overflow-hidden">
              <Image
                src={shot.src}
                alt={shot.caption}
                width={1200}
                height={900}
                className="w-full h-auto max-h-[75vh] object-contain rounded-xl"
              />
            </div>
            <div className="text-center">
              {shot.source && (
                <p className="text-[11px] font-semibold text-[#fb4d01] uppercase tracking-wider mb-1">
                  {shot.source}
                </p>
              )}
              <p className="text-[13px] text-white/60">{shot.caption}</p>
            </div>
            {screenshots.length > 1 && (
              <div className="flex gap-2">
                {screenshots.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelected(i)}
                    className="w-2 h-2 rounded-full transition-all"
                    style={{ backgroundColor: i === selected ? '#fb4d01' : 'rgba(255,255,255,0.3)' }}
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
