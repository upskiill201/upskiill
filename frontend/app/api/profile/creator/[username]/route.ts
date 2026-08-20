import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;
    const cookie = req.headers.get('cookie') || '';

    const res = await fetch(`${BACKEND_URL}/profile/creator/${encodeURIComponent(username)}`, {
      method: 'GET',
      headers: {
        cookie,
      },
      cache: 'no-store',
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to fetch creator profile', message: err.message },
      { status: 500 }
    );
  }
}
