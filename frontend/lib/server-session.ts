import type { NextRequest } from 'next/server';

export interface SessionUser {
  id: string;
  email: string;
  fullName?: string;
  role?: string;
  hasCreatorAccess?: boolean;
  hasStudentAccess?: boolean;
}

/**
 * Verifies the caller's httpOnly session cookie against the NestJS backend
 * (`GET /auth/me`). Same trust model as uploadS3Server.verifyLessonOwnership:
 * the backend is the single source of truth for auth — Next.js API routes
 * never hold JWT_SECRET and never parse tokens themselves.
 *
 * Returns the enriched user row on success, or null when the caller has no
 * valid session.
 */
export async function getSessionUser(req: NextRequest): Promise<SessionUser | null> {
  const cookieHeader = req.headers.get('cookie');
  if (!cookieHeader) return null;

  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  let res: Response;
  try {
    res = await fetch(`${backendUrl}/auth/me`, {
      headers: { cookie: cookieHeader },
      cache: 'no-store',
    });
  } catch {
    return null;
  }

  if (!res.ok) return null;

  try {
    const user = await res.json();
    return user?.id ? (user as SessionUser) : null;
  } catch {
    return null;
  }
}

/** Standard 401 payload for unauthenticated API-route callers. */
export function unauthorizedResponse(): Response {
  return Response.json(
    { error: 'Authentication required. Please sign in and try again.' },
    { status: 401 },
  );
}
