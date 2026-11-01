import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: cost vs value',
  summary: 'Cost sets the floor, value sets the ceiling, three ways to price, value measured against the next-best option, and behaviour beats polls. Quick check before anchors.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Price from value without notes', 'Tell strong price evidence from weak'],
  learn: [
    {
      kind: 'story',
      title: 'Room to move',
      beats: [
        { speaker: 'narrator', text: 'David draws a line: 1,125 at one end, 2,400 at the other. WashDay\'s 1,500 sits near the bottom.' },
        { speaker: 'david', text: 'That\'s a lot of space you\'re not using.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: cost vs value.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the method to the price it gives WashDay.',
        pairs: [
          ['Cost-plus (Clinton\'s)', '1,500'],
          ['Competitor (Mama Rose)', '2,400'],
          ['Value-based range', 'About 1,800 to 2,000'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What sets the floor of a price?',
        options: [
          { text: 'The customer\'s value', why: 'That sets the ceiling.' },
          { text: 'A poll', why: 'Polls give guesses.' },
          { text: 'Your cost' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A tutor\'s next-best option for a student costs 5,000 FCFA a session. The tutor charges 3,000. How much does the student save, in FCFA?',
        answers: ['2000', '2,000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Strong or weak evidence of willingness to pay?',
        groups: ['Strong', 'Weak'],
        items: [
          { text: 'Already pays a rival 2,400', group: 0 },
          { text: '"I\'d pay 1,000" in a poll', group: 1 },
          { text: 'Booked again after a price rise', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'If value is 3,000 of time, should the price be 3,000?',
        prompt: "David's best reply?",
        options: [
          { text: 'Yes, charge the full value.', why: 'Then there\'s no reason to choose you over doing it yourself.' },
          { text: 'No: price below the value so customers get a good deal, and above your floor so you do too.' },
          { text: 'Charge 1,125, the cost.', why: 'That leaves nothing for him.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Value.',
        template: 'Value is measured against the customer\'s [[1]] option, from the [[2]]\'s side.',
        blanks: [['next-best', 'next best'], ['customer']],
        distractors: ['cheapest', 'seller'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this pricing note is cost-plus thinking?',
        lines: [
          'Next-best option: Mama Rose, 2,400, carry it yourself.',
          'Value: no carrying, Saturday back.',
          'So the price is cost 1,125 plus 300.',
          'Range to test: 1,800 to 2,000.',
        ],
        bug: 2,
        fix: 'Delete it: the range comes from value, with cost as the floor.',
        explanation: 'Adding a bit to cost ignores the value just listed.',
      },
      {
        kind: 'mcq',
        prompt: 'A student values her time at 800 FCFA an hour and saves 3 hours. What is the time worth to her?',
        options: [
          { text: '2,400 FCFA' },
          { text: '800 FCFA', why: 'That\'s one hour.' },
          { text: '3,000 FCFA', why: 'At 800 an hour it\'s 2,400.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order these WashDay numbers from lowest to highest.',
        lines: ['Cost per bag: 1,125', 'Today\'s price: 1,500', 'Fair-pay price: 1,725', 'Mama Rose\'s basket: 2,400'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How much below Mama Rose\'s 2,400 is a 1,900 FCFA WashDay bag, in FCFA?',
        answers: ['500'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Draw your own line: your cost at one end, your customer\'s next-best option at the other. Where is your price?',
    starters: ['My floor is...', 'My price sits...'],
  },
  notes: 'Checkpoint for Chapter 2 lessons 1-4. Fictional values throughout.',
};

export default lesson;
