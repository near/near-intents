'use client';

import { useState } from 'react';

interface Props {
  logo: string;
  symbol: string;
  size?: number;
  className?: string;
}

export default function TokenLogo({ logo, symbol, size = 36, className = '' }: Props) {
  const [error, setError] = useState(false);
  return error ? (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-[#fb4d01]/20 text-[#fb4d01] font-bold shrink-0 ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.35 }}
    >
      {symbol.slice(0, 2)}
    </span>
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo}
      alt={symbol}
      width={size}
      height={size}
      onError={() => setError(true)}
      className={`rounded-full shrink-0 object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
