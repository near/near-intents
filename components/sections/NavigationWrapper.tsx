import { cookies } from 'next/headers';
import { Navigation } from './Navigation';

export async function NavigationWrapper() {
  const cookieStore = await cookies();
  const password = process.env.PREVIEW_PASSWORD;
  const cookie = cookieStore.get('preview_auth')?.value;

  // Show preview links if: no password set (public mode) OR valid cookie present
  const showPreviewLinks = !password || cookie === password;

  return <Navigation showPreviewLinks={showPreviewLinks} />;
}
