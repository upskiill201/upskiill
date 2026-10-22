import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { VAL_BASE, VAL_MINUTES } from './code';

const N = (n: number) => `forest = RandomForestClassifier(n_estimators=${n}, max_depth=5, random_state=42).fit(train[feats], train["no_show"])\n`;

/** Chapter 10 · Lesson 4 — How many trees? */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'How many trees?',
  summary: 'One tree, five, ten, fifty, a hundred, two hundred. More trees make the forest steadier, but not endlessly better, and every tree costs time. Before and after, side by side.',
  minutes: 11,
  outcomes: [
    'See how the number of trees changes results',
    'Explain diminishing returns',
    'Avoid reading too much into small differences',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Few trees vs many',
      before: {
        label: '1 to 10 trees',
        text: '1 tree: 1,475 minutes lost\n5 trees: 1,295\n10 trees: 1,265\nBig gains as trees are added.',
      },
      after: {
        label: '50 to 200 trees',
        text: '50 trees: 1,205\n100 trees: 1,260\n200 trees: 1,270\nSmall ups and downs; no clear gain.',
      },
      notes: [
        'The first few extra trees cancel most of the wobble. After that, more trees mostly cost time.',
        '50 trees beat v0.8 (1,225) on these two weeks. Remember Chapter 9: one split can crown a lucky winner.',
        'More trees never makes a forest overfit; it just makes it slower.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Counting trees',
      caption: 'Validation minutes as the forest grows.',
      code: VAL_BASE + '\nfor n in [1, 5, 10, 50, 100, 200]:\n    forest = RandomForestClassifier(n_estimators=n, max_depth=5, random_state=42).fit(train[feats], train["no_show"])\n    flags = (forest.predict_proba(val[feats])[:, 1] >= 0.2).astype(int)\n    print(n, minutes(flags, val["no_show"]))\n',
      challenge: 'Why might 50 trees beat 100 here, if more trees are steadier?',
    },
  ],
  apply: {
    scenario: 'How many trees?',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Grow a 10-tree forest (depth 5) and print its validation minutes lost',
        starter: VAL_BASE,
        solution: VAL_BASE + N(10) + VAL_MINUTES('forest'),
        hint: 'RandomForestClassifier(n_estimators=10, max_depth=5, random_state=42)',
        checks: [{ message: 'Print 1265', outputEquals: '1265' }],
      },
      {
        kind: 'mcq',
        prompt: 'What happens as you add more and more trees?',
        options: [
          { text: 'It overfits more', why: 'More trees don\'t add overfitting.' },
          { text: 'It keeps improving forever', why: 'Gains level off quickly.' },
          { text: 'Results steady out; gains shrink; time grows' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Grow a 50-tree forest and print its validation minutes lost',
        starter: VAL_BASE,
        solution: VAL_BASE + N(50) + VAL_MINUTES('forest'),
        hint: 'n_estimators=50',
        checks: [{ message: 'Print 1205', outputEquals: '1205' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Big change or small change?',
        groups: ['Big change', 'Small change'],
        items: [
          { text: '1 tree → 5 trees', group: 0 },
          { text: '5 trees → 10 trees', group: 1 },
          { text: '100 trees → 200 trees', group: 1 },
          { text: '1 tree → 50 trees', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: '50 trees: 1,205! That beats v0.8\'s 1,225. We have a winner!',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'On two weeks, by 20 minutes, after trying six forest sizes. That\'s exactly the kind of win cross-validation exists to check.' },
          { text: 'Ship it.', why: 'One split, many tries.' },
          { text: '50 is too few to count.', why: 'It\'s a fair forest; the issue is evidence.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the forest size to its validation minutes.',
        pairs: [
          ['1 tree', '1,475'],
          ['5 trees', '1,295'],
          ['50 trees', '1,205'],
          ['200 trees', '1,270'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The pattern.',
        template: 'The first few trees remove most of the [[1]]; after that, more trees mostly cost [[2]].',
        blanks: [['wobble'], ['time']],
        distractors: ['data', 'accuracy'],
      },
      {
        kind: 'findBug',
        prompt: 'Which conclusion goes too far?',
        lines: ['1 tree loses 1,475; 10 trees lose 1,265.', '50 and 200 trees are close.', '50 trees is proven better than v0.8.'],
        bug: 2,
        fix: '50 trees did better on two weeks; check with cross-validation.',
        explanation: 'One split after six tries isn\'t proof.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes did going from 1 tree to 10 trees save?',
        answers: ['210'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Can adding trees make a forest overfit?',
        options: [
          { text: 'Yes, badly', why: 'More trees average more, they don\'t memorise more.' },
          { text: 'Only above 100', why: 'Tree count doesn\'t cause overfitting.' },
          { text: 'No: depth and leaf size control overfitting; tree count mostly controls steadiness' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Where do you see diminishing returns: the fifth cup of coffee, the tenth practice run?',
    starters: ['For me...'],
  },
  deepen: {
    title: 'Out-of-bag scores',
    summary: 'Each tree never sees about a third of the bookings (they weren\'t drawn). A forest can score itself on those "out-of-bag" rows with oob_score=True, a built-in validation.',
  },
  notes: 'RF depth 5, rs 42, weeks 1-9 -> 10-11 minutes by n_estimators: 1 1475, 5 1295, 10 1265, 50 1205, 100 1260, 200 1270. v0.8 1225.',
};

export default lesson;
