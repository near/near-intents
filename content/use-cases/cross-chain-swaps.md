---
name: Cross-Chain Swaps
slug: cross-chain-swaps
icon: arrow-left-right
tagline: "Let your users swap any asset on any chain, right inside your app"
coverImage: /screenshots/trustwallet-swap-btc-usdc.jpg
screenshots:
  - src: /screenshots/trustwallet-swap-btc-usdc.jpg
    caption: "Swapping 1.1 BTC for USDC on Base in Trust Wallet — Trust Wallet supports both Bitcoin and Base natively, so it handles signing and deposit of the source asset and receives USDC directly into the user's wallet address with no extra input needed"
    source: "Trust Wallet"
  - src: /screenshots/near-swap-btc-usdc.png
    caption: "Trading 1.2 BTC for 81,601 USDC on near.com"
    source: "near.com"
  - src: /screenshots/ledger-live-swap-near-intents.png
    caption: "NEAR Intents as the best quote in Ledger Live — swapping 0.079 ETH to BTC with $0 network fee, beating 1inch, Changelly, and Moonpay"
    source: "Ledger Live"
  - src: /screenshots/zodl-swap-input.jpg
    caption: "Getting a quote to swap Zcash to USDC in ZODL"
    source: "ZODL"
  - src: /screenshots/zodl-swap-confirm.jpg
    caption: "Reviewing a cross-chain swap in ZODL"
    source: "ZODL"
featuredPartners:
  - name: Trust Wallet
    logo: "https://coin-images.coingecko.com/coins/images/11085/small/Trust.png"
    url: "https://trustwallet.com"
    description: "Cross-chain swaps across 31 chains directly inside Trust Wallet — powered by NEAR Intents."
  - name: Ledger Live
    logo: "https://www.ledger.com/wp-content/uploads/2021/11/Ledger_favicon.png"
    url: "https://www.ledger.com/ledger-live"
    description: "Hardware wallet users swap assets across chains without leaving Ledger Live."
  - name: LI.FI
    logo: "https://li.fi/logo96.png"
    url: "https://li.fi"
    description: "Cross-chain bridging and DEX aggregation protocol — routes through NEAR Intents for optimal pricing."
  - name: SwapKit
    logo: "https://swapkit.dev/wp-content/uploads/2024/04/cropped-swapkit-icon.jpg"
    url: "https://swapkit.dev"
    description: "Multi-chain swap SDK powering THORSwap — integrates NEAR Intents alongside THORChain and Chainflip."
relevantUserTypes:
  - single-chain-wallet
  - multi-chain-wallet
  - blockchain
  - dex
  - aggregator
  - lending
  - yield-vault
  - trading-bot
  - ai-agent
  - payment-app
  - custodian
  - centralized-exchange
demoComponent: SwapDemo
sortOrder: 1
revenueHooks:
  default: "Every cross-chain swap through your app = fees you weren't capturing"
  single-chain-wallet: "Users stay in your wallet instead of leaving for a CEX — and you earn on every swap"
  multi-chain-wallet: "Native cross-chain swaps mean users never need a bridge — you capture the volume and keep them in your app"
  blockchain: "Give users on other chains easy access to tokens and products your chain"
  dex: "Route cross-chain volume through your liquidity pools — new fees from 31 chains"
  aggregator: "Add NEAR Intents as a route — better pricing, more paths, revenue share"
  lending: "Let borrowers and lenders move collateral across chains without leaving your app"
  yield-vault: "Depositors convert any asset into your vault's required token in one step — no pre-swap needed"
  trading-bot: "Your bots execute cross-chain swaps programmatically — arbitrage across 31 chains through one API"
  ai-agent: "Give your agents the ability to swap any asset on any chain — autonomous cross-chain execution"
  payment-app: "Let your users swap between stablecoins on any chain for the lowest fees"
  custodian: "Clients rebalance portfolios across chains without neeeding to transfer from your custody"
  centralized-exchange: "Offer onchain liquidity to your users without listing every token — NEAR Intents handles the routing"
userStories:
  - persona: "Alice"
    userType: single-chain-wallet
    context: "Has ETH on Ethereum, wants BTC"
    app: ZODL
    partnerSlug: zodl
    steps:
      - "Opens ZODL → taps Swap"
      - "Selects ETH → BTC"
      - "NEAR Intents routes: ETH → NEAR → BTC"
      - "Signs one transaction"
      - "BTC arrives in ~30 seconds"
    without: "Find a CEX, KYC, deposit, trade, withdraw. ~30 min, ~3% in fees."
  - persona: "Bob"
    userType: dex
    context: "Wants to swap USDC on Arbitrum for SOL on Solana"
    app: "A DEX on Arbitrum"
    partnerSlug: null
    steps:
      - "Opens DEX → selects Cross-Chain Swap tab"
      - "Picks USDC (Arbitrum) → SOL (Solana)"
      - "NEAR Intents finds best route across chains"
      - "One signature, SOL arrives on Solana"
    without: "Bridge USDC to Solana, find a Solana DEX, swap to SOL. Multiple txns, 5-10 min."
  - persona: "A Starknet user"
    userType: blockchain
    context: "Holds assets on Ethereum, wants to use Starknet DeFi"
    app: "AVNU on Starknet"
    partnerSlug: null
    steps:
      - "Opens AVNU → sees cross-chain swap option"
      - "Selects ETH (Ethereum) → ETH (Starknet)"
      - "NEAR Intents handles the cross-chain routing"
      - "ETH arrives on Starknet ready for DeFi"
    without: "Use the Starknet bridge, wait for finality, manually deposit. 15-30 min."
howItWorksSteps:
  - icon: Wallet
    title: Pick your tokens
    detail: "Choose any source asset on any chain and any destination asset on any chain."
    color: "#627EEA"
    chainPill: Any chain → any chain
  - icon: Cpu
    title: Intents finds the route
    detail: "Solvers compete to fill your swap at the best price. You configure your own fees, which are charged as swap fees for the user."
    color: "#fb4d01"
    chainPill: NEAR Intents solver network
  - icon: PenLine
    title: Sign or deposit
    detail: "Sign one transaction from a connected wallet — or get a deposit address to send from any wallet or exchange. No chain-specific wallet support required."
    color: "#F7931A"
    chainPill: Two ways in
  - icon: CheckCircle
    title: Assets arrive (~30s)
    detail: "The destination token lands in the user's wallet."
    color: "#9945FF"
    chainPill: Destination chain
revenueModel:
  feeStructure: "Configurable fee per swap — typically 20 to 100 basis points. Fees are fully customizable per route, so you can set lower fees for like-to-like swaps (e.g. USDC → USDT) and higher fees for cross-asset swaps."
  revShare: ""
---

## What is Cross-Chain Swaps?

Cross-Chain Swaps lets your users swap any token on any chain for any other token on any other chain — directly inside your app. No bridging, no multiple transactions, no leaving your UI.

NEAR Intents handles the routing automatically. Your user selects source and destination, signs one transaction, and the swap completes in ~30 seconds across 31 supported chains.

## How it Works

1. **User initiates a swap** in your app (e.g., ETH on Ethereum → SOL on Solana)
2. **NEAR Intents finds the optimal route** through its solver network
3. **User signs one transaction** on their source chain
4. **Solvers execute the swap** — depositing the destination token to the user
5. **Settlement happens on NEAR** — trustless, verifiable, fast

