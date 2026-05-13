export interface Chain {
  slug: string;
  name: string;
  logo: string;
  color: string;
}

export const chains: Chain[] = [
  // EVM
  { slug: 'ethereum',    name: 'Ethereum',     logo: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png',         color: '#627EEA' },
  { slug: 'arbitrum',    name: 'Arbitrum',     logo: 'https://coin-images.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg', color: '#28A0F0' },
  { slug: 'base',        name: 'Base',         logo: '/logos/chains/base.svg',                                                        color: '#0052FF' },
  { slug: 'optimism',    name: 'Optimism',     logo: 'https://coin-images.coingecko.com/coins/images/25244/small/Optimism.png',       color: '#FF0420' },
  { slug: 'polygon',     name: 'Polygon',      logo: 'https://coin-images.coingecko.com/coins/images/4713/small/polygon.png',         color: '#8247E5' },
  { slug: 'bnb',         name: 'BNB Chain',    logo: 'https://coin-images.coingecko.com/coins/images/825/small/bnb-icon2_2x.png',     color: '#F3BA2F' },
  { slug: 'avalanche',   name: 'Avalanche',    logo: 'https://coin-images.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png', color: '#E84142' },
  { slug: 'berachain',   name: 'Berachain',    logo: 'https://coin-images.coingecko.com/coins/images/28205/small/BERA.png',          color: '#964B00' },
  { slug: 'scroll',      name: 'Scroll',       logo: 'https://coin-images.coingecko.com/coins/images/50571/small/scroll.jpg',         color: '#F5C55E' },
  { slug: 'gnosis',      name: 'Gnosis',       logo: 'https://coin-images.coingecko.com/coins/images/662/small/logo_square_simple_300px.png', color: '#3E6957' },
  { slug: 'aurora',      name: 'Aurora',       logo: 'https://coin-images.coingecko.com/coins/images/20582/small/aurora.jpeg',        color: '#70D44B' },
  { slug: 'tron',        name: 'Tron',         logo: 'https://coin-images.coingecko.com/coins/images/1094/small/tron-logo.png',       color: '#FF0013' },
  // Bitcoin & Forks
  { slug: 'bitcoin',     name: 'Bitcoin',      logo: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png',            color: '#F7931A' },
  { slug: 'dogecoin',    name: 'Dogecoin',     logo: 'https://coin-images.coingecko.com/coins/images/5/small/dogecoin.png',           color: '#C2A633' },
  { slug: 'litecoin',    name: 'Litecoin',     logo: 'https://coin-images.coingecko.com/coins/images/2/small/litecoin.png',           color: '#345D9D' },
  { slug: 'zcash',       name: 'Zcash',        logo: 'https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png', color: '#ECB244' },
  { slug: 'dash',        name: 'Dash',         logo: 'https://coin-images.coingecko.com/coins/images/19/small/dash-logo.png',         color: '#008CE7' },
  { slug: 'bitcoin-cash',name: 'Bitcoin Cash', logo: 'https://coin-images.coingecko.com/coins/images/780/small/bitcoin-cash-circle-crop.png', color: '#0AC18E' },
  // Other L1s
  { slug: 'near',        name: 'NEAR',         logo: 'https://coin-images.coingecko.com/coins/images/10365/small/near.jpg',          color: '#00EC97' },
  { slug: 'solana',      name: 'Solana',       logo: 'https://coin-images.coingecko.com/coins/images/4128/small/solana.png',          color: '#9945FF' },
  { slug: 'starknet',    name: 'Starknet',     logo: 'https://coin-images.coingecko.com/coins/images/26433/small/starknet.png',       color: '#29296E' },
  { slug: 'sui',         name: 'Sui',          logo: 'https://coin-images.coingecko.com/coins/images/26375/small/sui_asset.jpeg',     color: '#4DA2FF' },
  { slug: 'ton',         name: 'TON',          logo: 'https://coin-images.coingecko.com/coins/images/17980/small/photo_2023-11-22_15-29-56.jpg', color: '#0088CC' },
  { slug: 'cardano',     name: 'Cardano',      logo: 'https://coin-images.coingecko.com/coins/images/975/small/cardano.png',          color: '#0033AD' },
  { slug: 'stellar',     name: 'Stellar',      logo: 'https://coin-images.coingecko.com/coins/images/100/small/stellar.png',        color: '#7D00FF' },
  { slug: 'xrp',         name: 'XRP',          logo: 'https://coin-images.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png', color: '#23292F' },
  { slug: 'monad',       name: 'Monad',        logo: '',                                                                              color: '#836EF9' },
  { slug: 'plasma',      name: 'Plasma',       logo: '',                                                                              color: '#00D4AA' },
  { slug: 'xlayer',      name: 'XLayer',       logo: '',                                                                              color: '#333333' },
  { slug: 'aleo',        name: 'Aleo',         logo: 'https://coin-images.coingecko.com/coins/images/27916/large/secondary-icon-dark.png', color: '#00C0F9' },
  { slug: 'adi',         name: 'ADI',          logo: '',                                                                              color: '#C4A962' },
];

export function getChain(slug: string): Chain | undefined {
  return chains.find((c) => c.slug === slug);
}
