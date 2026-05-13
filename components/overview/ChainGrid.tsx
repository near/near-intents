'use client';

import { useState } from 'react';
import Image from 'next/image';
import { chains } from '@/lib/data/chains';

// A few representative assets per chain (symbol + CoinGecko logo)
const CHAIN_ASSETS: Record<string, Array<{ symbol: string; logo: string }>> = {
  ethereum:  [{ symbol: 'ETH', logo: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png' }, { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png' }, { symbol: 'USDT', logo: 'https://coin-images.coingecko.com/coins/images/325/small/Tether.png' }, { symbol: 'WBTC', logo: 'https://coin-images.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png' }],
  bitcoin:   [{ symbol: 'BTC', logo: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png' }],
  solana:    [{ symbol: 'SOL', logo: 'https://coin-images.coingecko.com/coins/images/4128/small/solana.png' }, { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png' }],
  base:      [{ symbol: 'ETH', logo: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png' }, { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png' }, { symbol: 'cbBTC', logo: 'https://coin-images.coingecko.com/coins/images/40143/small/cbbtc.webp' }],
  arbitrum:  [{ symbol: 'ETH', logo: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png' }, { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png' }],
  near:      [{ symbol: 'NEAR', logo: 'https://coin-images.coingecko.com/coins/images/10365/small/near_icon.png' }, { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png' }],
  zcash:     [{ symbol: 'ZEC', logo: 'https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png' }],
  ton:       [{ symbol: 'TON', logo: 'https://coin-images.coingecko.com/coins/images/17980/small/photo_2023-11-22_15-29-56.jpg' }, { symbol: 'USDT', logo: 'https://coin-images.coingecko.com/coins/images/325/small/Tether.png' }],
};

function ChainLogo({ logo, name, color }: { logo: string; name: string; color: string }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0"
        style={{ backgroundColor: color }}
      >
        {name.slice(0, 2)}
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={logo} alt={name} width={24} height={24}
      className="w-6 h-6 rounded-full object-contain shrink-0"
      onError={() => setErr(true)}
    />
  );
}

export default function ChainGrid() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const activeSlug = hoveredSlug;
  const activeChain = chains.find((c) => c.slug === activeSlug);
  const activeAssets = activeSlug ? (CHAIN_ASSETS[activeSlug] ?? []) : [];

  return (
    <section className="py-16 md:py-20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-2">
            31 Chains
          </h2>
          <p className="text-white/50 text-[14px]">Hover a chain to see available assets</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {chains.map((chain) => {
            const isActive = hoveredSlug === chain.slug;
            return (
              <button
                key={chain.slug}
                onMouseEnter={() => setHoveredSlug(chain.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
                className="flex items-center gap-2 rounded-full px-3 py-1.5 border text-[12px] font-medium transition-all duration-200"
                style={{
                  borderColor: isActive ? chain.color + '60' : 'rgba(255,255,255,0.1)',
                  backgroundColor: isActive ? chain.color + '15' : 'transparent',
                  color: isActive ? 'white' : 'rgba(255,255,255,0.5)',
                  transform: isActive ? 'scale(1.08)' : 'scale(1)',
                }}
              >
                <ChainLogo logo={chain.logo} name={chain.name} color={chain.color} />
                {chain.name}
              </button>
            );
          })}
        </div>

        {/* Asset panel */}
        <div
          className="overflow-hidden transition-all duration-300"
          style={{
            maxHeight: activeSlug ? '120px' : '0px',
            opacity: activeSlug ? 1 : 0,
            marginTop: activeSlug ? '16px' : '0px',
          }}
        >
          {activeChain && (
            <div
              className="bg-[#242424] rounded-xl border p-4"
              style={{ borderColor: activeChain.color + '30' }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider mb-3"
                style={{ color: activeChain.color }}>
                Assets on {activeChain.name}
              </p>
              <div className="flex flex-wrap gap-2">
                {activeAssets.map((asset) => (
                  <div key={asset.symbol} className="flex items-center gap-1.5 bg-white/5 rounded-full px-2.5 py-1 border border-white/8">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={asset.logo} alt={asset.symbol} width={16} height={16} className="w-4 h-4 rounded-full" />
                    <span className="text-[12px] text-white/70 font-medium">{asset.symbol}</span>
                  </div>
                ))}
                {activeAssets.length === 0 && (
                  <p className="text-[12px] text-white/40">100+ assets available</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
