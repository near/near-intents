import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { LenisProvider } from '@/lib/lenis-provider';

// FK Grotesk - Loaded from local files
const fkGrotesk = localFont({
  src: [
    {
      path: '../public/fonts/fkgrotesk/FKGrotesk-Thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/fkgrotesk/FKGrotesk-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/fkgrotesk/FKGrotesk-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/fkgrotesk/FKGrotesk-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/fkgrotesk/FKGrotesk-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/fkgrotesk/FKGrotesk-Black.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-grotesk',
});

export const metadata: Metadata = {
  title: 'NEAR Intents - The Universal Liquidity Protocol',
  description:
    'NEAR Intents powers one-click cross-chain swaps, unified liquidity, and universal execution for onchain markets.',
  openGraph: {
    title: 'NEAR Intents - The Universal Liquidity Protocol',
    description: 'Cross-chain swaps simplified. $13B+ all-time volume across 35+ chains.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEAR Intents',
    description: 'The universal liquidity protocol',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${fkGrotesk.className} antialiased`} suppressHydrationWarning>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
