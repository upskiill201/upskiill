import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 1 · Lesson 3 — the four layers of the box model: content, padding, border, margin. Steps. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Four layers of every box',
  summary: 'On the video call, Miracle draws a box inside a box inside a box. "Learn these four layers," she says, "and you can lay out any page on the internet."',
  minutes: 12,
  outcomes: ['Name the four layers of the box model', 'Add a margin outside a box', 'Tell padding and margin apart'],
  learn: [
    {
      kind: 'steps',
      title: 'From the inside out',
      steps: [
        { title: '1. Content', body: 'The words, the image, whatever is inside the element. This is the middle of the box.', code: '<article><h2>Sunrise in Osu</h2></article>', language: 'html' },
        { title: '2. Padding', body: 'Space around the content, inside the border. The background colour fills it.', code: 'article { padding: 16px; }', language: 'css' },
        { title: '3. Border', body: 'The edge of the box. It can be thick, thin, dashed, coloured, or not there at all.', code: 'article { border: 2px solid #FF9600; }', language: 'css' },
        { title: '4. Margin', body: 'Space outside the border, pushing other boxes away. It\'s always see-through: the page shows through it.', code: 'article { margin: 16px; }', language: 'css' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'All four layers',
      caption: 'Pink background so you can see the padding. The gap between the cards is margin.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  article {\n    background-color: #F0438A;\n    color: #14213D;\n    padding: 16px;\n    border: 4px solid #FF9600;\n    margin: 16px;\n  }\n</style>\n<article><h2>Sunrise in Osu</h2></article>\n<article><h2>Jollof Bounce</h2></article>\n',
      challenge: 'Change margin to 40px, then padding to 40px. Which one pushes the cards apart?',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Content, padding, border, margin. Padding is inside the border; margin is outside.',
    },
  ],
  apply: {
    scenario: 'Miracle\'s box drawing.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the layers in order, from the inside out.',
        lines: ['Content', 'Padding', 'Border', 'Margin'],
      },
      {
        kind: 'writeCode',
        prompt: 'Push the beat cards apart: give every article a 16px margin',
        starter: '<style>\n  article { border: 2px solid #FF9600; padding: 16px; }\n</style>\n<article><h2>Sunrise in Osu</h2></article>\n<article><h2>Jollof Bounce</h2></article>\n',
        solution: '<style>\n  article { border: 2px solid #FF9600; padding: 16px; margin: 16px; }\n</style>\n<article><h2>Sunrise in Osu</h2></article>\n<article><h2>Jollof Bounce</h2></article>\n',
        hint: 'Add margin: 16px; to the article rule.',
        checks: [
          { message: 'Margin below each card', dom: { selector: 'article', style: 'margin-bottom', styleValue: '16px' } },
          { message: 'Padding still there', dom: { selector: 'article', style: 'padding-top', styleValue: '16px' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Inside the border, or outside?',
        groups: ['Inside', 'Outside'],
        items: [
          { text: 'Padding', group: 0 },
          { text: 'Margin', group: 1 },
          { text: 'Content', group: 0 },
          { text: 'The gap between two cards', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The card is pink. What colour is its margin?',
        options: [
          { text: 'See-through: the page\'s colour shows' },
          { text: 'Pink', why: 'The background fills padding, not margin.' },
          { text: 'The border colour', why: 'Margin is always see-through.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each layer to what it is.',
        pairs: [
          ['Content', 'The words and images'],
          ['Padding', 'Room inside the border'],
          ['Border', 'The edge'],
          ['Margin', 'Space that pushes others away'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'The cards are touching each other. More padding?',
        options: [
          { text: 'Padding makes each card fatter inside. To push cards apart, it\'s margin.' },
          { text: 'Yes, padding separates them.', why: 'Padding is inside. The gap between is margin.' },
          { text: 'A thicker border.', why: 'They\'d still touch, just with thicker edges.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Kofi wants a gap between the cards. Tap the line that doesn\'t do it.',
        language: 'css',
        lines: ['article { margin-bottom: 16px; }', 'article { padding-bottom: 16px; }', 'article { margin: 16px; }'],
        bug: 1,
        explanation: 'Padding adds room inside the card. A gap between cards needs margin.',
        fix: 'article { margin-bottom: 16px; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How far apart are the two cards?',
        code: 'article { margin-bottom: 24px; }\n\n<article>One</article>\n<article>Two</article>',
        language: 'html',
        options: [
          { text: '24px' },
          { text: '0px', why: 'The first card\'s bottom margin pushes the second down.' },
          { text: '48px', why: 'Only the first card\'s bottom margin sits between them.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the card.',
        language: 'css',
        template: 'article {\n  [[1]]: 16px;\n  border: 2px solid #FF9600;\n  [[2]]: 24px;\n}',
        blanks: [['padding'], ['margin']],
        distractors: ['space', 'gap-inside', 'outline'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which layer is see-through and sits outside the border? (one word)',
        answers: ['margin'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Draw a box on paper and label the four layers. Which one had you mixed up before?',
    starters: ['I used to think...', 'Now I know...'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Search "MDN the box model" and look at the diagram of content, padding, border and margin.',
  },
  notes: 'Box model layers per MDN and CSS Box Model spec. Adjacent vertical margins collapse (the larger wins); the predictOutput uses only one margin between the cards to stay true.',
};

export default lesson;
