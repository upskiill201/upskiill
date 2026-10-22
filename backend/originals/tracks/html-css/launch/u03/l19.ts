import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 3 · Lesson 19 — the v1.8 page skeleton, every accessibility piece explained. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'A page everyone can use',
  summary: 'Before v1.8 goes up, Miracle and Kofi read the top of the page together, line by line, asking one question each time: who does this help? Tap each part.',
  minutes: 11,
  outcomes: ['Read an accessible page and name who each piece helps', 'Explain how the pieces work together', 'Spot anything missing'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part',
      text: '<html lang="en">\n<title>Home | Mensah Beats</title>\n<a class="skip-link" href="#main">Skip to main content</a>\n<header>\n  <nav><ul><li><a href="#gigs">Gigs</a></li></ul></nav>\n</header>\n<main id="main">\n  <h1><span lang="tw">Akwaaba!</span> Mensah Beats</h1>\n  <img src="cover-1.png" alt="Sunrise in Osu cover: an orange sun rising over the sea">\n  <a href="https://example.com/ig" aria-label="Mensah Beats on Instagram"><img src="ig.png" alt=""></a>\n</main>\n<footer>...</footer>',
      hotspots: [
        { phrase: 'lang="en"', note: 'Helps screen reader users hear the right voice, and helps translation tools.' },
        { phrase: '<title>Home | Mensah Beats</title>', note: 'Helps everyone with lots of tabs open, and is the first thing a screen reader says.' },
        { phrase: 'Skip to main content', note: 'Helps keyboard users like David skip the nav every time.' },
        { phrase: '<nav>', note: 'A landmark: screen reader users can jump straight to the menu.' },
        { phrase: '<main id="main">', note: 'The main landmark, and the skip link\'s target.' },
        { phrase: 'lang="tw"', note: 'Akwaaba is read as Twi, not mispronounced as English.' },
        { phrase: 'aria-label="Mensah Beats on Instagram"', note: 'An icon-only link with a name, so it isn\'t just "link".' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Mensah Beats v1.8',
      caption: 'The accessible skeleton with the site\'s look. Try Tab, zoom, and a screen reader.',
      code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Home | Mensah Beats</title>\n  <style>\n    * { box-sizing: border-box; }\n    body { margin: 0; background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; line-height: 1.6; }\n    .skip-link { position: absolute; top: -100px; left: 8px; padding: 8px 12px; background-color: #FFC83D; color: #14213D; border-radius: 8px; }\n    .skip-link:focus { top: 8px; }\n    header, main, footer { padding: 16px; }\n    header { background-color: #1F2E52; }\n    nav ul { display: flex; flex-wrap: wrap; gap: 8px; list-style: none; margin: 0; padding: 0; }\n    a { color: #FFC83D; }\n    :focus-visible { outline: 3px solid #FFF6E5; outline-offset: 3px; }\n    img { max-width: 100%; height: auto; border-radius: 8px; }\n  </style>\n</head>\n<body>\n  <a class="skip-link" href="#main">Skip to main content</a>\n  <header><nav><ul><li><a href="#beats">Beats</a></li><li><a href="#gigs">Gigs</a></li><li><a href="#book">Book me</a></li></ul></nav></header>\n  <main id="main">\n    <h1><span lang="tw">Akwaaba!</span> Mensah Beats</h1>\n    <h2 id="beats">Beats</h2>\n    <img src="cover-1.png" alt="Sunrise in Osu cover: an orange sun rising over the sea" width="400" height="400">\n    <h2 id="gigs">Gigs</h2>\n    <p>End-of-year show, Saturday 20 December, Accra.</p>\n  </main>\n  <footer><small>Mensah Beats v1.8</small></footer>\n</body>\n</html>\n',
      challenge: 'Run the fifteen-minute check on it in your head. Anything missing?',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'For every line, ask: who does this help? If nobody, delete it. If someone\'s missing, add it.',
    },
  ],
  apply: {
    scenario: 'Who does this help?',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each piece to who it helps most.',
        pairs: [
          ['Skip link', 'Keyboard users'],
          ['Landmarks and headings', 'Screen reader users'],
          ['min-height instead of height', 'People who zoom'],
          ['prefers-reduced-motion', 'People who get motion sick'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does main have id="main"?',
        options: [
          { text: 'For styling only', why: 'It\'s the skip link\'s target.' },
          { text: 'So the skip link href="#main" can jump to it' },
          { text: 'Every element needs an id', why: 'Only targets need ids.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Add the missing piece: give html lang="en"',
        starter: '<!DOCTYPE html>\n<html>\n<head><meta charset="utf-8"><title>Home | Mensah Beats</title></head>\n<body><main id="main"><h1>Mensah Beats</h1></main></body>\n</html>\n',
        solution: '<!DOCTYPE html>\n<html lang="en">\n<head><meta charset="utf-8"><title>Home | Mensah Beats</title></head>\n<body><main id="main"><h1>Mensah Beats</h1></main></body>\n</html>\n',
        hint: '<html lang="en">',
        checks: [
          { message: 'The page language is set', dom: { selector: 'html[lang="en"]', count: 1 } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Visible to everyone, or mainly for assistive tech and keyboards?',
        groups: ['Visible to everyone', 'Mainly behind the scenes'],
        items: [
          { text: 'Good contrast', group: 0 },
          { text: 'lang="tw" on Akwaaba', group: 1 },
          { text: 'A clear heading outline', group: 0 },
          { text: 'aria-label on an icon link', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line Miracle would send back.',
        language: 'html',
        lines: ['<a class="skip-link" href="#main">Skip to main content</a>', '<img src="cover-1.png" alt="cover-1.png">', '<main id="main">'],
        bug: 1,
        explanation: 'The alt is just the file name. Describe the picture: "Sunrise in Osu cover: an orange sun rising over the sea".',
        fix: '<img src="cover-1.png" alt="Sunrise in Osu cover: an orange sun rising over the sea">',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Is the site "done" for accessibility now?',
        options: [
          { text: 'Yes, forever.', why: 'Every change needs checking.' },
          { text: 'It can never be good.', why: 'It\'s good now; keep it that way.' },
          { text: 'It\'s in good shape, but every change can break something. I\'ll rerun the check and keep asking users.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does a screen reader call this link?',
        code: '<a href="https://example.com/ig" aria-label="Mensah Beats on Instagram"><img src="ig.png" alt=""></a>',
        language: 'html',
        options: [
          { text: '"Link"', why: 'aria-label names it.' },
          { text: '"Mensah Beats on Instagram, link"' },
          { text: '"ig dot png"', why: 'The image is decoration; the label names the link.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The skip link and its target.',
        language: 'html',
        template: '<a class="skip-link" href="[[1]]">Skip to main content</a>\n<main [[2]]="main">',
        blanks: [['#main'], ['id']],
        distractors: ['main', 'class', '.main'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What version of Mensah Beats is the accessible one? (e.g. v1.7)',
        answers: ['v1.8', '1.8'],
        placeholder: 'A version',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the body in order.',
        language: 'html',
        lines: ['<a class="skip-link" href="#main">Skip to main content</a>', '<header><nav>...</nav></header>', '<main id="main">...</main>', '<footer>...</footer>'],
      },
    ],
  },
  reflect: {
    prompt: 'Read your own page line by line and ask "who does this help?". What did you find?',
    starters: ['I found...', 'Nobody was helped by...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Compare your page with v1.8, line by line. Add anything that\'s missing.',
  },
  notes: 'v1.8 accessible skeleton, combining Chapter 3\'s techniques with earlier ones (contrast, rem, reduced motion, labels).',
};

export default lesson;
