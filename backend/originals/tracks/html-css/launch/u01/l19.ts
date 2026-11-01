import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 1 · Lesson 19 — the finished booking form, read line by line. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'The finished booking form',
  summary: 'Before it goes live, Miracle reads the booking form with Kofi one last time. Every line answers a question someone might have. Tap each part.',
  minutes: 11,
  outcomes: ['Read a complete, well-built form', 'Explain why each attribute is there', 'Spot what would make a form harder to use'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part',
      text: '<form action="/thanks" method="post">\n  <label for="email">Email (required)</label>\n  <input type="email" id="email" name="email" autocomplete="email" required>\n  <label for="date">Date of the event (required)</label>\n  <input type="date" id="date" name="date" required>\n  <fieldset>\n    <legend>Is there a sound system?</legend>\n    <input type="radio" id="sound-yes" name="sound" value="yes"><label for="sound-yes">Yes</label>\n  </fieldset>\n  <input type="checkbox" id="news" name="news" value="yes"><label for="news">Send me news about new beats (optional)</label>\n  <p>I only use your details to reply about this booking.</p>\n  <button type="submit">Send booking request</button>\n</form>',
      hotspots: [
        { phrase: 'action="/thanks" method="post"', note: 'Where the answers go and how. Something there has to receive them, like a form service.' },
        { phrase: 'Email (required)', note: 'The label says what to type and that it\'s required, in words.' },
        { phrase: 'type="email" id="email" name="email" autocomplete="email" required', note: 'Email keyboard, connected to its label, named when sent, filled in by the browser, can\'t be empty.' },
        { phrase: '<legend>Is there a sound system?</legend>', note: 'The question for the whole radio group, read out with each choice.' },
        { phrase: 'Send me news about new beats (optional)', note: 'An honest opt-in: optional, and the box starts unticked.' },
        { phrase: '<button type="submit">Send booking request</button>', note: 'A big button that says exactly what will happen.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Mensah Beats booking form',
      caption: 'The short version of the finished form. Try it with only the keyboard: Tab to move, Space to tick.',
      code: '<style>\n  * { box-sizing: border-box; }\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  form { max-width: 460px; }\n  label { display: block; margin: 16px 0 4px; }\n  fieldset label, .opt-in label { display: inline; margin: 0 12px 0 4px; }\n  input, select, textarea { font: inherit; width: 100%; padding: 12px; border: 2px solid #1F2E52; border-radius: 8px; }\n  input[type="radio"], input[type="checkbox"] { width: auto; }\n  fieldset { margin-top: 16px; border: 2px solid #1F2E52; border-radius: 8px; }\n  .small { font-size: 0.875rem; }\n  button { font: inherit; margin-top: 16px; padding: 12px 24px; background-color: #FF9600; color: #14213D; border: none; border-radius: 8px; }\n</style>\n<form action="/thanks" method="post">\n  <label for="email">Email (required)</label>\n  <input type="email" id="email" name="email" autocomplete="email" required>\n  <label for="date">Date of the event (required)</label>\n  <input type="date" id="date" name="date" required>\n  <fieldset>\n    <legend>Is there a sound system?</legend>\n    <input type="radio" id="sound-yes" name="sound" value="yes"><label for="sound-yes">Yes</label>\n    <input type="radio" id="sound-no" name="sound" value="no"><label for="sound-no">No</label>\n  </fieldset>\n  <p class="opt-in"><input type="checkbox" id="news" name="news" value="yes"><label for="news">Send me news about new beats (optional)</label></p>\n  <p class="small">I only use your details to reply about this booking.</p>\n  <button type="submit">Send booking request</button>\n</form>\n',
      challenge: 'Fill it in using only Tab, the arrow keys and Space. Could you reach everything?',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Labels in words, the right types, required only where needed, grouped choices, honest opt-ins, a clear button.',
    },
  ],
  apply: {
    scenario: 'Reading the finished form.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each attribute to why it\'s there.',
        pairs: [
          ['type="email"', 'Email keyboard and format check'],
          ['autocomplete="email"', 'The browser can fill it in'],
          ['required', 'Can\'t be left empty'],
          ['name="email"', 'What the answer is called when sent'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Finish the email field: add autocomplete email and required to the input',
        starter: '<form>\n  <label for="email">Email (required)</label>\n  <input type="email" id="email" name="email">\n</form>\n',
        solution: '<form>\n  <label for="email">Email (required)</label>\n  <input type="email" id="email" name="email" autocomplete="email" required>\n</form>\n',
        hint: 'autocomplete="email" required',
        checks: [
          { message: 'Can be filled in', dom: { selector: 'input#email', attr: 'autocomplete', attrValue: 'email' } },
          { message: 'Required', dom: { selector: 'input#email[required]', count: 1 } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does the CSS say input[type="checkbox"] { width: auto; }?',
        options: [
          { text: 'To hide them', why: 'It keeps them at normal size.' },
          { text: 'To make them required', why: 'That\'s an HTML attribute.' },
          { text: 'The box rule makes inputs full width; checkboxes and radios should stay small' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Makes the form easier, or harder?',
        groups: ['Easier', 'Harder'],
        items: [
          { text: 'autocomplete on name and email', group: 0 },
          { text: 'Placeholder text instead of labels', group: 1 },
          { text: 'A date picker for the date', group: 0 },
          { text: 'Ten required boxes', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line Miracle would send back.',
        language: 'html',
        lines: ['<label for="date">Date of the event (required)</label>', '<input type="checkbox" id="news" name="news" checked>', '<button type="submit">Send booking request</button>'],
        bug: 1,
        explanation: 'The news opt-in starts ticked. Remove checked so people choose for themselves.',
        fix: '<input type="checkbox" id="news" name="news">',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Can someone fill this in without a mouse?',
        options: [
          { text: 'Probably.', why: 'Test it with the keyboard.' },
          { text: 'Yes: Tab moves between boxes, arrows pick radios, Space ticks boxes, Enter sends. I tested it.' },
          { text: 'Forms need a mouse.', why: 'Real form elements all work by keyboard.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Only the email and date are filled in. Can the form be sent?',
        code: '<input type="email" id="email" name="email" required>   (filled in)\n<input type="date" id="date" name="date" required>   (filled in)\n<input type="radio" name="sound" value="yes">   (not picked)\n<input type="checkbox" name="news" value="yes">   (not ticked)',
        language: 'html',
        options: [
          { text: 'Yes: everything required is filled in' },
          { text: 'No, every box must be filled', why: 'Only required ones.' },
          { text: 'No, the news box must be ticked', why: 'It\'s optional.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the form tag.',
        language: 'html',
        template: '<form action="/thanks" [[1]]="[[2]]">',
        blanks: [['method'], ['post']],
        distractors: ['type', 'send', 'href'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which key moves you to the next box in a form? (one word)',
        answers: ['tab'],
        placeholder: 'A key',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the form in order, top to bottom.',
        language: 'html',
        lines: ['<label for="email">Email (required)</label>', '<input type="email" id="email" name="email" required>', '<fieldset><legend>Is there a sound system?</legend>...</fieldset>', '<p>I only use your details to reply about this booking.</p>', '<button type="submit">Send booking request</button>'],
      },
    ],
  },
  reflect: {
    prompt: 'Fill in your own form using only the keyboard. What was hard?',
    starters: ['It was hard to...', 'I\'ll fix...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Fill in your own form with only the keyboard, then on a phone. Fix anything that slows you down.',
  },
  notes: 'Native form controls are keyboard-operable by default (Tab, arrow keys for radio groups, Space, Enter).',
};

export default lesson;
