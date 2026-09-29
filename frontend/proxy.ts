import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LEARNER_ENTRY, LEARNER_GATE, STUDIO_ENTRY, STUDIO_GATE } from '@/lib/launch';

/**
 * The app's front doors while it is still closed (see lib/launch.ts). A
 * logged-out visitor who reaches any of these is sent to the notify-me form
 * instead of an empty app. Exact match or a sub-path — never a bare prefix, so
 * /profile does not catch /creator-profile.
 */
const LEARNER_DOORS = [
  '/start', '/login', '/signup', '/join', '/launch', '/onboarding',
  '/forgot-password', '/reset-password', '/verify-email', '/role-select',
  '/explore', '/courses', '/learn', '/dashboard', '/cart', '/checkout',
  '/my-courses', '/my-learning', '/leaderboards', '/quests', '/shop',
  '/profile', '/certificates', '/student',
];

const underAny = (path: string, prefixes: string[]) =>
  prefixes.some((p) => path === p || path.startsWith(`${p}/`));

/** Constant-time compare — the preview key is a secret, so don't leak it by timing. */
function sameSecret(a: string | undefined, b: string | undefined): boolean {
  if (!a || !b || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/**
 * Teyro Middleware — Cookie-presence-only traffic routing.
 *
 * IMPORTANT: This middleware MUST NOT decode JWTs or make DB calls.
 * - JWT decoding is unreliable in Edge Runtime (stale tokens, encoding issues).
 * - Profile-level authorization (hasStudentAccess, hasCreatorAccess) is handled
 *   server-side in the respective layout.tsx files which call /api/auth/me.
 *
 * Jobs: (1) hold the launch gate, (2) redirect unauthenticated users to the
 * correct login page.
 */
export function proxy(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const path = request.nextUrl.pathname;

  // ── Launch gate ──────────────────────────────────────────────────────────
  // Who gets through: anyone already signed in, and anyone holding the private
  // preview cookie (the team, testers, investors). Set LAUNCH_PREVIEW_KEY in
  // Vercel and share  https://teyro.app/?preview=<key>  — it sets a 30-day
  // cookie. It is a soft gate: the app screens still check auth themselves.
  const previewKey = process.env.LAUNCH_PREVIEW_KEY;
  if (previewKey && sameSecret(request.nextUrl.searchParams.get('preview') ?? undefined, previewKey)) {
    const clean = request.nextUrl.clone();
    clean.searchParams.delete('preview');
    const res = NextResponse.redirect(clean);
    res.cookies.set('teyro_preview', previewKey, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });
    res.headers.set('Cache-Control', 'no-store');
    return res;
  }
  const hasPreview = sameSecret(request.cookies.get('teyro_preview')?.value, previewKey);

  if (!token && !hasPreview) {
    const isStudioDoor = path === '/creator' || path.startsWith('/creator/');
    let target: string | null = null;
    if (STUDIO_GATE && isStudioDoor) target = STUDIO_ENTRY.href;
    else if (LEARNER_GATE && underAny(path, LEARNER_DOORS)) target = LEARNER_ENTRY.href;
    // Logged-out visitors headed for the admin/learner login walls also land here.
    if (target) {
      const res = NextResponse.redirect(new URL(target, request.url));
      // Temporary and uncacheable: on launch day the same URLs must work again.
      res.headers.set('Cache-Control', 'no-store');
      return res;
    }
  }

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
