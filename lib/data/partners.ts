export interface Partner {
  name: string;
  logo: string;
  userTypes: string[];
  featured?: boolean;
}

export const partners: Partner[] = [
  { name: 'Ledger',        logo: '/logos/partners/ledger.svg',   userTypes: ['multi-chain-wallet'],    featured: true },
  { name: 'Trust Wallet',  logo: '/logos/partners/trust.svg',    userTypes: ['multi-chain-wallet'],    featured: true },
  { name: 'SwapKit',       logo: '/logos/partners/swapkit.svg',  userTypes: ['aggregator'],            featured: true },
  { name: 'THORSwap',      logo: '/logos/partners/thorswap.png', userTypes: ['dex'],                   featured: true },
  { name: 'ZODL',          logo: '/logos/partners/zodl.png',     userTypes: ['single-chain-wallet'],   featured: true },
  { name: 'Socket',        logo: '/logos/partners/socket.svg',   userTypes: ['aggregator'],            featured: true },
  { name: 'LI.FI',         logo: '/logos/partners/lifi.svg',     userTypes: ['aggregator'],            featured: true },
  { name: 'Rabby',         logo: '/logos/partners/rabby.svg',    userTypes: ['single-chain-wallet'],   featured: true },
  { name: 'Rango',         logo: '/logos/partners/rango.svg',    userTypes: ['aggregator'],            featured: true },
  { name: 'Infinex',       logo: '/logos/partners/infinex.svg',  userTypes: ['dex', 'perps'],          featured: true },
  { name: 'KyberSwap',     logo: '/logos/partners/kyber.svg',    userTypes: ['dex'],                   featured: true },
  { name: 'Bitget Wallet', logo: '/logos/partners/bitget.png',   userTypes: ['multi-chain-wallet'],    featured: true },
  { name: 'Brave',         logo: '/logos/partners/brave.svg',    userTypes: ['multi-chain-wallet'],    featured: true },
  { name: 'PingPay',       logo: '/logos/partners/pingpay.png',  userTypes: ['payment-app'] },
  { name: 'Rhea Finance',  logo: '/logos/partners/rhea.svg',     userTypes: ['lending'] },
  { name: 'AVNU',          logo: '/logos/partners/avnu.svg',     userTypes: ['single-chain-wallet'] },
  { name: 'Yield.xyz',     logo: '/logos/partners/yield.svg',    userTypes: ['yield-vault'] },
  { name: 'NEAR.ai',       logo: '/logos/partners/nearai.png',   userTypes: ['ai-agent'] },
];

export const featuredPartners = partners.filter((p) => p.featured);
