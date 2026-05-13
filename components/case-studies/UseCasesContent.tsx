import Image from 'next/image';
import Link from 'next/link';
import type { CaseStudyUseCase } from '@/lib/types/content';

const UC_COLORS = [
  { border: 'border-blue-500/40',   bg: 'bg-blue-900/20',    text: 'text-blue-400' },
  { border: 'border-purple-500/40', bg: 'bg-purple-900/20',  text: 'text-purple-400' },
  { border: 'border-emerald-500/40',bg: 'bg-emerald-900/20', text: 'text-emerald-400' },
  { border: 'border-amber-500/40',  bg: 'bg-amber-900/20',   text: 'text-amber-400' },
];

interface Props {
  useCases: CaseStudyUseCase[];
}

export default function UseCasesContent({ useCases }: Props) {
  if (!useCases?.length) return null;
  return (
    <div className="space-y-6 sm:space-y-8">
      {useCases.map((uc, i) => {
        const c = UC_COLORS[i % UC_COLORS.length];
        return (
          <div key={uc.useCase} className="overflow-hidden rounded-xl border border-white/10 bg-[#242424] shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4 sm:px-6">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${c.border} ${c.bg}`}>
                <span className={`text-sm font-bold ${c.text}`}>{i + 1}</span>
              </div>
              <h3 className="flex-1 text-base font-semibold capitalize text-white sm:text-lg">
                {uc.useCase.replace(/-/g, ' ')}
              </h3>
              <Link
                href={`/use-cases/${uc.useCase}`}
                className="text-xs font-medium text-[#fb4d01] hover:underline sm:text-sm"
              >
                Learn more →
              </Link>
            </div>

            {/* Content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left: summary + flow */}
              <div className="p-5 sm:p-6">
                <p className="text-sm leading-relaxed text-white/60 sm:text-base">{uc.summary}</p>

                {uc.flow?.length > 0 && (
                  <div className="mt-4 sm:mt-5">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-white/40">Flow</p>
                    <div className="flex flex-wrap items-center gap-2">
                      {uc.flow.map((step, j) => (
                        <span key={j} className="flex items-center gap-2">
                          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70">
                            {step}
                          </span>
                          {j < uc.flow.length - 1 && (
                            <span className="text-white/30 text-sm">→</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right: screenshots */}
              <div className="flex items-center justify-center border-t border-white/10 bg-[#1a1a1a] p-4 sm:p-6 lg:border-l lg:border-t-0 min-h-[160px]">
                {uc.screenshots?.length > 0 ? (
                  <div className={`flex max-h-full ${uc.screenshots.length === 1 ? 'items-center justify-center' : 'items-end gap-3 sm:gap-4 justify-center'}`}>
                    {uc.screenshots.slice(0, 2).map((src, j) => (
                      <div
                        key={j}
                        className={`overflow-hidden rounded-xl shadow-lg transition-transform hover:scale-[1.02] ${
                          uc.screenshots.length >= 2 ? 'max-w-[180px] sm:max-w-[200px]' : 'max-w-full'
                        }`}
                      >
                        <Image
                          src={src}
                          alt={uc.captions?.[j] ?? ''}
                          width={200}
                          height={300}
                          className={`h-auto w-full rounded-xl ${uc.screenshots.length === 1 ? 'max-h-[300px] object-contain' : ''}`}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-40 w-full max-w-[240px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 text-center">
                    <span className="text-2xl text-white/20">🔗</span>
                    <p className="mt-2 text-xs font-medium text-white/30">Integration screenshot</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
