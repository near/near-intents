import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getAllUseCases, getUseCase, getCaseStudiesForUseCase } from '@/lib/content';
import { Navigation } from '@/components/sections/Navigation';
import LightPageWrapper from '@/components/LightPageWrapper';
import HowItWorksSteps from '@/components/use-cases/HowItWorksSteps';
import ScreenshotGallery from '@/components/use-cases/ScreenshotGallery';
import FeaturedPartners from '@/components/use-cases/FeaturedPartners';
import CaseStudyCard from '@/components/case-studies/CaseStudyCard';

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

  return (
    <>
      <Navigation />
      <LightPageWrapper>
        <div className="max-w-5xl mx-auto px-6 md:px-12 pt-32 pb-20">
          <div className="mb-10">
            <Link href="/use-cases" className="text-[12px] text-white/40 hover:text-[#fb4d01] transition-colors">
              ← All use cases
            </Link>
          </div>

          {/* Hero */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">{uc.name}</h1>
            <p className="text-[18px] text-white/60 max-w-2xl leading-relaxed">{uc.tagline}</p>
          </div>

          {uc.coverImage && (
            <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 mb-12 aspect-[16/7]">
              <Image
                src={uc.coverImage}
                alt={uc.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1200px) 100vw, 900px"
              />
            </div>
          )}

          {/* How It Works */}
          {uc.howItWorksSteps?.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-black tracking-tight mb-6">How It Works</h2>
              <HowItWorksSteps steps={uc.howItWorksSteps} />
            </section>
          )}

          {/* Featured Partners */}
          {uc.featuredPartners?.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-black tracking-tight mb-6">Integrations</h2>
              <FeaturedPartners partners={uc.featuredPartners} />
            </section>
          )}

          {/* Screenshots */}
          {uc.screenshots?.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-black tracking-tight mb-6">In the Wild</h2>
              <ScreenshotGallery screenshots={uc.screenshots} />
            </section>
          )}

          {/* Related Case Studies */}
          {relatedCaseStudies.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-black tracking-tight mb-6">Case Studies</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {relatedCaseStudies.map((cs) => (
                  <CaseStudyCard key={cs.slug} caseStudy={cs} />
                ))}
              </div>
            </section>
          )}

          <div className="pt-8 border-t border-white/10">
            <Link
              href="/use-cases"
              className="text-[13px] font-semibold text-[#fb4d01] hover:underline"
            >
              ← Back to all use cases
            </Link>
          </div>
        </div>
      </LightPageWrapper>
    </>
  );
}
