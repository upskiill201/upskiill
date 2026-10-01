import {
  MAX_VIDEO_SECONDS,
  exerciseProblem,
  learnSaveErrors,
  phaseStateFromBlocks,
} from './lesson-blocks.util';

const learn = (cards: unknown[]) => [{ type: 'learnCards', value: cards }];
const apply = (items: unknown[]) => [{ type: 'exercises', value: { scenario: '', items } }];

const mcq = {
  id: 'm',
  kind: 'mcq',
  variant: 'standard',
  prompt: 'Q?',
  options: [
    { id: 'a', text: 'A' },
    { id: 'b', text: 'B' },
  ],
  correctOptionId: 'b',
};

describe('lesson content v2 rules', () => {
  it('rejects saving a video over 15 minutes, naming its length', () => {
    const errors = learnSaveErrors(learn([{ id: 'v', kind: 'video', url: 'u', durationSec: MAX_VIDEO_SECONDS + 61 }]));
    expect(errors[0]).toMatch(/16:01 long/);
    expect(learnSaveErrors(learn([{ id: 'v', kind: 'video', url: 'u', durationSec: MAX_VIDEO_SECONDS }]))).toEqual([]);
  });

  it('ignores v1 blocks entirely', () => {
    expect(learnSaveErrors([{ type: 'videoUrl', value: 'x' }])).toEqual([]);
    expect(phaseStateFromBlocks({ learn: [{ type: 'text', value: '<p>x</p>' }], apply: [] })).toEqual({ learn: null, apply: null });
  });

  it('computes completion from the blocks, not the client flag', () => {
    const good = phaseStateFromBlocks({
      learn: learn([{ id: 'c', kind: 'code', language: 'python', code: 'print(1)' }]),
      apply: apply([mcq]),
    });
    expect(good.learn).toEqual({ complete: true, errors: [] });
    expect(good.apply).toEqual({ complete: true, errors: [] });

    const bad = phaseStateFromBlocks({
      learn: learn([{ id: 'v', kind: 'video', url: 'u' }]),
      apply: apply([{ ...mcq, correctOptionId: 'zz' }]),
    });
    expect(bad.learn?.complete).toBe(false);
    expect(bad.learn?.errors[0]).toMatch(/missing its length/);
    expect(bad.apply?.errors[0]).toMatch(/no right answer/);
  });

  it('needs something in each v2 phase', () => {
    const empty = phaseStateFromBlocks({ learn: learn([]), apply: apply([]) });
    expect(empty.learn?.errors).toContain('Add at least one Learn card.');
    expect(empty.apply?.errors).toContain('Add at least one exercise.');
  });

  it('checks every exercise kind', () => {
    expect(exerciseProblem({ kind: 'fillBlank', prompt: 'p', template: 'a [[1]]', blanks: [{ answers: ['x'] }] })).toBeNull();
    expect(exerciseProblem({ kind: 'fillBlank', prompt: 'p', template: 'a [[1]] [[2]]', blanks: [{ answers: ['x'] }] })).toMatch(/Every blank/);
    expect(exerciseProblem({ kind: 'findBug', prompt: 'p', lines: ['a', 'b'], bugLine: 1 })).toBeNull();
    expect(exerciseProblem({ kind: 'orderLines', prompt: 'p', lines: ['a', 'b'] })).toMatch(/at least 3/);
    expect(exerciseProblem({ kind: 'matchPairs', prompt: 'p', pairs: [{ left: 'a', right: 'b' }] })).toMatch(/3 to 8 pairs/);
    expect(exerciseProblem({ kind: 'mcq', variant: 'predictOutput', prompt: 'p', options: mcq.options, correctOptionId: 'a' })).toMatch(/no code/);
    expect(exerciseProblem({ kind: 'nope', prompt: 'p' })).toMatch(/unknown type/);
  });
});
