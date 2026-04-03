import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token');
  const { pathname } = request.nextUrl;

  // Protected routes list
  const protectedRoutes = ['/dashboard', '/instructor', '/learn', '/profile'];
  
  // Public-only routes (don't show login/signup if already logged in)
  const publicOnlyRoutes = ['/login', '/signup'];

  const matchesRoute = (route: string) =>
    pathname === route || pathname.startsWith(`${route}/`);

  const isProtectedRoute = protectedRoutes.some(matchesRoute);
  const isPublicOnlyRoute = publicOnlyRoutes.some(matchesRoute);

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isPublicOnlyRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
