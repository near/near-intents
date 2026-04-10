'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { CTAButton } from '@/components/shared/CTAButton';
import { Twitter, Send, Youtube, Linkedin, MessageCircle } from 'lucide-react';

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


        {/* Main Footer */}
        <div className="px-8 md:px-20 py-12 md:py-16">
          <div className="max-w-7xl mx-auto">
            {/* Desktop Layout: Logo | Social | Legal */}
            <div className="hidden md:flex items-center justify-between gap-8">
              {/* Left: Logo */}
              <a href="/" className="flex-shrink-0">
                <Image
                  src="/images/near-intents-logo-v2a.svg"
                  alt="NEAR Intents"
                  width={120}
                  height={20}
                  className="w-auto object-contain"
                  style={{ height: '24px' }}
                />
              </a>

              {/* Center: Social Icons */}
              <div className="flex-1 flex items-center justify-center gap-6">
                <a
                  href="https://x.com/near_intents"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-brand-orange transition-colors duration-200"
                  aria-label="X (Twitter)"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="https://t.me/near_intents"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-brand-orange transition-colors duration-200"
                  aria-label="Telegram"
                >
                  <Send size={20} />
                </a>
                <a
                  href="https://discord.gg/nearprotocol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-brand-orange transition-colors duration-200"
                  aria-label="Discord"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.317 4.3671C18.7945 3.63537 17.147 3.12204 15.3827 2.80204C15.1597 3.20204 14.8947 3.74704 14.7127 4.12704C12.7988 3.81371 10.8988 3.81371 9.01199 4.12704C8.82993 3.73537 8.55493 3.20204 8.32993 2.80204C6.56761 3.12537 4.92043 3.6371 3.39743 4.3708C0.981226 8.3108 0.321543 12.137 0.651226 15.9037C2.78361 17.6038 4.87043 18.5504 6.91326 19.1071C7.42326 18.4371 7.88161 17.7171 8.27326 16.9471C7.50161 16.6671 6.77326 16.3171 6.07993 15.8904C6.27326 15.7371 6.46326 15.5771 6.64993 15.4104C9.87043 17.0371 13.5398 17.0371 16.7154 15.4104C16.9021 15.5904 17.0904 15.7371 17.2837 15.8904C16.5771 16.3271 15.8421 16.6771 15.0679 16.9571C15.4596 17.7171 15.9179 18.4371 16.4296 19.1071C18.4754 18.5504 20.5621 17.6038 22.6954 15.9037C23.0971 11.6471 22.0754 7.8671 20.317 4.3671ZM8.02043 13.5904C6.8365 13.5904 5.8733 12.5504 5.8733 11.2904C5.8733 10.0304 6.8365 9.00704 8.02043 9.00704C9.20326 9.00704 10.1733 10.0304 10.1733 11.2904C10.1733 12.5504 9.20326 13.5904 8.02043 13.5904ZM15.9838 13.5904C14.7992 13.5904 13.8362 12.5504 13.8362 11.2904C13.8362 10.0304 14.7992 9.00704 15.9838 9.00704C17.1671 9.00704 18.1363 10.0304 18.1363 11.2904C18.1363 12.5504 17.1671 13.5904 15.9838 13.5904Z"/>
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@NEARProtocol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-brand-orange transition-colors duration-200"
                  aria-label="YouTube"
                >
                  <Youtube size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/company/near-protocol-project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-brand-orange transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://www.tiktok.com/@near_protocol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-brand-orange transition-colors duration-200"
                  aria-label="TikTok"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.51v12.12a2.85 2.85 0 0 1-2.82 2.85 2.88 2.88 0 0 1-2.88-2.88 2.88 2.88 0 0 1 5.79-.64H10a6.68 6.68 0 0 0-6.7 6.7A6.72 6.72 0 0 0 10 22a6.67 6.67 0 0 0 6.7-6.7v-4.15a8.66 8.66 0 0 0 3.89 1v-3.51a4.9 4.9 0 0 1-.4-.04Z"/>
                  </svg>
                </a>
                <a
                  href="https://www.reddit.com/r/nearprotocol/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-brand-orange transition-colors duration-200"
                  aria-label="Reddit"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8.5 9.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M12.5 9.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M12 15.5c1.2 0 2.3-.5 3-1.3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  </svg>
                </a>
              </div>

              {/* Right: Legal & Other Links */}
              <div className="flex-shrink-0 flex items-center gap-6 text-sm">
                <a
                  href="https://www.near.org/terms-of-use"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors duration-200"
                >
                  Terms
                </a>
                <a
                  href="https://www.near.org/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors duration-200"
                >
                  Privacy
                </a>
                <a
                  href="https://www.near.org/cookie-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors duration-200"
                >
                  Cookies
                </a>
                <a
                  href="https://explorer.near-intents.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors duration-200"
                >
                  Explorer
                </a>
                <a
                  href="https://status.near-intents.org/posts/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors duration-200"
                >
                  Status
                </a>
              </div>
            </div>

            {/* Mobile Layout: Stacked */}
            <div className="md:hidden space-y-6">
              {/* Logo */}
              <a href="/" className="inline-block">
                <Image
                  src="/images/near-intents-logo-v2a.svg"
                  alt="NEAR Intents"
                  width={120}
                  height={20}
                  className="w-auto object-contain"
                  style={{ height: '20px' }}
                />
              </a>

              {/* Social Icons */}
              <div className="flex items-center gap-4">
                <a
                  href="https://x.com/near_intents"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-brand-orange transition-colors duration-200"
                  aria-label="X (Twitter)"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="https://t.me/near_intents"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-brand-orange transition-colors duration-200"
                  aria-label="Telegram"
                >
                  <Send size={18} />
                </a>
                <a
                  href="https://discord.gg/nearprotocol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-brand-orange transition-colors duration-200"
                  aria-label="Discord"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.317 4.3671C18.7945 3.63537 17.147 3.12204 15.3827 2.80204C15.1597 3.20204 14.8947 3.74704 14.7127 4.12704C12.7988 3.81371 10.8988 3.81371 9.01199 4.12704C8.82993 3.73537 8.55493 3.20204 8.32993 2.80204C6.56761 3.12537 4.92043 3.6371 3.39743 4.3708C0.981226 8.3108 0.321543 12.137 0.651226 15.9037C2.78361 17.6038 4.87043 18.5504 6.91326 19.1071C7.42326 18.4371 7.88161 17.7171 8.27326 16.9471C7.50161 16.6671 6.77326 16.3171 6.07993 15.8904C6.27326 15.7371 6.46326 15.5771 6.64993 15.4104C9.87043 17.0371 13.5398 17.0371 16.7154 15.4104C16.9021 15.5904 17.0904 15.7371 17.2837 15.8904C16.5771 16.3271 15.8421 16.6771 15.0679 16.9571C15.4596 17.7171 15.9179 18.4371 16.4296 19.1071C18.4754 18.5504 20.5621 17.6038 22.6954 15.9037C23.0971 11.6471 22.0754 7.8671 20.317 4.3671ZM8.02043 13.5904C6.8365 13.5904 5.8733 12.5504 5.8733 11.2904C5.8733 10.0304 6.8365 9.00704 8.02043 9.00704C9.20326 9.00704 10.1733 10.0304 10.1733 11.2904C10.1733 12.5504 9.20326 13.5904 8.02043 13.5904ZM15.9838 13.5904C14.7992 13.5904 13.8362 12.5504 13.8362 11.2904C13.8362 10.0304 14.7992 9.00704 15.9838 9.00704C17.1671 9.00704 18.1363 10.0304 18.1363 11.2904C18.1363 12.5504 17.1671 13.5904 15.9838 13.5904Z"/>
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@NEARProtocol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-brand-orange transition-colors duration-200"
                  aria-label="YouTube"
                >
                  <Youtube size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/company/near-protocol-project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-brand-orange transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="https://www.tiktok.com/@near_protocol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-brand-orange transition-colors duration-200"
                  aria-label="TikTok"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.51v12.12a2.85 2.85 0 0 1-2.82 2.85 2.88 2.88 0 0 1-2.88-2.88 2.88 2.88 0 0 1 5.79-.64H10a6.68 6.68 0 0 0-6.7 6.7A6.72 6.72 0 0 0 10 22a6.67 6.67 0 0 0 6.7-6.7v-4.15a8.66 8.66 0 0 0 3.89 1v-3.51a4.9 4.9 0 0 1-.4-.04Z"/>
                  </svg>
                </a>
                <a
                  href="https://www.reddit.com/r/nearprotocol/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-brand-orange transition-colors duration-200"
                  aria-label="Reddit"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8.5 9.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M12.5 9.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0M12 15.5c1.2 0 2.3-.5 3-1.3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  </svg>
                </a>
              </div>

              {/* Legal & Other Links */}
              <div className="flex flex-wrap gap-4 text-xs">
                <a
                  href="https://www.near.org/terms-of-use"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors duration-200"
                >
                  Terms
                </a>
                <a
                  href="https://www.near.org/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors duration-200"
                >
                  Privacy
                </a>
                <a
                  href="https://www.near.org/cookie-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors duration-200"
                >
                  Cookies
                </a>
                <a
                  href="https://explorer.near-intents.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors duration-200"
                >
                  Explorer
                </a>
                <a
                  href="https://status.near-intents.org/posts/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors duration-200"
                >
                  Status
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
