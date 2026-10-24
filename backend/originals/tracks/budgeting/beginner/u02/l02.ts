import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2. Step-by-step: need or want, the three-question test. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Need or want?',
  summary: 'Efua\'s first question for Kofi: "What do you actually need for the next 18 days?" It\'s harder to answer than it sounds. Here\'s a three-question test that works every time.',
  minutes: 11,
  outcomes: [
    'Tell a need from a want with three questions',
    'Spot the "need version" inside a want',
    'Sort your own spending into needs and wants',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'The three-question test',
      steps: [
        { title: '1. What happens if I go without it for a month?', body: 'If the honest answer is "I\'d be hungry, ill, or fail my course", it\'s probably a need. If it\'s "I\'d be a bit bored" or "I\'d miss it", it\'s a want.' },
        { title: '2. Is there a cheaper way to meet the same need?', body: 'Food is a need. Waakye from the seller three times a day is one way to meet it, and not the cheapest. Rice and stew cooked in the hall meets the same need. The need is "eat"; the GH₵25 lunch is a want on top.' },
        { title: '3. Is it a need right now, or later?', body: 'A new laptop charger is a need when the old one breaks. Until then it\'s a "later". When money is short, needs for today come first.' },
        { title: 'Put it together', body: 'Write each item down. Mark it NEED (only the basic version), WANT, or LATER. Most items split: the need part, and the want part on top.' },
      ],
    },
    {
      kind: 'story',
      title: 'Efua\'s red pen',
      beats: [
        { speaker: 'kofi', text: 'Data is a need. I need it for school.' },
        { speaker: 'efua', text: 'Some data, yes. Your notes are on the class portal. Does school need you watching football clips at 1 a.m.?' },
        { speaker: 'kofi', text: '...Some data is a need.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Most things are a need with a want on top. Find the basic version of the need, and pay for that first.',
    },
  ],
  apply: {
    scenario: 'Kofi\'s list for the next 18 days.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Need, want or later?',
        groups: ['Need', 'Want', 'Later'],
        items: [
          { text: 'Basic food for 18 days', group: 0 },
          { text: 'New football boots', group: 1 },
          { text: 'Malaria medicine if he gets ill', group: 0 },
          { text: 'A new charger before the old one breaks', group: 2 },
          { text: 'Kelewele every night', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which question best separates a need from a want?',
        options: [
          { text: 'Do my friends have it?', why: 'What friends have tells you about wants, not needs.' },
          { text: 'Would I really want it?', why: 'Everything on a wants list passes that one.' },
          { text: 'What happens if I go without it for a month?' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each need to its basic version.',
        pairs: [
          ['Food', 'Rice and stew cooked in the hall'],
          ['Data for school', 'A small plan, using campus Wi-Fi'],
          ['Getting to class', 'Walking or the cheapest ride'],
          ['Clean clothes', 'Soap and a bucket'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'Data is a need, so I\'ll keep buying daily bundles.',
        prompt: 'Efua\'s best reply?',
        options: [
          { text: 'Data is a want. Delete your apps.', why: 'He needs some data for school. Calling it a want just gets ignored.' },
          { text: 'Some data is a need. The basic version is a small plan plus campus Wi-Fi. The rest is a want.' },
          { text: 'Fine, data is a need, buy whatever.', why: 'That\'s how GH₵120 went on data in 12 days.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Most things are...',
        template: 'Most things are a [[1]] with a [[2]] on top.',
        blanks: [['need'], ['want']],
        distractors: ['loan', 'bill'],
      },
      {
        kind: 'mcq',
        prompt: 'Lunch from the canteen at GH₵25. Need or want?',
        options: [
          { text: 'Lunch is a need; the GH₵25 version is a want on top of it' },
          { text: 'Pure need: everyone eats', why: 'Eating is the need. This particular lunch is one (pricey) way to meet it.' },
          { text: 'Pure want: he should skip lunch', why: 'Skipping food isn\'t the answer. The cheaper version is.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the test.',
        lines: ['What if I go without it for a month?', 'Is there a cheaper way to meet it?', 'Is it needed now or later?', 'Mark it need, want or later'],
      },
      {
        kind: 'findBug',
        prompt: 'Which item on Kofi\'s "needs" list is really a want?',
        lines: [
          'Rice, beans and gari.',
          'Soap.',
          'Tickets to the hall\'s Friday party.',
          'A small data plan for the class portal.',
        ],
        bug: 2,
        fix: 'Move the party tickets to "wants".',
        explanation: 'Fun matters, but going without a party for a month won\'t hurt his health or his course.',
      },
      {
        kind: 'sortGroups',
        prompt: 'For someone with a job: need or want?',
        groups: ['Need', 'Want'],
        items: [
          { text: 'Transport to work', group: 0 },
          { text: 'Taking a taxi instead of the bus every day', group: 1 },
          { text: 'Rent', group: 0 },
          { text: 'The newest phone', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kofi\'s lunch: GH₵25 from the canteen, or about GH₵8 cooked in the hall. How much is the "want on top"?',
        answers: ['17', 'GH₵17', '17 cedis'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Take three things you spent money on this week. For each one, what was the need, and what was the want on top?',
    starters: ['I bought...', 'The need was...', 'The want on top was...'],
  },
  deepen: {
    title: 'Needs differ by life',
    summary: 'A phone might be a want for one person and a need for another whose job runs through it. The test isn\'t a list from someone else; it\'s honest answers to the three questions about your own life.',
  },
  notes: 'Fictional prices: canteen lunch GH₵25; cooked-in-hall portion about GH₵8 (from bulk staples). Values are illustrative for Kumasi students and stated as "about".',
};

export default lesson;
