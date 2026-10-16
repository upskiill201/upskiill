import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5 — Checkpoint. Reviews lessons 1–4: raw vs copy, info, isna, duplicates, dropna. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: 394 rows',
  summary: '4 weeks to Kamau. Wednesday. Zanele\'s cleaning log has two lines so far: "8 duplicates removed. 6 rows with no arrival dropped." 408 rows became 394. Quick check before the strange spellings.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Health-check, de-duplicate and handle blanks without notes', 'Explain each cleaning choice'],
  learn: [
    {
      kind: 'story',
      title: 'Wednesday, 11:20 a.m.',
      beats: [
        { speaker: 'narrator', text: 'Zanele\'s cleaning log, pinned under the countdown: "1. 8 duplicates removed (system saved twice). 2. 6 rows with no arrival dropped (no pattern; paper sheets requested)."' },
        { speaker: 'felix', text: 'You wrote down what I broke. That\'s... actually useful. Nobody\'s ever done that.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: the first two cleaning steps.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Load deliveries.csv into raw, drop duplicates into df, drop rows with a blank actual_days, and print len(df).',
        starter: 'import pandas as pd\n\n',
        solution: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\ndf = raw.drop_duplicates()\ndf = df.dropna(subset=["actual_days"])\nprint(len(df))\n',
        hint: 'Three steps after the import: read_csv, drop_duplicates(), dropna(subset=["actual_days"]).',
        checks: [
          { message: 'Print 394', outputEquals: '394' },
          { message: 'Keep raw at 408 rows', expr: 'len(raw) == 408' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does Zanele keep raw untouched?',
        options: [
          { text: 'pandas can\'t change it', why: 'It can. She chooses not to.' },
          { text: 'It\'s faster', why: 'It\'s about evidence, not speed.' },
          { text: 'So anyone can check how 408 rows became 394' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the problem to the fix.',
        pairs: [
          ['Rows saved twice', 'drop_duplicates()'],
          ['No arrival recorded', 'dropna(subset=["actual_days"])'],
          ['Not sure what\'s wrong yet', 'info() and isna().sum()'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line has a mistake?',
        lines: ['raw = pd.read_csv("deliveries.csv")', 'df = raw.drop_duplicates', 'df = df.dropna(subset=["actual_days"])'],
        bug: 1,
        fix: 'df = raw.drop_duplicates()',
        explanation: 'Without brackets, df becomes the method itself, not a table. The next line then fails.',
        language: 'python',
      },
      {
        kind: 'writeCode',
        prompt: 'Health check: print the number of blanks in the late column of raw.',
        starter: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\n',
        solution: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\nprint(raw["late"].isna().sum())\n',
        hint: 'print(raw["late"].isna().sum())',
        checks: [
          { message: 'Print 6', outputEquals: '6' },
          { message: 'Check the late column', codeIncludes: 'late' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Goes in the cleaning log, or not needed?',
        groups: ['Log it', 'Not needed'],
        items: [
          { text: 'Removed 8 duplicate rows', group: 0 },
          { text: 'Ran head() to look', group: 1 },
          { text: 'Dropped 6 rows with no arrival', group: 0 },
          { text: 'Printed the shape', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'raw has 408 rows and 8 duplicates. What does this print?',
        code: 'df = raw.drop_duplicates()\nprint(len(raw))',
        language: 'python',
        options: [
          { text: '408' },
          { text: '400', why: 'The cleaned table is df. raw is unchanged.' },
          { text: '8', why: 'That\'s how many were removed from the copy.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Count blanks per column.',
        template: 'print(raw.[[1]]().sum())',
        blanks: [['isna']],
        distractors: ['dropna', 'fillna'],
        language: 'python',
      },
      {
        kind: 'chatReply',
        from: 'felix',
        message: 'You wrote down what I broke. Isn\'t that a bit... public?',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'Yes, everyone should know.', why: 'The log is about the data, not about blaming Felix.' },
          { text: 'It\'s about the data, not you. Every export has issues. The log means nobody has to guess what changed.' },
          { text: 'I\'ll delete it.', why: 'Then nobody could check her work.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many rows were removed in total: len(raw) - len(df).',
        starter: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\ndf = raw.drop_duplicates()\ndf = df.dropna(subset=["actual_days"])\n',
        solution: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\ndf = raw.drop_duplicates()\ndf = df.dropna(subset=["actual_days"])\nprint(len(raw) - len(df))\n',
        hint: 'print(len(raw) - len(df))',
        checks: [{ message: 'Print 14', outputEquals: '14' }],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the cleaning so far in order.',
        lines: ['raw = pd.read_csv("deliveries.csv")', 'df = raw.drop_duplicates()', 'df = df.dropna(subset=["actual_days"])', 'print(len(df))'],
        language: 'python',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many duplicate rows were in the raw file?',
        answers: ['8', 'eight'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Felix worried the cleaning log made him look bad. How can you point out a mistake in someone\'s data without blaming them?',
    starters: ['I\'d say...', 'The point is...'],
  },
  notes: 'Checkpoint for Chapter 2 lessons 1-4. deliveries.csv: 408 rows, 8 duplicates, 6 blanks in actual_days and late; 400 after drop_duplicates; 394 after dropna on actual_days; 14 removed.',
};

export default lesson;
