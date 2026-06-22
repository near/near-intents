import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { NavigationWrapper as Navigation } from '@/components/sections/NavigationWrapper';
import { FooterCTA } from '@/components/sections/FooterCTA';
import EcosystemGrid from '@/components/ecosystem/EcosystemGrid';

export const metadata = {
  title: 'Ecosystem — NEAR Intents',
  description: 'Explore all our ecosystem partners for seamless cross-chain interactions',
};

export default function EcosystemPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#000000] text-white selection:bg-brand-orange-500 selection:text-black">
      <Navigation />

      {/* Header */}
      <section className="pt-28 pb-12 md:pt-32 md:pb-16 px-8 md:px-20" style={{ background: '#000000' }}>
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-brand-orange transition-colors mb-8">
            <ArrowLeft size={16} />
            <span className="text-sm">Back</span>
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Intents <span className="text-brand-orange">Ecosystem</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl">
            Explore all our ecosystem partners for seamless cross-chain interactions
          </p>
        </div>
      </section>

      <EcosystemGrid />

      <FooterCTA />
    </div>
  );
}
