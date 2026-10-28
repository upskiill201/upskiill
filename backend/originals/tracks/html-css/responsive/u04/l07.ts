import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 4 · Lesson 7 — history: how CSS Grid came to be and shipped everywhere in 2017. Reading. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'The year the grid arrived',
  summary: 'Designers had been drawing pages on grids for decades, in newspapers, magazines and posters. The web couldn\'t do it properly until 2017. Here\'s how that changed.',
  minutes: 12,
  outcomes: ['Explain where the idea of a layout grid comes from', 'Describe how CSS Grid was developed and released', 'Explain why its release in every browser at once mattered'],
  learn: [
    {
      kind: 'reading',
      title: 'From newspaper columns to CSS Grid',
      html:
        '<p>Long before websites, newspapers and posters were laid out on <strong>grids</strong>: invisible columns and rows that keep everything lined up. A designer like Efua thinks in grids without trying. On the web, for years, there was no real tool for it: just tables, floats and, later, Flexbox, which handles one direction at a time.</p>' +
        '<p>Engineers at Microsoft proposed an early version of a grid layout for CSS around 2011, and Internet Explorer 10 shipped it in 2012, using an early syntax. The idea was then developed in the open at the <strong>W3C</strong>, the group that looks after CSS, with people from several browser makers writing and testing the specification together.</p>' +
        '<p>Then something unusual happened. In <strong>2017</strong>, the modern version of CSS Grid arrived in Chrome, Firefox and Safari within a few weeks of each other, and in Microsoft Edge later that year. Usually a new feature trickles out one browser at a time over years. Because they worked on it together, developers could start using Grid almost straight away.</p>' +
        '<p>Today Grid and Flexbox work side by side. Grid draws the big structure: the page areas, the gallery, the calendar. Flexbox lines things up inside them: the nav links, the contents of a card. Most modern sites use both.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Grid outside, Flexbox inside',
      caption: 'The gallery is a grid. Each card inside it is a flex column.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }\n  .card { display: flex; flex-direction: column; gap: 8px; background-color: #1F2E52; border-radius: 12px; padding: 12px; }\n  .card img { max-width: 100%; border-radius: 6px; }\n</style>\n<section class="gallery">\n  <article class="card"><img src="cover-1.png" alt="Sunrise in Osu cover"><strong>Sunrise in Osu</strong></article>\n  <article class="card"><img src="cover-2.png" alt="Jollof Bounce cover"><strong>Jollof Bounce</strong></article>\n  <article class="card"><img src="cover-3.png" alt="Night Bus to Kumasi cover"><strong>Night Bus to Kumasi</strong></article>\n</section>\n',
      challenge: 'Change the gallery to repeat(2, 1fr). The grid changes; each card\'s inside stays the same.',
    },
  ],
  apply: {
    scenario: 'The year the grid arrived.',
    items: [
      {
        kind: 'mcq',
        prompt: 'In which year did modern CSS Grid arrive in the major browsers?',
        options: [
          { text: '2017' },
          { text: '1996', why: 'That\'s CSS1.' },
          { text: '2009', why: 'That\'s around when Flexbox drafts began.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the events in order.',
        lines: ['Newspapers and posters laid out on grids', 'Websites built with tables and floats', 'Flexbox arrives for one-direction layouts', 'CSS Grid ships in the major browsers'],
      },
      {
        kind: 'sortGroups',
        prompt: 'In a modern site, Grid or Flexbox?',
        groups: ['Grid', 'Flexbox'],
        items: [
          { text: 'The gallery of covers', group: 0 },
          { text: 'The contents of one card', group: 1 },
          { text: 'The main page areas', group: 0 },
          { text: 'The nav links', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Grid outside, Flexbox inside: make each .card a flex column',
        starter: '<style>\n  .gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }\n\n</style>\n<section class="gallery"><article class="card"><img src="cover-1.png" alt="Sunrise in Osu cover"><strong>Sunrise in Osu</strong></article></section>\n',
        solution: '<style>\n  .gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }\n  .card { display: flex; flex-direction: column; }\n</style>\n<section class="gallery"><article class="card"><img src="cover-1.png" alt="Sunrise in Osu cover"><strong>Sunrise in Osu</strong></article></section>\n',
        hint: '.card { display: flex; flex-direction: column; }',
        checks: [
          { message: 'The card is a flex container', dom: { selector: '.card', style: 'display', styleValue: 'flex' } },
          { message: 'A column', dom: { selector: '.card', style: 'flex-direction', styleValue: 'column' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each to its role in the story.',
        pairs: [
          ['Microsoft', 'Proposed an early grid layout'],
          ['W3C', 'Developed the specification in the open'],
          ['2017', 'Shipped in the major browsers'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'So I\'ve been designing on grids for years and the web only just caught up?',
        options: [
          { text: 'No, the web had grids from the start.', why: 'It had tables, which are for data.' },
          { text: 'Pretty much. Print designers used grids for decades; CSS got a real grid tool in 2017.' },
          { text: 'Grids are only for websites.', why: 'They came from print.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the statement that\'s wrong.',
        lines: ['Grid and Flexbox are often used together.', 'Grid arrived in one browser and took ten years to reach the others.', 'Layout grids came from print design.'],
        bug: 1,
        explanation: 'The major browsers shipped it within weeks of each other in 2017, with Edge later that year.',
      },
      {
        kind: 'mcq',
        prompt: 'Why did it matter that browsers shipped Grid at almost the same time?',
        options: [
          { text: 'It made Grid faster', why: 'It was about being usable everywhere.' },
          { text: 'It didn\'t matter', why: 'Usually features take years to be usable everywhere.' },
          { text: 'Developers could use it almost straight away, for almost every visitor' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the summary.',
        template: '[[1]] draws the big structure. [[2]] lines things up inside it.',
        blanks: [['Grid'], ['Flexbox']],
        distractors: ['Tables', 'Floats', 'Margin'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which group looks after the CSS specifications? (three letters)',
        answers: ['w3c'],
        placeholder: 'Three letters',
      },
    ],
  },
  reflect: {
    prompt: 'Look at a newspaper, poster or magazine. Can you see the grid underneath?',
    starters: ['I can see...', 'It has... columns'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Search "MDN basic concepts of grid layout" and read the introduction.',
  },
  notes: 'CSS Grid Layout: Microsoft proposal 2011, IE10 shipped -ms- prefixed early syntax in 2012. Modern Grid: Firefox 52 and Chrome 57 (March 2017), Safari 10.1 (March 2017), Edge 16 (October 2017). Specification edited at the W3C CSS Working Group by editors from several browser makers.',
};

export default lesson;
