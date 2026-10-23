import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Cron } from '@nestjs/schedule';
import type { ProPlan, ProSubscription } from '@prisma/client';
import { DAY, HOUR, toDaytime } from '../../common/nag-cadence';
import { emailConfig } from '../../email/email.config';
import { EmailJobRepository } from '../../email/jobs/email-job.repository';
import {
  chargeAfterTrialMinor,
  formatDay,
  formatUsd,
  type ProBillingJobPayload,
} from '../../email/jobs/pro-billing-email.processor';
import type { ProBillingEmailKind } from '../../email/templates/pro/pro-billing.template';
import { PrismaService } from '../../prisma/prisma.service';
import { evaluateProAccess, LIVE_PRO_STATUSES } from '../../pro/pro-access.service';
import { PRO_TRIAL_REMINDER_HOURS_BEFORE } from '../../pro/pro.config';
import type { TeyReason } from '../contracts/tey-context.types';
import { TeyActionRepository, ScheduledActionRow } from '../scheduler/tey-action.repository';
import { resolveLocalNow } from '../state/local-time.util';
import { TeyNotifyService } from './tey-notify.service';

/** Pseudo rule id for Pro billing steps in tey_scheduled_actions. */
export const PRO_BILLING = 'PRO_BILLING';

/** Pushes that wait for a time of day, re-checked by `process`. */
type TimedPush = 'trial-reminder' | 'checkout-recovery' | 'decide-later' | 'prepaid-ending';

/** Prepaid Mobile Money Pro: reminders this many days before it ends. */
export const PREPAID_ENDING_DAYS = [3, 1] as const;

/** At most one "still want Pro?" email per learner in this window. */
const RECOVERY_WINDOW_MS = 7 * DAY;
/** Give someone who just backed out a few hours before asking. */
const RECOVERY_DELAY_MS = 3 * HOUR;

/**
 * Teyro Pro, after the paywall: every message about a learner's trial, card
 * and plan. Email, the bell and (where it earns it) a push, in Tey's voice.
 *
 *   trial started → reminder 48–24h before the charge → converted / ended
 *   card declined, bank wants a yes, Pro ended, yearly renews soon,
 *   cancellation confirmed, refunded, Mobile Money paid / ending / ended,
 *   and two nudges: checkout recovery and the "decide later" they asked for.
 *
 * The trial reminder is the promise the paywall makes ("Day 5: we remind
 * you"), so it is scheduled the moment the trial starts and Stripe's own
 * trial_will_end is only a backstop. Every send is re-checked against the
 * live subscription (emails in the email processor, pushes in `process`), so
 * nobody is warned about a charge that will not happen or asked to buy what
 * they already have. Money messages are transactional (always email, push
 * not capped); the two nudges are offers and obey the offers toggle.
 */
@Injectable()
export class ProBillingJourney {
  private readonly logger = new Logger(ProBillingJourney.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly actions: TeyActionRepository,
    private readonly hub: TeyNotifyService,
    private readonly emailJobs: EmailJobRepository,
  ) {}

  // ── Events ─────────────────────────────────────────────────────────────

  @OnEvent('pro.trial_started', { async: true })
  async onTrialStarted(e: { userId: string; plan: ProPlan; trialEnd: Date | null; amountAfterTrialMinor: number }) {
    await this.safely('trial_started', async () => {
      const sub = await this.prisma.proSubscription.findFirst({
        where: { userId: e.userId, status: 'TRIALING' },
        orderBy: { createdAt: 'desc' },
      });
      if (!sub?.trialEnd) return;
      const tz = await this.timezoneOf(e.userId);
      await this.email(e.userId, 'trial-started', sub.id, { proSubscriptionId: sub.id, plan: sub.plan });
      await this.hub.notify({
        userId: e.userId,
        kind: 'PRO_BILLING',
        title: 'Your Pro trial is on',
        body: `It ends ${formatDay(sub.trialEnd, tz)}. I'll remind you two days before.`,
        url: '/dashboard',
        dedupeKey: `pro:trial-started:${sub.id}`,
        inbox: { type: 'TEY_PRO_BILLING', entityType: 'ProSubscription', entityId: sub.id },
        push: false,
      });
      await this.scheduleTrialReminder(sub);
    });
  }

