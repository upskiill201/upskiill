import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4. Story: Felix sends the file. import pandas, read_csv, head(), shape. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Opening the file',
  summary: '5 weeks to Kamau. Felix sends March\'s deliveries as a CSV file. Zanele\'s hand moves to double-click it in a spreadsheet. Remi says: "Try it in pandas." Two lines of code, and 400 deliveries appear.',
  minutes: 11,
  outcomes: [
    'Load a CSV file with pandas',
    'Look at the first rows with head()',
    'Find the size of a table with shape',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Opening data, two ways',
      before: {
        label: 'Spreadsheet',
        text: 'Double-click the file. Scroll. Click a column. Type a formula into a cell. Next month: do it all again by hand, and hope you remember every step.',
      },
      after: {
        label: 'pandas',
        text: 'Write two lines: import pandas, then pd.read_csv("deliveries_clean.csv"). Every step is in the code. Next month: press Run.',
      },
      notes: [
        'pandas is Python\'s library for tables. Import it once at the top: import pandas as pd. Everyone shortens it to pd.',
        'pd.read_csv() reads a CSV file (comma-separated values: a table saved as plain text) into a DataFrame, a table in code. Everyone calls it df.',
        'Spreadsheets are great for looking. Code is great for repeating: every step is written down, so anyone can check it.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Load March\'s deliveries',
      code: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(df.head())\nprint(df.shape)\n',
      caption: 'Press Run. The first run loads pandas, which takes a few seconds. head() shows the first 5 rows; shape shows (rows, columns).',
      challenge: 'Try df.head(10) to see 10 rows.',
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'felix', text: 'Sent. Every delivery from March. It\'s the clean version, I tidied it.' },
        { speaker: 'zanele', text: '(400, 13). Four hundred rows, thirteen columns. One row per delivery?' },
        { speaker: 'felix', text: 'One row per delivery. Don\'t ask me what all the columns mean. Actually, do. I\'ll pretend I know.' },
      ],
    },
  ],
  apply: {
    scenario: 'Felix\'s file arrives.',
    items: [
      {
        kind: 'fillBlank',
        prompt: 'Load pandas the way everyone does.',
        template: 'import [[1]] as [[2]]',
        blanks: [['pandas'], ['pd']],
        distractors: ['panda', 'df'],
        language: 'python',
      },
      {
        kind: 'writeCode',
        prompt: 'Load deliveries_clean.csv into df and print its shape.',
        starter: 'import pandas as pd\n\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(df.shape)\n',
        hint: 'df = pd.read_csv("deliveries_clean.csv"), then print(df.shape).',
        checks: [
          { message: 'Print (400, 13)', outputIncludes: '(400, 13)' },
          { message: 'Read the file with pd.read_csv', codeIncludes: 'read_csv(' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'df.shape gives (400, 13). What does 400 mean?',
        options: [
          { text: '400 rows: one per delivery' },
          { text: '400 columns', why: 'Rows come first, columns second.' },
          { text: '400 late deliveries', why: 'Only 135 were late.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the program in order.',
        lines: ['import pandas as pd', 'df = pd.read_csv("deliveries_clean.csv")', 'print(df.head())'],
        language: 'python',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to what it does.',
        pairs: [
          ['pd.read_csv()', 'Loads a CSV file into a table'],
          ['df.head()', 'Shows the first 5 rows'],
          ['df.shape', 'Gives (rows, columns)'],
          ['import pandas as pd', 'Makes pandas available'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line has a mistake?',
        lines: ['import pandas as pd', 'df = pd.read_csv(deliveries_clean.csv)', 'print(df.shape)'],
        bug: 1,
        fix: 'df = pd.read_csv("deliveries_clean.csv")',
        explanation: 'A file name is text, so it needs quotes.',
        language: 'python',
      },
      {
        kind: 'writeCode',
        prompt: 'Print the first 3 rows only. Put 3 inside head().',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(df.head(3))\n',
        hint: 'print(df.head(3))',
        checks: [
          { message: 'Show delivery D1003', outputIncludes: 'D1003' },
          { message: 'Use head(3)', codeIncludes: 'head(3)' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Better in a spreadsheet, or better in code?',
        groups: ['Spreadsheet', 'Code'],
        items: [
          { text: 'A quick look at a small file', group: 0 },
          { text: 'The same analysis every week', group: 1 },
          { text: 'Showing exactly what you did', group: 1 },
          { text: 'Typing in a few numbers by hand', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is a CSV file?',
        options: [
          { text: 'A Python program', why: 'It\'s data, not code.' },
          { text: 'A table saved as plain text, with commas between values' },
          { text: 'A chart', why: 'It\'s just rows and columns of text.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does everyone call a pandas table in their code? (two letters)',
        answers: ['df'],
        placeholder: 'Two letters',
      },
    ],
  },
  reflect: {
    prompt: 'What task do you repeat by hand every week or month? Could writing the steps down once help?',
    starters: ['Every week I...', 'If it were written down...'],
  },
  deepen: {
    title: 'Look inside',
    summary: 'In the Try it card, try df.tail() to see the last 5 rows. What\'s the last delivery\'s ID?',
  },
  notes: 'deliveries_clean.csv: 400 rows, 13 columns (teyro_datasets.py). First rows D1001-D1003. CSV and DataFrame terms from the pandas docs (pandas.read_csv, DataFrame.head, DataFrame.shape). Last row D1400.',
};

export default lesson;
