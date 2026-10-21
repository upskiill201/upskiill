import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 1 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4 (form, label, for/id, name, placeholders, input types). */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Grandma fills it in',
  summary: 'Grandma tries the new booking form on her phone, for a pretend family party. The labels stay put, a calendar pops up for the date, and the email keyboard has an @. Quick checkpoint.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Build fields with labels, ids and names', 'Use placeholders only as hints', 'Choose the right input types'],
  learn: [
    {
      kind: 'story',
      title: 'A pretend party',
      beats: [
        { speaker: 'narrator', text: 'Grandma fills in the form for "Grandma\'s 80th". She taps the date: a calendar. She taps email: an @ key.' },
        { speaker: 'kofi', text: 'She didn\'t ask me a single question.' },
        { speaker: 'tey', text: 'That\'s a good form. Let\'s check the basics.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: the first fields.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Build two fields: "Your name" (text, id name) and "Email" (type email, id email), each with a connected label and a name',
        starter: '<form>\n\n</form>\n',
        solution: '<form>\n  <label for="name">Your name</label>\n  <input type="text" id="name" name="name">\n  <label for="email">Email</label>\n  <input type="email" id="email" name="email">\n</form>\n',
        hint: 'Two label + input pairs. for matches id.',
        checks: [
          { message: 'A name field with its label', dom: { selector: 'label[for="name"] + input#name', count: 1 } },
          { message: 'An email field with its label', dom: { selector: 'label[for="email"] + input#email[type="email"]', count: 1 } },
          { message: 'Both have names', dom: { selector: 'input[name]', count: 2 } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why isn\'t a placeholder enough on its own?',
        options: [
          { text: 'It disappears when you type, so people forget what the box was for' },
          { text: 'Placeholders can\'t be grey', why: 'They\'re usually grey, and faint.' },
          { text: 'It\'s fine on its own', why: 'It vanishes when you type.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each question to its type.',
        pairs: [
          ['Date of the event', 'date'],
          ['Your email', 'email'],
          ['Number of guests', 'number'],
          ['Venue', 'text'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the label that won\'t connect.',
        language: 'html',
        lines: ['<label for="date">Date</label> <input type="date" id="date">', '<label for="guest">Guests</label> <input type="number" id="guests">', '<label for="email">Email</label> <input type="email" id="email">'],
        bug: 1,
        explanation: 'for="guest" vs id="guests". One letter off, and they\'re not connected.',
        fix: '<label for="guests">Guests</label> <input type="number" id="guests">',
      },
      {
        kind: 'sortGroups',
        prompt: 'On the label, or on the input?',
        groups: ['Label', 'Input'],
        items: [
          { text: 'for', group: 0 },
          { text: 'id', group: 1 },
          { text: 'The question in words', group: 0 },
          { text: 'name and type', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'Can the labels sit beside the boxes instead of above?',
        options: [
          { text: 'On wide screens they can, but above is easiest on phones, where most people fill it in.' },
          { text: 'Labels must always be beside.', why: 'Above is clearer on narrow screens.' },
          { text: 'Remove the labels.', why: 'Every box needs one.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'When this form is sent, what is the venue answer called?',
        code: '<label for="v">Venue</label>\n<input id="v" name="venue">',
        language: 'html',
        options: [
          { text: 'venue, from the name attribute' },
          { text: 'v, from the id', why: 'Sent answers use name.' },
          { text: 'Venue, from the label', why: 'The label is for people. name is for sending.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the guests field.',
        language: 'html',
        template: '<label [[1]]="guests">Expected guests</label>\n<input type="[[2]]" id="guests" name="guests" min="1">',
        blanks: [['for'], ['number']],
        distractors: ['id', 'text', 'tel'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which element wraps all the questions of a form? (tag name)',
        answers: ['form', '<form>'],
        placeholder: 'A tag',
      },
      {
        kind: 'orderLines',
        prompt: 'Put one field in order.',
        language: 'html',
        lines: ['<form>', '  <label for="venue">Venue</label>', '  <input type="text" id="venue" name="venue">', '</form>'],
      },
    ],
  },
  reflect: {
    prompt: 'Ask someone to fill in your form without help. Where did they hesitate?',
    starters: ['They hesitated at...', 'I\'ll change...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Give every field on your form a label, a matching id, a name and the right type.',
  },
  notes: 'Checkpoint 1. Reviews l01–l04.',
};

export default lesson;
