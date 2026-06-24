import fs from 'fs';
import path from 'path';
import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import { CTAButton } from '@/components/shared/CTAButton';
import { HowItWorksInteractive } from '@/components/sections/HowItWorksInteractive';

export function HowItWorks() {
  const svgPath = path.join(process.cwd(), 'public', 'images', 'NI_Howitworks_L_03_nodots.svg');
  const svgContent = fs.readFileSync(svgPath, 'utf-8')
    .replace('<svg ', '<svg style="width:100%;height:auto;display:block;" ');

  return (
    <section id="how-it-works" className="pt-24 pb-20 px-8 md:px-20 relative" style={{ background: '#000000' }}>
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <div className="w-full h-px mb-6" style={{ background: 'linear-gradient(to right, #FB4D01, transparent)' }}></div>
            <p className="text-lg text-zinc-400 mb-8">
              NEAR Intents uses a novel transaction architecture to abstract away cross-chain complexity and maximize performance, security, and efficiency for DeFi apps, AI agents and end users.
            </p>
            <CTAButton text="Read Technical Overview" href="https://docs.near-intents.org/getting-started/what-are-intents" />
          </div>
        </RevealOnScroll>

        <div className="relative w-full">
          {/* Mobile — untouched */}
          <img
            src="/images/how-it-works/grafico-vertical-f.svg"
            alt="How NEAR Intents Works"
            className="w-full h-auto object-contain mix-blend-lighten md:hidden"
          />
          {/* Desktop — animated dot background with inline SVG for correct font rendering */}
          <HowItWorksInteractive svgContent={svgContent} />
        </div>
      </div>
    </section>
  );
}
