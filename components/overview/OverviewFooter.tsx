import Image from 'next/image';

const LINKS = [
  { label: 'Documentation',  href: 'https://docs.near-intents.org' },
  { label: 'Explorer',       href: 'https://explorer.near-intents.org' },
  { label: 'NEAR Protocol',  href: 'https://near.org' },
  { label: 'Dune Dashboard', href: 'https://dune.com/near/near-intents' },
];

export default function OverviewFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#242424]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {/* Left: Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white">Resources</h3>
            <ul className="mt-4 space-y-2">
              {LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/40 hover:text-[#fb4d01] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Logo + disclaimer */}
          <div>
            <Image
              src="/images/near-intents-logo.svg"
              alt="NEAR Intents"
              width={140}
              height={24}
              className="h-6 w-auto"
            />
            <p className="mt-4 text-xs leading-relaxed text-white/40">
              This page is for general informational purposes only and does not constitute technical, financial, or legal advice.
              It is not a complete or authoritative description of NEAR Intents or its behaviour. The NEAR Intents ecosystem is
              evolving, and features, integrations, and metrics may change over time. Integrators should review official
              documentation and independently assess the system&apos;s design and risks before use. Execution depends on
              third-party participants and market conditions, and outcomes are not guaranteed.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
