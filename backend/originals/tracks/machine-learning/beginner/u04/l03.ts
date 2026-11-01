import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { FEATS, KNN, LOAD } from './code';

/** Chapter 4 · Lesson 3 — Splitting at random: sample and drop. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Splitting at random',
  summary: 'Splitting by week is one way to make a test set. The other common way is to shuffle and cut: 90% to learn from, 10% to test. Tey shows how pandas does it in two lines.',
  minutes: 12,
  outcomes: [
    'Split a table at random with sample and drop',
    'Use random_state so the split is the same every time',
    'Check the sizes of both parts',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'You split by week in Chapter 3. Most machine learning tutorials split at random instead. Want to see how?', replies: ['Show me.'] },
        { tey: 'Two lines. train = df.sample(frac=0.9, random_state=42) picks 90% of the rows at random. test = df.drop(train.index) keeps everything that wasn\'t picked.', replies: ['What does frac mean?'] },
        { tey: 'The fraction to take. 0.9 means 90%: 2,160 of the 2,400 bookings. The other 240 become the test set.', replies: ['And random_state?'] },
        { tey: 'A seed for the shuffle. Same seed, same split, every time you run it. Without it, every run picks different rows and gives a different score, and nobody can check your work.', replies: ['Why drop(train.index)?'] },
        { tey: 'Every row has an index, a label pandas gave it. drop removes the rows whose labels are in train, so no booking can end up in both parts.', replies: ['Is random better than by week?'] },
        { tey: 'Not for us. Hold that question: lesson 9 shows why weeks matter here. For now, learn the tool. You\'ll use it all the time.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Shuffle and cut',
      caption: '90% to learn, 10% to test.',
      code: LOAD + '\ntrain = df.sample(frac=0.9, random_state=42)\ntest = df.drop(train.index)\nprint(len(train), "to learn from")\nprint(len(test), "to test on")\nprint(test["no_show"].sum(), "no-shows in the test set")\n',
      challenge: 'Change random_state to 7. Do the sizes change? Does the number of no-shows?',
    },
  ],
  apply: {
    scenario: 'Shuffle and cut.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Split at random, 90% train, with random_state=42. Print the lengths of train and test',
        starter: LOAD,
        solution: LOAD + 'train = df.sample(frac=0.9, random_state=42)\ntest = df.drop(train.index)\nprint(len(train))\nprint(len(test))\n',
        hint: 'train = df.sample(frac=0.9, random_state=42), then test = df.drop(train.index)',
        checks: [{ message: 'Print 2160 then 240', outputEquals: '2160\n240' }],
      },
      {
        kind: 'mcq',
        prompt: 'What does random_state=42 do?',
        options: [
          { text: 'Takes 42 rows', why: 'frac decides how many. The seed fixes which.' },
          { text: 'Makes the shuffle the same every time the code runs' },
          { text: 'Makes the split fairer', why: 'It makes it repeatable, not fairer.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'With the same split, print how many no-shows are in the test set',
        starter: LOAD + 'train = df.sample(frac=0.9, random_state=42)\ntest = df.drop(train.index)\n',
        solution: LOAD + 'train = df.sample(frac=0.9, random_state=42)\ntest = df.drop(train.index)\nprint(test["no_show"].sum())\n',
        hint: 'test["no_show"].sum()',
        checks: [{ message: 'Print 39', outputEquals: '39' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'The random split.',
        language: 'python',
        template: 'train = df.[[1]](frac=0.9, random_state=42)\ntest = df.[[2]](train.index)',
        blanks: [['sample'], ['drop']],
        distractors: ['head', 'copy'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part to what it does.',
        pairs: [
          ['frac=0.9', 'Take 90% of the rows'],
          ['random_state=42', 'Same shuffle every run'],
          ['drop(train.index)', 'Keep the rows not picked'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line lets some bookings land in both parts?',
        language: 'python',
        lines: ['train = df.sample(frac=0.9, random_state=42)', 'test = df.sample(frac=0.1, random_state=7)', 'print(len(train), len(test))'],
        bug: 1,
        fix: 'test = df.drop(train.index)',
        explanation: 'Two separate samples can pick the same rows. drop guarantees no overlap.',
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'I never set random_state. Every run gives a new score, and I report my favourite.',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Smart: the best run is the real one.', why: 'That\'s picking a lucky draw, not measuring.' },
          { text: 'random_state makes the model better.', why: 'It makes the split repeatable, not the model better.' },
          { text: 'Then your score is the luckiest of many shuffles. Fix the seed so anyone can rerun it and get the same number.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'With frac=0.9 on 2,400 bookings, how many go to the test set?',
        answers: ['240'],
        placeholder: 'A number',
      },
      {
        kind: 'writeCode',
        prompt: 'Score v0.3 on this random test set: print how many of the 20 riskiest bookings really missed',
        starter: LOAD + FEATS + KNN + 'train = df.sample(frac=0.9, random_state=42)\ntest = df.drop(train.index)\ntest = test.assign(risk=knn_risk(train, test, feats))\n',
        solution: LOAD + FEATS + KNN + 'train = df.sample(frac=0.9, random_state=42)\ntest = df.drop(train.index)\ntest = test.assign(risk=knn_risk(train, test, feats))\nprint(test.nlargest(20, "risk")["no_show"].sum())\n',
        hint: 'test.nlargest(20, "risk")["no_show"].sum()',
        checks: [{ message: 'Print 9', outputEquals: '9' }],
      },
      {
        kind: 'mcq',
        prompt: 'On week 12, 12 of the top 20 missed. On this random split, 9. Which is right?',
        options: [
          { text: 'Only 12: it\'s higher', why: 'Higher isn\'t the same as truer.' },
          { text: 'Both are honest scores, on different test sets. One number never tells the whole story' },
          { text: 'Neither: the predictor is broken', why: 'Different test sets give different scores. Lesson 13 deals with that.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Why would a scientist always write down the random seed they used? What could go wrong if they didn\'t?',
    starters: ['Without the seed...', 'With it...'],
  },
  deepen: {
    title: 'train_test_split',
    summary: 'From Chapter 5, scikit-learn does this in one call: train_test_split(df, test_size=0.1, random_state=42). It\'s the same idea: shuffle, cut, keep the seed.',
  },
  notes: 'df.sample(frac=0.9, random_state=42): 2,160 train, 240 test, 39 no-shows in test; test covers all 12 weeks. v0.3 (k = 15, 4 features) on this split: top 20 by risk, 9 missed; accuracy 0.8208.',
};

export default lesson;
