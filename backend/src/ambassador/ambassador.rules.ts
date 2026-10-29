/**
 * The ambassador programme, as pure rules (founder, 2026-10-29).
 *
 *   A learner earns Teyro Pro by inviting friends who keep learning. A friend
 *   counts once they finish `qualifyLessons` lessons AND reach a
 *   `qualifyStreak`-day streak (founder: a real learner, not a throwaway
 *   account), and keeps counting while
 *   they learn at least once every `activeDays`. Pro is on while at least
 *   `friendsForPro` friends count. When that drops, a `graceDays` window lets
 *   the ambassador bring someone back before Pro pauses; it comes back on its
 *   own once enough friends are learning again.
 *
 * Everything here is a function of (row, friends, rules, now), so the whole
 * state machine is tested without a database (ambassador.rules.spec.ts).
 */

export interface AmbassadorRules {
  enabled: boolean;
  friendsForPro: number;
  qualifyLessons: number;
  qualifyStreak: number;
  activeDays: number;
  graceDays: number;
}

export const DEFAULT_RULES: AmbassadorRules = {
  enabled: true,
  friendsForPro: 5,
  qualifyLessons: 3,
  qualifyStreak: 3,
  activeDays: 7,
  graceDays: 3,
};

/** After this many days without a lesson a counting friend is "slipping". */
export const AT_RISK_AFTER_DAYS = 3;

const DAY_MS = 86_400_000;

/**
 * LEARNING: still working toward the qualifying lessons (doesn't count yet).
 * ACTIVE / AT_RISK: counts toward Pro (AT_RISK = no lesson for a few days).
 * INACTIVE: qualified once, but no lesson inside the active window.
 */
export type FriendState = 'LEARNING' | 'ACTIVE' | 'AT_RISK' | 'INACTIVE';

export function friendState(
  f: { qualifiedAt: Date | null; lastLessonAt: Date | null },
  rules: Pick<AmbassadorRules, 'activeDays'>,
  now: Date,
): FriendState {
  if (!f.qualifiedAt) return 'LEARNING';
  const last = f.lastLessonAt ?? f.qualifiedAt;
  const idle = now.getTime() - last.getTime();
  if (idle >= rules.activeDays * DAY_MS) return 'INACTIVE';
  if (idle >= Math.min(AT_RISK_AFTER_DAYS, rules.activeDays - 1) * DAY_MS) return 'AT_RISK';
  return 'ACTIVE';
}

/** Has a friend done enough to start counting toward their inviter's Pro? */
export function qualifies(
  f: { lessonsDone: number; streakDays: number },
  rules: Pick<AmbassadorRules, 'qualifyLessons' | 'qualifyStreak'>,
) {
  return f.lessonsDone >= rules.qualifyLessons && f.streakDays >= rules.qualifyStreak;
}

export const counts = (s: FriendState) => s === 'ACTIVE' || s === 'AT_RISK';

/** When a counting friend drops out if they don't learn again. */
export function countsUntil(lastLessonAt: Date | null, rules: Pick<AmbassadorRules, 'activeDays'>): Date | null {
  return lastLessonAt ? new Date(lastLessonAt.getTime() + rules.activeDays * DAY_MS) : null;
}

export type ProChange = 'ON' | 'GRACE' | 'OFF' | 'RESTORED';

export interface ProState {
  proActive: boolean;
  proSince: Date | null;
  graceUntil: Date | null;
}

/**
 * The next Pro state. With the programme switched off nobody's Pro switches
 * on (new or returning), but anyone who has it keeps it while their friends
 * keep learning — switching off never takes away what was earned.
 */
export function nextProState(
  cur: ProState,
  activeFriends: number,
  rules: AmbassadorRules,
  now: Date,
): ProState & { change: ProChange | null } {
  const meets = activeFriends >= rules.friendsForPro;

  if (meets) {
    if (!cur.proActive) {
      if (!rules.enabled) return { ...cur, change: null };
      return { proActive: true, proSince: now, graceUntil: null, change: 'ON' };
    }
    if (cur.graceUntil) return { ...cur, graceUntil: null, change: 'RESTORED' };
    return { ...cur, change: null };
  }

  if (!cur.proActive) return { ...cur, graceUntil: null, change: null };
  if (!cur.graceUntil) {
    if (rules.graceDays <= 0) return { proActive: false, proSince: null, graceUntil: null, change: 'OFF' };
    return { ...cur, graceUntil: new Date(now.getTime() + rules.graceDays * DAY_MS), change: 'GRACE' };
  }
  if (cur.graceUntil.getTime() <= now.getTime()) {
    return { proActive: false, proSince: null, graceUntil: null, change: 'OFF' };
  }
  return { ...cur, change: null };
}

/** Lifetime medals, from the most friends ever qualified. Never currency. */
export function badgesFor(peakQualified: number, rules: Pick<AmbassadorRules, 'friendsForPro'>) {
  const tiers = [
    { key: 'AMBASSADOR', name: 'Ambassador', at: rules.friendsForPro },
    { key: 'CHAMPION', name: 'Champion', at: Math.max(25, rules.friendsForPro * 5) },
    { key: 'LEGEND', name: 'Legend', at: Math.max(100, rules.friendsForPro * 20) },
  ];
  return tiers.map((t) => ({ ...t, earned: peakQualified >= t.at, left: Math.max(0, t.at - peakQualified) }));
}

/** Bounds Teyro HQ may set, so a typo can't hand out Pro for nothing. */
export const RULE_LIMITS = {
  friendsForPro: { min: 1, max: 100 },
  qualifyLessons: { min: 1, max: 50 },
  qualifyStreak: { min: 1, max: 60 },
  activeDays: { min: 2, max: 60 },
  graceDays: { min: 0, max: 30 },
} as const;
