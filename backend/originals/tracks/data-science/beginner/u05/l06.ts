import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 6. Story: "what would fixing it be worth?" A what-if estimate with ~, and its assumptions. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'What if we fixed it?',
  summary: 'Kamau week. Remi: "Kamau won\'t ask why. He\'ll ask what happens if we fix it." Zanele builds a what-if: if weekend-hold orders were late as often as every other order, how many deliveries would be late? From 1 in 3 to about 1 in 5.',
  minutes: 12,
  outcomes: [
    'Flip True and False with ~',
    'Build a simple what-if estimate from group rates',
    'Say clearly what the estimate assumes',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'The what-if, line by line',
      text: 'Other orders are late 19% of the time. If the 85 weekend-hold orders were late at that same rate, about 16 would be late instead of 75. Add the 60 other late orders: about 76 late out of 400. So the late rate would fall from 34% to about 19%, assuming the weekend wait is the only difference.',
      hotspots: [
        { phrase: 'late 19% of the time', note: 'df[~df["weekend"]]["is_late"].mean(). The ~ flips True and False, so ~df["weekend"] means "not weekend hold".' },
        { phrase: 'about 16 would be late instead of 75', note: '85 x 0.19 = 16.2. The fix wouldn\'t make them perfect, just normal.' },
        { phrase: 'about 76 late out of 400', note: '60 + 16.2 = 76.2. Estimates aren\'t whole deliveries: say "about".' },
        { phrase: 'from 34% to about 19%', note: 'From about 1 in 3 to about 1 in 5. The headline Kamau can act on.' },
        { phrase: 'assuming the weekend wait is the only difference', note: 'The honest part. Weekend orders might differ in other ways too. Say so.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Build the what-if',
      code: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\ndf["weekend"] = ((df["day"] == "Fri") & (df["hour"] >= 14)) | (df["day"] == "Sat")\n\nothers = df[~df["weekend"]]\nother_rate = others["is_late"].mean()\nnew_late = others["is_late"].sum() + df["weekend"].sum() * other_rate\nprint("now", round(df["is_late"].mean(), 2))\nprint("if fixed", round(new_late / len(df), 2))\n',
      caption: 'Press Run. ~ means "not". The estimate: 0.34 now, 0.19 if weekend orders behaved like the rest.',
      challenge: 'What if the fix only halved the weekend problem? Change the estimate to use the average of the two rates.',
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'remi', text: 'From 1 in 3 to 1 in 5. Can I say that?' },
        { speaker: 'zanele', text: 'You can say "about 1 in 5, if weekend orders were handled like every other day". The "if" is part of the number.' },
      ],
    },
  ],
  apply: {
    scenario: 'What fixing it would be worth.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'import pandas as pd\ns = pd.Series([True, False, True])\nprint(list(~s))',
        language: 'python',
        options: [
          { text: '[True, False, True]', why: '~ flips each value.' },
          { text: 'An error', why: '~ works on True/False columns.' },
          { text: '[False, True, False]' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the late rate of orders that are NOT weekend holds (use ~), rounded to 2.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\ndf["weekend"] = ((df["day"] == "Fri") & (df["hour"] >= 14)) | (df["day"] == "Sat")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\ndf["weekend"] = ((df["day"] == "Fri") & (df["hour"] >= 14)) | (df["day"] == "Sat")\nothers = df[~df["weekend"]]\nprint(round(others["is_late"].mean(), 2))\n',
        hint: 'others = df[~df["weekend"]]',
        checks: [
          { message: 'Print 0.19', outputIncludes: '0.19' },
          { message: 'Use ~', codeIncludes: '~' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the what-if in order.',
        lines: ['Find the late rate of other orders', 'Apply it to the weekend-hold orders', 'Add the other late orders', 'Divide by all deliveries', 'State the assumption'],
      },
      {
        kind: 'fillBlank',
        prompt: 'Orders that are not weekend holds.',
        template: 'others = df[[[1]]df["weekend"]]',
        blanks: [['~']],
        distractors: ['!', '-'],
        language: 'python',
      },
      {
        kind: 'writeCode',
        prompt: 'Build the full what-if and print the estimated late rate, rounded to 2.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\ndf["weekend"] = ((df["day"] == "Fri") & (df["hour"] >= 14)) | (df["day"] == "Sat")\nothers = df[~df["weekend"]]\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\ndf["weekend"] = ((df["day"] == "Fri") & (df["hour"] >= 14)) | (df["day"] == "Sat")\nothers = df[~df["weekend"]]\nother_rate = others["is_late"].mean()\nnew_late = others["is_late"].sum() + df["weekend"].sum() * other_rate\nprint(round(new_late / len(df), 2))\n',
        hint: 'new_late = others late count + weekend count x other_rate; then divide by len(df).',
        checks: [
          { message: 'Print 0.19', outputIncludes: '0.19' },
          { message: 'Make new_late', expr: 'round(new_late, 1) == 76.2' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest way to say it, or overclaiming?',
        groups: ['Honest', 'Overclaiming'],
        items: [
          { text: 'About 1 in 5, if weekend orders were handled like other days', group: 0 },
          { text: 'Fixing weekends will cut lateness to exactly 19.05%', group: 1 },
          { text: 'Our best estimate is roughly 19%', group: 0 },
          { text: 'Fixing weekends will end late deliveries', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'From 1 in 3 to 1 in 5. Can I put that in big letters?',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'Yes, with "about", and the "if" underneath: if weekend orders were handled like every other day.' },
          { text: 'No, estimates are guesses.', why: 'A reasoned estimate with its assumption is useful.' },
          { text: 'Make it 1 in 10, it sounds better.', why: 'That\'s not what the data says.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line is wrong?',
        lines: ['others = df[~df["weekend"]]', 'other_rate = others["is_late"].mean()', 'new_late = others["is_late"].sum() + df["weekend"].sum() * df["is_late"].mean()'],
        bug: 2,
        fix: 'new_late = others["is_late"].sum() + df["weekend"].sum() * other_rate',
        explanation: 'The what-if uses the other orders\' rate (19%), not the overall rate (34%), which still includes the weekend problem.',
        language: 'python',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the number to what it is.',
        pairs: [
          ['0.19', 'Late rate of other orders'],
          ['85', 'Weekend-hold orders'],
          ['76.2', 'Estimated late if fixed'],
          ['0.34', 'Late rate now'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In pandas, which symbol flips True and False?',
        answers: ['tilde', '~ tilde', 'tilde ~'],
        placeholder: 'Its name',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a change you\'d like to make. What would it be worth, roughly, and what are you assuming?',
    starters: ['If I changed...', 'I\'m assuming...'],
  },
  deepen: {
    title: 'Ranges, not points',
    summary: 'Try the challenge: what if the fix only halved the weekend problem? Giving a best case and a cautious case is often more honest than one number.',
  },
  notes: 'deliveries_clean.csv: non-weekend 315 orders, 60 late (0.1905); weekend hold 85 orders; what-if late = 60 + 85 x 0.1905 = 76.2 -> 0.19 of 400; now 0.3375 (0.34). The ~ operator is element-wise NOT on boolean Series (pandas docs, Boolean indexing). typeAnswer asks for the name "tilde" because answers must contain letters.',
};

export default lesson;
