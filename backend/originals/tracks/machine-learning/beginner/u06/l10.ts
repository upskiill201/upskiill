import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { DATA, IMPORTS, LR_FIT, TREE, TREE_BASE, VAL_SPLIT } from './code';

/** Chapter 6 · Lesson 10 — Checkpoint 2: thresholds, trees, reading a tree, depth. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: trees and thresholds',
  summary: 'Two kinds of classifier, one threshold to choose, and a tree Bisi pinned above her phone. Check you can move a threshold, grow and read a tree, and pick its depth without peeking.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Move a threshold and count the effect', 'Train, read and size a decision tree'],
  learn: [
    {
      kind: 'story',
      title: 'Above the phone',
      beats: [
        { speaker: 'bisi', text: 'Three past misses and more than 8 km: I call. That\'s on a sticky note above my phone now.' },
        { speaker: 'halima', text: 'Your sticky note is a depth-2 tree.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: trees and thresholds.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'At a threshold of 0.4, print how many week-12 bookings logistic regression flags',
        starter: LR_FIT + 'p = model.predict_proba(test[feats])[:, 1]\n',
        solution: LR_FIT + 'p = model.predict_proba(test[feats])[:, 1]\nprint((p >= 0.4).sum())\n',
        hint: '(p >= 0.4).sum()',
        checks: [{ message: 'Print 24', outputEquals: '24' }],
      },
      {
        kind: 'mcq',
        prompt: 'Lowering the threshold from 0.5 to 0.3 means...',
        options: [
          { text: 'Fewer bookings flagged', why: 'A lower bar flags more.' },
          { text: 'More bookings flagged: more no-shows caught, and more wrong calls' },
          { text: 'The model is retrained', why: 'Same model; only the cut-off moves.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Train a depth-2 tree (random_state=42) and print how many leaves it has',
        starter: TREE_BASE + 'tree = DecisionTreeClassifier(max_depth=2, random_state=42)\n',
        solution: TREE_BASE + 'tree = DecisionTreeClassifier(max_depth=2, random_state=42)\ntree.fit(train[feats], train["no_show"])\nprint(tree.get_n_leaves())\n',
        hint: 'tree.get_n_leaves()',
        checks: [{ message: 'Print 4', outputEquals: '4' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Depth-2 tree: come or miss?',
        groups: ['Come', 'Miss'],
        items: [
          { text: '1 past miss, 10 km', group: 0 },
          { text: '0 past misses, 55 km', group: 1 },
          { text: '3 past misses, 20 km', group: 1 },
          { text: '4 past misses, 5 km', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'On the validation weeks, print how many of a depth-4 tree\'s top 40 really missed',
        starter: IMPORTS + TREE + DATA + VAL_SPLIT + 'tree = DecisionTreeClassifier(max_depth=4, random_state=42)\ntree.fit(train[feats], train["no_show"])\n',
        solution: IMPORTS + TREE + DATA + VAL_SPLIT + 'tree = DecisionTreeClassifier(max_depth=4, random_state=42)\ntree.fit(train[feats], train["no_show"])\nv = val.assign(p=tree.predict_proba(val[feats])[:, 1])\nprint(v.nlargest(40, "p")["no_show"].sum())\n',
        hint: 'v = val.assign(p=tree.predict_proba(val[feats])[:, 1])',
        checks: [{ message: 'Print 25', outputEquals: '25' }],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Unlimited depth fits the training weeks at 93.8%. Why not use it?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Use it, 93.8 is high.', why: 'That\'s the training score.' },
          { text: 'Trees can\'t go that deep.', why: 'They can: 487 leaves.' },
          { text: 'It memorised. On new weeks it\'s worse than guessing. Depth is chosen on validation, where 8 did best.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the threshold to its week-12 flags.',
        pairs: [
          ['0.5', '11 flagged, 6 caught'],
          ['0.4', '24 flagged, 13 caught'],
          ['0.3', '44 flagged, 22 caught'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Your own threshold.',
        language: 'python',
        template: 'p = model.predict_proba(test[feats])[:, [[1]]]\nflagged = p [[2]] 0.3',
        blanks: [['1'], ['>=']],
        distractors: ['0', '<='],
      },
      {
        kind: 'findBug',
        prompt: 'Which line compares tree depths on the test week?',
        language: 'python',
        lines: ['for d in [2, 4, 8]:', '    tree = DecisionTreeClassifier(max_depth=d, random_state=42).fit(train[feats], train["no_show"])', '    print(d, tree.score(test[feats], test["no_show"]))'],
        bug: 2,
        fix: '    print(d, tree.score(val[feats], val["no_show"]))',
        explanation: 'Choose depth on validation, not on the test week.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'The depth-2 tree\'s first question is about which feature?',
        answers: ['previous_no_shows', 'past no-shows', 'previous no-shows', 'past misses'],
        placeholder: 'A feature',
      },
      {
        kind: 'mcq',
        prompt: 'Review, lesson 2: which column of predict_proba is the no-show chance?',
        options: [
          { text: 'Column 1' },
          { text: 'Column 0', why: 'That\'s the chance of coming.' },
          { text: 'Neither', why: 'Column 1, because classes_ is [0, 1].' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which would you trust more for a real clinic: a depth-2 tree or logistic regression? Why?',
    starters: ['I\'d trust...', 'Because...'],
  },
  notes: 'Checkpoint for Chapter 6 lessons 6-9. LR week 12: 0.5 -> 11 (6), 0.4 -> 24 (13), 0.3 -> 44 (22). Depth-2 tree: 4 leaves. Validation (weeks 1-9 -> 10-11) depth 4 top 40: 25.',
};

export default lesson;
