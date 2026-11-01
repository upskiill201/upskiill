import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { CV_BASE } from './code';

const DEPTH = (d: number) => `tree = DecisionTreeClassifier(max_depth=${d}, random_state=42)\nscores = cross_val_score(tree, train[feats], train["no_show"], groups=train["week"], cv=weeks, scoring=minutes_score)\n`;

/** Chapter 9 · Lesson 8 — Tuning one setting with cross-validation. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Tuning one setting',
  summary: 'Choosing a setting like depth is called tuning. With cross-validation, each depth gets 11 weeks of evidence instead of two. Five beliefs about tuning, and the depth Chidi should have picked.',
  minutes: 12,
  outcomes: [
    'Tune a setting with cross-validation',
    'Compare settings by their average score',
    'Avoid common tuning myths',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'A setting chosen on one validation split is reliable.',
          isFact: false,
          explain: 'Myth, with small data. Weeks 10 and 11 picked depth 6. Across 11 weeks, depth 5 is best: 601 minutes a week against 623 for depth 6.',
        },
        {
          text: 'Tuning means trying settings and keeping the best cross-validated one.',
          isFact: true,
          explain: 'Fact. Try depths 2 to 8, cross-validate each, keep the best average.',
        },
        {
          text: 'The tuned tree will beat logistic regression.',
          isFact: false,
          explain: 'Myth, here. The best tree (depth 5) loses 601 minutes a week; v0.8 loses 578. Tuning finds the best tree, not necessarily the best model.',
        },
        {
          text: 'Averages hide how much a setting wobbles from week to week.',
          isFact: true,
          explain: 'Fact. v0.8\'s weeks range from 450 to 720 minutes. Look at the spread, not just the average.',
        },
        {
          text: 'You should tune on week 12 to get the best final model.',
          isFact: false,
          explain: 'Myth. Then week 12 isn\'t a test any more. Chidi tries it in lesson 16.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Depth, cross-validated',
      caption: 'Average minutes lost per week, for each depth.',
      code: CV_BASE + '\nfor depth in [2, 3, 4, 5, 6, 8]:\n    tree = DecisionTreeClassifier(max_depth=depth, random_state=42)\n    scores = cross_val_score(tree, train[feats], train["no_show"], groups=train["week"], cv=weeks, scoring=minutes_score)\n    print(depth, round(-scores.mean(), 1))\n',
      challenge: 'Compare the best with v0.8\'s 577.7.',
    },
  ],
  apply: {
    scenario: 'Tuning one setting.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Cross-validate a depth-5 tree by week and print its average minutes lost, rounded to 1 place',
        starter: CV_BASE + 'tree = DecisionTreeClassifier(max_depth=5, random_state=42)\n',
        solution: CV_BASE + DEPTH(5) + 'print(round(-scores.mean(), 1))\n',
        hint: 'cross_val_score(..., cv=weeks, scoring=minutes_score), then -scores.mean()',
        checks: [{ message: 'Print 601.4', outputEquals: '601.4' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'One split picks reliably', group: 0 },
          { text: 'Keep the best cross-validated setting', group: 1 },
          { text: 'The tuned tree must win', group: 0 },
          { text: 'Check the spread too', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Two weeks picked depth 6; eleven picked depth 5. Which do you trust?',
        options: [
          { text: 'Depth 6: it came first', why: 'Order doesn\'t matter; evidence does.' },
          { text: 'Depth 5: it\'s based on all 11 learning weeks' },
          { text: 'Neither', why: 'Eleven weeks is the stronger evidence.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Cross-validate a depth-6 tree and print its average minutes lost, rounded to 1 place',
        starter: CV_BASE + 'tree = DecisionTreeClassifier(max_depth=6, random_state=42)\n',
        solution: CV_BASE + DEPTH(6) + 'print(round(-scores.mean(), 1))\n',
        hint: 'Same as depth 5',
        checks: [{ message: 'Print 622.7', outputEquals: '622.7' }],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Fine, depth 5. Now the tree is tuned, it beats logistic regression, right?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Still no: 601 minutes a week against v0.8\'s 578. Tuning made it the best tree, not the best model.' },
          { text: 'Yes, tuned always wins.', why: 'The numbers say otherwise.' },
          { text: 'Trees can\'t be tuned.', why: 'We just tuned one.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the depth to its average weekly minutes (11 weeks).',
        pairs: [
          ['2', '629.1'],
          ['3', '691.4'],
          ['5', '601.4'],
          ['8', '648.2'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Tuning.',
        template: 'Try each [[1]], cross-validate it, keep the best [[2]] score.',
        blanks: [['setting'], ['average']],
        distractors: ['week', 'training'],
      },
      {
        kind: 'findBug',
        prompt: 'Which tuning step is wrong?',
        lines: ['Try depths 2 to 8.', 'Cross-validate each over weeks 1 to 11.', 'Keep the depth with the best training accuracy.'],
        bug: 2,
        fix: 'Keep the depth with the best cross-validated score.',
        explanation: 'Training accuracy always prefers the deepest tree.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which depth is best across 11 weeks?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why can\'t tuning a tree make it beat v0.8 here?',
        options: [
          { text: 'Trees can\'t be tuned', why: 'They can.' },
          { text: 'Tuning picks the best version of a model; it can\'t change what kind of model it is' },
          { text: 'It can, with more depth', why: 'More depth overfits.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What setting in your life (alarm time, study length) would you tune by trying several and averaging?',
    starters: ['I\'d tune...'],
  },
  deepen: {
    title: 'Hyperparameters',
    summary: 'Settings you choose before training (depth, k, C, the threshold) are called hyperparameters. What the model learns during training (coefficients, splits) are parameters. Tuning is about hyperparameters.',
  },
  notes: 'Leave-one-week-out mean minutes per week (v0.8 features, threshold 0.2): tree depth 2 629.1, 3 691.4, 4 645.9, 5 601.4, 6 622.7, 8 648.2; v0.8 LR 577.7 (range 450-720).',
};

export default lesson;
