import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = 'https://upskiill-backend.onrender.com';

/**
 * GET /api/profile → proxies to GET /profile/me on the backend
 * PATCH /api/profile → proxies to PATCH /profile/me on the backend
 */

export async function GET(req: NextRequest) {
  const cookie = req.headers.get('cookie') || '';

  const res = await fetch(`${BACKEND_URL}/profile/me`, {
    method: 'GET',
    headers: { cookie },
    credentials: 'include',
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function PATCH(req: NextRequest) {
  const cookie = req.headers.get('cookie') || '';
  const body = await req.json();

  const res = await fetch(`${BACKEND_URL}/profile/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      cookie,
    },
    credentials: 'include',
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function DELETE(req: NextRequest) {
  const cookie = req.headers.get('cookie') || '';

  const res = await fetch(`${BACKEND_URL}/profile/me`, {
    method: 'DELETE',
    headers: { cookie },
    credentials: 'include',
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
