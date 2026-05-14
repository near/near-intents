import Link from 'next/link';
import Image from 'next/image';
import type { CaseStudyUseCase } from '@/lib/types/content';

interface Props {
  useCases: CaseStudyUseCase[];
}

export default function UseCasesJoined({ useCases }: Props) {
  if (!useCases?.length) return null;
  return (
    <div className="flex flex-col gap-8">
      {useCases.map((uc) => (
        <div key={uc.useCase} className="bg-[#242424] rounded-xl border border-white/10 p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <Link
                href={`/use-cases/${uc.useCase}`}
                className="text-[11px] font-semibold uppercase tracking-wider text-[#fb4d01] hover:underline"
              >
                {uc.useCase.replace(/-/g, ' ')}
              </Link>
              <p className="text-[14px] text-white leading-relaxed mt-1">{uc.summary}</p>
            </div>
          </div>
          {uc.flow?.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap mt-3">
              {uc.flow.map((step, i) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="text-[12px] bg-white/10 text-white rounded-full px-3 py-1 font-medium">
                    {step}
                  </span>
                  {i < uc.flow.length - 1 && (
                    <span className="text-white/40 text-sm">→</span>
                  )}
                </span>
              ))}
            </div>
          )}
          {uc.screenshots?.length > 0 && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {uc.screenshots.map((src, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="relative rounded-lg overflow-hidden border border-white/10 aspect-[16/9] bg-white/5">
                    <Image
                      src={src}
                      alt={uc.captions?.[i] ?? ''}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  {uc.captions?.[i] && (
                    <p className="text-[11px] text-white/40 leading-relaxed">{uc.captions[i]}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
