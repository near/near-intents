import Image from 'next/image';

interface LogoProps {
  name: string;
  src: string;
  variant?: 'dark' | 'light';
  logoColor?: 'white' | 'black'; // Color del logo original para determinar el background del círculo
}

/**
 * Large ecosystem logo with decorative + indicator
 * Used in the first row of the Intents Ecosystem section
 */
export function LargeEcosystemLogo({ name, src, variant = 'dark', logoColor = 'black' }: LogoProps) {
  const isDark = variant === 'dark';

  const bgClasses = 'bg-[#f2f2f2] border-white/10';

  return (
    <div className="relative flex flex-col items-center">
      <span className="absolute -top-4 -right-1 text-brand-orange text-[9px] font-mono select-none">+</span>
      <div className={`group w-12 h-12 md:w-16 md:h-16 lg:w-[120px] lg:h-[120px] rounded-full flex items-center justify-center border transition-all duration-300 hover:bg-white hover:shadow-[0_0_24px_rgba(255,255,255,0.35)] hover:border-white/30 ${bgClasses}`}>
        <Image
          src={src}
          alt={name}
          width={68}
          height={68}
          className="object-contain w-6 h-6 md:w-8 md:h-8 lg:w-[68px] lg:h-[68px] opacity-90"
        />
      </div>
      <span
        className={`mt-1 md:mt-2 font-bold text-[10px] md:text-xs lg:text-sm tracking-wide text-center [font-family:var(--font-grotesk)] ${
          isDark ? 'text-white' : 'text-black'
        }`}
      >
        {name}
      </span>
    </div>
  );
}

/**
 * Small ecosystem logo without decorative indicator
 * Used in the second and third rows of the Intents Ecosystem section
 */
export function SmallEcosystemLogo({ name, src, variant = 'dark', logoColor = 'black' }: LogoProps) {
  const isDark = variant === 'dark';

  const bgClasses = 'bg-[#f2f2f2] border-white/10';

  return (
    <div className="flex flex-col items-center gap-1 md:gap-2">
      <div className={`group w-10 h-10 md:w-[58px] md:h-[58px] rounded-full flex items-center justify-center border transition-all duration-300 hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:border-white/30 ${bgClasses}`}>
        <Image
          src={src}
          alt={name}
          width={32}
          height={32}
          className="object-contain w-5 h-5 md:w-8 md:h-8 opacity-90"
        />
      </div>
      <span
        className={`font-bold text-[10px] md:text-[11px] tracking-wide text-center leading-tight [font-family:var(--font-grotesk)] ${
          isDark ? 'text-white' : 'text-black'
        }`}
      >
        {name}
      </span>
    </div>
  );
}
