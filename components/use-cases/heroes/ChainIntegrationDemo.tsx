'use client';

import { useState, useEffect } from 'react';

const CHAINS = [
  { name: 'Bitcoin',   color: '#F7931A', emoji: '₿' },
  { name: 'Ethereum',  color: '#627EEA', emoji: 'Ξ' },
  { name: 'Solana',    color: '#9945FF', emoji: '◎' },
  { name: 'Base',      color: '#0052FF', emoji: 'B' },
  { name: 'Arbitrum',  color: '#12AAFF', emoji: 'A' },
  { name: 'Polygon',   color: '#8247E5', emoji: '⬡' },
  { name: 'TON',       color: '#0088CC', emoji: 'T' },
  { name: 'BNB',       color: '#F3BA2F', emoji: 'B' },
  { name: 'Avalanche', color: '#E84142', emoji: '▲' },
  { name: 'Starknet',  color: '#EC796B', emoji: 'S' },
];

const R = 110; // radius of orbit
const CX = 160; // center x
const CY = 160; // center y

function getPos(i: number, total: number) {
  const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
  return { x: CX + R * Math.cos(angle), y: CY + R * Math.sin(angle) };
}

export default function ChainIntegrationDemo() {
  const [mounted, setMounted] = useState(false);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setPulse(p => (p + 1) % CHAINS.length), 600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-[#242424] rounded-2xl border border-white/10 p-6">
      <p className="text-[11px] font-semibold text-[#fb4d01] uppercase tracking-wider mb-4">
        Add Your Chain to NEAR Intents
      </p>

      <div className="flex justify-center">
        <svg width="320" height="320" viewBox="0 0 320 320" className="overflow-visible">
          {/* Connection lines */}
          {CHAINS.map((chain, i) => {
            const pos = getPos(i, CHAINS.length);
            const isActive = i === pulse;
            return (
              <line key={i}
                x1={CX} y1={CY} x2={pos.x} y2={pos.y}
                stroke={isActive ? chain.color : 'rgba(255,255,255,0.08)'}
                strokeWidth={isActive ? 1.5 : 1}
                strokeDasharray={isActive ? 'none' : '3 4'}
                style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
              />
            );
          })}

          {/* Chain nodes */}
          {CHAINS.map((chain, i) => {
            const pos = getPos(i, CHAINS.length);
            const isActive = i === pulse;
            return (
              <g key={i} transform={`translate(${pos.x}, ${pos.y})`}>
                <circle r={isActive ? 16 : 13}
                  fill={isActive ? chain.color + '25' : 'rgba(30,30,30,0.9)'}
                  stroke={isActive ? chain.color : 'rgba(255,255,255,0.12)'}
                  strokeWidth={isActive ? 1.5 : 1}
                  style={{ transition: 'all 0.3s' }}
                />
                <text textAnchor="middle" dominantBaseline="central"
                  fontSize={10} fontWeight="bold"
                  fill={isActive ? chain.color : 'rgba(255,255,255,0.4)'}
                  style={{ transition: 'fill 0.3s', fontFamily: 'monospace' }}
                >
                  {chain.emoji}
                </text>
              </g>
            );
          })}

          {/* NEAR Intents center hub */}
          <circle cx={CX} cy={CY} r={36}
            fill="rgba(251,77,1,0.08)"
            stroke="rgba(251,77,1,0.3)"
            strokeWidth={1.5}
          />
          <circle cx={CX} cy={CY} r={24}
            fill="rgba(251,77,1,0.15)"
            stroke="rgba(251,77,1,0.5)"
            strokeWidth={1}
          />
          <text x={CX} y={CY - 6} textAnchor="middle" fontSize={8}
            fill="#fb4d01" fontWeight="bold" fontFamily="monospace">
            NEAR
          </text>
          <text x={CX} y={CY + 6} textAnchor="middle" fontSize={7}
            fill="rgba(251,77,1,0.7)" fontFamily="monospace">
            Intents
          </text>

          {/* Your Chain node (animated in) */}
          {mounted && (
            <g transform={`translate(${CX}, ${CY + R + 30})`}
              style={{ opacity: 1, transition: 'opacity 0.8s' }}>
              <line x1={0} y1={0} x2={0} y2={-(R + 10)}
                stroke="#fb4d01" strokeWidth={1.5} strokeDasharray="4 3" opacity={0.6}
              />
              <circle r={18} fill="rgba(251,77,1,0.15)"
                stroke="#fb4d01" strokeWidth={1.5} strokeDasharray="4 3"
              />
              <circle r={4} fill="#fb4d01">
                <animate attributeName="r" values="4;7;4" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <text y={32} textAnchor="middle" fontSize={9}
                fill="rgba(251,77,1,0.8)" fontWeight="bold" fontFamily="monospace">
                Your Chain
              </text>
            </g>
          )}
        </svg>
      </div>

      <p className="text-center text-[11px] text-white/30 mt-2">
        {CHAINS.length} chains connected · Your chain joins the network
      </p>
    </div>
  );
}
