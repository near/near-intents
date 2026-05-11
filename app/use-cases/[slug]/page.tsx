import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllUseCases, getUseCase, getCaseStudiesForUseCase } from '@/lib/content';
import { Navigation } from '@/components/sections/Navigation';
import LightPageWrapper from '@/components/LightPageWrapper';
import HowItWorksSteps from '@/components/use-cases/HowItWorksSteps';
import ScreenshotGallery from '@/components/use-cases/ScreenshotGallery';
import FeaturedPartners from '@/components/use-cases/FeaturedPartners';
import UserStoryFlow from '@/components/use-cases/UserStoryFlow';
import RevenueModel from '@/components/use-cases/RevenueModel';
import CaseStudyCard from '@/components/case-studies/CaseStudyCard';
import CaseStudyCTA from '@/components/case-studies/CaseStudyCTA';
import { heroComponents } from '@/components/use-cases/heroes';

export async function generateStaticParams() {
  return getAllUseCases().map((uc) => ({ slug: uc.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const uc = getUseCase(slug);
  if (!uc) return {};
  return {
    title: `${uc.name} — NEAR Intents`,
    description: uc.tagline,
  };
}

export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const uc = getUseCase(slug);
  if (!uc) notFound();

  const relatedCaseStudies = getCaseStudiesForUseCase(slug);
  const HeroComponent = uc.demoComponent ? heroComponents[uc.demoComponent] : null;

  return (
    <>
      <Navigation />
      <LightPageWrapper>
        <div className="max-w-4xl mx-auto px-6 md:px-10 pt-32 pb-20">

          {/* Back */}
          <div className="mb-6">
            <Link href="/use-cases" className="text-[12px] text-white/40 hover:text-[#fb4d01] transition-colors">
              ← All use cases
            </Link>
          </div>

          {/* Hero */}
          <div className={HeroComponent ? 'mb-6' : 'mb-10 sm:mb-14'}>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">{uc.name}</h1>
            <p className="text-base sm:text-lg text-white/60 max-w-2xl leading-relaxed">{uc.tagline}</p>
          </div>

          {/* Visual hero demo */}
          {HeroComponent && (
            <div className="mb-10 sm:mb-14 max-w-md mx-auto">
              <HeroComponent />
            </div>
          )}

          {/* How It Works */}
          {uc.howItWorksSteps?.length > 0 && (
            <section className="mb-10 sm:mb-14">
              <h2 className="text-xl font-black tracking-tight mb-5">How It Works</h2>
              <HowItWorksSteps steps={uc.howItWorksSteps} />
            </section>
          )}

          {/* Examples gallery */}
          {uc.screenshots?.length > 0 && (
            <section className="mb-10 sm:mb-14">
              <h2 className="text-xl font-black tracking-tight mb-5">Examples</h2>
              <ScreenshotGallery screenshots={uc.screenshots} />
            </section>
          )}

          {/* Featured Partners */}
          {uc.featuredPartners?.length > 0 && (
            <section className="mb-10 sm:mb-14">
              <h2 className="text-xl font-black tracking-tight mb-5">Integrations</h2>
              <FeaturedPartners partners={uc.featuredPartners} />
            </section>
          )}

          {/* User Stories */}
          {uc.userStories?.length > 0 && (
            <section className="mb-10 sm:mb-14">
              <h2 className="text-xl font-black tracking-tight mb-5">User Stories</h2>
              <UserStoryFlow stories={uc.userStories} />
            </section>
          )}

          {/* Related Case Studies */}
          {relatedCaseStudies.length > 0 && (
            <section className="mb-10 sm:mb-14">
              <h2 className="text-xl font-black tracking-tight mb-5">Case Studies</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {relatedCaseStudies.map((cs) => (
                  <CaseStudyCard key={cs.slug} caseStudy={cs} />
                ))}
              </div>
            </section>
          )}

          {/* Revenue Model */}
          {uc.revenueModel?.feeStructure && (
            <section className="mb-10 sm:mb-14">
              <h2 className="text-xl font-black tracking-tight mb-5">Revenue Model</h2>
              <RevenueModel model={uc.revenueModel} />
            </section>
          )}

          {/* CTA */}
          <CaseStudyCTA partnerName="NEAR Intents" />

          <div className="pt-8 border-t border-white/10 mt-10">
            <Link href="/use-cases" className="text-[13px] font-semibold text-[#fb4d01] hover:underline">
              ← Back to all use cases
            </Link>
          </div>
        </div>
      </LightPageWrapper>
    </>
  );
}
