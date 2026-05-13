'use client';

import { useState, useEffect, useRef } from 'react';

const WORDS = ['teams', 'agents', 'aggregators', 'wallets', 'dApps', 'exchanges'];
const HOLD_MS = 5000;
const TRANSITION_MS = 300;

type Phase = 'visible' | 'leaving' | 'entering';

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('visible');
  const [widthPx, setWidthPx] = useState(0);
  const [animated, setAnimated] = useState(false);
  const spanRef = useRef<HTMLSpanElement>(null);

  // Measure width after word renders
  useEffect(() => {
    if (spanRef.current) {
      setWidthPx(spanRef.current.offsetWidth);
    }
  }, [wordIndex]);

  // Enable transitions after first render
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Cycle words
  useEffect(() => {
    const t = setTimeout(() => {
      setPhase('leaving');
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % WORDS.length);
        setPhase('entering');
        setTimeout(() => setPhase('visible'), TRANSITION_MS);
      }, TRANSITION_MS);
    }, HOLD_MS);
    return () => clearTimeout(t);
  }, [wordIndex]);

  const word = WORDS[wordIndex];

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 text-center sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
        See how{' '}
        <span
          className={`inline-block overflow-hidden pb-[0.15em] -mb-[0.15em] align-bottom ${animated ? 'transition-[width] duration-500 ease-in-out' : ''}`}
          style={widthPx > 0 ? { width: `${widthPx}px` } : undefined}
        >
          <span
            ref={spanRef}
            className={`inline-block text-[#fb4d01] ${animated ? 'transition-all duration-300 ease-in-out' : ''} ${
              phase === 'visible' ? 'translate-y-0 opacity-100' :
              phase === 'leaving' ? '-translate-y-full opacity-0' :
              'translate-y-full opacity-0'
            }`}
          >
            {word}
          </span>
        </span>
        {' '}use{' '}
        <span className="text-white">NEAR Intents</span>
      </h1>
    </section>
  );
}
