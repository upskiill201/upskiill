import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  if (!BACKEND_URL) return NextResponse.json({ error: 'API URL not configured' }, { status: 500 });
  const cookie = req.headers.get('cookie') || '';
  const { username } = await params;

  const res = await fetch(`${BACKEND_URL}/profile/check-username/${encodeURIComponent(username)}`, {
    method: 'GET',
    headers: { cookie },
    credentials: 'include',
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
