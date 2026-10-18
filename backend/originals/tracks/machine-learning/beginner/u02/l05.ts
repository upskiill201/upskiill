import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4: why Python, basics, read_csv, first look. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the first look',
  summary: 'The export is open in Python: 2,412 rows, 14 columns, one column stored as text and one impossible wait. Halima hasn\'t changed anything yet, and that\'s the point. Quick check before she starts asking it questions.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Load a CSV and take a first look without notes', 'Use variables, lists, if and loops'],
  learn: [
    {
      kind: 'story',
      title: 'A list of worries',
      beats: [
        { speaker: 'narrator', text: 'Halima\'s notes after the first look: "2,412 rows (Emmanuel said 2,412). distance_km is text. One wait is 400 days."' },
        { speaker: 'miracle', text: 'Perfect. Write down what\'s wrong before you fix anything.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: loading and looking.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Load appointments.csv and print its shape',
        starter: 'import pandas as pd\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\nprint(df.shape)\n',
        hint: 'pd.read_csv, then print(df.shape)',
        checks: [{ message: 'Print (2400, 14)', outputEquals: '(2400, 14)' }],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the waits that are 20 days or more, one per line',
        starter: 'waits = [3, 21, 5, 30, 16, 20]\n',
        solution: 'waits = [3, 21, 5, 30, 16, 20]\nfor w in waits:\n    if w >= 20:\n        print(w)\n',
        hint: 'for w in waits:, then if w >= 20:',
        checks: [{ message: 'Print 21, 30 and 20', outputEquals: '21\n30\n20' }],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'count = 0\nfor w in [16, 3, 25]:\n    if w > 14:\n        count = count + 1\nprint(count)',
        language: 'python',
        options: [
          { text: '2' },
          { text: '3', why: '3 is not more than 14.' },
          { text: '44', why: 'It counts; it doesn\'t add.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the command to its result for the raw file.',
        pairs: [
          ['len(df)', '2412'],
          ['df.shape', '(2412, 14)'],
          ['df["distance_km"].dtype', 'object'],
          ['df["wait_days"].max()', '400'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line is wrong?',
        language: 'python',
        lines: ['import pandas as pd', 'df = pd.read_csv(appointments.csv)', 'print(df.head())'],
        bug: 1,
        fix: 'df = pd.read_csv("appointments.csv")',
        explanation: 'The file name is text, so it needs quotes.',
      },
      {
        kind: 'sortGroups',
        prompt: 'A value (no brackets) or a command (brackets)?',
        groups: ['Value', 'Command'],
        items: [
          { text: 'df.shape', group: 0 },
          { text: 'df.head()', group: 1 },
          { text: 'df.dtypes', group: 0 },
          { text: 'df.describe()', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'You found a 400-day wait. Shall I fix it in the spreadsheet?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'Leave the export as it is. I\'ll fix it in the Python steps, so the fix is written down and repeatable.' },
          { text: 'Yes, fix it quietly.', why: 'Quiet hand edits can\'t be checked or repeated.' },
          { text: 'Ignore it.', why: 'A 400-day wait would mislead the model.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Load and count.',
        language: 'python',
        template: 'df = pd.[[1]]("appointments_raw.csv")\nprint([[2]](df))',
        blanks: [['read_csv'], ['len']],
        distractors: ['open', 'count'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is distance_km stored as text in the raw file?',
        options: [
          { text: 'Some cells say things like "12 km"' },
          { text: 'pandas stores all numbers as text', why: 'wait_days is stored as numbers.' },
          { text: 'Distances are always text', why: 'Only because of the "km" cells.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Miracle\'s first-look routine.',
        lines: ['Load the file', 'Check the number of rows', 'Look at the first rows', 'Check the column types', 'Note anything impossible'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many columns does the appointments table have?',
        answers: ['14', 'fourteen'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'When do we train the AI?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'After the data is clean and we can trust it. A model trained on a 400-day wait would learn nonsense.' },
          { text: 'Right now, on the raw file.', why: 'Messy in, messy out.' },
          { text: 'Never.', why: 'Soon, once the table is clean.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Miracle says write down what\'s wrong before you fix anything. Why not just fix things as you see them?',
    starters: ['Writing it down first...', 'Fixing as I go might...'],
  },
  notes: 'Checkpoint for Chapter 2 lessons 1-4. appointments.csv (2400, 14); raw (2412, 14).',
};

export default lesson;
