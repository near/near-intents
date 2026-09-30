// Signed session tokens for the password-protected previews.
// Uses Web Crypto so it runs in both the Edge middleware and Node route handlers.
// The cookie holds `<expiry>.<hmac>` instead of the raw password.

export const AUTH_MAX_AGE = 60 * 60 * 24 * 3; // 3 days, in seconds

const encoder = new TextEncoder();

// Optional AUTH_SECRET hardens tokens against offline guessing of the password.
function signingKey(password: string): string {
  return `${process.env.AUTH_SECRET ?? ''}:${password}`;
}

async function hmac(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, '0')).join('');
}

// Constant-time comparison for equal-length strings.
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// Compares HMAC digests so neither content nor length of the password leaks through timing.
export async function passwordMatches(input: string, expected: string): Promise<boolean> {
  const [a, b] = await Promise.all([hmac('pw-check', input), hmac('pw-check', expected)]);
  return safeEqual(a, b);
}

export async function createAuthToken(scope: string, password: string): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + AUTH_MAX_AGE;
  const sig = await hmac(signingKey(password), `${scope}:${exp}`);
  return `${exp}.${sig}`;
}

export async function verifyAuthToken(
  token: string | undefined,
  scope: string,
  password: string,
): Promise<boolean> {
  if (!token) return false;
  const [expStr, sig] = token.split('.');
  const exp = Number(expStr);
  if (!sig || !Number.isInteger(exp) || exp < Math.floor(Date.now() / 1000)) return false;
  const expected = await hmac(signingKey(password), `${scope}:${exp}`);
  return safeEqual(sig, expected);
}
