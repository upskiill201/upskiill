import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { CV_BASE, V8 } from './code';

const BASE = CV_BASE + V8;
const LOWO = 'scores = cross_val_score(v8, train[feats], train["no_show"], groups=train["week"], cv=weeks, scoring=minutes_score)\n';

/** Chapter 9 · Lesson 7 — cross_val_score. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'cross_val_score',
  summary: 'The loop from lesson 6 is one line in scikit-learn: cross_val_score. Six steps from the default five folds to leave-one-week-out with the clinic\'s own measure.',
  minutes: 12,
  outcomes: [
    'Run cross_val_score with default folds',
    'Fold by week with LeaveOneGroupOut',
    'Score folds with your own measure',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From one line to the clinic\'s measure',
      steps: [
        { title: '1. The simplest call', body: 'Five folds, accuracy, one line. You get five scores back.', code: 'cross_val_score(v8, train[feats], train["no_show"], cv=5)', language: 'python' },
        { title: '2. Read the five', body: 'v0.8: 0.825, 0.827, 0.832, 0.832, 0.827. Steady, but accuracy is the wrong measure (Chapter 7).' },
        { title: '3. Fold by week', body: 'LeaveOneGroupOut holds out one group at a time. Pass the week as the group.', code: 'cv=LeaveOneGroupOut(), groups=train["week"]', language: 'python' },
        { title: '4. Use our measure', body: 'scoring can be any function of (model, X, y). scikit-learn treats higher as better, so ours returns minus the minutes lost.', code: 'def minutes_score(model, X, y):\n    flags = (model.predict_proba(X)[:, 1] >= 0.2).astype(int)\n    return -minutes(flags, y.values)', language: 'python' },
        { title: '5. Put it together', body: 'Eleven folds, eleven scores, the same numbers as the hand loop: 6,355 minutes in total.' },
        { title: '6. Compare models the same way', body: 'v0.7 loses 6,540; v0.8 6,355; doing nothing 8,040. Across 11 weeks, v0.8 really is better: by about 17 minutes a week.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'v0.7 vs v0.8, eleven weeks',
      caption: 'The same folds, the same measure.',
      code: BASE + '\nv7_feats = ["wait_days", "distance_km", "previous_no_shows", "sms_reminder"]\nv7 = make_pipeline(StandardScaler(), LogisticRegression())\ns7 = cross_val_score(v7, train[v7_feats], train["no_show"], groups=train["week"], cv=weeks, scoring=minutes_score)\n' + LOWO + 'print("v0.7:", -s7.sum())\nprint("v0.8:", -scores.sum())\nprint("v0.8 better in", (scores > s7).sum(), "weeks, worse in", (scores < s7).sum())\n',
      challenge: 'Print -scores to see each week. Which week was hardest?',
    },
  ],
  apply: {
    scenario: 'cross_val_score.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Run cross_val_score with cv=5 (accuracy) on v0.8 and print the scores rounded to 3, as a list',
        starter: BASE,
        solution: BASE + 'scores = cross_val_score(v8, train[feats], train["no_show"], cv=5)\nprint(scores.round(3).tolist())\n',
        hint: 'cross_val_score(v8, train[feats], train["no_show"], cv=5)',
        checks: [{ message: 'Print the five accuracies', outputEquals: '[0.825, 0.827, 0.832, 0.832, 0.827]' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why does minutes_score return minus the minutes?',
        options: [
          { text: 'Minutes can\'t be positive', why: 'It\'s about "higher is better".' },
          { text: 'To hide the number', why: 'Just flip the sign back.' },
          { text: 'scikit-learn assumes higher scores are better, and fewer minutes is better' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Run leave-one-week-out with minutes_score and print the total minutes lost',
        starter: BASE,
        solution: BASE + LOWO + 'print(-scores.sum())\n',
        hint: 'groups=train["week"], cv=weeks, scoring=minutes_score; then -scores.sum()',
        checks: [{ message: 'Print 6355', outputEquals: '6355' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which argument does what?',
        groups: ['Decides the folds', 'Decides the measure'],
        items: [
          { text: 'cv=LeaveOneGroupOut()', group: 0 },
          { text: 'groups=train["week"]', group: 0 },
          { text: 'scoring=minutes_score', group: 1 },
          { text: 'scoring="f1"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'So is v0.8 better than v0.7 or not?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Across all 11 learning weeks, yes: 185 minutes fewer lost, about 17 a week. Better in 6 weeks, worse in 4. Modest, but now it\'s evidence, not one week\'s luck.' },
          { text: 'No: they tied on week 12.', why: 'One week was too small to tell.' },
          { text: 'Yes, massively.', why: 'It\'s modest.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the model to its 11-week minutes lost.',
        pairs: [
          ['Doing nothing', '8,040'],
          ['v0.7', '6,540'],
          ['v0.8', '6,355'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Folding by week.',
        language: 'python',
        template: 'cross_val_score(v8, X, y, groups=train["[[1]]"], cv=[[2]]())',
        blanks: [['week'], ['LeaveOneGroupOut']],
        distractors: ['clinic', 'GridSearchCV'],
      },
      {
        kind: 'findBug',
        prompt: 'Which call ignores the weeks?',
        language: 'python',
        lines: ['cross_val_score(v8, X, y, groups=train["week"], cv=LeaveOneGroupOut())', 'cross_val_score(v8, X, y, cv=LeaveOneGroupOut())', 'cross_val_score(v8, X, y, cv=5)'],
        bug: 1,
        fix: 'cross_val_score(v8, X, y, groups=train["week"], cv=LeaveOneGroupOut())',
        explanation: 'LeaveOneGroupOut needs the groups; without them it can\'t make folds.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In how many of the 11 weeks did v0.8 beat v0.7?',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why use leave-one-week-out rather than cv=5 here?',
        options: [
          { text: 'It\'s faster', why: 'It\'s 11 fits, not 5.' },
          { text: 'cv=5 is wrong', why: 'It\'s fine; by-week just matches the clinic better.' },
          { text: 'It matches how the model is used: trained on past weeks, judged on a whole new week' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'v0.8 was better in 6 weeks and worse in 4. How would you explain "better on average" to someone who only saw a bad week?',
    starters: ['I\'d say...'],
  },
  deepen: {
    title: 'Other fold types',
    summary: 'KFold splits rows into k chunks. StratifiedKFold keeps the no-show rate the same in every fold. TimeSeriesSplit only ever validates on later weeks. Choose the one that matches how the model will be used.',
  },
  notes: 'cross_val_score(v8, cv=5) accuracy: [0.825, 0.827, 0.832, 0.832, 0.827]. Leave-one-week-out minutes (weeks 1-11): v0.7 6540, v0.8 6355 (v0.8 better 6 weeks, worse 4, tie 1), nothing 8040.',
};

export default lesson;
