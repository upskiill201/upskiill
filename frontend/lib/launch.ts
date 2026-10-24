/**
 * Launch gate — one place that says whether the app is open yet.
 *
 * Teyro Studio (creators) opens in October 2026 and the learner app launches
 * in November 2026. Until then nobody should walk into an empty app, so:
 *   - proxy.ts redirects logged-out visitors away from the app's front doors
 *   - every "start" button on the marketing site becomes "get notified"
 *     (they read START_HREF / STUDIO_HREF from here, so one flag flips them all)
 *
 * The flags are NEXT_PUBLIC_* so client components and the edge proxy read the
 * same value. They are inlined at build time: flipping one means changing the
 * env var in Vercel and redeploying.
 *
 *   NEXT_PUBLIC_LEARNER_GATE  'on' | 'off'   the learner app (launch: November)
 *   NEXT_PUBLIC_STUDIO_GATE   'on' | 'off'   Teyro Studio    (launch: October)
 *
 * Unset means: ON in production, OFF in development — a forgotten variable can
 * never open the app early, and local work is never blocked.
 */

function flag(value: string | undefined): boolean {
  if (value === 'on') return true;
  if (value === 'off') return false;
  return process.env.NODE_ENV === 'production';
}

export const LEARNER_GATE = flag(process.env.NEXT_PUBLIC_LEARNER_GATE);
export const STUDIO_GATE = flag(process.env.NEXT_PUBLIC_STUDIO_GATE);

/** Month-level on purpose: no countdown and no invented urgency. */
export const STUDIO_OPENS = 'October 2026';
export const APP_LAUNCHES = 'November 2026';

/**
 * How creators are paid, under Teyro Pro (founder, 2026-10-22): learners pay
 * one subscription that opens every course, and each month CREATOR_POOL_PCT
 * of every Pro learner's net payment is shared among the creators whose
 * courses they learned in, by minutes. Founding Creators are paid exactly
 * like every creator (founder, 2026-10-23); they keep the Founding badge and
 * founding benefits. Backend: pro.config proPoolSharePct, src/pro/pool.
 * Every marketing line about creator pay reads these.
 */
export const CREATOR_POOL_PCT = 50;
export const PRO_MONTHLY_USD = 12.99;
export const PRO_YEARLY_USD = 59.99;
/** A yearly Pro learner's payment, per month: $5.00. */
export const PRO_YEARLY_PER_MONTH_USD = Math.round((PRO_YEARLY_USD / 12) * 100) / 100;
/** Their monthly pool: half of it, before card fees and tax. */
export const POOL_PER_YEARLY_LEARNER_USD = Math.round(PRO_YEARLY_PER_MONTH_USD * CREATOR_POOL_PCT) / 100;
/** One short line, for chips and fine print. */
export const CREATOR_PAY_SHORT = `${CREATOR_POOL_PCT}% of every Pro learner's payment, shared by minutes`;

/**
 * The Founding Creator programme runs until the public launch (November
 * 2026): anyone who joins before then is a Founding Creator, whether Studio is
 * still gated or already open.
 *
 * Its own switch, NEXT_PUBLIC_FOUNDING_OPEN ('on' | 'off'), because the
 * learner app opens early (LEARNER_GATE off) while the programme carries on.
 * Unset means open, whatever the learner gate says: set it to 'off' on
 * public launch day to end the programme.
 */
export const FOUNDING_OPEN = process.env.NEXT_PUBLIC_FOUNDING_OPEN !== 'off';

/** Where "start learning" goes: the app, or the notify-me form while gated. */
export const LEARNER_ENTRY = LEARNER_GATE
  ? { href: '/#launch', label: 'Get notified', gated: true }
  : { href: '/start', label: 'Get started', gated: false };

/** Where "start teaching" goes: Studio onboarding, or the apply form while gated. */
export const STUDIO_ENTRY = STUDIO_GATE
  ? { href: '/teach#apply', label: 'Apply as a Founding Creator', gated: true }
  : { href: '/creator/onboarding', label: FOUNDING_OPEN ? 'Join as a Founding Creator' : 'Start teaching', gated: false };

/**
 * Blog posts hard-code /onboarding/0 (2,280 times across 641 posts). While the
 * app is gated those links resolve to the notify-me form instead; when the gate
 * opens they go back on their own — no post is ever edited.
 */
export function gateHref(href: string | undefined): string | undefined {
  if (!href) return href;
  if (LEARNER_GATE && (href === '/onboarding/0' || href === '/start' || href.startsWith('/onboarding/0?'))) {
    return LEARNER_ENTRY.href;
  }
  if (
    STUDIO_GATE &&
    (href.startsWith('/creator/onboarding') || href.startsWith('/creator/signup') || href.startsWith('/creator/login'))
  ) {
    return STUDIO_ENTRY.href;
  }
  return href;
}

export const WAITLIST_ROLES = ['learner', 'creator'] as const;
export type WaitlistRole = (typeof WAITLIST_ROLES)[number];
