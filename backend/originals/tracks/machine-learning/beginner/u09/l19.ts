import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { CV_BASE, V8 } from './code';

const V9 =
  CV_BASE + V8 + 'from sklearn.metrics import confusion_matrix\n' +
  'grid = GridSearchCV(v8, {"logisticregression__C": [0.01, 0.1, 1, 10]}, cv=weeks, scoring=minutes_score)\n' +
  'grid.fit(train[feats], train["no_show"], groups=train["week"])\nv9 = grid.best_estimator_\n';
const TEST = 'p = v9.predict_proba(test[feats])[:, 1]\nflags = (p >= 0.2).astype(int)\n';

/** Chapter 9 · Lesson 19 — Version 0.9. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Version 0.9',
  summary: 'Every choice so far, re-checked over 11 weeks: features, threshold, C and the model itself. Then week 12, once. Six steps to the first version Miracle signs off.',
  minutes: 12,
  outcomes: [
    'Run the full cross-validated workflow',
    'Build v0.9 from GridSearchCV\'s best estimator',
    'Report v0.9 with its evidence',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From v0.8 to v0.9',
      steps: [
        { title: '1. Model family', body: 'Across 11 weeks, logistic regression (578 minutes a week) beats every tree depth (best: 601) and Chidi\'s tree (681).' },
        { title: '2. Features', body: 'v0.8\'s six beat v0.7\'s four: 6,355 vs 6,540 minutes, better in 6 weeks of 11.' },
        { title: '3. Threshold', body: '0.2 holds: 6,355, against 6,760 at 0.15 and 6,405 at 0.25.' },
        { title: '4. C', body: 'GridSearchCV picks C = 0.1, by about a minute a week: a tie that the simpler setting wins.', code: 'v9 = grid.best_estimator_', language: 'python' },
        { title: '5. Week 12, once', body: 'v0.9 reaches 27 of 37 no-shows with 64 calls, losing 520 minutes. v0.8 lost 535. Bisi\'s top 20 still reaches 12.' },
        { title: '6. Write it down', body: 'v0.9: v0.8 + C = 0.1, every choice cross-validated over 11 weeks. Week 12: 520 minutes vs 740 doing nothing. The 15-minute edge over v0.8 is within the noise; the evidence behind v0.9 is what\'s new.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Version 0.9',
      caption: 'Tuned on 11 weeks, tested once.',
      code: V9 + TEST + '\nprint("C:", grid.best_params_)\nprint(confusion_matrix(test["no_show"], flags))\nprint("Minutes lost:", minutes(flags, test["no_show"]))\n',
      challenge: 'Print v9[-1].coef_. How do they compare with v0.8\'s?',
    },
  ],
  apply: {
    scenario: 'Version 0.9.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print v0.9\'s minutes lost on week 12',
        starter: V9 + TEST,
        solution: V9 + TEST + 'print(minutes(flags, test["no_show"]))\n',
        hint: 'minutes(flags, test["no_show"])',
        checks: [{ message: 'Print 520', outputEquals: '520' }],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s really new in v0.9?',
        options: [
          { text: 'A much better model', why: 'It\'s 15 minutes better on one week: within the noise.' },
          { text: 'New features', why: 'Same six as v0.8.' },
          { text: 'Every choice now rests on 11 weeks of cross-validation, not one split' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print v0.9\'s confusion matrix on week 12 as a list',
        starter: V9 + TEST,
        solution: V9 + TEST + 'print(confusion_matrix(test["no_show"], flags).tolist())\n',
        hint: 'confusion_matrix(test["no_show"], flags).tolist()',
        checks: [{ message: 'Print [[126, 37], [10, 27]]', outputEquals: '[[126, 37], [10, 27]]' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Chosen by cross-validation, or measured on week 12?',
        groups: ['Cross-validation', 'Week 12'],
        items: [
          { text: 'C = 0.1', group: 0 },
          { text: 'Threshold 0.2', group: 0 },
          { text: '520 minutes lost', group: 1 },
          { text: '27 of 37 reached', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'Convince me to sign off v0.9.',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'It\'s 15 minutes better than v0.8.', why: 'That\'s within the noise; the process is the argument.' },
          { text: 'Every choice was made on 11 weeks of cross-validation, with week 12 opened once at the end: 27 of 37 no-shows reached, 220 minutes saved against doing nothing.' },
          { text: 'Chidi likes it.', why: 'Evidence, please.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the version to its week-12 minutes lost.',
        pairs: [
          ['Doing nothing', '740'],
          ['v0.7', '535'],
          ['v0.9', '520'],
          ['Chidi\'s tree (unlimited)', '760'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Building v0.9.',
        language: 'python',
        template: 'grid.fit(train[feats], train["no_show"], groups=train["week"])\nv9 = grid.[[1]]\nprint(grid.[[2]])',
        blanks: [['best_estimator_'], ['best_params_']],
        distractors: ['cv_results_', 'best_test_'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step would undo the work?',
        lines: ['Choose C, threshold and features by cross-validation.', 'Open week 12 once for v0.9.', 'Re-tune C on week 12 to squeeze out more.'],
        bug: 2,
        fix: 'Leave week 12 alone; wait for week 13 to check again.',
        explanation: 'Re-tuning on the test week is Chidi\'s shortcut.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes does v0.9 save on week 12 compared with doing nothing?',
        answers: ['220'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'v0.9 beats v0.8 by 15 minutes on week 12. How should that be reported?',
        options: [
          { text: 'As a big win', why: 'One week, 15 minutes: noise.' },
          { text: 'Not at all', why: 'Report it, with context.' },
          { text: 'As within the noise: the two are about equal on one week' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Miracle signs off on the process, not the number. Why might that be the better habit?',
    starters: ['Because...'],
  },
  deepen: {
    title: 'Model sign-off',
    summary: 'In many organisations a second person reviews a model before it\'s used: data, leaks, validation method, test result, limits. Miracle\'s questions are a small version of that review.',
  },
  notes: 'v0.9 = GridSearchCV best_estimator_ (C = 0.1) of v0.8 pipeline, refit on weeks 1-11. Week 12 at 0.2: 64 flags, 27 of 37 reached, cm [[126, 37], [10, 27]], 520 minutes (v0.8 535, nothing 740), top 20 12. Leave-one-week-out total 6340.',
};

export default lesson;
