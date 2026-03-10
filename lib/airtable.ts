import Airtable from 'airtable';

const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = airtable.base(process.env.AIRTABLE_BASE_ID!);
const table = base(process.env.AIRTABLE_TABLE_ID!);

export interface BridgeProject {
  id: string;
  name: string;
  description: string;
  logo_url: string;
  blackIcon: boolean;
  verified: boolean;
  featured?: boolean;
}

export async function getBridgeProjects(): Promise<BridgeProject[]> {
  try {
    const records = await table.select().all();
    return records
      .map((record) => {
        const icon = record.get('Icon') as any;
        let logoUrl = '';

        // Icon is an attachment field, extract the URL from the first attachment
        if (Array.isArray(icon) && icon.length > 0) {
          logoUrl = icon[0].url;
        }

        return {
          id: record.id,
          name: record.get('Name of Company') as string,
          description: record.get('Description') as string,
          logo_url: logoUrl,
          blackIcon: (record.get('Black icon') as boolean) || false,
          verified: (record.get('Verified') as boolean) || false,
          featured: (record.get('Feature') as boolean) || false,
        };
      })
      .filter((project) => project.verified); // Only return verified projects
  } catch (error) {
    console.error('Error fetching from Airtable:', error);
    return [];
  }
}

export async function getFeaturedProjects(): Promise<BridgeProject[]> {
  try {
    const records = await table.select().all();
    return records
      .map((record) => {
        const icon = record.get('Icon') as any;
        let logoUrl = '';

        if (Array.isArray(icon) && icon.length > 0) {
          logoUrl = icon[0].url;
        }

        return {
          id: record.id,
          name: record.get('Name of Company') as string,
          description: record.get('Description') as string,
          logo_url: logoUrl,
          blackIcon: (record.get('Black icon') as boolean) || false,
          verified: (record.get('Verified') as boolean) || false,
          featured: (record.get('Feature') as boolean) || false,
        };
      })
      .filter((project) => project.verified && project.featured); // Only verified and featured projects
  } catch (error) {
    console.error('Error fetching featured projects from Airtable:', error);
    return [];
  }
}
