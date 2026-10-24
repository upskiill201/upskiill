import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8. Reading: the price in hours of your life. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'The real price: hours of your life',
  summary: 'A beat takes Kofi about four hours and sells for GH₵80. So a GH₵200 pair of sneakers costs him ten hours. Turning prices into hours changes how purchases feel, and it\'s one of the most useful money tricks there is.',
  minutes: 11,
  outcomes: [
    'Work out your hourly rate',
    'Turn any price into hours of work',
    'Use hours to decide what\'s worth it',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Price in hours',
      html: '<p>Money is something you swap your time for. So every price is really a number of hours.</p><p><strong>Step 1: find your hourly rate.</strong> If you earn wages, it\'s your take-home pay divided by hours worked. For Kofi, it\'s his beats: about GH₵80 for about four hours\' work, so <strong>GH₵20 an hour</strong>.</p><p>If your money is an allowance, you can use the rate of the job you do, or could do. Or think about the hours someone else worked: Mum\'s GH₵1,500 is many hours at the stall.</p><p><strong>Step 2: divide the price by your rate.</strong></p><ul><li>Sneakers, GH₵200: <strong>10 hours</strong>.</li><li>Music app, GH₵25 a month: over a year, GH₵300, <strong>15 hours</strong> for an app he never opened.</li><li>The laptop deal\'s extra GH₵2,260: <strong>113 hours</strong>. Nearly three weeks of full-time work, just for having it sooner.</li></ul><p><strong>Step 3: ask the question.</strong> "Would I work ten hours for these sneakers?" Sometimes yes: something you\'ll love for years can be worth it. Often, faced with the hours, the answer changes.</p><p>This isn\'t about guilt. It\'s about seeing the trade clearly: <em>this thing, or these hours of my life</em>.</p>',
    },
    {
      kind: 'check',
      question: 'Kofi earns about GH₵20 an hour. How many hours is a GH₵60 jersey?',
      options: ['6 hours', '1 hour', '3 hours'],
      answer: 2,
      explanation: '60 ÷ 20 = 3.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Price ÷ your hourly rate = hours of your life. Ask: would I work that long for this?',
    },
  ],
  apply: {
    scenario: 'Kofi\'s hours.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'GH₵80 for 4 hours of work. What\'s the hourly rate?',
        answers: ['20', 'GH₵20', '20 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'At GH₵20 an hour, how many hours is GH₵200 sneakers?',
        answers: ['10', '10 hours', 'ten'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'At GH₵20 an hour, match each price to its hours.',
        pairs: [
          ['GH₵40', '2 hours'],
          ['GH₵100', '5 hours'],
          ['GH₵300', '15 hours'],
          ['GH₵2,260', '113 hours'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the point of thinking in hours?',
        options: [
          { text: 'To feel guilty about every purchase', why: 'It\'s about clarity, not guilt.' },
          { text: 'To see the real trade: this thing, or this much of my time' },
          { text: 'To work more hours', why: 'It helps you decide, not work more.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'I earn GH₵25 an hour at my weekend job. These sneakers are GH₵400.',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'That\'s 16 hours. Two full weekends. Still want them?' },
          { text: 'Buy them, you deserve it.', why: 'Maybe, but he hasn\'t seen the trade yet.' },
          { text: 'Never buy sneakers.', why: 'The point is to choose, not to ban.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The hours formula.',
        template: 'Price [[1]] your hourly rate = [[2]] of your life.',
        blanks: [['÷', '/', 'divided by'], ['hours']],
        distractors: ['×', 'days'],
      },
      {
        kind: 'sortGroups',
        prompt: 'For Kofi, worth the hours or not?',
        groups: ['Worth it', 'Not worth it'],
        items: [
          { text: 'A laptop he\'ll use daily for 4 years (175 hours)', group: 0 },
          { text: 'An app he never opens (15 hours a year)', group: 1 },
          { text: 'The laptop deal\'s extra cost (113 hours)', group: 1 },
          { text: 'A football he plays with every week (2 hours)', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which step is wrong?',
        lines: [
          'Take-home pay GH₵1,000 for 50 hours.',
          'Hourly rate: GH₵50.',
          'A GH₵100 item costs 5 hours.',
        ],
        bug: 1,
        fix: 'Hourly rate: GH₵20.',
        explanation: '1,000 ÷ 50 = 20, not 50. Then GH₵100 is 5 hours: that part is right.',
      },
      {
        kind: 'mcq',
        prompt: 'Kofi\'s money is mostly an allowance, not wages. How can he still use this trick?',
        options: [
          { text: 'He can\'t', why: 'Any money came from someone\'s time.' },
          { text: 'Use his beat rate, or think about the hours Mum worked for it' },
          { text: 'Assume GH₵1,000 an hour', why: 'That\'s not anyone\'s real rate.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The laptop costs GH₵3,500. At GH₵20 an hour, how many hours is that?',
        answers: ['175', '175 hours'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Work out your hourly rate (or a rate you could earn). What\'s the last thing you bought, in hours? Was it worth it?',
    starters: ['My rate is about...', 'My last purchase was... hours', 'Worth it? ...'],
  },
  deepen: {
    title: 'Your Money or Your Life',
    summary: 'The idea of pricing things in "life energy" was popularised by Vicki Robin and Joe Dominguez\'s book Your Money or Your Life (1992). Their version also subtracts the costs of working (transport, lunches) to find your real hourly rate.',
  },
  notes: 'Kofi beat rate: GH₵80 per ~4 hours = 20/hour (fictional). Laptop 3,500/20 = 175 h. Extra cost of payment plan 2,260/20 = 113 h. Robin & Dominguez (1992).',
};

export default lesson;
