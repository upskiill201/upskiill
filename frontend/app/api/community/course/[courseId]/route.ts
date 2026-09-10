import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/apiProxy';

/**
 * GET /api/community/course/:courseId → GET /communities/course/:courseId
 * Community landing payload (overview + my membership + members preview).
 * Lazily seats learners who enrolled before the feature existed.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> },
) {
  const { courseId } = await params;
  return proxyToBackend(req, `/communities/course/${courseId}`);
}
