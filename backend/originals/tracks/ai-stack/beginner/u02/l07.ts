import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7 — Training vs running a model (inference). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Training vs running a model',
  summary: 'Kavya reads that training a famous model took thousands of GPUs for months. "We can\'t afford that!" Arjun laughs. "We\'re not training anything. We only run a model someone else trained."',
  minutes: 11,
  outcomes: [
    'Tell training from inference (running a model)',
    'Know which one Ask Rao pays for',
    'Count how often inference happens',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two very different jobs',
      before: {
        label: 'Training',
        text: 'Teaching the model, by showing it a huge amount of text and adjusting its billions of numbers.\nDone once (or rarely), by the model lab.\nNeeds huge numbers of chips for weeks or months.\nCosts the lab a fortune.',
      },
      after: {
        label: 'Inference (running it)',
        text: 'Using the finished model to answer one message.\nDone every time a customer asks something.\nNeeds a little chip time per answer.\nThis is what Ask Rao pays for.',
      },
      notes: [
        'Model labs train; app builders like Ask Rao\'s team run (infer).',
        'Training needs far more memory and chips than running, because the model is being changed as it learns.',
        'Inference cost is small per answer, but it happens on every message, so it adds up.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'How often do we infer?',
      caption: 'Every chat is at least one inference.',
      code: 'chats_per_day = 1000\ndays = 30\ninferences = chats_per_day * days\nprint(f"{inferences:,} inferences a month")\n',
      challenge: 'If each chat needs 2 model calls (one to decide, one to answer), how many a month?',
    },
  ],
  apply: {
    scenario: 'Training or running?',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Training or inference?',
        groups: ['Training', 'Inference'],
        items: [
          { text: 'A lab teaching a model on a huge library of text', group: 0 },
          { text: 'Ask Rao answering "Is delivery free?"', group: 1 },
          { text: 'Months of work on thousands of chips', group: 0 },
          { text: 'A fraction of a second per reply', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: '1,000 chats a day, 2 model calls each, 30 days. Print the number of model calls a month',
        starter: 'chats_per_day = 1000\ncalls_per_chat = 2\ndays = 30\n',
        solution: 'chats_per_day = 1000\ncalls_per_chat = 2\ndays = 30\nprint(chats_per_day * calls_per_chat * days)\n',
        hint: 'Multiply all three',
        checks: [{ message: 'Print 60000', outputEquals: '60000' }],
      },
      {
        kind: 'mcq',
        prompt: 'Which does Ask Rao\'s team pay for?',
        options: [
          { text: 'Inference: running a model someone else trained' },
          { text: 'Training a new model from scratch', why: 'That costs a fortune and isn\'t needed for shop questions.' },
          { text: 'Both, equally', why: 'They only run (infer); a lab already trained the model.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the job to who usually does it.',
        pairs: [
          ['Training a large model', 'A model lab'],
          ['Running it for customers', 'App builders like Ask Rao'],
          ['Making the chips', 'Chip companies and foundries'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Should we train our own model on the shop\'s data, so it really knows us?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Not to start. Giving an existing model the shop\'s facts at answer time (retrieval) is far cheaper and easy to update. Chapter 6.' },
          { text: 'Yes, train one from zero this week.', why: 'That needs enormous data and chips.' },
          { text: 'Models can\'t learn about shops.', why: 'They can, but retrieval is the cheap way here.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The two jobs.',
        template: '[[1]] teaches the model once. [[2]] uses it for every message.',
        blanks: [['Training'], ['Inference']],
        distractors: ['Chatting', 'Printing'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does training need more memory than running?',
        options: [
          { text: 'The model is being changed as it learns, so extra numbers must be kept for every parameter' },
          { text: 'Training uses longer words', why: 'It\'s about the work of adjusting billions of numbers.' },
          { text: 'It doesn\'t', why: 'Training needs several times the memory of running.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which sentence in Kavya\'s summary is wrong?',
        lines: [
          'Training happens rarely; inference happens every message.',
          'Inference is cheap per answer but adds up.',
          'Ask Rao must pay for training each morning.',
          'Labs train the models we rent.',
        ],
        bug: 2,
        fix: 'Ask Rao pays only for inference.',
        explanation: 'The model is already trained. Ask Rao just runs it.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(f"{500 * 30:,}")',
        language: 'python',
        options: [
          { text: '15,000' },
          { text: '15000', why: 'The :, adds a comma.' },
          { text: '530', why: 'It multiplies.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the word for running a trained model to get an answer? (one word)',
        answers: ['inference', 'Inference'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'A cook trains for years but cooks a meal in minutes. What else in your life is "trained once, used every day"?',
    starters: ['I learned... once', 'Now I use it...'],
  },
  deepen: {
    title: 'Fine-tuning',
    summary: 'Between the two is fine-tuning: a little extra training on your own examples. It\'s far cheaper than training from scratch, but usually unnecessary for facts. Chapter 4 compares it with retrieval.',
  },
  notes: 'Training (rare, compute- and memory-heavy: weights, gradients and optimiser state) vs inference (per request). 1000 x 2 x 30 = 60,000; 500 x 30 = 15,000.',
};

export default lesson;
