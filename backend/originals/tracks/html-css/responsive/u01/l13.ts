import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 1 · Lesson 13 — block vs inline boxes; display: inline-block for a button-style link. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Why won\'t my link get bigger?',
  summary: 'Kofi wants the "Play" link in each card to look like a button. He adds padding, and it spills over the text above and below instead of pushing it away. Tey explains the two kinds of box.',
  minutes: 11,
  outcomes: ['Tell block and inline boxes apart', 'Turn a link into a button-style box with inline-block', 'Predict how width and margin behave on each kind'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Boxes come in two main kinds. Block boxes, like h1, p and article, start on a new line and stretch across the space. Inline boxes, like a, strong and em, sit inside a line of text, as wide as their words.',
          replies: ['Which one is my link?'],
        },
        {
          tey: 'Inline. And inline boxes are a bit odd: padding on the sides pushes things away, but padding on the top and bottom just overlaps the lines around it. Width and height are ignored completely.',
          replies: ['So how do I make a button?'],
        },
        {
          tey: 'Change how it\'s displayed: display: inline-block. It still sits in the line like a word, but now it\'s a proper box. Padding pushes everything away, and width works.',
          replies: ['And display: block?'],
        },
        {
          tey: 'That makes it start on its own line and stretch the full width, like a paragraph. Good for a big "Play" bar across a card. For a button next to text, inline-block.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Inline vs inline-block',
      caption: 'Both links have the same padding. Only the second pushes the text around it away.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; line-height: 1.6; }\n  a { background-color: #FF9600; color: #14213D; padding: 12px 20px; border-radius: 8px; }\n  p + p a { display: inline-block; }\n</style>\n<p>Line above.<br><a href="#play">Play (inline)</a><br>Line below.</p>\n<p>Line above.<br><a href="#play">Play (inline-block)</a><br>Line below.</p>\n',
      challenge: 'Change inline-block to block. The second link stretches across the whole line.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Block: new line, full width. Inline: inside text, top and bottom padding overlaps. inline-block: sits in the line, but acts like a box.',
    },
  ],
  apply: {
    scenario: 'The Play button.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Block or inline, by default?',
        groups: ['Block', 'Inline'],
        items: [
          { text: 'p', group: 0 },
          { text: 'a', group: 1 },
          { text: 'article', group: 0 },
          { text: 'strong', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Turn the link into a button: display inline-block, padding 12px 20px',
        starter: '<style>\n  a { background-color: #FF9600; color: #14213D; }\n</style>\n<p><a href="#play">Play</a></p>\n',
        solution: '<style>\n  a { background-color: #FF9600; color: #14213D; display: inline-block; padding: 12px 20px; }\n</style>\n<p><a href="#play">Play</a></p>\n',
        hint: 'display: inline-block; padding: 12px 20px;',
        checks: [
          { message: 'A proper box', dom: { selector: 'a', style: 'display', styleValue: 'inline-block' } },
          { message: '12px top padding', dom: { selector: 'a', style: 'padding-top', styleValue: '12px' } },
          { message: '20px side padding', dom: { selector: 'a', style: 'padding-left', styleValue: '20px' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did the padding on Kofi\'s plain link overlap the lines above and below?',
        options: [
          { text: 'Links are inline, and top and bottom padding on inline boxes doesn\'t push lines away' },
          { text: 'He used too much padding', why: 'Any amount overlaps on an inline box.' },
          { text: 'Links can\'t have padding', why: 'They can. Inline boxes just don\'t push other lines.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each display value to how it behaves.',
        pairs: [
          ['block', 'New line, full width'],
          ['inline', 'Inside the text, as wide as its words'],
          ['inline-block', 'In the line, but a proper box'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'I set width: 200px on my link and nothing happened.',
        options: [
          { text: 'Inline boxes ignore width. Make it inline-block and the width works.' },
          { text: 'Try 2000px.', why: 'Any width is ignored on inline boxes.' },
          { text: 'Links can never be resized.', why: 'With inline-block they can.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that won\'t make the link a button.',
        language: 'css',
        lines: ['a { display: inline-block; }', 'a { display: inline; padding: 12px; }', 'a { display: block; padding: 12px; }'],
        bug: 1,
        explanation: 'Still inline, so the top and bottom padding overlaps the lines around it.',
        fix: 'a { display: inline-block; padding: 12px; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Where does the link appear?',
        code: 'a { display: block; }\n\n<p>Listen now: <a href="#play">Play</a></p>',
        language: 'html',
        options: [
          { text: 'On its own line, stretching the full width' },
          { text: 'Next to "Listen now:"', why: 'block starts a new line.' },
          { text: 'Nowhere', why: 'It\'s still shown, just as a block.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Make the link a button that sits in the line.',
        language: 'css',
        template: 'a { display: [[1]]; padding: 12px 20px; }',
        blanks: [['inline-block']],
        distractors: ['inline', 'none', 'button'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which property changes whether a box is block or inline? (one word)',
        answers: ['display'],
        placeholder: 'A property',
      },
      {
        kind: 'writeCode',
        prompt: 'Make the Play link a full-width bar across the card: display block',
        starter: '<style>\n  a { background-color: #FF9600; color: #14213D; padding: 12px; }\n</style>\n<article><h2>Sunrise in Osu</h2><a href="#play">Play</a></article>\n',
        solution: '<style>\n  a { background-color: #FF9600; color: #14213D; padding: 12px; display: block; }\n</style>\n<article><h2>Sunrise in Osu</h2><a href="#play">Play</a></article>\n',
        hint: 'display: block;',
        checks: [
          { message: 'A full-width bar', dom: { selector: 'a', style: 'display', styleValue: 'block' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Find a "button" on a website you use. Do you think it\'s a link styled as a box?',
    starters: ['The button on...', 'I think it\'s...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Turn the most important link on your page into a button with display: inline-block, padding and border-radius. Check the contrast.',
  },
  notes: 'Block vs inline formatting per MDN ("Block and inline layout in normal flow"). Vertical padding on inline boxes is painted but doesn\'t affect line box height; width/height don\'t apply to non-replaced inline elements. Button-styled links: real <button> elements come with forms in Course 3.',
};

export default lesson;
