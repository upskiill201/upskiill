import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3. Story: "is 2.5 days good?" Spread: min, max, quartiles, std, describe(). */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'How spread out?',
  summary: '3 weeks to Kamau. Brian asks the question that ruins every average: "Two days, typical. But do most deliveries take about two days, or is it all over the place?" An average without its spread is half a story.',
  minutes: 11,
  outcomes: [
    'Describe spread with min, max and range',
    'Read quartiles: the middle half of the data',
    'Get it all at once with describe()',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Two teams can both average 2 days. One delivers everything in 2. The other does half in 1 day and half in 3, or worse. Same average, very different customers.', replies: ['So how do I measure it?'] },
        { tey: 'Start with the range: max minus min. For actual_days that\'s 6 - 1 = 5 days. Simple, but one odd delivery can stretch it.', replies: ['Something sturdier?'] },
        { tey: 'Quartiles. Sort the values and cut them into four equal groups. 25% of deliveries take 1 day or less, 75% take 3 days or less. So the middle half of deliveries take between 1 and 3 days.', replies: ['And std?'] },
        { tey: 'std (standard deviation) is roughly the typical distance from the mean. For actual_days it\'s about 1.26 days. Bigger std, more spread out. describe() gives you all of these in one go.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Describe the delivery times',
      code: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(df["actual_days"].describe())\nprint("range", df["actual_days"].max() - df["actual_days"].min())\n',
      caption: 'Press Run. 25% and 75% are the quartiles; 50% is the median.',
      challenge: 'Run describe() on distance_km. How wide is the middle half?',
    },
  ],
  apply: {
    scenario: 'Is it all over the place?',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print describe() for the actual_days column.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(df["actual_days"].describe())\n',
        hint: 'print(df["actual_days"].describe())',
        checks: [
          { message: 'Show the std, 1.26...', outputIncludes: '1.26' },
          { message: 'Use describe()', codeIncludes: 'describe()' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'describe() says 25% = 1 and 75% = 3 for actual_days. What does that mean?',
        options: [
          { text: '25% of deliveries were late', why: 'Quartiles are about positions in the sorted data, not lateness.' },
          { text: 'Deliveries take 1 or 3 days, never 2', why: '2 is the median, right between them.' },
          { text: 'The middle half of deliveries took between 1 and 3 days' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the describe() line to its meaning.',
        pairs: [
          ['25%', 'A quarter of values are at or below this'],
          ['50%', 'The median'],
          ['75%', 'Three quarters are at or below this'],
          ['std', 'Typical distance from the mean'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the range of distance_km: max() minus min().',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(df["distance_km"].max() - df["distance_km"].min())\n',
        hint: 'max() - min()',
        checks: [
          { message: 'Print 485', outputEquals: '485' },
          { message: 'Use max() and min()', codeIncludes: 'min()' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'More spread out, or less?',
        groups: ['More spread', 'Less spread'],
        items: [
          { text: 'std 145 km (distances)', group: 0 },
          { text: 'std 1.26 days (delivery times)', group: 1 },
          { text: 'Every delivery takes exactly 2 days', group: 1 },
          { text: 'Some take 1 day, some take 6', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The 75th percentile, directly.',
        template: 'df["actual_days"].[[1]](0.75)',
        blanks: [['quantile']],
        distractors: ['quartile', 'percent'],
        language: 'python',
      },
      {
        kind: 'writeCode',
        prompt: 'Print the 25th percentile (lower quartile) of distance_km with quantile(0.25).',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(df["distance_km"].quantile(0.25))\n',
        hint: 'print(df["distance_km"].quantile(0.25))',
        checks: [
          { message: 'Print 46.0', outputIncludes: '46.0' },
          { message: 'Use quantile()', codeIncludes: 'quantile(' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Two days, typical. But is it all over the place?',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'No, it\'s always 2.', why: 'Only 119 of 400 took exactly 2 days.' },
          { text: 'The average is 2.465, isn\'t that enough?', why: 'That\'s exactly what Brian is challenging.' },
          { text: 'The middle half take 1 to 3 days, and a few take up to 6. So the 2 hides a lot of variety.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line errors?',
        lines: ['df = pd.read_csv("deliveries_clean.csv")', 'print(df["actual_days"].describe)', 'print(df["actual_days"].std())'],
        bug: 1,
        fix: 'print(df["actual_days"].describe())',
        explanation: 'Without the brackets, Python shows the method instead of running it.',
        language: 'python',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which pandas method gives count, mean, std, min, quartiles and max at once?',
        answers: ['describe', 'describe()', '.describe()'],
        placeholder: 'Method name',
      },
    ],
  },
  reflect: {
    prompt: 'Think of something with the same average but very different spread (two buses that are on time "on average"). Which would you rather rely on?',
    starters: ['Two things with the same average...', 'I\'d rather...'],
  },
  deepen: {
    title: 'Same average, different story',
    summary: 'Look up Anscombe\'s quartet: four datasets with the same mean and spread that look completely different. It\'s why you always look at the data, not just the summary.',
  },
  notes: 'deliveries_clean.csv actual_days describe: count 400, mean 2.465, std 1.260, min 1, 25% 1, 50% 2, 75% 3, max 6; 119 deliveries took exactly 2 days. distance_km: min 10, max 495 (range 485), 25% 46, 50% 130, 75% 311, std 145.2. Anscombe, F. J. (1973), "Graphs in Statistical Analysis", The American Statistician 27(1).',
};

export default lesson;
