import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const path = request.nextUrl.pathname;

  const isStudentAuthPage = path === '/login' || path === '/signup';
  const isInstructorAuthPage = path.startsWith('/instructor/login') || path.startsWith('/instructor/signup');
  const isAuthPage = isStudentAuthPage || isInstructorAuthPage;
  
  const isDashboard = path.startsWith('/dashboard');
  const isInstructorArea = path.startsWith('/instructor') && !isInstructorAuthPage;

  if (!token) {
    if (isDashboard) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (isInstructorArea) {
      return NextResponse.redirect(new URL('/instructor/login', request.url));
    }
    return NextResponse.next();
  }

  // Very basic decoding of JWT payload (no crypto verification needed for UI routing, backend still secures APIs)
  try {
    const payloadBase64 = token.split('.')[1];
    const payloadJson = Buffer.from(payloadBase64, 'base64').toString('utf8');
    const payload = JSON.parse(payloadJson);
    const role = payload.role;

    // Kicks standard students out of the instructor studio immediately
    if (isInstructorArea && role !== 'INSTRUCTOR') {
       return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    
    // Redirect authenticated users away from login pages
    if (isAuthPage) {
       if (role === 'INSTRUCTOR' && isInstructorAuthPage) {
          return NextResponse.redirect(new URL('/instructor', request.url));
       }
       if (role === 'INSTRUCTOR' && isStudentAuthPage) {
          // If instructor goes to student login, let's take them to instructor dashboard by default
          return NextResponse.redirect(new URL('/instructor', request.url));
       }
       return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } catch {
    // If token parsing fails, ignore. Backend will still protect data if token is invalid.
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
