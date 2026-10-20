import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 5 · Lesson 9 — one huge heading everywhere vs a heading that grows at a breakpoint. Before / After. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'The name that didn\'t fit',
  summary: '"Mensah Beats" at 4rem looks bold on a laptop. On Ama\'s phone it breaks into "Mensah" and "Beats" on two lines, and pushes everything else down. Here\'s the same heading, sized phones-first.',
  minutes: 11,
  outcomes: ['Spot text that\'s too big for a phone', 'Size headings phones-first and grow them in a media query', 'Keep sizes in rem so they still follow the reader'],
  learn: [
    {
      kind: 'compare',
      title: 'One size vs phones-first sizes',
      before: { label: 'Huge everywhere', text: 'h1 { font-size: 4rem; }\n\nOn a 360px phone, 4rem (about 64px) fits only a few letters per line. The name breaks in two, and the first beat is pushed far down the screen.' },
      after: { label: 'Small first, then bigger', text: 'h1 { font-size: 2.25rem; }\n\n@media (min-width: 700px) {\n  h1 { font-size: 4rem; }\n}\n\nA comfortable size on phones, the bold big size on wider screens. Still in rem, so Grandma\'s bigger text setting still works.' },
      notes: [
        'Big headings that suit a laptop can overwhelm a phone.',
        'Phones-first applies to text sizes too.',
        'Stay in rem so sizes still follow the reader\'s settings.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Grow with the screen',
      caption: 'Switch between phone and laptop. The name is comfortable on both.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  h1 { font-family: Georgia, serif; color: #FF9600; font-size: 2.25rem; margin: 0 0 8px; }\n  @media (min-width: 700px) {\n    h1 { font-size: 4rem; }\n  }\n</style>\n<h1>Mensah Beats</h1>\n<p>Beats from Accra, made late at night.</p>\n',
      challenge: 'Delete the media query and set h1 to 4rem. Look at phone size.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Size headings for phones first, then grow them with min-width. Keep the units in rem.',
    },
  ],
  apply: {
    scenario: 'The name that didn\'t fit.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does "Mensah Beats" break into two lines on Ama\'s phone?',
        options: [
          { text: 'At 4rem it\'s too wide for a narrow screen' },
          { text: 'Georgia is a big font', why: 'It\'s the size, not the font.' },
          { text: 'The space between the words is broken', why: 'There isn\'t room for both words at that size.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Phones-first heading: h1 is 2.25rem by default, and 4rem from 700px',
        starter: '<style>\n  h1 { font-size: 4rem; }\n</style>\n<h1>Mensah Beats</h1>\n',
        solution: '<style>\n  h1 { font-size: 2.25rem; }\n  @media (min-width: 700px) {\n    h1 { font-size: 4rem; }\n  }\n</style>\n<h1>Mensah Beats</h1>\n',
        hint: 'h1 { font-size: 2.25rem; } then @media (min-width: 700px) { h1 { font-size: 4rem; } }',
        checks: [
          { message: 'Phone size first', codeIncludes: '2.25rem' },
          { message: 'Bigger from 700px', codeIncludes: 'min-width' },
          { message: 'Still 4rem on wide screens', codeIncludes: '4rem' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Base CSS (phones) or inside the min-width query?',
        groups: ['Base (phones)', 'min-width query'],
        items: [
          { text: 'h1 { font-size: 2.25rem; }', group: 0 },
          { text: 'h1 { font-size: 4rem; }', group: 1 },
          { text: 'body { font-size: 1rem; }', group: 0 },
          { text: 'A bigger h2 for laptops', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each size to where it\'s used.',
        pairs: [
          ['2.25rem', 'The h1 on phones'],
          ['4rem', 'The h1 on wider screens'],
          ['1rem', 'Body text everywhere'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Can I use px for the media query sizes, since it\'s only for laptops?',
        options: [
          { text: 'Keep rem everywhere, so the heading still grows with Grandma\'s text setting on any screen.' },
          { text: 'Yes, laptops don\'t have text settings.', why: 'They do. Stay in rem.' },
          { text: 'Use both at once.', why: 'One value wins. Make it rem.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that overwhelms phones.',
        language: 'css',
        lines: ['body { font-size: 1rem; }', 'h1 { font-size: 5rem; }', '@media (min-width: 700px) { h2 { font-size: 2rem; } }'],
        bug: 1,
        explanation: 'A 5rem heading as the base hits phones too. Start smaller and grow it in a min-width query.',
        fix: 'h1 { font-size: 2.25rem; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'On a 360px phone, how big is the h1?',
        code: 'h1 { font-size: 2.25rem; }\n@media (min-width: 700px) {\n  h1 { font-size: 4rem; }\n}',
        language: 'css',
        options: [
          { text: '2.25rem' },
          { text: '4rem', why: '360px is under 700px.' },
          { text: '6.25rem', why: 'One value applies, not both added.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Grow the heading on wider screens.',
        language: 'css',
        template: 'h1 { font-size: 2.25rem; }\n@media ([[1]]: 700px) {\n  h1 { font-size: [[2]]; }\n}',
        blanks: [['min-width'], ['4rem']],
        distractors: ['max-width', '64px', '1rem'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which unit should font sizes stay in, so they follow the reader? (one word)',
        answers: ['rem'],
        placeholder: 'A unit',
      },
      {
        kind: 'mcq',
        prompt: 'Phones-first applies to what?',
        options: [
          { text: 'Layout, text sizes, images: everything starts simple for phones' },
          { text: 'Only columns', why: 'Text and images too.' },
          { text: 'Only colours', why: 'Colours usually stay the same everywhere.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Is any text on your page too big on a phone? Which heading?',
    starters: ['My...', 'would be better at...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Make your biggest heading phones-first: a smaller rem size by default, bigger in a min-width query.',
  },
  notes: 'A clamp()-based fluid type approach also exists; kept to media queries for this course. 4rem ≈ 64px at the default root size.',
};

export default lesson;
