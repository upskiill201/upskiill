import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3. Card deck: the cost of one bag. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'The cost of one bag',
  summary: 'David and Clinton put a number next to every cost. The total for one ordinary bag isn\'t 1,000 FCFA. It\'s 1,125, before Clinton\'s own time.',
  minutes: 12,
  outcomes: [
    'Work out the full cost of one sale',
    'Spread running costs across sales',
    'See what is really left from the price',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>David\'s cost sheet for one ordinary bag, on a dry day, in a nearby hostel:</p><table><tr><th>Cost</th><th>Per bag</th></tr><tr><td>Mama Rose\'s washing</td><td>1,000 FCFA</td></tr><tr><td>Plastic bag and name tag</td><td>50 FCFA</td></tr><tr><td>Mobile Money fees (about 2% of 1,500)</td><td>30 FCFA</td></tr><tr><td>Bike repairs and phone data: 3,600 FCFA a month ÷ 80 bags a month</td><td>45 FCFA</td></tr><tr><td><strong>Total cost per bag</strong></td><td><strong>1,125 FCFA</strong></td></tr></table><p>The price is 1,500 FCFA. So Clinton keeps <strong>375 FCFA</strong> a bag, not 500. And that 375 still has to pay for his time and leave a buffer.</p><p>Look at the running costs line. Bike repairs and data cost about 3,600 FCFA a month whatever happens. Spread over 80 bags a month, that\'s 45 a bag. In a slow month with 40 bags, it\'s 90 a bag. The cost of one bag depends on how many you sell.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Cost per sale = direct cost + supplies + fees + (running costs ÷ number of sales).',
    },
  ],
  apply: {
    scenario: 'David\'s cost sheet.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Add them up: 1,000 + 50 + 30 + 45. What is the cost of one bag, in FCFA?',
        answers: ['1125', '1,125'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'At 1,500 FCFA a bag, how much does Clinton really keep per bag?',
        options: [
          { text: '500 FCFA', why: 'That ignores bags, fees and running costs.' },
          { text: '375 FCFA' },
          { text: '1,125 FCFA', why: 'That\'s the cost, not what he keeps.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each cost to its amount per bag.',
        pairs: [
          ['Mama Rose', '1,000 FCFA'],
          ['Bag and tag', '50 FCFA'],
          ['Mobile Money fees', '30 FCFA'],
          ['Repairs and data share', '45 FCFA'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Running costs are 3,600 FCFA a month. In a slow month with only 40 bags, what is the share per bag?',
        answers: ['90'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: '45 francs a bag for repairs and data? That\'s tiny, I\'ll ignore it.',
        prompt: "David's best reply?",
        options: [
          { text: 'Yes, ignore small costs.', why: 'Small costs add up.' },
          { text: 'Charge 45 extra only on rainy days.', why: 'It\'s a cost on every bag, rain or shine.' },
          { text: 'Tiny per bag, 3,600 a month in total. Ignore enough tiny costs and your 500 becomes 375 without you noticing.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Spreading running costs.',
        template: 'Running costs ÷ number of [[1]] = running cost per [[2]].',
        blanks: [['bags', 'sales'], ['bag', 'sale']],
        distractors: ['days', 'hour'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does the cost of one bag go up in a slow month?',
        options: [
          { text: 'Mama Rose charges more', why: 'Her price stays 1,000.' },
          { text: 'The same running costs are spread over fewer bags' },
          { text: 'It doesn\'t change', why: 'The running-cost share per bag rises.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s first cost sheet is wrong?',
        lines: [
          'Mama Rose: 1,000 FCFA.',
          'Bag and tag: 50 FCFA.',
          'Mobile Money: free.',
          'Repairs and data: 45 FCFA.',
        ],
        bug: 2,
        fix: 'Mobile Money: about 30 FCFA a bag (2% of 1,500).',
        explanation: 'Cashing out to pay Mama Rose costs fees.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is 2% of 1,500 FCFA?',
        answers: ['30'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Same on every bag, or depends on how many bags?',
        groups: ['Same on every bag', 'Depends on volume'],
        items: [
          { text: 'Mama Rose\'s 1,000', group: 0 },
          { text: 'The repairs-and-data share', group: 1 },
          { text: 'Bag and tag', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Make a cost sheet for one sale of your own product or hour. What is the total?',
    starters: ['My direct cost is...', 'The total per sale is...'],
  },
  deepen: {
    title: 'Fixed and variable',
    summary: 'Costs that come with every sale are variable; costs that stay the same whatever you sell are fixed. Lesson 8 uses that split to find the break-even point.',
  },
  notes: 'Fictional cost sheet: Mama Rose 1,000; bag and tag 50; Mobile Money ~2% of 1,500 = 30 (illustrative fee rate; real Mobile Money fees in Cameroon vary by operator and amount); repairs + data 3,600 FCFA/month ÷ 80 bags = 45. Total 1,125; margin 375 at 1,500.',
};

export default lesson;
