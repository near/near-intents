'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { CTAButton } from '@/components/shared/CTAButton';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Ecosystem', href: '#ecosystem' },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  const resolveHref = (href: string) => (isHome ? href : `/${href}`);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10 px-8 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/images/near-intents-logo-v2a.svg"
              alt="NEAR Intents"
              width={120}
              height={20}
              className="w-auto object-contain" style={{ height: '21px' }}
            />
          </a>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-3 lg:gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={resolveHref(link.href)}
                className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Side - CTA Button + Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-3 lg:gap-4">
            <CTAButton text="Launch App" href="https://near.com/" small className="!text-[9px] sm:!text-[10px] md:!text-[12px] !px-3 sm:!px-4 md:!px-5 !py-1.5 sm:!py-2 md:!py-2" />

            {/* Hamburger Menu Button - Mobile */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-white/70 hover:text-white transition-colors rounded-lg"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="md:hidden fixed left-0 right-0 bottom-0 top-14 sm:top-16 z-40 bg-black/80 backdrop-blur-sm" onClick={closeMenu} />
        )}
        <div
          className={`fixed left-0 right-0 top-14 sm:top-16 z-40 bg-black border-b border-white/10 md:hidden transition-all duration-300 ease-out overflow-hidden ${
            isMenuOpen ? 'max-h-screen' : 'max-h-0'
          }`}
        >
          <div className="px-8 md:px-20 py-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={resolveHref(link.href)}
                onClick={closeMenu}
                className="block text-white/70 hover:text-white transition-colors duration-200 py-2 text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
