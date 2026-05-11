import Link from 'next/link';
import Image from 'next/image';
import type { UseCase } from '@/lib/types/content';

interface Props {
  useCase: UseCase;
}

export default function UseCaseCard({ useCase }: Props) {
  return (
    <Link
      href={`/use-cases/${useCase.slug}`}
      className="group flex flex-col bg-[#242424] rounded-2xl border border-white/10 overflow-hidden hover:border-[#fb4d01] hover:shadow-lg transition-all duration-200"
    >
      {useCase.coverImage && (
        <div className="relative h-44 w-full overflow-hidden bg-white/5">
          <Image
            src={useCase.coverImage}
            alt={useCase.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-[15px] font-bold leading-snug">{useCase.name}</h3>
          <span className="text-[#fb4d01] text-lg mt-0.5 shrink-0">→</span>
        </div>
        <p className="text-[13px] text-white/60 leading-relaxed flex-1">{useCase.tagline}</p>
        {useCase.featuredPartners?.length > 0 && (
          <div className="mt-4 pt-3 border-t border-white/10">
            <p className="text-[11px] text-white/40 uppercase tracking-wider font-medium">
              {useCase.featuredPartners.length} integration{useCase.featuredPartners.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}
