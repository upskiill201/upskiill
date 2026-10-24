import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3. Card deck: income, spending, what's left. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'In, out, left',
  summary: 'Every money question comes down to three numbers: what came in, what went out, and what\'s left. Kofi knows one of them. Time to find the other two.',
  minutes: 11,
  outcomes: [
    'Explain income, spending and what\'s left',
    'Count all of your income, not just the big amount',
    'Do the one sum every budget is built on',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Income</strong> is all the money that comes in. For Kofi that\'s Mum\'s GH₵1,500, and something he forgot: GH₵80 from a beat he sold to a hall rapper on day 6.</p><p>Income isn\'t only wages. It\'s an allowance, side-hustle money, gifts, a refund, money a friend pays back. If it came in, it counts.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Spending</strong> (also called <strong>expenses</strong>) is all the money that goes out: food, data, transport, fees, gifts, money you lend. Lending counts too, because until it comes back you can\'t spend it.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>What\'s left</strong> is income minus spending. That\'s the sum every budget is built on:</p><p><strong>In − Out = Left</strong></p><p>Kofi: GH₵1,500 + GH₵80 = GH₵1,580 in. He has GH₵63 left. So GH₵1,517 went out, not GH₵1,437. The case just got bigger.</p>',
    },
    {
      kind: 'check',
      question: 'If "Left" is below zero, what has happened?',
      options: ['You spent more than came in, so you borrowed or owe someone', 'You saved money', 'Nothing, it\'s normal'],
      answer: 0,
      explanation: 'Below zero means the money came from somewhere else: a loan, a friend, an overdraft. That\'s a warning light.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Count income first, all of it, before looking at spending. People forget small income just like they forget small spending.',
    },
  ],
  apply: {
    scenario: 'Kofi\'s three numbers.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'In or out?',
        groups: ['Money in', 'Money out'],
        items: [
          { text: 'Mum\'s GH₵1,500', group: 0 },
          { text: 'Data bundle', group: 1 },
          { text: 'GH₵80 for a beat', group: 0 },
          { text: 'GH₵200 lent to Yaw', group: 1 },
          { text: 'Plate of waakye', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The one sum.',
        template: '[[1]] − [[2]] = [[3]]',
        blanks: [['In'], ['Out'], ['Left']],
        distractors: ['Save', 'Want'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kofi\'s total income this month: GH₵1,500 from Mum + GH₵80 from a beat = ?',
        answers: ['1580', '1,580', 'GH₵1,580', 'GH₵1580'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'With GH₵1,580 in and GH₵63 left, how much went out?',
        options: [
          { text: 'GH₵1,437', why: 'That was before counting the beat money. With GH₵1,580 in, more went out.' },
          { text: 'GH₵1,517' },
          { text: 'GH₵1,643', why: 'That adds instead of subtracting. 1,580 − 63 = 1,517.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Why does the GH₵200 Kofi lent Yaw count as money out?',
        options: [
          { text: 'Because Yaw will never pay it back', why: 'He might. But even if he does, Kofi can\'t spend it until then.' },
          { text: 'It doesn\'t count; it\'s still Kofi\'s money', why: 'It\'s still owed to him, but it isn\'t in his pocket. For this month, it\'s gone.' },
          { text: 'Because Kofi can\'t spend it until it comes back' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the word to its meaning.',
        pairs: [
          ['Income', 'All money that comes in'],
          ['Expenses', 'All money that goes out'],
          ['Left', 'In minus out'],
          ['Below zero', 'Borrowed or owing'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'The GH₵200? I\'ll pay you next week. It\'s basically still yours, so it doesn\'t count.',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'True, forget it.', why: 'It\'s still owed, but it isn\'t in his pocket this month.' },
          { text: 'You\'re a thief.', why: 'Yaw is late, not a thief. Kofi needs the money and the friendship.' },
          { text: 'It\'s still mine, but I can\'t spend it until you pay. Can we fix a day, like Friday?' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which of these count as income?',
        groups: ['Income', 'Not income'],
        items: [
          { text: 'A birthday gift of GH₵50', group: 0 },
          { text: 'A refund for a cancelled trip', group: 0 },
          { text: 'Money you plan to earn someday', group: 1 },
          { text: 'A friend paying back what they owe', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Efua: GH₵1,100 in, GH₵960 out. How much is left?',
        answers: ['140', 'GH₵140', '140 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which statement is true for every budget, at any income?',
        options: [
          { text: 'If spending is bigger than income for long, the gap has to come from somewhere' },
          { text: 'A higher income always fixes running out', why: 'If spending rises with income, the gap stays. Plenty of high earners run out too.' },
          { text: 'Small income doesn\'t need counting', why: 'A small income needs it more: there\'s less room for leaks.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'List every way money came in for you last month, including the small ones. Was there anything you\'d forgotten?',
    starters: ['Money came in from...', 'I forgot about...'],
  },
  deepen: {
    title: 'Income vs take-home',
    summary: 'If you earn a salary, the number on your offer letter isn\'t what reaches your account. Tax and other deductions come out first. Budget from take-home pay, the amount that actually arrives.',
  },
  notes: 'Fictional: beat sale GH₵80 on day 6; total in GH₵1,580; out GH₵1,517 with GH₵63 left. From here the case total is GH₵1,517 (Ch1 L10 breakdown must add to this). Efua: 1,100 in, 960 out by day 13 (fictional).',
};

export default lesson;
