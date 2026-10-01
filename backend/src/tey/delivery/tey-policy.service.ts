import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { TeyContext, TeyReason } from '../contracts/tey-context.types';
import { localTimeToday } from '../decision/rules';
import { resolveLocalNow, type TeyLocalNow } from '../state/local-time.util';
import { ruleById } from '../decision/rules';

export type PolicyDecision =
  | { allow: true }
  | { allow: false; reason: string };

/** Which preference flag governs which reason. */
const CATEGORY_OF: Record<TeyReason, keyof PrefFlags> = {
  STREAK_AT_RISK: 'streakReminders',
  STREAK_CRITICAL: 'streakReminders',
  STREAK_LOST: 'streakReminders',
  STREAK_REPAIR_EXPIRING: 'streakReminders',
  DAILY_GOAL_INCOMPLETE: 'dailyReminders',
  LESSON_ABANDONED: 'dailyReminders',
  FIRST_LESSON: 'dailyReminders',
  INACTIVE_RETURN: 'reengagement',
  MILESTONE: 'milestones',
  COURSE_NEAR_COMPLETION: 'milestones',
  PROGRESS_CELEBRATION: 'milestones',
};

/**
 * The reminder rules' own ledger. Cap, spacing and cooldown count only these:
 * event notifications (a league overtake, a creator's sale, a course offer)
 * have their own throttles in TeyNotifyService, and letting a "Sam passed
 * you" at 19:00 swallow the 20:00 streak saver would be exactly backwards.
 */
export const REMINDER_RULE_IDS: string[] = Object.keys(CATEGORY_OF);

export interface PrefFlags {
  streakReminders: boolean;
  dailyReminders: boolean;
  milestones: boolean;
  reengagement: boolean;
  leagueUpdates: boolean;
  courseOffers: boolean;
  creatorActivity: boolean;
}

/**
 * Minimum gap between ordinary reminders. Three hours leaves room for the
 * day's ladder — reminder at the chosen hour (≤16:00), streak saver at 20:00
 * — while still stopping two reminders landing back to back.
 */
const MIN_GAP_MINUTES = 180;
/** A CRITICAL may come closer, but not immediately after something else. */
const MIN_GAP_MINUTES_CRITICAL = 60;
/** CRITICAL may run this late, but no later. Nothing else crosses quiet hours. */
const CRITICAL_QUIET_GRACE_MINUTES = 60;

/**
 * The anti-spam gate (spec section 29).
 *
 * Ordered cheapest-first, and every denial returns a DISTINCT reason string.
 * That specificity is the point: it lets the admin dashboard say "we wanted to
 * nudge 400 people tonight and suppressed 120 — here is exactly why", which is
 * worth more operationally than any individual rule in here.
 */
@Injectable()
export class TeyPolicyService {
  private readonly logger = new Logger(TeyPolicyService.name);

  constructor(private readonly prisma: PrismaService) {}

