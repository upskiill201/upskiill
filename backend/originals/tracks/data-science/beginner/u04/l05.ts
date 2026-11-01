import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 5 — Checkpoint. Reviews lessons 1–4: sorting, filtering, two conditions, like with like. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the deleted email',
  summary: '2 weeks to Kamau. Wednesday. Emeka forwards Zanele a screenshot: "Draft deleted." Then a second message: "Baraka says thank you. He doesn\'t know what for. I didn\'t explain." Quick check before correlation.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Sort and filter with one or two conditions without notes', 'Compare groups like with like'],
  learn: [
    {
      kind: 'story',
      title: 'Wednesday, 2:15 p.m.',
      beats: [
        { speaker: 'emeka', text: '(screenshot) Draft deleted. Also: Baraka says thank you. He doesn\'t know what for. I didn\'t explain.' },
        { speaker: 'zanele', text: 'Good. Now I need to prove the weekend thing properly. Nine days left.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: sorting, filtering, comparing.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the number of Saturday deliveries that were late: filter day == "Sat" AND late == "yes", then len().',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(len(df[(df["day"] == "Sat") & (df["late"] == "yes")]))\n',
        hint: 'Two conditions in brackets, joined with &.',
        checks: [
          { message: 'Print 54', outputEquals: '54' },
          { message: 'Use &', codeIncludes: '&' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which filter keeps Friday orders placed before 2 p.m.?',
        options: [
          { text: 'df[(df["day"] == "Fri") & (df["hour"] < 14)]' },
          { text: 'df[(df["day"] == "Fri") | (df["hour"] < 14)]', why: '| means or: it keeps every morning order on every day too.' },
          { text: 'df[df["day"] == "Fri" & df["hour"] < 14]', why: 'Missing brackets: this errors.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put a fair comparison in order.',
        lines: ['Notice the groups differ in something else', 'Filter to a matching slice', 'Compare rates inside the slice', 'Report the counts too'],
      },
      {
        kind: 'writeCode',
        prompt: 'Sort the late rate by day, highest first, rounded to 2.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nprint(df.groupby("day")["is_late"].mean().sort_values(ascending=False).round(2))\n',
        hint: 'groupby("day")["is_late"].mean().sort_values(ascending=False).round(2)',
        checks: [
          { message: 'Show Sat 0.87', outputIncludes: 'Sat 0.87' },
          { message: 'Sort it', codeIncludes: 'sort_values(' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to what it keeps.',
        pairs: [
          ['df[df["day"] != "Sat"]', 'Every day except Saturday'],
          ['df[df["hour"] >= 14]', 'Orders from 2 p.m.'],
          ['df[df["distance_km"] > 250]', 'Long routes'],
          ['df[(df["day"] == "Sat") | (df["day"] == "Fri")]', 'Fridays and Saturdays'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line errors?',
        lines: ['sat = df[df["day"] == "Sat"]', 'pm = df[(df["day"] == "Fri") & (df["hour"] >= 14)]', 'both = df[(df["day"] == "Sat") or (df["hour"] >= 14)]'],
        bug: 2,
        fix: 'both = df[(df["day"] == "Sat") | (df["hour"] >= 14)]',
        explanation: 'In pandas filters, "or" is |, and "and" is &. The words and/or don\'t work on whole columns.',
        language: 'python',
      },
      {
        kind: 'writeCode',
        prompt: 'Friday before 2 p.m.: print the late rate, rounded to 2.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nearly = df[(df["day"] == "Fri") & (df["hour"] < 14)]\nprint(round(early["is_late"].mean(), 2))\n',
        hint: 'Filter with & and hour < 14, then round the mean.',
        checks: [
          { message: 'Print 0.24', outputIncludes: '0.24' },
          { message: 'Use < 14', codeIncludes: '< 14' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Mostly late, or mostly on time?',
        groups: ['Mostly late', 'Mostly on time'],
        items: [
          { text: 'Friday from 2 p.m. (91%)', group: 0 },
          { text: 'Friday before 2 p.m. (24%)', group: 1 },
          { text: 'Saturday (87%)', group: 0 },
          { text: 'Short routes (25%)', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Can we say "it\'s not Baraka" in the presentation?',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'Yes: Baraka is innocent.', why: 'Too strong: he\'s a bit higher on long routes.' },
          { text: 'Let\'s not name drivers at all. We say: long routes and weekend orders are late, whoever drives.' },
          { text: 'No, let\'s not mention it.', why: 'Kamau has probably heard the rumour. Address the routes.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Saturday or Friday.',
        template: '(df["day"] == "Sat") [[1]] (df["day"] == "Fri")',
        blanks: [['|']],
        distractors: ['&', 'or'],
        language: 'python',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'import pandas as pd\ns = pd.Series([3, 1, 2])\nprint(list(s.sort_values(ascending=False)))',
        language: 'python',
        options: [
          { text: '[1, 2, 3]', why: 'ascending=False puts the biggest first.' },
          { text: '[3, 1, 2]', why: 'sort_values() sorts.' },
          { text: '[3, 2, 1]' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In a pandas filter, | means "or". What does & mean?',
        answers: ['and'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Baraka almost lost his job over an unfair comparison and never knew. Where else might an unfair comparison quietly hurt someone?',
    starters: ['An unfair comparison could...', 'To catch it I\'d...'],
  },
  notes: 'Checkpoint for Chapter 4 lessons 1-4. deliveries_clean.csv: Saturday late 54; Friday before 14: 0.24; Fri from 14: 0.91; short routes 0.25.',
};

export default lesson;
