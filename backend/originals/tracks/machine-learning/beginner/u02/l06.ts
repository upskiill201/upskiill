import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6 — Picking columns and rows: one column, several columns, one row. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Picking columns and rows',
  summary: 'Bisi asks a simple thing: "What\'s the longest anyone has waited?" Halima doesn\'t need all 14 columns for that, just one. Time to learn how to pick out the part of the table you want.',
  minutes: 11,
  outcomes: [
    'Pick one column with df["name"]',
    'Pick several columns with a list of names',
    'Pick a row by position with iloc',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'One pair of brackets, or two?',
      before: {
        label: 'One column: df["wait_days"]',
        text: 'A single column (a "Series").\nYou can ask it questions:\ndf["wait_days"].max()   -> 45\ndf["wait_days"].mean()  -> about 7.4\nShortcut: df.wait_days works too.',
      },
      after: {
        label: 'Several columns: df[["clinic", "wait_days"]]',
        text: 'A smaller table (a DataFrame).\nThe inner brackets are a list of column names.\nUseful for looking: print(df[["clinic", "wait_days"]].head())',
      },
      notes: [
        'One name in single brackets gives a column. A list of names (double brackets) gives a table.',
        'df.iloc[0] is the first ROW, by position, just like a list: 0 is first.',
        'df["clinic"].iloc[0] is one cell: the first row\'s clinic, "Lekki".',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Pick and ask',
      caption: 'The clean file: appointments.csv.',
      code: 'import pandas as pd\n\ndf = pd.read_csv("appointments.csv")\nprint(df["wait_days"].max())\nprint(df[["clinic", "wait_days"]].head(3))\nprint(df.iloc[0])\n',
      challenge: 'Print the longest distance_km.',
    },
  ],
  apply: {
    scenario: 'Picking out what you need.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the longest wait in appointments.csv',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\nprint(df["wait_days"].max())\n',
        hint: 'print(df["wait_days"].max())',
        checks: [{ message: 'Print 45', outputEquals: '45' }],
      },
      {
        kind: 'mcq',
        prompt: 'What does df[["clinic", "wait_days"]] give you?',
        options: [
          { text: 'One column', why: 'Double brackets: a list of names, so a table.' },
          { text: 'An error', why: 'It\'s the normal way to pick several columns.' },
          { text: 'A table with just those two columns' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the average wait, rounded to 1 decimal place',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\nprint(round(df["wait_days"].mean(), 1))\n',
        hint: 'round(df["wait_days"].mean(), 1)',
        checks: [{ message: 'Print 7.4', outputEquals: '7.4' }],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the clinic of the very first row',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\nprint(df["clinic"].iloc[0])\n',
        hint: 'df["clinic"].iloc[0]',
        checks: [{ message: 'Print Lekki', outputEquals: 'Lekki' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to what it gives.',
        pairs: [
          ['df["wait_days"]', 'One column'],
          ['df[["clinic", "wait_days"]]', 'A two-column table'],
          ['df.iloc[0]', 'The first row'],
          ['df["clinic"].iloc[0]', 'One cell'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'This crashes with a KeyError. Which line?',
        language: 'python',
        lines: ['import pandas as pd', 'df = pd.read_csv("appointments.csv")', 'print(df["clinic", "wait_days"])'],
        bug: 2,
        fix: 'print(df[["clinic", "wait_days"]])',
        explanation: 'Several columns need a list inside the brackets: double brackets.',
      },
      {
        kind: 'fillBlank',
        prompt: 'The longest distance.',
        language: 'python',
        template: 'print(df[[[1]]].[[2]]())',
        blanks: [['"distance_km"'], ['max']],
        distractors: ['"distance"', 'top'],
      },
      {
        kind: 'mcq',
        prompt: 'df.iloc[0] gives the first row. What does df.iloc[1] give?',
        options: [
          { text: 'The first row', why: 'Positions start at 0, so 1 is second.' },
          { text: 'The second row' },
          { text: 'The second column', why: 'iloc with one number picks a row.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'What\'s the longest anyone has waited for a slot?',
        prompt: "Halima's best reply?",
        options: [
          { text: '45 days, in the clean data. In the raw export there\'s a 400, but that\'s a typo.' },
          { text: '400 days.', why: 'That was the typo in the raw export.' },
          { text: 'I can\'t tell without reading every row.', why: 'One line of pandas answers it.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which pandas word picks a row by its position? (four letters)',
        answers: ['iloc', '.iloc'],
        placeholder: 'Four letters',
      },
    ],
  },
  reflect: {
    prompt: 'Bisi asked a one-column question. What\'s a question you\'d ask this table that needs two columns at once?',
    starters: ['I\'d ask...', 'It needs... and...'],
  },
  deepen: {
    title: 'loc vs iloc',
    summary: 'iloc picks by position (0, 1, 2...). loc picks by label or condition. You\'ll mostly use conditions, which is the next lesson.',
  },
  notes: 'appointments.csv: wait_days max 45, mean 7.43 -> 7.4; first row A10001 Lekki. pandas indexing: [], [[...]], iloc.',
};

export default lesson;
