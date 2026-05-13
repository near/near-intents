import Link from 'next/link';
import { userTypes } from '@/lib/data/user-types';

const FEATURED_SLUGS = [
  'single-chain-wallet',
  'multi-chain-wallet',
  'ai-agent',
  'payment-app',
  'blockchain',
  'dex',
];

export default function UserTypeSelector() {
  const featured = FEATURED_SLUGS.map(
    (slug) => userTypes.find((ut) => ut.slug === slug)
  ).filter(Boolean) as typeof userTypes;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
      <h2 className="mb-2 text-center text-xl font-bold text-white sm:text-2xl">
        What are you building?
      </h2>
      <p className="mb-6 text-center text-sm text-white/40 sm:mb-8 sm:text-base">
        See use cases tailored to your product
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {featured.map((ut) => (
          <Link
            key={ut.slug}
            href={`/use-cases`}
            className="block rounded-xl border border-white/10 bg-[#242424] p-5 shadow-sm transition-all hover:border-[#fb4d01]/40 hover:shadow-md sm:p-6"
          >
            <h3 className="text-base font-semibold text-white sm:text-lg">{ut.name}</h3>
            <p className="mt-1 text-sm text-white/60">{ut.question}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
