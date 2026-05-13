import { NextResponse } from 'next/server';

export const revalidate = 300;

// Complete token logo map — same as near-intents-std tokenLogos
const TOKEN_LOGOS: Record<string, string> = {
  // Major native assets
  BTC:   'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png',
  ETH:   'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png',
  SOL:   'https://coin-images.coingecko.com/coins/images/4128/small/solana.png',
  BNB:   'https://coin-images.coingecko.com/coins/images/825/small/bnb-icon2_2x.png',
  XRP:   'https://coin-images.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png',
  ADA:   'https://coin-images.coingecko.com/coins/images/975/small/cardano.png',
  DOGE:  'https://coin-images.coingecko.com/coins/images/5/small/dogecoin.png',
  LTC:   'https://coin-images.coingecko.com/coins/images/2/small/litecoin.png',
  BCH:   'https://coin-images.coingecko.com/coins/images/780/small/bitcoin-cash-circle.png',
  ZEC:   'https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png',
  DASH:  'https://coin-images.coingecko.com/coins/images/19/small/dash-logo.png',
  DOT:   'https://coin-images.coingecko.com/coins/images/12171/small/polkadot.png',
  AVAX:  'https://coin-images.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png',
  NEAR:  'https://coin-images.coingecko.com/coins/images/10365/small/near.jpg',
  SUI:   'https://coin-images.coingecko.com/coins/images/26375/small/sui-ocean-square.png',
  TON:   'https://coin-images.coingecko.com/coins/images/17980/small/ton_symbol.png',
  TRX:   'https://coin-images.coingecko.com/coins/images/1094/small/tron-logo.png',
  XLM:   'https://coin-images.coingecko.com/coins/images/100/small/Stellar_symbol_black_RGB.png',
  GNO:   'https://coin-images.coingecko.com/coins/images/662/small/logo_square_simple_300px.png',
  OKB:   'https://coin-images.coingecko.com/coins/images/4463/small/WeChat_Image_20220118095654.png',
  // Wrapped / bridged variants
  WBTC:  'https://coin-images.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png',
  WETH:  'https://coin-images.coingecko.com/coins/images/2518/small/weth.png',
  wBTC:  'https://coin-images.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png',
  cbBTC: 'https://coin-images.coingecko.com/coins/images/40143/small/cbbtc.webp',
  xBTC:  'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png',
  nBTC:  'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png',
  // Stablecoins
  USDT:  'https://coin-images.coingecko.com/coins/images/325/small/Tether.png',
  USDC:  'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png',
  'USDC.e': 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png',
  USDCx: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png',
  USDT0: 'https://coin-images.coingecko.com/coins/images/325/small/Tether.png',
  DAI:   'https://coin-images.coingecko.com/coins/images/9956/small/Badge_Dai.png',
  xDAI:  'https://coin-images.coingecko.com/coins/images/9956/small/Badge_Dai.png',
  FRAX:  'https://coin-images.coingecko.com/coins/images/13422/small/FRAX_icon.png',
  USDD:  'https://coin-images.coingecko.com/coins/images/25380/small/USDD.jpg',
  USD1:  'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png',
  sUSCD: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png',
  USDf:  'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png',
  USAD:  'https://coin-images.coingecko.com/coins/images/325/small/Tether.png',
  GBPe:  'https://coin-images.coingecko.com/coins/images/26433/large/starknet.png',
  EURe:  'https://coin-images.coingecko.com/coins/images/26433/large/starknet.png',
  // DeFi majors
  UNI:   'https://coin-images.coingecko.com/coins/images/12504/small/uni.jpg',
  AAVE:  'https://coin-images.coingecko.com/coins/images/12645/small/AAVE.png',
  LINK:  'https://coin-images.coingecko.com/coins/images/877/small/chainlink-new-logo.png',
  GMX:   'https://coin-images.coingecko.com/coins/images/18323/small/arbit.png',
  ARB:   'https://coin-images.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg',
  OP:    'https://coin-images.coingecko.com/coins/images/25244/small/Optimism.png',
  MATIC: 'https://coin-images.coingecko.com/coins/images/4713/small/polygon.png',
  POL:   'https://coin-images.coingecko.com/coins/images/4713/small/polygon.png',
  STX:   'https://coin-images.coingecko.com/coins/images/2069/small/Stacks_logo_full.png',
  TRUMP: 'https://coin-images.coingecko.com/coins/images/53746/small/trump.jpg',
  SHIB:  'https://coin-images.coingecko.com/coins/images/11939/large/shiba.png',
  PEPE:  'https://coin-images.coingecko.com/coins/images/29850/large/pepe-token.jpeg',
  stETH: 'https://coin-images.coingecko.com/coins/images/13442/small/steth_logo.png',
  // L1/L2 tokens
  APT:   'https://coin-images.coingecko.com/coins/images/26455/large/Aptos-Network-Symbol-Black-RGB-1x.png',
  STRK:  'https://coin-images.coingecko.com/coins/images/26433/large/starknet.png',
  BERA:  'https://coin-images.coingecko.com/coins/images/25235/large/BERA.png',
  MON:   'https://coin-images.coingecko.com/coins/images/38927/large/mon.png',
  ALEO:  'https://coin-images.coingecko.com/coins/images/27916/large/secondary-icon-dark.png',
  XPL:   'https://coin-images.coingecko.com/coins/images/66489/large/Plasma-symbol-green-1.png',
  // DeFi tokens
  COW:     'https://coin-images.coingecko.com/coins/images/24384/large/CoW-token_logo.png',
  KNC:     'https://coin-images.coingecko.com/coins/images/14899/large/RwdVsGcw_400x400.jpg',
  SAFE:    'https://coin-images.coingecko.com/coins/images/27032/large/Artboard_1_copy_8circle-1.png',
  PENGU:   'https://coin-images.coingecko.com/coins/images/52622/large/PUDGY_PENGUINS_PENGU_PFP.png',
  BRETT:   'https://coin-images.coingecko.com/coins/images/33747/large/ogbretttttttt.jpg',
  SPX:     'https://coin-images.coingecko.com/coins/images/31401/large/centeredcoin_%281%29.png',
  TURBO:   'https://coin-images.coingecko.com/coins/images/30117/large/TurboMark-QL_200.png',
  '$WIF':  'https://coin-images.coingecko.com/coins/images/33566/large/dogwifhat.jpg',
  MELANIA: 'https://coin-images.coingecko.com/coins/images/53775/large/melania-meme.png',
  KAITO:   'https://coin-images.coingecko.com/coins/images/53844/large/kaito.jpg',
  // NEAR ecosystem
  wNEAR:  'https://coin-images.coingecko.com/coins/images/10365/small/near.jpg',
  stNEAR: 'https://coin-images.coingecko.com/coins/images/24250/small/st_near.png',
  AURORA: 'https://coin-images.coingecko.com/coins/images/20582/small/aurora.jpeg',
  SWEAT:  'https://coin-images.coingecko.com/coins/images/25057/small/fhD9Xs16_400x400.jpg',
  REF:    'https://coin-images.coingecko.com/coins/images/18279/small/ref.png',
  ADI:    'https://coin-images.coingecko.com/coins/images/38803/small/adi.jpeg',
};

