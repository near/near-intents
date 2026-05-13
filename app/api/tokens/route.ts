import { NextResponse } from 'next/server';

export const revalidate = 300; // 5 minutes

export async function GET() {
  try {
    const res = await fetch('https://1click.chaindefuser.com/v0/tokens', {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ tokens: [] }, { status: 200 });
  }
}
