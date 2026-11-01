import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 20 — Chapter Challenge. Climax: Predictor v0.3 against v0.1, and k chosen by testing. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: Predictor v0.3',
  summary: 'Miracle\'s challenge: "Beat your sticky note, on the same week, fairly. And show me you chose k by testing, not by feel." Everything from Chapter 3, harder.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Compare two predictors fairly on the same test week', 'Use everything from Chapter 3 together'],
  learn: [
    {
      kind: 'story',
      title: 'Sticky note vs neighbours',
      beats: [
        { speaker: 'narrator', text: 'Week 12, 200 bookings. The sticky note (wait over 14 and no reminder) flags 18 bookings; 8 of them really missed.' },
        { speaker: 'narrator', text: 'Predictor v0.3\'s 20 riskiest: 12 really missed. With k = 1 only 7 did; k = 5, 9; k = 51, 10. k = 15 was the best of those tried.' },
        { speaker: 'miracle', text: 'More no-shows found with a similar number of calls, and k chosen by testing. That\'s v0.3.' },
        { speaker: 'halima', text: 'On one week. I want to know it holds on others.' },
        { speaker: 'miracle', text: 'Spoken like someone ready for Chapter 4.' },
        { speaker: 'tey', text: 'Your turn: test Predictor v0.3.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: Predictor v0.3.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Test the sticky note on week 12: print how many bookings it flags, then how many of those really missed',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\ntest = df[df["week"] == 12]\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\ntest = df[df["week"] == 12]\nflagged = test[(test["wait_days"] > 14) & (test["sms_reminder"] == 0)]\nprint(len(flagged))\nprint(flagged["no_show"].sum())\n',
        hint: 'Filter wait_days > 14 & sms_reminder == 0, then len() and .sum()',
        checks: [{ message: 'Print 18 then 8', outputEquals: '18\n8' }],
      },
      {
        kind: 'writeCode',
        prompt: 'Run v0.3 with k = 5 instead of 15, and print how many of the 20 riskiest really missed',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\ntrain = df[df["week"] <= 11]\ntest = df[df["week"] == 12]\nfeats = ["wait_days", "distance_km", "previous_no_shows", "sms_reminder"]\nlo = train[feats].min()\nhi = train[feats].max()\nX = ((train[feats] - lo) / (hi - lo)).to_numpy()\ny = train["no_show"].to_numpy()\nT = ((test[feats] - lo) / (hi - lo)).to_numpy()\nk = 15\nrisks = []\nfor row in T:\n    d = ((X - row) ** 2).sum(axis=1) ** 0.5\n    risks.append(y[d.argsort(kind="stable")[:k]].mean())\ntest = test.assign(risk=risks)\nprint(test.nlargest(20, "risk")["no_show"].sum())\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\ntrain = df[df["week"] <= 11]\ntest = df[df["week"] == 12]\nfeats = ["wait_days", "distance_km", "previous_no_shows", "sms_reminder"]\nlo = train[feats].min()\nhi = train[feats].max()\nX = ((train[feats] - lo) / (hi - lo)).to_numpy()\ny = train["no_show"].to_numpy()\nT = ((test[feats] - lo) / (hi - lo)).to_numpy()\nk = 5\nrisks = []\nfor row in T:\n    d = ((X - row) ** 2).sum(axis=1) ** 0.5\n    risks.append(y[d.argsort(kind="stable")[:k]].mean())\ntest = test.assign(risk=risks)\nprint(test.nlargest(20, "risk")["no_show"].sum())\n',
        hint: 'Change one line: k = 5',
        checks: [
          { message: 'Print 9', outputEquals: '9' },
          { message: 'Use k = 5', expr: 'k == 5' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match k to how many of the 20 riskiest really missed (week 12).',
        pairs: [
          ['k = 1', '7'],
          ['k = 5', '9'],
          ['k = 15', '12'],
          ['k = 51', '10'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The sticky note flags 18 (8 missed). v0.3\'s top 20 has 12 who missed. What\'s the fair conclusion?',
        options: [
          { text: 'v0.3 is perfect', why: '8 of its 20 came anyway.' },
          { text: 'The sticky note is better', why: '8 of 18 vs 12 of 20.' },
          { text: 'On this week, v0.3 finds more no-shows for a similar number of calls' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the distance between Kunle (19 days, 4 km) and Tolu (21 days, 9 km), rounded to 2 places',
        starter: 'kunle = [19, 4]\ntolu = [21, 9]\n',
        solution: 'kunle = [19, 4]\ntolu = [21, 9]\nd = ((kunle[0] - tolu[0]) ** 2 + (kunle[1] - tolu[1]) ** 2) ** 0.5\nprint(round(d, 2))\n',
        hint: 'Gaps 2 and 5',
        checks: [{ message: 'Print 5.39', outputEquals: '5.39' }],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the problem in Chidi\'s version of the challenge.',
        language: 'python',
        lines: [
          'train = df[df["week"] <= 11]',
          'test = df[df["week"] == 12]',
          'feats = ["wait_days", "distance_km", "previous_no_shows", "no_show"]',
          'lo = train[feats].min()',
        ],
        bug: 2,
        fix: 'feats = ["wait_days", "distance_km", "previous_no_shows", "sms_reminder"]',
        explanation: 'no_show is the label: a leak. Use sms_reminder.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 3 idea?',
        groups: ['Making it fair', 'Making it work'],
        items: [
          { text: 'Locking week 12 away', group: 0 },
          { text: 'Scaling the features', group: 1 },
          { text: 'Scaling the test with the training ruler', group: 0 },
          { text: 'Asking 15 neighbours, not 1', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'So v0.3 is ready for all 300 clinics?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'Yes, roll it out tomorrow.', why: 'One test week is promising, not proof.' },
          { text: 'Not yet. It did well on one week at 8 pilot clinics. Next I check it\'s not fooling us: other weeks, leaks, and a proper score.' },
          { text: 'No, it\'s worse than guessing.', why: 'It found three times more no-shows than random calls.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Choose k by...',
        template: 'Choose k by [[1]] on patients the predictor has [[2]] seen.',
        blanks: [['testing'], ['never', 'not']],
        distractors: ['guessing', 'already'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order everything Halima did this chapter.',
        lines: [
          'Measure the distance between two patients',
          'Find the nearest neighbours',
          'Let them vote',
          'Scale the features',
          'Test on a locked-away week',
          'Rank bookings by risk',
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Of the k values tried, which gave the most no-shows in the top 20?',
        answers: ['15', 'k = 15', 'k=15'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'v0.3 beat the sticky note, but Halima still wants more tests. What would convince YOU that a predictor is ready for real patients?',
    starters: ['I\'d need to see...', 'Before real patients...'],
  },
  notes: 'Chapter 3 challenge. Week 12 (200 rows, 37 no-shows). Rule v0.1 (wait > 14 & sms 0): 18 flagged, 8 missed. v0.3 (4 scaled features) top 20 missed by k: 1 -> 7, 5 -> 9, 15 -> 12, 51 -> 10. Kunle (19, 4) to Tolu (21, 9): sqrt(4 + 25) = 5.39.',
};

export default lesson;
