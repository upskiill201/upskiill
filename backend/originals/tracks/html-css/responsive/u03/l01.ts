import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 3 · Lesson 1 — opens the chapter: a header like a real site; display: flex puts children in a row. Story choice. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'A header like a real site',
  summary: 'The organiser shared Mensah Beats on her page, and people are opening it on laptops. At the top: "Mensah Beats", then Beats, Gigs and Book me, each stacked on its own line. Efua: "Real sites put the name on the left and the links on the right, in one row."',
  minutes: 11,
  outcomes: ['Explain why boxes stack by default', 'Put a container\'s children in a row with display: flex', 'Recognise Flexbox as the tool for lining things up'],
  learn: [
    {
      kind: 'story',
      title: 'Five weeks to uni',
      beats: [
        { speaker: 'narrator', text: 'Five weeks to uni. Hundreds of new visitors, most of them on laptops. The top of the page is a tall stack: name, link, link, link.' },
        { speaker: 'efua', text: 'Name on the left, links on the right, one neat row. Every music site does it.' },
        { speaker: 'kofi', text: 'I tried putting spaces between them. It looks different on every screen.' },
        { speaker: 'miracle', text: 'Time for Flexbox. It was made for exactly this.' },
      ],
      choice: {
        prompt: 'How should Kofi put the header in one row?',
        options: [
          {
            text: 'Use Flexbox: display: flex on the header, so its children line up in a row.',
            outcome: 'One line of CSS, and the name and links sit side by side on every screen. Next he can space them however he likes.',
            best: true,
          },
          {
            text: 'Put the name and links in a table, one cell each.',
            outcome: 'It lines up, but tables are for data. Screen readers announce "table, one row, four columns", and it won\'t bend on phones.',
          },
          {
            text: 'Type lots of &nbsp; spaces between them.',
            outcome: 'The gap is different on every screen, and on Ama\'s phone the links fall onto a second line at random.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p><strong>Why they stack:</strong> headings, paragraphs and lists are block boxes, so each starts on a new line. <strong>display: flex</strong> on a parent changes that: its children line up in a row, side by side. The parent is the <strong>flex container</strong>; its children are <strong>flex items</strong>.</p>',
    },
    {
      kind: 'tryIt',
      title: 'One line, one row',
      caption: 'The header\'s children are a p and a nav. With display: flex they sit side by side.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; margin: 0; }\n  header { display: flex; background-color: #1F2E52; padding: 16px; }\n  a { color: #FF9600; margin-right: 12px; }\n</style>\n<header>\n  <p><strong>Mensah Beats</strong></p>\n  <nav><p><a href="#beats">Beats</a><a href="#gigs">Gigs</a><a href="#book">Book me</a></p></nav>\n</header>\n',
      challenge: 'Delete display: flex. The name and the links stack again.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'display: flex goes on the parent. Its children line up in a row.',
    },
    {
      kind: 'text',
      html: '<p><strong>In this chapter:</strong> rows and columns, spacing and centring (finally), wrapping on small screens, sharing space, and a proper navigation bar. The climax: a header that looks professional on every screen.</p>',
    },
  ],
  apply: {
    scenario: 'The stacked header.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why do the name and links stack on top of each other?',
        options: [
          { text: 'They\'re block boxes, and each block starts on a new line' },
          { text: 'The screen is too small', why: 'They stack on laptops too.' },
          { text: 'Links can\'t be next to text', why: 'It\'s how block boxes behave.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Put the header\'s children in one row: display flex on header',
        starter: '<style>\n\n</style>\n<header>\n  <p>Mensah Beats</p>\n  <nav><a href="#gigs">Gigs</a></nav>\n</header>\n',
        solution: '<style>\n  header { display: flex; }\n</style>\n<header>\n  <p>Mensah Beats</p>\n  <nav><a href="#gigs">Gigs</a></nav>\n</header>\n',
        hint: 'header { display: flex; }',
        checks: [
          { message: 'The header is a flex container', dom: { selector: 'header', style: 'display', styleValue: 'flex' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to what happened.',
        pairs: [
          ['Flexbox', 'Side by side on every screen'],
          ['A table', 'Read out as a data table'],
          ['&nbsp; spaces', 'Random gaps and wrapping'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'In this header, container or item?',
        groups: ['Flex container', 'Flex item'],
        items: [
          { text: 'header { display: flex; }', group: 0 },
          { text: 'The p with the name', group: 1 },
          { text: 'The nav', group: 1 },
          { text: 'The element with display: flex', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Do I put display: flex on each link?',
        options: [
          { text: 'Yes, every item needs it.', why: 'It goes on the container.' },
          { text: 'On body.', why: 'Then everything on the page lines up in one row.' },
          { text: 'No, on the parent. The parent becomes the container and lines up its children.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Kofi wants the name and nav side by side. Tap the rule on the wrong element.',
        language: 'css',
        lines: ['body { margin: 0; }', 'p { display: flex; }', 'header { padding: 16px; }'],
        bug: 1,
        explanation: 'display: flex goes on the parent of the things you want in a row: the header.',
        fix: 'header { display: flex; padding: 16px; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How do the three paragraphs sit?',
        code: 'section { display: flex; }\n\n<section><p>One</p><p>Two</p><p>Three</p></section>',
        language: 'html',
        options: [
          { text: 'Stacked, one per line', why: 'display: flex puts children in a row.' },
          { text: 'Side by side, in one row' },
          { text: 'On top of each other in the same spot', why: 'They line up next to each other.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Line up the header.',
        language: 'css',
        template: 'header { [[1]]: [[2]]; }',
        blanks: [['display'], ['flex']],
        distractors: ['row', 'block', 'layout'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'An element with display: flex is called a flex ___. (one word)',
        answers: ['container'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why not use a table to line up a header?',
        options: [
          { text: 'Tables are for data, so screen readers announce rows and columns that aren\'t really there' },
          { text: 'Tables can\'t hold links', why: 'They can. They just mean "data".' },
          { text: 'Tables are banned', why: 'They\'re fine for data, wrong for layout.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Look at the top of three websites you use. Where are the name and the links?',
    starters: ['Most of them...', 'One was different:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Wrap the top of your own page in a header, and give it display: flex.',
  },
  notes: 'Opens Course 2, Chapter 3 (Lining things up). Flex container/items terms per CSS Flexible Box Layout. Layout tables are discouraged for accessibility (WCAG 1.3.1).',
};

export default lesson;
