import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 5 · Lesson 17 — a wide data table on a phone: scroll inside a wrapper with overflow-x: auto. Story choice. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'The table that wouldn\'t fit',
  summary: 'The gig table now has five columns: Date, Venue, City, Price, Tickets. On Grandma\'s phone it pushes the whole page sideways, so everything scrolls left and right. Choose the fix.',
  minutes: 11,
  outcomes: ['Spot a table that\'s wider than a phone', 'Let a wide table scroll inside its own box with overflow-x: auto', 'Keep data tables as tables on every screen'],
  learn: [
    {
      kind: 'story',
      title: 'The whole page wobbles',
      beats: [
        { speaker: 'narrator', text: 'Five columns of gig details. On Grandma\'s phone, the table is wider than the screen, and the entire page slides sideways with it.' },
        { speaker: 'kofi', text: 'Everything else fits. It\'s just this table.' },
        { speaker: 'tey', text: 'A table is data. Its columns belong together. The question is what should scroll: the table, or the whole page?' },
      ],
      choice: {
        prompt: 'How should Kofi fix the wide gig table?',
        options: [
          {
            text: 'Wrap the table in a section with overflow-x: auto, so only the table scrolls sideways, inside its own box.',
            outcome: 'The page fits Grandma\'s screen. The table keeps all five columns and slides on its own when she swipes it.',
            best: true,
          },
          {
            text: 'Make the table text tiny so all five columns fit.',
            outcome: 'It fits, but Grandma can\'t read a single date.',
          },
          {
            text: 'Turn the table into a grid of boxes so it can wrap.',
            outcome: 'The columns get separated from their headings, and screen readers lose the rows and columns again.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p><strong>overflow-x: auto</strong> on a box means: if what\'s inside is wider than the box, let people scroll it sideways inside the box, instead of stretching the whole page. Put it on a wrapper around the table, not on the table itself.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Only the table scrolls',
      caption: 'At phone size, swipe the table. The rest of the page stays still.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .table-scroll { overflow-x: auto; }\n  table { border-collapse: collapse; }\n  th, td { padding: 8px 12px; text-align: left; white-space: nowrap; border-bottom: 1px solid #1F2E52; }\n  th { color: #FF9600; }\n</style>\n<h2>Gigs</h2>\n<section class="table-scroll">\n  <table>\n    <caption>Upcoming gigs</caption>\n    <tr><th>Date</th><th>Venue</th><th>City</th><th>Price</th><th>Tickets</th></tr>\n    <tr><td>18 Oct</td><td>Labadi Beach Session</td><td>Accra</td><td>GHS 50</td><td>Yes</td></tr>\n    <tr><td>25 Oct</td><td>Sound Up Saturdays</td><td>Accra</td><td>GHS 80</td><td>Sold out</td></tr>\n  </table>\n</section>\n<p>The rest of the page stays put.</p>\n',
      challenge: 'Delete overflow-x: auto. At phone size, the whole page moves sideways again.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Wide table? Keep it a table, and wrap it in a box with overflow-x: auto.',
    },
  ],
  apply: {
    scenario: 'The table that wouldn\'t fit.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does the whole page scroll sideways on Grandma\'s phone?',
        options: [
          { text: 'Her phone is broken', why: 'Any narrow screen would do it.' },
          { text: 'The table is wider than the screen, and it stretches the page with it' },
          { text: 'Tables can\'t be shown on phones', why: 'They can, inside a scrolling box.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Let only the table scroll: give .table-scroll overflow-x auto',
        starter: '<style>\n\n</style>\n<section class="table-scroll"><table><tr><th>Date</th><th>Venue</th></tr></table></section>\n',
        solution: '<style>\n  .table-scroll { overflow-x: auto; }\n</style>\n<section class="table-scroll"><table><tr><th>Date</th><th>Venue</th></tr></table></section>\n',
        hint: '.table-scroll { overflow-x: auto; }',
        checks: [
          { message: 'The wrapper scrolls', dom: { selector: '.table-scroll', style: 'overflow-x', styleValue: 'auto' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to what happened.',
        pairs: [
          ['Scrolling wrapper', 'Page fits, table slides'],
          ['Tiny text', 'Nothing readable'],
          ['Grid of boxes', 'Headings lose their columns'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it keep the page from scrolling sideways?',
        groups: ['Page fits', 'Page still scrolls'],
        items: [
          { text: 'Table in a wrapper with overflow-x: auto', group: 0 },
          { text: 'A wide table with no wrapper', group: 1 },
          { text: 'img { max-width: 100%; }', group: 0 },
          { text: 'A card with width: 600px', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Should I just remove the Price and City columns on phones?',
        options: [
          { text: 'Yes, hide them with display: none.', why: 'Hiding data from most visitors is a bad trade.' },
          { text: 'Remove the whole table.', why: 'The gigs are important.' },
          { text: 'Phone fans want the price too. Keep all the columns and let the table scroll in its box.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that makes Grandma unable to read the gigs.',
        language: 'css',
        lines: ['.table-scroll { overflow-x: auto; }', 'table { font-size: 0.5rem; }', 'th { color: #FF9600; }'],
        bug: 1,
        explanation: 'Tiny text to squeeze columns in. Keep it readable and let the table scroll.',
        fix: 'table { font-size: 1rem; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The table is 600px wide inside a 360px phone. What happens?',
        code: '.table-scroll { overflow-x: auto; }\n\n<section class="table-scroll"><table>...</table></section>',
        language: 'html',
        options: [
          { text: 'The table scrolls sideways inside its box; the page fits the screen' },
          { text: 'The whole page scrolls sideways', why: 'The wrapper contains the scrolling.' },
          { text: 'The table is cut off with no way to see the rest', why: 'auto adds scrolling when needed.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Contain the wide table.',
        language: 'css',
        template: '.table-scroll { [[1]]: [[2]]; }',
        blanks: [['overflow-x'], ['auto']],
        distractors: ['overflow-y', 'hidden', 'width'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Should the overflow-x rule go on the table itself or on a wrapper around it? (one word)',
        answers: ['wrapper', 'a wrapper', 'the wrapper'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why keep the gig list as a table on phones?',
        options: [
          { text: 'Tables are faster', why: 'It\'s about meaning.' },
          { text: 'Grids don\'t work on phones', why: 'They do. The gig list is data.' },
          { text: 'It\'s data: the headings and columns belong together for everyone' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Does anything on your page make the whole page scroll sideways on a phone?',
    starters: ['The culprit is...', 'I\'ll wrap it...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'If your page has a table, wrap it in a box with overflow-x: auto and test it at 320px.',
  },
  notes: 'overflow-x: auto creates a scroll container (MDN). WCAG 1.4.10 Reflow allows two-dimensional scrolling for content like data tables that needs it, as long as the page itself reflows. white-space: nowrap shown only in the tryIt to keep cells on one line.',
};

export default lesson;
