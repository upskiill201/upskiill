import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

/** POST /api/posts/:id/pin — moderator only. Body: { value?: boolean } */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> },
) {
  const { postId } = await params;
  const body = await req.json().catch(() => ({}));
  return proxyToBackend(req, `/posts/${postId}/pin`, { method: 'POST', body });
}
