import Image from 'next/image';

interface HeroCarouselLogoProps {
  src: string;
  alt: string;
  logoColor?: 'white' | 'black';
}

export function HeroCarouselLogo({ src, alt, logoColor }: HeroCarouselLogoProps) {
  return (
    <div className="group shrink-0 w-[58px] h-[58px] rounded-full flex items-center justify-center border border-white/10 bg-white transition-all duration-300 hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:border-white/30">
      <Image
        src={src}
        alt={alt}
        width={44}
        height={44}
        className="object-contain w-[35px] h-[35px] opacity-[0.85] group-hover:opacity-100 transition-all duration-300"
      />
    </div>
  );
}
