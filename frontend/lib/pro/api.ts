/**
 * Teyro Pro client API. Every call goes through the same-origin /api proxy so
 * the httpOnly session cookie travels with it.
 */

export type ProPlan = 'MONTHLY' | 'YEARLY';

export type PaywallMoment =
  | 'ONBOARDING'
  | 'LOCKED_LESSON'
  | 'DAILY_LIMIT'
  | 'OUT_OF_HEARTS'
  | 'AFTER_SUCCESS'
  | 'RETURN_AFTER_BREAK'
  | 'DEEP_LINK'
  | 'SETTINGS'
  | 'STREAK_REPAIR';

export interface PlanView {
  plan: ProPlan;
  priceMinor: number;
  interval: 'year' | 'month';
  perMonthMinor: number;
  savingsPct: number;
}

export interface OfferView {
  id: string;
  plan: ProPlan;
  percentOff: number;
  firstYearMinor: number;
  renewalMinor: number;
  expiresAt: string;
}

export interface ProPlans {
  enabled: boolean;
  checkoutReady: boolean;
  currency: 'USD';
  trialDays: number;
  trialEligible: boolean;
  plans: PlanView[];
  offer: OfferView | null;
  mobileMoney: { enabled: boolean; trial: boolean; autoRenew: boolean };
}

export interface FreeTier {
  cap: number;
  usedToday: number;
  remaining: number;
  resetsAt: string;
  freeCourseId: string | null;
}

export type ProBanner =
  | { type: 'TRIAL_ENDING'; at: string }
  | { type: 'PAYMENT_FAILED'; graceUntil: string | null }
  | { type: 'CANCELED_ENDING'; at: string | null }
  | { type: 'ACCESS_PAUSED' }
  | { type: 'PREPAID_ENDING'; at: string };

export interface ProStatus {
  enabled: boolean;
  isPro: boolean;
  status: string | null;
  plan: ProPlan | null;
  provider: 'STRIPE' | 'MESOMB' | null;
  trialEndsAt: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  autoRenew: boolean;
  inGrace: boolean;
  graceUntil: string | null;
  accessUntil: string | null;
  banner: ProBanner | null;
  recovery: { attemptId: string; plan: ProPlan } | null;
  offer: OfferView | null;
}

export interface CheckoutResult {
  attemptId: string;
  intentType: 'setup' | 'payment';
  status: 'succeeded' | 'requires_action' | 'requires_confirmation';
  clientSecret?: string;
  trial: boolean;
  trialEndsAt?: string | null;
  amountDueTodayMinor: number;
}

/** An API error with the server's code and any extra fields (reason, next, …). */
export class ProApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code: string,
    readonly body: Record<string, unknown>,
  ) {
    super(message);
  }
}

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, {
    credentials: 'include',
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
  });
  const body = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok) {
    const err = (body.error ?? {}) as { code?: string; message?: string };
    throw new ProApiError(
      err.message || 'Something went wrong. Please try again.',
      res.status,
      err.code || String(res.status),
      body,
    );
  }
  return body as T;
}

const post = <T>(path: string, body: unknown) =>
  call<T>(path, { method: 'POST', body: JSON.stringify(body) });

export const proApi = {
  plans: () => call<ProPlans>('/pro/plans'),
  status: () => call<ProStatus>('/pro/status'),
  subscribe: (body: {
    plan: ProPlan;
    confirmationTokenId: string;
    attemptId: string;
    expectTrial: boolean;
    offerId?: string;
    paywallSessionId?: string;
    moment?: PaywallMoment;
    returnPath?: string;
  }) => post<CheckoutResult>('/pro/subscribe', body),
  finalize: (attemptId: string) => post<ProStatus>('/pro/subscribe/finalize', { attemptId }),
  mobileMoney: (body: { plan: ProPlan; phone: string; service: string; country?: string }) =>
    post<{ status: 'ACTIVE' | 'PENDING'; message: string }>('/pro/mobile-money', body),
  exitSurvey: (body: {
    sessionId: string;
    reason: ExitReason;
    freeText?: string;
    plan?: ProPlan;
    moment?: PaywallMoment;
  }) =>
    post<{
      route: ExitRoute;
      offer: OfferView | null;
      remindAt: string | null;
      proof?: { lessonsCompletedThisWeek: number | null; learnersThisWeek: number | null } | null;
    }>('/pro/exit-survey', body),
  portal: (flow?: 'payment_method_update' | 'manage', returnPath?: string) =>
    post<{ url: string }>('/pro/portal', { flow, returnPath }),
};

export type ExitReason = 'TOO_EXPENSIVE' | 'NOT_SURE' | 'JUST_LOOKING' | 'DECIDE_LATER' | 'OTHER';
export type ExitRoute = 'DISCOUNT_OFFER' | 'MONTHLY_PLAN' | 'PROOF' | 'LET_IN' | 'REMINDER' | 'THANKS';

export type PaywallEventType =
  | 'VIEW'
  | 'CLOSE'
  | 'PLAN_SELECT'
  | 'SHEET_OPEN'
  | 'SHEET_CLOSE'
  | 'PAYMENT_SUBMIT'
  | 'PAYMENT_FAILED'
  | 'PAYMENT_SUCCEEDED'
  | 'OFFER_SHOWN'
  | 'OFFER_ACCEPTED'
  | 'OFFER_DISMISSED'
  | 'RECOVERY_SHOWN'
  | 'RECOVERY_ACCEPTED'
  | 'RECOVERY_DISMISSED'
  | 'SURVEY_SHOWN'
  | 'MOBILE_MONEY_OPEN';

export interface PaywallNext {
  type: 'EXIT_SURVEY' | 'LEAVE' | 'RECOVERY';
  plan?: ProPlan;
  smallerPlan?: ProPlan | null;
  offer?: OfferView | null;
}

/**
 * Records one paywall event. Analytics must never break the paywall, so
 * failures resolve to null; CLOSE and SHEET_CLOSE return what to show next.
 */
export async function trackPaywall(event: {
  sessionId: string;
  moment: PaywallMoment;
  type: PaywallEventType;
  plan?: ProPlan;
  offerId?: string;
  attemptId?: string;
  errorCode?: string;
  declineCode?: string;
  meta?: Record<string, unknown>;
}): Promise<PaywallNext | null> {
  try {
    const res = await post<{ ok: true; next?: PaywallNext }>('/pro/paywall-events', {
      events: [{ ...event, clientTs: new Date().toISOString() }],
    });
    return res.next ?? null;
  } catch {
    return null;
  }
}

/** UUID v4 for checkout attempts and paywall sessions. */
export function newId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}
