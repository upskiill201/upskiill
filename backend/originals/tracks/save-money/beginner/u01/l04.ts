import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4. Before/After: what "small payments" really cost. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'What "small payments" really cost',
  summary: 'Yaw\'s cousin\'s laptop deal, written two ways: the poster in the shop window, and the same deal written honestly. Same laptop, same numbers. Very different story.',
  minutes: 11,
  outcomes: [
    'Rewrite any instalment offer as a total cost',
    'Find the true extra you pay for "today"',
    'Know when paying monthly can make sense',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'The poster vs the truth',
      before: {
        label: 'The shop poster',
        text: 'TAKE IT HOME TODAY!\nOnly GH₵480 a month\nNo big payment\nEasy approval, any student',
      },
      after: {
        label: 'The same deal, honestly',
        text: 'Laptop cash price: GH₵3,500\nYou pay: GH₵480 × 12 months = GH₵5,760\nExtra cost of having it today: GH₵2,260\nThat\'s 65% more than the cash price\nMiss a payment: late fee, and the laptop can be taken back',
      },
      notes: [
        'Posters lead with the monthly number because it sounds small. Always multiply it out.',
        'The extra GH₵2,260 is the price of getting it 16 weeks earlier.',
        'Ask what happens if you miss a payment. With some deals, you lose the laptop and the money already paid.',
        'Paying monthly can make sense when the item is urgent and the total extra is small. Here it\'s neither.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Rewrite every "small payments" offer in three lines: cash price, total you\'ll pay, and the extra. Then decide.',
    },
  ],
  apply: {
    scenario: 'Reading the deal honestly.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Total GH₵5,760 minus cash price GH₵3,500. What\'s the extra?',
        answers: ['2260', '2,260', 'GH₵2,260', 'GH₵2260'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why do posters lead with the monthly price?',
        options: [
          { text: 'Because it sounds small, even when the total is large' },
          { text: 'Because it\'s the law', why: 'Rules vary, but the choice to lead with it is marketing.' },
          { text: 'Because the total is cheaper', why: 'The total is GH₵2,260 more.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Poster words or honest words?',
        groups: ['Poster', 'Honest'],
        items: [
          { text: '"Only GH₵480 a month"', group: 0 },
          { text: '"Total: GH₵5,760"', group: 1 },
          { text: '"Take it home today!"', group: 0 },
          { text: '"Late payment: laptop can be taken back"', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The three lines.',
        template: 'Cash [[1]], [[2]] you\'ll pay, and the [[3]].',
        blanks: [['price'], ['total'], ['extra']],
        distractors: ['colour', 'discount'],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'But you get it 16 weeks earlier! That\'s worth something.',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'It\'s worth something, but not GH₵2,260. Efua\'s old laptop covers me until then.' },
          { text: 'You\'re right, time is money.', why: 'True in general. GH₵2,260 for 16 weeks is a very high price for it.' },
          { text: 'Nothing is worth anything.', why: 'Getting things sooner has value. The question is how much.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'GH₵2,260 extra on a GH₵3,500 laptop is roughly what percent more?',
        options: [
          { text: 'About 25%', why: '25% of 3,500 is 875.' },
          { text: 'About 65%' },
          { text: 'About 165%', why: 'The total is about 165% of the price; the extra is about 65%.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which question did Yaw forget to ask the shop?',
        lines: [
          'How much a month? GH₵480.',
          'Can I take it today? Yes.',
          'Do I need ID? Student ID is fine.',
          'What happens if I miss a payment? Didn\'t ask.',
        ],
        bug: 3,
        fix: 'Ask about missed payments before signing anything.',
        explanation: 'Some deals let the seller take the item back and keep what you\'ve paid.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Rewrite each poster honestly. Match the offer to its total.',
        pairs: [
          ['GH₵100 a month for 6 months', 'GH₵600 total'],
          ['GH₵250 a month for 10 months', 'GH₵2,500 total'],
          ['GH₵60 a week for 20 weeks', 'GH₵1,200 total'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'When might paying monthly make sense?',
        options: [
          { text: 'When it\'s urgent and the total extra is small' },
          { text: 'Whenever the monthly price sounds small', why: 'Monthly prices always sound small. Check the total.' },
          { text: 'Never', why: 'Sometimes, for urgent needs with a fair total, it\'s reasonable.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A phone costs GH₵1,200 cash, or GH₵110 a month for 12 months. What\'s the extra?',
        answers: ['120', 'GH₵120', '120 cedis'],
        placeholder: 'A number',
        explanation: '110 × 12 = 1,320. 1,320 − 1,200 = 120. Much smaller than the laptop deal. Still check what happens if you miss a month.',
      },
    ],
  },
  reflect: {
    prompt: 'Think of something you bought, or nearly bought, on monthly payments. What was the total? What was the extra?',
    starters: ['I bought / nearly bought...', 'The total was...', 'The extra was...'],
  },
  deepen: {
    title: 'Check the rules where you live',
    summary: 'Many countries require sellers to show the total cost or an interest rate for credit and instalment deals. If a seller won\'t tell you the total in writing, walk away.',
  },
  notes: 'Fictional deal: 480 × 12 = 5,760 vs 3,500 → extra 2,260 (64.6%). Phone example: 110 × 12 = 1,320 vs 1,200 (10%). No provider named. Repossession terms vary by contract and jurisdiction; stated as "some deals".',
};

export default lesson;
