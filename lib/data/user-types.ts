import type { UserType } from '@/lib/types/content';

export const userTypes: UserType[] = [
  {
    slug: 'single-chain-wallet',
    name: 'Single-Chain Wallet or dApp',
    description: 'Wallets or dApps supporting one blockchain that use NEAR Intents for cross-chain access',
    icon: 'wallet',
    question: 'How do I onboard users from any chain?',
  },
  {
    slug: 'multi-chain-wallet',
    name: 'Multi-Chain Wallet or dApp',
    description: 'Multi-chain wallets that add cross-chain swaps and payments',
    icon: 'wallet-cards',
    question: 'How do I help users seamlessly move assets between the chains and assets I support?',
  },
  {
    slug: 'blockchain',
    name: 'Blockchain — L1 or L2',
    description: 'Layer 1 and Layer 2 networks that want to attract cross-chain users and assets',
    icon: 'blocks',
    question: 'How do I add my chain to the NEAR Intents network or bridge assets to my chain?',
  },
  {
    slug: 'dex',
    name: 'DEX',
    description: 'Decentralized exchanges and automated market makers',
    icon: 'arrow-left-right',
    question: 'How do I capture cross-chain swap volume?',
  },
  {
    slug: 'lending',
    name: 'Lending Protocol',
    description: 'Lending and borrowing protocols',
    icon: 'landmark',
    question: 'How do I accept deposits from any chain?',
  },
  {
    slug: 'perps',
    name: 'Perpetuals & Derivatives',
    description: 'Perpetual futures and derivatives platforms',
    icon: 'trending-up',
    question: 'How do I let traders fund positions from any chain?',
  },
  {
    slug: 'aggregator',
    name: 'Aggregator',
    description: 'DEX and bridge aggregators',
    icon: 'git-merge',
    question: 'How do I use NEAR Intents as a route?',
  },
  {
    slug: 'payment-app',
    name: 'Payment App',
    description: 'Crypto payment and commerce platforms',
    icon: 'credit-card',
    question: 'How do I convert between stablecoins for low fees or accept payments from any coin or chain?',
  },
  {
    slug: 'liquid-staking',
    name: 'Liquid Staking',
    description: 'Liquid staking protocols',
    icon: 'droplets',
    question: 'How do I accept cross-chain staking deposits or bridge my LST to any chain?',
  },
  {
    slug: 'yield-vault',
    name: 'Yield Vault',
    description: 'Yield aggregators and vault protocols',
    icon: 'vault',
    question: 'How do I let users deposit from any chain?',
  },
  {
    slug: 'trading-bot',
    name: 'Trading Bot',
    description: 'Automated trading bot platforms',
    icon: 'bot',
    question: 'How do I run a solver and fill user intents?',
  },
  {
    slug: 'ai-agent',
    name: 'Agent Platform',
    description: 'AI agent infrastructure and platforms',
    icon: 'brain',
    question: 'How do I give my agent infrastructure for custody, payments, and exchange?',
  },
  {
    slug: 'centralized-exchange',
    name: 'Centralized Exchange',
    description: 'Centralized exchanges looking for cross-chain liquidity and solver access',
    icon: 'building-2',
    question: 'How do I use my liquidity to access onchain orderflow?',
  },
  {
    slug: 'custodian',
    name: 'Custodian',
    description: 'Custody providers managing assets across multiple chains',
    icon: 'shield-check',
    question: 'How do I keep my customers in my app and let them move between any asset safely?',
  },
];

export function getUserType(slug: string): UserType | undefined {
  return userTypes.find((ut) => ut.slug === slug);
}
