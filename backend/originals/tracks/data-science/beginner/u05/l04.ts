import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 4. Story: "is it getting worse?" A simple trend by week (dates) and by distance band (pd.cut). */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Is it getting worse?',
  summary: 'Kamau week. Mrs Achieng has sat through 25 years of these meetings. "He always asks one question you didn\'t prepare for. Usually: is it getting worse?" Zanele checks the trend across March\'s four weeks, and the trend across distance.',
  minutes: 12,
  outcomes: [
    'Turn text dates into real dates with pd.to_datetime()',
    'Check a trend over time by grouping by week',
    'Group numbers into bands with pd.cut()',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'A trend is how something changes along an order: over time, or as something grows. First, time. The date column is text. pd.to_datetime() turns it into real dates, and .dt.isocalendar().week gives each date\'s week number.', replies: ['And then?'] },
        { tey: 'Group by week. March 2026: weeks 10 to 13, 100 deliveries each. Late rate: 33%, 35%, 33%, 34%. Flat. Not getting worse, not getting better. It\'s built into how the depots work.', replies: ['What about distance?'] },
        { tey: 'pd.cut() sorts numbers into bands. Cut distance at 60 and 250 km: short, medium, long. Average days: 1.47, 2.45, 3.83. That one\'s a clear trend: further means slower.', replies: ['Why does a flat trend matter?'] },
        { tey: 'Because it means the problem won\'t fix itself. And it rules out "something went wrong in week 3". A steady problem points to a rule, like a 2 p.m. truck.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Two trends',
      code: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\ndf["week"] = pd.to_datetime(df["date"]).dt.isocalendar().week\nprint(df.groupby("week")["is_late"].mean().round(2))\n\ndf["band"] = pd.cut(df["distance_km"], [0, 60, 250, 500], labels=["short", "medium", "long"])\nprint(df.groupby("band", observed=True)["actual_days"].mean().round(2))\n',
      caption: 'Press Run. Flat over the weeks, rising with distance. observed=True just tells pandas to skip empty bands.',
      challenge: 'Group the bands by is_late instead of actual_days. Which band is late most often?',
    },
  ],
  apply: {
    scenario: 'The question nobody prepared for.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Add a week column from the dates and print the late rate by week, rounded to 2.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\ndf["week"] = pd.to_datetime(df["date"]).dt.isocalendar().week\nprint(df.groupby("week")["is_late"].mean().round(2))\n',
        hint: 'df["week"] = pd.to_datetime(df["date"]).dt.isocalendar().week',
        checks: [
          { message: 'Show week 11 at 0.35', outputIncludes: '11 0.35' },
          { message: 'Use pd.to_datetime', codeIncludes: 'to_datetime(' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Late rate by week: 33%, 35%, 33%, 34%. What should Zanele tell Kamau?',
        options: [
          { text: 'It\'s steady: not getting worse, and it won\'t fix itself' },
          { text: 'It\'s getting worse', why: 'It goes up and down by a point or two: flat.' },
          { text: 'Week 2 is the problem', why: '35% vs 33% is noise.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to what it does.',
        pairs: [
          ['pd.to_datetime()', 'Turns text into real dates'],
          ['.dt.isocalendar().week', 'Gives each date\'s week number'],
          ['pd.cut()', 'Sorts numbers into bands'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Cut distance into bands at 0, 60, 250 and 500 km (labels short, medium, long). Print the mean actual_days per band, rounded to 2.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["band"] = pd.cut(df["distance_km"], [0, 60, 250, 500], labels=["short", "medium", "long"])\nprint(df.groupby("band", observed=True)["actual_days"].mean().round(2))\n',
        hint: 'pd.cut(df["distance_km"], [0, 60, 250, 500], labels=["short", "medium", "long"])',
        checks: [
          { message: 'Show long 3.83', outputIncludes: 'long 3.83' },
          { message: 'Use pd.cut', codeIncludes: 'pd.cut(' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Text dates into real dates.',
        template: 'pd.[[1]](df["date"])',
        blanks: [['to_datetime']],
        distractors: ['to_date', 'datetime'],
        language: 'python',
      },
      {
        kind: 'sortGroups',
        prompt: 'Trend or no trend?',
        groups: ['Clear trend', 'Flat'],
        items: [
          { text: 'Days by distance band: 1.47, 2.45, 3.83', group: 0 },
          { text: 'Late rate by week: 33%, 35%, 33%, 34%', group: 1 },
          { text: 'Deliveries per week: 100, 100, 100, 100', group: 1 },
          { text: 'Late rate, short vs long routes: 25%, 56%', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'achieng',
        message: 'He always asks one question you didn\'t prepare for. Usually: is it getting worse?',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'Then I\'ll say it is, to make it urgent.', why: 'It isn\'t. Kamau will find out.' },
          { text: 'Now I have an answer: it\'s steady at about a third, every week. It won\'t fix itself, and nothing broke in one week. It\'s a rule.' },
          { text: 'I\'ll avoid the question.', why: 'Now she has a strong, honest answer.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line errors?',
        lines: ['dates = pd.to_datetime(df["date"])', 'df["week"] = dates.isocalendar().week', 'print(df.groupby("week").size())'],
        bug: 1,
        fix: 'df["week"] = dates.dt.isocalendar().week',
        explanation: 'Date tools on a column sit behind .dt, just as text tools sit behind .str.',
        language: 'python',
      },
      {
        kind: 'writeCode',
        prompt: 'How many deliveries per week? Add the week column and print df.groupby("week").size().',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["week"] = pd.to_datetime(df["date"]).dt.isocalendar().week\nprint(df.groupby("week").size())\n',
        hint: 'size() counts rows in each group.',
        checks: [
          { message: 'Show week 10 with 100', outputIncludes: '10 100' },
          { message: 'Use size()', codeIncludes: 'size()' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which pandas function sorts numbers into bands?',
        answers: ['cut', 'pd.cut', 'pd.cut()', 'cut()'],
        placeholder: 'Function',
      },
    ],
  },
  reflect: {
    prompt: 'Is something in your life getting better, worse, or staying flat? How would you check, instead of going on feel?',
    starters: ['I feel that...', 'I could check by...'],
  },
  deepen: {
    title: 'Trends need time',
    summary: 'Four weeks is a short window. Ask: what would a whole year show? Felix can export January and February too.',
  },
  notes: 'deliveries_clean.csv: dates 2026-03-02 to 2026-03-28 (Mon-Sat), ISO weeks 10-13, 100 deliveries each; late rate by week 0.33, 0.35, 0.33, 0.34. pd.cut bands (0,60], (60,250], (250,500]: mean actual_days 1.47, 2.45, 3.83. Mrs Achieng from Corporate Jargon.',
};

export default lesson;
