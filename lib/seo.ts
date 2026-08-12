import type { Metadata } from 'next';

const FALLBACK_SITE_URL = 'https://intents.near.org';

function resolveSiteUrl(): string {
  const candidate = process.env.NEXT_PUBLIC_SITE_URL;
  if (!candidate) return FALLBACK_SITE_URL;
  try {
    return new URL(candidate).toString().replace(/\/$/, '');
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export const SITE_URL = resolveSiteUrl();
export const SITE_NAME = 'NEAR Intents';

interface BuildMetadataArgs {
  title: string;
  description: string;
  path: string;
}

export function buildMetadata({ title, description, path }: BuildMetadataArgs): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_US',
      images: [{ url: '/og.png', width: 973, height: 661, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og.png'],
    },
  };
}
