'use client';

import { RevealOnScroll } from '@/components/shared/RevealOnScroll';

const useCases = [
  {
    title: 'Institutions',
    description:
      'Protect trading strategies from frontrunning and MEV. Prevent market signaling on large positions. Enable auditable execution with selective disclosure—the compliance-aware confidentiality that institutional desks require to put meaningful capital onchain.',
  },
  {
    title: 'Enterprises',
    description:
      'Keep payroll, treasury, and supply chain transactions confidential. Salaries, vendor payments, liquidity positions, and negotiated rates stay out of public view—without leaving onchain infrastructure.',
  },
  {
    title: 'DeFi Power Users',
    description:
      'Stop losing value to sandwich attacks. Move size without signaling. Manage cross-chain positions without broadcasting your strategy to every bot watching the mempool.',
  },
];

export function ConfidentialUseCases() {
  return (
    <section className="py-20 px-8 md:px-20 bg-[#000000] relative">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Built for serious capital. Useful for everyone.
          </h2>
          <div className="w-full h-px mb-12" style={{ background: 'linear-gradient(to right, #FB4D01, transparent)' }} />
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {useCases.map((item, idx) => (
            <RevealOnScroll key={idx} delay={idx * 0.15}>
              <div className="bg-[#FB4D01] rounded-[16px] p-8 flex flex-col h-full">
                <div className="flex gap-2 items-start mb-4">
                  <span className="text-white text-xl font-mono font-bold shrink-0">+</span>
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="text-[#ECECE9] text-base leading-relaxed flex-grow">
                  {item.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
