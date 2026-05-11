import type { UserStory } from '@/lib/types/content';

interface Props {
  stories: UserStory[];
}

export default function UserStoryFlow({ stories }: Props) {
  if (!stories?.length) return null;
  return (
    <div className="space-y-4">
      {stories.map((story, i) => (
        <div key={i} className="bg-[#242424] rounded-xl border border-white/10 p-5 sm:p-6">
          {/* Header */}
          <div className="mb-4">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-1">
              <span className="font-bold text-[#fb4d01] text-[14px]">{story.persona}</span>
              <span className="text-[13px] text-white/50">·</span>
              <span className="text-[13px] text-white/60">{story.context}</span>
            </div>
            <p className="text-[12px] text-white/40">
              Using <span className="text-white/60 font-medium">{story.app}</span>
            </p>
          </div>

          {/* Steps */}
          <ol className="space-y-2.5">
            {story.steps.map((step, j) => (
              <li key={j} className="flex items-start gap-3">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#fb4d01]/15 text-[#fb4d01] text-[10px] font-bold shrink-0 mt-0.5">
                  {j + 1}
                </span>
                <span className="text-[13px] text-white/70 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>

          {/* Without NEAR Intents */}
          {story.without && (
            <div className="mt-4 bg-red-900/20 border border-red-500/20 rounded-lg p-4">
              <p className="text-[10px] font-semibold text-red-400 uppercase tracking-wider mb-1">
                Without NEAR Intents
              </p>
              <p className="text-[13px] text-white/60 leading-relaxed">{story.without}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
