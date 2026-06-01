'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ChainAsset {
  id: string;
  name: string;
  ticker: string;
  price: number;
  logoColorUrl: string;
}

function formatPrice(p: number): string {
  if (p >= 1000) return `$${p.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  if (p >= 1)    return `$${p.toFixed(2)}`;
  if (p >= 0.01) return `$${p.toFixed(3)}`;
  return `$${p.toFixed(6)}`;
}

function ChainImg({ url, ticker, onError }: { url: string; ticker: string; onError: () => void }) {
  if (!url) {
    return (
      <div className="flex h-6 w-6 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-[8px] sm:text-[10px] font-bold text-white/40">
        {ticker.slice(0, 3)}
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={ticker}
      className="h-6 w-6 sm:h-8 sm:w-8 shrink-0 rounded-full object-contain"
      onError={onError}
    />
  );
}

const INITIAL_COUNT = 24;

export default function AirtableChainBoard() {
  const [assets, setAssets] = useState<ChainAsset[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [clickedId, setClickedId] = useState<string | null>(null);
  const [imgErrors, setImgErrors] = useState<Set<string>>(new Set());
  const hoverRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch('/api/airtable-chains')
      .then(r => r.json())
      .then((data: ChainAsset[]) => {
        if (Array.isArray(data) && data.length > 0) setAssets(data);
      })
      .catch(() => {});
  }, []);

  const displayed = expanded ? assets : assets.slice(0, INITIAL_COUNT);
  const hiddenCount = assets.length - INITIAL_COUNT;

  const handleImgError = (id: string) =>
    setImgErrors(s => new Set(s).add(id));

  const toggleClick = (id: string) =>
    setClickedId(s => s === id ? null : id);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mb-6 text-center sm:mb-8">
        <h2 className="text-xl font-bold text-white sm:text-2xl">Supported Chains</h2>
        <p className="mt-1 text-sm text-white/60 sm:text-base">
          {assets.length > 0 ? `${assets.length} networks — prices from Airtable` : 'Loading chain data…'}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-6">
        {displayed.map(asset => {
          const isActive = hoveredId === asset.id || clickedId === asset.id;
          const hasErr = imgErrors.has(asset.id);
          return (
            <div key={asset.id} className="relative">
              <button
                className={`flex w-full items-center gap-2.5 rounded-lg border bg-[#242424] px-3 py-2.5 text-left shadow-sm transition-all sm:gap-3 sm:px-4 sm:py-3 ${
                  isActive
                    ? 'border-[#fb4d01]/40 bg-[#fb4d01]/10 shadow-md z-20'
                    : 'border-white/10 hover:border-[#fb4d01]/30'
                }`}
                onMouseEnter={() => { hoverRef.current = setTimeout(() => setHoveredId(asset.id), 50); }}
                onMouseLeave={() => { if (hoverRef.current) clearTimeout(hoverRef.current); setHoveredId(null); }}
                onClick={() => toggleClick(asset.id)}
                onFocus={() => setHoveredId(asset.id)}
                onBlur={() => setHoveredId(null)}
              >
                <ChainImg
                  url={hasErr ? '' : asset.logoColorUrl}
                  ticker={asset.ticker}
                  onError={() => handleImgError(asset.id)}
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs font-semibold text-white sm:text-sm">{asset.ticker}</div>
                  <div className="text-[10px] text-white/40 sm:text-xs">{formatPrice(asset.price)}</div>
                </div>
              </button>

              {isActive && (
                <div
                  className="absolute left-0 right-0 top-full z-30 mt-1 rounded-lg border border-white/10 bg-[#242424] p-2 shadow-lg sm:p-2.5"
                  onMouseEnter={() => setHoveredId(asset.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="mb-1 text-[9px] font-medium text-white/40 sm:text-[10px]">
                    {asset.name}
                  </div>
                  <div className="text-[9px] text-white/60 sm:text-[10px]">
                    {formatPrice(asset.price)}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {hiddenCount > 0 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setExpanded(e => !e)}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#242424] px-4 py-2 text-sm font-medium text-white/60 shadow-sm transition-colors hover:border-[#fb4d01]/30 hover:text-white"
          >
            {expanded ? <>Show less <ChevronUp size={16} /></> : <>Show more chains <ChevronDown size={16} /></>}
          </button>
        </div>
      )}
    </section>
  );
}
