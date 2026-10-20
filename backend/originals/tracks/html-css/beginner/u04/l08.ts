import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 8 — colour basics: named colours, color vs background-color, link colours. Card deck (text). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Colour words',
  summary: 'CSS knows about 140 colour names, from red to rebeccapurple. Kofi wants to use them all. Tey walks him through the few colour ideas that matter most, before Chapter 5 turns them into a real palette.',
  minutes: 11,
  outcomes: ['Use named colours in CSS', 'Tell color from background-color', 'Restyle links so they fit the page'],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Named colours.</strong> CSS understands words like <code>orange</code>, <code>teal</code>, <code>ivory</code> and <code>midnightblue</code>: about 140 of them. They\'re perfect for learning. In Chapter 5 you\'ll use colour codes for exact shades from Kofi\'s album art.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Two colour properties.</strong> <code>color</code> is the text. <code>background-color</code> is behind it. Almost every readable design is a careful pair of the two.</p>',
    },
    {
      kind: 'check',
      question: 'Kofi wants a gold button label on a black button. Which property makes the label gold?',
      options: ['background-color', 'color', 'gold'],
      answer: 1,
      explanation: 'color is the text. background-color would make the button itself gold.',
    },
    {
      kind: 'text',
      html: '<p><strong>Links have their own colour.</strong> Browsers make links blue by default, and that blue ignores body\'s text colour. To fit the page, give <code>a</code> its own rule: <code>a { color: orange; }</code>.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Fewer is better.</strong> Most good pages use one background, one text colour and one accent for headings and links. Three colours, used everywhere, looks like a brand. Fifteen colours looks like a sweet shop.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Three colours',
      caption: 'One background, one text colour, one accent for the heading and the link.',
      code: '<style>\n  body { background-color: midnightblue; color: white; }\n  h1 { color: orange; }\n  a { color: orange; }\n</style>\n<h1>Mensah Beats</h1>\n<p>Follow me on <a href="https://instagram.com">Instagram</a>.</p>\n',
      challenge: 'Swap the accent: change both oranges to hotpink.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'color is text, background-color is behind it. Give links their own rule. Start with three colours.',
    },
  ],
  apply: {
    scenario: 'Kofi learns his colour words.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'color or background-color?',
        groups: ['color', 'background-color'],
        items: [
          { text: 'The words turn white', group: 0 },
          { text: 'The page turns midnight blue', group: 1 },
          { text: 'The link turns orange', group: 0 },
          { text: 'The button itself turns black', group: 1 },
          { text: 'The heading text turns gold', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Make the link orange so it fits Kofi\'s night page',
        starter: '<style>\n  body { background-color: midnightblue; color: white; }\n\n</style>\n<p>Follow me on <a href="https://instagram.com">Instagram</a>.</p>\n',
        solution: '<style>\n  body { background-color: midnightblue; color: white; }\n  a { color: orange; }\n</style>\n<p>Follow me on <a href="https://instagram.com">Instagram</a>.</p>\n',
        hint: 'Links need their own rule: a { color: orange; }',
        checks: [
          { message: 'The link is orange', dom: { selector: 'a', style: 'color', styleValue: 'orange' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why isn\'t the link white, even though body has color: white?',
        options: [
          { text: 'Browsers give links their own default colour' },
          { text: 'Links can\'t change colour', why: 'They can, with an a rule.' },
          { text: 'White is not a CSS colour', why: 'It is. Links just have their own default.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each rule to what it changes.',
        pairs: [
          ['a { color: orange; }', 'Every link'],
          ['body { color: white; }', 'The page\'s text'],
          ['body { background-color: black; }', 'Behind everything'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'There are 140 colour names. Can I use, like, 20 of them?',
        options: [
          { text: 'Start with three: a background, a text colour and one accent. It\'ll look like a brand.' },
          { text: 'Use all 140.', why: 'Sweet shop, not brand.' },
          { text: 'Use only black and white.', why: 'Three colours, used everywhere, works well.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that won\'t work.',
        language: 'css',
        lines: ['body { background-color: midnightblue; }', 'h1 { color: dark orange; }', 'a { color: orange; }'],
        bug: 1,
        explanation: 'Colour names are one word: darkorange.',
        fix: 'h1 { color: darkorange; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What colour is the link?',
        code: '<style>\n  body { color: white; }\n</style>\n<p>Follow me on <a href="#">Instagram</a>.</p>',
        language: 'html',
        options: [
          { text: 'White, like the paragraph', why: 'Links keep the browser\'s own colour unless you style a.' },
          { text: 'The browser\'s default link blue' },
          { text: 'Black', why: 'The link has its own default colour.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the three-colour stylesheet.',
        language: 'css',
        template: 'body { [[1]]: midnightblue; color: white; }\nh1, a { [[2]]: orange; }',
        blanks: [['background-color'], ['color']],
        distractors: ['background', 'paint', 'font-color'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which selector picks every link on the page? (one letter)',
        answers: ['a'],
        placeholder: 'One letter',
      },
      {
        kind: 'sortGroups',
        prompt: 'A real CSS colour name, or not?',
        groups: ['Real name', 'Not a name'],
        items: [
          { text: 'midnightblue', group: 0 },
          { text: 'osusunset', group: 1 },
          { text: 'teal', group: 0 },
          { text: 'jollofred', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'If your page could only use three colours, which three would you pick, and why?',
    starters: ['Background:', 'Accent:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Search "CSS named colors" and pick three for your own page: a background, a text colour and an accent.',
  },
  notes: 'CSS Color Module defines 148 named colours (including aliases like grey/gray); "about 140" is the common description. Links use the browser\'s :link/:visited default colours, which body\'s color doesn\'t override.',
};

export default lesson;
