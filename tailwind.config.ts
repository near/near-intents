import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'brand-dark': '#1E1E1E',
        'brand-orange': {
          DEFAULT: '#FB4D01',
          50: '#FEF2EE',
          100: '#FDE5DD',
          200: '#FBCBBB',
          300: '#F9B199',
          400: '#F79777',
          500: '#FB4D01',
          600: '#E04401',
          700: '#C63B01',
          800: '#AB3301',
          900: '#912A01',
        },
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee-fast': 'marquee 12s linear infinite',
        'aurora-spin': 'aurora-spin 20s linear infinite',
        'aurora-spin-reverse': 'aurora-spin 15s linear infinite reverse',
        'cyber-spin': 'cyber-spin 12s linear infinite',
        'cyber-scan': 'cyber-scan 3s ease-in-out infinite',
        'equalizer': 'equalizer 1.5s ease-in-out infinite',
        'blink': 'blink 2s ease-in-out infinite',
        'glitch': 'glitch 2s linear infinite',
        'float-diagonal': 'float-diagonal 3s ease-in-out infinite',
        'tick-wave': 'tick-wave 1.4s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.333%)' },
        },
        'aurora-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'cyber-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'cyber-scan': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(100%)' },
        },
        'equalizer': {
          '0%, 100%': { height: '20%' },
          '50%': { height: '100%' },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        'glitch': {
          '0%': { opacity: '1' },
          '20%': { opacity: '1' },
          '21%': { opacity: '0' },
          '22%': { opacity: '1' },
          '69%': { opacity: '1' },
          '70%': { opacity: '0' },
          '71%': { opacity: '1' },
          '100%': { opacity: '1' },
        },
        'float-diagonal': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(10px, -10px)' },
        },
        'tick-wave': {
          '0%, 100%': { height: '4px' },
          '50%': { height: '16px' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
