import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 3. Chat with Tey: do they come back? */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Do they come back?',
  summary: 'Clinton tracks weekend one\'s twelve customers. How many came back by weekend three? Tey explains why "come back" is the number that matters most, and how to read it.',
  minutes: 12,
  outcomes: [
    'Work out how many customers come back',
    'Know why coming back matters more than signing up',
    'Find out why people don\'t return',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Take the twelve students from weekend one. How many booked again in weekends two or three?', replies: ['Eight?'] },
        { tey: 'Eight. That\'s 8 out of 12, about two-thirds. For a brand-new service run on a bicycle, that\'s a strong sign. Curiosity gets a first order; only a solved problem gets a second.', replies: ['And the other four?'] },
        { tey: 'Clinton asked. Two went home for the holidays. One said the late bag on weekend one put her off. One said 1,500 FCFA a week is too much at the end of the month.', replies: ['What does he do with that?'] },
        { tey: 'Two reasons he can act on: on-time returns, and a price question. Two he can\'t, and shouldn\'t worry about. That\'s how you read people who don\'t come back.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'First orders show curiosity. Second orders show value.',
    },
  ],
  apply: {
    scenario: 'Weekend one\'s twelve.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Of weekend one\'s 12 customers, 8 came back. How many didn\'t?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: '8 out of 12 came back. About what share is that?',
        options: [
          { text: 'About 67%' },
          { text: 'About 8%', why: '8 of 12 is two-thirds.' },
          { text: 'About 33%', why: 'That\'s the share who didn\'t return.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'A reason Clinton can act on, or not?',
        groups: ['Can act on', 'Can\'t act on'],
        items: [
          { text: 'The late bag put her off', group: 0 },
          { text: 'Went home for the holidays', group: 1 },
          { text: '1,500 FCFA a week is too much', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the signal to what it shows.',
        pairs: [
          ['First order', 'Curiosity'],
          ['Second order', 'Value'],
          ['Didn\'t come back', 'Something to learn'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Four didn\'t come back. Is WashDay failing?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Two-thirds came back from a bicycle and a WhatsApp post. That\'s strong. Fix the late bags, look at the price, and keep watching.' },
          { text: 'Yes, everyone should come back.', why: 'Nobody gets 100%; two-thirds is strong early.' },
          { text: 'Ignore the four.', why: 'Two of their reasons are useful.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'First orders show [[1]]. Second orders show [[2]].',
        blanks: [['curiosity'], ['value']],
        distractors: ['price', 'luck'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "do they come back?" more important than "do they sign up?"',
        options: [
          { text: 'A business lives on repeat customers; one-time trials can be curiosity' },
          { text: 'Sign-ups don\'t matter at all', why: 'They matter; returning matters more.' },
          { text: 'It\'s easier to count', why: 'It\'s about what it proves.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s notes misreads the evidence?',
        lines: [
          '8 of 12 came back: about two-thirds.',
          '2 left for the holidays.',
          '1 left after a late bag; 1 said too expensive.',
          'So the price is definitely too high for everyone.',
        ],
        bug: 3,
        fix: 'One person said the price is too high; worth testing, not proven.',
        explanation: 'One comment is a lead, not a conclusion about everyone.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to read people who don\'t come back.',
        lines: ['Ask each one why', 'Sort reasons into can act / can\'t act', 'Fix what you can', 'Watch whether returns improve'],
      },
      {
        kind: 'sortGroups',
        prompt: 'A sign of real value, or not yet?',
        groups: ['Real value', 'Not yet'],
        items: [
          { text: 'Booked three weekends in a row', group: 0 },
          { text: 'Asked "how does it work?"', group: 1 },
          { text: 'Brought a friend', group: 0 },
          { text: 'Liked the post', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What would make a customer of yours come back a second time? How would you check?',
    starters: ['They\'d come back if...', 'I\'d check by...'],
  },
  deepen: {
    title: 'Retention',
    summary: 'Businesses call this retention: the share of customers who keep using you. Many say it\'s the clearest sign of product-market fit, because it\'s hard to fake.',
  },
  notes: 'Fictional: of weekend 1\'s 12 customers, 8 rebooked in weekends 2-3 (≈67%). Leavers: 2 holidays, 1 late bag, 1 price.',
};

export default lesson;
