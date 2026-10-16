import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7. Story: groupby by driver. Baraka 60% late. Emeka: "Told you." */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Told you',
  summary: '3 weeks to Kamau. Zanele runs the late rate for every driver at once with groupby. Baraka: 60% late. Juma: 20%. Emeka doesn\'t say anything. He just shares his screen, which shows a message he\'s typed: "Told you."',
  minutes: 12,
  outcomes: [
    'Compare groups at once with groupby()',
    'Get a rate per group with groupby(...)["col"].mean()',
    'Hold a first result loosely until it\'s checked',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Reading one line of pandas',
      text: 'df.groupby("driver")["is_late"].mean() splits the 400 deliveries into one pile per driver, takes the is_late column of each pile, and works out its mean. Result: Baraka 0.60, and Juma 0.20.',
      hotspots: [
        { phrase: 'groupby("driver")', note: 'Split the rows into groups, one per driver. Nothing is calculated yet.' },
        { phrase: '["is_late"]', note: 'Pick the column to summarise in each group.' },
        { phrase: '.mean()', note: 'Summarise it. On True/False, the mean is the late rate. Try .sum() for counts.' },
        { phrase: 'Baraka 0.60', note: 'Baraka: 44 of his 73 deliveries were late. The highest rate by far.' },
        { phrase: 'Juma 0.20', note: 'Juma: 14 of 71 late. The lowest.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Late rate per driver',
      code: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nprint(df.groupby("driver")["is_late"].mean().round(2))\n',
      caption: 'Press Run. One line, six drivers.',
      challenge: 'Swap "driver" for "depot". Which depot has the highest late rate?',
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'emeka', text: '(sharing his screen: a message that says "Told you.")' },
        { speaker: 'zanele', text: 'It\'s a big gap. But it\'s one number. Before anyone says Baraka\'s name to Kamau, I want to know why.' },
        { speaker: 'remi', text: 'Why do you think it\'s not just Baraka?' },
        { speaker: 'zanele', text: 'I don\'t think anything yet. That\'s the point.' },
      ],
    },
  ],
  apply: {
    scenario: 'Late rate by driver.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the late rate per driver, rounded to 2 places.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nprint(df.groupby("driver")["is_late"].mean().round(2))\n',
        hint: 'df.groupby("driver")["is_late"].mean().round(2)',
        checks: [
          { message: 'Show Baraka 0.6', outputIncludes: 'Baraka 0.6' },
          { message: 'Use groupby', codeIncludes: 'groupby(' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Build the groupby in order.',
        lines: ['df', '.groupby("driver")', '["is_late"]', '.mean()'],
        language: 'python',
      },
      {
        kind: 'mcq',
        prompt: 'Baraka\'s late rate is 0.60. What can Zanele say for sure?',
        options: [
          { text: '60% of Baraka\'s deliveries were late' },
          { text: 'Baraka is a bad driver', why: 'That\'s a reason. The number doesn\'t give reasons.' },
          { text: 'Baraka caused 60% of all late deliveries', why: 'He had 44 of the 135 late ones, about a third.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Count late deliveries per driver with sum() instead of mean().',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nprint(df.groupby("driver")["is_late"].sum())\n',
        hint: 'df.groupby("driver")["is_late"].sum()',
        checks: [
          { message: 'Show Baraka 44', outputIncludes: 'Baraka 44' },
          { message: 'Use sum()', codeIncludes: 'sum()' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Late rate per depot.',
        template: 'df.[[1]]("depot")["is_late"].[[2]]()',
        blanks: [['groupby'], ['mean']],
        distractors: ['group', 'count'],
        language: 'python',
      },
      {
        kind: 'chatReply',
        from: 'emeka',
        message: 'Told you. 60%. Can we tell Kamau it\'s Baraka?',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'Yes, the data proves it.', why: 'It shows a rate. It doesn\'t show why.' },
          { text: 'It\'s a real gap, and worth checking. Before we name anyone, let\'s see what\'s different about his deliveries.' },
          { text: 'You were wrong before.', why: 'Scoring points won\'t help.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Which depot has the highest late rate? Print the groupby by depot, rounded to 2 places.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nprint(df.groupby("depot")["is_late"].mean().round(2))\n',
        hint: 'Swap "driver" for "depot".',
        checks: [
          { message: 'Show Nairobi 0.37', outputIncludes: 'Nairobi 0.37' },
          { message: 'Group by depot', codeIncludes: 'groupby("depot")' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the driver to the late rate.',
        pairs: [
          ['Baraka', '0.60'],
          ['Auma', '0.38'],
          ['Kiprop', '0.23'],
          ['Juma', '0.20'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line errors?',
        lines: ['df["is_late"] = df["late"] == "yes"', 'rates = df.groupby(driver)["is_late"].mean()', 'print(rates)'],
        bug: 1,
        fix: 'rates = df.groupby("driver")["is_late"].mean()',
        explanation: 'The column name needs quotes: "driver".',
        language: 'python',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which pandas method splits rows into groups?',
        answers: ['groupby', 'groupby()', '.groupby()'],
        placeholder: 'Method name',
      },
    ],
  },
  reflect: {
    prompt: 'Emeka saw a number that matched what he already believed. Why is that exactly the moment to be most careful?',
    starters: ['When data agrees with me...', 'I\'d check...'],
  },
  deepen: {
    title: 'Group by anything',
    summary: 'In the Try it card, group by vehicle, customer and city. Which groups stand out?',
  },
  notes: 'deliveries_clean.csv late rate by driver: Baraka 0.603 (44/73), Auma 0.381 (24/63), Wanjiru 0.356 (26/73), Kiprop 0.232 (13/56), Mwangi 0.219 (14/64), Juma 0.197 (14/71). By depot: Nairobi 0.374, Kisumu 0.310, Mombasa 0.298. Confirmation bias: Nickerson (1998), Review of General Psychology 2(2).',
};

export default lesson;
