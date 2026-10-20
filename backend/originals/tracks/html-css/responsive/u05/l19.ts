import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 5 · Lesson 19 — the finished v1.5 stylesheet: everything from Course 2, phones first. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Everything from this course',
  summary: 'Five weeks ago Kofi\'s page was one plain column on every screen. Now every line of his stylesheet has a reason. Before the last upload of the course, Miracle asks him to explain it. Tap each part.',
  minutes: 11,
  outcomes: ['Read a complete phones-first stylesheet', 'Name which chapter each technique came from', 'Spot a line that would break the site on some screen'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part of v1.5',
      text: '* { box-sizing: border-box; }\nimg { max-width: 100%; height: auto; }\n.site-header { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; }\n.card { padding: 16px; border: 2px solid #FF9600; border-radius: 12px; }\n.page { display: grid; gap: 16px; grid-template-areas: "head" "beats" "gigs"; }\n.gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 8px; }\n.table-scroll { overflow-x: auto; }\n\n@media (min-width: 700px) {\n  .page { grid-template-columns: 2fr 1fr; grid-template-areas: "head head" "beats gigs"; }\n  h1 { font-size: 4rem; }\n}',
      hotspots: [
        { phrase: '* { box-sizing: border-box; }', note: 'Chapter 1, Boxes: every width means the whole box.' },
        { phrase: 'img { max-width: 100%; height: auto; }', note: 'Chapters 1 and 5: images fit any screen and keep their shape.' },
        { phrase: '.card {', note: 'Chapter 2, Classes: one base class styles every card.' },
        { phrase: 'display: flex; flex-wrap: wrap;', note: 'Chapter 3, Flexbox: name and links in a row that wraps on small phones.' },
        { phrase: 'repeat(auto-fill, minmax(150px, 1fr))', note: 'Chapter 4, Grid: the cover wall counts its own columns.' },
        { phrase: '.table-scroll { overflow-x: auto; }', note: 'Chapter 5: the gig table scrolls in its own box, not the whole page.' },
        { phrase: '@media (min-width: 700px) {', note: 'Chapter 5, Phones first: the stacked layout is the base; wider screens get two columns and a bigger name.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Mensah Beats v1.5',
      caption: 'The header, gallery and gig table, phones first. Try phone, tablet and laptop.',
      code: '<style>\n  * { box-sizing: border-box; }\n  body { margin: 0; background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  img { max-width: 100%; height: auto; }\n  .page { display: grid; gap: 16px; padding: 16px; grid-template-areas: "head" "beats" "gigs"; }\n  .site-header { grid-area: head; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 8px; }\n  .site-header h1 { margin: 0; font-size: 2.25rem; color: #FF9600; font-family: Georgia, serif; }\n  .site-header a { display: inline-block; padding: 12px; color: #FF9600; }\n  .gallery { grid-area: beats; display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 8px; }\n  .gallery img { border-radius: 6px; }\n  .gigs { grid-area: gigs; }\n  .table-scroll { overflow-x: auto; }\n  table { border-collapse: collapse; }\n  th, td { padding: 6px 10px; text-align: left; white-space: nowrap; }\n  th { color: #FF9600; }\n  @media (min-width: 700px) {\n    .page { grid-template-columns: 2fr 1fr; grid-template-areas: "head head" "beats gigs"; }\n    .site-header h1 { font-size: 4rem; }\n  }\n</style>\n<main class="page">\n  <header class="site-header"><h1>Mensah Beats</h1><a href="#book">Book me</a></header>\n  <section class="gallery">\n    <img src="cover-1.png" alt="Rain on Zinc cover" width="400" height="400"><img src="cover-2.png" alt="Jollof Bounce cover" width="400" height="400"><img src="cover-3.png" alt="Night Bus to Kumasi cover" width="400" height="400">\n  </section>\n  <section class="gigs">\n    <h2>Gigs</h2>\n    <section class="table-scroll">\n      <table>\n        <tr><th>Date</th><th>Venue</th><th>City</th><th>Price</th></tr>\n        <tr><td>18 Oct</td><td>Labadi Beach Session</td><td>Accra</td><td>GHS 50</td></tr>\n        <tr><td>25 Oct</td><td>Sound Up Saturdays</td><td>Accra</td><td>GHS 80</td></tr>\n      </table>\n    </section>\n  </section>\n</main>\n',
      challenge: 'Run the ten-minute test on it: 320px, zoom, sideways.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Boxes, classes, Flexbox, Grid, phones first: five chapters, one stylesheet that works everywhere.',
    },
  ],
  apply: {
    scenario: 'Every line has a reason.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each technique to its chapter.',
        pairs: [
          ['box-sizing: border-box', 'Boxes everywhere'],
          ['.card base class', 'Classes and the cascade'],
          ['display: flex on the header', 'Lining things up'],
          ['auto-fill gallery', 'The beat grid'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is the header Flexbox inside a Grid page?',
        options: [
          { text: 'The page needs rows and columns (Grid); the header is one row (Flexbox)' },
          { text: 'It was left over by mistake', why: 'Each tool fits its job.' },
          { text: 'Grid can\'t hold Flexbox', why: 'A grid item can be a flex container.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Add the image rule every page needs: img gets max-width 100% and height auto',
        starter: '<style>\n  * { box-sizing: border-box; }\n\n</style>\n<img src="cover-1.png" alt="Rain on Zinc cover" width="400" height="400">\n',
        solution: '<style>\n  * { box-sizing: border-box; }\n  img { max-width: 100%; height: auto; }\n</style>\n<img src="cover-1.png" alt="Rain on Zinc cover" width="400" height="400">\n',
        hint: 'img { max-width: 100%; height: auto; }',
        checks: [
          { message: 'Images fit', dom: { selector: 'img', style: 'max-width', styleValue: '100%' } },
          { message: 'And keep their shape', dom: { selector: 'img', style: 'height', styleValue: 'auto' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Base CSS, or inside the 700px query?',
        groups: ['Base', '700px query'],
        items: [
          { text: 'Stacked page areas', group: 0 },
          { text: 'Two page columns', group: 1 },
          { text: 'overflow-x: auto on the table wrapper', group: 0 },
          { text: 'A 4rem heading', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that would break the site on phones.',
        language: 'css',
        lines: ['.gallery { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); }', '.page { grid-template-columns: 2fr 1fr; }', '.table-scroll { overflow-x: auto; }'],
        bug: 1,
        explanation: 'Two columns in the base squeeze phones. It belongs in the min-width query.',
        fix: '@media (min-width: 700px) { .page { grid-template-columns: 2fr 1fr; } }',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'If I gave you a brand-new screen size tomorrow, would the site break?',
        options: [
          { text: 'Probably not: the layout stretches, the gallery counts its columns, and the breakpoint follows the content.' },
          { text: 'Yes, I\'d need a new media query.', why: 'Fluid layouts handle new sizes.' },
          { text: 'Only if it\'s a phone.', why: 'The phone base handles small screens.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'On Grandma\'s 360px phone, what happens with the 4-column gig table?',
        code: '.table-scroll { overflow-x: auto; }',
        language: 'css',
        options: [
          { text: 'It scrolls sideways inside its box; the page fits the screen' },
          { text: 'The whole page scrolls sideways', why: 'The wrapper contains it.' },
          { text: 'The table disappears', why: 'It scrolls in its box.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the phones-first page.',
        language: 'css',
        template: '.page { grid-template-areas: "head" "beats" "gigs"; }\n@media ([[1]]: 700px) {\n  .page { grid-template-columns: [[2]]; grid-template-areas: "head head" "beats gigs"; }\n}',
        blanks: [['min-width'], ['2fr 1fr']],
        distractors: ['max-width', '1fr', 'repeat(5, 1fr)'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What version of Mensah Beats finishes this course? (e.g. v1.4)',
        answers: ['v1.5', '1.5'],
        placeholder: 'A version',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the stylesheet in a sensible order.',
        language: 'css',
        lines: ['* { box-sizing: border-box; }', 'img { max-width: 100%; height: auto; }', '.page { display: grid; grid-template-areas: "head" "beats" "gigs"; }', '@media (min-width: 700px) { .page { grid-template-columns: 2fr 1fr; } }'],
      },
    ],
  },
  reflect: {
    prompt: 'Read your own stylesheet top to bottom. Could you explain every line the way Kofi did?',
    starters: ['I can explain...', 'I\'m still unsure about...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Label your own style.css with a comment for each chapter\'s technique, then run the ten-minute test one last time.',
  },
  notes: 'v1.5 stylesheet, combining Course 2 Chapters 1–5. The nested section wrapper for the table is a plain container for overflow-x.',
};

export default lesson;
