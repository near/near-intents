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
        <a
          key={p.name}
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-4 items-start bg-[#242424] rounded-xl border border-white/10 p-4 hover:border-[#fb4d01] transition-colors"
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
          <div>
            <p className="font-semibold text-[14px] mb-0.5">{p.name}</p>
            <p className="text-[12px] text-white/60 leading-relaxed">{p.description}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
