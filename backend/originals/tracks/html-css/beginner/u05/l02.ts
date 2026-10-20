import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 2 — named colours vs hex codes. Before / After. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Names vs codes',
  summary: 'CSS has about 140 colour names, and millions of colours. Kofi\'s exact sunset orange isn\'t one of the names. Tey shows him the difference between "orange" and #FF9600.',
  minutes: 11,
  outcomes: ['Write colours as hex codes', 'Explain why codes beat names for a brand', 'Use the same code everywhere a colour appears'],
  learn: [
    {
      kind: 'compare',
      title: 'Two ways to say orange',
      before: { label: 'A colour name', text: 'h1 { color: orange; }\n\nEasy to read, but "orange" is one fixed shade. It isn\'t the orange on Kofi\'s cover, and there are only about 140 names to choose from.' },
      after: { label: 'A hex code', text: 'h1 { color: #FF9600; }\n\nA # and six characters pick one exact colour out of more than sixteen million. Copy it from the album art and the page matches perfectly.' },
      notes: [
        'Names are great for learning. Codes are how real sites write colours.',
        'A hex code is # plus six characters, like #FF9600.',
        'Use the same code everywhere that colour appears.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'orange vs #FF9600',
      caption: 'The top heading uses the name; the bottom uses Kofi\'s exact code. Spot the difference.',
      code: '<style>\n  body { background-color: #14213D; }\n  h1 { color: orange; }\n  h2 { color: #FF9600; }\n</style>\n<h1>orange</h1>\n<h2>#FF9600</h2>\n',
      challenge: 'Change #FF9600 to #FFB224, another orange from the Sunrise in Osu cover.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Names for quick tests, codes for your brand. # and six characters.',
    },
  ],
  apply: {
    scenario: 'Kofi switches to codes.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why use #FF9600 instead of orange for Kofi\'s brand?',
        options: [
          { text: 'It\'s the exact shade from his album art' },
          { text: 'Names don\'t work in CSS', why: 'They work. Codes are just exact.' },
          { text: 'Codes load faster', why: 'It\'s about the exact colour.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Switch to Kofi\'s codes: background #14213D and text #FFF6E5',
        starter: '<style>\n  body { background-color: midnightblue; color: ivory; }\n</style>\n<p>Beats from Accra.</p>\n',
        solution: '<style>\n  body { background-color: #14213D; color: #FFF6E5; }\n</style>\n<p>Beats from Accra.</p>\n',
        hint: 'Replace midnightblue with #14213D and ivory with #FFF6E5.',
        checks: [
          { message: 'Kofi\'s night blue page', dom: { selector: 'body', style: 'background-color', styleValue: '#14213D' } },
          { message: 'Kofi\'s cream text', dom: { selector: 'body', style: 'color', styleValue: '#FFF6E5' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Name or code?',
        groups: ['Colour name', 'Hex code'],
        items: [
          { text: 'midnightblue', group: 0 },
          { text: '#14213D', group: 1 },
          { text: 'orange', group: 0 },
          { text: '#F0438A', group: 1 },
          { text: 'teal', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the broken colour.',
        language: 'css',
        lines: ['h1 { color: #FF9600; }', 'a { color: #FF96; }', 'body { background-color: #14213D; }'],
        bug: 1,
        explanation: 'Too short. A hex code here needs six characters: #FF9600.',
        fix: 'a { color: #FF9600; }',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Codes look like random letters. How is anyone supposed to remember them?',
        options: [
          { text: 'You don\'t remember them. You copy them once from your art and reuse them.' },
          { text: 'Memorise all sixteen million.', why: 'Nobody does. Copy and reuse.' },
          { text: 'Stick to names forever.', why: 'Names can\'t match your exact brand.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Roughly how many colours can hex codes describe?',
        options: [
          { text: 'About 140', why: 'That\'s the named colours.' },
          { text: 'More than sixteen million' },
          { text: 'Exactly 256', why: 'Many more: 256 × 256 × 256.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each code to Kofi\'s palette.',
        pairs: [
          ['#14213D', 'Night blue background'],
          ['#FF9600', 'Sunset orange accent'],
          ['#FFF6E5', 'Cream text'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        language: 'css',
        template: 'h1, a { color: #[[1]]; }',
        blanks: [['FF9600', 'ff9600']],
        distractors: ['orange', 'FF96', '#FF9600'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many characters come after the # in a hex code like #FF9600? (a number)',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
      {
        kind: 'writeCode',
        prompt: 'Make the links the same orange as the heading: #FF9600',
        starter: '<style>\n  h1 { color: #FF9600; }\n\n</style>\n<h1>Mensah Beats</h1>\n<p><a href="#book">Book me</a></p>\n',
        solution: '<style>\n  h1 { color: #FF9600; }\n  a { color: #FF9600; }\n</style>\n<h1>Mensah Beats</h1>\n<p><a href="#book">Book me</a></p>\n',
        hint: 'a { color: #FF9600; }, or group it: h1, a { color: #FF9600; }',
        checks: [
          { message: 'Orange links', dom: { selector: 'a', style: 'color', styleValue: '#FF9600' } },
          { message: 'Orange heading', dom: { selector: 'h1', style: 'color', styleValue: '#FF9600' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Where else do you see exact colour codes used (logos, football kits, apps)? Why do brands care so much?',
    starters: ['I\'ve seen...', 'Brands care because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Search "colour picker" in your browser. Pick a colour and copy its hex code into the playground.',
  },
  notes: '24-bit hex colours: 16,777,216 values. Named colours per CSS Color Module (about 140 unique names).',
};

export default lesson;
