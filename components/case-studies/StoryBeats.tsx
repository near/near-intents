import type { StoryBeat } from '@/lib/types/content';

const BEAT_COLORS = [
  { border: 'border-red-500/30',   bg: 'bg-red-900/20',     label: 'text-red-400' },
  { border: 'border-blue-500/30',  bg: 'bg-blue-900/20',    label: 'text-blue-400' },
  { border: 'border-emerald-500/30', bg: 'bg-emerald-900/20', label: 'text-emerald-400' },
];

interface Props {
  beats: StoryBeat[];
}

export default function StoryBeats({ beats }: Props) {
  if (!beats?.length) return null;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
      {beats.map((beat, i) => {
        const c = BEAT_COLORS[i % BEAT_COLORS.length];
        return (
          <div key={i} className="flex flex-col gap-3 rounded-xl border border-white/10 bg-[#242424] p-5 shadow-sm sm:p-6">
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${c.border} ${c.bg}`}>
              <span className={`text-sm font-bold ${c.label}`}>{i + 1}</span>
            </div>
            <span className={`text-xs font-semibold uppercase tracking-wider ${c.label}`}>{beat.label}</span>
            <p className="text-sm leading-relaxed text-white/60">{beat.body}</p>
          </div>
        );
      })}
    </div>
  );
}
