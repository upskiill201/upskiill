import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14: scaling, a fair split, risk scores, speed. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: the first real test',
  summary: 'Scaled features, a locked-away test week, a risk score per booking, and fast enough for all 200. Twelve of the 20 riskiest really missed. Quick check before Halima asks why it works.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Scale, split and score without notes', 'Read a risk ranking honestly'],
  learn: [
    {
      kind: 'story',
      title: 'Twelve of twenty',
      beats: [
        { speaker: 'narrator', text: 'Halima\'s note: "Week 12, 200 bookings never seen. Top 20 by risk: 12 missed. At random: about 4."' },
        { speaker: 'bisi', text: 'So if I call the top 20, most of my calls go to people who really need them.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: testing the predictor.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Scale a 30-day wait with min 0 and max 45, rounded to 3 places',
        starter: 'value = 30\nlo = 0\nhi = 45\n',
        solution: 'value = 30\nlo = 0\nhi = 45\nprint(round((value - lo) / (hi - lo), 3))\n',
        hint: '(value - lo) / (hi - lo)',
        checks: [{ message: 'Print 0.667', outputEquals: '0.667' }],
      },
      {
        kind: 'mcq',
        prompt: 'Which split gives a fair test?',
        options: [
          { text: 'Train on weeks 1–11, test on week 12' },
          { text: 'Train and test on all 12 weeks', why: 'Test patients would look themselves up.' },
          { text: 'Test on the first 50 training bookings', why: 'That\'s Chidi\'s 100% mistake.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the share of week-12 bookings that came, as a percentage with 1 decimal ("everyone comes")',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\ntest = df[df["week"] == 12]\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\ntest = df[df["week"] == 12]\nprint(f"{1 - test[\'no_show\'].mean():.1%}")\n',
        hint: '1 - the no-show rate, with :.1%',
        checks: [{ message: 'Print 81.5%', outputEquals: '81.5%' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its line of code.',
        pairs: [
          ['Same ruler for all', '(test[feats] - lo) / (hi - lo)'],
          ['Locked-away week', 'df[df["week"] == 12]'],
          ['Risk score', 'y[near].mean()'],
          ['Fast grids', '.to_numpy()'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line makes the test unfair?',
        language: 'python',
        lines: [
          'train = df[df["week"] <= 11]',
          'test = df[df["week"] == 12]',
          'lo = test[feats].min()',
          'hi = test[feats].max()',
        ],
        bug: 2,
        fix: 'lo = train[feats].min() (and hi from train too)',
        explanation: 'The ruler must come from the training data. (Line 4 has the same problem.)',
      },
      {
        kind: 'sortGroups',
        prompt: 'Useful for Bisi\'s calls, or not?',
        groups: ['Useful', 'Not useful'],
        items: [
          { text: 'Bookings sorted by risk', group: 0 },
          { text: 'Accuracy alone', group: 1 },
          { text: 'How many of the top 20 really missed', group: 0 },
          { text: 'A score on the training bookings', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: '12 out of 20 is only 60%. That\'s a fail.',
        prompt: "Halima's best reply?",
        options: [
          { text: 'Random calls would reach about 4 no-shows out of 20. The list reaches 12, three times as many. For Bisi\'s evening, that\'s a big win.' },
          { text: 'Yes, it failed.', why: 'Compared with random calls, it\'s three times better.' },
          { text: 'It\'s 100% really.', why: 'It\'s 12 of 20. Be honest, then compare with the alternative.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The nearest 15, fast.',
        language: 'python',
        template: 'd = ((X - row) ** 2).sum(axis=1) ** 0.5\nnear = d.argsort(kind="stable")[[[1]]]\nrisks.append(y[near].[[2]]())',
        blanks: [[':15'], ['mean']],
        distractors: ['-15:', 'sum'],
      },
      {
        kind: 'mcq',
        prompt: 'A risk of 0.6 with 15 neighbours means...',
        options: [
          { text: '9 of the 15 most similar past patients missed' },
          { text: 'The patient is 60% likely to be late', why: 'It\'s the share of similar patients who missed.' },
          { text: '6 neighbours missed', why: '0.6 x 15 = 9.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps of the real test.',
        lines: ['Split into weeks 1–11 and week 12', 'Scale with the training min and max', 'Find each test patient\'s 15 nearest', 'Work out each risk', 'Check how many of the riskiest really missed'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how many no-shows would 20 random week-12 calls reach? (round to a whole number)',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Folake heard "60%" and thought "fail". Halima heard "three times better than random". How do you choose which comparison to lead with, honestly?',
    starters: ['I\'d lead with...', 'Honestly means...'],
  },
  notes: 'Checkpoint for Chapter 3 lessons 11-14. 30/45 = 0.667. Week 12: 163/200 came = 81.5%. Top 20 by risk: 12 missed vs 3.7 at random.',
};

export default lesson;
