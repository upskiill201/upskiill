import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { FOREST, TEST_BASE, V9 } from './code';

const FIT = TEST_BASE + FOREST + 'forest.fit(train[feats], train["no_show"])\n';

/** Chapter 10 · Lesson 11 — Speed and size. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Speed and size',
  summary: 'v0.9 is six numbers. The forest is 2,504 leaves across 100 trees. Both predict a week in a blink, but size still matters on a clinic\'s cheap phone. Three cards.',
  minutes: 11,
  outcomes: [
    'Measure how big a model is',
    'Compare simple and ensemble models on size',
    'Know when size and speed matter',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Card 1: counting the parts.</strong> v0.9 is 6 coefficients and an intercept, plus the scaler\'s averages. The standard forest is 100 trees with 2,504 leaves between them. With no depth limit: 45,725 leaves.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 2: bytes.</strong> Saved to a file, v0.9 is about 1.7 KB. The 100-tree depth-5 forest is about 380 KB, over 200 times bigger. Both are tiny for a laptop. For an app that downloads models to clinic phones over mobile data, it adds up.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 3: speed.</strong> Predicting all 200 bookings takes a few hundredths of a second either way. Training is where forests cost more: 100 trees instead of one equation, times 11 folds for cross-validation. On this phone, that\'s why the 11-week forest numbers in this chapter are quoted rather than run.</p>',
    },
    {
      kind: 'check',
      question: 'Which is true for Afiya\'s models?',
      options: ['v0.9 is about 200 times smaller than the forest', 'The forest predicts much faster', 'They\'re the same size'],
      answer: 0,
      explanation: '1.7 KB vs about 380 KB.',
    },
    {
      kind: 'tryIt',
      title: 'Counting leaves',
      caption: 'How many leaves are in the standard forest?',
      code: FIT + '\nleaves = sum(tree.get_n_leaves() for tree in forest.estimators_)\nprint("Trees:", len(forest.estimators_))\nprint("Leaves:", leaves)\n',
      challenge: 'Remove max_depth=5 and count again.',
    },
  ],
  apply: {
    scenario: 'Speed and size.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the total number of leaves in the standard forest',
        starter: FIT,
        solution: FIT + 'print(sum(tree.get_n_leaves() for tree in forest.estimators_))\n',
        hint: 'sum(tree.get_n_leaves() for tree in forest.estimators_)',
        checks: [{ message: 'Print 2504', outputEquals: '2504' }],
      },
      {
        kind: 'mcq',
        prompt: 'When does model size matter most?',
        options: [
          { text: 'Never', why: 'It matters on phones and slow links.' },
          { text: 'When the model has to be sent to, or run on, small devices' },
          { text: 'Only for accuracy', why: 'Size and accuracy are different things.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Fit v0.9 on weeks 1 to 11 and print how many coefficients it has',
        starter: TEST_BASE + V9 + 'v9.fit(train[feats], train["no_show"])\n',
        solution: TEST_BASE + V9 + 'v9.fit(train[feats], train["no_show"])\nprint(v9[-1].coef_.size)\n',
        hint: 'v9[-1].coef_.size',
        checks: [{ message: 'Print 6', outputEquals: '6' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Bigger in the forest, or about the same?',
        groups: ['Much bigger in the forest', 'About the same'],
        items: [
          { text: 'File size', group: 0 },
          { text: 'Number of parts', group: 0 },
          { text: 'Time to predict 200 bookings', group: 1 },
          { text: 'The features it needs', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'The clinic phones are old. Does it matter which model we pick?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'No difference at all.', why: 'Size differs a lot.' },
          { text: 'The forest is smaller.', why: 'It\'s far bigger.' },
          { text: 'Both predict fast, but v0.9 is 200 times smaller to download and simple to update. Since it also wins on evidence, it\'s an easy choice.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the model to its size.',
        pairs: [
          ['v0.9', '6 coefficients, about 1.7 KB'],
          ['Forest, depth 5', '2,504 leaves, about 380 KB'],
          ['Forest, no depth limit', '45,725 leaves'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Counting.',
        language: 'python',
        template: 'sum(tree.[[1]]() for tree in forest.[[2]])',
        blanks: [['get_n_leaves'], ['estimators_']],
        distractors: ['count', 'trees'],
      },
      {
        kind: 'findBug',
        prompt: 'Which claim is wrong?',
        lines: ['The forest file is far bigger.', 'Both predict 200 bookings quickly.', 'The forest is slower to predict by minutes.'],
        bug: 2,
        fix: 'The forest predicts in hundredths of a second too.',
        explanation: 'Prediction is fast for both; training is where forests cost more.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many leaves does a forest with no depth limit have here?',
        answers: ['45725', '45,725'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Where do forests cost the most time?',
        options: [
          { text: 'Predicting one booking', why: 'That\'s quick.' },
          { text: 'Training, especially many times over for cross-validation' },
          { text: 'Loading pandas', why: 'Same for both.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What app on your phone feels "too big" for what it does?',
    starters: ['For me...'],
  },
  deepen: {
    title: 'Model compression',
    summary: 'Big models can be shrunk: fewer trees, shallower trees, or training a small model to copy a big one ("distillation"). Often the simplest fix is choosing a small model in the first place.',
  },
  notes: 'Fitted on weeks 1-11: RF(100, depth 5) 2,504 leaves, pickled ~385 KB; unlimited RF 45,725 leaves; v0.9 6 coefficients, ~1.7 KB pickled. Predicting week 12 ~0.03 s.',
};

export default lesson;
