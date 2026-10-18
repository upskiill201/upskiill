import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 19 — Predictor v0.3: everything together, ending in Bisi's call list. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Predictor v0.3',
  summary: 'Time to put it all together into one program that does what Bisi actually needs: take a week of bookings and hand her a call list, riskiest first.',
  minutes: 13,
  outcomes: [
    'Assemble the full predictor from its parts',
    'Produce a call list sorted by risk',
    'Check how many on the list really missed',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From bookings to a call list',
      steps: [
        { title: '1. Learn from the past, test on the future', body: 'Weeks 1–11 to learn from; week 12 plays the part of "tomorrow".', code: 'train = df[df["week"] <= 11]\ntest = df[df["week"] == 12]', language: 'python' },
        { title: '2. Four clues, one ruler', body: 'Scale with the training min and max.', code: 'feats = ["wait_days", "distance_km", "previous_no_shows", "sms_reminder"]\nlo = train[feats].min()\nhi = train[feats].max()', language: 'python' },
        { title: '3. Number grids', body: 'For speed.', code: 'X = ((train[feats] - lo) / (hi - lo)).to_numpy()\ny = train["no_show"].to_numpy()\nT = ((test[feats] - lo) / (hi - lo)).to_numpy()', language: 'python' },
        { title: '4. A risk for every booking', body: '15 nearest neighbours each.', code: 'risks = []\nfor row in T:\n    d = ((X - row) ** 2).sum(axis=1) ** 0.5\n    risks.append(y[d.argsort(kind="stable")[:15]].mean())', language: 'python' },
        { title: '5. The call list', body: 'The 10 riskiest bookings, for Bisi\'s evening.', code: 'test = test.assign(risk=risks)\ncalls = test.nlargest(10, "risk")\nprint(calls[["appointment_id", "clinic", "risk"]])', language: 'python' },
        { title: '6. Did it work?', body: 'Of those 10, 7 really missed. Ten random calls would reach about 2.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Bisi\'s call list',
      caption: 'Predictor v0.3, start to finish.',
      code: 'import pandas as pd\n\ndf = pd.read_csv("appointments.csv")\ntrain = df[df["week"] <= 11]\ntest = df[df["week"] == 12]\nfeats = ["wait_days", "distance_km", "previous_no_shows", "sms_reminder"]\nlo = train[feats].min()\nhi = train[feats].max()\nX = ((train[feats] - lo) / (hi - lo)).to_numpy()\ny = train["no_show"].to_numpy()\nT = ((test[feats] - lo) / (hi - lo)).to_numpy()\n\nrisks = []\nfor row in T:\n    d = ((X - row) ** 2).sum(axis=1) ** 0.5\n    risks.append(y[d.argsort(kind="stable")[:15]].mean())\n\ntest = test.assign(risk=risks)\ncalls = test.nlargest(10, "risk")\nprint(calls[["appointment_id", "clinic", "risk"]])\nprint(calls["no_show"].sum(), "of these 10 really missed")\n',
      challenge: 'Make the list 20 long. How many really missed?',
    },
  ],
  apply: {
    scenario: 'Predictor v0.3.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the predictor\'s steps.',
        lines: ['Split into train and test', 'Choose the features', 'Scale with the training ruler', 'Work out a risk for every test booking', 'Sort by risk for the call list'],
      },
      {
        kind: 'writeCode',
        prompt: 'Finish v0.3: make the call list of the 10 riskiest and print how many of them really missed',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\ntrain = df[df["week"] <= 11]\ntest = df[df["week"] == 12]\nfeats = ["wait_days", "distance_km", "previous_no_shows", "sms_reminder"]\nlo = train[feats].min()\nhi = train[feats].max()\nX = ((train[feats] - lo) / (hi - lo)).to_numpy()\ny = train["no_show"].to_numpy()\nT = ((test[feats] - lo) / (hi - lo)).to_numpy()\nrisks = []\nfor row in T:\n    d = ((X - row) ** 2).sum(axis=1) ** 0.5\n    risks.append(y[d.argsort(kind="stable")[:15]].mean())\ntest = test.assign(risk=risks)\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\ntrain = df[df["week"] <= 11]\ntest = df[df["week"] == 12]\nfeats = ["wait_days", "distance_km", "previous_no_shows", "sms_reminder"]\nlo = train[feats].min()\nhi = train[feats].max()\nX = ((train[feats] - lo) / (hi - lo)).to_numpy()\ny = train["no_show"].to_numpy()\nT = ((test[feats] - lo) / (hi - lo)).to_numpy()\nrisks = []\nfor row in T:\n    d = ((X - row) ** 2).sum(axis=1) ** 0.5\n    risks.append(y[d.argsort(kind="stable")[:15]].mean())\ntest = test.assign(risk=risks)\ncalls = test.nlargest(10, "risk")\nprint(calls["no_show"].sum())\n',
        hint: 'calls = test.nlargest(10, "risk"), then calls["no_show"].sum()',
        checks: [
          { message: 'Print 7', outputEquals: '7' },
          { message: 'A list of 10', expr: 'len(calls) == 10' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why give Bisi a ranked list instead of "miss" / "come" labels?',
        options: [
          { text: 'She can only make about 10 calls, so she needs the riskiest first' },
          { text: 'Labels are illegal', why: 'They\'re fine. A ranking just matches her job better.' },
          { text: 'The predictor can\'t make labels', why: 'It can. The ranking is simply more useful here.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the v0.3 setting to its value.',
        pairs: [
          ['Features', 'wait, distance, past no-shows, reminder'],
          ['Neighbours (k)', '15'],
          ['Training weeks', '1 to 11'],
          ['Test week', '12'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of v0.3, or not yet?',
        groups: ['In v0.3', 'Not yet'],
        items: [
          { text: 'Scaled features', group: 0 },
          { text: 'A locked-away test week', group: 0 },
          { text: 'A library like scikit-learn', group: 1 },
          { text: 'Rain and clinic as features', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: '7 of my 10 calls would have gone to people who missed. Before, I called whoever I remembered.',
        prompt: "Halima's best reply?",
        options: [
          { text: 'And 3 calls go to people who\'d have come anyway, which costs only a friendly call. We\'ll keep testing it on new weeks.' },
          { text: 'It\'ll be 7 of 10 forever.', why: 'One week is one test. Keep checking.' },
          { text: 'Stop calling the other 3 kinds of patient.', why: 'Wrong flags only cost a call. That\'s why calls are a good action.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The call list.',
        language: 'python',
        template: 'test = test.[[1]](risk=risks)\ncalls = test.[[2]](10, "risk")',
        blanks: [['assign'], ['nlargest']],
        distractors: ['append', 'nsmallest'],
      },
      {
        kind: 'findBug',
        prompt: 'This gives Bisi the 10 SAFEST bookings. Which line?',
        language: 'python',
        lines: ['test = test.assign(risk=risks)', 'calls = test.nsmallest(10, "risk")', 'print(calls["appointment_id"])'],
        bug: 1,
        fix: 'calls = test.nlargest(10, "risk")',
        explanation: 'The riskiest have the LARGEST risk.',
      },
      {
        kind: 'mcq',
        prompt: 'Ten random calls in week 12 would reach about how many no-shows?',
        options: [
          { text: 'About 2 (10 x 37/200 = 1.85)' },
          { text: 'About 7', why: 'That\'s the predictor\'s list, not random calls.' },
          { text: 'About 10', why: 'Only 37 of 200 missed.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Of the 10 riskiest week-12 bookings, how many really missed?',
        answers: ['7', 'seven'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Halima built a model from nothing but loops, lists and a distance. What part do you understand best now, and which part still feels like magic?',
    starters: ['I understand...', 'Still magic:'],
  },
  deepen: {
    title: 'Next: a fair test',
    summary: 'One test week is a start. Chapter 4 asks harder questions: is week 12 typical? Are there leaks we haven\'t spotted? What score should we report?',
  },
  notes: 'v0.3: weeks 1-11 train (2,200), week 12 test (200, 37 no-shows), 4 scaled features, k = 15. Top 10 by risk: 7 missed; random 10 expected 1.85.',
};

export default lesson;
