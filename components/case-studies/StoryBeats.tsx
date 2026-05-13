import {
  Lock, Zap, TrendingUp, Shield, Star, Award, CheckCircle,
  AlertCircle, Lightbulb, Rocket, Target, BarChart2,
  type LucideProps,
} from 'lucide-react';
import type { StoryBeat } from '@/lib/types/content';

type IconComp = React.ComponentType<LucideProps>;

const ICON_MAP: Record<string, IconComp> = {
  lock: Lock,
  zap: Zap,
  'trending-up': TrendingUp,
  shield: Shield,
  star: Star,
  award: Award,
  check: CheckCircle,
  alert: AlertCircle,
  lightbulb: Lightbulb,
  rocket: Rocket,
  target: Target,
  chart: BarChart2,
};

const BEAT_COLORS = [
  { border: 'border-red-500/30',     bg: 'bg-red-900/20',     icon: 'text-red-400',     label: 'text-red-400' },
  { border: 'border-blue-500/30',    bg: 'bg-blue-900/20',    icon: 'text-blue-400',    label: 'text-blue-400' },
  { border: 'border-emerald-500/30', bg: 'bg-emerald-900/20', icon: 'text-emerald-400', label: 'text-emerald-400' },
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
        const Icon = beat.icon ? ICON_MAP[beat.icon.toLowerCase()] : null;
        return (
          <div key={i} className="flex flex-col gap-3 rounded-xl border border-white/10 bg-[#242424] p-5 shadow-sm sm:p-6">
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${c.border} ${c.bg}`}>
              {Icon
                ? <Icon size={16} strokeWidth={2} className={c.icon} />
                : <span className={`text-sm font-bold ${c.label}`}>{i + 1}</span>
              }
            </div>
            <span className={`text-xs font-semibold uppercase tracking-wider ${c.label}`}>{beat.label}</span>
            <p className="text-sm leading-relaxed text-white/60">{beat.body}</p>
          </div>
        );
      })}
    </div>
  );
}
