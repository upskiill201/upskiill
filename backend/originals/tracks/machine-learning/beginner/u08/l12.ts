import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { DATA, IMPORTS, PIPE_IMPORTS, SPLIT } from './code';

const BASE = IMPORTS + PIPE_IMPORTS + DATA + SPLIT;

/** Chapter 8 · Lesson 12 — Fitting steps on training data only. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Fitting steps on training data only',
  summary: 'The scaler and the imputer learn too: an average, a spread, a median. If they learn from week 12, a little of the test week leaks into the model. A short reading on the quietest leak in machine learning.',
  minutes: 11,
  outcomes: [
    'Explain how preparation steps can leak',
    'Fit every step on the training rows only',
    'Use a pipeline to make the safe way automatic',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The quiet leak',
      html: '<p>Chapter 4\'s leak was loud: a column that was nearly the answer. This one is quiet.</p><p>Chidi scales the features before splitting: <code>StandardScaler().fit(df[feats])</code>, then splits into training and test weeks. It looks harmless. But the scaler\'s average now includes week 12. Average distance over all 12 weeks is <strong>10.69 km</strong>; over the training weeks alone, <strong>10.73 km</strong>.</p><p>Here the difference is tiny and changes almost nothing. That\'s what makes it dangerous: it\'s easy to get away with until a project where it matters. Imagine week 12 had a new rural clinic with 50 km patients. The "average" would shift towards them, and the model would quietly be prepared for a week it was never supposed to see.</p><p><strong>The rule:</strong> every step that learns something (imputer, scaler, encoder, model) learns it from the training rows only. Then the same learned values are applied to validation and test.</p><p><strong>The easy way to obey it:</strong> put the steps in a pipeline and call <code>fit</code> on the training rows. The pipeline can\'t peek, because it never sees anything else.</p>',
    },
    {
      kind: 'check',
      question: 'Which way of scaling is safe?',
      options: ['Fit the scaler on all 12 weeks, then split', 'Fit the scaler on the training weeks, then apply it to week 12', 'Fit a separate scaler on week 12'],
      answer: 1,
      explanation: 'Learn from training, apply everywhere.',
    },
    {
      kind: 'tryIt',
      title: 'Two averages',
      caption: 'What the scaler learns depends on what you show it.',
      code: BASE + '\nall_rows = StandardScaler().fit(df[["distance_km"]])\ntrain_only = StandardScaler().fit(train[["distance_km"]])\nprint("Learned from all weeks:", all_rows.mean_[0].round(2))\nprint("Learned from training weeks:", train_only.mean_[0].round(2))\n',
      challenge: 'Try the same with wait_days.',
    },
  ],
  apply: {
    scenario: 'Fitting steps on training data only.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Fit a StandardScaler on all 12 weeks\' distance_km and print the average it learned, rounded to 2 places',
        starter: BASE + 'scaler = StandardScaler()\n',
        solution: BASE + 'scaler = StandardScaler()\nscaler.fit(df[["distance_km"]])\nprint(round(scaler.mean_[0], 2))\n',
        hint: 'scaler.mean_[0]',
        checks: [{ message: 'Print 10.69', outputEquals: '10.69' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why is fitting the scaler on all weeks a leak?',
        options: [
          { text: 'It makes the model slower', why: 'It\'s about information, not speed.' },
          { text: 'It isn\'t a leak', why: 'Week 12 influenced what was learned.' },
          { text: 'Its average includes week 12, so test data shapes the model' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Now fit it on the training weeks only and print the average, rounded to 2 places',
        starter: BASE + 'scaler = StandardScaler()\n',
        solution: BASE + 'scaler = StandardScaler()\nscaler.fit(train[["distance_km"]])\nprint(round(scaler.mean_[0], 2))\n',
        hint: 'fit on train',
        checks: [{ message: 'Print 10.73', outputEquals: '10.73' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe or leaky?',
        groups: ['Safe', 'Leaky'],
        items: [
          { text: 'pipeline.fit(train[...])', group: 0 },
          { text: 'Imputer median from training weeks', group: 0 },
          { text: 'Scaler fitted before splitting', group: 1 },
          { text: 'Imputer median from week 12', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: '10.69 vs 10.73. Who cares?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Here, almost nobody. But the habit is what matters: one day the test week will be very different, and a leaky habit will hide it.' },
          { text: 'It ruins everything.', why: 'Here it barely matters; the habit does.' },
          { text: 'Nobody, ever.', why: 'It can matter a lot when test data differs.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to what it learns.',
        pairs: [
          ['SimpleImputer', 'A fill value per column'],
          ['StandardScaler', 'An average and spread per column'],
          ['OneHotEncoder', 'The list of categories'],
          ['LogisticRegression', 'Coefficients'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The safe pattern.',
        language: 'python',
        template: 'model.fit([[1]][feats], train["no_show"])\np = model.predict_proba([[2]][feats])[:, 1]',
        blanks: [['train'], ['test']],
        distractors: ['df', 'raw'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line leaks?',
        language: 'python',
        lines: ['scaled = StandardScaler().fit_transform(df[feats])', 'train_x = scaled[df["week"] <= 11]', 'test_x = scaled[df["week"] == 12]'],
        bug: 0,
        fix: 'Fit the scaler on the training rows only, inside a pipeline.',
        explanation: 'fit_transform on all rows learns from week 12.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which object makes the safe way automatic?',
        answers: ['pipeline', 'a pipeline', 'make_pipeline', 'Pipeline'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'When would this quiet leak matter a lot?',
        options: [
          { text: 'Never', why: 'It matters when test data differs.' },
          { text: 'Only with trees', why: 'Any model can be affected.' },
          { text: 'When the test week is very different, like a new rural clinic' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'An exam marked "on a curve" uses everyone\'s scores. How is that like a scaler fitted on all the data?',
    starters: ['It\'s like...'],
  },
  deepen: {
    title: 'Leakage in competitions',
    summary: 'Data science competitions have been won, and later embarrassed, by subtle leaks like this. Pipelines are the professional habit that prevents them.',
  },
  notes: 'StandardScaler distance_km mean: all weeks 10.69, training weeks 1-11 10.73.',
};

export default lesson;
