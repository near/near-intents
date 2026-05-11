---
name: Solana
slug: solana
logo: https://coin-images.coingecko.com/coins/images/4128/small/solana.png
url: https://solana.com
description: "Solana joined the NEAR Intents network via Omnibridge, connecting its ecosystem to 30 other chains. ZEC, STRK, and NEAR tokens have been bridged to Solana — with more assets coming."
userType: blockchain
chains: []
status: live
integrationMethod: api
featured: true
sortOrder: 2
metrics: []
screenshots:
  - src: /screenshots/zcash-live-on-raydium.jpg
    caption: "Zcash is LIVE on Raydium — powered by Helius, NEAR, and Raydium"
    source: "Raydium"
tags: []
storyBeats: []
useCases:
  - useCase: bridging
    summary: "Using Omnibridge (with Helius Labs verifying contract addresses), NEAR Intents bridged ZEC, STRK, and NEAR tokens onto Solana — all firsts. Holders of these assets send from their native chain and receive wrapped tokens on Solana, ready to trade on any Solana DEX or DeFi protocol."
    flow:
      - "ZEC (Zcash)"
      - "NEAR Intents"
      - "SOL / USDC (Solana)"
    logoFlow:
      from:
        assets:
          - symbol: ZEC
            logo: "https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png"
            chain: Zcash
            chainLogo: "https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png"
          - symbol: STRK
            logo: "https://coin-images.coingecko.com/coins/images/26433/small/starknet.png"
            chain: Starknet
            chainLogo: "https://coin-images.coingecko.com/coins/images/26433/small/starknet.png"
          - symbol: NEAR
            logo: "https://coin-images.coingecko.com/coins/images/10365/small/near_icon.png"
            chain: NEAR
            chainLogo: "https://coin-images.coingecko.com/coins/images/10365/small/near_icon.png"
      to:
        assets:
          - symbol: ZEC
            logo: "https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png"
            chain: Solana
            chainLogo: "https://coin-images.coingecko.com/coins/images/4128/small/solana.png"
          - symbol: STRK
            logo: "https://coin-images.coingecko.com/coins/images/26433/small/starknet.png"
            chain: Solana
            chainLogo: "https://coin-images.coingecko.com/coins/images/4128/small/solana.png"
          - symbol: NEAR
            logo: "https://coin-images.coingecko.com/coins/images/10365/small/near_icon.png"
            chain: Solana
            chainLogo: "https://coin-images.coingecko.com/coins/images/4128/small/solana.png"
    screenshots:
      - /screenshots/zcash-live-on-raydium.jpg
    captions:
      - "Zcash is LIVE on Raydium — powered by Helius, NEAR, and Raydium"
  - useCase: chain-integration
    summary: "Solana joining the NEAR Intents network is the chain-level event that made this possible. Every app on Solana can now offer cross-chain access without building bridge infrastructure themselves."
    flow:
      - "31 chains"
      - "NEAR Intents"
      - "Solana"
    logoFlow:
      from:
        assets:
          - symbol: BTC
            logo: "https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png"
          - symbol: ZEC
            logo: "https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png"
          - symbol: ETH
            logo: "https://coin-images.coingecko.com/coins/images/279/small/ethereum.png"
        moreCount: 117
      to:
        assets:
          - symbol: SOL
            logo: "https://coin-images.coingecko.com/coins/images/4128/small/solana.png"
            chain: Solana
            chainLogo: "https://coin-images.coingecko.com/coins/images/4128/small/solana.png"
          - symbol: USDC
            logo: "https://coin-images.coingecko.com/coins/images/6319/small/usdc.png"
            chain: Solana
            chainLogo: "https://coin-images.coingecko.com/coins/images/4128/small/solana.png"
          - symbol: USDT
            logo: "https://coin-images.coingecko.com/coins/images/325/small/Tether.png"
            chain: Solana
            chainLogo: "https://coin-images.coingecko.com/coins/images/4128/small/solana.png"
        moreCount: 28
    screenshots:
      - /screenshots/solana-chain-integration.png
    captions:
      - "Solana connected to the NEAR Intents network — assets flow in from all supported chains"
  - useCase: asset-onboarding
    summary: "Through any Solana app using NEAR Intents, users on any chain can deposit assets onto Solana. A ZEC holder sends Zcash; it arrives on Solana as USDC or SOL ready to use. One transaction, one signature. No third-party bridge needed — NEAR Intents provides a deposit address and handles the exchange, seamlessly swapping into your Solana wallet."
    flow:
      - "31 chains"
      - "NEAR Intents"
      - "Solana"
    screenshots:
      - /screenshots/solana-asset-onboarding.png
    captions:
      - "Bitcoin flows through NEAR Intents and arrives as USDC/SOL on Solana — no bridge needed"
    logoFlow:
      from:
        assets:
          - symbol: BTC
            logo: "https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png"
          - symbol: ZEC
            logo: "https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png"
          - symbol: ETH
            logo: "https://coin-images.coingecko.com/coins/images/279/small/ethereum.png"
        moreCount: 117
      to:
        assets:
          - symbol: SOL
            logo: "https://coin-images.coingecko.com/coins/images/4128/small/solana.png"
            chain: Solana
            chainLogo: "https://coin-images.coingecko.com/coins/images/4128/small/solana.png"
          - symbol: USDC
            logo: "https://coin-images.coingecko.com/coins/images/6319/small/usdc.png"
            chain: Solana
            chainLogo: "https://coin-images.coingecko.com/coins/images/4128/small/solana.png"
          - symbol: USDT
            logo: "https://coin-images.coingecko.com/coins/images/325/small/Tether.png"
            chain: Solana
            chainLogo: "https://coin-images.coingecko.com/coins/images/4128/small/solana.png"
        moreCount: 28
