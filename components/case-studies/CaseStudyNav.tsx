import Link from 'next/link';
import Image from 'next/image';
import type { CaseStudy } from '@/lib/types/content';

interface Props {
  prev: CaseStudy | null;
  next: CaseStudy | null;
}

export default function CaseStudyNav({ prev, next }: Props) {
  if (!prev && !next) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-white/10">
      {prev ? (
        <Link
          href={`/case-studies/${prev.slug}`}
          className="group flex items-center gap-4 bg-[#242424] rounded-xl border border-white/10 p-4 hover:border-[#fb4d01] transition-colors"
        >
          <span className="text-white/40 text-lg">←</span>
          <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-white/10 bg-white/5 shrink-0">
            <Image src={prev.logo} alt={prev.name} fill className="object-contain p-1" sizes="36px" />
          </div>
          <div>
            <p className="text-[11px] text-white/40 uppercase tracking-wider mb-0.5">Previous</p>
            <p className="font-semibold text-[14px] group-hover:text-[#fb4d01] transition-colors">{prev.name}</p>
          </div>
        </Link>
      ) : <div />}

      {next ? (
        <Link
          href={`/case-studies/${next.slug}`}
          className="group flex items-center justify-end gap-4 bg-[#242424] rounded-xl border border-white/10 p-4 hover:border-[#fb4d01] transition-colors text-right"
        >
          <div>
            <p className="text-[11px] text-white/40 uppercase tracking-wider mb-0.5">Next</p>
            <p className="font-semibold text-[14px] group-hover:text-[#fb4d01] transition-colors">{next.name}</p>
          </div>
          <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-white/10 bg-white/5 shrink-0">
            <Image src={next.logo} alt={next.name} fill className="object-contain p-1" sizes="36px" />
          </div>
          <span className="text-white/40 text-lg">→</span>
        </Link>
      ) : <div />}
    </div>
  );
}
