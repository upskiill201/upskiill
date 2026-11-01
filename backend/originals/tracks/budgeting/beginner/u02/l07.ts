import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7. Chat with Tey: priorities when you can't pay for everything. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'What gets paid first',
  summary: 'Day 17. The hall dues reminder arrives the same morning his data runs out and the football team asks for GH₵30 for new bibs. GH₵100 can\'t cover everything. What comes first?',
  minutes: 11,
  outcomes: [
    'Rank costs when money can\'t cover everything',
    'Protect the "keep you going" needs first',
    'Say "not this month" without guilt',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Day 17. Yaw paid back GH₵100 of the GH₵200, so Kofi has about GH₵140. Then three requests in one morning: hall dues GH₵20, data GH₵20, football bibs GH₵30. Plus food.', replies: ['Can\'t he just pay all of it?'] },
        { tey: 'He could, and then have GH₵70 for food for 13 days. That\'s the trap: paying whoever asks first, or loudest.', replies: ['So how do you choose?'] },
        { tey: 'Use an order. First: the things that keep you alive and safe. Food, water, medicine, a safe place to sleep.', replies: ['Then?'] },
        { tey: 'Second: the things that keep your income or studies going. For Kofi: data for the class portal, printing his lab report, getting to class. Third: costs with a real penalty if late, like dues with a fine, or a debt.', replies: ['And the bibs?'] },
        { tey: 'Fourth: everything else. Wants, extras, nice-to-haves. The bibs can wait. A kind "not this month, next month I\'m in" usually lands fine.', replies: ['What if someone gets annoyed?'] },
        { tey: 'Some will. But people respect "I\'m sorting my money out" far more than you\'d think. And no friendship is worth not eating for.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Order when money is short: 1. Stay alive and safe. 2. Keep your income or studies going. 3. Costs with real penalties. 4. Everything else.',
    },
  ],
  apply: {
    scenario: 'Day 17: three requests, one small balance.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put Tey\'s priority order in place.',
        lines: ['Stay alive and safe', 'Keep income or studies going', 'Costs with real penalties', 'Everything else'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which level is each of Kofi\'s costs?',
        groups: ['1: Alive and safe', '2: Studies going', '4: Everything else'],
        items: [
          { text: 'Food for the next 13 days', group: 0 },
          { text: 'Printing his lab report', group: 1 },
          { text: 'Football bibs', group: 2 },
          { text: 'Data for the class portal', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the trap Tey warns about?',
        options: [
          { text: 'Paying whoever asks first or loudest' },
          { text: 'Paying for food', why: 'Food is level 1. Always first.' },
          { text: 'Saying no to friends', why: 'Saying "not this month" kindly is part of the solution.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'Bro, the team needs GH₵30 for bibs today. You\'re in, right?',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'Sure, here.', why: 'It comes straight out of his food money.' },
          { text: 'Not this month, I\'m sorting my money out. Next month I\'m in, promise.' },
          { text: 'Bibs are a waste of money.', why: 'They\'re not a waste for the team, just not a priority for him this month.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'GH₵140 − dues GH₵20 − data GH₵20. How much is left for food and everything else?',
        answers: ['100', 'GH₵100', '100 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'A kind no.',
        template: 'Not this [[1]]. Next month I\'m [[2]].',
        blanks: [['month'], ['in']],
        distractors: ['year', 'out'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each cost to its level, for someone with a job.',
        pairs: [
          ['Rent', '1: Alive and safe'],
          ['Bus fare to work', '2: Income going'],
          ['A loan repayment with late fees', '3: Real penalty'],
          ['A concert ticket', '4: Everything else'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which payment decision is out of order?',
        lines: [
          'Buy food staples for the week.',
          'Pay for data for the class portal.',
          'Chip in GH₵50 for a friend\'s birthday cake before buying food.',
        ],
        bug: 2,
        fix: 'Buy food first; offer to help with the cake next month, or contribute time instead.',
        explanation: 'A gift is level 4. Food is level 1. Kindness is good; not eating isn\'t.',
      },
      {
        kind: 'mcq',
        prompt: 'Why are hall dues with a late fine "level 3"?',
        options: [
          { text: 'Because being late costs extra money' },
          { text: 'Because they\'re fun', why: 'Dues aren\'t fun. They have a penalty if late.' },
          { text: 'They aren\'t; they\'re level 1', why: 'They won\'t keep him alive. But skipping them costs more later.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Kofi feels guilty saying no to the team. What\'s the healthiest thought?',
        options: [
          { text: '"I\'m a bad friend."', why: 'Saying "not this month" while sorting out money isn\'t bad friendship.' },
          { text: '"I\'ll pay and skip meals."', why: 'That swaps a want for a need. The wrong way round.' },
          { text: '"A short no now beats being broke and stressed for two weeks."' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'If your money were cut in half next month, what would be on level 1 and 2 for you? What could wait?',
    starters: ['Level 1 for me is...', 'Level 2 is...', 'These could wait:...'],
  },
  deepen: {
    title: 'When level 1 can\'t be covered',
    summary: 'If you can\'t cover food, medicine or a safe place to stay, that\'s not a budgeting problem; it\'s a reason to ask for help now. Talk to family, your school\'s student support or welfare office, or a trusted community group. Asking early is a strength.',
  },
  notes: 'Story numbers (fictional): day 17, Yaw repays GH₵100 of 200; Kofi ~GH₵140 (63 + 100 − spending to day 17 ≈ 23). Hall dues 20 (fine if late), data 20, bibs 30.',
};

export default lesson;
