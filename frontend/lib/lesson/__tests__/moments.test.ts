import type { LessonRecord } from '../history';
import { lessonBadges, lessonMoment, momentId, streakMoment, type MomentInput } from '../moments';

const now = new Date('2026-09-24T15:00:00');
const earlier = (hours: number) => now.getTime() - hours * 3600_000;
const rec = (over: Partial<LessonRecord> = {}): LessonRecord => ({
  at: earlier(48),
  lessonId: 'x',
  accuracy: 80,
  seconds: 200,
  bestCombo: 2,
  ...over,
});

const input = (over: Partial<MomentInput> = {}): MomentInput => ({
  stats: { questions: 4, missed: 1, seconds: 400, words: 10, expectedMinutes: null },
  bestCombo: 2,
  isReview: false,
  history: [],
  now,
  daysSinceLastLesson: 0,
  lastLessonAt: new Date(earlier(2)).toISOString(),
  ...over,
});

const first = <T,>(list: T[]) => list[0];

describe('momentId — one headline, first true thing wins', () => {
  it('is a plain finish when nothing special happened', () => {
    expect(momentId(input())).toBe('standard');
  });

  it('celebrates coming back after a break above everything', () => {
    expect(momentId(input({ daysSinceLastLesson: 5, stats: { ...input().stats, missed: 0 } }))).toBe('comeback');
  });

  it('calls out a flawless quiz', () => {
    expect(momentId(input({ stats: { ...input().stats, missed: 0 } }))).toBe('perfect');
  });

  it('calls out a long run when the quiz was not flawless', () => {
    expect(momentId(input({ bestCombo: 5 }))).toBe('onFire');
  });

  it('notices a busy day', () => {
    const history = [rec({ at: earlier(3) }), rec({ at: earlier(1) })];
    expect(momentId(input({ history }))).toBe('dayRoll');
    expect(lessonMoment(input({ history }), first).title).toBe('Lesson 3 today!');
  });

  it('notices a fast finish against the lesson’s own estimate', () => {
    expect(momentId(input({ stats: { ...input().stats, seconds: 90 } }))).toBe('fast');
  });

  it('marks the day’s first lesson from the server’s last completion', () => {
    expect(momentId(input({ lastLessonAt: new Date(earlier(30)).toISOString() }))).toBe('firstOfDay');
  });

  it('keeps a replay a replay', () => {
    expect(momentId(input({ isReview: true, daysSinceLastLesson: 9 }))).toBe('practice');
  });

  it('gives each moment its own look', () => {
    const m = lessonMoment(input({ stats: { ...input().stats, missed: 0 } }), first);
    expect(m).toMatchObject({ id: 'perfect', title: 'Perfect lesson!', pose: 'flame', confetti: 'stars' });
  });
});

describe('lessonBadges — personal records, true and earned', () => {
  const history = [rec(), rec(), rec({ bestCombo: 3 })];

  it('needs some history before claiming a record', () => {
    expect(lessonBadges(input({ stats: { ...input().stats, seconds: 10 }, bestCombo: 6, history: [rec()] }))).toEqual([]);
  });

  it('spots the fastest lesson and the best run', () => {
    const b = lessonBadges(input({ stats: { ...input().stats, seconds: 150 }, bestCombo: 4, history }));
    expect(b.map((x) => x.id)).toEqual(['fastest', 'bestRun']);
    expect(b[1].label).toBe('Best run yet · 4 in a row');
  });

  it('counts perfect lessons in a row', () => {
    const b = lessonBadges(
      input({ stats: { ...input().stats, missed: 0 }, history: [rec({ accuracy: 60 }), rec({ accuracy: 100 })] }),
    );
    expect(b).toEqual([{ id: 'perfectRun', label: '2 perfect lessons in a row' }]);
  });

  it('shows at most two', () => {
    const b = lessonBadges(
      input({
        stats: { ...input().stats, seconds: 50, missed: 0 },
        bestCombo: 9,
        history: [...history, rec({ at: earlier(1), accuracy: 100 })],
      }),
    );
    expect(b).toHaveLength(2);
  });

  it('never for a replay', () => {
    expect(lessonBadges(input({ isReview: true, history, stats: { ...input().stats, seconds: 1 } }))).toEqual([]);
  });
});

describe('streakMoment', () => {
  it('names milestone days', () => {
    expect(streakMoment(7, 20)).toEqual({ title: 'One week streak!', personalBest: false, milestone: true });
    expect(streakMoment(8, 20).title).toBe('day streak!');
  });

  it('knows a personal best only when the old best is known', () => {
    expect(streakMoment(12, 11).personalBest).toBe(true);
    expect(streakMoment(12, null).personalBest).toBe(false);
  });
});
