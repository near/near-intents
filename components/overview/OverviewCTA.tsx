export default function OverviewCTA() {
  return (
    <section className="border-t border-white/10 bg-[#242424]">
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to integrate?</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-white/60 sm:mt-4 sm:text-base">
          Add cross-chain capabilities to your product. Widget integration takes a day. API integration takes a week.
        </p>
        <a
          href="https://docs.near-intents.org"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-lg bg-[#fb4d01] px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:mt-8"
        >
          Read the Docs
        </a>
      </div>
    </section>
  );
}
