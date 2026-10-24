import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3 — Loading a CSV with pandas: one line, and the whole export is a table. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Loading a CSV with pandas',
  summary: 'Emmanuel\'s export is a CSV file: plain text, one booking per line, commas between the columns. Two lines of Python turn it into a table Halima can ask questions of.',
  minutes: 11,
  outcomes: [
    'Import pandas and load a CSV with read_csv',
    'Know what a DataFrame is',
    'Check the number of rows with len()',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Two lines',
      text: 'import pandas as pd loads the tool. df = pd.read_csv("appointments_raw.csv") reads the file into a DataFrame, a table with rows and named columns. len(df) counts the rows: 2412.',
      hotspots: [
        { phrase: 'import pandas as pd', note: 'Loads pandas and gives it the short name pd. Everyone uses pd, so you\'ll see it everywhere.' },
        { phrase: 'pd.read_csv("appointments_raw.csv")', note: 'Reads the CSV file. The first line of the file becomes the column names.' },
        { phrase: 'a DataFrame', note: 'pandas\' word for a table. We call it df for short.' },
        { phrase: 'len(df) counts the rows: 2412', note: 'The same len() you used on lists. 2,412 matches what Emmanuel said he sent.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Open the export',
      caption: 'The first run downloads the table tools, so it takes a little longer.',
      code: 'import pandas as pd\n\ndf = pd.read_csv("appointments_raw.csv")\nprint(len(df))\nprint(df.columns.tolist())\n',
      challenge: 'Load "appointments.csv" (the clean version) instead. How many rows does it have?',
    },
  ],
  apply: {
    scenario: 'Opening the export.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Load appointments_raw.csv and print the number of rows',
        starter: 'import pandas as pd\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments_raw.csv")\nprint(len(df))\n',
        hint: 'df = pd.read_csv("appointments_raw.csv"), then print(len(df))',
        checks: [
          { message: 'Print 2412', outputEquals: '2412' },
          { message: 'Use read_csv', codeIncludes: 'read_csv(' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is a DataFrame?',
        options: [
          { text: 'pandas\' name for a table with rows and named columns' },
          { text: 'A picture frame for charts', why: 'It\'s a table.' },
          { text: 'A list of numbers', why: 'It\'s a whole table, with many columns.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Load the clean file.',
        language: 'python',
        template: 'import pandas as [[1]]\ndf = pd.[[2]]("appointments.csv")',
        blanks: [['pd'], ['read_csv']],
        distractors: ['pandas', 'open'],
      },
      {
        kind: 'writeCode',
        prompt: 'Load the clean file, appointments.csv, and print its number of rows',
        starter: 'import pandas as pd\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\nprint(len(df))\n',
        hint: 'Same as before, with "appointments.csv"',
        checks: [{ message: 'Print 2400', outputEquals: '2400' }],
      },
      {
        kind: 'findBug',
        prompt: 'This crashes with a NameError. Which line?',
        language: 'python',
        lines: ['import pandas', 'df = pd.read_csv("appointments.csv")', 'print(len(df))'],
        bug: 0,
        fix: 'import pandas as pd',
        explanation: 'Without "as pd", the name pd doesn\'t exist.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to what it does.',
        pairs: [
          ['import pandas as pd', 'Loads the table tool'],
          ['pd.read_csv(...)', 'Reads a file into a table'],
          ['len(df)', 'Counts the rows'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the lines.',
        language: 'python',
        lines: ['import pandas as pd', 'df = pd.read_csv("appointments_raw.csv")', 'print(len(df))'],
      },
      {
        kind: 'mcq',
        prompt: 'The raw file has 2,412 rows; the clean one has 2,400. What might the 12 extra be?',
        options: [
          { text: 'Patients who don\'t exist', why: 'Close: they\'re copies of real rows. Lesson 12 finds them.' },
          { text: 'Column names', why: 'There\'s only one line of column names.' },
          { text: 'Rows exported twice by mistake (duplicates)' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'Is a CSV some kind of special database?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'Yes, you need a licence to open one.', why: 'It\'s plain text. Anything can open it.' },
          { text: 'No, it\'s plain text: one row per line, commas between the columns. That\'s why every tool can open it.' },
          { text: 'It\'s a picture of a table.', why: 'It\'s text, not an image.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does CSV stand for? (comma-separated...)',
        answers: ['values', 'comma-separated values', 'comma separated values'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Halima checked the row count against what Emmanuel said he sent. Why is that a good habit with any file someone gives you?',
    starters: ['It\'s a good habit because...', 'If the numbers didn\'t match...'],
  },
  deepen: {
    title: 'Other files',
    summary: 'pandas reads more than CSV: pd.read_excel for spreadsheets, pd.read_json for web data. The table you get back works the same way.',
  },
  notes: 'pandas.read_csv (pandas docs). appointments_raw.csv 2,412 rows; appointments.csv 2,400 rows (made-up practice data). CSV = comma-separated values.',
};

export default lesson;
