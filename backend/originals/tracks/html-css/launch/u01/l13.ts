import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 1 · Lesson 13 — the send button, action and method, and where answers actually go. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Where do the answers go?',
  summary: 'The form looks finished. Kofi presses "Send booking request" on his live site, and nothing arrives in his inbox. Tey explains what happens when a form is sent, and what\'s missing.',
  minutes: 11,
  outcomes: ['Add a send button with button type="submit"', 'Explain what action and method do', 'Describe the options for receiving form answers on a static site'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'A button with type="submit" sends the form. The browser collects every answer by its name, like name=Ama&date=2026-11-01, and sends it to the address in the form\'s action.',
          replies: ['My form has no action.'],
        },
        {
          tey: 'Then it sends the answers back to the same page, which is just a file on a host. Nothing is listening, so the answers vanish. method says how they travel: post is the usual choice for forms like this.',
          replies: ['So what can listen?'],
        },
        {
          tey: 'Something that runs on a server: a program you write later in your coding journey, or a form service. Some hosts, like Netlify, can collect form answers for static sites if you add a setting to the form. Check your host\'s current terms and how they handle the data.',
          replies: ['What about mailto?'],
        },
        {
          tey: 'action="mailto:..." asks the visitor\'s email app to send it, which often fails or confuses people. Until there\'s a real receiver, the simplest honest option is a clear "or email bookings@example.com" line under the form.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The send button',
      caption: 'A form with an action, a method and a submit button. In this live preview, sending is switched off for safety.',
      code: '<style>\n  * { box-sizing: border-box; }\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  label { display: block; margin: 12px 0 4px; }\n  input { font: inherit; width: 100%; padding: 12px; }\n  button { font: inherit; margin-top: 16px; padding: 12px 24px; background-color: #FF9600; color: #14213D; border: none; border-radius: 8px; }\n</style>\n<form action="/thanks" method="post">\n  <label for="name">Your name (required)</label>\n  <input id="name" name="name" required>\n  <button type="submit">Send booking request</button>\n</form>\n<p>Or email <a href="mailto:bookings@example.com">bookings@example.com</a></p>\n',
      challenge: 'Change the button text to something even clearer about what happens, like "Send my booking request".',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'button type="submit" sends. action says where to; method="post" says how. Something on a server must receive it.',
    },
  ],
  apply: {
    scenario: 'Where do the answers go?',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why didn\'t Kofi\'s test booking arrive anywhere?',
        options: [
          { text: 'The button was the wrong colour', why: 'Colour doesn\'t send anything.' },
          { text: 'Nothing on a server was set up to receive the answers' },
          { text: 'Forms only work offline', why: 'They need a receiver online.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Add the send button: a button with type submit saying "Send booking request"',
        starter: '<form action="/thanks" method="post">\n  <label for="name">Your name</label>\n  <input id="name" name="name">\n\n</form>\n',
        solution: '<form action="/thanks" method="post">\n  <label for="name">Your name</label>\n  <input id="name" name="name">\n  <button type="submit">Send booking request</button>\n</form>\n',
        hint: '<button type="submit">Send booking request</button>',
        checks: [
          { message: 'A submit button', dom: { selector: 'form button[type="submit"]', count: 1 } },
          { message: 'That says what it does', dom: { selector: 'button', text: 'Send' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to its job.',
        pairs: [
          ['button type="submit"', 'Sends the form'],
          ['action', 'Where the answers go'],
          ['method="post"', 'How they travel'],
          ['name', 'What each answer is called'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Can it receive form answers?',
        groups: ['Can receive', 'Can\'t receive'],
        items: [
          { text: 'A program running on a server', group: 0 },
          { text: 'A plain HTML file on a host', group: 1 },
          { text: 'A form service your host provides', group: 0 },
          { text: 'The CSS file', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Until I set up a receiver, should I leave the form up?',
        options: [
          { text: 'Yes, people will figure it out.', why: 'Their answers would vanish.' },
          { text: 'Delete the form forever.', why: 'Just give a fallback until it\'s connected.' },
          { text: 'Add a clear "or email bookings@example.com" line, so nobody\'s booking disappears, and set up a receiver soon.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the button that doesn\'t tell people what will happen.',
        language: 'html',
        lines: ['<button type="submit">Send booking request</button>', '<button type="submit">Go</button>', '<button type="submit">Send my booking</button>'],
        bug: 1,
        explanation: '"Go" where? Say what happens: send the booking.',
        fix: '<button type="submit">Send booking request</button>',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Someone fills in name "Ama" and presses send. What is sent?',
        code: '<form action="/thanks" method="post">\n  <input id="n" name="name">\n  <button type="submit">Send</button>\n</form>',
        language: 'html',
        options: [
          { text: 'n = Ama', why: 'Answers are sent by name, not id.' },
          { text: 'name = Ama, to /thanks' },
          { text: 'Nothing, a button can\'t send', why: 'type="submit" sends the form.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the form tag.',
        language: 'html',
        template: '<form [[1]]="/thanks" [[2]]="post">',
        blanks: [['action'], ['method']],
        distractors: ['href', 'type', 'src'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which form attribute says where the answers are sent? (one word)',
        answers: ['action'],
        placeholder: 'An attribute',
      },
      {
        kind: 'mcq',
        prompt: 'Why is action="mailto:..." a weak way to send a form?',
        options: [
          { text: 'It sends too fast', why: 'It depends on the visitor\'s email app.' },
          { text: 'It\'s the best way', why: 'It often fails silently.' },
          { text: 'It relies on the visitor\'s email app, which often isn\'t set up or confuses people' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Where will your own form\'s answers go? Does your host offer anything?',
    starters: ['My answers will...', 'My host...'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Search your own host\'s name plus "form submissions" and read whether it can collect form answers for a static site. Check the current terms and how they store the data.',
  },
  notes: 'Form submission, action and method per HTML spec. Netlify Forms collects submissions for static sites (data-netlify attribute); named as an example with "check current terms". Server-side handling is outside this course.',
};

export default lesson;
