import type { HowItWorksStep } from '@/lib/types/content';

interface Props {
  steps: HowItWorksStep[];
}

export default function HowItWorksSteps({ steps }: Props) {
  if (!steps?.length) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {steps.map((step, i) => (
        <div
          key={i}
          className="flex gap-4 bg-[#242424] rounded-xl border border-white/10 p-5"
        >
          <div
            className="flex items-center justify-center w-9 h-9 rounded-full shrink-0 text-white text-sm font-bold"
            style={{ backgroundColor: step.color ?? '#fb4d01' }}
          >
            {i + 1}
          </div>
          <div>
            <p className="font-semibold text-[14px] mb-1">{step.title}</p>
            <p className="text-[13px] text-white/60 leading-relaxed">{step.detail}</p>
            {step.chainPill && (
              <span className="mt-2 inline-block text-[11px] font-medium bg-white/10 text-white/60 rounded-full px-3 py-0.5">
                {step.chainPill}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
