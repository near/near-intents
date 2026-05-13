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

const ICONS: Record<string, string> = {
  'single-chain-wallet': '👛',
  'multi-chain-wallet':  '🔗',
  'ai-agent':            '🤖',
  'payment-app':         '💳',
  'blockchain':          '⛓️',
  'dex':                 '⚡',
};

export default function UserTypeSelector() {
  const featured = FEATURED_SLUGS.map(
    (slug) => userTypes.find((ut) => ut.slug === slug)
  ).filter(Boolean) as typeof userTypes;

  return (
    <section className="py-16 md:py-20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-2">
            What are you building?
          </h2>
          <p className="text-white/50 text-[14px]">
            NEAR Intents plugs into any product that moves value.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((ut) => (
            <Link
              key={ut.slug}
              href={`/use-cases`}
              className="group flex items-start gap-4 bg-[#242424] rounded-xl border border-white/10 p-5 hover:border-[#fb4d01]/40 hover:bg-white/5 transition-all duration-200"
            >
              <span className="text-2xl shrink-0 mt-0.5">{ICONS[ut.slug] ?? '🔧'}</span>
              <div>
                <p className="font-bold text-[14px] text-white group-hover:text-[#fb4d01] transition-colors mb-1">
                  {ut.name}
                </p>
                <p className="text-[12px] text-white/50 leading-relaxed">{ut.question}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
