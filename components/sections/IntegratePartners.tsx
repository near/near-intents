'use client';

import { useRef, useState, MouseEvent } from 'react';
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';

const PARTNERS = [
  {
    logo: 'SS',
    name: 'Sailor Send',
    description: 'Cross-chain payment infrastructure for decentralized applications',
  },
  {
    logo: 'SK',
    name: 'Swap Kit',
    description: 'Professional trading toolkit with advanced order types',
  },
  {
    logo: 'FX',
    name: 'Frax Finance',
    description: 'Fractional-algorithmic stablecoin protocol',
  },
  {
    logo: 'DT',
    name: 'Delta Trade',
    description: 'Perpetual DEX with up to 50x leverage',
  },
  {
    logo: 'BT',
    name: 'Bitte',
    description: 'AI-powered trading assistant and analytics platform',
  },
  {
    logo: 'RF',
    name: 'Ref Finance',
    description: 'Leading multi-purpose DeFi platform on NEAR',
  },
];

export function IntegratePartners() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-[#1E1E1E]">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Integrate with <span className="text-brand-orange-600">Partners</span>
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Leading protocols and platforms building on NEAR Intents
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <div
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            className={`flex gap-6 overflow-x-auto no-scrollbar pb-4 ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
          >
            {PARTNERS.map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[320px] border border-white/10 rounded-2xl p-8 bg-black/30 backdrop-blur-sm hover:border-brand-orange-600/50 transition-all duration-300 select-none"
              >
                <div className="w-20 h-20 mb-6 flex items-center justify-center bg-white rounded-xl">
                  <span className="text-3xl font-bold text-black">
                    {partner.logo}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3">{partner.name}</h3>
                <p className="text-white/70 text-sm">{partner.description}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