  /** Stripe's 3-day warning: makes sure our own reminder is queued. */
  @OnEvent('pro.trial_will_end', { async: true })
  async onTrialWillEnd(e: { userId: string; subscriptionId: string }) {
    await this.safely('trial_will_end', async () => {
      const sub = await this.prisma.proSubscription.findUnique({ where: { stripeSubscriptionId: e.subscriptionId } });
      if (sub) await this.scheduleTrialReminder(sub);
    });
  }

  @OnEvent('pro.payment_succeeded', { async: true })
  async onPaymentSucceeded(e: {
    userId: string;
    provider: 'STRIPE' | 'MESOMB';
    invoiceId?: string;
    plan?: ProPlan;
    amountMinor: number;
    periodEnd?: Date;
    convertedFromTrial?: boolean;
    firstPayment?: boolean;
  }) {
    await this.safely('payment_succeeded', async () => {
      const sub = await this.liveSub(e.userId);
      if (e.provider === 'MESOMB') {
        const at = e.periodEnd ? new Date(e.periodEnd) : sub?.currentPeriodEnd ?? null;
        const key = `${e.userId}:${at?.toISOString().slice(0, 10) ?? Date.now()}`;
        await this.email(e.userId, 'prepaid-paid', key, {
          proSubscriptionId: sub?.id,
          amountMinor: e.amountMinor,
          at: at?.toISOString() ?? null,
          plan: e.plan ?? sub?.plan,
        });
        await this.hub.notify({
          userId: e.userId,
          kind: 'PRO_BILLING',
          title: "You're Pro",
          body: `Paid up until ${formatDay(at, await this.timezoneOf(e.userId))}. Every course is open.`,
          url: '/dashboard',
          dedupeKey: `pro:prepaid-paid:${key}`,
          inbox: { type: 'TEY_PRO_BILLING', entityType: 'ProSubscription', entityId: sub?.id },
          push: false,
        });
        return;
      }
      // Renewals get Stripe's receipt; the first real payment gets a hello.
      if (!(e.convertedFromTrial || e.firstPayment) || !e.invoiceId) return;
      await this.email(e.userId, 'converted', e.invoiceId, {
        proSubscriptionId: sub?.id,
        invoiceId: e.invoiceId,
        amountMinor: e.amountMinor,
      });
      await this.hub.notify({
        userId: e.userId,
        kind: 'PRO_BILLING',
        title: "It's official: you're Pro",
        body: `${formatUsd(e.amountMinor)} paid. Every course stays open.`,
        url: '/dashboard',
        dedupeKey: `pro:converted:${e.invoiceId}`,
        inbox: { type: 'TEY_PRO_BILLING', entityType: 'ProSubscription', entityId: sub?.id },
        push: false,
      });
    });
  }

  @OnEvent('pro.status_changed', { async: true })
  async onStatusChanged(e: {
    userId: string;
    proSubscriptionId: string;
    from: string | null;
    to: string;
    hasPaid?: boolean;
    provider?: 'STRIPE' | 'MESOMB';
  }) {
    if (e.to !== 'CANCELED' && e.to !== 'EXPIRED') return;
    await this.safely('status_changed', async () => {
      const sub = await this.prisma.proSubscription.findUnique({ where: { id: e.proSubscriptionId } });
      if (!sub) return;
      let kind: ProBillingEmailKind | null = null;
      if (sub.provider === 'MESOMB') kind = 'prepaid-ended';
      else if (e.from === 'TRIALING' && !sub.hasPaid) kind = 'trial-ended';
      else if (e.from === 'PAST_DUE' || e.from === 'INCOMPLETE') kind = sub.hasPaid ? 'access-ended' : null;
      if (!kind) return;

      await this.email(e.userId, kind, sub.id, { proSubscriptionId: sub.id, at: (sub.endedAt ?? sub.currentPeriodEnd)?.toISOString() ?? null });
      const copy = proBillingPush(kind, {});
      await this.hub.notify({
        userId: e.userId,
        kind: 'PRO_BILLING',
        ...copy,
        url: kind === 'trial-ended' ? '/dashboard' : kind === 'prepaid-ended' ? '/pro?renew=1' : '/pro',
        dedupeKey: `pro:${kind}:${sub.id}`,
        inbox: { type: 'TEY_PRO_BILLING', entityType: 'ProSubscription', entityId: sub.id },
        // Losing Pro after a failed card is worth a push; a quiet trial end is not.
        push: kind !== 'trial-ended',
      });
    });
  }

