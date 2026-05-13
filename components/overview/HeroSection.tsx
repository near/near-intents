'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const WORDS = ['teams', 'agents', 'aggregators', 'wallets', 'dApps', 'exchanges'];
const HOLD_MS = 5000;
const TRANSITION_MS = 300;

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<'visible' | 'exit' | 'enter'>('visible');
  const spanRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (spanRef.current) setWidth(spanRef.current.offsetWidth);
  }, [wordIndex]);

  useEffect(() => {
    const t = setTimeout(() => {
      setPhase('exit');
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % WORDS.length);
        setPhase('enter');
        setTimeout(() => setPhase('visible'), TRANSITION_MS);
      }, TRANSITION_MS);
    }, HOLD_MS);
    return () => clearTimeout(t);
  }, [wordIndex]);

  const word = WORDS[wordIndex];

  const wordStyle: React.CSSProperties = {
    display: 'inline-block',
    opacity: phase === 'exit' ? 0 : phase === 'enter' ? 0 : 1,
    transform: phase === 'exit' ? 'translateY(-8px)' : phase === 'enter' ? 'translateY(8px)' : 'translateY(0)',
    transition: `opacity ${TRANSITION_MS}ms ease, transform ${TRANSITION_MS}ms ease`,
  };

  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-24 md:py-32">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight max-w-4xl">
        See how{' '}
        <span
          className="inline-block overflow-hidden align-bottom transition-[width] duration-300"
          style={{ width: width ? `${width}px` : 'auto' }}
        >
          <span ref={spanRef} style={wordStyle} className="text-[#fb4d01]">
            {word}
          </span>
        </span>
        <br />
        use <span className="text-white">NEAR Intents</span>
      </h1>
      <p className="mt-6 text-white/60 text-lg max-w-xl leading-relaxed">
        The universal liquidity protocol powering cross-chain swaps, payments, and asset flows across 31 chains.
      </p>
      <div className="flex flex-wrap gap-4 mt-8 justify-center">
        <Link
          href="/use-cases"
          className="bg-[#fb4d01] hover:bg-[#e04401] text-black font-bold text-[13px] uppercase tracking-widest px-6 py-3 rounded-full transition-colors"
        >
          Explore Use Cases
        </Link>
        <a
          href="https://docs.near-intents.org"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-white/20 hover:border-white/40 text-white font-bold text-[13px] uppercase tracking-widest px-6 py-3 rounded-full transition-colors"
        >
          Read the Docs
        </a>
      </div>
    </div>
  );
}
