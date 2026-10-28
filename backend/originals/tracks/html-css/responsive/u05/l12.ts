import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 5 · Lesson 12 — a full phones-first page stylesheet with two breakpoints. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'One stylesheet, three screens',
  summary: 'Miracle lays Kofi\'s whole layout out in one block: what every phone gets, what tablets add, what big laptops add. Tap each part to see which screen it\'s for.',
  minutes: 11,
  outcomes: ['Read a phones-first stylesheet with two breakpoints', 'Say which rules each screen size gets', 'Spot rules in the wrong layer'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each layer',
      text: '/* Every screen */\n.page { display: grid; gap: 16px; padding: 16px; grid-template-areas: "head" "beats" "gigs"; }\n.gallery { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }\nh1 { font-size: 2.25rem; }\n\n/* 700px and up */\n@media (min-width: 700px) {\n  .page { grid-template-columns: 2fr 1fr; grid-template-areas: "head head" "beats gigs"; }\n  .gallery { grid-template-columns: repeat(3, 1fr); }\n  h1 { font-size: 4rem; }\n}\n\n/* 1100px and up */\n@media (min-width: 1100px) {\n  .page { max-width: 1200px; margin: 0 auto; }\n  .gallery { grid-template-columns: repeat(5, 1fr); }\n}',
      hotspots: [
        { phrase: '/* Every screen */', note: 'The base layer: phones get only this. One stacked column, a two-column gallery, a comfortable heading.' },
        { phrase: '"head" "beats" "gigs"', note: 'On phones the areas stack, one under another, in reading order.' },
        { phrase: '/* 700px and up */', note: 'Tablets and laptops get the base PLUS this: two page columns, three gallery columns, a big heading.' },
        { phrase: '/* 1100px and up */', note: 'Big screens get everything above plus this: a five-column gallery and a max-width so the page doesn\'t stretch across a huge monitor.' },
        { phrase: 'max-width: 1200px; margin: 0 auto;', note: 'The centred column from Chapter 1, back again, only for very wide screens.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Three layers',
      caption: 'Resize the preview: phone, tablet, laptop. Each layer adds a little.',
      code: '<style>\n  body { margin: 0; background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .page { display: grid; gap: 16px; padding: 16px; grid-template-areas: "head" "beats" "gigs"; }\n  header { grid-area: head; } .gallery { grid-area: beats; } .gigs { grid-area: gigs; }\n  .gallery { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }\n  .gallery img { width: 100%; height: auto; border-radius: 6px; }\n  h1 { font-size: 2.25rem; margin: 0; color: #FF9600; }\n  @media (min-width: 700px) {\n    .page { grid-template-columns: 2fr 1fr; grid-template-areas: "head head" "beats gigs"; }\n    .gallery { grid-template-columns: repeat(3, 1fr); }\n    h1 { font-size: 4rem; }\n  }\n  @media (min-width: 1100px) {\n    .page { max-width: 1200px; margin: 0 auto; }\n    .gallery { grid-template-columns: repeat(5, 1fr); }\n  }\n</style>\n<main class="page">\n  <header><h1>Mensah Beats</h1></header>\n  <section class="gallery">\n    <img src="cover-1.png" alt="Rain on Zinc cover"><img src="cover-2.png" alt="Jollof Bounce cover"><img src="cover-3.png" alt="Night Bus to Kumasi cover"><img src="cover-1.png" alt="Sunrise in Osu cover"><img src="cover-2.png" alt="Harmattan Morning cover">\n  </section>\n  <section class="gigs"><h2>Gigs</h2><p>Sound Up Saturdays, 25 Oct.</p></section>\n</main>\n',
      challenge: 'Change the 1100px gallery to repeat(4, 1fr).',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Label your layers with comments: every screen, 700px and up, 1100px and up.',
    },
  ],
  apply: {
    scenario: 'One stylesheet, three screens.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Does a 360px phone get this rule?',
        groups: ['Phone gets it', 'Phone doesn\'t'],
        items: [
          { text: '.gallery with repeat(2, 1fr)', group: 0 },
          { text: 'h1 at 4rem', group: 1 },
          { text: 'Stacked page areas', group: 0 },
          { text: 'max-width: 1200px on .page', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'On an 800px tablet, how many gallery columns, and how big is the h1?',
        code: '.gallery { grid-template-columns: repeat(2, 1fr); } h1 { font-size: 2.25rem; }\n@media (min-width: 700px) { .gallery { grid-template-columns: repeat(3, 1fr); } h1 { font-size: 4rem; } }\n@media (min-width: 1100px) { .gallery { grid-template-columns: repeat(5, 1fr); } }',
        language: 'css',
        options: [
          { text: 'Five columns, 4rem heading', why: '800px is under 1100px.' },
          { text: 'Three columns, 4rem heading' },
          { text: 'Two columns, 2.25rem heading', why: 'The 700px layer applies.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Add the big-screen layer: from 1100px, .page gets max-width 1200px and margin 0 auto',
        starter: '<style>\n  .page { display: grid; gap: 16px; }\n  @media (min-width: 700px) {\n    .page { grid-template-columns: 2fr 1fr; }\n  }\n\n</style>\n<main class="page"><section>Beats</section><section>Gigs</section></main>\n',
        solution: '<style>\n  .page { display: grid; gap: 16px; }\n  @media (min-width: 700px) {\n    .page { grid-template-columns: 2fr 1fr; }\n  }\n  @media (min-width: 1100px) {\n    .page { max-width: 1200px; margin: 0 auto; }\n  }\n</style>\n<main class="page"><section>Beats</section><section>Gigs</section></main>\n',
        hint: '@media (min-width: 1100px) { .page { max-width: 1200px; margin: 0 auto; } }',
        checks: [
          { message: 'A big-screen layer', codeIncludes: '1100px' },
          { message: 'Capped width', codeIncludes: '1200px' },
          { message: 'Centred', codeIncludes: 'auto' },
          { message: 'The base grid kept', dom: { selector: '.page', style: 'display', styleValue: 'grid' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each layer to who gets it.',
        pairs: [
          ['Base CSS', 'Every screen'],
          ['@media (min-width: 700px)', 'Tablets and up'],
          ['@media (min-width: 1100px)', 'Big laptops and monitors'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Why the max-width only at 1100px and up?',
        options: [
          { text: 'Phones need max-width too.', why: 'They\'re narrower than 1200px anyway.' },
          { text: 'No reason.', why: 'Huge monitors would stretch it.' },
          { text: 'On smaller screens the page should use the whole width. Only on huge screens would it stretch too far.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the rule in the wrong layer.',
        language: 'css',
        lines: ['/* Every screen */ .gallery { grid-template-columns: repeat(5, 1fr); }', '/* 700px and up */ h1 { font-size: 4rem; }', '/* 1100px and up */ .page { max-width: 1200px; }'],
        bug: 0,
        explanation: 'Five columns as the base means five tiny columns on phones. That belongs in the 1100px layer.',
      },
      {
        kind: 'mcq',
        prompt: 'A big laptop gets which layers?',
        options: [
          { text: 'All three: base, 700px and 1100px' },
          { text: 'Only the 1100px one', why: 'min-width layers add up.' },
          { text: 'Only the base', why: 'Both queries are true on a big laptop.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Stack the areas for phones.',
        language: 'css',
        template: '.page { grid-template-areas: "[[1]]" "beats" "[[2]]"; }',
        blanks: [['head'], ['gigs']],
        distractors: ['foot', 'main', 'side'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many layers does this stylesheet have, counting the base? (a number)',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the layers in order.',
        lines: ['/* Every screen */', '/* 700px and up */', '/* 1100px and up */'],
      },
    ],
  },
  reflect: {
    prompt: 'Sort your own CSS into layers. Which rules are for every screen?',
    starters: ['Every screen gets...', 'Only wide screens get...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Reorganise your style.css into labelled layers: every screen, then each min-width breakpoint from small to large.',
  },
  notes: 'Layered mobile-first stylesheet. min-width media queries are cumulative on wider screens.',
};

export default lesson;
