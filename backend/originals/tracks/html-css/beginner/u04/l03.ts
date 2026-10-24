import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 3 — writing a rule: selector, braces, property, value, semicolon. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'How a rule works',
  summary: 'Every CSS rule has the same five parts. Get them right and the browser does exactly what you say. Get one wrong and it quietly ignores you. Kofi builds his first rules one part at a time.',
  minutes: 12,
  outcomes: ['Write a CSS rule from its five parts', 'Put more than one property in a rule', 'Spot a missing brace or semicolon'],
  learn: [
    {
      kind: 'steps',
      title: 'Five parts of every rule',
      steps: [
        { title: '1. The selector', body: 'Which elements to style. h1 means every h1 on the page.', code: 'h1', language: 'css' },
        { title: '2. Curly braces', body: 'Everything for that selector goes between { and }.', code: 'h1 { }', language: 'css' },
        { title: '3. A property', body: 'What to change, like color (American spelling, always).', code: 'h1 { color }', language: 'css' },
        { title: '4. A colon and a value', body: 'What to change it to.', code: 'h1 { color: orange }', language: 'css' },
        { title: '5. A semicolon', body: 'Ends the line, so you can add another property after it.', code: 'h1 {\n  color: orange;\n  background-color: black;\n}', language: 'css' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Two properties, one rule',
      caption: 'One rule, two changes: the text colour and the colour behind it.',
      code: '<style>\n  h1 {\n    color: orange;\n    background-color: black;\n  }\n</style>\n<h1>Mensah Beats</h1>\n',
      challenge: 'Add a third line inside the braces: text-align: center;',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'selector { property: value; }. One property per line makes mistakes easy to spot.',
    },
  ],
  apply: {
    scenario: 'Kofi writes his first rules.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the rule in order.',
        language: 'css',
        lines: ['h1 {', '  color: orange;', '  background-color: black;', '}'],
      },
      {
        kind: 'writeCode',
        prompt: 'Give the h1 orange text on a black background',
        starter: '<style>\n  h1 {\n\n  }\n</style>\n<h1>Mensah Beats</h1>\n',
        solution: '<style>\n  h1 {\n    color: orange;\n    background-color: black;\n  }\n</style>\n<h1>Mensah Beats</h1>\n',
        hint: 'Two lines inside the braces: color: orange; and background-color: black;',
        checks: [
          { message: 'Orange text', dom: { selector: 'h1', style: 'color', styleValue: 'orange' } },
          { message: 'A black background', dom: { selector: 'h1', style: 'background-color', styleValue: 'black' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to its job.',
        pairs: [
          ['h1', 'Picks the elements'],
          ['color', 'What to change'],
          ['orange', 'What to change it to'],
          [';', 'Ends the line'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that will stop the rule working.',
        language: 'css',
        lines: ['h1 {', '  colour: orange;', '  background-color: black;', '}'],
        bug: 1,
        explanation: 'CSS only understands the American spelling: color.',
        fix: '  color: orange;',
      },
      {
        kind: 'mcq',
        prompt: 'What goes between the curly braces?',
        options: [
          { text: 'The properties and values for that selector' },
          { text: 'The HTML for the heading', why: 'HTML stays outside the style tag.' },
          { text: 'Nothing, braces are decoration', why: 'They hold the rule\'s properties.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a rule that makes paragraphs grey.',
        language: 'css',
        tiles: ['p', '{', 'color:', 'grey;', '}'],
        distractors: ['colour:', '(', ')'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Kofi forgets one semicolon. What happens?',
        code: 'h1 {\n  color: orange\n  background-color: black;\n}',
        language: 'css',
        options: [
          { text: 'Both lines still work', why: 'Without the ;, the browser reads the two lines as one broken value.' },
          { text: 'The browser can\'t read either line, so neither applies' },
          { text: 'The whole page crashes', why: 'CSS never crashes the page. It quietly skips what it can\'t read.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        language: 'css',
        template: 'h2 [[1]] color[[2]] teal; }',
        blanks: [['{'], [':']],
        distractors: ['(', '=', '['],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which character ends each property line in CSS? (type the character name, e.g. comma)',
        answers: ['semicolon', 'semi-colon', 'semi colon'],
        placeholder: 'A character name',
      },
      {
        kind: 'sortGroups',
        prompt: 'Valid CSS or broken?',
        groups: ['Valid', 'Broken'],
        items: [
          { text: 'h1 { color: orange; }', group: 0 },
          { text: 'h1 ( color: orange; )', group: 1 },
          { text: 'p { color: grey; }', group: 0 },
          { text: 'h1 { color = orange; }', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which of the five parts do you think you\'ll forget most often? How will you check for it?',
    starters: ['I\'ll probably forget...', 'I\'ll check by...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'In the playground, write one rule with three properties: color, background-color and text-align.',
  },
  notes: 'CSS property names use US spelling (color). Invalid declarations are dropped by the parser (CSS error handling); a missing semicolon merges two declarations into one invalid value.',
};

export default lesson;
