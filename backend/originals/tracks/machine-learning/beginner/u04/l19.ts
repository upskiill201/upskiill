import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { FEATS, KNN, LOAD } from './code';

/** Chapter 4 · Lesson 19 — Predictor v0.4: the same model, an honest process. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Predictor v0.4',
  summary: 'v0.4 doesn\'t predict any better than v0.3. What changed is that every number it reports can now be trusted. One program: clean, drop the leak, three piles, choose k, test once.',
  minutes: 14,
  outcomes: [
    'Assemble an honest testing process in one program',
    'Choose k on validation and test once',
    'Explain what changed between v0.3 and v0.4',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'v0.4, start to finish',
      steps: [
        { title: '1. Clean', body: 'Start from the raw export, remove duplicates, and keep only columns known the evening before.', code: 'df = raw.drop_duplicates()\ndf = df.drop(columns=["confirmed_on_day"])', language: 'python' },
        { title: '2. Three piles', body: 'Learn on weeks 1 to 9, choose on 10 and 11, test on 12.', code: 'train = df[df["week"] <= 9]\nval = df[df["week"].isin([10, 11])]\ntest = df[df["week"] == 12]', language: 'python' },
        { title: '3. Choose k on validation', body: 'Top 40 of 400 validation bookings: k = 15 and 31 tie at 24. Keep 15.' },
        { title: '4. Learn from all the past', body: 'Once k is chosen, learn from weeks 1 to 11.', code: 'past = df[df["week"] <= 11]', language: 'python' },
        { title: '5. Test once', body: 'Top 20 of week 12: 12 of the 37 no-shows. Accuracy 82.5% vs 81.5% for guessing.' },
        { title: '6. Report', body: '"On a week it had never seen, the 20 riskiest bookings included 12 of the 37 no-shows: about three times random calls. Other weeks: between 6 and 13."' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Predictor v0.4',
      caption: 'The honest process, start to finish.',
      code: 'import pandas as pd\n\nraw = pd.read_csv("appointments.csv")\ndf = raw.drop_duplicates().drop(columns=["confirmed_on_day"])\n' + FEATS + KNN + '\ntrain = df[df["week"] <= 9]\nval = df[df["week"].isin([10, 11])]\nfor k in [5, 15, 31]:\n    v = val.assign(risk=knn_risk(train, val, feats, k))\n    print("k", k, "validation:", v.nlargest(40, "risk")["no_show"].sum(), "of 40")\n\npast = df[df["week"] <= 11]\ntest = df[df["week"] == 12]\nt = test.assign(risk=knn_risk(past, test, feats, 15))\nprint("Test, once:", t.nlargest(20, "risk")["no_show"].sum(), "of 20")\n',
      challenge: 'Which line would you change first if next month\'s export has a new column?',
    },
  ],
  apply: {
    scenario: 'Predictor v0.4.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order v0.4.',
        lines: ['Remove duplicates', 'Drop the leaky column', 'Make three piles', 'Choose k on validation', 'Learn from weeks 1 to 11', 'Test on week 12 once'],
      },
      {
        kind: 'writeCode',
        prompt: 'Choose k: print the top-40 validation score for k = 15',
        starter: LOAD + 'df = df.drop(columns=["confirmed_on_day"])\n' + FEATS + KNN + 'train = df[df["week"] <= 9]\nval = df[df["week"].isin([10, 11])]\n',
        solution: LOAD + 'df = df.drop(columns=["confirmed_on_day"])\n' + FEATS + KNN + 'train = df[df["week"] <= 9]\nval = df[df["week"].isin([10, 11])]\nv = val.assign(risk=knn_risk(train, val, feats, 15))\nprint(v.nlargest(40, "risk")["no_show"].sum())\n',
        hint: 'Score val with k = 15 and take its top 40',
        checks: [{ message: 'Print 24', outputEquals: '24' }],
      },
      {
        kind: 'mcq',
        prompt: 'What changed between v0.3 and v0.4?',
        options: [
          { text: 'A much better score', why: 'The week-12 score is the same: 12 of 20.' },
          { text: 'Not the predictions: the process, so every reported number is honest' },
          { text: 'A new algorithm', why: 'It\'s still k nearest neighbours.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Test once: learn from weeks 1 to 11 with k = 15 and print how many of the top 20 week-12 bookings missed',
        starter: LOAD + 'df = df.drop(columns=["confirmed_on_day"])\n' + FEATS + KNN + 'past = df[df["week"] <= 11]\ntest = df[df["week"] == 12]\n',
        solution: LOAD + 'df = df.drop(columns=["confirmed_on_day"])\n' + FEATS + KNN + 'past = df[df["week"] <= 11]\ntest = df[df["week"] == 12]\nt = test.assign(risk=knn_risk(past, test, feats, 15))\nprint(t.nlargest(20, "risk")["no_show"].sum())\n',
        hint: 'knn_risk(past, test, feats, 15)',
        checks: [{ message: 'Print 12', outputEquals: '12' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the v0.4 setting to its value.',
        pairs: [
          ['Learn (choosing k)', 'Weeks 1 to 9'],
          ['Choose k', 'Weeks 10 and 11'],
          ['Final learning', 'Weeks 1 to 11'],
          ['Test', 'Week 12, once'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'New in v0.4, or already in v0.3?',
        groups: ['New in v0.4', 'Already in v0.3'],
        items: [
          { text: 'A validation set', group: 0 },
          { text: 'Scaling with the training ruler', group: 1 },
          { text: 'The leak check on every export', group: 0 },
          { text: '15 nearest neighbours', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'Same score as last week. Why does it deserve a new version number?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'It doesn\'t.', why: 'The process changed. That\'s what the version records.' },
          { text: 'Because the code is longer.', why: 'Length isn\'t progress. Trust is.' },
          { text: 'Because last week\'s 12 was hopeful and this week\'s 12 is proven. Same number, different trust.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The process.',
        language: 'python',
        template: 'df = raw.[[1]]()\ndf = df.drop(columns=["[[2]]"])',
        blanks: [['drop_duplicates'], ['confirmed_on_day']],
        distractors: ['dropna', 'no_show'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line breaks the "test once" rule?',
        language: 'python',
        lines: ['past = df[df["week"] <= 11]', 'for k in [5, 15, 31]: print(k, top20(past, test, k))', 'print(top20(past, test, 15))'],
        bug: 1,
        fix: 'Choose k on val, then run the last line once',
        explanation: 'Looping over k on the test week is peeking again.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'v0.4\'s top 20 on week 12 caught how many no-shows?',
        answers: ['12', 'twelve'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'v0.4 has the same score as v0.3 but a better process. Where in life is "how you got the number" as important as the number?',
    starters: ['For example...', 'It matters because...'],
  },
  deepen: {
    title: 'Next: a library',
    summary: 'Writing k-NN by hand taught how prediction works. From Chapter 5, scikit-learn does the heavy lifting in a few lines, so the effort goes into the questions instead.',
  },
  notes: 'v0.4: appointments.csv (no duplicates), confirmed_on_day dropped, train weeks 1-9 / val 10-11 / test 12. Validation top 40: k5 23, k15 24, k31 24. Final: weeks 1-11, k = 15, week 12 top 20 = 12. The tryIt reads appointments.csv (clean), so drop_duplicates removes 0 rows there.',
};

export default lesson;
