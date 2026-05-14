'use client';

import { useState, useEffect } from 'react';
import TokenLogo from './TokenLogo';

const SCENARIOS = [
  { from: { symbol: 'ZEC', logo: 'https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png', chain: 'Zcash' },
    to:   { symbol: 'ZEC', logo: 'https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png', chain: 'Solana' } },
  { from: { symbol: 'BTC', logo: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png', chain: 'Bitcoin' },
    to:   { symbol: 'BTC', logo: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png', chain: 'TON' } },
  { from: { symbol: 'XRP', logo: 'https://coin-images.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png', chain: 'XRP Ledger' },
    to:   { symbol: 'XRP', logo: 'https://coin-images.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png', chain: 'Arbitrum' } },
  { from: { symbol: 'DOGE', logo: 'https://coin-images.coingecko.com/coins/images/5/small/dogecoin.png', chain: 'Dogecoin' },
    to:   { symbol: 'DOGE', logo: 'https://coin-images.coingecko.com/coins/images/5/small/dogecoin.png', chain: 'Base' } },
];

export default function BridgingDemo() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIndex(i => (i + 1) % SCENARIOS.length); setVisible(true); }, 320);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  const s = SCENARIOS[index];

  return (
    <div className="bg-[#242424] rounded-2xl border border-white/10 p-6">
      <p className="text-[11px] font-semibold text-[#fb4d01] uppercase tracking-wider mb-5">Bridge</p>

      <div className="transition-opacity duration-300" style={{ opacity: visible ? 1 : 0 }}>
        <div className="flex items-center gap-3">
          {/* From */}
          <div className="flex-1 bg-black/30 rounded-xl border border-white/5 p-4 text-center">
            <TokenLogo logo={s.from.logo} symbol={s.from.symbol} size={40} className="mx-auto mb-2" />
            <p className="font-bold text-white text-[14px]">{s.from.symbol}</p>
            <p className="text-[10px] text-white/40 mt-0.5">on {s.from.chain}</p>
          </div>

          {/* NEAR Intents hub */}
          <div className="flex flex-col items-center gap-1 shrink-0">
            <div className="flex items-center gap-1">
              <div className="w-8 h-0.5 bg-gradient-to-r from-white/10 to-[#fb4d01]/40" />
              <div className="w-6 h-6 rounded-full bg-[#fb4d01]/20 border border-[#fb4d01]/30 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#fb4d01]" />
              </div>
              <div className="w-8 h-0.5 bg-gradient-to-l from-white/10 to-[#fb4d01]/40" />
            </div>
            <span className="text-[9px] text-[#fb4d01]/60 text-center leading-tight">NEAR<br/>Intents</span>
          </div>

          {/* To */}
          <div className="flex-1 bg-[#fb4d01]/8 rounded-xl border border-[#fb4d01]/20 p-4 text-center">
            <TokenLogo logo={s.to.logo} symbol={s.to.symbol} size={40} className="mx-auto mb-2" />
            <p className="font-bold text-white text-[14px]">{s.to.symbol}</p>
            <p className="text-[10px] text-[#fb4d01]/60 mt-0.5">on {s.to.chain}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-white/30 mt-4 mb-4">
        <span>$0 network fee</span>
        <span>~30 seconds</span>
      </div>

      <button className="w-full bg-[#fb4d01] hover:bg-[#e04401] text-black font-bold text-[13px] uppercase tracking-widest py-3 rounded-xl transition-colors">
        Bridge Assets
      </button>
    </div>
  );
}
