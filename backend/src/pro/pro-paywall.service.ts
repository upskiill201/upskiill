import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import type { ExitSurveyReason, Prisma, ProOffer, ProPlan } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PRO_EXIT_COUPON_ID, PRO_EXIT_OFFER, PRO_PRICES_MINOR } from './pro.config';

const HOUR_MS = 60 * 60 * 1000;

export interface PaywallEventInput {
  sessionId: string;
  moment: string;
  type: string;
  plan?: string;
  offerId?: string;
  attemptId?: string;
  variant?: string;
  errorCode?: string;
  declineCode?: string;
  meta?: Record<string, unknown>;
  clientTs?: string;
}

export type ExitRoute = 'DISCOUNT_OFFER' | 'MONTHLY_PLAN' | 'PROOF' | 'LET_IN' | 'REMINDER' | 'THANKS';

export interface OfferView {
  id: string;
  plan: ProPlan;
  percentOff: number;
  firstYearMinor: number;
  renewalMinor: number;
  expiresAt: Date;
}

export function offerView(offer: ProOffer): OfferView {
  const full = PRO_PRICES_MINOR[offer.plan];
  return {
    id: offer.id,
    plan: offer.plan,
    percentOff: offer.percentOff,
    firstYearMinor: Math.round(full * (1 - offer.percentOff / 100)),
    renewalMinor: full,
    expiresAt: offer.expiresAt,
  };
}

/**
 * Pure: where each exit-survey answer goes (the playbook's "ask why, then
 * answer it"). The discount is saved for "too expensive" and only once, so
 * closing the paywall never teaches people that X means a coupon.
 */
export function routeExitReason(reason: ExitSurveyReason, discountAvailable: boolean): ExitRoute {
  switch (reason) {
    case 'TOO_EXPENSIVE':
      return discountAvailable ? 'DISCOUNT_OFFER' : 'MONTHLY_PLAN';
    case 'NOT_SURE':
      return 'PROOF';
    case 'JUST_LOOKING':
      return 'LET_IN';
    case 'DECIDE_LATER':
      return 'REMINDER';
    default:
      return 'THANKS';
  }
}

