import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import { CTAButton } from '@/components/shared/CTAButton';
import { Github, Twitter, Send, Youtube, ArrowRight } from 'lucide-react';

export function FooterCTA() {
  return (
    <footer className="py-40 px-8 text-center bg-[#1E1E1E] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-orange-900/50 to-transparent"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-brand-orange-600/10 blur-[150px] rounded-full" />

      <RevealOnScroll>
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-white">
            Integrate and swap with Intents today
          </h2>

          {/* Orange horizontal line */}
          <div className="h-1 w-full max-w-2xl bg-brand-orange-600 mb-12"></div>

          <div className="flex justify-center mb-32">
            <CTAButton text="Talk with the team" />
          </div>

          {/* Iconos Sociales Minimalistas */}
          <div className="flex justify-center gap-8 items-center text-brand-orange">
            <Github size={20} className="hover:text-white transition-colors cursor-pointer" />
            <Twitter size={20} className="hover:text-white transition-colors cursor-pointer" />
            <Send size={20} className="hover:text-white transition-colors cursor-pointer" />
            <Youtube size={20} className="hover:text-white transition-colors cursor-pointer" />
          </div>

          <div className="mt-8 text-xs text-zinc-600">© 2024 NEAR Foundation.</div>
        </div>
      </RevealOnScroll>
    </footer>
  );
}
