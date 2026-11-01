import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { FEATS, KNN, LOAD, SETUP } from './code';

/** Chapter 4 · Lesson 15 — Checkpoint 3: duplicates, validation, seeds, honest reports. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: three piles',
  summary: 'Miracle hands Halima the marker: "Draw the whole process." Three piles, one clean file, a fixed seed, and a sentence with a baseline. Check you can do every step.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Use training, validation and test sets', 'Report a score with its baseline and range'],
  learn: [
    {
      kind: 'story',
      title: 'The whiteboard',
      beats: [
        { speaker: 'halima', text: 'Clean, then split. Learn on 1 to 9, choose on 10 and 11, test on 12 once. Fix the seed. Report with the baseline.' },
        { speaker: 'miracle', text: 'That\'s a process anyone can repeat. That\'s the point.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: the whole process.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Load appointments_raw.csv, remove duplicates, and print how many rows are left',
        starter: 'import pandas as pd\nraw = pd.read_csv("appointments_raw.csv")\n',
        solution: 'import pandas as pd\nraw = pd.read_csv("appointments_raw.csv")\nclean = raw.drop_duplicates()\nprint(len(clean))\n',
        hint: 'clean = raw.drop_duplicates()',
        checks: [{ message: 'Print 2400', outputEquals: '2400' }],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the whole process.',
        lines: ['Remove duplicates', 'Drop leaky columns', 'Split into training, validation and test', 'Choose settings on validation', 'Test once and report with a baseline'],
      },
      {
        kind: 'mcq',
        prompt: 'Weeks 10 and 11 pick k = 15. What do you train on for the final week-12 test?',
        options: [
          { text: 'Weeks 1 to 11' },
          { text: 'Weeks 1 to 9', why: 'Once k is chosen, use all the past you have.' },
          { text: 'Weeks 1 to 12', why: 'Week 12 is the test.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Score k = 5 on the validation weeks: print how many of its top 40 missed',
        starter: LOAD + FEATS + KNN + 'train = df[df["week"] <= 9]\nval = df[df["week"].isin([10, 11])]\n',
        solution: LOAD + FEATS + KNN + 'train = df[df["week"] <= 9]\nval = df[df["week"].isin([10, 11])]\nv = val.assign(risk=knn_risk(train, val, feats, 5))\nprint(v.nlargest(40, "risk")["no_show"].sum())\n',
        hint: 'v = val.assign(risk=knn_risk(train, val, feats, 5))',
        checks: [{ message: 'Print 23', outputEquals: '23' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which pile?',
        groups: ['Validation', 'Test'],
        items: [
          { text: 'Compare k = 5 and k = 15', group: 0 },
          { text: 'The number on the board slide', group: 1 },
          { text: 'Look at it as often as you like', group: 0 },
          { text: 'Open once, at the end', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'My seed gave 13 of 20. Let\'s report that.',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Sure, 13 is real.', why: 'It\'s real but lucky. Report the honest test and the range.' },
          { text: 'Seeds ranged from 6 to 13. Reporting the best one is choosing a lucky draw. We report the week-12 test and the range.' },
          { text: 'Report 6 to be safe.', why: 'Picking the worst is just as misleading.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the habit to the trap it prevents.',
        pairs: [
          ['drop_duplicates() first', 'A booking on both sides'],
          ['A validation set', 'Peeking at the test set'],
          ['A fixed seed', 'Results nobody can repeat'],
          ['A baseline', 'A number that sounds better than it is'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The report.',
        template: 'v0.4\'s top 20 caught [[1]] of the 37 no-shows; random calls would reach about [[2]].',
        blanks: [['12'], ['4', '3.7']],
        distractors: ['19', '20'],
      },
      {
        kind: 'writeCode',
        prompt: 'Final test: learn from weeks 1 to 11 with k = 15 and print the share of week 12 the predictor gets right',
        starter: SETUP,
        solution: SETUP + 't = test.assign(risk=knn_risk(train, test, feats, 15))\nprint(((t["risk"] > 0.5).astype(int) == t["no_show"]).mean())\n',
        hint: 'The accuracy line from lesson 2',
        checks: [{ message: 'Print 0.825', outputEquals: '0.825' }],
      },
      {
        kind: 'findBug',
        prompt: 'Which line breaks the process?',
        language: 'python',
        lines: ['clean = raw.drop_duplicates()', 'val = clean[clean["week"].isin([10, 11])]', 'best_k = pick_best_k(train, test)'],
        bug: 2,
        fix: 'best_k = pick_best_k(train, val)',
        explanation: 'k must be chosen on validation, not on the test week.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many bookings are in the validation weeks (10 and 11)?',
        answers: ['400'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Draw Halima\'s process from memory. Which step would you be most tempted to skip?',
    starters: ['I\'d be tempted to skip...', 'Because...'],
  },
  notes: 'Checkpoint for Chapter 4 lessons 11-14. Raw 2,412 rows, 2,400 after drop_duplicates. Validation (weeks 10-11, trained on 1-9): k = 5 top 40 23; k = 15 24. Week 12 accuracy 0.825.',
};

export default lesson;
