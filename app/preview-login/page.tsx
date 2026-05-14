'use client';

import { useState, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get('redirect') ?? '/overview';

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, redirect }),
      });

      if (res.ok) {
        router.push(redirect);
      } else {
        setError('Incorrect password.');
      }
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="password"
        placeholder="Preview password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
        required
        className="rounded-lg border border-white/10 bg-[#242424] px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#fb4d01]/50 focus:ring-1 focus:ring-[#fb4d01]/30"
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-[#fb4d01] px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {loading ? 'Verifying…' : 'Enter'}
      </button>
    </form>
  );
}

export default function PreviewLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#1a1a1a] p-8">
        <div className="mb-6 text-center">
          <h1 className="text-lg font-semibold text-white">Preview Access</h1>
          <p className="mt-1 text-sm text-white/40">This page is not yet public.</p>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
