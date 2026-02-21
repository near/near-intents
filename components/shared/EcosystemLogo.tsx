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
  const isLogoWhite = logoColor === 'white';

  // Logo blanco → background negro, Logo negro → background blanco
  const bgClasses = isDark
    ? isLogoWhite
      ? 'bg-black border-white/10'
      : 'bg-white border-black/10'
    : isLogoWhite
    ? 'bg-black border-white/10'
    : 'bg-white border-black/10';

  return (
    <div className="relative flex flex-col items-center">
      <span className="absolute -top-5 right-2 text-brand-orange text-xs font-mono select-none">+</span>
      <div className={`group w-16 h-16 md:w-[120px] md:h-[120px] rounded-full flex items-center justify-center border transition-all duration-300 ${bgClasses}`}>
        <Image
          src={src}
          alt={name}
          width={68}
          height={68}
          className="object-contain w-8 h-8 md:w-[68px] md:h-[68px] opacity-[0.85] group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>
      <span
        className={`mt-2 font-bold text-[10px] md:text-sm tracking-wide [font-family:var(--font-grotesk)] ${
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
  const isLogoWhite = logoColor === 'white';

  // Logo blanco → background negro, Logo negro → background blanco
  const bgClasses = isDark
    ? isLogoWhite
      ? 'bg-black border-white/10'
      : 'bg-white border-black/10'
    : isLogoWhite
    ? 'bg-black border-white/10'
    : 'bg-white border-black/10';

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`group w-[58px] h-[58px] rounded-full flex items-center justify-center border transition-all duration-300 ${bgClasses}`}>
        <Image
          src={src}
          alt={name}
          width={32}
          height={32}
          className="object-contain opacity-[0.85] group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>
      <span
        className={`font-bold text-[11px] tracking-wide text-center leading-tight [font-family:var(--font-grotesk)] ${
          isDark ? 'text-white' : 'text-black'
        }`}
      >
        {name}
      </span>
    </div>
  );
}
