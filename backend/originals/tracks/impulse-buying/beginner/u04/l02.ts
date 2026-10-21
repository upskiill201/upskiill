import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 2. Step-by-step: how "pay later" really works. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'How "pay later" really works',
  summary: 'Yaw thought pay later was free. Sometimes it is, until it isn\'t. Step by step, here\'s how these plans work, how they make money, and how three small plans become one big problem.',
  minutes: 12,
  outcomes: [
    'Explain how buy-now-pay-later plans work',
    'Know where the costs and risks are',
    'Spot when several small plans have become too many',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Pay later, step by step',
      steps: [
        { title: '1. The offer', body: 'At checkout: "Pay in 4 interest-free payments!" GH₵600 sneakers become 4 × GH₵150, the first one today.' },
        { title: '2. How the provider earns', body: 'Often the shop pays the provider a fee, because shoppers using pay later tend to buy more and spend bigger. Some plans also charge interest, and many charge late fees.' },
        { title: '3. The approval is easy', body: 'Approval can take seconds, sometimes with little checking of whether you can afford it. That\'s convenient, and it\'s how people end up with more than they can pay.' },
        { title: '4. The payments come out automatically', body: 'From your card or wallet, on set dates. If the money isn\'t there, the payment fails.' },
        { title: '5. Missed payments cost', body: 'Late fees, the account frozen, debts passed to collectors, and with some lenders, messages to your contacts or damage to your credit record.' },
        { title: '6. Stacking', body: 'Each plan looks small. Three apps with four plans each is twelve payments a month, all on different dates. Yaw had nine. That\'s when "small small" becomes GH₵2,900.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Pay later is still borrowing. Before using it: can I pay the full price today? If not, I probably can\'t afford it. And never have more than one plan running at a time.',
    },
  ],
  apply: {
    scenario: 'Reading the small print.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order how a pay-later plan goes wrong.',
        lines: ['Easy approval at checkout', 'First payment today', 'Payments come out automatically', 'One fails', 'Late fees and collectors'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Sneakers GH₵600 in 4 payments. How much is each payment?',
        answers: ['150', 'GH₵150', '150 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'How do many pay-later providers make money if there\'s no interest?',
        options: [
          { text: 'Shops pay them a fee, and late fees add more' },
          { text: 'They don\'t make money', why: 'They\'re businesses; they earn from shops and fees.' },
          { text: 'The government pays them', why: 'Shops and customers pay.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'A risk of pay later, or not?',
        groups: ['Risk', 'Not a risk'],
        items: [
          { text: 'Late fees', group: 0 },
          { text: 'Several plans on different dates', group: 0 },
          { text: 'Paying the full price today with money you have', group: 1 },
          { text: 'Easy approval without checking you can afford it', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'But it\'s interest-free! How is it borrowing?',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'You get the thing now and pay later. That\'s borrowing. Interest-free just means it\'s cheap borrowing, until you miss one.' },
          { text: 'You\'re right, it isn\'t.', why: 'It\'s a debt with conditions.' },
          { text: 'It\'s a scam.', why: 'It\'s a legal product. The risks are real but manageable if used rarely.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The test before using pay later.',
        template: 'Can I pay the full [[1]] today? If not, I probably can\'t [[2]] it.',
        blanks: [['price'], ['afford']],
        distractors: ['tip', 'return'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Three apps, three plans each, four payments per plan. How many payments in total?',
        answers: ['36', 'thirty-six'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which belief led Yaw into stacking?',
        lines: [
          'Each plan is only GH₵150 a month.',
          'I can always add one more.',
          'I keep track of every payment date.',
        ],
        bug: 1,
        fix: 'One plan at a time, at most.',
        explanation: '"One more" each time is how nine plans happen.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each pay-later step to the risk.',
        pairs: [
          ['Easy approval', 'Borrowing more than you can afford'],
          ['Automatic payments', 'Failed payments if money\'s short'],
          ['Many small plans', 'Losing track of dates'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why do shops like offering pay later?',
        options: [
          { text: 'Shoppers using it tend to buy more and spend more' },
          { text: 'It\'s cheaper for the shop', why: 'Shops often pay a fee.' },
          { text: 'Customers demand it', why: 'Mainly because it increases sales.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Do you have any pay-later plans running? List them: amount, payments left, dates.',
    starters: ['My plans:...', 'Payments left:...'],
  },
  deepen: {
    title: 'Regulators are watching',
    summary: 'Consumer regulators in several countries have studied buy-now-pay-later and raised concerns about easy approval, late fees and people stacking several plans. Rules are changing. Wherever you are, read the terms and keep to one plan at most.',
  },
  notes: 'BNPL business model (merchant fees, late fees) and stacking concerns: e.g. US CFPB (2022) BNPL market report; UK FCA Woolard Review (2021); stated generally. Yaw had nine payments outstanding (fictional).',
};

export default lesson;
