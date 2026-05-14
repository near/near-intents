'use client';

import { useState, useEffect } from 'react';
import TokenLogo from './TokenLogo';

const SCENARIOS = [
  { home: { symbol: 'ETH', logo: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png', chain: 'Ethereum' },
    controlled: [
      { symbol: 'BTC', logo: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png', chain: 'Bitcoin' },
      { symbol: 'SOL', logo: 'https://coin-images.coingecko.com/coins/images/4128/small/solana.png', chain: 'Solana' },
      { symbol: 'ZEC', logo: 'https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png', chain: 'Zcash' },
    ]},
  { home: { symbol: 'SOL', logo: 'https://coin-images.coingecko.com/coins/images/4128/small/solana.png', chain: 'Solana' },
    controlled: [
      { symbol: 'ETH', logo: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png', chain: 'Ethereum' },
      { symbol: 'BTC', logo: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png', chain: 'Bitcoin' },
      { symbol: 'NEAR', logo: 'https://coin-images.coingecko.com/coins/images/10365/small/near_icon.png', chain: 'NEAR' },
    ]},
  { home: { symbol: 'NEAR', logo: 'https://coin-images.coingecko.com/coins/images/10365/small/near_icon.png', chain: 'NEAR' },
    controlled: [
      { symbol: 'BTC', logo: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png', chain: 'Bitcoin' },
      { symbol: 'ETH', logo: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png', chain: 'Ethereum' },
      { symbol: 'SOL', logo: 'https://coin-images.coingecko.com/coins/images/4128/small/solana.png', chain: 'Solana' },
    ]},
];

export default function ChainAbstractionDemo() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [activeAddr, setActiveAddr] = useState(0);
  const [scenarioVisible, setScenarioVisible] = useState(true);

  // Pulse through controlled addresses every 900ms
  useEffect(() => {
    const t = setInterval(() => setActiveAddr(a => (a + 1) % 3), 900);
    return () => clearInterval(t);
  }, []);

  // Rotate scenarios every 3.2s
  useEffect(() => {
    const t = setInterval(() => {
      setScenarioVisible(false);
      setTimeout(() => { setScenarioIdx(i => (i + 1) % SCENARIOS.length); setScenarioVisible(true); }, 320);
    }, 3200);
    return () => clearInterval(t);
  }, []);

  const s = SCENARIOS[scenarioIdx];

  return (
    <div className="bg-[#242424] rounded-2xl border border-white/10 p-6">
      <p className="text-[11px] font-semibold text-[#fb4d01] uppercase tracking-wider mb-5">One Key · 31 Chains</p>

      <div className="transition-opacity duration-300" style={{ opacity: scenarioVisible ? 1 : 0 }}>
        {/* Home wallet */}
        <div className="bg-black/30 rounded-xl border border-white/10 p-4 flex items-center gap-3 mb-4">
          <TokenLogo logo={s.home.logo} symbol={s.home.symbol} size={36} />
          <div>
            <p className="text-[10px] text-white/40 uppercase tracking-wider">Home wallet</p>
            <p className="font-bold text-white text-[14px]">{s.home.chain}</p>
          </div>
          <div className="ml-auto text-[10px] text-[#fb4d01] bg-[#fb4d01]/10 border border-[#fb4d01]/20 rounded-full px-2 py-0.5">
            1 key
          </div>
        </div>

        {/* Connection lines */}
        <div className="flex justify-center mb-2">
          <div className="flex flex-col items-center gap-0.5">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-0.5 h-3 rounded transition-colors duration-300"
                style={{ backgroundColor: i === activeAddr ? '#fb4d01' : 'rgba(255,255,255,0.1)' }} />
            ))}
          </div>
        </div>

        {/* Controlled chains */}
        <div className="flex flex-col gap-2">
          {s.controlled.map((c, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl border p-3 transition-all duration-300"
              style={{
                backgroundColor: i === activeAddr ? '#fb4d01' + '10' : 'rgba(0,0,0,0.15)',
                borderColor: i === activeAddr ? '#fb4d01' + '40' : 'rgba(255,255,255,0.05)',
              }}
            >
              <TokenLogo logo={c.logo} symbol={c.symbol} size={24} />
              <span className="text-[13px] text-white/70">{c.chain}</span>
              {i === activeAddr && (
                <span className="ml-auto w-2 h-2 rounded-full bg-[#fb4d01] animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
