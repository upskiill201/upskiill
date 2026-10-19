import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 12 — Tokens per second: how long a customer waits. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Tokens per second',
  summary: 'Arjun\'s missing column: how long does a customer wait? Kavya tests a long, friendly reply about returns. It\'s lovely, and it takes five seconds. On a phone, five seconds feels like forever.',
  minutes: 11,
  outcomes: [
    'Work out a reply\'s wait time: tokens ÷ tokens per second',
    'See why long replies feel slow',
    'Read a model\'s speed from the practice price cards',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Five seconds',
      beats: [
        { speaker: 'narrator', text: 'Kavya\'s reply about returns is 300 tokens long: warm, detailed, with a thank-you at the end. On model-a it takes 5 seconds to finish.' },
        { speaker: 'joel', text: 'Model-a writes about 60 tokens a second. 300 divided by 60 is 5.' },
        { speaker: 'arjun', text: 'And model-b writes about 120 a second, so the same reply takes 2.5. Or keep the reply to 60 tokens, and it\'s half a second on model-b.' },
        { speaker: 'kavya', text: 'So speed is the model AND the length of what I make it say.' },
        { speaker: 'tey', text: 'Exactly. Wait time is tokens out divided by tokens per second, plus a little time to start. Shorter replies are faster and cheaper.' },
      ],
      choice: {
        prompt: 'What should Kavya change first?',
        options: [
          { text: 'Keep replies short and to the point, then check the speed again.', outcome: 'Fewer tokens out: faster and cheaper, and customers on phones prefer short answers anyway.', best: true },
          { text: 'Buy the fastest chips available.', outcome: 'Expensive, and a 300-token reply is still slower than a 60-token one on any chip.' },
          { text: 'Nothing: customers will wait.', outcome: 'On phones, many won\'t. Every second of waiting loses some.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Wait times',
      caption: 'Speeds come from the practice price cards.',
      code: 'from teyro_ai import MODELS\n\nreply_tokens = 300\nfor name in ["model-a", "model-b", "model-c"]:\n    speed = MODELS[name]["speed"]\n    print(f"{name}: {reply_tokens / speed:.1f} seconds")\n',
      challenge: 'Try a 60-token reply.',
    },
  ],
  apply: {
    scenario: 'How long does the customer wait?',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print how many seconds a 300-token reply takes on model-b, using MODELS["model-b"]["speed"]',
        starter: 'from teyro_ai import MODELS\n\nreply_tokens = 300\n',
        solution: 'from teyro_ai import MODELS\n\nreply_tokens = 300\nprint(reply_tokens / MODELS["model-b"]["speed"])\n',
        hint: 'reply_tokens / MODELS["model-b"]["speed"]',
        checks: [{ message: 'Print 2.5', outputEquals: '2.5' }],
      },
      {
        kind: 'mcq',
        prompt: 'A reply is 300 tokens and the model writes 60 tokens a second. How long does it take?',
        options: [
          { text: '5 seconds' },
          { text: '18,000 seconds', why: 'Divide, don\'t multiply: 300 / 60.' },
          { text: '0.2 seconds', why: 'That\'s 60 / 300, upside down.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the model to its practice speed.',
        pairs: [
          ['model-a', '60 tokens a second'],
          ['model-b', '120 tokens a second'],
          ['model-c', '90 tokens a second'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Makes the customer wait longer, or shorter?',
        groups: ['Longer', 'Shorter'],
        items: [
          { text: 'A 300-token reply', group: 0 },
          { text: 'A faster model', group: 1 },
          { text: 'A 60-token reply', group: 1 },
          { text: 'A slower, bigger model', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'But long replies sound friendlier!',
        prompt: "Joel's best reply?",
        options: [
          { text: 'Friendly can be short. "Yes! Free delivery over ₹999." is warm and takes half a second.' },
          { text: 'True, make them longer.', why: 'Longer is slower and costs more.' },
          { text: 'Friendliness doesn\'t matter.', why: 'It matters; it just doesn\'t need many words.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The wait-time formula.',
        template: 'wait = tokens [[1]] / tokens per [[2]]',
        blanks: [['out'], ['second']],
        distractors: ['in', 'minute'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(60 / 120)',
        language: 'python',
        options: [
          { text: '0.5' },
          { text: '2.0', why: 'That\'s 120 / 60.' },
          { text: '7200', why: 'It divides.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'This prints 0.2 seconds for a 300-token reply. Which line?',
        language: 'python',
        lines: ['reply_tokens = 300', 'speed = 60', 'wait = speed / reply_tokens', 'print(wait)'],
        bug: 2,
        fix: 'wait = reply_tokens / speed',
        explanation: 'Tokens divided by tokens per second gives seconds.',
      },
      {
        kind: 'writeCode',
        prompt: 'Print the wait for a 60-token reply on model-a, using the price cards',
        starter: 'from teyro_ai import MODELS\n',
        solution: 'from teyro_ai import MODELS\nprint(60 / MODELS["model-a"]["speed"])\n',
        hint: '60 / MODELS["model-a"]["speed"]',
        checks: [{ message: 'Print 1.0', outputEquals: '1.0' }],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A 120-token reply at 120 tokens a second. How many seconds?',
        answers: ['1', '1.0', 'one'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'How long are you willing to wait for an answer on your phone before you give up? Does it depend on the question?',
    starters: ['I\'ll wait about...', 'It depends on...'],
  },
  deepen: {
    title: 'Time to first token',
    summary: 'Customers notice the wait before the first word more than the total time. Showing words as they arrive (streaming, Chapter 9) makes a 2.5-second reply feel instant.',
  },
  notes: 'teyro_ai MODELS speeds (practice): model-a 60, model-b 120, model-c 90 tokens/s. 300/60 = 5.0; 300/120 = 2.5; 300/90 = 3.33; 60/60 = 1.0. Real speeds vary with model, hardware and load; time to first token adds latency.',
};

export default lesson;
