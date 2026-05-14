import type { RevenueModel as RevenueModelType } from '@/lib/types/content';

interface Props {
  model: RevenueModelType;
}

export default function RevenueModel({ model }: Props) {
  if (!model?.feeStructure) return null;
  return (
    <div className={`grid gap-4 ${model.revShare ? 'sm:grid-cols-2' : 'grid-cols-1'}`}>
      <div className="bg-[#242424] rounded-xl border border-white/10 p-6">
        <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-3">
          Fee Structure
        </p>
        <p className="text-[14px] text-white/80 leading-relaxed">{model.feeStructure}</p>
      </div>
      {model.revShare && (
        <div className="bg-[#242424] rounded-xl border border-white/10 p-6">
          <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-3">
            Revenue Share
          </p>
          <p className="text-[14px] text-white/80 leading-relaxed">{model.revShare}</p>
        </div>
      )}
    </div>
  );
}
