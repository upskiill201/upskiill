import { DEFAULT_RULES, badgesFor, friendState, nextProState, qualifies } from './ambassador.rules';

const NOW = new Date('2026-10-29T12:00:00Z');
const daysAgo = (d: number) => new Date(NOW.getTime() - d * 86_400_000);
const rules = DEFAULT_RULES;

describe('qualifies', () => {
  it('needs the lessons AND the streak', () => {
    expect(qualifies({ lessonsDone: 3, streakDays: 3 }, rules)).toBe(true);
    // Three lessons crammed into one day is not a learner yet.
    expect(qualifies({ lessonsDone: 9, streakDays: 1 }, rules)).toBe(false);
    expect(qualifies({ lessonsDone: 2, streakDays: 3 }, rules)).toBe(false);
  });
});

describe('friendState', () => {
  it('does not count a friend until they qualify', () => {
    expect(friendState({ qualifiedAt: null, lastLessonAt: daysAgo(0) }, rules, NOW)).toBe('LEARNING');
  });

  it('walks ACTIVE → AT_RISK → INACTIVE as days pass', () => {
    const q = daysAgo(20);
    expect(friendState({ qualifiedAt: q, lastLessonAt: daysAgo(1) }, rules, NOW)).toBe('ACTIVE');
    expect(friendState({ qualifiedAt: q, lastLessonAt: daysAgo(3) }, rules, NOW)).toBe('AT_RISK');
    expect(friendState({ qualifiedAt: q, lastLessonAt: daysAgo(6.9) }, rules, NOW)).toBe('AT_RISK');
    expect(friendState({ qualifiedAt: q, lastLessonAt: daysAgo(7) }, rules, NOW)).toBe('INACTIVE');
  });
});

describe('nextProState', () => {
  const off = { proActive: false, proSince: null, graceUntil: null };
  const on = { proActive: true, proSince: daysAgo(10), graceUntil: null };

  it('switches Pro on at the bar', () => {
    expect(nextProState(off, 4, rules, NOW).change).toBeNull();
    const next = nextProState(off, 5, rules, NOW);
    expect(next).toMatchObject({ proActive: true, change: 'ON', graceUntil: null });
  });

  it('gives a grace window, then pauses', () => {
    const grace = nextProState(on, 4, rules, NOW);
    expect(grace.change).toBe('GRACE');
    expect(grace.proActive).toBe(true);
    expect(grace.graceUntil?.getTime()).toBe(NOW.getTime() + 3 * 86_400_000);

    const still = nextProState(grace, 4, rules, new Date(NOW.getTime() + 86_400_000));
    expect(still).toMatchObject({ proActive: true, change: null });

    const paused = nextProState(grace, 4, rules, new Date(NOW.getTime() + 3 * 86_400_000));
    expect(paused).toMatchObject({ proActive: false, change: 'OFF', graceUntil: null });
  });

  it('restores Pro when a friend comes back inside the window', () => {
    const grace = nextProState(on, 4, rules, NOW);
    expect(nextProState(grace, 5, rules, NOW)).toMatchObject({ proActive: true, graceUntil: null, change: 'RESTORED' });
  });

  it('pauses at once with no grace days', () => {
    expect(nextProState(on, 1, { ...rules, graceDays: 0 }, NOW)).toMatchObject({ proActive: false, change: 'OFF' });
  });

  it('switched off: grants nothing new, keeps what was earned', () => {
    const disabled = { ...rules, enabled: false };
    expect(nextProState(off, 9, disabled, NOW)).toMatchObject({ proActive: false, change: null });
    expect(nextProState(on, 9, disabled, NOW)).toMatchObject({ proActive: true, change: null });
  });
});

describe('badgesFor', () => {
  it('earns medals from the peak', () => {
    const b = badgesFor(6, rules);
    expect(b.map((x) => x.earned)).toEqual([true, false, false]);
    expect(b[1].left).toBe(19);
  });
});
