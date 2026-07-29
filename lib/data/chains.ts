export interface Chain {
  slug: string;
  name: string;
  logo: string;
  color: string;
}

export const chains: Chain[] = [
  // EVM
  { slug: 'ethereum',    name: 'Ethereum',     logo: '/logos/chains/Allcoins_fullcolor_V02_ETH.svg',                color: '#627EEA' },
  { slug: 'arbitrum',    name: 'Arbitrum',     logo: '/logos/chains/Allcoins_fullcolor_V02_ARBITRUM.svg',           color: '#28A0F0' },
  { slug: 'base',        name: 'Base',         logo: '/logos/chains/Allcoins_fullcolor_V02_BASE.svg',               color: '#0052FF' },
  { slug: 'optimism',    name: 'Optimism',     logo: '/logos/chains/Allcoins_fullcolor_V02_OPTIMISM.svg',           color: '#FF0420' },
  { slug: 'polygon',     name: 'Polygon',      logo: '/logos/chains/Allcoins_fullcolor_V02_POLYGON.svg',            color: '#8247E5' },
  { slug: 'bnb',         name: 'BNB Chain',    logo: '/logos/chains/Allcoins_fullcolor_V02_BNB CHAIN.svg',          color: '#F3BA2F' },
  { slug: 'avalanche',   name: 'Avalanche',    logo: '/logos/chains/Allcoins_fullcolor_V02_AVALANCHE.svg',          color: '#E84142' },
  { slug: 'berachain',   name: 'Berachain',    logo: '/logos/chains/Allcoins_fullcolor_V02_BERACHAIN.svg',          color: '#964B00' },
  { slug: 'scroll',      name: 'Scroll',       logo: '/logos/chains/Allcoins_fullcolor_V02_SCROLL.svg',             color: '#F5C55E' },
  { slug: 'gnosis',      name: 'Gnosis',       logo: '/logos/chains/Allcoins_fullcolor_V02_GNOSIS.svg',             color: '#3E6957' },
  { slug: 'aurora',      name: 'Aurora',       logo: '/logos/chains/Allcoins_fullcolor_V02_AURORA.svg',             color: '#70D44B' },
  { slug: 'tron',        name: 'Tron',         logo: '/logos/chains/Allcoins_fullcolor_V02_TRX.svg',                color: '#FF0013' },
  // Bitcoin & Forks
  { slug: 'bitcoin',     name: 'Bitcoin',      logo: '/logos/chains/Allcoins_fullcolor_V02_BTC.svg',                color: '#F7931A' },
  { slug: 'dogecoin',    name: 'Dogecoin',     logo: '/logos/chains/Allcoins_fullcolor_V02_DOGECOIN.svg',           color: '#C2A633' },
  { slug: 'litecoin',    name: 'Litecoin',     logo: '/logos/chains/Allcoins_fullcolor_V02_LITECOIN.svg',           color: '#345D9D' },
  { slug: 'zcash',       name: 'Zcash',        logo: '/logos/chains/Allcoins_fullcolor_V02_ZEC.svg',                color: '#ECB244' },
  { slug: 'dash',        name: 'Dash',         logo: '/logos/chains/Allcoins_fullcolor_V02_DASH.svg',               color: '#008CE7' },
  { slug: 'bitcoin-cash',name: 'Bitcoin Cash', logo: '/logos/chains/Allcoins_fullcolor_V02_BTC CASH.svg',           color: '#0AC18E' },
  // Other L1s
  { slug: 'aptos',       name: 'Aptos',        logo: '/logos/chains/Allcoins_fullcolor_V02_APTOS.svg',              color: '#00BCD4' },
  { slug: 'movement',    name: 'Movement',     logo: '/logos/chains/Allcoins_fullcolor_V02_MOVEMENT.svg',           color: '#2B5CE6' },
  { slug: 'near',        name: 'NEAR',         logo: '/logos/chains/Allcoins_fullcolor_V02_NEAR.svg',               color: '#00EC97' },
  { slug: 'solana',      name: 'Solana',       logo: '/logos/chains/Allcoins_fullcolor_V02_SOL.svg',                color: '#9945FF' },
  { slug: 'starknet',    name: 'Starknet',     logo: '/logos/chains/Allcoins_fullcolor_V02_STARKNET.svg',           color: '#29296E' },
  { slug: 'sui',         name: 'Sui',          logo: '/logos/chains/Allcoins_fullcolor_V02_SUI.svg',                color: '#4DA2FF' },
  { slug: 'ton',         name: 'TON',          logo: '/logos/chains/Allcoins_fullcolor_V02_TON.svg',                color: '#0088CC' },
  { slug: 'cardano',     name: 'Cardano',      logo: '/logos/chains/Allcoins_fullcolor_V02_CARDANO.svg',            color: '#0033AD' },
  { slug: 'stellar',     name: 'Stellar',      logo: '/logos/chains/Allcoins_fullcolor_V02_STELLAR.svg',            color: '#7D00FF' },
  { slug: 'xrp',         name: 'XRP',          logo: '/logos/chains/Allcoins_fullcolor_V02_XRP.svg',                color: '#23292F' },
  { slug: 'monad',       name: 'Monad',        logo: '/logos/chains/Allcoins_fullcolor_V02_MONAD.svg',              color: '#836EF9' },
  { slug: 'plasma',      name: 'Plasma',       logo: '/logos/chains/Allcoins_fullcolor_V02_PLASMA.svg',             color: '#00D4AA' },
  { slug: 'xlayer',      name: 'XLayer',       logo: '/logos/chains/Allcoins_fullcolor_V02_XLAYER.svg',             color: '#333333' },
  { slug: 'aleo',        name: 'Aleo',         logo: '/logos/chains/Allcoins_fullcolor_V02_ALEO.svg',               color: '#00C0F9' },
  { slug: 'adi',         name: 'ADI',          logo: '/logos/chains/Allcoins_fullcolor_V02_ADI.svg',                color: '#C4A962' },
  { slug: 'fogo',        name: 'Fogo',         logo: '/logos/chains/Allcoins_fullcolor_V02_FOGO.svg',               color: '#FF3D00' },
];

export function getChain(slug: string): Chain | undefined {
  return chains.find((c) => c.slug === slug);
}
