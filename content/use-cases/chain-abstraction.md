---
name: Chain Abstraction
slug: chain-abstraction
icon: shield-check
tagline: "One key. Every chain. Control assets across 31 blockchains from a single wallet."
coverImage: /screenshots/chain-abstraction-diagram.png
screenshots:
  - src: /screenshots/chain-abstraction-diagram.png
    caption: "One Ethereum signature controls assets on Bitcoin, Solana, Zcash, and more — powered by NEAR Chain Signatures"
    source: "NEAR Intents"
relevantUserTypes:
  - single-chain-wallet
  - multi-chain-wallet
  - ai-agent
demoComponent: ChainAbstractionDemo
sortOrder: 5
revenueHooks:
  default: "Your wallet becomes a multi-chain command center — users own and control assets everywhere without switching apps"
  single-chain-wallet: "Turn your single-chain wallet into a multi-chain experience — users control assets on 31 chains with one key"
  multi-chain-wallet: "One signature controls assets across every chain — collapse key management into a single UX. Support new chains easily with NEAR Intents."
  ai-agent: "Your agents control assets on any chain from a single account — no per-chain wallet setup"
howItWorksSteps:
  - title: "User connects their existing wallet"
    detail: "No new account required. The user connects their current wallet — Ethereum, Solana, Bitcoin, Zcash, or any supported chain. This becomes their master signing key."
    icon: Wallet
    color: "#627EEA"
    chainPill: Any chain wallet
  - title: "MPC network derives chain addresses"
    detail: "NEAR's MPC network uses the user's key and a deterministic derivation path to generate unique addresses on every target chain. No new key material — the derivation is mathematical and reproducible."
    icon: Cpu
    color: "#fb4d01"
    chainPill: MPC network
  - title: "User signs one transaction"
    detail: "To control assets on another chain, the user signs a single intent from their home wallet. The MPC nodes collectively produce a signature for the destination chain — no single node can sign alone. Only the user can request signatures for their derived addresses."
    icon: PenLine
    color: "#F7931A"
    chainPill: One signature
  - title: "Assets live natively on destination"
    detail: "No wrapping, no bridges, no synthetic tokens. Native BTC on Bitcoin. Native SOL on Solana. Native USDC on Base — all controlled by the user's original key."
    icon: ShieldCheck
    color: "#9945FF"
    chainPill: Native assets
userStories:
  - persona: "A user with an ETH wallet"
    userType: single-chain-wallet
    context: "Wants to hold BTC and SOL without managing separate wallets"
    app: "An Ethereum wallet with chain abstraction"
    partnerSlug: null
    steps:
      - "Opens their ETH wallet — sees a 'Multi-Chain Assets' section"
      - "NEAR's MPC network derives a Bitcoin address and a Solana address from their ETH key"
      - "User sends BTC and SOL to their derived addresses"
      - "Assets sit natively on Bitcoin and Solana, controlled by the ETH signature"
      - "User sends, swaps, or withdraws — all signed from their existing Ethereum wallet"
    without: "Install a Bitcoin wallet, install a Solana wallet, manage two additional seed phrases, manually coordinate across three apps. Three keys, three UX surfaces, three failure points."
  - persona: "Bob, a Zcash user"
    userType: single-chain-wallet
    context: "Uses ZODL (Zcash wallet) and wants to hold USDC on Base without leaving ZODL"
    app: ZODL
    partnerSlug: zodl
    steps:
      - "Opens ZODL → navigates to cross-chain holdings"
      - "NEAR's MPC network derives a Base address from his Zcash key"
      - "Bob receives USDC on Base at his derived address"
      - "USDC sits natively on Base, fully controlled by his ZODL wallet"
      - "Bob can move it, spend it, or swap it — all from ZODL, all with one signature"
    without: "Install MetaMask or Coinbase Wallet, create a new account, bridge assets manually, manage two separate key sets. Defeats the purpose of a focused single-chain wallet."
  - persona: "A wallet engineering team"
    userType: multi-chain-wallet
    context: "Wants to support 31 chains without implementing 31 separate key derivation systems"
    app: "A multi-chain wallet"
    partnerSlug: null
    steps:
      - "Integrates NEAR Intents Chain Signatures SDK — one integration"
      - "Users' existing master key automatically derives addresses on all 31 supported chains"
      - "Users see a unified portfolio: Bitcoin, Ethereum, Solana, Cosmos, and more in one view"
      - "All transactions signed with one key — no chain-switching UX or re-authentication"
    without: "Implement ECDSA derivation for EVM chains, separate Ed25519 handling for Solana/Cosmos, Schnorr for Zcash, Taproot for Bitcoin — different curves, different standards, months of engineering per chain. Then maintain them all separately."
  - persona: "A DeFi protocol"
    userType: defi-protocol
    context: "Wants users to bring Bitcoin and Zcash liquidity into an EVM protocol without bridging UX"
    app: "A DeFi protocol on Base or Arbitrum"
    partnerSlug: null
    steps:
      - "Protocol integrates NEAR Intents chain abstraction"
      - "Users connect their BTC or ZEC wallet — MPC derives a controlled address"
      - "User signals intent to deposit; MPC executes the move on Bitcoin/Zcash natively"
      - "Assets appear in protocol — no wrapped tokens, no bridge transaction for users"
    without: "Users manually bridge BTC → wBTC, losing native properties and adding trust assumptions. Requires users to understand bridge mechanics and manage bridge approvals."
