import type { PrefFlags } from '../delivery/tey-policy.service';

/**
 * Every EVENT notification Tey sends — the things that happen to a learner or
 * creator, as opposed to the scheduled reminder ladder in decision/rules.
 *
 * One table so the volume story is reviewable in one place: which setting
 * turns each one off, how often it may push, how long a push stays worth
 * delivering, and whose daily budget it spends. The reminder rules keep their
 * own budget (TeyPolicyService), so an event can never crowd out a streak
 * saver, and vice versa.
 */

export type NotifyAudience = 'learner' | 'creator' | 'community' | 'billing';

export interface NotifySpec {
  audience: NotifyAudience;
  /** The settings toggle that silences this kind's push. */
  pref: keyof PrefFlags;
  /** Minimum minutes between two pushes of this kind to one person. */
  throttleMinutes: number;
  /** After this long undelivered (phone off), the push is dropped. */
  ttlSeconds: number;
  /** Collapses repeats on the device: a new one replaces the old. */
  tag: string;
  /** For a future Rive Tey on the lock screen / in the SW. */
  teyState: string;
  /**
   * About their money (trial ending, a failed card): not silenced by a
   * category toggle, not throttled, not counted against a marketing cap.
   * Still needs push switched on, still waits out quiet hours.
   */
  transactional?: boolean;
}

const HOUR = 3600;

export const NOTIFY_KINDS = {
  // ── Learner ────────────────────────────────────────────────────────────
  STREAK_FREEZE_USED: {
    audience: 'learner', pref: 'streakReminders', throttleMinutes: 0,
    ttlSeconds: 12 * HOUR, tag: 'tey-streak', teyState: 'STREAK_SAVED',
  },
  LEAGUE_PASSED: {
    audience: 'learner', pref: 'leagueUpdates', throttleMinutes: 180,
    ttlSeconds: 3 * HOUR, tag: 'tey-league', teyState: 'PASSIVE_AGGRESSIVE',
  },
  LEAGUE_ENDING: {
    audience: 'learner', pref: 'leagueUpdates', throttleMinutes: 0,
    ttlSeconds: 6 * HOUR, tag: 'tey-league', teyState: 'REMINDER',
  },
  LEAGUE_RESULT: {
    audience: 'learner', pref: 'leagueUpdates', throttleMinutes: 0,
    ttlSeconds: 24 * HOUR, tag: 'tey-league', teyState: 'CELEBRATING',
  },
  REACH: {
    audience: 'learner', pref: 'dailyReminders', throttleMinutes: 20 * 60,
    ttlSeconds: 12 * HOUR, tag: 'tey-reach', teyState: 'ENCOURAGING',
  },
  FIRST_LESSON: {
    audience: 'learner', pref: 'dailyReminders', throttleMinutes: 150,
    ttlSeconds: 6 * HOUR, tag: 'tey-first-lesson', teyState: 'PASSIVE_AGGRESSIVE',
  },
  COURSE_UNLOCK: {
    audience: 'learner', pref: 'courseOffers', throttleMinutes: 20 * 60,
    ttlSeconds: 12 * HOUR, tag: 'tey-unlock', teyState: 'ENCOURAGING',
  },
  // "Still want Pro?" and the "decide later" reminder: offers, so they obey
  // the offers toggle and wait three days between pushes.
  PRO_OFFER: {
    audience: 'learner', pref: 'courseOffers', throttleMinutes: 3 * 24 * 60,
    ttlSeconds: 12 * HOUR, tag: 'tey-pro-offer', teyState: 'ENCOURAGING',
  },

  // ── Billing (Teyro Pro) ────────────────────────────────────────────────
  // Trial ending, card declined, bank wants a yes, Pro ended.
  PRO_BILLING: {
    audience: 'billing', pref: 'courseOffers', throttleMinutes: 0,
    ttlSeconds: 24 * HOUR, tag: 'tey-pro-billing', teyState: 'REMINDER',
    transactional: true,
  },

  // ── Community (focus course only — see common/focus-course.util.ts) ────
  // Someone answered or mentioned YOU: never throttled, each its own thread.
  COMMUNITY_REPLY: {
    audience: 'community', pref: 'communityActivity', throttleMinutes: 0,
    ttlSeconds: 24 * HOUR, tag: 'community-reply', teyState: 'HAPPY',
  },
  COMMUNITY_COMMENT: {
    audience: 'community', pref: 'communityActivity', throttleMinutes: 0,
    ttlSeconds: 24 * HOUR, tag: 'community-comment', teyState: 'HAPPY',
  },
  COMMUNITY_MENTION: {
    audience: 'community', pref: 'communityActivity', throttleMinutes: 0,
    ttlSeconds: 24 * HOUR, tag: 'community-mention', teyState: 'ENCOURAGING',
  },
  // The creator spoke to the whole class.
  COMMUNITY_ANNOUNCEMENT: {
    audience: 'community', pref: 'communityActivity', throttleMinutes: 0,
    ttlSeconds: 24 * HOUR, tag: 'community-announcement', teyState: 'ENCOURAGING',
  },
  // A classmate posted. The only broadcast, so the only throttled one: at most
  // one such push per learner every 90 minutes.
  COMMUNITY_POST: {
    audience: 'community', pref: 'communityActivity', throttleMinutes: 90,
    ttlSeconds: 6 * HOUR, tag: 'community-post', teyState: 'HAPPY',
  },

  // ── Creator ────────────────────────────────────────────────────────────
  STUDIO_SALE: {
    audience: 'creator', pref: 'creatorActivity', throttleMinutes: 0,
    ttlSeconds: 24 * HOUR, tag: 'studio-sale', teyState: 'CELEBRATING',
  },
  STUDIO_NEW_LEARNERS: {
    audience: 'creator', pref: 'creatorActivity', throttleMinutes: 240,
    ttlSeconds: 12 * HOUR, tag: 'studio-learners', teyState: 'HAPPY',
  },
  STUDIO_QUESTION: {
    audience: 'creator', pref: 'creatorActivity', throttleMinutes: 60,
    ttlSeconds: 24 * HOUR, tag: 'studio-question', teyState: 'REMINDER',
  },
  STUDIO_COURSE_FINISHED: {
    audience: 'creator', pref: 'creatorActivity', throttleMinutes: 120,
    ttlSeconds: 24 * HOUR, tag: 'studio-finished', teyState: 'PROUD',
  },
  STUDIO_PAYOUT: {
    audience: 'creator', pref: 'creatorActivity', throttleMinutes: 0,
    ttlSeconds: 48 * HOUR, tag: 'studio-payout', teyState: 'HAPPY',
  },
  STUDIO_COURSE_STATUS: {
    audience: 'creator', pref: 'creatorActivity', throttleMinutes: 0,
    ttlSeconds: 48 * HOUR, tag: 'studio-course', teyState: 'CELEBRATING',
  },
} as const satisfies Record<string, NotifySpec>;

export type NotifyKind = keyof typeof NOTIFY_KINDS;

/** Pushes per local day, per audience, across every event kind. */
export const DAILY_EVENT_PUSH_CAP: Record<NotifyAudience, number> = {
  learner: 3,
  creator: 8,
  // Replies and mentions are conversations; a busy thread should not go quiet
  // after three. Broadcast posts are held back by their own 90-minute throttle.
  community: 12,
  // Transactional, so the cap is never consulted; here for the type only.
  billing: 10,
};

export function kindsFor(audience: NotifyAudience): NotifyKind[] {
  return (Object.keys(NOTIFY_KINDS) as NotifyKind[]).filter(
    (k) => NOTIFY_KINDS[k].audience === audience,
  );
}
