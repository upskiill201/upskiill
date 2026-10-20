import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: trade, don\'t split',
  summary: 'The spare room, splitting vs trading, open questions and the orange. Quick check before Ada learns to make several offers at once.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Find interests with open questions', 'Build trades from things valued differently'],
  learn: [
    {
      kind: 'story',
      title: 'The spare room, a week later',
      beats: [
        { speaker: 'narrator', text: 'Shelves on one wall, fabric neatly rolled. A desk by the window. A sign on the door: "Quiet Friday mornings".' },
        { speaker: 'ada', text: 'Ngozi says it\'s the best room in the flat now. For both of us.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: trade, don\'t split.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Split or trade?',
        groups: ['Split', 'Trade'],
        items: [
          { text: 'Meet in the middle', group: 0 },
          { text: 'Longer contract for a lower price', group: 1 },
          { text: 'Half the time each', group: 0 },
          { text: 'Faster payment for a discount', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the lesson of the orange story?',
        options: [
          { text: 'Ask why each side wants something before dividing it' },
          { text: 'Always split things equally', why: 'Splitting wasted half of each sister\'s part.' },
          { text: 'Oranges are hard to share', why: 'It\'s about interests.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Midpoint of ₦400,000 and ₦500,000, in naira?',
        answers: ['450000', '450,000'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question type to an example.',
        pairs: [
          ['Reason', '"What made you decide on this?"'],
          ['Worry', '"What worries you about this?"'],
          ['Trade test', '"If I did X, would that help with Y?"'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'He wants two years, I want a lower rent. Do I offer the two years first?',
        prompt: "Lucía's best reply?",
        options: [
          { text: 'Offer them together: "If I sign for two years, could we agree ₦1,350,000?" Never give the lease away on its own.' },
          { text: 'Yes, give it first and hope.', why: 'Free concessions often get nothing back.' },
          { text: 'Never mention the lease.', why: 'It\'s her best trade.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Give on what you care about [[1]], get on what you care about [[2]].',
        blanks: [['less'], ['more']],
        distractors: ['most', 'never'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Ada\'s rent plan gives something away for nothing?',
        lines: [
          'Ask what matters most to him.',
          'Mention I\'d happily sign for two years, whatever the rent.',
          'Offer to fix the gate lock if the rent comes down.',
          'Propose ₦1,350,000 with a two-year lease.',
        ],
        bug: 1,
        fix: 'Offer two years in return for ₦1,350,000.',
        explanation: '"Whatever the rent" gives away her best trade.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Open or closed question?',
        groups: ['Open', 'Closed'],
        items: [
          { text: '"How would you like to be paid?"', group: 0 },
          { text: '"Is it ₦1,450,000?"', group: 1 },
          { text: '"What would help you most?"', group: 0 },
          { text: '"Final answer?"', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the trading method.',
        lines: ['Ask open questions', 'List the issues', 'Rate who cares most', 'Trade, never give away'],
      },
      {
        kind: 'mcq',
        prompt: 'Why did the spare-room deal work?',
        options: [
          { text: 'They needed different things at different times' },
          { text: 'One of them gave up', why: 'Both got what they needed.' },
          { text: 'They split it in half', why: 'They traded, not split.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What could you offer in your negotiation that costs you little but helps the other side a lot?',
    starters: ['I could offer...', 'It would help them because...'],
  },
  notes: 'Checkpoint for Chapter 4 lessons 1-4. Midpoint of 400,000 and 500,000 = 450,000.',
};

export default lesson;
