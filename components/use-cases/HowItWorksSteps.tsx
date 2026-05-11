'use client';

import { useState, useEffect, useRef } from 'react';
import type { HowItWorksStep } from '@/lib/types/content';
import {
  Wallet, Cpu, PenLine, CheckCircle, ArrowLeftRight, CreditCard,
  Link, Zap, Bot, Building2, Blocks, GitMerge, Landmark, Droplets,
  Vault, TrendingUp, ShieldCheck, BrainCircuit, Code2, Globe,
  type LucideProps,
} from 'lucide-react';

type IconComponent = React.ComponentType<LucideProps>;

const ICON_MAP: Record<string, IconComponent> = {
  Wallet, Cpu, PenLine, CheckCircle, ArrowLeftRight, CreditCard,
  Link, Zap, Bot, Building2, Blocks, GitMerge, Landmark, Droplets,
  Vault, TrendingUp, ShieldCheck, BrainCircuit, Code2, Globe,
};

interface Props {
  steps: HowItWorksStep[];
}

export default function HowItWorksSteps({ steps }: Props) {
  const [active, setActive] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    if (steps.length <= 1) return;
    const interval = setInterval(() => {
      if (!paused.current) setActive((p) => (p + 1) % steps.length);
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
  const StepIcon = ICON_MAP[step.icon];

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
          const Icon = ICON_MAP[s.icon];
          return (
            <div key={i} className="flex items-start flex-1 min-w-0">
              <div className="flex flex-col items-center gap-2 shrink-0">
                <button
                  onClick={() => select(i)}
                  className="flex items-center justify-center w-11 h-11 rounded-full border-2 transition-all duration-300 cursor-pointer"
                  style={{
                    borderColor: isActive ? c : 'rgba(255,255,255,0.12)',
                    backgroundColor: isActive ? c + '20' : 'transparent',
                    color: isActive ? c : 'rgba(255,255,255,0.3)',
                  }}
                >
                  {Icon
                    ? <Icon size={18} strokeWidth={2} />
                    : <span className="font-bold text-sm">{i + 1}</span>
                  }
                </button>
                <span
                  className="text-[10px] font-medium text-center leading-tight max-w-[72px] transition-colors duration-300"
                  style={{ color: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)' }}
                >
                  {s.title}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className="flex-1 h-0.5 mt-5 mx-2 rounded-full transition-all duration-500"
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
      <div className="bg-black/30 rounded-xl border border-white/5 p-5 sm:p-6">
        <div className="flex gap-4 sm:gap-5 items-start">
          {/* Icon square */}
          <div
            className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0 border"
            style={{ backgroundColor: color + '20', borderColor: color + '35' }}
          >
            {StepIcon
              ? <StepIcon size={22} strokeWidth={2} style={{ color }} />
              : <span className="font-black text-lg" style={{ color }}>{active + 1}</span>
            }
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Step label + chain pill */}
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-[10px] font-semibold text-white/30 uppercase tracking-wider">
                Step {active + 1} of {steps.length}
              </span>
              {step.chainPill && (
                <span
                  className="text-[11px] font-medium rounded-full px-3 py-0.5 border"
                  style={{ color, borderColor: color + '40', backgroundColor: color + '12' }}
                >
                  {step.chainPill}
                </span>
              )}
            </div>
            <h3 className="font-bold text-[16px] sm:text-[17px] text-white mb-1.5">{step.title}</h3>
            <p className="text-[13px] text-white/60 leading-relaxed">{step.detail}</p>
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
              borderColor: i === active ? (s.color ?? '#fb4d01') : 'rgba(255,255,255,0.12)',
              color: i === active ? (s.color ?? '#fb4d01') : 'rgba(255,255,255,0.35)',
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
