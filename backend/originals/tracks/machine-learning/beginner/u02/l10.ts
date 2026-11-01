import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9: picking, filtering, value_counts, groupby. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: asking the table',
  summary: 'Halima can pick a column, filter rows, count values and compare groups. Bisi\'s reminder hunch now has a number behind it. Quick check before the messy part: cleaning.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Pick, filter, count and group without notes', 'Read a group rate correctly'],
  learn: [
    {
      kind: 'story',
      title: 'Four answers',
      beats: [
        { speaker: 'narrator', text: 'In one afternoon: the longest wait (45 days), the bookings matching the sticky note (151), how often people miss (18.3%), and the reminder gap (26.2% vs 12.4%).' },
        { speaker: 'bisi', text: 'I\'ve been saying that about reminders for two years.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: asking the table questions.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Count the bookings with no reminder (sms_reminder == 0)',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\nprint(len(df[df["sms_reminder"] == 0]))\n',
        hint: 'len(df[df["sms_reminder"] == 0])',
        checks: [{ message: 'Print 1018', outputEquals: '1018' }],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the no-show rate for each clinic, rounded to 3 places',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\nprint(df.groupby("clinic")["no_show"].mean().round(3))\n',
        hint: 'groupby("clinic")["no_show"].mean()',
        checks: [
          { message: 'Show Gumel 0.373', outputIncludes: 'Gumel 0.373' },
          { message: 'Show Yaba 0.212', outputIncludes: 'Yaba 0.212' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which line keeps only the rainy days?',
        options: [
          { text: 'df[df["rain"] == 1]' },
          { text: 'df["rain"] == 1', why: 'That\'s just the True/False column. Put it inside df[ ].' },
          { text: 'df[df["rain"] = 1]', why: 'One = stores a value. Use == to compare.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to the tool.',
        pairs: [
          ['Longest wait?', '.max()'],
          ['Only Gumel\'s bookings?', 'df[df["clinic"] == "Gumel"]'],
          ['How many of each clinic?', 'value_counts()'],
          ['Rate per clinic?', 'groupby + mean'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line crashes?',
        language: 'python',
        lines: ['import pandas as pd', 'df = pd.read_csv("appointments.csv")', 'x = df[df["wait_days"] > 14 & df["rain"] == 1]', 'print(len(x))'],
        bug: 2,
        fix: 'x = df[(df["wait_days"] > 14) & (df["rain"] == 1)]',
        explanation: 'With &, each condition needs its own brackets.',
      },
      {
        kind: 'writeCode',
        prompt: 'Print the number of rainy-day bookings that were missed',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\nrainy = df[df["rain"] == 1]\nprint(rainy["no_show"].sum())\n',
        hint: 'Filter rainy days, then .sum() the no_show column',
        checks: [{ message: 'Print 129', outputEquals: '129' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Gives one number, or a number per group?',
        groups: ['One number', 'Per group'],
        items: [
          { text: 'df["no_show"].mean()', group: 0 },
          { text: 'df.groupby("rain")["no_show"].mean()', group: 1 },
          { text: 'len(df)', group: 0 },
          { text: 'df["clinic"].value_counts()', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Halima\'s rule as a filter.',
        language: 'python',
        template: 'df[(df["wait_days"] > 14) [[1]] (df["sms_reminder"] [[2]] 0)]',
        blanks: [['&'], ['==']],
        distractors: ['and', '='],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'Gumel has a 37% no-show rate! Close it?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'Yes, close it.', why: 'High no-shows is a reason to help, and 134 bookings is a small sample.' },
          { text: 'Gumel is rural: patients travel far and the rain hits harder. It needs more help, not closing. And it\'s only 134 bookings, so the rate is less certain.' },
          { text: '37% is normal everywhere.', why: 'The average is 18.3%. Gumel is very different.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the lines to get the no-show rate of long waits.',
        language: 'python',
        lines: ['import pandas as pd', 'df = pd.read_csv("appointments.csv")', 'long = df[df["wait_days"] > 14]', 'print(long["no_show"].mean())'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which clinic has the highest no-show rate?',
        answers: ['Gumel'],
        placeholder: 'A clinic',
      },
    ],
  },
  reflect: {
    prompt: 'Folake\'s first reaction to Gumel was to close it. How would you present a "bad" number so people respond with help instead of blame?',
    starters: ['I\'d say...', 'I\'d add...'],
  },
  notes: 'Checkpoint for Chapter 2 lessons 6-9. sms_reminder == 0: 2400 - 1382 = 1018. Rainy-day bookings 599; missed on rainy days = 0.215 x 599, checked by the solution run (129). Gumel 0.373, Yaba 0.212.',
};

export default lesson;
