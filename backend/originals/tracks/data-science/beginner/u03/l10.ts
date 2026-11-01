import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10 — Unit Challenge. Friday: late rate by day. Saturday 87%. Emeka wants to replace Baraka. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: Saturday',
  summary: '3 weeks to Kamau. Friday afternoon. Emeka has drafted an email to HR about Baraka. Zanele asks for one hour. She groups the late rate by day of the week and stops. Saturday: 87% late. Every other day is under 50%.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Summarise a dataset with medians, spread, rates and groupby', 'Find the biggest gap between groups, with counts'],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 3:40 p.m.',
      beats: [
        { speaker: 'emeka', text: 'I\'ve drafted an email to HR about Baraka. I\'ll send it Monday.' },
        { speaker: 'zanele', text: 'Give me one hour.' },
        { speaker: 'narrator', text: 'She types df.groupby("day")["is_late"].mean(). Monday 19%. Tuesday 27%. Wednesday 15%. Thursday 14%. Friday 47%. Saturday 87%.' },
        { speaker: 'zanele', text: 'Emeka. Don\'t send that email. Not yet.' },
      ],
    },
  ],
  apply: {
    scenario: 'Unit Challenge: what\'s normal, and what isn\'t.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Make is_late, then print the late rate by day, rounded to 2 places.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nprint(df.groupby("day")["is_late"].mean().round(2))\n',
        hint: 'is_late first, then groupby("day")["is_late"].mean().round(2).',
        checks: [
          { message: 'Show Sat 0.87', outputIncludes: 'Sat 0.87' },
          { message: 'Use groupby', codeIncludes: 'groupby(' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Saturday is 87% late, from 62 deliveries. How solid is that?',
        options: [
          { text: 'Meaningless, like Auma\'s 6 trips', why: '62 is ten times bigger, and 87% vs under 50% is a giant gap.' },
          { text: 'Proof that Saturday causes lateness', why: 'It\'s a strong pattern. The cause comes next.' },
          { text: 'Fairly solid: 62 is a decent group and the gap is huge' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print count and rate by day with agg(["sum", "count", "mean"]), rounded to 2.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nprint(df.groupby("day")["is_late"].agg(["sum", "count", "mean"]).round(2))\n',
        hint: 'agg(["sum", "count", "mean"]).round(2)',
        checks: [
          { message: 'Show Friday: 32 late of 68', outputIncludes: 'Fri 32 68' },
          { message: 'Use agg()', codeIncludes: 'agg(' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the day to its late rate.',
        pairs: [
          ['Saturday', '87%'],
          ['Friday', '47%'],
          ['Monday', '19%'],
          ['Thursday', '14%'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which tool answers it?',
        groups: ['median()', 'groupby()', 'quantile()'],
        items: [
          { text: 'A typical delivery time, ignoring a typo', group: 0 },
          { text: 'Late rate for each driver', group: 1 },
          { text: 'Where the middle half of distances sit', group: 2 },
          { text: 'Late rate for each day', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line errors?',
        lines: ['df["is_late"] = df["late"] == "yes"', 'by_day = df.groupby("day")["is_late"].mean', 'print(by_day.round(2))'],
        bug: 1,
        fix: 'by_day = df.groupby("day")["is_late"].mean()',
        explanation: 'mean needs its brackets to run.',
        language: 'python',
      },
      {
        kind: 'writeCode',
        prompt: 'Print the median distance and the median actual_days on two lines.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(df["distance_km"].median())\nprint(df["actual_days"].median())\n',
        hint: 'Two prints, each with .median().',
        checks: [
          { message: 'Print 130.0', outputIncludes: '130.0' },
          { message: 'Print 2.0', outputIncludes: '2.0' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emeka',
        message: 'Saturday? What does Saturday have to do with Baraka?',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'Maybe nothing. Maybe everything. Next week I compare like with like. Until then, please hold the email.' },
          { text: 'Nothing, Baraka is still the problem.', why: 'She doesn\'t know yet. That\'s why she asked for time.' },
          { text: 'Saturday is the problem, not Baraka.', why: 'Too fast: that\'s a new guess, not a finding.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Rate with its count.',
        template: 'df.groupby("day")["is_late"].agg(["[[1]]", "[[2]]"])',
        blanks: [['mean'], ['count']],
        distractors: ['median', 'max'],
        language: 'python',
      },
      {
        kind: 'orderLines',
        prompt: 'Put this week in order.',
        lines: ['Mean vs median', 'Spread and quartiles', 'Outliers', 'Rates from True/False', 'groupby by driver', 'Counts vs rates', 'Small groups', 'groupby by day'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'import pandas as pd\nprint(pd.Series([1, 2, 2, 3, 6]).median())',
        language: 'python',
        options: [
          { text: '2.8', why: 'That\'s the mean.' },
          { text: '2.0' },
          { text: '6', why: 'That\'s the max.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which day had the highest late rate? (three letters, as in the data)',
        answers: ['Sat', 'Saturday'],
        placeholder: 'Day',
      },
    ],
  },
  reflect: {
    prompt: 'Emeka was a weekend away from emailing HR. What would have happened to Baraka if nobody had asked for one more hour?',
    starters: ['Baraka would have...', 'One more hour gave...'],
  },
  deepen: {
    title: 'Next week: patterns',
    summary: 'Baraka is 60% late. Saturday is 87% late. Before next chapter, guess: how might those two facts be connected?',
  },
  notes: 'Unit Challenge for Chapter 3. deliveries_clean.csv late rate by day: Mon 0.19 (13/68), Tue 0.27 (14/52), Wed 0.15 (13/84), Thu 0.14 (9/66), Fri 0.47 (32/68), Sat 0.87 (54/62). Medians: distance 130, actual_days 2.',
};

export default lesson;
