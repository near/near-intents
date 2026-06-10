import Image from 'next/image';
import { featuredPartners } from '@/lib/data/partners';

export default function PartnerMarquee() {
  const doubled = [...featuredPartners, ...featuredPartners];

  return (
    <section className="bg-black pt-10 pb-8 overflow-hidden border-t border-white/10">
      <p className="text-center text-xs font-medium uppercase tracking-widest text-white/40 mb-7">
        Used as core infrastructure by leading teams
      </p>

      <div
        className="relative overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <div
          className="flex items-center w-max"
          style={{ animation: 'marquee-30 30s linear infinite' }}
        >
          {doubled.map((p, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-10 flex items-center"
            >
              <Image
                src={p.logo}
                alt={p.name}
                width={180}
                height={40}
                className="h-10 w-auto max-w-[180px] object-contain opacity-70 hover:opacity-100 transition-opacity"
                title={p.name}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee-30 {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
