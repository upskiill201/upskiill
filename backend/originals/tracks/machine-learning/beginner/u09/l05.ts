import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { VAL_BASE } from './code';

/** Chapter 9 · Lesson 5 — Checkpoint 1: over, under, gaps, sweet spots. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: too simple, too complex',
  summary: 'Overfitting, underfitting, the gap between training and validation, and the sweet spot. Check you can diagnose a model from its two scores.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Diagnose over- and underfitting', 'Find a sweet spot on validation'],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>The diagnosis table.</strong> Training great, validation poor: <em>overfitting</em>, so simplify. Both poor and close, near doing nothing: <em>underfitting</em>, so add depth or features. Both decent, small gap, clearly better than doing nothing: <em>a reasonable fit</em>. Then choose the setting with the best validation result, and remember that two weeks of validation can wobble.</p>',
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: too simple, too complex.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Train a tree with no depth limit on weeks 1 to 9 (v0.8\'s six features) and print its number of leaves',
        starter: VAL_BASE + 'tree = DecisionTreeClassifier(random_state=42)\n',
        solution: VAL_BASE + 'tree = DecisionTreeClassifier(random_state=42)\ntree.fit(train[feats], train["no_show"])\nprint(tree.get_n_leaves())\n',
        hint: 'tree.get_n_leaves()',
        checks: [{ message: 'Print 507', outputEquals: '507' }],
      },
      {
        kind: 'mcq',
        prompt: 'Training 96.9%, validation 70.3%. Diagnosis?',
        options: [
          { text: 'Underfitting', why: 'Training is far higher than validation.' },
          { text: 'Overfitting' },
          { text: 'A good fit', why: 'The gap is huge.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the validation accuracy of a depth-2 tree, rounded to 3 places',
        starter: VAL_BASE + 'tree = DecisionTreeClassifier(max_depth=2, random_state=42).fit(train[feats], train["no_show"])\n',
        solution: VAL_BASE + 'tree = DecisionTreeClassifier(max_depth=2, random_state=42).fit(train[feats], train["no_show"])\nprint(round(tree.score(val[feats], val["no_show"]), 3))\n',
        hint: 'tree.score(val[feats], val["no_show"])',
        checks: [{ message: 'Print 0.802', outputEquals: '0.802' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Simplify, or add complexity?',
        groups: ['Simplify', 'Add complexity'],
        items: [
          { text: 'Overfitting', group: 0 },
          { text: 'Huge train-validation gap', group: 0 },
          { text: 'Underfitting', group: 1 },
          { text: 'No better than doing nothing', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the validation minutes of a depth-8 tree',
        starter: VAL_BASE + 'tree = DecisionTreeClassifier(max_depth=8, random_state=42).fit(train[feats], train["no_show"])\n',
        solution: VAL_BASE + 'tree = DecisionTreeClassifier(max_depth=8, random_state=42).fit(train[feats], train["no_show"])\nflags = (tree.predict_proba(val[feats])[:, 1] >= 0.2).astype(int)\nprint(minutes(flags, val["no_show"]))\n',
        hint: 'Flags at 0.2, then minutes',
        checks: [{ message: 'Print 1475', outputEquals: '1475' }],
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'In nurse words: what\'s overfitting?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Like a new nurse who memorises last month\'s patients by name, then can\'t judge anyone new.' },
          { text: 'A model that\'s too big for the computer.', why: 'It\'s about memorising.' },
          { text: 'Training for too long.', why: 'It\'s about fitting too closely.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the scores to the diagnosis.',
        pairs: [
          ['99.5% / 71.3%', 'Overfitting'],
          ['82.5% / 78.5%, baseline 78.5%', 'Underfitting'],
          ['83.3% / 79.7%, saves most minutes', 'Reasonable fit'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Choose settings on [[1]] results, never on [[2]] results.',
        blanks: [['validation'], ['training']],
        distractors: ['test', 'random'],
      },
      {
        kind: 'findBug',
        prompt: 'Which fix matches the problem?',
        lines: ['Overfitting: limit the depth.', 'Underfitting: add useful features.', 'Overfitting: remove the depth limit.'],
        bug: 2,
        fix: 'Overfitting: limit the depth further.',
        explanation: 'Removing the limit makes overfitting worse.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'On weeks 10 and 11, which tree depth lost the fewest minutes?',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Which is easier to spot in your own work: doing too little, or overdoing it?',
    starters: ['I find...'],
  },
  notes: 'Checkpoint for Chapter 9 lessons 1-4. Weeks 1-9 v0.8 features: unlimited tree 507 leaves; depth 2 val 0.802; depth 8 val minutes 1475; best depth on 10-11 is 6 (1300).',
};

export default lesson;
