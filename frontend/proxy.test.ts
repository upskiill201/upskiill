import { proxy } from './proxy';
import { NextRequest, NextResponse } from 'next/server';

jest.mock('next/server', () => {
  return {
    NextResponse: {
      next: jest.fn(() => ({ type: 'next' })),
      redirect: jest.fn((url) => ({ type: 'redirect', url: url.toString() })),
    },
  };
});

describe('proxy middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const createMockRequest = (
    pathname: string,
    tokenValue?: string,
    search = '',
  ): NextRequest => {
    return {
      // Mirrors NextRequest: `search` is always a string, '' when empty.
      nextUrl: { pathname, search },
      url: `http://localhost${pathname}`,
      cookies: {
        get: jest.fn().mockImplementation((name) => {
          if (name === 'access_token' && tokenValue) {
            return { value: tokenValue };
          }
          return undefined;
        }),
      },
    } as unknown as NextRequest;
  };

  const createToken = (payload: Record<string, unknown>) => {
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
    const body = Buffer.from(JSON.stringify(payload)).toString('base64');
    const signature = 'fake-signature';
    return `${header}.${body}.${signature}`;
  };

  describe('Unauthenticated users', () => {
    it('should redirect to /login when accessing /dashboard, preserving the destination', () => {
      // The `next` param is what makes push deep links survive an expired
      // session: without it a learner tapping a streak reminder after their
      // 7-day JWT lapsed lands on a generic dashboard, and the lesson Tey
      // pointed them at is silently lost.
      const req = createMockRequest('/dashboard');
      const res = proxy(req);

      expect(res).toEqual({
        type: 'redirect',
        url: 'http://localhost/login?next=%2Fdashboard',
      });
    });

    it('should wall /learn and carry the deep link through login', () => {
      const req = createMockRequest('/learn/c1/section/2');
      const res = proxy(req);

      expect(res).toEqual({
        type: 'redirect',
        url: 'http://localhost/login?next=%2Flearn%2Fc1%2Fsection%2F2',
      });
    });

    it('should wall /admin', () => {
      const req = createMockRequest('/admin');
      const res = proxy(req);

      expect(res).toEqual({
        type: 'redirect',
        url: 'http://localhost/login?next=%2Fadmin',
      });
    });

    it('should redirect to /creator/login when accessing /creator', () => {
      const req = createMockRequest('/creator');
      const res = proxy(req);

      expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/creator/login', 'http://localhost/creator'));
      expect(res).toEqual({ type: 'redirect', url: 'http://localhost/creator/login' });
    });

    it('should redirect to /creator/login when accessing /creator/settings', () => {
      const req = createMockRequest('/creator/settings');
      const res = proxy(req);

      expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/creator/login', 'http://localhost/creator/settings'));
      expect(res).toEqual({ type: 'redirect', url: 'http://localhost/creator/login' });
    });

    it('should allow access to public routes like /', () => {
      const req = createMockRequest('/');
      const res = proxy(req);

      expect(NextResponse.next).toHaveBeenCalled();
      expect(res).toEqual({ type: 'next' });
    });

    it('should allow access to /login', () => {
      const req = createMockRequest('/login');
      const res = proxy(req);

      expect(NextResponse.next).toHaveBeenCalled();
      expect(res).toEqual({ type: 'next' });
    });
  });

  describe('Invalid Tokens', () => {
    it('should ignore malformed tokens and proceed with NextResponse.next() for public routes', () => {
      const req = createMockRequest('/', 'not-a-valid-jwt');
      const res = proxy(req);

      expect(NextResponse.next).toHaveBeenCalled();
      expect(res).toEqual({ type: 'next' });
    });
  });

  describe('Authenticated Students', () => {
    const studentToken = createToken({ role: 'STUDENT' });

    it('should allow access to /dashboard', () => {
      const req = createMockRequest('/dashboard', studentToken);
      const res = proxy(req);

      expect(NextResponse.next).toHaveBeenCalled();
      expect(res).toEqual({ type: 'next' });
    });

    it('should redirect to /dashboard when accessing instructor areas (/creator)', () => {
      const req = createMockRequest('/creator', studentToken);
      const res = proxy(req);

      expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/dashboard', 'http://localhost/creator'));
      expect(res).toEqual({ type: 'redirect', url: 'http://localhost/dashboard' });
    });

    it('should redirect to /dashboard when accessing /login', () => {
      const req = createMockRequest('/login', studentToken);
      const res = proxy(req);

      expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/dashboard', 'http://localhost/login'));
      expect(res).toEqual({ type: 'redirect', url: 'http://localhost/dashboard' });
    });

    it('should redirect to /dashboard when accessing /signup', () => {
      const req = createMockRequest('/signup', studentToken);
      const res = proxy(req);

      expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/dashboard', 'http://localhost/signup'));
      expect(res).toEqual({ type: 'redirect', url: 'http://localhost/dashboard' });
    });

    it('should redirect to /dashboard when accessing /creator/login', () => {
      const req = createMockRequest('/creator/login', studentToken);
      const res = proxy(req);

      expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/dashboard', 'http://localhost/creator/login'));
      expect(res).toEqual({ type: 'redirect', url: 'http://localhost/dashboard' });
    });
  });

  describe('Authenticated Instructors', () => {
    const instructorToken = createToken({ role: 'INSTRUCTOR' });

    it('should allow access to /creator', () => {
      const req = createMockRequest('/creator', instructorToken);
      const res = proxy(req);

      expect(NextResponse.next).toHaveBeenCalled();
      expect(res).toEqual({ type: 'next' });
    });

    it('should redirect to /creator when accessing /creator/login', () => {
      const req = createMockRequest('/creator/login', instructorToken);
      const res = proxy(req);

      expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/creator', 'http://localhost/creator/login'));
      expect(res).toEqual({ type: 'redirect', url: 'http://localhost/creator' });
    });

    it('should redirect to /creator when accessing /creator/signup', () => {
      const req = createMockRequest('/creator/signup', instructorToken);
      const res = proxy(req);

      expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/creator', 'http://localhost/creator/signup'));
      expect(res).toEqual({ type: 'redirect', url: 'http://localhost/creator' });
    });

    it('should redirect to /creator when accessing student /login', () => {
      const req = createMockRequest('/login', instructorToken);
      const res = proxy(req);

      expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/creator', 'http://localhost/login'));
      expect(res).toEqual({ type: 'redirect', url: 'http://localhost/creator' });
    });

    it('should redirect to /creator when accessing student /signup', () => {
      const req = createMockRequest('/signup', instructorToken);
      const res = proxy(req);

      expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/creator', 'http://localhost/signup'));
      expect(res).toEqual({ type: 'redirect', url: 'http://localhost/creator' });
    });

    it('should allow access to /dashboard (instructors can view student dashboard)', () => {
      const req = createMockRequest('/dashboard', instructorToken);
      const res = proxy(req);

      expect(NextResponse.next).toHaveBeenCalled();
      expect(res).toEqual({ type: 'next' });
    });
  });

  describe('Creator onboarding test route bypass', () => {
    it('should allow unauthenticated access to /creator-onboarding-test', () => {
      const req = createMockRequest('/creator-onboarding-test');
      const res = proxy(req);

      expect(NextResponse.next).toHaveBeenCalled();
      expect(res).toEqual({ type: 'next' });
    });
  });
});
