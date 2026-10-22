import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 5 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9 (breakpoints, responsive history, images, headings). */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: nothing squashed',
  summary: 'The studio photo keeps its shape. The name fits on one line on Ama\'s phone and goes big on the laptop. The breakpoint sits where the text started to stretch, not where some list said. Quick checkpoint.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Pick breakpoints from the content', 'Keep images in shape', 'Size headings phones-first'],
  learn: [
    {
      kind: 'story',
      title: 'Nothing squashed',
      beats: [
        { speaker: 'ama', text: 'The photo isn\'t a skinny noodle any more.' },
        { speaker: 'kofi', text: 'height: auto. And the name fits now.' },
        { speaker: 'tey', text: 'Fluid grids, flexible images, media queries: all three ingredients. Check them.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: nothing squashed.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Keep the studio photo in shape on phones: img gets max-width 100% and height auto',
        starter: '<style>\n\n</style>\n<img src="images/phone-studio.png" alt="A phone recording a beat in Kofi\'s bedroom studio" width="600" height="400">\n',
        solution: '<style>\n  img { max-width: 100%; height: auto; }\n</style>\n<img src="images/phone-studio.png" alt="A phone recording a beat in Kofi\'s bedroom studio" width="600" height="400">\n',
        hint: 'img { max-width: 100%; height: auto; }',
        checks: [
          { message: 'Shrinks to fit', dom: { selector: 'img', style: 'max-width', styleValue: '100%' } },
          { message: 'Keeps its shape', dom: { selector: 'img', style: 'height', styleValue: 'auto' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each ingredient of responsive design to an example.',
        pairs: [
          ['Fluid grids', 'grid-template-columns: 2fr 1fr'],
          ['Flexible images', 'max-width: 100%; height: auto'],
          ['Media queries', '@media (min-width: 700px)'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'A good way to pick a breakpoint, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Where the text lines get too long', group: 0 },
          { text: 'The width of one phone model', group: 1 },
          { text: 'Where the gallery looks sparse', group: 0 },
          { text: 'A new breakpoint every 50px', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'On a 1000px laptop, how big is the h1?',
        code: 'h1 { font-size: 2.25rem; }\n@media (min-width: 700px) { h1 { font-size: 4rem; } }',
        language: 'css',
        options: [
          { text: '2.25rem', why: 'The query applies at 1000px and comes later.' },
          { text: '6.25rem', why: 'One value wins.' },
          { text: '4rem' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that squashes photos on phones.',
        language: 'css',
        lines: ['img { max-width: 100%; height: auto; }', '.studio img { height: 400px; }', '.gallery img { object-fit: cover; }'],
        bug: 1,
        explanation: 'A fixed height can\'t follow the shrinking width. Remove it or use height: auto.',
        fix: '.studio img { height: auto; }',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Who came up with "responsive web design" anyway?',
        options: [
          { text: 'Ethan Marcotte, in a 2010 article: fluid grids, flexible images and media queries.' },
          { text: 'Apple, with the first iPhone.', why: 'The iPhone came in 2007; the name in 2010.' },
          { text: 'It\'s always been called that.', why: 'It was named in 2010.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What does object-fit: cover do?',
        options: [
          { text: 'Squashes the image to fit', why: 'It keeps the proportions.' },
          { text: 'Hides the image', why: 'It fills the box.' },
          { text: 'Fills the box and trims the edges, without squashing' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Phones-first heading.',
        language: 'css',
        template: 'h1 { font-size: [[1]]; }\n@media (min-width: 700px) { h1 { font-size: [[2]]; } }',
        blanks: [['2.25rem'], ['4rem']],
        distractors: ['64px', '1rem', '10rem'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year did phones and tablets overtake computers for web pages opened worldwide? (a year)',
        answers: ['2016'],
        placeholder: 'A year',
      },
      {
        kind: 'writeCode',
        prompt: 'The text gets too stretched past 760px: add a min-width 760px query that gives main a max-width of 640px',
        starter: '<style>\n  main { padding: 16px; }\n\n</style>\n<main><p>Kofi Mensah makes beats in Accra.</p></main>\n',
        solution: '<style>\n  main { padding: 16px; }\n  @media (min-width: 760px) {\n    main { max-width: 640px; }\n  }\n</style>\n<main><p>Kofi Mensah makes beats in Accra.</p></main>\n',
        hint: '@media (min-width: 760px) { main { max-width: 640px; } }',
        checks: [
          { message: 'A 760px query', codeIncludes: '760px' },
          { message: 'Capping the line length', codeIncludes: '640px' },
          { message: 'Phone padding kept', dom: { selector: 'main', style: 'padding-left', styleValue: '16px' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which of the three ingredients does your page use well? Which is missing?',
    starters: ['I use...', 'I\'m missing...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Check every image on your page keeps its shape on a phone, and move your breakpoint to where your content needs it.',
  },
  notes: 'Checkpoint 2. Reviews l06–l09.',
};

export default lesson;
