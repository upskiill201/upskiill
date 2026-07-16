import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const cookie = req.headers.get('cookie') || '';

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/switch-role`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  const response = NextResponse.json(data, { status: res.status });

  // Forward Set-Cookie header so the new JWT cookie is set in the browser
  const setCookieHeader = res.headers.get('set-cookie');
  if (setCookieHeader) {
    response.headers.set('set-cookie', setCookieHeader);
  }

  return response;
}
