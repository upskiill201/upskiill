import { completeTitle, formatStat, questProgress, statCards, streakWeek, type LessonStats, monthlyBeat } from '../outro';

const stats = (over: Partial<LessonStats> = {}): LessonStats => ({
  questions: 4,
  missed: 0,
  seconds: 95,
  words: 30,
  expectedMinutes: null,
  ...over,
});

describe('lesson complete cards', () => {
  it('shows XP, accuracy and time — Duolingo’s three', () => {
    const cards = statCards(stats(), 20, { isReview: false });
    expect(cards.map((c) => [c.id, c.label, c.value])).toEqual([
      ['xp', 'Total XP', 20],
      ['accuracy', 'Amazing', 100],
      ['time', 'Speedy', 95],
    ]);
  });

  it('waits for the server’s XP instead of guessing', () => {
    expect(statCards(stats(), null, { isReview: false })[0].value).toBeNull();
  });

  it('scores accuracy by questions missed at least once', () => {
    expect(statCards(stats({ missed: 1 }), 20, { isReview: false })[1]).toMatchObject({ label: 'Good', value: 75 });
    expect(statCards(stats({ missed: 3 }), 20, { isReview: false })[1]).toMatchObject({ label: 'Keep going', value: 25 });
  });

  it('shows words written instead of an accuracy a quiz-less lesson never measured', () => {
    const cards = statCards(stats({ questions: 0 }), 20, { isReview: false });
    expect(cards.map((c) => c.id)).toEqual(['xp', 'words', 'time']);
  });

  it('judges speed against the lesson’s own estimate', () => {
    expect(statCards(stats({ seconds: 400, expectedMinutes: 10 }), 1, { isReview: false })[2].label).toBe('Speedy');
    expect(statCards(stats({ seconds: 400 }), 1, { isReview: false })[2].label).toBe('Committed');
  });

  it('has no XP card for a replay, which earns none', () => {
    expect(statCards(stats(), 0, { isReview: true }).map((c) => c.id)).toEqual(['accuracy', 'time']);
  });

  it('titles a flawless quiz a perfect lesson', () => {
    expect(completeTitle(stats(), { isReview: false })).toBe('Perfect lesson!');
    expect(completeTitle(stats({ missed: 1 }), { isReview: false })).toBe('Lesson complete!');
    expect(completeTitle(stats({ questions: 0 }), { isReview: false })).toBe('Lesson complete!');
    expect(completeTitle(stats(), { isReview: true })).toBe('Practice complete!');
  });

  it('formats time as a clock', () => {
    expect(formatStat('clock', 95)).toBe('1:35');
    expect(formatStat('percent', 99.6)).toBe('100%');
  });
});

describe('streakWeek', () => {
  const thursday = new Date('2026-09-24T12:00:00');

  it('ticks only the days the streak covers', () => {
    expect(streakWeek(2, thursday).map((d) => d.done)).toEqual([false, false, true, true, false, false, false]);
  });

  it('marks today, and fills the whole week-so-far for a long streak', () => {
    const week = streakWeek(40, thursday);
    expect(week.map((d) => d.done)).toEqual([true, true, true, true, false, false, false]);
    expect(week.findIndex((d) => d.isToday)).toBe(3);
  });
});

describe('questProgress', () => {
  const m = (id: string, p: number, t = 3) => ({ id, title: id, currentProgress: p, targetValue: t, reward: { type: 'GEMS', amount: 10 } });

  it('moves each bar from before to after', () => {
    const rows = questProgress([m('a', 0), m('b', 2)], [m('a', 1), m('b', 3)]);
    expect(rows.map((r) => [r.id, r.from, r.to, r.justCompleted])).toEqual([
      ['a', 0, 1, false],
      ['b', 2, 3, true],
    ]);
    expect(rows[0].reward).toEqual({ type: 'COINS', amount: 10 });
  });

  it('is empty when nothing moved, so the screen is skipped', () => {
    expect(questProgress([m('a', 1)], [m('a', 1)])).toEqual([]);
    expect(questProgress(null, [m('a', 1)])).toEqual([]);
  });

  it('never runs a bar backwards or past the target', () => {
    const [row] = questProgress([m('a', 2)], [m('a', 9)]);
    expect([row.from, row.to]).toEqual([2, 3]);
  });
});

describe('monthlyBeat', () => {
  const ms = (claimable: string[], claimed: string[] = []) =>
    ['M1', 'M2', 'FINAL'].map((id, i) => ({
      id, kind: id === 'FINAL' ? 'FINAL' : 'INTERMEDIATE', label: id, requiredDays: (i + 1) * 4,
      claimable: claimable.includes(id), claimed: claimed.includes(id), reward: { type: 'COINS' as const, amount: 40 },
    }));
  const q = (goalDays: number, claimable: string[] = [], claimed: string[] = []) => ({ monthKey: '2026-09', goalDays, targetDays: 12, milestones: ms(claimable, claimed) });

  it('shows a goal day earned, and the chest it unlocked', () => {
    const beat = monthlyBeat(q(7, [], ['M1']), q(8, ['M2'], ['M1']));
    expect(beat).toMatchObject({ from: 7, to: 8, target: 12 });
    expect(beat!.newlyClaimable.map((m: { id: string }) => m.id)).toEqual(['M2']);
  });

  it('stays quiet when the lesson did not earn a goal day', () => {
    expect(monthlyBeat(q(8), q(8))).toBeNull();
  });

  it('ignores a month change', () => {
    expect(monthlyBeat({ ...q(3), monthKey: '2026-08' }, q(1))).toBeNull();
  });
});
