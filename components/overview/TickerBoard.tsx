'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Display merging — same as near-intents-std mergeIntoParent
const MERGE_INTO_PARENT: Record<string, string> = {
  WETH: 'ETH', wETH: 'ETH',
  WNEAR: 'NEAR', wNEAR: 'NEAR',
};

interface Token {
  symbol: string;
  price: number;
  logo?: string;
}

function formatPrice(p: number): string {
  if (p >= 1000) return `$${p.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  if (p >= 1)    return `$${p.toFixed(2)}`;
  if (p >= 0.01) return `$${p.toFixed(3)}`;
  return `$${p.toFixed(6)}`;
}

function TokenImg({ logo, symbol, onError }: { logo?: string; symbol: string; onError: () => void }) {
  if (!logo) {
    return (
      <div className="flex h-6 w-6 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-[8px] sm:text-[10px] font-bold text-white/40">
        {symbol.slice(0, 3)}
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={logo} alt={symbol}
      className="h-6 w-6 sm:h-8 sm:w-8 shrink-0 rounded-full object-contain"
      onError={onError}
    />
  );
}

const INITIAL_COUNT = 24;

export default function TickerBoard() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [hoveredSymbol, setHoveredSymbol] = useState<string | null>(null);
  const [clickedSymbol, setClickedSymbol] = useState<string | null>(null);
  const [imgErrors, setImgErrors] = useState<Set<string>>(new Set());
  const hoverRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch('/api/tokens')
      .then((r) => r.json())
      .then((data) => {
        const list: Token[] = (Array.isArray(data) ? data : [])
          .filter((t: { price?: number }) => (t.price ?? 0) > 0)
          .map((t: { symbol: string; price: number; logo?: string }) => ({
            symbol: MERGE_INTO_PARENT[t.symbol] ?? t.symbol,
            price: t.price,
            logo: t.logo,
          }))
          .filter((t, idx, arr) => arr.findIndex((x) => x.symbol === t.symbol) === idx)
          .slice(0, 50);
        if (list.length > 0) setTokens(list);
      })
      .catch(() => {});
  }, []);

  const displayTokens = expanded ? tokens : tokens.slice(0, INITIAL_COUNT);
  const hiddenCount = tokens.length - INITIAL_COUNT;

  const handleImgError = (symbol: string) =>
    setImgErrors((s) => new Set(s).add(symbol));

  const toggleClick = (symbol: string) =>
    setClickedSymbol((s) => s === symbol ? null : symbol);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mb-6 text-center sm:mb-8">
        <h2 className="text-xl font-bold text-white sm:text-2xl">Live Supported Assets</h2>
        <p className="hidden mt-1 text-sm text-white/60 sm:text-base">
          Across 31 chains — hover to see cross-chain availability
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-6">
        {displayTokens.map((token, i) => {
          const isActive = hoveredSymbol === token.symbol || clickedSymbol === token.symbol;
          const hasErr = imgErrors.has(`${token.symbol}-${i}`);
          return (
            <div key={`${token.symbol}-${i}`} className="relative">
              <button
                className={`flex w-full items-center gap-2.5 rounded-lg border bg-[#242424] px-3 py-2.5 text-left shadow-sm transition-all sm:gap-3 sm:px-4 sm:py-3 ${
                  isActive
                    ? 'border-white/20 shadow-md z-20'
                    : 'border-white/10 hover:border-white/20'
                }`}
                onMouseEnter={() => { hoverRef.current = setTimeout(() => setHoveredSymbol(token.symbol), 50); }}
                onMouseLeave={() => { if (hoverRef.current) clearTimeout(hoverRef.current); setHoveredSymbol(null); }}
                onClick={() => toggleClick(token.symbol)}
                onFocus={() => setHoveredSymbol(token.symbol)}
                onBlur={() => setHoveredSymbol(null)}
              >
                <TokenImg
                  logo={hasErr ? undefined : token.logo}
                  symbol={token.symbol}
                  onError={() => handleImgError(`${token.symbol}-${i}`)}
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs font-semibold text-white sm:text-sm">{token.symbol}</div>
                  <div className="text-[10px] text-white/40 sm:text-xs">{formatPrice(token.price)}</div>
                </div>
              </button>

              {/* Popover — disabled, re-enable by uncommenting
              {isActive && (
                <div
                  className="absolute left-0 right-0 top-full z-30 mt-1 rounded-lg border border-white/10 bg-[#242424] p-2 shadow-lg sm:p-2.5"
                  onMouseEnter={() => setHoveredSymbol(token.symbol)}
                  onMouseLeave={() => setHoveredSymbol(null)}
                >
                  <div className="mb-1 text-[9px] font-medium text-white/40 sm:text-[10px]">
                    Available on 31 chains
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {['Ethereum', 'Bitcoin', 'Solana', 'Base', 'Arbitrum'].map((chain) => (
                      <div key={chain} className="flex items-center gap-0.5 rounded-full bg-white/5 px-1.5 py-0.5">
                        <span className="text-[8px] text-white/40 sm:text-[9px]">{chain}</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-0.5 rounded-full bg-white/5 px-1.5 py-0.5">
                      <span className="text-[8px] text-white/40 sm:text-[9px]">+26 more</span>
                    </div>
                  </div>
                </div>
              )}
              */}
            </div>
          );
        })}
      </div>

      {hiddenCount > 0 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setExpanded((e) => !e)}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#242424] px-4 py-2 text-sm font-medium text-white/60 shadow-sm transition-colors hover:border-[#fb4d01]/30 hover:text-white"
          >
            {expanded ? <>Show less <ChevronUp size={16} /></> : <>Show more assets <ChevronDown size={16} /></>}
          </button>
        </div>
      )}
    </section>
  );
}
