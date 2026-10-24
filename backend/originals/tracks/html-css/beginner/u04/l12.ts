import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 12 — styling text: font-size, font-weight, text-align, line-height. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Shaping the words',
  summary: 'Colour done. Now the words themselves: how big, how bold, where they sit, and how much air between the lines. Tap each line of Kofi\'s text rules.',
  minutes: 11,
  outcomes: ['Change text size, weight and alignment', 'Add space between lines with line-height', 'Make headings bigger with CSS, not extra h1s'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each line of Kofi\'s text rules',
      text: 'h1 {\n  font-size: 48px;\n  text-align: center;\n}\np {\n  line-height: 1.6;\n  font-weight: bold;\n}',
      hotspots: [
        { phrase: 'font-size: 48px;', note: 'How big the text is. px means pixels. In Chapter 5 you\'ll switch to rem, which respects the reader\'s own settings.' },
        { phrase: 'text-align: center;', note: 'Where the text sits across its line: left, center or right. Centre short headings; keep long paragraphs left so they\'re easy to read.' },
        { phrase: 'line-height: 1.6;', note: 'Space between lines, as a multiple of the text size. 1.5 to 1.6 makes paragraphs much easier to read, especially on phones.' },
        { phrase: 'font-weight: bold;', note: 'How heavy the letters are. Careful: a whole page of bold is like a whole page of shouting. Kofi will undo this one.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Big, centred, breathing',
      caption: 'A big centred heading, and paragraphs with room between the lines.',
      code: '<style>\n  h1 { font-size: 48px; text-align: center; }\n  p { line-height: 1.6; }\n</style>\n<h1>Mensah Beats</h1>\n<p>Kofi makes beats on his phone in Accra. Late nights, warm basslines and a lot of jollof. This page is where they live now.</p>\n',
      challenge: 'Change line-height to 1 and then to 2. Which is easiest to read?',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'font-size for size, font-weight for boldness, text-align for position, line-height for breathing room.',
    },
  ],
  apply: {
    scenario: 'Kofi shapes his text.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each property to what it changes.',
        pairs: [
          ['font-size', 'How big'],
          ['font-weight', 'How bold'],
          ['text-align', 'Left, centre or right'],
          ['line-height', 'Space between lines'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Make the h1 48px and centred',
        starter: '<style>\n  h1 {\n\n  }\n</style>\n<h1>Mensah Beats</h1>\n',
        solution: '<style>\n  h1 {\n    font-size: 48px;\n    text-align: center;\n  }\n</style>\n<h1>Mensah Beats</h1>\n',
        hint: 'font-size: 48px; and text-align: center;',
        checks: [
          { message: 'The heading is 48px', dom: { selector: 'h1', style: 'font-size', styleValue: '48px' } },
          { message: 'The heading is centred', dom: { selector: 'h1', style: 'text-align', styleValue: 'center' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Kofi\'s story paragraph is long. How should it be aligned?',
        options: [
          { text: 'Centred, like the heading', why: 'Long centred text is hard to read: every line starts somewhere new.' },
          { text: 'Left, so each line starts in the same place' },
          { text: 'Right', why: 'In left-to-right languages, left is easiest.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Give the paragraphs a line-height of 1.6',
        starter: '<style>\n\n</style>\n<p>Kofi makes beats on his phone in Accra.</p>\n',
        solution: '<style>\n  p { line-height: 1.6; }\n</style>\n<p>Kofi makes beats on his phone in Accra.</p>\n',
        hint: 'p { line-height: 1.6; }',
        checks: [
          { message: 'Paragraphs have line-height 1.6', dom: { selector: 'p', style: 'line-height', styleValue: '1.6' } },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Ama says the page is shouting. Tap the line.',
        language: 'css',
        lines: ['h1 { font-size: 48px; }', 'p { line-height: 1.6; }', 'body { font-weight: bold; }'],
        bug: 2,
        explanation: 'The whole page in bold. Keep bold for a few important words.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'I made "Book me" bigger by wrapping it in h1. Smart?',
        options: [
          { text: 'Smart.', why: 'That\'s HTML for looks again.' },
          { text: 'Use six h1s for extra size.', why: 'Size is CSS\'s job.' },
          { text: 'Keep it as a p or link, and make it bigger with font-size. h1 is the page\'s main heading.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What changes?',
        code: 'p { line-height: 2; }',
        language: 'css',
        options: [
          { text: 'The paragraph text gets twice as big', why: 'line-height is space between lines, not text size.' },
          { text: 'Lines in each paragraph move further apart' },
          { text: 'Paragraphs move to the right', why: 'That would be text-align.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        language: 'css',
        template: 'h1 { font-[[1]]: 48px; text-[[2]]: center; }',
        blanks: [['size'], ['align']],
        distractors: ['weight', 'height', 'colour'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which property adds space between lines of text? (two words joined by a dash)',
        answers: ['line-height'],
        placeholder: 'property-name',
      },
      {
        kind: 'sortGroups',
        prompt: 'Easy to read, or hard?',
        groups: ['Easy', 'Hard'],
        items: [
          { text: 'Long paragraphs, left-aligned', group: 0 },
          { text: 'Long paragraphs, centred', group: 1 },
          { text: 'line-height: 1.6', group: 0 },
          { text: 'Everything bold', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'On the sites you read most, are the paragraphs centred or left-aligned? Why do you think that is?',
    starters: ['On the sites I read...', 'I think it\'s because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Give your own page\'s paragraphs line-height: 1.6. Compare it with 1.2 on your phone.',
  },
  notes: 'Line-height of about 1.5 for body text is common guidance (e.g. WCAG 1.4.12 tests text spacing at 1.5). Left-aligned body text is easier to read for left-to-right languages.',
};

export default lesson;
