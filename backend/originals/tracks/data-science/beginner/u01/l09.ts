import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9. Story: numbers vs text in a column. dtypes, max(), min(), sum(). */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Numbers and words',
  summary: '5 weeks to Kamau. Zanele asks pandas for the longest delivery. It answers in a blink: 495 km. Then she tries the same on the driver column and gets "Wanjiru", which makes no sense, until she learns that every column has a type.',
  minutes: 11,
  outcomes: [
    'Check each column\'s type with dtypes',
    'Use max(), min() and sum() on number columns',
    'Know why the type of a column matters',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Every column in pandas has a <strong>type</strong>. <code>int64</code> means whole numbers (like <code>distance_km</code>). <code>float64</code> means numbers with decimals. <code>object</code> means text (like <code>driver</code>). <code>df.dtypes</code> lists them all.</p>',
    },
    {
      kind: 'text',
      html: '<p>The type decides what makes sense. On a number column, <code>max()</code> is the biggest number: <code>df["distance_km"].max()</code> is 495. On a text column, <code>max()</code> is just the last word in alphabetical order. "Wanjiru" isn\'t the "most" driver; W just comes last.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Check the types',
      code: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(df.dtypes)\nprint(df["distance_km"].max())\nprint(df["distance_km"].min())\n',
      caption: 'Press Run. Numbers say int64; text says object. Longest trip 495 km, shortest 10 km.',
      challenge: 'Print df["actual_days"].max(). What\'s the slowest delivery?',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Next week, a number column will arrive as text, because someone typed "km" after a number. Checking dtypes is how you\'ll catch it.',
    },
  ],
  apply: {
    scenario: 'Numbers, words and types.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the longest delivery distance with max().',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(df["distance_km"].max())\n',
        hint: 'print(df["distance_km"].max())',
        checks: [
          { message: 'Print 495', outputIncludes: '495' },
          { message: 'Use max()', codeIncludes: '.max()' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the pandas type to what it holds.',
        pairs: [
          ['int64', 'Whole numbers'],
          ['float64', 'Numbers with decimals'],
          ['object', 'Text'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'df["driver"].max() gives "Wanjiru". What does that mean?',
        options: [
          { text: 'Wanjiru did the most deliveries', why: 'That would be value_counts().' },
          { text: 'Wanjiru is the worst driver', why: 'It says nothing about lateness.' },
          { text: 'Nothing useful: W is last in the alphabet' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Number column or text column?',
        groups: ['Number', 'Text'],
        items: [
          { text: 'distance_km', group: 0 },
          { text: 'city', group: 1 },
          { text: 'actual_days', group: 0 },
          { text: 'vehicle', group: 1 },
          { text: 'hour', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'How many days did all 400 deliveries take, added together? Print the sum() of actual_days.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(df["actual_days"].sum())\n',
        hint: 'print(df["actual_days"].sum())',
        checks: [
          { message: 'Print 986', outputIncludes: '986' },
          { message: 'Use sum()', codeIncludes: '.sum()' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'List every column\'s type.',
        template: 'print(df.[[1]])',
        blanks: [['dtypes']],
        distractors: ['types', 'columns'],
        language: 'python',
      },
      {
        kind: 'findBug',
        prompt: 'Which line won\'t tell Zanele anything useful?',
        lines: ['print(df["distance_km"].max())', 'print(df["city"].max())', 'print(df["actual_days"].min())'],
        bug: 1,
        explanation: 'city is text, so max() is just the last city alphabetically (Voi). It runs, but it means nothing.',
        language: 'python',
      },
      {
        kind: 'writeCode',
        prompt: 'Print the slowest delivery: the max() of actual_days.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(df["actual_days"].min())\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(df["actual_days"].max())\n',
        hint: 'Swap min() for max().',
        checks: [
          { message: 'Print 6', outputEquals: '6' },
          { message: 'Use max()', codeIncludes: '.max()' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'felix',
        message: 'Why do you care what type a column is? A number\'s a number.',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'I don\'t, really.', why: 'She should: types decide what the maths means.' },
          { text: 'Not to pandas. If "161 km" sneaks in, the whole column becomes text and max() stops meaning anything.' },
          { text: 'Because text is always wrong.', why: 'Text columns are fine. They just need text tools.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What type does pandas give a column of text?',
        answers: ['object'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever seen a spreadsheet where numbers were stored as text, or dates looked wrong? What went wrong because of it?',
    starters: ['I once saw...', 'It caused...'],
  },
  deepen: {
    title: 'Types everywhere',
    summary: 'Run df.dtypes in the Try it card and say each column\'s type out loud before you look. How many did you get right?',
  },
  notes: 'deliveries_clean.csv: distance_km int64, max 495, min 10; actual_days int64, max 6, sum 986 (mean 2.465 x 400); driver max "Wanjiru", city max "Voi" (alphabetical). pandas dtypes: int64, float64, object (pandas docs, basics.dtypes).',
};

export default lesson;
