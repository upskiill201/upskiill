import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 5 · Lesson 20 — Chapter Challenge: Mensah Beats v1.5, every screen in the house. Course 2 finale. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: Mensah Beats v1.5',
  summary: 'Sunday lunch. Grandma\'s phone, Ama\'s old phone, Mum\'s tablet, Dad\'s laptop and the family TV all open Mensah Beats at once. Every one of them looks right. Build v1.5 from memory and finish the course.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build a phones-first layout with a min-width breakpoint', 'Make images, headings and tables work on any screen', 'Finish a fully responsive website'],
  learn: [
    {
      kind: 'story',
      title: 'Every screen in the house',
      beats: [
        { speaker: 'narrator', text: 'Three weeks to uni. Sunday lunch. Five screens on the table, all showing Mensah Beats.' },
        { speaker: 'ama', text: 'Mine stacks. Grandma\'s has big writing. The TV has loads of columns.' },
        { speaker: 'narrator', text: 'Grandma swipes the gig table sideways, finds the 25 Oct gig, and announces that the whole family is going.' },
        { speaker: 'miracle', text: 'On the call later: "Boxes, classes, Flexbox, Grid, phones first. You can build real layouts now, Kofi."' },
        { speaker: 'tey', text: 'One last build, from memory. Then the next course: forms, motion, accessibility, search, and launch night.' },
      ],
    },
    {
      kind: 'steps',
      title: 'The site so far',
      steps: [
        { title: 'Course 1: v1.0', body: 'A live site: exact colours, readable text, style.css, a safe booking link.' },
        { title: 'v1.1 to v1.4', body: 'Boxes with room, classes, a Flexbox header, a Grid cover wall and a real gig table.', code: '.gallery { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); }', language: 'css' },
        { title: 'v1.5 (tonight)', body: 'Phones first: the viewport tag, a stacked base, a min-width breakpoint, images that keep their shape, a table that scrolls in its box.', code: '@media (min-width: 700px) { .page { grid-template-columns: 2fr 1fr; } }', language: 'css' },
        { title: 'Next course', body: 'Build and Launch a Website: a booking form, motion, accessibility, search and sharing, and launch night for Mensah Beats v2.0.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: Mensah Beats v1.5.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Step 1: the head. Add the viewport tag (width=device-width, initial-scale=1)',
        starter: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n\n  <title>Mensah Beats</title>\n</head>\n<body><h1>Mensah Beats</h1></body>\n</html>\n',
        solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Mensah Beats</title>\n</head>\n<body><h1>Mensah Beats</h1></body>\n</html>\n',
        hint: '<meta name="viewport" content="width=device-width, initial-scale=1">',
        checks: [
          { message: 'A viewport tag', dom: { selector: 'meta[name="viewport"]', count: 1 } },
          { message: 'Using the device width', dom: { selector: 'meta[name="viewport"][content*="width=device-width"]', count: 1 } },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Step 2: the layout, phones first. .page is a grid with a 16px gap; from 700px it gets grid-template-columns 2fr 1fr',
        starter: '<style>\n\n</style>\n<main class="page"><section>Beats</section><section>Gigs</section></main>\n',
        solution: '<style>\n  .page { display: grid; gap: 16px; }\n  @media (min-width: 700px) {\n    .page { grid-template-columns: 2fr 1fr; }\n  }\n</style>\n<main class="page"><section>Beats</section><section>Gigs</section></main>\n',
        hint: '.page { display: grid; gap: 16px; } then @media (min-width: 700px) { .page { grid-template-columns: 2fr 1fr; } }',
        checks: [
          { message: 'A grid', dom: { selector: '.page', style: 'display', styleValue: 'grid' } },
          { message: 'With a gap', dom: { selector: '.page', style: 'gap', styleValue: '16px' } },
          { message: 'A min-width query', codeIncludes: 'min-width' },
          { message: 'Two columns on wider screens', codeIncludes: '2fr 1fr' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Who gets it: every screen, or only 700px and up?',
        groups: ['Every screen', '700px and up'],
        items: [
          { text: 'img { max-width: 100%; height: auto; }', group: 0 },
          { text: 'Two page columns', group: 1 },
          { text: 'The table\'s scrolling wrapper', group: 0 },
          { text: 'A 4rem heading', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Step 3: the pictures. img gets max-width 100% and height auto',
        starter: '<style>\n\n</style>\n<img src="cover-1.png" alt="Rain on Zinc cover" width="400" height="400">\n',
        solution: '<style>\n  img { max-width: 100%; height: auto; }\n</style>\n<img src="cover-1.png" alt="Rain on Zinc cover" width="400" height="400">\n',
        hint: 'img { max-width: 100%; height: auto; }',
        checks: [
          { message: 'Fit the screen', dom: { selector: 'img', style: 'max-width', styleValue: '100%' } },
          { message: 'Keep their shape', dom: { selector: 'img', style: 'height', styleValue: 'auto' } },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The family TV is 1600px wide. Which rules apply?',
        code: '.page { display: grid; }\n@media (min-width: 700px) { .page { grid-template-columns: 2fr 1fr; } }\n@media (min-width: 1100px) { .page { max-width: 1200px; margin: 0 auto; } }',
        language: 'css',
        options: [
          { text: 'All three: the base, the 700px layer and the 1100px layer' },
          { text: 'Only the 1100px layer', why: 'min-width layers add up.' },
          { text: 'Only the base', why: 'Both queries are true at 1600px.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that would make Grandma scroll the whole page sideways.',
        language: 'html',
        lines: ['<section class="table-scroll"><table>...</table></section>', '<table style="width: 900px">...</table>', '<img src="cover-1.png" alt="Rain on Zinc cover" width="400" height="400">'],
        bug: 1,
        explanation: 'A fixed 900px table with no scrolling wrapper stretches the whole page. Wrap it in .table-scroll.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Ama wants a separate "kids version" of the site for her phone. Should I build one?',
        options: [
          { text: 'No need: one responsive site already works on her phone, and I only update it once.' },
          { text: 'Yes, every device needs its own site.', why: 'One responsive site covers them all.' },
          { text: 'Hide half the site on her phone.', why: 'Phone users want the same content.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each problem from this chapter to its fix.',
        pairs: [
          ['Page tiny on phones', 'The viewport tag'],
          ['Two squeezed columns', 'Move them into min-width'],
          ['Squashed photo', 'height: auto'],
          ['Table pushes the page sideways', 'overflow-x: auto wrapper'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Final step: the gig table. Give .table-scroll overflow-x auto',
        starter: '<style>\n\n</style>\n<section class="table-scroll"><table><tr><th>Date</th><th>Venue</th><th>City</th><th>Price</th></tr></table></section>\n',
        solution: '<style>\n  .table-scroll { overflow-x: auto; }\n</style>\n<section class="table-scroll"><table><tr><th>Date</th><th>Venue</th><th>City</th><th>Price</th></tr></table></section>\n',
        hint: '.table-scroll { overflow-x: auto; }',
        checks: [
          { message: 'Only the table scrolls', dom: { selector: '.table-scroll', style: 'overflow-x', styleValue: 'auto' } },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Phones-first heading.',
        language: 'css',
        template: 'h1 { font-size: [[1]]; }\n@media (min-width: 700px) { h1 { font-size: [[2]]; } }',
        blanks: [['2.25rem'], ['4rem']],
        distractors: ['64px', '10rem', '1rem'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What version of Mensah Beats works on every screen in the house? (e.g. v1.4)',
        answers: ['v1.5', '1.5'],
        placeholder: 'A version',
      },
    ],
  },
  reflect: {
    prompt: 'You finished Responsive Web Design with CSS. What can you build now that you couldn\'t five chapters ago?',
    starters: ['Now I can build...', 'Next I want to...'],
  },
  deepen: {
    title: 'Do it for real',
    summary: 'Run the ten-minute test on your own site one last time, upload it, and send the link to someone with a different phone from yours. Then start Build and Launch a Website.',
  },
  notes: 'Course 2 finale (Responsive Web Design with CSS). Next course title matches the cover build-and-launch-a-website. Mensah Beats v2.0 is Course 3\'s launch.',
};

export default lesson;
