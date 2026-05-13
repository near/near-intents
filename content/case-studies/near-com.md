---
name: near.com
slug: near-com
logo: https://coin-images.coingecko.com/coins/images/10365/small/near_icon.png
url: https://near.com
description: "The official NEAR Protocol website ships cross-chain swaps directly — letting anyone trade BTC, ETH, SOL, and 100+ assets from a single browser tab, powered by NEAR Intents."
userType: multi-chain-wallet
chains:
  - near
  - bitcoin
  - ethereum
  - solana
status: live
integrationMethod: api
featured: true
sortOrder: 3
coverImage: /screenshots/near-com-trade-btc-usdc.png
metrics: []
tags: []
storyBeats: []
useCases:
  - useCase: cross-chain-swaps
    summary: "Users swap between Bitcoin, ETH, SOL, and every other NEAR Intents-supported asset — right in the app. Every asset has liquidity sourced from the NEAR Intents solver network, and chains are completely abstracted away. Pick your source and destination, confirm, and the swap settles in ~30 seconds."
    flow:
      - "BTC / ETH / SOL (any chain)"
      - "NEAR Intents"
      - "USDC / NEAR / any asset"
    logoFlow:
      from:
        assets:
          - symbol: BTC
            logo: "https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png"
          - symbol: ETH
            logo: "https://coin-images.coingecko.com/coins/images/279/small/ethereum.png"
          - symbol: SOL
            logo: "https://coin-images.coingecko.com/coins/images/4128/small/solana.png"
        moreCount: 148
      to:
        assets:
          - symbol: USDC
            logo: "https://coin-images.coingecko.com/coins/images/6319/small/usdc.png"
          - symbol: NEAR
            logo: "https://coin-images.coingecko.com/coins/images/10365/small/near_icon.png"
          - symbol: USDT
            logo: "https://coin-images.coingecko.com/coins/images/325/small/Tether.png"
        moreCount: 148
    screenshots:
      - /screenshots/near-swap-btc-usdc.png
    captions:
      - "Trading 1.2 BTC for 81,601 USDC on near.com"
  - useCase: chain-abstraction
    summary: "near.com is a unified interface for multi-chain assets. Log in with whatever wallet you're most comfortable with — passkey, any EVM wallet, or anything else supported — and that's the only key you ever need. Deposit from any supported chain to fund your account. Withdraw to any supported chain when you need to move assets out. While using near.com, you never think about what chain you're on — Bitcoin, Ethereum, Solana, Zcash, it's all accessible from one place. No juggling multiple wallets, no managing separate seed phrases, no switching between chain-specific apps. The complexity of 31 chains collapses into a single, seamless experience."
    screenshots:
      - /screenshots/chain-abstraction-diagram.png
    captions:
      - "One key controls assets on Bitcoin, Solana, Zcash, and more — powered by NEAR Chain Signatures"
    flow:
      - "NEAR account"
      - "NEAR Intents"
      - "Assets on 31 chains"
    logoFlow:
      from:
        assets:
          - symbol: NEAR
            logo: "https://coin-images.coingecko.com/coins/images/10365/small/near_icon.png"
      to:
        assets:
          - symbol: BTC
            logo: "https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png"
          - symbol: ETH
            logo: "https://coin-images.coingecko.com/coins/images/279/small/ethereum.png"
          - symbol: SOL
            logo: "https://coin-images.coingecko.com/coins/images/4128/small/solana.png"
        moreCount: 28
  - useCase: asset-onboarding
    summary: "Depositing onto near.com works like a centralized exchange — but fully non-custodial. Get a deposit address for any supported asset, send your coins from anywhere (wallet, exchange, cold storage), and your near.com account is funded. Withdrawals work the same way — withdraw any asset to any supported chain. Access all your funds through your connected wallet. No bridging, no chain switching — just deposit, trade, and withdraw."
    screenshots:
      - /screenshots/near-dot-com-deposit.png
    captions:
      - "Depositing USDC from Solana into your near.com account — scan the QR code or copy the address"
    flow:
      - "BTC / ETH / SOL (external chains)"
      - "NEAR Intents"
      - "BTC / ETH / SOL on NEAR"
    logoFlow:
      from:
        assets:
          - symbol: BTC
            logo: "https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png"
          - symbol: ETH
            logo: "https://coin-images.coingecko.com/coins/images/279/small/ethereum.png"
          - symbol: SOL
            logo: "https://coin-images.coingecko.com/coins/images/4128/small/solana.png"
        moreCount: 148
      to:
        assets:
          - symbol: BTC
            logo: "https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png"
            chain: NEAR
            chainLogo: "https://coin-images.coingecko.com/coins/images/10365/small/near_icon.png"
          - symbol: ETH
            logo: "https://coin-images.coingecko.com/coins/images/279/small/ethereum.png"
            chain: NEAR
            chainLogo: "https://coin-images.coingecko.com/coins/images/10365/small/near_icon.png"
          - symbol: SOL
            logo: "https://coin-images.coingecko.com/coins/images/4128/small/solana.png"
            chain: NEAR
            chainLogo: "https://coin-images.coingecko.com/coins/images/10365/small/near_icon.png"
      fromLabel: "Native chains"
      toLabel: "Omnichain tokens on NEAR"
  - useCase: cross-chain-earn
    summary: "Native BTC on Bitcoin → cbBTC in Moonwell on Base, earning 1.2% APY. NEAR Intents handles conversion, cross-chain routing, and protocol deposit in a single transaction."
    screenshots:
      - /screenshots/near-dot-com-earn.png
    captions:
      - "Bitcoin → cbBTC in Moonwell on Base — 1.2% APY"
    flow:
      - "BTC on Bitcoin"
      - "NEAR Intents"
      - "cbBTC in Moonwell (1.2% APY)"
    logoFlow:
      from:
        assets:
          - symbol: BTC
            logo: "https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png"
            chain: Bitcoin
      to:
        assets:
          - symbol: cbBTC
            logo: "https://coin-images.coingecko.com/coins/images/40143/small/cbbtc.webp"
            chain: Base
            chainLogo: "/logos/chains/base.svg"
      fromLabel: "Native Bitcoin"
      toLabel: "+ 0.3% APY via Moonwell"
