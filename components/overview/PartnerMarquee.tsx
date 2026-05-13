import Image from 'next/image';
import { featuredPartners } from '@/lib/data/partners';

export default function PartnerMarquee() {
  const logos = [...featuredPartners, ...featuredPartners]; // duplicate for seamless loop

  return (
    <div className="py-12 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-6">
        <p className="text-[12px] font-semibold text-white/40 uppercase tracking-widest text-center">
          Used as core infrastructure by leading teams
        </p>
      </div>
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-black to-transparent" />

        <div className="flex animate-marquee gap-10 items-center w-max">
          {logos.map((p, i) => (
            <div
              key={i}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/8 shrink-0 hover:bg-white/10 transition-colors"
              title={p.name}
            >
              <Image
                src={p.logo}
                alt={p.name}
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
