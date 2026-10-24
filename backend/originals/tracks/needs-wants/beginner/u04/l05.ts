import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 5. Checkpoint 1: lessons 1–4, plus review. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the gate',
  summary: 'Emeka-Obi drives away in the silver car. Ada waves from the gate, then writes "My own car: ₦4 million, in 3 years" on her goals list. Check what you know: total cost, opportunity cost and 10/10/10.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Find the total cost of a big purchase', 'Use opportunity cost and 10/10/10'],
  learn: [
    {
      kind: 'story',
      title: 'Not now',
      beats: [
        { speaker: 'ada', text: 'Not now isn\'t never. It\'s on the list.' },
        { speaker: 'narrator', text: 'Ngozi: "Look at you. Saying no to a car. Who are you?"' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: hard choices.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'A ₦30,000-a-month plan for 18 months. Total?',
        answers: ['540000', '540,000', '₦540,000', '₦540000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s opportunity cost?',
        options: [
          { text: 'A discount', why: 'It\'s a trade-off.' },
          { text: 'What you give up by choosing something' },
          { text: 'The tax on a purchase', why: 'It\'s what you give up.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the 10/10/10 test.',
        lines: ['10 minutes', '10 months', '10 years', 'Compare both options'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of total cost, or not?',
        groups: ['Part of total cost', 'Not part of it'],
        items: [
          { text: 'All the payments', group: 0 },
          { text: 'Running costs like fuel', group: 0 },
          { text: 'What your friends think', group: 1 },
          { text: 'Extras like a case', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'I said no to the car. Was that just giving up on my dream?',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'Yes, dreams are silly.', why: 'Not at all. Timing matters.' },
          { text: 'Go and buy it now.', why: 'It still doesn\'t fit this year.' },
          { text: 'No. You gave it a number and a date. That\'s how dreams actually happen, instead of becoming a weight.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The opportunity-cost sentence.',
        template: '"This, or [[1]]." The blank is the real [[2]].',
        blanks: [['___', 'something else', 'that'], ['price', 'cost']],
        distractors: ['and', 'friend'],
      },
      {
        kind: 'findBug',
        prompt: 'Which calculation forgets running costs?',
        lines: [
          'Car payment ₦150,000 + fuel ₦90,000 + insurance ₦15,000.',
          'Laptop ₦600,000 + software ₦8,000 a month.',
          'Generator: just ₦250,000. Done.',
        ],
        bug: 2,
        fix: 'Generator ₦250,000 + fuel and servicing every month.',
        explanation: 'Generators, like cars, cost a lot to run.',
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 3: what does "generous where it matters, ruthless where it doesn\'t" mean?',
        options: [
          { text: 'Spend on everything equally', why: 'The opposite.' },
          { text: 'Spend freely on your values and cut hard elsewhere' },
          { text: 'Never spend', why: 'It means spend well.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 2: what\'s a "need later"?',
        options: [
          { text: 'A want', why: 'It\'s a real need, just not urgent.' },
          { text: 'Something you never need', why: 'It will be needed.' },
          { text: 'A real need that isn\'t urgent yet' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ada\'s new goal: a ₦4 million car in 3 years (36 months). About how much a month? (Round to the nearest thousand.)',
        answers: ['111000', '111,000', '₦111,000', '₦111000', '111111'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each tool to its question.',
        pairs: [
          ['Total cost', 'What will it really cost?'],
          ['Opportunity cost', 'What does it replace?'],
          ['10/10/10', 'How will I feel later?'],
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What\'s a "not now, but later" goal you could write down today, with a number and a date?',
    starters: ['My goal:...', 'Cost:...', 'By:...'],
  },
  notes: 'Checkpoint for Chapter 4 lessons 1–4 with Chapter 2 and 3 review. 4,000,000 / 36 ≈ 111,111.',
};

export default lesson;
