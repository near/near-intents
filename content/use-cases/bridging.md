---
name: Bridging
slug: bridging
icon: waypoints
tagline: "Bridge any supported asset to any supported chain — bring exotic assets onto your chain. As new chains are added to NEAR Intents, any asset can be bridged to them automatically — no per-route setup needed."
coverImage: /screenshots/zcash-live-on-raydium.jpg
screenshots:
  - src: /screenshots/zcash-live-on-raydium.jpg
    caption: "Zcash is live on Raydium — bridged via NEAR Intents"
    source: "Helius / NEAR / Raydium"
  - src: /screenshots/btc-withdraw-to-near.png
    caption: "Wrapped Bitcoin on NEAR — bridged by NEAR Intents onto the NEAR L1 blockchain"
    source: "NEAR Intents"
relevantUserTypes:
  - blockchain
  - dex
  - aggregator
  - liquid-staking
demoComponent: BridgingDemo
sortOrder: 2
revenueHooks:
  default: "Every asset bridged to your chain or app is a user you would have lost to fragmented bridge UX"
  blockchain: "Bring UTXO assets and hundreds of other assets to your ecosystem — grow TVL without fragmenting the bridging experience"
  dex: "Users from 31 chains can deposit directly into your pools — wider user base, more volume"
  aggregator: "Use NEAR Intents to seamlessly move your users cross-chain so they can access the routes they want"
  liquid-staking: "Issue your LST on any supported chain"
featuredPartners:
  - name: Starknet
    logo: /logos/starknet.png
    url: "https://starknet.io"
    description: "STRK bridged out to other chains via NEAR Intents — bringing Starknet's native token to new ecosystems."
userStories:
  - persona: "A ZEC holder on Zcash"
    userType: dex
    context: "Holds ZEC on Zcash, wants to trade on Raydium (Solana) for the first time"
    app: Raydium
    partnerSlug: solana
    steps:
      - "Opens Raydium on Solana → selects 'Bridge from another chain'"
      - "Chooses ZEC (Zcash) as source asset"
      - "NEAR Intents previews the route: ZEC → SOL on Solana"
      - "User signs one transaction on Zcash"
      - "Assets arrive on Solana in ~30 seconds, ready for DeFi"
    without: "Sell ZEC on a CEX, buy SOL, transfer to Solana wallet, then deposit into Raydium. 4 steps, 20-40 minutes, multiple accounts required."
  - persona: "Solana ecosystem growth lead"
    userType: blockchain
    context: "Wants to grow Solana TVL by removing barriers for UTXO chain holders"
    app: Solana ecosystem
    partnerSlug: solana
    steps:
      - "Solana integrates with NEAR Intents as a supported chain"
      - "Raydium (and other Solana apps) can now offer cross-chain bridging via API"
      - "BTC, ZEC, DOGE, and LTC holders gain a direct path to Solana"
      - "TVL grows from new user segments that had no bridge before"
    without: "Each Solana app builds individual bridge integrations. UTXO chains never get coverage. Users from Bitcoin and Zcash ecosystems remain locked out."
  - persona: "An ETH holder on Ethereum"
    userType: aggregator
    context: "Wants to move ETH to a new L2 to earn yield, but doesn't want to manage the official bridge"
    app: "A cross-chain aggregator"
    partnerSlug: null
    steps:
      - "Opens aggregator → selects 'Bridge to [L2]'"
      - "Picks ETH (Ethereum) → ETH (destination chain)"
      - "NEAR Intents handles routing and delivery"
      - "One signature on Ethereum, ETH arrives on L2"
    without: "Find the official L2 bridge, understand the wait time, track the transaction, then deposit separately. 15-30 min, multiple steps."
  - persona: "A lending protocol on Base"
    userType: lending
    context: "Wants to accept BTC as collateral but users hold native BTC, not WBTC"
    app: "Lending protocol on Base"
    partnerSlug: null
    steps:
      - "Protocol adds 'Bridge & Deposit' powered by NEAR Intents"
      - "BTC holder selects BTC (Bitcoin) as collateral source"
      - "NEAR Intents bridges native BTC → cbBTC on Base"
      - "cbBTC is credited as collateral in one transaction"
    without: "User sends BTC to a CEX, converts to cbBTC, bridges to Base, then deposits. 4 manual steps, 15-30 minutes."
howItWorksSteps:
  - icon: Waypoints
    title: Select source & destination
    detail: "Choose the asset you want to bridge and the destination chain. ZEC to Solana, BTC to TON, XRP to Arbitrum, DOGE to Base — any supported asset to any supported chain."
    color: "#F4B728"
    chainPill: Any asset → any chain
  - icon: Send
    title: Send your funds
    detail: "Send the native asset from your wallet. For UTXO chains like Zcash, Bitcoin, and Dogecoin, a deposit address is generated — send from any wallet or exchange. One transaction, one signature."
    color: "#9945FF"
    chainPill: Source chain
  - icon: Shield
    title: Omni Bridge receives your asset
    detail: "NEAR Intents is powered by Omni Bridge, our in-house cross-chain infrastructure. Omni Bridge custodies the native asset and issues an omni-bridged wrapped version on the destination chain — the same primitive that backs the omni liquidity layer. Wrapping, issuance, and routing all happen in a single flow with no third-party bridge in the loop."
    color: "#fb4d01"
    chainPill: Omni Bridge — in-house
  - icon: Zap
    title: Wrapped asset is issued on a new chain
    detail: "The wrapped asset lands on the destination chain ready to use. Because bridged assets are part of the NEAR Intents cross-chain network, every NEAR Intents user instantly has access to liquidity for the wrapped asset across all 31 chains."
    color: "#28A0F0"
    chainPill: Destination chain + cross-chain liquidity
revenueModel:
  feeStructure: ""
  revShare: ""
---

## Bridging

NEAR Intents can bridge any supported asset to any supported chain — ZEC to Solana, BTC to NEAR, DOGE to Base, STRK to Arbitrum, any combination. When new chains are added to the network, your asset can be bridged there too — automatically. No swap fees, no slippage — bridging is one-to-one. UTXO chains like Bitcoin, Zcash, and Dogecoin are supported natively.

We make bridging your asset to other chains extremely simple and convenient — and give it access to all the liquidity of the NEAR Intents protocol.

## Powered by Omni Bridge

NEAR Intents is built on top of **Omni Bridge**, our in-house cross-chain infrastructure. Omni Bridge does two jobs for the protocol:

- **Powers the omni liquidity layer** — every NEAR Intents swap and bridge clears through Omni Bridge custody, which is what lets a single pool of liquidity serve all 31 supported chains.
- **Issues omni-bridged assets on new chains** — when a new chain joins NEAR Intents, Omni Bridge mints the wrapped representation of any supported asset on that chain. No external bridge integration, no per-route negotiation — bringing your asset to a new chain is a configuration change, not a new project.

Because Omni Bridge is built and operated by the NEAR Intents team, we control the issuance, custody, and security model end-to-end — and roadmap features land in the bridging flow without waiting on a third party.
