import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 9. Tap to explore: the risk map v4. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Arjun\'s risk map v4: spread',
  summary: 'The long-term pot finally gets a plan: how it will be spread, what it costs, how money goes in, and when it gets rebalanced. Tap through version 4.',
  minutes: 11,
  outcomes: [
    'Read a spreading plan for a long-term pot',
    'See fees, timing and rebalancing on one page',
    'Write your own spreading plan',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Arjun\'s risk map v4',
      text: 'POTS 1 to 3: unchanged, all safe or steadier. POT 4, LONG TERM, ₹4,40,000: SPREAD: broad funds holding hundreds of companies across industries; some bonds; some exposure beyond India. NOT: one stock, one sector, one coin. CRYPTO: at most a small slice I could lose completely, if any. FEES: low; every fee checked in rupees per year. PROVIDERS: on the regulator\'s own list, checked by me. GOING IN: ₹4,40,000 spread over six months, then ₹15,000 a month. REBALANCE: once a year, every January. RISK: a fall of a third in a bad year would hurt, but I wouldn\'t sell.',
      hotspots: [
        { phrase: 'broad funds holding hundreds of companies across industries', note: 'Layers 1 and 2: many companies, many industries.' },
        { phrase: 'some exposure beyond India', note: 'Layer 4: not everything tied to one economy, or to Bengaluru tech.' },
        { phrase: 'at most a small slice I could lose completely, if any', note: 'Kavya\'s influence, limited by Chapter 3\'s capacity rule.' },
        { phrase: 'every fee checked in rupees per year', note: 'The ₹4.6 lakh lesson from fees.' },
        { phrase: 'spread over six months, then ₹15,000 a month', note: 'Layer 5: spreading over time, not betting on one day.' },
        { phrase: 'once a year, every January', note: 'Keeps the pot at the risk he chose.' },
        { phrase: 'I wouldn\'t sell', note: 'The test from Chapter 1: can he stay in it? He thinks so.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A spreading plan answers: what\'s it spread across, what does it cost, who\'s regulated, how money goes in, and when it\'s rebalanced.',
    },
  ],
  apply: {
    scenario: 'Reading map v4.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the plan to the idea it uses.',
        pairs: [
          ['Hundreds of companies', 'Diversification'],
          ['Beyond India', 'Less correlation'],
          ['₹15,000 a month', 'Spreading over time'],
          ['Every January', 'Rebalancing'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: '₹4,40,000 spread evenly over six months. About how much goes in each month? (Nearest thousand.)',
        answers: ['73000', '73,000', '₹73,000', '73333', '73,333'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'In the plan, or ruled out?',
        groups: ['In the plan', 'Ruled out'],
        items: [
          { text: 'Broad funds', group: 0 },
          { text: 'One stock', group: 1 },
          { text: 'Some bonds', group: 0 },
          { text: 'One sector', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: 'Which line protects you most from yourself?',
        prompt: 'Arjun\'s best answer?',
        options: [
          { text: 'The crypto slice.', why: 'That\'s the riskiest line.' },
          { text: '"I wouldn\'t sell." And the yearly rebalance, so I\'m not tempted to fiddle.' },
          { text: 'None of them.', why: 'Several protect against panic.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The crypto rule.',
        template: 'At most a [[1]] slice I could [[2]] completely, if any.',
        blanks: [['small'], ['lose']],
        distractors: ['large', 'double'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line on a copy of v4 breaks the plan?',
        lines: [
          'Providers checked on the regulator\'s own list.',
          'Fees checked in rupees per year.',
          'Rebalance whenever Vikram sends a screenshot.',
        ],
        bug: 2,
        fix: 'Rebalance once a year, every January.',
        explanation: 'A schedule, not tips, drives changes.',
      },
      {
        kind: 'mcq',
        prompt: 'Why are Pots 1 to 3 "unchanged"?',
        options: [
          { text: 'He forgot them', why: 'They\'re deliberately safe.' },
          { text: 'They\'re invested in one stock', why: 'They\'re safe.' },
          { text: 'Their dates are close, so they stay safe or steadier' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: '₹15,000 a month for a year. How much goes in?',
        answers: ['180000', '1,80,000', '180,000', '₹1,80,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What fall does Arjun say would hurt but not make him sell?',
        options: [
          { text: 'A third, in a bad year' },
          { text: 'Any fall at all', why: 'He expects falls.' },
          { text: 'None; it can\'t fall', why: 'He knows it can.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Arjun\'s map versions.',
        lines: ['v1: three questions', 'v2: five kinds of risk', 'v3: pots and dates', 'v4: spread'],
      },
    ],
  },
  reflect: {
    prompt: 'Write a one-line spreading plan for any long-term money you have.',
    starters: ['Spread across..., costing..., added..., rebalanced...'],
  },
  deepen: {
    title: 'Writing it down',
    summary: 'A written plan is easier to stick to than one in your head, especially when screenshots arrive. Arjun prints v4 and sticks it beside his sticky note.',
  },
  notes: 'Map v4 (fictional, general; no products). 4.4L/6 ≈ 73,333. 15,000 × 12 = 1,80,000.',
};

export default lesson;
