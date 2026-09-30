import { NextRequest, NextResponse } from 'next/server';
import { AUTH_MAX_AGE, createAuthToken, passwordMatches } from '@/lib/auth-token';

// Basic brute-force protection: failed attempts per IP within a time window.
// In-memory, so it is per server instance; pair with platform rate limiting (e.g. Vercel WAF).
const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILED_ATTEMPTS = 10;
const failedAttempts = new Map<string, { count: number; resetAt: number }>();

function clientIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
}

function isRateLimited(ip: string): boolean {
  const entry = failedAttempts.get(ip);
  if (!entry) return false;
  if (entry.resetAt < Date.now()) {
    failedAttempts.delete(ip);
    return false;
  }
  return entry.count >= MAX_FAILED_ATTEMPTS;
}

function recordFailure(ip: string) {
  if (failedAttempts.size > 10_000) failedAttempts.clear();
  const entry = failedAttempts.get(ip);
  if (entry && entry.resetAt >= Date.now()) {
    entry.count++;
  } else {
    failedAttempts.set(ip, { count: 1, resetAt: Date.now() + WINDOW_MS });
  }
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many attempts' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
  const { password, redirect } = (body ?? {}) as { password?: unknown; redirect?: unknown };
  if (typeof password !== 'string') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const isKol = typeof redirect === 'string' && redirect.startsWith('/kol');
  const expected = isKol
    ? process.env.KOL_PASSWORD
    : process.env.PREVIEW_PASSWORD;
  const scope = isKol ? 'kol' : 'preview';
  const cookieName = isKol ? 'kol_auth' : 'preview_auth';

  if (!expected || !(await passwordMatches(password, expected))) {
    recordFailure(ip);
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(cookieName, await createAuthToken(scope, expected), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: AUTH_MAX_AGE,
    path: '/',
  });
  return res;
}
