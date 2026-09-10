import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

/**
 * GET /api/community/my → GET /communities/my
 * Every community the caller belongs to in one lightweight payload —
 * powers the feed rail and the communities index without N+1 overviews.
 */
export async function GET(req: NextRequest) {
  return proxyToBackend(req, '/communities/my');
}
