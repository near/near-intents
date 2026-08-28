import { NavigationWrapper as Navigation } from '@/components/sections/NavigationWrapper';
import { Hero } from '@/components/sections/Hero';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { FeatureCards } from '@/components/sections/FeatureCards';
import { IntegratePartners } from '@/components/sections/IntegratePartners';
import { IntentsEcosystemSection } from '@/components/sections/IntentsEcosystemSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FeatureHighlights } from '@/components/sections/FeatureHighlights';
import { NewsSection } from '@/components/sections/NewsSection';
import { FooterCTA } from '@/components/sections/FooterCTA';
import { getChainIcons } from '@/lib/airtable';
import { getProtocolStats } from '@/lib/clickhouse';
import { buildMetadata } from '@/lib/seo';

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: 'NEAR Intents - The Universal Liquidity Protocol',
  description:
    'NEAR Intents powers one-click cross-chain swaps, unified liquidity, and universal execution for onchain markets.',
  path: '/',
});

export default async function Home() {
  const [chainIcons, stats] = await Promise.all([getChainIcons(), getProtocolStats()]);
  const initialLogos = chainIcons.map(icon => ({ src: icon.logo_bw_url, alt: icon.name }));

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white font-sans selection:bg-brand-orange-500 selection:text-black">
      <Navigation />
      <Hero initialLogos={initialLogos} stats={stats ?? undefined} />
      <HowItWorks />
      <FeatureCards />
      <div className="hidden">
        <IntegratePartners />
      </div>
      <TestimonialsSection />
      <FeatureHighlights />
      <IntentsEcosystemSection />
      <div className="hidden">
        <NewsSection />
      </div>
      <FooterCTA />
    </div>
  );
}
