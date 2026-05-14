import type { Transformation } from '@/lib/types/content';

interface Props {
  transformation: Transformation;
}

export default function TransformationStrip({ transformation }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white/5 rounded-xl border border-white/10 p-6">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40 mb-2">Before</p>
        <p className="font-bold text-[16px] mb-2">{transformation.before.headline}</p>
        <p className="text-[13px] text-white/60 leading-relaxed">{transformation.before.body}</p>
      </div>
      <div className="bg-[#FB4D01]/10 rounded-xl border border-[#FB4D01]/30 p-6">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#fb4d01] mb-2">After</p>
        <p className="font-bold text-[16px] mb-2">{transformation.after.headline}</p>
        <p className="text-[13px] text-white/60 leading-relaxed">{transformation.after.body}</p>
      </div>
    </div>
  );
}
