import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

/** GET /api/feed?page=&pageSize=&type=all|question|win|announcement */
export async function GET(req: NextRequest) {
  return proxyToBackend(req, `/feed${req.nextUrl.search}`);
}
