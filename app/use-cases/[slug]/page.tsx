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

          {/* Hero — two-column when demo exists */}
          {HeroComponent ? (
            <div className="mb-10 sm:mb-14">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">{uc.name}</h1>
              <p className="text-base text-white/60 mb-8 leading-relaxed">{uc.tagline}</p>

              <div className="bg-[#1a1a1a] rounded-2xl border border-white/10 p-6 sm:p-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Left: interactive demo */}
                  <div className="w-full md:w-[44%] shrink-0">
                    <HeroComponent />
                  </div>

                  {/* Right: marketing copy + stats */}
                  <div className="flex-1 md:pt-2">
                    <p className="text-[11px] font-semibold text-[#fb4d01] uppercase tracking-widest mb-4">
                      NEAR Intents
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight text-white mb-4">
                      {uc.name}
                    </h2>
                    <p className="text-white/60 text-[14px] leading-relaxed mb-8">
                      {uc.tagline}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 border-t border-white/10 pt-6">
                      {[
                        { value: '31', label: 'chains' },
                        { value: '100+', label: 'assets' },
                        { value: '~30s', label: 'settlement' },
                        { value: '1 day', label: 'to integrate' },
                      ].map((s) => (
                        <div key={s.label}>
                          <p className="text-[#fb4d01] font-black text-[22px] leading-none">{s.value}</p>
                          <p className="text-white/40 text-[12px] mt-1">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-10 sm:mb-14">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">{uc.name}</h1>
              <p className="text-base sm:text-lg text-white/60 max-w-2xl leading-relaxed">{uc.tagline}</p>
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
          <div className="rounded-xl border border-white/10 bg-[#242424] p-6 text-center shadow-sm sm:p-8">
            <h3 className="text-xl font-bold text-white sm:text-2xl">
              Ready to add {uc.name.toLowerCase()} to your product?
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-sm text-white/60 sm:mt-3 sm:text-base">
              Integrate cross-chain capabilities in as little as 1 day with the NEAR Intents widget, or 1 week via API.
            </p>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:mt-6 sm:flex-row sm:gap-4">
              <a
                href="https://docs.near-intents.org"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-lg bg-[#fb4d01] px-6 py-3 text-sm font-semibold text-white hover:opacity-90 sm:w-auto"
              >
                Integrate Now
              </a>
              <a
                href="https://t.me/near_intents"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-lg border border-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-[#fb4d01] hover:text-[#fb4d01] sm:w-auto"
              >
                Talk to the Team
              </a>
            </div>
          </div>
        </div>
      </LightPageWrapper>
    </>
  );
}
