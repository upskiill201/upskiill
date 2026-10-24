import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { VAL_BASE } from './code';

const FLAGS = 'flags = (tree.predict_proba(val[feats])[:, 1] >= 0.2).astype(int)\n';

/** Chapter 9 · Lesson 4 — The sweet spot. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'The sweet spot',
  summary: 'Between the stump and Chidi\'s tree there\'s a depth that learns the most pattern and the least noise. On weeks 10 and 11 it\'s depth 6. Tap through the curve, and the catch hiding in it.',
  minutes: 12,
  outcomes: [
    'Find the best setting on validation',
    'Read a curve of validation results',
    'Compare the best tree with logistic regression',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Validation minutes by depth',
      text: 'The stump loses 1,580 minutes. Depth 4 loses 1,335 and depth 6 loses 1,300, the sweet spot on these weeks. By depth 8 it\'s back up to 1,475, and with no limit 1,615. Logistic regression, v0.8, loses 1,225: better than every tree. But this is one validation split, and the curve is bumpy.',
      hotspots: [
        { phrase: 'The stump loses 1,580 minutes', note: 'Underfitting: too simple.' },
        { phrase: 'depth 6 loses 1,300, the sweet spot on these weeks', note: 'Enough questions to learn real patterns, not so many that it learns noise.' },
        { phrase: 'with no limit 1,615', note: 'Overfitting: nearly as bad as doing nothing (1,720).' },
        { phrase: 'better than every tree', note: 'For this data, a simple straight-line-style model beats every single tree.' },
        { phrase: 'the curve is bumpy', note: 'Depth 5 is worse than depth 6 here, depth 8 much worse. With only two validation weeks, some bumps are luck. Lesson 6 fixes this.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Finding the sweet spot',
      caption: 'Minutes lost on weeks 10 and 11 for each depth.',
      code: VAL_BASE + '\nfor depth in [1, 2, 3, 4, 5, 6, 8, 10, None]:\n    tree = DecisionTreeClassifier(max_depth=depth, random_state=42).fit(train[feats], train["no_show"])\n    ' + FLAGS.trim() + '\n    print(depth, minutes(flags, val["no_show"]))\n',
      challenge: 'Which depth is best? Is it better than v0.8\'s 1,225?',
    },
  ],
  apply: {
    scenario: 'The sweet spot.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Train a depth-6 tree on weeks 1 to 9 and print its validation minutes lost',
        starter: VAL_BASE + 'tree = DecisionTreeClassifier(max_depth=6, random_state=42).fit(train[feats], train["no_show"])\n',
        solution: VAL_BASE + 'tree = DecisionTreeClassifier(max_depth=6, random_state=42).fit(train[feats], train["no_show"])\n' + FLAGS + 'print(minutes(flags, val["no_show"]))\n',
        hint: 'Flags at 0.2, then minutes',
        checks: [{ message: 'Print 1300', outputEquals: '1300' }],
      },
      {
        kind: 'mcq',
        prompt: 'What is the sweet spot?',
        options: [
          { text: 'The deepest tree', why: 'That overfits.' },
          { text: 'The best training score', why: 'That always favours complexity.' },
          { text: 'The setting with the best validation result: enough complexity, not too much' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Train a depth-4 tree and print its validation minutes lost',
        starter: VAL_BASE + 'tree = DecisionTreeClassifier(max_depth=4, random_state=42).fit(train[feats], train["no_show"])\n',
        solution: VAL_BASE + 'tree = DecisionTreeClassifier(max_depth=4, random_state=42).fit(train[feats], train["no_show"])\n' + FLAGS + 'print(minutes(flags, val["no_show"]))\n',
        hint: 'Same as depth 6',
        checks: [{ message: 'Print 1335', outputEquals: '1335' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Too simple, about right, or too complex? (sorted into two)',
        groups: ['Underfit or overfit', 'Near the sweet spot'],
        items: [
          { text: 'Depth 1: 1,580', group: 0 },
          { text: 'No limit: 1,615', group: 0 },
          { text: 'Depth 4: 1,335', group: 1 },
          { text: 'Depth 6: 1,300', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Depth 6 is the sweet spot. Done, ship depth 6!',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'On these two weeks. Depth 5 is worse than 6 and 8 is much worse: that bumpiness smells like luck. Let\'s check across all 11 weeks first.' },
          { text: 'Agreed.', why: 'Two weeks is a shaky basis.' },
          { text: 'Depth 6 is overfitting.', why: 'It\'s the best on validation; the worry is reliability.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the model to its validation minutes.',
        pairs: [
          ['Depth 1', '1,580'],
          ['Depth 6', '1,300'],
          ['No limit', '1,615'],
          ['v0.8 (logistic regression)', '1,225'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The search.',
        language: 'python',
        template: 'for depth in [1, 2, 4, 6, 8, [[1]]]:\n    tree = DecisionTreeClassifier([[2]]=depth, random_state=42)',
        blanks: [['None'], ['max_depth']],
        distractors: ['0', 'depth']
      },
      {
        kind: 'findBug',
        prompt: 'Which conclusion is too strong?',
        lines: ['Depth 6 did best on weeks 10 and 11.', 'Logistic regression did better than every tree.', 'Depth 6 will always be the best depth.'],
        bug: 2,
        fix: 'Depth 6 looks best on these two weeks; check more weeks.',
        explanation: 'One small validation split can crown a lucky winner.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes does doing nothing lose on the validation weeks?',
        answers: ['1720', '1,720'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why might the sweet spot move if you used different validation weeks?',
        options: [
          { text: 'Trees are random', why: 'random_state=42 fixes that.' },
          { text: 'It can\'t move', why: 'Small samples wobble.' },
          { text: 'Two weeks is a small sample: some differences between depths are just luck' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s something in your life with a sweet spot: too little is bad, too much is bad?',
    starters: ['For example...'],
  },
  deepen: {
    title: 'Other ways to limit a tree',
    summary: 'Besides max_depth, you can set min_samples_leaf (every leaf must hold at least this many bookings) or max_leaf_nodes. Each stops the tree carving the data too finely.',
  },
  notes: 'Weeks 1-9 -> 10-11, v0.8 features, tree random_state=42, threshold 0.2 minutes: depth 1 1580, 2 1530, 3 1480, 4 1335, 5 1320, 6 1300, 8 1475, 10 1515, None 1615. v0.8 LR 1225; nothing 1720.',
};

export default lesson;
