import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 19 — The clean table: every cleaning step, in order, from 2,412 rows to 2,389. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'The clean table',
  summary: 'Time to put every step together, in the right order, so next month\'s export can be cleaned in one run. Halima writes the script; Miracle checks every number along the way.',
  minutes: 13,
  outcomes: [
    'Put the cleaning steps in a sensible order',
    'Check the row count after each step',
    'Produce the clean table the model will learn from',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From export to clean table',
      steps: [
        { title: '1. Load', body: '2,412 rows.', code: 'df = pd.read_csv("appointments_raw.csv")', language: 'python' },
        { title: '2. Drop duplicates', body: '2,412 to 2,400.', code: 'df = df.drop_duplicates()', language: 'python' },
        { title: '3. Fix clinic names', body: '21 spellings to 8. No rows lost.', code: 'df["clinic"] = df["clinic"].str.strip().str.title()', language: 'python' },
        { title: '4. Fix distances', body: '"12 km" to 12. No rows lost; the 10 blanks are still blank.', code: 'df["distance_km"] = pd.to_numeric(df["distance_km"].str.replace(" km", ""))', language: 'python' },
        { title: '5. Drop blank distances', body: '2,400 to 2,390.', code: 'df = df.dropna(subset=["distance_km"])', language: 'python' },
        { title: '6. Remove impossible waits', body: '2,390 to 2,389: the 400-day typo.', code: 'df = df[df["wait_days"] <= 60]', language: 'python' },
        { title: '7. Check', body: 'Print the row count after every step. If one ever looks wrong, stop and look.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The whole clean-up',
      caption: 'Every step, with a count after each.',
      code: 'import pandas as pd\n\ndf = pd.read_csv("appointments_raw.csv")\nprint("loaded", len(df))\ndf = df.drop_duplicates()\nprint("no duplicates", len(df))\ndf["clinic"] = df["clinic"].str.strip().str.title()\ndf["distance_km"] = pd.to_numeric(df["distance_km"].str.replace(" km", ""))\ndf = df.dropna(subset=["distance_km"])\nprint("no blanks", len(df))\ndf = df[df["wait_days"] <= 60]\nprint("clean", len(df))\nprint(df["clinic"].nunique(), "clinics")\n',
      challenge: 'Print the no-show rate of the clean table.',
    },
  ],
  apply: {
    scenario: 'Building the clean table.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the cleaning steps.',
        language: 'python',
        lines: [
          'df = pd.read_csv("appointments_raw.csv")',
          'df = df.drop_duplicates()',
          'df["clinic"] = df["clinic"].str.strip().str.title()',
          'df["distance_km"] = pd.to_numeric(df["distance_km"].str.replace(" km", ""))',
          'df = df.dropna(subset=["distance_km"])',
          'df = df[df["wait_days"] <= 60]',
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Finish the clean-up: drop blank distances and impossible waits, then print the number of rows',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments_raw.csv")\ndf = df.drop_duplicates()\ndf["clinic"] = df["clinic"].str.strip().str.title()\ndf["distance_km"] = pd.to_numeric(df["distance_km"].str.replace(" km", ""))\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments_raw.csv")\ndf = df.drop_duplicates()\ndf["clinic"] = df["clinic"].str.strip().str.title()\ndf["distance_km"] = pd.to_numeric(df["distance_km"].str.replace(" km", ""))\ndf = df.dropna(subset=["distance_km"])\ndf = df[df["wait_days"] <= 60]\nprint(len(df))\n',
        hint: 'dropna(subset=["distance_km"]), then keep wait_days <= 60',
        checks: [{ message: 'Print 2389', outputEquals: '2389' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to the row count after it.',
        pairs: [
          ['Loaded', '2412'],
          ['Duplicates dropped', '2400'],
          ['Blank distances dropped', '2390'],
          ['Impossible wait removed', '2389'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'After step 4 (turning "12 km" into numbers), how many blanks does distance_km have?',
        options: [
          { text: '10: fixing the text doesn\'t fill the blanks' },
          { text: '0: to_numeric fills them in', why: 'to_numeric only converts text. Blanks stay blank until step 5.' },
          { text: '16: the 6 texts become blanks too', why: 'With " km" removed first, they become real numbers.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Run the whole clean-up and print the clean table\'s no-show rate as "18.3%"',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments_raw.csv")\ndf = df.drop_duplicates()\ndf["clinic"] = df["clinic"].str.strip().str.title()\ndf["distance_km"] = pd.to_numeric(df["distance_km"].str.replace(" km", ""))\ndf = df.dropna(subset=["distance_km"])\ndf = df[df["wait_days"] <= 60]\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments_raw.csv")\ndf = df.drop_duplicates()\ndf["clinic"] = df["clinic"].str.strip().str.title()\ndf["distance_km"] = pd.to_numeric(df["distance_km"].str.replace(" km", ""))\ndf = df.dropna(subset=["distance_km"])\ndf = df[df["wait_days"] <= 60]\nprint(f"{df[\'no_show\'].mean():.1%}")\n',
        hint: 'f"{df[\'no_show\'].mean():.1%}"',
        checks: [{ message: 'Print 18.3%', outputEquals: '18.3%' }],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'Why print the row count after every step?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'So if a step removes far more rows than expected, I see it straight away instead of finding out from a strange model.' },
          { text: 'Because pandas needs it.', why: 'pandas doesn\'t. You do.' },
          { text: 'To fill the screen.', why: 'Each count is a check.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'The clean table has too many rows: the duplicates are still in. Which line?',
        language: 'python',
        lines: [
          'df = pd.read_csv("appointments_raw.csv")',
          'df.drop_duplicates()',
          'df = df.dropna(subset=["distance_km"])',
          'df = df[df["wait_days"] <= 60]',
        ],
        bug: 1,
        fix: 'df = df.drop_duplicates()',
        explanation: 'The result wasn\'t stored, so the 12 copies stayed in.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Does the step remove rows, or only change values?',
        groups: ['Removes rows', 'Changes values'],
        items: [
          { text: 'drop_duplicates()', group: 0 },
          { text: 'Fixing clinic names', group: 1 },
          { text: 'dropna(subset=["distance_km"])', group: 0 },
          { text: 'Turning "12 km" into 12', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The last step.',
        language: 'python',
        template: 'df = df[df["[[1]]"] <= 60]',
        blanks: [['wait_days']],
        distractors: ['distance_km', 'hour'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many rows does the clean table have?',
        answers: ['2389', '2,389'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Next month, Emmanuel\'s export might have a new kind of mess. How would Halima\'s row counts help her notice?',
    starters: ['She\'d notice because...', 'Then she\'d...'],
  },
  deepen: {
    title: 'appointments.csv',
    summary: 'From Chapter 3 the lessons use appointments.csv, a tidy version of the same data (2,400 rows, nothing to clean), so every lesson starts from the same table.',
  },
  notes: 'Pipeline on appointments_raw.csv: 2412 -> drop_duplicates 2400 -> clinic clean (8) -> distance to_numeric (10 NaN) -> dropna 2390 -> wait_days <= 60 -> 2389. No-show rate 437/2389 = 18.3%.',
};

export default lesson;