  @OnEvent('pro.payment_failed', { async: true })
  async onPaymentFailed(e: {
    userId: string;
    invoiceId: string;
    attempt: number | null;
    amountMinor?: number | null;
    firstChargeAfterTrial?: boolean;
  }) {
    await this.safely('payment_failed', async () => {
      const sub = await this.liveSub(e.userId, true);
      const key = `${e.invoiceId}:${e.attempt ?? 1}`;
      await this.email(e.userId, 'payment-failed', key, {
        proSubscriptionId: sub?.id,
        invoiceId: e.invoiceId,
        amountMinor: e.amountMinor ?? null,
        noGrace: !!e.firstChargeAfterTrial,
      });
      // One push per invoice, not per Stripe retry.
      await this.hub.notify({
        userId: e.userId,
        kind: 'PRO_BILLING',
        ...proBillingPush('payment-failed', { noGrace: !!e.firstChargeAfterTrial }),
        url: '/pro/billing/update-card',
        dedupeKey: `pro:payment-failed:${e.invoiceId}`,
        inbox: { type: 'TEY_PRO_BILLING', entityType: 'ProSubscription', entityId: sub?.id },
      });
    });
  }

  @OnEvent('pro.action_required', { async: true })
  async onActionRequired(e: { userId: string; invoiceId: string; hostedInvoiceUrl: string | null; amountMinor?: number | null }) {
    await this.safely('action_required', async () => {
      const sub = await this.liveSub(e.userId, true);
      await this.email(e.userId, 'action-required', e.invoiceId, {
        proSubscriptionId: sub?.id,
        invoiceId: e.invoiceId,
        amountMinor: e.amountMinor ?? null,
        actionUrl: e.hostedInvoiceUrl,
      });
      await this.hub.notify({
        userId: e.userId,
        kind: 'PRO_BILLING',
        ...proBillingPush('action-required', { amount: formatUsd(e.amountMinor) }),
        url: '/pro/billing/update-card',
        dedupeKey: `pro:action-required:${e.invoiceId}`,
        inbox: { type: 'TEY_PRO_BILLING', entityType: 'ProSubscription', entityId: sub?.id },
      });
    });
  }

  @OnEvent('pro.renewal_upcoming', { async: true })
  async onRenewalUpcoming(e: { userId: string; amountMinor: number | null; renewsAt: Date | null }) {
    await this.safely('renewal_upcoming', async () => {
      const sub = await this.liveSub(e.userId);
      if (!sub || !e.renewsAt) return;
      const key = `${sub.id}:${new Date(e.renewsAt).toISOString().slice(0, 10)}`;
      await this.email(e.userId, 'renewal-upcoming', key, { proSubscriptionId: sub.id, amountMinor: e.amountMinor });
      await this.hub.notify({
        userId: e.userId,
        kind: 'PRO_BILLING',
        title: `Pro renews ${formatDay(e.renewsAt, await this.timezoneOf(e.userId))}`,
        body: `${formatUsd(e.amountMinor)} for another year. Manage it in Settings.`,
        url: '/dashboard/settings',
        dedupeKey: `pro:renewal-upcoming:${key}`,
        inbox: { type: 'TEY_PRO_BILLING', entityType: 'ProSubscription', entityId: sub.id },
        push: false,
      });
    });
  }

  @OnEvent('pro.cancel_scheduled', { async: true })
  async onCancelScheduled(e: { userId: string; proSubscriptionId: string; accessUntil: Date | null; wasTrial: boolean }) {
    await this.safely('cancel_scheduled', async () => {
      const key = `${e.proSubscriptionId}:${e.accessUntil ? new Date(e.accessUntil).toISOString().slice(0, 10) : 'x'}`;
      await this.email(e.userId, 'cancel-confirmed', key, { proSubscriptionId: e.proSubscriptionId, wasTrial: e.wasTrial });
      await this.hub.notify({
        userId: e.userId,
        kind: 'PRO_BILLING',
        title: e.wasTrial ? "Trial cancelled. You won't be charged." : 'Pro cancelled',
        body: `Pro stays on until ${formatDay(e.accessUntil, await this.timezoneOf(e.userId))}.`,
        url: '/dashboard/settings',
        dedupeKey: `pro:cancel-confirmed:${key}`,
        inbox: { type: 'TEY_PRO_BILLING', entityType: 'ProSubscription', entityId: e.proSubscriptionId },
        push: false,
      });
    });
  }

