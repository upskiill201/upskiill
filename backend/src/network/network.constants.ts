/**
 * Every tunable of the Teyro Network in one place (docs/TEYRO_NETWORK_PLAN.md).
 */

/** Study Buddies are a close circle, not a follower count. */
export const MAX_BUDDIES = 5;

/** Pending requests one person may have out at once — stops request spraying. */
export const MAX_OUTGOING_REQUESTS = 10;

/** The feed reads this far back. */
export const FEED_WINDOW_DAYS = 7;

/** The feed ends: after this many cards it says "You're caught up". */
export const FEED_CAP = 15;

/** Rows scored per feed build. Bounded so one load is one indexed scan. */
export const FEED_CANDIDATES = 300;

/** A card's weight halves every this-many hours. */
export const FRESHNESS_HALF_LIFE_HOURS = 24;

/** How close the author is to the viewer (plan §2). */
export const AFFINITY = {
  buddy: 1.0,
  follow: 0.5,
  classmate: 0.35,
} as const;

export type ActivityType =
  | 'COURSE_STARTED'
  | 'LESSON_COMPLETED'
  | 'STREAK_MILESTONE'
  | 'ACHIEVEMENT_UNLOCKED'
  | 'COURSE_FINISHED'
  | 'WORK_SHARED';

export const TYPE_WEIGHT: Record<ActivityType, number> = {
  COURSE_STARTED: 1.2,
  LESSON_COMPLETED: 0.8,
  STREAK_MILESTONE: 1.3,
  ACHIEVEMENT_UNLOCKED: 1.0,
  // Finishing a course is the biggest thing a learner does — and the card
  // most likely to make a friend start it.
  COURSE_FINISHED: 1.6,
  // Proof of work: something they built — the card most likely to make a
  // classmate want to build it too.
  WORK_SHARED: 1.4,
};

/** Boost when the card's course is one the viewer is taking (or could start). */
export const LEARN_INTENT_ENROLLED = 1.6;
export const LEARN_INTENT_COURSE_START = 1.25;

/** Streak days worth a card. */
export const STREAK_MILESTONES = new Set([3, 7, 14, 30, 50, 100, 150, 200, 365, 500, 1000]);

/** Enrolled within this many days of each other in the same course = cohort. */
export const COHORT_WINDOW_DAYS = 7;

/** How far back a shared buddy streak is computed. */
export const SHARED_STREAK_LOOKBACK_DAYS = 120;

/** Inbox row types (frontend lib/notificationCopy.tsx renders these). */
/**
 * A real profile photo nudges someone up buddy suggestions and matching —
 * a small tie-breaker, never enough to beat a better-fitting classmate.
 * Faces get requests accepted; it also gives everyone a reason to add one.
 */
export const PHOTO_BOOST = 0.5;

export const INBOX = {
  BUDDY_REQUEST: 'TEY_BUDDY_REQUEST',
  BUDDY_ACCEPTED: 'TEY_BUDDY_ACCEPTED',
  BUDDY_NUDGE: 'TEY_BUDDY_NUDGE',
  BUDDY_LEARNED: 'TEY_BUDDY_LEARNED',
  NUDGE_WORKED: 'TEY_NUDGE_WORKED',
  NETWORK_CHEER: 'TEY_NETWORK_CHEER',
  INSPIRED: 'TEY_INSPIRED',
  BUDDY_STREAK_ENDING: 'TEY_BUDDY_STREAK_ENDING',
  HELP_REQUEST: 'TEY_HELP_REQUEST',
  HELP_WORKED: 'TEY_HELP_WORKED',
  SQUAD_INVITE: 'TEY_SQUAD_INVITE',
  SQUAD_JOINED: 'TEY_SQUAD_JOINED',
  SQUAD_ALMOST: 'TEY_SQUAD_ALMOST',
  SQUAD_GOAL_MET: 'TEY_SQUAD_GOAL_MET',
  DUEL_RECEIVED: 'TEY_DUEL_RECEIVED',
  DUEL_RESULT: 'TEY_DUEL_RESULT',
} as const;

/** What the browser may report (network_events). Everything else is server-only. */
export type ClientEventKind = 'IMPRESSION' | 'CTA' | 'PROFILE_OPEN';
export const CLIENT_EVENT_KINDS: ReadonlySet<string> = new Set<ClientEventKind>(['IMPRESSION', 'CTA', 'PROFILE_OPEN']);
export type ServerEventKind = 'CHEER' | 'LESSON_FROM_CARD' | 'ENROLLED_FROM_CARD';

/** A "Learn this too" tap counts for an enrolment within this many hours… */
export const ATTRIBUTION_ENROL_HOURS = 48;
/** …and for a lesson ("lessons started because of another person") within this many. */
export const ATTRIBUTION_LESSON_HOURS = 2;

/** Buddy streaks worth an evening warning start here. */
export const STREAK_ENDING_MIN_DAYS = 2;
/** Learner-local hour the "buddy streak ends tonight" push goes out. */
export const STREAK_ENDING_LOCAL_HOUR = 20;

/** A lesson question goes to at most this many people who passed it… */
export const HELPERS_PER_QUESTION = 3;
/** …and nobody is asked more than this many times a day. */
export const HELP_ROUTE_MAX_PER_DAY = 2;

/** Review cards: lessons finished this many days ago are due (spaced). */
export const REVIEW_MIN_DAYS = 1;
export const REVIEW_MAX_DAYS = 30;
/** Review cards in one feed load. */
export const REVIEWS_PER_FEED = 2;

/** Shared code is capped so a card stays a card. */
export const SHARED_CODE_MAX = 2000;
/** Shares per learner per day. */
export const SHARES_PER_DAY = 5;

/** Squads (phase 4): small on purpose — everyone's effort is visible. */
export const SQUAD_MAX_MEMBERS = 6;
export const SQUAD_GOAL_MIN = 5;
export const SQUAD_GOAL_MAX = 200;
export const SQUAD_GOAL_DEFAULT = 15;
/** "One more push": lessons left when the squad hears it's nearly there. */
export const SQUAD_ALMOST_LEFT = 2;

/** Duels (phase 4). */
export const DUEL_QUESTIONS = 5;
export const DUEL_TTL_HOURS = 48;
/** Open duels one person may have at once. */
export const DUELS_OPEN_MAX = 5;

/** Co-learning presence (phase 4). */
export const PRESENCE_LIVE_MINUTES = 3;
/** A ping after this long a gap starts a new sitting (and may tell buddies). */
export const PRESENCE_NEW_SITTING_MINUTES = 10;

/** The `likes.entityType` a Cheer is stored under. */
export const CHEER_ENTITY = 'ACTIVITY';

export const pairKeyOf = (a: string, b: string) => (a < b ? `${a}:${b}` : `${b}:${a}`);
