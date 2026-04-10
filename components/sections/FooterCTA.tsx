'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { CTAButton } from '@/components/shared/CTAButton';
import { Twitter, Send, Youtube, Linkedin, MessageCircle, Music, TrendingUp } from 'lucide-react';

export function FooterCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let target = 0;
    let current = 0;
    let rafId: number;
    let buttonHovered = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (buttonHovered) return;
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // focal point: bottom-right corner
      const dist = Math.hypot(e.clientX - rect.right, e.clientY - rect.bottom);
      const maxDist = Math.hypot(rect.width, rect.height) * 0.65;
      const raw = Math.max(0, 1 - dist / maxDist);
      target = raw * raw * (3 - 2 * raw);
    };

    const handleButtonEnter = () => { buttonHovered = true; target = 1; };
    const handleButtonLeave = () => { buttonHovered = false; };

    const tick = () => {
      current += (target - current) * 0.06;

      if (imageWrapperRef.current) {
        if (current > 0.001) {
          const blur = current * 4;
          const imgOpacity = 0.6 + current * 0.4;
          const brightness = 0.85 + current * 0.45;
          imageWrapperRef.current.style.opacity = imgOpacity.toFixed(3);
          imageWrapperRef.current.style.filter = `brightness(${brightness.toFixed(3)}) blur(${blur.toFixed(2)}px)`;
        } else {
          imageWrapperRef.current.style.opacity = '0.6';
          imageWrapperRef.current.style.filter = 'brightness(0.85)';
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(tick);

    const buttons = buttonsRef.current;
    buttons?.addEventListener('mouseenter', handleButtonEnter);
    buttons?.addEventListener('mouseleave', handleButtonLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
      buttons?.removeEventListener('mouseenter', handleButtonEnter);
      buttons?.removeEventListener('mouseleave', handleButtonLeave);
    };
  }, []);

  return (
    <footer ref={sectionRef} className="bg-[#000000] relative overflow-hidden">

      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div ref={imageWrapperRef} className="relative w-full h-full">
          <Image
            src="/images/footer-bg.jpg"
            alt=""
            fill
            className="object-cover object-right-top"
            style={{ transform: 'scaleX(-1)' }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* CTA Section */}
        <div className="px-8 md:px-20 py-12 md:py-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-[28px] sm:text-[36px] md:text-[48px] font-bold text-white leading-[1.05] mb-6">
              Integrate and swap with Intents today
            </h2>

            <div
              className="w-full h-px mb-6"
              style={{ background: 'linear-gradient(to right, #FB4D01, transparent)' }}
            />

            <div ref={buttonsRef} className="flex flex-wrap gap-4">
              <CTAButton text="Go To near.org" href="https://www.near.org/intents" />
              <CTAButton text="Talk with the team" href="https://t.me/near_intents" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Main Footer Section */}
        <div className="px-8 md:px-20 py-16 md:py-20">
          <div className="max-w-7xl mx-auto space-y-12">

            {/* Logo and Social */}
            <div className="space-y-8">
              {/* Logo */}
              <a href="/" className="inline-block">
                <Image
                  src="/images/near-intents-logo-v2a.svg"
                  alt="NEAR Intents"
                  width={140}
                  height={24}
                  className="w-auto object-contain"
                />
              </a>

              {/* Social Icons */}
              <div className="flex items-center gap-6">
                <a
                  href="https://x.com/near_intents"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-orange hover:text-white transition-colors duration-200"
                  aria-label="X (Twitter)"
                >
                  <Twitter size={24} />
                </a>
                <a
                  href="https://t.me/near_intents"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-orange hover:text-white transition-colors duration-200"
                  aria-label="Telegram"
                >
                  <Send size={24} />
                </a>
                <a
                  href="https://discord.gg/nearprotocol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-orange hover:text-white transition-colors duration-200"
                  aria-label="Discord"
                >
                  <MessageCircle size={24} />
                </a>
                <a
                  href="https://www.youtube.com/@NEARProtocol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-orange hover:text-white transition-colors duration-200"
                  aria-label="YouTube"
                >
                  <Youtube size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/company/near-protocol-project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-orange hover:text-white transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="https://www.tiktok.com/@near_protocol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-orange hover:text-white transition-colors duration-200"
                  aria-label="TikTok"
                >
                  <Music size={24} />
                </a>
                <a
                  href="https://www.reddit.com/r/nearprotocol/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-orange hover:text-white transition-colors duration-200"
                  aria-label="Reddit"
                >
                  <TrendingUp size={24} />
                </a>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/10" />

            {/* Legal Links */}
            <div className="flex flex-wrap gap-6 md:gap-8 text-sm">
              <a
                href="https://www.near.org/terms-of-use"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors duration-200"
              >
                Terms of Use
              </a>
              <a
                href="https://www.near.org/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="https://www.near.org/cookie-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors duration-200"
              >
                Cookie Policy
              </a>
            </div>

            {/* Copyright */}
            <div className="text-white/40 text-xs md:text-sm border-t border-white/10 pt-8">
              © {new Date().getFullYear()} NEAR Protocol. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
