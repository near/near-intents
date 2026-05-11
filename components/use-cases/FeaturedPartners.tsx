import Image from 'next/image';
import type { FeaturedPartner } from '@/lib/types/content';

interface Props {
  partners: FeaturedPartner[];
}

export default function FeaturedPartners({ partners }: Props) {
  if (!partners?.length) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {partners.map((p) => (
        <div
          key={p.name}
          className="flex gap-4 items-start bg-[#242424] rounded-xl border border-white/10 p-4"
        >
          <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-white/10 bg-white/5">
            <Image
              src={p.logo}
              alt={p.name}
              fill
              className="object-contain p-1"
              sizes="40px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-[14px] mb-0.5">{p.name}</p>
            <p className="text-[12px] text-white/60 leading-relaxed mb-3">{p.description}</p>
            <a
              href="https://near.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#fb4d01] uppercase tracking-wider hover:underline"
            >
              Swap on near.com →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
