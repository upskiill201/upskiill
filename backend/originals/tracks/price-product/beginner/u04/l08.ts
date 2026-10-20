import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 8. Myth or Fact: price psychology, 1,800 or 1,750? */
const lesson: OriginalLesson = {
  key: 'l08',
  title: '1,800 or 1,750?',
  summary: 'Clinton has read that prices ending in 9 sell better. Should Standard be 1,799? 1,750? David checks what the research really says, and what works with Mobile Money. Fact or myth?',
  minutes: 11,
  outcomes: [
    'Know what charm pricing is and how strong the evidence is',
    'Choose round or precise prices sensibly',
    'Focus on what matters more than the last digits',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Prices ending in 9 always sell much better.',
          isFact: false,
          explain: 'Myth, as stated. Some experiments found 9-endings lifted sales (in one mail-order test, a $39 dress outsold the same dress at $34 and $44). Others found little effect. It depends on the product and customers.',
        },
        {
          text: 'Simple round prices are easier for customers to remember and pay.',
          isFact: true,
          explain: 'Fact. "1,800 a bag" is easy to say, remember and send on Mobile Money. In markets where coins are rarely used for small change, round prices are normal and trusted.',
        },
        {
          text: 'The last digits matter more than value, options and fairness.',
          isFact: false,
          explain: 'Myth. Getting the value, options and explanation right matters far more than 1,799 vs 1,800.',
        },
        {
          text: 'People notice price changes against the price they knew before.',
          isFact: true,
          explain: 'Fact. Regulars compare 1,800 with 1,500. That\'s why the explanation and the regular-customer offer matter more than the exact number.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Choose simple, honest prices, and spend your energy on value and explanation, not on the last digit.',
    },
  ],
  apply: {
    scenario: 'The last digits.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: '9-endings always sell much better', group: 0 },
          { text: 'Round prices are easy to remember and pay', group: 1 },
          { text: 'Digits matter more than value', group: 0 },
          { text: 'People compare with the old price', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'In the mail-order experiment, which price sold the most of the same dress?',
        options: [
          { text: '$39' },
          { text: '$34', why: 'Surprisingly, the cheaper price sold less.' },
          { text: '$44', why: '$39 sold the most.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'If Standard were 1,750 instead of 1,800 (cost 1,125), what would the margin be, in FCFA?',
        answers: ['625'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the price to its likely effect.',
        pairs: [
          ['1,800', 'Simple to say and pay'],
          ['1,799', 'Awkward for Mobile Money, little gain'],
          ['1,750', '50 less margin on every bag'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Should I make Standard 1,799 to "look cheaper"?',
        prompt: "David's best reply?",
        options: [
          { text: 'Here, 1,800 is simpler, and students compare with Mama Rose and your old price, not the last digit. Keep it round.' },
          { text: 'Yes, always use 99.', why: 'The evidence is mixed, and here it\'s awkward.' },
          { text: 'Make it 1,801 to stand out.', why: 'Odd for no reason.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Where to spend your energy.',
        template: 'On value and [[1]], not on the last [[2]].',
        blanks: [['explanation', 'options'], ['digit', 'digits']],
        distractors: ['logos', 'font'],
      },
      {
        kind: 'mcq',
        prompt: 'Across 80 bags a month, how much margin would 1,750 give up compared with 1,800?',
        options: [
          { text: '4,000 FCFA' },
          { text: '50 FCFA', why: 'That\'s per bag: 80 × 50.' },
          { text: '400 FCFA', why: '80 × 50 = 4,000.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s pricing notes gets priorities wrong?',
        lines: [
          'Explain the rise: two washers, no bag turned away.',
          'Keep regulars at 1,600 until month end.',
          'Spend a week deciding between 1,799 and 1,800.',
          'Test the card on Hostel A first.',
        ],
        bug: 2,
        fix: 'Pick 1,800 and move on.',
        explanation: 'The last digit matters far less than the rest of the list.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Regulars compare the new 1,800 with which old price, in FCFA?',
        answers: ['1500', '1,500'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what matters most when raising a price, most to least.',
        lines: ['Real value to the customer', 'A fair, explained reason', 'Clear options', 'The last digits of the price'],
      },
    ],
  },
  reflect: {
    prompt: 'Do your prices end in round numbers or 9s? Would changing the ending really matter for your customers?',
    starters: ['My prices end in...', 'For my customers...'],
  },
  deepen: {
    title: 'Charm pricing, carefully',
    summary: 'Anderson and Simester\'s experiments found 9-endings can lift demand, especially for items customers can\'t easily compare. The effect isn\'t universal, and it can make a premium service look cheap.',
  },
  notes: 'Anderson & Simester (2003), "Effects of $9 Price Endings on Retail Sales", Quantitative Marketing and Economics 1: a dress sold more at $39 than at $34 or $44. Effects vary by context. 1,750 margin 625; 80 bags × 50 = 4,000.',
};

export default lesson;