---

## Why Solana?

Solana is one of the largest and fastest-growing blockchain ecosystems — home to major DEXs, lending protocols, NFT marketplaces, and a rapidly expanding DeFi stack. With sub-second finality and low fees, it's where a huge share of on-chain activity happens.

But Solana had a cross-chain problem. Assets from UTXO chains — Zcash, Bitcoin, Dogecoin, Litecoin — had no clean native path onto Solana. Bridges mostly covered EVM chains. For ZEC holders specifically, there was no direct path at all.

## The Problem

Before NEAR Intents, a ZEC holder who wanted to participate in Solana DeFi had no straightforward option. They would need to sell ZEC on a CEX, buy SOL or USDC, transfer to Solana, then deposit into a DeFi app. Four steps, multiple accounts, 20-40 minutes, and significant fees.

The problem was systemic. UTXO chain holders — representing tens of millions of crypto users across Bitcoin, Zcash, Dogecoin, and Litecoin — were effectively locked out of Solana unless they used a centralized exchange as an intermediary. No bridge handled UTXO chains natively.

## Two Changes, One Integration

The Solana integration with NEAR Intents operated at two levels.

**First, Solana was added to the NEAR Intents network via [Omnibridge](https://docs.near.org/chain-abstraction/omnibridge).** This is the chain-level event. Omnibridge handles the cross-chain token wrapping, with Helius Labs verifying contract addresses on Solana. Every app on Solana inherits cross-chain access automatically.

**Second, multiple assets were bridged onto Solana for the first time.** ZEC (Zcash), STRK (Starknet), and NEAR have all been wrapped onto Solana via Omnibridge — each a first. More assets are being added as the network expands.

## What Changed for Users

A ZEC holder selects Zcash as their source chain, specifies how much ZEC to bridge, and signs one transaction. NEAR Intents routes the asset through Omnibridge and its solver network — handling the UTXO chain complexity, the cross-chain routing, and the delivery to Solana. The user sees a preview, confirms, and waits roughly 30 seconds. The same flow works for STRK holders on Starknet, NEAR holders, BTC holders on Bitcoin, or users on any of the other 31 supported chains.

## What Changed for the Ecosystem

Solana joining NEAR Intents is a compounding event. Every Solana application that integrates NEAR Intents gets 31-chain access without building bridge infrastructure. The cost of cross-chain connectivity collapses to a single API integration.

For the Solana ecosystem, this means TVL growth can now come from holders on any of 31 chains — including Bitcoin, Zcash, Dogecoin, and Litecoin communities that were historically underserved by DeFi bridges. These communities now have a first-class path into Solana.
