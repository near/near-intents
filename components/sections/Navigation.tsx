'use client';

import Image from 'next/image';
import { CTAButton } from '@/components/shared/CTAButton';

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10 px-8 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20 lg:h-16">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <Image
              src="/images/logo/NI logo.png"
              alt="NEAR Intents"
              width={120}
              height={40}
              className="h-3.5 w-auto object-contain"
            />
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
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
            <CTAButton text="Launch App" href="https://near.com/" small />
          </div>
        </div>
      </div>
    </nav>
  );
}