  @OnEvent('pro.money_back', { async: true })
  async onMoneyBack(e: { userId: string; why: 'REFUND' | 'DISPUTE' }) {
    // A dispute goes through the bank; writing to them about it is the bank's job.
    if (e.why !== 'REFUND') return;
    await this.safely('money_back', async () => {
      const day = new Date().toISOString().slice(0, 10);
      await this.email(e.userId, 'refunded', `${e.userId}:${day}`, {});
    });
  }

  @OnEvent('pro.checkout_abandoned', { async: true })
  async onCheckoutAbandoned(e: { userId: string; attemptId: string; plan: ProPlan }) {
    await this.safely('checkout_abandoned', async () => {
      const recent = await this.prisma.emailJob.findFirst({
        where: {
          userId: e.userId,
          templateKey: 'pro.checkout-recovery',
          createdAt: { gte: new Date(Date.now() - RECOVERY_WINDOW_MS) },
        },
        select: { id: true },
      });
      if (recent) return;
      const dueAt = toDaytime(new Date(Date.now() + RECOVERY_DELAY_MS), await this.offsetOf(e.userId));
      await this.email(e.userId, 'checkout-recovery', e.attemptId, { plan: e.plan }, dueAt);
      await this.schedulePush(e.userId, 'checkout-recovery', e.attemptId, dueAt, { plan: e.plan });
    });
  }

  @OnEvent('pro.remind_later', { async: true })
  async onRemindLater(e: { userId: string; remindAt: Date }) {
    await this.safely('remind_later', async () => {
      const dueAt = toDaytime(new Date(e.remindAt), await this.offsetOf(e.userId));
      const key = `${e.userId}:${dueAt.toISOString().slice(0, 10)}`;
      await this.email(e.userId, 'decide-later', key, {}, dueAt);
      await this.schedulePush(e.userId, 'decide-later', key, dueAt, {});
    });
  }

  // ── Mobile Money Pro running out ──────────────────────────────────────

  @Cron('0 20 10 * * *', { name: 'pro-prepaid-ending-scan' })
  async scheduledPrepaidScan(): Promise<void> {
    if (!emailConfig.schedulerEnabled) return;
    try {
      const n = await this.scanPrepaidEnding();
      if (n) this.logger.log(`prepaid ending: queued ${n}`);
    } catch (err) {
      this.logger.warn(`prepaid ending scan failed: ${(err as Error).message}`);
    }
  }

  /** Queues the 3-day and 1-day warnings for prepaid Pro ending on those days (UTC). */
  async scanPrepaidEnding(now = new Date()): Promise<number> {
    const today = Date.parse(`${now.toISOString().slice(0, 10)}T00:00:00Z`);
    let queued = 0;
    for (const daysLeft of PREPAID_ENDING_DAYS) {
      const dayStart = new Date(today + daysLeft * DAY);
      const subs = await this.prisma.proSubscription.findMany({
        where: {
          provider: 'MESOMB',
          status: 'ACTIVE',
          currentPeriodEnd: { gte: dayStart, lt: new Date(dayStart.getTime() + DAY) },
        },
        select: { id: true, userId: true, currentPeriodEnd: true },
        take: 5000,
      });
      for (const s of subs) {
        const endDay = s.currentPeriodEnd!.toISOString().slice(0, 10);
        const key = `${s.id}:${endDay}:${daysLeft}`;
        const dueAt = toDaytime(now, await this.offsetOf(s.userId));
        await this.email(s.userId, 'prepaid-ending', key, { proSubscriptionId: s.id, endDay, daysLeft }, dueAt);
        await this.schedulePush(s.userId, 'prepaid-ending', key, dueAt, { proSubscriptionId: s.id, endDay, daysLeft });
        queued++;
      }
    }
    return queued;
  }

  // ── Timed pushes (the Tey scheduler calls this when one is due) ────────

