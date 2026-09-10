import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * POST /api/social/follow/:id → proxies to POST /social/follow/:id on the backend.
 * Follows another user; returns the caller's refreshed follower/following counts.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!BACKEND_URL) return NextResponse.json({ error: 'API URL not configured' }, { status: 500 });
  const cookie = req.headers.get('cookie') || '';
  const { id } = await params;

  const res = await fetch(`${BACKEND_URL}/social/follow/${id}`, {
    method: 'POST',
    headers: { cookie },
    credentials: 'include',
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
