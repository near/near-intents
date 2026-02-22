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

export function Ecosystem() {
  return (
    <section id="ecosystem" className="relative py-12 px-8 md:px-20 bg-[#000]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <RevealOnScroll>
          <div className="mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-3">Intents Ecosystem</h2>
            <div className="w-full h-px mb-4" style={{ background: 'linear-gradient(to right, #FB4D01, transparent)' }} />
            <p className="text-white/60 text-sm md:text-[16px]">Swap across every major blockchain.</p>
          </div>
        </RevealOnScroll>

        {/* Row 1 — 6 large logos */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 lg:gap-6 mb-8 md:mb-12 lg:mb-16 pt-4 lg:pt-6">
          {FEATURED.map((logo, i) => (
            <LargeEcosystemLogo
              key={i}
              name={logo.name}
              src={logo.src}
              variant="dark"
              logoColor="black"
            />
          ))}
        </div>

        {/* Row 2+ — 35 logos with fade overlay */}
        <div className="relative">
          <div className="grid grid-cols-5 lg:grid-cols-7 gap-3 md:gap-4 lg:gap-4">
            {ROW.map((logo, i) => (
              <SmallEcosystemLogo key={i} name={logo.name} src={logo.src} variant="dark" logoColor="black" />
            ))}
          </div>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.93))' }} />
        </div>

      </div>
    </section>
  );
}