  async process(action: ScheduledActionRow): Promise<{ sent: boolean; skipReason?: string }> {
    const hint = (action.context ?? {}) as {
      kind?: TimedPush;
      proSubscriptionId?: string;
      endDay?: string;
      daysLeft?: number;
      plan?: ProPlan;
    };
    const skip = async (reason: string) => {
      await this.actions.markSkipped(action.id, reason);
      return { sent: false, skipReason: reason };
    };
    if (!hint.kind) return skip('BAD_CONTEXT');

    const now = new Date();
    const sub = hint.proSubscriptionId
      ? await this.prisma.proSubscription.findUnique({ where: { id: hint.proSubscriptionId } })
      : null;
    const tz = await this.timezoneOf(action.userId);
    let copy: { title: string; body: string };
    let url = '/pro';

    switch (hint.kind) {
      case 'trial-reminder': {
        if (!sub || sub.status !== 'TRIALING' || !sub.trialEnd || sub.trialEnd <= now) return skip('NOT_TRIALING');
        if (sub.cancelAtPeriodEnd) return skip('WONT_CHARGE');
        const offer = sub.offerId
          ? await this.prisma.proOffer.findUnique({ where: { id: sub.offerId }, select: { plan: true, percentOff: true } })
          : null;
        copy = proBillingPush('trial-reminder', {
          amount: formatUsd(chargeAfterTrialMinor(sub.plan, offer)),
          date: formatDay(sub.trialEnd, tz),
        });
        url = '/dashboard/settings';
        break;
      }
      case 'prepaid-ending': {
        if (!sub || sub.status !== 'ACTIVE' || !sub.currentPeriodEnd) return skip('NOT_ACTIVE');
        if (hint.endDay && sub.currentPeriodEnd.toISOString().slice(0, 10) !== hint.endDay) return skip('ALREADY_RENEWED');
        copy = proBillingPush('prepaid-ending', { daysLeft: hint.daysLeft, date: formatDay(sub.currentPeriodEnd, tz) });
        url = '/pro?renew=1';
        break;
      }
      case 'checkout-recovery':
      case 'decide-later': {
        if (await this.isPro(action.userId, now)) return skip('IS_PRO');
        copy = proBillingPush(hint.kind, {});
        break;
      }
      default:
        return skip('BAD_CONTEXT');
    }

    const offerKind = hint.kind === 'checkout-recovery' || hint.kind === 'decide-later';
    const outcome = await this.hub.notify({
      userId: action.userId,
      kind: offerKind ? 'PRO_OFFER' : 'PRO_BILLING',
      ...copy,
      url,
      dedupeKey: `pro:${action.dedupeKey}`,
      inbox: {
        type: offerKind ? 'TEY_PRO_OFFER' : 'TEY_PRO_BILLING',
        entityType: sub ? 'ProSubscription' : undefined,
        entityId: sub?.id,
        collapseDaily: offerKind,
      },
    });
    if (outcome.pushed) await this.actions.markSent(action.id);
    else await this.actions.markSkipped(action.id, outcome.reason);
    return outcome.pushed ? { sent: true } : { sent: false, skipReason: outcome.reason };
  }

  // ── Helpers ────────────────────────────────────────────────────────────

  /**
   * The reminder the paywall promised: 48h before the charge, moved into the
   * learner's daytime but never later than 20h before it.
   */
  async scheduleTrialReminder(sub: ProSubscription, now = new Date()) {
    if (sub.status !== 'TRIALING' || !sub.trialEnd) return;
    const dueAt = trialReminderAt(sub.trialEnd, await this.offsetOf(sub.userId), now);
    if (!dueAt) return;
    await this.email(sub.userId, 'trial-reminder', sub.id, { proSubscriptionId: sub.id }, dueAt);
    await this.schedulePush(sub.userId, 'trial-reminder', sub.id, dueAt, { proSubscriptionId: sub.id }, sub.trialEnd);
  }

  private async email(
    userId: string,
    kind: ProBillingEmailKind,
    key: string,
    payload: Omit<ProBillingJobPayload, 'kind'>,
    dueAt = new Date(),
  ) {
    await this.emailJobs.enqueue({
      userId,
      eventType: 'PRO_BILLING',
      templateKey: `pro.${kind}`,
      dueAt,
      dedupeKey: `pro.${kind}:${key}`,
      payload: { kind, ...payload } satisfies ProBillingJobPayload,
    });
  }

