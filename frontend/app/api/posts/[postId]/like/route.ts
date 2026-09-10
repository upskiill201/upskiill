import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

/** POST /api/posts/:id/like */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> },
) {
  const { postId } = await params;
  return proxyToBackend(req, `/posts/${postId}/like`, { method: 'POST' });
}

/** DELETE /api/posts/:id/like */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> },
) {
  const { postId } = await params;
  return proxyToBackend(req, `/posts/${postId}/like`, { method: 'DELETE' });
}
