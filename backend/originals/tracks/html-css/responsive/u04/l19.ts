import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 4 · Lesson 19 — the v1.4 layout: page areas, gallery, feature, gig table, Flexbox inside. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Grid, Flexbox and a table',
  summary: 'Before uploading v1.4, Kofi and Miracle read the new layout CSS together. Grid for the page and gallery, Flexbox still running the header, and a real table for the gigs. Tap each part.',
  minutes: 11,
  outcomes: ['Read a layout that uses Grid, Flexbox and a table together', 'Explain why each tool was chosen', 'Spot a line that would break the layout on a phone'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part of the v1.4 layout',
      text: '.page { display: grid; grid-template-columns: 2fr 1fr; grid-template-areas: "head head" "beats gigs"; gap: 16px; }\n.site-header { grid-area: head; display: flex; justify-content: space-between; }\n.gallery { grid-area: beats; display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 16px; }\n.gallery .feature { grid-column: span 2; grid-row: span 2; }\n.gigs { grid-area: gigs; }\n.gigs table { width: 100%; }',
      hotspots: [
        { phrase: 'grid-template-areas: "head head" "beats gigs";', note: 'Efua\'s sketch, typed in: header across the top, beats and gigs side by side.' },
        { phrase: 'grid-area: head; display: flex;', note: 'The header is an area of the page grid AND a flex container for the name and links. Grid outside, Flexbox inside.' },
        { phrase: 'repeat(auto-fill, minmax(150px, 1fr))', note: 'The gallery counts its own columns: two on a phone, more on a laptop.' },
        { phrase: 'grid-column: span 2; grid-row: span 2;', note: 'The newest beat, first in the HTML, is the big two-by-two feature.' },
        { phrase: '.gigs table { width: 100%; }', note: 'The gig list is data, so it\'s a real table, stretched to fill its area.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Mensah Beats v1.4',
      caption: 'The page grid with the header, gallery and gig table. This is the laptop layout; Chapter 5 makes it stack on phones.',
      code: '<style>\n  body { margin: 0; background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .page { display: grid; grid-template-columns: 2fr 1fr; grid-template-areas: "head head" "beats gigs"; gap: 16px; padding: 16px; }\n  .site-header { grid-area: head; display: flex; justify-content: space-between; align-items: center; }\n  .site-header a { color: #FF9600; }\n  .gallery { grid-area: beats; display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 8px; }\n  .gallery img { width: 100%; border-radius: 6px; }\n  .gallery .feature { grid-column: span 2; grid-row: span 2; }\n  .gigs { grid-area: gigs; }\n  .gigs table { width: 100%; border-collapse: collapse; }\n  .gigs th, .gigs td { text-align: left; padding: 4px; }\n  .gigs th { color: #FF9600; }\n</style>\n<main class="page">\n  <header class="site-header"><strong>Mensah Beats</strong><a href="#book">Book me</a></header>\n  <section class="gallery">\n    <img class="feature" src="cover-1.png" alt="Rain on Zinc cover, the newest beat">\n    <img src="cover-3.png" alt="Night Bus to Kumasi cover"><img src="cover-2.png" alt="Jollof Bounce cover">\n    <img src="cover-1.png" alt="Sunrise in Osu cover"><img src="cover-2.png" alt="Harmattan Morning cover">\n  </section>\n  <section class="gigs">\n    <table>\n      <caption>Upcoming gigs</caption>\n      <tr><th>Date</th><th>Venue</th></tr>\n      <tr><td>18 Oct</td><td>Labadi Beach</td></tr>\n      <tr><td>25 Oct</td><td>Sound Up Saturdays</td></tr>\n    </table>\n  </section>\n</main>\n',
      challenge: 'Switch the preview to phone size. The two columns get squeezed: that\'s exactly what Chapter 5 fixes.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Grid for the page and gallery, Flexbox inside the header, a table for the data. Each tool doing its own job.',
    },
  ],
  apply: {
    scenario: 'Reading v1.4.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the site to its tool.',
        pairs: [
          ['The page areas', 'Grid with grid-template-areas'],
          ['Name and links in the header', 'Flexbox'],
          ['The cover wall', 'Grid with auto-fill columns'],
          ['The gig list', 'A table'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The header has grid-area: head AND display: flex. How?',
        options: [
          { text: 'One of them is ignored', why: 'Both work: item outside, container inside.' },
          { text: 'It\'s an item in the page grid and a flex container for its own children' },
          { text: 'It can\'t have both', why: 'Nesting is normal.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Place the gallery in the beats area: .gallery gets grid-area beats',
        starter: '<style>\n  .page { display: grid; grid-template-columns: 2fr 1fr; grid-template-areas: "head head" "beats gigs"; }\n\n</style>\n<main class="page"><header>Mensah Beats</header><section class="gallery">Covers</section></main>\n',
        solution: '<style>\n  .page { display: grid; grid-template-columns: 2fr 1fr; grid-template-areas: "head head" "beats gigs"; }\n  .gallery { grid-area: beats; }\n</style>\n<main class="page"><header>Mensah Beats</header><section class="gallery">Covers</section></main>\n',
        hint: '.gallery { grid-area: beats; }',
        checks: [
          { message: 'Gallery in the beats area', dom: { selector: '.gallery', style: 'grid-area', styleValue: 'beats' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Is this on the container or the item?',
        groups: ['Container', 'Item'],
        items: [
          { text: 'grid-template-areas', group: 0 },
          { text: 'grid-area: beats', group: 1 },
          { text: 'grid-template-columns', group: 0 },
          { text: 'grid-column: span 2', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that would make the gallery tiny on a phone.',
        language: 'css',
        lines: ['.gallery { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); }', '.gallery { grid-template-columns: repeat(8, 1fr); }', '.gallery img { width: 100%; }'],
        bug: 1,
        explanation: 'Eight columns on every screen: about 40px each on a phone. Let it count its own columns.',
        fix: '.gallery { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); }',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'On a phone the two page columns squeeze together. What will you do?',
        options: [
          { text: 'Tell people to use laptops.', why: 'Most fans are on phones.' },
          { text: 'Make the text smaller.', why: 'The layout needs to change, not the text.' },
          { text: 'Change the page grid to one column on small screens. That\'s next chapter: media queries.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Which area is wider on a laptop?',
        code: '.page { grid-template-columns: 2fr 1fr; grid-template-areas: "head head" "beats gigs"; }',
        language: 'css',
        options: [
          { text: 'gigs', why: 'gigs is in the 1fr column.' },
          { text: 'beats: it gets two shares' },
          { text: 'They\'re equal', why: '2fr vs 1fr.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the page map.',
        language: 'css',
        template: '.page { display: grid; grid-template-columns: 2fr 1fr; grid-template-areas: "[[1]] head" "beats [[2]]"; }',
        blanks: [['head'], ['gigs']],
        distractors: ['beats', 'foot', 'main'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does Chapter 5 use to change the layout on small screens? (two words: media ___)',
        answers: ['queries', 'query', 'media queries'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the layout rules in order, from the biggest box in.',
        language: 'css',
        lines: ['.page { display: grid; }', '.site-header { grid-area: head; display: flex; }', '.gallery { grid-area: beats; display: grid; }', '.gallery .feature { grid-column: span 2; }'],
      },
    ],
  },
  reflect: {
    prompt: 'Does your page use each tool for its own job? Which part would you change?',
    starters: ['My page uses...', 'I\'d change...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write down which tool each part of your page uses: Grid, Flexbox or a table. Check each one is doing its own job.',
  },
  notes: 'v1.4 layout. The two-column page squeezes on phones by design, setting up Chapter 5 (media queries).',
};

export default lesson;
