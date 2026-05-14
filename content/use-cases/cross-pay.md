---
name: Cross-Pay
slug: cross-pay
icon: credit-card
tagline: "Your users pay with any token on any chain — recipient gets their preferred stablecoin on any chain"
coverImage: /screenshots/zodl-crosspay.jpg
screenshots:
  - src: /screenshots/zodl-crosspay.jpg
    caption: "Initiating a cross-chain payment in ZODL — paying with ZEC, recipient gets USDC"
    source: "ZODL"
  - src: /screenshots/zodl-crosspay-confirm.jpg
    caption: "Confirming a cross-chain payment in ZODL — one signature, exact stablecoin delivery"
    source: "ZODL"
  - src: /screenshots/pingpay-crosspay.png
    caption: "PingPay — create a shareable payment link, request any asset on any chain, payer pays with anything"
    source: "PingPay"
relevantUserTypes:
  - single-chain-wallet
  - multi-chain-wallet
  - payment-app
demoComponent: CrossPayDemo
sortOrder: 2
revenueHooks:
  default: "Every cross-chain payment through your app = transaction fees you configure and capture"
  single-chain-wallet: "Your users pay anyone in any token without leaving your wallet — you earn on every payment"
  multi-chain-wallet: "Universal payments across all chains means your users never need another app"
  payment-app: "Accept any crypto from any chain, settle in stablecoins. Reach 31 chains of payers with one integration."
userStories:
  - persona: "A crypto wallet user"
    userType: single-chain-wallet
    context: "Wants to pay a merchant who accepts USDC on Base, but only holds BTC"
    app: "Your wallet app"
    partnerSlug: null
    steps:
      - "Opens your wallet → taps Pay"
      - "Scans merchant's payment request: $500 USDC on Base"
      - "App shows: 'Pay with BTC — merchant receives USDC on Base'"
      - "User confirms — signs one Bitcoin transaction"
      - "Merchant receives exactly $500 USDC on Base"
    without: "Sell BTC on a CEX, buy USDC, bridge to Base, send to merchant. 30+ minutes, multiple fees, multiple apps."
  - persona: "An online merchant"
    userType: payment-app
    context: "Runs an e-commerce store, wants to accept crypto payments without conversion friction"
    app: "Payment gateway / checkout app"
    partnerSlug: null
    steps:
      - "Integrates NEAR Intents cross-pay API or widget"
      - "Customer checks out and selects 'Pay with crypto'"
      - "Customer pays with ANY token on ANY of 31 chains"
      - "Merchant receives USDC on their preferred chain automatically"
      - "No manual conversion, no CEX involvement"
    without: "Accept only 2-3 tokens on 1-2 chains. Miss payments from the majority of crypto holders."
  - persona: "A power user"
    userType: multi-chain-wallet
    context: "Needs to send $200 USDT to a friend on Ethereum, but holds SOL"
    app: "Multi-chain wallet"
    partnerSlug: null
    steps:
      - "Opens wallet → taps Send"
      - "Enters friend's Ethereum address and amount: 200 USDT"
      - "Selects SOL as payment source"
      - "Signs one Solana transaction"
      - "Friend receives exactly 200 USDT on Ethereum"
    without: "Bridge SOL to Ethereum, swap to USDT, send. Three transactions across two apps."
howItWorksSteps:
  - icon: CreditCard
    title: Set the payment request
    detail: "The recipient specifies the exact stablecoin amount they need — for example, 500 USDC on Base or 100 USDT on Solana. You can expose this as a direct pay flow or a shareable payment link/QR code. The sender then picks any crypto they hold to pay with."
    color: "#627EEA"
    chainPill: Stablecoin amount, any source token
  - icon: Cpu
    title: Intents routes and converts
    detail: "Solvers compete to fill the payment at the best price, converting the sender's token into the exact stablecoin amount requested. Any overpayment is automatically returned to the sender in their original token. You configure your own fee, charged on top of the payment."
    color: "#fb4d01"
    chainPill: NEAR Intents solver network
  - icon: PenLine
    title: Sender sends funds
    detail: "The sender sends from a connected wallet or to a generated deposit address / payment link — they can pay from any wallet or exchange without special wallet support."
    color: "#F7931A"
    chainPill: Two ways in
  - icon: CheckCircle
    title: Recipient gets exact stablecoins
    detail: "The recipient receives precisely the stablecoin amount requested (USDC, USDT, etc.) on their chosen chain — regardless of what the sender paid with. If the sender's payment doesn't cover the full amount, they receive a refund automatically."
    color: "#9945FF"
    chainPill: Exact stablecoin delivery guaranteed
revenueModel:
  feeStructure: "Configurable fee per payment — typically 20 to 100 basis points. Fees are fully customizable per route, so you can set lower fees for stablecoin-to-stablecoin payments and higher fees for cross-asset payments. You keep the fees you configure."
  revShare: ""
---

## What is Cross-Pay?

Cross-Pay lets your users pay anyone with any token they hold, on any chain — while the recipient receives exactly the stablecoin amount they requested, on the chain they prefer. The sender doesn't need to worry about bridges, conversions, or which chain the recipient uses. Any overpayment returns to the sender automatically in their original token.

This turns any wallet or payment app into a universal payment rail.

