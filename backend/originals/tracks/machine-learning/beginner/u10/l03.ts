import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { FOREST, VAL_BASE, VAL_MINUTES } from './code';

const FIT = VAL_BASE + FOREST + 'forest.fit(train[feats], train["no_show"])\n';

/** Chapter 10 · Lesson 3 — Random forests in scikit-learn. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Random forests in scikit-learn',
  summary: 'One line builds a forest of 100 trees. On weeks 10 and 11 it loses 1,260 minutes: better than any single tree, not quite v0.8. Tap through the line and its settings.',
  minutes: 11,
  outcomes: [
    'Build and fit a RandomForestClassifier',
    'Know its key settings',
    'Score it the same way as every model',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'One line, 100 trees',
      text: 'RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42) grows 100 trees, each at most 5 questions deep. Fitted on weeks 1 to 9, it gets 85.7% of training bookings and 80.5% of weeks 10 and 11 right, and loses 1,260 validation minutes. The best single tree on these weeks lost 1,300; v0.8 lost 1,225.',
      hotspots: [
        { phrase: 'n_estimators=100', note: 'How many trees. More is steadier, and slower. Lesson 4 tests it.' },
        { phrase: 'max_depth=5', note: 'Each tree\'s depth limit. Forests overfit less than single trees, but depth still matters.' },
        { phrase: 'random_state=42', note: 'Fixes the randomness so you (and the checker) get the same forest every time.' },
        { phrase: '85.7% of training bookings and 80.5%', note: 'A modest gap: the forest isn\'t memorising much at depth 5.' },
        { phrase: 'The best single tree on these weeks lost 1,300', note: 'Many trees beat one. Whether it beats logistic regression is the real question.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The first forest',
      caption: 'Weeks 1 to 9 to learn, 10 and 11 to judge.',
      code: FIT + '\nprint("Training:", round(forest.score(train[feats], train["no_show"]), 3))\nprint("Validation:", round(forest.score(val[feats], val["no_show"]), 3))\nflags = (forest.predict_proba(val[feats])[:, 1] >= 0.2).astype(int)\nprint("Minutes lost:", minutes(flags, val["no_show"]))\n',
      challenge: 'Remove max_depth=5. What happens to the gap?',
    },
  ],
  apply: {
    scenario: 'Random forests in scikit-learn.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Fit the forest on weeks 1 to 9 and print its validation minutes lost',
        starter: VAL_BASE + FOREST,
        solution: FIT + VAL_MINUTES('forest'),
        hint: 'forest.fit(...), then flag val at 0.2',
        checks: [{ message: 'Print 1260', outputEquals: '1260' }],
      },
      {
        kind: 'mcq',
        prompt: 'What does n_estimators control?',
        options: [
          { text: 'How deep each tree is', why: 'That\'s max_depth.' },
          { text: 'How many trees the forest grows' },
          { text: 'The threshold', why: 'That\'s separate.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the forest\'s validation accuracy, rounded to 3 places',
        starter: FIT,
        solution: FIT + 'print(round(forest.score(val[feats], val["no_show"]), 3))\n',
        hint: 'forest.score(val[feats], val["no_show"])',
        checks: [{ message: 'Print 0.805', outputEquals: '0.805' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Setting or result?',
        groups: ['A setting you choose', 'A result you measure'],
        items: [
          { text: 'n_estimators', group: 0 },
          { text: 'max_depth', group: 0 },
          { text: '1,260 minutes lost', group: 1 },
          { text: '80.5% validation accuracy', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: '1,260! Way better than my trees. Forests win?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Yes, ship it.', why: 'It hasn\'t beaten v0.8.' },
          { text: 'Forests are worse than trees.', why: 'It beat every tree here.' },
          { text: 'Better than every single tree, yes. v0.8 lost 1,225 on the same weeks, and one split can mislead. Cross-validation decides.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the model to its validation minutes (weeks 10 and 11).',
        pairs: [
          ['Best single tree (depth 6)', '1,300'],
          ['Forest, 100 trees, depth 5', '1,260'],
          ['v0.8', '1,225'],
          ['Doing nothing', '1,720'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Importing a forest.',
        language: 'python',
        template: 'from sklearn.[[1]] import [[2]]',
        blanks: [['ensemble'], ['RandomForestClassifier']],
        distractors: ['tree', 'ForestClassifier'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line gives a different forest every run?',
        language: 'python',
        lines: ['forest = RandomForestClassifier(n_estimators=100, max_depth=5)', 'forest.fit(train[feats], train["no_show"])', 'print(forest.score(val[feats], val["no_show"]))'],
        bug: 0,
        fix: 'forest = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)',
        explanation: 'Without random_state, the draws change each run.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the forest\'s training accuracy on weeks 1 to 9? (3 decimal places)',
        answers: ['0.857', '.857'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why is "ensemble" the module name?',
        options: [
          { text: 'It\'s French for "tree"', why: 'It means "together".' },
          { text: 'An ensemble is a group of models working together' },
          { text: 'It\'s a random word', why: 'It describes combining models.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What other "ensembles" do you rely on: a panel, a jury, review scores?',
    starters: ['For example...'],
  },
  deepen: {
    title: 'max_features',
    summary: 'The setting that controls how many features each split may consider is max_features. The default for classifiers is the square root of the number of features: here, about 2 of 6.',
  },
  notes: 'RF(100, depth 5, rs 42) weeks 1-9 -> 10-11: train 0.857, val 0.805, minutes 1260. Best single tree on this split depth 6 1300; v0.8 1225; nothing 1720.',
};

export default lesson;
