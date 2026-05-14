import { getAllCaseStudies } from '@/lib/content';
import { NavigationWrapper as Navigation } from '@/components/sections/NavigationWrapper';
import HeroSection from '@/components/overview/HeroSection';
import PartnerMarquee from '@/components/overview/PartnerMarquee';
import StatsBar from '@/components/overview/StatsBar';
import CaseStudyCarousel from '@/components/overview/CaseStudyCarousel';
import UserTypeSelector from '@/components/overview/UserTypeSelector';
import TickerBoard from '@/components/overview/TickerBoard';
import ChainGrid from '@/components/overview/ChainGrid';
import OverviewCTA from '@/components/overview/OverviewCTA';
import OverviewFooter from '@/components/overview/OverviewFooter';

export const metadata = {
  title: 'Overview — NEAR Intents',
  description: 'Explore NEAR Intents: the universal liquidity protocol powering cross-chain swaps, payments, and asset flows across 31 chains.',
};

export default function OverviewPage() {
  const caseStudies = getAllCaseStudies();

  return (
    <>
      <Navigation />
      <main className="bg-black text-white min-h-screen pt-16">
        <HeroSection />
        <PartnerMarquee />
        <StatsBar />
        <CaseStudyCarousel caseStudies={caseStudies} />
        <UserTypeSelector />
        <TickerBoard />
        <ChainGrid />
        <OverviewCTA />
      </main>
      <OverviewFooter />
    </>
  );
}
