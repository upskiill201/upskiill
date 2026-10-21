import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3. Step-by-step: build the order of saving. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'The order of saving',
  summary: 'Miracle wants to save 20%. But save into what, first? An emergency fund? Extra pension? Paying off the staff loan? Step by step, the order that works for most people.',
  minutes: 11,
  outcomes: [
    'Put saving goals in a sensible order',
    'Know why the emergency fund comes before investing',
    'Set up each step automatically',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Miracle\'s order of saving',
      steps: [
        { title: '1. Take the free money', body: 'If your employer adds to your pension when you do, make sure you\'re getting all of it. For Miracle, it\'s automatic: 8% from her, 10% from Afiya.' },
        { title: '2. Build an emergency fund', body: 'Three to six months of must-have costs, in a safe, reachable account. Miracle\'s must-haves are about ₦480,000 a month. Three months: ₦1,440,000. She already has ₦1,400,000, so she tops it up by ₦40,000.' },
        { title: '3. Clear expensive debt', body: 'Any debt charging high interest. Miracle\'s staff loan is interest-free, so she keeps paying it normally. A credit card or loan app at high rates would come first.' },
        { title: '4. Save for long-term goals', body: 'Now the long game: extra pension contributions and long-term investments she understands. Miracle: ₦180,000 a month (20%), automatic on payday.' },
        { title: '5. Save for medium goals alongside', body: 'A home deposit, a car, further study: separate pots, named, with dates.' },
        { title: '6. Automate every step', body: 'Each pot gets a scheduled transfer on payday. Miracle never has to decide again.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Free employer money, then an emergency fund, then expensive debt, then long-term saving, with medium goals alongside. Automate every step.',
    },
  ],
  apply: {
    scenario: 'Miracle\'s order of saving.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the steps.',
        lines: ['Take free employer money', 'Build an emergency fund', 'Clear expensive debt', 'Save for long-term goals', 'Automate everything'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Must-haves ₦480,000 a month. Three months of emergency fund?',
        answers: ['1440000', '1,440,000', '₦1,440,000', '₦1440000'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'She has ₦1,400,000. How much more to reach ₦1,440,000?',
        answers: ['40000', '40,000', '₦40,000', '₦40000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why build the emergency fund before long-term investing?',
        options: [
          { text: 'So an emergency doesn\'t force you to sell long-term investments at a bad time' },
          { text: 'Emergency funds grow faster', why: 'They usually grow slower; they\'re for safety.' },
          { text: 'It doesn\'t matter which first', why: 'Order protects the long-term money.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Clear first, or pay normally?',
        groups: ['Clear first', 'Pay normally'],
        items: [
          { text: 'A loan app at very high interest', group: 0 },
          { text: 'An interest-free staff loan', group: 1 },
          { text: 'Credit card debt at a high rate', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'Should I pay off my staff loan early before investing?',
        prompt: 'Folake\'s best reply?',
        options: [
          { text: 'It\'s interest-free, so paying early doesn\'t save you anything. Keep paying normally and start the long-term saving.' },
          { text: 'Yes, all debt first.', why: 'Interest-free debt isn\'t costing her anything.' },
          { text: 'Stop paying it.', why: 'Always pay what you owe on time.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The order, short.',
        template: 'Free money, [[1]] fund, expensive [[2]], long-term saving.',
        blanks: [['emergency'], ['debt']],
        distractors: ['holiday', 'shopping'],
      },
      {
        kind: 'findBug',
        prompt: 'Which plan has the order wrong?',
        lines: [
          'Pension contributions running.',
          'Emergency fund: none yet.',
          'Put all spare money into long-term investments right away.',
        ],
        bug: 2,
        fix: 'Build the emergency fund first.',
        explanation: 'Without it, the first emergency means selling investments, maybe at a loss.',
      },
      {
        kind: 'typeAnswer',
        prompt: '20% of ₦900,000. Miracle\'s monthly long-term saving?',
        answers: ['180000', '180,000', '₦180,000', '₦180000'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each pot to where it\'s kept.',
        pairs: [
          ['Emergency fund', 'Safe and reachable'],
          ['Pension', 'Long-term, hard to touch'],
          ['Home deposit', 'Separate named pot'],
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Where are you in the order? Free money, emergency fund, expensive debt, long-term saving?',
    starters: ['I\'m at step...', 'Next I need to...'],
  },
  deepen: {
    title: 'Not one-size-fits-all',
    summary: 'This order works for many people, but lives differ: someone with irregular income may want a bigger emergency fund; someone supporting family may need a family pot early. The principle stays: safety first, expensive debt next, then growth.',
  },
  notes: 'Order of saving is common personal-finance guidance (emergency fund → high-interest debt → long-term). Miracle\'s figures per running numbers (must-haves ~480,000; EF target 1,440,000).',
};

export default lesson;
