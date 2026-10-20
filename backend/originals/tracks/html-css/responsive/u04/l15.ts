import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 4 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14 (tables for data, auto-fill/auto-fit, named areas, the gallery). */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: wall, table, map',
  summary: 'A cover wall that counts its own columns, a gig table a screen reader can read row by row, and a page laid out from Efua\'s sketch. Kofi sends Miracle the link. Quick checkpoint.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Use a table for data', 'Choose auto-fill or auto-fit', 'Lay out a page with named areas'],
  learn: [
    {
      kind: 'story',
      title: 'Wall, table, map',
      beats: [
        { speaker: 'miracle', text: 'Grid for the wall, a table for the gigs, areas for the page. You picked the right tool every time.' },
        { speaker: 'kofi', text: 'Two months ago I was typing spaces to line things up.' },
        { speaker: 'tey', text: 'One more check, and then the page gets its final grid.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: the right tool each time.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Lay out the page: .page gets display grid and grid-template-areas "head head" "beats gigs"',
        starter: '<style>\n  .page { grid-template-columns: 2fr 1fr; }\n  header { grid-area: head; }\n  .beats { grid-area: beats; }\n  .gigs { grid-area: gigs; }\n</style>\n<main class="page"><header>Mensah Beats</header><section class="beats">Beats</section><section class="gigs">Gigs</section></main>\n',
        solution: '<style>\n  .page { grid-template-columns: 2fr 1fr; display: grid; grid-template-areas: "head head" "beats gigs"; }\n  header { grid-area: head; }\n  .beats { grid-area: beats; }\n  .gigs { grid-area: gigs; }\n</style>\n<main class="page"><header>Mensah Beats</header><section class="beats">Beats</section><section class="gigs">Gigs</section></main>\n',
        hint: 'display: grid; grid-template-areas: "head head" "beats gigs";',
        checks: [
          { message: 'A grid', dom: { selector: '.page', style: 'display', styleValue: 'grid' } },
          { message: 'With an area map', dom: { selector: '.page', style: 'grid-template-areas' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Table or Grid?',
        groups: ['Table', 'Grid'],
        items: [
          { text: 'Gig dates, venues and cities', group: 0 },
          { text: 'A wall of covers', group: 1 },
          { text: 'Ticket prices by date', group: 0 },
          { text: 'The page\'s main areas', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Two covers on a wide laptop. Which line stretches them across the row?',
        code: 'A: repeat(auto-fill, minmax(150px, 1fr))\nB: repeat(auto-fit, minmax(150px, 1fr))',
        language: 'css',
        options: [
          { text: 'B, auto-fit' },
          { text: 'A, auto-fill', why: 'auto-fill keeps the empty columns.' },
          { text: 'Both the same', why: 'They differ when there are few items.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the broken area map.',
        language: 'css',
        lines: ['grid-template-areas: "head head" "beats gigs";', 'grid-template-areas: "head head" "beats";', 'grid-template-areas: "head head" "gigs beats";'],
        bug: 1,
        explanation: 'Each row needs the same number of cells.',
        fix: 'grid-template-areas: "head head" "beats gigs";',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each element to its job.',
        pairs: [
          ['th', 'Heading cell'],
          ['td', 'Data cell'],
          ['figcaption', 'A cover\'s title'],
          ['caption', 'What a table is about'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Should the gig list use grid-template-areas too?',
        options: [
          { text: 'No, the gig list is data, so it stays a table. Areas are for the page layout.' },
          { text: 'Yes, everything should be Grid.', why: 'Data belongs in a table.' },
          { text: 'Use Flexbox for it.', why: 'It\'s data: a table.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What must every named area be?',
        options: [
          { text: 'A rectangle' },
          { text: 'A single cell', why: 'Areas can span many cells, as long as they make a rectangle.' },
          { text: 'An L shape', why: 'Areas must be rectangles.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete a gig row.',
        language: 'html',
        template: '<tr><[[1]]>25 Oct</td><td>Sound Up Saturdays</[[2]]></tr>',
        blanks: [['td'], ['td']],
        distractors: ['th', 'tr', 'cell'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which property names an item for an area map? (hyphenated)',
        answers: ['grid-area'],
        placeholder: 'A property',
      },
      {
        kind: 'writeCode',
        prompt: 'Make the two coming-soon covers fill the row: repeat(auto-fit, minmax(150px, 1fr))',
        starter: '<style>\n  .coming-soon { display: grid; gap: 8px; }\n</style>\n<section class="coming-soon"><img src="cover-1.png" alt="Rain on Zinc cover"><img src="cover-2.png" alt="Kumasi Express cover"></section>\n',
        solution: '<style>\n  .coming-soon { display: grid; gap: 8px; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); }\n</style>\n<section class="coming-soon"><img src="cover-1.png" alt="Rain on Zinc cover"><img src="cover-2.png" alt="Kumasi Express cover"></section>\n',
        hint: 'grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));',
        checks: [
          { message: 'Columns set', dom: { selector: '.coming-soon', style: 'grid-template-columns' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'For each part of your own page, which tool fits: Grid, Flexbox or a table?',
    starters: ['My header: ...', 'My...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write down every section of your page and the tool it uses. Change any that use the wrong one.',
  },
  notes: 'Checkpoint 3. Reviews l11–l14.',
};

export default lesson;
