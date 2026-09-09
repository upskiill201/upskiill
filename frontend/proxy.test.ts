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

    /* ── Token-holders are passed through, NOT bounced ──
     *
     * These four used to assert a redirect. The middleware deliberately
     * stopped doing that: it runs in the Edge Runtime, where it cannot make
     * the DB call needed to tell a student from a creator, so bouncing every
     * token-holder off an auth page caused an INFINITE LOOP — a student opens
     * /creator/login, the middleware sends them to /creator, the creator
     * layout sends them back to /creator/login, forever.
     *
     * The "already logged in, go to your dashboard" behaviour still exists;
     * it moved to the page/layout level where the user's actual access can be
     * checked. Do not restore a redirect here to make these pass.
     */
    it('passes a token-holder through to /creator instead of bouncing them', () => {
      const req = createMockRequest('/creator', studentToken);
      const res = proxy(req);

      expect(NextResponse.redirect).not.toHaveBeenCalled();
      expect(res).toEqual({ type: 'next' });
    });

    it('passes a token-holder through to /login (the page handles it)', () => {
      const req = createMockRequest('/login', studentToken);
      const res = proxy(req);

      expect(NextResponse.redirect).not.toHaveBeenCalled();
      expect(res).toEqual({ type: 'next' });
    });

    it('passes a token-holder through to /signup (the page handles it)', () => {
      const req = createMockRequest('/signup', studentToken);
      const res = proxy(req);

      expect(NextResponse.redirect).not.toHaveBeenCalled();
      expect(res).toEqual({ type: 'next' });
    });

    it('passes a token-holder through to /creator/login without looping', () => {
      const req = createMockRequest('/creator/login', studentToken);
      const res = proxy(req);

      expect(NextResponse.redirect).not.toHaveBeenCalled();
      expect(res).toEqual({ type: 'next' });
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

    /* Same rule as for students: the middleware cannot tell roles apart in the
     * Edge Runtime, so it passes every token-holder through and lets the
     * destination page decide. See the note above. */
    it('passes a token-holder through to /creator/login without looping', () => {
      const req = createMockRequest('/creator/login', instructorToken);
      const res = proxy(req);

      expect(NextResponse.redirect).not.toHaveBeenCalled();
      expect(res).toEqual({ type: 'next' });
    });

    it('passes a token-holder through to /creator/signup', () => {
      const req = createMockRequest('/creator/signup', instructorToken);
      const res = proxy(req);

      expect(NextResponse.redirect).not.toHaveBeenCalled();
      expect(res).toEqual({ type: 'next' });
    });

    it('passes a token-holder through to student /login', () => {
      const req = createMockRequest('/login', instructorToken);
      const res = proxy(req);

      expect(NextResponse.redirect).not.toHaveBeenCalled();
      expect(res).toEqual({ type: 'next' });
    });

    it('passes a token-holder through to student /signup', () => {
      const req = createMockRequest('/signup', instructorToken);
      const res = proxy(req);

      expect(NextResponse.redirect).not.toHaveBeenCalled();
      expect(res).toEqual({ type: 'next' });
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
