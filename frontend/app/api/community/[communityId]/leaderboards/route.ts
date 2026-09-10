import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

/**
 * GET /api/community/:communityId/leaderboards
 *   → GET /communities/:id/leaderboards
 *
 * The Leaderboards tab: 7-day, 30-day and all-time boards plus the caller's
 * community level card, all in one payload.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ communityId: string }> },
) {
  const { communityId } = await params;
  return proxyToBackend(
    req,
    `/communities/${encodeURIComponent(communityId)}/leaderboards`,
  );
}
