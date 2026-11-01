import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 3. Story: Brian plays Kamau. Testing an explanation by its predictions: Thursday afternoons, extra days. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Try to break it',
  summary: 'Kamau week. Brian plays Kamau in a practice run: "Prove it\'s the weekend hold. Not a coincidence." Zanele doesn\'t defend her idea. She tries to break it. If it\'s really the weekend wait, three other things must also be true.',
  minutes: 12,
  outcomes: [
    'Turn an explanation into predictions you can check',
    'Test a prediction that could prove you wrong',
    'Measure the extra delay with a new column',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'If it\'s the weekend wait, then...',
      steps: [
        {
          title: 'Prediction 1: 2 p.m. matters only on Friday',
          body: 'If the cut-off is the Friday truck, a Thursday afternoon order should be no worse than a Thursday morning one. Result: Thursday before 2 p.m. 14% late, after 13%. Prediction holds.',
          code: 'thu = df[df["day"] == "Thu"]\nprint(thu.groupby(thu["hour"] >= 14)["is_late"].mean())',
          language: 'python',
        },
        {
          title: 'Prediction 2: about two extra days',
          body: 'A weekend wait adds Saturday and Sunday. So weekend-hold orders should arrive about 2 days later than promised. Make a delay column: actual minus promised. Result: 1.91 days, versus 0.19 for everything else.',
          code: 'df["delay"] = df["actual_days"] - df["promised_days"]\nprint(df.groupby("weekend")["delay"].mean())',
          language: 'python',
        },
        {
          title: 'Prediction 3: every depot, every driver',
          body: 'A depot rule should hit everyone. Last week: 87% to 94% at every depot, and high for every driver. Holds.',
        },
        {
          title: 'What would have broken it?',
          body: 'Thursday afternoons being late too. Or weekend orders being only a few hours late. Neither happened. An explanation you tried hard to break, and couldn\'t, is one you can present.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Run the tests',
      code: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\ndf["weekend"] = ((df["day"] == "Fri") & (df["hour"] >= 14)) | (df["day"] == "Sat")\n\nthu = df[df["day"] == "Thu"]\nprint(thu.groupby(thu["hour"] >= 14)["is_late"].mean().round(2))\n\ndf["delay"] = df["actual_days"] - df["promised_days"]\nprint(df.groupby("weekend")["delay"].mean().round(2))\n',
      caption: 'Press Run. You can group by a True/False test, not only by a column.',
      challenge: 'Test Wednesday the same way as Thursday. Does 2 p.m. matter on Wednesdays?',
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'brian', text: '(as Kamau) Coincidence?' },
        { speaker: 'zanele', text: 'I tried to break it three ways. Thursday afternoons are fine. Weekend orders are almost exactly two days late, the length of a weekend. And it\'s every depot. I couldn\'t break it.' },
        { speaker: 'brian', text: '(as himself) That\'s the best answer anyone\'s given in that room this year.' },
      ],
    },
  ],
  apply: {
    scenario: 'Trying to break the weekend-hold explanation.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why test Thursday afternoons?',
        options: [
          { text: 'Thursday is the worst day', why: 'It\'s the best: 14%.' },
          { text: 'To have more charts', why: 'It\'s a test that could prove her wrong.' },
          { text: 'If Thursday afternoons were late too, the Friday truck wouldn\'t be the explanation' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Make a delay column (actual_days minus promised_days) and print its mean, rounded to 2.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["delay"] = df["actual_days"] - df["promised_days"]\nprint(round(df["delay"].mean(), 2))\n',
        hint: 'df["delay"] = df["actual_days"] - df["promised_days"]',
        checks: [
          { message: 'Print 0.56', outputIncludes: '0.56' },
          { message: 'Make the delay column', expr: '"delay" in df.columns' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put testing an explanation in order.',
        lines: ['State the explanation', 'List what else must be true', 'Pick a test that could prove you wrong', 'Run it', 'Keep, change or drop the explanation'],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the mean delay for weekend-hold orders vs others, rounded to 2.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["weekend"] = ((df["day"] == "Fri") & (df["hour"] >= 14)) | (df["day"] == "Sat")\ndf["delay"] = df["actual_days"] - df["promised_days"]\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["weekend"] = ((df["day"] == "Fri") & (df["hour"] >= 14)) | (df["day"] == "Sat")\ndf["delay"] = df["actual_days"] - df["promised_days"]\nprint(df.groupby("weekend")["delay"].mean().round(2))\n',
        hint: 'groupby("weekend")["delay"].mean().round(2)',
        checks: [
          { message: 'Show True 1.91', outputIncludes: 'True 1.91' },
          { message: 'Show False 0.19', outputIncludes: 'False 0.19' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Would it support or break the weekend-hold explanation?',
        groups: ['Supports', 'Would break it'],
        items: [
          { text: 'Weekend orders about 2 days late', group: 0 },
          { text: 'Thursday afternoons late as often as Friday afternoons', group: 1 },
          { text: 'Every depot shows it', group: 0 },
          { text: 'Weekend orders only a few hours late', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Group by a True/False test.',
        template: 'thu.groupby(thu["hour"] [[1]] 14)["is_late"].mean()',
        blanks: [['>=']],
        distractors: ['==', '=>'],
        language: 'python',
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: '(as Kamau) Coincidence?',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'No, I\'m sure.', why: 'Sure isn\'t evidence. Show the tests.' },
          { text: 'I tried to break it three ways and couldn\'t: Thursday afternoons are fine, weekend orders are two days late, and every depot shows it.' },
          { text: 'Maybe, data is complicated.', why: 'She has strong evidence. Say so, with the tests.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Test Wednesday: print the late rate before and after 2 p.m., rounded to 2.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nwed = df[df["day"] == "Wed"]\nprint(wed.groupby(wed["hour"] >= 14)["is_late"].mean().round(2))\n',
        hint: 'Same as Thursday in the Try it card, with "Wed".',
        checks: [
          { message: 'Show the before and after rates', outputIncludes: 'True' },
          { message: 'Filter to Wednesday', codeIncludes: '"Wed"' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which is not a real test of the explanation?',
        lines: ['Check Thursday afternoons, which should be fine.', 'Check weekend delays are about 2 days.', 'Re-run the Saturday rate and see it\'s still 87%.'],
        bug: 2,
        explanation: 'Re-running the same number can\'t prove you wrong. A real test could come out against you.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how many extra days are weekend-hold orders late, on average?',
        answers: ['2', 'two', '1.91', '1.9'],
        placeholder: 'Days',
      },
    ],
  },
  reflect: {
    prompt: 'Think of something you believe. What would you expect to see if you were wrong? Have you ever looked?',
    starters: ['I believe...', 'If I were wrong, I\'d see...'],
  },
  deepen: {
    title: 'Try to prove yourself wrong',
    summary: 'The philosopher Karl Popper argued that good ideas make predictions that could fail. Next time you\'re sure of something, write down what would change your mind.',
  },
  notes: 'deliveries_clean.csv: Thursday before 14: 0.14 (43), from 14: 0.13 (23). delay = actual - promised: mean 0.56; weekend hold 1.91, others 0.19. Depot weekend rates 0.87-0.94 (u04 l09). Falsifiability: Popper, The Logic of Scientific Discovery (1959).',
};

export default lesson;
