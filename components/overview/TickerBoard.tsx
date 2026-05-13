'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Token {
  symbol: string;
  price: number;
  logo?: string;
  chains?: string[];
}

function formatPrice(p: number): string {
  if (p >= 1000) return `$${p.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  if (p >= 1)    return `$${p.toFixed(2)}`;
  if (p >= 0.01) return `$${p.toFixed(3)}`;
  return `$${p.toFixed(6)}`;
}

function TokenImg({ logo, symbol }: { logo?: string; symbol: string }) {
  const [err, setErr] = useState(false);
  if (!logo || err) {
    return (
      <div className="flex h-6 w-6 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-[8px] sm:text-[10px] font-bold text-white/40">
        {symbol.slice(0, 3)}
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={logo} alt={symbol} className="h-6 w-6 sm:h-8 sm:w-8 shrink-0 rounded-full object-contain"
      onError={() => setErr(true)} />
  );
}

const FALLBACK: Token[] = [
  { symbol: 'BTC',   price: 95000, logo: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png' },
  { symbol: 'ETH',   price: 3400,  logo: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png' },
  { symbol: 'SOL',   price: 172,   logo: 'https://coin-images.coingecko.com/coins/images/4128/small/solana.png' },
  { symbol: 'USDC',  price: 1.00,  logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png' },
  { symbol: 'USDT',  price: 1.00,  logo: 'https://coin-images.coingecko.com/coins/images/325/small/Tether.png' },
  { symbol: 'NEAR',  price: 4.2,   logo: 'https://coin-images.coingecko.com/coins/images/10365/small/near_icon.png' },
  { symbol: 'ZEC',   price: 42,    logo: 'https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png' },
  { symbol: 'BNB',   price: 620,   logo: 'https://coin-images.coingecko.com/coins/images/825/small/bnb-icon2_2x.png' },
  { symbol: 'MATIC', price: 0.55,  logo: 'https://coin-images.coingecko.com/coins/images/4713/small/polygon.png' },
  { symbol: 'AVAX',  price: 37,    logo: 'https://coin-images.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png' },
  { symbol: 'TON',   price: 5.8,   logo: 'https://coin-images.coingecko.com/coins/images/17980/small/photo_2023-11-22_15-29-56.jpg' },
  { symbol: 'DOGE',  price: 0.18,  logo: 'https://coin-images.coingecko.com/coins/images/5/small/dogecoin.png' },
  { symbol: 'DOT',   price: 7.2,   logo: 'https://coin-images.coingecko.com/coins/images/12171/small/polkadot.png' },
  { symbol: 'TRX',   price: 0.11,  logo: 'https://coin-images.coingecko.com/coins/images/1094/small/tron-logo.png' },
  { symbol: 'LTC',   price: 89,    logo: 'https://coin-images.coingecko.com/coins/images/2/small/litecoin.png' },
  { symbol: 'XRP',   price: 2.1,   logo: 'https://coin-images.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png' },
  { symbol: 'ADA',   price: 0.72,  logo: 'https://coin-images.coingecko.com/coins/images/975/small/cardano.png' },
  { symbol: 'LINK',  price: 14,    logo: 'https://coin-images.coingecko.com/coins/images/877/small/chainlink-new-logo.png' },
  { symbol: 'SUI',   price: 3.8,   logo: 'https://coin-images.coingecko.com/coins/images/26375/small/sui_asset.jpeg' },
  { symbol: 'DASH',  price: 31,    logo: 'https://coin-images.coingecko.com/coins/images/19/small/dash-logo.png' },
  { symbol: 'BCH',   price: 420,   logo: 'https://coin-images.coingecko.com/coins/images/780/small/bitcoin-cash-circle-crop.png' },
  { symbol: 'XLM',   price: 0.28,  logo: 'https://coin-images.coingecko.com/coins/images/100/small/Stellar_symbol_black_RGB.png' },
  { symbol: 'ARB',   price: 0.82,  logo: 'https://coin-images.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg' },
  { symbol: 'OP',    price: 1.5,   logo: 'https://coin-images.coingecko.com/coins/images/25244/small/Optimism.png' },
];

const INITIAL_COUNT = 24;

export default function TickerBoard() {
  const [tokens, setTokens] = useState<Token[]>(FALLBACK);
  const [expanded, setExpanded] = useState(false);
  const [hoveredSymbol, setHoveredSymbol] = useState<string | null>(null);
  const [clickedSymbol, setClickedSymbol] = useState<string | null>(null);
  const [imgErrors, setImgErrors] = useState<Set<string>>(new Set());
  const hoverRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch('/api/tokens')
      .then((r) => r.json())
      .then((data) => {
        const list: Token[] = (data?.tokens ?? data ?? [])
          .filter((t: { price?: number }) => t.price && t.price > 0)
          .slice(0, 50)
          .map((t: { symbol?: string; defuseAssetId?: string; price?: number; icon?: string }) => ({
            symbol: t.symbol ?? t.defuseAssetId?.split(':').pop() ?? '?',
            price: t.price ?? 0,
            logo: t.icon,
          }));
        if (list.length > 0) setTokens(list);
      })
      .catch(() => {});
  }, []);

  const displayTokens = expanded ? tokens : tokens.slice(0, INITIAL_COUNT);
  const hiddenCount = tokens.length - INITIAL_COUNT;

  const handleImgError = (id: string) => setImgErrors((s) => new Set(s).add(id));

  const toggleClick = (symbol: string) => {
    setClickedSymbol((s) => s === symbol ? null : symbol);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mb-6 text-center sm:mb-8">
        <h2 className="text-xl font-bold text-white sm:text-2xl">Live Supported Assets</h2>
        <p className="mt-1 text-sm text-white/60 sm:text-base">
          Across 31 chains — hover to see cross-chain availability
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-6">
        {displayTokens.map((token) => {
          const isActive = hoveredSymbol === token.symbol || clickedSymbol === token.symbol;
          return (
            <div key={token.symbol} className="relative">
              <button
                className={`flex w-full items-center gap-2.5 rounded-lg border bg-[#242424] px-3 py-2.5 text-left shadow-sm transition-all sm:gap-3 sm:px-4 sm:py-3 ${
                  isActive
                    ? 'border-[#fb4d01]/40 bg-[#fb4d01]/10 shadow-md z-20'
                    : 'border-white/10 hover:border-[#fb4d01]/30'
                }`}
                onMouseEnter={() => { hoverRef.current = setTimeout(() => setHoveredSymbol(token.symbol), 50); }}
                onMouseLeave={() => { if (hoverRef.current) clearTimeout(hoverRef.current); setHoveredSymbol(null); }}
                onClick={() => toggleClick(token.symbol)}
                onFocus={() => setHoveredSymbol(token.symbol)}
                onBlur={() => setHoveredSymbol(null)}
              >
                {token.logo && !imgErrors.has(token.symbol) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={token.logo} alt={token.symbol}
                    className="h-6 w-6 sm:h-8 sm:w-8 shrink-0 rounded-full object-contain"
                    onError={() => handleImgError(token.symbol)} />
                ) : (
                  <TokenImg logo={undefined} symbol={token.symbol} />
                )}
                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs font-semibold text-white sm:text-sm">{token.symbol}</div>
                  <div className="text-[10px] text-white/40 sm:text-xs">{formatPrice(token.price)}</div>
                </div>
              </button>

              {/* Popover */}
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
            {expanded ? (
              <>Show less <ChevronUp size={16} /></>
            ) : (
              <>Show more assets <ChevronDown size={16} /></>
            )}
          </button>
        </div>
      )}
    </section>
  );
}
