import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4 — mailto:, tel:, and target="_blank" used sparingly. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Email, call, new tab',
  summary: 'The organiser wants to book Kofi for a second night. She needs to email him or call him, in one tap. Links can open an email, start a phone call, or open in a new tab, when that\'s really what people want.',
  minutes: 11,
  outcomes: ['Make an email link with mailto:', 'Make a call link with tel:', 'Know when a new tab helps and when it annoys'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap the parts of Kofi\'s Book me section',
      text: '<h2>Book me</h2>\n<p><a href="mailto:book@mensahbeats.com">Email book@mensahbeats.com</a></p>\n<p><a href="tel:+233201234567">Call +233 20 123 4567</a></p>\n<p><a href="https://soundupsaturdays.com" target="_blank">Sound Up Saturdays (opens in a new tab)</a></p>',
      hotspots: [
        { phrase: 'mailto:book@mensahbeats.com', note: 'mailto: opens the visitor\'s email app with Kofi\'s address already filled in.' },
        { phrase: 'tel:+233201234567', note: 'tel: starts a phone call on a phone. Use the full international number, no spaces: +233 is Ghana\'s country code.' },
        { phrase: 'Email book@mensahbeats.com', note: 'The link text shows the address too, so people on computers without an email app can still copy it.' },
        { phrase: 'target="_blank"', note: 'Opens the link in a new tab. Use it rarely: people expect links to open in the same tab, and the Back button stops working in the new one.' },
        { phrase: '(opens in a new tab)', note: 'If you do use a new tab, say so in the link text, so nobody is surprised.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Book me in one tap',
      caption: 'An email link and a call link. Tap them in the page to see where they\'d go.',
      code: '<h2>Book me</h2>\n<p><a href="mailto:book@mensahbeats.com">Email book@mensahbeats.com</a></p>\n<p><a href="tel:+233201234567">Call +233 20 123 4567</a></p>\n',
      challenge: 'Add a third way: a link to https://wa.me/233201234567 that says Message me on WhatsApp.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'A public email or phone number gets spam. Kofi uses a booking email, not his personal one. On your own page, never put your personal number.',
    },
  ],
  apply: {
    scenario: 'Kofi makes booking him easy.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each link to what it does.',
        pairs: [
          ['mailto:', 'Opens an email'],
          ['tel:', 'Starts a phone call'],
          ['target="_blank"', 'Opens in a new tab'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Add an email link to book@mensahbeats.com with the text Email me',
        starter: '<h2>Book me</h2>\n',
        solution: '<h2>Book me</h2>\n<p><a href="mailto:book@mensahbeats.com">Email me</a></p>\n',
        hint: '<a href="mailto:book@mensahbeats.com">Email me</a>',
        checks: [
          { message: 'An email link', dom: { selector: 'a[href^="mailto:"]', count: 1 } },
          { message: 'It goes to book@mensahbeats.com', dom: { selector: 'a[href="mailto:book@mensahbeats.com"]', count: 1 } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which href starts a phone call?',
        options: [
          { text: 'phone:+233201234567', why: 'Close, but it\'s tel:.' },
          { text: 'tel:+233201234567' },
          { text: 'call:+233201234567', why: 'It\'s tel:, short for telephone.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a call link to +233201234567 with the text Call me',
        starter: '<h2>Book me</h2>\n',
        solution: '<h2>Book me</h2>\n<p><a href="tel:+233201234567">Call me</a></p>\n',
        hint: '<a href="tel:+233201234567">Call me</a>',
        checks: [
          { message: 'A call link', dom: { selector: 'a[href^="tel:"]', count: 1 } },
          { message: 'It says Call me', dom: { selector: 'a', text: 'Call me' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'New tab, or same tab?',
        groups: ['Same tab (usual)', 'New tab is OK'],
        items: [
          { text: 'Kofi\'s gigs page on his own site', group: 0 },
          { text: 'A long PDF of his rider someone will read alongside the page', group: 1 },
          { text: 'His Instagram', group: 0 },
          { text: 'The home page', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Make EVERY link open a new tab, so people never leave your site!',
        options: [
          { text: 'Nice idea, I\'ll do it.', why: 'People hate surprise tabs, and on phones they pile up. Let visitors decide.' },
          { text: 'People expect links to open in the same tab. I\'ll only use a new tab when it really helps, and say so.' },
          { text: 'I\'ll remove all links instead.', why: 'Then nobody can follow him or book him.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the email link that won\'t open an email.',
        language: 'html',
        lines: ['<a href="mailto:book@mensahbeats.com">Email me</a>', '<a href="book@mensahbeats.com">Book me</a>', '<a href="tel:+233201234567">Call me</a>'],
        bug: 1,
        fix: '<a href="mailto:book@mensahbeats.com">Book me</a>',
        explanation: 'Without mailto:, the browser looks for a page called book@mensahbeats.com on Kofi\'s site.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What happens when a visitor taps this on a phone?',
        code: '<a href="tel:+233201234567">Call Mensah Beats</a>',
        language: 'html',
        options: [
          { text: 'The phone offers to call the number' },
          { text: 'It opens a website', why: 'tel: links start a call, not a website.' },
          { text: 'Nothing', why: 'On phones, tel: links offer to call the number.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the email link.',
        language: 'html',
        template: '<a href="[[1]]book@mensahbeats.com">Email me</a>',
        blanks: [['mailto:']],
        distractors: ['email:', 'tel:', 'https://'],
      },
      {
        kind: 'writeCode',
        prompt: 'The full Book me section: an h2 Book me, an email link to book@mensahbeats.com and a call link to +233201234567',
        starter: '',
        solution: '<h2>Book me</h2>\n<p><a href="mailto:book@mensahbeats.com">Email book@mensahbeats.com</a></p>\n<p><a href="tel:+233201234567">Call +233 20 123 4567</a></p>\n',
        hint: 'An h2, then two paragraphs, one with a mailto: link and one with a tel: link.',
        checks: [
          { message: 'A heading Book me', dom: { selector: 'h2', text: 'Book me' } },
          { message: 'An email link', dom: { selector: 'a[href^="mailto:"]', count: 1 } },
          { message: 'A call link', dom: { selector: 'a[href^="tel:"]', count: 1 } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What\'s the one action you\'d want visitors to take on your page? How would one tap make it easier?',
    starters: ['I\'d want them to...', 'One tap could...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'On your phone, find a restaurant\'s website and tap its phone number. If your phone offers to call, it\'s a tel: link.',
  },
  notes: 'RFC 6068 (mailto URI), RFC 3966 (tel URI, global numbers with +country code). +233 = Ghana; the number and booking email are fictional. target="_blank": HTML Living Standard §7.3.1 (browsing context names); modern browsers imply rel="noopener". WCAG G201: warn users when a link opens a new window. wa.me click-to-chat is WhatsApp\'s public link format.',
};

export default lesson;
