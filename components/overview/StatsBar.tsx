const STATS = [
  { label: 'Swap Volume',      value: '$18.4B+',  href: 'https://dune.com/near/near-intents' },
  { label: 'Total Swaps',      value: '24.6M+',   href: 'https://dune.com/near/near-intents' },
  { label: 'Fees Generated',   value: '$32.2M+',  href: 'https://dune.com/near/near-intents' },
  { label: 'Chains Supported', value: '31',        href: 'https://docs.near-intents.org/resources/chain-support' },
];

export default function StatsBar() {
  return (
    <div className="border-y border-white/10 bg-white/3">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col gap-1 py-6 px-4 hover:bg-white/5 transition-colors ${i < STATS.length - 1 ? 'border-r border-white/10' : ''}`}
            >
              <span className="text-2xl md:text-3xl font-black text-[#fb4d01]">{s.value}</span>
              <span className="text-[12px] text-white/50 uppercase tracking-wider">{s.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
