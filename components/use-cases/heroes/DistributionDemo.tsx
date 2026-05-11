'use client';

import { useState, useEffect, useCallback } from 'react';

const VENUES = [
  { name: 'Trust Wallet', angle: -90,  color: '#3375BB', emoji: '👛' },
  { name: 'Ledger Live',  angle: -30,  color: '#999999', emoji: '🔒' },
  { name: 'near.com',     angle: 30,   color: '#fb4d01', emoji: '⬡' },
  { name: 'LI.FI',        angle: 90,   color: '#C665D1', emoji: '∞' },
  { name: 'SwapKit',      angle: 150,  color: '#00B4A0', emoji: '⚡' },
  { name: 'Your App',     angle: 210,  color: '#fb4d01', emoji: '+', dashed: true },
];

const R = 105;
const CX = 160;
const CY = 155;

function getPos(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) };
}

export default function DistributionDemo() {
  const [lit, setLit] = useState<number[]>([]);

  const runPulse = useCallback(async () => {
    setLit([]);
    for (let i = 0; i < VENUES.length; i++) {
      await new Promise(r => setTimeout(r, i * 120 + 80));
      setLit(prev => [...prev, i]);
    }
    await new Promise(r => setTimeout(r, 1200));
    setLit([]);
  }, []);

  useEffect(() => {
    runPulse();
    const t = setInterval(runPulse, 4000);
    return () => clearInterval(t);
  }, [runPulse]);

  return (
    <div className="bg-[#242424] rounded-2xl border border-white/10 p-6">
      <p className="text-[11px] font-semibold text-[#fb4d01] uppercase tracking-wider mb-2">
        Token Distribution Network
      </p>

      <div className="flex justify-center">
        <svg width="320" height="310" viewBox="0 0 320 310">
          {/* Lines from center to venues */}
          {VENUES.map((venue, i) => {
            const pos = getPos(venue.angle);
            const isLit = lit.includes(i);
            return (
              <line key={i}
                x1={CX} y1={CY} x2={pos.x} y2={pos.y}
                stroke={isLit ? venue.color : 'rgba(255,255,255,0.07)'}
                strokeWidth={isLit ? 1.5 : 1}
                strokeDasharray={venue.dashed ? '4 3' : 'none'}
                style={{ transition: 'stroke 0.25s, stroke-width 0.25s' }}
              />
            );
          })}

          {/* Venue nodes */}
          {VENUES.map((venue, i) => {
            const pos = getPos(venue.angle);
            const isLit = lit.includes(i);
            return (
              <g key={i} transform={`translate(${pos.x}, ${pos.y})`}>
                <circle r={isLit ? 20 : 17}
                  fill={isLit ? venue.color + '20' : 'rgba(25,25,25,0.9)'}
                  stroke={isLit ? venue.color : 'rgba(255,255,255,0.1)'}
                  strokeWidth={isLit ? 1.5 : 1}
                  strokeDasharray={venue.dashed ? '4 3' : 'none'}
                  style={{ transition: 'all 0.25s' }}
                />
                <text textAnchor="middle" dominantBaseline="central"
                  fontSize={11}
                  fill={isLit ? venue.color : 'rgba(255,255,255,0.35)'}
                  style={{ transition: 'fill 0.25s' }}
                >
                  {venue.emoji}
                </text>
                <text
                  y={28}
                  textAnchor="middle"
                  fontSize={7}
                  fill={isLit ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)'}
                  style={{ transition: 'fill 0.25s' }}
                  fontFamily="sans-serif"
                >
                  {venue.name}
                </text>
              </g>
            );
          })}

          {/* Token center */}
          <circle cx={CX} cy={CY} r={34}
            fill="rgba(251,77,1,0.08)"
            stroke="rgba(251,77,1,0.3)"
            strokeWidth={1.5}
          />
          <circle cx={CX} cy={CY} r={22}
            fill="rgba(251,77,1,0.15)"
            stroke="rgba(251,77,1,0.4)"
            strokeWidth={1}
          />
          <text x={CX} y={CY - 5} textAnchor="middle" fontSize={9}
            fill="#fb4d01" fontWeight="bold" fontFamily="monospace">
            YOUR
          </text>
          <text x={CX} y={CY + 6} textAnchor="middle" fontSize={9}
            fill="#fb4d01" fontWeight="bold" fontFamily="monospace">
            TOKEN
          </text>
        </svg>
      </div>

      <p className="text-center text-[11px] text-white/30 -mt-2">
        List once · reach all wallets &amp; apps on 31 chains
      </p>
    </div>
  );
}
