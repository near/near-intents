import { getBridgeProjects } from '@/lib/airtable';

export async function GET() {
  try {
    const projects = await getBridgeProjects();
    return Response.json(projects);
  } catch (error) {
    console.error('API error:', error);
    return Response.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export const revalidate = 3600; // Revalidate every hour
