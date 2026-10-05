// HOTFIX: all-time volume taken from Dune (https://dune.com/near/near-intents, public + confidential intents).
// The ClickHouse table only covers public intents, so it under-reports the total.
// Remove once ClickHouse includes confidential volume or the stat is read from Dune's API.
export const ALL_TIME_VOLUME_LABEL = '$33B+';

export function formatVolume(usd: number): string {
  if (usd >= 1_000_000_000) {
    return `$${Math.floor(usd / 1_000_000_000)}B+`;
  }
  if (usd >= 1_000_000) {
    return `$${Math.floor(usd / 1_000_000)}M+`;
  }
  return `$${Math.floor(usd / 1_000)}K+`;
}
