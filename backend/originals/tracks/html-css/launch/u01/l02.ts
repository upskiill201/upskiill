import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 1 · Lesson 2 — placeholder instead of a label vs a real label (placeholder only as a hint). Before / After. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'The vanishing label',
  summary: 'Clinton copied a "clean" form design: no labels, just grey words inside the boxes that say Name, Email, Date. It looks neat until you start typing and the words vanish. Here it is, and the same form done properly.',
  minutes: 11,
  outcomes: ['Explain why placeholder text can\'t replace a label', 'Use a label for every input', 'Use placeholder only for an example hint'],
  learn: [
    {
      kind: 'compare',
      title: 'Placeholder only vs a real label',
      before: { label: 'Words inside the box', text: '<input placeholder="Name">\n<input placeholder="Email">\n<input placeholder="Date">\n\nThe grey word disappears the moment you type. Halfway through, Grandma can\'t remember which box was which. The grey is often too faint to read, and some screen readers don\'t read placeholders reliably.' },
      after: { label: 'A label, plus a hint', text: '<label for="email">Email</label>\n<input id="email" placeholder="you@example.com">\n\nThe label stays above the box the whole time. The placeholder is only an example of what to type, and it\'s fine that it disappears.' },
      notes: [
        'Placeholder text disappears when you type, so it can\'t be the label.',
        'Grey placeholder text often fails contrast.',
        'Use placeholder only for an example, never as the only clue.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Type in both',
      caption: 'Type in each box. The top one forgets what it was for; the bottom one doesn\'t.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  label { display: block; margin: 12px 0 4px; }\n  input { font-size: 1rem; padding: 8px; }\n</style>\n<form>\n  <p><input placeholder="Email"></p>\n  <label for="email">Email</label>\n  <input id="email" placeholder="you@example.com">\n</form>\n',
      challenge: 'Type in the top box, then try to remember what it was asking for.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A label always. A placeholder only for an example, like you@example.com.',
    },
  ],
  apply: {
    scenario: 'The vanishing label.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What goes wrong with placeholder-only boxes?',
        options: [
          { text: 'Placeholders are too big', why: 'They vanish, and they\'re often too faint.' },
          { text: 'Nothing, they look cleaner', why: 'Clean, but confusing halfway through.' },
          { text: 'The words vanish when you type, so people forget what the box was for' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix it: give the email box a real label "Email" (for="email") and id="email", keeping the placeholder as an example',
        starter: '<form>\n  <input placeholder="you@example.com">\n</form>\n',
        solution: '<form>\n  <label for="email">Email</label>\n  <input id="email" placeholder="you@example.com">\n</form>\n',
        hint: '<label for="email">Email</label> before the input, and id="email" on it.',
        checks: [
          { message: 'A real label', dom: { selector: 'label[for="email"]', count: 1 } },
          { message: 'Connected to the box', dom: { selector: 'input#email', count: 1 } },
          { message: 'Placeholder kept as a hint', dom: { selector: 'input#email', attr: 'placeholder' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Label or placeholder?',
        groups: ['Label', 'Placeholder'],
        items: [
          { text: 'Stays visible while you type', group: 0 },
          { text: 'An example like you@example.com', group: 1 },
          { text: 'Read out by screen readers when the box is reached', group: 0 },
          { text: 'Disappears when you start typing', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each attribute to its job.',
        pairs: [
          ['for (on the label)', 'Points to the input'],
          ['id (on the input)', 'The name the label points to'],
          ['placeholder', 'An example inside the box'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'But the placeholder design looks so clean!',
        options: [
          { text: 'Then keep it.', why: 'Grandma forgot what each box was for.' },
          { text: 'It looks clean until you type. A small label above each box stays useful the whole time.' },
          { text: 'Make the placeholder bold.', why: 'It still vanishes when you type.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the box that has no real label.',
        language: 'html',
        lines: ['<label for="name">Name</label> <input id="name">', '<input placeholder="Date">', '<label for="venue">Venue</label> <input id="venue" placeholder="e.g. Labadi Beach">'],
        bug: 1,
        explanation: 'Only a placeholder. Add <label for="date">Date</label> and id="date".',
        fix: '<label for="date">Date</label> <input id="date">',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Grandma types "Sound Up Saturdays" in this box. What can she still see that tells her what the box was for?',
        code: '<label for="venue">Venue</label>\n<input id="venue" placeholder="e.g. Labadi Beach">',
        language: 'html',
        options: [
          { text: 'The label "Venue" above it' },
          { text: 'Nothing', why: 'The label stays visible.' },
          { text: 'The placeholder', why: 'It disappears once she types.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'A label, plus an example.',
        language: 'html',
        template: '<label for="email">Email</label>\n<input id="email" [[1]]="you@[[2]].com">',
        blanks: [['placeholder'], ['example']],
        distractors: ['label', 'value', 'gmail'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which attribute puts grey example text inside a box? (one word)',
        answers: ['placeholder'],
        placeholder: 'An attribute',
      },
      {
        kind: 'mcq',
        prompt: 'Why use example.com in a placeholder?',
        options: [
          { text: 'It\'s Kofi\'s email', why: 'It\'s a reserved example domain.' },
          { text: 'It\'s reserved for examples, so it never points to a real person' },
          { text: 'Placeholders need a .com', why: 'It\'s about not using a real address.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever lost track of a form halfway through? What made it confusing?',
    starters: ['I lost track when...', 'It would have helped if...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Check every box on your own form has a real label. Keep placeholders only for examples.',
  },
  notes: 'Placeholder-as-label problems (W3C WAI tutorials; WCAG 3.3.2 Labels or Instructions). example.com is reserved for documentation (RFC 2606).',
};

export default lesson;
