'use client';

import { useState, useRef } from 'react';
import { chains } from '@/lib/data/chains';

const CHAIN_ASSETS: Record<string, Array<{ symbol: string; logo: string }>> = {
  ethereum:    [{ symbol: 'ETH',  logo: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png' }, { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png' }, { symbol: 'USDT', logo: 'https://coin-images.coingecko.com/coins/images/325/small/Tether.png' }, { symbol: 'WBTC', logo: 'https://coin-images.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png' }],
  bitcoin:     [{ symbol: 'BTC',  logo: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png' }],
  solana:      [{ symbol: 'SOL',  logo: 'https://coin-images.coingecko.com/coins/images/4128/small/solana.png' }, { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png' }],
  base:        [{ symbol: 'ETH',  logo: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png' }, { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png' }, { symbol: 'cbBTC', logo: 'https://coin-images.coingecko.com/coins/images/40143/small/cbbtc.webp' }],
  arbitrum:    [{ symbol: 'ETH',  logo: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png' }, { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png' }],
  near:        [{ symbol: 'NEAR', logo: 'https://coin-images.coingecko.com/coins/images/10365/small/near_icon.png' }, { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png' }],
  zcash:       [{ symbol: 'ZEC',  logo: 'https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png' }],
  ton:         [{ symbol: 'TON',  logo: 'https://coin-images.coingecko.com/coins/images/17980/small/photo_2023-11-22_15-29-56.jpg' }, { symbol: 'USDT', logo: 'https://coin-images.coingecko.com/coins/images/325/small/Tether.png' }],
  dogecoin:    [{ symbol: 'DOGE', logo: 'https://coin-images.coingecko.com/coins/images/5/small/dogecoin.png' }],
  tron:        [{ symbol: 'TRX',  logo: 'https://coin-images.coingecko.com/coins/images/1094/small/tron-logo.png' }, { symbol: 'USDT', logo: 'https://coin-images.coingecko.com/coins/images/325/small/Tether.png' }],
  polygon:     [{ symbol: 'MATIC',logo: 'https://coin-images.coingecko.com/coins/images/4713/small/polygon.png' }, { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png' }],
  bnb:         [{ symbol: 'BNB',  logo: 'https://coin-images.coingecko.com/coins/images/825/small/bnb-icon2_2x.png' }, { symbol: 'USDT', logo: 'https://coin-images.coingecko.com/coins/images/325/small/Tether.png' }],
};

function ChainImg({ logo, name, color }: { logo: string; name: string; color: string }) {
  const [err, setErr] = useState(false);
  if (!logo || err) {
    return (
      <div
        className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full text-[10px] font-bold text-white sm:text-xs"
        style={{ backgroundColor: color + '40' }}
      >
        {name.slice(0, 3).toUpperCase()}
      </div>
    );
  }
  if (logo.startsWith('/')) {
    return (
      <div
        className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full p-2"
        style={{ backgroundColor: color + '40' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt={name} className="w-full h-full object-contain" onError={() => setErr(true)} />
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={logo} alt={name} className="h-10 w-10 sm:h-12 sm:w-12 rounded-full shadow-sm object-contain"
      onError={() => setErr(true)} />
  );
}

export default function ChainGrid() {
  const [hoveredChain, setHoveredChain] = useState<string | null>(null);
  const [clickedChain, setClickedChain] = useState<string | null>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
  const [assetImgErrors, setAssetImgErrors] = useState<Set<string>>(new Set());

  const activeSlug = hoveredChain ?? clickedChain;
  const activeChain = chains.find((c) => c.slug === activeSlug);
  const activeAssets = activeSlug ? (CHAIN_ASSETS[activeSlug] ?? []) : [];
  const isOpen = !!activeSlug;

  const toggleClick = (slug: string) => {
    setClickedChain((s) => s === slug ? null : slug);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mb-6 text-center sm:mb-8">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          Supported Chains
        </h2>
      </div>

      <div className="relative">
        <div
          className="flex flex-wrap justify-center gap-4 sm:gap-5"
          onMouseLeave={() => {
            hoverTimeout.current = setTimeout(() => setHoveredChain(null), 150);
          }}
        >
          {chains.map((chain) => {
            const isActive = hoveredChain === chain.slug || clickedChain === chain.slug;
            return (
              <button
                key={chain.slug}
                className={`flex flex-col items-center gap-1.5 rounded-xl px-2 py-2 transition-all ${
                  isActive
                    ? 'bg-white/5 scale-110 shadow-md'
                    : 'hover:bg-white/5'
                } ${clickedChain === chain.slug ? 'ring-2 ring-white/20' : ''}`}
                onMouseEnter={() => {
                  if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
                  setHoveredChain(chain.slug);
                }}
                onClick={() => toggleClick(chain.slug)}
                onFocus={() => {
                  if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
                  setHoveredChain(chain.slug);
                }}
                onBlur={() => {
                  hoverTimeout.current = setTimeout(() => setHoveredChain(null), 150);
                }}
              >
                <ChainImg logo={chain.logo} name={chain.name} color={chain.color} />
                <span className="w-16 truncate text-center text-[10px] font-medium text-white/40 sm:text-xs">{chain.name}</span>
              </button>
            );
          })}
        </div>

        {/* Asset panel — hidden for now, keep for future use */}
        <div className="hidden">
        {activeChain && (
          <div className="rounded-xl border border-white/10 bg-[#242424] p-4 shadow-lg sm:p-5">
            <h3 className="mb-3 text-sm font-semibold text-white sm:text-base">
              {activeAssets.length > 0 ? activeAssets.length : '100+'} asset{activeAssets.length !== 1 ? 's' : ''} on{' '}
              <span className="text-[#fb4d01]">{activeChain.name}</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {activeAssets.length > 0 ? activeAssets.map((asset) => (
                <div
                  key={asset.symbol}
                  className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 sm:px-3 sm:py-1.5"
                >
                  {!assetImgErrors.has(`${activeSlug}-${asset.symbol}`) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={asset.logo} alt={asset.symbol}
                      className="h-4 w-4 sm:h-5 sm:w-5 rounded-full object-contain"
                      onError={() => setAssetImgErrors((s) => new Set(s).add(`${activeSlug}-${asset.symbol}`))} />
                  ) : (
                    <div className="h-4 w-4 rounded-full bg-white/10 sm:h-5 sm:w-5" />
                  )}
                  <span className="text-xs font-medium text-white sm:text-sm">{asset.symbol}</span>
                </div>
              )) : (
                <p className="text-sm text-white/40">100+ assets available on this chain</p>
              )}
            </div>
          </div>
        )}
        </div>
      </div>
    </section>
  );
}
