import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 8. Story: the limits slide. One month, 400 rows, an estimate; checking the data's coverage in code. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'What we don\'t know',
  summary: 'Kamau week. Zanele adds a slide Remi wants to delete: "What we don\'t know." One month of data. An estimate built on an "if". Long routes still late on weekdays. Remi thinks it makes them look weak. Brian thinks it\'s the strongest slide.',
  minutes: 11,
  outcomes: [
    'List the limits of an analysis honestly',
    'Check what your data covers: dates, days, counts',
    'Turn a limit into a next step',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Every analysis has limits. Saying them out loud doesn\'t weaken your answer: it shows you know exactly how far it goes, and it stops someone else finding them for you in the meeting. Zanele\'s list: <strong>one month</strong> of data (2 to 28 March, 24 working days). The 19% is an <strong>estimate</strong> that assumes weekend orders are otherwise like the rest. And <strong>long routes</strong> are still late 47% of the time on weekdays: a second, smaller problem.</p>',
    },
    {
      kind: 'text',
      html: '<p>Each limit becomes a next step. One month: ask Felix for January and February. The estimate: test it with a pilot, for example Saturday dispatch at one depot, and measure. Long routes: look at whether 3 days is a realistic promise for 300 km or more. That\'s the difference between "we don\'t know" and "here\'s how we\'ll find out".</p>',
    },
    {
      kind: 'tryIt',
      title: 'What does the data cover?',
      code: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\ndf["weekend"] = ((df["day"] == "Fri") & (df["hour"] >= 14)) | (df["day"] == "Sat")\nprint(df["date"].min(), "to", df["date"].max())\nprint(df["date"].nunique(), "days")\n\nweekday_long = df[~df["weekend"] & (df["distance_km"] > 250)]\nprint("weekday long routes late:", round(weekday_long["is_late"].mean(), 2))\n',
      caption: 'Press Run. Dates written as year-month-day sort correctly as text, so min() and max() work.',
      challenge: 'How many weekday short routes were late? Is that a problem worth a slide?',
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'remi', text: 'A slide called "What we don\'t know"? He\'ll think we didn\'t finish.' },
        { speaker: 'brian', text: 'He\'ll think you\'re the first people who told him the truth about a number. Keep it.' },
      ],
    },
  ],
  apply: {
    scenario: 'The limits slide.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the first and last date in the data with min() and max().',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(df["date"].min(), df["date"].max())\n',
        hint: 'print(df["date"].min(), df["date"].max())',
        checks: [
          { message: 'Show 2026-03-02', outputIncludes: '2026-03-02' },
          { message: 'Show 2026-03-28', outputIncludes: '2026-03-28' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why keep the "What we don\'t know" slide?',
        options: [
          { text: 'To fill time', why: 'Every slide should earn its place. This one does.' },
          { text: 'It doesn\'t help, remove it', why: 'Brian, who knows Kamau, says it\'s the strongest slide.' },
          { text: 'It shows how far the answer goes, before anyone else has to find the gaps' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each limit to its next step.',
        pairs: [
          ['Only one month of data', 'Ask Felix for January and February'],
          ['The 19% is an estimate', 'Run a Saturday dispatch pilot'],
          ['Long routes late on weekdays', 'Check if 3-day promises are realistic'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'How many different dates are in the data? Print nunique() of the date column.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(df["date"].nunique())\n',
        hint: 'print(df["date"].nunique())',
        checks: [
          { message: 'Print 24', outputEquals: '24' },
          { message: 'Use nunique()', codeIncludes: 'nunique()' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest limit, or false modesty?',
        groups: ['Honest limit', 'Not needed'],
        items: [
          { text: 'We only have March', group: 0 },
          { text: 'We\'re not real data scientists', group: 1 },
          { text: 'The 19% assumes weekend orders are otherwise similar', group: 0 },
          { text: 'Maybe none of this is true', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Weekday long routes: filter NOT weekend AND distance over 250, and print the late rate, rounded to 2.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\ndf["weekend"] = ((df["day"] == "Fri") & (df["hour"] >= 14)) | (df["day"] == "Sat")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\ndf["weekend"] = ((df["day"] == "Fri") & (df["hour"] >= 14)) | (df["day"] == "Sat")\nweekday_long = df[~df["weekend"] & (df["distance_km"] > 250)]\nprint(round(weekday_long["is_late"].mean(), 2))\n',
        hint: 'df[~df["weekend"] & (df["distance_km"] > 250)]',
        checks: [
          { message: 'Print 0.47', outputIncludes: '0.47' },
          { message: 'Use ~ and &', codeIncludes: '~' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'He\'ll think we didn\'t finish.',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'You\'re right, I\'ll delete it.', why: 'Kamau will ask anyway. Better to answer first.' },
          { text: 'We finished the question we were asked. This slide says what we\'d check next, so he can decide what to fund.' },
          { text: 'I don\'t care what he thinks.', why: 'She does, and it\'s her best slide.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which limit is badly written?',
        lines: ['Data covers 2 to 28 March 2026 only.', 'The 19% estimate assumes the weekend wait is the only difference.', 'There might be problems with the data, somewhere.'],
        bug: 2,
        fix: '7 rows were filled from paper sheets; all are logged.',
        explanation: 'A vague worry helps nobody. Name the specific limit, or leave it out.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Turn a limit into a step.',
        template: 'Not "we don\'t know", but "here\'s how we\'ll [[1]] [[2]]".',
        blanks: [['find'], ['out']],
        distractors: ['guess', 'hope'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many working days does the March data cover?',
        answers: ['24'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'When someone told you the limits of what they knew, did you trust them more or less? Why?',
    starters: ['I trusted them more when...', 'Saying "I don\'t know" is hard because...'],
  },
  deepen: {
    title: 'A limits list',
    summary: 'For anything you\'re presenting soon, write three limits and a next step for each. Notice how much stronger the rest feels.',
  },
  notes: 'deliveries_clean.csv: dates 2026-03-02 to 2026-03-28, 24 distinct dates (Mon-Sat, 4 weeks); weekday long routes (not weekend hold, > 250 km) late 0.47 (87 trips); weekday short routes 0.08. Felix filled 7 rows from paper (u02 l10).',
};

export default lesson;
