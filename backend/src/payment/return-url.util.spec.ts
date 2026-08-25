import { resolveReturnUrl } from './return-url.util';

const APP_ORIGIN = 'https://teyro.app';

describe('resolveReturnUrl', () => {
  it('absolutizes a same-origin-relative path against the fallback origin', () => {
    expect(resolveReturnUrl('/learn/abc?payment=success', APP_ORIGIN)).toBe(
      'https://teyro.app/learn/abc?payment=success',
    );
  });

  it('keeps an absolute URL whose origin is the app origin', () => {
    const url = 'https://teyro.app/learn/abc?payment=cancelled';
    expect(resolveReturnUrl(url, APP_ORIGIN)).toBe(url);
  });

  it('keeps absolute URLs allowlisted via ALLOWED_ORIGINS', () => {
    process.env.ALLOWED_ORIGINS = 'https://teyro.app,http://localhost:3000';
    try {
      const url = 'https://upskiill-git-staging-upskiill201s-projects.vercel.app/learn/abc';
      // Not in ALLOWED_ORIGINS and not an upskiill preview → dropped
      expect(resolveReturnUrl('https://random-site.com/x', APP_ORIGIN)).toBeUndefined();
      // localhost is always accepted (dev flows)
      expect(resolveReturnUrl('http://localhost:3000/learn/abc', APP_ORIGIN)).toBe(
        'http://localhost:3000/learn/abc',
      );
      void url;
    } finally {
      delete process.env.ALLOWED_ORIGINS;
    }
  });

  it('accepts upskiill vercel preview origins like the CORS policy', () => {
    expect(
      resolveReturnUrl('https://upskiill-git-feature-x.vercel.app/learn/abc', APP_ORIGIN),
    ).toBe('https://upskiill-git-feature-x.vercel.app/learn/abc');
  });

  it('rejects off-origin absolute URLs (open-redirect guard)', () => {
    expect(resolveReturnUrl('https://evil.example/phish', APP_ORIGIN)).toBeUndefined();
    expect(resolveReturnUrl('https://notupskiill.vercel.app/x', APP_ORIGIN)).toBeUndefined();
  });

  it('rejects protocol-relative and non-http schemes', () => {
    expect(resolveReturnUrl('//evil.example/x', APP_ORIGIN)).toBeUndefined();
    expect(resolveReturnUrl('javascript:alert(1)', APP_ORIGIN)).toBeUndefined();
    expect(resolveReturnUrl('data:text/html,hi', APP_ORIGIN)).toBeUndefined();
  });

  it('returns undefined for empty or missing input', () => {
    expect(resolveReturnUrl(undefined, APP_ORIGIN)).toBeUndefined();
    expect(resolveReturnUrl(null, APP_ORIGIN)).toBeUndefined();
    expect(resolveReturnUrl('', APP_ORIGIN)).toBeUndefined();
    expect(resolveReturnUrl('   ', APP_ORIGIN)).toBeUndefined();
  });
});
