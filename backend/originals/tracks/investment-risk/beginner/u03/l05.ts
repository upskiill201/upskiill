import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5. Checkpoint 1: lessons 1–4, plus review. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the operation',
  summary: 'Appa\'s operation goes well. The ₹2.5 lakh was there, safe, on the day. Check what you know about pots, goals tables, tolerance, capacity and emergency funds.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Match money to time', 'Judge risk tolerance and capacity'],
  learn: [
    {
      kind: 'story',
      title: 'Discharge day',
      beats: [
        { speaker: 'narrator', text: 'Appa, from the hospital bed: "You didn\'t have to sell anything?" Arjun: "Nothing. It was in its own pot."' },
        { speaker: 'arjun', text: 'Two months ago it would have been in a plot with three owners.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: time and goals.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Keep safe, or can take more ups and downs?',
        groups: ['Keep safe', 'More ups and downs'],
        items: [
          { text: 'Money for a wedding in 1 year', group: 0 },
          { text: 'Retirement in 30 years', group: 1 },
          { text: 'Emergency fund', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each term to its meaning.',
        pairs: [
          ['Time horizon', 'When you\'ll need the money'],
          ['Risk tolerance', 'What you can stomach'],
          ['Risk capacity', 'What you can afford'],
          ['Emergency fund', 'Safe money that prevents forced sales'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Costs ₹40,000 a month; uneven income; six months. Emergency fund target?',
        answers: ['240000', '2,40,000', '240,000', '₹2,40,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'High tolerance, low capacity. Which guides the risk level?',
        options: [
          { text: 'Capacity, the lower one' },
          { text: 'Tolerance, the higher one', why: 'Use the lower of the two.' },
          { text: 'Neither', why: 'The lower one guides.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'My wedding is in 18 months. Should I invest that money in shares to grow it?',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Yes, all in shares.', why: 'Too short a horizon.' },
          { text: 'Put it in crypto.', why: 'Even riskier.' },
          { text: '18 months is short. A fall could hit just before the wedding. Keep it safe.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The four fields.',
        template: 'Goal, [[1]], amount, [[2]].',
        blanks: [['date'], ['risk']],
        distractors: ['tip', 'friend'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in a goals table is wrong?',
        lines: [
          'Emergency fund: any time, keep safe.',
          'Retirement: 30 years, can take more ups and downs.',
          'Emergency fund: invested in shares for growth.',
        ],
        bug: 2,
        fix: 'Emergency fund: safe and reachable.',
        explanation: 'It must be there, at full value, when needed.',
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 2: which risk does an emergency fund mainly protect you from?',
        options: [
          { text: 'Fraud', why: 'Checks protect from fraud.' },
          { text: 'Being forced to sell (liquidity problems)' },
          { text: 'Inflation', why: 'Cash has inflation risk.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 2: why was the plot crossed out?',
        options: [
          { text: 'The title was disputed between three brothers' },
          { text: 'It was too cheap', why: 'The title was the problem.' },
          { text: 'Land never grows', why: 'The title was the problem.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Review, Chapter 1: 3% a month is roughly what percent a year? (Tey\'s number.)',
        answers: ['42', '42%', '43', '43%'],
        placeholder: 'A percent',
      },
    ],
  },
  reflect: {
    prompt: 'Is any money you\'ll need soon currently exposed to big ups and downs?',
    starters: ['Yes / no...', 'I could move it...'],
  },
  notes: 'Checkpoint for Chapter 3 lessons 1–4 with Chapter 1 and 2 review.',
};

export default lesson;
