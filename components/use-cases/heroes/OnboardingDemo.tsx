'use client';

import { useState, useEffect } from 'react';
import TokenLogo from './TokenLogo';

const SCENARIOS = [
  { from: { symbol: 'BTC', logo: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png', chain: 'Bitcoin' },
    to:   { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png', chain: 'Your App' },
    address: 'bc1q...4mxp' },
  { from: { symbol: 'ETH', logo: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png', chain: 'Ethereum' },
    to:   { symbol: 'ZEC', logo: 'https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png', chain: 'Your App' },
    address: '0x2C...9a14' },
  { from: { symbol: 'SOL', logo: 'https://coin-images.coingecko.com/coins/images/4128/small/solana.png', chain: 'Solana' },
    to:   { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png', chain: 'Your App' },
    address: '7xKm...Rp4Q' },
  { from: { symbol: 'BTC', logo: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png', chain: 'Bitcoin' },
    to:   { symbol: 'NEAR', logo: 'https://coin-images.coingecko.com/coins/images/10365/small/near_icon.png', chain: 'Your App' },
    address: 'bc1q...9zpx' },
];

export default function OnboardingDemo() {
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
      <p className="text-[11px] font-semibold text-[#fb4d01] uppercase tracking-wider mb-5">Deposit Address</p>

      <div className="transition-opacity duration-300" style={{ opacity: visible ? 1 : 0 }}>
        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center gap-2 flex-1 bg-black/30 rounded-xl border border-white/5 p-3">
            <TokenLogo logo={s.from.logo} symbol={s.from.symbol} size={28} />
            <div>
              <p className="font-bold text-white text-[13px]">{s.from.symbol}</p>
              <p className="text-[10px] text-white/40">{s.from.chain}</p>
            </div>
          </div>
          <span className="text-white/20 text-xl">→</span>
          <div className="flex items-center gap-2 flex-1 bg-[#fb4d01]/8 rounded-xl border border-[#fb4d01]/20 p-3">
            <TokenLogo logo={s.to.logo} symbol={s.to.symbol} size={28} />
            <div>
              <p className="font-bold text-[#fb4d01] text-[13px]">{s.to.symbol}</p>
              <p className="text-[10px] text-[#fb4d01]/50">{s.to.chain}</p>
            </div>
          </div>
        </div>

        {/* QR code mockup */}
        <div className="bg-white rounded-xl p-3 mx-auto w-32 h-32 mb-4 flex items-center justify-center">
          <div className="grid grid-cols-7 gap-0.5 w-full h-full">
            {Array.from({ length: 49 }).map((_, i) => (
              <div key={i} className={`rounded-[1px] ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`} />
            ))}
          </div>
        </div>

        <div className="bg-black/20 rounded-lg border border-white/5 px-4 py-2.5 text-center">
          <p className="font-mono text-[12px] text-white/60">{s.address}</p>
        </div>
      </div>

      <p className="text-center text-[11px] text-white/30 mt-4">Send from any wallet · Non-custodial</p>
    </div>
  );
}
