import { NextRequest, NextResponse } from 'next/server';

const MAX_AGE = 60 * 60 * 24 * 3; // 3 days

export async function POST(req: NextRequest) {
  const { password, redirect } = await req.json();

  const isKol = typeof redirect === 'string' && redirect.startsWith('/kol');
  const expected = isKol
    ? process.env.KOL_PASSWORD
    : process.env.PREVIEW_PASSWORD;
  const cookieName = isKol ? 'kol_auth' : 'preview_auth';

  if (!expected || password !== expected) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(cookieName, expected, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: MAX_AGE,
    path: '/',
  });
  return res;
}
