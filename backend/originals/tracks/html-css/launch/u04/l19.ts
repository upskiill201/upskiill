import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 4 · Lesson 19 — the complete v1.9 head, every line explained. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'A head ready to be found',
  summary: 'Before v1.9 goes up, Miracle and Kofi read the home page\'s head one more time. Every line helps someone: a search engine, a phone, a chat app, a screen reader. Tap each part.',
  minutes: 11,
  outcomes: ['Read a complete, search-ready head', 'Say who each line helps', 'Spot anything missing or wrong'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part',
      text: '<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Mensah Beats | Beat producer in Accra</title>\n  <meta name="description" content="Highlife-inspired beats from Accra. Listen free, see gigs, and book Kofi for your event.">\n  <link rel="icon" href="favicon.png" type="image/png">\n  <link rel="stylesheet" href="style.css">\n  <meta property="og:title" content="Mensah Beats | Beat producer in Accra">\n  <meta property="og:image" content="https://mensahbeats.example.app/share.jpg">\n  <meta property="og:image:alt" content="Mensah Beats in orange letters over an orange sun">\n  <meta property="og:url" content="https://mensahbeats.example.app/">\n</head>',
      hotspots: [
        { phrase: 'lang="en"', note: 'Helps screen readers pick a voice and search engines match the language.' },
        { phrase: 'name="viewport"', note: 'Helps phones show the real layout, and search engines that look at the phone version.' },
        { phrase: '<title>Mensah Beats | Beat producer in Accra</title>', note: 'Helps everyone: the tab, the search result, the first words a screen reader says.' },
        { phrase: 'name="description"', note: 'Helps people choose the result in search.' },
        { phrase: 'rel="icon"', note: 'Helps people spot the tab among many.' },
        { phrase: 'og:image:alt', note: 'Helps people who can\'t see the share image know what it shows.' },
        { phrase: 'og:url', note: 'Helps shared links always point to the right page.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Mensah Beats v1.9 head',
      caption: 'The complete head for the home page, with a little of the page.',
      code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Mensah Beats | Beat producer in Accra</title>\n  <meta name="description" content="Highlife-inspired beats from Accra. Listen free, see gigs, and book Kofi for your event.">\n  <link rel="icon" href="favicon.png" type="image/png">\n  <meta property="og:title" content="Mensah Beats | Beat producer in Accra">\n  <meta property="og:description" content="Listen free, see gigs, and book Kofi for your event.">\n  <meta property="og:image" content="https://mensahbeats.example.app/share.jpg">\n  <meta property="og:image:alt" content="Mensah Beats in orange letters over an orange sun">\n  <meta property="og:url" content="https://mensahbeats.example.app/">\n  <style>body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; } a { color: #FFC83D; }</style>\n</head>\n<body>\n  <main>\n    <h1>Mensah Beats: beat producer in Accra</h1>\n    <p><a href="gigs.html">See upcoming gigs</a> or <a href="book.html">book Kofi for your event</a>.</p>\n  </main>\n</body>\n</html>\n',
      challenge: 'Write the matching og:url for gigs.html.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Every line in the head should help someone. If you can\'t say who, it probably doesn\'t belong.',
    },
  ],
  apply: {
    scenario: 'A head ready to be found.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each line to who it helps most.',
        pairs: [
          ['meta description', 'People choosing a search result'],
          ['og:image', 'People seeing a shared link'],
          ['viewport', 'Phone users'],
          ['link rel="icon"', 'People with many tabs open'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which line is the clickable heading in a search result, usually?',
        options: [
          { text: '<title>' },
          { text: 'og:image', why: 'That\'s the share picture.' },
          { text: 'link rel="icon"', why: 'That\'s the tab icon.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Add the missing preview address: og:url "https://mensahbeats.example.app/"',
        starter: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Mensah Beats | Beat producer in Accra</title>\n  <meta property="og:title" content="Mensah Beats | Beat producer in Accra">\n\n</head>\n<body><h1>Mensah Beats</h1></body>\n</html>\n',
        solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Mensah Beats | Beat producer in Accra</title>\n  <meta property="og:title" content="Mensah Beats | Beat producer in Accra">\n  <meta property="og:url" content="https://mensahbeats.example.app/">\n</head>\n<body><h1>Mensah Beats</h1></body>\n</html>\n',
        hint: '<meta property="og:url" content="https://mensahbeats.example.app/">',
        checks: [
          { message: 'A full preview address', dom: { selector: 'meta[property="og:url"][content^="https://"]', count: 1 } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep it, or delete it?',
        groups: ['Keep', 'Delete'],
        items: [
          { text: 'A specific title', group: 0 },
          { text: 'meta keywords', group: 1 },
          { text: 'og:image:alt', group: 0 },
          { text: 'A second, different title tag', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line Miracle would fix.',
        language: 'html',
        lines: ['<title>Mensah Beats | Beat producer in Accra</title>', '<meta property="og:image" content="share.jpg">', '<link rel="icon" href="favicon.png" type="image/png">'],
        bug: 1,
        explanation: 'og:image needs a full https:// address.',
        fix: '<meta property="og:image" content="https://mensahbeats.example.app/share.jpg">',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'This head is twelve lines. Is that too much?',
        options: [
          { text: 'Each line helps someone, and none of it shows on the page. Twelve useful lines is fine.' },
          { text: 'Yes, delete half.', why: 'Each one has a job.' },
          { text: 'Add fifty more.', why: 'Only add lines that help.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Which part of the page do these head tags change?',
        code: '<meta name="description" content="...">\n<meta property="og:title" content="...">',
        language: 'html',
        options: [
          { text: 'Nothing visible on the page: they\'re for search and previews' },
          { text: 'The h1', why: 'Meta tags don\'t change the page.' },
          { text: 'The colours', why: 'That\'s CSS.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the head.',
        language: 'html',
        template: '<meta [[1]]="description" content="...">\n<meta [[2]]="og:title" content="...">',
        blanks: [['name'], ['property']],
        distractors: ['og', 'title', 'value'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What version of Mensah Beats is ready to be found? (e.g. v1.8)',
        answers: ['v1.9', '1.9'],
        placeholder: 'A version',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the head in a sensible order.',
        language: 'html',
        lines: ['<meta charset="utf-8">', '<meta name="viewport" content="width=device-width, initial-scale=1">', '<title>Mensah Beats | Beat producer in Accra</title>', '<meta name="description" content="...">', '<meta property="og:title" content="...">'],
      },
    ],
  },
  reflect: {
    prompt: 'Read your own site\'s head. Who does each line help?',
    starters: ['This line helps...', 'I\'ll delete...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Compare your home page\'s head with v1.9, line by line, and add anything missing.',
  },
  notes: 'charset should come early in the head (within the first 1024 bytes). Order of other tags doesn\'t affect behaviour.',
};

export default lesson;
