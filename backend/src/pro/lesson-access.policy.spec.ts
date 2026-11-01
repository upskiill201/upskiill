import {
  decideLessonAccess,
  heartsNow,
  LessonAccessContext,
  localDay,
  nextLocalMidnight,
} from './lesson-access.policy';

const base: LessonAccessContext = {
  mode: 'start',
  proEnabled: true,
  privileged: false,
  isPro: false,
  legacyEntitled: false,
  freeCourse: false,
  legacyFreePreview: false,
  completedBefore: false,
  inFreeScope: true,
  forgivingHearts: false,
  lives: 5,
  claimedToday: false,
  claimsToday: 0,
  cap: 2,
  recentClaim: false,
};
const ctx = (over: Partial<LessonAccessContext>) => ({ ...base, ...over });

describe('decideLessonAccess', () => {
  it('owners and admins always pass, without using a slot', () => {
    expect(decideLessonAccess(ctx({ privileged: true, inFreeScope: false, lives: 0 }))).toEqual({
      allow: true,
      claim: false,
    });
  });

  it('Pro and old per-course plans open everything, hearts or not', () => {
    expect(decideLessonAccess(ctx({ isPro: true, inFreeScope: false, lives: 0, claimsToday: 9 })).allow).toBe(true);
    expect(decideLessonAccess(ctx({ legacyEntitled: true, inFreeScope: false })).allow).toBe(true);
  });

  it('replaying a finished lesson is always free', () => {
    expect(decideLessonAccess(ctx({ completedBefore: true, inFreeScope: false, claimsToday: 2 }))).toEqual({
      allow: true,
      claim: false,
    });
  });

  it('locks lessons outside the free scope', () => {
    expect(decideLessonAccess(ctx({ inFreeScope: false }))).toEqual({ allow: false, reason: 'LOCKED_LESSON' });
  });

  it('a free learner gets 2 lessons a day, then the daily-limit paywall', () => {
    expect(decideLessonAccess(ctx({ claimsToday: 0 }))).toEqual({ allow: true, claim: true });
    expect(decideLessonAccess(ctx({ claimsToday: 1 }))).toEqual({ allow: true, claim: true });
    expect(decideLessonAccess(ctx({ claimsToday: 2 }))).toEqual({ allow: false, reason: 'DAILY_LIMIT' });
  });

  it('re-opening a lesson already counted today uses no new slot', () => {
    expect(decideLessonAccess(ctx({ claimsToday: 2, claimedToday: true }))).toEqual({ allow: true, claim: false });
  });

  it('reading content (map prefetch) never spends a slot', () => {
    expect(decideLessonAccess(ctx({ mode: 'read', claimsToday: 1 }))).toEqual({ allow: true, claim: false });
    expect(decideLessonAccess(ctx({ mode: 'read', claimsToday: 2 })).allow).toBe(false);
  });

  it('checks hearts at start only, and never on forgiving Beginner Originals', () => {
    expect(decideLessonAccess(ctx({ lives: 0 }))).toEqual({ allow: false, reason: 'OUT_OF_HEARTS' });
    expect(decideLessonAccess(ctx({ lives: 0, forgivingHearts: true })).allow).toBe(true);
    expect(decideLessonAccess(ctx({ lives: 0, mode: 'complete', recentClaim: true })).allow).toBe(true);
  });

  it('finishing a lesson started before midnight still counts as allowed', () => {
    expect(decideLessonAccess(ctx({ mode: 'complete', claimsToday: 2, recentClaim: true }))).toEqual({
      allow: true,
      claim: false,
    });
  });

  it('with Pro switched off, the pre-Pro rules apply unchanged', () => {
    const off = { proEnabled: false };
    expect(decideLessonAccess(ctx({ ...off, legacyFreePreview: true, inFreeScope: false })).allow).toBe(true);
    expect(decideLessonAccess(ctx({ ...off, freeCourse: true, inFreeScope: false })).allow).toBe(true);
    expect(decideLessonAccess(ctx({ ...off, inFreeScope: true }))).toEqual({ allow: false, reason: 'LOCKED_LESSON' });
    expect(decideLessonAccess(ctx({ ...off, claimsToday: 99, legacyFreePreview: true })).allow).toBe(true);
  });
});

describe('local day and hearts', () => {
  it('uses the learner-local day for the cap', () => {
    // 23:30 UTC on the 10th is already the 11th in Lagos (UTC+1 → offset -60)
    const now = new Date('2026-11-10T23:30:00Z');
    expect(localDay(now, -60).toISOString()).toBe('2026-11-11T00:00:00.000Z');
    expect(localDay(now, 0).toISOString()).toBe('2026-11-10T00:00:00.000Z');
    expect(nextLocalMidnight(now, 0).toISOString()).toBe('2026-11-11T00:00:00.000Z');
  });

  it('refills one heart every 4 hours up to the max', () => {
    const lost = new Date('2026-11-10T00:00:00Z');
    expect(heartsNow({ lives: 0, maxLives: 5, livesLastLostAt: lost }, new Date('2026-11-10T03:59:00Z'))).toBe(0);
    expect(heartsNow({ lives: 0, maxLives: 5, livesLastLostAt: lost }, new Date('2026-11-10T08:00:00Z'))).toBe(2);
    expect(heartsNow({ lives: 3, maxLives: 5, livesLastLostAt: lost }, new Date('2026-11-12T00:00:00Z'))).toBe(5);
  });
});
