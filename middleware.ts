import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const password = process.env.KOL_PASSWORD;

  if (!password) return NextResponse.next();

  const cookie = req.cookies.get('kol_auth');
  if (cookie?.value === password) return NextResponse.next();

  const redirect = req.nextUrl.pathname + req.nextUrl.search;
  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = '/preview-login';
  loginUrl.search = `?redirect=${encodeURIComponent(redirect)}`;
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    '/kol',
    '/kol/:path*',
  ],
};
