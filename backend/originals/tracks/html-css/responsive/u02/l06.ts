import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 2 · Lesson 6 — class vs id: ids are unique, #id selector, why styling with ids causes trouble. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Class or id?',
  summary: 'Kofi remembers ids from his jump links. "Why not just give each card an id and style that?" Tey explains the difference, and why most developers style with classes.',
  minutes: 11,
  outcomes: ['Explain how an id differs from a class', 'Style an id with #', 'Choose a class for styling and an id for jump links'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Remember id="gigs" from your jump links? An id is a name that only one element on the page may have. A class is a label any number of elements can share.',
          replies: ['Can I style an id?'],
        },
        {
          tey: 'Yes, with a #: #gigs { } styles the element with id="gigs". Same # as in your jump link, href="#gigs".',
          replies: ['So why not use ids for everything?'],
        },
        {
          tey: 'Two reasons. An id can\'t be reused, so you\'d need a rule per card. And an id rule is much stronger than a class rule: it beats it even when the class comes later. That makes ids hard to override.',
          replies: ['So when do I use an id?'],
        },
        {
          tey: 'For naming one unique place: a jump-link target, or a form field\'s label later in the track. For looks, use classes.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'An id wins',
      caption: 'The class rule comes later, but the id rule still wins. That\'s how strong ids are.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  #gigs { color: #FF9600; }\n  .section-title { color: #F0438A; }\n</style>\n<h2 id="gigs" class="section-title">Gigs</h2>\n<h2 class="section-title">Beats</h2>\n',
      challenge: 'Delete the #gigs rule. Now both headings follow the class.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'id: one element, # in CSS, great for jump links. class: many elements, . in CSS, use it for styling.',
    },
  ],
  apply: {
    scenario: 'Class or id?',
    items: [
      {
        kind: 'mcq',
        prompt: 'How many elements on a page may share one id?',
        options: [
          { text: 'As many as you like', why: 'That\'s a class.' },
          { text: 'Only one' },
          { text: 'Two', why: 'An id is unique on the page.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Style the gigs section heading by its id: #gigs gets color #FF9600',
        starter: '<style>\n\n</style>\n<h2 id="gigs">Gigs</h2>\n',
        solution: '<style>\n  #gigs { color: #FF9600; }\n</style>\n<h2 id="gigs">Gigs</h2>\n',
        hint: '#gigs { color: #FF9600; }',
        checks: [
          { message: 'Orange heading', dom: { selector: '#gigs', style: 'color', styleValue: '#FF9600' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Class or id?',
        groups: ['Class', 'Id'],
        items: [
          { text: 'Styling all six beat cards', group: 0 },
          { text: 'The target of a "Jump to gigs" link', group: 1 },
          { text: 'Making three cards featured', group: 0 },
          { text: 'One unique section name', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each selector to what it picks.',
        pairs: [
          ['#gigs', 'The one element with id="gigs"'],
          ['.featured', 'Every element with class="featured"'],
          ['h2', 'Every h2'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What colour is the heading?',
        code: '#book { color: #FF9600; }\n.title { color: #F0438A; }\n\n<h2 id="book" class="title">Book me</h2>',
        language: 'html',
        options: [
          { text: 'Pink: the class comes later', why: 'Strength is checked before order. The id wins.' },
          { text: 'Cream', why: 'Both rules match; the id wins.' },
          { text: 'Orange: the id rule is stronger' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'I gave all six cards id="card". Is that okay?',
        options: [
          { text: 'No, an id must be unique. Use class="beat-card" for all six.' },
          { text: 'Yes, ids can repeat.', why: 'Ids must be unique on the page.' },
          { text: 'Use id="card1" to id="card6" and six rules.', why: 'One class does it in one rule.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the selector that won\'t match id="gigs".',
        language: 'css',
        lines: ['#gigs { padding: 16px; }', '.gigs { margin-top: 0; }', '#gigs h2 { color: #FF9600; }'],
        bug: 1,
        explanation: 'A dot looks for a class. An id needs #.',
        fix: '#gigs { margin-top: 0; }',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the jump link and its target.',
        language: 'html',
        template: '<a href="[[1]]book">Book me</a>\n<h2 [[2]]="book">Book me</h2>',
        blanks: [['#'], ['id']],
        distractors: ['.', 'class', 'name'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'For styling many elements the same way, use a class or an id? (one word)',
        answers: ['class', 'a class'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why is it hard to override an id rule?',
        options: [
          { text: 'Ids are read-only', why: 'They\'re just very strong selectors.' },
          { text: 'Browsers lock ids', why: 'It\'s about how strong the selector is.' },
          { text: 'It\'s stronger than any number of class rules, wherever they are' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Do you use any ids on your page? Are they for jump links or for styling?',
    starters: ['I use ids for...', 'I\'ll switch...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'If you style anything by #id on your page, give it a class instead and keep the id only for jump links.',
  },
  notes: 'id must be unique in the document (HTML spec). Id selectors outrank any number of class selectors in specificity (Selectors Level 4). Labels for form fields (for/id) arrive in Course 3.',
};

export default lesson;
