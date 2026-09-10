import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * GET /api/social/classmates → proxies to GET /social/classmates on the backend.
 * Returns students sharing the user's enrolled courses (id, name, avatar,
 * course, streak, isFollowing).
 */
export async function GET(req: NextRequest) {
  if (!BACKEND_URL) return NextResponse.json({ error: 'API URL not configured' }, { status: 500 });
  const cookie = req.headers.get('cookie') || '';

  const res = await fetch(`${BACKEND_URL}/social/classmates`, {
    method: 'GET',
    headers: { cookie },
    credentials: 'include',
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
