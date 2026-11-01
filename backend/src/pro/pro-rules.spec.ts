import { evaluateProAccess } from './pro-access.service';
import { mapStripeStatus } from './pro-subscription-sync.service';
import { routeExitReason } from './pro-paywall.service';
import { liveKeyAllowedOnStaging, stripeKeyProblem } from './stripe/stripe-pro.client';
import { plansView } from './pro.controller';
import { bannerFor } from './pro-status';
import { declineMessage } from './decline-messages';
import { periodOf, servicePeriodOfInvoice, subscriptionIdOfInvoice } from './stripe/stripe-readers';

const NOW = new Date('2026-11-10T12:00:00Z');
const H = 60 * 60 * 1000;
const at = (ms: number) => new Date(NOW.getTime() + ms);

const sub = (over: Partial<Parameters<typeof evaluateProAccess>[0] & object>) => ({
  id: 's1',
  status: 'ACTIVE' as const,
  plan: 'YEARLY' as const,
  provider: 'STRIPE' as const,
  trialEnd: null,
  currentPeriodEnd: null,
  cancelAtPeriodEnd: false,
  autoRenew: true,
  graceUntil: null,
  ...over,
});

describe('evaluateProAccess (status × time)', () => {
  it('no subscription means no Pro', () => {
    expect(evaluateProAccess(null, NOW).isPro).toBe(false);
  });

  it('a trial grants access until it ends, plus a short slack for late webhooks', () => {
    const s = sub({ status: 'TRIALING', trialEnd: at(-1 * H) });
    expect(evaluateProAccess(s, NOW).isPro).toBe(true); // within the 3h slack
    expect(evaluateProAccess(sub({ status: 'TRIALING', trialEnd: at(-4 * H) }), NOW).isPro).toBe(false);
  });

  it('active card Pro keeps a 48h renewal slack; prepaid Mobile Money gets none', () => {
    expect(evaluateProAccess(sub({ currentPeriodEnd: at(-24 * H) }), NOW).isPro).toBe(true);
    expect(
      evaluateProAccess(sub({ provider: 'MESOMB', currentPeriodEnd: at(-1 * H) }), NOW).isPro,
    ).toBe(false);
  });

  it('past due keeps access only inside the grace window', () => {
    const inGrace = evaluateProAccess(sub({ status: 'PAST_DUE', graceUntil: at(2 * 24 * H) }), NOW);
    expect(inGrace).toMatchObject({ isPro: true, inGrace: true });
    expect(evaluateProAccess(sub({ status: 'PAST_DUE', graceUntil: at(-1) }), NOW).isPro).toBe(false);
    expect(evaluateProAccess(sub({ status: 'PAST_DUE', graceUntil: null }), NOW).isPro).toBe(false);
  });

  it('canceled, expired and incomplete never grant access', () => {
    for (const status of ['CANCELED', 'EXPIRED', 'INCOMPLETE'] as const) {
      expect(evaluateProAccess(sub({ status, currentPeriodEnd: at(30 * 24 * H) }), NOW).isPro).toBe(false);
    }
  });

  it('cancel-at-period-end keeps access but reports no auto-renew', () => {
    const a = evaluateProAccess(sub({ currentPeriodEnd: at(10 * 24 * H), cancelAtPeriodEnd: true }), NOW);
    expect(a).toMatchObject({ isPro: true, autoRenew: false, cancelAtPeriodEnd: true });
  });
});

describe('mapStripeStatus (grace rule)', () => {
  it('maps the happy statuses', () => {
    expect(mapStripeStatus('trialing', { hasPaid: false, existingGraceUntil: null }).status).toBe('TRIALING');
    expect(mapStripeStatus('active', { hasPaid: true, existingGraceUntil: null }).status).toBe('ACTIVE');
    expect(mapStripeStatus('canceled', { hasPaid: true, existingGraceUntil: null }).status).toBe('CANCELED');
    expect(mapStripeStatus('incomplete_expired', { hasPaid: false, existingGraceUntil: null }).status).toBe('EXPIRED');
  });

  it('a failed renewal of a paying subscriber gets 7 days of grace', () => {
    const r = mapStripeStatus('past_due', { hasPaid: true, existingGraceUntil: null, now: NOW });
    expect(r.status).toBe('PAST_DUE');
    expect(r.graceUntil!.getTime() - NOW.getTime()).toBe(7 * 24 * H);
  });

  it('a failed first charge after a trial gets no grace, so a dead card never extends the trial', () => {
    const r = mapStripeStatus('past_due', { hasPaid: false, existingGraceUntil: null, now: NOW });
    expect(r.graceUntil!.getTime()).toBe(NOW.getTime());
  });

  it('keeps the original grace end across repeated failures', () => {
    const first = at(3 * 24 * H);
    expect(mapStripeStatus('past_due', { hasPaid: true, existingGraceUntil: first, now: NOW }).graceUntil).toBe(first);
  });
});

