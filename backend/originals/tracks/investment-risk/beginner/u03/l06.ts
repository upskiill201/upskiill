import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6. Before/After: the same fall, one year vs twenty years. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'The same fall, two deadlines',
  summary: 'Two people each have ₹3 lakh in a spread of shares. Both see a 30% fall. One needs the money next year; the other in twenty years. Same fall, completely different outcome.',
  minutes: 11,
  outcomes: [
    'See how time horizon changes what a fall means',
    'Understand "time to recover"',
    'Choose risk from the deadline',
  ],
  learn: [
    {
      kind: 'compare',
      title: '₹3,00,000, a 30% fall (example numbers)',
      before: {
        label: 'Needed in 1 year',
        text: 'Falls to ₹2,10,000\nA year later: maybe recovered, maybe not\nIf not, ₹90,000 short on the day it\'s needed\nMust sell at whatever price it is\nThe fall becomes a real loss',
      },
      after: {
        label: 'Needed in 20 years',
        text: 'Falls to ₹2,10,000\nNo need to sell\nKeeps adding monthly, buying at lower prices\nYears to recover before the money is needed\nThe fall is a bump on a long road',
      },
      notes: [
        'The fall is identical. The deadline decides whether it hurts.',
        'Recovery from a big fall has sometimes taken months and sometimes years. Short-term money can\'t wait that long.',
        'That\'s why near-term money should be kept safe, and why long-term money can take more ups and downs.',
        'This is history and logic, not a guarantee: long-term money can still end lower. Spreading out and time reduce, but don\'t remove, that risk.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A fall only hurts if you have to sell before it recovers. The closer the deadline, the less fall you can afford.',
    },
  ],
  apply: {
    scenario: 'Two deadlines.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: '₹3,00,000 falls 30%. Value after?',
        answers: ['210000', '2,10,000', '210,000', '₹2,10,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why does the 1-year person suffer more from the same fall?',
        options: [
          { text: 'Their shares fell more', why: 'Same fall.' },
          { text: 'They may have to sell before it recovers' },
          { text: 'They\'re unlucky', why: 'It\'s the deadline.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: '1-year person or 20-year person?',
        groups: ['1-year person', '20-year person'],
        items: [
          { text: 'Must sell at whatever price', group: 0 },
          { text: 'Keeps adding monthly', group: 1 },
          { text: 'Could be ₹90,000 short', group: 0 },
          { text: 'Years to recover', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'So long-term money can never lose?',
        prompt: 'Arjun\'s honest reply?',
        options: [
          { text: 'Never.', why: 'Long-term money can still end lower.' },
          { text: 'It always loses.', why: 'Not true either.' },
          { text: 'It can. Time and spreading make losses less likely to last, not impossible.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The insight.',
        template: 'A fall only hurts if you have to [[1]] before it [[2]].',
        blanks: [['sell'], ['recovers']],
        distractors: ['buy', 'starts'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each deadline to sensible risk.',
        pairs: [
          ['Next year', 'Keep safe'],
          ['In five years', 'Mostly protected'],
          ['In twenty years', 'Can ride bigger swings'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which plan ignores the deadline?',
        lines: [
          'House deposit in 1 year: savings.',
          'Retirement in 25 years: spread of shares.',
          'Sister\'s wedding in 6 months: one hot stock.',
        ],
        bug: 2,
        fix: 'Wedding money in 6 months: keep safe.',
        explanation: 'Six months is far too short for a single stock\'s swings.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In the 1-year case, how much short is the person if it hasn\'t recovered? (₹3,00,000 − ₹2,10,000.)',
        answers: ['90000', '90,000', '₹90,000', '₹90000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'How long have big recoveries taken in the past?',
        options: [
          { text: 'Always a week', why: 'Much longer, often.' },
          { text: 'Sometimes months, sometimes years' },
          { text: 'They never recover', why: 'Broad markets have usually recovered over time.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the 20-year person\'s response to the fall.',
        lines: ['Notice the fall', 'Remember the 20-year deadline', 'Keep adding monthly', 'Review on schedule'],
      },
    ],
  },
  reflect: {
    prompt: 'For each pot you have, how big a fall could you live with given its deadline?',
    starters: ['For my... pot, I could live with...'],
  },
  deepen: {
    title: 'Sequence risk',
    summary: 'For people near retirement, a big fall just before or just after they start withdrawing can do lasting damage. It\'s called sequence-of-returns risk, and it\'s why money gets safer as the date nears.',
  },
  notes: 'Example numbers. Recovery durations historically vary (months to over a decade); hedged.',
};

export default lesson;
