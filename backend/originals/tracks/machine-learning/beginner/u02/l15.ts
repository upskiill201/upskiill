import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14: blanks, duplicates, spellings, new columns, rates. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: the clean-up',
  summary: 'Blanks dropped, duplicates gone, 21 clinic names down to 8, distances turned into numbers, and Gumel spotted fairly. Quick check before the last pieces of the clean table.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Clean blanks, duplicates and spellings without notes', 'Compare groups with rates'],
  learn: [
    {
      kind: 'story',
      title: 'The cleaning log',
      beats: [
        { speaker: 'narrator', text: 'Halima\'s cleaning log: "Removed 12 duplicate rows. Fixed clinic spellings (21 to 8). Turned \'12 km\' text into numbers. Dropped 10 bookings with no distance."' },
        { speaker: 'miracle', text: 'That log is worth more than the clean file. Anyone can check it.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: cleaning.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Drop the duplicates in the raw export, then print how many duplicates are left (should be 0)',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments_raw.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments_raw.csv")\ndf = df.drop_duplicates()\nprint(df.duplicated().sum())\n',
        hint: 'df = df.drop_duplicates(), then df.duplicated().sum()',
        checks: [
          { message: 'Print 0', outputEquals: '0' },
          { message: 'Use drop_duplicates', codeIncludes: 'drop_duplicates(' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'df.dropna(subset=["distance_km"]) on its own line doesn\'t change df. Why?',
        options: [
          { text: 'It returns a new table; you have to store it: df = df.dropna(...)' },
          { text: 'There are no blanks', why: 'There are 10.' },
          { text: 'dropna only works on numbers', why: 'It works on any column. The result just wasn\'t stored.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Clean the clinic names and print how many bookings Yaba has',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments_raw.csv")\ndf = df.drop_duplicates()\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments_raw.csv")\ndf = df.drop_duplicates()\ndf["clinic"] = df["clinic"].str.strip().str.title()\nprint(len(df[df["clinic"] == "Yaba"]))\n',
        hint: 'Clean with .str.strip().str.title(), then filter Yaba',
        checks: [{ message: 'Print 363', outputEquals: '363' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the problem to the fix.',
        pairs: [
          ['Rows exported twice', 'drop_duplicates()'],
          ['"YABA" and "yaba"', '.str.strip().str.title()'],
          ['"12 km" text', 'str.replace + pd.to_numeric'],
          ['Blank distances', 'dropna(subset=[...])'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the misleading line.',
        lines: [
          'Gumel: 50 no-shows from 134 bookings (37%).',
          'Yaba: 77 no-shows from 363 bookings (21%).',
          'Yaba has the worst no-show rate.',
          'We dropped 10 bookings with no distance.',
        ],
        bug: 2,
        fix: 'Gumel has the worst no-show rate.',
        explanation: 'Yaba has the most no-shows (a count). Gumel has the worst rate.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Returns a new table you must store, or changes the column you assign to?',
        groups: ['Store it: df = ...', 'Assign: df["col"] = ...'],
        items: [
          { text: 'drop_duplicates()', group: 0 },
          { text: 'Cleaning clinic names', group: 1 },
          { text: 'dropna(subset=[...])', group: 0 },
          { text: 'Making long_wait', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Add a column far (distance_km > 12) to appointments.csv, then print far\'s no-show rate for True and False, rounded to 3',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\ndf["far"] = df["distance_km"] > 12\nprint(df.groupby("far")["no_show"].mean().round(3))\n',
        hint: 'df["far"] = df["distance_km"] > 12, then groupby("far")',
        checks: [
          { message: 'Make the far column', expr: '"far" in df.columns' },
          { message: 'Group by far', codeIncludes: 'groupby("far")' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'Next month I\'ll fix the export by hand before I send it. Easier for you?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'Yes, fix it by hand.', why: 'Hand fixes can\'t be checked or repeated.' },
          { text: 'Don\'t send it at all.', why: 'The model needs fresh data every month.' },
          { text: 'Send it exactly as it comes out. My Python steps clean it the same way every time, and the log shows what changed.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Fix the distances.',
        language: 'python',
        template: 'df["distance_km"] = pd.[[1]](df["distance_km"].str.[[2]](" km", ""))',
        blanks: [['to_numeric'], ['replace']],
        distractors: ['to_int', 'strip'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the cleaning steps.',
        language: 'python',
        lines: [
          'df = pd.read_csv("appointments_raw.csv")',
          'df = df.drop_duplicates()',
          'df["clinic"] = df["clinic"].str.strip().str.title()',
          'df = df.dropna(subset=["distance_km"])',
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many duplicate rows were in the raw export?',
        answers: ['12', 'twelve'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Miracle says the cleaning log is worth more than the clean file. Do you agree? What would you lose without it?',
    starters: ['I agree/disagree because...', 'Without the log...'],
  },
  notes: 'Checkpoint for Chapter 2 lessons 11-14. raw: 12 duplicates; Yaba 363 after dedup + clinic clean (matches the clean file).',
};

export default lesson;
