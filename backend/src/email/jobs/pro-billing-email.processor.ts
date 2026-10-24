import type { ProPlan, ProSubscription } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { evaluateProAccess, LIVE_PRO_STATUSES } from '../../pro/pro-access.service';
import { PRO_PRICES_MINOR } from '../../pro/pro.config';
import { emailConfig } from '../email.config';
import { EmailDispatchService } from '../email-dispatch.service';
import { EmailUnsubscribeService } from '../email-unsubscribe.service';
import {
  PRO_BILLING_EMAIL_KINDS,
  PRO_MARKETING_EMAILS,
  renderProBillingEmail,
  type ProBillingEmailData,
  type ProBillingEmailKind,
} from '../templates/pro/pro-billing.template';
import { EmailCategory } from '../types';
import type { EmailJobRow } from './email-job.repository';
import type { ProcessOutcome } from './email-job-processor.service';

/** What the Pro billing journey (tey/notify) freezes into a job. IDs and hints only. */
export interface ProBillingJobPayload {
  kind: ProBillingEmailKind;
  proSubscriptionId?: string;
  invoiceId?: string;
  amountMinor?: number | null;
  /** ISO: the date the email is about (period end, grace end, access end…). */
  at?: string | null;
  noGrace?: boolean;
  actionUrl?: string | null;
  daysLeft?: number;
  /** Prepaid: the YYYY-MM-DD end day the reminder was queued for. */
  endDay?: string;
  wasTrial?: boolean;
  plan?: ProPlan | null;
}

const DAY_MS = 86_400_000;

export function formatUsd(minor: number | null | undefined): string {
  if (minor == null || !Number.isFinite(minor)) return '';
  return `$${(minor / 100).toFixed(2)}`;
}

/** "Fri, Oct 30" in the learner's timezone (UTC when unknown or invalid). */
export function formatDay(at: Date | string | null | undefined, timeZone?: string | null, withTime = false): string {
  if (!at) return '';
  const d = typeof at === 'string' ? new Date(at) : at;
  if (Number.isNaN(d.getTime())) return '';
  const opts: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    ...(withTime ? { hour: 'numeric', minute: '2-digit' } : {}),
  };
  try {
    return d.toLocaleString('en-US', { ...opts, timeZone: timeZone || 'UTC' });
  } catch {
    return d.toLocaleString('en-US', { ...opts, timeZone: 'UTC' });
  }
}

/** What the card will be charged after a trial: the plan price, less a redeemed offer. */
export function chargeAfterTrialMinor(plan: ProPlan, offer: { plan: ProPlan; percentOff: number } | null): number {
  const base = PRO_PRICES_MINOR[plan];
  return offer && offer.plan === plan ? Math.round(base * (1 - offer.percentOff / 100)) : base;
}

/**
 * Decides whether a queued Pro billing email is still true, then sends it.
 *
 * Every kind re-reads the subscription at send time: a trial reminder for a
 * trial that was cancelled, a failed-payment email for an invoice that has
 * since been paid, or a "come back" email to someone who is already Pro would
 * each be a small lie, and the payload is only ever trusted for IDs.
 */
