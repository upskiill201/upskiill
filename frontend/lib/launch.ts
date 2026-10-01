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
 * Creator revenue share (per EarningsService: a new agreement defaults to 70%;
 * Founding Creators are set to 80% in Teyro HQ). Marketing copy reads these.
 */
export const STANDARD_SHARE_PCT = 70;
export const FOUNDING_SHARE_PCT = 80;

/**
 * The Founding Creator programme runs until the learner app launches (November
 * 2026): anyone who joins before then is a Founding Creator, whether Studio is
 * still gated or already open. It ends when LEARNER_GATE is turned off.
 */
export const FOUNDING_OPEN = LEARNER_GATE;

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
