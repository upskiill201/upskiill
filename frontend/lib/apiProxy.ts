import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Shared same-origin → backend proxy for the community/feed/notification
 * surfaces. Forwards the caller's auth cookie to the NestJS API and passes
 * the JSON response + status straight back (same shape as the /api/social
 * routes). Body is optional for GET/DELETE.
 */
export async function proxyToBackend(
  req: NextRequest,
  backendPath: string,
  init: { method: 'GET' | 'POST' | 'PATCH' | 'DELETE'; body?: unknown } = { method: 'GET' },
): Promise<NextResponse> {
  if (!BACKEND_URL) {
    return NextResponse.json({ error: 'API URL not configured' }, { status: 500 });
  }
  const cookie = req.headers.get('cookie') || '';

  try {
    const res = await fetch(`${BACKEND_URL}${backendPath}`, {
      method: init.method,
      headers: {
        cookie,
        ...(init.body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      },
      credentials: 'include',
      body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
    });

    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: 'Backend unreachable' }, { status: 502 });
  }
}

/** Reads a dynamic route param out of the resolved params object. */
export function param(value: string | undefined): string {
  return value ?? '';
}
