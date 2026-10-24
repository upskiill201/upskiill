import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 12 — Testing on patients it hasn't seen: weeks 1–11 to learn, week 12 to test. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Testing on patients it hasn\'t seen',
  summary: 'Chidi runs the predictor on 50 bookings and announces: "50 out of 50. Perfect." Miracle asks which 50. They were bookings the predictor had already stored. Every patient\'s nearest neighbour was... themselves.',
  minutes: 12,
  outcomes: [
    'Split the data into a training part and a test part',
    'Explain why testing on stored examples cheats',
    'Use week 12 as patients the predictor has never seen',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Chidi\'s 100%',
      beats: [
        { speaker: 'chidi', text: '50 out of 50 with one neighbour. Book the board room.' },
        { speaker: 'miracle', text: 'Which 50?' },
        { speaker: 'chidi', text: 'The first 50 bookings. From the data it learns from.' },
        { speaker: 'halima', text: 'Then every patient\'s nearest neighbour is themselves, at a distance of 0. It\'s not predicting. It\'s looking up the answer.' },
        { speaker: 'miracle', text: 'Exactly. So: weeks 1 to 11 are what it learns from. Week 12 is locked away, and we only use it to test.' },
        { speaker: 'narrator', text: 'train = df[df["week"] <= 11] gives 2,200 bookings. test = df[df["week"] == 12] gives 200 the predictor has never seen.' },
      ],
      choice: {
        prompt: 'What should Halima test on?',
        options: [
          { text: 'Week 12: bookings kept out of the training data.', outcome: 'A fair test: the predictor has never seen them, just like tomorrow\'s real bookings.', best: true },
          { text: 'Any 50 bookings from the whole table.', outcome: 'Some of them would be in the training data, and those would score perfectly by looking themselves up.' },
          { text: 'The training data: it\'s bigger.', outcome: 'That measures memory, not prediction. Chidi\'s 100% shows why.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Split by week',
      caption: 'Learn from the past, test on the most recent week.',
      code: 'import pandas as pd\n\ndf = pd.read_csv("appointments.csv")\ntrain = df[df["week"] <= 11]\ntest = df[df["week"] == 12]\nprint(len(train), len(test))\nprint(f"No-shows in the test week: {test[\'no_show\'].sum()}")\n',
      challenge: 'What share of the test week came? That\'s the "everyone comes" score to beat.',
    },
  ],
  apply: {
    scenario: 'A fair test.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Split appointments.csv into train (weeks 1–11) and test (week 12). Print both lengths',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\ntrain = df[df["week"] <= 11]\ntest = df[df["week"] == 12]\nprint(len(train))\nprint(len(test))\n',
        hint: 'df[df["week"] <= 11] and df[df["week"] == 12]',
        checks: [{ message: 'Print 2200 then 200', outputEquals: '2200\n200' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Chidi get 50 out of 50?',
        options: [
          { text: 'The predictor is perfect', why: 'It was looking up answers it already had.' },
          { text: 'Each test patient was in the training data, so its nearest neighbour was itself' },
          { text: 'He was lucky', why: 'It wasn\'t luck: distance 0 to itself, every time.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many of the 200 test bookings were missed',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\ntest = df[df["week"] == 12]\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\ntest = df[df["week"] == 12]\nprint(test["no_show"].sum())\n',
        hint: 'test["no_show"].sum()',
        checks: [{ message: 'Print 37', outputEquals: '37' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'A fair test, or a cheat?',
        groups: ['Fair', 'Cheat'],
        items: [
          { text: 'Train on weeks 1–11, test on week 12', group: 0 },
          { text: 'Test on the training bookings', group: 1 },
          { text: 'Test on a week kept locked away', group: 0 },
          { text: 'Pick the test patients the predictor gets right', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part to its size.',
        pairs: [
          ['Training (weeks 1–11)', '2200 bookings'],
          ['Test (week 12)', '200 bookings'],
          ['No-shows in week 12', '37'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'Why hide week 12 from the predictor? Use all the data!',
        prompt: "Halima's best reply?",
        options: [
          { text: 'Week 12 plays the part of tomorrow. If the predictor has seen it, the test tells us nothing about real new bookings.' },
          { text: 'You\'re right, use everything for both.', why: 'Then the score measures memory, not prediction.' },
          { text: 'Week 12 is broken.', why: 'It\'s fine. It\'s kept apart on purpose.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line makes the test unfair?',
        language: 'python',
        lines: ['train = df[df["week"] <= 12]', 'test = df[df["week"] == 12]', 'print(len(train), len(test))'],
        bug: 0,
        fix: 'train = df[df["week"] <= 11]',
        explanation: 'With <= 12, week 12 is in the training data too, so the test patients look themselves up.',
      },
      {
        kind: 'fillBlank',
        prompt: 'The split.',
        language: 'python',
        template: 'train = df[df["week"] [[1]] 11]\ntest = df[df["week"] [[2]] 12]',
        blanks: [['<='], ['==']],
        distractors: ['>=', '='],
      },
      {
        kind: 'mcq',
        prompt: '163 of the 200 test bookings came. What does "everyone comes" score?',
        options: [
          { text: '18.5%', why: 'That\'s the share who missed (37 of 200).' },
          { text: '81.5%' },
          { text: '100%', why: 'It\'s wrong for all 37 who missed.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many bookings are in the training part (weeks 1 to 11)?',
        answers: ['2200', '2,200'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Chidi\'s test was like a student marking their own exam with the answer sheet open. Where else does "testing on what you already know" give false confidence?',
    starters: ['It\'s like...', 'The fair version is...'],
  },
  deepen: {
    title: 'Why split by time?',
    summary: 'Real predictions are always about the future. Learning from the past and testing on the latest week copies that exactly. Chapter 4 covers other ways to split, and their traps.',
  },
  notes: 'appointments.csv: weeks 1-11 = 2,200 rows; week 12 = 200 rows, 37 no-shows (163 came, 81.5%). Measured: 1-NN tested on the first 50 training rows got 50/50, the nearest neighbour was the row itself every time.',
};

export default lesson;
