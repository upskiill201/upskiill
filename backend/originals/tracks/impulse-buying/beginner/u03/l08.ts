import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8. Myth or Fact: "sales save you money". */
const lesson: OriginalLesson = {
  key: 'l08',
  title: '"Sales save you money"',
  summary: 'Yaw: "I saved GH₵600 at the sale!" Kofi: "How much did you spend?" "...GH₵900." Five myths about sales and savings, tested.',
  minutes: 10,
  outcomes: [
    'Tell "saving" from "spending less than the anchor"',
    'Use sales only for things you planned',
    'Count what you spent, not what you "saved"',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Buying something on sale always saves you money.',
          isFact: false,
          explain: 'Myth. You only save if you\'d have bought it anyway at full price. Otherwise you spent money you wouldn\'t have spent.',
        },
        {
          text: 'A sale on something you already planned to buy can genuinely save money.',
          isFact: true,
          explain: 'Fact. If it\'s on your list and the price is really lower than usual, that\'s a real saving. Kofi will use exactly this on Black Friday.',
        },
        {
          text: 'The "you saved GH₵600" on a receipt is money in your pocket.',
          isFact: false,
          explain: 'Myth. That number is the difference from the anchor price. The money in your pocket went down by what you spent.',
        },
        {
          text: 'Sales make people buy more items than they planned.',
          isFact: true,
          explain: 'Fact. Discounts lower the "ouch" of paying, and many shoppers leave sales with extra things they didn\'t come for.',
        },
        {
          text: 'If you don\'t buy during a sale, you\'ve lost money.',
          isFact: false,
          explain: 'Myth. Not buying something costs nothing. That\'s the cheapest option of all.',
        },
      ],
    },
    {
      kind: 'story',
      title: 'Yaw\'s maths',
      beats: [
        { speaker: 'yaw', text: 'I saved GH₵600 at the sale! It\'s on the receipt!' },
        { speaker: 'kofi', text: 'How much did you spend?' },
        { speaker: 'yaw', text: '...GH₵900.' },
        { speaker: 'kofi', text: 'And how much did you plan to spend when you walked in?' },
        { speaker: 'yaw', text: 'I walked in for socks.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'You only save on a sale if you\'d have bought it anyway. Count what you spent, not what the receipt says you "saved".',
    },
  ],
  apply: {
    scenario: 'Yaw\'s sale.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Sales always save money', group: 0 },
          { text: 'A sale on a planned item can save money', group: 1 },
          { text: 'Not buying during a sale loses money', group: 0 },
          { text: 'Sales make people buy more than planned', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Yaw walked in for socks (GH₵30) and spent GH₵900. How much more than planned did he spend?',
        answers: ['870', 'GH₵870', '870 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What does "you saved GH₵600" on a receipt really measure?',
        options: [
          { text: 'The difference from the anchor price, not money in your pocket' },
          { text: 'Money added to your account', why: 'Your account went down by GH₵900.' },
          { text: 'A refund', why: 'It\'s just a comparison.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'But the receipt says I saved GH₵600!',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'Your account says you spent GH₵900. If you only needed socks, you saved nothing and spent GH₵870 extra.' },
          { text: 'Nice saving!', why: 'He spent GH₵900.' },
          { text: 'Receipts lie.', why: 'The number is real; it just doesn\'t mean what it suggests.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'You only save if you\'d have bought it [[1]].',
        blanks: [['anyway']],
        distractors: ['later', 'twice'],
      },
      {
        kind: 'mcq',
        prompt: 'When is a sale genuinely good for Kofi?',
        options: [
          { text: 'When it\'s on his list and the price is really lower than usual' },
          { text: 'Whenever there\'s a big percentage off', why: 'Only if it\'s planned.' },
          { text: 'Never', why: 'Planned purchases on real sales are a real saving.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which thought is the sale trap?',
        lines: [
          'I need a charger; it\'s on my list.',
          'The charger is 20% off; I\'ll buy it.',
          'Everything else is 50% off too, so I\'d be losing money if I didn\'t buy more.',
        ],
        bug: 2,
        fix: 'I came for the charger. Not buying the rest costs nothing.',
        explanation: 'Not buying is free. "Losing money by not buying" is the sale\'s story, not yours.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the purchase to what it really is.',
        pairs: [
          ['Planned item, real discount', 'A real saving'],
          ['Unplanned item, big discount', 'Extra spending'],
          ['Not buying', 'Free'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A planned charger: usually GH₵80, on sale for GH₵64. How much is genuinely saved?',
        answers: ['16', 'GH₵16', '16 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to shop a sale.',
        lines: ['Write your list before you go', 'Check the usual price', 'Buy only list items on real discount', 'Leave the rest'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of the last sale you shopped. What did you go for? What did you spend?',
    starters: ['I went for...', 'I spent...'],
  },
  deepen: {
    title: 'The receipt trick',
    summary: 'Some shops print "You saved GH₵X today!" in big letters at the bottom of receipts. It\'s a nice feeling, and it\'s designed to make you come back. Your bank balance is the only "saved" number that counts.',
  },
  notes: 'Discounts and unplanned purchases: well documented in retail research (e.g. Inman, Winer & Ferraro 2009 on unplanned buying); stated qualitatively. Fictional prices.',
};

export default lesson;
