import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2. Before/After: three ways to set a price. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Three ways to set a price',
  summary: 'David shows Clinton the three ways businesses set prices. WashDay used the first one without knowing it. The third one would have given a very different number.',
  minutes: 12,
  outcomes: [
    'Explain cost-plus, competitor-based and value-based pricing',
    'Work out a price each way',
    'Know why value-based pricing usually earns more',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Cost-plus vs value-based',
      before: {
        label: 'Cost-plus (what Clinton did)',
        text: 'Start from your cost: 1,000 to Mama Rose.\nAdd a bit: +500.\nPrice: 1,500.\nSimple, but it ignores what customers pay elsewhere and what they gain.',
      },
      after: {
        label: 'Value-based',
        text: 'Start from what the customer gets: no carrying, no lost Saturday, back to the door.\nCompare with their next-best option: Mama Rose, 2,400, carry it yourself.\nPrice below that, above your floor: about 1,800 to 2,000.\nIt captures more of the value you create.',
      },
      notes: [
        'Competitor-based is the third way: copy or undercut a rival\'s price. It\'s better than guessing, but assumes the rival priced well.',
        'Cost is still essential: it\'s the floor. Never price below it for long.',
        'Most good prices use all three: cost for the floor, competitors for context, value for the level.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ask: "What\'s their next-best option, and how much better are we?" That\'s the start of value-based pricing.',
    },
  ],
  apply: {
    scenario: 'Three ways to a price.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the method to how it works.',
        pairs: [
          ['Cost-plus', 'Your cost plus a margin'],
          ['Competitor-based', 'Copy or undercut a rival'],
          ['Value-based', 'What it\'s worth to the customer'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which method did Clinton use for 1,500 FCFA?',
        options: [
          { text: 'Cost-plus: 1,000 cost plus 500' },
          { text: 'Value-based', why: 'He never looked at value.' },
          { text: 'Competitor-based', why: 'He didn\'t look at Mama Rose\'s 2,400.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which method is this reasoning?',
        groups: ['Cost-plus', 'Competitor', 'Value'],
        items: [
          { text: '"My cost is 1,125, so charge 1,425"', group: 0 },
          { text: '"Mama Rose charges 2,400, so charge 2,300"', group: 1 },
          { text: '"Students save 3 hours and the hill climb"', group: 2 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Cost-plus with a 30% markup on a 1,125 cost. What is the price, in FCFA? (1,125 × 1.3, to the nearest franc)',
        answers: ['1463', '1,463', '1462.5', '1462'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Why not just copy Mama Rose\'s 2,400 then?',
        prompt: "David's best reply?",
        options: [
          { text: 'Yes, copy her exactly.', why: 'Different service, different value.' },
          { text: 'Never look at competitors.', why: 'They\'re essential context.' },
          { text: 'Her price is a good reference, but you\'re offering something different. Value-based asks what YOUR service is worth, using hers as the comparison.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Using all three.',
        template: 'Cost for the [[1]], competitors for context, [[2]] for the level.',
        blanks: [['floor'], ['value']],
        distractors: ['ceiling', 'luck'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does value-based pricing usually earn more?',
        options: [
          { text: 'It always means the highest price', why: 'It means the right price for the value.' },
          { text: 'It captures more of the value you create for the customer' },
          { text: 'It ignores costs', why: 'Cost is still the floor.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s new plan forgets the floor?',
        lines: [
          'Value: students save hours and the hill.',
          'Competitor: Mama Rose is 2,400.',
          'Saver option at 1,000 to win more students.',
          'Standard around 1,800 to 2,000.',
        ],
        bug: 2,
        fix: 'Saver must stay above the 1,125 cost.',
        explanation: '1,000 is below cost: every Saver bag would lose money.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'At 1,900 FCFA, with a cost of 1,125, what is the margin per bag?',
        answers: ['775'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps of value-based pricing.',
        lines: ['Know your cost (the floor)', 'Find the customer\'s next-best option', 'Work out what\'s better about yours', 'Set a price between floor and that option'],
      },
    ],
  },
  reflect: {
    prompt: 'Price your offer three ways: cost-plus, competitor-based and value-based. How far apart are the three numbers?',
    starters: ['Cost-plus gives...', 'Value-based gives...'],
  },
  deepen: {
    title: 'The pricing classic',
    summary: 'Nagle and Müller\'s textbook "The Strategy and Tactics of Pricing" argues that value-based pricing, grounded in costs and competition, is how strong businesses set prices.',
  },
  notes: 'Pricing methods: cost-plus, competitor-based, value-based (Nagle & Müller, The Strategy and Tactics of Pricing). 1,125 × 1.3 = 1,462.5. 1,900 − 1,125 = 775.',
};

export default lesson;
