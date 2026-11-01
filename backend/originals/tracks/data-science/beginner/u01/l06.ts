import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6. Story: what do the 13 columns mean? df.columns, df["col"], one row = one delivery. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Thirteen columns',
  summary: '5 weeks to Kamau. Felix\'s file has 13 columns and he admits he doesn\'t know what all of them mean. Zanele goes through them one by one. Data people call this "getting to know your data". It saves weeks later.',
  minutes: 11,
  outcomes: [
    'List a table\'s columns with df.columns',
    'Pick out one column with df["name"]',
    'Explain what one row and one column stand for',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'One delivery, one row',
      text: 'Row 2 of the file: delivery D1002 left the Mombasa depot on Friday 6 March at hour 15, for Nairobi, 488 km away. Driver Baraka took a Truck to a Shop. It was promised in 3 days and took 5, so late is yes.',
      hotspots: [
        { phrase: 'delivery D1002', note: 'delivery_id: a unique name for each row. No two deliveries share one.' },
        { phrase: 'hour 15', note: 'hour: when the order was placed, on a 24-hour clock. 15 is 3 p.m.' },
        { phrase: '488 km', note: 'distance_km: how far the delivery travelled, as a number.' },
        { phrase: 'promised in 3 days', note: 'promised_days: what the customer was told.' },
        { phrase: 'took 5', note: 'actual_days: how long it really took.' },
        { phrase: 'late is yes', note: 'late: yes when actual_days is more than promised_days.' },
      ],
    },
    {
      kind: 'text',
      html: '<p>In a tidy table, <strong>every row is one thing</strong> (here, one delivery) and <strong>every column is one fact about it</strong> (its depot, its driver, its distance). <code>df.columns</code> lists the columns. <code>df["driver"]</code> picks one column out, like clicking a column letter in a spreadsheet.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Meet the columns',
      code: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(list(df.columns))\nprint(df["driver"].head())\n',
      caption: 'Press Run. list() prints the column names in one tidy line. Then the first 5 drivers.',
      challenge: 'Swap "driver" for "city". Which city is first?',
    },
  ],
  apply: {
    scenario: 'Getting to know the 13 columns.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the column to what it records.',
        pairs: [
          ['promised_days', 'What the customer was told'],
          ['actual_days', 'How long it really took'],
          ['hour', 'When the order was placed'],
          ['distance_km', 'How far it went'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many columns there are: len(df.columns).',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(len(df.columns))\n',
        hint: 'print(len(df.columns))',
        checks: [
          { message: 'Print 13', outputIncludes: '13' },
          { message: 'Use df.columns', codeIncludes: '.columns' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'In this file, what is one row?',
        options: [
          { text: 'One driver', why: 'A driver appears in many rows.' },
          { text: 'One delivery' },
          { text: 'One day', why: 'Many deliveries happen each day.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Pick the depot column.',
        template: 'df[[[1]]]',
        blanks: [['"depot"', "'depot'"]],
        distractors: ['depot', '(depot)'],
        language: 'python',
      },
      {
        kind: 'writeCode',
        prompt: 'Print the first 3 values of the driver column.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(df["driver"].head(3))\n',
        hint: 'print(df["driver"].head(3))',
        checks: [
          { message: 'Show Juma, Baraka and Auma', outputIncludes: 'Auma' },
          { message: 'Pick the driver column', codeIncludes: 'driver' },
          { message: 'Use head(3)', codeIncludes: 'head(3)' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Is it a row or a column in this file?',
        groups: ['Row', 'Column'],
        items: [
          { text: 'Delivery D1002', group: 0 },
          { text: 'driver', group: 1 },
          { text: 'distance_km', group: 1 },
          { text: 'Delivery D1003', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'felix',
        message: 'I don\'t know what half the columns mean. Does it matter?',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'Not really, the numbers speak for themselves.', why: 'Numbers only speak if you know what they measure.' },
          { text: 'I\'ll just use the ones I understand.', why: 'You might skip the one that matters.' },
          { text: 'Yes. If I guess what "late" means and guess wrong, the whole answer is wrong. Can we check them together?' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line has a mistake?',
        lines: ['import pandas as pd', 'df = pd.read_csv("deliveries_clean.csv")', 'print(df["Driver"])'],
        bug: 2,
        fix: 'print(df["driver"])',
        explanation: 'Column names are case-sensitive. The column is driver, lower case, so "Driver" gives a KeyError.',
        language: 'python',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which column tells you if a delivery was late? (one word)',
        answers: ['late'],
        placeholder: 'Column name',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build: print the first 5 cities.',
        tiles: ['print(', 'df["city"]', '.head()', ')'],
        distractors: ['df(city)'],
        language: 'python',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a list or table you use (a budget, a class register, a sales sheet). What is one row, and what are the columns?',
    starters: ['One row is...', 'The columns are...'],
  },
  deepen: {
    title: 'Tidy data',
    summary: 'Hadley Wickham\'s idea of "tidy data": each row is one thing, each column one fact about it. Look at a spreadsheet you use: is it tidy?',
  },
  notes: 'Row D1002 values from deliveries_clean.csv (Mombasa depot, Fri 2026-03-06, hour 15, Nairobi, 488 km, Baraka, Truck, Shop, promised 3, actual 5, late yes). First three drivers: Juma, Baraka, Auma. Tidy data: Wickham, "Tidy Data", Journal of Statistical Software 59(10), 2014.',
};

export default lesson;
