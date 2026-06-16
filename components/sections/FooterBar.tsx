import Image from 'next/image';
import { FaXTwitter, FaDiscord, FaTiktok, FaReddit, FaYoutube, FaLinkedin } from 'react-icons/fa6';
import { Send } from 'lucide-react';

export function FooterBar() {
  return (
    <div className="px-8 md:px-20 py-12 md:py-16 font-sans">
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
            <a href="https://x.com/near_intents" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-brand-orange transition-colors duration-200" aria-label="X"><FaXTwitter size={20} /></a>
            <a href="https://t.me/near_intents" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-brand-orange transition-colors duration-200" aria-label="Telegram"><Send size={20} /></a>
            <a href="https://discord.gg/nearprotocol" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-brand-orange transition-colors duration-200" aria-label="Discord"><FaDiscord size={20} /></a>
            <a href="https://www.youtube.com/@NEARProtocol" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-brand-orange transition-colors duration-200" aria-label="YouTube"><FaYoutube size={20} /></a>
            <a href="https://www.linkedin.com/company/near-protocol-project" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-brand-orange transition-colors duration-200" aria-label="LinkedIn"><FaLinkedin size={20} /></a>
            <a href="https://www.tiktok.com/@near_protocol" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-brand-orange transition-colors duration-200" aria-label="TikTok"><FaTiktok size={20} /></a>
            <a href="https://www.reddit.com/r/nearprotocol/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-brand-orange transition-colors duration-200" aria-label="Reddit"><FaReddit size={20} /></a>
          </div>

          {/* Right: Explorer, Status, Legal Links */}
          <div className="flex-shrink-0 flex items-center gap-6 text-sm">
            <a href="https://explorer.near-intents.org/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors duration-200">Explorer</a>
            <a href="https://status.near-intents.org/posts/dashboard" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors duration-200">Status</a>
            <span className="text-white/40">|</span>
            <a href="https://www.near.org/terms-of-use" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors duration-200">Terms</a>
            <a href="https://www.near.org/privacy" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors duration-200">Privacy</a>
            <a href="https://www.near.org/cookie-policy" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors duration-200">Cookies</a>
            <a href="/disclaimers" className="text-white/60 hover:text-white transition-colors duration-200">Disclaimers</a>
          </div>
        </div>

        {/* Mobile Layout: Stacked */}
        <div className="md:hidden space-y-6">
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

          <div className="flex items-center gap-4">
            <a href="https://x.com/near_intents" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-brand-orange transition-colors duration-200" aria-label="X"><FaXTwitter size={18} /></a>
            <a href="https://t.me/near_intents" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-brand-orange transition-colors duration-200" aria-label="Telegram"><Send size={18} /></a>
            <a href="https://discord.gg/nearprotocol" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-brand-orange transition-colors duration-200" aria-label="Discord"><FaDiscord size={18} /></a>
            <a href="https://www.youtube.com/@NEARProtocol" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-brand-orange transition-colors duration-200" aria-label="YouTube"><FaYoutube size={18} /></a>
            <a href="https://www.linkedin.com/company/near-protocol-project" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-brand-orange transition-colors duration-200" aria-label="LinkedIn"><FaLinkedin size={18} /></a>
            <a href="https://www.tiktok.com/@near_protocol" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-brand-orange transition-colors duration-200" aria-label="TikTok"><FaTiktok size={18} /></a>
            <a href="https://www.reddit.com/r/nearprotocol/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-brand-orange transition-colors duration-200" aria-label="Reddit"><FaReddit size={18} /></a>
          </div>

          <div className="flex flex-wrap gap-4 text-xs">
            <a href="https://explorer.near-intents.org/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors duration-200">Explorer</a>
            <a href="https://status.near-intents.org/posts/dashboard" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors duration-200">Status</a>
            <span className="text-white/40">|</span>
            <a href="https://www.near.org/terms-of-use" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors duration-200">Terms</a>
            <a href="https://www.near.org/privacy" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors duration-200">Privacy</a>
            <a href="https://www.near.org/cookie-policy" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors duration-200">Cookies</a>
            <a href="/disclaimers" className="text-white/60 hover:text-white transition-colors duration-200">Disclaimers</a>
          </div>
        </div>
      </div>
    </div>
  );
}
