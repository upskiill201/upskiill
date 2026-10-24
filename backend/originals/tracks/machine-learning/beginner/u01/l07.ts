import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7 — Training and predicting: the two phases of every model. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Training and predicting',
  summary: 'Bisi wants to know when the model will "do" something. Miracle draws two boxes on the whiteboard: first the model learns from the past, then it guesses about the future. Every model works in these two steps.',
  minutes: 10,
  outcomes: [
    'Tell training from predicting',
    'Know which data has labels in each step',
    'Explain why a model is trained before it\'s used',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two steps, every time',
      before: {
        label: 'Training (learning from the past)',
        text: 'Input: past appointments WITH the answer.\nAmina, 3 days, reminder: came.\nTolu, 21 days, no reminder: missed.\n...\nThe model looks for patterns.\nOutput: a model (a rule-finder that has learned).',
      },
      after: {
        label: 'Predicting (guessing about the future)',
        text: 'Input: tomorrow\'s appointments WITHOUT the answer.\nAde, 19 days, no reminder: ?\nThe model applies what it learned.\nOutput: a guess: "likely to miss".',
      },
      notes: [
        'Training needs labelled examples: we must already know who came.',
        'Predicting happens on new examples, where nobody knows the answer yet. That\'s the whole point.',
        'You train once (or now and then), and predict many times: every day\'s list.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'In code you\'ll see these two steps as two words: fit (train on examples) and predict (guess for new ones). You\'ll type them yourself in Chapter 5.',
    },
  ],
  apply: {
    scenario: 'Training, then predicting.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which step uses past appointments where we already know who came?',
        options: [
          { text: 'Predicting', why: 'Predicting is for new appointments with no answer yet.' },
          { text: 'Neither', why: 'Training learns from exactly those.' },
          { text: 'Training' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: "Print \"Train on 12, predict for 4\" using the variables",
        starter: "past = 12\nnew = 4\n",
        solution: "past = 12\nnew = 4\nprint(f\"Train on {past}, predict for {new}\")\n",
        hint: "print(f\"Train on {past}, predict for {new}\")",
        checks: [
          { message: "Print Train on 12, predict for 4", outputEquals: "Train on 12, predict for 4" },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Training or predicting?',
        groups: ['Training', 'Predicting'],
        items: [
          { text: 'Learning from last year\'s appointments', group: 0 },
          { text: 'Guessing about tomorrow\'s list', group: 1 },
          { text: 'Looking for patterns in labelled examples', group: 0 },
          { text: 'Flagging a new booking as "likely to miss"', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Collect past appointments with answers', 'Train the model on them', 'Give it tomorrow\'s appointments', 'It predicts who might miss'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to what goes in.',
        pairs: [
          ['Training input', 'Examples with the answer'],
          ['Predicting input', 'New examples, no answer'],
          ['Predicting output', 'A guess'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why can\'t we train on tomorrow\'s appointments?',
        options: [
          { text: 'They are too few', why: 'Even a big list can\'t be used for training without answers.' },
          { text: 'We don\'t know their answers yet' },
          { text: 'Models can only use old data', why: 'They predict on new data. They train on data with known answers.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The two words you\'ll use in code.',
        template: 'First you [[1]] the model on examples, then you [[2]] for new ones.',
        blanks: [['fit', 'train'], ['predict']],
        distractors: ['delete', 'print'],
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'Does the model have to learn again every morning?',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Yes, from zero, every day.', why: 'Training is occasional. Predicting is daily.' },
          { text: 'It never needs training.', why: 'Without training it has learned nothing.' },
          { text: 'No. Train it now and then on past data, then use it to predict every morning\'s list.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which sentence in Emmanuel\'s notes is wrong?',
        lines: [
          'Training: the model learns from labelled examples.',
          'Predicting: the model guesses for new examples.',
          'We need tomorrow\'s answers before we can predict tomorrow.',
          'We can predict many times after training once.',
        ],
        bug: 2,
        fix: 'We predict tomorrow precisely because we don\'t know its answers yet.',
        explanation: 'If you already knew the answers, you wouldn\'t need a prediction.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'One word: the step where a model learns from examples.',
        answers: ['training', 'train', 'fit', 'fitting'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Halima\'s sticky-note rule: which part was "training"?',
        options: [
          { text: 'Finding the rule from the 12 patients' },
          { text: 'Using the rule on a new patient', why: 'That\'s predicting.' },
          { text: 'Writing it on a sticky note', why: 'Where you write it doesn\'t matter. Finding it from examples was the training.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a skill you "trained" on past examples and now "predict" with, like judging if a fruit is ripe. How did the training happen?',
    starters: ['I learned to tell... by', 'Now I predict...'],
  },
  deepen: {
    title: 'Retraining',
    summary: 'The world changes: a new bus route, a rainy season. Models are retrained now and then on recent data so their patterns stay up to date. Chapter 12 calls this drift.',
  },
  notes: 'fit / predict are the scikit-learn method names (Chapter 5). Training uses labelled data; prediction is on unlabelled data.',
};

export default lesson;
