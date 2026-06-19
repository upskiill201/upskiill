import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * GET /api/auth/check-email?email=...
 * Proxies to GET /auth/check-email on the backend.
 * Used by Step 15 signup form for real-time email duplicate checking.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email') || '';

  const res = await fetch(
    `${BACKEND_URL}/auth/check-email?email=${encodeURIComponent(email)}`,
    { method: 'GET' }
  );

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
