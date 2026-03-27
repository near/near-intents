import type { Metadata } from 'next';
import { Navigation } from '@/components/sections/Navigation';
import { ConfidentialHero } from '@/components/sections/ConfidentialHero';
import { ConfidentialProblem } from '@/components/sections/ConfidentialProblem';
import { ConfidentialDifferentiators } from '@/components/sections/ConfidentialDifferentiators';
import { ConfidentialUseCases } from '@/components/sections/ConfidentialUseCases';
import { ConfidentialHowItWorks } from '@/components/sections/ConfidentialHowItWorks';
import { ConfidentialCTA } from '@/components/sections/ConfidentialCTA';

export const metadata: Metadata = {
  title: 'Confidential Intents | Confidential Cross-Chain Execution on NEAR',
  description:
    'Confidential Intents brings institutional-grade confidentiality to cross-chain DeFi. No MEV, no frontrunning, no strategy exposure. Live on near.com.',
  openGraph: {
    title: 'Confidential Intents | Confidential Cross-Chain Execution on NEAR',
    description:
      'Confidential Intents brings institutional-grade confidentiality to cross-chain DeFi. No MEV, no frontrunning, no strategy exposure. Live on near.com.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Confidential Intents | Confidential Cross-Chain Execution on NEAR',
    description:
      'Confidential Intents brings institutional-grade confidentiality to cross-chain DeFi. No MEV, no frontrunning, no strategy exposure. Live on near.com.',
  },
};

export default function ConfidentialPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-brand-orange-500 selection:text-black">
      <Navigation />
      <ConfidentialHero />
      <ConfidentialProblem />
      <ConfidentialDifferentiators />
      <ConfidentialUseCases />
      <ConfidentialHowItWorks />
      <ConfidentialCTA />
    </div>
  );
}
