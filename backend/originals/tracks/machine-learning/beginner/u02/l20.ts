import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 20 — Chapter Challenge. Climax: v0.2, the clean table Halima trusts, with its numbers. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: the clean table (v0.2)',
  summary: 'Miracle\'s test: "Clean the export from scratch, and give me four numbers I can trust." Everything from Chapter 2, harder.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Clean a messy export from scratch', 'Use everything from Chapter 2 together'],
  learn: [
    {
      kind: 'story',
      title: 'Four numbers',
      beats: [
        { speaker: 'miracle', text: 'From the raw export: how many clean bookings, the no-show rate, the worst clinic by rate, and the no-show rate with and without a reminder.' },
        { speaker: 'halima', text: '2,389 bookings. 18.3%. Gumel. 26.2% without a reminder, 12.4% with.' },
        { speaker: 'miracle', text: 'Version 0.2. Now we have a table worth learning from.' },
        { speaker: 'tey', text: 'Your turn: build v0.2.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: the clean table.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Clean appointments_raw.csv from scratch (duplicates, clinic names, distances, blanks, impossible waits) and print the number of rows',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments_raw.csv")\n# 1. drop duplicates\n# 2. clean clinic names\n# 3. turn "12 km" into numbers\n# 4. drop blank distances\n# 5. keep waits of 60 days or less\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments_raw.csv")\ndf = df.drop_duplicates()\ndf["clinic"] = df["clinic"].str.strip().str.title()\ndf["distance_km"] = pd.to_numeric(df["distance_km"].str.replace(" km", ""))\ndf = df.dropna(subset=["distance_km"])\ndf = df[df["wait_days"] <= 60]\nprint(len(df))\n',
        hint: 'Five steps, each stored back into df',
        checks: [
          { message: 'Print 2389', outputEquals: '2389' },
          { message: '8 clinics', expr: 'df["clinic"].nunique() == 8' },
          { message: 'No blank distances', expr: 'df["distance_km"].isna().sum() == 0' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\nprint(df["no_show"].value_counts()[1])',
        language: 'python',
        options: [
          { text: '439' },
          { text: '1961', why: 'That\'s the count for 0 (came).' },
          { text: '0.183', why: 'value_counts without normalize gives counts.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'In appointments.csv, print the clinic with the highest no-show rate',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\nrates = df.groupby("clinic")["no_show"].mean()\nprint(rates.idxmax())\n',
        hint: 'rates.idxmax() gives the name of the biggest value',
        checks: [
          { message: 'Print Gumel', outputEquals: 'Gumel' },
          { message: 'Use groupby', codeIncludes: 'groupby(' },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Fix every bug in this draft so it prints the number of no-shows among long waits with no reminder',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\nrule = df[df["wait_days"] > 14 and df["Sms_reminder"] = 0]\nprint(rule["no_show"].sum())\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\nrule = df[(df["wait_days"] > 14) & (df["sms_reminder"] == 0)]\nprint(rule["no_show"].sum())\n',
        hint: 'Brackets and &, the right column name, and ==',
        checks: [
          { message: 'Use & with brackets', codeIncludes: '&' },
          { message: 'Count the right rows', expr: 'len(rule) == 151' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to the answer.',
        pairs: [
          ['Clean bookings', '2389'],
          ['No-show rate', '18.3%'],
          ['Worst clinic by rate', 'Gumel'],
          ['Rate without a reminder', '26.2%'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the wrong line in Halima\'s v0.2 report.',
        lines: [
          'Cleaned 2,412 exported rows to 2,389 bookings.',
          'No-show rate: 18.3%.',
          'Yaba is the worst clinic, with 77 no-shows.',
          'Without a reminder, 26.2% missed; with one, 12.4%.',
        ],
        bug: 2,
        fix: 'Gumel has the worst rate: 37.3%.',
        explanation: 'Yaba has the most no-shows because it\'s the busiest. Compare rates.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 2 tool?',
        groups: ['Cleaning', 'Asking questions'],
        items: [
          { text: 'drop_duplicates()', group: 0 },
          { text: 'groupby + mean', group: 1 },
          { text: '.str.strip().str.title()', group: 0 },
          { text: 'value_counts()', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the no-show rate with and without a reminder, rounded to 3',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\nprint(df.groupby("sms_reminder")["no_show"].mean().round(3))\n',
        hint: 'groupby("sms_reminder")',
        checks: [
          { message: 'Show 0.262', outputIncludes: '0.262' },
          { message: 'Show 0.124', outputIncludes: '0.124' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'Can we train the AI now?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'No, we need another year of cleaning.', why: 'The table is ready.' },
          { text: 'Yes: the table is clean and logged. Next we build a first predictor ourselves, so we understand what a model really does.' },
          { text: 'We trained it already.', why: 'Not yet. Chapter 3 builds the first one.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Two lessons of the chapter.',
        template: 'Compare [[1]], not counts. Write every cleaning step [[2]].',
        blanks: [['rates'], ['down']],
        distractors: ['totals', 'later'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The no-show rate of the clean table, as a percentage with 1 decimal.',
        answers: ['18.3%', '18.3'],
        placeholder: 'A percentage',
      },
    ],
  },
  reflect: {
    prompt: 'You cleaned a messy file and found four numbers people can trust. Which step felt most important, and why?',
    starters: ['The most important step was...', 'Because...'],
  },
  notes: 'Chapter 2 challenge. Clean pipeline 2412 -> 2389, 8 clinics, 18.3%. appointments.csv: 439 no-shows; Gumel highest rate (0.373); long-wait-no-reminder rule 151 rows; sms 0: 0.262, 1: 0.124.',
};

export default lesson;
