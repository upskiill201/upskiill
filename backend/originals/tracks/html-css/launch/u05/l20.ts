import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 5 · Lesson 20 — Chapter Challenge: Mensah Beats v2.0, launch night, and the whole HTML & CSS track complete. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: Mensah Beats v2.0',
  summary: 'Morning. Kofi is on the bus to university, phone in hand. Three new bookings came in overnight through the form. Build v2.0 from memory, and finish the whole track.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build a complete, launch-ready page from memory', 'Combine layout, forms, access and search basics', 'Finish the HTML and CSS track'],
  learn: [
    {
      kind: 'story',
      title: 'On the bus',
      beats: [
        { speaker: 'narrator', text: 'The bus pulls out of Accra. Three new bookings overnight: a wedding, a birthday, a club night.' },
        { speaker: 'kofi', text: 'Twelve weeks ago it was one line on my phone. Now it books gigs while I sleep.' },
        { speaker: 'miracle', text: 'And you built every line of it.' },
        { speaker: 'efua', text: 'Send me the "how I built it" page. I want to show my class.' },
        { speaker: 'tey', text: 'Build v2.0 from memory. Then go and build your own.' },
      ],
    },
    {
      kind: 'steps',
      title: 'The whole track',
      steps: [
        { title: 'Course 1: HTML & CSS for Beginners', body: 'A real page: words, links, media, CSS, colour and type, then live as v1.0.' },
        { title: 'Course 2: Responsive Web Design', body: 'Boxes, classes, Flexbox, Grid and phones first: v1.1 to v1.5.' },
        { title: 'Course 3: Build and Launch a Website', body: 'Forms, motion, accessibility, search, and launch night: v1.6 to v2.0.', code: '<a class="skip-link" href="#main">Skip to main content</a>', language: 'html' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: Mensah Beats v2.0.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Step 1: the head. A specific title "Mensah Beats | Beat producer in Accra", a viewport meta tag, and a meta description',
        starter: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n\n</head>\n<body><h1>Mensah Beats</h1></body>\n</html>\n',
        solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Mensah Beats | Beat producer in Accra</title>\n  <meta name="description" content="Highlife-inspired beats from Accra. Listen free, see gigs, and book Kofi for your event.">\n</head>\n<body><h1>Mensah Beats</h1></body>\n</html>\n',
        hint: 'viewport, title and description, all in the head.',
        checks: [
          { message: 'A viewport tag', dom: { selector: 'meta[name="viewport"]', attr: 'content' } },
          { message: 'A specific title', dom: { selector: 'title', text: 'Beat producer in Accra' } },
          { message: 'A description', dom: { selector: 'meta[name="description"]', attr: 'content' } },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Step 2: the skeleton. A skip link to #main, a header with a nav labelled "Main", a main with id "main", and a footer',
        starter: '\n',
        solution: '<a class="skip-link" href="#main">Skip to main content</a>\n<header>\n  <nav aria-label="Main">\n    <a href="index.html" aria-current="page">Home</a>\n    <a href="book.html">Book Kofi</a>\n  </nav>\n</header>\n<main id="main">\n  <h1>Mensah Beats</h1>\n</main>\n<footer>&copy; 2026 Mensah Beats</footer>\n',
        hint: 'skip link, then header > nav, then main id="main", then footer.',
        checks: [
          { message: 'A skip link', dom: { selector: 'a[href="#main"]', count: 1 } },
          { message: 'A labelled nav', dom: { selector: 'header nav[aria-label="Main"]', count: 1 } },
          { message: 'The main target', dom: { selector: 'main#main', count: 1 } },
          { message: 'A footer', dom: { selector: 'footer', count: 1 } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Before you announce, or after launch?',
        groups: ['Before announcing', 'After launch'],
        items: [
          { text: 'Smoke test the live site', group: 0 },
          { text: 'Add January gigs (v2.1)', group: 1 },
          { text: 'Back up what\'s online', group: 0 },
          { text: 'Write the next changelog entry', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Step 3: the gallery. Make .gallery a grid with a 16px gap',
        starter: '<style>\n\n</style>\n<section class="gallery">\n  <img src="cover-1.png" alt="Rain on Zinc cover" width="400" height="400">\n  <img src="cover-2.png" alt="Kente Code cover" width="400" height="400" loading="lazy">\n</section>\n',
        solution: '<style>\n  .gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 16px; }\n  .gallery img { width: 100%; height: auto; }\n</style>\n<section class="gallery">\n  <img src="cover-1.png" alt="Rain on Zinc cover" width="400" height="400">\n  <img src="cover-2.png" alt="Kente Code cover" width="400" height="400" loading="lazy">\n</section>\n',
        hint: '.gallery { display: grid; gap: 16px; }',
        checks: [
          { message: 'A grid', dom: { selector: '.gallery', style: 'display', styleValue: 'grid' } },
          { message: 'A 16px gap', codeIncludes: 'gap: 16px' },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Step 4: the booking form. A label "Your email" for an email input with id and name "email", required, and a submit button',
        starter: '<form action="/thanks.html" method="post">\n\n</form>\n',
        solution: '<form action="/thanks.html" method="post">\n  <label for="email">Your email</label>\n  <input type="email" id="email" name="email" required>\n  <button type="submit">Send booking</button>\n</form>\n',
        hint: '<label for="email">, <input type="email" id="email" name="email" required>, <button type="submit">.',
        checks: [
          { message: 'A matching label', dom: { selector: 'label[for="email"]', count: 1 } },
          { message: 'A required email box', dom: { selector: 'input[type="email"][required]#email', count: 1 } },
          { message: 'A name for the answer', dom: { selector: 'input#email', attr: 'name', attrValue: 'email' } },
          { message: 'A submit button', dom: { selector: 'button[type="submit"]', count: 1 } },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that would break on launch night.',
        language: 'html',
        lines: ['<a href="gigs.html">Upcoming gigs</a>', '<form action="/Thanks.html" method="post">  <!-- file is thanks.html -->', '<img src="covers/rain-on-zinc.webp" alt="Rain on Zinc cover" width="600" height="600">'],
        bug: 1,
        explanation: 'The capital T doesn\'t match thanks.html. On many servers that\'s a 404.',
        fix: '<form action="/thanks.html" method="post">',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of v2.0 to the course it came from.',
        pairs: [
          ['Hex colours and fonts', 'Course 1'],
          ['The Grid gallery', 'Course 2'],
          ['The skip link', 'Course 3'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'You\'ve finished the whole HTML and CSS track. What now?',
        options: [
          { text: 'Wait until I know everything.', why: 'Ship what you know.' },
          { text: 'Never touch HTML again.', why: 'Keep building.' },
          { text: 'Build my own site, ship v1.0, and keep a changelog.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'A keyboard user loads v2.0 and presses Tab once. What appears?',
        code: '.skip-link { position: absolute; left: -999px; }\n.skip-link:focus { left: 16px; top: 16px; }',
        language: 'css',
        options: [
          { text: 'Nothing', why: 'Focus brings it on screen.' },
          { text: 'The skip link slides into view at the top left' },
          { text: 'The footer', why: 'The skip link comes first.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the launch rule.',
        template: 'Back up, upload, [[1]] test, then [[2]].',
        blanks: [['smoke'], ['announce']],
        distractors: ['skip', 'delete', 'panic'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What version of Mensah Beats launched on launch night? (e.g. v1.9)',
        answers: ['v2.0', '2.0', 'v2'],
        placeholder: 'A version',
      },
    ],
  },
  reflect: {
    prompt: 'You\'ve finished the track. What will you build first, and what will v1.0 of it have?',
    starters: ['I\'ll build...', 'v1.0 will have...'],
  },
  deepen: {
    title: 'Do it for real',
    summary: 'Launch your own site: run the checklist, back up, upload, smoke test, and share it with one honest post. Then write your "how I built it" page.',
  },
  notes: 'Chapter 5 finale of Course 3 and of the whole HTML & CSS track (3 courses x 5 chapters x 20 lessons). Step 3 only checks display, since the gallery has no media query; gap is a codeIncludes check.',
};

export default lesson;