  async check(
    userId: string,
    ctx: TeyContext,
    now: TeyLocalNow,
  ): Promise<PolicyDecision> {
    // 1. Global kill switch — one env var stops every outbound nudge.
    if (process.env.TEY_PUSH_ENABLED === 'false') {
      return { allow: false, reason: 'GLOBALLY_DISABLED' };
    }

    const prefs = await this.prefsFor(userId);

    // 2. Learner preferences: the global toggle, then the per-category one.
    if (!prefs.pushEnabled) return { allow: false, reason: 'PUSH_OPTED_OUT' };
    const category = CATEGORY_OF[ctx.reason];
    if (category && !prefs[category]) {
      return { allow: false, reason: `CATEGORY_OPTED_OUT:${category}` };
    }

    // 3. Quiet hours, in the learner's LOCAL time.
    if (this.inQuietHours(now.minutesOfDay, prefs, ctx.urgency === 'CRITICAL')) {
      return { allow: false, reason: 'QUIET_HOURS' };
    }

    // 4/5. Volume: daily cap and minimum spacing, from the delivery ledger.
    //      Deriving these from the ledger rather than a counter means they
    //      cannot drift out of sync with what was actually sent.
    const since = this.localMidnight(now);
    const reminders = { in: REMINDER_RULE_IDS };
    const [todayCount, last] = await Promise.all([
      this.prisma.teyDelivery.count({
        where: { userId, channel: 'PUSH', status: 'SENT', ruleId: reminders, sentAt: { gte: since } },
      }),
      this.prisma.teyDelivery.findFirst({
        where: { userId, channel: 'PUSH', status: 'SENT', ruleId: reminders },
        orderBy: { sentAt: 'desc' },
        select: { sentAt: true, ruleId: true },
      }),
    ]);

    // A CRITICAL gets one slot of headroom — losing a 40-day streak to a cap
    // set for ordinary reminders would be a bad trade for everyone.
    const cap = prefs.maxPerDay + (ctx.urgency === 'CRITICAL' ? 1 : 0);
    if (todayCount >= cap) return { allow: false, reason: 'DAILY_CAP' };

    if (last) {
      const gapMinutes = (Date.now() - last.sentAt.getTime()) / 60000;
      const minGap =
        ctx.urgency === 'CRITICAL' ? MIN_GAP_MINUTES_CRITICAL : MIN_GAP_MINUTES;
      if (gapMinutes < minGap) return { allow: false, reason: 'MIN_GAP' };
    }

    // 6. Per-rule cooldown, so one reason cannot dominate the daily budget.
    const rule = ruleById(ctx.reason);
    if (rule) {
      const cooldownSince = new Date(
        Date.now() - rule.cooldownHours * 3600_000,
      );
      const recentSameRule = await this.prisma.teyDelivery.findFirst({
        where: {
          userId,
          ruleId: ctx.reason,
          channel: 'PUSH',
          status: 'SENT',
          sentAt: { gte: cooldownSince },
        },
        select: { id: true },
      });
      if (recentSameRule) return { allow: false, reason: 'RULE_COOLDOWN' };
    }

    // 7. Somewhere to actually send it.
    const active = await this.prisma.pushSubscription.count({
      where: { userId, isActive: true },
    });
    if (active === 0) return { allow: false, reason: 'NO_SUBSCRIPTION' };

    return { allow: true };
  }

  /** Reads prefs, falling back to the schema defaults for a learner with none. */
  async prefsFor(userId: string) {
    const row = await this.prisma.teyNotificationPrefs.findUnique({
      where: { userId },
    });
    return (
      row ?? {
        userId,
        pushEnabled: true,
        whatsappEnabled: false,
        streakReminders: true,
        dailyReminders: true,
        milestones: true,
        reengagement: true,
        leagueUpdates: true,
        courseOffers: true,
        creatorActivity: true,
        quietHoursStart: 1290,
        quietHoursEnd: 480,
        maxPerDay: 4,
        preferredHour: null,
        updatedAt: new Date(),
      }
    );
  }

  /**
   * For pushes that aren't Tey's own (a creator's nudge or cheer): the kill
   * switch, the learner's push toggle and the category they belong to, quiet
   * hours in the learner's local time, and a device to send to. Volume is
   * the caller's job (creator nudges have their own per-course limits).
   */
  async allowsDirectPush(
    user: { id: string; timezone: string | null; timezoneOffsetMinutes: number | null },
    category: keyof PrefFlags,
  ): Promise<boolean> {
    if (process.env.TEY_PUSH_ENABLED === 'false') return false;
    const prefs = await this.prefsFor(user.id);
    if (!prefs.pushEnabled || !prefs[category]) return false;
    if (this.inQuietHours(resolveLocalNow(user).minutesOfDay, prefs, false)) return false;
    const active = await this.prisma.pushSubscription.count({ where: { userId: user.id, isActive: true } });
    return active > 0;
  }

  /**
   * Quiet hours wrap midnight (21:30 -> 08:00), so the window is a union of
   * two ranges rather than a simple interval. Getting this backwards would
   * silence the entire day and send only at night.
   */
  isQuietNow(
    user: { timezone: string | null; timezoneOffsetMinutes: number | null },
    prefs: { quietHoursStart: number; quietHoursEnd: number },
  ): boolean {
    return this.inQuietHours(resolveLocalNow(user).minutesOfDay, prefs, false);
  }

  private inQuietHours(
    minutesOfDay: number,
    prefs: { quietHoursStart: number; quietHoursEnd: number },
    isCritical: boolean,
  ): boolean {
    const start = isCritical
      ? prefs.quietHoursStart + CRITICAL_QUIET_GRACE_MINUTES
      : prefs.quietHoursStart;
    const end = prefs.quietHoursEnd;

    if (start === end) return false;
    return start < end
      ? minutesOfDay >= start && minutesOfDay < end
      : minutesOfDay >= start || minutesOfDay < end;
  }

  /** The instant the learner's current local day began. */
  private localMidnight(now: TeyLocalNow): Date {
    return localTimeToday(now, 0, 0);
  }
}
