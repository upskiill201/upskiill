import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 4 · Lesson 13 — named areas: grid-template-areas and grid-area for a whole page layout. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Draw the page with words',
  summary: 'Efua sketches the laptop version of the whole page: header across the top, beats on the left, gigs on the right, footer along the bottom. Tey shows Kofi how to type that sketch straight into CSS.',
  minutes: 11,
  outcomes: ['Name areas with grid-area', 'Lay out a page with grid-template-areas', 'Rearrange a page by editing the area map'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'First, give each part of the page a name with grid-area. The header becomes "head", the beats section "beats", the gigs section "gigs", the footer "foot".',
          replies: ['Then what?'],
        },
        {
          tey: 'On the grid container, draw the layout with grid-template-areas. Each quoted string is a row; each word is a cell. "head head" means the header takes both columns of the top row.',
          replies: ['So it\'s like a little map?'],
        },
        {
          tey: 'Exactly. "head head" / "beats gigs" / "foot foot", with grid-template-columns: 2fr 1fr. Read it from top to bottom and you can see Efua\'s sketch.',
          replies: ['Can I change it easily?'],
        },
        {
          tey: 'That\'s the best part. Want gigs on the left? Write "gigs beats". Each row needs the same number of cells, and an area must be a rectangle. And as before, this only moves things on screen: keep the HTML in a sensible reading order.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Efua\'s sketch, in CSS',
      caption: 'The area map reads like the sketch. Each section is placed by its name.',
      code: '<style>\n  body {\n    background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; margin: 0;\n    display: grid;\n    grid-template-columns: 2fr 1fr;\n    grid-template-areas:\n      "head head"\n      "beats gigs"\n      "foot foot";\n    gap: 16px;\n    padding: 16px;\n  }\n  header, section, footer { background-color: #1F2E52; border-radius: 12px; padding: 16px; }\n  header { grid-area: head; }\n  .beats { grid-area: beats; }\n  .gigs { grid-area: gigs; }\n  footer { grid-area: foot; }\n</style>\n<header>Mensah Beats</header>\n<section class="beats">Beats</section>\n<section class="gigs">Gigs</section>\n<footer>Mensah Beats v1.4</footer>\n',
      challenge: 'Change "beats gigs" to "gigs beats". The two sections swap sides.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'grid-area names an item. grid-template-areas draws the map: one quoted string per row, one word per cell.',
    },
  ],
  apply: {
    scenario: 'Efua\'s page sketch.',
    items: [
      {
        kind: 'mcq',
        prompt: 'In grid-template-areas, what is each quoted string?',
        options: [
          { text: 'One row of the layout' },
          { text: 'One column', why: 'Each string is a row; each word in it is a cell.' },
          { text: 'One item\'s colour', why: 'It\'s a row of area names.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Name the beats section: .beats gets grid-area beats',
        starter: '<style>\n  .page { display: grid; grid-template-areas: "head head" "beats gigs"; }\n  header { grid-area: head; }\n\n</style>\n<section class="page"><header>Mensah Beats</header><section class="beats">Beats</section></section>\n',
        solution: '<style>\n  .page { display: grid; grid-template-areas: "head head" "beats gigs"; }\n  header { grid-area: head; }\n  .beats { grid-area: beats; }\n</style>\n<section class="page"><header>Mensah Beats</header><section class="beats">Beats</section></section>\n',
        hint: '.beats { grid-area: beats; }',
        checks: [
          { message: 'Beats has its area', dom: { selector: '.beats', style: 'grid-area', styleValue: 'beats' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to its job.',
        pairs: [
          ['grid-area: head', 'Names the header\'s area'],
          ['"head head"', 'Header across both columns'],
          ['"beats gigs"', 'Beats left, gigs right'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'A valid area map, or broken?',
        groups: ['Valid', 'Broken'],
        items: [
          { text: '"head head" "beats gigs"', group: 0 },
          { text: '"head head" "beats"', group: 1 },
          { text: '"head head" "gigs beats"', group: 0 },
          { text: '"head beats" "beats head"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'Can the footer go across the bottom too?',
        options: [
          { text: 'Yes: add a third row "foot foot" and give the footer grid-area: foot.' },
          { text: 'Only with Flexbox.', why: 'Add it to the area map.' },
          { text: 'Footers can\'t span columns.', why: 'Any area can span.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the broken area map.',
        language: 'css',
        lines: ['grid-template-areas: "head head" "beats gigs" "foot foot";', 'grid-template-areas: "head head" "beats gigs gigs";', 'grid-template-areas: "head head" "gigs beats";'],
        bug: 1,
        explanation: 'Every row needs the same number of cells. The second row has three; the first has two.',
        fix: 'grid-template-areas: "head head" "beats gigs";',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Where does the gigs section appear?',
        code: 'grid-template-areas: "head head" "gigs beats";',
        language: 'css',
        options: [
          { text: 'Left, in the second row' },
          { text: 'Right, in the second row', why: 'gigs is the first word in the second row: left.' },
          { text: 'Across the top', why: 'head is the top row.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Name the footer and give it a row.',
        language: 'css',
        template: 'footer { [[1]]: foot; }\n.page { grid-template-areas: "head head" "beats gigs" "[[2]] foot"; }',
        blanks: [['grid-area'], ['foot']],
        distractors: ['grid-name', 'head', 'area'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which property draws the area map on the container? (hyphenated)',
        answers: ['grid-template-areas'],
        placeholder: 'A property',
      },
      {
        kind: 'mcq',
        prompt: 'You swap areas so gigs shows first on screen. What should you check?',
        options: [
          { text: 'That the HTML order still makes sense for keyboard and screen reader users' },
          { text: 'Nothing, areas fix the reading order', why: 'Areas move things on screen only.' },
          { text: 'That gigs has an id', why: 'The reading order is the issue.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Sketch your own page as an area map. What are your areas called?',
    starters: ['My areas are...', 'The top row is...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Name the main parts of your page with grid-area and lay them out with grid-template-areas.',
  },
  notes: 'grid-template-areas: rows must have equal cell counts and named areas must be rectangular (CSS Grid §7.3). The tryIt makes body the grid container so header, sections and footer are its direct children.',
};

export default lesson;
