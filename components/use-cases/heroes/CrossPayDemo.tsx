'use client';

import { useState, useEffect } from 'react';
import TokenLogo from './TokenLogo';

const SCENARIOS = [
  { sender: { symbol: 'ZEC',  logo: 'https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png', amount: '2.1',  chain: 'Zcash'    },
    to:     { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png',              amount: '90.00',chain: 'Base'     }, address: '0x9dE...1bF5' },
  { sender: { symbol: 'BTC',  logo: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png',              amount: '0.003',chain: 'Bitcoin'  },
    to:     { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png',              amount: '180.00',chain: 'Base'    }, address: '0x71C...3f9A' },
  { sender: { symbol: 'SOL',  logo: 'https://coin-images.coingecko.com/coins/images/4128/small/solana.png',            amount: '5.2',  chain: 'Solana'   },
    to:     { symbol: 'USDT', logo: 'https://coin-images.coingecko.com/coins/images/325/small/Tether.png',             amount: '720.00',chain: 'Ethereum'}, address: '0x4aB...7C12' },
  { sender: { symbol: 'ETH',  logo: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png',           amount: '0.08', chain: 'Ethereum' },
    to:     { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png',              amount: '240.00',chain: 'Solana'  }, address: '8xKm...Pq3R' },
];

export default function CrossPayDemo() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

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
      {/* Header */}
      <div className="flex items-center gap-2 px-4 pt-4 pb-3">
        <span className="text-[11px] font-bold text-[#fb4d01] uppercase tracking-widest">
          Cross-Chain Payment
        </span>
        <span className="text-[11px] text-white/30">· ~30s</span>
      </div>

      <div className="transition-opacity duration-[280ms] px-3" style={{ opacity: visible ? 1 : 0 }}>
        {/* Sender / Recipient grid */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          {/* Sender */}
          <div className="bg-[#2a2a2a] rounded-xl border border-white/8 p-3">
            <p className="text-[9px] font-semibold text-white/35 uppercase tracking-widest mb-3">
              Sender Pays
            </p>
            <div className="flex items-center gap-2 mb-2">
              <TokenLogo logo={s.sender.logo} symbol={s.sender.symbol} size={36} />
              <span className="font-bold text-white text-[16px]">{s.sender.symbol}</span>
            </div>
            <p className="font-mono font-semibold text-white text-[18px] leading-none mb-1">
              {s.sender.amount}
            </p>
            <p className="text-[10px] text-white/35">on {s.sender.chain}</p>
          </div>

          {/* Recipient */}
          <div className="bg-[#2a2a2a] rounded-xl border border-[#fb4d01]/30 p-3">
            <p className="text-[9px] font-semibold text-[#fb4d01]/70 uppercase tracking-widest mb-3">
              Recipient Gets
            </p>
            <div className="flex items-center gap-2 mb-2">
              <TokenLogo logo={s.to.logo} symbol={s.to.symbol} size={36} />
              <span className="font-bold text-white text-[16px]">{s.to.symbol}</span>
            </div>
            <p className="font-mono font-semibold text-[#fb4d01] text-[18px] leading-none mb-1">
              {s.to.amount}
            </p>
            <p className="text-[10px] text-white/35">on {s.to.chain}</p>
          </div>
        </div>

        {/* To address */}
        <div className="bg-[#2a2a2a] rounded-xl border border-white/8 px-3 py-2.5 flex items-center justify-between mb-3">
          <span className="text-[11px] text-white/35">To address</span>
          <span className="font-mono text-[12px] text-white/55">{s.address}</span>
        </div>
      </div>

      {/* CTA Button */}
      <div className="px-3 pb-4">
        <button className="w-full bg-[#fb4d01] hover:bg-[#e04401] text-white font-bold text-[13px] uppercase tracking-widest py-3 rounded-xl transition-colors">
          Send Payment
        </button>
      </div>
    </div>
  );
}
