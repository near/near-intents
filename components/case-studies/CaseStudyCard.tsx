import Link from 'next/link';
import Image from 'next/image';
import type { CaseStudy } from '@/lib/types/content';

const statusColors: Record<string, string> = {
  live: 'bg-emerald-900/30 text-emerald-400',
  building: 'bg-amber-900/30 text-amber-400',
  opportunity: 'bg-blue-900/30 text-blue-400',
};

interface Props {
  caseStudy: CaseStudy;
}

export default function CaseStudyCard({ caseStudy }: Props) {
  return (
    <Link
      href={`/case-studies/${caseStudy.slug}`}
      className="group flex flex-col bg-[#242424] rounded-2xl border border-white/10 overflow-hidden hover:border-[#fb4d01] hover:shadow-lg transition-all duration-200"
    >
<div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-white/10 bg-white/5">
            <Image
              src={caseStudy.logo}
              alt={caseStudy.name}
              fill
              className="object-contain p-1"
              sizes="40px"
            />
          </div>
          <div>
            <h3 className="font-bold text-[15px] leading-snug">{caseStudy.name}</h3>
            {caseStudy.status && (
              <span
                className={`inline-block text-[11px] font-semibold rounded-full px-2 py-0.5 capitalize ${statusColors[caseStudy.status] ?? 'bg-gray-100 text-gray-600'}`}
              >
                {caseStudy.status}
              </span>
            )}
          </div>
        </div>
        <p className="text-[13px] text-white/60 leading-relaxed flex-1">{caseStudy.description}</p>
        {caseStudy.metrics?.length > 0 && (
          <div className="mt-4 pt-3 border-t border-white/10 flex gap-4 flex-wrap">
            {caseStudy.metrics.slice(0, 2).map((m) => (
              <div key={m.label}>
                <p className="text-[15px] font-bold text-[#fb4d01]">{m.value}</p>
                <p className="text-[11px] text-white/40">{m.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
