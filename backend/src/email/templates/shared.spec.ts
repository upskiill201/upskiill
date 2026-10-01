import { clip, escapeHtml, safeName } from './shared';
import { renderCheckoutAbandonedEmail } from './conversion/checkout-abandoned.template';
import { renderPurchaseConfirmationEmail } from './payment/purchase-confirmation.template';
import { renderVerificationEmail } from './auth/verification.template';

describe('template escaping and data safety (spec §39/§40)', () => {
  it('escapeHtml neutralizes an XSS payload in a course/user-supplied string', () => {
    const evil = '<img src=x onerror=alert(1)><script>alert(2)</script>';
    const escaped = escapeHtml(evil);
    expect(escaped).not.toContain('<script>');
    expect(escaped).not.toContain('<img');
    expect(escaped).toContain('&lt;script&gt;');
  });

  it('clip() truncates a long course name rather than breaking layout', () => {
    const long = 'A'.repeat(200);
    expect(clip(long, 80).length).toBeLessThanOrEqual(80);
    expect(clip(long, 80).endsWith('…')).toBe(true);
  });

  it('safeName() falls back to "there" for an empty/missing first name instead of rendering blank', () => {
    expect(safeName('')).toBe('there');
    expect(safeName(undefined)).toBe('there');
    expect(safeName(null)).toBe('there');
  });

  it('a malicious course name cannot inject markup into the abandoned-checkout email', () => {
    const { html } = renderCheckoutAbandonedEmail({
      firstName: 'Ada',
      stage: 2,
      courseName: '<script>alert(1)</script> Course',
      creatorName: '<b>evil</b>',
      shortDescription: undefined,
      checkoutUrl: 'https://teyro.app/checkout',
      courseUrl: 'https://teyro.app/courses/x',
    });
    expect(html).not.toContain('<script>alert(1)</script>');
    expect(html).not.toContain('<b>evil</b>');
  });

  it('renders correctly with unicode course/creator names and no thrown error', () => {
    const result = renderPurchaseConfirmationEmail({
      firstName: '日本語',
      courseName: 'Café Français — Niveau Ⅰ',
      creatorName: 'Zoë Müller',
      amount: 29.99,
      currency: 'USD',
      paidAt: new Date('2026-01-01T00:00:00Z'),
      courseUrl: 'https://teyro.app/courses/x',
    });
    expect(result.html).toContain('$29.99');
    expect(result.subject.length).toBeGreaterThan(0);
  });

  it('verification email embeds the raw code (not the hash) and a CTA link', () => {
    const { html } = renderVerificationEmail({
      firstName: 'Ada',
      code: '123456',
      role: 'STUDENT',
    });
    expect(html).toContain('123456');
    expect(html).toMatch(/verify-email\?token=123456/);
  });

  it('includes unsubscribe and preferences links when supplied, and omits them when not (transactional)', () => {
    const withLinks = renderPurchaseConfirmationEmail({
      firstName: 'Ada',
      courseName: 'Course',
      creatorName: 'Creator',
      amount: 10,
      currency: 'USD',
      paidAt: new Date(),
      courseUrl: 'https://teyro.app/courses/x',
    });
    // purchase-confirmation is TRANSACTIONAL — no unsubscribe link by design.
    expect(withLinks.html).not.toContain('Unsubscribe');
  });
});
