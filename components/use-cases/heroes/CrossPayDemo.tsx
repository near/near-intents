'use client';

import { useState, useEffect } from 'react';
import TokenLogo from './TokenLogo';

const SCENARIOS = [
  { sender: { symbol: 'ZEC',  logo: 'https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png', amount: '2.1',  chain: 'Zcash'    },
    to:     { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png',              amount: '90.00', chain: 'Base'     }, address: '0x9dE...1bF5' },
  { sender: { symbol: 'BTC',  logo: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png',              amount: '0.003', chain: 'Bitcoin'  },
    to:     { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png',              amount: '180.00',chain: 'Base'     }, address: '0x71C...3f9A' },
  { sender: { symbol: 'SOL',  logo: 'https://coin-images.coingecko.com/coins/images/4128/small/solana.png',            amount: '5.2',  chain: 'Solana'   },
    to:     { symbol: 'USDT', logo: 'https://coin-images.coingecko.com/coins/images/325/small/Tether.png',             amount: '720.00',chain: 'Ethereum' }, address: '0x4aB...7C12' },
  { sender: { symbol: 'ETH',  logo: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png',           amount: '0.08', chain: 'Ethereum' },
    to:     { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png',              amount: '240.00',chain: 'Solana'   }, address: '8xKm...Pq3R' },
];

// Seeded "random" for the QR grid so it's stable per scenario
function qrCell(scenario: number, i: number) {
  return ((scenario * 31 + i * 17) % 7) > 2;
}

export default function CrossPayDemo() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [tab, setTab] = useState<'direct' | 'link'>('direct');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIndex(i => (i + 1) % SCENARIOS.length); setVisible(true); }, 280);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  const s = SCENARIOS[index];
  const paymentUrl = `near.com/pay/${s.address}`;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="bg-[#1e1e1e] rounded-2xl border border-white/10 overflow-hidden shadow-xl">
      {/* Tabs */}
      <div className="flex gap-2 p-3 pb-0">
        {(['direct', 'link'] as const).map(t => (
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
            {t === 'direct' ? 'Direct Pay' : 'Payment Link'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="transition-opacity duration-[280ms] px-3 pt-3" style={{ opacity: visible ? 1 : 0 }}>
        {tab === 'direct' ? (
          <>
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold text-[#fb4d01] uppercase tracking-widest">
                Cross-Chain Payment
              </span>
              <span className="text-[10px] text-white/30">· ~30s</span>
            </div>

            {/* Sender / Recipient grid */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="bg-[#2a2a2a] rounded-xl border border-white/8 p-3">
                <p className="text-[9px] font-semibold text-white/35 uppercase tracking-widest mb-3">Sender Pays</p>
                <div className="flex items-center gap-2 mb-2">
                  <TokenLogo logo={s.sender.logo} symbol={s.sender.symbol} size={36} />
                  <span className="font-bold text-white text-[16px]">{s.sender.symbol}</span>
                </div>
                <p className="font-mono font-semibold text-white text-[18px] leading-none mb-1">{s.sender.amount}</p>
                <p className="text-[10px] text-white/35">on {s.sender.chain}</p>
              </div>

              <div className="bg-[#2a2a2a] rounded-xl border border-[#fb4d01]/30 p-3">
                <p className="text-[9px] font-semibold text-[#fb4d01]/70 uppercase tracking-widest mb-3">Recipient Gets</p>
                <div className="flex items-center gap-2 mb-2">
                  <TokenLogo logo={s.to.logo} symbol={s.to.symbol} size={36} />
                  <span className="font-bold text-white text-[16px]">{s.to.symbol}</span>
                </div>
                <p className="font-mono font-semibold text-[#fb4d01] text-[18px] leading-none mb-1">{s.to.amount}</p>
                <p className="text-[10px] text-white/35">on {s.to.chain}</p>
              </div>
            </div>

            {/* To address */}
            <div className="bg-[#2a2a2a] rounded-xl border border-white/8 px-3 py-2.5 flex items-center justify-between mb-3">
              <span className="text-[11px] text-white/35">To address</span>
              <span className="font-mono text-[12px] text-white/55">{s.address}</span>
            </div>
          </>
        ) : (
          <>
            {/* Payment Link tab */}
            <div className="mb-3">
              <p className="text-[10px] font-bold text-[#fb4d01] uppercase tracking-widest mb-1">Payment Request</p>
              <p className="text-[11px] text-white/40">
                Request <span className="text-white font-semibold">{s.to.amount} {s.to.symbol}</span> on {s.to.chain}
              </p>
            </div>

            {/* QR mockup */}
            <div className="flex justify-center mb-3">
              <div className="bg-white rounded-xl p-2.5 w-24 h-24">
                <div className="grid grid-cols-8 gap-0.5 w-full h-full">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-[1px]"
                      style={{ backgroundColor: qrCell(index, i) ? '#000' : '#fff' }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Payment URL */}
            <div className="bg-[#2a2a2a] rounded-xl border border-white/8 px-3 py-2.5 mb-3">
              <p className="text-[10px] text-white/35 mb-0.5">Payment link</p>
              <p className="font-mono text-[11px] text-white/60 truncate">{paymentUrl}</p>
            </div>
          </>
        )}
      </div>

      {/* CTA Button */}
      <div className="px-3 pb-3">
        <button
          onClick={tab === 'link' ? handleCopy : undefined}
          className="w-full bg-[#fb4d01] hover:bg-[#e04401] text-white font-bold text-[13px] uppercase tracking-widest py-3 rounded-xl transition-colors"
        >
          {tab === 'direct' ? 'Send Payment' : (copied ? 'Copied!' : 'Copy Payment Link')}
        </button>
      </div>

      {/* Powered by */}
      <div className="px-3 pb-2 text-center">
        <p className="text-[11px] text-white/30">
          Powered by <span className="text-[#fb4d01] font-semibold">NEAR Intents</span>
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
