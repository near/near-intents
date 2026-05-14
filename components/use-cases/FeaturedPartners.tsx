import { ExternalLink } from 'lucide-react';
import type { FeaturedPartner } from '@/lib/types/content';

interface Props {
  partners: FeaturedPartner[];
}

export default function FeaturedPartners({ partners }: Props) {
  if (!partners?.length) return null;
  return (
    <div className="flex flex-wrap gap-3">
      {partners.map((p) => (
        <a
          key={p.name}
          href="https://near.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-[#242424] px-4 py-2.5 shadow-sm transition-all hover:border-[#fb4d01]/40 hover:shadow-md"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.logo} alt={p.name} className="h-6 w-6 shrink-0 rounded object-contain" />
          <span className="text-sm font-semibold text-white">{p.name}</span>
          <ExternalLink size={12} className="text-white/40 shrink-0" />
        </a>
      ))}
    </div>
  );
}
