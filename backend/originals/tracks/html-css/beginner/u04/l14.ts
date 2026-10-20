import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 14 — fonts: font-family, font stacks, serif vs sans-serif, system fonts. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Choosing a font',
  summary: 'The default font makes Mensah Beats look like a school report. Kofi wants something rounder and more modern. Here\'s how font-family works, and why every font choice needs a backup.',
  minutes: 12,
  outcomes: ['Set a font with font-family', 'Write a font stack with fallbacks', 'Tell serif from sans-serif fonts'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps to a good font',
      steps: [
        { title: '1. Pick a family for the whole page', body: 'Set font-family on body and it flows into everything inside.', code: 'body { font-family: Verdana; }', language: 'css' },
        { title: '2. Add fallbacks', body: 'A visitor\'s phone may not have your font. List backups, separated by commas, and the browser uses the first one it has.', code: 'body { font-family: Verdana, Arial, sans-serif; }', language: 'css' },
        { title: '3. End with a generic family', body: 'serif (with little feet, like Georgia), sans-serif (clean, like Arial) or monospace (code-style). There\'s always one of each.', code: 'h1 { font-family: Georgia, serif; }', language: 'css' },
        { title: '4. Quote names with spaces', body: 'Two-word font names go in quotes.', code: 'body { font-family: "Trebuchet MS", sans-serif; }', language: 'css' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Two fonts, one page',
      caption: 'A serif heading and a sans-serif body. Each has a backup.',
      code: '<style>\n  body { font-family: Verdana, Arial, sans-serif; }\n  h1 { font-family: Georgia, serif; }\n</style>\n<h1>Mensah Beats</h1>\n<p>Beats from Accra, made late at night.</p>\n',
      challenge: 'Change the heading to font-family: "Trebuchet MS", sans-serif;',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'font-family: YourFont, Backup, generic. Always end with serif, sans-serif or monospace.',
    },
  ],
  apply: {
    scenario: 'Mensah Beats gets a new font.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the font stack in order, from first choice to last resort.',
        language: 'css',
        lines: ['body { font-family:', '  Verdana,', '  Arial,', '  sans-serif; }'],
      },
      {
        kind: 'writeCode',
        prompt: 'Give the whole page the font stack Verdana, Arial, sans-serif',
        starter: '<style>\n\n</style>\n<h1>Mensah Beats</h1>\n<p>Beats from Accra.</p>\n',
        solution: '<style>\n  body { font-family: Verdana, Arial, sans-serif; }\n</style>\n<h1>Mensah Beats</h1>\n<p>Beats from Accra.</p>\n',
        hint: 'body { font-family: Verdana, Arial, sans-serif; }',
        checks: [
          { message: 'The page has the font stack', dom: { selector: 'body', style: 'font-family', styleValue: 'Verdana, Arial, sans-serif' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Serif or sans-serif?',
        groups: ['Serif (little feet)', 'Sans-serif (clean)'],
        items: [
          { text: 'Georgia', group: 0 },
          { text: 'Arial', group: 1 },
          { text: 'Times New Roman', group: 0 },
          { text: 'Verdana', group: 1 },
          { text: 'Trebuchet MS', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why add fallback fonts?',
        options: [
          { text: 'The visitor\'s device might not have your first choice' },
          { text: 'To make the page load slower', why: 'Fallbacks cost nothing. They\'re a safety net.' },
          { text: 'Browsers need at least three fonts', why: 'They don\'t; it\'s a safety net.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that will break.',
        language: 'css',
        lines: ['body { font-family: Verdana, Arial, sans-serif; }', 'h1 { font-family: Trebuchet MS, sans-serif; }', 'code { font-family: monospace; }'],
        bug: 1,
        explanation: 'Font names with spaces need quotes: "Trebuchet MS".',
        fix: 'h1 { font-family: "Trebuchet MS", sans-serif; }',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each generic family to its look.',
        pairs: [
          ['serif', 'Little feet on the letters'],
          ['sans-serif', 'Clean, no feet'],
          ['monospace', 'Every letter the same width'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'You used four different fonts. Why?',
        options: [
          { text: 'Fair. I\'ll keep two: one for headings, one for everything else.' },
          { text: 'More fonts, more style.', why: 'Two is usually plenty.' },
          { text: 'I\'ll use eight.', why: 'Efua would leave the chat.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the heading\'s font stack.',
        language: 'css',
        template: 'h1 { font-family: Georgia, [[1]]; }',
        blanks: [['serif']],
        distractors: ['sans-serif', 'monospace', 'bold'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which generic family should end a stack for clean fonts like Arial? (one word with a dash)',
        answers: ['sans-serif'],
        placeholder: 'family-name',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The phone doesn\'t have Verdana. What font shows?',
        code: 'body { font-family: Verdana, Arial, sans-serif; }',
        language: 'css',
        options: [
          { text: 'No font, the text disappears', why: 'The browser moves to the next font.' },
          { text: 'Arial, or any sans-serif if Arial is missing too' },
          { text: 'Times New Roman', why: 'It follows the stack: Arial, then a sans-serif.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What feeling should your page\'s font give: friendly, serious, playful, calm? Which family fits?',
    starters: ['I want it to feel...', 'So I\'d choose...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Give your own page two fonts: one for headings, one for the body, each with a fallback and a generic family.',
  },
  notes: 'Font stacks and generic families per MDN font-family. Web fonts (e.g. Google Fonts) are mentioned in Chapter 5; the live pad keeps to fonts installed on most devices so every learner sees the same thing.',
};

export default lesson;
