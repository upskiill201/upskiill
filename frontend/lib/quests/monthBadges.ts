/**
 * Every month's challenge has its own badge — a name, a symbol, a colour —
 * so earning October feels different from earning September, and a shelf of
 * past months reads like a collection (Duolingo's monthly badges).
 *
 * Presentation only: the rules (goal days, milestones, the badge being
 * awarded) live on the server in monthly-quest.
 */

export type MonthGlyph =
  | 'sparkles'
  | 'heart'
  | 'sprout'
  | 'cloudSun'
  | 'flower'
  | 'sun'
  | 'flame'
  | 'waves'
  | 'book'
  | 'leaf'
  | 'mountain'
  | 'trophy';

export interface MonthBadge {
  /** 0 = January. */
  month: number;
  short: string;
  name: string;
  glyph: MonthGlyph;
  /** CSS colour (tokens live in MonthBadge.module.css). */
  color: string;
}

const MONTHS: Omit<MonthBadge, 'month' | 'color'>[] = [
  { short: 'JAN', name: 'Fresh Start', glyph: 'sparkles' },
  { short: 'FEB', name: 'Learn with Heart', glyph: 'heart' },
  { short: 'MAR', name: 'Spring Sprint', glyph: 'sprout' },
  { short: 'APR', name: 'Rain or Shine', glyph: 'cloudSun' },
  { short: 'MAY', name: 'In Full Bloom', glyph: 'flower' },
  { short: 'JUN', name: 'Midyear Momentum', glyph: 'sun' },
  { short: 'JUL', name: 'Summer Streak', glyph: 'flame' },
  { short: 'AUG', name: 'Deep Dive', glyph: 'waves' },
  { short: 'SEP', name: 'Back to Basics', glyph: 'book' },
  { short: 'OCT', name: 'Harvest', glyph: 'leaf' },
  { short: 'NOV', name: 'Steady Climb', glyph: 'mountain' },
  { short: 'DEC', name: 'Finish Strong', glyph: 'trophy' },
];

/** From "YYYY-MM". */
export function monthBadge(monthKey: string): MonthBadge {
  const m = Math.max(0, Math.min(11, Number(monthKey.slice(5, 7)) - 1 || 0));
  return { ...MONTHS[m], month: m, color: `var(--month-${m + 1})` };
}

/** "September" from "YYYY-MM". */
export function monthName(monthKey: string): string {
  const m = Number(monthKey.slice(5, 7)) - 1;
  return new Date(2000, Math.max(0, m), 1).toLocaleString('en-US', { month: 'long' });
}
