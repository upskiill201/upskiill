import {
  daysBetween,
  hoursUntilLocalMidnight,
  isValidTimezone,
  localDateFor,
  mondayOf,
  resolveLocalNow,
  TEY_DEFAULT_TIMEZONE,
} from './local-time.util';

describe('local-time.util', () => {
  describe('resolveLocalNow', () => {
    it('prefers the IANA zone over a stale persisted offset', () => {
      // 2026-07-01T23:30Z. Lagos is UTC+1 year-round, so it is already the 2nd.
      // The offset says UTC, which would report the 1st -- IANA must win.
      const at = new Date('2026-07-01T23:30:00Z');
      const now = resolveLocalNow(
        { timezone: 'Africa/Lagos', timezoneOffsetMinutes: 0 },
        at,
      );

      expect(now.date).toBe('2026-07-02');
      expect(now.hour).toBe(0);
      expect(now.timezone).toBe('Africa/Lagos');
      // Date.getTimezoneOffset convention: UTC+1 is -60.
      expect(now.offsetMinutes).toBe(-60);
    });

    it('tracks DST transitions rather than caching one offset', () => {
      // America/New_York is UTC-5 in January and UTC-4 in July. A stored
      // offset cannot express both; a zone name can.
      const winter = resolveLocalNow(
        { timezone: 'America/New_York' },
        new Date('2026-01-15T17:00:00Z'),
      );
      const summer = resolveLocalNow(
        { timezone: 'America/New_York' },
        new Date('2026-07-15T17:00:00Z'),
      );

      expect(winter.offsetMinutes).toBe(300); // UTC-5
      expect(winter.hour).toBe(12);
      expect(summer.offsetMinutes).toBe(240); // UTC-4
      expect(summer.hour).toBe(13);
    });

    it('falls back to the stored offset when the zone is unusable', () => {
      const now = resolveLocalNow(
        { timezone: 'Not/AZone', timezoneOffsetMinutes: -120 },
        new Date('2026-07-01T23:30:00Z'),
      );

      expect(now.timezone).toBeNull();
      expect(now.date).toBe('2026-07-02');
      expect(now.hour).toBe(1);
    });

    it('clamps an absurd stored offset instead of producing an Invalid Date', () => {
      const now = resolveLocalNow(
        { timezoneOffsetMinutes: -99999 },
        new Date('2026-07-01T12:00:00Z'),
      );

      // parseTimezoneOffset caps at +-840 minutes.
      expect(now.offsetMinutes).toBe(-840);
      expect(now.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('falls back to the platform default when the learner has no zone yet', () => {
      const now = resolveLocalNow(null, new Date('2026-07-01T23:30:00Z'));
      expect(now.timezone).toBe(TEY_DEFAULT_TIMEZONE);
      expect(now.date).toBe('2026-07-02');
    });

    it('reports minutesOfDay consistently with hour', () => {
      const now = resolveLocalNow(
        { timezone: 'Africa/Lagos' },
        new Date('2026-07-01T19:45:00Z'), // 20:45 local
      );
      expect(now.hour).toBe(20);
      expect(now.minutesOfDay).toBe(20 * 60 + 45);
    });
  });

  describe('isValidTimezone', () => {
    it.each([
      ['Africa/Lagos', true],
      ['America/New_York', true],
      ['UTC', true],
      ['Not/AZone', false],
      ['', false],
      [null, false],
      [undefined, false],
      ['A'.repeat(65), false],
    ])('%s -> %s', (input, expected) => {
      expect(isValidTimezone(input)).toBe(expected);
    });
  });

  describe('localDateFor', () => {
    it('resolves an arbitrary instant in the learner zone', () => {
      expect(
        localDateFor(
          { timezone: 'Africa/Lagos' },
          new Date('2026-03-09T23:10:00Z'),
        ),
      ).toBe('2026-03-10');
    });
  });

  describe('daysBetween', () => {
    it.each([
      ['2026-03-10', '2026-03-09', 1],
      ['2026-03-10', '2026-03-10', 0],
      ['2026-03-10', '2026-03-07', 3],
      ['2026-03-01', '2026-02-28', 1],
      ['2026-01-01', '2025-12-31', 1],
    ])('%s - %s = %i', (later, earlier, expected) => {
      expect(daysBetween(later, earlier)).toBe(expected);
    });

    it('is immune to DST because it compares calendar dates, not instants', () => {
      // US DST starts 2026-03-08; that local day is only 23 hours long.
      expect(daysBetween('2026-03-09', '2026-03-07')).toBe(2);
    });
  });

  describe('mondayOf', () => {
    it.each([
      ['2026-09-04', '2026-08-31'], // Friday  -> that Monday
      ['2026-08-31', '2026-08-31'], // Monday  -> itself
      ['2026-09-06', '2026-08-31'], // Sunday  -> the Monday that began the week
    ])('%s -> %s', (date, expected) => {
      expect(mondayOf(date)).toBe(expected);
    });
  });

  describe('hoursUntilLocalMidnight', () => {
    it('shrinks as the local day runs out', () => {
      const at22 = hoursUntilLocalMidnight({
        date: '2026-09-04',
        minutesOfDay: 22 * 60,
        hour: 22,
        offsetMinutes: 0,
        timezone: 'UTC',
      });
      expect(at22).toBe(2);
    });
  });
});
