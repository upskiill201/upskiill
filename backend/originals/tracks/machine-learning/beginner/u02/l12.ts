import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 12 — Duplicates and spellings: 12 rows exported twice, and 21 "clinics" that are really 8. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Duplicates and spellings',
  summary: 'Halima counts the clinics in the export and gets 21. Afiya\'s pilot has 8. Meanwhile 12 bookings appear twice. Emmanuel, very quietly: "The export button might have been pressed... more than once."',
  minutes: 12,
  outcomes: [
    'Find and drop duplicate rows',
    'Spot one clinic written several ways',
    'Fix spellings with .str.strip() and .str.title()',
  ],
  learn: [
    {
      kind: 'story',
      title: '21 clinics',
      beats: [
        { speaker: 'halima', text: 'df["clinic"].nunique() says 21. "Yaba", "YABA", "yaba". "Lekki" and "Lekki " with a space. The computer thinks they\'re all different clinics.' },
        { speaker: 'tey', text: 'To a computer, "Yaba" and "yaba" are different text. Clean them all the same way: .str.strip() removes stray spaces, .str.title() makes "YABA" and "yaba" into "Yaba".' },
        { speaker: 'halima', text: 'And the 12 bookings that appear twice?' },
        { speaker: 'tey', text: 'df.duplicated().sum() counts rows that are exact copies of an earlier row. df.drop_duplicates() keeps the first copy of each.' },
        { speaker: 'emmanuel', text: 'In my defence, the button didn\'t say anything when I pressed it.' },
      ],
      choice: {
        prompt: 'What should Halima do about the duplicates?',
        options: [
          { text: 'Drop the exact copies and note "removed 12 duplicate rows".', outcome: 'Each booking counts once, and the notes say what changed.', best: true },
          { text: 'Leave them in: 12 rows won\'t matter.', outcome: 'Those 12 bookings would count twice in every rate and teach the model twice. Small, but wrong.' },
          { text: 'Delete every booking that has a duplicate, both copies.', outcome: 'That throws away 12 real bookings. Keep one copy of each.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Clean the clinics',
      caption: 'From 21 names to 8.',
      code: 'import pandas as pd\n\ndf = pd.read_csv("appointments_raw.csv")\nprint(df.duplicated().sum())\ndf = df.drop_duplicates()\nprint(len(df))\n\nprint(df["clinic"].nunique())\ndf["clinic"] = df["clinic"].str.strip().str.title()\nprint(df["clinic"].nunique())\n',
      challenge: 'Print the 8 clean clinic names with df["clinic"].unique().',
    },
  ],
  apply: {
    scenario: 'One booking once, one clinic one name.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print how many duplicate rows the raw export has',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments_raw.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments_raw.csv")\nprint(df.duplicated().sum())\n',
        hint: 'df.duplicated().sum()',
        checks: [{ message: 'Print 12', outputEquals: '12' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why does pandas count "Yaba" and "YABA" as two clinics?',
        options: [
          { text: 'To a computer, different capitals make different text' },
          { text: 'They really are two clinics', why: 'There\'s one Yaba clinic, typed two ways.' },
          { text: 'pandas has a bug', why: 'It\'s doing exactly what it\'s told: comparing text exactly.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Drop the duplicates, then print how many rows are left',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments_raw.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments_raw.csv")\ndf = df.drop_duplicates()\nprint(len(df))\n',
        hint: 'df = df.drop_duplicates()',
        checks: [{ message: 'Print 2400', outputEquals: '2400' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the messy name to what .str.strip().str.title() makes it.',
        pairs: [
          ['"YABA"', '"Yaba"'],
          ['"lekki"', '"Lekki"'],
          ['"Wuse "', '"Wuse"'],
          ['"KANO CITY"', '"Kano City"'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Clean the clinic names with .str.strip().str.title(), then print how many different clinics there are',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments_raw.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments_raw.csv")\ndf["clinic"] = df["clinic"].str.strip().str.title()\nprint(df["clinic"].nunique())\n',
        hint: 'df["clinic"] = df["clinic"].str.strip().str.title()',
        checks: [
          { message: 'Print 8', outputEquals: '8' },
          { message: 'Use .str.title()', codeIncludes: '.str.title()' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The clinic count is still 21. Which line?',
        language: 'python',
        lines: ['import pandas as pd', 'df = pd.read_csv("appointments_raw.csv")', 'df["clinic"].str.strip().str.title()', 'print(df["clinic"].nunique())'],
        bug: 2,
        fix: 'df["clinic"] = df["clinic"].str.strip().str.title()',
        explanation: 'The cleaned names have to be stored back into the column.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Clean the clinic names.',
        language: 'python',
        template: 'df["clinic"] = df["clinic"].str.[[1]]().str.[[2]]()',
        blanks: [['strip'], ['title']],
        distractors: ['upper', 'clean'],
      },
      {
        kind: 'sortGroups',
        prompt: 'After .str.strip().str.title(), the same clinic as "Ikeja", or not?',
        groups: ['Becomes "Ikeja"', 'Stays different'],
        items: [
          { text: '"IKEJA"', group: 0 },
          { text: '"Ikeja "', group: 0 },
          { text: '"Ikoyi"', group: 1 },
          { text: '"ikeja"', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'How do you know you\'ve found all the spelling problems?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'After cleaning, nunique() says 8, and the 8 names match Afiya\'s list of pilot clinics exactly.' },
          { text: 'I looked at a few rows.', why: 'A few rows can miss rare spellings. Check the full list of names.' },
          { text: 'pandas would warn me.', why: 'It won\'t: to pandas, every spelling is valid text.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many different clinic spellings does the raw export have?',
        answers: ['21', 'twenty-one', 'twenty one'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Emmanuel pressed a button twice and 12 bookings were doubled. What small habit would catch mistakes like that before they spread?',
    starters: ['A good habit would be...', 'It would catch...'],
  },
  deepen: {
    title: 'Duplicates that aren\'t exact',
    summary: 'Here the copies were exact. Real data often has near-copies: the same patient booked twice with slightly different times. Checking a column that should be unique, like appointment_id, catches those.',
  },
  notes: 'appointments_raw.csv: 12 exact duplicate rows (2412 -> 2400); 21 clinic spellings -> 8 after .str.strip().str.title(). pandas duplicated, drop_duplicates, str accessor.',
};

export default lesson;
