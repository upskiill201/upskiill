import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 19 — reading a finished stylesheet, rule by rule. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Read a finished stylesheet',
  summary: 'Before he builds v0.4, Kofi reads Efua\'s stylesheet for her photography page. It\'s seven lines. Every line does one clear job. Tap each one.',
  minutes: 11,
  outcomes: ['Read a whole stylesheet and say what each rule does', 'Spot good habits in someone else\'s CSS', 'Plan your own stylesheet the same way'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each rule of Efua\'s stylesheet',
      text: 'body {\n  background-color: seashell;\n  color: #222222;\n  font-family: Verdana, Arial, sans-serif;\n}\nh1, h2, a { color: maroon; }\nh1 { font-family: Georgia, serif; font-size: 44px; }\np { line-height: 1.6; }\nfigcaption { font-size: 14px; }',
      hotspots: [
        { phrase: 'background-color: seashell;', note: 'A warm off-white page. Softer than pure white, still very readable.' },
        { phrase: 'color: #222222;', note: 'A colour code: very dark grey, softer than pure black. You\'ll learn codes like this in Chapter 5.' },
        { phrase: 'font-family: Verdana, Arial, sans-serif;', note: 'One body font with two fallbacks, set once on body for the whole page.' },
        { phrase: 'h1, h2, a { color: maroon; }', note: 'One accent, grouped: headings and links share it, so everything tappable or important matches.' },
        { phrase: 'h1 { font-family: Georgia, serif; font-size: 44px; }', note: 'A second font, only for the main heading. Two fonts in total.' },
        { phrase: 'figcaption { font-size: 14px; }', note: 'Smaller captions, so the photos lead and the captions support.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Efua\'s stylesheet, live',
      caption: 'Seven lines, one clear job each. Try changing only the accent colour.',
      code: '<style>\n  body { background-color: seashell; color: #222222; font-family: Verdana, Arial, sans-serif; }\n  h1, h2, a { color: maroon; }\n  h1 { font-family: Georgia, serif; font-size: 44px; }\n  p { line-height: 1.6; }\n</style>\n<h1>Efua Takes Photos</h1>\n<p>Accra, mostly at golden hour.</p>\n<h2>Latest</h2>\n<p><a href="#">Jamestown at sunrise</a></p>\n',
      challenge: 'Change maroon to darkgreen. One edit, and the whole page has a new accent.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A good stylesheet reads like a plan: the page first, then the accent, then the details.',
    },
  ],
  apply: {
    scenario: 'Kofi reads Efua\'s stylesheet.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each rule to its job.',
        pairs: [
          ['body { ... }', 'The whole page\'s look'],
          ['h1, h2, a { color: maroon; }', 'One accent for important things'],
          ['p { line-height: 1.6; }', 'Easy-to-read paragraphs'],
          ['figcaption { font-size: 14px; }', 'Smaller captions'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How many fonts does Efua use?',
        options: [
          { text: 'Two: Verdana for the body and Georgia for the main heading' },
          { text: 'Five', why: 'Fallbacks are backups, not extra fonts.' },
          { text: 'One', why: 'Georgia for the h1, Verdana for the rest.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Give Efua\'s page a new accent: make h1, h2 and links darkgreen with one rule',
        starter: '<style>\n  body { background-color: seashell; color: #222222; }\n\n</style>\n<h1>Efua Takes Photos</h1>\n<h2>Latest</h2>\n<p><a href="#">Jamestown at sunrise</a></p>\n',
        solution: '<style>\n  body { background-color: seashell; color: #222222; }\n  h1, h2, a { color: darkgreen; }\n</style>\n<h1>Efua Takes Photos</h1>\n<h2>Latest</h2>\n<p><a href="#">Jamestown at sunrise</a></p>\n',
        hint: 'h1, h2, a { color: darkgreen; }',
        checks: [
          { message: 'A darkgreen h1', dom: { selector: 'h1', style: 'color', styleValue: 'darkgreen' } },
          { message: 'A darkgreen h2', dom: { selector: 'h2', style: 'color', styleValue: 'darkgreen' } },
          { message: 'Darkgreen links', dom: { selector: 'a', style: 'color', styleValue: 'darkgreen' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'A good habit in Efua\'s CSS?',
        groups: ['Good habit', 'Not in her CSS'],
        items: [
          { text: 'One accent, grouped', group: 0 },
          { text: 'Style attributes on every tag', group: 1 },
          { text: 'Fallback fonts', group: 0 },
          { text: 'A different colour per paragraph', group: 1 },
          { text: 'Room between lines', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What colour is the caption text?',
        code: 'body { color: #222222; }\nfigcaption { font-size: 14px; }',
        language: 'css',
        options: [
          { text: 'Maroon', why: 'No colour rule for figcaption, so it inherits from body.' },
          { text: 'Dark grey, inherited from body' },
          { text: 'Blue', why: 'Only links get the browser\'s blue.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Kofi copies Efua\'s style but adds a line Efua would delete. Tap it.',
        language: 'css',
        lines: ['h1, h2, a { color: maroon; }', 'p { line-height: 1.6; }', 'p { font-family: Papyrus, Impact, "Comic Sans MS", cursive; }'],
        bug: 2,
        explanation: 'A third, fourth and fifth font, for paragraphs. Two fonts is plenty.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'Why do you think my stylesheet is so short?',
        options: [
          { text: 'Each rule does one job, and grouping means you never repeat yourself.' },
          { text: 'You forgot most of it.', why: 'Short is on purpose.' },
          { text: 'Short CSS is required.', why: 'It\'s a choice: clear and easy to change.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Efua\'s caption rule.',
        language: 'css',
        template: '[[1]] { font-size: 14px; }',
        blanks: [['figcaption']],
        distractors: ['caption', 'figure', 'img'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which colour is Efua\'s accent? (one word)',
        answers: ['maroon'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Efua\'s stylesheet in the order she planned it.',
        language: 'css',
        lines: ['body { ... }', 'h1, h2, a { color: maroon; }', 'h1 { font-family: Georgia, serif; }', 'p { line-height: 1.6; }'],
      },
    ],
  },
  reflect: {
    prompt: 'If someone read your stylesheet, would each rule have one clear job? Which rule would you tidy?',
    starters: ['I\'d tidy...', 'Because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'View source on a small personal website you like. Find its stylesheet and see how many rules it has.',
  },
  notes: 'Efua (CastId efua) is course-only cast. #222222 previews colour codes (Chapter 5).',
};

export default lesson;
