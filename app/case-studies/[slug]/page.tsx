import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { getAllCaseStudies, getCaseStudy, getCaseStudiesForUseCase } from '@/lib/content';
import { Navigation } from '@/components/sections/Navigation';
import LightPageWrapper from '@/components/LightPageWrapper';
import StoryBeats from '@/components/case-studies/StoryBeats';
import UseCasesContent from '@/components/case-studies/UseCasesContent';
import CaseStudyCard from '@/components/case-studies/CaseStudyCard';

const statusColors: Record<string, string> = {
  live: 'bg-emerald-900/30 text-emerald-400',
  building: 'bg-amber-900/30 text-amber-400',
  opportunity: 'bg-blue-900/30 text-blue-400',
};

export async function generateStaticParams() {
  return getAllCaseStudies().map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: `${cs.name} — Case Study — NEAR Intents`,
    description: cs.description,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  // Related case studies: same user type, excluding self
  const allStudies = getAllCaseStudies().filter((c) => c.slug !== slug && c.userType === cs.userType);

  return (
    <>
      <Navigation />
      <LightPageWrapper>

        {/* Hero */}
        <div className="border-b border-white/10 bg-[#242424]">
          <div className="mx-auto max-w-5xl px-4 pt-24 pb-8 sm:px-6 sm:pt-28 sm:pb-10 lg:px-8">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
              {/* Logo */}
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-white/5 border border-white/10 sm:h-24 sm:w-24">
                <Image
                  src={cs.logo}
                  alt={cs.name}
                  fill
                  className="object-contain p-2"
                  sizes="96px"
                  priority
                />
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  {cs.userType && (
                    <span className="inline-flex rounded-full bg-emerald-900/30 px-2.5 py-0.5 text-xs font-medium text-emerald-400 capitalize">
                      {cs.userType.replace(/-/g, ' ')}
                    </span>
                  )}
                  {cs.chains?.map((chain) => (
                    <span key={chain} className="inline-flex rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/40 capitalize">
                      {chain}
                    </span>
                  ))}
                </div>
                <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">{cs.name}</h1>
                <p className="mt-2 text-base text-white/60 sm:text-lg">{cs.description}</p>
                {cs.url && (
                  <a
                    href={cs.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#fb4d01] hover:underline sm:mt-4"
                  >
                    Visit {cs.name}
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          {/* Story Beats */}
          {cs.storyBeats?.length > 0 && (
            <section className="py-6 sm:py-8">
              <StoryBeats beats={cs.storyBeats} />
            </section>
          )}

          {/* Metrics */}
          {cs.metrics?.length > 0 && (
            <section className="py-5 sm:py-6">
              <div className={`grid gap-px rounded-xl border border-white/10 bg-white/5 overflow-hidden ${
                cs.metrics.length <= 2 ? 'grid-cols-2' :
                cs.metrics.length === 3 ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'
              }`}>
                {cs.metrics.map((m) => (
                  <div key={m.label} className="bg-[#242424] px-5 py-5 text-center sm:px-6 sm:py-6">
                    <p className="text-2xl font-bold text-[#fb4d01] sm:text-3xl">{m.value}</p>
                    <p className="mt-1 text-sm text-white/60">{m.label}</p>
                    {m.period && <p className="mt-0.5 text-xs text-white/40">{m.period}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Use Cases (main content) */}
          {cs.useCases?.length > 0 && (
            <section className="py-6 sm:py-8">
              <h2 className="mb-2 text-xl font-bold text-white sm:text-2xl">
                How {cs.name} uses NEAR Intents
              </h2>
              <p className="mb-8 text-sm text-white/60 sm:text-base">
                {cs.useCases.length} integration{cs.useCases.length !== 1 ? 's' : ''} powered by NEAR Intents
              </p>
              <UseCasesContent useCases={cs.useCases} />
            </section>
          )}

          {/* Related Case Studies */}
          {allStudies.length > 0 && (
            <section className="py-6 sm:py-8">
              <h2 className="mb-6 text-xl font-bold text-white sm:text-2xl">Related Case Studies</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                {allStudies.map((related) => (
                  <CaseStudyCard key={related.slug} caseStudy={related} />
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="py-6 sm:py-8">
            <div className="rounded-xl border border-white/10 bg-[#242424] p-6 text-center shadow-sm sm:p-10">
              <h3 className="text-xl font-bold text-white sm:text-2xl">
                Build something like {cs.name}?
              </h3>
              <p className="mx-auto mt-2 max-w-lg text-sm text-white/60 sm:mt-3 sm:text-base">
                Add cross-chain capabilities to your product. Widget integration takes a day. API integration takes a week.
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
          </section>

        </div>
      </LightPageWrapper>
    </>
  );
}
