import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

/** GET /api/comments/:commentId — location resolver for notification deep-links */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ commentId: string }> },
) {
  const { commentId } = await params;
  return proxyToBackend(req, `/comments/${commentId}`);
}

/** PATCH /api/comments/:commentId — edit (author or moderator) */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ commentId: string }> },
) {
  const { commentId } = await params;
  const body = await req.json().catch(() => ({}));
  return proxyToBackend(req, `/comments/${commentId}`, { method: 'PATCH', body });
}

/** DELETE /api/comments/:commentId — soft delete (author or moderator) */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ commentId: string }> },
) {
  const { commentId } = await params;
  return proxyToBackend(req, `/comments/${commentId}`, { method: 'DELETE' });
}
