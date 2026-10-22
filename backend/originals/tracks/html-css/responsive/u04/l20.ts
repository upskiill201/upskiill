import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 4 · Lesson 20 — Chapter Challenge: Mensah Beats v1.4, the beat grid and the gig table. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: Mensah Beats v1.4',
  summary: 'A record shop in Osu wants to feature local producers on a screen by their door, showing artists\' websites. They pick Mensah Beats. On a big screen, the cover wall has to look its best. Build v1.4 from memory.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build a gallery that counts its own columns', 'Feature one item that spans cells', 'Use Grid for layout and a table for data'],
  learn: [
    {
      kind: 'story',
      title: 'On the record shop screen',
      beats: [
        { speaker: 'narrator', text: 'Four weeks to uni. A record shop in Osu puts Mensah Beats on the big screen by the door.' },
        { speaker: 'narrator', text: 'Eight columns of covers on the wide screen. Rain on Zinc, the newest, big in the top-left corner. The gig table beside it.' },
        { speaker: 'efua', text: 'It looks like a real record shop wall. Inside a real record shop.' },
        { speaker: 'kofi', text: 'And on Grandma\'s phone, it\'s two columns. Same CSS.' },
        { speaker: 'tey', text: 'One more time, from memory. Next chapter: making the whole page rearrange itself for phones first.' },
      ],
    },
    {
      kind: 'steps',
      title: 'The site so far',
      steps: [
        { title: 'v1.2', body: 'Classes: one .card base, restyled in one line.' },
        { title: 'v1.3', body: 'Flexbox: a header that wraps, cards that pick their own row.', code: '.beat-list .card { flex: 1 1 220px; }', language: 'css' },
        { title: 'v1.4 (tonight)', body: 'Grid: page areas, a cover wall that counts its columns, a feature cover, and a real table for gigs.', code: '.gallery { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); }', language: 'css' },
        { title: 'Next chapter', body: 'Phones first: the viewport, media queries, and one layout that works on every screen in the house.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: Mensah Beats v1.4.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Step 1: the wall. .gallery becomes a grid that counts its columns, repeat(auto-fill, minmax(150px, 1fr)), with a 16px gap',
        starter: '<style>\n\n</style>\n<section class="gallery"><img src="cover-1.png" alt="Rain on Zinc cover"><img src="cover-2.png" alt="Jollof Bounce cover"></section>\n',
        solution: '<style>\n  .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 16px; }\n</style>\n<section class="gallery"><img src="cover-1.png" alt="Rain on Zinc cover"><img src="cover-2.png" alt="Jollof Bounce cover"></section>\n',
        hint: 'display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 16px;',
        checks: [
          { message: 'A grid', dom: { selector: '.gallery', style: 'display', styleValue: 'grid' } },
          { message: 'Columns set', dom: { selector: '.gallery', style: 'grid-template-columns' } },
          { message: '16px gap', dom: { selector: '.gallery', style: 'gap', styleValue: '16px' } },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Step 2: the feature. .feature spans 2 columns and 2 rows',
        starter: '<style>\n  .gallery { display: grid; grid-template-columns: repeat(4, 1fr); }\n\n</style>\n<section class="gallery"><img class="feature" src="cover-1.png" alt="Rain on Zinc cover"></section>\n',
        solution: '<style>\n  .gallery { display: grid; grid-template-columns: repeat(4, 1fr); }\n  .feature { grid-column: span 2; grid-row: span 2; }\n</style>\n<section class="gallery"><img class="feature" src="cover-1.png" alt="Rain on Zinc cover"></section>\n',
        hint: '.feature { grid-column: span 2; grid-row: span 2; }',
        checks: [
          { message: 'Wide', dom: { selector: '.feature', style: 'grid-column' } },
          { message: 'Tall', dom: { selector: '.feature', style: 'grid-row' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Grid, or a table?',
        groups: ['Grid', 'Table'],
        items: [
          { text: 'The cover wall', group: 0 },
          { text: 'Gig dates and venues', group: 1 },
          { text: 'Beats and gigs side by side', group: 0 },
          { text: 'Ticket prices by date', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'A 1300px shop screen, minmax(150px, 1fr), gap 16px. How many columns?',
        code: 'grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));\ngap: 16px;',
        language: 'css',
        options: [
          { text: '8', why: '8 × 150 + 7 × 16 = 1312px, just too wide.' },
          { text: '4', why: 'Many more fit at 150px.' },
          { text: '7: 7 × 150 + 6 × 16 = 1146px fits; 8 needs 1312px' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Step 3: the gigs. Add the heading row to the table: th cells Date and Venue',
        starter: '<table>\n  <caption>Upcoming gigs</caption>\n\n  <tr><td>18 Oct</td><td>Labadi Beach</td></tr>\n</table>\n',
        solution: '<table>\n  <caption>Upcoming gigs</caption>\n  <tr><th>Date</th><th>Venue</th></tr>\n  <tr><td>18 Oct</td><td>Labadi Beach</td></tr>\n</table>\n',
        hint: '<tr><th>Date</th><th>Venue</th></tr>',
        checks: [
          { message: 'Two headings', dom: { selector: 'th', count: 2 } },
          { message: 'Venue is one', dom: { selector: 'th', text: 'Venue' } },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the reason the newest beat is announced last by screen readers.',
        language: 'html',
        lines: ['<section class="gallery">', '  <img src="cover-2.png" alt="Jollof Bounce cover">', '  <img class="feature" src="cover-1.png" alt="Rain on Zinc cover">'],
        bug: 2,
        explanation: 'The newest beat is last in the HTML. Move it to the top of the gallery, not just on screen.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Should I rebuild the header in Grid now that the page is a grid?',
        options: [
          { text: 'No: it\'s one row, so Flexbox stays. The header is a grid area with Flexbox inside.' },
          { text: 'Yes, everything must be Grid.', why: 'Each tool has its job.' },
          { text: 'Make the header a table.', why: 'It isn\'t data.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each problem from this chapter to its fix.',
        pairs: [
          ['Last row stretching', 'display: grid'],
          ['Tiny covers on phones', 'auto-fill with minmax()'],
          ['Gig list read without headings', 'A table with th'],
          ['Newest beat read last', 'Move it in the HTML'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Final step: the page. .page gets display grid, columns 2fr 1fr and areas "head head" "beats gigs"',
        starter: '<style>\n  header { grid-area: head; }\n  .gallery { grid-area: beats; }\n  .gigs { grid-area: gigs; }\n\n</style>\n<main class="page"><header>Mensah Beats</header><section class="gallery">Covers</section><section class="gigs">Gigs</section></main>\n',
        solution: '<style>\n  header { grid-area: head; }\n  .gallery { grid-area: beats; }\n  .gigs { grid-area: gigs; }\n  .page { display: grid; grid-template-columns: 2fr 1fr; grid-template-areas: "head head" "beats gigs"; }\n</style>\n<main class="page"><header>Mensah Beats</header><section class="gallery">Covers</section><section class="gigs">Gigs</section></main>\n',
        hint: '.page { display: grid; grid-template-columns: 2fr 1fr; grid-template-areas: "head head" "beats gigs"; }',
        checks: [
          { message: 'A grid', dom: { selector: '.page', style: 'display', styleValue: 'grid' } },
          { message: 'Two columns', dom: { selector: '.page', style: 'grid-template-columns' } },
          { message: 'With an area map', dom: { selector: '.page', style: 'grid-template-areas' } },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Tidy the gallery figures and images.',
        language: 'css',
        template: '.gallery figure { margin: [[1]]; }\n.gallery img { width: [[2]]; }',
        blanks: [['0'], ['100%']],
        distractors: ['auto', '150px', '40px'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What version of Mensah Beats was on the record shop screen? (e.g. v1.3)',
        answers: ['v1.4', '1.4'],
        placeholder: 'A version',
      },
    ],
  },
  reflect: {
    prompt: 'If your site was on a big screen in a shop window, what would you want people to notice first?',
    starters: ['I\'d want them to see...', 'So I\'d make it...'],
  },
  deepen: {
    title: 'Do it for real',
    summary: 'Give your own site a grid gallery and page areas, test it on the biggest and smallest screens you can, and upload it.',
  },
  notes: 'Chapter 4 finale of Course 2. 1300px: 7 columns need 1146px, 8 need 1312px (story says "eight columns" on the shop\'s wider screen; the predictOutput uses 1300px). Next chapter: Phones first (3 weeks).',
};

export default lesson;
