import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6. Story: a late rate in one line. Comparisons make True/False; the mean of True/False is a rate. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'A rate in one line',
  summary: '3 weeks to Kamau. To compare groups, Zanele needs a late rate she can compute for any slice of the data. Tey shows her a trick data people use every day: the average of True and False is a percentage.',
  minutes: 11,
  outcomes: [
    'Turn yes/no into True/False with ==',
    'Get a count with sum() and a rate with mean()',
    'Add a new column to a table',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'You can\'t take the average of yes and no.',
          isFact: false,
          explain: 'Myth. Turn them into True and False first: df["late"] == "yes". Python treats True as 1 and False as 0, so the mean is the share of True: 0.3375.',
        },
        {
          text: 'df["late"] == "yes" changes the late column.',
          isFact: false,
          explain: 'Myth. It makes a new column of True/False, one per row, and leaves the original alone. Save it as a new column if you want to keep it.',
        },
        {
          text: 'The sum of True/False is a count; the mean is a rate.',
          isFact: true,
          explain: 'Fact. sum() gives 135 late deliveries; mean() gives 0.3375, the late rate. One column, two answers.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'From yes/no to a rate',
      code: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nprint(df[["late", "is_late"]].head())\nprint("late count", df["is_late"].sum())\nprint("late rate", df["is_late"].mean())\n',
      caption: 'Press Run. A new column, is_late, holds True or False. sum() counts the Trues, mean() gives the share.',
      challenge: 'Make a column is_truck = df["vehicle"] == "Truck" and print its mean. What share of deliveries go by truck?',
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'zanele', text: 'So the late rate for anything is just: pick the rows, take the mean of is_late.' },
        { speaker: 'remi', text: 'That sounds like it\'s about to become very useful.' },
      ],
    },
  ],
  apply: {
    scenario: 'A rate you can use anywhere.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Make a column is_late that is True when late is "yes". Print its mean.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nprint(df["is_late"].mean())\n',
        hint: 'df["is_late"] = df["late"] == "yes", then print(df["is_late"].mean()).',
        checks: [
          { message: 'Print 0.3375', outputIncludes: '0.3375' },
          { message: 'Make the is_late column', expr: '"is_late" in df.columns' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(True + True + False + True)',
        language: 'python',
        options: [
          { text: 'True', why: 'Adding True and False gives a number.' },
          { text: '3' },
          { text: '4', why: 'False counts as 0.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'True when the delivery was late.',
        template: 'df["is_late"] = df["late"] [[1]] "yes"',
        blanks: [['==']],
        distractors: ['=', 'is'],
        language: 'python',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to its result.',
        pairs: [
          ['df["is_late"].sum()', '135'],
          ['df["is_late"].mean()', '0.3375'],
          ['len(df)', '400'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'What share of deliveries go by truck? Make is_truck with == "Truck" and print its mean.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_truck"] = df["vehicle"] == "Truck"\nprint(df["is_truck"].mean())\n',
        hint: 'df["is_truck"] = df["vehicle"] == "Truck"',
        checks: [
          { message: 'Print 0.27', outputIncludes: '0.27' },
          { message: 'Compare with ==', codeIncludes: '==' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line has a mistake?',
        lines: ['df = pd.read_csv("deliveries_clean.csv")', 'df["is_late"] = df["late"] = "yes"', 'print(df["is_late"].mean())'],
        bug: 1,
        fix: 'df["is_late"] = df["late"] == "yes"',
        explanation: 'One = stores a value: this overwrites late with "yes". Two == compares.',
        language: 'python',
      },
      {
        kind: 'sortGroups',
        prompt: 'Count or rate?',
        groups: ['Count (sum)', 'Rate (mean)'],
        items: [
          { text: '135 late deliveries', group: 0 },
          { text: '0.3375 of deliveries late', group: 1 },
          { text: '108 trucks', group: 0 },
          { text: '27% go by truck', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Why turn yes/no into True/False? It already says yes.',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'Because yes is wrong.', why: 'Nothing\'s wrong with yes. True/False just does maths.' },
          { text: 'It looks nicer.', why: 'It\'s about maths, not looks.' },
          { text: 'Because then sum() counts it and mean() gives the rate, for any group of rows.' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the late rate as a percentage, rounded to 1 decimal place: round(df["is_late"].mean() * 100, 1).',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nprint(round(df["is_late"].mean() * 100, 1))\n',
        hint: 'Multiply by 100, then round to 1 place.',
        checks: [{ message: 'Print 33.8', outputIncludes: '33.8' }],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In maths, Python treats True as which number?',
        answers: ['1', 'one'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a yes/no question you track (did I exercise today? did the bus come on time?). What would its "rate" tell you over a month?',
    starters: ['I could track...', 'The rate would show...'],
  },
  deepen: {
    title: 'Rates everywhere',
    summary: 'Make three True/False columns in the Try it card: is_saturday, is_nairobi, is_long (distance over 250). Print the mean of each.',
  },
  notes: 'deliveries_clean.csv: is_late sum 135, mean 0.3375 (33.75%, rounds to 33.8 at 1 dp); Truck 108/400 = 0.27. Booleans are a subclass of int in Python (True == 1).',
};

export default lesson;
