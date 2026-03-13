# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:3000
npm run build     # Production build
npm run start     # Run production server
npm run lint      # Run ESLint
```

> The project also has a `pnpm-lock.yaml`, but `package-lock.json` was added recently — prefer `npm` for consistency with the lock file that is tracked.

## Tech Stack
.
- **Next.js 15** with App Router, **React 19**, **TypeScript 5**
- **Tailwind CSS 3** for styling
- **GSAP 3** with ScrollTrigger plugin for scroll-based animations
- **Lenis** for smooth, physics-based scrolling
- **Lucide React** for icons
- **Airtable** as the CMS for ecosystem partner data
- Custom local font: **FK Grotesk** (loaded via `next/font/local` in `app/layout.tsx`)

## Architecture

This is a marketing website for the NEAR Intents cross-chain liquidity protocol with two routes:

- **`/` (home)** — `app/page.tsx` composes sections sequentially: Navigation → Hero → HowItWorks → FeatureCards → TestimonialsSection → FeatureHighlights → IntentsEcosystemSection → FooterCTA. (`IntegratePartners` and `NewsSection` are rendered but hidden with `className="hidden"`.)
- **`/bridge`** — `app/bridge/page.tsx` is a standalone client page listing all verified ecosystem partners from Airtable.

**Component structure:**
- `components/sections/` — Full-page sections (one per visual block)
- `components/effects/` — Standalone visual effects (e.g., `AuroraRing` with mouse-tracking gradients)
- `components/shared/` — Reusable UI primitives (`CTAButton` with ghost/solid variants, `RevealOnScroll` wrapper)
- `hooks/` — `useScrollReveal` integrates GSAP ScrollTrigger for fade-in-up animations
- `lib/lenis-provider.tsx` — Client-side `LenisProvider` that wraps the app in `app/layout.tsx`; syncs Lenis with GSAP's ticker
- `lib/airtable.ts` — Airtable client and data-fetching helpers (`getBridgeProjects`, `getFeaturedProjects`)

**Airtable data layer:**
- `app/api/bridge-projects/route.ts` — Returns all verified projects (`GET /api/bridge-projects`, revalidates every hour)
- `app/api/featured-projects/route.ts` — Returns verified + featured projects (`GET /api/featured-projects`, revalidates every hour)
- Both client components (`IntentsEcosystemSection`, `BridgePage`) fetch from these API routes on mount and fall back to hardcoded data if the API fails or returns empty.
- Required env vars: `AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID`, `AIRTABLE_TABLE_ID`
- Airtable image URLs (`v5.airtableusercontent.com`) are allowlisted in `next.config.ts`; SVG images are enabled via `dangerouslyAllowSVG`

**Airtable table fields:** `Name of Company`, `Description`, `Icon` (attachment), `Black icon` (boolean), `Verified` (boolean), `Feature` (boolean), `URL 1 (brandkit)` (string)

**Animation pattern:** Scroll animations use `useScrollReveal` (GSAP ScrollTrigger) directly in section components, or the declarative `<RevealOnScroll>` wrapper. Lenis must be initialized before ScrollTrigger fires; this is handled in `LenisProvider`.

**Styling conventions:**
- Tailwind utilities for layout/spacing
- Custom CSS classes defined in `app/globals.css` for complex effects: `aurora-ring-gradient`, `feature-card-gradient`, `eco-circle`, `dot-pattern`, `tech-grid-bg`, `plus-separator`, `cyber-border`
- Extended Tailwind animations in `tailwind.config.ts`: `marquee`, `aurora-spin`, `cyber-spin`, `cyber-scan`, `equalizer`, `blink`, `float-diagonal`
- Brand colors: `brand-dark` (#1E1E1E background), `brand-orange` (accent, multiple shades)
- Path alias `@/` resolves to the project root
- Logo images with `blackIcon: true` render on a `bg-gray-300` background; others use `bg-white/5`
