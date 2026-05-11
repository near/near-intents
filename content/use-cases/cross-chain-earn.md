---
name: Cross-Chain Earn
slug: cross-chain-earn
icon: trending-up
comingSoon: true
tagline: "Earn yield on any asset, on any chain — one step in, one step out"
coverImage: /images/cross-chain-yield.png
screenshots:
  - src: /screenshots/near-dot-com-earn.png
    caption: "Earning yield on USDC, ETH, BTC, and NEAR — 8.2% average APR on near.com"
    source: "near.com"
relevantUserTypes:
  - lending
  - yield-vault
  - liquid-staking
  - perps
  - dex
  - single-chain-wallet
  - multi-chain-wallet
  - custodian
demoComponent: EarnDemo
sortOrder: 3
revenueHooks:
  default: "Every cross-chain deposit into a yield position = a transaction fee you weren't capturing before"
  lending: "BTC holders, ETH holders, SOL holders — any asset, any chain can supply to your lending market. Stop leaving collateral on the table."
  yield-vault: "Any user on any chain can deposit into your vault in one step. No bridging friction means more deposits, higher TVL, more fees."
  liquid-staking: "Accept staking deposits from any chain — a Bitcoin holder stakes ETH or SOL with a single transaction, with native asset return on withdrawal."
  perps: "Let traders earn on idle collateral from any chain without leaving your app — new retention lever, new fee surface."
  dex: "Integrate cross-chain earn flows for your LP depositors — they supply liquidity from any chain without multiple transactions."
  single-chain-wallet: "Your users can earn yield without leaving your wallet — no bridge, no separate DeFi app, no CEX required."
  multi-chain-wallet: "Give users a single earn surface across all chains they hold assets on — and earn a fee on every deposit and withdrawal."
  custodian: "Offer clients yield opportunities across chains from a single custody interface — earn fees on every deposit and withdrawal"
userStories:
  - persona: "A Bitcoin holder"
    userType: lending
    context: "Wants to earn yield on BTC without selling, but has no Base wallet and has never used an EVM chain"
    app: "A lending protocol on Base (e.g., Moonwell or Aave)"
    partnerSlug: null
    steps:
      - "Opens lending app → clicks 'Supply BTC'"
      - "Selects 'Native BTC on Bitcoin' from the asset selector"
      - "App previews: 1 BTC → supplied as cbBTC on Base, earning 4.2% APY"
      - "Sends BTC to a generated deposit address — no Base wallet needed"
      - "cbBTC appears as a supplied position in ~30 seconds, yield accruing immediately"
      - "To exit: clicks 'Withdraw' → receives native BTC back to their Bitcoin address"
    without: "Set up a Base wallet, buy ETH for gas, bridge BTC via a wrapping service to cbBTC, deposit into Aave. 5+ steps, 20-40 min, multiple failure points."
  - persona: "An ETH holder"
    userType: liquid-staking
    context: "Wants to earn Lido staking yield on Ethereum but holds ETH on Arbitrum"
    app: "Lido or any liquid staking protocol on Ethereum"
    partnerSlug: null
    steps:
      - "Opens staking app → clicks 'Stake from any chain'"
      - "Selects 'ETH on Arbitrum' as source"
      - "NEAR Intents previews: 1 ETH (Arbitrum) → stETH on Ethereum, 3.1% APY"
      - "Signs one Arbitrum transaction"
      - "stETH arrives on Ethereum in ~30 seconds, earning staking yield"
      - "When done: withdraws stETH → receives ETH back on Arbitrum"
    without: "Bridge ETH from Arbitrum to Ethereum via the Arbitrum bridge, wait 15-30 minutes for finality, stake on Lido. Multiple transactions, multiple apps."
  - persona: "A SOL holder"
    userType: yield-vault
    context: "Wants to earn lending yield in USDC but doesn't want to sell SOL exposure"
    app: "A yield vault or Aave on Arbitrum"
    partnerSlug: null
    steps:
      - "Opens yield vault → clicks 'Deposit'"
      - "Selects 'SOL on Solana' as source asset"
      - "NEAR Intents previews: 10 SOL → USDC deposited on Arbitrum, 5.8% APY"
      - "Signs one Solana transaction"
      - "USDC position is live and earning — SOL was converted automatically"
    without: "Swap SOL to USDC on Solana, bridge USDC to Arbitrum via a cross-chain bridge, deposit into the vault. Three steps, three apps."
  - persona: "A wallet product team"
    userType: multi-chain-wallet
    context: "Wants to add an Earn tab to their wallet without building DeFi integrations from scratch"
    app: "Your multi-chain wallet"
    partnerSlug: null
    steps:
      - "Integrate NEAR Intents cross-chain earn API or widget"
      - "Add 'Earn' tab — shows APY opportunities across lending, staking, and vaults"
      - "User selects any asset they hold → sees yield options across chains"
      - "Deposit and withdrawal routed by NEAR Intents in one step"
      - "Wallet earns configurable fee on every earn deposit and withdrawal"
    without: "Build individual integrations with Aave, Lido, Compound, and others on each chain. Months of integration work, constant maintenance overhead."
howItWorksSteps:
  - icon: Wallet
    title: User picks their asset and a yield opportunity
    detail: "Your UI shows the user's held assets — BTC, ETH, SOL, ZEC, and 100+ more — alongside yield opportunities you've configured (lending markets, staking protocols, yield vaults). The user picks their source asset on their chain and the earn position they want. They don't need a wallet on the destination chain."
    color: "#0d9488"
    chainPill: Any asset → any yield protocol
  - icon: Cpu
    title: NEAR Intents converts and routes in one step
    detail: "Solvers compete to convert the user's source asset and deposit it into the target yield protocol at the best available rate. NEAR Intents handles the cross-chain routing, asset conversion, and protocol deposit atomically — no intermediate steps the user needs to manage. You configure your fee, charged on the deposit."
    color: "#fb4d01"
    chainPill: NEAR Intents solver network
  - icon: PenLine
    title: User signs once — or sends to a deposit address
    detail: "If the user has a connected wallet, they sign one transaction on their source chain. If not, generate a static deposit address. The user sends native BTC, SOL, or ETH from any wallet. No chain-specific wallet required on the destination."
    color: "#F7931A"
    chainPill: One signature or one send
  - icon: TrendingUp
    title: Yield accrues — withdraw back to original asset anytime
    detail: "The position opens on the destination protocol and yield begins accruing immediately. When the user withdraws, NEAR Intents routes the yield position back through the solver network — they receive their original asset on their original chain, plus yield, in one step. No manual unwinding."
    color: "#9945FF"
    chainPill: Earn now, exit to original chain
revenueModel:
  feeStructure: "Configurable fee on deposit and withdrawal — typically 20 to 100 basis points each way. Fees are fully customizable per route and protocol, so you can set premium fees for complex cross-chain earn flows and lower fees for same-chain deposits. You keep the fees you configure."
  revShare: ""
---

## What is Cross-Chain Earn?

Cross-Chain Earn lets users go from any asset on any chain into a yield-bearing position on another chain — in one step. No bridging, no swapping, no manually depositing into a protocol. NEAR Intents handles asset conversion, cross-chain routing, and protocol deposit in a single transaction. When the user is ready to exit, they withdraw back to their original asset on their original chain the same way.

The biggest barrier to DeFi participation isn't yield — it's friction. Cross-Chain Earn removes it. Your protocol's yield becomes accessible to every crypto holder on every chain, including native BTC holders who have never touched an EVM chain. For lending protocols, liquid staking, and yield vaults, this expands the addressable depositor base from "users already on your chain" to the entire crypto market.
