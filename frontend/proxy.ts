import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('access_token');
  const { pathname } = request.nextUrl;

  // Public auth routes
  const studentAuthRoutes = ['/login', '/signup'];
  const instructorAuthRoutes = ['/instructor/login', '/instructor/signup'];
  
  // Protected route checks
  const isInstructorAuthRoute = instructorAuthRoutes.includes(pathname);
  const isInstructorProtectedRoute = (pathname === '/instructor' || pathname.startsWith('/instructor/')) && !isInstructorAuthRoute;
  
  const isStudentProtectedRoute = ['/dashboard', '/learn', '/profile'].some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );

  const isProtectedRoute = isInstructorProtectedRoute || isStudentProtectedRoute;
  const isPublicOnlyRoute = studentAuthRoutes.includes(pathname) || isInstructorAuthRoute;

  // Enforce protection (redirect unauthenticated users to proper login)
  if (isProtectedRoute && !token) {
    if (isInstructorProtectedRoute) {
      return NextResponse.redirect(new URL('/instructor/login', request.url));
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Prevent authenticated users from seeing login/signup pages
  if (isPublicOnlyRoute && token) {
    if (isInstructorAuthRoute) {
      return NextResponse.redirect(new URL('/instructor', request.url));
    }
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
