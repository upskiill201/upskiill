import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

/** GET /api/posts/:postId — post detail with viewer context */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> },
) {
  const { postId } = await params;
  return proxyToBackend(req, `/posts/${postId}`);
}

/** PATCH /api/posts/:postId — edit (author or moderator) */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> },
) {
  const { postId } = await params;
  const body = await req.json().catch(() => ({}));
  return proxyToBackend(req, `/posts/${postId}`, { method: 'PATCH', body });
}

/** DELETE /api/posts/:postId — soft delete (author or moderator) */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> },
) {
  const { postId } = await params;
  return proxyToBackend(req, `/posts/${postId}`, { method: 'DELETE' });
}
