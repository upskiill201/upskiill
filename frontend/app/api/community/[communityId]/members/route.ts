import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

/** GET /api/community/:communityId/members?page=&q= — also powers @mention autocomplete */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ communityId: string }> },
) {
  const { communityId } = await params;
  const qs = req.nextUrl.search;
  return proxyToBackend(req, `/communities/${communityId}/members${qs}`);
}
