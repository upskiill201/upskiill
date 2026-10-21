import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 1 · Lesson 18 — the learner's own contact form, with autocomplete. Steps. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Your own contact form',
  summary: 'Your turn. Four steps to add a contact form to your own site, plus one small extra that saves everyone typing: autocomplete.',
  minutes: 12,
  outcomes: ['Build a contact form for your own site', 'Help browsers fill in names and emails with autocomplete', 'Add an honest privacy line and a fallback'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps for your page',
      steps: [
        { title: '1. Decide what you need', body: 'For a contact form: name, email, message. Maybe one more question. That\'s it.' },
        { title: '2. Build the fields', body: 'Labels, ids, names, the right types, required where needed.', code: '<label for="email">Email (required)</label>\n<input type="email" id="email" name="email" required>', language: 'html' },
        { title: '3. Add autocomplete', body: 'autocomplete tells the browser what a box is for, so it can offer to fill in the person\'s own name or email. It saves typing, especially for people who find typing hard.', code: '<input id="name" name="name" autocomplete="name">\n<input type="email" id="email" name="email" autocomplete="email">', language: 'html' },
        { title: '4. Privacy line and fallback', body: 'Say what you\'ll do with the details, and give an email address in case the form isn\'t connected yet.', code: '<p>I\'ll only use your details to reply to you.</p>', language: 'html' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'A contact form like yours',
      caption: 'Name, email and message, with autocomplete, a privacy line and a fallback. Change it to suit your site.',
      code: '<style>\n  * { box-sizing: border-box; }\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  form { max-width: 460px; }\n  label { display: block; margin: 16px 0 4px; }\n  input, textarea { font: inherit; width: 100%; padding: 12px; border-radius: 8px; border: 2px solid #1F2E52; }\n  button { font: inherit; margin-top: 16px; padding: 12px 24px; background-color: #FF9600; color: #14213D; border: none; border-radius: 8px; }\n  .small { font-size: 0.875rem; }\n</style>\n<h2>Say hello</h2>\n<form action="/thanks" method="post">\n  <label for="name">Your name (required)</label>\n  <input id="name" name="name" autocomplete="name" required>\n  <label for="email">Email (required)</label>\n  <input type="email" id="email" name="email" autocomplete="email" required>\n  <label for="message">Message (required)</label>\n  <textarea id="message" name="message" rows="5" required></textarea>\n  <p class="small">I\'ll only use your details to reply to you.</p>\n  <button type="submit">Send message</button>\n</form>\n<p class="small">Or email <a href="mailto:hello@example.com">hello@example.com</a></p>\n',
      challenge: 'Change the heading and the email address to your own (use a separate email for your site).',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'autocomplete="name" and autocomplete="email" save everyone typing.',
    },
  ],
  apply: {
    scenario: 'Your own contact form.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Decide what you need to ask', 'Build the fields', 'Add autocomplete', 'Add a privacy line and a fallback'],
      },
      {
        kind: 'writeCode',
        prompt: 'Help the browser fill these in: add autocomplete="name" to the name box and autocomplete="email" to the email box',
        starter: '<form>\n  <label for="name">Your name</label>\n  <input id="name" name="name">\n  <label for="email">Email</label>\n  <input type="email" id="email" name="email">\n</form>\n',
        solution: '<form>\n  <label for="name">Your name</label>\n  <input id="name" name="name" autocomplete="name">\n  <label for="email">Email</label>\n  <input type="email" id="email" name="email" autocomplete="email">\n</form>\n',
        hint: 'autocomplete="name" and autocomplete="email".',
        checks: [
          { message: 'Name can be filled in', dom: { selector: 'input#name', attr: 'autocomplete', attrValue: 'name' } },
          { message: 'Email can be filled in', dom: { selector: 'input#email', attr: 'autocomplete', attrValue: 'email' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Needed for a simple contact form, or not?',
        groups: ['Needed', 'Not needed'],
        items: [
          { text: 'Name', group: 0 },
          { text: 'Home address', group: 1 },
          { text: 'Message', group: 0 },
          { text: 'Date of birth', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does autocomplete="email" do?',
        options: [
          { text: 'Tells the browser it\'s an email box, so it can offer to fill in the person\'s own email' },
          { text: 'Sends an email automatically', why: 'It only helps fill in the box.' },
          { text: 'Checks the email is real', why: 'type="email" checks the format; autocomplete helps fill it in.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the email address you shouldn\'t publish on your contact page.',
        language: 'html',
        lines: ['<a href="mailto:hello@example.com">hello@example.com</a>', '<a href="mailto:my.personal.school.email@example.com">Email me</a>', '<p>I\'ll only use your details to reply to you.</p>'],
        bug: 1,
        explanation: 'Use a separate email just for your site, not your personal or school one (Course 1, privacy).',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'ama',
        message: 'My phone filled in my name and email by itself! How?',
        options: [
          { text: 'The boxes have autocomplete, so your phone knew what they were for and offered your saved details.' },
          { text: 'Magic.', why: 'It\'s the autocomplete attribute.' },
          { text: 'The site already knew you.', why: 'Your phone filled it in, not the site.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to its job.',
        pairs: [
          ['autocomplete="name"', 'Offers to fill in a name'],
          ['required', 'Can\'t be left empty'],
          ['Privacy line', 'Says what happens to details'],
          ['Email fallback', 'Works even if the form doesn\'t'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'This form is sent with the message empty. What happens?',
        code: '<textarea id="message" name="message" required></textarea>',
        language: 'html',
        options: [
          { text: 'The browser stops and asks for a message' },
          { text: 'It sends an empty message', why: 'required stops that.' },
          { text: 'The textarea fills itself', why: 'It waits for the person.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Help the browser fill in the email.',
        language: 'html',
        template: '<input type="email" id="email" name="email" [[1]]="[[2]]">',
        blanks: [['autocomplete'], ['email']],
        distractors: ['autofill', 'name', 'placeholder'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which attribute lets the browser offer to fill in a box? (one word)',
        answers: ['autocomplete'],
        placeholder: 'An attribute',
      },
    ],
  },
  reflect: {
    prompt: 'What will your contact form say above the send button about people\'s details?',
    starters: ['It will say...', 'Because...'],
  },
  deepen: {
    title: 'Do it for real',
    summary: 'Add a contact form to your own site with the four steps. Until it\'s connected to a form service, keep the email fallback.',
  },
  notes: 'autocomplete tokens (name, email) per HTML spec; WCAG 1.3.5 Identify Input Purpose. Use a site-only email, as in Course 1 Chapter 5.',
};

export default lesson;
