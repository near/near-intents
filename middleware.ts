import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE = 'preview_auth';
const PASSWORD = process.env.PREVIEW_PASSWORD;

export function middleware(req: NextRequest) {
  // If no password is set, allow everything through
  if (!PASSWORD) return NextResponse.next();

  const cookie = req.cookies.get(COOKIE);
  if (cookie?.value === PASSWORD) return NextResponse.next();

  const redirect = req.nextUrl.pathname + req.nextUrl.search;
  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = '/preview-login';
  loginUrl.search = `?redirect=${encodeURIComponent(redirect)}`;
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/overview/:path*', '/use-cases/:path*', '/case-studies/:path*'],
};
