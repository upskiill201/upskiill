import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 5 · Lesson 4 — anatomy of a media query; several breakpoints; and; order. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Inside a media query',
  summary: 'Kofi\'s stylesheet now has two media queries: one for tablets and up, one for big laptops. Miracle asks him to explain every character. Tap each part.',
  minutes: 11,
  outcomes: ['Read every part of a media query', 'Stack two min-width queries in the right order', 'Combine conditions with and'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part',
      text: '.gallery { grid-template-columns: repeat(2, 1fr); }\n\n@media (min-width: 700px) {\n  .gallery { grid-template-columns: repeat(3, 1fr); }\n}\n\n@media (min-width: 1100px) {\n  .gallery { grid-template-columns: repeat(5, 1fr); }\n}\n\n@media (min-width: 700px) and (orientation: landscape) { ... }',
      hotspots: [
        { phrase: '.gallery { grid-template-columns: repeat(2, 1fr); }', note: 'The base: two columns. Every screen gets this unless a query below says otherwise.' },
        { phrase: '@media (min-width: 700px) {', note: '@media starts the query. The condition goes in brackets. The opening brace starts the rules that only apply when it\'s true.' },
        { phrase: 'repeat(3, 1fr)', note: 'From 700px wide: three columns.' },
        { phrase: '@media (min-width: 1100px) {', note: 'From 1100px: five columns. On a big laptop both queries are true, and this one wins because it comes later. So always order min-width queries from small to large.' },
        { phrase: 'and (orientation: landscape)', note: 'and joins conditions: both must be true. Here: at least 700px wide AND held sideways.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Two, three, five',
      caption: 'Resize the preview from phone to laptop. The gallery goes from two, to three, to five columns.',
      code: '<style>\n  body { background-color: #14213D; font-family: Verdana, sans-serif; }\n  .gallery { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }\n  .gallery img { width: 100%; border-radius: 6px; }\n  @media (min-width: 700px) {\n    .gallery { grid-template-columns: repeat(3, 1fr); }\n  }\n  @media (min-width: 1100px) {\n    .gallery { grid-template-columns: repeat(5, 1fr); }\n  }\n</style>\n<section class="gallery">\n  <img src="cover-1.png" alt="Sunrise in Osu cover"><img src="cover-2.png" alt="Jollof Bounce cover"><img src="cover-3.png" alt="Night Bus to Kumasi cover">\n  <img src="cover-1.png" alt="Accra Sunrise Mix cover"><img src="cover-2.png" alt="Harmattan Morning cover">\n</section>\n',
      challenge: 'Swap the order of the two media queries. On a big laptop, which one wins now?',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: '@media (condition) { rules }. Order min-width queries from small to large, so the bigger one wins on big screens.',
    },
  ],
  apply: {
    scenario: 'Every character explained.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each part to its job.',
        pairs: [
          ['@media', 'Starts a media query'],
          ['(min-width: 700px)', 'The condition'],
          ['{ ... }', 'Rules that apply when it\'s true'],
          ['and', 'Both conditions must be true'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Add a second query: from 1100px, .gallery gets repeat(5, 1fr). Put it after the 700px one',
        starter: '<style>\n  .gallery { display: grid; grid-template-columns: repeat(2, 1fr); }\n  @media (min-width: 700px) {\n    .gallery { grid-template-columns: repeat(3, 1fr); }\n  }\n\n</style>\n<section class="gallery"><img src="cover-1.png" alt="Sunrise in Osu cover"></section>\n',
        solution: '<style>\n  .gallery { display: grid; grid-template-columns: repeat(2, 1fr); }\n  @media (min-width: 700px) {\n    .gallery { grid-template-columns: repeat(3, 1fr); }\n  }\n  @media (min-width: 1100px) {\n    .gallery { grid-template-columns: repeat(5, 1fr); }\n  }\n</style>\n<section class="gallery"><img src="cover-1.png" alt="Sunrise in Osu cover"></section>\n',
        hint: '@media (min-width: 1100px) { .gallery { grid-template-columns: repeat(5, 1fr); } }',
        checks: [
          { message: 'A 1100px query', codeIncludes: '1100px' },
          { message: 'Five columns', codeIncludes: 'repeat(5' },
          { message: 'Still a grid', dom: { selector: '.gallery', style: 'display', styleValue: 'grid' } },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'On a 1200px laptop, how many columns?',
        code: '.gallery { grid-template-columns: repeat(2, 1fr); }\n@media (min-width: 700px) { .gallery { grid-template-columns: repeat(3, 1fr); } }\n@media (min-width: 1100px) { .gallery { grid-template-columns: repeat(5, 1fr); } }',
        language: 'css',
        options: [
          { text: 'Five: both queries are true, and the later one wins' },
          { text: 'Three', why: 'The 1100px query also applies and comes later.' },
          { text: 'Two', why: 'Both queries apply at 1200px.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'At 800px wide, does the query apply?',
        groups: ['Applies', 'Doesn\'t apply'],
        items: [
          { text: '@media (min-width: 700px)', group: 0 },
          { text: '@media (min-width: 1100px)', group: 1 },
          { text: '@media (min-width: 600px)', group: 0 },
          { text: '@media (min-width: 900px)', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'My 1100px query is above the 700px one, and big laptops show three columns. Why?',
        options: [
          { text: 'Both apply on a big laptop, so the later one wins. Put the 1100px query after the 700px one.' },
          { text: '1100px is too big a number.', why: 'It\'s the order.' },
          { text: 'Media queries can\'t be stacked.', why: 'They can; order them small to large.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that will never let the 5-column layout win.',
        language: 'css',
        lines: ['@media (min-width: 1100px) { .gallery { grid-template-columns: repeat(5, 1fr); } }', '@media (min-width: 700px) { .gallery { grid-template-columns: repeat(3, 1fr); } }', '.gallery img { width: 100%; }'],
        bug: 1,
        explanation: 'The 700px query comes after the 1100px one, so on big screens it overrides it. Move it above.',
      },
      {
        kind: 'mcq',
        prompt: 'What does "and" do between two conditions?',
        options: [
          { text: 'Both must be true for the rules to apply' },
          { text: 'Either one is enough', why: 'That would be a comma.' },
          { text: 'It adds the two widths together', why: 'It joins conditions.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the second query.',
        language: 'css',
        template: '[[1]] (min-width: 1100px) [[2]]\n  .gallery { grid-template-columns: repeat(5, 1fr); }\n}',
        blanks: [['@media'], ['{']],
        distractors: ['@screen', '(', 'if'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Order min-width queries from small to large, or large to small? (two words, first word: small)',
        answers: ['small to large', 'small-to-large', 'smallest to largest'],
        placeholder: 'Small to...',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the gallery CSS in the right order.',
        language: 'css',
        lines: ['.gallery { grid-template-columns: repeat(2, 1fr); }', '@media (min-width: 700px) { .gallery { grid-template-columns: repeat(3, 1fr); } }', '@media (min-width: 1100px) { .gallery { grid-template-columns: repeat(5, 1fr); } }'],
      },
    ],
  },
  reflect: {
    prompt: 'How many breakpoints does your own page need? Where?',
    starters: ['I need...', 'At about...'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Search "MDN using media queries" and read about the different features you can test, like width and orientation.',
  },
  notes: 'Media query syntax per Media Queries Level 4; "and" joins features, a comma means "or".',
};

export default lesson;
