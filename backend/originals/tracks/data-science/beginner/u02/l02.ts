import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2. Story: a health check of the raw file. info(), isna().sum(), dtypes. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'A health check',
  summary: '4 weeks to Kamau. Before fixing anything, Zanele gives the raw file a health check, like a nurse taking your temperature first. Two lines of pandas show blanks, and one column that should be numbers but isn\'t.',
  minutes: 11,
  outcomes: [
    'Get a quick summary of a table with info()',
    'Count blanks in every column with isna().sum()',
    'Spot a number column stored as text',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Health check, three lines',
      steps: [
        {
          title: '1. The overview',
          body: 'info() prints every column, how many values are filled in (non-null), and its type. 408 rows, but actual_days has only 402 values.',
          code: 'raw.info()',
          language: 'python',
        },
        {
          title: '2. Count the blanks',
          body: 'isna() marks every blank cell as True; sum() counts them per column. Blanks show up in pandas as NaN: "not a number".',
          code: 'print(raw.isna().sum())',
          language: 'python',
        },
        {
          title: '3. Check the types',
          body: 'distance_km should be a number. It says object: text. Something in that column isn\'t a number.',
          code: 'print(raw.dtypes)',
          language: 'python',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Run the health check',
      code: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\nraw.info()\nprint(raw.isna().sum())\n',
      caption: 'Press Run. info() prints by itself, no print() needed. Look for columns with fewer than 408 non-null values.',
      challenge: 'Add print(raw.dtypes). Which column has the wrong type?',
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'zanele', text: 'Six blanks in actual_days and six in late. And distance_km is text. So: duplicates, blanks, and something wrong with distances.' },
        { speaker: 'remi', text: 'You\'ve found three problems and you haven\'t changed a single cell.' },
        { speaker: 'zanele', text: 'That\'s the paradigm. Diagnose, then treat.' },
      ],
    },
  ],
  apply: {
    scenario: 'The raw file\'s health check.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the number of blanks in every column with isna().sum().',
        starter: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\n',
        solution: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\nprint(raw.isna().sum())\n',
        hint: 'print(raw.isna().sum())',
        checks: [
          { message: 'Show actual_days 6', outputIncludes: 'actual_days 6' },
          { message: 'Use isna()', codeIncludes: 'isna()' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'info() says actual_days has 402 non-null values out of 408. What does that mean?',
        options: [
          { text: '402 deliveries were late', why: 'Non-null just means filled in.' },
          { text: '6 deliveries have no actual_days filled in' },
          { text: 'The column has 6 duplicates', why: 'Duplicates are whole repeated rows, a different problem.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to what it tells you.',
        pairs: [
          ['raw.info()', 'Columns, filled-in counts and types'],
          ['raw.isna().sum()', 'Blanks per column'],
          ['raw.dtypes', 'Each column\'s type'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Count the blanks in each column.',
        template: 'raw.[[1]]().[[2]]()',
        blanks: [['isna'], ['sum']],
        distractors: ['blank', 'count_blank'],
        language: 'python',
      },
      {
        kind: 'writeCode',
        prompt: 'Print the type of the distance_km column: raw["distance_km"].dtype.',
        starter: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\n',
        solution: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\nprint(raw["distance_km"].dtype)\n',
        hint: 'print(raw["distance_km"].dtype)',
        checks: [
          { message: 'Print object', outputIncludes: 'object' },
          { message: 'Use .dtype', codeIncludes: '.dtype' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'From the health check: a problem, or fine?',
        groups: ['Problem', 'Fine'],
        items: [
          { text: 'distance_km is object', group: 0 },
          { text: 'hour is int64', group: 1 },
          { text: 'actual_days has 6 blanks', group: 0 },
          { text: 'driver is object', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Why not just start fixing things as you find them?',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'Because some fixes change other problems. Removing duplicates first changes how many blanks are left. I want the full list first.' },
          { text: 'Because fixing is boring.', why: 'Fixing is most of the job.' },
          { text: 'You\'re right, let\'s go.', why: 'Treating before diagnosing is how mistakes slip in.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line has a mistake?',
        lines: ['raw = pd.read_csv("deliveries.csv")', 'print(raw.isna.sum())', 'print(raw.dtypes)'],
        bug: 1,
        fix: 'print(raw.isna().sum())',
        explanation: 'isna is a method: it needs its own brackets, isna(), before .sum().',
        language: 'python',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does pandas show in a blank cell? (three letters)',
        answers: ['NaN', 'nan'],
        placeholder: 'Three letters',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the health check in order.',
        lines: ['Count the rows', 'Look at info()', 'Count the blanks', 'Check the types', 'List the problems'],
      },
    ],
  },
  reflect: {
    prompt: 'Diagnose, then treat. Where else in life does checking first save you from fixing the wrong thing?',
    starters: ['Before I fix something I...', 'I once fixed the wrong thing when...'],
  },
  deepen: {
    title: 'Check a real file',
    summary: 'Ask yourself the health-check questions about any spreadsheet you use: how many rows, which blanks, which types?',
  },
  notes: 'deliveries.csv info(): 408 entries; actual_days 402 non-null float64; late 402 non-null; distance_km object (5 values like "161 km"). isna().sum(): actual_days 6, late 6. DataFrame.info writes to stdout by default (pandas docs).',
};

export default lesson;
