import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { CV_BASE, V8 } from './code';

/** Chapter 9 · Lesson 10 — Checkpoint 2: cross-validation and tuning. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: eleven weeks of evidence',
  summary: 'Cross-validation by hand and in one line, tuning a tree\'s depth and a grid over C. Check you can turn one lucky split into eleven weeks of evidence.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Cross-validate by week with your own measure', 'Tune a setting and read the result'],
  learn: [
    {
      kind: 'story',
      title: 'Evidence',
      beats: [
        { speaker: 'folake', text: 'Last week you said v0.8 "might" be better. Now?' },
        { speaker: 'halima', text: 'Eleven weeks of evidence: 185 fewer minutes lost than v0.7. Modest, and real.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: eleven weeks of evidence.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Cross-validate v0.8 by week and print its worst week\'s minutes lost',
        starter: CV_BASE + V8 + 'scores = cross_val_score(v8, train[feats], train["no_show"], groups=train["week"], cv=weeks, scoring=minutes_score)\n',
        solution: CV_BASE + V8 + 'scores = cross_val_score(v8, train[feats], train["no_show"], groups=train["week"], cv=weeks, scoring=minutes_score)\nprint(-scores.min())\n',
        hint: 'The worst week has the lowest score: -scores.min()',
        checks: [{ message: 'Print 720', outputEquals: '720' }],
      },
      {
        kind: 'mcq',
        prompt: 'Which data does cross-validation use?',
        options: [
          { text: 'All 12 weeks', why: 'Week 12 stays locked.' },
          { text: 'Only week 12', why: 'That\'s the test.' },
          { text: 'Only the learning weeks, 1 to 11' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Cross-validate v0.8 by week and print its best week\'s minutes lost',
        starter: CV_BASE + V8 + 'scores = cross_val_score(v8, train[feats], train["no_show"], groups=train["week"], cv=weeks, scoring=minutes_score)\n',
        solution: CV_BASE + V8 + 'scores = cross_val_score(v8, train[feats], train["no_show"], groups=train["week"], cv=weeks, scoring=minutes_score)\nprint(-scores.max())\n',
        hint: '-scores.max()',
        checks: [{ message: 'Print 450', outputEquals: '450' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Lesson 6-9 tool: folds or tuning?',
        groups: ['Making folds', 'Tuning'],
        items: [
          { text: 'LeaveOneGroupOut', group: 0 },
          { text: 'groups=train["week"]', group: 0 },
          { text: 'GridSearchCV', group: 1 },
          { text: 'best_params_', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Cross-validate a depth-2 tree by week and print its average minutes lost, rounded to 1 place',
        starter: CV_BASE + 'tree = DecisionTreeClassifier(max_depth=2, random_state=42)\n',
        solution: CV_BASE + 'tree = DecisionTreeClassifier(max_depth=2, random_state=42)\nscores = cross_val_score(tree, train[feats], train["no_show"], groups=train["week"], cv=weeks, scoring=minutes_score)\nprint(round(-scores.mean(), 1))\n',
        hint: '-scores.mean()',
        checks: [{ message: 'Print 629.1', outputEquals: '629.1' }],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Why did weeks 10 and 11 pick depth 6 if depth 5 is better?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Weeks 10 and 11 are broken.', why: 'They\'re just a small sample.' },
          { text: 'Two weeks is a small sample. Depth 6 got a bit lucky there. Eleven weeks average the luck out.' },
          { text: 'Depth 6 is better.', why: 'Not across 11 weeks.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the finding to its evidence.',
        pairs: [
          ['v0.8 beats v0.7', '6,355 vs 6,540 minutes'],
          ['Best tree depth', '5, at 601 a week'],
          ['Best C', '0.1, by about a minute a week'],
          ['Doing nothing', '8,040 minutes'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The scorer.',
        language: 'python',
        template: 'def minutes_score(model, X, y):\n    flags = (model.[[1]](X)[:, 1] >= 0.2).astype(int)\n    return [[2]]minutes(flags, y.values)',
        blanks: [['predict_proba'], ['-']],
        distractors: ['predict', '+'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step leaks the test week into tuning?',
        lines: ['Cross-validate depths on weeks 1 to 11.', 'Pick the best average.', 'Then also check depths on week 12 and switch if another wins.'],
        bug: 2,
        fix: 'Test only the chosen model on week 12, once.',
        explanation: 'Switching after seeing week 12 turns it into validation.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes a week does v0.8 save over v0.7, roughly?',
        answers: ['17', '16', '16.8', 'about 17'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: '"Modest, and real" or "big, but maybe luck": which would you rather report to a boss? Why?',
    starters: ['I\'d rather...'],
  },
  notes: 'Checkpoint for Chapter 9 lessons 6-9. v0.8 by week: worst 720 (week 10), best 450 (week 5). Depth-2 tree mean 629.1. 185 / 11 = 16.8 minutes a week.',
};

export default lesson;
