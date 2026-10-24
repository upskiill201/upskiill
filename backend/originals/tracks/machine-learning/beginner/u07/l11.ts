import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { VAL } from './code';

const MINUTES = 'def minutes(flags, answers):\n    missed = ((flags == 0) & (answers == 1)).sum()\n    return 20 * missed + 5 * flags.sum()\n';

/** Chapter 7 · Lesson 11 — Which mistake costs more? */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Which mistake costs more?',
  summary: 'An empty chair wastes a 20-minute slot. A reminder call takes 5 minutes. Halima turns that into one number, minutes lost, and lets it choose the threshold on the validation weeks.',
  minutes: 13,
  outcomes: [
    'Put a cost on each kind of mistake',
    'Turn the trade-off into a single number',
    'Choose a threshold by cost, on validation',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Minutes',
      beats: [
        { speaker: 'halima', text: 'Bisi, what does a no-show cost you?' },
        { speaker: 'bisi', text: 'A 20-minute slot with a nurse sitting there. If I know the day before, I can usually give it to someone on the waiting list.' },
        { speaker: 'halima', text: 'And a call?' },
        { speaker: 'bisi', text: 'Five minutes, whether they were coming or not.' },
        { speaker: 'miracle', text: 'Then every threshold has a price: 20 minutes for each no-show we don\'t flag, plus 5 for every call. Lowest total wins.' },
        { speaker: 'tey', text: 'It\'s a simplification: not every call saves a slot. But it\'s honest about what each mistake costs, and it\'s agreed before anyone looks. Which threshold should the team try first?' },
      ],
      choice: {
        prompt: 'Where should the team calculate minutes for each threshold?',
        options: [
          { text: 'On the validation weeks (10 and 11), then apply the winner to week 12 once.', outcome: 'Yes. Same rule as always: settings are chosen away from the test week.', best: true },
          { text: 'On week 12: it\'s the most recent.', outcome: 'Then the minutes saved on week 12 would look better than they really are.' },
          { text: 'On the training weeks.', outcome: 'The model has seen those answers; its chances there are too confident.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Minutes lost at each threshold',
      caption: 'Validation weeks: 400 bookings, 86 no-shows.',
      code: VAL + MINUTES + '\nprint("Do nothing:", minutes((pv >= 2).astype(int), yv))\nfor th in [0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5]:\n    print(th, minutes((pv >= th).astype(int), yv), "minutes")\n',
      challenge: 'What if a no-show cost 40 minutes? Change the 20 and rerun.',
    },
  ],
  apply: {
    scenario: 'Which mistake costs more?',
    items: [
      {
        kind: 'writeCode',
        prompt: 'On validation, print the minutes lost at a threshold of 0.2',
        starter: VAL + MINUTES,
        solution: VAL + MINUTES + 'print(minutes((pv >= 0.2).astype(int), yv))\n',
        hint: 'minutes((pv >= 0.2).astype(int), yv)',
        checks: [{ message: 'Print 1265', outputEquals: '1265' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why is a missed no-show costed at 20 minutes but a call at 5?',
        options: [
          { text: 'The numbers are random', why: 'They come from Bisi.' },
          { text: 'An empty slot wastes a nurse\'s 20 minutes; a call takes 5' },
          { text: 'To make the model look good', why: 'They\'re agreed before looking.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'On validation, print the minutes lost by doing nothing: 20 for every no-show',
        starter: VAL,
        solution: VAL + 'print(20 * yv.sum())\n',
        hint: '20 * yv.sum()',
        checks: [{ message: 'Print 1720', outputEquals: '1720' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which costs go into "minutes lost"?',
        groups: ['20 minutes each', '5 minutes each'],
        items: [
          { text: 'A no-show we didn\'t flag', group: 0 },
          { text: 'A call to someone who came', group: 1 },
          { text: 'A call to someone who\'d have missed', group: 1 },
          { text: 'An empty chair nobody expected', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'Why not just maximise recall? Empty chairs are what I hate.',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Good idea.', why: 'Flagging everyone costs more than it saves.' },
          { text: 'Recall doesn\'t matter.', why: 'It does; it just isn\'t the only thing.' },
          { text: 'Maximum recall means calling everyone: 400 calls, 2,000 minutes on validation, more than doing nothing. The cost number balances both.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the threshold to validation minutes lost.',
        pairs: [
          ['0.1', '1,480'],
          ['0.2', '1,265'],
          ['0.3', '1,390'],
          ['0.5', '1,540'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The cost.',
        language: 'python',
        template: 'missed = ((flags == 0) & (answers == 1)).sum()\nreturn [[1]] * missed + [[2]] * flags.sum()',
        blanks: [['20'], ['5']],
        distractors: ['1', '100'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line costs the wrong thing?',
        language: 'python',
        lines: ['missed = ((flags == 0) & (answers == 1)).sum()', 'calls = flags.sum()', 'cost = 20 * calls + 5 * missed'],
        bug: 2,
        fix: 'cost = 20 * missed + 5 * calls',
        explanation: 'The missed no-show is the expensive one.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which validation threshold had the lowest minutes lost?',
        answers: ['0.2', '.2'],
        placeholder: 'A threshold',
      },
      {
        kind: 'mcq',
        prompt: 'If a no-show cost 40 minutes instead of 20, the best threshold would probably...',
        options: [
          { text: 'Go higher', why: 'Higher means fewer flags, more misses.' },
          { text: 'Go lower: missing a no-show hurts more, so flag more' },
          { text: 'Stay the same', why: 'The balance of costs has changed.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'In your work or life, what\'s a "cheap mistake" and an "expensive mistake"? How would you balance them?',
    starters: ['A cheap mistake...', 'An expensive one...'],
  },
  deepen: {
    title: 'Cost-sensitive decisions',
    summary: 'Banks, hospitals and insurers set thresholds this way: put a cost on each kind of error, then minimise the total. The model stays the same; only the decision rule changes.',
  },
  notes: 'Validation (weeks 1-9 -> 10-11, 86 no-shows): minutes = 20*FN + 5*flags. 0.1 1480; 0.15 1305; 0.2 1265 (best); 0.25 1300; 0.3 1390; 0.4 1440; 0.5 1540; nothing 1720; everyone 2000.',
};

export default lesson;
