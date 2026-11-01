import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 2 · Lesson 13 — inheritance in depth: which properties pass down, which don't, and the inherit value. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'What gets passed down',
  summary: 'Kofi sets color and a border on .gig-card. The text inside turns cream like he wanted, but the paragraphs inside don\'t get borders. Why does one pass down and not the other? Tey explains inheritance.',
  minutes: 11,
  outcomes: ['Name properties that inherit and ones that don\'t', 'Explain why links don\'t take their parent\'s colour', 'Use inherit to pass a value down on purpose'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Some properties pass down from a parent to everything inside it. Mostly the text ones: color, font-family, font-size, line-height. Set them on a card, and every heading and paragraph inside follows.',
          replies: ['And borders?'],
        },
        {
          tey: 'Box properties don\'t pass down: border, padding, margin, width, background. Imagine if they did: one border on a card would put a border around every word inside it.',
          replies: ['Why is my link still orange inside the cream card?'],
        },
        {
          tey: 'Inheritance only fills in when nothing else sets the property. Your a { color: #FF9600; } rule targets the link directly, and a direct rule always beats an inherited value, even a weak one.',
          replies: ['Can I make it follow the card?'],
        },
        {
          tey: 'Yes: color: inherit tells an element to take its parent\'s value on purpose. .gig-card a { color: inherit; } makes links in gig cards match their text.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Passed down, or not',
      caption: 'The card\'s colour and font pass down. Its border and padding don\'t. The link has its own rule, so it stays orange.',
      code: '<style>\n  body { background-color: #14213D; font-family: Verdana, sans-serif; }\n  a { color: #FF9600; }\n  .gig-card { color: #FFF6E5; border: 2px solid #FFF6E5; padding: 16px; }\n</style>\n<article class="gig-card">\n  <h2>Sound Up Saturdays</h2>\n  <p>Accra, Saturday night. <a href="#tickets">Tickets</a></p>\n</article>\n',
      challenge: 'Add .gig-card a { color: inherit; }. The link turns cream (it keeps its underline, so it\'s still clear).',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Text properties inherit; box properties don\'t. A direct rule beats inheritance. inherit passes a value down on purpose.',
    },
  ],
  apply: {
    scenario: 'What gets passed down.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Passed down to children, or not?',
        groups: ['Inherits', 'Doesn\'t inherit'],
        items: [
          { text: 'color', group: 0 },
          { text: 'border', group: 1 },
          { text: 'font-family', group: 0 },
          { text: 'padding', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is the link orange inside the cream card?',
        options: [
          { text: 'Links can\'t inherit', why: 'They can, with color: inherit.' },
          { text: 'The card\'s colour is too weak', why: 'Inheritance only fills in when nothing sets the property.' },
          { text: 'The a rule sets it directly, and a direct rule beats an inherited value' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Make links inside gig cards match the card\'s text: .gig-card a gets color inherit',
        starter: '<style>\n  a { color: #FF9600; }\n  .gig-card { color: #FFF6E5; }\n\n</style>\n<article class="gig-card"><p><a href="#tickets">Tickets</a></p></article>\n',
        solution: '<style>\n  a { color: #FF9600; }\n  .gig-card { color: #FFF6E5; }\n  .gig-card a { color: inherit; }\n</style>\n<article class="gig-card"><p><a href="#tickets">Tickets</a></p></article>\n',
        hint: '.gig-card a { color: inherit; }',
        checks: [
          { message: 'The link takes its parent\'s colour', dom: { selector: '.gig-card a', style: 'color', styleValue: 'inherit' } },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Does the paragraph inside get a border?',
        code: '.card { border: 2px solid #FF9600; }\n\n<article class="card"><p>Slow and warm.</p></article>',
        language: 'html',
        options: [
          { text: 'No: border doesn\'t inherit' },
          { text: 'Yes, a second border', why: 'Box properties don\'t pass down.' },
          { text: 'Only if it\'s short', why: 'border never inherits.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each idea to what it means.',
        pairs: [
          ['Inheritance', 'A parent\'s value passed down'],
          ['A direct rule', 'Beats any inherited value'],
          ['color: inherit', 'Take the parent\'s value on purpose'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Should I set font-family on every h2, p and li?',
        options: [
          { text: 'Yes, every element needs it.', why: 'font-family inherits.' },
          { text: 'Only on links.', why: 'body covers everything.' },
          { text: 'No: set it once on body. It inherits into everything inside.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the statement that\'s wrong.',
        lines: ['color passes down to children.', 'padding passes down to children.', 'A rule on the element beats inheritance.'],
        bug: 1,
        explanation: 'Box properties like padding don\'t inherit.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Make the gig card\'s links follow its text colour.',
        language: 'css',
        template: '.gig-card a { color: [[1]]; }',
        blanks: [['inherit']],
        distractors: ['parent', 'default', 'none'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which value tells a property to take its parent\'s value? (one word)',
        answers: ['inherit'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'The links in the card now look like the text. What keeps them recognisable as links?',
        options: [
          { text: 'Nothing, so it\'s fine to lose it', why: 'Colour shouldn\'t be the only signal: keep the underline.' },
          { text: 'Their underline, which they keep by default' },
          { text: 'Their padding', why: 'The underline does it.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Which properties on your page do you set again and again that could just inherit from body?',
    starters: ['I repeat...', 'I\'ll move it to body...'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Search "MDN inheritance CSS" and look at which properties are marked "Inherited: yes" on a property page, like color.',
  },
  notes: 'Inherited properties per each property\'s definition table (MDN "Inherited: yes"): color, font-*, line-height, etc.; box properties are not inherited. The inherit keyword is valid on any property. jsdom reports color: inherit as the literal keyword, which the check uses.',
};

export default lesson;
