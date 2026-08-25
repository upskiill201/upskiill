/**
 * League ladder configuration — the single source of truth for the weekly
 * Duolingo-style leaderboard mechanics. Mirrors Duolingo's published rules:
 *
 *  - Weeks run Monday 00:00 UTC → Sunday 24:00 UTC for everyone (one clock).
 *  - Earning any XP during the week joins you to a cohort of up to
 *    COHORT_CAPACITY users in your current tier.
 *  - At rollover: top PROMOTION_ZONE[league] promote, bottom
 *    DEMOTION_ZONE_SIZE demote (never in Bronze, and only when the cohort is
 *    big enough for a demotion zone to make sense), everyone else stays.
 *  - Diamond's top 10 qualify for next week's Diamond Tournament; the
 *    tournament's top TOURNAMENT_WINNERS are champions (win counter) and all
 *    tournament entrants return to Diamond afterwards.
 *  - Ties break to whoever reached their total first (xpUpdatedAt ASC).
 *  - A full week with no XP drops you one tier (inactivity demotion), with
 *    Bronze as the floor.
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

export const LEAGUE_LADDER: LeagueTier[] = [
  'BRONZE',
  'SILVER',
  'GOLD',
  'SAPPHIRE',
  'RUBY',
  'EMERALD',
  'AMETHYST',
  'PEARL',
  'DIAMOND',
  'DIAMOND_TOURNAMENT',
];

export const COHORT_CAPACITY = 30;
export const DEMOTION_ZONE_SIZE = 5;
/** Demotion zones only apply to cohorts at least this full (a 3-person cohort
 *  where everyone "loses" would be nonsense). */
export const MIN_COHORT_FOR_DEMOTION = 10;
export const TOURNAMENT_WINNERS = 3;

export const PROMOTION_ZONE: Record<Exclude<LeagueTier, 'DIAMOND_TOURNAMENT'>, number> = {
  BRONZE: 20,
  SILVER: 15,
  GOLD: 10,
  SAPPHIRE: 10,
  RUBY: 10,
  EMERALD: 10,
  AMETHYST: 10,
  PEARL: 10,
  DIAMOND: 10, // top 10 qualify for the Diamond Tournament
};

export function getPromotionZone(league: LeagueTier): number {
  return league === 'DIAMOND_TOURNAMENT' ? TOURNAMENT_WINNERS : PROMOTION_ZONE[league];
}

/**
 * Promotion zone in effect for a cohort of `total` members. Full cohorts use
 * Duolingo's published zones; tiny cohorts (below the demotion threshold) cap
 * promotion at the top 3 so a 2-person cohort can't march its whole roster up
 * the ladder week after week.
 */
export function getPromotionZoneFor(league: LeagueTier, total: number): number {
  if (league === 'DIAMOND_TOURNAMENT') return TOURNAMENT_WINNERS;
  if (total < MIN_COHORT_FOR_DEMOTION) return Math.min(3, total);
  return PROMOTION_ZONE[league];
}

// ─── Ladder movement ─────────────────────────────────────────────────────────

export function promoteTier(league: LeagueTier): LeagueTier {
  const i = LEAGUE_LADDER.indexOf(league);
  return LEAGUE_LADDER[Math.min(i + 1, LEAGUE_LADDER.length - 1)];
}

export function demoteTier(league: LeagueTier): LeagueTier {
  const i = LEAGUE_LADDER.indexOf(league);
  return LEAGUE_LADDER[Math.max(i - 1, 0)];
}

// ─── Settlement resolution ───────────────────────────────────────────────────

export type LeagueOutcome =
  | 'PROMOTED'
  | 'DEMOTED'
  | 'STAYED'
  | 'CHAMPION'
  | 'TOURNAMENT_EXIT'
  | 'INACTIVE_DEMOTED';

/**
 * Resolves what finishing at `rank` (1-based) in a settled cohort of `total`
 * members means: the outcome label and the tier the member moves to.
 */
export function resolveOutcome(
  league: LeagueTier,
  rank: number,
  total: number,
): { outcome: LeagueOutcome; newTier: LeagueTier } {
  if (league === 'DIAMOND_TOURNAMENT') {
    return rank <= TOURNAMENT_WINNERS
      ? { outcome: 'CHAMPION', newTier: 'DIAMOND' }
      : { outcome: 'TOURNAMENT_EXIT', newTier: 'DIAMOND' };
  }

  const promo = getPromotionZoneFor(league, total);
  if (rank <= promo) {
    return { outcome: 'PROMOTED', newTier: promoteTier(league) };
  }

  const demotes =
    league !== 'BRONZE' &&
    total >= MIN_COHORT_FOR_DEMOTION &&
    rank > total - DEMOTION_ZONE_SIZE;
  if (demotes) {
    return { outcome: 'DEMOTED', newTier: demoteTier(league) };
  }

  return { outcome: 'STAYED', newTier: league };
}

/** Tier a member moves to for a given outcome — used for result displays. */
export function outcomeNewTier(outcome: string, league: LeagueTier): LeagueTier {
  switch (outcome) {
    case 'PROMOTED':
      return promoteTier(league);
    case 'DEMOTED':
    case 'INACTIVE_DEMOTED':
      return demoteTier(league);
    case 'CHAMPION':
    case 'TOURNAMENT_EXIT':
      return 'DIAMOND';
    default:
      return league;
  }
}

// ─── UTC week helpers (one global clock — YYYY-MM-DD Monday strings) ────────

/** Monday (UTC) of the week containing `date`, as YYYY-MM-DD. */
export function getUtcWeekStart(date: Date = new Date()): string {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = d.getUTCDay(); // 0=Sun … 6=Sat
  d.setUTCDate(d.getUTCDate() + (day === 0 ? -6 : 1 - day));
  return d.toISOString().split('T')[0];
}

/** YYYY-MM-DD + 7 days. */
export function getNextWeekStart(weekStart: string): string {
  return addDays(weekStart, 7);
}

export function addDays(weekStart: string, n: number): string {
  const d = new Date(weekStart + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().split('T')[0];
}

/** The moment week `weekStart` ends: next Monday 00:00 UTC. */
export function getWeekEndDate(weekStart: string): Date {
  return new Date(addDays(weekStart, 7) + 'T00:00:00.000Z');
}
