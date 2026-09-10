import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * DELETE /api/social/unfollow/:id → proxies to DELETE /social/unfollow/:id on
 * the backend. Unfollows a user; returns refreshed follower/following counts.
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!BACKEND_URL) return NextResponse.json({ error: 'API URL not configured' }, { status: 500 });
  const cookie = req.headers.get('cookie') || '';
  const { id } = await params;

  const res = await fetch(`${BACKEND_URL}/social/unfollow/${id}`, {
    method: 'DELETE',
    headers: { cookie },
    credentials: 'include',
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
