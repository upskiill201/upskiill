import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 3 · Lesson 14 — a repeatable accessibility check: automated tool, keyboard, zoom, screen reader. Steps. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'The fifteen-minute check',
  summary: 'Miracle gives Kofi the routine she runs before anything she builds goes live. Four steps, about fifteen minutes, and most problems show up.',
  minutes: 12,
  outcomes: ['Run an automated accessibility check', 'Test with keyboard, zoom and a screen reader', 'Know what automated tools can and can\'t catch'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps before going live',
      steps: [
        { title: '1. An automated check', body: 'Browsers\' developer tools include checkers, like Lighthouse in Chrome, and there are free extensions such as axe. They catch things like missing alt, low contrast and missing labels. Check locally where your browser keeps them.' },
        { title: '2. Keyboard only', body: 'Put the mouse away. Tab through everything: can you reach and use every link, button and field? Can you always see where you are? Does the skip link work?' },
        { title: '3. Zoom and big text', body: 'Zoom to 200% and try a big-text setting. Does anything spill, overlap or get cut off? Does anything scroll sideways?' },
        { title: '4. A screen reader minute', body: 'Listen to the start of the page, jump by headings, and check images, links and buttons have sensible names.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Find the problems',
      caption: 'This page has four accessibility problems. Run the four steps in your head. Can you find them all?',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .faint { color: #3A4A6B; }\n  .bio { height: 40px; overflow: hidden; }\n</style>\n<h1>Mensah Beats</h1>\n<img src="cover-1.png" width="200" height="200">\n<p class="faint">New every Friday.</p>\n<span class="listen">Listen</span>\n<p class="bio">Kofi makes beats in Accra, late at night, on a phone, mostly highlife loops with heavy drums.</p>\n',
      challenge: 'Found them? No alt, faint text, a fake button, and a fixed-height bio. Fix all four.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Automated tools catch only some problems. Always do the keyboard, zoom and screen reader steps too.',
    },
  ],
  apply: {
    scenario: 'The fifteen-minute check.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put Miracle\'s check in order.',
        lines: ['Run an automated check', 'Keyboard only', 'Zoom to 200% and big text', 'A screen reader minute'],
      },
      {
        kind: 'writeCode',
        prompt: 'Fix two of the problems: give the image alt "Sunrise in Osu cover" and turn the Listen span into a link with href="#play"',
        starter: '<img src="cover-1.png" width="200" height="200">\n<span class="listen">Listen</span>\n',
        solution: '<img src="cover-1.png" alt="Sunrise in Osu cover" width="200" height="200">\n<a class="listen" href="#play">Listen</a>\n',
        hint: 'alt="Sunrise in Osu cover" on the img; <a class="listen" href="#play">Listen</a>.',
        checks: [
          { message: 'The image has alt', dom: { selector: 'img', attr: 'alt' } },
          { message: 'Listen is a real link', dom: { selector: 'a.listen[href]', count: 1 } },
          { message: 'No fake button left', dom: { selector: 'span.listen', count: 0 } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Can an automated tool usually catch it?',
        groups: ['Tool can catch it', 'Needs a person'],
        items: [
          { text: 'An image with no alt at all', group: 0 },
          { text: 'Alt text that\'s present but wrong ("image")', group: 1 },
          { text: 'Text with low contrast', group: 0 },
          { text: 'A confusing tab order', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each step to what it finds.',
        pairs: [
          ['Automated check', 'Missing alt, low contrast, missing labels'],
          ['Keyboard only', 'Unreachable controls, invisible focus'],
          ['200% zoom', 'Spilling or cut-off text'],
          ['Screen reader', 'Confusing names and structure'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Lighthouse gave me 100 for accessibility. So I\'m done?',
        options: [
          { text: 'A great start, but tools catch only some problems. I still need the keyboard, zoom and screen reader steps.' },
          { text: 'Yes, 100 means perfect.', why: 'Tools can\'t judge everything.' },
          { text: 'Lighthouse is wrong.', why: 'It\'s useful, just not complete.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the problem only a person would notice.',
        language: 'html',
        lines: ['<img src="cover-1.png">', '<img src="cover-2.png" alt="image">', '<p style="color: #3A4A6B">New every Friday.</p>'],
        bug: 1,
        explanation: 'The alt exists, so a tool may pass it, but "image" says nothing. Only a person can judge that.',
        fix: '<img src="cover-2.png" alt="Jollof Bounce cover">',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'At 200% zoom, what happens to this bio?',
        code: '.bio { height: 40px; overflow: hidden; }',
        language: 'css',
        options: [
          { text: 'Most of the text is cut off and can\'t be read' },
          { text: 'It grows to fit', why: 'A fixed height can\'t grow.' },
          { text: 'Nothing changes', why: 'Bigger text doesn\'t fit 40px.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the routine.',
        template: 'Automated check, [[1]] only, 200% [[2]], screen reader minute.',
        blanks: [['keyboard'], ['zoom']],
        distractors: ['mouse', 'colour', 'speed'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Name one automated accessibility checker built into Chrome\'s developer tools. (one word)',
        answers: ['lighthouse'],
        placeholder: 'A name',
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the other two: make .faint text #FFF6E5, and give .bio min-height 40px instead of the fixed height',
        starter: '<style>\n  .faint { color: #3A4A6B; }\n  .bio { height: 40px; overflow: hidden; }\n</style>\n<p class="faint">New every Friday.</p>\n<p class="bio">Kofi makes beats in Accra.</p>\n',
        solution: '<style>\n  .faint { color: #FFF6E5; }\n  .bio { min-height: 40px; }\n</style>\n<p class="faint">New every Friday.</p>\n<p class="bio">Kofi makes beats in Accra.</p>\n',
        hint: '.faint { color: #FFF6E5; } .bio { min-height: 40px; }',
        checks: [
          { message: 'Readable text', dom: { selector: '.faint', style: 'color', styleValue: '#FFF6E5' } },
          { message: 'The bio can grow', dom: { selector: '.bio', style: 'min-height', styleValue: '40px' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Run the fifteen-minute check on your own site. Which step found the most?',
    starters: ['The step that found most was...', 'I fixed...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Run all four steps on your own page and fix what they find. Run them again every time you change the layout.',
  },
  notes: 'Automated tools detect only a portion of WCAG failures (commonly cited at roughly a third); kept as "only some". Lighthouse is in Chrome DevTools; axe DevTools is a free browser extension. #3A4A6B on #14213D is about 1.8:1.',
};

export default lesson;
