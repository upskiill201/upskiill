import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 2 · Lesson 12 — a small class-based stylesheet: .card base, .beat-card/.gig-card, .play-button, span .tag. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'One base, many cards',
  summary: 'Kofi now has beat cards and gig cards. They share most styles but not all. Miracle sketches a tidy plan: one base class, a few extras, and a tag. Tap each line.',
  minutes: 11,
  outcomes: ['Put shared styles in a base class', 'Add a small extra class for each kind of card', 'Wrap a few words in span to give them a class'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part of the plan',
      text: '.card { background-color: #1F2E52; border: 2px solid #FF9600; border-radius: 12px; padding: 16px; margin-bottom: 16px; }\n.gig-card { border-color: #FFF6E5; }\n.play-button { display: inline-block; padding: 12px 16px; background-color: #FF9600; color: #14213D; }\n.tag { background-color: #FFC83D; color: #14213D; padding: 2px 8px; border-radius: 8px; }\n\n<article class="card beat-card">...</article>\n<article class="card gig-card">Sound Up Saturdays <span class="tag">Sold out</span></article>',
      hotspots: [
        { phrase: '.card {', note: 'The base: everything every card shares. Change the radius here, and every card on the site changes.' },
        { phrase: '.gig-card { border-color: #FFF6E5; }', note: 'The extra: gig cards differ in one way, a cream border. Only the difference is written.' },
        { phrase: '.play-button', note: 'A class for a job, not for one element. Any link can become a play button.' },
        { phrase: 'class="card beat-card"', note: 'Base plus kind. beat-card can stay empty for now: it still says what the card is.' },
        { phrase: '<span class="tag">Sold out</span>', note: 'span wraps a few words without changing their meaning, so you can give them a class. On its own it changes nothing.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Beat cards and gig cards',
      caption: 'Both are cards. The gig card adds one difference and a tag.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .card { background-color: #1F2E52; border: 2px solid #FF9600; border-radius: 12px; padding: 16px; margin-bottom: 16px; }\n  .gig-card { border-color: #FFF6E5; }\n  .tag { background-color: #FFC83D; color: #14213D; padding: 2px 8px; border-radius: 8px; }\n</style>\n<article class="card beat-card"><h2>Sunrise in Osu</h2></article>\n<article class="card gig-card"><h2>Sound Up Saturdays <span class="tag">Sold out</span></h2></article>\n',
      challenge: 'Change border-radius in .card to 0. Both kinds of card change at once.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Shared styles in a base class; differences in small extra classes. span gives a few words a class.',
    },
  ],
  apply: {
    scenario: 'Miracle\'s plan.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each class to its job.',
        pairs: [
          ['.card', 'Everything all cards share'],
          ['.gig-card', 'What\'s different about gigs'],
          ['.tag', 'A small label in a line of text'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Make the gig a card too: give it class="card gig-card"',
        starter: '<style>\n  .card { border: 2px solid #FF9600; padding: 16px; }\n  .gig-card { border-color: #FFF6E5; }\n</style>\n<article class="card beat-card"><h2>Sunrise in Osu</h2></article>\n<article><h2>Sound Up Saturdays</h2></article>\n',
        solution: '<style>\n  .card { border: 2px solid #FF9600; padding: 16px; }\n  .gig-card { border-color: #FFF6E5; }\n</style>\n<article class="card beat-card"><h2>Sunrise in Osu</h2></article>\n<article class="card gig-card"><h2>Sound Up Saturdays</h2></article>\n',
        hint: '<article class="card gig-card">',
        checks: [
          { message: 'Two cards', dom: { selector: '.card', count: 2 } },
          { message: 'The gig card has a cream border', dom: { selector: '.gig-card', style: 'border-top-color', styleValue: '#FFF6E5' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why put shared styles in .card instead of in .beat-card and .gig-card?',
        options: [
          { text: 'Then they live in one place, and one change updates every card' },
          { text: 'Extra classes can\'t hold borders', why: 'They can. It\'s about not repeating.' },
          { text: 'Browsers prefer short names', why: 'It\'s about one place to change.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Goes in .card, or in .gig-card?',
        groups: ['.card (shared)', '.gig-card (different)'],
        items: [
          { text: 'padding: 16px', group: 0 },
          { text: 'border-color: #FFF6E5', group: 1 },
          { text: 'border-radius: 12px', group: 0 },
          { text: 'Only gigs have this', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that repeats what .card already does.',
        language: 'css',
        lines: ['.card { padding: 16px; border-radius: 12px; }', '.gig-card { padding: 16px; border-radius: 12px; border-color: #FFF6E5; }', '.tag { padding: 2px 8px; }'],
        bug: 1,
        explanation: 'padding and radius already come from .card. Only the border colour is different.',
        fix: '.gig-card { border-color: #FFF6E5; }',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'How do I style just the words "Sold out" inside the heading?',
        options: [
          { text: 'Wrap them in <span class="tag">Sold out</span> and style .tag.' },
          { text: 'Give the whole h2 a class.', why: 'That styles the whole heading.' },
          { text: 'Make a new h3.', why: 'That changes the meaning. span just wraps words.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What changes on the page?',
        code: '.card { border-radius: 0; }\n\n<article class="card beat-card">...</article>\n<article class="card gig-card">...</article>',
        language: 'html',
        options: [
          { text: 'Both cards get square corners' },
          { text: 'Only the beat card', why: 'Both have the card class.' },
          { text: 'Nothing', why: 'Both cards share .card.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Tag the gig as sold out.',
        language: 'html',
        template: 'Sound Up Saturdays <[[1]] class="[[2]]">Sold out</span>',
        blanks: [['span'], ['tag']],
        distractors: ['div', 'p', 'sold'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which element wraps a few words inside a line so you can give them a class? (tag name)',
        answers: ['span', '<span>'],
        placeholder: 'A tag',
      },
      {
        kind: 'writeCode',
        prompt: 'Style the Sold out tag: .tag gets background-color #FFC83D and padding 2px 8px',
        starter: '<style>\n  .tag { color: #14213D; }\n</style>\n<h2>Sound Up Saturdays <span class="tag">Sold out</span></h2>\n',
        solution: '<style>\n  .tag { color: #14213D; background-color: #FFC83D; padding: 2px 8px; }\n</style>\n<h2>Sound Up Saturdays <span class="tag">Sold out</span></h2>\n',
        hint: '.tag { background-color: #FFC83D; padding: 2px 8px; }',
        checks: [
          { message: 'Gold tag', dom: { selector: '.tag', style: 'background-color', styleValue: '#FFC83D' } },
          { message: 'Room around the words', dom: { selector: '.tag', style: 'padding-left', styleValue: '8px' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What could be the base class on your page, and what would the extras be?',
    starters: ['My base is...', 'The extras are...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Pull the shared styles of two similar parts of your page into one base class, and keep only the differences in their own classes.',
  },
  notes: 'span is a generic inline container with no meaning (HTML spec). Tag is night text on gold #FFC83D (about 10:1); pink is avoided for small text (night on pink ≈ 4.47:1).',
};

export default lesson;
