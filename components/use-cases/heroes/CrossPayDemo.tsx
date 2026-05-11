'use client';

import { useState, useEffect } from 'react';
import TokenLogo from './TokenLogo';

const SCENARIOS = [
  { sender: { symbol: 'BTC', logo: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png', amount: '0.003', chain: 'Bitcoin' },
    recipient: { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png', amount: '180.00', chain: 'Base' },
    address: '0x71C...3f9A' },
  { sender: { symbol: 'SOL', logo: 'https://coin-images.coingecko.com/coins/images/4128/small/solana.png', amount: '5.2', chain: 'Solana' },
    recipient: { symbol: 'USDT', logo: 'https://coin-images.coingecko.com/coins/images/325/small/Tether.png', amount: '720.00', chain: 'Ethereum' },
    address: '0x4aB...7C12' },
  { sender: { symbol: 'ETH', logo: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png', amount: '0.08', chain: 'Ethereum' },
    recipient: { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png', amount: '240.00', chain: 'Solana' },
    address: '8xKm...Pq3R' },
  { sender: { symbol: 'ZEC', logo: 'https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png', amount: '2.1', chain: 'Zcash' },
    recipient: { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png', amount: '90.00', chain: 'Base' },
    address: '0x9dE...1bF5' },
];

export default function CrossPayDemo() {
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
      <div className="flex items-center gap-2 mb-5">
        <span className="text-[11px] font-semibold text-[#fb4d01] uppercase tracking-wider">Cross-Chain Payment</span>
        <span className="text-[11px] text-white/30">· ~30s</span>
      </div>

      <div className="transition-opacity duration-300" style={{ opacity: visible ? 1 : 0 }}>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-black/30 rounded-xl border border-white/5 p-4">
            <p className="text-[10px] text-white/40 uppercase tracking-wider mb-3">Sender pays</p>
            <div className="flex items-center gap-2 mb-1">
              <TokenLogo logo={s.sender.logo} symbol={s.sender.symbol} size={28} />
              <span className="font-bold text-white text-[14px]">{s.sender.symbol}</span>
            </div>
            <p className="font-mono text-white/80 text-[15px] font-semibold mt-2">{s.sender.amount}</p>
            <p className="text-[10px] text-white/30 mt-1">on {s.sender.chain}</p>
          </div>

          <div className="bg-[#fb4d01]/8 rounded-xl border border-[#fb4d01]/20 p-4">
            <p className="text-[10px] text-[#fb4d01]/70 uppercase tracking-wider mb-3">Recipient gets</p>
            <div className="flex items-center gap-2 mb-1">
              <TokenLogo logo={s.recipient.logo} symbol={s.recipient.symbol} size={28} />
              <span className="font-bold text-white text-[14px]">{s.recipient.symbol}</span>
            </div>
            <p className="font-mono text-[#fb4d01] text-[15px] font-semibold mt-2">{s.recipient.amount}</p>
            <p className="text-[10px] text-white/30 mt-1">on {s.recipient.chain}</p>
          </div>
        </div>

        <div className="bg-black/20 rounded-lg border border-white/5 px-4 py-2.5 flex items-center justify-between">
          <span className="text-[11px] text-white/40">To address</span>
          <span className="font-mono text-[12px] text-white/60">{s.address}</span>
        </div>
      </div>

      <button className="w-full mt-4 bg-[#fb4d01] hover:bg-[#e04401] text-black font-bold text-[13px] uppercase tracking-widest py-3 rounded-xl transition-colors">
        Send Payment
      </button>
    </div>
  );
}
