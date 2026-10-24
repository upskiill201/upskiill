import type { ProAccess } from './pro-access.service';
import { PRO_TRIAL_REMINDER_HOURS_BEFORE } from './pro.config';

export type ProBanner =
  | { type: 'TRIAL_ENDING'; at: Date }
  | { type: 'PAYMENT_FAILED'; graceUntil: Date | null }
  | { type: 'CANCELED_ENDING'; at: Date | null }
  | { type: 'ACCESS_PAUSED' }
  | { type: 'PREPAID_ENDING'; at: Date };

const HOUR_MS = 60 * 60 * 1000;

/**
 * Pure: the one in-app banner a learner should see about their plan, most
 * urgent first. Failed payments outrank everything because access is at
 * stake; the trial reminder is the in-app copy of the day-5 promise.
 */
export function bannerFor(
  access: ProAccess,
  lapsed: { status: string; endedAt: Date | null } | null,
  now: Date = new Date(),
): ProBanner | null {
  if (access.status === 'PAST_DUE') {
    return access.inGrace ? { type: 'PAYMENT_FAILED', graceUntil: access.graceUntil } : { type: 'ACCESS_PAUSED' };
  }
  if (access.isPro && access.cancelAtPeriodEnd) {
    return { type: 'CANCELED_ENDING', at: access.trialEndsAt ?? access.currentPeriodEnd };
  }
  if (access.isPro && access.status === 'TRIALING' && access.trialEndsAt) {
    const left = access.trialEndsAt.getTime() - now.getTime();
    if (left <= PRO_TRIAL_REMINDER_HOURS_BEFORE * HOUR_MS) {
      return { type: 'TRIAL_ENDING', at: access.trialEndsAt };
    }
  }
  if (access.isPro && access.provider === 'MESOMB' && access.currentPeriodEnd) {
    const left = access.currentPeriodEnd.getTime() - now.getTime();
    if (left <= 3 * 24 * HOUR_MS) return { type: 'PREPAID_ENDING', at: access.currentPeriodEnd };
  }
  if (!access.isPro && lapsed && lapsed.endedAt && now.getTime() - lapsed.endedAt.getTime() < 7 * 24 * HOUR_MS) {
    return { type: 'ACCESS_PAUSED' };
  }
  return null;
}
