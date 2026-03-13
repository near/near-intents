import { getChainIcons } from '@/lib/airtable';

export async function GET() {
  try {
    const icons = await getChainIcons();
    return Response.json(icons);
  } catch (error) {
    console.error('API error:', error);
    return Response.json({ error: 'Failed to fetch chain icons' }, { status: 500 });
  }
}

export const revalidate = 3600; // Revalidate every hour
