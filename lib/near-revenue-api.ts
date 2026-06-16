const BASE_URL = process.env.NEAR_API_BASE_URL;
const API_KEY = process.env.NEAR_API_KEY;

export async function getTotalFees(): Promise<number | null> {
  if (!BASE_URL || !API_KEY) return null;
  try {
    const res = await fetch(`${BASE_URL}/v1/metrics/total-fees`, {
      next: { revalidate: 3600 },
      headers: { 'X-API-Key': API_KEY },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const value = json?.data?.fees_usd_all_time;
    return value != null ? Number(value) : null;
  } catch {
    return null;
  }
}
