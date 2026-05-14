---
name: ZODL
slug: zodl
logo: /logos/zodl.png
url: https://zodl.com
description: "Privacy-first Zcash wallet that uses NEAR Intents to give users cross-chain access to 31 chains and 100+ assets — without leaving the app."
userType: single-chain-wallet
chains:
  - zcash
status: live
integrationMethod: api
featured: true
sortOrder: 1
coverImage: /screenshots/zodl-swap-zec-usdc.png
metrics:
  - label: "Fees Generated"
    value: "$3M+"
    period: "via NEAR Intents"
  - label: "Chains Connected"
    value: "31"
  - label: "Assets Available"
    value: "100+"
  - label: "Integration Time"
    value: "2 weeks"
    period: "kickoff to production"
tags: []
transformation:
  before:
    headline: "Single-chain Zcash wallet"
    body: "New users needed a CEX account, multiple steps, and 30+ minutes just to get ZEC into ZODL"
  after:
    headline: "Entry point for the Zcash ecosystem"
    body: "Anyone in crypto can deposit directly — 100+ assets, 31 chains, one tap. ZODL earns on every transaction."
storyBeats:
  - icon: lock
    label: "The wall"
    body: "The only way into Zcash was through a centralized exchange — account creation, trading, withdrawal, 30+ minutes."
  - icon: zap
    label: "The rails"
    body: "ZODL integrated NEAR Intents via API in 2 weeks — 31 chains and 100+ assets, no infrastructure changes."
  - icon: trending-up
    label: "The result"
    body: "$3M+ in fees generated. Anyone in crypto can now join the Zcash ecosystem in one tap."
useCases:
  - useCase: cross-chain-swaps
    summary: "ZODL users swap ZEC for BTC, ETH, USDC and 100+ other assets across 31 chains — all within the ZODL wallet. One tap, one signature, ~30 seconds."
    flow:
      - "ZEC (Zcash)"
      - "NEAR"
      - "BTC/ETH/USDC (any chain)"
    logoFlow:
      from:
        assets:
          - symbol: ZEC
            logo: "https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png"
      to:
        assets:
          - symbol: BTC
            logo: "https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png"
          - symbol: ETH
            logo: "https://coin-images.coingecko.com/coins/images/279/small/ethereum.png"
          - symbol: USDC
            logo: "https://coin-images.coingecko.com/coins/images/6319/small/usdc.png"
        moreCount: 148
    screenshots:
      - /screenshots/zodl-swap-input.jpg
      - /screenshots/zodl-swap-confirm.jpg
    captions:
      - "Getting a quote to swap Zcash from ZODL to USDC in an external wallet"
      - "Review & confirm the cross-chain swap"
  - useCase: cross-pay
    summary: "A ZODL user can pay anyone in any token on any chain. A merchant wants USDC on Base? The user pays with ZEC. NEAR Intents handles the conversion and cross-chain delivery automatically."
    flow:
      - "ZEC (Zcash)"
      - "NEAR"
      - "USDC (Base)"
    logoFlow:
      from:
        assets:
          - symbol: ZEC
            logo: "https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png"
      to:
        assets:
          - symbol: USDC
            logo: "https://coin-images.coingecko.com/coins/images/6319/small/usdc.png"
          - symbol: USDT
            logo: "https://coin-images.coingecko.com/coins/images/325/small/Tether.png"
        moreCount: 39
    screenshots:
      - /screenshots/zodl-crosspay.jpg
      - /screenshots/zodl-crosspay-confirm.jpg
    captions:
      - "Paying 5 USDT to an Ethereum address using ZEC from ZODL — one tap, no bridging"
      - "Reviewing the cross-pay details — 0.0212 ZEC covers 5 USDT plus fees"
  - useCase: asset-onboarding
    summary: "Anyone with crypto on any chain can deposit into ZODL. Send ETH from Ethereum or SOL from Solana — it arrives as ZEC in the user's ZODL wallet."
    flow:
      - "BTC (Bitcoin)"
      - "NEAR"
      - "ZEC (Zcash)"
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
          - symbol: ZEC
            logo: "https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png"
    screenshots:
      - /screenshots/zodl-onboard-input.jpg
      - /screenshots/zodl-bitcoin-onboarding.jpg
    captions:
      - "Depositing 1 BTC from Bitcoin into ZODL — arrives as ZEC with no extra steps"
      - "Send Bitcoin and receive ZEC in your ZODL wallet"
---

## Why ZODL?

ZODL is the official Zcash wallet. It runs entirely on Zcash infrastructure — no other chains, no other assets. That's the point. Zcash is a privacy-first cryptocurrency, and ZODL is purpose-built to make it accessible on mobile, without compromise.

That single-chain focus is a feature, not a limitation. But it created a real growth problem: how do you get anyone into the Zcash ecosystem when the wallet only speaks Zcash?

## The Problem

Before NEAR Intents, the only practical way to get into ZODL was through a centralized exchange. A new user with Bitcoin, Ethereum, or a stablecoin had to: create an exchange account, complete onboarding, deposit their funds, trade for ZEC, withdraw to their wallet address, and wait. The process was slow, required accounts they may not have had, and put a significant barrier between someone wanting to try Zcash and actually using it.

Existing ZODL users faced similar friction when interacting with the rest of crypto. Paying someone who wanted USDC, or swapping ZEC for ETH, meant leaving the wallet entirely and navigating infrastructure ZODL had no control over.

The result was a Zcash ecosystem that was harder to enter, and harder to participate in, than it needed to be.

## The Solution: NEAR Intents as Ecosystem Rails

ZODL integrated NEAR Intents via the API in 2 weeks. The integration didn't change what ZODL is — it's still a Zcash wallet, built on Zcash infrastructure. What changed is that NEAR Intents became the bridge between ZODL and the rest of crypto.

**Asset Onboarding — the on-ramp the Zcash ecosystem needed.** Anyone holding Bitcoin, Ethereum, Solana, or any of 100+ assets on 31 chains can now deposit directly into ZODL. They send from wherever they are in crypto. It arrives as ZEC in their wallet. No account creation, no exchange, no multi-step process. Download the wallet, deposit, use the chain. NEAR Intents created the rails for the Zcash ecosystem to grow.

**Cross-Chain Swaps — Zcash users, meet the rest of crypto.** Once inside ZODL, users aren't locked to ZEC. They can swap to BTC, ETH, USDC, or any of 100+ assets across 31 chains — one tap, one signature, roughly 30 seconds. Users who came for Zcash's privacy can still participate in the broader DeFi ecosystem without leaving the app.

**Cross-Pay — pay anyone, from anywhere.** ZODL users can pay merchants, friends, or services who want any token on any chain. A merchant requesting USDC on Base gets USDC on Base — the user pays from their ZEC balance and NEAR Intents handles the conversion and delivery. One transaction, no bridging, no extra steps.

## The Result

NEAR Intents turned ZODL from a single-chain wallet into a full entry point for the Zcash ecosystem. The wallet is still Zcash-only at its core — but now anyone in crypto can join it from wherever they are.

The ecosystem impact is measurable. ZODL has generated over $3M+ in fees through NEAR Intents, across transactions where new users are onboarding assets, existing users are swapping and paying, and value is moving between Zcash and the rest of the crypto economy. Every one of those transactions is a person using Zcash who might not have been able to before.

ZODL earns on every transaction through the NEAR Intents revenue share model, and the entire integration — from kickoff to production — took two weeks.
