import type { Metadata } from 'next';
import { Navigation } from '@/components/sections/Navigation';
import { ConfidentialHeroV2 } from '@/components/sections/ConfidentialHeroV2';
import { ConfidentialProblemV2 } from '@/components/sections/ConfidentialProblemV2';
import { ConfidentialDifferentiatorsBento } from '@/components/sections/ConfidentialDifferentiatorsBento';
import { ConfidentialUseCasesGlass } from '@/components/sections/ConfidentialUseCasesGlass';
import { ConfidentialHowItWorksV2 } from '@/components/sections/ConfidentialHowItWorksV2';
import { ConfidentialCTAV2 } from '@/components/sections/ConfidentialCTAV2';

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
    <div className="min-h-screen bg-[#0A0D14] text-white font-sans selection:bg-brand-orange-500 selection:text-black mesh-gradient-v2">
      <Navigation />
      <ConfidentialHeroV2 />
      <ConfidentialProblemV2 />
      <ConfidentialDifferentiatorsBento />
      <ConfidentialUseCasesGlass />
      <ConfidentialHowItWorksV2 />
      <ConfidentialCTAV2 />
    </div>
  );
}
