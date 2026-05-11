import Image from 'next/image';
import type { Testimonial as TestimonialType } from '@/lib/types/content';

interface Props {
  testimonial: TestimonialType;
}

export default function Testimonial({ testimonial }: Props) {
  return (
    <div className="bg-[#242424] rounded-2xl border border-white/10 p-8 md:p-10">
      <div className="mb-6 text-[#fb4d01] text-4xl leading-none font-serif">&ldquo;</div>
      <blockquote className="text-[18px] md:text-[22px] font-medium leading-relaxed text-white mb-8">
        {testimonial.quote}
      </blockquote>
      <div className="flex items-center gap-4">
        {testimonial.avatar && (
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 shrink-0">
            <Image
              src={testimonial.avatar}
              alt={testimonial.author}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
        )}
        <div>
          <p className="font-bold text-[14px] text-white">{testimonial.author}</p>
          <p className="text-[13px] text-white/50">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}
