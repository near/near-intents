export default function OverviewCTA() {
  return (
    <div className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-4">
          Ready to integrate?
        </h2>
        <p className="text-white/60 text-[15px] max-w-md mx-auto leading-relaxed mb-8">
          Add cross-chain capabilities to your product. Widget integration takes a day. API integration takes a week.
        </p>
        <a
          href="https://docs.near-intents.org"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#fb4d01] hover:bg-[#e04401] text-black font-bold text-[13px] uppercase tracking-widest px-8 py-3.5 rounded-full transition-colors"
        >
          Read the Docs
        </a>
      </div>
    </div>
  );
}
