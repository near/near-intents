import { getAllCaseStudies } from '@/lib/content';
import { NavigationWrapper as Navigation } from '@/components/sections/NavigationWrapper';
import LightPageWrapper from '@/components/LightPageWrapper';
import CaseStudyCard from '@/components/case-studies/CaseStudyCard';
import OverviewFooter from '@/components/overview/OverviewFooter';

export const metadata = {
  title: 'Case Studies — NEAR Intents',
  description: 'See how real teams use NEAR Intents to ship cross-chain experiences — ZODL, near.com, Solana, and more.',
};

export default function CaseStudiesPage() {
  const caseStudies = getAllCaseStudies();

  return (
    <>
      <Navigation />
      <LightPageWrapper>
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 pt-24 sm:pt-28">
          <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">Case Studies</h1>
          <p className="mt-2 text-sm text-white/60 sm:text-base">
            Real partners building with NEAR Intents
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-6 lg:grid-cols-2">
            {caseStudies.map((cs) => (
              <CaseStudyCard key={cs.slug} caseStudy={cs} />
            ))}
          </div>
        </div>
      </LightPageWrapper>
      <OverviewFooter />
    </>
  );
}
