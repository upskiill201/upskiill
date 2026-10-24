import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7 — Build vs buy, per layer: rent, use a service, or build it yourself. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Build vs buy, per layer',
  summary: 'Kavya wants to "run our own AI" on a rented GPU. Joel wants to pay per answer. Arjun says they\'re both right, about different layers, and puts the two monthly bills side by side.',
  minutes: 11,
  outcomes: [
    'Know the three choices at every layer: rent, use a service, build',
    'Compare a pay-per-answer bill with a rented-GPU bill',
    'Work out a monthly cost in Python',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two ways to run the model',
      before: {
        label: 'Pay per answer (a model API)',
        text: 'You send text, they run the model, you pay per token.\nNothing to set up. No chips to manage.\nCost grows with use: quiet month, small bill.\nPractice numbers: about $0.00018 per chat.',
      },
      after: {
        label: 'Rent a GPU and run your own',
        text: 'You rent a machine with a GPU and run an open-weight model on it.\nMore control, data stays with you.\nYou pay every hour, busy or not, and someone must look after it.\nPractice numbers: $1.50 an hour.',
      },
      notes: [
        'At every layer the choice is the same: rent it, use a service, or build it.',
        'Pay-per-use wins when traffic is small or uneven. Your own machine can win when traffic is huge and steady.',
        'The practice prices here are made up. Real prices change every few months, so always check before deciding.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Two monthly bills',
      caption: 'Practice prices. Change chats_per_month.',
      code: 'per_chat = 0.00018        # dollars, pay per answer\ngpu_per_hour = 1.50       # dollars, rented GPU\nchats_per_month = 30000\n\napi_bill = per_chat * chats_per_month\ngpu_bill = gpu_per_hour * 24 * 30\nprint(f"Pay per answer: ${api_bill:.2f}")\nprint(f"Rented GPU: ${gpu_bill:.2f}")\n',
      challenge: 'How many chats a month before the pay-per-answer bill reaches the GPU bill?',
    },
  ],
  apply: {
    scenario: 'Rent, use a service, or build?',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the pay-per-answer bill for 30,000 chats at $0.00018 each, rounded to 2 places',
        starter: 'per_chat = 0.00018\nchats = 30000\n',
        solution: 'per_chat = 0.00018\nchats = 30000\nprint(round(per_chat * chats, 2))\n',
        hint: 'round(per_chat * chats, 2)',
        checks: [{ message: 'Print 5.4', outputEquals: '5.4' }],
      },
      {
        kind: 'mcq',
        prompt: 'A rented GPU costs $1.50 an hour. What does a 30-day month cost if it runs all the time?',
        options: [
          { text: '$45', why: 'That\'s 30 hours. A month is 24 x 30 = 720 hours.' },
          { text: '$1,080' },
          { text: '$1.50', why: 'That\'s one hour.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which choice suits this situation better?',
        groups: ['Pay per answer', 'Run your own'],
        items: [
          { text: 'A few hundred chats a day', group: 0 },
          { text: 'Millions of chats, every day', group: 1 },
          { text: 'No one to look after servers', group: 0 },
          { text: 'Data must never leave your machines', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the rented-GPU bill for 24 hours a day, 30 days, at $1.50 an hour',
        starter: 'gpu_per_hour = 1.50\n',
        solution: 'gpu_per_hour = 1.50\nprint(gpu_per_hour * 24 * 30)\n',
        hint: 'gpu_per_hour * 24 * 30',
        checks: [{ message: 'Print 1080.0', outputEquals: '1080.0' }],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Running our own model is more professional. Let\'s rent the GPU.',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'At 30,000 chats a month, that\'s about $1,080 to save $5. Start with pay-per-answer, and revisit if traffic grows huge.' },
          { text: 'Yes, always run your own.', why: 'At Mr Rao\'s volume it costs about 200 times more.' },
          { text: 'Never run your own.', why: 'At very large volume, or for strict privacy, it can make sense.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the choice to what it means.',
        pairs: [
          ['Rent', 'Pay for capacity, by the hour'],
          ['Use a service', 'Pay per use, they run it'],
          ['Build', 'Make and run it yourself'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The monthly API bill.',
        language: 'python',
        template: 'api_bill = per_chat [[1]] chats_per_month\nprint(f"${api_bill:.[[2]]f}")',
        blanks: [['*'], ['2']],
        distractors: ['+', '0'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line gets the GPU bill wrong?',
        language: 'python',
        lines: ['gpu_per_hour = 1.50', 'hours = 24 * 30', 'gpu_bill = gpu_per_hour + hours', 'print(gpu_bill)'],
        bug: 2,
        fix: 'gpu_bill = gpu_per_hour * hours',
        explanation: 'Price per hour times hours, not plus.',
      },
      {
        kind: 'mcq',
        prompt: 'Why does the lesson say the prices are "practice numbers"?',
        options: [
          { text: 'Real AI is free', why: 'Real AI charges per token or per hour.' },
          { text: 'Real prices change often, so you check them on the day you decide' },
          { text: 'The maths is different for real prices', why: 'The maths is the same. Only the numbers change.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many hours are in a 30-day month?',
        answers: ['720'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Renting vs owning comes up everywhere: cars, houses, software. What makes you choose one over the other?',
    starters: ['I rent when...', 'I own when...'],
  },
  deepen: {
    title: 'Break-even',
    summary: 'The break-even point is the volume where both bills match: here $1,080 / $0.00018 = 6 million chats a month. Below it, pay per answer. Chapter 2 adds the costs people forget, like the person who looks after the machine.',
  },
  notes: 'Practice numbers (made up, flagged in the lesson): $0.00018 per chat (model-b with the full policy page: 321 tokens in, 13 out), GPU $1.50/hour. 0.00018 x 30000 = 5.4; 1.5 x 24 x 30 = 1080.0; break-even 6,000,000 chats/month.',
};

export default lesson;
