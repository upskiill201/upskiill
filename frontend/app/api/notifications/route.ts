import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

/** GET /api/notifications?page=&pageSize=&unreadOnly=true */
export async function GET(req: NextRequest) {
  return proxyToBackend(req, `/notifications${req.nextUrl.search}`);
}
