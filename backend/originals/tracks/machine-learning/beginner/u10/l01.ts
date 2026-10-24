import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { VAL_BASE, VAL_MINUTES } from './code';

const BOOT = (seed: number) =>
  `sample = train.sample(frac=1, replace=True, random_state=${seed})\ntree = DecisionTreeClassifier(max_depth=5, random_state=42).fit(sample[feats], sample["no_show"])\n`;

/** Chapter 10 · Lesson 1 — Why one tree wobbles. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Why one tree wobbles',
  summary: 'Miracle reshuffles the training weeks five times and grows the same depth-5 tree on each. Five trees, five different scores. Chidi\'s idea starts here: if one tree wobbles, maybe many trees won\'t.',
  minutes: 12,
  outcomes: [
    'Explain why a single tree is unstable',
    'Resample data with replacement',
    'See how much a tree\'s score moves',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Five shuffles',
      beats: [
        { speaker: 'miracle', text: 'Chidi, take the 1,800 training bookings and draw 1,800 at random, with replacement: some twice, some not at all. Grow a depth-5 tree. Then do it again with a fresh draw.' },
        { speaker: 'chidi', text: 'Same data, same depth. Should be the same tree.' },
        { speaker: 'narrator', text: 'Five draws. Validation minutes lost: 1,285, 1,280, 1,335, 1,275, 1,330.' },
        { speaker: 'chidi', text: 'Sixty minutes apart, from tiny changes in the data.' },
        { speaker: 'halima', text: 'A tree makes hard yes/no splits. Move a few patients and a split jumps, and everything below it changes.' },
        { speaker: 'tey', text: 'That wobble is why one tree is unreliable. But each wobbly tree is wrong in a different way. What could the team do with that?' },
      ],
      choice: {
        prompt: 'What should the team try?',
        options: [
          { text: 'Grow many trees on different draws and average their answers, so the individual wobbles cancel out.', outcome: 'Yes. That\'s Chidi\'s idea, and it\'s a random forest. This chapter builds one and judges it honestly.', best: true },
          { text: 'Keep the luckiest of the five trees.', outcome: 'That\'s choosing by luck: the "best" draw on these weeks won\'t be best on the next ones.' },
          { text: 'Give up on trees.', outcome: 'Too early. Averaging many might fix exactly this problem.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Five draws, five trees',
      caption: 'The same depth-5 tree, grown on resampled data.',
      code: VAL_BASE + '\nfor seed in [1, 2, 3, 4, 5]:\n    sample = train.sample(frac=1, replace=True, random_state=seed)\n    tree = DecisionTreeClassifier(max_depth=5, random_state=42).fit(sample[feats], sample["no_show"])\n    flags = (tree.predict_proba(val[feats])[:, 1] >= 0.2).astype(int)\n    print(seed, minutes(flags, val["no_show"]))\n',
      challenge: 'Do all five trees ask the same first question? Print feats[tree.tree_.feature[0]].',
    },
  ],
  apply: {
    scenario: 'Why one tree wobbles.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Draw with random_state=3, grow a depth-5 tree, and print its validation minutes lost',
        starter: VAL_BASE + 'sample = train.sample(frac=1, replace=True, random_state=3)\n',
        solution: VAL_BASE + BOOT(3) + VAL_MINUTES('tree'),
        hint: 'Fit the tree on sample, then flag val at 0.2',
        checks: [{ message: 'Print 1335', outputEquals: '1335' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why does a tree change so much when a few rows change?',
        options: [
          { text: 'Trees are random', why: 'random_state=42 fixes the tree\'s own randomness.' },
          { text: 'Its splits are hard yes/no cuts: move one split and everything below it changes' },
          { text: 'It doesn\'t change', why: 'Five draws gave five scores.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Now draw with random_state=4 and print the validation minutes',
        starter: VAL_BASE + 'sample = train.sample(frac=1, replace=True, random_state=4)\n',
        solution: VAL_BASE + BOOT(4) + VAL_MINUTES('tree'),
        hint: 'Same steps, seed 4',
        checks: [{ message: 'Print 1275', outputEquals: '1275' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Drawing 1,800 from 1,800 with replacement: possible or not?',
        groups: ['Possible', 'Not possible'],
        items: [
          { text: 'A booking drawn twice', group: 0 },
          { text: 'A booking not drawn at all', group: 0 },
          { text: 'A booking from week 10', group: 1 },
          { text: 'More than 1,800 rows', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Seed 4 lost only 1,275. Let\'s keep that tree!',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Good plan.', why: 'That\'s choosing by luck.' },
          { text: 'Seeds don\'t matter.', why: 'They changed the score by 60 minutes.' },
          { text: 'It was lucky on these two weeks. Picking the best draw is picking luck. Averaging all of them is the steadier idea.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the draw to its validation minutes.',
        pairs: [
          ['Seed 1', '1,285'],
          ['Seed 2', '1,280'],
          ['Seed 3', '1,335'],
          ['Seed 4', '1,275'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Drawing with replacement.',
        language: 'python',
        template: 'sample = train.sample(frac=1, [[1]]=True, [[2]]=3)',
        blanks: [['replace'], ['random_state']],
        distractors: ['repeat', 'seed_value'],
      },
      {
        kind: 'findBug',
        prompt: 'Which statement is wrong?',
        lines: ['Each draw has 1,800 rows.', 'Some bookings appear twice in a draw.', 'Every draw contains every booking exactly once.'],
        bug: 2,
        fix: 'Each draw leaves some bookings out and repeats others.',
        explanation: 'With replacement, about a third of bookings are left out of each draw.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes apart were the best and worst of the five trees?',
        answers: ['60', 'sixty'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What makes averaging many wobbly trees promising?',
        options: [
          { text: 'Each one is wrong in a different way, so the mistakes partly cancel' },
          { text: 'Each tree is perfect', why: 'Each wobbles.' },
          { text: 'More trees means more depth', why: 'Depth stays 5.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Ask five friends to guess a jar of sweets. Why might their average beat most individual guesses?',
    starters: ['Because...'],
  },
  deepen: {
    title: 'The bootstrap',
    summary: 'Drawing a same-sized sample with replacement is called bootstrapping. Statisticians use it to see how much a result would change with slightly different data.',
  },
  notes: 'Weeks 1-9 bootstrap (frac 1, replace) seeds 1-5, depth-5 tree (random_state=42), validation 10-11 minutes: 1285, 1280, 1335, 1275, 1330. First split previous_no_shows every time.',
};

export default lesson;
