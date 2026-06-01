import { getChainAssets } from '@/lib/airtable';

export async function GET() {
  try {
    const assets = await getChainAssets();
    return Response.json(assets);
  } catch (error) {
    console.error('API error:', error);
    return Response.json({ error: 'Failed to fetch chain assets' }, { status: 500 });
  }
}

export const revalidate = 3600;
