import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 6 — where CSS lives: style attribute, style tag in head, separate style.css. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Where CSS lives',
  summary: 'Kofi has seen CSS in three places: inside a tag, in a style tag, and in a file called style.css. Which one should he use? Tey explains all three, and why real sites mostly use the third.',
  minutes: 11,
  outcomes: ['Name the three places CSS can live', 'Put a style tag in the head of a full page', 'Explain why big sites use a separate stylesheet'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'CSS can live in three places. One: inside a tag, with the style attribute. Two: in a style tag. Three: in its own file, like style.css. Which have you used so far?',
          replies: ['The style tag', 'All three?'],
        },
        {
          tey: 'Mostly the style tag. On a full page it goes in the head, so the browser reads the looks before it shows the body. The style attribute is the one Clinton loves: fine for a one-off, messy for anything bigger.',
          replies: ['And style.css?'],
        },
        {
          tey: 'That\'s what real sites use. The CSS lives in its own file, and each page links to it with one line in the head: link rel="stylesheet" href="style.css". Change the file once, and every page on the site changes.',
          replies: ['Why not use that now?'],
        },
        {
          tey: 'Our live pad shows one page at a time, so we\'ll use the style tag while we learn. When Mensah Beats goes live in the next chapter, you\'ll move it into style.css. Same CSS, new home.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'A full page with its styles in the head',
      caption: 'The style tag sits in the head. The visible page is in the body.',
      code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>Mensah Beats</title>\n  <style>\n    body { background-color: midnightblue; color: white; }\n  </style>\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n</body>\n</html>\n',
      challenge: 'Add an h1 rule in the same style tag that makes the heading orange.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Attribute: one-off. Style tag: one page, in the head. style.css: the whole site, linked from every page.',
    },
  ],
  apply: {
    scenario: 'Kofi decides where his CSS should live.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each place to when it fits.',
        pairs: [
          ['style="..." on a tag', 'A rare one-off'],
          ['A style tag in the head', 'One page'],
          ['A style.css file', 'A whole site'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'On a full page, where does the style tag go?',
        options: [
          { text: 'In the head' },
          { text: 'At the very bottom, after html', why: 'Outside html isn\'t part of the page. Put it in the head.' },
          { text: 'Inside every heading', why: 'That\'s the style attribute. The tag goes in the head.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'This full page has no styles yet. Add a style tag in the head that makes the body background black',
        starter: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>Mensah Beats</title>\n\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n</body>\n</html>\n',
        solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>Mensah Beats</title>\n  <style>\n    body { background-color: black; }\n  </style>\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n</body>\n</html>\n',
        hint: 'On the empty line: <style> body { background-color: black; } </style>',
        checks: [
          { message: 'A style tag in the head', dom: { selector: 'head style', count: 1 } },
          { message: 'A black page', dom: { selector: 'body', style: 'background-color', styleValue: 'black' } },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the head in order.',
        language: 'html',
        lines: ['<head>', '  <title>Mensah Beats</title>', '  <link rel="stylesheet" href="style.css">', '</head>'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'If I add a gigs page later, do I copy all my CSS onto it?',
        options: [
          { text: 'Better: put the CSS in style.css and link it from both pages. One file, one change.' },
          { text: 'Yes, copy it every time.', why: 'Then every change means editing every page.' },
          { text: 'Pages can\'t share CSS.', why: 'They can, with a linked stylesheet.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line in the wrong place.',
        language: 'html',
        lines: ['<head>', '  <title>Mensah Beats</title>', '</head>', '<style> body { color: white; } </style>', '<body>'],
        bug: 3,
        explanation: 'Between head and body isn\'t a proper place. Move the style tag inside the head.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the line that links a stylesheet.',
        language: 'html',
        template: '<link rel="[[1]]" href="[[2]]">',
        blanks: [['stylesheet'], ['style.css']],
        distractors: ['style', 'index.html', 'css'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Two pages both link to style.css. Kofi changes h1 to pink in style.css. What happens?',
        code: '<!-- index.html and gigs.html -->\n<link rel="stylesheet" href="style.css">',
        language: 'html',
        options: [
          { text: 'Only index.html changes', why: 'Both pages use the same file.' },
          { text: 'Both pages get pink headings' },
          { text: 'Neither changes until he edits both', why: 'One file, both pages.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the usual name for a site\'s CSS file? (include the dot)',
        answers: ['style.css', 'styles.css'],
        placeholder: 'A file name',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good home for this CSS?',
        groups: ['Good fit', 'Poor fit'],
        items: [
          { text: 'Site-wide colours in style.css', group: 0 },
          { text: 'The same colour typed on 30 tags', group: 1 },
          { text: 'A style tag in the head while learning', group: 0 },
          { text: 'A style tag after the closing html tag', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'If your site had ten pages, why would you want all the CSS in one file?',
    starters: ['With ten pages...', 'One file means...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'View source on a site you like. Find the link rel="stylesheet" line in its head.',
  },
  notes: 'Three ways to add CSS (inline, internal, external) per MDN "How CSS is structured". The live pad shows one document, so lessons use a style tag; external stylesheets come with publishing in Chapter 5.',
};

export default lesson;
