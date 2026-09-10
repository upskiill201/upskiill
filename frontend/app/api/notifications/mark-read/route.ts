import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

/** POST /api/notifications/mark-read — body: { ids?: string[] }; omit ids = mark all */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  return proxyToBackend(req, '/notifications/mark-read', { method: 'POST', body });
}
