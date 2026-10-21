import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3. Step-by-step: anchors, "was GH₵1,600". */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Was GH₵1,600, now GH₵480',
  summary: 'Mum shows Kofi how a first number sticks in a buyer\'s head, and why the boots\' "was GH₵1,600" made GH₵480 feel like a steal. Step by step, here\'s how anchoring works and how to drop the anchor.',
  minutes: 11,
  outcomes: [
    'Explain anchoring in plain words',
    'Spot anchors on price tags and sales pages',
    'Find the real price before deciding',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'How an anchor works, and how to drop it',
      steps: [
        { title: '1. The first number sticks', body: 'In a famous experiment, people\'s guesses about a number were pulled towards a random number they\'d just seen (Tversky and Kahneman, 1974). The first number you see becomes the "anchor" everything else is judged against.' },
        { title: '2. Sellers choose the anchor', body: '"Was GH₵1,600" makes GH₵480 feel tiny. At Makola, Mum hears traders open with a high price so the "discount" feels generous. A first price is often a starting point, not the value.' },
        { title: '3. Notice the anchor', body: 'Any "was", "RRP", "normally" or crossed-out price is an anchor. So is the first price someone says in a haggle.' },
        { title: '4. Ask: says who?', body: 'Was it ever really GH₵1,600? Did anyone pay that? Often the "was" price was briefly set, or never charged at all.' },
        { title: '5. Find your own anchor', body: 'Check what the same item costs at two or three other places. Kofi: GH₵420 to GH₵520 in Adum. That\'s the real anchor.' },
        { title: '6. Judge against the real price', body: 'GH₵480 against GH₵1,600 is "70% off". GH₵480 against GH₵420 to GH₵520 is "a normal price". Same number, different story.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ignore the seller\'s anchor. Set your own by checking two or three other prices, then judge the deal against that.',
    },
  ],
  apply: {
    scenario: 'Dropping the anchor.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order how to drop an anchor.',
        lines: ['Notice the anchor', 'Ask: says who?', 'Check two or three other prices', 'Judge against the real price'],
      },
      {
        kind: 'mcq',
        prompt: 'What is an anchor?',
        options: [
          { text: 'A first number that everything else gets judged against' },
          { text: 'The cheapest price', why: 'Anchors are often high, on purpose.' },
          { text: 'A fixed price set by law', why: 'It\'s about how our minds judge numbers.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Anchor or real price information?',
        groups: ['Anchor', 'Real price information'],
        items: [
          { text: '"Was GH₵1,600"', group: 0 },
          { text: 'Three shops selling it for GH₵420 to GH₵520', group: 1 },
          { text: '"RRP GH₵900"', group: 0 },
          { text: 'What you paid for the same thing last month', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'GH₵480 compared with the "was" price of GH₵1,600. What percent off does that claim? (Round to the nearest whole number.)',
        answers: ['70', '70%', '70 percent'],
        placeholder: 'A percent',
      },
      {
        kind: 'mcq',
        prompt: 'Against real prices of GH₵420 to GH₵520, what was GH₵480?',
        options: [
          { text: 'A normal price, not a bargain' },
          { text: 'An amazing 70% off', why: 'Only against the made-up anchor.' },
          { text: 'Very expensive', why: 'It\'s in the normal range.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'Mum, a trader just asked GH₵300 for this bag. Should I offer GH₵250?',
        prompt: 'What would Mum say?',
        options: [
          { text: 'GH₵300 is just where she started. Ask two other stalls first. If they say GH₵150, GH₵250 is no deal at all.' },
          { text: 'Yes, GH₵250 is a big discount.', why: 'Only against her anchor.' },
          { text: 'Pay GH₵300; it\'s polite.', why: 'Opening prices in markets are made to be negotiated.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The question for any "was" price.',
        template: 'Says [[1]]? Did anyone ever [[2]] that?',
        blanks: [['who'], ['pay']],
        distractors: ['when', 'see'],
      },
      {
        kind: 'findBug',
        prompt: 'Which thought is the anchor working on Kofi?',
        lines: [
          'This speaker is GH₵350.',
          'It says "was GH₵900", so GH₵350 must be a great deal.',
          'Let me check two other shops first.',
        ],
        bug: 1,
        fix: 'GH₵350 is a good deal only if other shops charge more.',
        explanation: 'The "was" price is the seller\'s anchor. The real test is other prices.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each anchor to where you\'d see it.',
        pairs: [
          ['Crossed-out price', 'Online sales page'],
          ['A high opening price', 'Market haggling'],
          ['"Normally GH₵200"', 'Shop sign'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'In Tversky and Kahneman\'s experiment, what happened to people\'s guesses?',
        options: [
          { text: 'They were pulled towards a random number they\'d just seen' },
          { text: 'They were always correct', why: 'The anchor pulled them off.' },
          { text: 'Nothing; the number had no effect', why: 'That\'s why it\'s famous: even random numbers had an effect.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a "deal" you were pleased with. What was the anchor? What would other places have charged?',
    starters: ['The anchor was...', 'Other places charge...'],
  },
  deepen: {
    title: 'Fake "was" prices',
    summary: 'In many countries, consumer laws say a "was" price must be genuine: the item must really have been sold at that price for a reasonable time. Enforcement varies, and many pages still use them. Treat every "was" price as a claim to check.',
  },
  notes: 'Tversky, A., & Kahneman, D. (1974). Judgment under uncertainty: Heuristics and biases. Science, 185(4157), 1124–1131 (wheel-of-fortune anchoring). 1 − 480/1600 = 70%. Reference-price rules (e.g. UK CMA guidance; EU Omnibus Directive 30-day prior price); stated generally.',
};

export default lesson;
