import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

/** POST /api/comments/:commentId/like */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ commentId: string }> },
) {
  const { commentId } = await params;
  return proxyToBackend(req, `/comments/${commentId}/like`, { method: 'POST' });
}

/** DELETE /api/comments/:commentId/like */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ commentId: string }> },
) {
  const { commentId } = await params;
  return proxyToBackend(req, `/comments/${commentId}/like`, { method: 'DELETE' });
}
