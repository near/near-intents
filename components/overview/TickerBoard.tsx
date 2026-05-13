'use client';

import { useState, useEffect } from 'react';

interface Token {
  symbol: string;
  price: number;
  logo?: string;
}

function formatPrice(p: number): string {
  if (p >= 1000) return `$${p.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  if (p >= 1)    return `$${p.toFixed(2)}`;
  if (p >= 0.01) return `$${p.toFixed(4)}`;
  return `$${p.toFixed(6)}`;
}

function TokenLogo({ logo, symbol }: { logo?: string; symbol: string }) {
  const [err, setErr] = useState(false);
  if (!logo || err) {
    return (
      <div className="w-8 h-8 rounded-full bg-[#fb4d01]/20 flex items-center justify-center text-[10px] font-bold text-[#fb4d01] shrink-0">
        {symbol.slice(0, 2)}
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={logo} alt={symbol} width={32} height={32}
      className="w-8 h-8 rounded-full object-contain"
      onError={() => setErr(true)}
    />
  );
}

const FALLBACK_TOKENS: Token[] = [
  { symbol: 'BTC',  price: 95000, logo: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png' },
  { symbol: 'ETH',  price: 3400,  logo: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png' },
  { symbol: 'SOL',  price: 172,   logo: 'https://coin-images.coingecko.com/coins/images/4128/small/solana.png' },
  { symbol: 'USDC', price: 1.00,  logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png' },
  { symbol: 'USDT', price: 1.00,  logo: 'https://coin-images.coingecko.com/coins/images/325/small/Tether.png' },
  { symbol: 'NEAR', price: 4.2,   logo: 'https://coin-images.coingecko.com/coins/images/10365/small/near_icon.png' },
  { symbol: 'ZEC',  price: 42,    logo: 'https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png' },
  { symbol: 'BNB',  price: 620,   logo: 'https://coin-images.coingecko.com/coins/images/825/small/bnb-icon2_2x.png' },
  { symbol: 'MATIC',price: 0.55,  logo: 'https://coin-images.coingecko.com/coins/images/4713/small/polygon.png' },
  { symbol: 'AVAX', price: 37,    logo: 'https://coin-images.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png' },
  { symbol: 'TON',  price: 5.8,   logo: 'https://coin-images.coingecko.com/coins/images/17980/small/photo_2023-11-22_15-29-56.jpg' },
  { symbol: 'DOGE', price: 0.18,  logo: 'https://coin-images.coingecko.com/coins/images/5/small/dogecoin.png' },
];

export default function TickerBoard() {
  const [tokens, setTokens] = useState<Token[]>(FALLBACK_TOKENS);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch('/api/tokens')
      .then((r) => r.json())
      .then((data) => {
        const list: Token[] = (data?.tokens ?? data ?? [])
          .filter((t: { price?: number; defuseAssetId?: string }) => t.price && t.price > 0)
          .slice(0, 30)
          .map((t: { symbol?: string; defuseAssetId?: string; price?: number; icon?: string }) => ({
            symbol: t.symbol ?? t.defuseAssetId?.split(':').pop() ?? '?',
            price: t.price ?? 0,
            logo: t.icon,
          }));
        if (list.length > 0) setTokens(list);
      })
      .catch(() => {}) // keep fallback
      .finally(() => setLoading(false));
  }, []);

  const displayed = showAll ? tokens : tokens.slice(0, 12);

  return (
    <section className="py-16 md:py-20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-2">
            100+ Assets
          </h2>
          <p className="text-white/50 text-[14px]">Available across 31 chains via NEAR Intents</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {displayed.map((t) => (
            <div
              key={t.symbol}
              className={`flex items-center gap-2.5 bg-[#242424] rounded-xl border border-white/10 p-3 hover:border-[#fb4d01]/30 transition-colors ${loading ? 'animate-pulse' : ''}`}
            >
              <TokenLogo logo={t.logo} symbol={t.symbol} />
              <div className="min-w-0">
                <p className="font-bold text-[13px] text-white truncate">{t.symbol}</p>
                <p className="text-[11px] text-white/50">{formatPrice(t.price)}</p>
              </div>
            </div>
          ))}
        </div>

        {tokens.length > 12 && (
          <button
            onClick={() => setShowAll((s) => !s)}
            className="mt-5 text-[13px] font-semibold text-[#fb4d01] hover:underline"
          >
            {showAll ? 'Show less' : `Show ${tokens.length - 12} more assets`}
          </button>
        )}
      </div>
    </section>
  );
}
