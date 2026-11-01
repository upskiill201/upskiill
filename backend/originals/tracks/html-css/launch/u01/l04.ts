import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 1 · Lesson 4 — input types: text, email, date, number, tel, and what each does on a phone. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'The right box for each answer',
  summary: 'All Kofi\'s boxes are plain text boxes. But a date isn\'t just text, and neither is an email. Change one word and phones show a calendar, or a keyboard with an @ key. Tap each type.',
  minutes: 11,
  outcomes: ['Choose the right input type for each question', 'Explain what each type changes on a phone', 'Use type="email", "date" and "number"'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each input type',
      text: '<input type="text" id="name" name="name">\n<input type="email" id="email" name="email">\n<input type="tel" id="phone" name="phone">\n<input type="date" id="date" name="date">\n<input type="number" id="guests" name="guests" min="1">',
      hotspots: [
        { phrase: 'type="text"', note: 'The default: any words. Good for names and venues.' },
        { phrase: 'type="email"', note: 'Phones show a keyboard with @ and a .com key, and the browser checks it looks like an email address.' },
        { phrase: 'type="tel"', note: 'Phones show a number pad. It doesn\'t check the format, because phone numbers differ around the world.' },
        { phrase: 'type="date"', note: 'Most browsers show a date picker, so nobody types "sat" again.' },
        { phrase: 'min="1"', note: 'For type="number": a number keyboard on phones, and the browser can refuse numbers below the minimum.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Five kinds of box',
      caption: 'Tap into each box. On a phone, each one brings up a different keyboard or picker.',
      code: '<style>\n  * { box-sizing: border-box; }\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  label { display: block; margin: 12px 0 4px; }\n  input { width: 100%; padding: 12px; font-size: 1rem; }\n</style>\n<form>\n  <label for="name">Your name</label><input type="text" id="name" name="name">\n  <label for="email">Email</label><input type="email" id="email" name="email">\n  <label for="phone">Phone (optional)</label><input type="tel" id="phone" name="phone">\n  <label for="date">Date of the event</label><input type="date" id="date" name="date">\n  <label for="guests">Expected guests</label><input type="number" id="guests" name="guests" min="1">\n</form>\n',
      challenge: 'Change the date box to type="text" and tap it. No picker any more.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Pick the type that matches the answer: email, tel, date, number. Phones reward you with the right keyboard.',
    },
  ],
  apply: {
    scenario: 'The right box for each answer.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each question to its input type.',
        pairs: [
          ['Your email', 'type="email"'],
          ['Date of the event', 'type="date"'],
          ['Expected guests', 'type="number"'],
          ['Phone number', 'type="tel"'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Give the date box the right type: type="date"',
        starter: '<form>\n  <label for="date">Date of the event</label>\n  <input id="date" name="date">\n</form>\n',
        solution: '<form>\n  <label for="date">Date of the event</label>\n  <input type="date" id="date" name="date">\n</form>\n',
        hint: '<input type="date" id="date" name="date">',
        checks: [
          { message: 'A date box', dom: { selector: 'input#date[type="date"]', count: 1 } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does type="email" change on a phone?',
        options: [
          { text: 'It sends an email', why: 'It only changes the keyboard and checking.' },
          { text: 'Nothing on phones', why: 'Phones show an email keyboard.' },
          { text: 'A keyboard with an @ key, and a check that it looks like an email' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'type="text", or a more specific type?',
        groups: ['text is right', 'Use a specific type'],
        items: [
          { text: 'Your name', group: 0 },
          { text: 'The event date', group: 1 },
          { text: 'The venue', group: 0 },
          { text: 'Number of guests', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Why doesn\'t type="tel" check the phone number format?',
        options: [
          { text: 'Phone numbers look different in every country, so it just brings up a number pad.' },
          { text: 'It\'s broken.', why: 'It\'s on purpose: formats vary.' },
          { text: 'Use type="number" instead.', why: 'Phone numbers can have + and leading zeros.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the box with the wrong type.',
        language: 'html',
        lines: ['<input type="email" id="email" name="email">', '<input type="number" id="phone" name="phone">', '<input type="date" id="date" name="date">'],
        bug: 1,
        explanation: 'Phone numbers can start with + or 0 and aren\'t for maths. Use type="tel".',
        fix: '<input type="tel" id="phone" name="phone">',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Someone types "kofi.mensah" in this box and tries to send. What happens?',
        code: '<input type="email" id="email" name="email">',
        language: 'html',
        options: [
          { text: 'It\'s sent as it is', why: 'type="email" checks for an @.' },
          { text: 'The box deletes it', why: 'It shows a message instead.' },
          { text: 'The browser says it isn\'t a valid email address' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Guests must be at least 1.',
        language: 'html',
        template: '<input type="[[1]]" id="guests" name="guests" [[2]]="1">',
        blanks: [['number'], ['min']],
        distractors: ['text', 'max', 'tel'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which input type shows a number pad for phone numbers? (one word)',
        answers: ['tel'],
        placeholder: 'A type',
      },
      {
        kind: 'writeCode',
        prompt: 'Make the email box an email type: type="email"',
        starter: '<form>\n  <label for="email">Email</label>\n  <input id="email" name="email">\n</form>\n',
        solution: '<form>\n  <label for="email">Email</label>\n  <input type="email" id="email" name="email">\n</form>\n',
        hint: '<input type="email" id="email" name="email">',
        checks: [
          { message: 'An email box', dom: { selector: 'input#email[type="email"]', count: 1 } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which boxes on your own form should have a specific type?',
    starters: ['My...', 'should be type=...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Open your form on a phone and tap each box. Change the types so each one brings up the right keyboard.',
  },
  notes: 'Input types email, tel, date, number per HTML spec; tel has no built-in validation by design. Date picker appearance varies by browser.',
};

export default lesson;
