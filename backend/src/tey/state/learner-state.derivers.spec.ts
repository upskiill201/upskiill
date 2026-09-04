import {
  deriveCourseState,
  deriveEngagementState,
  derivePerformanceState,
  deriveStreakState,
  updateUsualHour,
} from './learner-state.derivers';
import type { TeyLocalNow } from './local-time.util';

const at = (hour: number): TeyLocalNow => ({
  date: '2026-09-04',
  minutesOfDay: hour * 60,
  hour,
  offsetMinutes: -60,
  timezone: 'Africa/Lagos',
});

describe('deriveStreakState', () => {
  const base = {
    streakDays: 12,
    todayGoalCompleted: false,
    freezesAvailable: 0,
    daysSinceStreakEarned: 1,
    usualHourLocal: 19,
    now: at(20),
  };

  it('is SAFE the moment the goal is done, whatever the hour', () => {
    // The ordering here is load-bearing: a learner who finished at 9am must
    // never be told at 11pm that their streak is at risk.
    expect(
      deriveStreakState({ ...base, todayGoalCompleted: true, now: at(23) }),
    ).toBe('STREAK_SAFE');
  });

  it('is ACTIVE before the usual study window has passed', () => {
    expect(deriveStreakState({ ...base, now: at(14) })).toBe('STREAK_ACTIVE');
  });

  it('is AT_RISK once an hour past the usual study time', () => {
    expect(deriveStreakState({ ...base, usualHourLocal: 19, now: at(20) })).toBe(
      'STREAK_AT_RISK',
    );
  });

  it('is AT_RISK by the evening default when there is no habit data yet', () => {
    expect(
      deriveStreakState({ ...base, usualHourLocal: null, now: at(20) }),
    ).toBe('STREAK_AT_RISK');
  });

  it('does not wait past the latest at-risk hour for a night-owl learner', () => {
    // usualHour 23 would push at-risk to midnight, which never arrives.
    expect(
      deriveStreakState({ ...base, usualHourLocal: 23, now: at(21) }),
    ).toBe('STREAK_AT_RISK');
  });

  it('is CRITICAL inside the last two hours of the local day', () => {
    expect(deriveStreakState({ ...base, now: at(22) })).toBe('STREAK_CRITICAL');
  });

  it('distinguishes never-had-a-streak from just-lost-one', () => {
    expect(
      deriveStreakState({
        ...base,
        streakDays: 0,
        daysSinceStreakEarned: null,
      }),
    ).toBe('NO_STREAK');

    expect(
      deriveStreakState({ ...base, streakDays: 0, daysSinceStreakEarned: 3 }),
    ).toBe('STREAK_LOST');
  });
});

describe('deriveEngagementState', () => {
  it.each([
    ['brand new learner', { daysSinceLastActivity: null, lifetimeLessons: 0, returnedToday: false }, 'NEW'],
    ['active today', { daysSinceLastActivity: 0, lifetimeLessons: 20, returnedToday: false }, 'ACTIVE'],
    ['one day off', { daysSinceLastActivity: 1, lifetimeLessons: 20, returnedToday: false }, 'INACTIVE_1_DAY'],
    ['two days off', { daysSinceLastActivity: 2, lifetimeLessons: 20, returnedToday: false }, 'COOLING_DOWN'],
    ['four days off', { daysSinceLastActivity: 4, lifetimeLessons: 20, returnedToday: false }, 'INACTIVE_3_DAYS'],
    ['nine days off', { daysSinceLastActivity: 9, lifetimeLessons: 20, returnedToday: false }, 'INACTIVE_7_DAYS'],
    ['a month off', { daysSinceLastActivity: 30, lifetimeLessons: 20, returnedToday: false }, 'DORMANT'],
    ['came back', { daysSinceLastActivity: 0, lifetimeLessons: 20, returnedToday: true }, 'RETURNING'],
  ])('%s -> %s', (_label, input, expected) => {
    expect(deriveEngagementState(input)).toBe(expected);
  });

  it('treats a lapsed learner with no lessons as NEW, not DORMANT', () => {
    // Someone who signed up and never started is a different product problem
    // than someone who studied for a month and stopped.
    expect(
      deriveEngagementState({
        daysSinceLastActivity: 40,
        lifetimeLessons: 0,
        returnedToday: false,
      }),
    ).toBe('NEW');
  });
});

describe('deriveCourseState', () => {
  it.each([
    ['not enrolled', { hasCourse: false, progressPct: 0, daysSinceCourseActivity: null }, 'NEW'],
    ['enrolled, untouched', { hasCourse: true, progressPct: 0, daysSinceCourseActivity: 1 }, 'NEW'],
    ['midway', { hasCourse: true, progressPct: 40, daysSinceCourseActivity: 1 }, 'IN_PROGRESS'],
    ['nearly done', { hasCourse: true, progressPct: 85, daysSinceCourseActivity: 1 }, 'NEAR_COMPLETION'],
    ['finished', { hasCourse: true, progressPct: 100, daysSinceCourseActivity: 30 }, 'COMPLETED'],
    ['left alone a week', { hasCourse: true, progressPct: 40, daysSinceCourseActivity: 9 }, 'ABANDONED'],
  ])('%s -> %s', (_label, input, expected) => {
    expect(deriveCourseState(input)).toBe(expected);
  });

  it('reports a completed course as COMPLETED even if long untouched', () => {
    expect(
      deriveCourseState({
        hasCourse: true,
        progressPct: 100,
        daysSinceCourseActivity: 400,
      }),
    ).toBe('COMPLETED');
  });
});

describe('derivePerformanceState', () => {
  it('is deliberately inert in this phase', () => {
    // Spec section 7 says performance states arrive gradually; nothing in the
    // current rule set branches on it, so we ship the seam without guessing.
    expect(derivePerformanceState()).toBe('STABLE');
  });
});

describe('updateUsualHour', () => {
  it('adopts the first observation outright', () => {
    expect(updateUsualHour(null, 0, 20)).toEqual({ hour: 20, samples: 1 });
  });

  it('drifts toward repeated new observations', () => {
    const next = updateUsualHour(20, 5, 22);
    expect(next.hour).toBeGreaterThan(20);
    expect(next.hour).toBeLessThanOrEqual(22);
    expect(next.samples).toBe(6);
  });

  it('averages across midnight rather than through noon', () => {
    // A circular mean of 23:00 and 01:00 is midnight. A naive arithmetic mean
    // would say noon -- and schedule every reminder twelve hours wrong.
    const next = updateUsualHour(23, 1, 1);
    expect([0, 23, 1]).toContain(next.hour);
    expect(next.hour).not.toBe(12);
  });

  it('caps the sample count so the estimate stays adaptable', () => {
    const next = updateUsualHour(20, 30, 21);
    expect(next.samples).toBe(30);
  });

  it('always returns an hour inside 0..23', () => {
    for (let h = 0; h < 24; h++) {
      const next = updateUsualHour(23, 3, h);
      expect(next.hour).toBeGreaterThanOrEqual(0);
      expect(next.hour).toBeLessThanOrEqual(23);
    }
  });
});
