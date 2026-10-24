import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 17 — Common compute mistakes. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Common compute mistakes',
  summary: 'Arjun reviews Kavya\'s first hosting plan and circles four mistakes in red. Every one of them is common, and every one would have cost Mr Rao money.',
  minutes: 12,
  outcomes: [
    'Spot four common compute mistakes',
    'Fix each one with the chapter\'s maths',
    'Check a plan before anyone spends money',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Kavya\'s plan, and Arjun\'s fixes',
      before: {
        label: 'Kavya\'s first plan',
        text: '1. 70B model, 16-bit, on one 24 GB GPU.\n2. Memory: 70 x 2 = 140 bytes. Easy.\n3. Rent a GPU 24/7 for 30,000 chats a month.\n4. 300-token replies, "they\'ll wait".',
      },
      after: {
        label: 'Fixed',
        text: '1. A model that fits: 70B at 16-bit needs 140 GB.\n2. Memory is in GB: 70 billion x 2 bytes = 140 GB.\n3. At 30,000 chats, pay per answer (about $5, not $1,080).\n4. Short replies: 60 tokens, about half a second on model-b.',
      },
      notes: [
        'Mistake 1: not checking the model fits. Memory is the first limit.',
        'Mistake 2: losing the units. "Billions" and "GB" matter; write them down.',
        'Mistake 3: paying for idle hours. Rented GPUs bill whether or not anyone asks.',
        'Mistake 4: ignoring speed. Wait = tokens out ÷ tokens per second.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Before spending money on compute, check four numbers: memory, monthly bill, wait time, and a backup if the supplier fails.',
    },
  ],
  apply: {
    scenario: 'Reviewing a compute plan.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Fix the memory sum so it prints the GB for 70 billion parameters at 2 bytes each',
        starter: 'parameters = 70\nbytes_each = 2\nprint(parameters * bytes_each)\n',
        solution: 'parameters = 70_000_000_000\nbytes_each = 2\nprint(parameters * bytes_each / 1_000_000_000)\n',
        hint: 'Use the full 70_000_000_000, then divide by 1_000_000_000 for GB',
        checks: [{ message: 'Print 140.0', outputEquals: '140.0' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the mistake to its fix.',
        pairs: [
          ['The model doesn\'t fit', 'Check memory first'],
          ['Paying for idle hours', 'Pay per answer at low volume'],
          ['Long waits', 'Shorter replies, faster model'],
          ['One supplier only', 'Keep a backup ready'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Kavya wrote "70 x 2 = 140 bytes". What went wrong?',
        options: [
          { text: 'It should be 70 + 2', why: 'Multiply is right; the units were lost.' },
          { text: 'She dropped the "billion": it\'s 140 billion bytes, which is 140 GB' },
          { text: 'Nothing', why: '140 bytes would fit on anything. The real answer is 140 GB.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'A good check before spending money, or a mistake?',
        groups: ['Good check', 'Mistake'],
        items: [
          { text: 'Work out if the model fits in memory', group: 0 },
          { text: 'Rent a GPU 24/7 for a few chats', group: 1 },
          { text: 'Estimate the wait time', group: 0 },
          { text: 'Assume customers will wait', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Four mistakes in one plan. I\'m bad at this.',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Yes, leave compute to Joel.', why: 'Everyone makes these. The point is catching them early.' },
          { text: 'They\'re not mistakes.', why: 'They are, and they\'d have cost real money.' },
          { text: 'You wrote a plan, and we found the mistakes before spending a rupee. That\'s exactly what plans are for.' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the wait for a 60-token reply on model-b',
        starter: 'from teyro_ai import MODELS\n',
        solution: 'from teyro_ai import MODELS\nprint(60 / MODELS["model-b"]["speed"])\n',
        hint: '60 / MODELS["model-b"]["speed"]',
        checks: [{ message: 'Print 0.5', outputEquals: '0.5' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'The four checks.',
        template: 'Memory, monthly [[1]], wait [[2]], and a backup.',
        blanks: [['bill', 'cost'], ['time']],
        distractors: ['logo', 'colour'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in the fixed plan is still a mistake?',
        lines: [
          'Use a model that fits in memory.',
          'Pay per answer at 30,000 chats a month.',
          'Make every reply as long as possible.',
          'Keep a second model ready.',
        ],
        bug: 2,
        fix: 'Keep replies short.',
        explanation: 'Long replies are slower and cost more.',
      },
      {
        kind: 'mcq',
        prompt: 'What does "losing the units" mean?',
        options: [
          { text: 'Forgetting whether a number is in billions, bytes or GB, so the answer is wildly off' },
          { text: 'Deleting the GPU', why: 'It\'s about the units of measurement.' },
          { text: 'Using metric units', why: 'It\'s about keeping track of whichever units you use.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'At 30,000 chats a month, about how many dollars does pay-per-answer cost? (practice numbers, whole dollars)',
        answers: ['5', '$5', '5.4', '$5.40'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Which of the four mistakes do you think is easiest to make in real life, and how would you catch it?',
    starters: ['The easiest mistake is...', 'I\'d catch it by...'],
  },
  deepen: {
    title: 'Write the units',
    summary: 'Engineers who handle big numbers write the unit after every value (14 GB, 720 h, $1.50/h). It feels slow and saves the most expensive mistakes.',
  },
  notes: '70B x 2 B = 140 GB; 60 / 120 = 0.5 s; 30,000 x $0.00018 = $5.40 (practice). GPU 24/7 = $1,080 (practice).',
};

export default lesson;
