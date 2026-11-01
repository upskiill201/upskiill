import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 13 — How good is it? The first real test: 20 unseen patients, a risk score for each. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'How good is it?',
  summary: 'The first real test: 20 week-12 bookings the predictor has never seen, four scaled features, 15 neighbours each. Halima expected a clear win. What she gets is more interesting.',
  minutes: 13,
  outcomes: [
    'Run the predictor on unseen patients with pandas',
    'Turn the neighbours\' vote into a risk score',
    'See why "miss or come" can hide a useful ranking',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'The first 20 of week 12',
      text: 'For each test patient, the loop finds the 15 nearest training patients and works out risk, the share of them who missed. 5 of the 20 really missed. The highest risk was 0.47, so a vote never said "miss", and accuracy was 75%: no better than "everyone comes". But sort by risk, and 2 of the top 5 really missed.',
      hotspots: [
        { phrase: 'the share of them who missed', note: 'risk = train.loc[near, "no_show"].mean(). 0.2 means 3 of the 15 nearest missed.' },
        { phrase: 'The highest risk was 0.47', note: 'No patient had more than half their neighbours miss, so the majority vote said "come" for everyone.' },
        { phrase: 'no better than "everyone comes"', note: 'Accuracy alone makes the predictor look useless. That\'s the accuracy trap, and Chapter 7 is all about it.' },
        { phrase: '2 of the top 5 really missed', note: 'Calling 5 random patients would find about 1.25 no-shows on average. The risk ranking does better, even here.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Risk scores',
      caption: '20 unseen patients, 15 neighbours each.',
      code: 'import pandas as pd\n\ndf = pd.read_csv("appointments.csv")\nfeats = ["wait_days", "distance_km", "previous_no_shows", "sms_reminder"]\ntrain = df[df["week"] <= 11]\ntest = df[df["week"] == 12].head(20)\nlo = train[feats].min()\nhi = train[feats].max()\ntrain_s = (train[feats] - lo) / (hi - lo)\ntest_s = (test[feats] - lo) / (hi - lo)\n\nrisks = []\nfor i in range(len(test_s)):\n    d = ((train_s - test_s.iloc[i]) ** 2).sum(axis=1) ** 0.5\n    near = d.nsmallest(15).index\n    risks.append(train.loc[near, "no_show"].mean())\n\ntest = test.assign(risk=risks)\nprint(test.nlargest(5, "risk")[["appointment_id", "risk", "no_show"]])\n',
      challenge: 'How many of the top 5 really missed?',
    },
  ],
  apply: {
    scenario: 'The first real test.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Add the line that stores each patient\'s risk, then print the highest risk rounded to 3 places',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\nfeats = ["wait_days", "distance_km", "previous_no_shows", "sms_reminder"]\ntrain = df[df["week"] <= 11]\ntest = df[df["week"] == 12].head(20)\nlo = train[feats].min()\nhi = train[feats].max()\ntrain_s = (train[feats] - lo) / (hi - lo)\ntest_s = (test[feats] - lo) / (hi - lo)\nrisks = []\nfor i in range(len(test_s)):\n    d = ((train_s - test_s.iloc[i]) ** 2).sum(axis=1) ** 0.5\n    near = d.nsmallest(15).index\n    # store the share of the 15 nearest who missed\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\nfeats = ["wait_days", "distance_km", "previous_no_shows", "sms_reminder"]\ntrain = df[df["week"] <= 11]\ntest = df[df["week"] == 12].head(20)\nlo = train[feats].min()\nhi = train[feats].max()\ntrain_s = (train[feats] - lo) / (hi - lo)\ntest_s = (test[feats] - lo) / (hi - lo)\nrisks = []\nfor i in range(len(test_s)):\n    d = ((train_s - test_s.iloc[i]) ** 2).sum(axis=1) ** 0.5\n    near = d.nsmallest(15).index\n    risks.append(train.loc[near, "no_show"].mean())\nprint(round(max(risks), 3))\n',
        hint: 'risks.append(train.loc[near, "no_show"].mean()), then print after the loop',
        checks: [
          { message: 'Print 0.467', outputEquals: '0.467' },
          { message: 'One risk per patient', expr: 'len(risks) == 20' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A patient\'s risk is 0.2 with 15 neighbours. What does that mean?',
        options: [
          { text: 'They will miss 20% of the way', why: 'It\'s the share of similar patients who missed.' },
          { text: '2 neighbours missed', why: '0.2 x 15 = 3.' },
          { text: '3 of their 15 nearest neighbours missed' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'The highest risk was 0.47, so the vote said "come" for all 20. Accuracy 75%. Why is that misleading?',
        options: [
          { text: 'It isn\'t: 75% is great', why: 'Doing nothing scores the same.' },
          { text: '"Everyone comes" also scores 75% here: accuracy can\'t tell a useful ranking from no model at all' },
          { text: 'The patients were wrong', why: 'The measure hides what the risks show.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the result for the first 20 week-12 patients.',
        pairs: [
          ['Really missed', '5 of 20'],
          ['Highest risk', '0.467'],
          ['Accuracy of the vote', '75%'],
          ['Missed among the 5 riskiest', '2'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'I don\'t need yes or no. I need to know who to call first.',
        prompt: "Halima's best reply?",
        options: [
          { text: 'The predictor can only say yes or no.', why: 'It gives a risk for every patient. Sort by it.' },
          { text: 'Call everyone.', why: 'Bisi can make about 10 calls. A ranking makes them count.' },
          { text: 'Then the risk score is what you want: sort tomorrow\'s list from highest risk to lowest and call from the top.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The risk for one patient.',
        language: 'python',
        template: 'near = d.[[1]](15).index\nrisks.append(train.loc[near, "no_show"].[[2]]())',
        blanks: [['nsmallest'], ['mean']],
        distractors: ['nlargest', 'sum'],
      },
      {
        kind: 'findBug',
        prompt: 'This finds the 15 LEAST similar patients. Which line?',
        language: 'python',
        lines: ['d = ((train_s - test_s.iloc[i]) ** 2).sum(axis=1) ** 0.5', 'near = d.nlargest(15).index', 'risks.append(train.loc[near, "no_show"].mean())'],
        bug: 1,
        fix: 'near = d.nsmallest(15).index',
        explanation: 'Nearest means the smallest distances.',
      },
      {
        kind: 'sortGroups',
        prompt: 'What does the result tell Halima?',
        groups: ['True', 'Not true'],
        items: [
          { text: 'Accuracy alone hides the ranking', group: 0 },
          { text: 'The predictor is useless', group: 1 },
          { text: '20 patients is a small test', group: 0 },
          { text: 'The vote is the only output', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Calling 5 random patients out of these 20 would find about how many no-shows?',
        options: [
          { text: 'About 1 (5 x 5/20 = 1.25)' },
          { text: 'About 5', why: 'Only 5 of the 20 missed in total.' },
          { text: 'None', why: 'About a quarter of any 5 would be no-shows on average.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many of the first 20 week-12 patients really missed?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'The same predictor looks useless by one measure and useful by another. Which measure matches what Bisi actually needs? Why?',
    starters: ['Bisi needs...', 'So the right measure is...'],
  },
  deepen: {
    title: 'Small tests wobble',
    summary: '20 patients is tiny: one patient changes the result by 5%. Lesson 14 makes the predictor fast enough to test all 200, which is fairer.',
  },
  notes: 'First 20 week-12 rows; train weeks 1-11; features wait_days, distance_km, previous_no_shows, sms_reminder; min-max scaled with training min/max; k = 15. 5 of 20 missed; max risk 0.467; vote (> 0.5) flags none: 75% = baseline; top 5 by risk: 2 missed (A12210, A12211). Expected at random: 1.25.',
};

export default lesson;
