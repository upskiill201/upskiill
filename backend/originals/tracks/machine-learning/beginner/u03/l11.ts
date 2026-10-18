import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 11 — Scaling, the simple way: squash every feature into 0 to 1. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Scaling, the simple way',
  summary: 'On the full table there are four features: wait (0 to 45 days), distance (1 to 60 km), past no-shows (0 to 4) and reminder (0 or 1). Instead of guessing weights, Halima gives them all the same range.',
  minutes: 12,
  outcomes: [
    'Scale a feature to 0–1 with min and max',
    'Scale a whole table of features with pandas',
    'Use the training data\'s min and max for new patients too',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Min-max scaling',
      html: '<p>The idea: for each feature, the smallest value becomes 0, the largest becomes 1, and everything else lands in between.</p><p><code>scaled = (value - min) / (max - min)</code></p><p>For wait_days, min is 0 and max is 45. A 14-day wait becomes <code>(14 - 0) / (45 - 0) = 0.311</code>. For distance_km, min 1 and max 60: 10 km becomes <code>(10 - 1) / (60 - 1) = 0.153</code>.</p><p>After scaling, a full-range gap in any feature is worth 1. Now past no-shows (0 to 4) and reminders (0 or 1) count as much as waits and distances. No feature drowns the others just because of its units.</p><p>In pandas, one line scales every feature at once:</p><pre><code>lo = train[feats].min()\nhi = train[feats].max()\ntrain_s = (train[feats] - lo) / (hi - lo)</code></pre><p><strong>The rule that matters:</strong> new patients are scaled with the <strong>training data\'s</strong> min and max, not their own. The predictor has to measure everyone with the same ruler.</p><p><strong>Honest note:</strong> scaling makes the features fair to each other. Whether it improves the predictions is something you test, not assume.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Scale the features',
      caption: 'Every scaled column runs from 0 to 1.',
      code: 'import pandas as pd\n\ndf = pd.read_csv("appointments.csv")\nfeats = ["wait_days", "distance_km", "previous_no_shows", "sms_reminder"]\nlo = df[feats].min()\nhi = df[feats].max()\nscaled = (df[feats] - lo) / (hi - lo)\nprint(scaled.min())\nprint(scaled.max())\nprint(scaled.head(3).round(3))\n',
      challenge: 'What does a 30-day wait become after scaling?',
    },
  ],
  apply: {
    scenario: 'One ruler for every feature.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Scale a 14-day wait with min 0 and max 45, and print it rounded to 3 places',
        starter: 'value = 14\nlo = 0\nhi = 45\n',
        solution: 'value = 14\nlo = 0\nhi = 45\nprint(round((value - lo) / (hi - lo), 3))\n',
        hint: '(value - lo) / (hi - lo)',
        checks: [{ message: 'Print 0.311', outputEquals: '0.311' }],
      },
      {
        kind: 'mcq',
        prompt: 'After min-max scaling, what does the largest value in a column become?',
        options: [
          { text: '1' },
          { text: '0', why: 'The smallest becomes 0.' },
          { text: 'It stays the same', why: 'Every value is squashed into 0 to 1.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Scale the distance_km column of appointments.csv and print its largest and smallest scaled values',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\nlo = df["distance_km"].min()\nhi = df["distance_km"].max()\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\nlo = df["distance_km"].min()\nhi = df["distance_km"].max()\nscaled = (df["distance_km"] - lo) / (hi - lo)\nprint(scaled.max())\nprint(scaled.min())\n',
        hint: 'scaled = (df["distance_km"] - lo) / (hi - lo)',
        checks: [{ message: 'Print 1.0 then 0.0', outputEquals: '1.0\n0.0' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the raw value to its scaled value.',
        pairs: [
          ['wait 0 (min 0, max 45)', '0.0'],
          ['wait 45 (min 0, max 45)', '1.0'],
          ['2 past no-shows (min 0, max 4)', '0.5'],
          ['reminder 1 (min 0, max 1)', '1.0, same as before'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A new patient arrives. Whose min and max should scale them?',
        options: [
          { text: 'The training data\'s' },
          { text: 'Their own', why: 'One patient has no range. Everyone must use the same ruler.' },
          { text: 'The test data\'s', why: 'The ruler comes from the training data, fixed in advance.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'This scales the test patients with a different ruler. Which line?',
        language: 'python',
        lines: [
          'lo = train[feats].min()',
          'hi = train[feats].max()',
          'train_s = (train[feats] - lo) / (hi - lo)',
          'test_s = (test[feats] - test[feats].min()) / (test[feats].max() - test[feats].min())',
        ],
        bug: 3,
        fix: 'test_s = (test[feats] - lo) / (hi - lo)',
        explanation: 'Use the training lo and hi for the test patients too.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Min-max scaling.',
        language: 'python',
        template: 'scaled = (value - [[1]]) / ([[2]] - lo)',
        blanks: [['lo'], ['hi']],
        distractors: ['mean', 'value'],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Scaling is always better, right?',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'It makes the features fair to each other. Whether that improves the predictions, you test. Sometimes one feature SHOULD count more.' },
          { text: 'Always, without exception.', why: 'It\'s a sensible default, not a guarantee.' },
          { text: 'Never scale.', why: 'Without it, small-range features like past no-shows get drowned.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Without scaling, does this feature get drowned out?',
        groups: ['Gets drowned', 'Dominates'],
        items: [
          { text: 'previous_no_shows (0 to 4)', group: 0 },
          { text: 'distance_km (1 to 60)', group: 1 },
          { text: 'sms_reminder (0 or 1)', group: 0 },
          { text: 'wait_days (0 to 45)', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: '2 past no-shows, with min 0 and max 4. What is it after scaling?',
        answers: ['0.5', '.5'],
        placeholder: 'A decimal',
      },
    ],
  },
  reflect: {
    prompt: 'Scaling puts every feature on the same ruler. When have you compared things measured in different units (price vs time vs distance)? How did you decide?',
    starters: ['I compared...', 'I decided by...'],
  },
  deepen: {
    title: 'Other ways to scale',
    summary: 'Another common way is standardising: subtract the mean and divide by the spread (standard deviation). scikit-learn does both in one line, and Chapter 8 uses them.',
  },
  notes: 'Min-max scaling. Training weeks 1-11: wait_days 0-45, distance_km 1-60, previous_no_shows 0-4, sms_reminder 0-1. A12201: wait 14 -> 0.311, distance 10 -> 0.153. Whole file distance 1-60, so scaled max 1.0, min 0.0.',
};

export default lesson;
