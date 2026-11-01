import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { FEATS, KNN, LOAD } from './code';

/** Chapter 4 · Lesson 13 — Random seeds and repeatable results. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Random seeds and repeatable results',
  summary: 'Same predictor, same data, five different random splits: the top 20 catches anywhere from 6 to 13 no-shows. Which one is "the" score? Tey explains why one random number isn\'t enough.',
  minutes: 12,
  outcomes: [
    'See how much a score moves between random splits',
    'Fix a seed so results can be repeated',
    'Report a range instead of one lucky number',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'In lesson 3, random_state=42 gave a test set where 9 of the top 20 missed. Want to see what other seeds give?', replies: ['Go on.'] },
        { tey: 'Seed 1: 13. Seed 7: 12. Seed 42: 9. Seed 99: 6. Seed 2024: 10. Same predictor, same data. Only the shuffle changed.', replies: ['That\'s a huge range.'] },
        { tey: 'Each test set is just 240 bookings, so luck plays a big part: some draws get more easy no-shows than others. One number on its own can\'t tell you much.', replies: ['So what do I report?'] },
        { tey: 'Two habits. First, always fix the seed, so anyone can rerun your code and get the same number. Second, try several seeds and report the range: "between 6 and 13 of the top 20, usually around 10".', replies: ['Isn\'t picking a seed cheating?'] },
        { tey: 'Choosing the seed after seeing the scores is cheating: that\'s Chidi\'s favourite-run trick. Fixing it before, and showing several, is honest.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Five shuffles',
      caption: 'The same predictor on five random splits.',
      code: LOAD + FEATS + KNN + '\nfor seed in [1, 7, 42, 99, 2024]:\n    train = df.sample(frac=0.9, random_state=seed)\n    test = df.drop(train.index)\n    t = test.assign(risk=knn_risk(train, test, feats))\n    print(seed, t.nlargest(20, "risk")["no_show"].sum())\n',
      challenge: 'What\'s the smallest and largest? What would you put in a report?',
    },
  ],
  apply: {
    scenario: 'Repeatable results.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Run the predictor on random splits with seeds 1, 7 and 42. Print each seed and how many of its top 20 missed',
        starter: LOAD + FEATS + KNN + 'for seed in [1, 7, 42]:\n    train = df.sample(frac=0.9, random_state=seed)\n    test = df.drop(train.index)\n    t = test.assign(risk=knn_risk(train, test, feats))\n',
        solution: LOAD + FEATS + KNN + 'for seed in [1, 7, 42]:\n    train = df.sample(frac=0.9, random_state=seed)\n    test = df.drop(train.index)\n    t = test.assign(risk=knn_risk(train, test, feats))\n    print(seed, t.nlargest(20, "risk")["no_show"].sum())\n',
        hint: 'print(seed, t.nlargest(20, "risk")["no_show"].sum())',
        checks: [{ message: 'Print 1 13, 7 12, 42 9', outputEquals: '1 13\n7 12\n42 9' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why do the scores differ so much between seeds?',
        options: [
          { text: 'The predictor changes its mind', why: 'The method is identical. Only the split changed.' },
          { text: 'Each test set is small, so which bookings it gets is partly luck' },
          { text: 'Seed 42 is broken', why: 'It\'s just a different draw.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest or not?',
        groups: ['Honest', 'Not honest'],
        items: [
          { text: 'Fix the seed before running', group: 0 },
          { text: 'Rerun until the score looks good', group: 1 },
          { text: 'Report a range across seeds', group: 0 },
          { text: 'Report only the best seed', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'For seed 99, print how many no-shows are in the test set',
        starter: LOAD + 'train = df.sample(frac=0.9, random_state=99)\ntest = df.drop(train.index)\n',
        solution: LOAD + 'train = df.sample(frac=0.9, random_state=99)\ntest = df.drop(train.index)\nprint(test["no_show"].sum())\n',
        hint: 'test["no_show"].sum()',
        checks: [{ message: 'Print 35', outputEquals: '35' }],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'I need ONE number for the board, not a range.',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Then 13, the best one.', why: 'That\'s the luckiest draw, not the typical one.' },
          { text: 'I can\'t give you a number.', why: 'You can: one honest number, with its range.' },
          { text: 'Then the honest one is the week-12 test: 12 of 20. I\'ll add one line saying random weeks range from 6 to 13, so nobody expects 12 every week.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the seed to its top-20 score.',
        pairs: [
          ['Seed 1', '13'],
          ['Seed 42', '9'],
          ['Seed 99', '6'],
          ['Seed 2024', '10'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The two habits.',
        template: 'Fix the [[1]] so results repeat. Report a [[2]], not one lucky number.',
        blanks: [['seed'], ['range']],
        distractors: ['score', 'winner'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line makes the result impossible to repeat?',
        language: 'python',
        lines: ['train = df.sample(frac=0.9)', 'test = df.drop(train.index)', 't = test.assign(risk=knn_risk(train, test, feats))'],
        bug: 0,
        fix: 'train = df.sample(frac=0.9, random_state=42)',
        explanation: 'Without a seed, every run picks different rows.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Across seeds 1, 7, 42, 99 and 2024, what\'s the highest top-20 score?',
        answers: ['13'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'When is choosing a seed cheating?',
        options: [
          { text: 'Always', why: 'Fixing a seed before running is good practice.' },
          { text: 'When you choose it after seeing which seed scores best' },
          { text: 'Never', why: 'Picking the luckiest seed afterwards is cheating.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'A friend says their diet worked because they lost 2 kg in one week. Why is one week like one random seed?',
    starters: ['One week is like one seed because...', 'A fairer test would be...'],
  },
  deepen: {
    title: 'Why 42?',
    summary: 'Programmers often use 42, a joke from The Hitchhiker\'s Guide to the Galaxy. Any number works. What matters is choosing it before you look, and writing it down.',
  },
  notes: 'frac=0.9 random splits, v0.3 (k = 15, 4 features), top 20 by risk: seed 1 13 (55 no-shows in test), 7 12 (49), 42 9 (39), 99 6 (35), 2024 10 (61). Test sets 240 rows.',
};

export default lesson;
