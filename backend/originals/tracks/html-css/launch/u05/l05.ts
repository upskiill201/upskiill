import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 5 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4 (launch checklist, version history, pre-launch check, the v2.0 home page). */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the list is clean',
  summary: 'Four o\'clock. Every item on Miracle\'s list has a tick next to it. Kofi takes a photo of the list for his uni room wall. Quick checkpoint.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Run a pre-launch check', 'Fix what an HTML checker finds', 'Read the finished home page'],
  learn: [
    {
      kind: 'story',
      title: 'Every box ticked',
      beats: [
        { speaker: 'narrator', text: 'Twelve problems found. Twelve fixed. Every page checked again.' },
        { speaker: 'miracle', text: 'Now it\'s ready. Not perfect. Ready.' },
        { speaker: 'tey', text: 'Check what you know before the upload.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: ready to launch.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Fix the two problems a checker would find: close the paragraph, and add alt="Labadi Waves cover" to the image',
        starter: '<main id="main">\n  <p>New this week.\n  <img src="covers/labadi-waves.webp" width="600" height="600">\n</main>\n',
        solution: '<main id="main">\n  <p>New this week.</p>\n  <img src="covers/labadi-waves.webp" alt="Labadi Waves cover" width="600" height="600">\n</main>\n',
        hint: 'Add </p> and alt="Labadi Waves cover".',
        checks: [
          { message: 'The image has alt text', dom: { selector: 'img', attr: 'alt', attrValue: 'Labadi Waves cover' } },
          { message: 'The paragraph is closed', codeIncludes: 'week.</p>' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put launch day in order.',
        lines: ['Run the checklist', 'Write every problem down', 'Fix them', 'Check again', 'Upload early', 'Announce at midnight'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Must fix before launch, or later?',
        groups: ['Before launch', 'Later'],
        items: [
          { text: 'A broken Book Kofi link', group: 0 },
          { text: 'A new colour for the footer', group: 1 },
          { text: 'An image with no alt text', group: 0 },
          { text: 'A fifth beat in the gallery', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'A keyboard user presses Tab once on this page. What do they reach first?',
        code: '<a class="skip-link" href="#main">Skip to main content</a>\n<nav>\n  <a href="index.html">Home</a>\n</nav>',
        language: 'html',
        options: [
          { text: 'The Home link', why: 'The skip link comes first.' },
          { text: 'The skip link' },
          { text: 'The footer', why: 'Tab goes in page order.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line a checker would flag.',
        language: 'html',
        lines: ['<h1 id="top">Mensah Beats</h1>', '<section id="top" class="gallery">', '<footer>&copy; 2026 Mensah Beats</footer>'],
        bug: 1,
        explanation: 'Two elements can\'t share an id. Give the section its own, like id="gallery".',
        fix: '<section id="gallery" class="gallery">',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each problem to the check that finds it.',
        pairs: [
          ['An unclosed tag', 'The HTML checker'],
          ['A dead link', 'Clicking every link'],
          ['Sideways scrolling', 'Testing on a small phone'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'The site isn\'t perfect. Why not wait another month?',
        options: [
          { text: 'You\'re right, never launch.', why: 'Ready beats perfect.' },
          { text: 'Launch with the broken form.', why: 'Important things must work.' },
          { text: 'Everything important works and is checked. Small improvements can come in v2.1.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Why write problems down instead of fixing each one straight away?',
        options: [
          { text: 'Writing makes them fix themselves', why: 'You still fix them.' },
          { text: 'You finish the whole check, see everything at once, and don\'t lose your place' },
          { text: 'So you can ignore them', why: 'You fix them after.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the home page.',
        language: 'html',
        template: '<a class="skip-link" href="#[[1]]">Skip to main content</a>\n<[[2]] id="main">...</main>',
        blanks: [['main'], ['main']],
        distractors: ['top', 'div', 'header'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'An HTML checker is also called a what? (one word)',
        answers: ['validator', 'Validator'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'How many problems did your own check find? Which one surprised you?',
    starters: ['I found...', 'I was surprised by...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Finish your own pre-launch check: all six steps, every problem written down, every fix re-checked.',
  },
  notes: 'Checkpoint 1. Reviews l01–l04.',
};

export default lesson;
