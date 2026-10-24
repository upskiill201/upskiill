import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 3. Card deck: price in hours, cost per use. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Price in hours, cost per use',
  summary: 'Two numbers that make any price honest: how many hours of your life it costs, and what it costs each time you use it. Kofi runs both on his Black Friday list.',
  minutes: 10,
  outcomes: [
    'Turn a price into hours of work',
    'Work out cost per use',
    'Use both to compare two purchases',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Price in hours.</strong> Price ÷ your hourly rate. Kofi earns about GH₵37.50 an hour from beats. The GH₵720 interface is about <strong>19 hours</strong>. The GH₵480 boots were about 13. Hours make the "ouch" of paying come back, which is exactly what sales try to remove.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Cost per use.</strong> Price ÷ how many times you\'ll really use it. The interface: Kofi records about 4 times a week. Over two years, that\'s about 400 uses. GH₵720 ÷ 400 ≈ <strong>GH₵1.80 per use</strong>.</p><p>The 2:14 a.m. boots: GH₵480 ÷ 0 uses (wrong size) = <strong>infinite</strong>. Even if they\'d fitted and he\'d worn them 40 times: GH₵12 per use.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Using them together.</strong> Something expensive can be great value if you use it constantly. Something cheap can be terrible value if you barely use it. A GH₵60 shirt worn twice is GH₵30 per wear; a GH₵150 pair of trainers worn 300 times is 50 pesewas.</p><p>Be honest about uses. We all overestimate how often we\'ll use the exciting thing.</p>',
    },
    {
      kind: 'check',
      question: 'A GH₵200 jacket you\'ll wear 100 times. Cost per use?',
      options: ['GH₵20', 'GH₵2', 'GH₵200'],
      answer: 1,
      explanation: '200 ÷ 100 = 2.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Hours = price ÷ your hourly rate. Cost per use = price ÷ honest number of uses. Expensive and used daily can beat cheap and forgotten.',
    },
  ],
  apply: {
    scenario: 'Running the numbers.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'At GH₵37.50 an hour, how many hours is GH₵300?',
        answers: ['8', 'eight', '8 hours'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'A GH₵90 football used 60 times. Cost per use, in cedis?',
        answers: ['1.5', '1.50', 'GH₵1.50', 'GH₵1.5'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which is better value?',
        options: [
          { text: 'A GH₵60 shirt worn twice', why: 'GH₵30 per wear vs 50 pesewas.' },
          { text: 'They\'re the same', why: 'Very different cost per use.' },
          { text: 'GH₵150 trainers worn 300 times' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each item to its cost per use.',
        pairs: [
          ['GH₵720 interface, 400 uses', 'About GH₵1.80'],
          ['GH₵60 shirt, 2 wears', 'GH₵30'],
          ['GH₵150 trainers, 300 wears', 'GH₵0.50'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'This GH₵400 watch, I\'ll wear it every day forever!',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'Every day forever? Then buy it.', why: 'We all overestimate uses of exciting things.' },
          { text: 'Be honest: how many watches have you bought this year, and how often do you wear each one?' },
          { text: 'Watches are pointless.', why: 'Not the point. Honest uses are.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Cost per use.',
        template: 'Price [[1]] honest number of [[2]].',
        blanks: [['÷', '/', 'divided by'], ['uses']],
        distractors: ['×', 'friends'],
      },
      {
        kind: 'findBug',
        prompt: 'Which estimate is probably dishonest?',
        lines: [
          'Interface: 4 recordings a week.',
          'Jersey: worn to most matches, about 40 times a year.',
          'Third pair of headphones: I\'ll use them every single day.',
        ],
        bug: 2,
        fix: 'Third pair: honestly, as a backup, maybe 10 times a year.',
        explanation: 'He already has two pairs. "Every day" for a third is the excitement talking.',
      },
      {
        kind: 'mcq',
        prompt: 'Why does price in hours help during a sale?',
        options: [
          { text: 'It makes things cheaper', why: 'Same price, clearer view.' },
          { text: 'It doesn\'t help', why: 'It\'s one of the best pause tools.' },
          { text: 'It brings back the "ouch" that discounts try to remove' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The GH₵720 interface at GH₵37.50 an hour. How many hours? (Round to the nearest hour.)',
        answers: ['19', 'nineteen', '19.2'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the value check.',
        lines: ['Work out price in hours', 'Estimate uses honestly', 'Work out cost per use', 'Compare with alternatives'],
      },
    ],
  },
  reflect: {
    prompt: 'Pick something you want. What\'s its price in hours, and its honest cost per use?',
    starters: ['I want...', 'In hours:...', 'Per use:...'],
  },
  deepen: {
    title: 'Cost per use and the planet',
    summary: 'Buying fewer, longer-lasting things is often better for your money and for the environment. Clothes and electronics that last, repaired when they break, have the lowest cost per use of all.',
  },
  notes: 'Kofi rate GH₵37.50/hour (Course 2). 720 / 37.5 = 19.2 h. Interface 4 uses/week × ~100 weeks ≈ 400 → 1.80/use. Fictional examples.',
};

export default lesson;
