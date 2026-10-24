import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 12 — the finished style block: palette, fonts, type scale, line-height. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'The whole look in one place',
  summary: 'Colours, fonts and sizes are all decided. Tey puts them together into one tidy style block, the full Mensah Beats look in eleven lines. Tap each part to see the job it does.',
  minutes: 11,
  outcomes: ['Read a complete style block', 'Add comfortable line spacing with line-height', 'Keep all the look decisions together'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each line of the Mensah Beats look',
      text: 'body {\n  background-color: #14213D;\n  color: #FFF6E5;\n  font-family: Verdana, sans-serif;\n  font-size: 1rem;\n  line-height: 1.6;\n}\nh1 { color: #FF9600; font-family: Georgia, serif; font-size: 2.5rem; }\nh2 { font-size: 1.5rem; }\na { color: #FF9600; }\nsmall { font-size: 0.875rem; }',
      hotspots: [
        { phrase: 'background-color: #14213D;', note: 'The night blue from the covers, behind everything.' },
        { phrase: 'color: #FFF6E5;', note: 'Cream for all the reading. About 15 to 1 on night blue: easy everywhere.' },
        { phrase: 'font-family: Verdana, sans-serif;', note: 'One plain font for reading, with a fallback.' },
        { phrase: 'line-height: 1.6;', note: 'Space between lines: 1.6 times the text size. Lines that aren\'t squashed together are easier to follow, especially on a phone.' },
        { phrase: 'font-family: Georgia, serif;', note: 'The one special font, only for the name.' },
        { phrase: 'a { color: #FF9600; }', note: 'Orange marks things you can tap. Links keep their underline, so colour isn\'t the only signal.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The full look',
      caption: 'Everything from this chapter so far, in one style block.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; font-size: 1rem; line-height: 1.6; }\n  h1 { color: #FF9600; font-family: Georgia, serif; font-size: 2.5rem; }\n  h2 { font-size: 1.5rem; }\n  a { color: #FF9600; }\n</style>\n<h1>Mensah Beats</h1>\n<h2>My beats</h2>\n<p>Beats from Accra, made late at night. New every Friday.</p>\n<p><a href="#book">Book me</a></p>\n',
      challenge: 'Change line-height to 1. Then back to 1.6. Which is easier to read?',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Put the look decisions on body first. Then only add rules for what\'s different.',
    },
  ],
  apply: {
    scenario: 'Reading the whole look.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each line to its job.',
        pairs: [
          ['background-color: #14213D', 'The night blue behind everything'],
          ['line-height: 1.6', 'Space between lines'],
          ['font-family: Georgia, serif', 'The special font for the name'],
          ['a { color: #FF9600; }', 'Marks what you can tap'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does line-height: 1.6 do?',
        options: [
          { text: 'Makes the text 1.6 times bigger', why: 'That would be font-size.' },
          { text: 'Sets how many lines fit', why: 'It\'s the spacing between lines.' },
          { text: 'Puts space between lines, 1.6 times the text size' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Give the body a line-height of 1.6',
        starter: '<style>\n  body { font-size: 1rem; }\n</style>\n<p>Beats from Accra, made late at night. New every Friday.</p>\n',
        solution: '<style>\n  body { font-size: 1rem; line-height: 1.6; }\n</style>\n<p>Beats from Accra, made late at night. New every Friday.</p>\n',
        hint: 'Add line-height: 1.6; inside the body rule.',
        checks: [
          { message: 'Comfortable line spacing', dom: { selector: 'body', style: 'line-height', styleValue: '1.6' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Set once on body, or its own rule?',
        groups: ['On body', 'Its own rule'],
        items: [
          { text: 'The reading font', group: 0 },
          { text: 'The special font for h1', group: 1 },
          { text: 'Cream text colour', group: 0 },
          { text: 'Orange for links', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Why is font-family on body and not on p, li and every other tag?',
        options: [
          { text: 'It\'s a mistake.', why: 'It\'s on purpose: it flows into everything inside.' },
          { text: 'Everything inside body takes it from there. One line instead of ten.' },
          { text: 'Body is the only tag CSS can style.', why: 'You can style any element.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that breaks the plan.',
        language: 'css',
        lines: ['body { color: #FFF6E5; font-family: Verdana, sans-serif; }', 'p { font-family: "Comic Sans MS", cursive; }', 'h1 { font-family: Georgia, serif; }'],
        bug: 1,
        explanation: 'A third font, just for paragraphs. Delete it and let p take Verdana from body.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What colour is the h2 text?',
        code: 'body { color: #FFF6E5; }\nh1 { color: #FF9600; }',
        language: 'css',
        options: [
          { text: 'Cream, from body' },
          { text: 'Orange', why: 'Only h1 is orange.' },
          { text: 'Black', why: 'It inherits cream from body.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the body rule.',
        language: 'css',
        template: 'body { font-size: 1rem; [[1]]: 1.6; }',
        blanks: [['line-height']],
        distractors: ['font-size', 'line-space', 'height'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which element should hold the look decisions that apply to the whole page? (tag name)',
        answers: ['body', '<body>'],
        placeholder: 'A tag',
      },
      {
        kind: 'writeCode',
        prompt: 'Make links Kofi\'s orange #FF9600',
        starter: '<style>\n  body { background-color: #14213D; color: #FFF6E5; }\n</style>\n<p><a href="#book">Book me</a></p>\n',
        solution: '<style>\n  body { background-color: #14213D; color: #FFF6E5; }\n  a { color: #FF9600; }\n</style>\n<p><a href="#book">Book me</a></p>\n',
        hint: 'a { color: #FF9600; }',
        checks: [
          { message: 'Orange links', dom: { selector: 'a', style: 'color', styleValue: '#FF9600' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Could you describe your page\'s whole look in one style block? What would go on body?',
    starters: ['On body I\'d put...', 'Only my h1 needs...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Tidy your own style block: page-wide decisions on body, then one short rule for each thing that\'s different.',
  },
  notes: 'line-height unitless values multiply the element\'s font size (MDN). 1.5 or more is the WCAG 1.4.12 text-spacing figure; kept as "easier to follow".',
};

export default lesson;
