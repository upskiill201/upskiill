import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4. Story: a rule for "unusual". Tukey's fences with quantile(); outlier vs mistake. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Unusual, or wrong?',
  summary: '3 weeks to Kamau. Last week Zanele spotted the 99 by eye. Next month there might be 4,000 rows. She needs a rule that finds unusual values on its own, and then a person to decide if each one is a mistake or a real story.',
  minutes: 12,
  outcomes: [
    'Find outliers with a simple rule built from quartiles',
    'Count values beyond the rule with a filter',
    'Tell an outlier that\'s a mistake from one that\'s real',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Tukey\'s fences, in four steps',
      steps: [
        {
          title: '1. Find the quartiles',
          body: 'The statistician John Tukey suggested this rule in 1977. Start with the lower and upper quartiles.',
          code: 'q1 = df["actual_days"].quantile(0.25)\nq3 = df["actual_days"].quantile(0.75)',
          language: 'python',
        },
        {
          title: '2. The IQR',
          body: 'The interquartile range is the width of the middle half: q3 - q1. For delivery times: 3 - 1 = 2 days.',
          code: 'iqr = q3 - q1',
          language: 'python',
        },
        {
          title: '3. Build the fence',
          body: 'Anything more than 1.5 IQRs above q3 counts as unusual. Here: 3 + 1.5 x 2 = 6 days.',
          code: 'fence = q3 + 1.5 * iqr',
          language: 'python',
        },
        {
          title: '4. Look over the fence',
          body: 'Filter for values above it. Then a human decides: mistake, or something real worth explaining?',
          code: 'print(df[df["actual_days"] > fence])',
          language: 'python',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Let the rule find the 99',
      code: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\ndf = raw.drop_duplicates().dropna(subset=["actual_days"])\n\nq1 = df["actual_days"].quantile(0.25)\nq3 = df["actual_days"].quantile(0.75)\nfence = q3 + 1.5 * (q3 - q1)\nprint("fence", fence)\nprint(df[df["actual_days"] > fence][["delivery_id", "distance_km", "actual_days"]])\n',
      caption: 'Press Run on the raw data. The rule finds exactly one delivery over the fence: D1289, the 99.',
      challenge: 'Change the file to deliveries_clean.csv. Does anything cross the fence now?',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'An outlier isn\'t automatically a mistake. A 6-day delivery to Kisumu might be real, and might be the most important row in the file. The rule finds; you decide.',
    },
  ],
  apply: {
    scenario: 'A rule for unusual values.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'In deliveries_clean.csv, work out the IQR of actual_days (q3 - q1) and print it.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nq1 = df["actual_days"].quantile(0.25)\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nq1 = df["actual_days"].quantile(0.25)\nq3 = df["actual_days"].quantile(0.75)\nprint(q3 - q1)\n',
        hint: 'q3 = df["actual_days"].quantile(0.75), then print(q3 - q1).',
        checks: [
          { message: 'Print 2.0', outputIncludes: '2.0' },
          { message: 'Make q3', expr: 'q3 == 3' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put Tukey\'s fence in order.',
        lines: ['Find q1 and q3', 'IQR = q3 - q1', 'Fence = q3 + 1.5 x IQR', 'Filter values above the fence', 'Decide: mistake or real?'],
      },
      {
        kind: 'mcq',
        prompt: 'q1 is 1 day, q3 is 3 days. Where is the upper fence?',
        options: [
          { text: '4.5 days', why: 'That\'s 3 + 1.5. Multiply 1.5 by the IQR (2) first.' },
          { text: '6 days' },
          { text: '9 days', why: 'That\'s 3 x 3. The fence is q3 + 1.5 x IQR.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'In the raw file (duplicates and blanks dropped), count deliveries above a fence of 6 days: len(df[df["actual_days"] > 6]).',
        starter: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\ndf = raw.drop_duplicates().dropna(subset=["actual_days"])\n',
        solution: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\ndf = raw.drop_duplicates().dropna(subset=["actual_days"])\nprint(len(df[df["actual_days"] > 6]))\n',
        hint: 'print(len(df[df["actual_days"] > 6]))',
        checks: [
          { message: 'Print 1', outputEquals: '1' },
          { message: 'Filter with > 6', codeIncludes: '> 6' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Probably a mistake, or probably real?',
        groups: ['Probably a mistake', 'Probably real'],
        items: [
          { text: '99 days for 19 km', group: 0 },
          { text: '6 days for 490 km on a Saturday', group: 1 },
          { text: 'An order placed at hour 27', group: 0 },
          { text: 'A 495 km trip to Nairobi from Mombasa', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Build the upper fence.',
        template: 'fence = q3 + [[1]] * (q3 - q1)',
        blanks: [['1.5']],
        distractors: ['2', '0.5'],
        language: 'python',
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'So we just delete everything over the fence?',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'No. The fence tells me where to look. I check each one: a typo gets fixed or removed, a real one stays and gets explained.' },
          { text: 'Yes, they\'re outliers.', why: 'Some outliers are the real story.' },
          { text: 'No, we never remove anything.', why: 'The 99 was rightly removed until it was checked.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line is wrong?',
        lines: ['q1 = df["actual_days"].quantile(0.25)', 'q3 = df["actual_days"].quantile(0.75)', 'fence = q3 + 1.5 * q3'],
        bug: 2,
        fix: 'fence = q3 + 1.5 * (q3 - q1)',
        explanation: 'The fence uses the IQR (q3 - q1), not q3 itself.',
        language: 'python',
      },
      {
        kind: 'writeCode',
        prompt: 'Now the clean file: build the fence in code and print how many deliveries are above it.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nq1 = df["actual_days"].quantile(0.25)\nq3 = df["actual_days"].quantile(0.75)\nfence = q3 + 1.5 * (q3 - q1)\nprint(len(df[df["actual_days"] > fence]))\n',
        hint: 'Same four steps as the Try it card, then len() of the filter.',
        checks: [
          { message: 'Print 0', outputEquals: '0' },
          { message: 'Make a fence variable', expr: 'fence == 6' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does IQR stand for? (three words)',
        answers: ['interquartile range', 'inter quartile range', 'inter-quartile range'],
        placeholder: 'Three words',
      },
    ],
  },
  reflect: {
    prompt: 'Think of an "outlier" in your life: an unusually big bill, a very late bus. Was it a mistake, or something real worth understanding?',
    starters: ['The odd one out was...', 'It turned out to be...'],
  },
  deepen: {
    title: 'Box plots',
    summary: 'Tukey\'s fence is what the "whiskers" on a box plot show. Look up a box plot image: the dots beyond the whiskers are the outliers.',
  },
  notes: 'Tukey, J. W. (1977), Exploratory Data Analysis: 1.5 x IQR fences. Raw (dedup, dropna): q1 1, q3 3, fence 6; one value above (D1289, 99). Clean: fence 6, none above (8 deliveries took exactly 6 days, at the fence).',
};

export default lesson;
