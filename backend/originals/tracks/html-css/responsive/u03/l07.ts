import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 3 · Lesson 7 — history: layout before Flexbox (tables, floats, hacks) and why Flexbox was made. Reading. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Before Flexbox',
  summary: 'Miracle started building websites before Flexbox existed. "You have no idea how lucky you are," she tells Kofi. Here\'s how people lined things up before, and why a new tool had to be invented.',
  minutes: 12,
  outcomes: ['Describe how layouts were built before Flexbox', 'Explain why tables and floats were poor layout tools', 'Explain what problem Flexbox was designed to solve'],
  learn: [
    {
      kind: 'reading',
      title: 'Tables, floats and hacks',
      html:
        '<p>CSS was first made for styling text: fonts, colours, spacing. It had no real tool for putting boxes side by side. So in the late 1990s, designers borrowed one: the HTML <strong>table</strong>. Whole websites were built as giant invisible tables, with the header in one cell and the menu in another. It worked on screen, but a table means "data", so screen readers read pages out as rows and columns, and tables don\'t bend for small screens.</p>' +
        '<p>Next came <strong>floats</strong>. The float property was designed to let text wrap around a picture, like in a magazine. Developers stretched it to make columns and menus: float everything left and hope. Floated layouts broke in odd ways, needed "clearfix" tricks to stop containers collapsing, and made vertical centring almost impossible.</p>' +
        '<p>That\'s why "how do I centre something in CSS?" became one of the internet\'s favourite developer jokes. There were answers, but each was a workaround.</p>' +
        '<p><strong>Flexbox</strong> (the Flexible Box Layout module) was the first CSS tool designed just for laying out items in a row or a column: spacing them, aligning them, letting them grow, shrink and wrap. Work on it began around 2009, and by the mid-2010s every major browser supported it. In 2017, CSS Grid arrived in the major browsers for laying out rows and columns at once, which is Chapter 4.</p>' +
        '<p>Today, tables are back to their real job, holding data like a gig list with dates and venues. Floats are back to theirs: wrapping text around a picture.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Float\'s real job',
      caption: 'This is what float was made for: text flowing around a cover.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; line-height: 1.6; }\n  img { float: left; width: 100px; margin: 0 16px 8px 0; border-radius: 8px; }\n</style>\n<p><img src="cover-1.png" alt="Album cover for Sunrise in Osu">Sunrise in Osu was made at 5am on a phone, on a balcony in Osu, while the city woke up. It\'s slow and warm, built around one keyboard loop and the sound of the first tro-tros of the day. The text flows around the cover, like a magazine.</p>\n',
      challenge: 'Change float: left to float: right.',
    },
  ],
  apply: {
    scenario: 'Before Flexbox.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the layout tools in the order they were used.',
        lines: ['Invisible tables', 'Floats', 'Flexbox', 'CSS Grid'],
      },
      {
        kind: 'mcq',
        prompt: 'What was float originally designed for?',
        options: [
          { text: 'Letting text wrap around a picture' },
          { text: 'Building whole page layouts', why: 'Developers stretched it to that. It was made for wrapping text.' },
          { text: 'Centring things', why: 'It was terrible at centring.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'The right job for the tool, or a misuse?',
        groups: ['Right job', 'Misuse'],
        items: [
          { text: 'A table for a gig list with dates and venues', group: 0 },
          { text: 'A table to put a header in one row', group: 1 },
          { text: 'Float to wrap text around a cover', group: 0 },
          { text: 'Floats to build a whole page layout', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Use float for its real job: float the cover left so the text wraps around it',
        starter: '<style>\n  img { width: 100px; }\n</style>\n<p><img src="cover-1.png" alt="Album cover for Sunrise in Osu">Sunrise in Osu was made at 5am on a balcony.</p>\n',
        solution: '<style>\n  img { width: 100px; float: left; }\n</style>\n<p><img src="cover-1.png" alt="Album cover for Sunrise in Osu">Sunrise in Osu was made at 5am on a balcony.</p>\n',
        hint: 'float: left;',
        checks: [
          { message: 'The cover floats left', dom: { selector: 'img', style: 'float', styleValue: 'left' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each tool to its problem as a layout tool.',
        pairs: [
          ['Tables', 'Read out as data'],
          ['Floats', 'Collapsing containers, no centring'],
          ['&nbsp; spaces', 'Different on every screen'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'I found a tutorial that builds a menu with floats. Should I follow it?',
        options: [
          { text: 'Yes, floats are the newest way.', why: 'Floats came before Flexbox.' },
          { text: 'It\'s probably old. Today menus are built with Flexbox, which was made for exactly that.' },
          { text: 'Use a table instead.', why: 'Tables are for data.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the statement that\'s wrong.',
        lines: ['Flexbox was designed for laying out items in a row or column.', 'Tables are a good way to build page layouts today.', 'Floats were made for wrapping text around pictures.'],
        bug: 1,
        explanation: 'Tables are for data. Using them for layout confuses screen readers and doesn\'t bend on phones.',
      },
      {
        kind: 'mcq',
        prompt: 'Why did "centring in CSS" become a joke?',
        options: [
          { text: 'CSS couldn\'t show text in the middle at all', why: 'It could, with tricks. Flexbox made it simple.' },
          { text: 'Browsers refused to centre things', why: 'The tools just weren\'t designed for it.' },
          { text: 'For years every way of doing it was a workaround' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the summary.',
        template: '[[1]] lays items out in one row or column. [[2]], which came next, handles rows and columns together.',
        blanks: [['Flexbox'], ['Grid', 'CSS Grid']],
        distractors: ['Float', 'Table', 'Margin'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which HTML element was misused to build whole page layouts in the 1990s? (tag name)',
        answers: ['table', '<table>'],
        placeholder: 'A tag',
      },
    ],
  },
  reflect: {
    prompt: 'Why do you think tools get used for jobs they weren\'t designed for?',
    starters: ['Because...', 'It reminds me of...'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Search "MDN floats" and read how float is used today, and how it used to be used for layout.',
  },
  notes: 'Table-based layouts were common in the late 1990s/early 2000s; float layouts with clearfix through the 2000s–early 2010s. Flexbox first Working Draft 2009; current syntax Candidate Recommendation 2012; broad unprefixed support by about 2015 (IE11 partial). CSS Grid shipped in major browsers in 2017.',
};

export default lesson;