// SwapKit CDN chain map — same as near-intents-std
const SWAPKIT_CHAINS: Record<string, string> = {
  eth: 'eth', arb: 'arb', base: 'base', op: 'op', bsc: 'bsc',
  avalanche: 'avax', pol: 'matic', gnosis: 'gno', scroll: 'scroll',
};

interface RawToken {
  symbol: string;
  blockchain: string;
  contractAddress?: string;
  price?: number;
  icon?: string;
}

function resolveLogoURI(t: RawToken): string | undefined {
  // 1) Manual map
  if (TOKEN_LOGOS[t.symbol]) return TOKEN_LOGOS[t.symbol];
  // 2) SwapKit CDN for EVM tokens with contract address
  const chain = SWAPKIT_CHAINS[t.blockchain];
  if (chain && t.contractAddress && t.contractAddress !== 'NATIVE') {
    return `https://storage.googleapis.com/token-list-swapkit-dev/images/${chain}.${t.symbol.toLowerCase()}-${t.contractAddress.toLowerCase()}.png`;
  }
  // 3) API icon field as last resort
  return t.icon ?? undefined;
}

export async function GET() {
  try {
    const res = await fetch('https://1click.chaindefuser.com/v0/tokens', {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();

    const seen = new Set<string>();
    const tokens = (data?.tokens ?? data ?? [])
      .filter((t: RawToken) => (t.price ?? 0) > 0)
      .map((t: RawToken) => ({
        symbol: t.symbol,
        blockchain: t.blockchain,
        contractAddress: t.contractAddress,
        price: t.price ?? 0,
        logo: resolveLogoURI(t),
      }))
      .filter((t: { symbol: string }) => {
        if (seen.has(t.symbol)) return false;
        seen.add(t.symbol);
        return true;
      });

    return NextResponse.json(tokens);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