---

## Why near.com?

near.com is the official home of the NEAR Protocol — the first place developers, users, and newcomers land when they encounter NEAR. It's not just a marketing site. It's the primary interface for the NEAR ecosystem: wallet, explorer, and now, swap.

The decision to ship a cross-chain swap feature directly into near.com — using NEAR Intents — is both a product choice and a statement of confidence. The NEAR team built the swap experience they wanted every partner to be able to offer.

## The Problem

Until recently, near.com had no built-in way to move or trade assets. A user holding Bitcoin who wanted NEAR had to leave the site, find a bridge or DEX that supported NEAR, navigate an unfamiliar interface, and come back. Each step in that journey is a user who doesn't return.

For the NEAR ecosystem, the homepage was a dead end for users who arrived with assets on other chains. There was no native path from "I have ETH" to "I'm in the NEAR ecosystem."

## The Integration

NEAR Intents powers the swap feature at near.com directly. Users select their source asset — BTC, ETH, SOL, or any of 100+ supported tokens — choose a destination, and get an immediate quote. The interface shows exactly what they'll receive before they confirm.

The screenshot shows a live example: 1.2 BTC quoted at 81,601 USDC. No bridge UI, no wrapped token selection, no manual chain configuration. The user sees input and output. They confirm once. NEAR Intents routes the trade through its solver network and settles in roughly 30 seconds.

The integration covers 31 chains and 100+ assets — the full NEAR Intents network — available from the NEAR Protocol's own front door.

## What This Means for Partners

near.com is a reference implementation. When NEAR introduces NEAR Intents to a prospective partner, the pitch is simple: the same swap experience live at near.com is what you can ship.

The near.com integration demonstrates that NEAR Intents is production-ready at the highest-stakes integration point in the ecosystem. If the official NEAR website trusts NEAR Intents to power its swap feature, that signal carries weight in every partner conversation that follows.

## Chain Abstraction

near.com is a unified interface for multi-chain assets. Users log in with one wallet — a passkey wallet, any EVM wallet (MetaMask, Rabby, etc.), or a NEAR native wallet — and that's the only key they ever need. From there, they can deposit from any supported chain to fund their account, and withdraw to any supported chain when they need to move assets out.

While using near.com, the user never has to think about what chain they're on. Bitcoin, Ethereum, Solana, Zcash — it's all accessible from one place with one login. No juggling multiple wallets, no managing separate seed phrases, no switching between chain-specific apps. The complexity of 31 chains collapses into a single, seamless experience.

## Cross-Chain Earn

near.com lets users put their assets to work across chains without leaving the interface. A BTC holder can deposit Bitcoin and earn yield on Base lending markets. An ETH holder can stake for stETH yield. NEAR Intents handles the conversion, deposits into the yield protocol, and when the user is ready to withdraw, converts back to their original asset. Earn from anywhere, withdraw to anywhere.

## Asset Onboarding

Depositing onto near.com functions like a centralized exchange — but it's fully non-custodial. Users get a deposit address for any supported asset, send their coins from anywhere (a wallet, an exchange, cold storage), and their near.com account is funded. All funds are accessible through their connected wallet. No bridging steps, no chain switching. Just deposit and go.
