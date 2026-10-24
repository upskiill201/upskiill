import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 19 — the finished index.html, top to bottom: doctype, lang, title, link, content, footer. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'The page that went live',
  summary: 'Before the poster goes to print, Tey walks Kofi through the finished index.html one last time. Every line is something he learned in this course. Tap each part.',
  minutes: 11,
  outcomes: ['Read a complete, published page', 'Explain what each part of the head does', 'Check a page is ready to share'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part of index.html',
      text: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Mensah Beats | Producer from Accra</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n  <img src="sunrise-in-osu.jpg" alt="Sunrise in Osu cover: an orange sun over a night-blue sea">\n  <a href="mailto:bookings@example.com">Book me</a>\n  <footer><small>Mensah Beats v1.0</small></footer>\n</body>\n</html>',
      hotspots: [
        { phrase: '<!DOCTYPE html>', note: 'Tells the browser this is a modern HTML page. Always the first line.' },
        { phrase: 'lang="en"', note: 'The page\'s language, so screen readers pronounce it properly and translators know what it is.' },
        { phrase: '<meta charset="utf-8">', note: 'Makes letters and symbols from any language show correctly.' },
        { phrase: '<title>Mensah Beats | Producer from Accra</title>', note: 'Shows in the browser tab and in search results. Make it say who you are.' },
        { phrase: '<link rel="stylesheet" href="style.css">', note: 'Loads the whole look from style.css.' },
        { phrase: 'alt="Sunrise in Osu cover: an orange sun over a night-blue sea"', note: 'Describes the image for people who can\'t see it, and shows if the image fails to load.' },
        { phrase: 'href="mailto:bookings@example.com"', note: 'The safe way to be booked: a separate email, no phone number.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The live page, in small',
      caption: 'The body of the finished page, with its look. The images and style.css aren\'t here, so the look is in a style block.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; font-size: 1rem; line-height: 1.6; }\n  h1 { color: #FF9600; font-family: Georgia, serif; font-size: 2.5rem; }\n  a { color: #FF9600; }\n  small { font-size: 0.875rem; }\n</style>\n<h1>Mensah Beats</h1>\n<p>Beats from Accra, made late at night.</p>\n<p><a href="mailto:bookings@example.com">Book me</a></p>\n<footer><small>Mensah Beats v1.0</small></footer>\n',
      challenge: 'Read it as a stranger. Anything private? Anything hard to read?',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Every published page: doctype, lang, charset, a title that says who you are, a stylesheet link, alt text on images.',
    },
  ],
  apply: {
    scenario: 'The final read-through.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each part to its job.',
        pairs: [
          ['<title>', 'Browser tab and search results'],
          ['lang="en"', 'The page\'s language'],
          ['<link rel="stylesheet">', 'Loads the look'],
          ['alt', 'Describes an image'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Complete the head: charset utf-8, the title "Mensah Beats | Producer from Accra", and a link to style.css',
        starter: '<!DOCTYPE html>\n<html lang="en">\n<head>\n\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n</body>\n</html>\n',
        solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Mensah Beats | Producer from Accra</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n</body>\n</html>\n',
        hint: 'Three lines: meta, title, link.',
        checks: [
          { message: 'utf-8 charset', dom: { selector: 'meta[charset]', count: 1 } },
          { message: 'A title that says who he is', dom: { selector: 'title', text: 'Producer from Accra' } },
          { message: 'Stylesheet linked', dom: { selector: 'link', attr: 'href', attrValue: 'style.css' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Where does the page title show up?',
        options: [
          { text: 'In the browser tab and in search results' },
          { text: 'As the big heading on the page', why: 'That\'s the h1.' },
          { text: 'Nowhere', why: 'It\'s in the tab and in search.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'In the head, or in the body?',
        groups: ['head', 'body'],
        items: [
          { text: '<title>', group: 0 },
          { text: '<h1>', group: 1 },
          { text: '<link rel="stylesheet">', group: 0 },
          { text: '<footer>', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the image that\'s missing something.',
        language: 'html',
        lines: ['<img src="sunrise-in-osu.jpg" alt="Sunrise in Osu cover">', '<img src="jollof-bounce.jpg">', '<img src="kofi.jpg" alt="Kofi at his laptop">'],
        bug: 1,
        explanation: 'No alt text. Describe the image for people who can\'t see it.',
        fix: '<img src="jollof-bounce.jpg" alt="Jollof Bounce cover">',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Should my title just say "Home"?',
        options: [
          { text: 'Yes, Home is fine.', why: 'Every site\'s tab would say Home.' },
          { text: 'Leave the title out.', why: 'Then the tab shows the file name.' },
          { text: 'Say who you are: "Mensah Beats | Producer from Accra". That\'s what shows in tabs and searches.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The image file fails to load. What does a visitor see?',
        code: '<img src="sunrise.jpg" alt="Sunrise in Osu cover">',
        language: 'html',
        options: [
          { text: 'An error page', why: 'The rest of the page still loads.' },
          { text: 'The alt text, "Sunrise in Osu cover"' },
          { text: 'The file name', why: 'Browsers show the alt text.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the first lines.',
        language: 'html',
        template: '<!DOCTYPE [[1]]>\n<html [[2]]="en">',
        blanks: [['html'], ['lang']],
        distractors: ['page', 'language', 'head'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What charset makes letters from any language show correctly? (e.g. ___-8)',
        answers: ['utf-8', 'utf8', 'utf'],
        placeholder: 'A charset',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the head in order, top to bottom.',
        language: 'html',
        lines: ['<head>', '  <meta charset="utf-8">', '  <title>Mensah Beats</title>', '  <link rel="stylesheet" href="style.css">', '</head>'],
      },
    ],
  },
  reflect: {
    prompt: 'Go through your own index.html line by line. Which part would you explain to a friend first?',
    starters: ['I\'d start with...', 'The part I understand best is...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Check your own page has all six: doctype, lang, charset, a title that says who you are, a stylesheet link, and alt text on every image.',
  },
  notes: 'Standard HTML document head (MDN, "What\'s in the head?"). Title appears in tabs and is commonly used by search engines as the result title.',
};

export default lesson;
