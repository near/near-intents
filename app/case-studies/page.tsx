import { getAllCaseStudies } from '@/lib/content';
import { Navigation } from '@/components/sections/Navigation';
import LightPageWrapper from '@/components/LightPageWrapper';
import CaseStudyCard from '@/components/case-studies/CaseStudyCard';
import Link from 'next/link';

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
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20">
          <div className="mb-10">
            <Link href="/" className="text-[12px] text-white/40 hover:text-[#fb4d01] transition-colors">
              ← Back to home
            </Link>
          </div>

          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Case Studies</h1>
            <p className="text-[16px] text-white/60 max-w-2xl leading-relaxed">
              Real integrations, real results. See how teams are using NEAR Intents to ship cross-chain features
              their users actually need.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {caseStudies.map((cs) => (
              <CaseStudyCard key={cs.slug} caseStudy={cs} />
            ))}
          </div>
        </div>
      </LightPageWrapper>
    </>
  );
}
