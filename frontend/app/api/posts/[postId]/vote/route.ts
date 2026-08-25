import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

/** POST /api/posts/:id/vote — body: { optionId } */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> },
) {
  const { postId } = await params;
  const body = await req.json().catch(() => ({}));
  return proxyToBackend(req, `/posts/${postId}/vote`, { method: 'POST', body });
}
