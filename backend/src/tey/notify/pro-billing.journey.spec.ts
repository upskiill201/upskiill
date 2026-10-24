import { proBillingPush, trialReminderAt } from './pro-billing.journey';
import { chargeAfterTrialMinor, formatUsd } from '../../email/jobs/pro-billing-email.processor';
import { renderProBillingEmail, PRO_BILLING_EMAIL_KINDS } from '../../email/templates/pro/pro-billing.template';

const HOUR = 3_600_000;

describe('trialReminderAt — the paywall promises a reminder two days before the charge', () => {
  const now = new Date('2026-10-23T12:00:00Z');

  it('lands 48h before the end when that is daytime', () => {
    const end = new Date('2026-10-30T14:00:00Z'); // 48h before = Oct 28 14:00 UTC
    expect(trialReminderAt(end, 0, now)?.toISOString()).toBe('2026-10-28T14:00:00.000Z');
  });

  it('moves a night-time reminder into daytime but stays at least 20h before the charge', () => {
    const end = new Date('2026-10-30T02:00:00Z'); // 48h before = 02:00, night
    const at = trialReminderAt(end, 0, now)!;
    expect(at.getUTCHours()).toBeGreaterThanOrEqual(8);
    expect(end.getTime() - at.getTime()).toBeGreaterThanOrEqual(20 * HOUR);
  });

  it('reminds straight away when the trial is already inside 48h', () => {
    const end = new Date(now.getTime() + 30 * HOUR);
    const at = trialReminderAt(end, 0, now)!;
    expect(at.getTime()).toBeGreaterThanOrEqual(now.getTime());
    expect(end.getTime() - at.getTime()).toBeGreaterThanOrEqual(20 * HOUR);
  });

  it('skips when the charge is under 20h away', () => {
    expect(trialReminderAt(new Date(now.getTime() + 10 * HOUR), 0, now)).toBeNull();
  });
});

describe('Pro billing copy', () => {
  it('charges the plan price, less a redeemed offer for that plan only', () => {
    expect(formatUsd(chargeAfterTrialMinor('YEARLY', null))).toBe('$59.99');
    expect(formatUsd(chargeAfterTrialMinor('YEARLY', { plan: 'YEARLY', percentOff: 30 }))).toBe('$41.99');
    expect(formatUsd(chargeAfterTrialMinor('MONTHLY', { plan: 'YEARLY', percentOff: 30 }))).toBe('$12.99');
  });

  it('puts the real amount and date in the trial reminder push', () => {
    const p = proBillingPush('trial-reminder', { amount: '$59.99', date: 'Fri, Oct 30' });
    expect(p.title).toContain('Fri, Oct 30');
    expect(p.body).toContain('$59.99');
  });

  it('renders every email kind with a subject and escapes the name', () => {
    for (const kind of PRO_BILLING_EMAIL_KINDS) {
      const e = renderProBillingEmail(kind, {
        firstName: '<b>Ada</b>',
        appUrl: 'https://teyro.app',
        amount: '$59.99',
        date: 'Fri, Oct 30',
        plan: 'yearly',
        daysLeft: 3,
      });
      expect(e.subject.length).toBeGreaterThan(5);
      expect(e.html).not.toContain('<b>Ada</b>');
    }
  });

  it('never tells a trialist they will be charged in the cancellation email', () => {
    const e = renderProBillingEmail('cancel-confirmed', { firstName: 'Ada', appUrl: 'https://teyro.app', date: 'Fri, Oct 30', wasTrial: true });
    expect(e.subject).toContain("won't be charged");
  });
});
