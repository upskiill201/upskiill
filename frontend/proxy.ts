import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Teyro Middleware — Cookie-presence-only traffic routing.
 *
 * IMPORTANT: This middleware MUST NOT decode JWTs or make DB calls.
 * - JWT decoding is unreliable in Edge Runtime (stale tokens, encoding issues).
 * - Profile-level authorization (hasStudentAccess, hasCreatorAccess) is handled
 *   server-side in the respective layout.tsx files which call /api/auth/me.
 *
 * This file's only job: redirect unauthenticated users to the correct login page,
 * and redirect authenticated users away from login/signup pages.
 */
export function proxy(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const path = request.nextUrl.pathname;

  // Paths that are public and require no token
  const isStudentLogin = path === '/login';
  const isStudentSignup = path === '/signup';
  const isStudentAuthPage = isStudentLogin || isStudentSignup;

  const isCreatorAuthPage =
    path.startsWith('/creator/login') ||
    path.startsWith('/creator/signup') ||
    path.startsWith('/creator/onboarding') ||
    path.startsWith('/creator/forgot-password') ||
    path.startsWith('/creator/reset-password') ||
    path.startsWith('/creator/verify-pending') ||
    path.startsWith('/creator/verify-failed');

  const isDashboard = path.startsWith('/dashboard');
  // Walled too: a push notification deep-links straight into /learn, and
  // /admin is new privileged surface.
  const isLearn = path.startsWith('/learn');
  const isAdmin = path.startsWith('/admin');
  const isTestRoute = path.startsWith('/creator-onboarding-test');
  const isCreatorStudio = path.startsWith('/creator') && !isCreatorAuthPage && !isTestRoute;

  // 1. No token → enforce login walls on protected routes only
  if (!token) {
    if (isDashboard || isLearn || isAdmin) {
      // Preserve the destination. Without this, a learner whose 7-day JWT has
      // expired taps a streak reminder and lands on a generic login → dashboard,
      // with the lesson they were sent to silently discarded.
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('next', path + (request.nextUrl.search ?? ''));
      return NextResponse.redirect(loginUrl);
    }
    if (isCreatorStudio) {
      return NextResponse.redirect(new URL('/creator/login', request.url));
    }
    return NextResponse.next();
  }

  // 2. Has token → always let through.
  // Auth pages (/creator/login, /login etc.) handle their own "already logged in" redirect internally.
  // We must NOT redirect authenticated users away from auth pages here because:
  // - We can't check profile-level access (hasCreatorAccess) without a DB call in Edge Runtime
  // - Blindly redirecting token-holders to /creator causes an infinite loop when a student
  //   (no creator access) visits /creator/login → layout bounces them back → middleware
  //   bounces them to /creator → loop.
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
