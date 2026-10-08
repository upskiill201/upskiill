import {
  EXERCISE_TEMPLATES,
  MAX_VIDEO_SECONDS,
  blankExercise,
  fillBlankBank,
  gradeExercise,
  isResponseComplete,
  seededShuffle,
  validateApply,
  validateExercise,
  validateLearnCards,
  type Exercise,
} from '../blocks';
import { sanitizeExercises, sanitizeLearnCards } from '../sanitize';
import { lessonPhases, readLessonContent } from '../content';
import { learnCards } from '../learnCards';

const mcq: Exercise = {
  id: 'm',
  kind: 'mcq',
  variant: 'predictOutput',
  prompt: 'What prints?',
  code: 'print(1 + 1)',
  language: 'python',
  options: [
    { id: 'a', text: '11' },
    { id: 'b', text: '2' },
  ],
  correctOptionId: 'b',
};

const fill: Exercise = {
  id: 'f',
  kind: 'fillBlank',
  prompt: 'Complete it.',
  language: 'javascript',
  template: 'const x = [[1]];\nconsole.[[2]](x);',
  blanks: [
    { id: 'b1', answers: ['5', '5.0'] },
    { id: 'b2', answers: ['log'] },
  ],
  distractors: ['print', 'echo'],
};

const bug: Exercise = { id: 'g', kind: 'findBug', prompt: 'Find it', lines: ['a = 1', 'b = a +', 'print(b)'], bugLine: 1 };
const order: Exercise = { id: 'o', kind: 'orderLines', prompt: 'Order', lines: ['one', 'two', 'three'] };
const match: Exercise = {
  id: 'p',
  kind: 'matchPairs',
  prompt: 'Match',
  pairs: [
    { id: 'x', left: 'LLM', right: 'Language model' },
    { id: 'y', left: 'API', right: 'Interface' },
    { id: 'z', left: 'Token', right: 'Piece of text' },
  ],
};

describe('grading', () => {
  it('grades multiple choice', () => {
    expect(gradeExercise(mcq, { kind: 'mcq', optionId: 'b' })).toBe(true);
    expect(gradeExercise(mcq, { kind: 'mcq', optionId: 'a' })).toBe(false);
  });

  it('grades fill-in with any accepted answer, ignoring spacing', () => {
    expect(isResponseComplete(fill, { kind: 'fillBlank', filled: ['5', null] })).toBe(false);
    expect(gradeExercise(fill, { kind: 'fillBlank', filled: [' 5.0 ', 'log'] })).toBe(true);
    expect(gradeExercise(fill, { kind: 'fillBlank', filled: ['5', 'print'] })).toBe(false);
  });

  it('grades find-the-bug, order and match', () => {
    expect(gradeExercise(bug, { kind: 'findBug', line: 1 })).toBe(true);
    expect(gradeExercise(bug, { kind: 'findBug', line: 2 })).toBe(false);
    expect(gradeExercise(order, { kind: 'orderLines', order: [0, 1, 2] })).toBe(true);
    expect(gradeExercise(order, { kind: 'orderLines', order: [1, 0, 2] })).toBe(false);
    expect(gradeExercise(match, { kind: 'matchPairs', matches: { x: 'x', y: 'y', z: 'z' } })).toBe(true);
    expect(gradeExercise(match, { kind: 'matchPairs', matches: { x: 'y', y: 'x', z: 'z' } })).toBe(false);
  });

  it('accepts identical lines in either order', () => {
    const dup: Exercise = { id: 'd', kind: 'orderLines', prompt: 'Order', lines: ['open', '}', '}'] };
    expect(gradeExercise(dup, { kind: 'orderLines', order: [0, 2, 1] })).toBe(true);
  });

  it('treats a response of the wrong kind as wrong, never a crash', () => {
    expect(gradeExercise(mcq, { kind: 'findBug', line: 0 })).toBe(false);
    expect(gradeExercise(mcq, null)).toBe(false);
  });
});

describe('word bank and shuffle', () => {
  it('holds every answer plus distractors, once each, in a stable order', () => {
    const bank = fillBlankBank(fill as Extract<Exercise, { kind: 'fillBlank' }>);
    expect([...bank].sort()).toEqual(['5', 'echo', 'log', 'print']);
    expect(fillBlankBank(fill as Extract<Exercise, { kind: 'fillBlank' }>)).toEqual(bank);
  });

  it('never "shuffles" into the original order', () => {
    for (let i = 0; i < 50; i++) {
      const items = ['a', 'b', 'c'];
      expect(seededShuffle(items, `seed${i}`)).not.toEqual(items);
    }
  });
});

