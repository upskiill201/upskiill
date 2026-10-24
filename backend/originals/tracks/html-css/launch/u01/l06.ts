import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 1 · Lesson 6 — required fields, built-in checks, and saying which fields are required. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Don\'t let it send half empty',
  summary: 'A test booking arrives with a name and nothing else. No date, no email, no way to reply. Kofi asks Tey whether the form can stop that happening.',
  minutes: 11,
  outcomes: ['Make a field required with the required attribute', 'Explain the browser\'s built-in checks', 'Tell people which fields are required, in words'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Add required to an input, and the browser won\'t send the form until that box has something in it. It shows a message pointing to the empty box.',
          replies: ['Which ones should be required?'],
        },
        {
          tey: 'Only the ones you truly need. For a booking: name, email, date. Phone and "anything else?" can be optional. Every required box is a reason for someone to give up.',
          replies: ['How do people know which are required?'],
        },
        {
          tey: 'Say it in the label. "Email (required)" is clearest. A red star alone isn\'t enough: not everyone sees colours, and not everyone knows what the star means.',
          replies: ['Does the browser check anything else?'],
        },
        {
          tey: 'type="email" checks for an @, type="number" with min checks the number, and more. Handy, but it\'s only a first line: the place that receives the form should check again, because the browser\'s checks can be skipped.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Try sending it empty',
      caption: 'The live preview won\'t really send, but in a normal page the browser would stop at the empty required box. Notice how the labels say what\'s required.',
      code: '<style>\n  * { box-sizing: border-box; }\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  label { display: block; margin: 12px 0 4px; }\n  input { width: 100%; padding: 12px; font-size: 1rem; }\n</style>\n<form>\n  <label for="name">Your name (required)</label>\n  <input id="name" name="name" required>\n  <label for="email">Email (required)</label>\n  <input type="email" id="email" name="email" required>\n  <label for="phone">Phone (optional)</label>\n  <input type="tel" id="phone" name="phone">\n</form>\n',
      challenge: 'Add a required date field: "Date of the event (required)".',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'required stops empty answers. Only require what you need, and say "(required)" in the label.',
    },
  ],
  apply: {
    scenario: 'Half-empty bookings.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does the required attribute do?',
        options: [
          { text: 'Makes the box red', why: 'It blocks sending; colour is up to your CSS.' },
          { text: 'Fills the box in automatically', why: 'It only checks it isn\'t empty.' },
          { text: 'Stops the form sending until that box has an answer' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the email box required, and add "(required)" to its label',
        starter: '<form>\n  <label for="email">Email</label>\n  <input type="email" id="email" name="email">\n</form>\n',
        solution: '<form>\n  <label for="email">Email (required)</label>\n  <input type="email" id="email" name="email" required>\n</form>\n',
        hint: 'Add required to the input, and (required) to the label text.',
        checks: [
          { message: 'Email is required', dom: { selector: 'input#email[required]', count: 1 } },
          { message: 'The label says so', dom: { selector: 'label[for="email"]', text: 'required' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'For a gig booking: required or optional?',
        groups: ['Required', 'Optional'],
        items: [
          { text: 'Email, so Kofi can reply', group: 0 },
          { text: 'Phone number', group: 1 },
          { text: 'Date of the event', group: 0 },
          { text: '"Anything else?"', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each attribute to the check it adds.',
        pairs: [
          ['required', 'Can\'t be empty'],
          ['type="email"', 'Must look like an email'],
          ['min="1"', 'Number can\'t be below 1'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'I\'ll make every single box required, so I always get everything.',
        options: [
          { text: 'Good plan.', why: 'Too many required boxes put people off.' },
          { text: 'Every required box is a reason to give up. Only require what I really need to reply.' },
          { text: 'Make none required.', why: 'Then bookings arrive half empty.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the label that doesn\'t tell people the box is required.',
        language: 'html',
        lines: ['<label for="name">Your name (required)</label> <input id="name" required>', '<label for="date">Date *</label> <input type="date" id="date" required>', '<label for="phone">Phone (optional)</label> <input type="tel" id="phone">'],
        bug: 1,
        explanation: 'A star alone isn\'t clear to everyone. Write "(required)".',
        fix: '<label for="date">Date (required)</label> <input type="date" id="date" required>',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Someone leaves the date empty and presses send. What happens?',
        code: '<input type="date" id="date" name="date" required>',
        language: 'html',
        options: [
          { text: 'It sends with no date', why: 'required blocks that.' },
          { text: 'The page reloads empty', why: 'It shows a message and waits.' },
          { text: 'The browser stops and points to the date box' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Make the name required.',
        language: 'html',
        template: '<label for="name">Your name ([[1]])</label>\n<input id="name" name="name" [[2]]>',
        blanks: [['required'], ['required']],
        distractors: ['optional', 'needed', 'must'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which attribute stops a box being left empty? (one word)',
        answers: ['required'],
        placeholder: 'An attribute',
      },
      {
        kind: 'mcq',
        prompt: 'Why should the place that receives the form check the answers again?',
        options: [
          { text: 'The browser\'s checks can be skipped, so they\'re only a first line' },
          { text: 'Browsers can\'t check anything', why: 'They can. They just can\'t be fully trusted.' },
          { text: 'It doesn\'t need to', why: 'Browser checks can be bypassed.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which fields on your own form are truly required? Which could you make optional?',
    starters: ['I really need...', 'I could make optional...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Mark only your truly needed fields as required, and write "(required)" or "(optional)" in each label.',
  },
  notes: 'Constraint validation (required, type, min) per HTML spec; client-side validation can be bypassed, so servers must validate too. WCAG 3.3.2 Labels or Instructions: indicate required fields in text.',
};

export default lesson;
