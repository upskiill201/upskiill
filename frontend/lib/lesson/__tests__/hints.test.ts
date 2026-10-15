import { nextHint, NO_HINTS } from '../hints';
import { gradeExercise, tapBuildBank, type Exercise } from '../blocks';

const mcq: Exercise = {
  id: 'q1',
  kind: 'mcq',
  variant: 'standard',
  prompt: 'Pick one',
  options: [
    { id: 'a', text: 'A' },
    { id: 'b', text: 'B' },
    { id: 'c', text: 'C' },
    { id: 'd', text: 'D' },
  ],
  correctOptionId: 'c',
};

describe('nextHint', () => {
  it('strikes out wrong MCQ answers but always leaves a choice', () => {
    const h1 = nextHint(mcq, null)!;
    expect(h1.memory.eliminated).toHaveLength(1);
    expect(h1.memory.eliminated).not.toContain('c');
    const h2 = nextHint(mcq, null, h1.memory)!;
    expect([...h2.memory.eliminated]).toHaveLength(2);
    expect(nextHint(mcq, null, h2.memory)).toBeNull();
  });

  it('clears an MCQ pick that gets struck out', () => {
    const h = nextHint(mcq, { kind: 'mcq', optionId: 'a' })!;
    expect(h.memory.eliminated).toContain('a');
    expect(h.response).toBeNull();
  });

  it('places the next line of an order exercise, never the last two', () => {
    const ex: Exercise = { id: 'o', kind: 'orderLines', prompt: 'Order', lines: ['one', 'two', 'three', 'four'] };
    const h1 = nextHint(ex, null)!;
    expect(h1.response).toEqual({ kind: 'orderLines', order: [0] });
    const h2 = nextHint(ex, h1.response)!;
    expect(h2.response).toEqual({ kind: 'orderLines', order: [0, 1] });
    expect(nextHint(ex, h2.response)).toBeNull();
    // A wrong start gets corrected.
    expect(nextHint(ex, { kind: 'orderLines', order: [2] })!.response).toEqual({ kind: 'orderLines', order: [0] });
  });

  it('builds the start of a tap-build answer from the bank', () => {
    const ex: Exercise = { id: 't', kind: 'tapBuild', prompt: 'Build', tiles: ['I', 'help', 'groups'], distractors: ['database'] };
    const h = nextHint(ex, null)!;
    const bank = tapBuildBank(ex as never);
    expect(h.response).toMatchObject({ kind: 'tapBuild' });
    const picked = (h.response as { picked: number[] }).picked;
    expect(picked.map((i) => bank[i])).toEqual(['I']);
  });

  it('fills one blank, and gives only a clue for the last one', () => {
    const ex: Exercise = {
      id: 'f',
      kind: 'fillBlank',
      prompt: 'Fill',
      template: '[[1]] and [[2]]',
      blanks: [
        { id: 'b1', answers: ['salt'] },
        { id: 'b2', answers: ['pepper'] },
      ],
      distractors: ['sugar'],
    };
    const h1 = nextHint(ex, null)!;
    expect(h1.response).toEqual({ kind: 'fillBlank', filled: ['salt', null] });
    const h2 = nextHint(ex, h1.response, h1.memory)!;
    expect(h2.response).toBeUndefined();
    expect(h2.line).toContain('"p"');
    expect(nextHint(ex, h1.response, h2.memory)).toBeNull();
  });

  it('never completes a match or sort exercise on its own', () => {
    const match: Exercise = {
      id: 'm',
      kind: 'matchPairs',
      prompt: 'Match',
      pairs: [
        { id: 'p1', left: 'a', right: '1' },
        { id: 'p2', left: 'b', right: '2' },
        { id: 'p3', left: 'c', right: '3' },
      ],
    };
    const h = nextHint(match, null)!;
    expect(Object.keys((h.response as { matches: object }).matches)).toHaveLength(1);
    expect(nextHint(match, h.response)).toBeNull();
  });

  it('gives typed answers two clues, then stops', () => {
    const ex: Exercise = { id: 'y', kind: 'typeAnswer', prompt: 'Type', answers: ['translating'] };
    const h1 = nextHint(ex, null)!;
    expect(h1.response).toEqual({ kind: 'typeAnswer', text: 'tr' });
    const h2 = nextHint(ex, h1.response, h1.memory)!;
    expect((h2.response as { text: string }).text).toBe('transl');
    expect(nextHint(ex, h2.response, h2.memory)).toBeNull();
  });

  it('leaves every hinted answer still to be finished by the learner', () => {
    const ex: Exercise = { id: 'o2', kind: 'orderLines', prompt: 'Order', lines: ['a', 'b', 'c'] };
    let r = null;
    let m = NO_HINTS;
    for (let i = 0; i < 5; i++) {
      const h = nextHint(ex, r, m);
      if (!h) break;
      r = h.response ?? r;
      m = h.memory;
    }
    expect(gradeExercise(ex, r)).toBe(false);
  });
});
