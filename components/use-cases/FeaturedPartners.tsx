import Image from 'next/image';
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
          className="inline-flex items-center gap-2.5 border border-white/10 rounded-full px-4 py-2 hover:border-[#fb4d01] hover:bg-[#fb4d01]/5 transition-all duration-200 group"
        >
          <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0 bg-white/10">
            <Image
              src={p.logo}
              alt={p.name}
              fill
              className="object-contain"
              sizes="20px"
            />
          </div>
          <span className="text-[13px] font-medium text-white/80 group-hover:text-white transition-colors">
            {p.name}
          </span>
          <span className="text-[11px] text-white/30 group-hover:text-white/50 transition-colors">↗</span>
        </a>
      ))}
    </div>
  );
}
