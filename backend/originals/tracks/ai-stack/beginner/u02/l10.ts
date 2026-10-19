import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9: supply risk, training vs inference, renting, local and shrunk models. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: rent, run or shrink',
  summary: 'The team now knows the three ways to get compute: pay per answer, rent a GPU by the hour, or run a shrunk model locally. Quick check before they work out how fast each one answers.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Cost renting and shrinking without notes', 'Tell training from inference'],
  learn: [
    {
      kind: 'story',
      title: 'Three options',
      beats: [
        { speaker: 'narrator', text: 'Joel\'s table: pay per answer about $5 a month; rented GPU $540 to $1,080 a month; laptop at 4 bits, free but not for customers.' },
        { speaker: 'arjun', text: 'Good. Now add one more column: how long does a customer wait?' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: getting compute.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'A $2.00-an-hour GPU, 24 hours a day, 30 days. Print the monthly bill',
        starter: 'per_hour = 2.00\n',
        solution: 'per_hour = 2.00\nprint(per_hour * 24 * 30)\n',
        hint: 'per_hour * 24 * 30',
        checks: [{ message: 'Print 1440.0', outputEquals: '1440.0' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Training or inference?',
        groups: ['Training', 'Inference'],
        items: [
          { text: 'Adjusting billions of numbers over months', group: 0 },
          { text: 'Answering one customer message', group: 1 },
          { text: 'What Ask Rao pays for', group: 1 },
          { text: 'What a model lab does once', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the size in GB of a 13B model at 4 bits (0.5 bytes each)',
        starter: 'parameters = 13_000_000_000\n',
        solution: 'parameters = 13_000_000_000\nprint(parameters * 0.5 / 1_000_000_000)\n',
        hint: 'parameters * 0.5 / 1_000_000_000',
        checks: [{ message: 'Print 6.5', outputEquals: '6.5' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the option to how you pay.',
        pairs: [
          ['Model API', 'Per answer (per token)'],
          ['Cloud GPU', 'Per hour switched on'],
          ['Local runtime', 'Your own machine and electricity'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A rented GPU sits idle overnight. What happens to the bill?',
        options: [
          { text: 'It keeps running: you pay for every hour it\'s on' },
          { text: 'It pauses automatically', why: 'Not unless you switch it off or use a per-second service.' },
          { text: 'It gets cheaper', why: 'Same price per hour, busy or not.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line is wrong?',
        language: 'python',
        lines: ['monthly = 1080.0', 'rise = 0.10', 'new_monthly = monthly * rise', 'print(new_monthly)'],
        bug: 2,
        fix: 'new_monthly = monthly * (1 + rise)',
        explanation: 'monthly * rise gives only the extra (108), not the new total.',
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'My 4-bit laptop model answered all 10 test questions right. Ship it?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'Great test! But for customers it has to be up all day and handle many at once. Keep it as our private test bench.' },
          { text: 'Yes, ship the laptop.', why: 'One laptop can\'t serve every customer reliably.' },
          { text: '10 questions prove nothing.', why: 'They prove something. Just not that a laptop can serve customers.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Two ways to make a big model fit.',
        template: 'Use fewer [[1]] per parameter, or spread it across several [[2]].',
        blanks: [['bits', 'bytes'], ['GPUs', 'chips']],
        distractors: ['laptops', 'tokens'],
      },
      {
        kind: 'mcq',
        prompt: 'Why keep a second model or provider ready?',
        options: [
          { text: 'So a price rise or outage at one supplier doesn\'t stop Ask Rao' },
          { text: 'To double the bill', why: 'You only pay for what you use.' },
          { text: 'Because models expire', why: 'They don\'t; suppliers can change price or go down.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'for hours in [24, 12]:\n    print(1.5 * hours * 30)',
        language: 'python',
        options: [
          { text: '1080.0 then 540.0' },
          { text: '1080.0 only', why: 'The loop runs once for each value.' },
          { text: '540.0 then 1080.0', why: '24 comes first in the list.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which word means "running a trained model to get an answer"?',
        answers: ['inference'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Pay per use, rent, or own: which do you choose for your phone plan, transport and software? What decides it?',
    starters: ['For... I...', 'It depends on...'],
  },
  notes: 'Checkpoint for Chapter 2 lessons 6-9. 2.0 x 720 = 1440.0; 13B x 0.5 B = 6.5 GB.',
};

export default lesson;
