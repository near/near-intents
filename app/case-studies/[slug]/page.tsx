import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getAllCaseStudies, getCaseStudy } from '@/lib/content';
import { Navigation } from '@/components/sections/Navigation';
import LightPageWrapper from '@/components/LightPageWrapper';
import TransformationStrip from '@/components/case-studies/TransformationStrip';
import UseCasesJoined from '@/components/case-studies/UseCasesJoined';

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

  return (
    <>
      <Navigation />
      <LightPageWrapper>
        <div className="max-w-5xl mx-auto px-6 md:px-12 pt-32 pb-20">
          <div className="mb-10">
            <Link href="/case-studies" className="text-[12px] text-white/40 hover:text-[#fb4d01] transition-colors">
              ← All case studies
            </Link>
          </div>

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-6 mb-10">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/10 bg-white/5 shrink-0">
              <Image
                src={cs.logo}
                alt={cs.name}
                fill
                className="object-contain p-2"
                sizes="64px"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl md:text-4xl font-black tracking-tight">{cs.name}</h1>
                {cs.status && (
                  <span className={`text-[11px] font-semibold rounded-full px-3 py-1 capitalize ${statusColors[cs.status] ?? 'bg-gray-100 text-gray-600'}`}>
                    {cs.status}
                  </span>
                )}
              </div>
              <a
                href={cs.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-white/40 hover:text-[#fb4d01] transition-colors"
              >
                {cs.url} ↗
              </a>
              <p className="text-[15px] text-white/60 mt-3 max-w-2xl leading-relaxed">{cs.description}</p>
            </div>
          </div>

          {/* Metrics */}
          {cs.metrics?.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
              {cs.metrics.map((m) => (
                <div key={m.label} className="bg-[#242424] rounded-xl border border-white/10 p-4">
                  <p className="text-2xl font-black text-[#fb4d01]">{m.value}</p>
                  <p className="text-[12px] text-white/60 mt-1">{m.label}</p>
                  {m.period && <p className="text-[11px] text-white/40">{m.period}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Cover image */}
          {cs.coverImage && (
            <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 mb-12 aspect-[16/7]">
              <Image
                src={cs.coverImage}
                alt={cs.name}
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 900px"
              />
            </div>
          )}

          {/* Transformation */}
          {cs.transformation && (
            <section className="mb-12">
              <h2 className="text-2xl font-black tracking-tight mb-6">The Transformation</h2>
              <TransformationStrip transformation={cs.transformation} />
            </section>
          )}

          {/* Story Beats */}
          {cs.storyBeats?.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-black tracking-tight mb-6">The Story</h2>
              <div className="flex flex-col gap-4">
                {cs.storyBeats.map((beat, i) => (
                  <div key={i} className="flex gap-4 bg-[#242424] rounded-xl border border-white/10 p-5">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 shrink-0 text-[#fb4d01] font-bold text-sm">
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-[14px] mb-0.5">{beat.label}</p>
                      <p className="text-[13px] text-white/60 leading-relaxed">{beat.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Use Cases */}
          {cs.useCases?.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-black tracking-tight mb-6">How They Use It</h2>
              <UseCasesJoined useCases={cs.useCases} />
            </section>
          )}

          <div className="pt-8 border-t border-white/10">
            <Link
              href="/case-studies"
              className="text-[13px] font-semibold text-[#fb4d01] hover:underline"
            >
              ← Back to all case studies
            </Link>
          </div>
        </div>
      </LightPageWrapper>
    </>
  );
}
