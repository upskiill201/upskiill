import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 3 · Lesson 19 — the v1.3 layout stylesheet: header, nav, Book me, card row. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'The whole layout in Flexbox',
  summary: 'Before uploading v1.3, Kofi reads the layout part of his style.css with Miracle. Three flex containers, one auto margin, and nothing that runs off a phone. Tap each part.',
  minutes: 11,
  outcomes: ['Read a complete Flexbox layout', 'Explain which element each flex rule is on, and why', 'Spot a line that would break the layout on a phone'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part of the layout',
      text: '.site-header { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 8px; }\n.nav-links { display: flex; flex-wrap: wrap; gap: 4px; list-style: none; margin: 0; padding: 0; }\n.nav-links a { display: inline-block; padding: 12px; }\n.book { margin-left: auto; }\n.beat-list { display: flex; flex-wrap: wrap; gap: 16px; }\n.beat-list .card { flex: 1 1 220px; display: flex; flex-direction: column; gap: 8px; align-items: flex-start; }',
      hotspots: [
        { phrase: 'justify-content: space-between; align-items: center;', note: 'Name far left, nav far right, middles lined up.' },
        { phrase: 'flex-wrap: wrap; gap: 4px;', note: 'On a small phone, the links drop onto a second line instead of running off the edge.' },
        { phrase: 'padding: 12px;', note: 'Every link is a thumb-sized target.' },
        { phrase: '.book { margin-left: auto; }', note: 'Book me is pushed to the far end of the links row.' },
        { phrase: 'flex: 1 1 220px;', note: 'Cards start at 220px and grow to fill each row: four on a laptop, one on a phone.' },
        { phrase: 'flex-direction: column; gap: 8px; align-items: flex-start;', note: 'Each card is itself a column: cover, name, Play button, with the button at its own width.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Mensah Beats v1.3',
      caption: 'The header and two cards. Try phone and laptop sizes.',
      code: '<style>\n  * { box-sizing: border-box; }\n  body { margin: 0; background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .site-header { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 8px; padding: 8px 16px; background-color: #1F2E52; }\n  .logo { color: #FFF6E5; font-weight: bold; }\n  .nav-links { display: flex; flex-wrap: wrap; gap: 4px; list-style: none; margin: 0; padding: 0; }\n  .nav-links a { display: inline-block; padding: 12px; color: #FF9600; }\n  .beat-list { display: flex; flex-wrap: wrap; gap: 16px; padding: 16px; }\n  .beat-list .card { flex: 1 1 220px; display: flex; flex-direction: column; gap: 8px; align-items: flex-start; background-color: #1F2E52; border: 2px solid #FF9600; border-radius: 12px; padding: 16px; }\n  .card img { max-width: 100%; border-radius: 8px; }\n  .play-button { background-color: #FF9600; color: #14213D; padding: 12px 16px; border-radius: 8px; }\n</style>\n<header class="site-header">\n  <a class="logo" href="#top">Mensah Beats</a>\n  <nav><ul class="nav-links"><li><a href="#beats">Beats</a></li><li><a href="#gigs">Gigs</a></li><li><a href="#book">Book me</a></li></ul></nav>\n</header>\n<section class="beat-list">\n  <article class="card"><img src="cover-1.png" alt="Album cover for Sunrise in Osu"><h2>Sunrise in Osu</h2><a class="play-button" href="#play">Play</a></article>\n  <article class="card"><img src="cover-3.png" alt="Album cover for Night Bus to Kumasi"><h2>Night Bus to Kumasi</h2><a class="play-button" href="#play">Play</a></article>\n</section>\n',
      challenge: 'Change the card basis from 220px to 400px. On a laptop, the cards go one per row.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Header, links, cards: each is a flex container. Each card is a flex column inside a flex row.',
    },
  ],
  apply: {
    scenario: 'Reading v1.3.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each rule to its job.',
        pairs: [
          ['.site-header', 'Name left, nav right'],
          ['.nav-links', 'Links in a row that can wrap'],
          ['.book', 'Book me pushed to the end'],
          ['.beat-list', 'Cards in a wrapping row'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A card is a flex item AND a flex container. How?',
        options: [
          { text: 'It\'s an item in .beat-list\'s row, and a column container for its own cover, name and button' },
          { text: 'It can\'t be both', why: 'Nesting is normal.' },
          { text: 'Only the header can be both', why: 'Any element can.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Make each card a column: display flex, flex-direction column and gap 8px on .beat-list .card',
        starter: '<style>\n  .beat-list { display: flex; flex-wrap: wrap; gap: 16px; }\n\n</style>\n<section class="beat-list"><article class="card"><h2>Sunrise in Osu</h2><a href="#play">Play</a></article></section>\n',
        solution: '<style>\n  .beat-list { display: flex; flex-wrap: wrap; gap: 16px; }\n  .beat-list .card { display: flex; flex-direction: column; gap: 8px; }\n</style>\n<section class="beat-list"><article class="card"><h2>Sunrise in Osu</h2><a href="#play">Play</a></article></section>\n',
        hint: '.beat-list .card { display: flex; flex-direction: column; gap: 8px; }',
        checks: [
          { message: 'The card is a container', dom: { selector: '.card', style: 'display', styleValue: 'flex' } },
          { message: 'A column', dom: { selector: '.card', style: 'flex-direction', styleValue: 'column' } },
          { message: 'With gaps', dom: { selector: '.card', style: 'gap', styleValue: '8px' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which axis does it work on in .site-header (a row)?',
        groups: ['Left to right', 'Top to bottom'],
        items: [
          { text: 'justify-content: space-between', group: 0 },
          { text: 'align-items: center', group: 1 },
          { text: 'margin-left: auto (on .book)', group: 0 },
          { text: 'Lining up the name and links\' middles', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that would make Ama scroll sideways.',
        language: 'css',
        lines: ['.nav-links { display: flex; flex-wrap: wrap; }', '.beat-list .card { flex: 0 0 400px; }', '.card img { max-width: 100%; }'],
        bug: 1,
        explanation: 'Fixed at 400px with no shrinking: wider than a phone. Use flex: 1 1 220px.',
        fix: '.beat-list .card { flex: 1 1 220px; }',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Why align-items: flex-start inside the cards?',
        options: [
          { text: 'In a column, items stretch across by default. flex-start keeps the Play button its own width.' },
          { text: 'To push items to the top.', why: 'In a column, align-items works left to right.' },
          { text: 'No reason.', why: 'Without it the button would stretch.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How many flex containers are in v1.3\'s layout (counting every card as one)?',
        code: '.site-header, .nav-links, .beat-list, and each .card',
        language: 'css',
        options: [
          { text: 'Three, plus one per card' },
          { text: 'One', why: 'Each of these has display: flex.' },
          { text: 'None', why: 'They all use display: flex.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the card row.',
        language: 'css',
        template: '.beat-list { display: flex; flex-wrap: [[1]]; gap: 16px; }\n.beat-list .card { flex: 1 1 [[2]]; }',
        blanks: [['wrap'], ['220px']],
        distractors: ['nowrap', '100%', '0'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which property pushes Book me to the end of the links row? (hyphenated)',
        answers: ['margin-left'],
        placeholder: 'A property',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the layout rules in order, outside in.',
        language: 'css',
        lines: ['.site-header { display: flex; }', '.nav-links { display: flex; }', '.beat-list { display: flex; }', '.beat-list .card { display: flex; }'],
      },
    ],
  },
  reflect: {
    prompt: 'Draw your own page as boxes. Which ones are flex containers?',
    starters: ['My containers are...', 'Inside them...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Read your own layout CSS. For every display: flex, say out loud which children it lines up.',
  },
  notes: 'v1.3 layout. Images: cover-1.png and cover-3.png (Teyro-made).',
};

export default lesson;
