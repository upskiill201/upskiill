import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 7. Chat with Tey: how ordinary people spread money (funds, in general). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'How do ordinary people spread money?',
  summary: 'Arjun can\'t buy shares in hundreds of companies one by one with ₹4.4 lakh. Tey explains, in general terms, how pooled funds work, and what to check before using one.',
  minutes: 12,
  outcomes: [
    'Explain pooled funds in plain words',
    'Tell broad, low-cost funds from narrow or expensive ones',
    'Know what to check before choosing any fund',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Most people spread money using pooled funds. Many people put money in, and the fund buys lots of shares or bonds with it. You own a slice of the whole thing.', replies: ['Like a shared server?'] },
        { tey: 'Good comparison. One slice gets you exposure to hundreds of companies. That\'s how a small amount can be widely spread.', replies: ['Are all funds the same?'] },
        { tey: 'Not at all. Some track a broad market (often called index funds): they simply hold what\'s in a big list of companies, usually at low cost. Others are run by managers picking stocks, usually at higher cost. Some are narrow: one sector, one theme, one hot idea.', replies: ['Which are better?'] },
        { tey: 'I can\'t tell you which to buy. But for spreading risk, broad usually beats narrow, and over long periods many higher-cost actively managed funds have struggled to beat low-cost broad ones after fees.', replies: ['What should I check?'] },
        { tey: 'Five things. What does it actually hold, and how broad is it? What are all the fees? Is the provider regulated? How easily can I get my money out? And does it fit the pot I\'m using it for?', replies: ['And in India?'] },
        { tey: 'In India, mutual funds are regulated by SEBI and must publish what they hold and their expense ratios. Many people invest monthly through SIPs (systematic investment plans), which is just a regular automatic amount. Check everything on official sources, not tips.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'General principles, not advice. Pooled funds let small amounts be widely spread. Broad and low-cost usually spreads risk better than narrow and expensive. Always check holdings, fees, regulation and access.',
    },
  ],
  apply: {
    scenario: 'Funds, plainly.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a pooled fund?',
        options: [
          { text: 'A swimming pool fund', why: 'It\'s pooled money.' },
          { text: 'Many people\'s money combined to buy lots of investments' },
          { text: 'One company\'s shares', why: 'It holds many.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Spreads risk widely, or narrowly?',
        groups: ['Widely', 'Narrowly'],
        items: [
          { text: 'A fund tracking hundreds of companies', group: 0 },
          { text: 'A fund holding one sector', group: 1 },
          { text: 'A fund mixing shares and bonds', group: 0 },
          { text: 'A fund built on one "hot theme"', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the five checks.',
        lines: ['What does it hold?', 'What are all the fees?', 'Is the provider regulated?', 'How easily can I get out?', 'Does it fit this pot?'],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Tey, just tell me which fund to buy.',
        prompt: 'What\'s Tey\'s honest answer?',
        options: [
          { text: 'The one your cousin uses.', why: 'A tip isn\'t a check.' },
          { text: 'The one that did best last year.', why: 'That\'s chasing performance.' },
          { text: 'I can\'t. I can teach you the checks. For your situation, a regulated, independent adviser can help.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The general pattern.',
        template: 'For spreading risk, [[1]] usually beats narrow, and low [[2]] matters over decades.',
        blanks: [['broad'], ['cost', 'fees']],
        distractors: ['hot', 'risk'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each term to its meaning.',
        pairs: [
          ['Index fund', 'Tracks a big list of companies, usually low cost'],
          ['Actively managed fund', 'Managers pick, usually higher cost'],
          ['SIP', 'A regular automatic monthly amount'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which check is missing from Joel\'s list?',
        lines: [
          'What does it hold?',
          'What are the fees?',
          'Did it go up a lot last year?',
        ],
        bug: 2,
        fix: 'Is the provider regulated, and can I get my money out?',
        explanation: 'Last year\'s return isn\'t a risk check.',
      },
      {
        kind: 'mcq',
        prompt: 'What have many higher-cost active funds struggled to do over long periods?',
        options: [
          { text: 'Beat low-cost broad funds after fees' },
          { text: 'Charge fees', why: 'They charge more fees.' },
          { text: 'Hold shares', why: 'They hold shares.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In India, which regulator oversees mutual funds?',
        answers: ['SEBI', 'sebi'],
        placeholder: 'A name',
      },
      {
        kind: 'mcq',
        prompt: 'Why did Arjun call a fund "like a shared server"?',
        options: [
          { text: 'It runs on computers', why: 'It\'s about sharing.' },
          { text: 'It crashes often', why: 'It\'s about sharing.' },
          { text: 'Many people share one big resource and each gets a slice' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'If you used a fund, which of the five checks would be hardest for you to do? How would you do it?',
    starters: ['The hardest check is...', 'I\'d do it by...'],
  },
  deepen: {
    title: 'SPIVA',
    summary: 'S&P Dow Jones Indices publishes regular "SPIVA" reports comparing active funds with their benchmarks in many countries, including India. Over long periods, most active funds in many categories have lagged their benchmark after fees.',
  },
  notes: 'General, no products (playbook §9). SPIVA India scorecards: majority of active large-cap funds underperform over 10 years; stated generally. SEBI regulates mutual funds; SIP generic term.',
};

export default lesson;
