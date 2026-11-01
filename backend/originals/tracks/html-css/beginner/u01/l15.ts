import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14. Story beat: Ama tests the page. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: Ama tests it',
  summary: 'Kofi hands his phone to his ten-year-old sister, his toughest user tester. If Ama can\'t make sense of it, nobody can. The page skeleton, comments, attributes and view source, mixed together.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Write a complete page skeleton with a title', 'Use comments and attributes correctly', 'Read a page\'s source and find its parts'],
  learn: [
    {
      kind: 'story',
      title: 'The user tester',
      beats: [
        { speaker: 'narrator', text: 'Sunday afternoon. Kofi hands his phone to Ama, who is ten and has opinions about everything.' },
        { speaker: 'kofi', text: 'Okay, user tester. Tell me what you see.' },
        { speaker: 'ama', text: 'The tab says index.html. That\'s not a name. And why does it say "TODO fix this" at the top?' },
        { speaker: 'kofi', text: 'That was a comment! It shouldn\'t show!' },
        { speaker: 'ama', text: 'Well, it shows. Also, can I be on the website? I want a section.' },
        { speaker: 'tey', text: 'Ama found two real bugs in thirty seconds. Testers are precious. Let\'s fix what she found.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: fix everything Ama found.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Bug one: the tab says index.html. Give the page the title Mensah Beats',
        starter: '<!DOCTYPE html>\n<html lang="en">\n<head>\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n</body>\n</html>\n',
        solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>Mensah Beats</title>\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n</body>\n</html>\n',
        hint: 'Add <title>Mensah Beats</title> between <head> and </head>.',
        checks: [{ message: 'The title is Mensah Beats, in the head', dom: { selector: 'head title', text: 'Mensah Beats' } }],
      },
      {
        kind: 'findBug',
        prompt: 'Bug two: tap the comment that shows on the page.',
        language: 'html',
        lines: ['<-- TODO fix this -->', '<h1>Mensah Beats</h1>', '<!-- About section -->', '<p>I make beats.</p>'],
        bug: 0,
        fix: '<!-- TODO fix this -->',
        explanation: 'A comment must start with <!-- . Without the !, the browser shows it as text.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the skeleton in order.',
        language: 'html',
        lines: ['<!DOCTYPE html>', '<html lang="en">', '<head>', '<title>Mensah Beats</title>', '</head>', '<body>', '<h1>Mensah Beats</h1>', '</body>', '</html>'],
      },
      {
        kind: 'mcq',
        prompt: 'Which part of the page does Ama see on the screen?',
        options: [
          { text: 'Everything inside head', why: 'The head is information about the page, mostly not shown.' },
          { text: 'Everything inside body' },
          { text: 'The comments', why: 'Comments never show, as long as they\'re written correctly.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each piece to where it belongs.',
        pairs: [
          ['<title>', 'Inside head'],
          ['<h1>', 'Inside body'],
          ['lang="en"', 'Inside the html opening tag'],
          ['<!DOCTYPE html>', 'The very first line'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Ama wants a section. Add an h2 Ama\'s corner and a paragraph under it, with a comment above saying Ama\'s section',
        starter: '<h1>Mensah Beats</h1>\n',
        solution: '<h1>Mensah Beats</h1>\n<!-- Ama\'s section -->\n<h2>Ama\'s corner</h2>\n<p>My brother makes the best beats.</p>\n',
        hint: 'A comment, then <h2>Ama\'s corner</h2>, then a <p> with anything Ama would say.',
        checks: [
          { message: 'A section heading Ama\'s corner', dom: { selector: 'h2', text: 'Ama\'s corner' } },
          { message: 'A paragraph', dom: { selector: 'p', min: 1 } },
          { message: 'A comment above it', codeIncludes: '<!--' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the html tag.',
        language: 'html',
        template: '<html [[1]]="en">',
        blanks: [['lang']],
        distractors: ['language', 'title', 'type'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does the page show?',
        code: '<!-- Ama was here -->\n<h1>Mensah Beats</h1>\n<p lang="tw">Akwaaba!</p>',
        language: 'html',
        options: [
          { text: 'Ama was here, Mensah Beats, Akwaaba!', why: 'The first line is a correct comment, so it doesn\'t show.' },
          { text: 'Mensah Beats, Akwaaba! and the word tw', why: 'Attributes never show on the page.' },
          { text: 'Mensah Beats as a heading, then Akwaaba!' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Shows on the page, or not?',
        groups: ['Shows', 'Doesn\'t show'],
        items: [
          { text: 'A paragraph in the body', group: 0 },
          { text: 'The title', group: 1 },
          { text: 'A comment written correctly', group: 1 },
          { text: 'An h2 in the body', group: 0 },
          { text: 'The lang attribute', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'ama',
        message: 'I found two bugs. Do I get paid?',
        options: [
          { text: 'Bugs aren\'t real, so no.', why: 'They were very real. Ama earned some credit.' },
          { text: 'You get your own section on the site, and you\'re officially my user tester.' },
          { text: 'Ask Clinton, he\'s Head of Quality.', why: 'Clinton is unpaid too. Ama deserves better.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the page\'s language English and its title Mensah Beats',
        starter: '<!DOCTYPE html>\n<html>\n<head>\n  <title></title>\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n</body>\n</html>\n',
        solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>Mensah Beats</title>\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n</body>\n</html>\n',
        hint: 'Two changes: lang="en" in the html tag, and Mensah Beats inside the title.',
        checks: [
          { message: 'The page\'s language is English', dom: { selector: 'html', attr: 'lang', attrValue: 'en' } },
          { message: 'The title is Mensah Beats', dom: { selector: 'head title', text: 'Mensah Beats' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Ama saw things Kofi had stopped noticing. Who could test something you\'ve made with fresh eyes?',
    starters: ['My user tester would be...', 'They\'d notice...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Show your playground page to someone, without explaining it. Ask them what they see first, and what confuses them.',
  },
  notes: 'Checkpoint 3 reviews l11–l14: skeleton (DOCTYPE, html, head, title, body), comments, lang attribute, view source. Ama gets "Ama\'s corner", a running gag for later chapters.',
};

export default lesson;
