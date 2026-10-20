import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 2 · Lesson 8 — counting specificity: ids, classes, elements. Card deck (text). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Counting specificity',
  summary: 'Miracle\'s trick for never guessing again: count three numbers for each selector. The bigger score wins. Tey walks through it one card at a time.',
  minutes: 11,
  outcomes: ['Count a selector\'s ids, classes and elements', 'Compare two selectors by their scores', 'Predict which rule wins before you test'],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Three columns.</strong> For any selector, count: <strong>ids</strong> (#), <strong>classes</strong> (.), and <strong>elements</strong> (h2, article). Write them as three numbers: ids, classes, elements. h2 is 0-0-1. .featured is 0-1-0. #gigs is 1-0-0.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Compare left to right.</strong> The first column that differs decides. One id beats any number of classes. One class beats any number of elements. Only if all three match does order decide.</p>',
    },
    {
      kind: 'check',
      question: 'Which wins: .beat-card h2 or article h2?',
      options: ['article h2 (0-0-2)', '.beat-card h2 (0-1-1)', 'It\'s a tie'],
      answer: 1,
      explanation: 'Compare the classes column first: 1 beats 0. The class wins, whatever the order.',
    },
    {
      kind: 'text',
      html: '<p><strong>What doesn\'t count:</strong> the * selector scores 0-0-0, and spaces and commas add nothing. A comma just means "these are separate selectors", each scored on its own.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Score the rules',
      caption: '.beat-card h2 scores 0-1-1. article h2 scores 0-0-2. Classes are compared first, so the class rule wins.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .beat-card h2 { color: #F0438A; }\n  article h2 { color: #FF9600; }\n</style>\n<article class="beat-card"><h2>Sunrise in Osu</h2></article>\n',
      challenge: 'Change article h2 to article.beat-card h2 (0-1-2). Who wins now?',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'ids - classes - elements. Compare from the left. Order only breaks exact ties.',
    },
  ],
  apply: {
    scenario: 'Miracle\'s counting trick.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each selector to its score (ids-classes-elements).',
        pairs: [
          ['h2', '0-0-1'],
          ['.featured', '0-1-0'],
          ['#gigs', '1-0-0'],
          ['.beat-card h2', '0-1-1'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Which colour wins on the h2?',
        code: 'article h2 { color: #FF9600; }\n.beat-card h2 { color: #F0438A; }\narticle h2 { color: #FFF6E5; }\n\n<article class="beat-card"><h2>Jollof Bounce</h2></article>',
        language: 'html',
        options: [
          { text: 'Pink: 0-1-1 beats 0-0-2' },
          { text: 'Cream: it\'s last', why: 'The class rule is more specific.' },
          { text: 'Orange: it\'s first', why: 'Neither first nor last matters here.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the featured card\'s heading pink, beating article h2: write .featured h2 with color #F0438A',
        starter: '<style>\n  article h2 { color: #FF9600; }\n\n</style>\n<article class="featured"><h2>Sunrise in Osu</h2></article>\n',
        solution: '<style>\n  article h2 { color: #FF9600; }\n  .featured h2 { color: #F0438A; }\n</style>\n<article class="featured"><h2>Sunrise in Osu</h2></article>\n',
        hint: '.featured h2 { color: #F0438A; }',
        checks: [
          { message: 'The heading is pink', dom: { selector: '.featured h2', style: 'color', styleValue: '#F0438A' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it beat .featured (0-1-0)?',
        groups: ['Beats it', 'Doesn\'t'],
        items: [
          { text: '#book (1-0-0)', group: 0 },
          { text: 'article h2 p (0-0-3)', group: 1 },
          { text: '.beat-card.featured (0-2-0)', group: 0 },
          { text: '* (0-0-0)', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the wrong score.',
        lines: ['.beat-card h2 = 0-1-1', 'main article h2 = 0-0-3', '#gigs .title = 0-1-1'],
        bug: 2,
        explanation: 'One id and one class: 1-1-0.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'If I write body main article section h2, with five elements, does that beat one class?',
        options: [
          { text: 'No: 0-0-5 loses to 0-1-0. Classes are compared before elements.' },
          { text: 'Yes, five beats one.', why: 'Columns are compared left to right.' },
          { text: 'It\'s a tie.', why: 'The classes column decides it.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Two rules both score 0-1-1. Which wins?',
        options: [
          { text: 'The one written later' },
          { text: 'The one written first', why: 'On a tie, later wins.' },
          { text: 'Neither applies', why: 'The later one wins the tie.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Score .beat-card.featured h2.',
        template: 'ids [[1]], classes [[2]], elements 1',
        blanks: [['0'], ['2']],
        distractors: ['1', '3', '4'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which column is compared first: ids, classes or elements? (one word)',
        answers: ['ids', 'id'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What colour is "Book me"?',
        code: '#book { color: #FF9600; }\n.beat-card.featured h2 { color: #F0438A; }\n\n<article class="beat-card featured"><h2 id="book">Book me</h2></article>',
        language: 'html',
        options: [
          { text: 'Orange: 1-0-0 beats 0-2-1' },
          { text: 'Pink: it has more parts', why: 'The ids column is compared first.' },
          { text: 'Cream', why: 'Both rules match. The id wins.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Score the three longest selectors in your stylesheet. Any surprises?',
    starters: ['The highest is...', 'I didn\'t expect...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Search "specificity calculator" and paste in a few of your selectors to check your counting.',
  },
  notes: 'Specificity (a, b, c) per Selectors Level 4: ids; classes, attributes, pseudo-classes; type selectors and pseudo-elements. Universal selector and combinators add nothing. Attribute and pseudo-class columns simplified to "classes".',
};

export default lesson;
