import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 8. Before/After: Yaw's plan. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Yaw\'s plan, before and after',
  summary: 'Yaw\'s first plan: "Work harder, pay it all next month." His second plan, written with Kofi at 3 a.m.: returns, a phone call, an order of attack and a stop rule. Same debt, very different chances.',
  minutes: 12,
  outcomes: [
    'Build a simple debt plan',
    'Decide which debt to pay first',
    'Stop the debt growing while you pay it down',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Yaw\'s plan, two versions',
      before: {
        label: 'Plan A: "I\'ll sort it"',
        text: 'Work extra weekend shifts\nPay it all off next month\nKeep the apps "just in case"\nDon\'t tell anyone\nTotal owed: GH₵2,980 (with late fees)\nRealistic? No.',
      },
      after: {
        label: 'Plan B: written with Kofi',
        text: '1. Return the six unopened parcels: refunds of GH₵900 reduce App 2 to GH₵150\n2. Call App 1 (overdue, messaging contacts): agree GH₵300 a month for 4 months; report the messages\n3. Pay App 2\'s last GH₵150 and App 3\'s normal payments\n4. Stop rule: no new pay-later until every plan is paid; remove saved cards\n5. Budget frees GH₵600 a month from uncle\'s money and weekend job\nDebt-free in about 4 months',
      },
      notes: [
        'Returns first: unopened items within the return window can cut debt fastest, for free.',
        'Pay the most urgent first: the overdue app charging late fees and messaging contacts.',
        'Call the lender early: a payment plan stops new late fees and buys time.',
        'A stop rule matters as much as paying: debt shrinks only if new debt stops.',
        'A realistic monthly amount from a real budget beats "pay it all next month".',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Out of debt in five moves: stop new debt, return what you can, list everything, call the most urgent lender, pay a realistic amount every month.',
    },
  ],
  apply: {
    scenario: 'Writing Plan B.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'App 2 owed GH₵1,050. Refunds from returned parcels: GH₵900. What\'s left on App 2?',
        answers: ['150', 'GH₵150', '150 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why pay App 1 first?',
        options: [
          { text: 'It\'s the smallest', why: 'App 3 is smaller. App 1 is the most urgent.' },
          { text: 'It\'s overdue, charging late fees and messaging contacts' },
          { text: 'It doesn\'t matter which first', why: 'Urgent and costly debts first.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Yaw\'s Plan B.',
        lines: ['Return the unopened parcels', 'Call App 1 to agree a plan', 'Pay App 2\'s last GH₵150', 'Keep App 3\'s normal payments', 'No new pay-later until all are paid'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Plan A or Plan B?',
        groups: ['Plan A', 'Plan B'],
        items: [
          { text: '"Pay it all next month"', group: 0 },
          { text: 'Return unopened items', group: 1 },
          { text: 'Keep the apps "just in case"', group: 0 },
          { text: 'A stop rule on new pay-later', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'App 1: GH₵1,230 owed, paying GH₵300 a month. About how many months? (Round up.)',
        answers: ['5', 'five', '4.1'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'I\'ll just work double shifts and clear it all next month.',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'You earn GH₵800 a month at the weekend job. GH₵2,980 in one month isn\'t real. Let\'s pick an amount you can keep paying.' },
          { text: 'Good plan!', why: 'It\'s not realistic, and when it fails, he\'ll feel worse.' },
          { text: 'Quit university and work.', why: 'An extreme move for a debt that can be cleared in months.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The stop rule.',
        template: 'No new [[1]] until every plan is [[2]].',
        blanks: [['pay-later', 'debt', 'borrowing'], ['paid']],
        distractors: ['savings', 'opened'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of a debt plan will keep the debt growing?',
        lines: [
          'Pay GH₵300 a month to App 1.',
          'Return what I can.',
          'Keep using pay later for small things meanwhile.',
        ],
        bug: 2,
        fix: 'No new pay later until every plan is paid.',
        explanation: 'Paying down while borrowing more is running on a treadmill.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each move to why it matters.',
        pairs: [
          ['Return unopened items', 'Fastest free way to cut debt'],
          ['Call the lender early', 'Stops new late fees'],
          ['Stop rule', 'Debt stops growing'],
          ['Realistic monthly amount', 'A plan you can keep'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why remove saved cards from shopping apps during the plan?',
        options: [
          { text: 'Cards expire', why: 'It\'s about friction, not expiry.' },
          { text: 'It adds friction, so new impulse buys are harder' },
          { text: 'It cancels the debt', why: 'It doesn\'t cancel anything; it prevents new spending.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'If you have debts, which would you pay first, and why? What would your stop rule be?',
    starters: ['First:...', 'Because...', 'My stop rule:...'],
  },
  deepen: {
    title: 'Two ways to order debts',
    summary: 'The "avalanche" method pays the most expensive debt first, saving the most money. The "snowball" pays the smallest first, for quick wins. Both work if you stick to them. Overdue debts with fees or harassment usually come first either way.',
  },
  notes: 'Yaw\'s plan (fictional): App 1 1,150 + 80 fees = 1,230 at 300/month ≈ 4.1 months; App 2 1,050 − 900 refunds = 150; App 3 700 normal payments. Plan A total 2,980 = 2,900 + 80. Monthly debt budget 600 from uncle (1,800) + weekend job (~800). Return windows vary; unopened items most likely returnable. Avalanche vs snowball: standard; research on snowball motivation (Gal & McShane 2012).',
};

export default lesson;
