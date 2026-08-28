import type { MetadataRoute } from 'next';
import { getAllCaseStudies, getAllUseCases } from '@/lib/content';
import { SITE_URL } from '@/lib/seo';

const STATIC_PATHS = ['/', '/overview', '/ecosystem', '/case-studies', '/use-cases', '/confidential', '/disclaimers'];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_PATHS.map((path) => ({
    url: path === '/' ? SITE_URL : `${SITE_URL}${path}`,
  }));

  const caseStudyEntries = getAllCaseStudies().map((cs) => ({
    url: `${SITE_URL}/case-studies/${cs.slug}`,
  }));

  const useCaseEntries = getAllUseCases().map((uc) => ({
    url: `${SITE_URL}/use-cases/${uc.slug}`,
  }));

  return [...staticEntries, ...caseStudyEntries, ...useCaseEntries];
}
