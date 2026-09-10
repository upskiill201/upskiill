import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

/** GET /api/feed/discover — rule-based recommended learning cards */
export async function GET(req: NextRequest) {
  return proxyToBackend(req, '/feed/discover');
}
