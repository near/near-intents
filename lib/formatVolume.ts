export function formatVolume(usd: number): string {
  if (usd >= 1_000_000_000) {
    return `$${Math.floor(usd / 1_000_000_000)}B+`;
  }
  if (usd >= 1_000_000) {
    return `$${Math.floor(usd / 1_000_000)}M+`;
  }
  return `$${Math.floor(usd / 1_000)}K+`;
}
