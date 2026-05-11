'use client';

import { useState, useEffect } from 'react';
import TokenLogo from './TokenLogo';

const SCENARIOS = [
  { from: { symbol: 'ZEC', logo: 'https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png', amount: '10.0' },
    to:   { symbol: 'BTC', logo: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png', amount: '0.0089' } },
  { from: { symbol: 'ETH', logo: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png', amount: '1.0' },
    to:   { symbol: 'SOL', logo: 'https://coin-images.coingecko.com/coins/images/4128/small/solana.png', amount: '6.23' } },
  { from: { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png', amount: '1,000' },
    to:   { symbol: 'ETH', logo: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png', amount: '0.294' } },
  { from: { symbol: 'BTC', logo: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png', amount: '0.5' },
    to:   { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png', amount: '30,821' } },
];

export default function SwapDemo() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [tab, setTab] = useState<'sign' | 'deposit'>('sign');

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIndex(i => (i + 1) % SCENARIOS.length); setVisible(true); }, 320);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  const s = SCENARIOS[index];

  return (
    <div className="bg-[#242424] rounded-2xl border border-white/10 overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-white/10">
        {(['sign', 'deposit'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-3 text-[12px] font-semibold uppercase tracking-wider transition-colors ${tab === t ? 'text-[#fb4d01] border-b-2 border-[#fb4d01]' : 'text-white/40 hover:text-white/60'}`}>
            {t === 'sign' ? 'Sign & Swap' : 'Deposit Address'}
          </button>
        ))}
      </div>

      <div className="p-6">
        <div
          className="transition-opacity duration-300"
          style={{ opacity: visible ? 1 : 0 }}
        >
          {/* You pay */}
          <div className="bg-black/30 rounded-xl border border-white/5 p-4 mb-2">
            <p className="text-[10px] text-white/40 uppercase tracking-wider mb-2">You pay</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TokenLogo logo={s.from.logo} symbol={s.from.symbol} size={32} />
                <span className="font-bold text-white text-[15px]">{s.from.symbol}</span>
              </div>
              <span className="font-mono text-white text-[18px] font-semibold">{s.from.amount}</span>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center my-2 text-white/20 text-lg">↓</div>

          {/* You receive */}
          <div className="bg-[#fb4d01]/8 rounded-xl border border-[#fb4d01]/20 p-4 mb-5">
            <p className="text-[10px] text-[#fb4d01]/70 uppercase tracking-wider mb-2">You receive</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TokenLogo logo={s.to.logo} symbol={s.to.symbol} size={32} />
                <span className="font-bold text-white text-[15px]">{s.to.symbol}</span>
              </div>
              <span className="font-mono text-[#fb4d01] text-[18px] font-semibold">{s.to.amount}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-white/30 mb-4">
          <span>Via NEAR Intents</span>
          <span>~30 seconds</span>
        </div>

        <button className="w-full bg-[#fb4d01] hover:bg-[#e04401] text-black font-bold text-[13px] uppercase tracking-widest py-3 rounded-xl transition-colors">
          {tab === 'sign' ? 'Sign & Swap' : 'Get Deposit Address'}
        </button>
      </div>
    </div>
  );
}
