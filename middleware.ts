import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isKol = pathname.startsWith('/kol');

  const password = isKol
    ? process.env.KOL_PASSWORD
    : process.env.PREVIEW_PASSWORD;

  if (!password) return NextResponse.next();

  const cookieName = isKol ? 'kol_auth' : 'preview_auth';
  const cookie = req.cookies.get(cookieName);
  if (cookie?.value === password) return NextResponse.next();

  const redirect = pathname + req.nextUrl.search;
  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = '/preview-login';
  loginUrl.search = `?redirect=${encodeURIComponent(redirect)}`;
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    '/overview/:path*',
    '/use-cases/:path*',
    '/case-studies/:path*',
    '/kol',
    '/kol/:path*',
  ],
};
