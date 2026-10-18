import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 17 — Common nearest-neighbour bugs: the label as a feature, the wrong ruler, testing on training data. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Common neighbour bugs',
  summary: 'Chidi\'s version of the predictor finds 20 out of 20 no-shows. Miracle doesn\'t even look at the score. She looks at his list of features, and finds no_show in it.',
  minutes: 12,
  outcomes: [
    'Spot the label sneaking in as a feature',
    'Spot a test scaled with the wrong ruler',
    'Spot testing on training data, and an even k',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Chidi\'s predictor, and the fixes',
      before: {
        label: 'Chidi\'s version',
        text: 'feats = ["wait_days", "distance_km", "no_show"]\ntrain = df\ntest = df[df["week"] == 12]\nlo = test[feats].min()\nk = 10',
      },
      after: {
        label: 'Fixed',
        text: 'feats = ["wait_days", "distance_km", "previous_no_shows", "sms_reminder"]\ntrain = df[df["week"] <= 11]\ntest = df[df["week"] == 12]\nlo = train[feats].min()\nk = 15',
      },
      notes: [
        'Bug 1: the label (no_show) is a feature. Neighbours are found partly by the answer itself, so the "prediction" just reads it back. A perfect score is the giveaway.',
        'Bug 2: train is the whole table, so week 12 is in the training data and the test patients find themselves.',
        'Bug 3: the test is scaled with its own min and max. Use the training ruler.',
        'Bug 4: k = 10 is even, so votes can tie at 5 to 5. Prefer an odd k.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A perfect score isn\'t good news. It\'s a sign that the answer leaked in somewhere. Look for the leak before you celebrate.',
    },
  ],
  apply: {
    scenario: 'Bug hunt.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Remove the label from the feature list, then print how many features are left',
        starter: 'feats = ["wait_days", "distance_km", "previous_no_shows", "sms_reminder", "no_show"]\n',
        solution: 'feats = ["wait_days", "distance_km", "previous_no_shows", "sms_reminder", "no_show"]\nfeats.remove("no_show")\nprint(len(feats))\n',
        hint: 'feats.remove("no_show")',
        checks: [
          { message: 'Print 4', outputEquals: '4' },
          { message: 'No label in the features', expr: '"no_show" not in feats' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Chidi\'s predictor found 20 out of 20. What\'s the most likely explanation?',
        options: [
          { text: 'The answer leaked in: the label is one of the features' },
          { text: 'It\'s a brilliant predictor', why: 'Real no-show prediction is never perfect. Look for a leak.' },
          { text: 'Week 12 was easy', why: '37 no-shows among 200: it wasn\'t easy.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'A bug, or fine?',
        groups: ['Bug', 'Fine'],
        items: [
          { text: 'no_show in the feature list', group: 0 },
          { text: 'Training on weeks 1–11 only', group: 1 },
          { text: 'Scaling the test with its own min and max', group: 0 },
          { text: 'k = 15', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line lets the test patients find themselves?',
        language: 'python',
        lines: ['train = df', 'test = df[df["week"] == 12]', 'lo = train[feats].min()', 'hi = train[feats].max()'],
        bug: 0,
        fix: 'train = df[df["week"] <= 11]',
        explanation: 'If train is the whole table, it includes week 12.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the bug to its giveaway.',
        pairs: [
          ['Label in the features', 'A perfect score'],
          ['Testing on training data', 'Nearest distance is 0'],
          ['Even k', 'Tied votes'],
          ['Test scaled with its own ruler', 'Scaled test values hit exactly 0 and 1'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'OK, but more features is still better, so the label helps.',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'The label is the one thing we can\'t know before the appointment. Using it is like predicting a match after reading the result.' },
          { text: 'Yes, keep it in.', why: 'Then the model reads the answer instead of predicting it.' },
          { text: 'Features don\'t matter.', why: 'They matter a lot. This one is cheating.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'A fair setup.',
        language: 'python',
        template: 'train = df[df["week"] [[1]] 11]\nlo = [[2]][feats].min()',
        blanks: [['<='], ['train']],
        distractors: ['==', 'test'],
      },
      {
        kind: 'mcq',
        prompt: 'confirmed_on_day is filled in AFTER the appointment. Should it be a feature?',
        options: [
          { text: 'No: like the label, it isn\'t known in advance. Chapter 4 shows what it does to a model' },
          { text: 'Yes: it\'s very predictive', why: 'It\'s predictive because it\'s filled in after the fact. That\'s a leak.' },
          { text: 'Only on rainy days', why: 'It\'s never known before the day.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'With k = 10, votes can tie. Set k to the next odd number up, and print k',
        starter: 'k = 10\n',
        solution: 'k = 11\nprint(k)\n',
        hint: 'k = 11',
        checks: [
          { message: 'Print 11', outputEquals: '11' },
          { message: 'k is odd', expr: 'k % 2 == 1' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A perfect score usually means the answer... into the features. (one word)',
        answers: ['leaked', 'leaks', 'leak'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Miracle didn\'t celebrate a perfect score; she got suspicious. When has something "too good to be true" turned out to be exactly that for you?',
    starters: ['Once, ... looked too good', 'It turned out...'],
  },
  deepen: {
    title: 'Leakage',
    summary: 'When information about the answer sneaks into the features, it\'s called leakage. It\'s the most common way ML projects fool themselves, and the whole of Chapter 4.',
  },
  notes: 'Common k-NN mistakes: target leakage (label as feature), train/test contamination, scaling with test statistics, even k with two classes. confirmed_on_day is the planted post-appointment leak in appointments.csv (matches the label 97.4%).',
};

export default lesson;
