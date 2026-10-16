import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 1. Story: Emeka holds the email; the slowest deliveries are Fridays and Saturdays. sort_values(). */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Slowest first',
  summary: '2 weeks to Kamau. Emeka has held the email, for now. "You have until Friday." Zanele starts the week by sorting: the slowest deliveries first, the worst rates first. The top of every list says Friday or Saturday.',
  minutes: 11,
  outcomes: [
    'Sort a table with sort_values()',
    'Sort biggest first with ascending=False',
    'Sort the result of a groupby',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Monday, 8:15 a.m.',
      beats: [
        { speaker: 'emeka', text: 'I haven\'t sent it. You have until Friday. Then I need an answer for the depot managers.' },
        { speaker: 'zanele', text: 'Deal. First question: what do the very slowest deliveries have in common?' },
        { speaker: 'narrator', text: 'She sorts by actual_days, slowest first. The top three: D1206, Saturday. D1365, Saturday. D1284, Friday.' },
      ],
      choice: {
        prompt: 'Three slow ones are Friday or Saturday. What next?',
        options: [
          {
            text: 'Check whether that holds for all deliveries, not just the top three.',
            outcome: 'Three rows is an anecdote. She already has the day rates from last week: Saturday 87%, Friday 47%. The pattern is real. Now: why?',
            best: true,
          },
          {
            text: 'Announce that weekends are the problem.',
            outcome: 'From three rows? Kamau would ask "how many is that?", and she\'d have to say three.',
          },
          {
            text: 'Ignore it: Baraka is still the main suspect.',
            outcome: 'Holding on to the first suspect is exactly how Emeka nearly emailed HR.',
          },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Slowest deliveries first',
      code: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nslow = df.sort_values("actual_days", ascending=False)\nprint(slow[["delivery_id", "day", "hour", "actual_days"]].head(10))\n',
      caption: 'Press Run. ascending=False puts the biggest first. Count the Fridays and Saturdays in the top 10.',
      challenge: 'Sort by distance_km instead. Who drove the single longest trip?',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'sort_values() works on groupby results too: df.groupby("driver")["is_late"].mean().sort_values(ascending=False) lists the drivers worst first.',
    },
  ],
  apply: {
    scenario: 'Sorting to see what\'s at the top.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Sort by actual_days, slowest first, and print the first 3 rows.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(df.sort_values("actual_days", ascending=False).head(3))\n',
        hint: 'df.sort_values("actual_days", ascending=False).head(3)',
        checks: [
          { message: 'Show D1206 at the top', outputIncludes: 'D1206' },
          { message: 'Sort biggest first', codeIncludes: 'ascending=False' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does ascending=False do?',
        options: [
          { text: 'Removes the sort', why: 'It sorts, just the other way round.' },
          { text: 'Puts the biggest values first' },
          { text: 'Sorts alphabetically', why: 'On numbers it sorts by size.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Longest trips first.',
        template: 'df.[[1]]("distance_km", ascending=[[2]])',
        blanks: [['sort_values'], ['False']],
        distractors: ['sort', 'True'],
        language: 'python',
      },
      {
        kind: 'writeCode',
        prompt: 'Who drove the longest trip? Sort by distance_km, biggest first, and print the first row\'s driver with .head(1).',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(df.sort_values("distance_km", ascending=False).head(1)[["delivery_id", "driver", "distance_km"]])\n',
        hint: 'Sort, .head(1), then pick the columns you want with [["delivery_id", "driver", "distance_km"]].',
        checks: [
          { message: 'Show Auma', outputIncludes: 'Auma' },
          { message: 'Show 495 km', outputIncludes: '495' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Evidence, or just an anecdote?',
        groups: ['Evidence', 'Anecdote'],
        items: [
          { text: 'The top 3 slowest are Friday or Saturday', group: 1 },
          { text: 'Saturday: 54 of 62 late', group: 0 },
          { text: 'Emeka remembers a bad Saturday', group: 1 },
          { text: 'Friday: 32 of 68 late', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'List drivers by late rate, worst first: groupby, mean, then sort_values(ascending=False). Round to 2.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nprint(df.groupby("driver")["is_late"].mean().sort_values(ascending=False).round(2))\n',
        hint: 'Add .sort_values(ascending=False) after .mean().',
        checks: [
          { message: 'Show Baraka 0.6', outputIncludes: 'Baraka 0.6' },
          { message: 'Show Juma 0.2', outputIncludes: 'Juma 0.2' },
          { message: 'Use sort_values', codeIncludes: 'sort_values(' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emeka',
        message: 'You have until Friday. Then I need an answer for the depot managers.',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'I need a month.', why: 'Kamau is in two weeks. Friday is fair.' },
          { text: 'It\'s definitely not Baraka.', why: 'She doesn\'t know that yet.' },
          { text: 'Friday works. And if the answer isn\'t Baraka, I\'ll show you exactly why.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line errors?',
        lines: ['df = pd.read_csv("deliveries_clean.csv")', 'slow = df.sort_values(actual_days)', 'print(slow.head())'],
        bug: 1,
        fix: 'slow = df.sort_values("actual_days")',
        explanation: 'The column name is text: it needs quotes.',
        language: 'python',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build: the 5 shortest trips.',
        tiles: ['df', '.sort_values("distance_km")', '.head(5)'],
        distractors: ['.sort("distance_km")'],
        language: 'python',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Without ascending=False, does sort_values() put the smallest or biggest first?',
        answers: ['smallest', 'the smallest', 'small'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Sorting puts extremes at the top. When might the top of a list mislead you (the three worst reviews, the three best days)?',
    starters: ['The top of the list...', 'I\'d also check...'],
  },
  deepen: {
    title: 'Sort everything',
    summary: 'In the Try it card, sort by hour, then by promised_days. What sits at the top of each?',
  },
  notes: 'deliveries_clean.csv sorted by actual_days desc: D1206 (Sat, 6), D1365 (Sat, 6), D1284 (Fri, 6). Longest trip: D1232, Auma, 495 km. Driver late rates sorted: Baraka 0.60, Auma 0.38, Wanjiru 0.36, Kiprop 0.23, Mwangi 0.22, Juma 0.20.',
};

export default lesson;
