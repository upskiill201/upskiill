import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * GET /api/social/following → proxies to GET /social/following on the backend.
 * Returns the users the current user follows (id, name, avatar, streak, isFollowing).
 */
export async function GET(req: NextRequest) {
  if (!BACKEND_URL) return NextResponse.json({ error: 'API URL not configured' }, { status: 500 });
  const cookie = req.headers.get('cookie') || '';

  const res = await fetch(`${BACKEND_URL}/social/following`, {
    method: 'GET',
    headers: { cookie },
    credentials: 'include',
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
