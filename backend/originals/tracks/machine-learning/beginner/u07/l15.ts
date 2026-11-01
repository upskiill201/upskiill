import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { PROBS, VAL } from './code';

const MINUTES = 'def minutes(flags, answers):\n    missed = ((flags == 0) & (answers == 1)).sum()\n    return 20 * missed + 5 * flags.sum()\n';

/** Chapter 7 · Lesson 15 — Checkpoint 3: costs, F1, groups, metrics first. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: measuring what matters',
  summary: 'Minutes lost, F1, per-clinic scores and metrics agreed in advance. Check you can measure a classifier the way the clinic would.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Choose a threshold by cost', 'Break scores down by group, carefully'],
  learn: [
    {
      kind: 'compare',
      title: 'One number, two numbers',
      before: {
        label: 'F1',
        text: 'Combines precision and recall.\nTreats both mistakes as similar.\nGood for quick comparisons.',
      },
      after: {
        label: 'Minutes lost',
        text: '20 per missed no-show, 5 per call.\nUses the clinic\'s real costs.\nGood for choosing the threshold.',
      },
      notes: ['Both picked 0.2 on validation. If they disagreed, minutes would win.'],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: measuring what matters.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'On validation, print the minutes lost at a threshold of 0.3',
        starter: VAL + MINUTES,
        solution: VAL + MINUTES + 'print(minutes((pv >= 0.3).astype(int), yv))\n',
        hint: 'minutes((pv >= 0.3).astype(int), yv)',
        checks: [{ message: 'Print 1390', outputEquals: '1390' }],
      },
      {
        kind: 'mcq',
        prompt: 'What does F1 assume that minutes don\'t?',
        options: [
          { text: 'That accuracy matters', why: 'F1 ignores accuracy.' },
          { text: 'That costs are known', why: 'It\'s for when they aren\'t.' },
          { text: 'That a wasted call and a missed no-show matter about equally' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'On week 12, print the F1 at a threshold of 0.2, rounded to 2 places',
        starter: PROBS + 'f = (p >= 0.2).astype(int)\n',
        solution: PROBS + 'f = (p >= 0.2).astype(int)\nprint(round(f1_score(y, f), 2))\n',
        hint: 'f1_score(y, f)',
        checks: [{ message: 'Print 0.52', outputEquals: '0.52' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Agreed before looking, or after?',
        groups: ['Before (good)', 'After (cherry-picking)'],
        items: [
          { text: 'Top 20 reached each week', group: 0 },
          { text: 'Minutes at 20 and 5', group: 0 },
          { text: 'The one measure the tree wins', group: 1 },
          { text: 'Dropping Lekki because it looks bad', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'Gumel 6 of 6! Can we say the model is perfect at Gumel?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Yes: 100% recall.', why: 'Six patients is far too few.' },
          { text: 'It\'s 6 patients in one week. Good sign, not proof. Let\'s watch it over more weeks before we say anything.' },
          { text: 'No, it\'s a bug.', why: 'It\'s a real, small result.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its lesson.',
        pairs: [
          ['Minutes lost', 'Which mistake costs more?'],
          ['Harmonic mean', 'F1, honestly'],
          ['Lekki 1 of 3', 'Scores per clinic'],
          ['Write it down first', 'Choosing the metric'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Minutes lost.',
        template: 'minutes = 20 × missed [[1]] + 5 × [[2]]',
        blanks: [['no-shows'], ['calls']],
        distractors: ['true negatives', 'bookings'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step breaks the "metric first" rule?',
        lines: ['Agree top-20 reach and minutes lost.', 'Compare models on validation.', 'Add F1 to the report because our model wins on it.'],
        bug: 2,
        fix: 'Report the agreed measures, win or lose.',
        explanation: 'Adding a measure because it flatters you is cherry-picking.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which threshold gave the lowest minutes lost on validation?',
        answers: ['0.2', '.2'],
        placeholder: 'A threshold',
      },
      {
        kind: 'mcq',
        prompt: 'Review, lesson 4: in confusion_matrix(y, pred), which cell is the missed no-shows?',
        options: [
          { text: 'cm[1, 0]' },
          { text: 'cm[0, 1]', why: 'That\'s wasted calls.' },
          { text: 'cm[1, 1]', why: 'That\'s caught no-shows.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which idea from this chapter would you use outside machine learning?',
    starters: ['I\'d use...'],
  },
  notes: 'Checkpoint for Chapter 7 lessons 11-14. Validation minutes at 0.3: 1390 (best 0.2, 1265). Week 12 F1 at 0.2: 0.52.',
};

export default lesson;
