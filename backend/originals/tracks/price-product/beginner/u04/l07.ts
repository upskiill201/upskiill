import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 7. Reading: rainy-day surcharge, fair or not? */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Rainy-day surcharge: fair or not?',
  summary: 'A friend suggests charging double on the rainiest Saturdays: "Everyone needs you then!" Clinton is tempted. Miracle sends him a famous study about snow shovels.',
  minutes: 12,
  outcomes: [
    'Know why price rises during a crisis feel unfair',
    'Tell cost-based increases from demand-based ones',
    'Choose fees customers accept',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The snow-shovel study',
      html: '<p>Economists Kahneman, Knetsch and Thaler asked people about a hardware store that raised the price of snow shovels from $15 to $20 the morning after a big snowstorm. <strong>82%</strong> said it was unfair. Same shovel, same shop: but raising the price because people suddenly need it felt like taking advantage.</p><p>Their research found a pattern:</p><ul><li><strong>Raising prices because your costs went up</strong> usually feels fair.</li><li><strong>Raising prices because customers are desperate</strong> usually feels unfair, and people remember.</li></ul><p>For WashDay:</p><ul><li>A rain-only "double price" would hit students exactly when they most need help. Brenda would remember it all semester.</li><li>The <strong>hill zone fee</strong> is different: it covers a real cost (moto-taxis), it\'s the same in all weather, and it\'s shown up front.</li><li>The new 1,800 price is explained by a real cost too: two washers paid fairly.</li></ul><p>Fair-feeling prices protect the thing a small business needs most: customers who trust you and tell their friends.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Price rises tied to your costs feel fair. Price rises tied to customers\' desperation feel unfair, and they\'re remembered.',
    },
  ],
  apply: {
    scenario: 'Fair or unfair?',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'In the study, what percentage of people said raising the snow-shovel price was unfair?',
        answers: ['82', '82%'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why did the snow-shovel rise feel unfair?',
        options: [
          { text: 'The shovels were bad', why: 'Same shovel; the reason for the price was the problem.' },
          { text: 'It took advantage of people\'s sudden need, not a rise in cost' },
          { text: '$20 is too much for anything', why: 'The same $20 might feel fine with a cost reason.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Likely to feel fair or unfair?',
        groups: ['Fair', 'Unfair'],
        items: [
          { text: 'Hill fee for moto-taxi costs, all year', group: 0 },
          { text: 'Double prices on the rainiest Saturdays', group: 1 },
          { text: 'A rise to pay a second washer', group: 0 },
          { text: 'A surprise exam-week price jump', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the price change to its reason.',
        pairs: [
          ['Hill zone fee', 'Real moto-taxi cost'],
          ['1,800 Standard', 'Two washers paid fairly'],
          ['Rain-only double price', 'Customers\' desperation'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'But on the rainiest days, demand doubles. Isn\'t charging more just business?',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Yes, charge whatever you can.', why: 'Short-term gain, long-term distrust.' },
          { text: 'Close on rainy days.', why: 'Those are the days students need him.' },
          { text: 'It might earn more for one weekend. Then every student remembers you charged double when they were stuck. Your hill fee already covers the real cost.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'What feels fair.',
        template: 'Rises tied to your [[1]] feel fair; rises tied to customers\' [[2]] feel unfair.',
        blanks: [['costs'], ['desperation', 'need']],
        distractors: ['logo', 'birthday'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is the hill fee the same in all weather?',
        options: [
          { text: 'Weather has no effect on costs', why: 'Rain matters; a steady fee is fairer and simpler.' },
          { text: 'It\'s predictable and tied to a real cost, not to bad weather' },
          { text: 'To confuse customers', why: 'It\'s meant to be clear.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s plan risks feeling unfair?',
        lines: [
          'Hill zone: +500 all year, shown on the card.',
          'Standard 1,800, explained by two washers.',
          'Storm days: everything doubles, announced that morning.',
          'Regulars keep 1,600 until month end.',
        ],
        bug: 2,
        fix: 'Delete it: keep prices steady in bad weather.',
        explanation: 'A same-day storm surcharge is the snow-shovel mistake.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'The shovel went from $15 to $20. How many dollars more was that?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the fairness check for a price change.',
        lines: ['What\'s the reason: cost or desperation?', 'Is it shown up front?', 'Is it the same for everyone in the same situation?', 'Would you be happy to explain it to a regular?'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time a price change felt unfair to you. Was it tied to the seller\'s costs, or your need?',
    starters: ['It felt unfair when...', 'Because it was tied to...'],
  },
  deepen: {
    title: 'Fairness and profit',
    summary: 'Kahneman, Knetsch and Thaler argued that fairness limits what businesses can charge, even when they could charge more. Small, local businesses depend on that trust even more than big ones.',
  },
  notes: 'Kahneman, Knetsch & Thaler (1986), "Fairness as a Constraint on Profit Seeking", American Economic Review 76(4): 82% rated raising snow-shovel price from $15 to $20 after a snowstorm unfair. WashDay fees fictional.',
};

export default lesson;
