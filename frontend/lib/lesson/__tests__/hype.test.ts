import { comboRung, finishTier, isRungStart, nextRung, sessionName } from '../hype';

describe('combo ladder', () => {
  it('names each rung and its bonus', () => {
    expect(comboRung(2)).toBeNull();
    expect(comboRung(3)).toMatchObject({ name: 'Heating up', bonusXp: 2 });
    expect(comboRung(6)).toMatchObject({ name: 'On fire', bonusXp: 3 });
    expect(comboRung(8)).toMatchObject({ name: 'Blazing', bonusXp: 4 });
    expect(comboRung(12)).toMatchObject({ name: 'Unstoppable', bonusXp: 5 });
    expect(comboRung(20)).toMatchObject({ name: 'Legendary', bonusXp: 5 });
  });

  it('knows where the rungs start and what is next', () => {
    expect([3, 5, 7, 10, 15].every(isRungStart)).toBe(true);
    expect(isRungStart(4)).toBe(false);
    expect(nextRung(0)).toMatchObject({ away: 3, rung: { name: 'Heating up' } });
    expect(nextRung(5)).toMatchObject({ away: 2, rung: { name: 'Blazing' } });
    expect(nextRung(15)).toBeNull();
  });
});

describe('finishTier', () => {
  const base = { isReview: false, lessonsToday: 1, perfect: false, bestCombo: 0, endsChapter: false, milestone: false };

  it('starts small and grows through the day', () => {
    expect(finishTier(base)).toBe(1);
    expect(finishTier({ ...base, lessonsToday: 2 })).toBe(2);
    expect(finishTier({ ...base, lessonsToday: 3 })).toBe(3);
    expect(finishTier({ ...base, lessonsToday: 4 })).toBe(4);
  });

  it('rewards a perfect run, a long combo and a chapter end', () => {
    expect(finishTier({ ...base, perfect: true })).toBe(2);
    expect(finishTier({ ...base, perfect: true, bestCombo: 8 })).toBe(3);
    expect(finishTier({ ...base, endsChapter: true })).toBe(3);
    expect(finishTier({ ...base, milestone: true })).toBe(2);
  });

  it('keeps replays calm', () => {
    expect(finishTier({ ...base, isReview: true, lessonsToday: 5, perfect: true })).toBe(1);
  });
});

describe('sessionName', () => {
  it('names the day', () => {
    expect(sessionName(1)).toBe('First of the day');
    expect(sessionName(3)).toBe('Hat-trick!');
    expect(sessionName(9)).toBe('Marathon!');
  });
});
