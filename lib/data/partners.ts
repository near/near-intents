export interface Partner {
  name: string;
  logo: string;
  userTypes: string[];
  featured?: boolean;
  mobileClass?: string;
}

export const partners: Partner[] = [
  { name: 'Ledger',        logo: '/logos/partners/White -Ledger logo.svg', userTypes: ['multi-chain-wallet'],    featured: true },
  { name: 'Trust Wallet',  logo: '/logos/partners/Trust_Wordmark_White.png', userTypes: ['multi-chain-wallet'],    featured: true },
  { name: 'SwapKit',       logo: '/logos/partners/Swapkit-white.png',        userTypes: ['aggregator'],            featured: true },
  { name: 'THORSwap',      logo: '/logos/partners/thorswap_NEW_W.svg',       userTypes: ['dex'],                   featured: true, mobileClass: 'h-4 sm:h-10' },
  { name: 'ZODL',          logo: '/logos/partners/ZODL_NEW_W.svg',           userTypes: ['single-chain-wallet'],   featured: true },
  { name: 'Socket',        logo: '/logos/partners/SOCKET_NEW_W.svg',         userTypes: ['aggregator'],            featured: true },
  { name: 'LI.FI',         logo: '/logos/partners/lifi-white.png',           userTypes: ['aggregator'],            featured: true },
  { name: 'Rabby',         logo: '/logos/partners/logo-white 1.svg',         userTypes: ['single-chain-wallet'],   featured: true, mobileClass: 'h-10 sm:h-10' },
  { name: 'Rango',         logo: '/logos/partners/rango-white.png',          userTypes: ['aggregator'],            featured: true, mobileClass: 'h-9 sm:h-10' },
  { name: 'Infinex',       logo: '/logos/partners/infinex-white.png',        userTypes: ['dex', 'perps'],          featured: true, mobileClass: 'h-5 sm:h-10' },
  { name: 'KyberSwap',     logo: '/logos/partners/kyberswap-text-white 1.svg', userTypes: ['dex'],                   featured: true, mobileClass: 'h-9 sm:h-10' },
  { name: 'Bitget Wallet', logo: '/logos/partners/Bitget Wallet-Logo-White.png', userTypes: ['multi-chain-wallet'],    featured: true },
  { name: 'Brave',         logo: '/logos/partners/brave_white_darkbackground.svg', userTypes: ['multi-chain-wallet'],    featured: true },
  { name: 'PingPay',       logo: '/logos/partners/pingpay.png',  userTypes: ['payment-app'] },
  { name: 'Rhea Finance',  logo: '/logos/partners/rhea.svg',     userTypes: ['lending'] },
  { name: 'AVNU',          logo: '/logos/partners/avnu.svg',     userTypes: ['single-chain-wallet'] },
  { name: 'Yield.xyz',     logo: '/logos/partners/yield.svg',    userTypes: ['yield-vault'] },
  { name: 'NEAR.ai',       logo: '/logos/partners/nearai.png',   userTypes: ['ai-agent'] },
];

export const featuredPartners = partners.filter((p) => p.featured);
