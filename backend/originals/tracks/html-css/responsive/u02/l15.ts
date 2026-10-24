import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 2 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14 (naming, base + extra classes, span, inheritance, refactoring). */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: beats and gigs',
  summary: 'The site now has beat cards and gig cards, all sharing one .card class, with a gold "Sold out" tag on last month\'s show. Not one element selector left for the cards. Quick checkpoint.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Name classes for their role', 'Share styles with a base class', 'Predict what inherits'],
  learn: [
    {
      kind: 'story',
      title: 'One family of cards',
      beats: [
        { speaker: 'narrator', text: 'Beat cards with orange borders. Gig cards with cream ones. Same padding, same corners, all from .card.' },
        { speaker: 'efua', text: 'They look like they belong together now. Like a family.' },
        { speaker: 'tey', text: 'That\'s what a base class does. Let\'s check it\'s solid.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: one family of cards.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Give both articles class="card", and make the gig card a gig-card too (class="card gig-card")',
        starter: '<style>\n  .card { padding: 16px; border: 2px solid #FF9600; }\n  .gig-card { border-color: #FFF6E5; }\n</style>\n<article><h2>Sunrise in Osu</h2></article>\n<article><h2>Sound Up Saturdays</h2></article>\n',
        solution: '<style>\n  .card { padding: 16px; border: 2px solid #FF9600; }\n  .gig-card { border-color: #FFF6E5; }\n</style>\n<article class="card"><h2>Sunrise in Osu</h2></article>\n<article class="card gig-card"><h2>Sound Up Saturdays</h2></article>\n',
        hint: 'class="card" and class="card gig-card"',
        checks: [
          { message: 'Two cards', dom: { selector: 'article.card', count: 2 } },
          { message: 'One gig card', dom: { selector: '.card.gig-card', count: 1 } },
          { message: 'With a cream border', dom: { selector: '.gig-card', style: 'border-top-color', styleValue: '#FFF6E5' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest name, or one that will lie?',
        groups: ['Honest', 'Will lie'],
        items: [
          { text: '.gig-card', group: 0 },
          { text: '.cream-border', group: 1 },
          { text: '.sold-out', group: 0 },
          { text: '.small-gold', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Does the h2 inside the card get the card\'s padding?',
        code: '.card { padding: 16px; color: #FFF6E5; }\n\n<article class="card"><h2>Gigs</h2></article>',
        language: 'html',
        options: [
          { text: 'Both padding and colour', why: 'padding doesn\'t inherit.' },
          { text: 'No padding, but it does get the cream colour' },
          { text: 'Neither', why: 'color inherits.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the rule that repeats the base class.',
        language: 'css',
        lines: ['.card { padding: 16px; border-radius: 12px; }', '.gig-card { border-color: #FFF6E5; }', '.beat-card { padding: 16px; border-radius: 12px; }'],
        bug: 2,
        explanation: '.card already gives every card that padding and radius.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each piece to its job.',
        pairs: [
          ['.card', 'The shared base'],
          ['.gig-card', 'Only what\'s different'],
          ['<span class="tag">', 'A label inside a line'],
          ['color: inherit', 'Follow the parent on purpose'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'I want to rename .card to .tile. What do I need to change?',
        options: [
          { text: 'Just the CSS.', why: 'The HTML would still say card.' },
          { text: 'Nothing, the browser works it out.', why: 'Names must match exactly.' },
          { text: 'Every class="card" in the HTML and every .card in the CSS. Then check the page.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Which comes first when switching a site to classes?',
        options: [
          { text: 'Adding the classes to the HTML' },
          { text: 'Deleting the old rules', why: 'That\'s last, once it\'s safe.' },
          { text: 'Renaming every file', why: 'Classes go in first.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Tag the gig.',
        language: 'html',
        template: 'Sound Up Saturdays <span [[1]]="[[2]]">Sold out</span>',
        blanks: [['class'], ['tag', 'sold-out']],
        distractors: ['id', 'style', 'gold'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Does border inherit from a parent? (yes or no)',
        answers: ['no'],
        placeholder: 'Yes or no',
      },
      {
        kind: 'writeCode',
        prompt: 'Make links in gig cards match the card\'s text: .gig-card a gets color inherit',
        starter: '<style>\n  a { color: #FF9600; }\n  .gig-card { color: #FFF6E5; }\n\n</style>\n<article class="card gig-card"><a href="#tickets">Tickets</a></article>\n',
        solution: '<style>\n  a { color: #FF9600; }\n  .gig-card { color: #FFF6E5; }\n  .gig-card a { color: inherit; }\n</style>\n<article class="card gig-card"><a href="#tickets">Tickets</a></article>\n',
        hint: '.gig-card a { color: inherit; }',
        checks: [
          { message: 'Links follow the card', dom: { selector: '.gig-card a', style: 'color', styleValue: 'inherit' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Do the repeated parts of your page look like one family yet? What would make them match?',
    starters: ['They look...', 'A base class would...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Give your repeated parts one base class, and keep only the differences in their own classes.',
  },
  notes: 'Checkpoint 3. Reviews l11–l14.',
};

export default lesson;
