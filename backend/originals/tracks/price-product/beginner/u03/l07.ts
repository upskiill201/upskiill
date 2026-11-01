import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7. Chat with Tey: the Saturday Plan, a monthly subscription. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'The Saturday Plan',
  summary: 'Brenda books every single weekend. Why make her pay four times a month? Tey helps Clinton design a monthly plan: four Standard bags for one price, paid at the start of the month.',
  minutes: 12,
  outcomes: [
    'Design a simple monthly plan',
    'Work out its price per use and margin',
    'Know why plans help both sides',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'The Saturday Plan: four Standard bags a month for 6,400 FCFA, paid on the 1st. That\'s 1,600 a bag instead of 1,800.', replies: ['Why give a discount?'] },
        { tey: 'Because Clinton gets something too: money he can count on, washer slots he can book in advance, and customers who don\'t drift away. Each plan bag still earns 1,600 − 1,125 = 475.', replies: ['And for Brenda?'] },
        { tey: 'She saves 800 a month and never thinks about paying again. Research on the "pain of paying" suggests that paying once, ahead of time, makes each use feel free.', replies: ['What if she misses a week?'] },
        { tey: 'Be fair: one unused bag rolls over to next month. That keeps trust. And write it down clearly, so nobody feels tricked.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A good plan gives the customer a saving and simplicity, and gives you predictable money and loyal customers.',
    },
  ],
  apply: {
    scenario: 'Designing the plan.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'The plan is 6,400 FCFA for 4 bags. What is that per bag, in FCFA?',
        answers: ['1600', '1,600'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Four Standard bags would normally cost 7,200. How much does a plan member save each month?',
        options: [
          { text: '1,600 FCFA', why: '7,200 − 6,400 = 800.' },
          { text: '200 FCFA', why: 'That\'s the saving per bag.' },
          { text: '800 FCFA' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Each plan bag earns 475 margin. What does one member earn Clinton in a month (4 bags), in FCFA?',
        answers: ['1900', '1,900'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Who does this part of the plan help most?',
        groups: ['Customer', 'Clinton'],
        items: [
          { text: 'Saves 800 a month', group: 0 },
          { text: 'Money arrives on the 1st', group: 1 },
          { text: 'Never thinks about paying', group: 0 },
          { text: 'Can book washer slots ahead', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'If a member misses a week, I keep the money. That\'s extra profit!',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Yes, unused bags are free money.', why: 'It erodes trust and leads to cancellations.' },
          { text: 'Short-term, yes. But if members feel they\'re paying for nothing, they cancel and tell friends. Let one unused bag roll over.' },
          { text: 'Refund every unused bag in cash.', why: 'A rollover is simpler and fair.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the plan term to its meaning.',
        pairs: [
          ['6,400 a month', 'The plan price'],
          ['1,600 a bag', 'Price per use'],
          ['475 a bag', 'Clinton\'s margin per use'],
          ['Rollover', 'One unused bag moves to next month'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Why plans work.',
        template: 'The customer gets a [[1]] and simplicity; the business gets [[2]] money.',
        blanks: [['saving'], ['predictable']],
        distractors: ['fee', 'random'],
      },
      {
        kind: 'mcq',
        prompt: '10 students join the plan. How much margin is Clinton sure of each month?',
        options: [
          { text: '64,000 FCFA', why: 'That\'s total plan money in, not margin.' },
          { text: '4,750 FCFA', why: '10 × 1,900 = 19,000.' },
          { text: '19,000 FCFA' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the plan\'s rules is unfair?',
        lines: [
          'Four Standard bags a month for 6,400.',
          'Paid on the 1st by Mobile Money.',
          'Unused bags are lost, and we don\'t mention this anywhere.',
          'Cancel any time before the 1st.',
        ],
        bug: 2,
        fix: 'One unused bag rolls over; the rule is written on the card.',
        explanation: 'Hidden rules that take customers\' money break trust.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps to design a plan.',
        lines: ['Find customers who buy regularly', 'Bundle a month of use', 'Price it a little below paying each time', 'Check the margin per use', 'Write fair, clear rules'],
      },
    ],
  },
  reflect: {
    prompt: 'Do any of your customers buy regularly? What would a simple monthly plan look like, and what would each use earn you?',
    starters: ['A plan could be...', 'Each use would earn...'],
  },
  deepen: {
    title: 'The pain of paying',
    summary: 'Prelec and Loewenstein found that how and when we pay changes how much a purchase "hurts". Paying ahead makes each use feel free, one reason plans and memberships are popular.',
  },
  notes: 'Fictional plan: 4 Standard bags for 6,400 FCFA/month (1,600/bag vs 1,800); saving 800; margin 475/bag, 1,900/member/month; 10 members = 19,000. Pain of paying: Prelec & Loewenstein (1998), Marketing Science 17(1).',
};

export default lesson;
