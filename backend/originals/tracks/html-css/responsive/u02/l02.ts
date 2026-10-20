import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 2 · Lesson 2 — repeated inline styles vs one class. Before / After. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Copy-paste vs one class',
  summary: 'Clinton "helped" with the featured cards: he pasted the same style="" onto each one. It worked. Then Efua asked for a slightly brighter pink. Here\'s his page, and the same page with a class.',
  minutes: 11,
  outcomes: ['Spot styles repeated in style attributes', 'Replace them with one class', 'Explain why one rule is easier to change'],
  learn: [
    {
      kind: 'compare',
      title: 'Pasted styles vs a class',
      before: { label: 'Pasted three times', text: '<article style="border-color: #F0438A; background-color: #2A2350;">Sunrise in Osu</article>\n<article style="border-color: #F0438A; background-color: #2A2350;">Night Bus to Kumasi</article>\n<article style="border-color: #F04388; background-color: #2A2350;">Jollof Bounce</article>\n\nThree copies. One already has a typo in the pink. A brighter pink means three edits.' },
      after: { label: 'One class', text: '.featured {\n  border-color: #F0438A;\n  background-color: #2A2350;\n}\n\n<article class="featured">Sunrise in Osu</article>\n<article class="featured">Night Bus to Kumasi</article>\n<article class="featured">Jollof Bounce</article>\n\nOne rule. The HTML just says what the card is. A brighter pink is one edit.' },
      notes: [
        'Repeated styles drift apart: a typo in one copy, and they stop matching.',
        'A class keeps the look in one place in your CSS.',
        'The HTML gets shorter and easier to read.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'One edit, three cards',
      caption: 'Change the pink once in .featured and all three featured cards follow.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  article { border: 2px solid #FF9600; border-radius: 12px; padding: 16px; margin-bottom: 16px; }\n  .featured { border-color: #F0438A; background-color: #2A2350; }\n</style>\n<article class="featured">Sunrise in Osu</article>\n<article>Jollof Bounce</article>\n<article class="featured">Night Bus to Kumasi</article>\n<article class="featured">Accra Sunrise Mix</article>\n',
      challenge: 'Change #F0438A to #FF9600 in .featured. One edit, three cards.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'If you\'ve written the same styles twice, they want to be a class.',
    },
  ],
  apply: {
    scenario: 'Clinton\'s pasted styles.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What went wrong with Clinton\'s pasted styles?',
        options: [
          { text: 'One copy had a typo, so the cards didn\'t match, and every change means editing each copy' },
          { text: 'style attributes don\'t work', why: 'They work. They\'re just hard to keep in sync.' },
          { text: 'Nothing', why: 'Efua noticed the mismatched pink straight away.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Replace the pasted styles: give both cards class="featured" instead, and write a .featured rule with border-color #F0438A',
        starter: '<style>\n  article { border: 2px solid #FF9600; }\n\n</style>\n<article style="border-color: #F0438A;">Sunrise in Osu</article>\n<article style="border-color: #F0438A;">Night Bus to Kumasi</article>\n',
        solution: '<style>\n  article { border: 2px solid #FF9600; }\n  .featured { border-color: #F0438A; }\n</style>\n<article class="featured">Sunrise in Osu</article>\n<article class="featured">Night Bus to Kumasi</article>\n',
        hint: 'Swap each style="..." for class="featured", then add the .featured rule.',
        checks: [
          { message: 'No pasted styles left', dom: { selector: '[style]', count: 0 } },
          { message: 'Two featured cards', dom: { selector: '.featured', count: 2 } },
          { message: 'They\'re pink', dom: { selector: '.featured', style: 'border-top-color', styleValue: '#F0438A' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Easy to change later, or not?',
        groups: ['Easy to change', 'Hard to change'],
        items: [
          { text: 'One .featured rule', group: 0 },
          { text: 'The same style="" on ten cards', group: 1 },
          { text: 'A class in the HTML', group: 0 },
          { text: 'A colour copied into many places', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the copy that doesn\'t match.',
        language: 'html',
        lines: ['<article style="border-color: #F0438A;">Sunrise in Osu</article>', '<article style="border-color: #F0438A;">Night Bus to Kumasi</article>', '<article style="border-color: #F04388;">Jollof Bounce</article>'],
        bug: 2,
        explanation: 'A typo: #F04388 instead of #F0438A. That\'s exactly why a single class is safer.',
        fix: '<article class="featured">Jollof Bounce</article>',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'But my way worked! Why change it?',
        options: [
          { text: 'It works today. A class means the next change is one edit instead of hunting through every card.' },
          { text: 'Style attributes are banned.', why: 'They\'re allowed. They just don\'t scale.' },
          { text: 'It didn\'t work.', why: 'It did, until the colours had to change.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to where it lives.',
        pairs: [
          ['class="featured"', 'In the HTML'],
          ['.featured { ... }', 'In the CSS'],
          ['The colour value', 'Once, inside the rule'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Efua changes one line. How many cards change colour?',
        code: '.featured { border-color: #FF5FA2; }\n\n<article class="featured">A</article>\n<article class="featured">B</article>\n<article class="featured">C</article>\n<article>D</article>',
        language: 'html',
        options: [
          { text: 'Three: every featured card' },
          { text: 'One', why: 'Every element with the class follows the rule.' },
          { text: 'Four', why: 'D has no class.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the HTML.',
        language: 'html',
        template: '<article [[1]]="[[2]]">Night Bus to Kumasi</article>',
        blanks: [['class'], ['featured']],
        distractors: ['style', 'id', '.featured'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'You\'ve written the same styles on three elements. What should they become? (one word: a ___)',
        answers: ['class'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'In the HTML, do you write the dot? class=".featured" or class="featured"?',
        options: [
          { text: 'class="featured", no dot. The dot is only in CSS.' },
          { text: 'class=".featured"', why: 'The dot belongs in the CSS selector only.' },
          { text: 'Either is the same', why: 'With a dot, the class name includes the dot and won\'t match .featured.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Is there anything you\'ve copy-pasted on your page more than once? Could it be one class?',
    starters: ['I repeated...', 'It could be...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Search your page for style="...". Move any repeated ones into a class.',
  },
  notes: '#2A2350 is a dark plum tint; cream text on it stays well above 4.5:1. style attributes have the highest non-!important priority, which is another reason to avoid them (covered later this chapter).',
};

export default lesson;
