import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 2. Story: zooming in on Saturdays. Filtering with ==, !=, >=; filtered tables are tables. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Just Saturdays',
  summary: '2 weeks to Kamau. Zanele zooms in. She keeps only Saturday deliveries and looks again: which depots, which drivers, which hours? A filter gives you a smaller table that works exactly like the big one.',
  minutes: 11,
  outcomes: [
    'Keep only the rows you want with a filter',
    'Use ==, != , >, >= and <= in filters',
    'Analyse a filtered table like any other',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Filtering, step by step',
      steps: [
        {
          title: '1. Ask a True/False question of every row',
          body: 'df["day"] == "Sat" gives True for Saturday rows, False for the rest. 400 answers.',
          code: 'is_sat = df["day"] == "Sat"',
          language: 'python',
        },
        {
          title: '2. Put it inside df[ ]',
          body: 'pandas keeps only the rows where it\'s True. 62 Saturday deliveries.',
          code: 'sat = df[df["day"] == "Sat"]',
          language: 'python',
        },
        {
          title: '3. Use it like any table',
          body: 'len(), value_counts(), groupby: everything works on the smaller table.',
          code: 'print(len(sat))\nprint(sat["depot"].value_counts())',
          language: 'python',
        },
        {
          title: '4. Other comparisons',
          body: '!= means "not equal". > and < compare numbers. >= means "at least".',
          code: 'not_sat = df[df["day"] != "Sat"]\nafternoon = df[df["hour"] >= 14]',
          language: 'python',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Saturday, close up',
      code: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nsat = df[df["day"] == "Sat"]\nprint(len(sat))\nprint(sat["late"].value_counts())\nprint(sat["depot"].value_counts())\n',
      caption: 'Press Run. 62 Saturday deliveries, 54 late, spread across all three depots.',
      challenge: 'Print sat["driver"].value_counts(). Is Saturday one driver\'s problem?',
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'zanele', text: 'Every depot. Every driver. Saturday is late everywhere. That\'s not a person, that\'s a system.' },
        { speaker: 'remi', text: 'So what\'s different about Saturday?' },
        { speaker: 'zanele', text: 'I don\'t know. But I know who will.' },
      ],
    },
  ],
  apply: {
    scenario: 'Zooming in on Saturdays.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Make sat with only Saturday deliveries and print how many there are.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nsat = df[df["day"] == "Sat"]\nprint(len(sat))\n',
        hint: 'sat = df[df["day"] == "Sat"]',
        checks: [
          { message: 'Print 62', outputEquals: '62' },
          { message: 'Make the sat table', expr: 'len(sat) == 62' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the comparison to its meaning.',
        pairs: [
          ['==', 'Equal to'],
          ['!=', 'Not equal to'],
          ['>=', 'At least'],
          ['<', 'Less than'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does len(sat) print?',
        code: 'sat = df[df["day"] == "Sat"]\nprint(len(sat))',
        language: 'python',
        options: [
          { text: '62' },
          { text: '400', why: 'The filter keeps only Saturdays.' },
          { text: '54', why: 'That\'s how many Saturday deliveries were late.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Which drivers worked Saturdays? Filter to Saturday, then value_counts() of driver.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nsat = df[df["day"] == "Sat"]\nprint(sat["driver"].value_counts())\n',
        hint: 'Make sat, then print(sat["driver"].value_counts()).',
        checks: [
          { message: 'Show all six drivers, including Kiprop', outputIncludes: 'Kiprop' },
          { message: 'Filter to Saturday', codeIncludes: '"Sat"' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Every day except Saturday.',
        template: 'df[df["day"] [[1]] "Sat"]',
        blanks: [['!=']],
        distractors: ['==', '<>'],
        language: 'python',
      },
      {
        kind: 'findBug',
        prompt: 'Which line won\'t work?',
        lines: ['sat = df[df["day"] == "Sat"]', 'late_sat = sat[sat["late"] == "yes"]', 'big = df[df["distance_km"] => 250]'],
        bug: 2,
        fix: 'big = df[df["distance_km"] >= 250]',
        explanation: 'Python writes "at least" as >=, never =>.',
        language: 'python',
      },
      {
        kind: 'writeCode',
        prompt: 'How many orders were placed from 2 p.m. (hour 14) onwards? Filter with >= 14 and print len().',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(len(df[df["hour"] >= 14]))\n',
        hint: 'len(df[df["hour"] >= 14])',
        checks: [
          { message: 'Print 157', outputEquals: '157' },
          { message: 'Use >=', codeIncludes: '>=' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Saturday is late at every depot, with every driver. What does that tell you?',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'That all six drivers are bad.', why: 'If everyone fails the same way, look at the system, not the people.' },
          { text: 'That something about how Saturdays work is the problem, not one person. I need someone who knows the depots.' },
          { text: 'Nothing.', why: 'It tells her a lot: it\'s widespread.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which filter keeps it?',
        groups: ['df["day"] == "Sat"', 'df["hour"] >= 14'],
        items: [
          { text: 'A Saturday order at 9 a.m.', group: 0 },
          { text: 'A Tuesday order at 3 p.m.', group: 1 },
          { text: 'A Saturday order at 10 a.m.', group: 0 },
          { text: 'A Monday order at hour 16', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many Saturday deliveries were there in March?',
        answers: ['62'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: '"If everyone fails the same way, look at the system." Where have you seen people blamed for a problem the system created?',
    starters: ['People were blamed for...', 'The system problem was...'],
  },
  deepen: {
    title: 'Systems, not people',
    summary: 'W. Edwards Deming, the quality expert, argued that most problems at work come from the system, not the people in it. Look up his "red bead experiment".',
  },
  notes: 'deliveries_clean.csv: 62 Saturday deliveries, 54 late; Nairobi depot 30 of them; all six drivers worked Saturdays. 157 orders from hour 14. Deming\'s red bead experiment: Deming, Out of the Crisis (1986) / The New Economics (1993); his "94% of problems belong to the system" claim is widely quoted, so the lesson uses the softer "most problems".',
};

export default lesson;
