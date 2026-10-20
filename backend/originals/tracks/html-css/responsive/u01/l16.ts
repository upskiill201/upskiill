import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 1 · Lesson 16 — box model myths. Myth or fact. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Boxes: myth or fact?',
  summary: 'Clinton has been "helping" by reading forum posts about CSS boxes. Some of what he found is true. A lot of it isn\'t. Sort them out before Kofi copies any of it.',
  minutes: 11,
  outcomes: ['Separate box model myths from facts', 'Explain why margin and padding aren\'t interchangeable', 'Remember which layers a background fills'],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Margin and padding do the same thing.', isFact: false, explain: 'Padding is inside the border and shows the background. Margin is outside and is always see-through. On a card with a border or background, the difference is obvious.' },
        { text: 'An element with no border has no box.', isFact: false, explain: 'Every element has a box. A border just makes its edge visible.' },
        { text: 'By default, padding is added on top of the width.', isFact: true, explain: 'That\'s content-box, the default. border-box keeps padding inside the width.' },
        { text: 'Using border-box is cheating.', isFact: false, explain: 'It\'s an official CSS value, used on a huge number of websites.' },
        { text: 'A margin can be negative.', isFact: true, explain: 'A negative margin pulls a box closer to its neighbour, or even over it. Padding can\'t be negative.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Margin vs padding, side by side',
      caption: 'Same numbers. The pink fills the padding but never the margin.',
      code: '<style>\n  body { background-color: #14213D; color: #14213D; font-family: Verdana, sans-serif; }\n  article { background-color: #F0438A; border: 2px solid #FF9600; }\n  article + article { padding: 24px; }\n  article + article + article { padding: 0; margin: 24px; }\n</style>\n<article>Neither</article>\n<article>padding: 24px</article>\n<article>margin: 24px</article>\n',
      challenge: 'Try margin-top: -10px; on the last card. It slides up towards the one above.',
    },
  ],
  apply: {
    scenario: 'Clinton\'s forum posts.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Margin and padding are the same', group: 0 },
          { text: 'Every element has a box', group: 1 },
          { text: 'border-box is cheating', group: 0 },
          { text: 'Margins can be negative', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which layer does a background colour fill?',
        options: [
          { text: 'Content and padding, up to the border' },
          { text: 'Margin too', why: 'Margin is always see-through.' },
          { text: 'Only behind the text', why: 'It fills the padding as well.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Pull the aside 8px closer to the card above it with a negative top margin',
        starter: '<style>\n  article { border: 2px solid #FF9600; margin-bottom: 24px; }\n\n</style>\n<article>One</article>\n<aside>Two</aside>\n',
        solution: '<style>\n  article { border: 2px solid #FF9600; margin-bottom: 24px; }\n  aside { margin-top: -8px; }\n</style>\n<article>One</article>\n<aside>Two</aside>\n',
        hint: 'aside { margin-top: -8px; }',
        checks: [
          { message: 'A negative top margin', dom: { selector: 'aside', style: 'margin-top', styleValue: '-8px' } },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'A forum said padding: -10px will shrink a box. True?',
        options: [
          { text: 'No, padding can\'t be negative. The browser ignores it. Margins can be negative, padding can\'t.' },
          { text: 'True, try it.', why: 'Negative padding isn\'t allowed.' },
          { text: 'Only on phones.', why: 'It\'s never allowed.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['"No border, no box"', 'Every element has a box'],
          ['"border-box is cheating"', 'It\'s an official, common choice'],
          ['"Margin = padding"', 'One is inside, one outside'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap Clinton\'s myth.',
        lines: ['Padding is inside the border.', 'Margin shows the background colour.', 'Outlines take up no space.'],
        bug: 1,
        explanation: 'Margin is always see-through. The background stops at the border.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'With default box-sizing, how wide is this box?',
        code: 'aside { width: 100px; padding: 10px; }',
        language: 'css',
        options: [
          { text: '120px' },
          { text: '100px', why: 'Only with border-box.' },
          { text: '110px', why: 'Padding counts on both sides.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the facts.',
        template: '[[1]] can be negative. [[2]] can\'t.',
        blanks: [['Margin', 'margin'], ['Padding', 'padding']],
        distractors: ['Border', 'Content', 'Width'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Is "every element has a box" a myth or a fact? (one word)',
        answers: ['fact'],
        placeholder: 'Myth or fact',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the safest way to check a CSS claim from a forum?',
        options: [
          { text: 'Try it in a small test page, and check MDN' },
          { text: 'Trust the post with the most likes', why: 'Popular isn\'t always right. Test it.' },
          { text: 'Copy it straight into your site', why: 'Test first, so nothing breaks.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which of these did you believe before this lesson?',
    starters: ['I thought...', 'Now I know...'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Search "MDN margin" and read the part about negative values.',
  },
  notes: 'Negative margins allowed; negative padding invalid (CSS Box Model). Background painting area defaults to border-box (under the border), never margin. aside used only as a second, different box.',
};

export default lesson;
