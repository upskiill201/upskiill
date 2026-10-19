import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14: edge, speed, energy, the hosting choice. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: speed, energy, choice',
  summary: 'The team can now say how long a customer waits, how much energy a GPU uses, what fits on a phone, and where Ask Rao should run. Quick check before Kavya\'s laptop gets one last chance.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Work out wait times and energy without notes', 'Justify the hosting choice'],
  learn: [
    {
      kind: 'story',
      title: 'The decision note',
      beats: [
        { speaker: 'narrator', text: 'Joel\'s note: "API for customers (30,000 chats, no data rule, small team). Short replies: 60 tokens, half a second on model-b. Laptop at 4 bits for experiments."' },
        { speaker: 'arjun', text: 'Signed. Now make sure you can defend every number in it.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: speed, energy and the choice.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the wait in seconds for a 180-token reply on model-c, using the price cards',
        starter: 'from teyro_ai import MODELS\n',
        solution: 'from teyro_ai import MODELS\nprint(180 / MODELS["model-c"]["speed"])\n',
        hint: '180 / MODELS["model-c"]["speed"]',
        checks: [{ message: 'Print 2.0', outputEquals: '2.0' }],
      },
      {
        kind: 'mcq',
        prompt: 'Which makes Ask Rao answer fastest?',
        options: [
          { text: 'A short reply on a fast model' },
          { text: 'A long reply on a fast model', why: 'Long replies take longer on any model.' },
          { text: 'A short reply on the slowest model', why: 'Speed matters too.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'A 0.5 kW machine runs 100 hours. Print the energy in kWh',
        starter: 'power_kw = 0.5\nhours = 100\n',
        solution: 'power_kw = 0.5\nhours = 100\nprint(power_kw * hours)\n',
        hint: 'power_kw * hours',
        checks: [{ message: 'Print 50.0', outputEquals: '50.0' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'On the phone, or in the cloud?',
        groups: ['On the phone', 'In the cloud'],
        items: [
          { text: 'A 1B model at 4 bits', group: 0 },
          { text: 'Looking up order R-1042', group: 1 },
          { text: 'Next-word suggestions offline', group: 0 },
          { text: 'A 70B model', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the formula to what it gives.',
        pairs: [
          ['tokens / tokens per second', 'Wait time'],
          ['power x hours', 'Energy'],
          ['parameters x bytes', 'Memory'],
          ['per hour x hours', 'GPU bill'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line gets the wait wrong?',
        language: 'python',
        lines: ['from teyro_ai import MODELS', 'speed = MODELS["model-b"]["speed"]', 'wait = speed * 300', 'print(wait)'],
        bug: 2,
        fix: 'wait = 300 / speed',
        explanation: 'Tokens divided by speed.',
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Why not decide by whatever\'s cheapest today?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Cheapest is one of four questions. Data rules, who maintains it and reliability can rule the cheapest option out.' },
          { text: 'Yes, cost is all that matters.', why: 'A cheap option that leaks data or goes down costs more later.' },
          { text: 'Always choose the most expensive.', why: 'Price doesn\'t mean quality.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Joel\'s note.',
        template: '[[1]] for customers, a [[2]] model at 4 bits for experiments.',
        blanks: [['API', 'An API'], ['local']],
        distractors: ['phone', 'laptop'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'gb = 3 * 0.5\nprint("fits" if gb <= 2.0 else "too big")',
        language: 'python',
        options: [
          { text: 'fits' },
          { text: 'too big', why: '1.5 is within 2.0.' },
          { text: '1.5', why: 'It prints one of the words.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Tey\'s four questions as they appeared.',
        lines: ['How many chats?', 'Must the data stay inside?', 'Who looks after it?', 'How fast and reliable must it be?'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What are phone AI chips often called? (three letters)',
        answers: ['NPU', 'NPUs'],
        placeholder: 'Three letters',
      },
    ],
  },
  reflect: {
    prompt: 'Arjun says "defend every number". Which number in Joel\'s note would you find hardest to defend, and how would you check it?',
    starters: ['The hardest is...', 'I\'d check it by...'],
  },
  notes: 'Checkpoint for Chapter 2 lessons 11-14. 180 / 90 = 2.0; 0.5 x 100 = 50.0; 3B x 0.5 = 1.5 GB.',
};

export default lesson;
