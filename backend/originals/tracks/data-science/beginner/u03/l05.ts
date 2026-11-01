import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5 — Checkpoint. Reviews lessons 1–4: mean, median, mode, spread, outliers. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: what\'s typical',
  summary: '3 weeks to Kamau. Wednesday. Emeka sends his correction to the depot managers: "Typical delivery: 2 days (median). The middle half take 1 to 3." Remi frames it. Quick check before the late rates.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Choose between mean and median, and describe spread', 'Find outliers with a rule, then judge them'],
  learn: [
    {
      kind: 'story',
      title: 'Wednesday, 10:00 a.m.',
      beats: [
        { speaker: 'emeka', text: '(message to depot managers) Correction: the typical delivery takes 2 days (median), and the middle half take 1 to 3. My 2.7 included a typo. Sorry.' },
        { speaker: 'remi', text: 'He wrote "median" in a message to depot managers. Zanele, you\'ve changed a man.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: typical and unusual.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the mean and the median of distance_km on two lines.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(df["distance_km"].mean())\nprint(df["distance_km"].median())\n',
        hint: 'print(...mean()) then print(...median())',
        checks: [
          { message: 'Print the mean, 164.6', outputIncludes: '164.6' },
          { message: 'Print the median, 130.0', outputIncludes: '130.0' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'One delivery is recorded as 99 days. Which moves more?',
        options: [
          { text: 'The median', why: 'The middle position barely shifts.' },
          { text: 'The mean' },
          { text: 'They move the same', why: 'The mean adds up the 99; the median doesn\'t.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to the clean-file result.',
        pairs: [
          ['df["actual_days"].median()', '2.0'],
          ['df["actual_days"].quantile(0.75)', '3.0'],
          ['df["distance_km"].max()', '495'],
          ['df["actual_days"].mode()[0]', '2'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the standard deviation of actual_days with std(), rounded to 2 places.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(round(df["actual_days"].std(), 2))\n',
        hint: 'print(round(df["actual_days"].std(), 2))',
        checks: [
          { message: 'Print 1.26', outputIncludes: '1.26' },
          { message: 'Use std()', codeIncludes: 'std()' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Tukey\'s fence.',
        template: 'fence = q3 + 1.5 * ([[1]] - [[2]])',
        blanks: [['q3'], ['q1']],
        distractors: ['mean', 'max'],
        language: 'python',
      },
      {
        kind: 'sortGroups',
        prompt: 'Report the mean or the median?',
        groups: ['Mean is fine', 'Median'],
        items: [
          { text: 'Distances, with a few 490 km trips', group: 1 },
          { text: 'Hour orders are placed (evenly spread)', group: 0 },
          { text: 'Raw delivery times with a 99 in them', group: 1 },
          { text: 'Heights of the Synergix football team', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which statement is wrong?',
        lines: ['The middle half of deliveries take 1 to 3 days.', 'Every value over the fence is a mistake.', 'A bigger std means more spread out.'],
        bug: 1,
        fix: 'Every value over the fence needs a human to check it.',
        explanation: 'Outliers can be real. The rule only tells you where to look.',
      },
      {
        kind: 'writeCode',
        prompt: 'How many deliveries took exactly 6 days? Use a filter with == 6 and len().',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(len(df[df["actual_days"] == 6]))\n',
        hint: 'print(len(df[df["actual_days"] == 6]))',
        checks: [
          { message: 'Print 8', outputEquals: '8' },
          { message: 'Filter with == 6', codeIncludes: '== 6' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emeka',
        message: 'I wrote "median" to the depot managers. Do I get a certificate?',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'No, you made a mistake.', why: 'He fixed it publicly. That deserves credit.' },
          { text: 'Only if you say "interquartile range" too.', why: 'Funny, but she\'s missing the moment to reinforce what he did well.' },
          { text: 'Better: you get people trusting your next number. Correcting yourself fast is rare.' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the summary of a number column in order.',
        lines: ['Check min and max for impossible values', 'Find the median', 'Compare with the mean', 'Describe the spread', 'Check outliers with the fence'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'import pandas as pd\ns = pd.Series([1, 1, 2, 3, 3, 3])\nprint(s.mode()[0])',
        language: 'python',
        options: [
          { text: '3' },
          { text: '1', why: '1 appears twice; 3 appears three times.' },
          { text: '2.17', why: 'That\'s the mean.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which "typical" is the middle value when sorted?',
        answers: ['median', 'the median'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Emeka corrected his number publicly. When did someone correcting themselves make you trust them more?',
    starters: ['I trusted them more when...', 'Correcting myself is hard because...'],
  },
  notes: 'Checkpoint for Chapter 3 lessons 1-4. deliveries_clean.csv: distance mean 164.6 / median 130; actual_days median 2, q3 3, mode 2, std 1.26, 8 deliveries of exactly 6 days.',
};

export default lesson;
