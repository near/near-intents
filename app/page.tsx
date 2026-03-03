import { Navigation } from '@/components/sections/Navigation';
import { Hero } from '@/components/sections/Hero';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { FeatureCards } from '@/components/sections/FeatureCards';
import { IntegratePartners } from '@/components/sections/IntegratePartners';
import { IntentsEcosystemSection } from '@/components/sections/IntentsEcosystemSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FeatureHighlights } from '@/components/sections/FeatureHighlights';
import { NewsSection } from '@/components/sections/NewsSection';
import { FooterCTA } from '@/components/sections/FooterCTA';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white font-sans selection:bg-brand-orange-500 selection:text-black">
      <Navigation />
      <Hero />
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
