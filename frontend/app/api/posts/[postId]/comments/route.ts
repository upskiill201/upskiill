import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

/** GET /api/posts/:id/comments?page= */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> },
) {
  const { postId } = await params;
  const qs = req.nextUrl.search;
  return proxyToBackend(req, `/posts/${postId}/comments${qs}`);
}

/** POST /api/posts/:id/comments — body: { contentText, parentId? } */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> },
) {
  const { postId } = await params;
  const body = await req.json().catch(() => ({}));
  return proxyToBackend(req, `/posts/${postId}/comments`, { method: 'POST', body });
}
