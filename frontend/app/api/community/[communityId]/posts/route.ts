import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

/** GET /api/community/:communityId/posts?sort=&type=&lessonId=&page= */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ communityId: string }> },
) {
  const { communityId } = await params;
  const qs = req.nextUrl.search; // preserves sort/type/lessonId/page/pageSize
  return proxyToBackend(req, `/communities/${communityId}/posts${qs}`);
}

/** POST /api/community/:communityId/posts — create a post */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ communityId: string }> },
) {
  const { communityId } = await params;
  const body = await req.json().catch(() => ({}));
  return proxyToBackend(req, `/communities/${communityId}/posts`, { method: 'POST', body });
}
