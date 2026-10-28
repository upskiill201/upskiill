import {
  MAX_VIDEO_SECONDS,
  exerciseProblem,
  learnSaveErrors,
  phaseStateFromBlocks,
} from './lesson-blocks.util';

const learn = (cards: unknown[]) => [{ type: 'learnCards', value: cards }];
const apply = (items: unknown[]) => [
  { type: 'exercises', value: { scenario: '', items } },
];

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
    const errors = learnSaveErrors(
      learn([
        {
          id: 'v',
          kind: 'video',
          url: 'u',
          durationSec: MAX_VIDEO_SECONDS + 61,
        },
      ]),
    );
    expect(errors[0]).toMatch(/16:01 long/);
    expect(
      learnSaveErrors(
        learn([
          { id: 'v', kind: 'video', url: 'u', durationSec: MAX_VIDEO_SECONDS },
        ]),
      ),
    ).toEqual([]);
  });

  it('ignores v1 blocks entirely', () => {
    expect(learnSaveErrors([{ type: 'videoUrl', value: 'x' }])).toEqual([]);
    expect(
      phaseStateFromBlocks({
        learn: [{ type: 'text', value: '<p>x</p>' }],
        apply: [],
      }),
    ).toEqual({ learn: null, apply: null });
  });

  it('computes completion from the blocks, not the client flag', () => {
    const good = phaseStateFromBlocks({
      learn: learn([
        { id: 'c', kind: 'code', language: 'python', code: 'print(1)' },
      ]),
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
    expect(
      exerciseProblem({
        kind: 'fillBlank',
        prompt: 'p',
        template: 'a [[1]]',
        blanks: [{ answers: ['x'] }],
      }),
    ).toBeNull();
    expect(
      exerciseProblem({
        kind: 'fillBlank',
        prompt: 'p',
        template: 'a [[1]] [[2]]',
        blanks: [{ answers: ['x'] }],
      }),
    ).toMatch(/Every blank/);
    expect(
      exerciseProblem({
        kind: 'findBug',
        prompt: 'p',
        lines: ['a', 'b'],
        bugLine: 1,
      }),
    ).toBeNull();
    expect(
      exerciseProblem({ kind: 'orderLines', prompt: 'p', lines: ['a', 'b'] }),
    ).toMatch(/at least 3/);
    expect(
      exerciseProblem({
        kind: 'matchPairs',
        prompt: 'p',
        pairs: [{ left: 'a', right: 'b' }],
      }),
    ).toMatch(/3 to 8 pairs/);
    expect(
      exerciseProblem({
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'p',
        options: mcq.options,
        correctOptionId: 'a',
      }),
    ).toMatch(/no code/);
    expect(exerciseProblem({ kind: 'nope', prompt: 'p' })).toMatch(
      /unknown type/,
    );
  });
});

describe('clipped media cards', () => {
  const video = (extra: Record<string, unknown>) => ({
    id: 'v',
    kind: 'video',
    url: 'u',
    ...extra,
  });
  const learnErrors = (card: unknown) =>
    phaseStateFromBlocks({ learn: learn([card]) }).learn?.errors ?? [];

  it('accepts one part of a long video whose length is its clip', () => {
    expect(
      learnErrors(video({ durationSec: 600, startSec: 1200, endSec: 1800 })),
    ).toEqual([]);
  });

  it("rejects a clip whose length doesn't match its range (no dodging the 15-minute rule)", () => {
    expect(
      learnErrors(video({ durationSec: 600, startSec: 0, endSec: 2400 })).join(
        ' ',
      ),
    ).toMatch(/doesn't match/);
  });

  it('rejects a clip over 15 minutes and a backwards range', () => {
    expect(
      learnErrors(video({ durationSec: 1200, startSec: 0, endSec: 1200 })).join(
        ' ',
      ),
    ).toMatch(/over 15 minutes/);
    expect(
      learnErrors(video({ durationSec: 10, startSec: 50, endSec: 40 })).join(
        ' ',
      ),
    ).toMatch(/invalid start or end/);
  });

  it('allows a clipped audio card', () => {
    expect(
      learnErrors({
        id: 'a',
        kind: 'audio',
        url: 'u',
        durationSec: 900,
        startSec: 900,
        endSec: 1800,
      }),
    ).toEqual([]);
  });
});

describe('Python cards and exercises', () => {
  const writeCode = {
    id: 'w',
    kind: 'writeCode',
    language: 'python',
    prompt: 'Work out the pot',
    starter: 'members = 10\n',
    solution: 'pot = 10 * 20000\nprint(pot)\n',
    checks: [{ message: 'Make pot', expr: 'pot == 200000' }],
  };

  it('accepts a complete Write and run exercise', () => {
    expect(exerciseProblem(writeCode)).toBeNull();
  });

  it('needs a solution, Python, and 1 to 8 checks', () => {
    expect(exerciseProblem({ ...writeCode, solution: ' ' })).toMatch(
      /no solution/,
    );
    expect(exerciseProblem({ ...writeCode, language: 'javascript' })).toMatch(
      /must be Python/,
    );
    expect(exerciseProblem({ ...writeCode, checks: [] })).toMatch(
      /1 to 8 checks/,
    );
  });

  it('needs every check to have a message and exactly one test', () => {
    expect(
      exerciseProblem({ ...writeCode, checks: [{ message: '', expr: 'x' }] }),
    ).toMatch(/no message/);
    expect(
      exerciseProblem({ ...writeCode, checks: [{ message: 'm' }] }),
    ).toMatch(/exactly one/);
    expect(
      exerciseProblem({
        ...writeCode,
        checks: [{ message: 'm', expr: 'x', outputIncludes: 'y' }],
      }),
    ).toMatch(/exactly one/);
  });

  it('needs code in a Try it live card', () => {
    const state = (code: string) =>
      phaseStateFromBlocks({ learn: learn([{ id: 't', kind: 'tryIt', code }]) })
        .learn;
    expect(state('print(1)')?.complete).toBe(true);
    expect(state('  ')?.errors).toContain('A Try it live card has no code.');
  });
});

describe('Prompt Lab cards', () => {
  const lab = {
    id: 'p',
    kind: 'promptLab',
    task: 'Get a plan',
    base: 'Plan my party.',
    parts: [
      { label: 'Context', text: 'It is for my parents.' },
      { label: 'Limits', text: 'Under MX$40,000.' },
    ],
    replies: [
      { uses: [], text: 'Have fun!', note: 'Too vague.' },
      { uses: [0, 1], text: 'A real plan.', note: 'That is it.' },
    ],
    goal: 1,
  };
  const errors = (card: unknown) =>
    phaseStateFromBlocks({ learn: learn([card]) }).learn?.errors ?? [];

  it('accepts a complete Prompt Lab', () => {
    expect(errors(lab)).toEqual([]);
  });

  it('needs a bare-prompt reply, real parts and a goal', () => {
    expect(
      errors({ ...lab, replies: [lab.replies[1], lab.replies[1]] }),
    ).toContain('A Prompt Lab needs a reply for the bare prompt (uses: []).');
    expect(
      errors({
        ...lab,
        replies: [lab.replies[0], { ...lab.replies[1], uses: [5] }],
      }),
    ).toContain('A Prompt Lab reply uses a part that does not exist.');
    expect(errors({ ...lab, goal: 9 })).toContain(
      'A Prompt Lab has no goal reply marked.',
    );
  });
});
