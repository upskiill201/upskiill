import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 1 · Lesson 20 — Chapter Challenge: Mensah Beats v1.6, the booking form. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: Mensah Beats v1.6',
  summary: 'The Sound Up Saturdays organiser wants to book Kofi for the end-of-year show, and she wants to do it "the proper way, through your form". Build the booking form from memory: v1.6.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build a complete booking form', 'Use labels, types, required and grouped choices correctly', 'Handle people\'s details honestly'],
  learn: [
    {
      kind: 'story',
      title: 'The proper way',
      beats: [
        { speaker: 'narrator', text: 'Two weeks to uni. A message from the organiser: "End-of-year show, 20 December. I\'ll book you the proper way, through your form."' },
        { speaker: 'kofi', text: 'Name, email, date, venue, type of event, sound system, anything else. Every answer in its place.' },
        { speaker: 'narrator', text: 'Her booking arrives complete. Kofi replies with a price in one message, not ten.' },
        { speaker: 'efua', text: 'One message. That\'s professional.' },
        { speaker: 'tey', text: 'Build v1.6 from memory. Next chapter: making the site move, gently.' },
      ],
    },
    {
      kind: 'steps',
      title: 'The site so far',
      steps: [
        { title: 'Course 2: v1.5', body: 'A responsive site: boxes, classes, Flexbox, Grid, phones first.' },
        { title: 'v1.6 (tonight)', body: 'A booking form: labels, the right input types, required fields, radios and checkboxes in fieldsets, an honest opt-in, a clear button and an email fallback.', code: '<input type="email" id="email" name="email" autocomplete="email" required>', language: 'html' },
        { title: 'Next chapter', body: 'Make it move: hover effects, transitions, a gig countdown animation, and respecting people who turn motion off.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: Mensah Beats v1.6.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Step 1: the name field. Label "Your name (required)", input id and name name, autocomplete name, required',
        starter: '<form action="/thanks" method="post">\n\n</form>\n',
        solution: '<form action="/thanks" method="post">\n  <label for="name">Your name (required)</label>\n  <input id="name" name="name" autocomplete="name" required>\n</form>\n',
        hint: '<label for="name">Your name (required)</label> <input id="name" name="name" autocomplete="name" required>',
        checks: [
          { message: 'A connected label', dom: { selector: 'label[for="name"]', text: 'required' } },
          { message: 'A required name box', dom: { selector: 'input#name[required]', count: 1 } },
          { message: 'That the browser can fill in', dom: { selector: 'input#name', attr: 'autocomplete', attrValue: 'name' } },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Step 2: email and date. Add a required email field (type email, id email) and a required date field (type date, id date), each labelled',
        starter: '<form action="/thanks" method="post">\n\n</form>\n',
        solution: '<form action="/thanks" method="post">\n  <label for="email">Email (required)</label>\n  <input type="email" id="email" name="email" required>\n  <label for="date">Date of the event (required)</label>\n  <input type="date" id="date" name="date" required>\n</form>\n',
        hint: 'Two label + input pairs, with type="email" and type="date".',
        checks: [
          { message: 'A required email box', dom: { selector: 'input#email[type="email"][required]', count: 1 } },
          { message: 'A required date box', dom: { selector: 'input#date[type="date"][required]', count: 1 } },
          { message: 'Both labelled', dom: { selector: 'label[for="email"], label[for="date"]', count: 2 } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which element for each question?',
        groups: ['input / select', 'Grouped radios or checkboxes'],
        items: [
          { text: 'Type of event', group: 0 },
          { text: 'Is there a sound system?', group: 1 },
          { text: 'Venue', group: 0 },
          { text: 'Which extras? (pick any)', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Step 3: the sound system question. A fieldset with legend "Is there a sound system?" and radios Yes (value yes) and No (value no), name sound, each labelled',
        starter: '<form>\n\n</form>\n',
        solution: '<form>\n  <fieldset>\n    <legend>Is there a sound system?</legend>\n    <input type="radio" id="sound-yes" name="sound" value="yes"><label for="sound-yes">Yes</label>\n    <input type="radio" id="sound-no" name="sound" value="no"><label for="sound-no">No</label>\n  </fieldset>\n</form>\n',
        hint: 'fieldset > legend, then two radio + label pairs with name="sound".',
        checks: [
          { message: 'The question', dom: { selector: 'fieldset legend', text: 'sound system' } },
          { message: 'Two radios in one group', dom: { selector: 'input[type="radio"][name="sound"]', count: 2 } },
          { message: 'Each labelled', dom: { selector: 'label[for="sound-yes"], label[for="sound-no"]', count: 2 } },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The organiser picks Wedding. What is sent?',
        code: '<select id="kind" name="kind">\n  <option value="party">Party</option>\n  <option value="wedding">Wedding</option>\n</select>',
        language: 'html',
        options: [
          { text: 'Wedding', why: 'name and value are sent.' },
          { text: 'kind = wedding' },
          { text: 'kind = Wedding', why: 'The value is lowercase wedding.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that would make this form untrustworthy.',
        language: 'html',
        lines: ['<p>I only use your details to reply about this booking.</p>', '<input type="checkbox" id="news" name="news" value="yes" checked>', '<button type="submit">Send booking request</button>'],
        bug: 1,
        explanation: 'A pre-ticked newsletter box. Opt-ins must start unticked.',
        fix: '<input type="checkbox" id="news" name="news" value="yes">',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'My form isn\'t connected to a form service yet. What do I put under it?',
        options: [
          { text: 'Nothing, it\'s fine.', why: 'Answers would vanish.' },
          { text: 'My personal phone number.', why: 'Keep personal details off the site.' },
          { text: 'A clear "Or email bookings@example.com" line, so no booking is ever lost.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each problem from this chapter to its fix.',
        pairs: [
          ['"u free sat?" emails', 'A booking form'],
          ['Vanishing placeholder labels', 'Real labels'],
          ['Half-empty bookings', 'required'],
          ['Ticking both Yes and No', 'Radios with one name'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Final step: the send button. A button type submit saying "Send booking request", with a privacy line before it',
        starter: '<form action="/thanks" method="post">\n\n</form>\n',
        solution: '<form action="/thanks" method="post">\n  <p>I only use your details to reply about this booking.</p>\n  <button type="submit">Send booking request</button>\n</form>\n',
        hint: '<p>I only use your details...</p> <button type="submit">Send booking request</button>',
        checks: [
          { message: 'A submit button', dom: { selector: 'button[type="submit"]', text: 'Send booking request' } },
          { message: 'A privacy line', dom: { selector: 'form p', text: 'details' } },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Style every box at once.',
        language: 'css',
        template: 'input, select, [[1]] { font: [[2]]; width: 100%; padding: 12px; }',
        blanks: [['textarea'], ['inherit']],
        distractors: ['label', 'none', 'button'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What version of Mensah Beats has the booking form? (e.g. v1.5)',
        answers: ['v1.6', '1.6'],
        placeholder: 'A version',
      },
    ],
  },
  reflect: {
    prompt: 'Would you trust your own form with your details? Why?',
    starters: ['I would, because...', 'I\'d still change...'],
  },
  deepen: {
    title: 'Do it for real',
    summary: 'Put your contact form on your live site with an email fallback. If your host offers form handling, read its current terms, and connect it if you\'re happy with how it stores the data.',
  },
  notes: 'Chapter 1 finale of Course 3. Next chapter: Make it move (1 week to uni).',
};

export default lesson;