revenueModel:
  feeStructure: ""
  revShare: ""
---

## What is Chain Abstraction?

Chain Abstraction lets your users operate seamlessly across every chain from a single wallet. Through [NEAR's Chain Signatures](https://docs.near.org/chain-abstraction/chain-signatures) (built on multi-party computation), a key on one chain derives unique, native addresses on every other chain — and signs transactions on those chains — without ever generating a new private key. Only the user can request signatures for their derived accounts; no third party, including NEAR, can sign on their behalf.

Your ETH key controls a native Bitcoin address. Your Zcash key controls a Base address. One signature, assets everywhere — and the assets are truly native, not wrapped or synthetic.

## How Chain Signatures Work

NEAR's Chain Signatures layer consists of three interconnected components:

**Deterministic address derivation.** A user's NEAR-controlled identity (which can be derived from any chain's wallet via chain abstraction) combines with a derivation path (e.g., `bitcoin-1`, `solana-2`) to produce a unique, reproducible address on any target chain. No randomness — given the same key and path, you always get the same address.

**The `v1.signer` smart contract.** This NEAR contract accepts signature requests: a payload to sign, a derivation path, and a signing curve (Secp256k1 for EVM/Bitcoin, Ed25519 for Solana/Cosmos). It holds execution until the MPC service responds.

**MPC signing service.** Independent nodes collectively produce a signature. No single node can sign alone — they generate partial signature shares aggregated through multiple rounds to jointly sign a transaction. Only the user can request signatures for their own derived accounts. The network is live on NEAR mainnet today.

## Why This Matters for Builders

Today, supporting multiple chains means multiple signing schemes, multiple key derivation standards, and months of per-chain engineering. Chain Abstraction collapses this:

- **One integration → 31 chains.** Integrate NEAR Intents once and your wallet supports all supported chains, including Bitcoin, Solana, Cosmos, Zcash, XRP, EVM chains, and more.
- **Truly native assets.** Assets live on the destination chain — not bridged, not wrapped, not synthetic. Native BTC on Bitcoin. Native USDC on Base.
- **No new UX surface.** Users never manage a second seed phrase or install a second wallet. Their existing key is the master.
- **MPC security model.** Signatures are produced jointly by independent nodes — no single point of failure, no single node can sign on its own.

## Supported Chains & Curves

Chain Signatures supports **Secp256k1** (EVM chains, Bitcoin, XRP, Zcash) and **Ed25519** (Solana, Cosmos, Aptos, Sui). This covers the vast majority of blockchain ecosystems. If NEAR Intents supports a chain for swaps, Chain Signatures can derive and control addresses on it.

## For Wallets and Institutions

Supporting multiple chains today typically requires separate key material per chain — each with its own signing scheme, backup strategy, and operational surface area. Chain Signatures offers a different model: one master key, one signing ceremony, addresses on every chain. Audit one key, not thirty-one.

## The Foundation for Everything Else

Chain Signatures is the underlying primitive that powers cross-chain swaps, payments, and bridging in NEAR Intents. Before you can move assets cross-chain, you need to control cross-chain addresses. Build on this layer and every other NEAR Intents capability becomes available to your users.
