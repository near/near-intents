interface Props {
  partnerName: string;
}

export default function CaseStudyCTA({ partnerName }: Props) {
  return (
    <div className="bg-[#242424] rounded-2xl border border-white/10 p-8 md:p-10 text-center">
      <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-3">
        Build something like {partnerName}?
      </h3>
      <p className="text-white/60 text-[15px] mb-8 max-w-lg mx-auto leading-relaxed">
        NEAR Intents gives your app cross-chain swaps, payments, and asset onboarding
        across 31 chains — in as little as 2 weeks.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href="https://docs.near-intents.org"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-[#fb4d01] text-black font-bold text-[13px] uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#e04401] transition-colors"
        >
          Integrate Now
        </a>
        <a
          href="https://t.me/near_intents"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-bold text-[13px] uppercase tracking-widest px-6 py-3 rounded-full hover:border-white/50 transition-colors"
        >
          Talk to the Team
        </a>
      </div>
    </div>
  );
}
