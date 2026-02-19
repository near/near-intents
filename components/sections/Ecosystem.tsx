import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import { Zap, Triangle, Hexagon, Waves, Box, Aperture, Disc, Circle } from 'lucide-react';

const FEATURED_CHAINS = [
  { name: 'Solana', icon: Zap, color: 'text-cyan-400' },
  { name: 'Aurora', icon: Triangle, color: 'text-green-400' },
  { name: 'Arbitrum', icon: Hexagon, color: 'text-blue-500' },
  { name: 'Avalanche', icon: Waves, color: 'text-red-500' },
  { name: 'Ethereum', icon: Box, color: 'text-indigo-400' },
  { name: 'Polygon', icon: Aperture, color: 'text-purple-500' },
];

const GRID_CHAINS = [
  { name: 'Solana', icon: Zap, color: 'text-cyan-400' },
  { name: 'Aurora', icon: Triangle, color: 'text-green-400' },
  { name: 'Arbitrum', icon: Hexagon, color: 'text-blue-500' },
  { name: 'Avalanche', icon: Waves, color: 'text-red-500' },
  { name: 'Optimism', icon: Disc, color: 'text-red-400' },
  { name: 'Base', icon: Circle, color: 'text-blue-600' },
  { name: 'Polygon', icon: Aperture, color: 'text-purple-500' },
  { name: 'Bitcoin', icon: Circle, color: 'text-orange-500' },
];

export function Ecosystem() {
  // Repeat grid chains to fill 32 items
  const allChains = Array(32)
    .fill(null)
    .map((_, i) => GRID_CHAINS[i % GRID_CHAINS.length]);

  return (
    <section id="ecosystem" className="relative py-32 px-4 sm:px-6 lg:px-8 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Intents <span className="text-orange-600">Ecosystem</span>
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Supporting 35+ blockchains and counting
            </p>
          </div>
        </RevealOnScroll>

        {/* Featured Chains */}
        <RevealOnScroll delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-8 mb-20">
            {FEATURED_CHAINS.map((chain, index) => {
              const IconComponent = chain.icon;
              return (
                <div
                  key={index}
                  className={`eco-circle relative ${
                    index < FEATURED_CHAINS.length - 1 ? 'plus-separator' : ''
                  }`}
                >
                  <div className="logo-grayscale w-24 h-24 rounded-full flex items-center justify-center border-2 border-white/10 bg-black/50 backdrop-blur-sm transition-all duration-300 hover:scale-110 group">
                    <IconComponent size={40} className={`${chain.color} transition-all duration-300`} />
                  </div>
                  <div className="text-center mt-3 text-sm text-white/70">
                    {chain.name}
                  </div>
                </div>
              );
            })}
          </div>
        </RevealOnScroll>

        {/* All Chains Grid */}
        <RevealOnScroll delay={0.4}>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {allChains.map((chain, index) => {
              const IconComponent = chain.icon;
              return (
                <div
                  key={index}
                  className="logo-grayscale aspect-square rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm flex items-center justify-center p-2 hover:scale-105 transition-transform duration-300"
                >
                  <IconComponent size={24} className={`${chain.color} transition-all duration-300`} />
                </div>
              );
            })}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
