import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 1 · Lesson 9 — content-box overflow vs a global border-box rule with the * selector. Before / After. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'The card that won\'t fit',
  summary: 'Kofi gives a card width: 100% so it fills Ama\'s phone, then adds padding and a border. It sticks out again, by exactly the padding and border. Here\'s the same page with one line at the top.',
  minutes: 11,
  outcomes: ['Spot a box made wider by its padding and border', 'Switch every box to border-box with one rule', 'Use the * selector'],
  learn: [
    {
      kind: 'compare',
      title: 'Content-box vs border-box',
      before: { label: 'Sticks out', text: 'article {\n  width: 100%;\n  padding: 16px;\n  border: 2px solid #FF9600;\n}\n\n100% of the screen, plus 32px of padding, plus 4px of border. On Ama\'s phone it\'s 36px too wide, and the page scrolls sideways.' },
      after: { label: 'Fits exactly', text: '* { box-sizing: border-box; }\n\narticle {\n  width: 100%;\n  padding: 16px;\n  border: 2px solid #FF9600;\n}\n\n* means "every element". Now every box counts padding and border inside its width. 100% means 100%.' },
      notes: [
        'With the default content-box, padding and border are added to the width.',
        '* selects every element on the page.',
        'Put the border-box rule at the top of your stylesheet.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'One line at the top',
      caption: 'Switch the preview to phone size. The card sticks out. Then add the first line.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; margin: 0; }\n  article { width: 100%; padding: 16px; border: 2px solid #FF9600; }\n</style>\n<article><h2>Jollof Bounce</h2><p>Fast, loud, for dancing.</p></article>\n',
      challenge: 'Add * { box-sizing: border-box; } as the first line inside <style>. The card fits.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Start every stylesheet with * { box-sizing: border-box; }. Then widths mean what you think.',
    },
  ],
  apply: {
    scenario: 'The card that won\'t fit.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does the width: 100% card stick out?',
        options: [
          { text: 'Its padding and border are added on top of the 100%' },
          { text: '100% is too small', why: 'The extra comes from padding and border.' },
          { text: 'Ama\'s phone adds space', why: 'It\'s content-box adding padding and border.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Add the rule that switches every element to border-box',
        starter: '<style>\n\n  article { width: 100%; padding: 16px; border: 2px solid #FF9600; }\n</style>\n<article><h2>Jollof Bounce</h2></article>\n',
        solution: '<style>\n  * { box-sizing: border-box; }\n  article { width: 100%; padding: 16px; border: 2px solid #FF9600; }\n</style>\n<article><h2>Jollof Bounce</h2></article>\n',
        hint: '* { box-sizing: border-box; }',
        checks: [
          { message: 'The card is border-box', dom: { selector: 'article', style: 'box-sizing', styleValue: 'border-box' } },
          { message: 'So is the heading', dom: { selector: 'h2', style: 'box-sizing', styleValue: 'border-box' } },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Which elements does this rule change?',
        code: '* { box-sizing: border-box; }',
        language: 'css',
        options: [
          { text: 'Only elements with a star', why: '* is the universal selector: everything.' },
          { text: 'Only the body', why: 'It matches every element.' },
          { text: 'Every element on the page' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'With the default content-box: added to the width, or not?',
        groups: ['Added to the width', 'Not added'],
        items: [
          { text: 'Padding', group: 0 },
          { text: 'Border', group: 0 },
          { text: 'The text inside', group: 1 },
          { text: 'Margin (it\'s outside anyway)', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the broken line.',
        language: 'css',
        lines: ['* { box-sizing: border-box; }', 'article { box-sizing: borderbox; }', 'img { max-width: 100%; }'],
        bug: 1,
        explanation: 'It\'s border-box, with a hyphen. The browser skips values it doesn\'t know.',
        fix: 'article { box-sizing: border-box; }',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Is it bad to put a rule on EVERY element?',
        options: [
          { text: 'Yes, never use *.', why: 'For box-sizing it\'s a common, safe habit.' },
          { text: 'For box-sizing it\'s normal: lots of sites do exactly this so sizes are predictable.' },
          { text: 'Only if you have one element.', why: 'It\'s fine on any page.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each selector to what it picks.',
        pairs: [
          ['*', 'Every element'],
          ['article', 'Every article'],
          ['article h2', 'h2s inside articles'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the first line of the stylesheet.',
        language: 'css',
        template: '[[1]] { box-sizing: [[2]]; }',
        blanks: [['*'], ['border-box']],
        distractors: ['all', 'content-box', 'body'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the default box-sizing value? (hyphenated)',
        answers: ['content-box'],
        placeholder: 'A value',
      },
      {
        kind: 'mcq',
        prompt: 'Where should the border-box rule go?',
        options: [
          { text: 'At the top of the stylesheet' },
          { text: 'In every rule, one by one', why: 'One * rule at the top covers everything.' },
          { text: 'In the HTML', why: 'It\'s CSS.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Has a box on your page ever been mysteriously too wide? Could this have been why?',
    starters: ['Maybe...', 'I\'ll add...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Add * { box-sizing: border-box; } to the top of your own style.css, and check nothing sticks out on a phone.',
  },
  notes: 'Universal selector * per MDN. Many resets also include *::before, *::after; pseudo-elements aren\'t taught yet, so kept to *.',
};

export default lesson;
