import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 3 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4 (display: flex, nav lists, gap, direct children, justify-content). */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: one neat row',
  summary: 'Name on the left. Beats, Gigs, Book me on the right. One neat row across the top of the laptop screen. Efua: "Now it looks like a music site." Quick checkpoint.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Put children in a row with display: flex', 'Lay a list of links down with gap', 'Place items with justify-content'],
  learn: [
    {
      kind: 'story',
      title: 'It looks like a music site',
      beats: [
        { speaker: 'narrator', text: 'One row. Name far left, three links far right, 16px between each link.' },
        { speaker: 'efua', text: 'Now it looks like a music site.' },
        { speaker: 'tey', text: 'Let\'s make sure every piece is solid before we centre things.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: the header row.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Build the header: display flex with space-between on header, and nav ul as a flex row with a 16px gap',
        starter: '<style>\n\n</style>\n<header>\n  <p>Mensah Beats</p>\n  <nav><ul><li><a href="#beats">Beats</a></li><li><a href="#gigs">Gigs</a></li></ul></nav>\n</header>\n',
        solution: '<style>\n  header { display: flex; justify-content: space-between; }\n  nav ul { display: flex; gap: 16px; }\n</style>\n<header>\n  <p>Mensah Beats</p>\n  <nav><ul><li><a href="#beats">Beats</a></li><li><a href="#gigs">Gigs</a></li></ul></nav>\n</header>\n',
        hint: 'Two rules: header and nav ul.',
        checks: [
          { message: 'Header in a row', dom: { selector: 'header', style: 'display', styleValue: 'flex' } },
          { message: 'Opposite ends', dom: { selector: 'header', style: 'justify-content', styleValue: 'space-between' } },
          { message: 'Links in a row', dom: { selector: 'nav ul', style: 'display', styleValue: 'flex' } },
          { message: 'With gaps', dom: { selector: 'nav ul', style: 'gap', styleValue: '16px' } },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How many flex items does the header have?',
        code: 'header { display: flex; }\n\n<header>\n  <p>Mensah Beats</p>\n  <nav><ul><li>A</li><li>B</li><li>C</li></ul></nav>\n</header>',
        language: 'html',
        options: [
          { text: 'Five', why: 'The li elements are grandchildren.' },
          { text: 'One', why: 'Both direct children are items.' },
          { text: 'Two: the p and the nav' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each property to its job.',
        pairs: [
          ['display: flex', 'Children in a row'],
          ['gap', 'Space between items'],
          ['justify-content', 'Where items sit along the row'],
          ['list-style: none', 'No bullets'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that won\'t work.',
        language: 'css',
        lines: ['header { display: flex; }', 'header { justify-content: space-around-ends; }', 'nav ul { gap: 16px; }'],
        bug: 1,
        explanation: 'Not a real value. For opposite ends, it\'s space-between.',
        fix: 'header { justify-content: space-between; }',
      },
      {
        kind: 'sortGroups',
        prompt: 'Goes on the container, or on an item?',
        groups: ['Container', 'Item'],
        items: [
          { text: 'display: flex', group: 0 },
          { text: 'justify-content', group: 0 },
          { text: 'The text "Mensah Beats"', group: 1 },
          { text: 'gap', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'The links have bullets and a gap on the left. Did Flexbox break?',
        options: [
          { text: 'Yes, remove Flexbox.', why: 'Flexbox is fine. The list has defaults.' },
          { text: 'No, that\'s the ul\'s default bullets and padding. list-style: none and padding: 0 remove them.' },
          { text: 'Use a table.', why: 'Remove the list defaults instead.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Why keep the links in a ul inside a nav?',
        options: [
          { text: 'Flexbox needs a ul', why: 'Any parent works. The ul is for meaning.' },
          { text: 'It makes the links orange', why: 'That\'s CSS.' },
          { text: 'It tells screen readers it\'s a set of navigation links, and how many' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Lie the list down.',
        language: 'css',
        template: 'nav ul { display: [[1]]; [[2]]: 16px; list-style: none; padding: 0; }',
        blanks: [['flex'], ['gap']],
        distractors: ['row', 'margin', 'block'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which property places items along the row? (hyphenated)',
        answers: ['justify-content'],
        placeholder: 'A property',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the header steps in order.',
        lines: ['Put the name and nav in a header', 'Give the header display: flex', 'Add justify-content: space-between', 'Make the nav\'s ul a flex row with a gap'],
      },
    ],
  },
  reflect: {
    prompt: 'Does your own header look like a real site yet? What\'s missing?',
    starters: ['It has...', 'It still needs...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Finish your own header: name on one side, a row of links on the other.',
  },
  notes: 'Checkpoint 1. Reviews l01–l04.',
};

export default lesson;
