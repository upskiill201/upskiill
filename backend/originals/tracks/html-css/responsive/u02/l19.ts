import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 2 · Lesson 19 — the class-based v1.2 stylesheet, read top to bottom. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'A stylesheet you can change',
  summary: 'Kofi\'s new style.css is shorter than the old one, and every rule has one job. Miracle reads it and says, "I could hand this to anyone." Tap each part.',
  minutes: 11,
  outcomes: ['Read a class-based stylesheet', 'Explain why each rule\'s specificity is low and even', 'Spot the one line that restyles every card'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part of style.css',
      text: '* { box-sizing: border-box; }\nbody { margin: 0; background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\nmain { max-width: 640px; margin: 0 auto; padding: 16px; }\n\n.card { background-color: #1F2E52; border: 2px solid #FF9600; border-radius: 12px; padding: 16px; margin-bottom: 16px; }\n.card h2 { margin: 0 0 8px; }\n.gig-card { border-color: #FFF6E5; }\n.featured { border-color: #F0438A; }\n\n.play-button { display: inline-block; padding: 12px 16px; background-color: #FF9600; color: #14213D; border-radius: 8px; }\n.tag { background-color: #FFC83D; color: #14213D; padding: 2px 8px; border-radius: 8px; }',
      hotspots: [
        { phrase: '* { box-sizing: border-box; }', note: 'The base layer: page-wide rules on elements. These almost never change.' },
        { phrase: 'border: 2px solid #FF9600;', note: 'The one line that restyles every card on the site. Change the colour here and beats and gigs all follow.' },
        { phrase: '.gig-card { border-color: #FFF6E5; }', note: 'An extra: only what\'s different about gigs.' },
        { phrase: '.featured { border-color: #F0438A; }', note: 'Comes after .gig-card, so if a card were both, featured would win the tie. Order is doing its job.' },
        { phrase: '.play-button', note: 'A class for a job. Any link can become a play button by adding it.' },
        { phrase: '.tag', note: 'Night text on gold: about 10 to 1, readable even this small.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Mensah Beats v1.2',
      caption: 'The whole class plan: beat cards, a gig card, a featured beat, play buttons and a tag.',
      code: '<style>\n  * { box-sizing: border-box; }\n  body { margin: 0; background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  main { max-width: 640px; margin: 0 auto; padding: 16px; }\n  .card { background-color: #1F2E52; border: 2px solid #FF9600; border-radius: 12px; padding: 16px; margin-bottom: 16px; }\n  .card h2 { margin: 0 0 8px; }\n  .gig-card { border-color: #FFF6E5; }\n  .featured { border-color: #F0438A; }\n  .play-button { display: inline-block; padding: 12px 16px; background-color: #FF9600; color: #14213D; border-radius: 8px; }\n  .tag { background-color: #FFC83D; color: #14213D; padding: 2px 8px; border-radius: 8px; }\n</style>\n<main>\n  <article class="card beat-card featured"><h2>Sunrise in Osu</h2><a class="play-button" href="#play">Play</a></article>\n  <article class="card beat-card"><h2>Jollof Bounce</h2><a class="play-button" href="#play">Play</a></article>\n  <article class="card gig-card"><h2>Sound Up Saturdays <span class="tag">Sold out</span></h2></article>\n</main>\n',
      challenge: 'Change border-radius in .card to 24px. One line, every card.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Elements for the base, one class per job, extras for differences. Low, even specificity, and order breaks ties.',
    },
  ],
  apply: {
    scenario: 'Reading v1.2.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each rule to its job.',
        pairs: [
          ['.card', 'What every card shares'],
          ['.gig-card', 'What\'s different about gigs'],
          ['.play-button', 'Turns a link into a button'],
          ['.tag', 'A small label'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which one line changes the border colour of every card?',
        options: [
          { text: 'The border in .card' },
          { text: '.featured', why: 'That\'s only featured cards.' },
          { text: 'body', why: 'border doesn\'t inherit.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the Jollof Bounce link a play button: give it class="play-button"',
        starter: '<style>\n  .play-button { display: inline-block; padding: 12px 16px; background-color: #FF9600; color: #14213D; }\n</style>\n<article class="card"><h2>Jollof Bounce</h2><a href="#play">Play</a></article>\n',
        solution: '<style>\n  .play-button { display: inline-block; padding: 12px 16px; background-color: #FF9600; color: #14213D; }\n</style>\n<article class="card"><h2>Jollof Bounce</h2><a class="play-button" href="#play">Play</a></article>\n',
        hint: '<a class="play-button" href="#play">',
        checks: [
          { message: 'It\'s a play button', dom: { selector: 'a.play-button', count: 1 } },
          { message: 'And looks like one', dom: { selector: 'a', style: 'display', styleValue: 'inline-block' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Score 0-1-0 or 0-1-1?',
        groups: ['0-1-0', '0-1-1'],
        items: [
          { text: '.card', group: 0 },
          { text: '.card h2', group: 1 },
          { text: '.featured', group: 0 },
          { text: '.gig-card a', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the rule that doesn\'t fit this stylesheet\'s plan.',
        language: 'css',
        lines: ['.card { padding: 16px; }', '#sunrise { border-color: #F0438A !important; }', '.featured { border-color: #F0438A; }'],
        bug: 1,
        explanation: 'An id and !important, when .featured already does the job with a flat class.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Why does .featured come after .gig-card?',
        options: [
          { text: 'Same score, so the later one wins. A featured gig would get the featured colour.' },
          { text: 'Alphabetical order.', why: 'Order breaks ties between equal scores.' },
          { text: 'It doesn\'t matter.', why: 'With equal scores, order decides.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'A card has class="card gig-card featured". What colour is its border?',
        code: '.card { border: 2px solid #FF9600; }\n.gig-card { border-color: #FFF6E5; }\n.featured { border-color: #F0438A; }',
        language: 'css',
        options: [
          { text: 'Pink: .featured comes last among equal scores' },
          { text: 'Cream', why: '.featured comes later with the same score.' },
          { text: 'Orange', why: 'Both extras come after .card.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the class plan.',
        language: 'html',
        template: '<article class="[[1]] gig-card">Sound Up Saturdays <span class="[[2]]">Sold out</span></article>',
        blanks: [['card'], ['tag']],
        distractors: ['featured', 'play-button', 'id'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many lines do you change to restyle every card\'s border colour? (a number)',
        answers: ['1', 'one'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the stylesheet\'s sections in order.',
        lines: ['Page-wide element rules (*, body, main)', 'The base .card class', 'Extras (.gig-card, .featured)', 'Small jobs (.play-button, .tag)'],
      },
    ],
  },
  reflect: {
    prompt: 'Could you hand your stylesheet to someone else and have them understand it? What would confuse them?',
    starters: ['They\'d understand...', 'They\'d be confused by...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Reorder your style.css into the same four sections, and add a short /* comment */ above each.',
  },
  notes: 'Ordering a stylesheet from generic to specific (base, components, variations) is a common architecture convention. CSS comments /* */ were introduced in Course 1.',
};

export default lesson;
