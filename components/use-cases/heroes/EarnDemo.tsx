'use client';

import { useState, useEffect } from 'react';
import TokenLogo from './TokenLogo';

const SCENARIOS = [
  { from: { symbol: 'BTC', logo: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png' },
    to: { symbol: 'cbBTC', logo: 'https://coin-images.coingecko.com/coins/images/40143/small/cbbtc.webp', chain: 'Base' },
    protocol: 'Moonwell', type: 'Lending', apy: '1.2%' },
  { from: { symbol: 'ETH', logo: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png' },
    to: { symbol: 'stETH', logo: 'https://coin-images.coingecko.com/coins/images/13442/small/steth_logo.png', chain: 'Ethereum' },
    protocol: 'Lido', type: 'Staking', apy: '3.8%' },
  { from: { symbol: 'SOL', logo: 'https://coin-images.coingecko.com/coins/images/4128/small/solana.png' },
    to: { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png', chain: 'Solana' },
    protocol: 'Aave', type: 'Lending', apy: '5.1%' },
  { from: { symbol: 'ZEC', logo: 'https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png' },
    to: { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png', chain: 'Ethereum' },
    protocol: 'Aave', type: 'Lending', apy: '4.7%' },
];

export default function EarnDemo() {
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
      <p className="text-[11px] font-semibold text-[#fb4d01] uppercase tracking-wider mb-5">Cross-Chain Earn</p>

      <div className="transition-opacity duration-300" style={{ opacity: visible ? 1 : 0 }}>
        <div className="flex flex-col gap-2 mb-4">
          <div className="bg-black/30 rounded-xl border border-white/5 p-4 flex items-center gap-3">
            <TokenLogo logo={s.from.logo} symbol={s.from.symbol} size={36} />
            <div>
              <p className="font-bold text-white text-[14px]">{s.from.symbol}</p>
              <p className="text-[10px] text-white/40">Deposit from anywhere</p>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex items-center gap-2 text-[10px] text-white/30">
              <div className="w-px h-4 bg-white/10" />
              <span>via NEAR Intents</span>
              <div className="w-px h-4 bg-white/10" />
            </div>
          </div>

          <div className="bg-[#fb4d01]/8 rounded-xl border border-[#fb4d01]/20 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TokenLogo logo={s.to.logo} symbol={s.to.symbol} size={36} />
              <div>
                <p className="font-bold text-white text-[14px]">{s.to.symbol}</p>
                <p className="text-[10px] text-white/40">{s.protocol} · {s.type} · {s.to.chain}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-black text-[#fb4d01] text-[20px]">{s.apy}</p>
              <p className="text-[9px] text-[#fb4d01]/50 uppercase">APY</p>
            </div>
          </div>
        </div>
      </div>

      <button className="w-full bg-[#fb4d01] hover:bg-[#e04401] text-black font-bold text-[13px] uppercase tracking-widest py-3 rounded-xl transition-colors">
        Start Earning
      </button>
    </div>
  );
}
