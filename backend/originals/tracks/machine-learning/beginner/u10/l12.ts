import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { VAL_BASE, VAL_MINUTES } from './code';

const DEPTH = (d: number) => `forest = RandomForestClassifier(n_estimators=100, max_depth=${d}, random_state=42).fit(train[feats], train["no_show"])\n`;

/** Chapter 10 · Lesson 12 — Tuning a forest. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Tuning a forest',
  summary: 'A forest has settings too: depth, number of trees, leaf size. Tap through the depth results on the quick split and on 11 weeks, and see where they disagree.',
  minutes: 12,
  outcomes: [
    'Tune a forest\'s depth',
    'Compare one-split and cross-validated choices',
    'Know which forest settings matter most',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Forest depth, two ways',
      text: 'On weeks 10 and 11, depth 5 is best: 1,260 minutes, against 1,320 for depth 3 and 1,450 with no limit. Across all 11 weeks, depth 3 edges it: 6,505 against 6,545. The best tuned forest still loses to v0.9, at 6,340. Depth matters most; tree count barely matters past 50.',
      hotspots: [
        { phrase: 'depth 5 is best: 1,260 minutes', note: 'The quick split\'s pick.' },
        { phrase: '1,450 with no limit', note: 'Even forests overfit when every tree is grown to the end.' },
        { phrase: 'depth 3 edges it: 6,505 against 6,545', note: 'Eleven weeks prefer a shallower forest. The two are close: 40 minutes over 11 weeks.' },
        { phrase: 'still loses to v0.9, at 6,340', note: 'Tuning found the best forest, not a better model than v0.9.' },
        { phrase: 'tree count barely matters past 50', note: 'Lesson 4: more trees steady things; they rarely change the verdict.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Depth on the quick split',
      caption: 'Weeks 1 to 9 to learn, 10 and 11 to judge.',
      code: VAL_BASE + '\nfor depth in [3, 4, 5, 6, 8, None]:\n    forest = RandomForestClassifier(n_estimators=100, max_depth=depth, random_state=42).fit(train[feats], train["no_show"])\n    flags = (forest.predict_proba(val[feats])[:, 1] >= 0.2).astype(int)\n    print(depth, minutes(flags, val["no_show"]))\n',
      challenge: 'Try min_samples_leaf=20 instead of a depth limit.',
    },
  ],
  apply: {
    scenario: 'Tuning a forest.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Fit a depth-3 forest (100 trees) and print its validation minutes lost',
        starter: VAL_BASE,
        solution: VAL_BASE + DEPTH(3) + VAL_MINUTES('forest'),
        hint: 'max_depth=3',
        checks: [{ message: 'Print 1320', outputEquals: '1320' }],
      },
      {
        kind: 'mcq',
        prompt: 'The split picks depth 5; eleven weeks pick depth 3. Which do you trust?',
        options: [
          { text: 'The split: it\'s quicker', why: 'Speed isn\'t evidence.' },
          { text: 'Neither', why: 'Eleven weeks is the stronger evidence.' },
          { text: 'Eleven weeks, while noting the two are close' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Fit a depth-6 forest and print its validation minutes lost',
        starter: VAL_BASE,
        solution: VAL_BASE + DEPTH(6) + VAL_MINUTES('forest'),
        hint: 'max_depth=6',
        checks: [{ message: 'Print 1275', outputEquals: '1275' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Matters a lot, or a little, for this forest?',
        groups: ['Matters a lot', 'Matters a little'],
        items: [
          { text: 'Depth limit vs none', group: 0 },
          { text: 'Depth 5 vs no limit', group: 0 },
          { text: '100 trees vs 200', group: 1 },
          { text: 'Depth 3 vs depth 5', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Let\'s tune every forest setting at once. Surely something beats v0.9!',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Try enough combinations and one will win by luck. The forest\'s problem isn\'t settings: the data\'s pattern is simple, and v0.9 already fits it.' },
          { text: 'Go for it.', why: 'That\'s chasing luck.' },
          { text: 'Forests can\'t be tuned.', why: 'They can; it won\'t change the verdict.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the forest depth to its validation minutes.',
        pairs: [
          ['3', '1,320'],
          ['5', '1,260'],
          ['8', '1,330'],
          ['No limit', '1,450'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Forest settings.',
        language: 'python',
        template: 'RandomForestClassifier(n_estimators=100, [[1]]=3, [[2]]=42)',
        blanks: [['max_depth'], ['random_state']],
        distractors: ['depth', 'learning_rate'],
      },
      {
        kind: 'findBug',
        prompt: 'Which tuning conclusion is wrong?',
        lines: ['Depth matters more than tree count here.', 'Eleven weeks slightly prefer depth 3.', 'The tuned forest beats v0.9.'],
        bug: 2,
        fix: 'The tuned forest is still behind v0.9.',
        explanation: '6,505 vs 6,340.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Across 11 weeks, how far behind v0.9 is the best forest, in minutes?',
        answers: ['165'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why might a shallower forest do well here?',
        options: [
          { text: 'Shallow is always best', why: 'Depends on the data.' },
          { text: 'Deep trees can\'t be averaged', why: 'They can; they just overfit more.' },
          { text: 'The pattern is simple, so short trees capture it without learning noise' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'When have you tuned something a lot and realised the problem was elsewhere?',
    starters: ['Once...'],
  },
  deepen: {
    title: 'min_samples_leaf',
    summary: 'Instead of limiting depth, you can insist every leaf holds at least, say, 20 bookings. It stops trees making decisions from a handful of patients, and is often a gentler limit than depth.',
  },
  notes: 'RF(100) weeks 1-9 -> 10-11 by depth: 3 1320, 4 1305, 5 1260, 6 1275, 8 1330, None 1450. Leave-one-week-out: depth 3 6505, 4 6625, 5 6545, 6 6625; v0.9 6340.',
};

export default lesson;
