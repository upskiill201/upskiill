import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3. Step-by-step: fees you don't see. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Fees you don\'t see',
  summary: 'GH₵1.50 here, GH₵3.50 there. Kofi paid over GH₵40 in fees last month without noticing. Step by step, here\'s how to find every fee and shrink most of them.',
  minutes: 11,
  outcomes: [
    'Find every fee in your money history',
    'Work out what a habit costs in fees per month',
    'Change the habit that causes the most fees',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'The fee audit',
      steps: [
        { title: '1. Search for fee lines', body: 'In your history, look for lines marked "fee", "charge", "levy" or "commission". Some services show fees as separate lines; others fold them into the payment.' },
        { title: '2. Count by type', body: 'Kofi\'s month: 12 cash-outs (about GH₵3.50 each), 6 transfers to friends (about GH₵0.75 each), one late fee on hall dues (GH₵5).' },
        { title: '3. Find the habit behind each', body: 'Cash-out fees come from withdrawing small amounts often. Transfer fees come from paying friends one by one. The late fee came from forgetting.' },
        { title: '4. Change the biggest habit', body: 'Pay sellers directly by mobile money where they accept it (often cheaper or free for the payer than cashing out). Cash out once a week, for the cash you truly need.' },
        { title: '5. Batch and remind', body: 'Settle up with friends once a week instead of every meal. Put due dates in your phone so late fees never happen.' },
        { title: '6. Check the price list', body: 'Providers publish fee tables. Look once: sometimes a slightly different way of paying costs nothing.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Fees punish small, frequent, last-minute habits. Fewer, planned, on-time payments cost less.',
    },
  ],
  apply: {
    scenario: 'Kofi\'s fee audit.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: '12 cash-outs at GH₵3.50 each. Total?',
        answers: ['42', 'GH₵42', '42 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the fee audit.',
        lines: ['Search for fee lines', 'Count by type', 'Find the habit behind each', 'Change the biggest habit', 'Batch and set reminders'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each fee to the habit behind it.',
        pairs: [
          ['Cash-out fees', 'Withdrawing small amounts often'],
          ['Transfer fees', 'Paying friends one by one'],
          ['Late fee', 'Forgetting a due date'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Kofi switches to one cash-out a week. About how many cash-outs a month is that?',
        options: [
          { text: 'About 4' },
          { text: 'About 12', why: 'That\'s what he did before.' },
          { text: 'About 30', why: 'That would be daily.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: '4 cash-outs at GH₵3.50 instead of 12. How much does he save a month?',
        answers: ['28', 'GH₵28', '28 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'It\'s only GH₵1.50, chale. Who cares?',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'Once, nobody. Twelve times a month, every month, it\'s over GH₵40. That\'s a laptop key.' },
          { text: 'You\'re right.', why: 'Small fees repeat. Price × how often.' },
          { text: 'Fees are theft!', why: 'They\'re the price of a service. The point is to use them less.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'What fees punish.',
        template: 'Fees punish [[1]], frequent, last-minute habits.',
        blanks: [['small']],
        distractors: ['planned', 'big'],
      },
      {
        kind: 'sortGroups',
        prompt: 'More fees or fewer fees?',
        groups: ['More fees', 'Fewer fees'],
        items: [
          { text: 'Cashing out GH₵20 every day', group: 0 },
          { text: 'Paying the seller directly', group: 1 },
          { text: 'Settling up with friends weekly', group: 1 },
          { text: 'Paying dues after the deadline', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which plan still causes most of the fees?',
        lines: [
          'Pay sellers by mobile money directly.',
          'Settle up with friends on Sundays.',
          'Keep cashing out small amounts whenever I need cash.',
          'Phone reminders for due dates.',
        ],
        bug: 2,
        fix: 'Cash out once a week, for the cash I really need.',
        explanation: 'Small, frequent cash-outs were the biggest fee habit.',
      },
      {
        kind: 'mcq',
        prompt: 'Where can you find exactly what your provider charges?',
        options: [
          { text: 'Its published fee table or price list' },
          { text: 'A friend\'s guess', why: 'Fees change; check the source.' },
          { text: 'Nowhere; it\'s secret', why: 'Providers publish their charges.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Search your history for fees. How much did you pay last month, and which habit caused most of it?',
    starters: ['I paid about... in fees', 'Most came from...'],
  },
  deepen: {
    title: 'Fees and taxes change',
    summary: 'Mobile money fees and transaction taxes change over time and differ by country and provider. Check your provider\'s current price list a couple of times a year, rather than relying on what was true last year.',
  },
  notes: 'Illustrative fee amounts (cash-out ~GH₵3.50, transfer ~GH₵0.75); actual fees vary by provider, amount and date. No provider named. Ghana\'s E-Levy was repealed in 2025; not mentioned to avoid dating; "taxes change" stated generally. Fee saving: cash-outs 42 → 14 saves 28; plus transfers/late fee ≈ 30/month in jar v2.',
};

export default lesson;
