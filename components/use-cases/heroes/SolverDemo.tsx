'use client';

import { useState, useEffect } from 'react';

const STEPS = [
  { label: 'User Intent', desc: 'User submits intent to swap BTC → USDC', col: 0 },
  { label: 'Message Bus', desc: 'Intent broadcast to solver network', col: 1 },
  { label: 'Best Quote', desc: 'Solver fills at best price: 30,820 USDC', col: 2 },
  { label: 'Settled', desc: 'USDC delivered. BTC locked in escrow.', col: 3 },
];

export default function SolverDemo() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setStep(s => (s + 1) % STEPS.length);
    }, 2200);
    return () => clearInterval(t);
  }, []);

  const cols = ['User', 'Message Bus', 'Solver', 'Settlement'];
  const colColors = ['#627EEA', '#fb4d01', '#9945FF', '#059669'];

  return (
    <div className="bg-[#242424] rounded-2xl border border-white/10 p-6">
      <p className="text-[11px] font-semibold text-[#fb4d01] uppercase tracking-wider mb-5">Intent Settlement</p>

      {/* Column headers */}
      <div className="grid grid-cols-4 gap-1 mb-4">
        {cols.map((c, i) => (
          <div key={i} className="text-center">
            <div
              className="w-8 h-8 rounded-full mx-auto mb-1 flex items-center justify-center text-[10px] font-bold transition-all duration-500"
              style={{
                backgroundColor: step >= i ? colColors[i] + '25' : 'rgba(255,255,255,0.05)',
                borderWidth: 1.5,
                borderStyle: 'solid',
                borderColor: step >= i ? colColors[i] : 'rgba(255,255,255,0.1)',
                color: step >= i ? colColors[i] : 'rgba(255,255,255,0.3)',
              }}
            >
              {i + 1}
            </div>
            <p className="text-[9px] text-white/40 leading-tight">{c}</p>
          </div>
        ))}
      </div>

      {/* Connecting line */}
      <div className="relative h-0.5 bg-white/5 rounded mx-4 mb-5">
        <div
          className="absolute left-0 top-0 h-full rounded transition-all duration-500"
          style={{
            width: `${(step / (STEPS.length - 1)) * 100}%`,
            backgroundColor: colColors[step],
          }}
        />
      </div>

      {/* Active step */}
      <div
        className="bg-black/30 rounded-xl border border-white/5 p-4 transition-all duration-300"
        style={{ borderColor: colColors[step] + '30' }}
      >
        <div className="flex items-start gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
            style={{ backgroundColor: colColors[step] + '20', color: colColors[step] }}
          >
            {step + 1}
          </div>
          <div>
            <p className="font-bold text-white text-[13px] mb-0.5">{STEPS[step].label}</p>
            <p className="text-[12px] text-white/50 leading-relaxed">{STEPS[step].desc}</p>
          </div>
        </div>
      </div>

      {/* Example intent */}
      <div className="mt-4 bg-black/20 rounded-lg border border-white/5 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png" alt="BTC" className="w-4 h-4 rounded-full" />
          <span className="text-[12px] text-white/60">0.5 BTC</span>
        </div>
        <span className="text-white/20 text-sm">→</span>
        <div className="flex items-center gap-2">
          <img src="https://coin-images.coingecko.com/coins/images/6319/small/usdc.png" alt="USDC" className="w-4 h-4 rounded-full" />
          <span className="text-[12px] text-[#fb4d01]">30,820 USDC</span>
        </div>
      </div>
    </div>
  );
}
