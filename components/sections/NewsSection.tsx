import { RevealOnScroll } from '@/components/shared/RevealOnScroll';
import { ArrowRight, Plus } from 'lucide-react';

export function NewsSection() {
  return (
    <section className="py-8 px-8 md:px-20 bg-[#000] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Contenedor Gris con gradiente y bordes redondeados */}
        <div className="bg-gradient-to-b from-[#71717a] to-[#27272a] rounded-[16px] p-12 pb-16 relative">
          <RevealOnScroll>
            <div className="flex justify-between items-end mb-16 relative z-10">
              <h2 className="text-3xl font-bold text-white tracking-tight">
                NEAR Intents <span className="text-[#fbbf24]">News</span>
              </h2>
              <a
                href="#"
                className="text-[#fbbf24] text-xs font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1 border-b border-[#fbbf24] pb-1 hover:border-white"
              >
                View all blog articles{' '}
                <ArrowRight size={10} className="-rotate-45" />
              </a>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {[
              'Unpacking NEAR Intents: A Deep Dive',
              'Expanding NEAR Intents: Passkeys & OTC Trading Now Live',
              'Introducing NEAR Intents: A New Type of Transaction Between AI and the Real World',
            ].map((title, i) => (
              <div key={i} className="group relative h-[380px] w-full cursor-pointer">
                {/* Black Background Layer (Backing) */}
                <div className="absolute inset-0 bg-black translate-x-4 translate-y-4 rounded-[16px] overflow-hidden transition-transform duration-500 ease-out group-hover:translate-x-6 group-hover:translate-y-6">
                  {/* Tech Grid Pattern */}
                  <div className="absolute inset-0 opacity-40 tech-grid-bg">
                    <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-white rounded-full border border-gray-500"></div>
                    <div className="absolute top-full left-0 w-full h-full bg-gradient-to-t from-gray-900 to-transparent"></div>
                  </div>
                </div>

                {/* White Foreground Card */}
                <div className="absolute inset-0 bg-white p-8 flex flex-col justify-between rounded-[16px] shadow-xl transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:-translate-x-2 border border-white">
                  <div>
                    <div className="flex gap-1.5 mb-6">
                      {[...Array(5)].map((_, j) => (
                        <Plus key={j} size={10} className="text-brand-orange stroke-[4px]" />
                      ))}
                    </div>
                    <h3 className="text-black text-2xl font-bold leading-tight tracking-tight">{title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
