import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 1 · Lesson 3 — building a form field by field: label, input, name, layout. Steps. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'One field at a time',
  summary: 'Miracle\'s rule for forms: every question is a little package of three things. Four steps to build the package, then stack as many as you need.',
  minutes: 12,
  outcomes: ['Build a form field with label, input, id and name', 'Stack fields neatly with CSS', 'Make inputs wide enough on phones'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps to a field',
      steps: [
        { title: '1. The label', body: 'What the question is, in plain words.', code: '<label for="venue">Venue</label>', language: 'html' },
        { title: '2. The input, with a matching id', body: 'The box. Its id matches the label\'s for.', code: '<input id="venue">', language: 'html' },
        { title: '3. A name', body: 'name is what the answer is called when the form is sent, like venue = "Labadi Beach". It can match the id.', code: '<input id="venue" name="venue">', language: 'html' },
        { title: '4. Stack and size it', body: 'Labels on their own line, boxes full width so they\'re easy to tap on a phone, and a gap between fields.', code: 'label { display: block; margin: 16px 0 4px; }\ninput { width: 100%; padding: 12px; font-size: 1rem; }', language: 'css' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Three neat fields',
      caption: 'Each field is a label and an input. CSS stacks them and makes the boxes easy to tap.',
      code: '<style>\n  * { box-sizing: border-box; }\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  form { max-width: 420px; }\n  label { display: block; margin: 16px 0 4px; }\n  input { width: 100%; padding: 12px; font-size: 1rem; border-radius: 8px; border: 2px solid #1F2E52; }\n</style>\n<form>\n  <label for="name">Your name</label>\n  <input id="name" name="name">\n  <label for="venue">Venue</label>\n  <input id="venue" name="venue">\n  <label for="event">Type of event</label>\n  <input id="event" name="event">\n</form>\n',
      challenge: 'Add a fourth field: "Expected guests", with for, id and name set to guests.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A field = label (for) + input (id + name). Stack labels with display: block, and make boxes full width.',
    },
  ],
  apply: {
    scenario: 'Building fields.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the field-building steps in order.',
        lines: ['Write the label with for', 'Add the input with the matching id', 'Give the input a name', 'Stack and size it with CSS'],
      },
      {
        kind: 'writeCode',
        prompt: 'Build the event field: label "Type of event" (for="event") and an input with id and name both set to event',
        starter: '<form>\n\n</form>\n',
        solution: '<form>\n  <label for="event">Type of event</label>\n  <input id="event" name="event">\n</form>\n',
        hint: '<label for="event">Type of event</label> <input id="event" name="event">',
        checks: [
          { message: 'A label for event', dom: { selector: 'label[for="event"]', count: 1 } },
          { message: 'The matching input', dom: { selector: 'input#event', count: 1 } },
          { message: 'With a name', dom: { selector: 'input#event', attr: 'name', attrValue: 'event' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each attribute to its job.',
        pairs: [
          ['for', 'The label points to an input'],
          ['id', 'The input\'s unique name on the page'],
          ['name', 'What the answer is called when sent'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'HTML or CSS?',
        groups: ['HTML', 'CSS'],
        items: [
          { text: 'name="venue"', group: 0 },
          { text: 'label { display: block; }', group: 1 },
          { text: '<label for="venue">', group: 0 },
          { text: 'input { width: 100%; }', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'ama',
        message: 'The boxes are tiny on my phone. I keep missing them.',
        options: [
          { text: 'Zoom in.', why: 'Fix the boxes instead.' },
          { text: 'Make the text smaller so it fits.', why: 'Smaller is harder to tap.' },
          { text: 'I\'ll make them full width with padding 12px, so they\'re big enough to tap.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the field whose answer has no name when it\'s sent.',
        language: 'html',
        lines: ['<input id="name" name="name">', '<input id="venue">', '<input id="event" name="event">'],
        bug: 1,
        explanation: 'No name attribute, so this answer wouldn\'t be included when the form is sent.',
        fix: '<input id="venue" name="venue">',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Where do the labels sit?',
        code: 'label { display: block; }\n\n<label for="name">Name</label><input id="name">',
        language: 'html',
        options: [
          { text: 'Beside each box', why: 'display: block puts them on their own line.' },
          { text: 'On their own line, above each box' },
          { text: 'Inside the box', why: 'That\'s a placeholder.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Make the boxes easy to tap.',
        language: 'css',
        template: 'input { [[1]]: 100%; [[2]]: 12px; }',
        blanks: [['width'], ['padding']],
        distractors: ['height', 'margin', 'gap'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which input attribute names the answer when the form is sent? (one word)',
        answers: ['name'],
        placeholder: 'An attribute',
      },
      {
        kind: 'writeCode',
        prompt: 'Stack the labels and widen the boxes: label display block, input width 100%',
        starter: '<style>\n\n</style>\n<form><label for="name">Your name</label><input id="name" name="name"></form>\n',
        solution: '<style>\n  label { display: block; }\n  input { width: 100%; }\n</style>\n<form><label for="name">Your name</label><input id="name" name="name"></form>\n',
        hint: 'label { display: block; } input { width: 100%; }',
        checks: [
          { message: 'Labels on their own line', dom: { selector: 'label', style: 'display', styleValue: 'block' } },
          { message: 'Full-width boxes', dom: { selector: 'input', style: 'width', styleValue: '100%' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What three questions would your own contact form ask?',
    starters: ['I\'d ask...', 'Each one needs...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Build three fields on your own form, each with a label, an id and a name, stacked and full width.',
  },
  notes: 'Form controls without a name are not submitted (HTML spec, form data set). Full-width inputs with padding make comfortable touch targets.',
};

export default lesson;
