import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 10 — Unit Challenge (the finale). Friday: Mr Kamau's office. The whole analysis, raw file to answer. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: Mr Kamau',
  summary: 'Kamau week. Friday, 10 a.m. Mr Kamau\'s office. One headline, three numbers, three tests, one limits slide and one ask. Kamau listens, asks his three questions, and then a fourth one nobody prepared for: "I heard a driver was the problem?"',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Take a dataset from raw file to a decision', 'Present a finding with its evidence, limits and ask'],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 10:00 a.m., the CEO\'s office',
      beats: [
        { speaker: 'zanele', text: 'Orders that wait over the weekend cause most of our late deliveries. 88% of them arrive late; other orders, 19%. They\'re 75 of our 135 late deliveries. Fixing them could take us from 1 in 3 late to about 1 in 5.' },
        { speaker: 'kamau', text: 'Is it true?' },
        { speaker: 'zanele', text: 'We tried to break it three ways. Thursday afternoons are fine. Weekend orders are almost exactly two days late. Every depot, every driver.' },
        { speaker: 'kamau', text: 'I heard a driver was the problem.' },
        { speaker: 'zanele', text: 'Baraka. He drives most of our long routes, and long routes are late whoever drives them. Compared fairly, long route with long route, the gap shrinks from three times to a little: 60% against 49%. The routes need a look. Baraka doesn\'t need an HR file.' },
        { speaker: 'kamau', text: '(after a long pause) I started in that warehouse. We never dispatched on Saturdays, and nobody ever asked why. Run your pilot at Nairobi. One month. And Zanele: you\'ll run April\'s numbers?' },
        { speaker: 'zanele', text: 'I\'ll press Run.' },
      ],
    },
  ],
  apply: {
    scenario: 'The finale: raw file to decision.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'From the raw file: clean deliveries.csv (duplicates, blanks, cities, distances, the 99) into df and print len(df).',
        starter: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\n',
        solution: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\ndf = raw.drop_duplicates()\ndf = df.dropna(subset=["actual_days"])\ndf["city"] = df["city"].str.strip().str.title()\ndf["distance_km"] = df["distance_km"].str.replace(" km", "").astype("int64")\ndf = df[df["actual_days"] < 20]\nprint(len(df))\n',
        hint: 'The five cleaning steps from Chapter 2, in order.',
        checks: [
          { message: 'Print 393', outputEquals: '393' },
          { message: 'Fix the cities', expr: 'df["city"].nunique() == 10' },
          { message: 'Keep raw untouched', expr: 'len(raw) == 408' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Kamau asks "is it true?". What\'s the strongest answer?',
        options: [
          { text: 'The correlation is very high', why: 'Correlation isn\'t causation, and Kamau may know it.' },
          { text: 'Everyone in logistics agrees', why: 'Everyone agreed it was Baraka, too.' },
          { text: 'We tried to break it three ways, and it held every time' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'On deliveries_clean.csv: build is_late and weekend, then print the late rate for each weekend group, rounded to 2.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\ndf["weekend"] = ((df["day"] == "Fri") & (df["hour"] >= 14)) | (df["day"] == "Sat")\nprint(df.groupby("weekend")["is_late"].mean().round(2))\n',
        hint: 'is_late, weekend, then groupby("weekend").',
        checks: [
          { message: 'Show True 0.88', outputIncludes: 'True 0.88' },
          { message: 'Show False 0.19', outputIncludes: 'False 0.19' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put Zanele\'s five weeks in order.',
        lines: ['Ask a clear question', 'Clean the messy data', 'Find what\'s normal', 'Find the real pattern', 'Test it and present it honestly'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the trap to the chapter where Zanele avoided it.',
        pairs: [
          ['Trusting a tidied file', 'Messy data'],
          ['An average pulled by a typo', 'What\'s normal?'],
          ['Blaming Baraka', 'Patterns'],
          ['Buying six trucks', 'The answer'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'The fair comparison: on long routes (over 250 km), print the late rate for Baraka and for everyone else, rounded to 2, on two lines.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nlong = df[df["distance_km"] > 250]\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nlong = df[df["distance_km"] > 250]\nprint(round(long[long["driver"] == "Baraka"]["is_late"].mean(), 2))\nprint(round(long[long["driver"] != "Baraka"]["is_late"].mean(), 2))\n',
        hint: 'Filter long with == "Baraka" and != "Baraka".',
        checks: [
          { message: 'Print Baraka\'s 0.6', outputIncludes: '0.6' },
          { message: 'Print the others\' 0.49', outputIncludes: '0.49' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kamau',
        message: 'I heard a driver was the problem.',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'He drives most of our long routes, and long routes are late whoever drives them. Compared fairly, long route with long route, the gap shrinks from three times to a little: 60% against 49%.' },
          { text: 'No comment.', why: 'Kamau deserves the answer, and so does Baraka.' },
          { text: 'Yes, Baraka. 60% late.', why: 'That\'s the unfair comparison she spent a week undoing.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which chapter\'s tool?',
        groups: ['Cleaning', 'Summarising', 'Comparing'],
        items: [
          { text: 'drop_duplicates()', group: 0 },
          { text: 'median()', group: 1 },
          { text: 'groupby(["depot", "weekend"])', group: 2 },
          { text: '.str.strip().str.title()', group: 0 },
          { text: 'describe()', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'The prize: print the what-if late rate (weekend holds at the other orders\' rate) as a whole percentage with an f-string.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\ndf["weekend"] = ((df["day"] == "Fri") & (df["hour"] >= 14)) | (df["day"] == "Sat")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\ndf["weekend"] = ((df["day"] == "Fri") & (df["hour"] >= 14)) | (df["day"] == "Sat")\nothers = df[~df["weekend"]]\nother_rate = others["is_late"].mean()\nnew_rate = (others["is_late"].sum() + df["weekend"].sum() * other_rate) / len(df)\nprint(f"If fixed: about {new_rate:.0%}")\n',
        hint: 'Build the what-if from lesson 6, then print(f"If fixed: about {new_rate:.0%}").',
        checks: [
          { message: 'Print If fixed: about 19%', outputIncludes: 'If fixed: about 19%' },
          { message: 'Use ~ for the other orders', codeIncludes: '~' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which sentence would Zanele never say in that room?',
        lines: ['Weekend orders cause most of our late deliveries.', 'This is one month of data; the pilot will tell us more.', 'The data proves that fixing Saturdays will end late deliveries.'],
        bug: 2,
        fix: 'Fixing weekend orders could take us from about 1 in 3 late to about 1 in 5.',
        explanation: 'It overclaims: 60 late deliveries weren\'t weekend holds, and the 19% is an estimate.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Kamau\'s decision.',
        template: 'Run a Saturday [[1]] pilot at [[2]] for one month.',
        blanks: [['dispatch'], ['Nairobi']],
        distractors: ['truck', 'Mombasa'],
      },
      {
        kind: 'mcq',
        prompt: 'Why can Zanele "press Run" for April\'s numbers?',
        options: [
          { text: 'Felix will do it', why: 'Felix exports; the analysis is hers.' },
          { text: 'Every step, from raw file to answer, is in code she can re-run' },
          { text: 'April will be the same as March', why: 'It won\'t: that\'s why she\'ll re-run it.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In March, about what fraction of deliveries were late? (1 in ...)',
        answers: ['3', 'three', '1 in 3'],
        placeholder: '1 in ...',
      },
    ],
  },
  reflect: {
    prompt: 'Five weeks ago Zanele had never written code. What question in your own life could you answer with data now? What\'s your first step?',
    starters: ['My question is...', 'My first step is...'],
  },
  deepen: {
    title: 'Your own dataset',
    summary: 'Find a small dataset you care about (your spending, a sports league, your country\'s open data portal). Ask one clear question, load it with pandas, and answer it honestly.',
  },
  notes: 'Finale. All figures re-checked by npm run originals: raw -> 393 rows; weekend 0.88 vs 0.19; long routes Baraka 0.60 vs others 0.49; what-if 19%. Kamau (CEO, started in the warehouse) from Corporate Jargon / How to Lead Without Being the Boss. The Saturday dispatch pilot is a story decision.',
};

export default lesson;
