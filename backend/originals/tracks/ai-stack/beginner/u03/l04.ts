import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4 — Training in one picture: guess, check, adjust. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Training in one picture',
  summary: 'Where do the model\'s billions of numbers come from? Not from anyone typing them. Tey shows Joel the loop at the heart of training, and clears up a few myths on the way.',
  minutes: 11,
  outcomes: [
    'Describe training as guess, check, adjust',
    'Know what training data does and doesn\'t give a model',
    'Run a tiny guess-check-adjust loop',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Training means people type the model\'s answers in.',
          isFact: false,
          explain: 'Myth. Training shows the model huge amounts of text. It guesses the next token, checks against the real one, and nudges its numbers to guess better. Repeat, billions of times.',
        },
        {
          text: 'Each wrong guess changes the model\'s numbers a tiny bit.',
          isFact: true,
          explain: 'Fact. That small adjustment, repeated across enormous amounts of text, is how the numbers end up useful.',
        },
        {
          text: 'A trained model knows about events after its training ended.',
          isFact: false,
          explain: 'Myth. Its knowledge stops at its training cut-off. It doesn\'t know Mr Rao\'s new policy unless you give it.',
        },
        {
          text: 'Later training steps teach models to follow instructions and be helpful.',
          isFact: true,
          explain: 'Fact. After learning from raw text, models are usually trained further on examples of good answers and on human feedback.',
        },
        {
          text: 'Training a big model is something a small team does every week.',
          isFact: false,
          explain: 'Myth. It takes huge amounts of data and compute. Small teams run models others trained.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Guess, check, adjust',
      caption: 'One number learns to match a target.',
      code: 'target = 7.0      # the right answer\nguess = 0.0\nfor step in range(5):\n    error = target - guess\n    guess = guess + 0.5 * error     # nudge halfway\n    print(f"step {step + 1}: guess {guess}")\n',
      challenge: 'Change 0.5 to 0.1. Does it learn faster or slower?',
    },
  ],
  apply: {
    scenario: 'How training works.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order one step of training.',
        lines: ['The model guesses the next token', 'Check the guess against the real next token', 'Work out how wrong it was', 'Nudge the numbers to guess better', 'Repeat with the next piece of text'],
      },
      {
        kind: 'writeCode',
        prompt: 'Run the loop for 3 steps and print the final guess',
        starter: 'target = 8.0\nguess = 0.0\n',
        solution: 'target = 8.0\nguess = 0.0\nfor step in range(3):\n    error = target - guess\n    guess = guess + 0.5 * error\nprint(guess)\n',
        hint: 'for step in range(3): error = target - guess; guess = guess + 0.5 * error',
        checks: [{ message: 'Print 7.0', outputEquals: '7.0' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact about training?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'People type the answers in', group: 0 },
          { text: 'Numbers are nudged after each guess', group: 1 },
          { text: 'The model knows tomorrow\'s news', group: 0 },
          { text: 'Knowledge stops at a cut-off date', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why doesn\'t the model know Mr Rao\'s return policy?',
        options: [
          { text: 'It was never in its training data, and nobody has given it the policy' },
          { text: 'It forgot it', why: 'It never learned it.' },
          { text: 'Return policies are secret', why: 'It simply wasn\'t in the text it trained on.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'So should we train the model on our help page?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'No need: pasting the right part of the page into the prompt works today, and updates the moment the policy changes. Training would be slow and expensive.' },
          { text: 'Yes, every time a policy changes.', why: 'Far too slow and costly for facts that change.' },
          { text: 'Models can\'t learn shops.', why: 'They can. Retrieval is just simpler.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'target = 4.0, guess = 0.0, one step of guess = guess + 0.5 * (target - guess). What is guess?',
        code: 'target = 4.0\nguess = 0.0\nguess = guess + 0.5 * (target - guess)\nprint(guess)',
        language: 'python',
        options: [
          { text: '2.0' },
          { text: '4.0', why: 'It moves halfway in one step.' },
          { text: '0.5', why: '0.5 x 4 = 2.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The training loop.',
        template: '[[1]], check, [[2]]. Repeat billions of times.',
        blanks: [['Guess'], ['adjust', 'nudge']],
        distractors: ['Delete', 'print'],
      },
      {
        kind: 'findBug',
        prompt: 'This guess moves AWAY from the target. Which line?',
        language: 'python',
        lines: ['target = 7.0', 'guess = 0.0', 'error = target - guess', 'guess = guess - 0.5 * error'],
        bug: 3,
        fix: 'guess = guess + 0.5 * error',
        explanation: 'Add the nudge to move towards the target.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the stage to what the model learns.',
        pairs: [
          ['Learning from raw text', 'Language and general knowledge'],
          ['Training on good answers', 'Following instructions'],
          ['Your prompt at answer time', 'Mr Rao\'s actual policies'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the date after which a model knows nothing new called? (training ...)',
        answers: ['cut-off', 'cutoff', 'cut off', 'training cut-off'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Guess, check, adjust: is that how you learned to cook, drive or type? What was your "error" signal?',
    starters: ['I learned... by', 'I knew I was wrong when...'],
  },
  deepen: {
    title: 'Gradient descent',
    summary: 'The "nudge" in real training is calculated with maths called gradient descent: for each number, which direction makes the error smaller, and by how much. Your loop is a one-number version.',
  },
  notes: 'Pretraining: next-token prediction with gradient-based updates; post-training: supervised fine-tuning and human-feedback methods (e.g. RLHF). Knowledge cut-off. Loop: target 8, step 0.5: 4.0, 6.0, 7.0; target 4 one step: 2.0.',
};

export default lesson;
