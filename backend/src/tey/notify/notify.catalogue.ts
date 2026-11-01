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

export type NotifyAudience = 'learner' | 'creator' | 'community' | 'billing' | 'network';

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

  // ── The Teyro Network (docs/TEYRO_NETWORK_PLAN.md §5) ──────────────────
  // A person needs you: someone asked to be your buddy, or nudged you.
  BUDDY_REQUEST: {
    audience: 'network', pref: 'networkActivity', throttleMinutes: 0,
    ttlSeconds: 24 * HOUR, tag: 'network-buddy', teyState: 'HAPPY',
  },
  BUDDY_ACCEPTED: {
    audience: 'network', pref: 'networkActivity', throttleMinutes: 0,
    ttlSeconds: 24 * HOUR, tag: 'network-buddy', teyState: 'CELEBRATING',
  },
  BUDDY_NUDGE: {
    audience: 'network', pref: 'networkActivity', throttleMinutes: 0,
    ttlSeconds: 8 * HOUR, tag: 'network-nudge', teyState: 'ENCOURAGING',
  },
  // A buddy did today's lesson and you haven't. Throttled so five buddies
  // learning in one morning is one push, not five.
  BUDDY_LEARNED: {
    audience: 'network', pref: 'networkActivity', throttleMinutes: 240,
    ttlSeconds: 8 * HOUR, tag: 'network-buddy-learned', teyState: 'PASSIVE_AGGRESSIVE',
  },
  NUDGE_WORKED: {
    audience: 'network', pref: 'networkActivity', throttleMinutes: 0,
    ttlSeconds: 12 * HOUR, tag: 'network-nudge-worked', teyState: 'PROUD',
  },
  // "Ada started Python because of you" — the strongest reason to come back.
  INSPIRED: {
    audience: 'network', pref: 'networkActivity', throttleMinutes: 0,
    ttlSeconds: 24 * HOUR, tag: 'network-inspired', teyState: 'PROUD',
  },
  // 20:00 local: a shared streak of 2+ days ends at midnight unless you learn.
  BUDDY_STREAK_ENDING: {
    audience: 'network', pref: 'networkActivity', throttleMinutes: 0,
    ttlSeconds: 4 * HOUR, tag: 'network-buddy-streak', teyState: 'REMINDER',
  },
  // "Ada is stuck on Lesson 12. You passed it." At most one push every 6h;
  // the router also caps how often one person is asked at all.
  HELP_REQUEST: {
    audience: 'network', pref: 'networkActivity', throttleMinutes: 360,
    ttlSeconds: 12 * HOUR, tag: 'network-help', teyState: 'ENCOURAGING',
  },
  // "Your answer helped Ada finish Lesson 12."
  HELP_WORKED: {
    audience: 'network', pref: 'networkActivity', throttleMinutes: 0,
    ttlSeconds: 24 * HOUR, tag: 'network-help-worked', teyState: 'PROUD',
  },
  // Squads: an invite, a new member (bell only), "2 lessons from the chest"
  // (once a week), and the chest itself.
  SQUAD_INVITE: {
    audience: 'network', pref: 'networkActivity', throttleMinutes: 0,
    ttlSeconds: 24 * HOUR, tag: 'network-squad', teyState: 'HAPPY',
  },
  SQUAD_JOINED: {
    audience: 'network', pref: 'networkActivity', throttleMinutes: 0,
    ttlSeconds: 12 * HOUR, tag: 'network-squad', teyState: 'HAPPY',
  },
  SQUAD_ALMOST: {
    audience: 'network', pref: 'networkActivity', throttleMinutes: 0,
    ttlSeconds: 8 * HOUR, tag: 'network-squad-goal', teyState: 'ENCOURAGING',
  },
  SQUAD_GOAL_MET: {
    audience: 'network', pref: 'networkActivity', throttleMinutes: 0,
    ttlSeconds: 24 * HOUR, tag: 'network-squad-goal', teyState: 'CELEBRATING',
  },
  // Duels: your turn, and the result.
  DUEL_RECEIVED: {
    audience: 'network', pref: 'networkActivity', throttleMinutes: 0,
    ttlSeconds: 24 * HOUR, tag: 'network-duel', teyState: 'PASSIVE_AGGRESSIVE',
  },
  DUEL_RESULT: {
    audience: 'network', pref: 'networkActivity', throttleMinutes: 0,
    ttlSeconds: 24 * HOUR, tag: 'network-duel', teyState: 'CELEBRATING',
  },
  // "Ada is learning right now. Join her?" — a live moment, so a short TTL,
  // and at most one a day whoever it's about.
  BUDDY_LIVE: {
    audience: 'network', pref: 'networkActivity', throttleMinutes: 24 * 60,
    ttlSeconds: 20 * 60, tag: 'network-live', teyState: 'HAPPY',
  },
  // Social reward: batched on the bell (one row a day), pushed at most every 3h.
  NETWORK_CHEER: {
    audience: 'network', pref: 'networkActivity', throttleMinutes: 180,
    ttlSeconds: 12 * HOUR, tag: 'network-cheer', teyState: 'HAPPY',
  },

  // Ambassador programme (founder, 2026-10-29): Pro earned by friends who
  // keep learning. The inviter hears when a friend slips or comes back; the
  // friend hears a templated nudge or cheer from their inviter (once a day).
  AMBASSADOR_FRIEND: {
    audience: 'network', pref: 'networkActivity', throttleMinutes: 120,
    ttlSeconds: 24 * HOUR, tag: 'ambassador-friend', teyState: 'ENCOURAGING',
  },
  AMBASSADOR_PRO: {
    audience: 'network', pref: 'networkActivity', throttleMinutes: 0,
    ttlSeconds: 48 * HOUR, tag: 'ambassador-pro', teyState: 'REMINDER',
  },
  AMBASSADOR_NUDGE: {
    audience: 'network', pref: 'networkActivity', throttleMinutes: 0,
    ttlSeconds: 8 * HOUR, tag: 'ambassador-nudge', teyState: 'ENCOURAGING',
  },

  // Profile photos (founder, 2026-10-28): one reminder on day 2 if they
  // still have no photo — once ever, via the dedupe key — and the inbox note
  // when Teyro HQ removes a reported photo.
  PROFILE_PHOTO_NUDGE: {
    audience: 'network', pref: 'networkActivity', throttleMinutes: 0,
    ttlSeconds: 12 * HOUR, tag: 'profile-photo', teyState: 'ENCOURAGING',
  },
  PROFILE_PHOTO_REMOVED: {
    audience: 'learner', pref: 'dailyReminders', throttleMinutes: 0,
    ttlSeconds: 24 * HOUR, tag: 'profile-photo', teyState: 'REMINDER',
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
  // The month's Teyro Pro pool share landed in their earnings.
  STUDIO_POOL: {
    audience: 'creator', pref: 'creatorActivity', throttleMinutes: 0,
    ttlSeconds: 72 * HOUR, tag: 'studio-pool', teyState: 'CELEBRATING',
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
  // Buddies, nudges and cheers: its own budget so a busy network can't
  // swallow the streak saver, and a quiet one can't be drowned by leagues.
  network: 4,
};

/**
 * Back-off (docs/TEYRO_NETWORK_PLAN.md phase 5): when someone has ignored
 * the last few pushes of a kind, stop pushing that kind — the bell row is
 * still written — and try again once a week. Opening any one of the last few
 * clears it. Network notifications only for now; the reminder ladder and the
 * league keep their own rules.
 */
export const BACKOFF = {
  audiences: ['network'] as NotifyAudience[],
  /** This many unopened pushes of one kind in a row… */
  ignored: 5,
  /** …holds pushes of that kind for this long after the newest of them. */
  days: 7,
};

/** `recent`: the newest pushes of one kind to one person, newest first. */
export function backedOff(recent: { sentAt: Date; openedAt: Date | null }[], now = new Date()): boolean {
  if (recent.length < BACKOFF.ignored) return false;
  const window = recent.slice(0, BACKOFF.ignored);
  if (window.some((d) => d.openedAt !== null)) return false;
  return now.getTime() - window[0].sentAt.getTime() < BACKOFF.days * 86_400_000;
}

export function kindsFor(audience: NotifyAudience): NotifyKind[] {
  return (Object.keys(NOTIFY_KINDS) as NotifyKind[]).filter(
    (k) => NOTIFY_KINDS[k].audience === audience,
  );
}
