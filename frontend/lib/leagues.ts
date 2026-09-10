/**
 * League ladder display metadata — the frontend mirror of the backend's
 * `backend/src/league/league.config.ts` (which stays the source of truth for
 * mechanics; this file only carries presentation: names, badge colors, and
 * zone subtitles for the Duolingo-style leaderboard screen).
 */

export type LeagueTier =
  | 'BRONZE'
  | 'SILVER'
  | 'GOLD'
  | 'SAPPHIRE'
  | 'RUBY'
  | 'EMERALD'
  | 'AMETHYST'
  | 'PEARL'
  | 'DIAMOND'
  | 'DIAMOND_TOURNAMENT';

export interface LeagueMeta {
  tier: LeagueTier;
  /** Full display name, e.g. "Bronze League" / "Diamond Tournament". */
  name: string;
  /** Short label for compact strips. */
  shortName: string;
  /** Weekly stakes line shown under the league title. */
  zone: string;
  colors: {
    /** Main shield body (top of the vertical gradient). */
    light: string;
    /** Main shield body. */
    base: string;
    /** Bottom of the gradient / rim. */
    dark: string;
  };
  emblem: 'feather' | 'trophy';
}

export const LEAGUE_LADDER: LeagueMeta[] = [
  {
    tier: 'BRONZE',
    name: 'Bronze League',
    shortName: 'Bronze',
    zone: 'Top 20 advance to the next league',
    colors: { light: '#D98E4F', base: '#B4713E', dark: '#7C4A21' },
    emblem: 'feather',
  },
  {
    tier: 'SILVER',
    name: 'Silver League',
    shortName: 'Silver',
    zone: 'Top 15 advance to the next league',
    colors: { light: '#CBD3DD', base: '#98A2AE', dark: '#626B77' },
    emblem: 'feather',
  },
  {
    tier: 'GOLD',
    name: 'Gold League',
    shortName: 'Gold',
    zone: 'Top 10 advance to the next league',
    colors: { light: '#FFD65C', base: '#EDB514', dark: '#B98A00' },
    emblem: 'feather',
  },
  {
    tier: 'SAPPHIRE',
    name: 'Sapphire League',
    shortName: 'Sapphire',
    zone: 'Top 10 advance to the next league',
    colors: { light: '#6C9BF2', base: '#3670DC', dark: '#1E4AA6' },
    emblem: 'feather',
  },
  {
    tier: 'RUBY',
    name: 'Ruby League',
    shortName: 'Ruby',
    zone: 'Top 10 advance to the next league',
    colors: { light: '#F28286', base: '#DE4A4F', dark: '#A8262C' },
    emblem: 'feather',
  },
  {
    tier: 'EMERALD',
    name: 'Emerald League',
    shortName: 'Emerald',
    zone: 'Top 10 advance to the next league',
    colors: { light: '#6FDB97', base: '#2FB463', dark: '#1B7E43' },
    emblem: 'feather',
  },
  {
    tier: 'AMETHYST',
    name: 'Amethyst League',
    shortName: 'Amethyst',
    zone: 'Top 10 advance to the next league',
    colors: { light: '#C394EC', base: '#9A5CD0', dark: '#6E349F' },
    emblem: 'feather',
  },
  {
    tier: 'PEARL',
    name: 'Pearl League',
    shortName: 'Pearl',
    zone: 'Top 10 advance to the next league',
    colors: { light: '#EDF2F8', base: '#C2CFDE', dark: '#8B9DB4' },
    emblem: 'feather',
  },
  {
    tier: 'DIAMOND',
    name: 'Diamond League',
    shortName: 'Diamond',
    zone: 'Top 10 qualify for the Diamond Tournament',
    colors: { light: '#9BE4F8', base: '#4EC3EA', dark: '#2391BC' },
    emblem: 'feather',
  },
  {
    tier: 'DIAMOND_TOURNAMENT',
    name: 'Diamond Tournament',
    shortName: 'Tournament',
    zone: 'Top 3 become champions',
    colors: { light: '#6C8CFF', base: '#3D5AFE', dark: '#2438B8' },
    emblem: 'trophy',
  },
];

const LADDER_BY_TIER = new Map(LEAGUE_LADDER.map((l) => [l.tier, l]));

export function getLeagueMeta(tier: string | null | undefined): LeagueMeta {
  return LADDER_BY_TIER.get((tier ?? 'BRONZE') as LeagueTier) ?? LEAGUE_LADDER[0];
}

/** The tier above, or null at the ceiling (Diamond Tournament). */
export function getNextLeague(tier: LeagueTier): LeagueMeta | null {
  const i = LEAGUE_LADDER.findIndex((l) => l.tier === tier);
  return i >= 0 && i < LEAGUE_LADDER.length - 1 ? LEAGUE_LADDER[i + 1] : null;
}

/**
 * Countdown label, Duolingo-style: "6 days" while far out, ticking clock
 * ("5h 32m" / "42m") under a day.
 */
export function formatWeekCountdown(endsAtIso: string, nowMs = Date.now()): string {
  const ms = new Date(endsAtIso).getTime() - nowMs;
  if (ms <= 0) return '0m';
  const minutes = Math.floor(ms / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days >= 1) return `${days} day${days === 1 ? '' : 's'}`;
  if (hours >= 1) return `${hours}h ${minutes % 60}m`;
  return `${Math.max(minutes, 1)}m`;
}
