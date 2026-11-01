import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { LR_FIT } from './code';

/** Chapter 6 · Lesson 17 — Classifier bugs: the mistakes that look like they worked. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Classifier bugs',
  summary: 'Chidi\'s call list caught zero no-shows. The code ran without a single error. Five beliefs about classifier bugs, and the one-character mistake behind Chidi\'s list.',
  minutes: 12,
  outcomes: [
    'Spot the common classifier bugs',
    'Check a call list before trusting it',
    'Fix the wrong-column mistake',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'If the code runs without errors, the model is working.',
          isFact: false,
          explain: 'Myth. Chidi\'s list ran perfectly and caught 0 of 20. Python can\'t tell you you picked the wrong column.',
        },
        {
          text: 'Using predict_proba column 0 instead of column 1 ranks bookings backwards.',
          isFact: true,
          explain: 'Fact. Column 0 is the chance of coming. Sorting by it puts the safest patients first. Top 20 by column 0 on week 12: 0 no-shows.',
        },
        {
          text: 'A quick look at the top of the list can catch big bugs.',
          isFact: true,
          explain: 'Fact. If the "riskiest" patients have 0 past misses and got a reminder, something is wrong. Halima\'s sense check from lesson 11.',
        },
        {
          text: 'Training on week 12 makes the model better at week 12, so it\'s fine.',
          isFact: false,
          explain: 'Myth. That\'s testing on the answers. The score looks great and means nothing about next week.',
        },
        {
          text: 'Mixing up the order of the feature columns between training and predicting can silently ruin predictions.',
          isFact: true,
          explain: 'Fact. Always use the same feats list for fit and for predict. Passing a DataFrame with named columns helps scikit-learn warn you.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The backwards list',
      caption: 'Chidi\'s list next to Halima\'s.',
      code: LR_FIT + '\nprobs = model.predict_proba(test[feats])\nchidi = test.assign(p=probs[:, 0]).nlargest(20, "p")\nhalima = test.assign(p=probs[:, 1]).nlargest(20, "p")\nprint("Chidi:", chidi["no_show"].sum(), "| past misses at the top:", chidi["previous_no_shows"].head(5).tolist())\nprint("Halima:", halima["no_show"].sum(), "| past misses at the top:", halima["previous_no_shows"].head(5).tolist())\n',
      challenge: 'Look at the past misses at the top of each list. Which would a nurse notice is wrong?',
    },
  ],
  apply: {
    scenario: 'Classifier bugs.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Rank week 12 by column 0 (Chidi\'s bug) and print how many of the top 20 really missed',
        starter: LR_FIT + 'probs = model.predict_proba(test[feats])\n',
        solution: LR_FIT + 'probs = model.predict_proba(test[feats])\nchidi = test.assign(p=probs[:, 0])\nprint(chidi.nlargest(20, "p")["no_show"].sum())\n',
        hint: 'test.assign(p=probs[:, 0]).nlargest(20, "p")',
        checks: [{ message: 'Print 0', outputEquals: '0' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'No errors means it works', group: 0 },
          { text: 'Column 0 ranks backwards', group: 1 },
          { text: 'Training on week 12 is fine', group: 0 },
          { text: 'Look at the top of the list', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Chidi\'s list caught 0 of 20. What gave it away fastest?',
        options: [
          { text: 'An error message', why: 'There wasn\'t one.' },
          { text: 'The "riskiest" patients had no past misses: a nurse would spot it at once' },
          { text: 'The code was slow', why: 'It ran fine.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix it: rank by column 1 and print the top-20 score',
        starter: LR_FIT + 'probs = model.predict_proba(test[feats])\n',
        solution: LR_FIT + 'probs = model.predict_proba(test[feats])\nhalima = test.assign(p=probs[:, 1])\nprint(halima.nlargest(20, "p")["no_show"].sum())\n',
        hint: 'probs[:, 1]',
        checks: [{ message: 'Print 12', outputEquals: '12' }],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'My list got zero. Is logistic regression broken?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Yes, switch to a tree.', why: 'The model isn\'t the problem.' },
          { text: 'Zero is normal.', why: 'Random picking would get about 4.' },
          { text: 'The model\'s fine; you sorted by column 0, the chance of coming. Switch to column 1 and it catches 12.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the bug to its symptom.',
        pairs: [
          ['Wrong predict_proba column', 'List full of safe patients'],
          ['Training on the test week', 'Score too good to be true'],
          ['Features in a different order', 'Strange predictions, no error'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The safe habit.',
        language: 'python',
        template: 'print(model.[[1]])  # check: [0, 1]\nrisk = model.predict_proba(test[feats])[:, [[2]]]',
        blanks: [['classes_'], ['1']],
        distractors: ['coef_', '0'],
      },
      {
        kind: 'findBug',
        prompt: 'Find the leak.',
        language: 'python',
        lines: ['train = df[df["week"] <= 12]', 'test = df[df["week"] == 12]', 'model = LogisticRegression().fit(train[feats], train["no_show"])'],
        bug: 0,
        fix: 'train = df[df["week"] <= 11]',
        explanation: 'Week 12 is in both training and test: the model has seen the answers.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which predict_proba column holds the no-show chance when classes_ is [0, 1]?',
        answers: ['1', 'column 1', 'one'],
        placeholder: 'A column',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the best first check on any new call list?',
        options: [
          { text: 'Run it again', why: 'It\'ll give the same list.' },
          { text: 'Read the top few rows and ask: would a nurse agree these are risky?' },
          { text: 'Check the code has no errors', why: 'Chidi\'s had none.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'When did something you made "work" but give the wrong answer? How did you find out?',
    starters: ['Once...', 'I noticed because...'],
  },
  deepen: {
    title: 'Named columns',
    summary: 'When you fit with a DataFrame, scikit-learn remembers the column names and warns if you predict with different ones. It\'s one reason to keep data in DataFrames rather than bare arrays.',
  },
  notes: 'Week 12 LR: ranking by predict_proba[:, 0] gives top 20 = 0 no-shows; by [:, 1] gives 12.',
};

export default lesson;
