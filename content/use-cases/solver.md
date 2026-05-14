---
name: Become a Solver
slug: solver
icon: radio
tagline: "Fill cross-chain intents, capture spread on retail orderflow across 31 chains"
relevantUserTypes:
  - trading-bot
  - dex
  - aggregator
  - centralized-exchange
demoComponent: SolverDemo
sortOrder: 8
revenueHooks:
  default: "Every cross-chain swap on NEAR Intents is an intent waiting to be filled — capture spread on $15B+ in cumulative volume"
  trading-bot: "Your bot already prices assets across chains. Connect your bot to a Solver and fill intents for profit — same logic, new orderflow."
  dex: "Run a solver alongside your DEX to capture user swap flows that would otherwise route elsewhere."
  aggregator: "Add NEAR Intents solver as a revenue stream — fill intents directly instead of just routing them."
  centralized-exchange: "Your exchange already has deep liquidity — fill cross-chain intents and earn from retail orderflow."
userStories: []
howItWorksSteps:
  - icon: Radio
    title: User submits a swap intent
    detail: "A user on any frontend wants to swap — say, BTC on Bitcoin to USDC on Arbitrum. The frontend sends a quote request to the Message Bus, a WebSocket relay that broadcasts it to all connected solvers."
    color: "#627EEA"
    chainPill: Quote request broadcast
  - icon: Cpu
    title: Solvers compete on price
    detail: "Your solver receives the request, checks if it can fill the trade, computes pricing with your margin, and returns a signed quote. Multiple solvers bid on the same request — best price wins."
    color: "#fb4d01"
    chainPill: Competitive quoting
  - icon: PenLine
    title: Best quote wins instantly
    detail: "The best quoted output is automatically selected and the trade fills instantly. The user signs a single transaction on their source chain. KYT transaction analysis screens every intent before it reaches your solver — keeping your liquidity safe."
    color: "#F7931A"
    chainPill: Instant fill + KYT screening
  - icon: CheckCircle
    title: Settlement on NEAR → destination chain
    detail: "The matched intents settle atomically through the Verifier contract on NEAR, then to the destination L1 blockchain for cross-chain delivery. Your solver balance is credited with the user's source asset. Trustless, verifiable, final."
    color: "#9945FF"
    chainPill: On-chain settlement
revenueModel:
  feeStructure: "Solvers set their own margin on every quote — the spread between your acquisition cost and the price you offer. Typical margins range from 10 to 100+ basis points depending on the pair, chain, and competition. You keep 100% of your spread."
  revShare: ""
---

## What is a Solver?

A solver is a market maker that fills cross-chain swap intents on NEAR Intents. Users across 31 chains submit what they want to trade. Your solver quotes a price, competes with other solvers, and fills the winning trades — capturing spread on every fill.

You connect to the Message Bus via WebSocket, receive quote requests in real time, and respond with signed prices. Settlement happens atomically on NEAR through the Verifier contract. Your liquidity sits on-chain, and you manage it through deposits and withdrawals across any supported chain.