@Injectable()
export class ProPaywallService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly events: EventEmitter2,
  ) {}

  /** The learner's live exit offer, if they have one. */
  async activeOffer(userId: string): Promise<ProOffer | null> {
    const offer = await this.prisma.proOffer.findUnique({
      where: { userId_kind: { userId, kind: PRO_EXIT_OFFER.kind } },
    });
    if (!offer || offer.status !== 'OFFERED' || offer.expiresAt <= new Date()) return null;
    return offer;
  }

  /**
   * Creates the once-ever first-year offer. Returns the existing one if it's
   * still live, and null if it was ever used or allowed to expire.
   */
  async getOrCreateExitOffer(userId: string): Promise<ProOffer | null> {
    const existing = await this.prisma.proOffer.findUnique({
      where: { userId_kind: { userId, kind: PRO_EXIT_OFFER.kind } },
    });
    if (existing) {
      return existing.status === 'OFFERED' && existing.expiresAt > new Date() ? existing : null;
    }
    try {
      const offer = await this.prisma.proOffer.create({
        data: {
          userId,
          kind: PRO_EXIT_OFFER.kind,
          plan: PRO_EXIT_OFFER.plan,
          percentOff: PRO_EXIT_OFFER.percentOff,
          stripeCouponId: PRO_EXIT_COUPON_ID,
          expiresAt: new Date(Date.now() + PRO_EXIT_OFFER.hours * HOUR_MS),
        },
      });
      this.events.emit('pro.offer_shown', { userId, offerId: offer.id });
      return offer;
    } catch {
      // Concurrent create lost the unique race: whatever exists is the answer.
      return this.activeOffer(userId);
    }
  }

  async recordEvents(
    who: { userId: string | null; anonymousId: string | null },
    events: PaywallEventInput[],
  ): Promise<{ ok: true; next?: Record<string, unknown> }> {
    await this.prisma.paywallEvent.createMany({
      data: events.map((e) => ({
        userId: who.userId,
        anonymousId: who.anonymousId,
        sessionId: e.sessionId,
        moment: e.moment,
        type: e.type,
        plan: e.plan ?? null,
        offerId: e.offerId ?? null,
        attemptId: e.attemptId ?? null,
        variant: e.variant ?? null,
        errorCode: e.errorCode ?? null,
        declineCode: e.declineCode ?? null,
        meta: (e.meta ?? undefined) as Prisma.InputJsonValue | undefined,
        clientTs: e.clientTs ? new Date(e.clientTs) : null,
      })),
    });

    // A single close/back-out tells the paywall what to show next.
    if (events.length !== 1 || !who.userId) return { ok: true };
    const [e] = events;

    if (e.type === 'CLOSE') {
      const answered = await this.prisma.exitSurveyResponse.findUnique({ where: { sessionId: e.sessionId } });
      return { ok: true, next: answered ? { type: 'LEAVE' } : { type: 'EXIT_SURVEY' } };
    }

    if (e.type === 'SHEET_CLOSE' && e.attemptId) {
      return { ok: true, next: await this.checkoutRecovery(who.userId, e.attemptId, e.plan) };
    }
    return { ok: true };
  }

  /**
   * Moment 4: they opened the payment sheet and backed out. Same plan first,
   * a smaller plan as the alternative, and (once ever, yearly only) the real
   * first-year discount.
   */
  private async checkoutRecovery(userId: string, attemptId: string, plan?: string) {
    const attempt = await this.prisma.proCheckoutAttempt.findUnique({ where: { id: attemptId } });
    if (attempt && attempt.userId === userId && ['CREATED', 'REQUIRES_ACTION'].includes(attempt.status)) {
      await this.prisma.proCheckoutAttempt.update({
        where: { id: attemptId },
        data: { status: 'ABANDONED' },
      });
      this.events.emit('pro.checkout_abandoned', { userId, attemptId, plan: attempt.plan });
    }
    const chosen = (attempt?.plan ?? (plan === 'MONTHLY' ? 'MONTHLY' : 'YEARLY')) as ProPlan;
    const offer = chosen === 'YEARLY' ? await this.getOrCreateExitOffer(userId) : null;
    return {
      type: 'RECOVERY',
      plan: chosen,
      smallerPlan: chosen === 'YEARLY' ? 'MONTHLY' : null,
      offer: offer ? offerView(offer) : null,
    };
  }

  async exitSurvey(
    userId: string,
    input: { sessionId: string; reason: ExitSurveyReason; freeText?: string; plan?: string; moment?: string },
  ) {
    const existing = await this.prisma.exitSurveyResponse.findUnique({ where: { sessionId: input.sessionId } });
    if (existing && existing.userId === userId) {
      const offer = existing.offerId ? await this.activeOffer(userId) : null;
      return { route: existing.route as ExitRoute, offer: offer ? offerView(offer) : null, remindAt: existing.remindAt };
    }

    const offer = input.reason === 'TOO_EXPENSIVE' ? await this.getOrCreateExitOffer(userId) : null;
    const route = routeExitReason(input.reason, !!offer);
    const remindAt = route === 'REMINDER' ? new Date(Date.now() + 24 * HOUR_MS) : null;

    await this.prisma.exitSurveyResponse.create({
      data: {
        userId,
        sessionId: input.sessionId,
        reason: input.reason,
        // Free text only for "something else"; nothing else needs it stored.
        freeText: input.reason === 'OTHER' ? input.freeText?.slice(0, 500) || null : null,
        route,
        offerId: route === 'DISCOUNT_OFFER' ? offer?.id ?? null : null,
        moment: input.moment ?? null,
        plan: input.plan ?? null,
        remindAt,
      },
    });
    if (remindAt) this.events.emit('pro.remind_later', { userId, remindAt });

    return {
      route,
      offer: route === 'DISCOUNT_OFFER' && offer ? offerView(offer) : null,
      remindAt,
      proof: route === 'PROOF' ? await this.proof() : null,
    };
  }

  /**
   * "Not sure it works for me": real numbers only, and only once they're
   * big enough to mean something. Below the threshold the paywall shows the
   * learner's own progress instead.
   */
  async proof(): Promise<{ lessonsCompletedThisWeek: number | null; learnersThisWeek: number | null }> {
    const since = new Date(Date.now() - 7 * 24 * HOUR_MS);
    const [lessons, learners] = await Promise.all([
      this.prisma.userLessonProgress.count({ where: { status: 'completed', completedAt: { gte: since } } }),
      this.prisma.userLessonProgress
        .groupBy({ by: ['userId'], where: { status: 'completed', completedAt: { gte: since } } })
        .then((rows) => rows.length),
    ]);
    return {
      lessonsCompletedThisWeek: lessons >= 500 ? lessons : null,
      learnersThisWeek: learners >= 100 ? learners : null,
    };
  }
}
