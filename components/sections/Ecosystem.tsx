import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import { LargeEcosystemLogo, SmallEcosystemLogo } from '@/components/shared/EcosystemLogo';

const FEATURED = [
  { name: 'Avnu', src: '/images/ecosystem-logos/Avnu.svg' },
  { name: 'Bitget Wallet', src: '/images/ecosystem-logos/Bitget Wallet.svg' },
  { name: 'Calyx', src: '/images/ecosystem-logos/Calyx.svg' },
  { name: 'CoW Swap', src: '/images/ecosystem-logos/CoW Swap.svg' },
  { name: 'Coin98', src: '/images/ecosystem-logos/Coin98.svg' },
  { name: 'CoolWallet', src: '/images/ecosystem-logos/CoolWallet.svg' },
];

const FIRST_ROW = [
  { name: 'Hot Protocol', src: '/images/ecosystem-logos/Hot Protocol.svg' },
  { name: 'Rango Exchange', src: '/images/ecosystem-logos/Rango Exchange.svg' },
  { name: 'ThorSwap', src: '/images/ecosystem-logos/ThorSwap.svg' },
  { name: 'Trust Wallet', src: '/images/ecosystem-logos/Trust Wallet.svg' },
  { name: 'Zashi Wallet', src: '/images/ecosystem-logos/Zashi Wallet.svg' },
];

const SECOND_ROW = [
  { name: 'Infinex', src: '/images/ecosystem-logos/Infinex.svg' },
  { name: 'Ledger Wallet', src: '/images/ecosystem-logos/Ledger Wallet.svg' },
  { name: 'LiFi', src: '/images/ecosystem-logos/LiFi.svg' },
  { name: 'Swapkit', src: '/images/ecosystem-logos/Swapkit.svg' },
];

const ROW = [
  { name: 'Ctrl', src: '/images/ecosystem-logos/Ctrl.svg' },
  { name: 'Ellipal', src: '/images/ecosystem-logos/Ellipal.svg' },
  { name: 'Encrypt Trade', src: '/images/ecosystem-logos/Encrypt Trade.svg' },
  { name: 'FluidKey', src: '/images/ecosystem-logos/FluidKey.svg' },
  { name: 'Hasher Wallet', src: '/images/ecosystem-logos/Hasher Wallet.svg' },
  { name: 'Hot Protocol', src: '/images/ecosystem-logos/Hot Protocol.svg' },
  { name: 'Infinex', src: '/images/ecosystem-logos/Infinex.svg' },
  { name: 'Kamino Swap', src: '/images/ecosystem-logos/Kamino Swap.svg' },
  { name: 'Keystone', src: '/images/ecosystem-logos/Keystone.svg' },
  { name: 'Kyber Swap', src: '/images/ecosystem-logos/Kyber Swap.svg' },
  { name: 'Ledger Wallet', src: '/images/ecosystem-logos/Ledger Wallet.svg' },
  { name: 'LeoDEX', src: '/images/ecosystem-logos/LeoDEX.svg' },
  { name: 'LiFi', src: '/images/ecosystem-logos/LiFi.svg' },
  { name: 'OneKey', src: '/images/ecosystem-logos/OneKey.svg' },
  { name: 'OpenOcean', src: '/images/ecosystem-logos/OpenOcean.svg' },
  { name: 'Orca', src: '/images/ecosystem-logos/Orca.svg' },
  { name: 'Peanut Trade', src: '/images/ecosystem-logos/Peanut Trade.svg' },
  { name: 'Rango Exchange', src: '/images/ecosystem-logos/Rango Exchange.svg' },
  { name: 'Rhea Finance', src: '/images/ecosystem-logos/Rhea Finance.svg' },
  { name: 'Router Protocol', src: '/images/ecosystem-logos/Router Protocol.svg' },
  { name: 'Rubic Exchange', src: '/images/ecosystem-logos/Rubic Exchange.svg' },
  { name: 'SafePal', src: '/images/ecosystem-logos/SafePal.svg' },
  { name: 'ShapeShift', src: '/images/ecosystem-logos/ShapeShift.svg' },
  { name: 'ShiftRWA', src: '/images/ecosystem-logos/ShiftRWA.svg' },
  { name: 'StableFlow', src: '/images/ecosystem-logos/StableFlow.svg' },
  { name: 'Swapkit', src: '/images/ecosystem-logos/Swapkit.svg' },
  { name: 'Sweat', src: '/images/ecosystem-logos/Sweat.svg' },
  { name: 'Templar Protocol', src: '/images/ecosystem-logos/Templar Protocol.svg' },
  { name: 'ThorSwap', src: '/images/ecosystem-logos/ThorSwap.svg' },
  { name: 'ThorWallet', src: '/images/ecosystem-logos/ThorWallet.svg' },
  { name: 'Trust Wallet', src: '/images/ecosystem-logos/Trust Wallet.svg' },
  { name: 'VDEX', src: '/images/ecosystem-logos/VDEX.svg' },
  { name: 'WowMax Exchange', src: '/images/ecosystem-logos/WowMax Exchange.svg' },
  { name: 'Zashi Wallet', src: '/images/ecosystem-logos/Zashi Wallet.svg' },
  { name: 'Zypto', src: '/images/ecosystem-logos/Zypto.svg' },
];

