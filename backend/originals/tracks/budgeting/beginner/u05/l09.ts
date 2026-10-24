import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 9. Tap to explore: money sheet v5, the one that works. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Money sheet v5: the one that works',
  summary: 'Five versions in three months: a case file, a survival list, a first plan, one with surprises built in, and now this. Tap through Kofi\'s month-3 review and see a budget that finally fits his life.',
  minutes: 11,
  outcomes: [
    'Read a month-end review',
    'See how all five chapters show up on one sheet',
    'Plan your own month-end review',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Kofi\'s money sheet v5 (month 3 review)',
      text: 'PLANNED: GH₵1,500. SPENT: GH₵960 across all lines. SAVED THIS MONTH: GH₵200. SET ASIDE IN FUNDS: GH₵130. TOTAL SAVINGS: GH₵550. SINKING FUNDS: Bus home GH₵150, ready. Phone and laptop GH₵30. LEFT UNSPENT: GH₵210. WEEKLY CHECKS: 4 of 4 (after the drift). LOANS TAKEN: 0. NEXT MONTH: food out stays GH₵110, transport down to GH₵10, add a family line of GH₵30.',
      hotspots: [
        { phrase: 'SPENT: GH₵960 across all lines', note: 'Every cedi spent was spent from a line. Some lines over, some under, all rebalanced on Sundays. 960 + 200 saved + 130 in funds + 210 left = 1,500.' },
        { phrase: 'TOTAL SAVINGS: GH₵550', note: 'GH₵260 from month 2, GH₵90 of month 2\'s leftover, and GH₵200 this month. From GH₵0 three months ago.' },
        { phrase: 'Bus home GH₵150, ready', note: 'The sinking fund is full. When mid-semester comes, the ticket is already paid for.' },
        { phrase: 'Phone and laptop GH₵30', note: 'Just one month in. Small, for now.' },
        { phrase: 'LEFT UNSPENT: GH₵210', note: 'Money that wasn\'t needed. Its job gets decided tonight: some to savings, some to the phone and laptop fund.' },
        { phrase: 'WEEKLY CHECKS: 4 of 4 (after the drift)', note: 'The habit that keeps everything else working. Sunday, 8 p.m.' },
        { phrase: 'LOANS TAKEN: 0', note: 'Three months, several shocks, zero loans. Month 1 Kofi nearly tapped one at 1 a.m.' },
        { phrase: 'NEXT MONTH', note: 'The draft improves: lines resized from real results, and a planned family line after the cousin\'s call.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A month-end review fits on one card: planned, spent, saved, funds, left, checks done, loans, and what changes next month.',
    },
  ],
  apply: {
    scenario: 'Reading the month-3 review.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Planned GH₵1,500. Spent GH₵960, saved GH₵200, set aside GH₵130 in funds. How much is left unspent?',
        answers: ['210', 'GH₵210', '210 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Savings: GH₵260 + GH₵90 + GH₵200. Total?',
        answers: ['550', 'GH₵550', '550 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line of v5 to the chapter that built it.',
        pairs: [
          ['Spent from lines', 'Ch 3: the plan'],
          ['Sinking funds', 'Ch 4: when life happens'],
          ['Weekly checks 4 of 4', 'Ch 5: keeping it going'],
          ['Loans taken: 0', 'Ch 2: needs first'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the single habit that keeps the rest of v5 working?',
        options: [
          { text: 'The 10-minute weekly check' },
          { text: 'Earning more from beats', why: 'Helpful, but the plan doesn\'t rely on it.' },
          { text: 'Never having fun', why: 'Fun is on the sheet every week.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'What should the GH₵210 left unspent do?',
        groups: ['Good job for it', 'Not a good job'],
        items: [
          { text: 'Top up the phone and laptop fund', group: 0 },
          { text: 'Extra savings', group: 0 },
          { text: 'Spend it before the 1st because it\'s there', group: 1 },
          { text: 'Sneakers at Kejetia on a whim', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'Three months, zero loans, GH₵550 saved. How does it feel?',
        prompt: 'Kofi\'s most honest answer?',
        options: [
          { text: 'Like I\'m naturally good with money.', why: 'It\'s habits, and he knows it.' },
          { text: 'Boring, honestly. And calm. I don\'t think about money every hour any more.' },
          { text: 'Like I can stop checking now.', why: 'That\'s exactly what caused the drift.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which "next month" change doesn\'t match the results?',
        lines: [
          'Food out stays GH₵110 (it fits now).',
          'Transport down to GH₵10 (it was under).',
          'Drop the weekly check (things are going well).',
          'Add a family line of GH₵30.',
        ],
        bug: 2,
        fix: 'Keep the weekly check at Sunday 8 p.m.',
        explanation: 'Going well is when drift starts. The check is why it\'s going well.',
      },
      {
        kind: 'fillBlank',
        prompt: 'The month-end card.',
        template: 'Planned, [[1]], saved, funds, [[2]], checks, loans, next month.',
        blanks: [['spent'], ['left']],
        distractors: ['borrowed', 'wanted'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the five versions of Kofi\'s sheet.',
        lines: ['v1: the case file', 'v2: the survival list', 'v3: the first budget', 'v4: surprises built in', 'v5: the one that works'],
      },
      {
        kind: 'mcq',
        prompt: 'What makes v5 "the one that works"?',
        options: [
          { text: 'It\'s perfect', why: 'Lines still go over. It\'s not perfect; it\'s maintained.' },
          { text: 'It fits his real life and he keeps checking it' },
          { text: 'He earns more now', why: 'Same income, different habits.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Write your own month-end card for last month, even with rough numbers: planned, spent, saved, left, loans.',
    starters: ['Planned:...', 'Spent:...', 'Saved:...', 'Left:...'],
  },
  deepen: {
    title: 'Keep every version',
    summary: 'Kofi keeps all five sheets in one notes folder. On a bad week, scrolling back to v1 (GH₵63, 94 mystery payments) is the best reminder of how far he\'s come.',
  },
  notes: 'Money sheet v5 (fictional): 1,500 = spent 960 + saved 200 + sinking funds 130 (bus 100, phone & laptop 30) + left 210. Total savings 260 + 90 + 200 = 550. Bus fund 100 (month 3) + 50 (month-2 leftover) = 150.',
};

export default lesson;
