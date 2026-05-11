import Image from 'next/image';
import type { Screenshot } from '@/lib/types/content';

interface Props {
  screenshots: Screenshot[];
}

export default function ScreenshotGallery({ screenshots }: Props) {
  if (!screenshots?.length) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {screenshots.map((shot, i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="relative rounded-xl overflow-hidden border border-white/10 bg-white/5 aspect-[4/3]">
            <Image
              src={shot.src}
              alt={shot.caption}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            {shot.source && (
              <p className="text-[11px] font-semibold text-[#fb4d01] uppercase tracking-wider mb-0.5">
                {shot.source}
              </p>
            )}
            <p className="text-[12px] text-white/60 leading-relaxed">{shot.caption}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
