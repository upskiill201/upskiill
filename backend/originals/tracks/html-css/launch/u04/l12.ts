import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 4 · Lesson 12 — the tab icon (favicon) and the complete sharing set, read line by line. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'The little icon in the tab',
  summary: 'Next to every other site\'s name in Kofi\'s browser tabs there\'s a tiny icon. Next to his: a blank grey square. Miracle shows him the favicon line, and the complete set of sharing tags. Tap each part.',
  minutes: 11,
  outcomes: ['Add a favicon with link rel="icon"', 'Read a complete set of sharing tags', 'Keep sharing tags in step with the page'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part',
      text: '<link rel="icon" href="favicon.png" type="image/png">\n<meta property="og:type" content="website">\n<meta property="og:site_name" content="Mensah Beats">\n<meta property="og:title" content="Upcoming gigs | Mensah Beats">\n<meta property="og:description" content="Where Mensah Beats is playing next, with dates and tickets.">\n<meta property="og:image" content="https://mensahbeats.example.app/share.jpg">\n<meta property="og:url" content="https://mensahbeats.example.app/gigs.html">',
      hotspots: [
        { phrase: '<link rel="icon" href="favicon.png" type="image/png">', note: 'The favicon: the little icon in tabs, bookmarks and sometimes search results. A small square image, like the orange sun.' },
        { phrase: 'og:type', note: 'What kind of thing this is. "website" is right for most pages.' },
        { phrase: 'og:site_name', note: 'The site\'s name, shown in some previews above or below the title.' },
        { phrase: 'Upcoming gigs | Mensah Beats', note: 'Each page can have its own og:title, matching its own page title.' },
        { phrase: 'https://mensahbeats.example.app/gigs.html', note: 'og:url is this page\'s own full address, so a shared link always points to the right page.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The gigs page head',
      caption: 'Favicon plus the full sharing set for the gigs page.',
      code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Upcoming gigs | Mensah Beats</title>\n  <link rel="icon" href="favicon.png" type="image/png">\n  <meta property="og:type" content="website">\n  <meta property="og:site_name" content="Mensah Beats">\n  <meta property="og:title" content="Upcoming gigs | Mensah Beats">\n  <meta property="og:description" content="Where Mensah Beats is playing next, with dates and tickets.">\n  <meta property="og:image" content="https://mensahbeats.example.app/share.jpg">\n  <meta property="og:url" content="https://mensahbeats.example.app/gigs.html">\n  <style>body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }</style>\n</head>\n<body><h1>Upcoming gigs</h1></body>\n</html>\n',
      challenge: 'Write the og:title and og:url you\'d use for book.html.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'link rel="icon" for the tab icon. Each page gets its own og:title and og:url.',
    },
  ],
  apply: {
    scenario: 'The blank grey square.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each tag to its job.',
        pairs: [
          ['link rel="icon"', 'The tab icon'],
          ['og:site_name', 'The site\'s name in previews'],
          ['og:type', 'What kind of thing it is'],
          ['og:url', 'This page\'s full address'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Add the tab icon: link rel="icon" with href="favicon.png" and type="image/png"',
        starter: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Mensah Beats | Beat producer in Accra</title>\n\n</head>\n<body><h1>Mensah Beats</h1></body>\n</html>\n',
        solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Mensah Beats | Beat producer in Accra</title>\n  <link rel="icon" href="favicon.png" type="image/png">\n</head>\n<body><h1>Mensah Beats</h1></body>\n</html>\n',
        hint: '<link rel="icon" href="favicon.png" type="image/png">',
        checks: [
          { message: 'A favicon link', dom: { selector: 'link[rel="icon"]', count: 1 } },
          { message: 'Pointing to the icon', dom: { selector: 'link[rel="icon"]', attr: 'href', attrValue: 'favicon.png' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The gigs page has og:url pointing to the home page. What happens when someone shares the gigs page?',
        options: [
          { text: 'Nothing, og:url is ignored', why: 'Apps often use it as the link\'s address.' },
          { text: 'It shares both', why: 'It points to one address.' },
          { text: 'The preview may send people to the home page instead of the gigs' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Same on every page, or different per page?',
        groups: ['Same everywhere', 'Different per page'],
        items: [
          { text: 'og:site_name', group: 0 },
          { text: 'og:title', group: 1 },
          { text: 'The favicon', group: 0 },
          { text: 'og:url', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'What should the favicon be? My whole logo?',
        options: [
          { text: 'A full photo of me.', why: 'It\'s too detailed to see when tiny.' },
          { text: 'Something simple that still reads when tiny, like just the orange sun. Long words disappear at that size.' },
          { text: 'Nothing.', why: 'A blank square looks unfinished.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the broken favicon line.',
        language: 'html',
        lines: ['<meta charset="utf-8">', '<link rel="favicon" href="favicon.png">', '<title>Mensah Beats</title>'],
        bug: 1,
        explanation: 'The rel value is icon, not favicon.',
        fix: '<link rel="icon" href="favicon.png" type="image/png">',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Where does the favicon appear?',
        code: '<link rel="icon" href="favicon.png" type="image/png">',
        language: 'html',
        options: [
          { text: 'In browser tabs, bookmarks, and sometimes search results' },
          { text: 'As the main image on the page', why: 'It\'s a small icon, not on the page.' },
          { text: 'Only when printing', why: 'Tabs and bookmarks mainly.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The tab icon.',
        language: 'html',
        template: '<link rel="[[1]]" href="[[2]]" type="image/png">',
        blanks: [['icon'], ['favicon.png']],
        distractors: ['favicon', 'stylesheet', 'logo.html'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the little icon in a browser tab called? (one word)',
        answers: ['favicon'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What should og:url be on book.html?',
        options: [
          { text: 'The home page address', why: 'Each page points to itself.' },
          { text: 'The full address of book.html' },
          { text: 'Left out', why: 'It helps previews link correctly.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What simple shape could be your own favicon?',
    starters: ['My favicon could be...', 'Because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Make a small square icon (for example 48 by 48 or larger, as a PNG), add link rel="icon", and give each main page its own og:title and og:url.',
  },
  notes: 'link rel="icon" per HTML spec; browsers also look for /favicon.ico by default. og:type, og:site_name, og:url per ogp.me. Favicon size guidance varies by platform; kept general.',
};

export default lesson;
