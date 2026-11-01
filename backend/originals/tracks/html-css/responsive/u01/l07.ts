import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 1 · Lesson 7 — history: when browsers disagreed about box sizes; width; how box-sizing came about. Reading. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'When browsers disagreed about boxes',
  summary: 'Kofi sets a card to width: 300px, adds padding, and measures it: it\'s wider than 300px. Miracle laughs. "Developers argued about that for years." Here\'s the story.',
  minutes: 12,
  outcomes: ['Set a box\'s width', 'Explain why padding and border can make a box wider than its width', 'Describe where box-sizing came from'],
  learn: [
    {
      kind: 'reading',
      title: 'The box model war',
      html:
        '<p>You can tell a box how wide to be with <strong>width</strong>, like <strong>width: 300px</strong>. But 300px of what? The early CSS standard said: 300px of <em>content</em>. Padding and border are added on the outside of that. A card with width: 300px, padding: 20px and a 2px border is really 344px wide: 300 + 20 + 20 + 2 + 2.</p>' +
        '<p>In the late 1990s, Internet Explorer for Windows, then the most-used browser, did it differently on many pages. It counted padding and border <em>inside</em> the width, so the same card came out exactly 300px. The same CSS gave different sizes in different browsers, and web developers spent years writing workarounds just to make boxes match.</p>' +
        '<p>Here\'s the twist: lots of designers thought Internet Explorer\'s way was easier. When you say "300px wide", you usually mean the whole card, edges and all. So a later version of CSS added a property that lets you choose: <strong>box-sizing</strong>. The default, <strong>content-box</strong>, is the standard way. <strong>border-box</strong> counts padding and border inside the width.</p>' +
        '<p>Today, many developers start every stylesheet by switching all boxes to border-box. A small fight from the 1990s is still in almost every website you open.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Wider than you asked for',
      caption: 'Both cards say width: 300px. The second also has padding and a border, so it comes out wider.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  article { width: 300px; background-color: #FFC83D; color: #14213D; margin-bottom: 16px; }\n  article + article { padding: 20px; border: 2px solid #FF9600; }\n</style>\n<article>width: 300px</article>\n<article>width: 300px, plus padding and border</article>\n',
      challenge: 'Add box-sizing: border-box; to the article rule. Now both are exactly 300px.',
    },
  ],
  apply: {
    scenario: 'The box model war.',
    items: [
      {
        kind: 'mcq',
        prompt: 'A card has width: 300px, padding: 20px and a 2px border. By default, how wide is it?',
        options: [
          { text: '300px', why: 'That\'s with border-box. By default padding and border are added.' },
          { text: '322px', why: 'Padding and border count on both sides.' },
          { text: '344px: 300 + 20 + 20 + 2 + 2' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the card 300px wide',
        starter: '<style>\n  article { border: 2px solid #FF9600; }\n</style>\n<article><h2>Sunrise in Osu</h2></article>\n',
        solution: '<style>\n  article { border: 2px solid #FF9600; width: 300px; }\n</style>\n<article><h2>Sunrise in Osu</h2></article>\n',
        hint: 'Add width: 300px;',
        checks: [
          { message: '300px wide', dom: { selector: 'article', style: 'width', styleValue: '300px' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each value to what width measures.',
        pairs: [
          ['content-box', 'Only the content'],
          ['border-box', 'Content, padding and border'],
          ['The default', 'content-box'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Is it counted inside the width with border-box?',
        groups: ['Inside the width', 'Outside the width'],
        items: [
          { text: 'Padding', group: 0 },
          { text: 'Border', group: 0 },
          { text: 'Margin', group: 1 },
          { text: 'The gap to the next card', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Why would the default make my card bigger than I asked?',
        options: [
          { text: 'It\'s a bug in my phone.', why: 'It\'s how content-box is meant to work.' },
          { text: 'The original standard measured only the content. box-sizing: border-box lets me measure the whole card instead.' },
          { text: 'Width doesn\'t work in CSS.', why: 'It works. It just measures the content by default.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the statement that\'s wrong.',
        lines: ['Old browsers didn\'t all measure boxes the same way.', 'box-sizing lets you choose how width is measured.', 'Margin is counted inside the width with border-box.'],
        bug: 2,
        explanation: 'Margin is always outside. border-box counts padding and border only.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How wide is this card?',
        code: 'article {\n  box-sizing: border-box;\n  width: 300px;\n  padding: 20px;\n  border: 2px solid #FF9600;\n}',
        language: 'css',
        options: [
          { text: '300px, edges and all' },
          { text: '344px', why: 'border-box keeps padding and border inside the 300px.' },
          { text: '256px', why: 'That\'s the space left for the content.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Measure the whole card, edges and all.',
        language: 'css',
        template: 'article { box-sizing: [[1]]; }',
        blanks: [['border-box']],
        distractors: ['content-box', 'margin-box', 'all-box'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which property chooses how a box\'s width is measured? (hyphenated)',
        answers: ['box-sizing'],
        placeholder: 'A property',
      },
      {
        kind: 'mcq',
        prompt: 'Why do many developers switch every box to border-box?',
        options: [
          { text: 'It makes pages load faster', why: 'It\'s about predictable sizes.' },
          { text: '"300px wide" then means the whole card, which is easier to plan' },
          { text: 'Browsers require it', why: 'It\'s a choice, not a rule.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'When you say something is "300px wide", do you mean the inside or the whole thing? Why?',
    starters: ['I mean...', 'Because...'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Search "MDN box-sizing" and read the two examples comparing content-box and border-box.',
  },
  notes: 'IE5/IE6 quirks mode used the border-box-style model (widely documented as the "IE box model"; workarounds like the Box Model Hack). box-sizing is in CSS Basic User Interface Module Level 3. Global border-box resets became common practice in the 2010s; kept unnamed.',
};

export default lesson;
