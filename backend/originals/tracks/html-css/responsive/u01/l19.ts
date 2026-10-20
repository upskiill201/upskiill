import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 1 · Lesson 19 — the whole v1.1 stylesheet, box by box. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'The whole layout, box by box',
  summary: 'Before uploading v1.1, Kofi reads his new style.css from top to bottom with Miracle. Every line is about boxes now. Tap each part.',
  minutes: 11,
  outcomes: ['Read a complete box-model stylesheet', 'Explain how page, column, cards and buttons fit together', 'Spot a line that would break the layout'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part of style.css',
      text: '* { box-sizing: border-box; }\nbody { margin: 0; background-color: #14213D; color: #FFF6E5; }\nmain { max-width: 640px; margin: 0 auto; padding: 16px; }\narticle {\n  background-color: #1F2E52;\n  padding: 16px;\n  border: 2px solid #FF9600;\n  border-radius: 12px;\n  margin-bottom: 16px;\n}\narticle h2 { margin: 0 0 8px; }\nimg { max-width: 100%; border-radius: 8px; }\narticle a { display: inline-block; padding: 12px 16px; margin: 0 8px 8px 0; }',
      hotspots: [
        { phrase: '* { box-sizing: border-box; }', note: 'Every width means the whole box, edges and all.' },
        { phrase: 'body { margin: 0;', note: 'No mystery gap around the page.' },
        { phrase: 'main { max-width: 640px; margin: 0 auto; padding: 16px; }', note: 'The centred column: never too wide on a laptop, with room at the edges on a phone.' },
        { phrase: 'background-color: #1F2E52;', note: 'Lifts each card off the page, and fills the padding.' },
        { phrase: 'margin-bottom: 16px;', note: 'The gap between cards.' },
        { phrase: 'article h2 { margin: 0 0 8px; }', note: 'No extra space on top of the card\'s padding.' },
        { phrase: 'img { max-width: 100%; border-radius: 8px; }', note: 'Covers never stick out, on any screen.' },
        { phrase: 'article a { display: inline-block; padding: 12px 16px; margin: 0 8px 8px 0; }', note: 'Thumb-sized buttons, with gaps so Ama hits the right one.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Mensah Beats v1.1',
      caption: 'The full stylesheet with one card. Try phone and laptop sizes.',
      code: '<style>\n  * { box-sizing: border-box; }\n  body { margin: 0; background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  main { max-width: 640px; margin: 0 auto; padding: 16px; }\n  article { background-color: #1F2E52; padding: 16px; border: 2px solid #FF9600; border-radius: 12px; margin-bottom: 16px; }\n  article h2 { margin: 0 0 8px; }\n  img { max-width: 100%; border-radius: 8px; }\n  article a { display: inline-block; background-color: #FF9600; color: #14213D; padding: 12px 16px; margin: 0 8px 8px 0; border-radius: 8px; }\n</style>\n<main>\n  <article>\n    <h2>Night Bus to Kumasi</h2>\n    <img src="cover-3.png" alt="Album cover for Night Bus to Kumasi">\n    <p><a href="#play">Play</a><a href="#share">Share</a></p>\n  </article>\n</main>\n',
      challenge: 'Copy the article and change it to Jollof Bounce with cover-2.png.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Page, column, cards, buttons: four levels of boxes, each with one job.',
    },
  ],
  apply: {
    scenario: 'Reading v1.1.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each box to its job.',
        pairs: [
          ['body', 'The whole page, no gap'],
          ['main', 'The centred column'],
          ['article', 'One beat card'],
          ['article a', 'A thumb-sized button'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Add the first line every stylesheet in this course starts with, and remove the body\'s margin',
        starter: '<style>\n\n  main { max-width: 640px; margin: 0 auto; }\n</style>\n<main><article><h2>Night Bus to Kumasi</h2></article></main>\n',
        solution: '<style>\n  * { box-sizing: border-box; }\n  body { margin: 0; }\n  main { max-width: 640px; margin: 0 auto; }\n</style>\n<main><article><h2>Night Bus to Kumasi</h2></article></main>\n',
        hint: '* { box-sizing: border-box; } and body { margin: 0; }',
        checks: [
          { message: 'Border-box everywhere', dom: { selector: 'article', style: 'box-sizing', styleValue: 'border-box' } },
          { message: 'No gap around the page', dom: { selector: 'body', style: 'margin-top', styleValue: '0px' } },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that would make Ama scroll sideways.',
        language: 'css',
        lines: ['main { max-width: 640px; margin: 0 auto; }', 'article { width: 640px; padding: 16px; }', 'img { max-width: 100%; }'],
        bug: 1,
        explanation: 'A fixed 640px card is wider than her phone. The column already limits the width, so the card needs no width at all.',
        fix: 'article { padding: 16px; }',
      },
      {
        kind: 'mcq',
        prompt: 'Why doesn\'t each card need its own max-width any more?',
        options: [
          { text: 'They sit inside main, which already caps the width' },
          { text: 'Cards can\'t have a max-width', why: 'They can. The column does the job now.' },
          { text: 'Because of border-radius', why: 'It\'s main\'s max-width.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which is about space, and which is about looks?',
        groups: ['Space', 'Looks'],
        items: [
          { text: 'padding: 16px', group: 0 },
          { text: 'border-radius: 12px', group: 1 },
          { text: 'margin-bottom: 16px', group: 0 },
          { text: 'background-color: #1F2E52', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'If you wanted all the gaps a bit bigger, how many lines would you change?',
        options: [
          { text: 'Just the few padding and margin values. Each one is in one place.' },
          { text: 'Every line in the file.', why: 'The spacing lives in a few clear places.' },
          { text: 'I\'d add empty paragraphs.', why: 'Margin and padding do it in CSS.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'A laptop is 1240px wide. How much space is on each side of the column?',
        code: 'main { max-width: 640px; margin: 0 auto; }',
        language: 'css',
        options: [
          { text: '300px' },
          { text: '600px', why: 'That\'s the total. It\'s split in two.' },
          { text: '0px', why: 'auto splits the leftover space.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the button rule.',
        language: 'css',
        template: 'article a { display: [[1]]; padding: 12px 16px; [[2]]: 0 8px 8px 0; }',
        blanks: [['inline-block'], ['margin']],
        distractors: ['inline', 'outline', 'border'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which margin value centres a box left to right? (one word)',
        answers: ['auto'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the stylesheet in order, from the biggest box to the smallest.',
        language: 'css',
        lines: ['* { box-sizing: border-box; }', 'body { margin: 0; }', 'main { max-width: 640px; margin: 0 auto; }', 'article { padding: 16px; }', 'article a { display: inline-block; }'],
      },
    ],
  },
  reflect: {
    prompt: 'Read your own stylesheet top to bottom. Is it ordered from the biggest box to the smallest?',
    starters: ['Mine starts with...', 'I\'d move...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Reorder your own style.css: border-box first, then body, then the column, then cards, then buttons.',
  },
  notes: 'Course images cover-2.png and cover-3.png are Teyro-made. Stylesheet order (general to specific) is a readability habit, not a rule.',
};

export default lesson;
