import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { CV_IMPORTS, DATA, F6, IMPORTS, MINUTES, SPLIT, V8 } from './code';

const BASE =
  IMPORTS + CV_IMPORTS + DATA + F6 + SPLIT + MINUTES + V8 +
  'def score_at(threshold):\n    def score(model, X, y):\n        flags = (model.predict_proba(X)[:, 1] >= threshold).astype(int)\n        return -minutes(flags, y.values)\n    return score\n';
const CV = (th: string) => `scores = cross_val_score(v8, train[feats], train["no_show"], groups=train["week"], cv=LeaveOneGroupOut(), scoring=score_at(${th}))\n`;

/** Chapter 9 · Lesson 13 — Tuning without cheating. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Tuning without cheating',
  summary: 'Cross-validation is only honest if nothing from the held-out week sneaks into the fold. Tap through the three rules Miracle checks, then use them to re-check v0.8\'s threshold across 11 weeks.',
  minutes: 12,
  outcomes: [
    'Keep every fold honest',
    'Tune the threshold with cross-validation',
    'Keep the test week out of all tuning',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Miracle\'s three rules',
      text: 'Rule one: the test week never enters cross-validation. Rule two: every step that learns, including the imputer and scaler, is inside the pipeline, so each fold fits its own. Rule three: every setting is chosen by cross-validation, the threshold included. Checked this way, 0.2 still wins: 6,355 minutes over 11 weeks, against 6,760 at 0.15 and 6,405 at 0.25.',
      hotspots: [
        { phrase: 'the test week never enters cross-validation', note: 'Week 12 isn\'t in train, so it can\'t be in any fold.' },
        { phrase: 'inside the pipeline, so each fold fits its own', note: 'If the scaler were fitted once on all 11 weeks, each held-out week would have helped set the average: Chapter 8\'s quiet leak, inside cross-validation.' },
        { phrase: 'the threshold included', note: 'The threshold is a setting too. Chapter 7 chose it on one split; now it gets 11 weeks.' },
        { phrase: '0.2 still wins', note: 'Good news: the Chapter 7 choice holds up with much more evidence.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The threshold, cross-validated',
      caption: 'Total minutes lost over 11 weeks.',
      code: BASE + '\nfor th in [0.15, 0.2, 0.25, 0.3]:\n    scores = cross_val_score(v8, train[feats], train["no_show"], groups=train["week"], cv=LeaveOneGroupOut(), scoring=score_at(th))\n    print(th, -scores.sum())\n',
      challenge: 'Is the winner clear, or close?',
    },
  ],
  apply: {
    scenario: 'Tuning without cheating.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Cross-validate v0.8 by week at a threshold of 0.25 and print the total minutes lost',
        starter: BASE,
        solution: BASE + CV('0.25') + 'print(-scores.sum())\n',
        hint: 'scoring=score_at(0.25), then -scores.sum()',
        checks: [{ message: 'Print 6405', outputEquals: '6405' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why must the scaler be inside the pipeline during cross-validation?',
        options: [
          { text: 'It runs faster', why: 'It\'s about leaks.' },
          { text: 'So each fold fits its own scaler, without seeing the held-out week' },
          { text: 'scikit-learn refuses otherwise', why: 'It would run, quietly leaking.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Now at 0.15: print the total minutes lost',
        starter: BASE,
        solution: BASE + CV('0.15') + 'print(-scores.sum())\n',
        hint: 'score_at(0.15)',
        checks: [{ message: 'Print 6760', outputEquals: '6760' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest tuning, or cheating?',
        groups: ['Honest', 'Cheating'],
        items: [
          { text: 'Scaler inside the pipeline', group: 0 },
          { text: 'Threshold chosen by cross-validation', group: 0 },
          { text: 'Scaler fitted once on all weeks first', group: 1 },
          { text: 'Week 12 added as a twelfth fold', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'Why not add week 12 as a twelfth fold? More evidence!',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Then nothing is left for the final test. Week 12 is our one look at how the chosen model does on truly untouched data.' },
          { text: 'Good idea.', why: 'You\'d lose the test.' },
          { text: 'Folds must be 11.', why: 'It\'s about keeping the test untouched.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the threshold to its 11-week minutes.',
        pairs: [
          ['0.15', '6,760'],
          ['0.2', '6,355'],
          ['0.25', '6,405'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Rule two.',
        template: 'Every step that [[1]] goes inside the [[2]].',
        blanks: [['learns'], ['pipeline']],
        distractors: ['prints', 'test'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line leaks into cross-validation?',
        language: 'python',
        lines: ['X = StandardScaler().fit_transform(train[feats])', 'model = LogisticRegression()', 'scores = cross_val_score(model, X, train["no_show"], groups=train["week"], cv=LeaveOneGroupOut())'],
        bug: 0,
        fix: 'Put StandardScaler inside make_pipeline and pass train[feats].',
        explanation: 'Scaling all 11 weeks first lets each held-out week shape the scaler.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which threshold wins over 11 weeks?',
        answers: ['0.2', '.2'],
        placeholder: 'A threshold',
      },
      {
        kind: 'mcq',
        prompt: 'The Chapter 7 threshold, chosen on two weeks, still wins on 11. What does that tell you?',
        options: [
          { text: 'Cross-validation was a waste', why: 'It confirmed the choice; that\'s valuable.' },
          { text: 'That choice was sound, and now it rests on much more evidence' },
          { text: 'Thresholds never change', why: 'They can; this one held.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Which of Miracle\'s three rules would be easiest to break by accident?',
    starters: ['Probably...'],
  },
  deepen: {
    title: 'Nested cross-validation',
    summary: 'To report how well the whole tuning process works, not just the chosen model, people nest one cross-validation inside another. It\'s slower; a locked test week does a similar job more simply.',
  },
  notes: 'v0.8 leave-one-week-out totals by threshold: 0.15 6760, 0.2 6355, 0.25 6405.',
};

export default lesson;
