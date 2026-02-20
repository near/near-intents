'use client';

import { CTAButton } from '@/components/shared/CTAButton';

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-1 text-xl font-bold">
            <span className="text-white">near</span>
            <span className="text-brand-orange-600">Intents</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#how-it-works"
              className="text-white/70 hover:text-white transition-colors duration-200"
            >
              How It Works
            </a>
            <a
              href="#features"
              className="text-white/70 hover:text-white transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="#integrate"
              className="text-white/70 hover:text-white transition-colors duration-200"
            >
              Integrate
            </a>
            <a
              href="#ecosystem"
              className="text-white/70 hover:text-white transition-colors duration-200"
            >
              Ecosystem
            </a>
          </div>

          {/* CTA Button */}
          <div className="flex items-center">
            <CTAButton text="Launch App" small />
          </div>
        </div>
      </div>
    </nav>
  );
}
