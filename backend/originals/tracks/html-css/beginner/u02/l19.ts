import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 19 — read a finished text page and name every element. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Read a finished page',
  summary: 'Before he builds v0.2, Miracle sends Kofi a finished page to read: a gig listing from a Lagos venue. Every tag from this chapter is in it. Can you name them all?',
  minutes: 12,
  outcomes: ['Read a full text page and name every element', 'Explain why each tag was chosen', 'Improve one part of a page that\'s already good'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap every part of the Lagos venue\'s page',
      text: '<h1>The Yard, Lagos</h1>\n<p>Live music <strong>every Friday</strong>.</p>\n<h2>This week</h2>\n<ol>\n  <li>DJ Tolu</li>\n  <li>The Brass Bus</li>\n</ol>\n<dl>\n  <dt>Doors</dt>\n  <dd>7pm</dd>\n</dl>\n<blockquote><p>Best Friday in Yaba.</p></blockquote>\n<details>\n  <summary>Getting here</summary>\n  <p>Ten minutes from Yaba bus stop.</p>\n</details>\n<hr>\n<p><small>&copy; 2026 The Yard</small></p>',
      hotspots: [
        { phrase: '<strong>every Friday</strong>', note: 'strong: the one thing a visitor must not miss. Used once, so it stands out.' },
        { phrase: '<ol>', note: 'ol, because the running order matters: DJ Tolu plays first.' },
        { phrase: '<dt>Doors</dt>', note: 'A description list: Doors is the name, 7pm its value.' },
        { phrase: '<blockquote><p>Best Friday in Yaba.</p></blockquote>', note: 'A real quote from a visitor, marked as a quote.' },
        { phrase: '<summary>Getting here</summary>', note: 'Directions behind a tap: useful, but not everyone needs them.' },
        { phrase: '<hr>', note: 'A change of topic before the footer: the listings are over.' },
        { phrase: '<small>&copy; 2026 The Yard</small>', note: 'Fine print in small, with the copyright sign written as &copy;.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The Yard\'s page, live',
      caption: 'The same page, rendered. Tap "Getting here" to open it. Notice how quickly you can scan it.',
      code: '<h1>The Yard, Lagos</h1>\n<p>Live music <strong>every Friday</strong>.</p>\n<h2>This week</h2>\n<ol>\n  <li>DJ Tolu</li>\n  <li>The Brass Bus</li>\n</ol>\n<dl>\n  <dt>Doors</dt>\n  <dd>7pm</dd>\n</dl>\n<blockquote><p>Best Friday in Yaba.</p></blockquote>\n<details>\n  <summary>Getting here</summary>\n  <p>Ten minutes from Yaba bus stop.</p>\n</details>\n<hr>\n<p><small>&copy; 2026 The Yard</small></p>\n',
      challenge: 'Add a third act to the running order: Mensah Beats.',
    },
  ],
  apply: {
    scenario: 'Kofi studies a page that works.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each part of The Yard\'s page to its tag.',
        pairs: [
          ['The running order', 'ol'],
          ['Doors: 7pm', 'dl'],
          ['A visitor\'s words', 'blockquote'],
          ['Getting here, on tap', 'details'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is the running order an ol and not a ul?',
        options: [
          { text: 'Because the order matters: who plays first' },
          { text: 'Because ol looks nicer', why: 'Tags are chosen for meaning. Order matters here, so ol.' },
          { text: 'No reason, they\'re the same', why: 'They\'re different: ol is ordered, ul isn\'t.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Kofi got booked! Add Mensah Beats as the third act in the running order',
        starter: '<h2>This week</h2>\n<ol>\n  <li>DJ Tolu</li>\n  <li>The Brass Bus</li>\n</ol>\n',
        solution: '<h2>This week</h2>\n<ol>\n  <li>DJ Tolu</li>\n  <li>The Brass Bus</li>\n  <li>Mensah Beats</li>\n</ol>\n',
        hint: 'A new li before </ol>.',
        checks: [
          { message: 'Three acts', dom: { selector: 'ol > li', count: 3 } },
          { message: 'Mensah Beats is on the bill', dom: { selector: 'ol li', text: 'Mensah Beats' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Always shown, or fine behind a tap?',
        groups: ['Always shown', 'Behind a tap'],
        items: [
          { text: 'Who\'s playing this week', group: 0 },
          { text: 'Directions from the bus stop', group: 1 },
          { text: 'What time doors open', group: 0 },
          { text: 'The history of the venue', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'So what\'s the one thing you\'re stealing from this page for yours?',
        options: [
          { text: 'Nothing, mine is better.', why: 'Miracle sent it because there\'s something to learn. Kofi\'s page isn\'t done yet.' },
          { text: 'The whole page. I\'ll change the name.', why: 'That\'s copying, not learning. Take the ideas, not the page.' },
          { text: 'The idea of a gig card with a dl, and directions behind a tap.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'The Yard\'s developer made one slip. Tap it.',
        language: 'html',
        lines: ['<dl>', '  <dt>Doors</dt>', '  <dd>7pm</dd>', '  <dt>Price</dt>', '  <dt>2,000 naira</dt>', '</dl>'],
        bug: 4,
        fix: '  <dd>2,000 naira</dd>',
        explanation: 'The price is a value, so it goes in dd, not dt.',
      },
      {
        kind: 'writeCode',
        prompt: 'Add a Price pair to The Yard\'s gig card: Price / 2,000 naira',
        starter: '<dl>\n  <dt>Doors</dt>\n  <dd>7pm</dd>\n</dl>\n',
        solution: '<dl>\n  <dt>Doors</dt>\n  <dd>7pm</dd>\n  <dt>Price</dt>\n  <dd>2,000 naira</dd>\n</dl>\n',
        hint: 'A dt Price and a dd 2,000 naira before </dl>.',
        checks: [
          { message: 'A Price name', dom: { selector: 'dt', text: 'Price' } },
          { message: 'Its value 2,000 naira', dom: { selector: 'dd', text: '2,000 naira' } },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does a visitor see before they tap anything?',
        code: '<details>\n  <summary>Getting here</summary>\n  <p>Ten minutes from Yaba bus stop.</p>\n</details>',
        language: 'html',
        options: [
          { text: 'Both lines', why: 'The paragraph stays hidden until they tap.' },
          { text: 'Only "Getting here"' },
          { text: 'Nothing', why: 'The summary always shows. It\'s what they tap.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The footer\'s fine print is inside which tag?',
        answers: ['small', '<small>'],
        placeholder: 'One word',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the venue\'s quote.',
        language: 'html',
        template: '<[[1]]><p>Best Friday in Yaba.</p></[[2]]>',
        blanks: [['blockquote'], ['blockquote']],
        distractors: ['cite', 'quote', 'mark'],
      },
    ],
  },
  reflect: {
    prompt: 'Which idea from The Yard\'s page would make your own page better?',
    starters: ['I\'d borrow the idea of...', 'Because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Find an events page for a venue near you. View the source (or just look) and spot the lists, the gig details and the fine print.',
  },
  notes: 'The Yard (Yaba, Lagos), DJ Tolu and The Brass Bus are fictional. Reviews the whole chapter as a read-the-code lesson before the Chapter Challenge.',
};

export default lesson;
