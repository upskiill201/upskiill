/**
 * The timezone layer.
 *
 * Everywhere else in this codebase, "local time" means a client-supplied
 * x-timezone-offset header (see common/utils/parse-timezone-offset.ts). That
 * works for request-scoped reads, but a background scheduler has no client to
 * ask at 8pm — so Tey resolves local time from the zone persisted on User.
 *
 * IANA is preferred because it survives DST; the stored offset is a fallback
 * for clients that could not resolve a zone name. Nothing here mutates streak
 * state, and nothing here duplicates streak arithmetic.
 */

import { parseTimezoneOffset } from '../../common/utils/parse-timezone-offset';

/** Used when a learner has neither a zone nor an offset yet (WAT — Teyro's
 *  largest market, and a better guess than UTC for a Lagos-first product). */
export const TEY_DEFAULT_TIMEZONE = 'Africa/Lagos';

export interface TeyLocalNow {
  /** YYYY-MM-DD in the learner's zone. */
  date: string;
  /** Minutes elapsed since local midnight, 0..1439. */
  minutesOfDay: number;
  /** Local hour, 0..23. */
  hour: number;
  /** Offset actually used, in the Date.getTimezoneOffset sign convention
   *  (i.e. UTC+1 is -60), for interop with the existing header-based code. */
  offsetMinutes: number;
  /** The IANA zone used, or null when we fell back to a raw offset. */
  timezone: string | null;
}

export interface TimezoneCarrier {
  timezone?: string | null;
  timezoneOffsetMinutes?: number | null;
}

const partsCache = new Map<string, Intl.DateTimeFormat>();

function formatterFor(timeZone: string): Intl.DateTimeFormat | null {
  const cached = partsCache.get(timeZone);
  if (cached) return cached;
  try {
    const fmt = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
    partsCache.set(timeZone, fmt);
    return fmt;
  } catch {
    // Unknown/invalid zone string — caller falls back to the offset path.
    return null;
  }
}

/** True when the string names a zone this runtime can actually resolve. */
export function isValidTimezone(tz: string | null | undefined): tz is string {
  if (!tz || typeof tz !== 'string' || tz.length > 64) return false;
  return formatterFor(tz) !== null;
}

function fromIana(at: Date, timeZone: string): TeyLocalNow | null {
  const fmt = formatterFor(timeZone);
  if (!fmt) return null;

  const parts = fmt.formatToParts(at);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const year = get('year');
  const month = get('month');
  const day = get('day');
  // Intl renders midnight as "24" in some locales/engines under hour12:false.
  const hour = Number(get('hour')) % 24;
  const minute = Number(get('minute'));
  if (!year || !month || !day || Number.isNaN(hour) || Number.isNaN(minute)) {
    return null;
  }

  // Recover the true offset (DST-correct) by diffing the wall clock we just
  // rendered against the instant it came from.
  const asUtc = Date.UTC(Number(year), Number(month) - 1, Number(day), hour, minute);
  const offsetMinutes = -Math.round(
    (asUtc - at.getTime() + at.getSeconds() * 1000 + at.getMilliseconds()) / 60000,
  );

  return {
    date: `${year}-${month}-${day}`,
    minutesOfDay: hour * 60 + minute,
    hour,
    offsetMinutes,
    timezone: timeZone,
  };
}

function fromOffset(at: Date, offsetMinutes: number): TeyLocalNow {
  // Same shift-then-read-UTC trick the existing streak/progress services use,
  // kept identical so local-day strings agree across the codebase.
  const shifted = new Date(at.getTime() - offsetMinutes * 60 * 1000);
  const yyyy = shifted.getUTCFullYear();
  const mm = String(shifted.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(shifted.getUTCDate()).padStart(2, '0');
  const hour = shifted.getUTCHours();
  const minute = shifted.getUTCMinutes();
  return {
    date: `${yyyy}-${mm}-${dd}`,
    minutesOfDay: hour * 60 + minute,
    hour,
    offsetMinutes,
    timezone: null,
  };
}

/**
 * Resolve the learner's local wall clock. Preference order:
 *   1. their persisted IANA zone
 *   2. their persisted offset
 *   3. the platform default zone
 */
export function resolveLocalNow(
  user: TimezoneCarrier | null | undefined,
  at: Date = new Date(),
): TeyLocalNow {
  if (isValidTimezone(user?.timezone)) {
    const viaIana = fromIana(at, user!.timezone!);
    if (viaIana) return viaIana;
  }

  if (
    user?.timezoneOffsetMinutes !== null &&
    user?.timezoneOffsetMinutes !== undefined
  ) {
    return fromOffset(at, parseTimezoneOffset(user.timezoneOffsetMinutes));
  }

  const viaDefault = fromIana(at, TEY_DEFAULT_TIMEZONE);
  return viaDefault ?? fromOffset(at, 0);
}

/** YYYY-MM-DD for an arbitrary instant in the learner's zone. */
export function localDateFor(
  user: TimezoneCarrier | null | undefined,
  at: Date,
): string {
  return resolveLocalNow(user, at).date;
}

/** Whole calendar days between two YYYY-MM-DD strings (DST-immune by
 *  construction, since it compares calendar dates rather than instants). */
export function daysBetween(laterDay: string, earlierDay: string): number {
  const [y1, m1, d1] = laterDay.split('-').map(Number);
  const [y2, m2, d2] = earlierDay.split('-').map(Number);
  return Math.round(
    (Date.UTC(y1, m1 - 1, d1) - Date.UTC(y2, m2 - 1, d2)) / 86400000,
  );
}

/** Monday-anchored week start, matching UserWeeklyProgress.weekStartDate. */
export function mondayOf(localDate: string): string {
  const [y, m, d] = localDate.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  // getUTCDay: 0=Sunday. Shift so Monday is the anchor.
  const shift = (dt.getUTCDay() + 6) % 7;
  dt.setUTCDate(dt.getUTCDate() - shift);
  return dt.toISOString().slice(0, 10);
}

/** Hours remaining before the learner's local midnight — the input that turns
 *  STREAK_AT_RISK into STREAK_CRITICAL. */
export function hoursUntilLocalMidnight(now: TeyLocalNow): number {
  return (1440 - now.minutesOfDay) / 60;
}