const FIRST_ROW_NAMES = new Set([...FIRST_ROW, ...SECOND_ROW].map(logo => logo.name));
const ROW_FILTERED = ROW.filter(logo => !FIRST_ROW_NAMES.has(logo.name));

export function Ecosystem() {
  return (
    <section id="ecosystem" className="relative py-6 md:py-12 px-8 md:px-20 bg-[#000]">
      <div className="max-w-7xl mx-auto relative">

        {/* Header */}
        <RevealOnScroll>
          <div className="mb-4 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-3">Intents Ecosystem</h2>
            <div className="w-full h-px mb-4" style={{ background: 'linear-gradient(to right, #FB4D01, transparent)' }} />
            <p className="text-white/60 text-sm md:text-[16px]">Swap across every major blockchain.</p>
          </div>
        </RevealOnScroll>

        {/* Rows 1-3 — large logos */}
        {/* Mobile/Tablet */}
        <div className="lg:hidden grid grid-cols-3 gap-2 md:gap-4 mb-2 md:mb-8 pt-1">
          {[...FIRST_ROW, ...SECOND_ROW].map((logo, i) => (
            <LargeEcosystemLogo
              key={i}
              name={logo.name}
              src={logo.src}
              variant="dark"
              logoColor="black"
            />
          ))}
        </div>

        {/* Desktop — stagger grid */}
        <div className="hidden lg:grid grid-cols-10 gap-3 md:gap-4 lg:gap-6 mb-8 md:mb-12 lg:mb-16 pt-4 lg:pt-6">
          {/* Row 1 — 5 large logos */}
          {FIRST_ROW.map((logo, i) => (
            <div key={`featured-${i}`} className="col-span-2 flex justify-center">
              <LargeEcosystemLogo
                name={logo.name}
                src={logo.src}
                variant="dark"
                logoColor="black"
              />
            </div>
          ))}
          {/* Row 2 — 4 large logos staggered */}
          <div className="col-span-1" />
          {SECOND_ROW.map((logo, i) => (
            <div key={`row-large-${i}`} className="col-span-2 flex justify-center">
              <LargeEcosystemLogo
                name={logo.name}
                src={logo.src}
                variant="dark"
                logoColor="black"
              />
            </div>
          ))}
          <div className="col-span-1" />
        </div>

        {/* Rows 4-9 — Mobile: 4 small logos each | Desktop: original 7-logo rows */}
        {/* Mobile/Tablet */}
        <div className="lg:hidden">
          {[
            ROW_FILTERED.slice(0, 4),
            ROW_FILTERED.slice(4, 8),
            ROW_FILTERED.slice(8, 12),
            ROW_FILTERED.slice(12, 16),
            ROW_FILTERED.slice(16, 20),
            ROW_FILTERED.slice(20, 24),
          ].map((rowLogos, rowIdx) => (
            <div key={rowIdx} className="grid grid-cols-4 gap-2 md:gap-4 mb-2 md:mb-8">
              {rowLogos.map((logo, i) => (
                <SmallEcosystemLogo key={i} name={logo.name} src={logo.src} variant="dark" logoColor="black" />
              ))}
            </div>
          ))}
          {/* Remaining 2 small logos + 2 featured = 4 logos */}
          <div className="grid grid-cols-4 gap-2 md:gap-4 mb-2 md:mb-8">
            {ROW_FILTERED.slice(24, 26).map((logo, i) => (
              <SmallEcosystemLogo key={i} name={logo.name} src={logo.src} variant="dark" logoColor="black" />
            ))}
            {FEATURED.slice(0, 2).map((logo, i) => (
              <SmallEcosystemLogo key={`featured-${i}`} name={logo.name} src={logo.src} variant="dark" logoColor="black" />
            ))}
          </div>
        </div>

        {/* Desktop — Original 7-logo layout */}
        <div className="hidden lg:block">
          {[
            ROW_FILTERED.slice(0, 7),
            ROW_FILTERED.slice(7, 14),
            ROW_FILTERED.slice(14, 21),
          ].map((rowLogos, rowIdx) => (
            <div key={rowIdx} className="grid grid-cols-7 gap-4 mb-16">
              {rowLogos.map((logo, i) => (
                <SmallEcosystemLogo key={i} name={logo.name} src={logo.src} variant="dark" logoColor="black" />
              ))}
            </div>
          ))}
          {/* Row 6 — 5 small logos + 2 featured = 7 logos */}
          <div className="grid grid-cols-7 gap-4 mb-16">
            {ROW_FILTERED.slice(21, 26).map((logo, i) => (
              <SmallEcosystemLogo key={i} name={logo.name} src={logo.src} variant="dark" logoColor="black" />
            ))}
            {FEATURED.slice(0, 2).map((logo, i) => (
              <SmallEcosystemLogo key={`featured-${i}`} name={logo.name} src={logo.src} variant="dark" logoColor="black" />
            ))}
          </div>
        </div>

        {/* Row 10 — 4 small logos staggered */}
        <div>
          {/* Mobile — grid compact */}
          <div className="lg:hidden grid grid-cols-4 gap-2 md:gap-4">
            {FEATURED.slice(2, 6).map((logo, i) => (
              <SmallEcosystemLogo key={i} name={logo.name} src={logo.src} variant="dark" logoColor="black" />
            ))}
          </div>
          {/* Desktop — staggered */}
          <div className="hidden lg:grid grid-cols-[repeat(14,minmax(0,1fr))] gap-4 mb-16">
            <div className="col-span-3" />
            {FEATURED.slice(2, 6).map((logo, i) => (
              <div key={i} className="col-span-2 flex justify-center">
                <SmallEcosystemLogo name={logo.name} src={logo.src} variant="dark" logoColor="black" />
              </div>
            ))}
            <div className="col-span-3" />
          </div>
        </div>

        {/* Fade overlay — responsive positioning */}
        <style>{`
          .ecosystem-overlay {
            top: calc(100% - 180px);
          }
          @media (min-width: 768px) {
            .ecosystem-overlay {
              top: calc(100% - 300px);
            }
          }
          @media (min-width: 1024px) {
            .ecosystem-overlay {
              top: calc(100% - 480px);
            }
          }
        `}</style>
        <div className="ecosystem-overlay absolute bottom-0 left-0 right-0 pointer-events-none" style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.93) 100%)'
        }} />

      </div>
    </section>
  );
}
