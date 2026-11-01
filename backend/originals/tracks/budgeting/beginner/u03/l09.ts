import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9. Tap to explore: money sheet v3, the first budget. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Money sheet v3: the first budget',
  summary: 'The plan Mum said "Good" to. Twelve lines, GH₵1,500, every cedi with a job. Tap through Kofi\'s first real budget and see what each line is doing.',
  minutes: 11,
  outcomes: [
    'Read a complete zero-based budget',
    'See how fixed, weekly and monthly lines fit together',
    'Copy the layout for your own budget',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Kofi\'s money sheet v3 (month 2)',
      text: 'INCOME: GH₵1,500. FIXED: Data plan GH₵70. Dues GH₵20. Toiletries and laundry GH₵40. FUTURE ME: Savings GH₵200. Surprises GH₵150. WEEKLY (GH₵205 x 4): Food staples GH₵60. Food out GH₵100. Transport GH₵15. Fun GH₵30. MONTHLY: School and printing GH₵100. Haircut and clothes GH₵100. LEFT WITHOUT A JOB: GH₵0.',
      hotspots: [
        { phrase: 'INCOME: GH₵1,500', note: 'Only money he\'s sure of. Beat sales aren\'t here yet: they\'re a bonus until Chapter 4 decides what to do with them.' },
        { phrase: 'Data plan GH₵70', note: 'Swapped from daily bundles (about GH₵300 a month). One switch, about GH₵230 saved.' },
        { phrase: 'Savings GH₵200', note: 'Paid first, not from leftovers. About 13% of his income: below 20%, and that\'s fine.' },
        { phrase: 'Surprises GH₵150', note: 'The cushion against the planning fallacy. Something always comes up.' },
        { phrase: 'WEEKLY (GH₵205 x 4)', note: 'Each Sunday GH₵205 moves to his spending money. The rest stays put.' },
        { phrase: 'Food out GH₵100', note: 'Down from about GH₵385 a week in month 1. Lunch out on lab days, the rest cooked in the hall.' },
        { phrase: 'Fun GH₵30', note: 'Small, fixed and guilt-free. Leftovers roll over.' },
        { phrase: 'LEFT WITHOUT A JOB: GH₵0', note: '70 + 20 + 40 + 200 + 150 + 820 + 100 + 100 = 1,500. Zero unplanned, not zero money.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Four blocks: fixed, future you, weekly, monthly. Then one line that must say zero.',
    },
  ],
  apply: {
    scenario: 'Reading the first budget.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Add the fixed block: GH₵70 + GH₵20 + GH₵40.',
        answers: ['130', 'GH₵130', '130 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which block is paid before any flexible spending?',
        options: [
          { text: 'Weekly', why: 'Weekly money is flexible. Future-you comes first.' },
          { text: 'Future me: savings and surprises' },
          { text: 'Monthly', why: 'Haircut and school come after the future-you block.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which block does each line belong to?',
        groups: ['Fixed', 'Weekly', 'Monthly'],
        items: [
          { text: 'Data plan', group: 0 },
          { text: 'Food out', group: 1 },
          { text: 'Haircut and clothes', group: 2 },
          { text: 'Fun', group: 1 },
          { text: 'Dues', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Weekly money is GH₵205. What\'s that for 4 weeks?',
        answers: ['820', 'GH₵820', '820 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to the lesson behind it.',
        pairs: [
          ['Data plan GH₵70', 'Fixed vs flexible'],
          ['Surprises GH₵150', 'The planning fallacy'],
          ['Fun GH₵30', 'Fun money is allowed'],
          ['GH₵205 a week', 'Spend weekly'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'Only GH₵100 a week for food out? You\'ll starve.',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'Plus GH₵60 a week of staples we cook together. I ate better last week than in month 1.' },
          { text: 'You\'re right, I\'ll double it.', why: 'Then savings and surprises go, and the sheet stops adding up.' },
          { text: 'I\'ll just skip meals.', why: 'Never the plan. Staples cover the gap.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'A copy of the sheet with a mistake. Which line is wrong?',
        lines: [
          'Income GH₵1,500.',
          'Fixed GH₵130. Future me GH₵350.',
          'Weekly GH₵205 x 4 = GH₵720.',
          'Monthly GH₵200. Left: GH₵0.',
        ],
        bug: 2,
        fix: 'Weekly GH₵205 x 4 = GH₵820.',
        explanation: '205 × 4 = 820. With 720 the sheet wouldn\'t add to 1,500.',
      },
      {
        kind: 'mcq',
        prompt: 'Why aren\'t beat sales in the income line?',
        options: [
          { text: 'They aren\'t certain, so the plan doesn\'t rely on them' },
          { text: 'Mum doesn\'t know about them', why: 'Not the reason. It\'s about what\'s certain.' },
          { text: 'Beat money isn\'t real income', why: 'It\'s real, just irregular.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the blocks as they appear on the sheet.',
        lines: ['Income', 'Fixed', 'Future me', 'Weekly', 'Monthly', 'Left without a job'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The last line.',
        template: 'Zero [[1]], not zero [[2]].',
        blanks: [['unplanned'], ['money']],
        distractors: ['saved', 'fun'],
      },
    ],
  },
  reflect: {
    prompt: 'Draft your own sheet with the same five blocks. Which block is hardest to fill honestly?',
    starters: ['Income:...', 'The hardest block is...', 'Because...'],
  },
  deepen: {
    title: 'Copy the layout, not the numbers',
    summary: 'Your blocks will hold different lines: rent, a bus pass, family support, a loan repayment. The layout stays the same: income, fixed, future you, weekly, monthly, and a zero at the bottom.',
  },
  notes: 'Money sheet v3 = month-2 budget (fictional), sums to 1,500. Month-1 food out ≈ GH₵55/day ≈ 385/week.',
};

export default lesson;
