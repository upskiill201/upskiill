import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { LR_FIT, TREE_BASE } from './code';

const TREE2 = 'tree = DecisionTreeClassifier(max_depth=2, random_state=42)\ntree.fit(train[feats], train["no_show"])\n';

/** Chapter 6 · Lesson 11 — predict_proba, compared: smooth chances vs a tree's few values. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'How sure is each model?',
  summary: 'Logistic regression gives almost every booking its own chance: 187 different values on week 12. The depth-2 tree gives only 4. That difference decides how good each one is at ranking Bisi\'s calls.',
  minutes: 12,
  outcomes: [
    'Explain where a tree\'s probabilities come from',
    'Compare how finely two models rank bookings',
    'Find the riskiest booking and check it',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Two kinds of chance',
      steps: [
        { title: '1. A tree\'s chance', body: 'A booking lands in one leaf. Its chance is the share of training bookings in that leaf that missed. A depth-2 tree has 4 leaves, so only 4 possible chances: 0.148, 0.339, 0.596 and 0.711.' },
        { title: '2. Logistic regression\'s chance', body: 'Every booking gets its own score and its own chance. On week 12: 187 different values, from 0.036 to 0.733.' },
        { title: '3. Why it matters for ranking', body: 'With only 4 values, many bookings tie. Which tied booking gets call 20? The tree can\'t say. Logistic regression can.' },
        { title: '4. The result', body: 'Top 20 on week 12: depth-2 tree 11, logistic regression 12. Finer chances, slightly better list.' },
        { title: '5. The riskiest booking', body: 'Logistic regression\'s highest chance, 0.733, goes to A12323: Gumel, 4 past misses, 15 km, no reminder. She did miss.', code: 't.nlargest(1, "p")', language: 'python' },
        { title: '6. Sense check', body: 'Look at the top booking and ask: would a nurse agree? Here, Halima would.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Four values vs 187',
      caption: 'How many different chances each model gives week 12.',
      code: TREE_BASE + '\nmodel = LogisticRegression().fit(train[feats], train["no_show"])\ntree = DecisionTreeClassifier(max_depth=2, random_state=42).fit(train[feats], train["no_show"])\nprint("Tree:", sorted(set(tree.predict_proba(test[feats])[:, 1].round(3))))\nprint("Logistic:", len(set(model.predict_proba(test[feats])[:, 1].round(6))), "different chances")\n',
      challenge: 'Why does a depth-8 tree give more different chances than depth 2?',
    },
  ],
  apply: {
    scenario: 'How sure is each model?',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the highest no-show chance logistic regression gives any week-12 booking, rounded to 3 places',
        starter: LR_FIT + 'p = model.predict_proba(test[feats])[:, 1]\n',
        solution: LR_FIT + 'p = model.predict_proba(test[feats])[:, 1]\nprint(round(p.max(), 3))\n',
        hint: 'p.max()',
        checks: [{ message: 'Print 0.733', outputEquals: '0.733' }],
      },
      {
        kind: 'mcq',
        prompt: 'Where does a tree\'s probability come from?',
        options: [
          { text: 'A coefficient', why: 'Trees don\'t have coefficients.' },
          { text: 'A random number', why: 'It\'s the leaf\'s share of no-shows.' },
          { text: 'The share of training bookings in the same leaf that missed' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many different no-show chances the depth-2 tree gives week 12',
        starter: TREE_BASE + TREE2 + 'q = tree.predict_proba(test[feats])[:, 1]\n',
        solution: TREE_BASE + TREE2 + 'q = tree.predict_proba(test[feats])[:, 1]\nprint(len(set(q)))\n',
        hint: 'len(set(q))',
        checks: [{ message: 'Print 4', outputEquals: '4' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Tree (depth 2) or logistic regression?',
        groups: ['Depth-2 tree', 'Logistic regression'],
        items: [
          { text: 'Only 4 possible chances', group: 0 },
          { text: 'A chance for every booking', group: 1 },
          { text: 'Many ties in the ranking', group: 0 },
          { text: 'Top 20 catches 12', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'The tree says 0.711 for a lot of my patients. Who do I call first?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Call in alphabetical order.', why: 'That ignores risk.' },
          { text: 'The tree can\'t tell them apart: they all landed in the same leaf. Logistic regression ranks them, so use its order for ties.' },
          { text: 'Skip them all.', why: '0.711 is high: they\'re the ones to call.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the number to its meaning.',
        pairs: [
          ['4', 'Different chances from the depth-2 tree'],
          ['187', 'Different chances from logistic regression'],
          ['0.733', 'The riskiest week-12 booking'],
          ['0.036', 'The safest week-12 booking'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Counting distinct chances.',
        language: 'python',
        template: 'print(len([[1]](q)))',
        blanks: [['set']],
        distractors: ['list', 'sum'],
      },
      {
        kind: 'findBug',
        prompt: 'Which statement about the riskiest booking is wrong?',
        lines: ['She is at Gumel.', 'She has 4 past misses and no reminder.', 'The model is 100% sure she\'ll miss.'],
        bug: 2,
        fix: 'The model gives a 73% chance.',
        explanation: 'Even the riskiest booking is a chance, not a certainty.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many of the depth-2 tree\'s top 20 week-12 bookings really missed?',
        answers: ['11'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why check the top booking by eye?',
        options: [
          { text: 'If a nurse wouldn\'t agree it\'s risky, something may be wrong with the model or the data' },
          { text: 'To change her chance', why: 'You check, not edit.' },
          { text: 'It\'s required by scikit-learn', why: 'It\'s a sense check.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'A weather app that only says "0%, 30%, 60% or 90%" vs one that says "37%". Which helps you more, and when?',
    starters: ['I\'d prefer...', 'Because...'],
  },
  deepen: {
    title: 'Ties in rankings',
    summary: 'When many items share a score, the order among them is arbitrary (pandas keeps the first one it saw). Models with smooth scores rank more usefully when people act on the top of a list.',
  },
  notes: 'Week 12: depth-2 tree no-show chances {0.148, 0.339, 0.596, 0.711}, top 20 11. LR: 187 distinct chances, min 0.036, max 0.733 (A12323, Gumel, wait 7, 15 km, 4 previous, no sms, missed), top 20 12.',
};

export default lesson;
