import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9. Tap to explore: the 40-year map v3. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'The 40-year map v3: time working',
  summary: 'Miracle adds a new layer to her map: where each pot lives, what it\'s for, and whether it\'s beating inflation. Tap through version 3.',
  minutes: 11,
  outcomes: [
    'Read a map that matches each pot to its time horizon',
    'See where inflation matters and where it doesn\'t',
    'Add time horizons to your own map',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Miracle\'s 40-year map v3',
      text: 'NEXT MONTH: Current account. Bills and spending. Inflation: barely matters. EMERGENCY (3 to 6 months): ₦1,440,000, safe savings, reachable in a day. Inflation: matters a little; safety first. HOME DEPOSIT (5 years): new pot, ₦40,000 a month, steadier options. LONG TERM (30+ years): Pension, 18% plus ₦50,000 extra. Long-term pot ₦130,000 a month, moving from basic savings into a spread-out, long-term plan she understands, low fees, regulated provider. RULES: no tips, no "guaranteed" offers, monthly amounts, no panic in bad years. DEBT: staff loan only, interest-free. NET WORTH: ₦4,300,000.',
      hotspots: [
        { phrase: 'NEXT MONTH: Current account.', note: 'Money for the next few weeks. Inflation hardly matters over a month.' },
        { phrase: 'reachable in a day', note: 'The emergency fund\'s job is safety, not growth. It protects the long-term pots.' },
        { phrase: 'HOME DEPOSIT (5 years)', note: 'Medium-term: some growth, less bumpiness, because she\'ll need it in five years.' },
        { phrase: 'moving from basic savings into a spread-out, long-term plan she understands', note: 'Thirty-year money needs a real return above zero. After learning the basics, she spreads it out.' },
        { phrase: 'low fees, regulated provider', note: 'Fees compound against you; regulation protects against scams.' },
        { phrase: 'no panic in bad years', note: 'The hardest rule, and the one Folake says mattered most.' },
        { phrase: 'NET WORTH: ₦4,300,000', note: 'Another quarter of automatic saving. Up from ₦2,250,000 two quarters ago.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Match each pot to when you\'ll need it. The sooner you need it, the safer it should be; the later, the more it needs to grow.',
    },
  ],
  apply: {
    scenario: 'Reading map v3.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each pot to its time horizon.',
        pairs: [
          ['Current account', 'Next month'],
          ['Emergency fund', 'Any time'],
          ['Home deposit', 'About 5 years'],
          ['Pension and long-term pot', '30+ years'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Safety first, or growth needed?',
        groups: ['Safety first', 'Growth needed'],
        items: [
          { text: 'Emergency fund', group: 0 },
          { text: 'Pension', group: 1 },
          { text: 'Next month\'s bills', group: 0 },
          { text: 'Long-term pot', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is the home deposit pot "steadier" than the long-term pot?',
        options: [
          { text: 'Houses never fall in price', why: 'They can; the point is the time horizon.' },
          { text: 'She\'ll need it in five years, so there\'s less time to recover from a fall' },
          { text: 'It\'s smaller', why: 'It\'s about when she needs it.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Home deposit: ₦40,000 a month for 5 years. How much put in?',
        answers: ['2400000', '2,400,000', '₦2,400,000', '₦2400000'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'The long-term pot will go down some years. Should I check it every day?',
        prompt: 'Folake\'s best reply?',
        options: [
          { text: 'Please don\'t. Check it quarterly with your map. Daily checking makes people panic.' },
          { text: 'Yes, hourly.', why: 'That leads to panic decisions.' },
          { text: 'Never look at it.', why: 'Quarterly is the healthy middle.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Matching pots to time.',
        template: 'The [[1]] you need it, the safer it should be; the [[2]], the more it needs to grow.',
        blanks: [['sooner'], ['later']],
        distractors: ['bigger', 'cheaper'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line on a copy of v3 breaks the map\'s rules?',
        lines: [
          'Emergency fund: safe savings.',
          'Long-term pot: spread out, regulated, low fees.',
          'Rule: follow good tips from colleagues.',
        ],
        bug: 2,
        fix: 'Rule: no tips, no "guaranteed" offers.',
        explanation: 'Tips are bets. The map is a plan.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Net worth went from ₦2,250,000 to ₦4,300,000. How much did it grow?',
        answers: ['2050000', '2,050,000', '₦2,050,000', '₦2050000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which rule did Folake say mattered most?',
        options: [
          { text: 'Check daily', why: 'The opposite.' },
          { text: 'No panic in bad years' },
          { text: 'Always buy the hottest thing', why: 'The opposite.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Miracle\'s map versions.',
        lines: ['v1: where I stand', 'v2: on autopilot', 'v3: time working'],
      },
    ],
  },
  reflect: {
    prompt: 'Add time horizons to your map: what money do you need next month, in 5 years, in 30 years?',
    starters: ['Next month:...', 'In 5 years:...', 'In 30 years:...'],
  },
  deepen: {
    title: 'Time horizon is the first question',
    summary: 'Before "what should I invest in?", ask "when will I need this money?" The answer decides how much ups and downs you can live with. The course How to Understand Investment Risk builds on exactly this.',
  },
  notes: 'Map v3 (fictional): net worth ≈ 4,300,000 after another quarter. Home deposit pot 40,000/month new (funded from the raise half: 50,000 split 40,000 home + 10,000 extra long-term). No products named.',
};

export default lesson;
