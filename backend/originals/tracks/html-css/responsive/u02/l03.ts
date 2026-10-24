import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 2 · Lesson 3 — writing classes well: name, rules, combine with descendants. Steps. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Your first real class',
  summary: 'Miracle\'s advice: "Stop styling article. Give your cards a class of their own." Four steps to turn every beat card into a proper .beat-card.',
  minutes: 12,
  outcomes: ['Write a class name that follows the rules', 'Move card styles from article to a class', 'Style elements inside a class with a descendant selector'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps to .beat-card',
      steps: [
        { title: '1. Choose a name', body: 'Lowercase, words joined with hyphens, no spaces, and don\'t start with a number. Say what it is: beat-card.', code: 'beat-card', language: 'css' },
        { title: '2. Label the elements', body: 'Add the class to every beat card in the HTML.', code: '<article class="beat-card">...</article>', language: 'html' },
        { title: '3. Move the styles', body: 'Change the selector from article to .beat-card. Now a gig card or a news article won\'t accidentally look like a beat.', code: '.beat-card {\n  border: 2px solid #FF9600;\n  border-radius: 12px;\n  padding: 16px;\n}', language: 'css' },
        { title: '4. Style what\'s inside', body: 'A space still means "inside", so .beat-card h2 picks only headings in beat cards.', code: '.beat-card h2 { margin: 0 0 8px; }', language: 'css' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'A card with its own class',
      caption: 'The beat card has its class. The article below it isn\'t a beat, so it stays plain.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .beat-card { border: 2px solid #FF9600; border-radius: 12px; padding: 16px; margin-bottom: 16px; }\n  .beat-card h2 { margin: 0 0 8px; color: #FF9600; }\n</style>\n<article class="beat-card"><h2>Sunrise in Osu</h2><p>Slow, warm, made at 5am.</p></article>\n<article><h2>News: new beat Friday</h2><p>Not a beat card, so no card styles.</p></article>\n',
      challenge: 'Give the news article class="beat-card" too. See how one label pulls in all the styles?',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Name classes for what things are (beat-card), not how they look (orange-box).',
    },
  ],
  apply: {
    scenario: 'From article to .beat-card.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Choose a class name', 'Add it to the elements in the HTML', 'Change the CSS selector to the class', 'Style what\'s inside with .class h2'],
      },
      {
        kind: 'writeCode',
        prompt: 'Give the card class="beat-card" and move its border rule from article to .beat-card',
        starter: '<style>\n  article { border: 2px solid #FF9600; }\n</style>\n<article><h2>Sunrise in Osu</h2></article>\n',
        solution: '<style>\n  .beat-card { border: 2px solid #FF9600; }\n</style>\n<article class="beat-card"><h2>Sunrise in Osu</h2></article>\n',
        hint: 'class="beat-card" in the HTML, .beat-card in the CSS.',
        checks: [
          { message: 'The card has the class', dom: { selector: 'article.beat-card', count: 1 } },
          { message: 'Its border comes from the class', dom: { selector: '.beat-card', style: 'border-top-color', styleValue: '#FF9600' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'A valid class name, or not?',
        groups: ['Valid', 'Broken'],
        items: [
          { text: 'beat-card', group: 0 },
          { text: 'beat card (with a space)', group: 1 },
          { text: 'featured', group: 0 },
          { text: '2nd-card (starts with a number)', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'class="beat card" (with a space). What does the browser see?',
        options: [
          { text: 'One class called "beat card"', why: 'A space separates classes.' },
          { text: 'An error', why: 'It\'s valid: two separate classes.' },
          { text: 'Two classes: beat and card' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the selector that won\'t match class="beat-card".',
        language: 'css',
        lines: ['.beat-card { padding: 16px; }', '.beat-card h2 { margin-top: 0; }', '.beatcard { border-radius: 12px; }'],
        bug: 2,
        explanation: 'The hyphen is part of the name. beatcard and beat-card are different classes.',
        fix: '.beat-card { border-radius: 12px; }',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Why not keep styling article? It worked.',
        options: [
          { text: 'article is banned in CSS.', why: 'It\'s fine. It\'s just too broad.' },
          { text: 'When I add gig cards or news, they\'re articles too. A beat-card class styles only the beats.' },
          { text: 'Classes load faster.', why: 'It\'s about picking exactly the right elements.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each selector to what it picks.',
        pairs: [
          ['article', 'Every article'],
          ['.beat-card', 'Everything with class beat-card'],
          ['.beat-card h2', 'h2s inside beat cards'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Which heading turns orange?',
        code: '.beat-card h2 { color: #FF9600; }\n\n<h2>Beats</h2>\n<article class="beat-card"><h2>Sunrise in Osu</h2></article>',
        language: 'html',
        options: [
          { text: 'Both', why: '"Beats" isn\'t inside a beat card.' },
          { text: 'Only "Beats"', why: 'The rule picks h2s inside .beat-card.' },
          { text: 'Only "Sunrise in Osu", inside the card' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Style the headings inside beat cards.',
        language: 'css',
        template: '[[1]]beat-card [[2]] { margin: 0 0 8px; }',
        blanks: [['.'], ['h2']],
        distractors: ['#', 'article', ','],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What joins two words in a class name, like beat_card but the usual way? (name the symbol)',
        answers: ['hyphen', 'dash', 'a hyphen', 'minus'],
        placeholder: 'A symbol name',
      },
    ],
  },
  reflect: {
    prompt: 'List three things on your own page that could have their own class. What would you name them?',
    starters: ['I\'d have...', 'Named...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Give the main repeated part of your page a class (like project-card or song), and move its styles from the element selector to the class.',
  },
  notes: 'Class names are case-sensitive and can\'t start with a digit as a CSS identifier without escaping (CSS Syntax). Space-separated class attribute = multiple classes (HTML spec). Hyphenated lowercase naming is convention.',
};

export default lesson;
