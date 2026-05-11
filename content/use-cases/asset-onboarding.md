---
name: Asset Onboarding
slug: asset-onboarding
icon: download
tagline: "Turn any crypto holder into your user — they deposit from their chain, your app gets what it needs"
coverImage: /screenshots/zodl-bitcoin-onboarding.jpg
screenshots:
  - src: /screenshots/dep-now-deposit.png
    caption: "Deposit any asset into Hyperliquid perps — 1 ETH from Ethereum becomes 2,144 USDC on Arbitrum"
    source: "dep.now"
  - src: /screenshots/zodl-bitcoin-onboarding.jpg
    caption: "Send Bitcoin and receive ZEC in your ZODL wallet"
    source: "ZODL"
  - src: /screenshots/zodl-onboard-input.jpg
    caption: "Selecting a source asset to deposit into ZODL — send ETH from Ethereum, receive ZEC in the app"
    source: "ZODL"
relevantUserTypes:
  - single-chain-wallet
  - multi-chain-wallet
  - blockchain
  - dex
  - lending
  - perps
  - liquid-staking
  - yield-vault
  - trading-bot
  - ai-agent
  - payment-app
demoComponent: OnboardingDemo
sortOrder: 4
revenueHooks:
  default: "Let a user deposit into your app from wherever they are. Any asset, any chain."
  single-chain-wallet: "Anyone with crypto anywhere can become your user — no CEX or bridge required"
  multi-chain-wallet: "Accept deposits from every chain your users hold assets on — one integration, universal onboarding"
  blockchain: "Let users onboard to your chain from anywhere in crypto"
  dex: "Traders from 31 chains can fund and trade directly — more users, more volume, more fees"
  lending: "Borrowers deposit collateral from any chain — expand your addressable market overnight"
  perps: "Traders fund margin from any chain in one step — lower the barrier, increase open interest"
  liquid-staking: "Accept staking deposits from any chain, any asset"
  yield-vault: "Users deposit into your vault from any chain — one step instead of bridge + swap + deposit"
  trading-bot: "Bots fund from any chain — deploy capital wherever the opportunity is without pre-positioning elsewhere"
  ai-agent: "Agents deposit into any protocol on any chain — autonomous cross-chain funding without manual bridging"
  payment-app: "Accept deposits from any crypto user on any chain — no wallet-specific support required"
userStories:
  - persona: "A BTC holder"
    userType: lending
    context: "Wants to deposit BTC as collateral on a lending protocol on Base, but has never used Base"
    app: "A lending protocol on Base"
    partnerSlug: null
    steps:
      - "Opens the lending app → clicks 'Deposit Collateral'"
      - "Sees 'Bitcoin (BTC)' in the source chain selector"
      - "Selects amount — app previews cbBTC equivalent on Base"
      - "Sends BTC to a generated deposit address (no Base wallet needed)"
      - "cbBTC appears as collateral in their lending position in ~30s"
    without: "Send BTC to a CEX, convert to cbBTC, bridge to Base, deposit into lending protocol. 4 steps, 15-30 min, ~3% in fees."
  - persona: "An Ethereum user"
    userType: blockchain
    context: "Wants to use a Starknet DeFi app but has never bridged to Starknet before"
    app: "A DeFi app on Starknet"
    partnerSlug: null
    steps:
      - "Opens a Starknet DeFi app → clicks 'Deposit'"
      - "Selects 'ETH on Ethereum' as source"
      - "Previews: 0.5 ETH → ETH on Starknet"
      - "Signs one Ethereum transaction"
      - "ETH arrives on Starknet ready to use — user never touched a bridge"
    without: "Find the Starknet bridge, understand the process, wait for L1→L2 finality, then manually deposit into the DeFi app. Many users give up before completing."
  - persona: "A SOL holder"
    userType: perps
    context: "Wants to open a leveraged position on an Arbitrum perps exchange with SOL collateral"
    app: "A perps exchange on Arbitrum"
    partnerSlug: null
    steps:
      - "Opens perps exchange → clicks 'Fund Account'"
      - "Selects 'SOL on Solana' from the chain selector"
      - "NEAR Intents previews: 10 SOL → USDC on Arbitrum"
      - "Signs one Solana transaction"
      - "USDC appears in their margin account — position opened immediately"
    without: "Bridge SOL to Arbitrum via a cross-chain bridge, swap to USDC on an Arbitrum DEX, then deposit. Three separate steps across two apps."
  - persona: "A wallet user"
    userType: single-chain-wallet
    context: "Has ETH on Ethereum, wants to try a Zcash-based privacy wallet app"
    app: "ZODL"
    partnerSlug: zodl
    steps:
      - "Opens ZODL → taps Deposit"
      - "Selects 'ETH on Ethereum' as source"
      - "App previews: 0.5 ETH → receives ZEC in ZODL"
      - "Signs one Ethereum transaction"
      - "ZEC appears in ZODL wallet in ~30 seconds — ready to use"
    without: "Find a CEX that supports both ETH and ZEC, complete KYC, deposit ETH, trade to ZEC, withdraw to ZODL. ~30 min and ~3% in fees."
howItWorksSteps:
  - icon: Wallet
    title: User picks what they hold
    detail: "Your deposit UI shows a chain and token selector. The user picks what they already hold — BTC on Bitcoin, ETH on Ethereum, SOL on Solana, or any of 100+ assets across 31 chains. Your app configures the destination token it needs to receive. The user never has to think about your chain."
    color: "#627EEA"
    chainPill: Any asset, any chain
  - icon: Cpu
    title: NEAR Intents routes and converts
    detail: "Solvers compete to convert the user's source asset to your app's required token at the best available rate — whether that's USDC on Base, stETH on Ethereum, or your native token on any supported chain. Settlement is handled trustlessly on NEAR. You configure your own fee, charged on each deposit."
    color: "#fb4d01"
    chainPill: NEAR Intents solver network
  - icon: PenLine
    title: One signature — or just send to an address
    detail: "If the user has a connected wallet, they sign one transaction on their source chain. If not — or if they're withdrawing from a CEX — generate a static deposit address. The user sends BTC from Coinbase or SOL from Phantom with no chain-specific wallet setup, no bridging app, no extra steps."
    color: "#F7931A"
    chainPill: Two ways to fund
  - icon: CheckCircle
    title: Your app receives exactly what it needs (~30s)
    detail: "The configured token lands in your app on your chain — converted, settled, and delivered in one step. NEAR Intents can also perform additional actions on arrival, like depositing the asset directly into a smart contract. No bridge UI to explain, no failed transactions from gas estimation, no user drop-off at the deposit screen. The conversion is invisible to the user."
    color: "#9945FF"
    chainPill: Arrives on your chain
revenueModel:
  feeStructure: "Configurable fee per deposit — typically 20 to 100 basis points. Fees are fully customizable per route, so you can set lower fees for like-to-like deposits and higher fees for cross-asset or cross-chain deposits. You keep the fees you configure."
  revShare: ""
---

## What is Asset Onboarding?

Asset Onboarding lets users deposit into your app from any chain — they send what they have (ETH on Ethereum, BTC on Bitcoin, SOL on Solana, and 100+ more), and your app receives exactly the token it needs, automatically converted and delivered.

This is the universal "deposit from anywhere" button. Add it once; every crypto holder on 31 chains can become your user.


