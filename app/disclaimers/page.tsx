import { Navigation } from '@/components/sections/Navigation';
import { FooterCTA } from '@/components/sections/FooterCTA';

export const metadata = {
  title: 'Disclaimers | NEAR Intents',
  description: 'Legal disclaimers for NEAR Intents',
};

export default function DisclaimersPage() {
  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white font-sans">
      <Navigation />

      <main className="bg-[#000000]">
        <div className="px-8 md:px-20 py-12 md:py-16 pt-20 md:pt-32">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Disclaimers</h1>
            <p className="text-zinc-400 text-sm mb-12">Last updated: 13 April 2026</p>

            <div className="prose prose-invert max-w-none text-zinc-300 space-y-4 leading-relaxed">
              <p>
                This website is provided by Discovery Domain Ltd for informational purposes only and does not constitute financial, investment, legal, or tax advice, or an offer or solicitation to buy, sell, or use any product or service. The NEAR Intents swap interface is available at near.com, made available by Polar Express Limited under the terms at near.com/terms.
              </p>

              <p>
                Volume statistics, performance figures, and yield rates presented are illustrative or historical, may not reflect current conditions, and are not guarantees of future results.
              </p>

              <p>
                Yield is variable, may decline to zero or become negative, and principal is not guaranteed.
              </p>

              <p>
                Confidentiality features are provided on a best-efforts basis and are not guaranteed to be complete or uninterrupted.
              </p>

              <p>
                Quotes from industry participants reflect their individual views at the time given and do not constitute recommendations.
              </p>

              <p>
                Ecosystem partners and third-party protocols operate independently, may be subject to separate terms and risks, and are not controlled by the operators of this page.
              </p>

              <p>
                NEAR Intents is not a regulated financial institution, exchange, or broker.
              </p>

              <p>
                Availability may vary by jurisdiction; you are responsible for compliance with applicable laws. Use of any referenced protocol is at your own risk.
              </p>
            </div>
          </div>
        </div>
      </main>

      <FooterCTA />
    </div>
  );
}