describe('routeExitReason (ask why, then answer it)', () => {
  it('saves the discount for "too expensive" and only while it is available', () => {
    expect(routeExitReason('TOO_EXPENSIVE', true)).toBe('DISCOUNT_OFFER');
    expect(routeExitReason('TOO_EXPENSIVE', false)).toBe('MONTHLY_PLAN');
  });
  it('routes every other answer without a discount', () => {
    expect(routeExitReason('NOT_SURE', true)).toBe('PROOF');
    expect(routeExitReason('JUST_LOOKING', true)).toBe('LET_IN');
    expect(routeExitReason('DECIDE_LATER', true)).toBe('REMINDER');
    expect(routeExitReason('OTHER', true)).toBe('THANKS');
  });
});

describe('stripeKeyProblem (never charge real cards while testing)', () => {
  it('refuses a live key outside production', () => {
    expect(stripeKeyProblem('sk_live_abc', false, false)).toMatch(/LIVE/);
  });
  it('takes a live key on staging only after the opt-in', () => {
    expect(stripeKeyProblem('sk_live_abc', false, true)).toBeNull();
    expect(stripeKeyProblem('sk_test_abc', false, true)).toBeNull();
  });
  it('opts in only on the deployed staging service, never on a laptop', () => {
    const staging = { ENVIRONMENT: 'staging', RENDER: 'true', STRIPE_ALLOW_LIVE_KEY: 'true' };
    expect(liveKeyAllowedOnStaging(staging)).toBe(true);
    expect(liveKeyAllowedOnStaging({ ...staging, RENDER: undefined })).toBe(false);
    expect(liveKeyAllowedOnStaging({ ...staging, ENVIRONMENT: 'production' })).toBe(false);
    expect(liveKeyAllowedOnStaging({ ...staging, ENVIRONMENT: undefined })).toBe(false);
    expect(liveKeyAllowedOnStaging({ ...staging, STRIPE_ALLOW_LIVE_KEY: 'yes' })).toBe(false);
  });
  it('refuses a test key in production', () => {
    expect(stripeKeyProblem('sk_test_abc', true)).toMatch(/TEST/);
  });
  it('accepts matching modes and rejects junk', () => {
    expect(stripeKeyProblem('sk_test_abc', false)).toBeNull();
    expect(stripeKeyProblem('sk_live_abc', true)).toBeNull();
    expect(stripeKeyProblem(undefined, false)).toMatch(/not set/);
    expect(stripeKeyProblem('pk_test_abc', false)).toMatch(/not a Stripe secret/);
  });
});

describe('plansView (every number is computed, never rounded in our favour)', () => {
  it('shows yearly at $5.00 a month and an honest saving', () => {
    const [yearly, monthly] = plansView();
    expect(yearly).toMatchObject({ plan: 'YEARLY', priceMinor: 5999, perMonthMinor: 500 });
    // 1 − 59.99 / (12.99 × 12) = 61.5%, shown as 61, never 62
    expect(yearly.savingsPct).toBe(61);
    expect(monthly).toMatchObject({ plan: 'MONTHLY', priceMinor: 1299 });
  });
});

describe('bannerFor', () => {
  const access = (over: object) => ({ ...evaluateProAccess(null), ...over });
  it('puts a failed payment first', () => {
    expect(bannerFor(access({ status: 'PAST_DUE', inGrace: true, graceUntil: at(H) }), null, NOW)).toMatchObject({
      type: 'PAYMENT_FAILED',
    });
  });
  it('reminds in the last 48h of a trial, not before', () => {
    const ending = access({ isPro: true, status: 'TRIALING', trialEndsAt: at(40 * H) });
    expect(bannerFor(ending, null, NOW)).toMatchObject({ type: 'TRIAL_ENDING' });
    const early = access({ isPro: true, status: 'TRIALING', trialEndsAt: at(5 * 24 * H) });
    expect(bannerFor(early, null, NOW)).toBeNull();
  });
});

describe('declineMessage', () => {
  it('is specific for honest mistakes and generic for fraud codes', () => {
    expect(declineMessage('card_declined', 'insufficient_funds')).toMatch(/enough funds/);
    expect(declineMessage('card_declined', 'stolen_card')).toBe(declineMessage('card_declined', 'fraudulent'));
    expect(declineMessage('card_declined', 'stolen_card')).not.toMatch(/stolen/i);
  });
});

describe('stripe readers (dahlia and older shapes)', () => {
  it('reads the period from subscription items first', () => {
    const p = periodOf({ items: { data: [{ current_period_start: 100, current_period_end: 200 }] } });
    expect(p.end!.getTime()).toBe(200_000);
    expect(periodOf({ current_period_end: 300 }).end!.getTime()).toBe(300_000);
  });
  it('finds an invoice subscription under parent or at the top level', () => {
    expect(subscriptionIdOfInvoice({ parent: { subscription_details: { subscription: 'sub_new' } } })).toBe('sub_new');
    expect(subscriptionIdOfInvoice({ subscription: 'sub_old' })).toBe('sub_old');
  });
  it('uses the line item period, not the invoice dates', () => {
    const p = servicePeriodOfInvoice({
      period_start: 1,
      period_end: 2,
      lines: { data: [{ period: { start: 10, end: 20 } }] },
    });
    expect(p.start!.getTime()).toBe(10_000);
  });
});