export async function processProBillingEmail(
  prisma: PrismaService,
  dispatch: EmailDispatchService,
  unsubscribe: EmailUnsubscribeService,
  job: EmailJobRow,
  now = new Date(),
): Promise<ProcessOutcome> {
  const p = job.payload as ProBillingJobPayload | null;
  if (!job.userId || !p?.kind || !PRO_BILLING_EMAIL_KINDS.includes(p.kind)) {
    return { sent: false, skipReason: 'BAD_PAYLOAD' };
  }

  const user = await prisma.user.findUnique({
    where: { id: job.userId },
    select: { id: true, email: true, fullName: true, timezone: true },
  });
  if (!user) return { sent: false, skipReason: 'NOT_FOUND' };

  const sub: ProSubscription | null = p.proSubscriptionId
    ? await prisma.proSubscription.findUnique({ where: { id: p.proSubscriptionId } })
    : null;
  const liveSubs = await prisma.proSubscription.findMany({
    where: { userId: user.id, status: { in: LIVE_PRO_STATUSES } },
  });
  const isProNow = liveSubs.some((s) => evaluateProAccess(s, now).isPro);
  const tz = user.timezone;
  const day = (at: Date | string | null | undefined) => formatDay(at, tz);
  const planOf = (plan: ProPlan | null | undefined) =>
    plan === 'YEARLY' ? ('yearly' as const) : plan === 'MONTHLY' ? ('monthly' as const) : undefined;
  const invoicePaid = async () =>
    !!p.invoiceId &&
    !!(await prisma.proInvoice.findUnique({ where: { providerReference: p.invoiceId }, select: { id: true } }));

  const data: ProBillingEmailData = {
    firstName: user.fullName?.split(' ')[0] || '',
    appUrl: emailConfig.appUrl,
    plan: planOf(sub?.plan ?? p.plan),
    amount: formatUsd(p.amountMinor),
  };
  const skip = (reason: string): ProcessOutcome => ({ sent: false, skipReason: reason });

  switch (p.kind) {
    case 'trial-started':
    case 'trial-reminder': {
      if (!sub || sub.status !== 'TRIALING' || !sub.trialEnd) return skip('NOT_TRIALING');
      if (sub.trialEnd <= now) return skip('TRIAL_OVER');
      // Cancelled during the trial: there is no charge to warn about.
      if (p.kind === 'trial-reminder' && sub.cancelAtPeriodEnd) return skip('WONT_CHARGE');
      const offer = sub.offerId
        ? await prisma.proOffer.findUnique({ where: { id: sub.offerId }, select: { plan: true, percentOff: true } })
        : null;
      data.amount = formatUsd(chargeAfterTrialMinor(sub.plan, offer));
      data.date = day(sub.trialEnd);
      data.reminderDate = day(new Date(sub.trialEnd.getTime() - 2 * DAY_MS));
      if (p.kind === 'trial-reminder' && sub.trialStart) {
        data.trialLessons = await prisma.userLessonProgress.count({
          where: { userId: user.id, status: 'completed', completedAt: { gte: sub.trialStart } },
        });
      }
      break;
    }

    case 'trial-ended':
      if (isProNow) return skip('IS_PRO');
      if (sub?.hasPaid) return skip('HAS_PAID');
      break;

    case 'converted':
      if (!sub || sub.status !== 'ACTIVE') return skip('NOT_ACTIVE');
      data.date = day(sub.currentPeriodEnd);
      break;

    case 'payment-failed':
    case 'action-required':
      if (await invoicePaid()) return skip('ALREADY_PAID');
      if (sub && (sub.status === 'ACTIVE' || sub.status === 'TRIALING')) return skip('RECOVERED');
      data.noGrace = !!p.noGrace;
      if (p.kind === 'payment-failed' && !p.noGrace && sub?.graceUntil && sub.graceUntil > now) {
        data.date = day(sub.graceUntil);
      }
      if (p.kind === 'action-required' && p.actionUrl?.startsWith('https://invoice.stripe.com/')) {
        data.actionUrl = p.actionUrl;
      }
      break;

    case 'access-ended':
      if (isProNow) return skip('IS_PRO');
      break;

    case 'renewal-upcoming':
      if (!sub || sub.status !== 'ACTIVE' || sub.plan !== 'YEARLY' || sub.cancelAtPeriodEnd) {
        return skip('WONT_RENEW');
      }
      data.date = day(sub.currentPeriodEnd);
      break;

    case 'cancel-confirmed':
      if (!sub || !sub.cancelAtPeriodEnd) return skip('NOT_CANCELLED');
      data.wasTrial = !!p.wasTrial;
      data.date = day(sub.status === 'TRIALING' ? sub.trialEnd : sub.currentPeriodEnd);
      break;

    case 'refunded':
      break;

    case 'prepaid-paid':
      data.date = day(p.at ?? sub?.currentPeriodEnd);
      break;

    case 'prepaid-ending': {
      if (!sub || sub.provider !== 'MESOMB' || sub.status !== 'ACTIVE' || !sub.currentPeriodEnd) {
        return skip('NOT_ACTIVE');
      }
      // Renewed since the scan: the end date moved and there's nothing to say.
      if (p.endDay && sub.currentPeriodEnd.toISOString().slice(0, 10) !== p.endDay) return skip('ALREADY_RENEWED');
      if (liveSubs.some((s) => s.provider === 'STRIPE' && evaluateProAccess(s, now).isPro)) return skip('HAS_CARD_PRO');
      data.daysLeft = p.daysLeft;
      data.date = day(sub.currentPeriodEnd);
      break;
    }

    case 'prepaid-ended':
      if (isProNow) return skip('IS_PRO');
      data.date = day(sub?.endedAt ?? sub?.currentPeriodEnd ?? p.at);
      break;

    case 'checkout-recovery':
    case 'decide-later': {
      if (isProNow) return skip('IS_PRO');
      const [offer, trial] = await Promise.all([
        prisma.proOffer.findFirst({
          where: { userId: user.id, status: 'OFFERED', expiresAt: { gt: now } },
          select: { percentOff: true, expiresAt: true },
        }),
        prisma.proTrialClaim.findUnique({ where: { userId: user.id }, select: { status: true } }),
      ]);
      if (offer) data.offer = { percentOff: offer.percentOff, endsAt: formatDay(offer.expiresAt, tz, true) };
      data.trialAvailable = trial?.status !== 'CLAIMED';
      data.unsubscribeUrl = unsubscribe.buildUnsubscribeUrl(user.id, 'MARKETING');
      data.preferencesUrl = unsubscribe.buildPreferencesUrl(user.id);
      break;
    }
  }

  const marketing = PRO_MARKETING_EMAILS.has(p.kind);
  const outcome = await dispatch.dispatch({
    userId: user.id,
    email: user.email,
    templateKey: `pro.${p.kind}`,
    category: marketing ? EmailCategory.CONVERSION : EmailCategory.TRANSACTIONAL,
    idempotencyKey: job.dedupeKey,
    metadata: { kind: p.kind, proSubscriptionId: p.proSubscriptionId ?? null },
    render: () => renderProBillingEmail(p.kind, data),
  });
  return outcome.sent ? { sent: true } : { sent: false, skipReason: outcome.reason };
}
