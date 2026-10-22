import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 1. Story with a choice: earning a little more. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Three beats, four weeks',
  summary: 'Three rappers want beats before the inter-hall showcase. Kofi has always charged GH₵80. Miracle asks: "Why GH₵80?" He has no answer. What should he charge?',
  minutes: 12,
  outcomes: [
    'See how a little extra income can close a gap',
    'Price your work by its value, not by habit',
    'Decide where extra income goes before it arrives',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Why GH₵80?',
      beats: [
        { speaker: 'miracle', text: 'Three beats? Brilliant. What are you charging?' },
        { speaker: 'kofi', text: 'GH₵80. Same as always.' },
        { speaker: 'miracle', text: 'Why GH₵80?' },
        { speaker: 'kofi', text: '...Because the first guy offered GH₵80 and I said yes.' },
        { speaker: 'miracle', text: 'Each beat takes you about four hours, with changes. They\'re performing at a showcase in front of the whole university. What\'s it worth to them?' },
        { speaker: 'narrator', text: 'Kofi checks what other student producers on campus charge: GH₵100 to GH₵250 for a beat with changes.' },
        { speaker: 'tey', text: 'Earning a little more is the other half of saving on a low income. But only if it doesn\'t eat your studies, and only if you charge what it\'s worth.' },
      ],
      choice: {
        prompt: 'What should Kofi charge?',
        options: [
          { text: 'GH₵80, as always: they\'re friends.', outcome: 'Kind, and GH₵240 for twelve hours of work. It also teaches everyone his work is worth GH₵80.' },
          { text: 'GH₵150 with a clear offer: the beat, two rounds of changes, ready in 48 hours.', outcome: 'Yes. In the middle of what others charge, with a clear promise. All three say yes. GH₵450 for twelve hours, and he still has time to study.', best: true },
          { text: 'GH₵300: it\'s a showcase!', outcome: 'Above anyone on campus. Two say no and go elsewhere. Pricing too high can cost you the work.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'When you earn extra, price by value and by what others charge, not by habit. And decide where the money goes before it lands.',
    },
  ],
  apply: {
    scenario: 'Pricing the showcase beats.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Three beats at GH₵150. Total?',
        answers: ['450', 'GH₵450', '450 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Three beats at GH₵80. Total?',
        answers: ['240', 'GH₵240', '240 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why did Kofi charge GH₵80 before?',
        options: [
          { text: 'He worked out his costs', why: 'He never did.' },
          { text: 'Habit: the first buyer offered it and he said yes' },
          { text: 'It\'s the campus price', why: 'Others charge GH₵100 to GH₵250.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good way to set a price, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Checking what others charge', group: 0 },
          { text: 'Whatever the first buyer offers', group: 1 },
          { text: 'A clear offer of what\'s included', group: 0 },
          { text: 'Charging far above everyone, hoping', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'They\'re my friends. Isn\'t charging GH₵150 a bit much?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Yes, do it for free.', why: 'He has a laptop to buy, and his time has value.' },
          { text: 'Charge GH₵500.', why: 'Above anyone else; he\'d lose the work.' },
          { text: 'It\'s fair: middle of the campus range, with changes and a deadline. Friends who value your work will pay a fair price.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Kofi\'s offer.',
        template: 'The beat, two rounds of [[1]], ready in [[2]] hours.',
        blanks: [['changes'], ['48']],
        distractors: ['loans', '2'],
      },
      {
        kind: 'mcq',
        prompt: 'At GH₵150 for about 4 hours, what\'s Kofi\'s hourly rate now?',
        options: [
          { text: 'GH₵20', why: 'That was at GH₵80.' },
          { text: 'About GH₵37.50' },
          { text: 'GH₵150', why: 'That\'s per beat, which takes about 4 hours.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which part of Kofi\'s plan could hurt his studies?',
        lines: [
          'Three beats at GH₵150.',
          'About twelve hours over four weeks.',
          'Take every request that comes, even in exam week.',
        ],
        bug: 2,
        fix: 'Take only what fits around studying, and say no in exam week.',
        explanation: 'Extra income shouldn\'t cost the degree the laptop is for.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each price to what happened.',
        pairs: [
          ['GH₵80', 'GH₵240, and his work seen as cheap'],
          ['GH₵150', 'GH₵450, all three said yes'],
          ['GH₵300', 'Two buyers went elsewhere'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Where should the GH₵450 go?',
        options: [
          { text: 'Decide when it arrives', why: 'Undecided money gets spent.' },
          { text: 'Into the emergency fund', why: 'The fund is full. The laptop has a deadline.' },
          { text: 'Decided before it lands: for the last 4 weeks, all to the laptop jar' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Is there a skill you could charge a fair price for? What do others charge, and what would your clear offer be?',
    starters: ['I could charge for...', 'Others charge...', 'My offer:...'],
  },
  deepen: {
    title: 'Pricing is its own skill',
    summary: 'Many people undercharge for their first paid work because they set prices by habit or nerves. If you\'d like to go further, the Teyro course How to Price a Product or Service covers costs, value and confidence.',
  },
  notes: 'Fictional campus beat range GH₵100–250. Kofi: 3 × 150 = 450 (running numbers: beats extra 450 to jar; for the deadline he sends 100% to the jar, a written choice — fun is in his budget already).',
};

export default lesson;
