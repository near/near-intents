import { ExternalLink } from 'lucide-react';
import { getProtocolStats } from '@/lib/clickhouse';
import { getTotalFees } from '@/lib/near-revenue-api';
import { ALL_TIME_VOLUME_LABEL, formatVolume } from '@/lib/formatVolume';

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M+`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K+`;
  return String(n);
}

export default async function StatsBar() {
  const [stats, totalFeesUsd] = await Promise.all([
    getProtocolStats(),
    getTotalFees(),
  ]);

  const items = [
    {
      label: 'Swap Volume',
      value: ALL_TIME_VOLUME_LABEL,
      href: 'https://dune.com/near/near-intents',
    },
    {
      label: 'Fees Generated',
      value: totalFeesUsd != null ? formatVolume(totalFeesUsd) : '$32.2M+',
      href: 'https://dune.com/near/near-intents',
    },
    {
      label: 'Chains Supported',
      value: stats ? String(stats.chainCount) : '33',
      href: 'https://docs.near-intents.org/resources/chain-support',
    },
  ];

  return (
    <div className="border-t border-white/10 border-b border-b-white/10 bg-black">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-10 sm:px-6 sm:grid-cols-3 lg:px-8">
        {items.map((s) => (
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
