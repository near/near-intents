import { NextRequest, NextResponse } from 'next/server';

const COOKIE = 'preview_auth';
const MAX_AGE = 60 * 60 * 24 * 3; // 3 days

export async function POST(req: NextRequest) {
  const { password, redirect } = await req.json();
  const expected = process.env.PREVIEW_PASSWORD;

  if (!expected || password !== expected) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, expected, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: MAX_AGE,
    path: '/',
  });
  return res;
}
