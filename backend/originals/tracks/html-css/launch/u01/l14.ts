import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 1 · Lesson 14 — building the full booking form in order. Steps. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Build the booking form',
  summary: 'Everything from this chapter, in one form. Miracle\'s four steps, and Mensah Beats has a booking form the organiser can fill in on her phone in under a minute.',
  minutes: 12,
  outcomes: ['Plan a form\'s questions in a sensible order', 'Build it with the right elements and types', 'Style it and give it a clear send button'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps to the booking form',
      steps: [
        { title: '1. Plan the questions', body: 'Only what you need, in the order people think: who you are, when and where, what kind of event, anything else.' },
        { title: '2. Build the fields', body: 'Each with a label, id, name and the right type. Required only where it must be.', code: '<label for="date">Date of the event (required)</label>\n<input type="date" id="date" name="date" required>', language: 'html' },
        { title: '3. Group the choices', body: 'Radios and checkboxes in a fieldset with a legend.', code: '<fieldset>\n  <legend>Is there a sound system?</legend>\n  ...\n</fieldset>', language: 'html' },
        { title: '4. Style it and add the button', body: 'One rule for every box, a big clear button, and an email fallback underneath.', code: 'input, select, textarea { font: inherit; width: 100%; padding: 12px; }\nbutton { padding: 12px 24px; background-color: #FF9600; color: #14213D; }', language: 'css' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The booking form',
      caption: 'The whole thing. Fill it in at phone size, the way the organiser would.',
      code: '<style>\n  * { box-sizing: border-box; }\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  form { max-width: 460px; }\n  label { display: block; margin: 16px 0 4px; }\n  fieldset label { display: inline; margin: 0 12px 0 4px; }\n  input, select, textarea { font: inherit; width: 100%; padding: 12px; border: 2px solid #1F2E52; border-radius: 8px; }\n  input[type="radio"] { width: auto; }\n  fieldset { margin-top: 16px; border: 2px solid #1F2E52; border-radius: 8px; }\n  button { font: inherit; margin-top: 16px; padding: 12px 24px; background-color: #FF9600; color: #14213D; border: none; border-radius: 8px; }\n</style>\n<form action="/thanks" method="post">\n  <label for="name">Your name (required)</label>\n  <input id="name" name="name" required>\n  <label for="email">Email (required)</label>\n  <input type="email" id="email" name="email" required>\n  <label for="date">Date of the event (required)</label>\n  <input type="date" id="date" name="date" required>\n  <label for="kind">Type of event</label>\n  <select id="kind" name="kind"><option value="party">Party</option><option value="wedding">Wedding</option><option value="club">Club night</option></select>\n  <fieldset>\n    <legend>Is there a sound system?</legend>\n    <input type="radio" id="sound-yes" name="sound" value="yes"><label for="sound-yes">Yes</label>\n    <input type="radio" id="sound-no" name="sound" value="no"><label for="sound-no">No</label>\n  </fieldset>\n  <label for="details">Anything else? (optional)</label>\n  <textarea id="details" name="details" rows="4"></textarea>\n  <button type="submit">Send booking request</button>\n</form>\n',
      challenge: 'Add a "Not sure" radio to the sound system question.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ask only what you need, in the order people think, with the right box for each answer.',
    },
  ],
  apply: {
    scenario: 'Building the booking form.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the questions in the order people think.',
        lines: ['Your name', 'Email', 'Date of the event', 'Type of event', 'Anything else?'],
      },
      {
        kind: 'writeCode',
        prompt: 'Add the email field: label "Email (required)", type email, id and name email, required',
        starter: '<form action="/thanks" method="post">\n  <label for="name">Your name (required)</label>\n  <input id="name" name="name" required>\n\n  <button type="submit">Send booking request</button>\n</form>\n',
        solution: '<form action="/thanks" method="post">\n  <label for="name">Your name (required)</label>\n  <input id="name" name="name" required>\n  <label for="email">Email (required)</label>\n  <input type="email" id="email" name="email" required>\n  <button type="submit">Send booking request</button>\n</form>\n',
        hint: '<label for="email">Email (required)</label> <input type="email" id="email" name="email" required>',
        checks: [
          { message: 'A required email box', dom: { selector: 'input#email[type="email"][required]', count: 1 } },
          { message: 'With a label', dom: { selector: 'label[for="email"]', text: 'Email' } },
          { message: 'Before the button', dom: { selector: 'input#email ~ button', count: 1 } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Needed for the booking, or leave it out?',
        groups: ['Ask it', 'Leave it out'],
        items: [
          { text: 'Date of the event', group: 0 },
          { text: 'Their home address', group: 1 },
          { text: 'Type of event', group: 0 },
          { text: 'Their date of birth', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does the radio rule say width: auto?',
        options: [
          { text: 'The box rule makes every input full width; radios should stay small' },
          { text: 'Radios need to be bigger', why: 'Full width would stretch them oddly.' },
          { text: 'It hides them', why: 'It keeps them at their normal size.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the field that asks more than a booking needs.',
        language: 'html',
        lines: ['<label for="venue">Venue</label> <input id="venue" name="venue">', '<label for="id-number">National ID number</label> <input id="id-number" name="id">', '<label for="date">Date</label> <input type="date" id="date" name="date">'],
        bug: 1,
        explanation: 'Kofi doesn\'t need anyone\'s ID number to play a gig. Never collect what you don\'t need.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'The form feels long on my phone. Can anything go?',
        options: [
          { text: 'Make the text smaller.', why: 'Remove questions instead.' },
          { text: 'Split it over five pages.', why: 'Fewer questions is better.' },
          { text: 'Let\'s check each question: if I don\'t need it to reply with a price, it goes.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each question to its element.',
        pairs: [
          ['Is there a sound system?', 'Radios in a fieldset'],
          ['Type of event', 'select'],
          ['Anything else?', 'textarea'],
          ['Date of the event', 'input type="date"'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The form is sent with the date empty. What happens?',
        code: '<input type="date" id="date" name="date" required>',
        language: 'html',
        options: [
          { text: 'It sends without a date', why: 'required blocks that.' },
          { text: 'The browser stops and points to the date box' },
          { text: 'The date fills itself in', why: 'The browser asks for it.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Keep radios small inside a full-width form.',
        language: 'css',
        template: 'input[type="[[1]]"] { width: [[2]]; }',
        blanks: [['radio'], ['auto']],
        distractors: ['text', '100%', 'none'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Should you collect information you don\'t need? (yes or no)',
        answers: ['no'],
        placeholder: 'Yes or no',
      },
    ],
  },
  reflect: {
    prompt: 'List every question on your own form. Which could you remove?',
    starters: ['I could remove...', 'I must keep...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Build your own contact form with the four steps. Ask only what you need, and add an email fallback under it.',
  },
  notes: 'Data minimisation (collect only what is needed) is a core privacy principle in laws like the GDPR; kept general. The attribute selector input[type="radio"] appears in CSS for the first time here and is explained by the lesson.',
};

export default lesson;
