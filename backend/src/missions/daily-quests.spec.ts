import { pickDailyQuests, questTitle, QUEST_POOL } from './missions.service';

const pool = QUEST_POOL.map((q, i) => ({ ...q, id: `t${i}` }));
const seq = (values: number[]) => {
  let i = 0;
  return () => values[i++ % values.length];
};

describe('pickDailyQuests', () => {
  it('picks one easy, one medium and one hard quest', () => {
    const picked = pickDailyQuests(pool, []);
    expect(picked.map((p) => p.difficultyTier)).toEqual(['easy', 'medium', 'hard']);
  });

  it('never gives two quests of the same kind in a day', () => {
    for (let n = 0; n < 50; n++) {
      const kinds = pickDailyQuests(pool, []).map((p) => p.objectiveType);
      expect(new Set(kinds).size).toBe(3);
    }
  });

  it('skips templates used in the last two days when it can', () => {
    const easy = pool.filter((p) => p.difficultyTier === 'easy');
    const recent = easy.slice(0, easy.length - 1).map((p) => p.id);
    const picked = pickDailyQuests(pool, recent, seq([0.1, 0.9, 0.5]));
    expect(picked[0].id).toBe(easy[easy.length - 1].id);
  });

  it('still fills the day when everything was used recently', () => {
    expect(pickDailyQuests(pool, pool.map((p) => p.id))).toHaveLength(3);
  });
});

describe('questTitle', () => {
  it('always states the real target', () => {
    expect(questTitle('LESSON_COUNT', 1)).toBe('Complete a lesson');
    expect(questTitle('LESSON_COUNT', 2)).toBe('Complete 2 lessons');
    expect(questTitle('CORRECT_ANSWERS', 15)).toBe('Get 15 answers right');
    expect(questTitle('PERFECT_LESSON', 1)).toBe('Finish a lesson with no mistakes');
    expect(questTitle('LEARN_MINUTES', 10)).toBe('Learn for 10 minutes');
  });
});
