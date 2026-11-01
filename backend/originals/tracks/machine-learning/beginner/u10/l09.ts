import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { VAL_BASE, VAL_MINUTES } from './code';

const WILD = VAL_BASE + 'wild = RandomForestClassifier(n_estimators=100, random_state=42).fit(train[feats], train["no_show"])\n';

/** Chapter 10 · Lesson 9 — Comparing forest and tree. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Comparing forest and tree',
  summary: 'The forest\'s real superpower: it rescues trees from themselves. An unlimited tree is a disaster; an unlimited forest is merely mediocre. Six steps through the evidence.',
  minutes: 12,
  outcomes: [
    'Compare a forest with a single tree fairly',
    'See how averaging reduces overfitting',
    'Know what a forest can\'t fix',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Tree vs forest, step by step',
      steps: [
        { title: '1. Unlimited depth, one tree', body: 'Across 11 weeks: 7,905 minutes lost. Worse than doing nothing (8,040)? Nearly.' },
        { title: '2. Unlimited depth, 100 trees', body: '7,265 minutes. Averaging cut 640 minutes of damage, with no depth limit at all.' },
        { title: '3. Depth 5, one tree', body: '6,615 minutes: the best single tree.' },
        { title: '4. Depth 5, 100 trees', body: '6,545 minutes. Better again, by less: a sensible tree has less wobble to cancel.' },
        { title: '5. The best forest', body: 'Depth 3, 100 trees: 6,505.' },
        { title: '6. What averaging can\'t fix', body: 'v0.9 still wins at 6,340. Averaging removes wobble; it can\'t add information the clues don\'t carry.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Wild tree vs wild forest',
      caption: 'No depth limit, weeks 1 to 9 vs 10 and 11.',
      code: WILD + '\nwild_tree = DecisionTreeClassifier(random_state=42).fit(train[feats], train["no_show"])\nfor name, model in [("one tree", wild_tree), ("forest", wild)]:\n    flags = (model.predict_proba(val[feats])[:, 1] >= 0.2).astype(int)\n    print(name, minutes(flags, val["no_show"]))\n',
      challenge: 'Compare the training accuracy of the two. Which memorises more?',
    },
  ],
  apply: {
    scenario: 'Comparing forest and tree.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Fit a 100-tree forest with no depth limit on weeks 1 to 9 and print its validation minutes lost',
        starter: WILD,
        solution: WILD + VAL_MINUTES('wild'),
        hint: 'Flag val at 0.2, then minutes',
        checks: [{ message: 'Print 1450', outputEquals: '1450' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why does an unlimited forest do much better than an unlimited tree?',
        options: [
          { text: 'Forests are deeper', why: 'Both are unlimited.' },
          { text: 'Each tree memorises different noise, and averaging cancels much of it' },
          { text: 'It has more features', why: 'Same features.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the unlimited forest\'s validation accuracy, rounded to 3 places',
        starter: WILD,
        solution: WILD + 'print(round(wild.score(val[feats], val["no_show"]), 3))\n',
        hint: 'wild.score(val[feats], val["no_show"])',
        checks: [{ message: 'Print 0.757', outputEquals: '0.757' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Can averaging trees fix it?',
        groups: ['Averaging helps', 'Averaging can\'t help'],
        items: [
          { text: 'One tree\'s wobble', group: 0 },
          { text: 'Noise memorised by deep trees', group: 0 },
          { text: 'Clues that carry no information', group: 1 },
          { text: 'A leak in the data', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'So forests fix overfitting completely?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Completely.', why: 'The unlimited forest is still poor.' },
          { text: 'Not at all.', why: 'It cut 640 minutes of damage.' },
          { text: 'They soften it: the unlimited forest still loses 7,265 minutes over 11 weeks. Sensible depth plus averaging works best.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the model to its 11-week minutes.',
        pairs: [
          ['Unlimited tree', '7,905'],
          ['Unlimited forest', '7,265'],
          ['Depth-5 tree', '6,615'],
          ['Depth-5 forest', '6,545'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'What averaging does.',
        template: 'Averaging removes [[1]]; it can\'t add [[2]] the clues don\'t carry.',
        blanks: [['wobble'], ['information']],
        distractors: ['features', 'rows'],
      },
      {
        kind: 'findBug',
        prompt: 'Which comparison is unfair?',
        lines: ['Tree and forest both scored on weeks 10 and 11.', 'Both use v0.8\'s six features.', 'The forest scored with 11-week cross-validation, the tree on one split.'],
        bug: 2,
        fix: 'Both scored the same way.',
        explanation: 'Different scoring methods make the comparison meaningless.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Across 11 weeks, how many minutes did averaging save for unlimited depth?',
        answers: ['640'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why does averaging help a depth-5 tree less than an unlimited one?',
        options: [
          { text: 'A sensible tree wobbles less, so there\'s less to cancel' },
          { text: 'Depth-5 forests are broken', why: 'They still help a little.' },
          { text: 'It helps more', why: '70 minutes vs 640.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'A committee of overconfident people vs one careful person: when would each win?',
    starters: ['The committee wins when...'],
  },
  deepen: {
    title: 'Variance reduction',
    summary: 'Averaging many independent guesses reduces how much they wobble (their variance), but not any shared mistake (bias). That\'s why forests fix wobbly trees but can\'t beat a model that\'s right in shape.',
  },
  notes: 'Leave-one-week-out minutes: unlimited tree 7905, unlimited forest (100) 7265, depth-5 tree 6615, depth-5 forest 6545, depth-3 forest 6505, v0.9 6340, nothing 8040. Split 1-9 -> 10-11: unlimited forest 1450, val acc 0.757 (train 0.969).',
};

export default lesson;
