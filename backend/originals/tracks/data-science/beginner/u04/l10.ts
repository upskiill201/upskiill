import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 10 — Unit Challenge. Friday: the weekend hold. 88% vs 19%; 56% of all late deliveries. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the weekend hold',
  summary: '2 weeks to Kamau. Friday, Emeka\'s deadline. Zanele puts the whole pattern into one table: orders that miss the Friday 2 p.m. truck or arrive on Saturday are late 88% of the time. Every other order: 19%. And those weekend orders are more than half of all late deliveries.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build a grouping column from two conditions and compare the groups', 'Work out what share of a problem one group explains'],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 4:00 p.m., on a video call',
      beats: [
        { speaker: 'zanele', text: 'Orders after the Friday 2 p.m. truck, or on Saturday, wait until Monday. I call it the weekend hold. 85 orders in March. 75 of them were late: 88%. Everything else: 19%.' },
        { speaker: 'emeka', text: 'And it\'s the same at every depot?' },
        { speaker: 'zanele', text: 'Every depot, every driver. And those 75 are more than half of all 135 late deliveries.' },
        { speaker: 'emeka', text: '(unmuted, for once) That\'s it then. Oh, and trucks are late 57% of the time, I just checked. So we buy new trucks too?' },
        { speaker: 'zanele', text: '...Let\'s talk about the trucks on Monday.' },
      ],
    },
  ],
  apply: {
    scenario: 'Unit Challenge: the whole pattern.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'From scratch: make is_late and weekend (Friday from hour 14, or Saturday). Print the late rate for each weekend group, rounded to 2.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\ndf["weekend"] = ((df["day"] == "Fri") & (df["hour"] >= 14)) | (df["day"] == "Sat")\nprint(df.groupby("weekend")["is_late"].mean().round(2))\n',
        hint: 'Two new columns, then groupby("weekend")["is_late"].mean().round(2).',
        checks: [
          { message: 'Show True 0.88', outputIncludes: 'True 0.88' },
          { message: 'Show False 0.19', outputIncludes: 'False 0.19' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Weekend-hold orders: 88% late. Others: 19%. What\'s the honest headline?',
        options: [
          { text: 'Orders that wait over the weekend are late most of the time, and they\'re over half of all late deliveries' },
          { text: 'Weekends cause all late deliveries', why: '60 late deliveries were not weekend holds.' },
          { text: 'Drivers are lazy at weekends', why: 'The orders aren\'t moving: the depot doesn\'t dispatch on Sunday.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Of all late deliveries, how many were weekend holds? Filter is_late AND weekend, print len().',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\ndf["weekend"] = ((df["day"] == "Fri") & (df["hour"] >= 14)) | (df["day"] == "Sat")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\ndf["weekend"] = ((df["day"] == "Fri") & (df["hour"] >= 14)) | (df["day"] == "Sat")\nprint(len(df[df["is_late"] & df["weekend"]]))\n',
        hint: 'df[df["is_late"] & df["weekend"]]: both are already True/False columns.',
        checks: [
          { message: 'Print 75', outputEquals: '75' },
          { message: 'Use &', codeIncludes: '&' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The weekend hold.',
        template: '((df["day"] == "Fri") [[1]] (df["hour"] >= 14)) [[2]] (df["day"] == "Sat")',
        blanks: [['&'], ['|']],
        distractors: ['and', 'or'],
        language: 'python',
      },
      {
        kind: 'writeCode',
        prompt: 'What share of late deliveries are weekend holds? Print 75 / 135 rounded to 2, worked out in code: the late-and-weekend count divided by the late count.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\ndf["weekend"] = ((df["day"] == "Fri") & (df["hour"] >= 14)) | (df["day"] == "Sat")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\ndf["weekend"] = ((df["day"] == "Fri") & (df["hour"] >= 14)) | (df["day"] == "Sat")\nboth = len(df[df["is_late"] & df["weekend"]])\nprint(round(both / df["is_late"].sum(), 2))\n',
        hint: 'both = len(df[df["is_late"] & df["weekend"]]), then both / df["is_late"].sum().',
        checks: [
          { message: 'Print 0.56', outputIncludes: '0.56' },
          { message: 'Work it out from the data', codeIncludes: 'sum()' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put this week\'s detective work in order.',
        lines: ['Sort: the slowest are Fridays and Saturdays', 'Filter: Saturday is late everywhere', 'Two conditions: the 2 p.m. truck', 'Like with like: Baraka\'s routes', 'One layer down: every depot', 'The weekend hold: 88% vs 19%'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the group to its numbers.',
        pairs: [
          ['Weekend hold', '75 late of 85'],
          ['Everything else', '60 late of 315'],
          ['All deliveries', '135 late of 400'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line errors?',
        lines: [
          'df["is_late"] = df["late"] == "yes"',
          'df["weekend"] = (df["day"] == "Fri") & (df["hour"] >= 14) | (df["day"] == "Sat")',
          'print(df.groupby("weekend")["is_late"].mean)',
        ],
        bug: 2,
        fix: 'print(df.groupby("weekend")["is_late"].mean())',
        explanation: 'mean needs its brackets to run.',
        language: 'python',
      },
      {
        kind: 'chatReply',
        from: 'emeka',
        message: 'Trucks are late 57% of the time. So we buy new trucks too?',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'Yes, great idea.', why: 'Trucks only do the long routes. New trucks wouldn\'t shorten the roads.' },
          { text: 'Trucks are the long routes: anything over 250 km. Before we buy anything, let\'s check whether it\'s the truck or the distance.' },
          { text: 'Trucks don\'t matter.', why: 'She doesn\'t know that yet either.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Weekend hold, or not?',
        groups: ['Weekend hold', 'Not'],
        items: [
          { text: 'Friday, hour 15', group: 0 },
          { text: 'Saturday, hour 9', group: 0 },
          { text: 'Friday, hour 11', group: 1 },
          { text: 'Thursday, hour 17', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'import pandas as pd\nlate = pd.Series([True, True, False])\nweekend = pd.Series([True, False, False])\nprint((late & weekend).sum())',
        language: 'python',
        options: [
          { text: '2', why: 'Only the first row is True in both.' },
          { text: '3', why: 'That\'s how many rows there are.' },
          { text: '1' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What share of weekend-hold orders were late? (a percentage)',
        answers: ['88', '88%', '0.88', '88 percent'],
        placeholder: 'Percent',
      },
    ],
  },
  reflect: {
    prompt: 'The answer came from Mrs Achieng\'s unwritten rule plus Zanele\'s data. Why do you think it needed both?',
    starters: ['The data alone...', 'The rule alone...'],
  },
  deepen: {
    title: 'Next week: the answer',
    summary: 'Emeka wants new trucks. Before next chapter: what else is different about deliveries that go by truck?',
  },
  notes: 'Unit Challenge for Chapter 4. deliveries_clean.csv weekend hold ((Fri & hour >= 14) | Sat): 85 orders, 75 late (0.88); others 315, 60 late (0.19); 75/135 = 0.556 of late deliveries. Trucks: 108, late 0.565; every truck trip is > 250 km in the generator (vehicle = Truck if km > 250). Sets up Chapter 5 (correlation is not causation).',
};

export default lesson;
