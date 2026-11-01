import { rankFeed, scoreOf, type RankContext, type RankInput } from './feed-rank';
import { prevDay, sharedStreak } from './shared-streak';

describe('sharedStreak', () => {
  const s = (...d: string[]) => new Set(d);

  it('counts days both learned, ending today', () => {
    expect(sharedStreak(s('2026-10-25', '2026-10-26', '2026-10-27'), s('2026-10-25', '2026-10-26', '2026-10-27'), '2026-10-27', '2026-10-01')).toBe(3);
  });

  it('keeps the streak alive before today is done', () => {
    expect(sharedStreak(s('2026-10-25', '2026-10-26'), s('2026-10-25', '2026-10-26', '2026-10-27'), '2026-10-27', '2026-10-01')).toBe(2);
  });

  it('breaks on a day only one of them learned', () => {
    expect(sharedStreak(s('2026-10-24', '2026-10-26', '2026-10-27'), s('2026-10-24', '2026-10-25', '2026-10-26', '2026-10-27'), '2026-10-27', '2026-10-01')).toBe(2);
  });

  it('never counts days before they became buddies', () => {
    expect(sharedStreak(s('2026-10-25', '2026-10-26', '2026-10-27'), s('2026-10-25', '2026-10-26', '2026-10-27'), '2026-10-27', '2026-10-26')).toBe(2);
  });

  it('crosses month boundaries', () => {
    expect(prevDay('2026-11-01')).toBe('2026-10-31');
  });
});

describe('rankFeed', () => {
  const now = new Date('2026-10-27T12:00:00Z');
  const ctx: RankContext = { buddies: new Set(['buddy']), follows: new Set(['follow']), enrolled: new Set(['py']), now };
  const card = (id: string, userId: string, hoursAgo: number, over: Partial<RankInput> = {}): RankInput => ({
    id,
    userId,
    activityType: 'LESSON_COMPLETED',
    createdAt: new Date(now.getTime() - hoursAgo * 3_600_000),
    courseId: 'py',
    ...over,
  });

  it('ranks a buddy above a classmate at the same age', () => {
    expect(scoreOf(card('a', 'buddy', 1), ctx)).toBeGreaterThan(scoreOf(card('b', 'someone', 1), ctx));
  });

  it("boosts cards for courses the viewer is taking", () => {
    expect(scoreOf(card('a', 'x', 1), ctx)).toBeGreaterThan(scoreOf(card('b', 'x', 1, { courseId: 'other' }), ctx));
  });

  it("folds one person's lessons in a course on one day into one card", () => {
    const out = rankFeed([card('a', 'buddy', 1), card('b', 'buddy', 2), card('c', 'buddy', 3)], ctx);
    expect(out).toHaveLength(1);
    expect(out[0].folded).toHaveLength(2);
  });

  it('never lets one person take three slots in a row', () => {
    const cards = [
      card('a', 'buddy', 1, { activityType: 'STREAK_MILESTONE' }),
      card('b', 'buddy', 1, { activityType: 'ACHIEVEMENT_UNLOCKED', courseId: null }),
      card('c', 'buddy', 1, { activityType: 'COURSE_STARTED', courseId: 'js' }),
      card('d', 'someone', 30),
    ];
    const ids = rankFeed(cards, ctx).map((r) => r.card.userId);
    expect(ids.slice(0, 3)).not.toEqual(['buddy', 'buddy', 'buddy']);
  });

  it('stops at the cap', () => {
    const cards = Array.from({ length: 40 }, (_, i) => card(`c${i}`, `u${i}`, i));
    expect(rankFeed(cards, ctx, 15)).toHaveLength(15);
  });
});
