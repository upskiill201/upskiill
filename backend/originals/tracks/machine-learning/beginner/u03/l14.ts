import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 14 — Slow with lots of data: 440,000 distances, and the NumPy speed-up. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Slow with lots of data',
  summary: 'Twenty patients took a moment. All 200 would take long enough to time out on a phone. Emmanuel: "And next year we\'ll have 50,000 bookings." Tey explains where the time goes, and a trick that makes it many times faster.',
  minutes: 12,
  outcomes: [
    'Count how much work nearest neighbours does',
    'Speed it up with .to_numpy()',
    'Know why libraries use smarter tricks',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Every prediction compares one patient with every training patient. 200 test patients x 2,200 training patients = 440,000 distances. Each one is a few sums and a square root.', replies: ['Why is pandas slow at it?'] },
        { tey: 'pandas is built for big tables, and every small step inside a loop has a cost. Called 200 times, the costs add up.', replies: ['So what\'s faster?'] },
        { tey: 'Turn the tables into plain number grids first: X = train_s.to_numpy(). NumPy, the engine underneath pandas, does the maths on the whole grid at once. Same answers, many times faster here.', replies: ['What about 50,000 bookings?'] },
        { tey: 'Then even NumPy gets slow, and that\'s when libraries help: they organise the training patients so most of them never need checking. You\'ll use one in Chapter 5.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'All 200, fast',
      caption: 'The same predictor, on number grids.',
      code: 'import pandas as pd\n\ndf = pd.read_csv("appointments.csv")\nfeats = ["wait_days", "distance_km", "previous_no_shows", "sms_reminder"]\ntrain = df[df["week"] <= 11]\ntest = df[df["week"] == 12]\nlo = train[feats].min()\nhi = train[feats].max()\nX = ((train[feats] - lo) / (hi - lo)).to_numpy()\ny = train["no_show"].to_numpy()\nT = ((test[feats] - lo) / (hi - lo)).to_numpy()\n\nrisks = []\nfor row in T:\n    d = ((X - row) ** 2).sum(axis=1) ** 0.5\n    near = d.argsort(kind="stable")[:15]\n    risks.append(y[near].mean())\n\ntest = test.assign(risk=risks)\nprint(test.nlargest(20, "risk")["no_show"].sum(), "of the 20 riskiest missed")\n',
      challenge: 'Change 20 to 10. How many of the 10 riskiest missed?',
    },
  ],
  apply: {
    scenario: 'Making it fast.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'How many distances for 200 test patients against 2,200 training patients? Print it',
        starter: 'test_patients = 200\ntrain_patients = 2200\n',
        solution: 'test_patients = 200\ntrain_patients = 2200\nprint(test_patients * train_patients)\n',
        hint: 'Multiply them',
        checks: [{ message: 'Print 440000', outputEquals: '440000' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why does nearest neighbours slow down as the data grows?',
        options: [
          { text: 'Every prediction compares with every training patient' },
          { text: 'Python gets tired', why: 'It\'s the amount of work: one comparison per training patient.' },
          { text: 'It doesn\'t slow down', why: 'Double the training patients and you double the comparisons.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Run the fast predictor on all 200 and print how many of the 20 riskiest really missed',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\nfeats = ["wait_days", "distance_km", "previous_no_shows", "sms_reminder"]\ntrain = df[df["week"] <= 11]\ntest = df[df["week"] == 12]\nlo = train[feats].min()\nhi = train[feats].max()\nX = ((train[feats] - lo) / (hi - lo)).to_numpy()\ny = train["no_show"].to_numpy()\nT = ((test[feats] - lo) / (hi - lo)).to_numpy()\nrisks = []\nfor row in T:\n    d = ((X - row) ** 2).sum(axis=1) ** 0.5\n    near = d.argsort(kind="stable")[:15]\n    risks.append(y[near].mean())\ntest = test.assign(risk=risks)\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\nfeats = ["wait_days", "distance_km", "previous_no_shows", "sms_reminder"]\ntrain = df[df["week"] <= 11]\ntest = df[df["week"] == 12]\nlo = train[feats].min()\nhi = train[feats].max()\nX = ((train[feats] - lo) / (hi - lo)).to_numpy()\ny = train["no_show"].to_numpy()\nT = ((test[feats] - lo) / (hi - lo)).to_numpy()\nrisks = []\nfor row in T:\n    d = ((X - row) ** 2).sum(axis=1) ** 0.5\n    near = d.argsort(kind="stable")[:15]\n    risks.append(y[near].mean())\ntest = test.assign(risk=risks)\nprint(test.nlargest(20, "risk")["no_show"].sum())\n',
        hint: 'test.nlargest(20, "risk")["no_show"].sum()',
        checks: [{ message: 'Print 12', outputEquals: '12' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to what it does.',
        pairs: [
          ['.to_numpy()', 'Turns a table into a plain number grid'],
          ['d.argsort(kind="stable")[:15]', 'Positions of the 15 nearest'],
          ['y[near].mean()', 'Share of them who missed'],
          ['test.nlargest(20, "risk")', 'The 20 riskiest bookings'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Of the 20 riskiest week-12 bookings, 12 really missed. Picking 20 at random would find about 3.7. What does that mean for Bisi?',
        options: [
          { text: 'Calling from the top of the risk list finds about three times as many no-shows' },
          { text: 'Nothing: 12 isn\'t 20', why: 'No list is perfect. 12 vs 3.7 is a big difference.' },
          { text: 'She should call at random', why: 'The ranking does far better than random.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'Next year we\'ll have 50,000 bookings. Will this still work?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'It would get slow, because every prediction checks every booking. That\'s why we\'ll switch to a library in Chapter 5 that skips most of them.' },
          { text: 'It gets faster with more data.', why: 'More training patients means more distances.' },
          { text: 'It can never handle more than 2,200.', why: 'It can; it just gets slower.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Number grids.',
        language: 'python',
        template: 'X = train_s.[[1]]()\ny = train["no_show"].to_numpy()\nnear = d.[[2]](kind="stable")[:15]',
        blanks: [['to_numpy'], ['argsort']],
        distractors: ['to_list', 'sort_values'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Does this make each prediction more work, or less?',
        groups: ['More work', 'Less work'],
        items: [
          { text: 'More training patients', group: 0 },
          { text: 'More features per patient', group: 0 },
          { text: 'Number grids instead of tables in the loop', group: 1 },
          { text: 'A library that skips far-away patients', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'This gives the 15 FARTHEST patients. Which line?',
        language: 'python',
        lines: ['d = ((X - row) ** 2).sum(axis=1) ** 0.5', 'near = d.argsort(kind="stable")[-15:]', 'risks.append(y[near].mean())'],
        bug: 1,
        fix: 'near = d.argsort(kind="stable")[:15]',
        explanation: 'argsort puts the smallest distances first; [-15:] takes the end.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Of the 20 riskiest week-12 bookings, how many really missed?',
        answers: ['12', 'twelve'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'The predictor got about three times better than random at finding no-shows. Is that good enough to change how Bisi works? What would you want to know first?',
    starters: ['I think it\'s...', 'I\'d want to know...'],
  },
  deepen: {
    title: 'kind="stable"',
    summary: 'Many training patients have exactly the same features, so distances tie. "stable" breaks ties the same way every time (by row order), so everyone gets identical answers.',
  },
  notes: 'All 200 week-12 rows, k = 15, 4 scaled features: top 20 by risk contain 12 no-shows (top 10: 7). Random 20 expected 20 x 37/200 = 3.7. NumPy version gives the same risks as the pandas loop (checked on the first 20). Measured 0.22 s vs about 1 s for the pandas loop on 50 rows (desktop, Pyodide).',
};

export default lesson;
