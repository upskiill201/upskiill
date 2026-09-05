import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

/**
 * GET /api/community/course/:courseId/bootstrap
 *   → GET /communities/course/:courseId/bootstrap
 *
 * One request for the whole community page: overview + first page of posts +
 * leaderboard preview. Replaces the three-call waterfall the page used to fire
 * (each of which re-resolved the community and re-ran the access check first).
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> },
) {
  const { courseId } = await params;
  const search = req.nextUrl.search; // carries sort / type / lessonId through
  return proxyToBackend(
    req,
    `/communities/course/${encodeURIComponent(courseId)}/bootstrap${search}`,
  );
}