describe('validation', () => {
  it('rejects a video over 15 minutes with a split-it-up message', () => {
    const issues = validateLearnCards([{ id: 'v', kind: 'video', url: 'https://x/v.mp4', durationSec: MAX_VIDEO_SECONDS + 1 }]);
    expect(issues[0].message).toMatch(/15:01 long/);
    expect(issues[0].message).toMatch(/under 15 minutes/);
    expect(validateLearnCards([{ id: 'v', kind: 'video', url: 'https://x/v.mp4', durationSec: MAX_VIDEO_SECONDS }])).toEqual([]);
  });

  it('needs at least one card, and alt text on images', () => {
    expect(validateLearnCards([])[0].message).toMatch(/at least one/);
    expect(validateLearnCards([{ id: 'i', kind: 'image', url: 'u', alt: '' }])[0].message).toMatch(/Describe the image/);
  });

  it('knows a complete exercise from an incomplete one', () => {
    for (const ex of [mcq, fill, bug, order, match]) expect(validateExercise(ex)).toBeNull();
    expect(validateExercise({ ...fill, blanks: [fill.blanks[0]] } as Exercise)).toMatch(/Every blank/);
    expect(validateExercise({ ...mcq, code: '' } as Exercise)).toMatch(/code/);
    expect(validateApply({ scenario: '', items: [] })[0].message).toMatch(/at least one exercise/);
  });

  it('offers a different exercise menu per track, every template starting incomplete', () => {
    expect(EXERCISE_TEMPLATES.coding[0].label).toBe('Predict the output');
    expect(EXERCISE_TEMPLATES.ai[0].label).toBe('Pick the better prompt');
    for (const t of [...EXERCISE_TEMPLATES.coding, ...EXERCISE_TEMPLATES.ai]) {
      expect(validateExercise(blankExercise(t))).not.toBeNull();
    }
  });
});

describe('sanitising stored JSON', () => {
  it('drops unknown, empty and incomplete blocks instead of showing them broken', () => {
    expect(
      sanitizeLearnCards([
        { id: '1', kind: 'text', html: '<p><br></p>' },
        { id: '2', kind: 'mystery' },
        { id: '3', kind: 'code', code: 'x = 1', language: 'klingon' },
      ]),
    ).toEqual([{ id: '3', kind: 'code', code: 'x = 1', language: 'plaintext', caption: undefined }]);
    expect(sanitizeExercises([mcq, { kind: 'mcq', prompt: 'No answers', options: [] }, 'junk'])).toHaveLength(1);
  });
});

describe('reading v2 lessons', () => {
  const lesson = {
    id: 'l',
    contentBlocks: {
      learn: [{ type: 'learnCards', value: [{ id: 'c', kind: 'callout', tone: 'tip', text: 'Hi' }] }],
      apply: [{ type: 'exercises', value: { scenario: 'You are building a todo app.', items: [mcq, bug] } }],
      reflect: [],
      deepen: [],
    },
  };

  it('prefers v2 blocks and keeps the v1 multiple-choice view for older screens', () => {
    const c = readLessonContent(lesson);
    expect(c.learn.cards).toHaveLength(1);
    expect(c.apply.exercises.map((e) => e.kind)).toEqual(['mcq', 'findBug']);
    expect(c.apply.questions).toHaveLength(1);
    expect(c.apply.scenario).toBe('You are building a todo app.');
  });

  it('reads a v1 lesson as before, its questions converted to exercises', () => {
    const v1 = readLessonContent({
      contentBlocks: {
        apply: [
          {
            type: 'mcqActivity',
            value: { questions: [{ id: 'q', questionText: 'Q?', options: [{ id: 'a', text: 'A' }, { id: 'b', text: 'B' }], correctOptionId: 'a' }] },
          },
        ],
      },
    });
    expect(v1.learn.cards).toBeNull();
    expect(v1.apply.exercises[0]).toMatchObject({ kind: 'mcq', variant: 'standard', prompt: 'Q?' });
    expect(lessonPhases(v1)).toContain('apply');
  });
});

describe('clipped media cards (one part of a long imported video)', () => {
  const part = { id: 'v', kind: 'video' as const, url: 'https://cdn/v.mp4', durationSec: 600, startSec: 1200, endSec: 1800 };

  it('accepts a clip whose length matches its range', () => {
    expect(validateLearnCards([part])).toEqual([]);
  });

  it("flags a clip whose length doesn't match, or that runs backwards", () => {
    expect(validateLearnCards([{ ...part, endSec: 3600 }])[0].message).toMatch(/doesn't match/);
    expect(validateLearnCards([{ ...part, startSec: 1900 }])[0].message).toMatch(/invalid start or end/);
  });

  it('flags a clip over 15 minutes', () => {
    expect(validateLearnCards([{ ...part, startSec: 0, endSec: MAX_VIDEO_SECONDS + 60, durationSec: MAX_VIDEO_SECONDS + 60 }])).toHaveLength(1);
  });

  it('keeps the clip through sanitizing, and drops a broken one', () => {
    expect(sanitizeLearnCards([part])[0]).toMatchObject({ startSec: 1200, endSec: 1800 });
    const broken = sanitizeLearnCards([{ ...part, startSec: 50, endSec: 10 }])[0];
    expect(broken).not.toHaveProperty('startSec');
  });

  it('carries the clip into the learner deck', () => {
    const deck = learnCards(readLessonContent({ contentBlocks: { learn: [{ type: 'learnCards', value: [part] }] } }).learn);
    expect(deck.find((c) => c.kind === 'video')).toMatchObject({ startSec: 1200, endSec: 1800 });
  });
});
