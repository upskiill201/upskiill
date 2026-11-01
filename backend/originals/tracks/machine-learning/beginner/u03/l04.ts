import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4 — Predicting from the neighbour: copy what the nearest patient did. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Predicting from the neighbour',
  summary: 'Kunle\'s nearest neighbour is Ireti, and Ireti came. So the predictor says Kunle will come. Kunle missed. Halima isn\'t surprised: "One patient is a thin reason to decide anything."',
  minutes: 11,
  outcomes: [
    'Turn the nearest neighbour into a prediction',
    'Know what the predictor "learned" (nothing but the examples)',
    'See why one neighbour can mislead',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'With one neighbour, the prediction is simply what that neighbour did.',
          isFact: true,
          explain: 'Fact. Ireti came, so the prediction for Kunle is "will come".',
        },
        {
          text: 'The nearest neighbour is always a reliable guide.',
          isFact: false,
          explain: 'Myth. Ireti came, Kunle missed. One similar person can easily be the exception. Lesson 7 asks several neighbours instead.',
        },
        {
          text: 'This predictor needs no training step at all: it just keeps the examples.',
          isFact: true,
          explain: 'Fact. All the work happens when you predict. That\'s why it\'s called a "lazy" learner.',
        },
        {
          text: 'If two patients have exactly the same features, the predictor treats them the same.',
          isFact: true,
          explain: 'Fact. Same features, same neighbours, same prediction. It only knows what the features tell it.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'From neighbour to prediction',
      caption: 'Ireti\'s answer becomes Kunle\'s prediction.',
      code: 'nearest = ["Ireti", 18, 6, 0]\n\nif nearest[3] == 1:\n    print("Likely to miss")\nelse:\n    print("Likely to come")\n',
      challenge: 'Change nearest to Obi: ["Obi", 9, 14, 1]. What is predicted for Rita?',
    },
  ],
  apply: {
    scenario: 'Copying the nearest neighbour.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Rita\'s nearest neighbour is Obi, who missed. Print the prediction: "Likely to miss" or "Likely to come"',
        starter: 'nearest = ["Obi", 9, 14, 1]\n',
        solution: 'nearest = ["Obi", 9, 14, 1]\nif nearest[3] == 1:\n    print("Likely to miss")\nelse:\n    print("Likely to come")\n',
        hint: 'if nearest[3] == 1:',
        checks: [
          { message: 'Print Likely to miss', outputEquals: 'Likely to miss' },
          { message: 'Use the neighbour\'s answer', codeIncludes: 'nearest[3]' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Kunle\'s nearest neighbour, Ireti, came. Kunle missed. What does that show?',
        options: [
          { text: 'The distance formula is wrong', why: 'The formula found the most similar patient correctly. She just did something different.' },
          { text: 'Kunle lied', why: 'Similar patients don\'t always do the same thing.' },
          { text: 'One neighbour can be the exception' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'With one neighbour, what is predicted?',
        groups: ['Likely to miss', 'Likely to come'],
        items: [
          { text: 'Nearest is Obi (missed)', group: 0 },
          { text: 'Nearest is Ireti (came)', group: 1 },
          { text: 'Nearest is Hauwa (missed)', group: 0 },
          { text: 'Nearest is Kelechi (came)', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each new patient to their nearest neighbour\'s verdict, and what really happened.',
        pairs: [
          ['Kunle', 'Ireti says "come"; actually missed'],
          ['Rita', 'Obi says "miss"; actually came'],
          ['Sade', 'Ireti says "come"; actually came'],
          ['Yemi', 'Kelechi says "come"; actually missed'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'So the "model" is just... a list?',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Yes: the list plus a rule for comparing. Simple, and surprisingly strong. Many real systems still use it.' },
          { text: 'No, there\'s a secret part.', why: 'There isn\'t. That\'s what makes it a good first model.' },
          { text: 'Lists can\'t be models.', why: 'Here the stored examples ARE the model.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Turn the neighbour into a prediction.',
        language: 'python',
        template: 'if nearest[[[1]]] == [[2]]:\n    print("Likely to miss")',
        blanks: [['3'], ['1']],
        distractors: ['0', '2'],
      },
      {
        kind: 'findBug',
        prompt: 'This predicts from the neighbour\'s distance, not their answer. Which line?',
        language: 'python',
        lines: ['nearest = ["Obi", 9, 14, 1]', 'if nearest[2] == 1:', '    print("Likely to miss")', 'else:', '    print("Likely to come")'],
        bug: 1,
        fix: 'if nearest[3] == 1:',
        explanation: 'p[3] is the answer (missed or came). p[2] is the distance.',
      },
      {
        kind: 'mcq',
        prompt: 'Why is it called a "lazy" learner?',
        options: [
          { text: 'It\'s slow to type', why: 'It\'s about when the work happens.' },
          { text: 'It doesn\'t use the examples', why: 'It uses them at prediction time.' },
          { text: 'It does no work until it has to predict' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'One neighbour said Kunle would come. He didn\'t. Can we ask more than one?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'No, one is the rule.', why: 'You can ask as many as you like. That\'s k.' },
          { text: 'Exactly what we\'ll do next: ask the nearest three or five, and go with the majority.' },
          { text: 'Ask all 2,400.', why: 'Then everyone gets the same answer: the majority. Lesson 8 shows why.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'With one neighbour, what does the predictor say for Kunle: miss or come?',
        answers: ['come', 'likely to come'],
        placeholder: 'miss or come',
      },
    ],
  },
  reflect: {
    prompt: 'Judging by the single most similar case is risky. When have you judged a person or place by one example that turned out to be the exception?',
    starters: ['I judged... by one example', 'It turned out...'],
  },
  deepen: {
    title: '1-NN',
    summary: 'Using one neighbour is called 1-NN. It memorises every quirk of the examples, including the odd ones. That\'s a first glimpse of overfitting (Chapter 9).',
  },
  notes: 'Nearest neighbours (2 features): Kunle -> Ireti (came; Kunle missed), Rita -> Obi (missed; Rita came), Sade -> Ireti (came; correct), Yemi -> Kelechi (came; Yemi missed). 1-NN is right for 1 of 4.',
};

export default lesson;
