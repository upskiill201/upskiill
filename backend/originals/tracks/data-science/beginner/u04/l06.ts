import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 6. Story: do distance and delivery time move together? corr(), what a correlation means and doesn't. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Moving together',
  summary: '2 weeks to Kamau. Remi asks: "Longer trips take longer, obviously. But how much does distance matter compared with, say, the time of day?" One number answers that: the correlation. It\'s also one of the most misunderstood numbers in data.',
  minutes: 12,
  outcomes: [
    'Measure how two number columns move together with corr()',
    'Read a correlation from -1 to 1',
    'Know what a correlation doesn\'t tell you',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'A correlation runs from -1 to 1.',
          isFact: true,
          explain: 'Fact. 1: they rise together perfectly. -1: one rises as the other falls, perfectly. 0: no straight-line link. Distance and actual_days: 0.71, strong.',
        },
        {
          text: 'A correlation of 0.71 means 71% of deliveries are explained by distance.',
          isFact: false,
          explain: 'Myth. It\'s not a percentage of anything. It measures how closely the two columns follow a straight line together.',
        },
        {
          text: 'A correlation near 0 means the two things are unrelated.',
          isFact: false,
          explain: 'Myth. It means no straight-line link. Hour and actual_days is -0.06, but hour clearly matters on Fridays at 2 p.m. A correlation can miss a link that only shows up in one slice.',
        },
        {
          text: 'A strong correlation proves one thing causes the other.',
          isFact: false,
          explain: 'Myth. Next chapter is all about this one.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Distance, hour and delivery time',
      code: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(round(df["distance_km"].corr(df["actual_days"]), 2))\nprint(round(df["hour"].corr(df["actual_days"]), 2))\nprint(df[["distance_km", "hour", "actual_days"]].corr().round(2))\n',
      caption: 'Press Run. Two single correlations, then a table of every pair.',
      challenge: 'Add promised_days to the table. Why is its link with distance_km so strong?',
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'remi', text: 'So the hour of day doesn\'t matter? It\'s nearly zero.' },
        { speaker: 'zanele', text: 'Across the whole week, no straight-line link. But on Fridays, 2 p.m. is a cliff. A correlation is one number for everything at once. It can hide a cliff.' },
      ],
    },
  ],
  apply: {
    scenario: 'What moves together?',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the correlation between distance_km and actual_days, rounded to 2.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(round(df["distance_km"].corr(df["actual_days"]), 2))\n',
        hint: 'df["distance_km"].corr(df["actual_days"])',
        checks: [
          { message: 'Print 0.71', outputIncludes: '0.71' },
          { message: 'Use corr()', codeIncludes: 'corr(' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the correlation to its meaning.',
        pairs: [
          ['1', 'Rise together perfectly'],
          ['-1', 'One rises, the other falls'],
          ['0', 'No straight-line link'],
          ['0.71', 'Strong, rising together'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Hour and actual_days: -0.06. What can Zanele conclude?',
        options: [
          { text: 'Across all days, there\'s no straight-line link; check slices before ruling it out' },
          { text: 'The hour never matters', why: 'On Fridays it matters enormously.' },
          { text: 'Later orders arrive faster', why: '-0.06 is basically zero.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the correlation between hour and actual_days, rounded to 2.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(round(df["hour"].corr(df["actual_days"]), 2))\n',
        hint: 'df["hour"].corr(df["actual_days"])',
        checks: [
          { message: 'Print -0.06', outputIncludes: '-0.06' },
          { message: 'Use corr()', codeIncludes: 'corr(' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Strong or weak link?',
        groups: ['Strong', 'Weak or none'],
        items: [
          { text: '0.93', group: 0 },
          { text: '-0.06', group: 1 },
          { text: '0.71', group: 0 },
          { text: '0.05', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Correlation of two columns.',
        template: 'df["distance_km"].[[1]](df["actual_days"])',
        blanks: [['corr']],
        distractors: ['link', 'match'],
        language: 'python',
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Distance correlates 0.71 with delivery time. Can I say "distance explains 71%"?',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'Yes, that\'s what it means.', why: 'A correlation isn\'t a percentage.' },
          { text: 'No. Say "longer trips take clearly longer: a strong link." 0.71 isn\'t a percentage of anything.' },
          { text: 'Say 0.71 is weak.', why: '0.71 is strong.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the correlation between promised_days and distance_km, rounded to 2.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(round(df["promised_days"].corr(df["distance_km"]), 2))\n',
        hint: 'Same pattern, with promised_days and distance_km.',
        checks: [{ message: 'Print 0.93', outputIncludes: '0.93' }],
      },
      {
        kind: 'findBug',
        prompt: 'Which sentence is wrong?',
        lines: ['Distance and delivery time have a strong positive correlation.', 'Hour has almost no straight-line link with delivery time.', 'So the hour an order is placed makes no difference, ever.'],
        bug: 2,
        fix: 'But on Fridays, orders after 2 p.m. are far more often late.',
        explanation: 'A near-zero correlation across everything can hide a strong effect in one slice.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the highest a correlation can be?',
        answers: ['1', 'one', '1.0'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Think of two things that seem to rise together in your life (sleep and mood, study time and grades). How strong do you think the link is?',
    starters: ['When I...', 'I think the link is...'],
  },
  deepen: {
    title: 'Guess the correlation',
    summary: 'Search for the "Guess the Correlation" game online. After 20 rounds you\'ll read scatter plots far better.',
  },
  notes: 'deliveries_clean.csv Pearson correlations: distance_km vs actual_days 0.71; hour vs actual_days -0.06; promised_days vs distance_km 0.93 (promises are set by distance in the generator). Pearson correlation measures linear association, range -1 to 1 (any statistics text).',
};

export default lesson;
