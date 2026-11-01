import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { LOAD } from './code';

/** Chapter 4 · Lesson 9 — Splitting by time vs at random. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Splitting by time',
  summary: 'A random split puts bookings from all 12 weeks in the test set. That means the predictor learns from week 12 to "predict" week 3. Bisi will never have next week\'s data. Here\'s why time matters.',
  minutes: 12,
  outcomes: [
    'Compare a random split with a split by time',
    'Explain why the future must not teach the past',
    'Choose the split that matches how the model is used',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two ways to make a test set',
      before: {
        label: 'Random split',
        text: 'Shuffle all 2,400 bookings, keep 10% for testing\nTest set: bookings from every week, 1 to 12\nThe predictor learns from week 12 to judge week 3\nFine when time doesn\'t matter\nEasy, and the most common in tutorials',
      },
      after: {
        label: 'Split by time',
        text: 'Learn from weeks 1 to 11, test on week 12\nTest set: only the newest week\nThe predictor never sees the future\nMatches real life: Bisi only has the past\nThe honest choice when the world changes over time',
      },
      notes: [
        'A model is used on the future, so the fairest test is a later period it has never seen.',
        'Random splits can hide problems: if clinics change over time, a random test set mixes old and new and looks better than reality.',
        'In this data the two splits score similarly. In real clinic data, which changes month to month, the gap can be large.',
        'Rule of thumb: if your data has dates, split by time.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Which weeks are in the test set?',
      caption: 'Random split vs split by time.',
      code: LOAD + '\ntrain = df.sample(frac=0.9, random_state=42)\ntest = df.drop(train.index)\nprint("Random:", sorted(test["week"].unique().tolist()))\n\ntest = df[df["week"] == 12]\nprint("By time:", sorted(test["week"].unique().tolist()))\n',
      challenge: 'In the random split, can a booking from week 12 help predict a booking in week 3?',
    },
  ],
  apply: {
    scenario: 'Random or by time?',
    items: [
      {
        kind: 'writeCode',
        prompt: 'For the random split (frac=0.9, random_state=42), print the sorted list of weeks in the test set',
        starter: LOAD + 'train = df.sample(frac=0.9, random_state=42)\ntest = df.drop(train.index)\n',
        solution: LOAD + 'train = df.sample(frac=0.9, random_state=42)\ntest = df.drop(train.index)\nprint(sorted(test["week"].unique().tolist()))\n',
        hint: 'sorted(test["week"].unique().tolist())',
        checks: [{ message: 'Print all 12 weeks', outputEquals: '[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why is a split by time more honest for Bisi\'s call list?',
        options: [
          { text: 'It has more rows', why: 'It has the same number of rows overall.' },
          { text: 'Random splits are illegal', why: 'They\'re fine when time doesn\'t matter.' },
          { text: 'She only ever has past bookings, so the test should only use the past to predict the future' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Random split or split by time?',
        groups: ['Random split', 'By time'],
        items: [
          { text: 'Test set has every week', group: 0 },
          { text: 'Learn from weeks 1 to 11', group: 1 },
          { text: 'The future can teach the past', group: 0 },
          { text: 'Matches how the model is used', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Split by time (weeks 1 to 11 vs week 12) and print the latest week in the training set',
        starter: LOAD,
        solution: LOAD + 'train = df[df["week"] <= 11]\ntest = df[df["week"] == 12]\nprint(train["week"].max())\n',
        hint: 'train["week"].max()',
        checks: [{ message: 'Print 11', outputEquals: '11' }],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Random splits are what every tutorial uses. Why are we different?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Tutorial data often has no time order. Ours does, and the model will always predict next week from past weeks. The test should do the same.' },
          { text: 'Tutorials are always wrong.', why: 'They\'re fine for their data. Ours has dates.' },
          { text: 'Because random splits give lower scores.', why: 'Here they score similarly. It\'s about honesty, not the number.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the situation to the better split.',
        pairs: [
          ['Bookings with dates', 'Learn weeks 1-11, test week 12'],
          ['A one-off survey, no dates', 'Shuffle and cut at random'],
          ['Predicting next month\'s sales', 'Learn past months, test the latest'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule of thumb.',
        template: 'If your data has [[1]], split by [[2]].',
        blanks: [['dates'], ['time']],
        distractors: ['numbers', 'size'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line lets the future teach the past?',
        language: 'python',
        lines: ['train = df[df["week"] >= 2]', 'test = df[df["week"] == 1]', 'risks = knn_risk(train, test, feats)'],
        bug: 0,
        fix: 'Learn from earlier weeks and test on a later one',
        explanation: 'It learns from weeks 2 to 12 to predict week 1, which is backwards in time.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In the random split, how many different weeks appear in the test set?',
        answers: ['12', 'twelve'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Clinics change over time: new nurses, new reminder systems. Which split shows that honestly?',
        options: [
          { text: 'Random: it mixes old and new', why: 'Mixing hides the change.' },
          { text: 'Neither can', why: 'A time split shows exactly this.' },
          { text: 'By time: the test week is newer than everything learned' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Think of something that changes over time, like prices or the weather. Why would predicting March from April be cheating?',
    starters: ['If I predict March from April...', 'The fair way is...'],
  },
  deepen: {
    title: 'Time series splits',
    summary: 'For data with a time order, a common pattern is "rolling" tests: learn from weeks 1 to 8, test on 9; learn from 1 to 9, test on 10; and so on. Each test is always in the future of its training data.',
  },
  notes: 'Random split frac=0.9 random_state=42: test weeks 1-12. Time split: train max week 11, test week 12. On this synthetic data both splits give similar v0.3 scores (random top 20: 9; time top 20: 12; accuracy 0.821 vs 0.825), which the compare card states honestly.',
};

export default lesson;
