import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 1 · Lesson 14 — finding a box's edges: the outline trick and the browser's inspector. Steps. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Find the invisible box',
  summary: 'There\'s a strange gap under the last card, and Kofi can\'t tell which box it belongs to. Miracle shares her screen: "Never guess. Make the boxes show themselves." Four steps.',
  minutes: 12,
  outcomes: ['Show every box\'s edge with a temporary outline', 'Open the browser\'s inspector on a computer', 'Read the box diagram to find padding and margin'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps to find any gap',
      steps: [
        { title: '1. Outline everything', body: 'Add one temporary line at the bottom of your CSS. outline draws an edge like a border, but takes up no space, so nothing moves.', code: '* { outline: 1px solid red; }', language: 'css' },
        { title: '2. Find the gap\'s owner', body: 'Look at where the red lines are. Is the gap inside a box (padding) or between boxes (margin)? Now you know which property to change.' },
        { title: '3. Or inspect it', body: 'On a computer, right-click the element and choose Inspect (most browsers). A panel shows its CSS, and a box diagram: margin, border, padding and content, with the numbers.' },
        { title: '4. Fix it, then delete the outline', body: 'Change the margin or padding you found. Then remove the outline line before you publish.', code: 'footer { margin-top: 0; }', language: 'css' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Make the boxes show themselves',
      caption: 'The outline shows every box. Can you spot which one owns the big gap?',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  article { border: 2px solid #FF9600; padding: 16px; margin-bottom: 16px; }\n  footer { margin-top: 64px; }\n  * { outline: 1px solid red; }\n</style>\n<article><h2>Night Bus to Kumasi</h2></article>\n<footer><small>Mensah Beats v1.0</small></footer>\n',
      challenge: 'Found it? Change footer\'s margin-top to 16px, then delete the outline line.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Don\'t guess at gaps. Outline everything, or inspect the element, then change the right property.',
    },
  ],
  apply: {
    scenario: 'The mystery gap under the last card.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Outline every box', 'Find which box owns the gap', 'Change its margin or padding', 'Delete the outline'],
      },
      {
        kind: 'writeCode',
        prompt: 'Show every box: add a temporary 1px solid red outline to every element',
        starter: '<style>\n  article { border: 2px solid #FF9600; padding: 16px; }\n\n</style>\n<article><h2>Night Bus to Kumasi</h2></article>\n',
        solution: '<style>\n  article { border: 2px solid #FF9600; padding: 16px; }\n  * { outline: 1px solid red; }\n</style>\n<article><h2>Night Bus to Kumasi</h2></article>\n',
        hint: '* { outline: 1px solid red; }',
        checks: [
          { message: 'The heading is outlined', dom: { selector: 'h2', style: 'outline', styleValue: '1px solid red' } },
          { message: 'So is the card', dom: { selector: 'article', style: 'outline', styleValue: '1px solid red' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why use outline, not border, to find boxes?',
        options: [
          { text: 'An outline takes up no space, so nothing moves while you look' },
          { text: 'Borders don\'t show on phones', why: 'They do. But they add width and move things.' },
          { text: 'Outlines are permanent', why: 'You delete it afterwards.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'The red lines show a gap. Which property owns it?',
        groups: ['Padding', 'Margin'],
        items: [
          { text: 'Gap inside one red box', group: 0 },
          { text: 'Gap between two red boxes', group: 1 },
          { text: 'Space between the text and its card\'s edge', group: 0 },
          { text: 'Space between the last card and the footer', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line Kofi forgot to delete before publishing.',
        language: 'css',
        lines: ['article { padding: 16px; }', 'footer { margin-top: 16px; }', '* { outline: 1px solid red; }'],
        bug: 2,
        explanation: 'The debugging outline. Every visitor would see red lines everywhere.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'I\'ll just keep changing numbers until the gap goes away.',
        options: [
          { text: 'Faster to make the boxes show themselves, find the owner, and change the one right property.' },
          { text: 'Yes, guess until it works.', why: 'You might change the wrong thing and break something else.' },
          { text: 'Delete the footer.', why: 'The footer is fine. Its margin is too big.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each tool to what it does.',
        pairs: [
          ['* { outline: ... }', 'Shows every box\'s edge'],
          ['Inspect', 'Opens the browser\'s CSS panel'],
          ['The box diagram', 'Shows margin, border, padding numbers'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Does the card get any wider?',
        code: 'article { width: 300px; outline: 4px solid red; }',
        language: 'css',
        options: [
          { text: 'No, an outline takes no space' },
          { text: 'Yes, 8px wider', why: 'That would happen with a border, not an outline.' },
          { text: 'Yes, 4px wider', why: 'Outlines don\'t change the size.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the debugging line.',
        language: 'css',
        template: '[[1]] { [[2]]: 1px solid red; }',
        blanks: [['*'], ['outline']],
        distractors: ['border', 'body', 'margin'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What do you right-click and choose to open the browser\'s CSS panel? (one word)',
        answers: ['inspect', 'inspect element'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Next time a gap appears on your page, what will you do first?',
    starters: ['First I\'ll...', 'Then...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'On a computer, open your page, right-click a heading and choose Inspect. Find the box diagram and read its margin and padding. (Menus vary by browser; check locally.)',
  },
  notes: 'outline does not take up space or affect layout (MDN). "Inspect" is the context-menu label in Chrome, Edge and Firefox; Safari needs developer features enabled first, hence "most browsers".',
};

export default lesson;
