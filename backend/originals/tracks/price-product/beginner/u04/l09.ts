import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 9. Tap to explore: price card v4, the rise. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Price card v4',
  summary: 'The test worked, the message went out two weeks ahead, and the new card goes live on 1 November. Tap each line to see what changed, and why.',
  minutes: 11,
  outcomes: [
    'Read a launched price card and its rollout',
    'Link each change to evidence from the chapter',
    'See what still needs checking',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'WashDay price card v4, from 1 November',
      text: 'Saver 1,400, Standard 1,800, Express 2,500, ironing +200, hill hostels +500 all year. Saturday Plan 6,400 a month. Regulars keep 1,600 until 30 November, then can join the Plan. New: a photo of your bag when we collect it. Tested in Hostel A first; announced two weeks ahead.',
      hotspots: [
        { phrase: 'Standard 1,800', note: 'Covers Auntie Bih\'s 1,100 bags (margin 575) and pays Clinton fairly on Mama Rose bags (675).' },
        { phrase: 'hill hostels +500 all year', note: 'Tied to the moto-taxi cost, the same in all weather: fair, unlike a storm surcharge.' },
        { phrase: 'Regulars keep 1,600 until 30 November', note: 'Thanks to the ten regulars who made WashDay work. They feel the change last.' },
        { phrase: 'a photo of your bag when we collect it', note: 'Something better that arrives with the rise: no more worrying where the bag is.' },
        { phrase: 'Tested in Hostel A first', note: '14 bags at the new price earned 9,450, against 6,375 from 17 bags at the old price.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A price rise is a small project: test, announce, look after regulars, add value, then check the results.',
    },
  ],
  apply: {
    scenario: 'Reading price card v4.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the line to the evidence or reason behind it.',
        pairs: [
          ['Standard 1,800', 'Pays Auntie Bih and Clinton fairly'],
          ['Hill +500 all year', 'Real moto-taxi cost'],
          ['Regulars at 1,600', 'Thanks for loyalty'],
          ['Collection photo', 'Something better'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What makes v4 different from v3?',
        options: [
          { text: 'It was tested, announced and launched with care for regulars' },
          { text: 'It has completely new prices', why: 'The prices match v3; the rollout is new.' },
          { text: 'Nothing', why: 'It went from design to tested launch.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of how v4 was rolled out?',
        groups: ['Part of the rollout', 'Not part of it'],
        items: [
          { text: 'Two weeks\' notice', group: 0 },
          { text: 'Storm-day double prices', group: 1 },
          { text: 'A one-hostel test', group: 0 },
          { text: 'Secret price differences', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A regular on 1,600 in November. What margin does each of her bags earn (cost 1,125), in FCFA?',
        answers: ['475'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'v4 is live. Am I done with pricing?',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Now check whether it worked: margin, customers kept, hours earned. And review it every few months. That\'s Chapter 5.' },
          { text: 'Yes, never touch it again.', why: 'Costs and customers change.' },
          { text: 'Raise it again next week.', why: 'Check results first.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'A price rise is a small project.',
        template: 'Test, [[1]], look after regulars, add value, then [[2]] the results.',
        blanks: [['announce'], ['check']],
        distractors: ['hide', 'ignore'],
      },
      {
        kind: 'mcq',
        prompt: 'What did the Hostel A test show?',
        options: [
          { text: 'Fewer bags but more margin at the new price' },
          { text: 'Nobody booked', why: '14 bags were booked.' },
          { text: 'The old price earned more', why: '9,450 vs 6,375.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the v4 announcement doesn\'t match the plan?',
        lines: [
          'From 1 November: Standard 1,800.',
          'Hill hostels: +500, all year.',
          'Regulars: 1,800 from today.',
          'New: a photo of your bag on collection.',
        ],
        bug: 2,
        fix: 'Regulars: 1,600 until 30 November.',
        explanation: 'Regulars were promised the old rate for one more month.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the card\'s versions.',
        lines: ['v1: a guess', 'v2: a value range', 'v3: options designed', 'v4: tested and launched', 'v5 (next): checked and defended'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'On what date does price card v4 go live? (day month)',
        answers: ['1 November', '1st November', 'November 1', 'Nov 1', '1 Nov'],
        placeholder: 'A date',
      },
    ],
  },
  reflect: {
    prompt: 'Write your own price card v4: your new prices, who gets notice, how you thank regulars, and what gets better.',
    starters: ['From [date]...', 'Regulars...'],
  },
  deepen: {
    title: 'Rollout matters as much as the number',
    summary: 'Two businesses can raise prices by the same amount and get very different reactions. The one that tests, explains and thanks usually keeps more customers.',
  },
  notes: 'Price card v4 (fictional), live 1 November: Saver 1,400, Standard 1,800, Express 2,500, ironing +200, hill +500 all year, Saturday Plan 6,400; regulars 1,600 until 30 November; collection photo added. Hostel A test 9,450 vs Hostel B 6,375.',
};

export default lesson;
