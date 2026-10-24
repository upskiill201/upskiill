import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 5 · Lesson 8 — a friendly 404 page: what it is, what to put on it, 404.html. Card deck (text). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'A friendly "page not found"',
  summary: 'Ama types the address wrong and gets a grey, scary error. Tey shows Kofi how to make a "page not found" page that sounds like him and helps people find their way back.',
  minutes: 11,
  outcomes: ['Explain what a 404 is', 'Write a helpful 404 page', 'Know that many hosts show a 404.html file automatically'],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>404 means "not found".</strong> When someone opens an address that doesn\'t exist on your site, like a typo or an old link, the server answers with the code 404. Without your own page, people see a plain, unhelpful error and often leave.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>A good 404 page</strong> says clearly that the page isn\'t here, sounds like your site, and gives a way back: a link home and links to the most popular pages. Keep your normal header and colours so people know they\'re still in the right place.</p>',
    },
    {
      kind: 'check',
      question: 'What\'s the most important thing on a 404 page?',
      options: ['A big error code', 'A way back to the rest of the site', 'A joke'],
      answer: 1,
      explanation: 'People need a way to keep going: a link home and to popular pages.',
    },
    {
      kind: 'text',
      html: '<p><strong>Name it 404.html.</strong> Many hosts show a file called 404.html automatically whenever a page isn\'t found. Others need a setting. Check your host\'s help pages for "custom 404".</p>',
    },
    {
      kind: 'tryIt',
      title: 'Mensah Beats 404',
      caption: 'Friendly, in Kofi\'s voice, and full of ways back.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; line-height: 1.6; padding: 16px; }\n  h1 { color: #FF9600; }\n  a { color: #FFC83D; }\n</style>\n<main>\n  <h1>This beat isn\'t here</h1>\n  <p>The page you wanted doesn\'t exist, or it moved. Try one of these:</p>\n  <ul>\n    <li><a href="index.html">Go to the home page</a></li>\n    <li><a href="beats.html">Listen to all beats</a></li>\n    <li><a href="book.html">Book Kofi for your event</a></li>\n  </ul>\n</main>\n',
      challenge: 'Add a link to gigs.html with clear text.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Say it\'s not here, sound like you, and give a way back. Save it as 404.html.',
    },
  ],
  apply: {
    scenario: 'A friendly "page not found".',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does a 404 code mean?',
        options: [
          { text: 'The site is very popular', why: 'It means not found.' },
          { text: 'The page wasn\'t found' },
          { text: 'The form was sent', why: 'It means not found.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a link home to the 404 page: href "index.html", text "Go to the home page"',
        starter: '<main>\n  <h1>This beat isn\'t here</h1>\n  <p>The page you wanted doesn\'t exist, or it moved.</p>\n\n</main>\n',
        solution: '<main>\n  <h1>This beat isn\'t here</h1>\n  <p>The page you wanted doesn\'t exist, or it moved.</p>\n  <p><a href="index.html">Go to the home page</a></p>\n</main>\n',
        hint: '<a href="index.html">Go to the home page</a>',
        checks: [
          { message: 'A link home', dom: { selector: 'a[href="index.html"]', count: 1 } },
          { message: 'With clear text', dom: { selector: 'a[href="index.html"]', text: 'home page' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good on a 404 page, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'A link to the home page', group: 0 },
          { text: 'Only the words "Error 404"', group: 1 },
          { text: 'The normal header and colours', group: 0 },
          { text: 'Blaming the visitor', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the 404 to its job.',
        pairs: [
          ['"This beat isn\'t here"', 'Says clearly what happened'],
          ['Link to home', 'A way back'],
          ['Link to Book Kofi', 'Keeps a booking alive'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'ama',
        message: 'I typed gig.html instead of gigs.html and got a scary grey page.',
        options: [
          { text: 'That\'s your fault.', why: 'Typos happen; help people back.' },
          { text: 'Grey pages are fine.', why: 'People often leave.' },
          { text: 'Kofi\'s adding a friendly 404 page, so typos land somewhere with links back.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the 404 file name most hosts won\'t find automatically.',
        lines: ['404.html', 'not-found-page-final.html', 'index.html is the home page'],
        bug: 1,
        explanation: 'Many hosts look for 404.html. Use that name, or set it in your host\'s settings.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'A visitor lands on this 404. How many ways back do they have?',
        code: '<ul>\n  <li><a href="index.html">Home</a></li>\n  <li><a href="beats.html">All beats</a></li>\n</ul>',
        language: 'html',
        options: [
          { text: 'Two' },
          { text: 'None', why: 'There are two links.' },
          { text: 'One', why: 'Count the links.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Name the file.',
        template: 'Save the friendly page as [[1]].[[2]]',
        blanks: [['404'], ['html']],
        distractors: ['error', 'css', 'txt'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What number does a server send when a page isn\'t found?',
        answers: ['404'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why keep the normal header on the 404 page?',
        options: [
          { text: 'Search engines need it', why: 'It\'s for people.' },
          { text: 'It hides the error', why: 'It helps people carry on.' },
          { text: 'So people know they\'re still on Mensah Beats, and can use the menu' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'What would your 404 page say, in your own voice?',
    starters: ['My heading would be...', 'I\'d link to...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Make a 404.html for your site with your header, a friendly line, and links to your most useful pages. Check your host\'s help for "custom 404".',
  },
  notes: 'GitHub Pages and Netlify both serve a root 404.html automatically; other hosts vary, so the lesson says "many hosts" and "check your host".',
};

export default lesson;
