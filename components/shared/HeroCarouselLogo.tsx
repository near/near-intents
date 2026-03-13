import Image from 'next/image';

interface HeroCarouselLogoProps {
  src: string;
  alt: string;
  logoColor?: 'white' | 'black';
}

export function HeroCarouselLogo({ src, alt, logoColor }: HeroCarouselLogoProps) {
  return (
    <div className="group shrink-0 w-[58px] h-[58px] rounded-full flex items-center justify-center border border-white bg-[#101214] opacity-[0.80] hover:opacity-100 transition-[opacity,box-shadow,border-color] duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:border-white/60">
      <Image
        src={src}
        alt={alt}
        width={44}
        height={44}
        className="object-contain w-[35px] h-[35px] transition-all duration-300"
      />
    </div>
  );
}
