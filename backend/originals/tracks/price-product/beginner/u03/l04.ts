import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4. Card deck: zones and extras. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Zones and extras',
  summary: 'The hill still loses money, and some students want their shirts ironed. David adds two small things to the price card: a zone fee and an extra. Each one pays for exactly what it costs.',
  minutes: 12,
  outcomes: [
    'Price hard-to-reach orders with a zone fee',
    'Price extras by what they cost and what they\'re worth',
    'Group orders to share costs',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>The hill zone.</strong> Hostels at the top of the hill need moto-taxis: about 1,200 FCFA for collecting and returning (four rides). Clinton changes how hill pickups work:</p><ul><li>One <strong>hill run at 10 a.m.</strong> on Saturday, so hill bags share the rides. On average, 3 bags per run: 1,200 ÷ 3 = <strong>400 FCFA a bag</strong>.</li><li>A <strong>hill zone fee of +500</strong> on every hill bag, rain or shine. Standard hill bag: 1,800 + 500 = <strong>2,300</strong>. Cost 1,125 + 400 = 1,525. Margin <strong>775</strong>.</li></ul><p>The fee is the same in all weather, so it\'s predictable, and it\'s explained: "Hill hostels: +500 for the moto-taxi up the hill."</p><p><strong>Ironing.</strong> Some regulars pay Mama Rose extra to iron shirts before exams. She\'ll iron a WashDay bag for <strong>100 FCFA</strong> more. Clinton offers ironing for <strong>+200</strong>: margin +100, and it\'s still far cheaper than ironing at the stand.</p><p>Extras work when they cost little to add and some customers value them a lot.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Group hard orders to share their cost, then add a clear, all-weather fee for what\'s left.',
    },
  ],
  apply: {
    scenario: 'The hill and the iron.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'The hill run costs 1,200 FCFA in rides and carries 3 bags. What is the ride cost per bag, in FCFA?',
        answers: ['400'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'A Standard hill bag: price 2,300, cost 1,525. What is the margin?',
        options: [
          { text: '775 FCFA' },
          { text: '675 FCFA', why: 'That\'s a nearby Standard bag.' },
          { text: '500 FCFA', why: 'That\'s the zone fee, not the margin.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the change to the problem it solves.',
        pairs: [
          ['One hill run at 10 a.m.', 'Bags share the rides'],
          ['+500 hill zone fee', 'Covers the moto-taxi cost'],
          ['Same fee in all weather', 'Predictable for customers'],
          ['Ironing +200', 'Value for exam weeks'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'A good extra to offer, or not?',
        groups: ['Good extra', 'Not a good extra'],
        items: [
          { text: 'Ironing: costs 100, worth a lot before exams', group: 0 },
          { text: 'Scented bags: cost 300, nobody asked', group: 1 },
          { text: 'Name-tag photo on WhatsApp when collected: free, reassuring', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Why not charge the hill fee only when it rains?',
        prompt: "David's best reply?",
        options: [
          { text: 'A rain-only fee feels like taking advantage of bad weather. A small all-year fee is predictable and easier to explain. Lesson 7 of Chapter 4 looks at fairness.' },
          { text: 'Yes, rain-only is fairer.', why: 'Price jumps in bad weather often feel unfair.' },
          { text: 'Charge 2,000 when it rains.', why: 'That would feel like price gouging.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The hill rule.',
        template: '[[1]] hard orders to share their cost, then add a clear [[2]] for what\'s left.',
        blanks: [['Group'], ['fee']],
        distractors: ['Refuse', 'discount'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ironing costs 100 and sells for +200. How much extra margin per bag, in FCFA?',
        answers: ['100'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What happens to the ride cost per bag if 6 bags share the hill run?',
        options: [
          { text: 'It drops to 200 FCFA a bag' },
          { text: 'It stays 400', why: '1,200 ÷ 6 = 200.' },
          { text: 'It rises to 600', why: 'More bags share it, so it falls.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the hill plan is the old mistake?',
        lines: [
          'One hill run at 10 a.m. on Saturday.',
          'Hill zone fee: +500 a bag.',
          'Any hill bag picked up whenever it\'s ordered, one at a time.',
          'Same fee rain or shine.',
        ],
        bug: 2,
        fix: 'Hill bags join the 10 a.m. run.',
        explanation: 'Single trips are what made hill orders lose money.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the hill fix.',
        lines: ['Cost a single hill pickup', 'Group hill orders into one run', 'Work out the shared cost per bag', 'Set a clear all-weather zone fee'],
      },
    ],
  },
  reflect: {
    prompt: 'Which of your orders or jobs cost you more than others? Could you group them, add a clear fee, or offer an extra?',
    starters: ['My costly jobs are...', 'I could...'],
  },
  deepen: {
    title: 'Fees people accept',
    summary: 'Fees are accepted when they\'re shown up front, explained, and tied to a real cost. Fees that appear at the end feel like tricks (Chapter 5).',
  },
  notes: 'Fictional: hill rides 4 × 300 = 1,200 per run; average 3 bags per run → 400/bag; hill zone +500 → Standard hill 2,300, cost 1,525, margin 775. Mama Rose ironing +100; WashDay ironing +200 (margin +100).',
};

export default lesson;
