import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

/** GET /api/notifications/unread-count → { unreadCount } */
export async function GET(req: NextRequest) {
  return proxyToBackend(req, '/notifications/unread-count');
}
