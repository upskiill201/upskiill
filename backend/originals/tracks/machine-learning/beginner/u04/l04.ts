import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { SETUP } from './code';

/** Chapter 4 · Lesson 4 — Never peek at the test set. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Never peek at the test set',
  summary: 'Chidi tries five values of k on week 12 and keeps the best. It feels like good practice. It\'s actually peeking: the test set has quietly become part of the training. Five beliefs about test sets, tested.',
  minutes: 11,
  outcomes: [
    'Explain how choosing settings on the test set makes its score too hopeful',
    'Spot the quiet ways people peek',
    'Keep the test set for one final check',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Trying a few settings on the test set and keeping the best is fine.',
          isFact: false,
          explain: 'Myth. Every choice made by looking at the test score fits the predictor to that one week. The winning score is partly luck, and it will be too hopeful.',
        },
        {
          text: 'A test set is only honest if it is used once, at the end.',
          isFact: true,
          explain: 'Fact. Its job is to play the part of bookings you have never seen. Once your choices depend on it, it can\'t play that part any more.',
        },
        {
          text: 'Looking at the test bookings is harmless if you don\'t train on them.',
          isFact: false,
          explain: 'Myth. Even reading them can steer your choices: "Gumel looks different in week 12, let\'s add a Gumel rule." That\'s peeking.',
        },
        {
          text: 'Scaling with the min and max of the whole table can leak test information.',
          isFact: true,
          explain: 'Fact. The ruler should come from the training set only. In this data the ranges happen to match, but in real data they often don\'t.',
        },
        {
          text: 'If you peeked by accident, the only fix is a fresh test set.',
          isFact: true,
          explain: 'Fact. For us that means a new week: week 13. Lesson 12 shows how to avoid needing one, with a validation set.',
        },
      ],
    },
    {
      kind: 'story',
      title: 'Chidi\'s five tries',
      beats: [
        { speaker: 'chidi', text: 'I tried k = 1, 5, 15, 31 and 51 on week 12. 15 wins with 12 of 20. Tuned!' },
        { speaker: 'miracle', text: 'You picked the winner by looking at the exam. So "12 of 20" is now the best of five tries, not a fair test.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Five tries on the test set',
      caption: 'This is what peeking looks like. Run it, then read lesson 12 for the honest version.',
      code: SETUP + '\nfor k in [1, 5, 15, 31, 51]:\n    t = test.assign(risk=knn_risk(train, test, feats, k))\n    print(k, t.nlargest(20, "risk")["no_show"].sum())\n',
      challenge: 'If you kept the best k, how hopeful would "12 of 20" be?',
    },
  ],
  apply: {
    scenario: 'Peeking, or not?',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print each k and how many of its top 20 week-12 bookings missed, for k in 1, 5, 15, 31, 51',
        starter: SETUP + 'for k in [1, 5, 15, 31, 51]:\n    t = test.assign(risk=knn_risk(train, test, feats, k))\n',
        solution: SETUP + 'for k in [1, 5, 15, 31, 51]:\n    t = test.assign(risk=knn_risk(train, test, feats, k))\n    print(k, t.nlargest(20, "risk")["no_show"].sum())\n',
        hint: 'print(k, t.nlargest(20, "risk")["no_show"].sum())',
        checks: [{ message: 'Print five lines: 1 7, 5 9, 15 12, 31 11, 51 10', outputEquals: '1 7\n5 9\n15 12\n31 11\n51 10' }],
      },
      {
        kind: 'mcq',
        prompt: 'Chidi keeps k = 15 because it scored best on week 12. What\'s wrong with then reporting "12 of 20"?',
        options: [
          { text: 'Nothing: 12 is the real score', why: 'It\'s the winner of a contest held on the test set.' },
          { text: 'k = 15 is a bad choice', why: 'The choice may be fine. The problem is how it was made.' },
          { text: 'It\'s the best of five tries on the same week, so it\'s partly luck and too hopeful' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Peeking, or fair?',
        groups: ['Peeking', 'Fair'],
        items: [
          { text: 'Choosing k by the test score', group: 0 },
          { text: 'Scoring on week 12 once, at the end', group: 1 },
          { text: 'Adding a rule after reading week-12 bookings', group: 0 },
          { text: 'Scaling with the training min and max', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'But I only looked at the score, not the bookings.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'The score still steered your choice. Choose settings on other weeks, then open week 12 once.' },
          { text: 'Then it\'s fine.', why: 'Choosing by the score is still peeking.' },
          { text: 'Delete week 12.', why: 'Keep it. Just stop using it to choose.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Choose settings on [[1]] data. Use the test set [[2]], at the end.',
        blanks: [['other', 'training'], ['once']],
        distractors: ['test', 'daily'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line leaks test information into the predictor?',
        language: 'python',
        lines: ['lo = df[feats].min()', 'hi = train[feats].max()', 'X = ((train[feats] - lo) / (hi - lo)).to_numpy()'],
        bug: 0,
        fix: 'lo = train[feats].min()',
        explanation: 'The ruler should come from training data only. df includes the test week.',
      },
      {
        kind: 'writeCode',
        prompt: 'Peek-free: score k = 15 on week 12, once. Print how many of its top 20 missed',
        starter: SETUP,
        solution: SETUP + 't = test.assign(risk=knn_risk(train, test, feats, 15))\nprint(t.nlargest(20, "risk")["no_show"].sum())\n',
        hint: 't = test.assign(risk=knn_risk(train, test, feats, 15))',
        checks: [{ message: 'Print 12', outputEquals: '12' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match k to its top-20 score on week 12.',
        pairs: [
          ['k = 1', '7 of 20'],
          ['k = 5', '9 of 20'],
          ['k = 15', '12 of 20'],
          ['k = 51', '10 of 20'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many different values of k did Chidi try on week 12?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'You realise you peeked. What\'s the honest fix?',
        options: [
          { text: 'Report the score anyway with a smile', why: 'It\'s still too hopeful.' },
          { text: 'Pick the worst k instead', why: 'That\'s peeking in the other direction.' },
          { text: 'Test once on fresh bookings, like week 13, and report that' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Think of an exam where you saw the questions in advance. Did your score measure what you knew?',
    starters: ['It measured...', 'A fair version would be...'],
  },
  deepen: {
    title: 'Why the best of many is too hopeful',
    summary: 'Every score has some luck in it. If you try five settings and keep the best, you keep the luckiest one too. The more you try, the more hopeful the winner looks.',
  },
  notes: 'Week 12, 4 features, top 20 by risk: k=1 7, k=5 9, k=15 12, k=31 11, k=51 10. Training min/max equal whole-file min/max in this dataset (wait 0-45, distance 1-60, previous 0-4, sms 0-1).',
};

export default lesson;
