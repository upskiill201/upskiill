import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 2 · Lesson 4 — more than one class on an element; .a.b; the order classes are written in HTML doesn't matter. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Two labels on one card',
  summary: 'A featured beat is still a beat card. So it should get the card styles AND the pink. Miracle shows Kofi how one element can wear two classes at once. Tap each part.',
  minutes: 11,
  outcomes: ['Give an element more than one class', 'Explain how two classes combine', 'Use .beat-card.featured to pick elements with both'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part',
      text: '<article class="beat-card featured">\n  <h2>Sunrise in Osu</h2>\n</article>\n\n.beat-card { border: 2px solid #FF9600; padding: 16px; }\n.featured { border-color: #F0438A; }\n.beat-card.featured h2 { color: #F0438A; }',
      hotspots: [
        { phrase: 'class="beat-card featured"', note: 'Two classes, separated by a space. The element gets the styles of both.' },
        { phrase: '.beat-card { border: 2px solid #FF9600; padding: 16px; }', note: 'The base: every beat card, featured or not.' },
        { phrase: '.featured { border-color: #F0438A; }', note: 'The extra: changes just the colour. Everything else comes from .beat-card.' },
        { phrase: '.beat-card.featured h2', note: 'No space between the classes means "has both". This picks h2s inside elements that are a beat card AND featured.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Base plus extra',
      caption: 'Every card is a beat-card. The featured one adds a second class on top.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .beat-card { border: 2px solid #FF9600; border-radius: 12px; padding: 16px; margin-bottom: 16px; }\n  .featured { border-color: #F0438A; }\n  .beat-card.featured h2 { color: #F0438A; }\n</style>\n<article class="beat-card featured"><h2>Sunrise in Osu</h2></article>\n<article class="beat-card"><h2>Jollof Bounce</h2></article>\n',
      challenge: 'Add featured to the Jollof Bounce card\'s class too.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Base class + extra class: class="beat-card featured". The extra only changes what\'s different.',
    },
  ],
  apply: {
    scenario: 'Two labels on one card.',
    items: [
      {
        kind: 'mcq',
        prompt: 'An element has class="beat-card featured". Which rules apply?',
        options: [
          { text: 'Both .beat-card and .featured' },
          { text: 'Only the first, .beat-card', why: 'Every class on the element applies.' },
          { text: 'Neither: one class at a time', why: 'Elements can have many classes.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the card a featured beat card: give it both classes, beat-card and featured',
        starter: '<article class="beat-card"><h2>Sunrise in Osu</h2></article>\n',
        solution: '<article class="beat-card featured"><h2>Sunrise in Osu</h2></article>\n',
        hint: 'class="beat-card featured"',
        checks: [
          { message: 'It has both classes', dom: { selector: '.beat-card.featured', count: 1 } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each selector to what it picks.',
        pairs: [
          ['.beat-card.featured', 'Elements with both classes'],
          ['.beat-card .featured', 'Featured things inside a beat card'],
          ['.beat-card, .featured', 'Elements with either class'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Does .beat-card.featured pick it?',
        groups: ['Picked', 'Not picked'],
        items: [
          { text: 'class="beat-card featured"', group: 0 },
          { text: 'class="featured beat-card"', group: 0 },
          { text: 'class="beat-card"', group: 1 },
          { text: 'class="featured"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Should I make a separate featured-beat-card class with all the card styles copied in?',
        options: [
          { text: 'Yes, copy them all.', why: 'Copies drift apart. Combine two classes.' },
          { text: 'Use an id instead.', why: 'Two classes do it cleanly.' },
          { text: 'No: keep beat-card for the base and add featured on top. Then the card styles live in one place.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the HTML that gives only ONE class.',
        language: 'html',
        lines: ['<article class="beat-card featured">', '<article class="beat-card" class="featured">', '<article class="featured beat-card">'],
        bug: 1,
        explanation: 'An element can have only one class attribute; the browser keeps the first. Put both names in one attribute, separated by a space.',
        fix: '<article class="beat-card featured">',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What colour is the featured card\'s border?',
        code: '.beat-card { border: 2px solid #FF9600; }\n.featured { border-color: #F0438A; }\n\n<article class="beat-card featured">...</article>',
        language: 'html',
        options: [
          { text: 'Orange', why: 'Both rules apply; the later one sets the colour.' },
          { text: 'Pink: .featured comes later and changes only the colour' },
          { text: 'No border', why: '.beat-card gives it one.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Pick only cards that are beat cards AND featured.',
        language: 'css',
        template: '.beat-card[[1]]featured { background-color: #2A2350; }',
        blanks: [['.']],
        distractors: [' .', ', .', '#'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What separates two class names inside class=""? (one word)',
        answers: ['space', 'a space'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'Turn the heading pink only in featured beat cards: .beat-card.featured h2 gets color #F0438A',
        starter: '<style>\n\n</style>\n<article class="beat-card featured"><h2>Sunrise in Osu</h2></article>\n<article class="beat-card"><h2>Jollof Bounce</h2></article>\n',
        solution: '<style>\n  .beat-card.featured h2 { color: #F0438A; }\n</style>\n<article class="beat-card featured"><h2>Sunrise in Osu</h2></article>\n<article class="beat-card"><h2>Jollof Bounce</h2></article>\n',
        hint: '.beat-card.featured h2 { color: #F0438A; }',
        checks: [
          { message: 'Featured heading is pink', dom: { selector: '.featured h2', style: 'color', styleValue: '#F0438A' } },
          { message: 'The other heading isn\'t', dom: { selector: '.beat-card:not(.featured) h2', count: 1 } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What base class and what extra class could your own page use?',
    starters: ['My base would be...', 'The extra would be...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Give one element on your page two classes: a base and an extra. Make the extra change only one thing.',
  },
  notes: 'Compound class selector .a.b; duplicate attributes: the HTML parser keeps the first and drops the rest. Class order in the attribute doesn\'t matter; rule order in CSS does.',
};

export default lesson;
