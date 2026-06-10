import { ExternalLink } from 'lucide-react';

const STATS = [
  { label: 'Swap Volume',      value: '$18.4B+', href: 'https://dune.com/near/near-intents' },
  { label: 'Total Swaps',      value: '24.6M+',  href: 'https://dune.com/near/near-intents' },
  { label: 'Fees Generated',   value: '$32.2M+', href: 'https://dune.com/near/near-intents' },
  { label: 'Chains Supported', value: '31',       href: 'https://docs.near-intents.org/resources/chain-support' },
];

export default function StatsBar() {
  return (
    <div className="border-t border-white/10 border-b border-b-white/10 bg-black">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
        {STATS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block text-center transition-opacity hover:opacity-80"
          >
            <div className="text-2xl font-bold text-[#fb4d01] sm:text-3xl">{s.value}</div>
            <div className="mt-1 flex items-center justify-center gap-1 text-sm text-white/40">
              {s.label}
              <ExternalLink size={12} className="shrink-0 text-white/30 group-hover:text-[#fb4d01]" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
