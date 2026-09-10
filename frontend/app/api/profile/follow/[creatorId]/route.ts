import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ creatorId: string }> }
) {
  try {
    const { creatorId } = await params;
    const cookie = req.headers.get('cookie') || '';

    const res = await fetch(`${BACKEND_URL}/profile/follow/${encodeURIComponent(creatorId)}`, {
      method: 'POST',
      headers: {
        cookie,
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to toggle follow', message: err.message },
      { status: 500 }
    );
  }
}
