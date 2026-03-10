import { getFeaturedProjects } from '@/lib/airtable';

export async function GET() {
  try {
    const projects = await getFeaturedProjects();
    return Response.json(projects);
  } catch (error) {
    console.error('API error:', error);
    return Response.json({ error: 'Failed to fetch featured projects' }, { status: 500 });
  }
}

export const revalidate = 3600; // Revalidate every hour
