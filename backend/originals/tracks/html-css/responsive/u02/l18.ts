import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 2 · Lesson 18 — the learner's own page gets classes: base, extra, tag, then the one-line test. Steps. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Your page gets classes',
  summary: 'While Kofi tidies his site, it\'s your turn. Four steps to give your own page a class plan, ending with Miracle\'s favourite test: change one line and watch the whole page follow.',
  minutes: 12,
  outcomes: ['Plan base and extra classes for your own page', 'Add a tag with span', 'Run the one-line test'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps for your page',
      steps: [
        { title: '1. Find the repeated parts', body: 'Projects, songs, recipes, hobbies: whatever repeats on your page. Those become your cards.' },
        { title: '2. One base class', body: 'Give them all the same base class, and move their shared styles into it.', code: '.card { padding: 16px; border: 2px solid #FF9600; border-radius: 12px; }', language: 'css' },
        { title: '3. Extras and tags', body: 'Add an extra class only where something is different, and a span with a class for small labels.', code: '<article class="card favourite">\n  <h2>My first song <span class="tag">New</span></h2>\n</article>', language: 'html' },
        { title: '4. The one-line test', body: 'Change one value in .card, like the border colour. If every card changes, your plan works. If some don\'t, they\'re missing the class.', code: '.card { border-color: #FFF6E5; }', language: 'css' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'A page like yours',
      caption: 'Three cards, one base class, one favourite, one tag. Run the one-line test on it.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .card { border: 2px solid #FF9600; border-radius: 12px; padding: 16px; margin-bottom: 16px; }\n  .favourite { background-color: #1F2E52; }\n  .tag { background-color: #FFC83D; color: #14213D; padding: 2px 8px; border-radius: 8px; }\n</style>\n<article class="card"><h2>Football</h2></article>\n<article class="card favourite"><h2>Drawing <span class="tag">New</span></h2></article>\n<article class="card"><h2>Cooking</h2></article>\n',
      challenge: 'The one-line test: change .card\'s border colour to #FFF6E5. All three change?',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'If changing one line in your base class doesn\'t change every card, a card is missing the class.',
    },
  ],
  apply: {
    scenario: 'Your own page.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Find the repeated parts', 'Give them one base class', 'Add extras and tags where things differ', 'Change one line to test'],
      },
      {
        kind: 'writeCode',
        prompt: 'Give all three of your cards the base class card',
        starter: '<style>\n  .card { border: 2px solid #FF9600; padding: 16px; }\n</style>\n<article><h2>Football</h2></article>\n<article><h2>Drawing</h2></article>\n<article><h2>Cooking</h2></article>\n',
        solution: '<style>\n  .card { border: 2px solid #FF9600; padding: 16px; }\n</style>\n<article class="card"><h2>Football</h2></article>\n<article class="card"><h2>Drawing</h2></article>\n<article class="card"><h2>Cooking</h2></article>\n',
        hint: 'class="card" on each article.',
        checks: [
          { message: 'Three cards', dom: { selector: 'article.card', count: 3 } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Base class or extra class?',
        groups: ['Base', 'Extra'],
        items: [
          { text: 'Padding every card shares', group: 0 },
          { text: 'A different background on your favourite', group: 1 },
          { text: 'The rounded corners of every card', group: 0 },
          { text: 'Only one card has it', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'You change .card\'s border colour, and one card stays orange. Why?',
        options: [
          { text: 'That card is missing class="card", or styled by a stronger rule' },
          { text: 'Browsers only update two cards at a time', why: 'Every card with the class updates.' },
          { text: 'Orange can\'t be changed', why: 'It can. Check its class.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the card that will fail the one-line test.',
        language: 'html',
        lines: ['<article class="card">Football</article>', '<article class="card favourite">Drawing</article>', '<article class="Card">Cooking</article>'],
        bug: 2,
        explanation: 'Card with a capital C is a different class. Use lowercase card.',
        fix: '<article class="card">Cooking</article>',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'What should the extra class on your favourite card be called?',
        options: [
          { text: '.favourite: it says what it is, whatever it looks like.' },
          { text: '.dark-blue', why: 'That lies once the colour changes.' },
          { text: '.card2', why: 'Says nothing.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each piece of your page to its class.',
        pairs: [
          ['Every repeated part', '.card'],
          ['The one you love most', '.favourite'],
          ['A "New" label', '.tag on a span'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Add a tag to your heading.',
        language: 'html',
        template: '<h2>Drawing <[[1]] class="tag">New</[[2]]></h2>',
        blanks: [['span'], ['span']],
        distractors: ['div', 'p', 'tag'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s Miracle\'s test called? The one-___ test. (one word)',
        answers: ['line'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'Make your favourite card stand out: .favourite gets background-color #1F2E52',
        starter: '<style>\n  .card { border: 2px solid #FF9600; padding: 16px; }\n\n</style>\n<article class="card favourite"><h2>Drawing</h2></article>\n',
        solution: '<style>\n  .card { border: 2px solid #FF9600; padding: 16px; }\n  .favourite { background-color: #1F2E52; }\n</style>\n<article class="card favourite"><h2>Drawing</h2></article>\n',
        hint: '.favourite { background-color: #1F2E52; }',
        checks: [
          { message: 'The favourite stands out', dom: { selector: '.favourite', style: 'background-color', styleValue: '#1F2E52' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What are the repeated parts of your own page, and what will your base class be called?',
    starters: ['My repeated parts are...', 'My base class is...'],
  },
  deepen: {
    title: 'Do it for real',
    summary: 'Give your own site a base class, an extra and a tag. Run the one-line test, then upload it and check it on a phone.',
  },
  notes: 'Learner project step for Chapter 2. Colours are suggestions; learners use their own palette from Course 1.',
};

export default lesson;
