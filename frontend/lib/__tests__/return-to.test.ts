import { sanitizeNextPath, sanitizeReturnTo } from '../return-to';

/**
 * Open-redirect guards for the `next` param proxy.ts attaches when it bounces
 * a token-less request to /login.
 *
 * This param is reachable by anyone who can get a learner to click a link, so
 * it is attacker-controlled input by definition.
 */
describe('sanitizeNextPath', () => {
  it('preserves the learner surfaces a notification can point at', () => {
    expect(sanitizeNextPath('/dashboard')).toBe('/dashboard');
    expect(sanitizeNextPath('/learn/c1/section/2')).toBe('/learn/c1/section/2');
    expect(sanitizeNextPath('/admin')).toBe('/admin');
  });

  it('keeps the query string, which carries the deep link itself', () => {
    // Dropping this would strip ?lesson= and land the learner on the section
    // rather than the lesson Tey actually nudged them about.
    expect(sanitizeNextPath('/learn/c1/section/2?lesson=l9&tey=d1')).toBe(
      '/learn/c1/section/2?lesson=l9&tey=d1',
    );
  });

  it('handles a URL-encoded value', () => {
    expect(sanitizeNextPath('%2Fdashboard')).toBe('/dashboard');
  });

  it.each([
    ['protocol-relative', '//evil.example'],
    ['absolute http', 'http://evil.example'],
    ['absolute https', 'https://evil.example/dashboard'],
    ['scheme-ish', 'javascript:alert(1)'],
    ['bare path', 'dashboard'],
    ['backslash trick', '/\\evil.example'],
  ])('rejects %s', (_label, value) => {
    expect(sanitizeNextPath(value)).toBe('/dashboard');
  });

  it('rejects whitespace and angle brackets', () => {
    expect(sanitizeNextPath('/dash\tboard')).toBe('/dashboard');
    expect(sanitizeNextPath('/dashboard<script>')).toBe('/dashboard');
    expect(sanitizeNextPath('/ dashboard')).toBe('/dashboard');
  });

  it('rejects an in-app path that is not on the allowlist', () => {
    // /creator has its own login wall; bouncing a student there would loop.
    expect(sanitizeNextPath('/creator/courses')).toBe('/dashboard');
    expect(sanitizeNextPath('/checkout')).toBe('/dashboard');
  });

  it('does not let a prefix be spoofed by a longer segment', () => {
    // '/learnevil' must not pass just because it starts with '/learn'.
    expect(sanitizeNextPath('/learnevil')).toBe('/dashboard');
    expect(sanitizeNextPath('/dashboardevil')).toBe('/dashboard');
  });

  it('falls back for empty and malformed input', () => {
    expect(sanitizeNextPath(null)).toBe('/dashboard');
    expect(sanitizeNextPath(undefined)).toBe('/dashboard');
    expect(sanitizeNextPath('')).toBe('/dashboard');
    // A lone % is not valid percent-encoding and throws in decodeURIComponent.
    expect(sanitizeNextPath('%')).toBe('/dashboard');
  });

  it('honours a caller-supplied fallback', () => {
    expect(sanitizeNextPath('//evil.example', '/learn')).toBe('/learn');
  });
});

describe('sanitizeReturnTo', () => {
  it('keeps a lesson route and home', () => {
    expect(sanitizeReturnTo('/learn/c1/section/2?lesson=l9', 'c1')).toBe('/learn/c1/section/2?lesson=l9');
    expect(sanitizeReturnTo('/dashboard?course=c1', 'c1')).toBe('/dashboard?course=c1');
  });

  it('falls back to home on this course — there is no course map any more', () => {
    expect(sanitizeReturnTo(null, 'c1')).toBe('/dashboard?course=c1');
    expect(sanitizeReturnTo('//evil.example', 'c1')).toBe('/dashboard?course=c1');
    expect(sanitizeReturnTo('/dashboardevil', 'c1')).toBe('/dashboard?course=c1');
    expect(sanitizeReturnTo('/creator/courses')).toBe('/dashboard');
  });
});
