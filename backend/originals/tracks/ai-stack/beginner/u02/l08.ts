import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8 — Renting GPUs: the cloud, by the hour. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Renting GPUs: the cloud',
  summary: 'Joel opens a cloud provider\'s page and sees GPUs for rent by the hour. It looks cheap, until Tey asks what happens to the meter at 3 a.m., when no customer is asking anything.',
  minutes: 11,
  outcomes: [
    'Explain what renting a cloud GPU means',
    'Know that the meter runs whether or not anyone uses it',
    'Work out the bill for different hours',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Cloud providers own huge data centres full of GPUs. You rent a machine with a GPU for as long as you like, and pay for every hour it\'s switched on.', replies: ['Even if nobody uses it?'] },
        { tey: 'Even then. A rented GPU at $1.50 an hour costs the same at 3 a.m. with no customers as at noon with a queue. That idle time is often most of the bill.', replies: ['Can we switch it off at night?'] },
        { tey: 'Yes: 12 hours a day halves it, from $1,080 to $540 a month in practice prices. But anyone asking at night gets nothing, and starting it again takes time.', replies: ['So why does anyone rent?'] },
        { tey: 'Control: your own model, your own settings, data that stays on your machine. And at very high, steady traffic, owning the hours can beat paying per answer.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The meter',
      caption: 'Practice price: $1.50 an hour.',
      code: 'per_hour = 1.50\nfor hours_per_day in [24, 12, 8]:\n    monthly = per_hour * hours_per_day * 30\n    print(f"{hours_per_day} hours a day: ${monthly:,.2f}")\n',
      challenge: 'Add a line for a GPU that costs $3.00 an hour, 24 hours a day.',
    },
  ],
  apply: {
    scenario: 'Renting by the hour.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'A $1.50-an-hour GPU switched on 12 hours a day for 30 days. Print the monthly bill',
        starter: 'per_hour = 1.50\nhours_per_day = 12\ndays = 30\n',
        solution: 'per_hour = 1.50\nhours_per_day = 12\ndays = 30\nprint(per_hour * hours_per_day * days)\n',
        hint: 'per_hour * hours_per_day * days',
        checks: [{ message: 'Print 540.0', outputEquals: '540.0' }],
      },
      {
        kind: 'mcq',
        prompt: 'What do you pay for when you rent a cloud GPU?',
        options: [
          { text: 'Only the answers it gives', why: 'That\'s pay-per-answer APIs. Rented GPUs bill by time.' },
          { text: 'Every hour it\'s switched on, busy or idle' },
          { text: 'Nothing until it breaks', why: 'The meter runs from the moment it starts.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'A reason to rent a GPU, or a reason not to?',
        groups: ['Reason to rent', 'Reason not to'],
        items: [
          { text: 'Data must stay on your own machine', group: 0 },
          { text: 'Only a few hundred chats a day', group: 1 },
          { text: 'Huge, steady traffic all day', group: 0 },
          { text: 'Nobody on the team can look after servers', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the plan to its monthly bill at $1.50 an hour.',
        pairs: [
          ['24 hours a day', '$1,080'],
          ['12 hours a day', '$540'],
          ['8 hours a day', '$360'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Just switch it off at night. Problem solved!',
        prompt: "Joel's best reply?",
        options: [
          { text: 'Yes, nobody shops at night.', why: 'Online shops get orders at all hours.' },
          { text: 'Switching off is impossible.', why: 'You can; it just has trade-offs.' },
          { text: 'It halves the bill, but night-time customers get no answers. And we\'d still pay $540 for 30,000 chats that would cost about $5 if we paid per answer.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'A monthly GPU bill.',
        language: 'python',
        template: 'monthly = per_hour * [[1]] * [[2]]',
        blanks: [['hours_per_day'], ['days', '30']],
        distractors: ['chats', 'tokens'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'per_hour = 3.0\nprint(per_hour * 24 * 30)',
        language: 'python',
        options: [
          { text: '2160.0' },
          { text: '720.0', why: 'That\'s the hours in a month. Multiply by $3.' },
          { text: '57.0', why: 'It multiplies all three.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'This prints the cost of one day, not a month. Which line?',
        language: 'python',
        lines: ['per_hour = 1.50', 'hours_per_day = 24', 'monthly = per_hour * hours_per_day', 'print(monthly)'],
        bug: 2,
        fix: 'monthly = per_hour * hours_per_day * 30',
        explanation: 'Multiply by the days in the month too.',
      },
      {
        kind: 'mcq',
        prompt: 'Idle hours are often the biggest part of a rented-GPU bill. Why?',
        options: [
          { text: 'Idle GPUs cost extra', why: 'Same price; you just get nothing for it.' },
          { text: 'They aren\'t', why: 'For a small shop, most hours are quiet.' },
          { text: 'Most hours have few or no requests, but the meter still runs' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How much is a $1.50-an-hour GPU for 8 hours a day, 30 days? (a number)',
        answers: ['360', '360.0', '$360'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Renting by the hour suits busy, steady work. What do you rent by the hour or day, and when would buying make more sense?',
    starters: ['I rent...', 'Buying makes sense when...'],
  },
  deepen: {
    title: 'Serverless GPUs',
    summary: 'Some providers start a GPU only when a request arrives and bill by the second. It cuts idle cost, but the first request after a quiet spell can be slow (a "cold start").',
  },
  notes: 'Practice price $1.50/GPU-hour (made up; real cloud GPU prices vary widely and change often). 1.5 x 12 x 30 = 540.0; x 8 = 360.0; 3.0 x 720 = 2160.0. Pay-per-answer comparison from Chapter 1: 30,000 chats x $0.00018 = $5.40.',
};

export default lesson;
