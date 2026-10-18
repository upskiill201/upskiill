import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 13 — Making a new column: from existing columns, and fixing "12 km" text into numbers. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Making a new column',
  summary: 'Halima\'s nurse brain thinks in weeks, not days, and in "long wait" or not. She can add those as new columns. And the distances typed as "12 km" need turning into real numbers.',
  minutes: 12,
  outcomes: [
    'Add a new column worked out from another',
    'Make a True/False column from a condition',
    'Turn text like "12 km" into numbers',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Three new columns',
      text: 'df["long_wait"] = df["wait_days"] > 14 adds a True/False column. df["wait_weeks"] = df["wait_days"] / 7 works out weeks for every row at once. In the raw export, df["distance_km"].str.replace(" km", "") strips the text, and pd.to_numeric turns what\'s left into numbers.',
      hotspots: [
        { phrase: 'df["long_wait"] = df["wait_days"] > 14', note: 'Assigning to a new column name creates it. Each row gets True or False. Its .sum() counts the Trues: 371.' },
        { phrase: 'df["wait_weeks"] = df["wait_days"] / 7', note: 'Maths on a column happens to every row at once, with no loop needed.' },
        { phrase: 'str.replace(" km", "")', note: '"12 km" becomes "12". Cells without " km" stay as they were.' },
        { phrase: 'pd.to_numeric', note: 'Turns text like "12" into the number 12. After this, distance_km is a number column you can do maths on.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'New columns',
      caption: 'Clean data first, then the messy distances.',
      code: 'import pandas as pd\n\ndf = pd.read_csv("appointments.csv")\ndf["long_wait"] = df["wait_days"] > 14\ndf["wait_weeks"] = (df["wait_days"] / 7).round(1)\nprint(df[["wait_days", "wait_weeks", "long_wait"]].head())\nprint(df["long_wait"].sum())\n\nraw = pd.read_csv("appointments_raw.csv")\nraw["distance_km"] = pd.to_numeric(raw["distance_km"].str.replace(" km", ""))\nprint(raw["distance_km"].dtype)\n',
      challenge: 'Add a column far that is True when distance_km is more than 12.',
    },
  ],
  apply: {
    scenario: 'Adding what the data is missing.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Add a long_wait column (wait_days > 14) and print how many are True',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\ndf["long_wait"] = df["wait_days"] > 14\nprint(df["long_wait"].sum())\n',
        hint: 'df["long_wait"] = df["wait_days"] > 14',
        checks: [
          { message: 'Print 371', outputEquals: '371' },
          { message: 'Make the column', expr: '"long_wait" in df.columns' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does df["wait_weeks"] = df["wait_days"] / 7 do?',
        options: [
          { text: 'Adds a column with every row\'s wait in weeks' },
          { text: 'Changes wait_days into weeks', why: 'wait_days stays. A new column is added.' },
          { text: 'Needs a loop to work', why: 'Column maths happens to every row at once.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'In the raw export, remove " km" from distance_km and turn it into numbers. Print the column\'s dtype',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments_raw.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments_raw.csv")\ndf["distance_km"] = pd.to_numeric(df["distance_km"].str.replace(" km", ""))\nprint(df["distance_km"].dtype)\n',
        hint: 'pd.to_numeric(df["distance_km"].str.replace(" km", ""))',
        checks: [
          { message: 'Print float64', outputEquals: 'float64' },
          { message: 'Use pd.to_numeric', codeIncludes: 'to_numeric(' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is the fixed distance_km "float64", not whole numbers?',
        options: [
          { text: 'The 10 blanks (NaN) force pandas to use decimals' },
          { text: 'Distances are always decimals', why: 'These are whole km. NaN is the reason.' },
          { text: 'to_numeric always makes decimals', why: 'Without blanks it would give whole numbers.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to the new column.',
        pairs: [
          ['df["wait_days"] > 14', 'True/False: long wait'],
          ['df["wait_days"] / 7', 'Wait in weeks'],
          ['df["distance_km"] > 12', 'True/False: lives far away'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'This crashes with a ValueError on "12 km". Which line is missing a step?',
        language: 'python',
        lines: ['import pandas as pd', 'df = pd.read_csv("appointments_raw.csv")', 'df["distance_km"] = pd.to_numeric(df["distance_km"])'],
        bug: 2,
        fix: 'df["distance_km"] = pd.to_numeric(df["distance_km"].str.replace(" km", ""))',
        explanation: 'Remove the " km" text first; "12 km" isn\'t a number.',
      },
      {
        kind: 'fillBlank',
        prompt: 'A new True/False column.',
        language: 'python',
        template: 'df[[[1]]] = df["distance_km"] [[2]] 12',
        blanks: [['"far"'], ['>']],
        distractors: ['far', '='],
      },
      {
        kind: 'chatReply',
        from: 'halima',
        message: 'Is it cheating to add my own columns?',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'It\'s the opposite: it\'s how your nurse knowledge gets into the model. Chapter 8 is all about it. Just only use things known before the appointment.' },
          { text: 'Yes, only use what Emmanuel sent.', why: 'Making useful columns is a core ML skill.' },
          { text: 'Add as many as possible, from anything.', why: 'Only clues known before the day, or the model cheats.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'A fair new column (known before the day), or not?',
        groups: ['Fair', 'Not fair'],
        items: [
          { text: 'long_wait from wait_days', group: 0 },
          { text: 'wait_weeks from wait_days', group: 0 },
          { text: '"arrived_late" from the visit record', group: 1 },
          { text: 'far from distance_km', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many bookings in appointments.csv have long_wait True (wait over 14 days)?',
        answers: ['371'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Halima thinks in weeks; the data is in days. What column would YOU add to this table from your own knowledge?',
    starters: ['I\'d add...', 'Because...'],
  },
  deepen: {
    title: 'errors="coerce"',
    summary: 'pd.to_numeric(..., errors="coerce") turns anything it can\'t read into NaN instead of crashing. Handy, but check how many NaNs it created: they\'re cells you just lost.',
  },
  notes: 'appointments.csv: wait_days > 14 in 371 rows. appointments_raw.csv: 6 "N km" texts; after str.replace + pd.to_numeric dtype float64 (10 NaN remain). pandas str.replace, to_numeric.',
};

export default lesson;
