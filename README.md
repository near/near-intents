# NEAR Intents — Landing Page

Marketing website for **NEAR Intents**, a universal cross-chain liquidity protocol built on NEAR Protocol.

## About the Landing Page

The site presents NEAR Intents as the infrastructure layer for cross-chain DeFi. It highlights:

- **$13B+ all-time volume across 35+ chains** — positioning NEAR Intents as a proven, production-grade protocol.
- **How it works** — a novel intent-based transaction architecture that abstracts away cross-chain complexity (no manual gas juggling or bridge management), optimizing for performance, security, and efficiency for DeFi apps, AI agents, and end users.
- **Core use cases** — three pillars: *Swap* (cross-chain, simplified), *Earn* (onchain yield across supported tokens and chains), and *Confidential* (private cross-chain transactions).
- **Ecosystem** — a broad network of 35+ integrated wallets, DEXs, and aggregators including Trust Wallet, Ledger, ThorSwap, CoW Swap, LiFi, Rango Exchange, and many more.
- **Call to action** — directs users to start swapping or build with the Intents SDK/docs.

## Tech Stack

- **Next.js 15** with App Router, **React 19**, **TypeScript 5**
- **Tailwind CSS 3** for styling
- **GSAP 3** + ScrollTrigger for scroll-based animations
- **Lenis** for smooth, physics-based scrolling
- **Lucide React** for icons
- **Airtable** as CMS for ecosystem partner data
- **ClickHouse** (HTTP API) for live protocol stats (volume, chain count)
- Custom local font: **FK Grotesk**

## Getting Started

```bash
npm install
npm run dev      # Dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Run production server
npm run lint     # ESLint
```

## Project Structure

```
app/
  layout.tsx       # Root layout — fonts, LenisProvider
  page.tsx         # Home page — composes all sections sequentially
  globals.css      # Custom CSS classes and global styles
components/
  sections/        # Full-page sections (Hero, HowItWorks, FeatureCards, etc.)
  effects/         # Standalone visual effects (AuroraRing, TickWave, etc.)
  shared/          # Reusable primitives (CTAButton, RevealOnScroll)
hooks/             # useScrollReveal — GSAP ScrollTrigger integration
lib/
  lenis-provider.tsx  # Smooth scroll provider, synced with GSAP ticker
  airtable.ts         # Airtable client and data-fetching helpers
  clickhouse.ts       # ClickHouse HTTP client — getProtocolStats() with 1h ISR
  formatVolume.ts     # Pure helper: formats USD number → "$13B+" style string
public/images/     # SVG logos, hero background, how-it-works diagrams
```

## Environment Variables

```
AIRTABLE_API_KEY
AIRTABLE_BASE_ID
AIRTABLE_TABLE_ID
AIRTABLE_CHAIN_ICONS_BASE_ID
AIRTABLE_CHAIN_ICONS_TABLE_ID
CLICKHOUSE_URL      # e.g. https://<host>:8443
CLICKHOUSE_AUTH     # Basic <base64-encoded credentials>
```
