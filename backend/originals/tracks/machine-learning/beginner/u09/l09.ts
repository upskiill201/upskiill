import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { CV_BASE, V8 } from './code';

const GRID = CV_BASE + V8 + 'grid = GridSearchCV(v8, {"logisticregression__C": [0.01, 0.1, 1, 10]}, cv=weeks, scoring=minutes_score)\n';
const FIT = 'grid.fit(train[feats], train["no_show"], groups=train["week"])\n';

/** Chapter 9 · Lesson 9 — Grid search. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Grid search',
  summary: 'Writing the tuning loop by hand gets old. GridSearchCV tries every setting in a list, cross-validates each and keeps the winner. A short reading on using it on v0.8\'s one setting: C.',
  minutes: 12,
  outcomes: [
    'Tune a setting with GridSearchCV',
    'Name a pipeline step\'s setting correctly',
    'Read best_params_ and best_score_',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'C, and a grid',
      html: '<p>Logistic regression has a setting called <strong>C</strong>. A small C keeps the coefficients small: a simpler, more cautious model. A large C lets them grow to fit the training data more closely. The default is 1.</p><p><strong>GridSearchCV</strong> takes a model, a dictionary of settings to try, the folds and the measure. For v0.8 we try C = 0.01, 0.1, 1 and 10, with leave-one-week-out and minutes lost.</p><p>Because v0.8 is a pipeline, the setting needs the step\'s name in front: <code>"logisticregression__C"</code>, with two underscores. That\'s how GridSearchCV knows which step to change.</p><p>After <code>grid.fit(...)</code>, <code>grid.best_params_</code> gives the winner and <code>grid.best_score_</code> its average score. Here: <strong>C = 0.1</strong>, at 576.4 minutes a week, against 577.7 for the default. A difference of about one minute a week.</p><p>That\'s an honest result: tuning C barely matters for this model. It does tell us one useful thing: a slightly simpler model is at least as good. GridSearchCV also refits the winner on all 11 weeks, ready to use, as <code>grid.best_estimator_</code>.</p>',
    },
    {
      kind: 'check',
      question: 'Why "logisticregression__C" and not just "C"?',
      options: ['It\'s a typo', 'C is a pandas setting', 'C belongs to the logisticregression step of the pipeline'],
      answer: 2,
      explanation: 'step name + two underscores + setting.',
    },
    {
      kind: 'tryIt',
      title: 'The grid',
      caption: 'Four values of C, eleven folds each.',
      code: GRID + FIT + '\nprint("Best:", grid.best_params_)\nfor c, s in zip([0.01, 0.1, 1, 10], grid.cv_results_["mean_test_score"]):\n    print(c, round(-s, 1))\n',
      challenge: 'How many fits did that take? (4 settings × 11 folds, plus one final refit.)',
    },
  ],
  apply: {
    scenario: 'Grid search.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Fit the grid and print best_params_',
        starter: GRID,
        solution: GRID + FIT + 'print(grid.best_params_)\n',
        hint: 'grid.fit(..., groups=train["week"]), then grid.best_params_',
        checks: [{ message: 'Print the best C', outputEquals: "{'logisticregression__C': 0.1}" }],
      },
      {
        kind: 'mcq',
        prompt: 'What does a smaller C do?',
        options: [
          { text: 'Makes the model more complex', why: 'That\'s a larger C.' },
          { text: 'Keeps the coefficients small: a simpler, more cautious model' },
          { text: 'Changes the threshold', why: 'The threshold is separate.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the best average minutes lost per week (minus best_score_), rounded to 1 place',
        starter: GRID + FIT,
        solution: GRID + FIT + 'print(round(-grid.best_score_, 1))\n',
        hint: '-grid.best_score_',
        checks: [{ message: 'Print 576.4', outputEquals: '576.4' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'What does GridSearchCV need from you?',
        groups: ['You give it', 'It gives you'],
        items: [
          { text: 'The settings to try', group: 0 },
          { text: 'The folds and the measure', group: 0 },
          { text: 'best_params_', group: 1 },
          { text: 'best_estimator_', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'C = 0.1 wins! Massive upgrade?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Yes, huge.', why: '576.4 vs 577.7.' },
          { text: 'C doesn\'t do anything.', why: 'It does; here the effect is small.' },
          { text: 'About one minute a week better than the default. Tuning C barely matters here, which is good to know.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match C to its average weekly minutes.',
        pairs: [
          ['0.01', '580.5'],
          ['0.1', '576.4'],
          ['1 and 10 (a tie)', '577.7'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The setting\'s name in a pipeline.',
        language: 'python',
        template: 'GridSearchCV(v8, {"[[1]]__[[2]]": [0.01, 0.1, 1, 10]})',
        blanks: [['logisticregression'], ['C']],
        distractors: ['standardscaler', 'max_depth'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line forgets the weeks?',
        language: 'python',
        lines: ['grid = GridSearchCV(v8, params, cv=LeaveOneGroupOut(), scoring=minutes_score)', 'grid.fit(train[feats], train["no_show"])', 'print(grid.best_params_)'],
        bug: 1,
        fix: 'grid.fit(train[feats], train["no_show"], groups=train["week"])',
        explanation: 'LeaveOneGroupOut needs groups passed to fit.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many settings did the grid try?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What is grid.best_estimator_?',
        options: [
          { text: 'The pipeline with the best C, refitted on all 11 weeks' },
          { text: 'The best fold', why: 'It\'s a whole fitted model.' },
          { text: 'The test score', why: 'Week 12 isn\'t involved.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'A tuning result says "it barely matters". Why is that still a useful thing to learn?',
    starters: ['It\'s useful because...'],
  },
  deepen: {
    title: 'Bigger grids',
    summary: 'A grid can tune several settings at once, like depth and min_samples_leaf. The number of fits multiplies quickly; RandomizedSearchCV tries a random sample of combinations instead.',
  },
  notes: 'GridSearchCV(v8, C in [0.01, 0.1, 1, 10], leave-one-week-out, minutes): mean per week 580.5, 576.4, 577.7, 577.7; best C = 0.1.',
};

export default lesson;
