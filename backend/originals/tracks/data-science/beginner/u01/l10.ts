import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10 — Unit Challenge. Friday: the question goes on the wall, and Felix sends the real file. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the question on the wall',
  summary: '5 weeks to Kamau. Friday. Zanele writes her question on the whiteboard under the countdown and runs the whole week\'s code in one go. Then Felix sends a message: "Small thing. The file I sent was one I tidied. Want the real export?"',
  minutes: 13,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Load, size up and count a dataset from scratch', 'Write a specific, measurable, useful data question'],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 5:30 p.m.',
      beats: [
        { speaker: 'narrator', text: 'Under 5 WEEKS TO KAMAU, Zanele writes: "In March, which kinds of deliveries were late most often, and what do they have in common?"' },
        { speaker: 'remi', text: 'Best whiteboard in the building.' },
        { speaker: 'felix', text: '(message) Small thing. The file I sent was one I tidied. Want the real export? It\'s a bit of a mess.' },
        { speaker: 'zanele', text: 'Felix. Define "a bit".' },
      ],
    },
  ],
  apply: {
    scenario: 'Unit Challenge: Week 1 in one program.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'From scratch: import pandas, load deliveries_clean.csv and print its shape.',
        starter: '',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(df.shape)\n',
        hint: 'Three lines: import pandas as pd, df = pd.read_csv(...), print(df.shape).',
        checks: [
          { message: 'Print (400, 13)', outputIncludes: '(400, 13)' },
          { message: 'Import pandas', codeIncludes: 'import pandas' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which is the best data question?',
        options: [
          { text: 'In March, which kinds of deliveries were late most often, and what do they share?' },
          { text: 'Why are we so bad at deliveries?', why: 'Not specific or measurable, and it assumes a lot.' },
          { text: 'Is Baraka the problem?', why: 'It only tests one guess.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Count the late column, as shares, with normalize=True.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(df["late"].value_counts(normalize=True))\n',
        hint: 'df["late"].value_counts(normalize=True)',
        checks: [
          { message: 'Show 0.3375', outputIncludes: '0.3375' },
          { message: 'Use value_counts()', codeIncludes: 'value_counts(' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put Zanele\'s week in order.',
        lines: ['Write the question', 'Check Kamau\'s number', 'Load the file', 'Learn the columns', 'Count the values', 'Sharpen the question'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to what it shows.',
        pairs: [
          ['df.head()', 'The first 5 rows'],
          ['df.dtypes', 'Each column\'s type'],
          ['df["late"].value_counts()', 'How many late and on time'],
          ['len(df.columns)', '13'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line has a mistake?',
        lines: ['import pandas as pd', 'df = pd.read_csv("deliveries_clean.csv")', 'print(df[late].value_counts())'],
        bug: 2,
        fix: 'print(df["late"].value_counts())',
        explanation: 'Column names are text: they need quotes inside the square brackets.',
        language: 'python',
      },
      {
        kind: 'writeCode',
        prompt: 'Which customer type gets the most deliveries? Print the value_counts() of the customer column.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(df["customer"].value_counts())\n',
        hint: 'print(df["customer"].value_counts())',
        checks: [
          { message: 'Show Shop 146', outputIncludes: 'Shop 146' },
          { message: 'Count the customer column', codeIncludes: 'customer' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Text column or number column?',
        groups: ['Text', 'Number'],
        items: [
          { text: 'depot', group: 0 },
          { text: 'promised_days', group: 1 },
          { text: 'late', group: 0 },
          { text: 'distance_km', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The longest trip.',
        template: 'df[[[1]]].[[2]]()',
        blanks: [['"distance_km"', "'distance_km'"], ['max']],
        distractors: ['"driver"', 'sum'],
        language: 'python',
      },
      {
        kind: 'chatReply',
        from: 'felix',
        message: 'The file I sent was one I tidied. Want the real export? It\'s a bit of a mess.',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'No thanks, the tidy one is easier.', why: 'She\'d never know what "tidied" changed.' },
          { text: 'Yes please. I need to see what you changed, so I can do it in code and show my working.' },
          { text: 'Why would you tidy it?!', why: 'He was being helpful. Ask for the real thing kindly.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'late = 135\ntotal = 400\nprint(round(late / total * 100))',
        language: 'python',
        options: [
          { text: '33.75', why: 'round() rounds to a whole number.' },
          { text: '0.3375', why: 'It\'s multiplied by 100, then rounded.' },
          { text: '34' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build: show the first 10 rows.',
        tiles: ['print(', 'df', '.head(', '10', '))'],
        distractors: ['.top('],
        language: 'python',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many deliveries are in March\'s file?',
        answers: ['400'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Felix "tidied" the file before sending it. Why might that be a problem for an honest analysis?',
    starters: ['If someone tidies data first...', 'I\'d want to know...'],
  },
  deepen: {
    title: 'Next week: the real export',
    summary: 'Real data is messy. Before next chapter, think of three ways a delivery spreadsheet typed by hand could go wrong.',
  },
  notes: 'Unit Challenge for Chapter 1. Figures from deliveries_clean.csv: (400, 13); late share 0.3375; customers Shop 146, Pharmacy 136, Supermarket 118. Sets up Chapter 2 (deliveries.csv, the raw export).',
};

export default lesson;
