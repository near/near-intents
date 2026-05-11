'use client';

import { useState, useEffect } from 'react';
import TokenLogo from './TokenLogo';

const SCENARIOS = [
  { from: { symbol: 'BTC',  logo: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png',        chain: 'Bitcoin', amount: '0.1'   },
    to:   { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png',        chain: 'Base',    amount: '8,160' } },
  { from: { symbol: 'ZEC',  logo: 'https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png', chain: 'Zcash',   amount: '5.0'   },
    to:   { symbol: 'BTC',  logo: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png',        chain: 'Bitcoin', amount: '0.0038'} },
  { from: { symbol: 'ETH',  logo: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png',     chain: 'Ethereum',amount: '1.0'   },
    to:   { symbol: 'SOL',  logo: 'https://coin-images.coingecko.com/coins/images/4128/small/solana.png',      chain: 'Solana',  amount: '6.23'  } },
  { from: { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png',        chain: 'Ethereum',amount: '1,000' },
    to:   { symbol: 'ETH',  logo: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png',     chain: 'Ethereum',amount: '0.294' } },
  { from: { symbol: 'BTC',  logo: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png',        chain: 'Bitcoin', amount: '0.5'   },
    to:   { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png',        chain: 'Solana',  amount: '30,821'} },
];

export default function SwapDemo() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [tab, setTab] = useState<'sign' | 'deposit'>('sign');

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIndex(i => (i + 1) % SCENARIOS.length); setVisible(true); }, 280);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  const s = SCENARIOS[index];

  return (
    <div className="bg-[#1e1e1e] rounded-2xl border border-white/10 overflow-hidden shadow-xl">
      {/* Tabs */}
      <div className="flex gap-2 p-3 pb-0">
        {(['sign', 'deposit'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="flex-1 py-2 text-[12px] font-semibold rounded-lg transition-all duration-200"
            style={{
              background: tab === t ? 'rgba(255,255,255,0.1)' : 'transparent',
              color: tab === t ? 'white' : 'rgba(255,255,255,0.35)',
              border: tab === t ? '1px solid rgba(255,255,255,0.15)' : '1px solid transparent',
            }}
          >
            {t === 'sign' ? 'Sign & Swap' : 'Deposit Address'}
          </button>
        ))}
      </div>

      {/* Inner card */}
      <div className="m-3 bg-[#2a2a2a] rounded-xl border border-white/8 overflow-hidden">
        {/* Card header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/8">
          <span className="font-bold text-[13px] text-white">Cross-Chain Swap</span>
          <span className="text-[11px] font-semibold bg-[#fb4d01]/15 text-[#fb4d01] border border-[#fb4d01]/30 rounded-full px-2.5 py-0.5">
            31 chains
          </span>
        </div>

        <div className="transition-opacity duration-[280ms]" style={{ opacity: visible ? 1 : 0 }}>
          {/* You Pay */}
          <div className="px-4 pt-3 pb-2">
            <p className="text-[10px] font-semibold text-white/35 uppercase tracking-widest mb-2">You Pay</p>
            <div className="flex items-center gap-3 bg-[#fb4d01]/8 border border-[#fb4d01]/15 rounded-xl px-3 py-2.5">
              <TokenLogo logo={s.from.logo} symbol={s.from.symbol} size={40} />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-[16px] leading-none">{s.from.symbol}</p>
                <p className="text-[11px] text-white/40 mt-0.5">{s.from.chain}</p>
              </div>
              <p className="font-mono font-semibold text-white text-[17px] shrink-0">{s.from.amount}</p>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center py-1">
            <div className="w-7 h-7 rounded-full border border-[#fb4d01]/50 flex items-center justify-center text-[#fb4d01] text-sm">
              ↓
            </div>
          </div>

          {/* You Receive */}
          <div className="px-4 pb-3 pt-1">
            <p className="text-[10px] font-semibold text-white/35 uppercase tracking-widest mb-2">You Receive</p>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5">
              <TokenLogo logo={s.to.logo} symbol={s.to.symbol} size={40} />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-[16px] leading-none">{s.to.symbol}</p>
                <p className="text-[11px] text-white/40 mt-0.5">{s.to.chain}</p>
              </div>
              <p className="font-mono font-semibold text-[#fb4d01] text-[17px] shrink-0">≈ {s.to.amount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="px-3 pb-3">
        <button className="w-full bg-[#fb4d01] hover:bg-[#e04401] text-white font-bold text-[14px] py-3 rounded-xl transition-colors">
          {tab === 'sign' ? 'Swap — 1 signature' : 'Get Deposit Address'}
        </button>
      </div>

      {/* Footer */}
      <div className="px-3 pb-3 text-center">
        <p className="text-[11px] text-white/30">
          Powered by{' '}
          <span className="text-[#fb4d01] font-semibold">NEAR Intents</span>
        </p>
      </div>

      {/* Dot pagination */}
      <div className="flex justify-center gap-1.5 pb-3">
        {SCENARIOS.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === index ? 16 : 6,
              height: 6,
              backgroundColor: i === index ? '#fb4d01' : 'rgba(255,255,255,0.15)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
