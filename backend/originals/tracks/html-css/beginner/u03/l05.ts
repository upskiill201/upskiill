import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4. Story beat: Clinton's link test. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Clinton\'s link test',
  summary: 'Clinton, still Head of Quality (unpaid), taps every single link on Kofi\'s page and reports back. Three are broken and one says "click here". Links, addresses, email and call links, mixed together.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Write links with clear text', 'Choose full addresses or file names', 'Make email and call links'],
  learn: [
    {
      kind: 'story',
      title: 'The link report',
      beats: [
        { speaker: 'narrator', text: 'Thursday. A message from Clinton: "LINK REPORT. Tested every link. Results: bad."' },
        { speaker: 'clinton', text: 'Instagram link goes nowhere. "Book me" opens some weird page. Your call link didn\'t call. And one link just says "click here". Click WHAT?' },
        { speaker: 'kofi', text: 'Okay, okay. Give me ten minutes.' },
        { speaker: 'tey', text: 'Four bugs, four lessons. Let\'s fix Clinton\'s list.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: fix every link on Clinton\'s report.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Bug 1: the Instagram link has no https://. Fix it so it goes to https://instagram.com/mensahbeats',
        starter: '<p><a href="instagram.com/mensahbeats">Follow Mensah Beats on Instagram</a></p>\n',
        solution: '<p><a href="https://instagram.com/mensahbeats">Follow Mensah Beats on Instagram</a></p>\n',
        hint: 'Add https:// to the start of the href.',
        checks: [{ message: 'A full address to Instagram', dom: { selector: 'a[href^="https://instagram.com"]', count: 1 } }],
      },
      {
        kind: 'findBug',
        prompt: 'Bug 2: tap the link that opens "some weird page" instead of an email.',
        language: 'html',
        lines: ['<a href="gigs.html">All my gigs</a>', '<a href="book@mensahbeats.com">Book me</a>', '<a href="https://instagram.com/mensahbeats">Instagram</a>'],
        bug: 1,
        fix: '<a href="mailto:book@mensahbeats.com">Book me</a>',
        explanation: 'It needs mailto: in front, or the browser treats the email as a file name.',
      },
      {
        kind: 'writeCode',
        prompt: 'Bug 3: the call link uses phone: instead of tel:. Fix it',
        starter: '<p><a href="phone:+233201234567">Call me</a></p>\n',
        solution: '<p><a href="tel:+233201234567">Call me</a></p>\n',
        hint: 'Change phone: to tel:.',
        checks: [{ message: 'A working call link', dom: { selector: 'a[href="tel:+233201234567"]', count: 1 } }],
      },
      {
        kind: 'writeCode',
        prompt: 'Bug 4: change the click here link so its text says See all my gigs',
        starter: '<p>For my gigs, <a href="gigs.html">click here</a>.</p>\n',
        solution: '<p><a href="gigs.html">See all my gigs</a></p>\n',
        hint: 'Change the link text to See all my gigs.',
        checks: [
          { message: 'The link says See all my gigs', dom: { selector: 'a', text: 'See all my gigs' } },
          { message: 'It still goes to gigs.html', dom: { selector: 'a[href="gigs.html"]', count: 1 } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each href to where it goes.',
        pairs: [
          ['https://instagram.com/mensahbeats', 'Another website'],
          ['gigs.html', 'Kofi\'s own gigs page'],
          ['mailto:book@mensahbeats.com', 'An email'],
          ['tel:+233201234567', 'A phone call'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Clinton wants every link to open a new tab. What\'s the honest answer?',
        options: [
          { text: 'Same tab is what people expect; a new tab only when it really helps, and say so' },
          { text: 'Yes, always', why: 'Surprise tabs annoy people and break the Back button.' },
          { text: 'Links can\'t open new tabs', why: 'They can, with target="_blank". It\'s just best used rarely.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good link text, or vague?',
        groups: ['Good', 'Vague'],
        items: [
          { text: 'Email book@mensahbeats.com', group: 0 },
          { text: 'Here', group: 1 },
          { text: 'Listen to Night Bus to Kumasi', group: 0 },
          { text: 'Click this', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does the visitor tap?',
        code: '<p>Questions? <a href="mailto:book@mensahbeats.com">Email me</a> any time.</p>',
        language: 'html',
        options: [
          { text: 'Questions?', why: 'That\'s plain text, outside the link.' },
          { text: 'Email me' },
          { text: 'any time', why: 'Outside the link too.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'All fixed? Prove it. What\'s the difference between gigs.html and https://instagram.com?',
        options: [
          { text: 'They\'re the same.', why: 'One stays on Kofi\'s site, the other leaves it.' },
          { text: 'gigs.html is a page on my site; the full address goes to another site.' },
          { text: 'One is newer.', why: 'Age has nothing to do with it. It\'s inside vs. outside the site.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the menu link.',
        language: 'html',
        template: '<a [[1]]="[[2]]">Home</a>',
        blanks: [['href'], ['index.html']],
        distractors: ['src', 'home.link', 'tel:'],
      },
      {
        kind: 'writeCode',
        prompt: 'Rebuild Find me: an h2 Find me and a list with a link to https://instagram.com/mensahbeats and an email link to book@mensahbeats.com, both with clear text',
        starter: '',
        solution: '<h2>Find me</h2>\n<ul>\n  <li><a href="https://instagram.com/mensahbeats">Mensah Beats on Instagram</a></li>\n  <li><a href="mailto:book@mensahbeats.com">Email book@mensahbeats.com</a></li>\n</ul>\n',
        hint: 'h2, then a ul with two li, each holding an a.',
        checks: [
          { message: 'A heading Find me', dom: { selector: 'h2', text: 'Find me' } },
          { message: 'An Instagram link in the list', dom: { selector: 'li a[href^="https://instagram.com"]', count: 1 } },
          { message: 'An email link in the list', dom: { selector: 'li a[href^="mailto:"]', count: 1 } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Clinton tested every link by tapping it. How will you test the links on your own page?',
    starters: ['I\'ll test them by...', 'The one most likely to break is...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Do a Clinton: open any small business website and tap every link. Count how many are broken or vague.',
  },
  notes: 'Checkpoint 1 of Chapter 3: reviews a/href (l01), link text (l02), absolute vs relative (l03), mailto/tel/new tab (l04).',
};

export default lesson;
