import { getAllUseCases, getCaseStudyLogosForUseCase } from '@/lib/content';
import { userTypes } from '@/lib/data/user-types';
import { NavigationWrapper as Navigation } from '@/components/sections/NavigationWrapper';
import LightPageWrapper from '@/components/LightPageWrapper';
import UseCasesList from '@/components/use-cases/UseCasesList';
import OverviewFooter from '@/components/overview/OverviewFooter';
import { FooterBar } from '@/components/sections/FooterBar';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Use Cases — NEAR Intents',
  description: 'Explore what you can build with NEAR Intents: cross-chain swaps, payments, asset onboarding, and more across 31 chains.',
  path: '/use-cases',
});

export default function UseCasesPage() {
  const useCases = getAllUseCases();
  const caseStudyLogosMap = Object.fromEntries(
    useCases.map((uc) => [uc.slug, getCaseStudyLogosForUseCase(uc.slug)])
  );

  return (
    <>
      <Navigation />
      <LightPageWrapper>
        <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 sm:py-14 lg:px-8 pt-24 sm:pt-28">
          <div className="mb-10 sm:mb-12">
            <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">Use Cases</h1>
            <p className="mt-2 text-sm text-white/60 sm:text-base">
              Everything you can ship with NEAR Intents — cross-chain swaps, payments, asset onboarding, and more.
            </p>
          </div>

          <UseCasesList
            useCases={useCases}
            userTypes={userTypes}
            caseStudyLogosMap={caseStudyLogosMap}
          />
        </div>
      </LightPageWrapper>
      <div className="hidden"><OverviewFooter /></div>
      <FooterBar />
    </>
  );
}
