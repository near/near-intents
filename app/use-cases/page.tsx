import { getAllUseCases } from '@/lib/content';
import { Navigation } from '@/components/sections/Navigation';
import LightPageWrapper from '@/components/LightPageWrapper';
import UseCaseCard from '@/components/use-cases/UseCaseCard';
import Link from 'next/link';

export const metadata = {
  title: 'Use Cases — NEAR Intents',
  description: 'Explore what you can build with NEAR Intents: cross-chain swaps, payments, asset onboarding, and more across 31 chains.',
};

export default function UseCasesPage() {
  const useCases = getAllUseCases();

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
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Use Cases</h1>
            <p className="text-[16px] text-white/60 max-w-2xl leading-relaxed">
              Everything you can ship with NEAR Intents — cross-chain swaps, payments, asset onboarding, and more.
              One integration, 31 chains, 100+ assets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {useCases.map((uc) => (
              <UseCaseCard key={uc.slug} useCase={uc} />
            ))}
          </div>
        </div>
      </LightPageWrapper>
    </>
  );
}