  private async schedulePush(
    userId: string,
    kind: TimedPush,
    key: string,
    dueAt: Date,
    context: Record<string, unknown>,
    expiresAt = new Date(dueAt.getTime() + 36 * HOUR),
  ) {
    await this.actions.upsertIntent(userId, {
      ruleId: PRO_BILLING as TeyReason,
      priority: 'HIGH',
      dueAt,
      expiresAt,
      dedupeKey: `${PRO_BILLING}:${kind}:${key}`,
      contextHint: { kind, ...context } as never,
    });
  }

  private async liveSub(userId: string, includeLapsed = false) {
    return this.prisma.proSubscription.findFirst({
      where: {
        userId,
        status: { in: includeLapsed ? [...LIVE_PRO_STATUSES, 'INCOMPLETE', 'CANCELED'] : LIVE_PRO_STATUSES },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  private async isPro(userId: string, now: Date) {
    const subs = await this.prisma.proSubscription.findMany({ where: { userId, status: { in: LIVE_PRO_STATUSES } } });
    return subs.some((s) => evaluateProAccess(s, now).isPro);
  }

  private async timezoneOf(userId: string) {
    const u = await this.prisma.user.findUnique({ where: { id: userId }, select: { timezone: true } });
    return u?.timezone ?? null;
  }

  private async offsetOf(userId: string) {
    const u = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { timezone: true, timezoneOffsetMinutes: true },
    });
    return resolveLocalNow(u).offsetMinutes;
  }

  private async safely(what: string, fn: () => Promise<void>) {
    try {
      await fn();
    } catch (err) {
      this.logger.warn(`pro billing ${what} failed: ${(err as Error).message}`);
    }
  }
}

/**
 * When the trial reminder goes out: 48h before the trial ends, moved to the
 * learner's daytime, and never later than 20h before the charge (so "two
 * days" is honest and they have a working day to cancel). Null when the trial
 * is already too close to remind usefully.
 */
export function trialReminderAt(trialEnd: Date, offsetMinutes: number, now = new Date()): Date | null {
  const latest = new Date(trialEnd.getTime() - 20 * HOUR);
  if (latest <= now) return null;
  const ideal = new Date(Math.max(trialEnd.getTime() - PRO_TRIAL_REMINDER_HOURS_BEFORE * HOUR, now.getTime()));
  const daytime = toDaytime(ideal, offsetMinutes);
  return daytime <= latest ? daytime : ideal;
}

/** Tey's push lines for billing. Short, plain, every fact passed in. */
export function proBillingPush(
  kind: ProBillingEmailKind,
  f: { amount?: string; date?: string; noGrace?: boolean; daysLeft?: number },
): { title: string; body: string } {
  switch (kind) {
    case 'trial-reminder':
      return {
        title: `Your Pro trial ends ${f.date ?? 'soon'}`,
        body: `Keep Pro and you're charged ${f.amount ?? 'the plan price'}. Cancel before then in Settings to pay nothing.`,
      };
    case 'payment-failed':
      return f.noGrace
        ? { title: "Your card didn't go through", body: 'Pro is paused. Update your card and every course opens again.' }
        : { title: "Your Pro payment didn't go through", body: 'Update your card so you keep every course.' };
    case 'action-required':
      return { title: 'Your bank needs a quick yes', body: `Confirm the ${f.amount || 'Pro'} payment to keep Pro going.` };
    case 'access-ended':
      return { title: 'Your Pro has ended', body: "The card didn't go through. Update it and every course opens again." };
    case 'trial-ended':
      return { title: "Your trial ended. You weren't charged.", body: 'Chapter 1 stays free, two lessons a day.' };
    case 'prepaid-ending':
      return {
        title: f.daysLeft === 1 ? 'Your Pro ends tomorrow' : `${f.daysLeft ?? 3} days left on your Pro`,
        body: `Mobile Money plans don't renew by themselves. Renew before ${f.date ?? 'it ends'} to keep every course.`,
      };
    case 'prepaid-ended':
      return { title: 'Your Pro has ended', body: 'Your progress is saved. Renew any time to open every course again.' };
    case 'checkout-recovery':
      return { title: 'Still want Pro?', body: "Your plan is saved. Pick up right where you left off. I'll wait." };
    case 'decide-later':
      return { title: 'You asked me to remind you', body: 'About Teyro Pro. Every course, no limits. Take a look?' };
    default:
      return { title: 'Teyro Pro', body: 'There’s an update about your plan.' };
  }
}
