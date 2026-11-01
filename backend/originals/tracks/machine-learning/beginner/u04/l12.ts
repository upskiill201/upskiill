import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { FEATS, KNN, LOAD } from './code';

const VAL_SPLIT = 'train = df[df["week"] <= 9]\nval = df[df["week"].isin([10, 11])]\ntest = df[df["week"] == 12]\n';

/** Chapter 4 · Lesson 12 — A validation set: choose settings without peeking. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'A validation set',
  summary: 'Lesson 4 left a puzzle: how do you choose k without peeking at week 12? Use three piles instead of two. Weeks 1 to 9 to learn, weeks 10 and 11 to choose, week 12 to test once.',
  minutes: 13,
  outcomes: [
    'Split data into training, validation and test sets',
    'Choose a setting on the validation set',
    'Test the chosen setting once on the test set',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Three piles',
      steps: [
        { title: '1. Training: weeks 1 to 9', body: '1,800 bookings the predictor learns from.' },
        { title: '2. Validation: weeks 10 and 11', body: '400 bookings, 86 no-shows. Used to compare settings. You may look at these scores as often as you like.' },
        { title: '3. Test: week 12', body: '200 bookings, still locked away.', code: 'train = df[df["week"] <= 9]\nval = df[df["week"].isin([10, 11])]\ntest = df[df["week"] == 12]', language: 'python' },
        { title: '4. Choose k on validation', body: 'Score each k by how many of its top 40 validation bookings missed: k = 1: 12, k = 5: 23, k = 15: 24, k = 31: 24, k = 51: 23.' },
        { title: '5. Pick', body: '15 and 31 tie. Keep 15, the value we already had: no reason to change.' },
        { title: '6. Test once', body: 'Learn from weeks 1 to 11 with k = 15, then open week 12 a single time: 12 of the top 20 missed. Because k was chosen without week 12, that number is honest.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Choosing k on validation',
      caption: 'Weeks 10 and 11 decide. Week 12 stays locked.',
      code: LOAD + FEATS + KNN + VAL_SPLIT + '\nfor k in [1, 5, 15, 31, 51]:\n    v = val.assign(risk=knn_risk(train, val, feats, k))\n    print(k, v.nlargest(40, "risk")["no_show"].sum())\n',
      challenge: 'Which k would you choose, and why?',
    },
  ],
  apply: {
    scenario: 'Three piles.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Make the three piles and print the lengths of train, val and test',
        starter: LOAD,
        solution: LOAD + VAL_SPLIT + 'print(len(train))\nprint(len(val))\nprint(len(test))\n',
        hint: 'df["week"] <= 9, df["week"].isin([10, 11]), df["week"] == 12',
        checks: [{ message: 'Print 1800, 400, 200', outputEquals: '1800\n400\n200' }],
      },
      {
        kind: 'mcq',
        prompt: 'What is the validation set for?',
        options: [
          { text: 'Learning from', why: 'That\'s the training set.' },
          { text: 'The final score', why: 'That\'s the test set, used once.' },
          { text: 'Comparing settings, like k, without touching the test set' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Score k = 15 on the validation weeks: print how many of its top 40 missed',
        starter: LOAD + FEATS + KNN + VAL_SPLIT,
        solution: LOAD + FEATS + KNN + VAL_SPLIT + 'v = val.assign(risk=knn_risk(train, val, feats, 15))\nprint(v.nlargest(40, "risk")["no_show"].sum())\n',
        hint: 'v = val.assign(risk=knn_risk(train, val, feats, 15))',
        checks: [{ message: 'Print 24', outputEquals: '24' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the pile to its job.',
        pairs: [
          ['Weeks 1 to 9', 'Learn'],
          ['Weeks 10 and 11', 'Choose settings'],
          ['Week 12', 'Test once'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Allowed to look at it while choosing k?',
        groups: ['Yes', 'No'],
        items: [
          { text: 'Validation scores', group: 0 },
          { text: 'Test scores', group: 1 },
          { text: 'Training bookings', group: 0 },
          { text: 'Week-12 bookings', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Validation picked k = 15. Same as my peek. So my way was fine!',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Yes, peeking is fine.', why: 'The agreement was luck. Often they don\'t agree.' },
          { text: 'This time they agree. You couldn\'t have known that without doing it properly. Now "12 of 20" is honest; before, it was hopeful.' },
          { text: 'Then use k = 31 to be different.', why: 'Change only with a reason.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Three piles.',
        template: 'Learn on [[1]], choose on [[2]], test [[3]].',
        blanks: [['training'], ['validation'], ['once']],
        distractors: ['test', 'twice'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line chooses k on the wrong pile?',
        language: 'python',
        lines: ['for k in [1, 5, 15, 31, 51]:', '    t = test.assign(risk=knn_risk(train, test, feats, k))', '    print(k, t.nlargest(20, "risk")["no_show"].sum())'],
        bug: 1,
        fix: '    v = val.assign(risk=knn_risk(train, val, feats, k))',
        explanation: 'Choosing k should use the validation pile, not the test week.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'On validation, k = 15 and k = 31 both catch 24 of their top 40. How many no-shows are in the validation weeks altogether?',
        answers: ['86'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'After choosing k = 15, what do you learn from for the final test?',
        options: [
          { text: 'Weeks 1 to 11: training and validation together' },
          { text: 'Weeks 1 to 9 only', why: 'Once k is chosen, use all the past you have.' },
          { text: 'All 12 weeks', why: 'Week 12 is the test. It stays out.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a "practice exam" before a real one. How is it like a validation set?',
    starters: ['The practice exam is like...', 'The real exam is like...'],
  },
  deepen: {
    title: 'Cross-validation',
    summary: 'With little data, one validation pile can be unlucky. Chapter 9 shows cross-validation: take turns using different parts as validation, and average.',
  },
  notes: 'Train weeks 1-9 (1,800), val weeks 10-11 (400, 86 no-shows), test week 12 (200). k = 15, top 40 on validation: k1 12, k5 23, k15 24, k31 24, k51 23. Final: train weeks 1-11, k = 15, week 12 top 20: 12.',
};

export default lesson;
