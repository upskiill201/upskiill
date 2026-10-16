import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2. Story: "what's a typical delivery?" Mean, median, mode on distance and days. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'The typical delivery',
  summary: '3 weeks to Kamau. Remi wants one sentence for Kamau: "A typical delivery travels X km and takes Y days." Zanele finds that "typical" has three answers, and on distance they disagree by 34 km.',
  minutes: 11,
  outcomes: [
    'Find the most common value with mode()',
    'Compare mean, median and mode on the same column',
    'Explain why the mean and median disagree',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Three ways to say "typical": the <strong>mean</strong> (the average), the <strong>median</strong> (the middle value) and the <strong>mode</strong> (the most common value). On <code>actual_days</code> they nearly agree: mean 2.465, median 2, mode 2.</p>',
    },
    {
      kind: 'text',
      html: '<p>On <code>distance_km</code> they don\'t: the mean is <strong>164.6 km</strong>, the median <strong>130 km</strong>. Most deliveries are short city runs, but about a quarter are long routes of 300 km or more, and those pull the mean up. When the mean is much bigger than the median, a few big values are stretching it. Say "the median delivery travels 130 km".</p>',
    },
    {
      kind: 'tryIt',
      title: 'Three kinds of typical',
      code: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint("mean", df["distance_km"].mean())\nprint("median", df["distance_km"].median())\nprint("mode of days", df["actual_days"].mode()[0])\n',
      caption: 'Press Run. mode() can return several values if there\'s a tie, so [0] takes the first.',
      challenge: 'Print the mean and median of the hour column. Do they agree?',
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'remi', text: 'So which do I tell Kamau?' },
        { speaker: 'zanele', text: 'The median. "Half our deliveries travel under 130 km, and the typical one takes 2 days." The mean would make every trip sound 34 km longer.' },
      ],
    },
  ],
  apply: {
    scenario: 'One sentence for Kamau.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the median distance.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(df["distance_km"].median())\n',
        hint: 'print(df["distance_km"].median())',
        checks: [
          { message: 'Print 130.0', outputIncludes: '130.0' },
          { message: 'Use median()', codeIncludes: 'median()' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the "typical" to its definition.',
        pairs: [
          ['Mean', 'The average'],
          ['Median', 'The middle value'],
          ['Mode', 'The most common value'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Mean distance 164.6 km, median 130 km. What does that tell you?',
        options: [
          { text: 'There\'s a mistake in the data', why: 'Long routes are real. The mean just feels them more.' },
          { text: 'A few long trips are pulling the mean up' },
          { text: 'Most trips are over 164 km', why: 'Half are under 130 km.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'What\'s the most common delivery time? Print df["actual_days"].mode()[0].',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(df["actual_days"].mode()[0])\n',
        hint: 'print(df["actual_days"].mode()[0])',
        checks: [
          { message: 'Print 2', outputEquals: '2' },
          { message: 'Use mode()', codeIncludes: 'mode()' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which "typical" is it?',
        groups: ['Mean', 'Median', 'Mode'],
        items: [
          { text: 'Add up 400 distances, divide by 400', group: 0 },
          { text: 'The 200th distance when sorted', group: 1 },
          { text: 'The delivery time that appears most', group: 2 },
          { text: '164.6 km', group: 0 },
          { text: '130 km', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The most common value.',
        template: 'df["actual_days"].[[1]]()[0]',
        blanks: [['mode']],
        distractors: ['common', 'most'],
        language: 'python',
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Kamau likes big numbers. Can\'t I just say the mean, 164.6 km?',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'Say the median, 130 km. It\'s what a typical trip really looks like. Mention the long routes separately.' },
          { text: 'Sure, it\'s technically true.', why: 'True, but it paints a picture that\'s 34 km too long.' },
          { text: 'Say 495 km, it\'s even bigger.', why: 'That\'s the single longest trip.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'How far apart are they? Print the mean distance minus the median distance, rounded to 1 decimal place.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(round(df["distance_km"].mean() - df["distance_km"].median(), 1))\n',
        hint: 'round(mean - median, 1)',
        checks: [{ message: 'Print 34.6', outputIncludes: '34.6' }],
      },
      {
        kind: 'findBug',
        prompt: 'Which line errors?',
        lines: ['df = pd.read_csv("deliveries_clean.csv")', 'print(df["distance_km"].mean())', 'print(df["distance_km"].middle())'],
        bug: 2,
        fix: 'print(df["distance_km"].median())',
        explanation: 'pandas calls it median(), not middle().',
        language: 'python',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Mean much bigger than median: a few very ___ values are pulling it up. (one word)',
        answers: ['big', 'large', 'high', 'long'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Describe something "typical" in your life (a commute, a bill, a week) with a median instead of an average. Is it different?',
    starters: ['My typical...', 'The odd ones out are...'],
  },
  deepen: {
    title: 'Hour of day',
    summary: 'In the Try it card, compare the mean and median of hour. When the two agree, the values are spread evenly around the middle.',
  },
  notes: 'deliveries_clean.csv: distance_km mean 164.6, median 130.0 (diff 34.6), 75th percentile 311; actual_days mean 2.465, median 2.0, mode 2 (119 of 400). hour mean 12.57, median 13.',
};

export default lesson;
