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
      className="group block overflow-hidden rounded-xl border border-white/10 bg-[#242424] shadow-sm transition-all hover:shadow-md hover:border-white/20"
    >
      <div className="p-5 sm:p-6">
        {/* Header: logo + name + status */}
        <div className="flex items-start gap-3 mb-3">
          <div className="relative h-10 w-10 shrink-0 rounded-lg overflow-hidden border border-white/10 bg-white/5">
            <Image
              src={caseStudy.logo}
              alt={caseStudy.name}
              fill
              className="object-contain p-1"
              sizes="40px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-semibold text-white sm:text-lg">{caseStudy.name}</h3>
              {caseStudy.status && (
                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusColors[caseStudy.status] ?? 'bg-gray-800 text-gray-400'}`}>
                  {caseStudy.status}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-white/60 leading-relaxed">{caseStudy.description}</p>

        {/* Use case badges */}
        {caseStudy.useCases?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4">
            {caseStudy.useCases.slice(0, 3).map((uc) => (
              <span
                key={uc.useCase}
                className="inline-flex rounded-full bg-blue-900/30 px-2.5 py-0.5 text-xs font-medium text-blue-400 capitalize"
              >
                {uc.useCase.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
