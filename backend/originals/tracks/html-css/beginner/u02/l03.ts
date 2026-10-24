import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3 — bullet lists: ul and li. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Bullet lists',
  summary: 'Kofi\'s "What I make" paragraph lists five kinds of music separated by commas, and nobody can read it. A bullet list turns a long sentence into something you take in at a glance.',
  minutes: 11,
  outcomes: ['Make a bullet list with ul and li', 'Turn a long comma sentence into a list', 'Know when a list beats a paragraph'],
  learn: [
    {
      kind: 'steps',
      title: 'From a comma sentence to a list',
      steps: [
        { title: '1. Spot the list hiding in a sentence', body: 'This sentence is really a list. Every comma is a new item.', code: '<p>I make afrobeats, amapiano, drill, highlife and R&B.</p>', language: 'html' },
        { title: '2. Open an unordered list', body: 'ul means "unordered list": a list where the order doesn\'t matter. It\'s the box that holds the items.', code: '<ul>\n</ul>', language: 'html' },
        { title: '3. One li per item', body: 'li means "list item". Each one goes inside the ul, and each gets its own bullet.', code: '<ul>\n  <li>Afrobeats</li>\n  <li>Amapiano</li>\n  <li>Drill</li>\n</ul>', language: 'html' },
        { title: '4. Only li goes directly inside ul', body: 'Don\'t put plain text or a p straight inside the ul. Everything in the list goes in an li.', code: '<ul>\n  <li>Highlife</li>\n  <li>R&B</li>\n</ul>', language: 'html' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'What I make',
      caption: 'Kofi\'s genres as a list. Look how much faster it is to read than the comma sentence.',
      code: '<h2>What I make</h2>\n<ul>\n  <li>Afrobeats</li>\n  <li>Amapiano</li>\n  <li>Drill</li>\n  <li>Highlife</li>\n</ul>\n',
      challenge: 'Add a fifth item: R&B.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Three or more things in a sentence, separated by commas? That\'s probably a list.',
    },
  ],
  apply: {
    scenario: 'Kofi lists what he makes.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each tag to what it means.',
        pairs: [
          ['ul', 'Unordered list, the box around the items'],
          ['li', 'One list item'],
          ['p', 'A paragraph, not a list'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Make a bullet list of three genres: Afrobeats, Amapiano, Highlife',
        starter: '<ul>\n</ul>\n',
        solution: '<ul>\n  <li>Afrobeats</li>\n  <li>Amapiano</li>\n  <li>Highlife</li>\n</ul>\n',
        hint: 'Inside the ul, one <li>...</li> per genre.',
        checks: [
          { message: 'Three items in the list', dom: { selector: 'ul > li', count: 3 } },
          { message: 'Afrobeats is in the list', dom: { selector: 'li', text: 'Afrobeats' } },
          { message: 'Highlife is in the list', dom: { selector: 'li', text: 'Highlife' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which goes directly inside a ul?',
        options: [
          { text: 'p elements', why: 'Only li elements go directly inside a ul.' },
          { text: 'Plain text', why: 'Text goes inside an li, not straight in the ul.' },
          { text: 'li elements' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the list in order.',
        language: 'html',
        lines: ['<ul>', '<li>Drill</li>', '<li>Highlife</li>', '</ul>'],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that breaks the list.',
        language: 'html',
        lines: ['<ul>', '  <li>Afrobeats</li>', '  Amapiano', '  <li>Drill</li>', '</ul>'],
        bug: 2,
        fix: '  <li>Amapiano</li>',
        explanation: 'Amapiano isn\'t in an li, so it gets no bullet and breaks the list.',
      },
      {
        kind: 'sortGroups',
        prompt: 'List or paragraph?',
        groups: ['A list', 'A paragraph'],
        items: [
          { text: 'The five genres Kofi makes', group: 0 },
          { text: 'How Kofi started making beats', group: 1 },
          { text: 'What to bring to the gig', group: 0 },
          { text: 'A thank-you message to his fans', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'Your genre sentence has nine commas. I counted.',
        options: [
          { text: 'Commas are fine.', why: 'Nine commas in a row is a list pretending to be a sentence.' },
          { text: 'Then I\'ll take out some genres.', why: 'Kofi really does make all of them. The fix is the shape, not fewer genres.' },
          { text: 'Fair. I\'ll turn it into a bullet list.' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a one-item list: Amapiano',
        language: 'html',
        tiles: ['<ul>', '<li>', 'Amapiano', '</li>', '</ul>'],
        distractors: ['<list>', '<p>'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which tag is one item in a list?',
        answers: ['li', '<li>'],
        placeholder: 'Two letters',
      },
      {
        kind: 'writeCode',
        prompt: 'Turn the comma sentence into a list with a heading: an h2 What to bring, then a ul with Your ticket, Water and Good vibes',
        starter: '<p>Bring your ticket, water and good vibes.</p>\n',
        solution: '<h2>What to bring</h2>\n<ul>\n  <li>Your ticket</li>\n  <li>Water</li>\n  <li>Good vibes</li>\n</ul>\n',
        hint: 'Replace the p with an h2 and a ul. One li for each thing.',
        checks: [
          { message: 'A heading What to bring', dom: { selector: 'h2', text: 'What to bring' } },
          { message: 'Three things in the list', dom: { selector: 'ul > li', count: 3 } },
          { message: 'Good vibes is in the list', dom: { selector: 'li', text: 'Good vibes' } },
          { message: 'The comma sentence is gone', dom: { selector: 'p', count: 0 } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What list would be on your own page: things you make, things you love, places you\'ve been?',
    starters: ['My list would be...', 'The first three items are...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'In the playground, make a bullet list of your five favourite songs right now.',
  },
  notes: 'HTML Living Standard §4.4.6 ul ("a list of items, where the order of the items is not important"), §4.4.8 li. Permitted children of ul: li (and script-supporting elements).',
};

export default lesson;
