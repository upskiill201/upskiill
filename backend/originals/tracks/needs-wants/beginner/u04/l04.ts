import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 4. Before/After: the price tag vs the total cost. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Price tag vs total cost',
  summary: 'The phone Ada bought on instalments looked like ₦20,000 a month. Here\'s the same phone written two ways: the shop\'s way, and the total-cost way.',
  minutes: 11,
  outcomes: [
    'Rewrite any purchase as its total cost',
    'Include running costs and what you give up',
    'Use total cost before signing up',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Ada\'s phone, two ways',
      before: {
        label: 'The shop\'s way',
        text: 'Latest model!\nOnly ₦20,000 a month\nTake it home today\nTrade in your old phone? No thanks, keep it as a backup!',
      },
      after: {
        label: 'The total-cost way',
        text: 'Payments: ₦20,000 × 12 = ₦240,000\nCase and screen protector: ₦12,000\nBigger data plan "to use the camera": +₦5,000 a month = ₦60,000 a year\nOld phone sitting in a drawer, still worth about ₦60,000 if sold\nTotal first-year cost: about ₦312,000, plus ₦60,000 lying in a drawer\nWhat it replaced: her old phone, which worked',
      },
      notes: [
        'The monthly price is designed to sound small. Multiply it out.',
        'Add the extras the purchase brings with it: accessories, bigger plans, insurance.',
        'Count what you\'re not using: the old phone is ₦60,000 of value doing nothing.',
        'Ask what it replaced. If the old one worked, most of the cost bought "new", not "better".',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Total cost = all payments + extras it brings + running costs. Then ask: what did it replace, and what\'s sitting unused?',
    },
  ],
  apply: {
    scenario: 'The phone, honestly.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: '₦20,000 a month for 12 months. Total payments?',
        answers: ['240000', '240,000', '₦240,000', '₦240000'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Payments ₦240,000 + case ₦12,000 + data extra ₦60,000. First-year total?',
        answers: ['312000', '312,000', '₦312,000', '₦312000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Shop\'s way, or total-cost way?',
        groups: ['Shop\'s way', 'Total-cost way'],
        items: [
          { text: '"Only ₦20,000 a month"', group: 0 },
          { text: '₦240,000 in payments', group: 1 },
          { text: '"Take it home today"', group: 0 },
          { text: 'Bigger data plan added', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does the old phone in the drawer matter?',
        options: [
          { text: 'It\'s about ₦60,000 of value doing nothing' },
          { text: 'It\'s a good backup', why: 'She hasn\'t needed it once.' },
          { text: 'It doesn\'t', why: 'Unused value can be turned into cash.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'I can\'t undo the phone. Was this lesson just to make me feel bad?',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'No: two practical moves. Sell the old phone for about ₦60,000, and use total cost before the next big buy.' },
          { text: 'Yes, feel bad.', why: 'Guilt doesn\'t help; actions do.' },
          { text: 'Return the new phone.', why: 'Probably not possible. Selling the old one is.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Total cost.',
        template: 'All [[1]] + [[2]] it brings + running costs.',
        blanks: [['payments'], ['extras']],
        distractors: ['discounts', 'friends'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each hidden cost to its amount.',
        pairs: [
          ['Case and protector', '₦12,000'],
          ['Extra data for a year', '₦60,000'],
          ['Old phone left unsold', '₦60,000 unused'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in the shop\'s offer is the real trap?',
        lines: [
          'Latest model.',
          'Only ₦20,000 a month.',
          'Free delivery.',
        ],
        bug: 1,
        fix: '₦240,000 over 12 months.',
        explanation: 'The monthly price makes a big cost feel small.',
      },
      {
        kind: 'mcq',
        prompt: 'What did most of the phone\'s cost actually buy?',
        options: [
          { text: '"New", not "better": her old phone already worked' },
          { text: 'A phone she needed', why: 'She had a working one.' },
          { text: 'Nothing', why: 'It bought a nicer phone; just not a needed one.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the total-cost check.',
        lines: ['Multiply out the payments', 'Add the extras', 'Add running costs', 'Ask what it replaced', 'Check for unused value to sell'],
      },
    ],
  },
  reflect: {
    prompt: 'Pick something you bought on payments or that came with extras. What was its real first-year cost?',
    starters: ['I bought...', 'Total first-year cost:...'],
  },
  deepen: {
    title: 'Sell what you replaced',
    summary: 'When you upgrade something, sell or give away the old one quickly. Old phones and laptops lose value every month they sit in a drawer, and "backups" are rarely used.',
  },
  notes: 'Fictional: phone 20,000 × 12 = 240,000; case 12,000; data +5,000 × 12 = 60,000 → 312,000. Old phone ~60,000 (sold in Ch4/Ch5; plus old tablet 30,000 = 90,000 one-off).',
};

export default lesson;
