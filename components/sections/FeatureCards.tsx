import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import { TickWave } from '@/components/effects/TickWave';
import { GlitchPlus } from '@/components/effects/GlitchPlus';
import { PulsingCircles } from '@/components/effects/PulsingCircles';
import { SlidingBars } from '@/components/effects/SlidingBars';

export function FeatureCards() {
  return (
    <section id="features" className="py-12 px-8 md:px-20 bg-[#242424] relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
        {/* Card 1: SWAP */}
        <RevealOnScroll delay={0}>
          <div className="feature-card-bg border border-white/10 p-8 rounded-[16px] h-full relative group hover:border-[#FDEB8F]/30 shadow-lg min-h-[480px] flex flex-col overflow-hidden">
            {/* Label */}
            <span className="text-[16px] font-mono text-white mb-6 block">{`( 01 SWAP`}</span>

            {/* Circle con línea */}
            <div className="relative flex items-center justify-center h-[120px]">
              <div className="relative">
                {/* Círculo exterior — estático */}
                <div className="w-[90px] h-[90px] rounded-full border-2 border-[#FDEB8F]/30 relative">
                  {/* Wrapper orbital — rota en dirección inversa */}
                  <div
                    className="absolute inset-0 animate-cyber-spin"
                    style={{ animationDuration: '3s', animationDirection: 'reverse' }}
                  >
                    {/* Círculo interior — offset para orbitar por el borde interior */}
                    <div
                      className="absolute w-[68px] h-[68px] rounded-full border-2 border-dashed border-[#FDEB8F]/80"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%) translateY(-11px)',
                      }}
                    />
                  </div>
                </div>
                {/* Línea horizontal a la derecha */}
                <div className="absolute top-1/2 left-full w-12 h-[2px] bg-[#FDEB8F]/40 -translate-y-1/2"></div>
              </div>
            </div>

            {/* Título + decoración */}
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-[32px] font-bold text-[#FFFFFF] leading-[1.1]">
                Cross-chain,<br />
                simplified
              </h3>
              <div className="flex items-center gap-1.5 mt-2 shrink-0">
                <div className="w-3 h-2 bg-[#FDEB8F] animate-glitch" style={{ animationDelay: '0s', animationDuration: '1.8s' }} />
                <span className="text-[#FDEB8F]/60 font-mono text-xs animate-glitch" style={{ animationDelay: '0.6s', animationDuration: '2.4s' }}>.</span>
                <span className="text-[#FDEB8F]/60 font-mono text-xs animate-glitch" style={{ animationDelay: '1.2s', animationDuration: '1.5s' }}>.</span>
                <span className="text-[#FDEB8F]/60 font-mono text-xs animate-glitch" style={{ animationDelay: '0.3s', animationDuration: '2.9s' }}>.</span>
              </div>
            </div>

            {/* Descripción con + prefijo */}
            <div className="flex gap-3">
              <span className="text-[#FDEB8F] text-[18px] mt-px shrink-0 [font-family:var(--font-grotesk-mono)]">+</span>
              <p className="text-[16px] font-normal text-[#FFFFFF] leading-relaxed uppercase tracking-wider [font-family:var(--font-grotesk-mono)]">
                NO MANUAL GAS JUGGLING OR BRIDGE MANAGEMENT REQUIRED. EXCHANGE-GRADE EXECUTION, WITHOUT GIVING UP CONTROL OF YOUR WALLET
              </p>
            </div>

            <TickWave />
          </div>
        </RevealOnScroll>

        {/* Card 2: EARN */}
        <RevealOnScroll delay={0}>
          <div className="feature-card-bg border border-white/10 p-8 rounded-[16px] h-full relative group hover:border-[#FDEB8F]/30 shadow-lg min-h-[480px] flex flex-col overflow-hidden">
            {/* Label */}
            <span className="text-[16px] font-mono text-white mb-6 block">{`( 02 EARN`}</span>

            {/* Línea diagonal — top right */}
            <div className="absolute top-10 right-10 w-px h-14 bg-white/25 rotate-[-45deg]" />

            {/* Dos círculos palpitantes */}
            <div className="flex items-center justify-center h-[120px]">
              <PulsingCircles />
            </div>

            {/* Contenido */}
            <div>
              <h3 className="text-[32px] font-bold mb-4 text-[#FFFFFF] leading-[1.1]">
                Idle assets?<br />
                Put them to work.
              </h3>

              <div className="flex gap-3 mb-8">
                <span className="text-[#FDEB8F] text-[16px] mt-px shrink-0 [font-family:var(--font-grotesk-mono)]">+</span>
                <p className="text-[16px] font-normal text-[#FFFFFF] leading-relaxed uppercase tracking-wider [font-family:var(--font-grotesk-mono)]">
                  ACCESS ONCHAIN YIELD ACROSS SUPPORTED TOKENS AND CHAINS– BUILT AROUND YOUR CONTROL.
                </p>
              </div>

              <GlitchPlus count={19} />
            </div>
          </div>
        </RevealOnScroll>

        {/* Card 3: CONFIDENTIAL */}
        <RevealOnScroll delay={0}>
          <div className="feature-card-bg border border-white/10 p-8 rounded-[16px] h-full relative group hover:border-[#FDEB8F]/30 shadow-lg min-h-[480px] flex flex-col overflow-hidden">
            {/* Label */}
            <span className="text-[16px] font-mono text-white mb-6 block">{`( 03 CONFIDENTIAL`}</span>

            {/* Glitch + pattern top right */}
            <div className="absolute top-14 right-8 left-8">
              <GlitchPlus count={10} />
            </div>

            {/* Spacer decorativo */}
            <div className="h-[120px]" />

            {/* Contenido */}
            <div>
              <h3 className="text-[32px] font-bold mb-4 text-[#FFFFFF] leading-[1.1]">
                Your transactions.<br />
                Your business.
              </h3>

              <div className="flex gap-3 mb-8">
                <span className="text-[#FDEB8F] text-[16px] mt-px shrink-0 [font-family:var(--font-grotesk-mono)]">+</span>
                <p className="text-[16px] font-normal text-[#FFFFFF] leading-relaxed uppercase tracking-wider [font-family:var(--font-grotesk-mono)]">
                  KEEP TRANSACTIONS OUT OF PUBLIC VIEW AND PROTECT YOUR CROSS-CHAIN POSITIONS.
                </p>
              </div>

              <SlidingBars />
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
