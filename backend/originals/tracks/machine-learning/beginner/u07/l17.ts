import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { BASE, PROBS } from './code';

const FLAG = PROBS + 'flags = (p >= 0.2).astype(int)\n';

/** Chapter 7 · Lesson 17 — Common metric mistakes. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Common metric mistakes',
  summary: 'Chidi\'s report says precision 0.70. Halima gets 0.41 from the same flags. Neither of them made a typo. Five beliefs about metric mistakes, and the swapped arguments behind Chidi\'s number.',
  minutes: 12,
  outcomes: [
    'Spot the most common metric mistakes',
    'Pass arguments to metric functions in the right order',
    'Check a reported number before trusting it',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'precision_score(pred, y) and precision_score(y, pred) give the same answer.',
          isFact: false,
          explain: 'Myth. Swap them and precision becomes recall. On week 12 at 0.2: the right way gives 0.41, swapped gives 0.70, which is actually the recall.',
        },
        {
          text: 'Scoring a model on its training weeks shows how it will do next week.',
          isFact: false,
          explain: 'Myth. Chapter 4 again: training scores are too hopeful. Every metric in this chapter is on unseen weeks.',
        },
        {
          text: 'Reporting precision without recall (or the other way round) can mislead.',
          isFact: true,
          explain: 'Fact. Each one alone can be gamed: flag one booking for perfect precision, flag everyone for perfect recall.',
        },
        {
          text: 'A metric with no baseline next to it is hard to judge.',
          isFact: true,
          explain: 'Fact. "Recall 0.70" sounds good. Next to "doing nothing: 0", it\'s clear what it means.',
        },
        {
          text: 'Small groups give reliable percentages.',
          isFact: false,
          explain: 'Myth. Lekki\'s 1 of 3 is 33%; one more patient makes it 67%. Always show the counts.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The swapped arguments',
      caption: 'Same flags, two orders.',
      code: FLAG + '\nprint("precision_score(y, flags):", round(precision_score(y, flags), 3))\nprint("precision_score(flags, y):", round(precision_score(flags, y), 3))\nprint("recall_score(y, flags):", round(recall_score(y, flags), 3))\n',
      challenge: 'Which two numbers match? Why?',
    },
  ],
  apply: {
    scenario: 'Common metric mistakes.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Reproduce Chidi\'s mistake: print precision_score(flags, y), rounded to 3 places',
        starter: FLAG,
        solution: FLAG + 'print(round(precision_score(flags, y), 3))\n',
        hint: 'precision_score(flags, y)',
        checks: [{ message: 'Print 0.703', outputEquals: '0.703' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Argument order doesn\'t matter', group: 0 },
          { text: 'Show precision with recall', group: 1 },
          { text: 'Training scores predict next week', group: 0 },
          { text: 'Always show a baseline', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does swapping the arguments turn precision into recall?',
        options: [
          { text: 'It\'s a scikit-learn bug', why: 'It does exactly what it\'s told.' },
          { text: 'It doesn\'t', why: 'The numbers prove it does.' },
          { text: 'The function divides by the "predicted yes" of its second argument; swapped, that\'s the real no-shows' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the correct precision at 0.2, rounded to 3 places',
        starter: FLAG,
        solution: FLAG + 'print(round(precision_score(y, flags), 3))\n',
        hint: 'Real answers first',
        checks: [{ message: 'Print 0.413', outputEquals: '0.413' }],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'My precision is 0.70 and Halima\'s is 0.41. Who\'s right?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Halima. You passed (flags, y); scikit-learn wants (y, flags). Your 0.70 is really the recall.' },
          { text: 'Both, it depends.', why: 'Only one order is precision.' },
          { text: 'You: higher is better.', why: 'It\'s a different measure.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the mistake to its fix.',
        pairs: [
          ['Swapped arguments', 'Real answers first: (y, pred)'],
          ['Scored on training weeks', 'Score on an unseen week'],
          ['Precision alone', 'Show recall too'],
          ['Percent of 3 patients', 'Show the counts'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The right order.',
        language: 'python',
        template: 'precision_score([[1]], [[2]])',
        blanks: [['y'], ['flags']],
        distractors: ['p', 'test'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line has a metric mistake?',
        language: 'python',
        lines: ['pred = model.predict(test[feats])', 'print(recall_score(y, pred))', 'print(precision_score(train["no_show"], model.predict(train[feats])))'],
        bug: 2,
        fix: 'print(precision_score(y, pred))',
        explanation: 'Precision on the training weeks is too hopeful. Score on week 12.',
      },
      {
        kind: 'writeCode',
        prompt: 'Print v0.6\'s recall at 0.5 on its own training weeks, rounded to 3 places (to see how it differs from week 12\'s 0.162)',
        starter: BASE,
        solution: BASE + 'print(round(recall_score(train["no_show"], model.predict(train[feats])), 3))\n',
        hint: 'recall_score(train["no_show"], model.predict(train[feats]))',
        checks: [{ message: 'Print 0.197', outputEquals: '0.197' }],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the fastest check on any metric someone reports?',
        options: [
          { text: 'Trust it if it\'s high', why: 'High numbers can be mistakes.' },
          { text: 'Round it', why: 'Rounding hides nothing useful.' },
          { text: 'Ask for the counts behind it and the baseline next to it' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which of these mistakes do you think you\'d be most likely to make? How will you catch it?',
    starters: ['I\'d probably...', 'I\'ll catch it by...'],
  },
  deepen: {
    title: 'classification_report',
    summary: 'scikit-learn\'s classification_report(y, pred) prints precision, recall and F1 for both classes with the counts ("support"). It\'s a handy guard against reporting one number alone.',
  },
  notes: 'Week 12 at 0.2: precision_score(y, flags) 0.413; swapped 0.703 (= recall). v0.6 training-week recall at 0.5: 0.197 vs week 12 0.162.',
};

export default lesson;
