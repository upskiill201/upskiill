import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 1 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9 (required, form history, textarea/select, styling). */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: no more half-empty bookings',
  summary: 'The test bookings now all arrive with a name, an email and a date. The form wears Kofi\'s colours, and the "anything else" box has room for directions. Quick checkpoint.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Mark the right fields required', 'Use textarea and select', 'Style a form to match the site'],
  learn: [
    {
      kind: 'story',
      title: 'Complete bookings',
      beats: [
        { speaker: 'narrator', text: 'Clinton tries to send a booking with no email. The browser stops him and points at the box.' },
        { speaker: 'clinton', text: 'Fine, FINE. clinton@example.com.' },
        { speaker: 'tey', text: 'The form protects itself now. Check you\'ve got it all.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: a form that works.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Make the date required, say so in its label, and give it type date',
        starter: '<form>\n  <label for="date">Date of the event</label>\n  <input id="date" name="date">\n</form>\n',
        solution: '<form>\n  <label for="date">Date of the event (required)</label>\n  <input type="date" id="date" name="date" required>\n</form>\n',
        hint: 'type="date", required, and (required) in the label.',
        checks: [
          { message: 'A date box', dom: { selector: 'input#date[type="date"]', count: 1 } },
          { message: 'Required', dom: { selector: 'input#date[required]', count: 1 } },
          { message: 'The label says so', dom: { selector: 'label[for="date"]', text: 'required' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'One line (or one choice), or several lines?',
        groups: ['One line or one choice', 'Several lines'],
        items: [
          { text: 'Your email', group: 0 },
          { text: 'Directions to the venue', group: 1 },
          { text: 'Type of event', group: 0 },
          { text: 'Anything else I should know?', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What is sent for this select if Wedding is chosen?',
        code: '<select name="kind">\n  <option value="wedding">Wedding</option>\n</select>',
        language: 'html',
        options: [
          { text: 'kind = wedding' },
          { text: 'Wedding', why: 'name and value are sent.' },
          { text: 'Nothing', why: 'The chosen option\'s value is sent.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that will swallow the rest of the form.',
        language: 'html',
        lines: ['<label for="details">Anything else?</label>', '<textarea id="details" name="details">', '<button type="submit">Send</button>'],
        bug: 1,
        explanation: 'No closing </textarea>, so the button becomes text inside the box.',
        fix: '<textarea id="details" name="details"></textarea>',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each to its year.',
        pairs: [
          ['Forms in HTML 2.0', '1995'],
          ['HTML5 input types', '2014'],
          ['Kofi\'s booking form', '2026'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'The browser checks the email, so I never need to check it again, right?',
        options: [
          { text: 'The browser\'s checks can be skipped. Whatever receives the form should check again.' },
          { text: 'Right, browsers are perfect.', why: 'Browser checks can be bypassed.' },
          { text: 'Emails can\'t be checked.', why: 'type="email" checks the format.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'How should a form show which fields are required?',
        options: [
          { text: 'In words in the label, like "(required)"' },
          { text: 'A red star only', why: 'Not everyone sees or understands it.' },
          { text: 'It doesn\'t need to', why: 'People need to know before they start.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Style every box at once.',
        language: 'css',
        template: 'input, [[1]], textarea { font: [[2]]; width: 100%; }',
        blanks: [['select'], ['inherit']],
        distractors: ['label', 'none', 'option'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which element shows a drop-down list of choices? (tag name)',
        answers: ['select', '<select>'],
        placeholder: 'A tag',
      },
      {
        kind: 'writeCode',
        prompt: 'Add a select "Type of event" (id and name kind) with two options: Party (value party) and Wedding (value wedding)',
        starter: '<form>\n  <label for="kind">Type of event</label>\n\n</form>\n',
        solution: '<form>\n  <label for="kind">Type of event</label>\n  <select id="kind" name="kind">\n    <option value="party">Party</option>\n    <option value="wedding">Wedding</option>\n  </select>\n</form>\n',
        hint: '<select id="kind" name="kind"><option value="party">Party</option><option value="wedding">Wedding</option></select>',
        checks: [
          { message: 'A select', dom: { selector: 'select#kind', count: 1 } },
          { message: 'Two options', dom: { selector: 'select#kind option', count: 2 } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Try to break your own form: send it empty, type a bad email. Did it stop you?',
    starters: ['It stopped me when...', 'It didn\'t stop...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Add required where it\'s needed, a select and a textarea, and style every box to match your site.',
  },
  notes: 'Checkpoint 2. Reviews l06–l09.',
};

export default lesson;
