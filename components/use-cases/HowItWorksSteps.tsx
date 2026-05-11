'use client';

import { useState, useEffect, useRef } from 'react';
import type { HowItWorksStep } from '@/lib/types/content';

interface Props {
  steps: HowItWorksStep[];
}

export default function HowItWorksSteps({ steps }: Props) {
  const [active, setActive] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    if (steps.length <= 1) return;
    const interval = setInterval(() => {
      if (!paused.current) {
        setActive((prev) => (prev + 1) % steps.length);
      }
    }, 7000);
    return () => clearInterval(interval);
  }, [steps.length]);

  const select = (i: number) => {
    setActive(i);
    paused.current = true;
    setTimeout(() => { paused.current = false; }, 14000);
  };

  if (!steps?.length) return null;

  const step = steps[active];
  const color = step.color ?? '#fb4d01';

  return (
    <div
      className="bg-[#242424] rounded-xl border border-white/10 p-6 sm:p-8"
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      {/* Desktop step indicators */}
      <div className="hidden sm:flex items-start mb-6">
        {steps.map((s, i) => {
          const c = s.color ?? '#fb4d01';
          const isActive = i === active;
          return (
            <div key={i} className="flex items-start flex-1 min-w-0">
              <div className="flex flex-col items-center gap-2 shrink-0">
                <button
                  onClick={() => select(i)}
                  className="flex items-center justify-center w-10 h-10 rounded-full border-2 font-bold text-sm transition-all duration-300 cursor-pointer"
                  style={{
                    borderColor: isActive ? c : 'rgba(255,255,255,0.15)',
                    backgroundColor: isActive ? c + '22' : 'transparent',
                    color: isActive ? c : 'rgba(255,255,255,0.4)',
                  }}
                >
                  {i + 1}
                </button>
                <span
                  className="text-[10px] font-medium text-center leading-tight max-w-[80px] transition-colors duration-300"
                  style={{ color: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)' }}
                >
                  {s.title}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-0.5 mt-5 mx-2 transition-all duration-500 rounded-full"
                  style={{
                    background: i < active
                      ? `linear-gradient(to right, ${steps[i].color ?? '#fb4d01'}, ${steps[i + 1].color ?? '#fb4d01'})`
                      : 'rgba(255,255,255,0.08)',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Active step detail panel */}
      <div className="bg-black/30 rounded-xl border border-white/5 p-5 sm:p-6 transition-all duration-300">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
          <div
            className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0 border"
            style={{
              backgroundColor: color + '20',
              borderColor: color + '40',
            }}
          >
            <span className="font-black text-lg" style={{ color }}>
              {active + 1}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h3 className="font-bold text-[16px] sm:text-[18px] text-white">{step.title}</h3>
              {step.chainPill && (
                <span
                  className="text-[11px] font-medium rounded-full px-3 py-0.5 border"
                  style={{
                    color,
                    borderColor: color + '40',
                    backgroundColor: color + '10',
                  }}
                >
                  {step.chainPill}
                </span>
              )}
            </div>
            <p className="text-[14px] text-white/60 leading-relaxed">{step.detail}</p>
          </div>
        </div>
      </div>

      {/* Mobile pill navigation */}
      <div className="flex sm:hidden justify-center gap-2 mt-4 flex-wrap">
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => select(i)}
            className="text-[11px] font-medium rounded-full px-3 py-1 border transition-all duration-200"
            style={{
              borderColor: i === active ? (s.color ?? '#fb4d01') : 'rgba(255,255,255,0.15)',
              color: i === active ? (s.color ?? '#fb4d01') : 'rgba(255,255,255,0.4)',
              backgroundColor: i === active ? (s.color ?? '#fb4d01') + '15' : 'transparent',
            }}
          >
            {i + 1}. {s.title}
          </button>
        ))}
      </div>
    </div>
  );
}
