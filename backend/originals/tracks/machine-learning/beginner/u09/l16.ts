import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { CV_BASE, DATA, F6, IMPORTS, MINUTES, SPLIT } from './code';

const TEST = IMPORTS + DATA + F6 + SPLIT + MINUTES;

/** Chapter 9 · Lesson 16 — Chidi's shortcut. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Chidi\'s shortcut',
  summary: 'Chidi tunes his tree\'s depth directly on week 12 and finds depth 6 nearly matches v0.8. It looks like a comeback. It\'s a story about why the shortcut always looks good, and what it costs.',
  minutes: 12,
  outcomes: [
    'Recognise tuning on the test week',
    'Explain why it makes results look too good',
    'Know what to do after the test week has been used',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The comeback',
      beats: [
        { speaker: 'chidi', text: 'I tried every depth on week 12. Depth 6 loses 540 minutes. v0.8 loses 535. My tree is basically as good!' },
        { speaker: 'miracle', text: 'How many depths did you try on week 12?' },
        { speaker: 'chidi', text: 'Seven. Depth 2: 625. Depth 4: 605. Depth 5: 590. Depth 6: 540. Depth 8: 550. Unlimited: 760.' },
        { speaker: 'miracle', text: 'So you ran seven tests and reported the best. Of course it looks good: you picked it because it was lucky on this week.' },
        { speaker: 'halima', text: 'Across 11 weeks, depth 6 loses 623 a week, and v0.8 578. Week 12 just happened to suit depth 6.' },
        { speaker: 'chidi', text: 'So now what? I\'ve seen week 12.' },
        { speaker: 'miracle', text: 'Now week 12 is spent for trees. We say so in the notes, and we wait for week 13 to test anything tree-shaped honestly.' },
        { speaker: 'tey', text: 'Choosing on the test week turns it into validation. The result is always too hopeful, and the only cure is fresh data.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Seven peeks',
      caption: 'Chidi\'s shortcut, reproduced. Don\'t do this for real.',
      code: TEST + '\nfor depth in [2, 4, 5, 6, 8, None]:\n    tree = DecisionTreeClassifier(max_depth=depth, random_state=42).fit(train[feats], train["no_show"])\n    flags = (tree.predict_proba(test[feats])[:, 1] >= 0.2).astype(int)\n    print(depth, minutes(flags, test["no_show"]))\n',
      challenge: 'Which depth would cross-validation have chosen? Compare its week-12 result.',
    },
  ],
  apply: {
    scenario: 'Chidi\'s shortcut.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Reproduce Chidi\'s best: print a depth-6 tree\'s minutes lost on week 12',
        starter: TEST + 'tree = DecisionTreeClassifier(max_depth=6, random_state=42).fit(train[feats], train["no_show"])\n',
        solution: TEST + 'tree = DecisionTreeClassifier(max_depth=6, random_state=42).fit(train[feats], train["no_show"])\nflags = (tree.predict_proba(test[feats])[:, 1] >= 0.2).astype(int)\nprint(minutes(flags, test["no_show"]))\n',
        hint: 'Flags at 0.2 on test, then minutes',
        checks: [{ message: 'Print 540', outputEquals: '540' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why does the best of seven week-12 results look too good?',
        options: [
          { text: 'Week 12 is easy', why: 'It\'s about choosing on it.' },
          { text: 'It was chosen because it did well on that one week, partly by luck' },
          { text: 'It doesn\'t; it\'s accurate', why: 'Cross-validation disagrees.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'The honest view: cross-validate depth 6 by week and print its average minutes, rounded to 1 place',
        starter: CV_BASE + 'tree = DecisionTreeClassifier(max_depth=6, random_state=42)\n',
        solution: CV_BASE + 'tree = DecisionTreeClassifier(max_depth=6, random_state=42)\nscores = cross_val_score(tree, train[feats], train["no_show"], groups=train["week"], cv=weeks, scoring=minutes_score)\nprint(round(-scores.mean(), 1))\n',
        hint: '-scores.mean()',
        checks: [{ message: 'Print 622.7', outputEquals: '622.7' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Shortcut or proper process?',
        groups: ['Shortcut', 'Proper process'],
        items: [
          { text: 'Try depths on week 12', group: 0 },
          { text: 'Report the best week-12 result', group: 0 },
          { text: 'Try depths with cross-validation', group: 1 },
          { text: 'Open week 12 once for the winner', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'I\'ve already seen week 12 for trees. Can we just forget I did?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Yes, forget it.', why: 'The choice was already influenced.' },
          { text: 'Delete week 12.', why: 'It\'s still fine for v0.9\'s one test.' },
          { text: 'We can\'t un-see it. We write it in the notes and test tree models on week 13 when it arrives.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the depth to its week-12 minutes (Chidi\'s peeks).',
        pairs: [
          ['2', '625'],
          ['5', '590'],
          ['6', '540'],
          ['No limit', '760'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The cure.',
        template: 'Once the test week has been used for [[1]], only [[2]] data can test honestly.',
        blanks: [['choosing'], ['fresh']],
        distractors: ['printing', 'older'],
      },
      {
        kind: 'findBug',
        prompt: 'Which sentence in Chidi\'s report is the problem?',
        lines: ['I tried depths 2 to unlimited.', 'I scored each on week 12.', 'Depth 6 is as good as v0.8.'],
        bug: 2,
        fix: 'Depth 6 did well on week 12, which I used to choose it; cross-validation says 623 vs 578.',
        explanation: 'A result from the week you chose with is too hopeful.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many depths did Chidi try on week 12?',
        answers: ['7', 'seven'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why is the shortcut so tempting?',
        options: [
          { text: 'It\'s the recommended method', why: 'It isn\'t.' },
          { text: 'It\'s quick and always produces an impressive-looking number' },
          { text: 'Cross-validation is impossible here', why: 'We just did it.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever tried something several ways and only reported the best one? What was left out?',
    starters: ['Once...'],
  },
  deepen: {
    title: 'Test-set reuse',
    summary: 'Public benchmarks suffer the same problem at scale: when thousands of teams tune against one test set, the best scores become too hopeful. Fresh test data regularly reveals the gap.',
  },
  notes: 'Week 12 (trained on 1-11, v0.8 features, 0.2) tree minutes: depth 2 625, 3 685, 4 605, 5 590, 6 540, 8 550, None 760; v0.8 535. Leave-one-week-out depth 6: 622.7/week vs v0.8 577.7.',
};

export default lesson;
