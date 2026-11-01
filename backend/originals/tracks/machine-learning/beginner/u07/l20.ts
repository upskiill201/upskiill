import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { DATA, IMPORTS, PROBS } from './code';

const FLAG = PROBS + 'flags = (p >= 0.2).astype(int)\n';
const MINUTES = 'def minutes(flags, answers):\n    missed = ((flags == 0) & (answers == 1)).sum()\n    return 20 * missed + 5 * flags.sum()\n';

/** Chapter 7 · Lesson 20 — Chapter Challenge: the honest scorecard. Cliffhanger: words the model can't read (Chapter 8). */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: the honest scorecard',
  summary: 'The board wants a one-page scorecard for v0.7 before it goes to all eight clinics. Use the whole chapter. Then Bisi asks why the model ignores half the columns in the spreadsheet.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build an honest scorecard for a classifier', 'Use every Chapter 7 skill together'],
  learn: [
    {
      kind: 'story',
      title: 'The scorecard',
      beats: [
        { speaker: 'folake', text: 'One page. Baseline, what it catches, what it costs, what it misses. The board signs off on Friday.' },
        { speaker: 'halima', text: 'Confusion matrix, precision, recall, minutes, per-clinic counts. All on week 12, all next to doing nothing.' },
        { speaker: 'narrator', text: 'The board signs. Then Bisi stops by with a printout of the bookings spreadsheet.' },
        { speaker: 'bisi', text: 'Your model uses four columns. What about visit type? Vaccinations hardly ever miss. And age group, and the weekday: Mondays are terrible.' },
        { speaker: 'halima', text: 'Those columns are words: "Vaccination", "18-34", "Mon". Logistic regression only reads numbers.' },
        { speaker: 'miracle', text: 'Then the next version isn\'t a new model. It\'s better ingredients.' },
        { speaker: 'tey', text: 'That\'s Chapter 7: the accuracy trap, baselines, the four boxes, confusion matrices, precision, recall, the trade-off, thresholds, costs, F1, groups, metrics first, and honest reports. Chapter 8 teaches the model to read words, scales and gaps.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 7 challenge: v0.7\'s honest scorecard.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Scorecard line 1: print the number of no-shows v0.7 reaches on week 12',
        starter: FLAG,
        solution: FLAG + 'print(((flags == 1) & (y == 1)).sum())\n',
        hint: '((flags == 1) & (y == 1)).sum()',
        checks: [{ message: 'Print 26', outputEquals: '26' }],
      },
      {
        kind: 'mcq',
        prompt: 'What must sit next to every number on the scorecard?',
        options: [
          { text: 'The training score', why: 'Too hopeful.' },
          { text: 'Accuracy', why: 'The trap.' },
          { text: 'The same number for doing nothing' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Scorecard line 2: print v0.7\'s precision on week 12, rounded to 2 places',
        starter: FLAG,
        solution: FLAG + 'print(round(precision_score(y, flags), 2))\n',
        hint: 'precision_score(y, flags)',
        checks: [{ message: 'Print 0.41', outputEquals: '0.41' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Scorecard: what it catches or what it misses?',
        groups: ['Catches', 'Misses'],
        items: [
          { text: '26 no-shows reached', group: 0 },
          { text: '205 minutes saved', group: 0 },
          { text: '11 no-shows with no warning', group: 1 },
          { text: 'Lekki: 1 of 3', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Scorecard line 3: print the minutes lost doing nothing on week 12',
        starter: FLAG + MINUTES,
        solution: FLAG + MINUTES + 'print(20 * y.sum())\n',
        hint: '20 * y.sum()',
        checks: [{ message: 'Print 740', outputEquals: '740' }],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'A board member asked for "the accuracy". Do I give it?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'No, refuse.', why: 'Answer, with context.' },
          { text: 'Yes, with "doing nothing" next to it: 76% against 81.5%. Then explain that the flag still saves 205 minutes, which is why accuracy isn\'t our measure.' },
          { text: 'Say 82%.', why: 'That was v0.6 at 0.5.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the Chapter 7 idea to the scorecard line.',
        pairs: [
          ['Baseline', 'Doing nothing: 740 minutes'],
          ['Recall', '26 of 37 no-shows reached'],
          ['Precision', '26 of 63 calls useful'],
          ['Per-clinic counts', 'Lekki: 1 of 3'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The chapter in one line.',
        template: 'Agree the [[1]] first, compare with a [[2]], and test once.',
        blanks: [['metric'], ['baseline']],
        distractors: ['accuracy', 'leak'],
      },
      {
        kind: 'writeCode',
        prompt: 'Bisi\'s question: print the names of the text columns in appointments.csv as a list',
        starter: IMPORTS + DATA,
        solution: IMPORTS + DATA + 'print(df.select_dtypes("object").columns.tolist())\n',
        hint: 'df.select_dtypes("object").columns.tolist()',
        checks: [{ message: 'Print the five text columns', outputEquals: "['appointment_id', 'clinic', 'weekday', 'visit_type', 'age_group']" }],
      },
      {
        kind: 'mcq',
        prompt: 'Why can\'t v0.7 use visit_type as it is?',
        options: [
          { text: 'It\'s words, and logistic regression only reads numbers: Chapter 8 fixes that' },
          { text: 'It isn\'t useful', why: 'Bisi says vaccinations rarely miss.' },
          { text: 'It\'s a leak', why: 'It\'s known when the booking is made.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Chapter 7 done: you can now measure a classifier honestly. Which measure will you reach for first next time, and why?',
    starters: ['I\'ll reach for...', 'Because...'],
  },
  notes: 'Chapter 7 challenge. Week 12 v0.7 (0.2): TP 26, precision 0.41, minutes 535 vs 740 doing nothing; accuracy 0.76 vs 0.815. Text columns: appointment_id, clinic, weekday, visit_type, age_group. Cliffhanger: feature engineering (Chapter 8).',
};

export default lesson;
