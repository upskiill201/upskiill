import { Injectable } from '@nestjs/common';
import type { ProPlan, ProProvider, ProStatus, ProSubscription } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

/** Statuses that can still grant access, depending on their dates. */
export const LIVE_PRO_STATUSES: ProStatus[] = ['TRIALING', 'ACTIVE', 'PAST_DUE'];

/** Small slack so a renewal webhook arriving late never locks a payer out. */
const TRIAL_SLACK_MS = 3 * 60 * 60 * 1000;
const RENEWAL_SLACK_MS = 48 * 60 * 60 * 1000;

const POSITIVE_TTL_MS = 60_000;
// Short, so a learner who just paid sees Pro almost at once even on another instance.
const NEGATIVE_TTL_MS = 5_000;

export interface ProAccess {
  isPro: boolean;
  status: ProStatus | null;
  plan: ProPlan | null;
  provider: ProProvider | null;
  subscriptionId: string | null;
  trialEndsAt: Date | null;
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd: boolean;
  autoRenew: boolean;
  inGrace: boolean;
  graceUntil: Date | null;
  /** When access ends if nothing else happens. */
  accessUntil: Date | null;
}

const NO_ACCESS: ProAccess = {
  isPro: false,
  status: null,
  plan: null,
  provider: null,
  subscriptionId: null,
  trialEndsAt: null,
  currentPeriodEnd: null,
  cancelAtPeriodEnd: false,
  autoRenew: false,
  inGrace: false,
  graceUntil: null,
  accessUntil: null,
};

/**
 * Pure: what one subscription row grants at `now`. Kept separate from the
 * database so the status x time rules are tested exhaustively.
 */
export function evaluateProAccess(
  sub: Pick<
    ProSubscription,
    | 'id'
    | 'status'
    | 'plan'
    | 'provider'
    | 'trialEnd'
    | 'currentPeriodEnd'
    | 'cancelAtPeriodEnd'
    | 'autoRenew'
    | 'graceUntil'
  > | null,
  now: Date = new Date(),
): ProAccess {
  if (!sub) return NO_ACCESS;
  let accessUntil: Date | null = null;
  let inGrace = false;

  switch (sub.status) {
    case 'TRIALING':
      accessUntil = sub.trialEnd ? new Date(sub.trialEnd.getTime() + TRIAL_SLACK_MS) : null;
      break;
    case 'ACTIVE':
      if (sub.currentPeriodEnd) {
        // Prepaid Mobile Money never renews, so it gets no renewal slack.
        const slack = sub.provider === 'MESOMB' ? 0 : RENEWAL_SLACK_MS;
        accessUntil = new Date(sub.currentPeriodEnd.getTime() + slack);
      }
      break;
    case 'PAST_DUE':
      accessUntil = sub.graceUntil;
      inGrace = !!sub.graceUntil && sub.graceUntil > now;
      break;
    default:
      return NO_ACCESS;
  }

  const isPro = !!accessUntil && accessUntil > now;
  return {
    isPro,
    status: sub.status,
    plan: sub.plan,
    provider: sub.provider,
    subscriptionId: sub.id,
    trialEndsAt: sub.status === 'TRIALING' ? sub.trialEnd : null,
    currentPeriodEnd: sub.currentPeriodEnd,
    cancelAtPeriodEnd: sub.cancelAtPeriodEnd,
    autoRenew: sub.autoRenew && !sub.cancelAtPeriodEnd,
    inGrace,
    graceUntil: sub.graceUntil,
    accessUntil,
  };
}

/**
 * The one answer to "is this learner Pro right now?". Every gate (lessons,
 * hearts, shop, streak repair, paywall) asks here, never the table directly.
 */
@Injectable()
export class ProAccessService {
  private readonly cache = new Map<string, { value: ProAccess; expiresAt: number }>();

  constructor(private readonly prisma: PrismaService) {}

  async getAccess(userId: string): Promise<ProAccess> {
    const hit = this.cache.get(userId);
    if (hit && hit.expiresAt > Date.now()) return hit.value;

    const sub = await this.prisma.proSubscription.findFirst({
      where: { userId, status: { in: LIVE_PRO_STATUSES } },
      orderBy: { createdAt: 'desc' },
    });
    const value = evaluateProAccess(sub);
    this.cache.set(userId, {
      value,
      expiresAt: Date.now() + (value.isPro ? POSITIVE_TTL_MS : NEGATIVE_TTL_MS),
    });
    return value;
  }

  async hasPro(userId: string): Promise<boolean> {
    return (await this.getAccess(userId)).isPro;
  }

  /** Bulk check for lists (HQ, leaderboards); bypasses the cache. */
  async hasProMany(userIds: string[]): Promise<Set<string>> {
    if (userIds.length === 0) return new Set();
    const subs = await this.prisma.proSubscription.findMany({
      where: { userId: { in: userIds }, status: { in: LIVE_PRO_STATUSES } },
    });
    const now = new Date();
    return new Set(subs.filter((s) => evaluateProAccess(s, now).isPro).map((s) => s.userId));
  }

  /** Called whenever a subscription row changes. */
  invalidate(userId: string): void {
    this.cache.delete(userId);
  }
}
