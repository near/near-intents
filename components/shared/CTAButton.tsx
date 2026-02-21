'use client';

import { Plus } from 'lucide-react';

interface CTAButtonProps {
  text: string;
  className?: string;
  small?: boolean;
  variant?: 'ghost' | 'solid';
  onClick?: () => void;
  href?: string;
}

export function CTAButton({
  text,
  className = '',
  small = false,
  variant = 'ghost',
  onClick,
  href
}: CTAButtonProps) {
  const paddingClass = small ? 'px-5 py-2 text-xs' : 'px-8 py-4';
  const iconSize = small ? 12 : 20;

  let baseStyles = `font-normal !text-[16px] tracking-[0.2em] uppercase transition-all duration-300 inline-flex items-center gap-3 group overflow-hidden rounded-[8px] [font-family:var(--font-grotesk-mono)] ${className} ${paddingClass}`;

  if (variant === 'solid') {
    baseStyles += ` bg-brand-orange-600 border border-brand-orange-600 text-black hover:bg-brand-orange-500 hover:border-brand-orange-500`;
  } else {
    baseStyles += ` bg-black border border-brand-orange-600 text-brand-orange hover:bg-brand-orange-600 hover:text-white`;
  }

  const Element = href ? 'a' : 'button';
  const elementProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : { onClick };

  return (
    <Element {...elementProps} className={baseStyles}>
      <Plus
        size={iconSize}
        className={`transition-transform duration-500 ease-out group-hover:rotate-90 ${
          variant === 'solid' ? 'text-black' : ''
        }`}
      />
      <div className="relative overflow-hidden leading-none translate-y-[2px]">
        <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
          {text}
        </span>
        <span className="absolute top-0 left-0 block transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0">
          {text}
        </span>
      </div>
    </Element>
  );
}
