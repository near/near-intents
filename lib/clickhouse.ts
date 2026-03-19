const CLICKHOUSE_URL = process.env.CLICKHOUSE_URL;
const CLICKHOUSE_AUTH = process.env.CLICKHOUSE_AUTH;

const QUERY = `SELECT SUM(volume_amount_usd) AS total_volume_usd, COUNT(DISTINCT blockchain) AS chain_count FROM near_intents_metrics.intents_external_metrics FORMAT JSON`;

export async function getProtocolStats(): Promise<{ totalVolumeUsd: number; chainCount: number } | null> {
  if (!CLICKHOUSE_URL || !CLICKHOUSE_AUTH) return null;
  try {
    const url = `${CLICKHOUSE_URL}/?query=${encodeURIComponent(QUERY)}`;
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: { Authorization: CLICKHOUSE_AUTH },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const row = json?.data?.[0];
    if (!row) return null;
    return {
      totalVolumeUsd: Number(row.total_volume_usd),
      chainCount: Number(row.chain_count),
    };
  } catch {
    return null;
  }
}

export { formatVolume } from '@/lib/formatVolume';
