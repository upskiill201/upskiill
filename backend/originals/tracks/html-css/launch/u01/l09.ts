import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 1 · Lesson 9 — the browser's default form look vs a styled form that matches the site. Before / After. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'A form that looks like Mensah Beats',
  summary: 'The booking form works, but it looks like it was borrowed from a 2003 tax website: tiny grey boxes, a different font, a little grey button. Here\'s the same form wearing Kofi\'s colours.',
  minutes: 11,
  outcomes: ['Make form fields use the page\'s font', 'Style inputs, selects and textareas together', 'Make a clear, tappable send button'],
  learn: [
    {
      kind: 'compare',
      title: 'Browser default vs styled',
      before: { label: 'Default look', text: 'No CSS for the form.\n\nBoxes are small, and many browsers give inputs their own small font instead of the page\'s Verdana. The button is a tiny grey rectangle. It works, but it doesn\'t look like it belongs to Mensah Beats.' },
      after: { label: 'Styled', text: 'input, select, textarea {\n  font: inherit;\n  width: 100%;\n  padding: 12px;\n  border: 2px solid #1F2E52;\n  border-radius: 8px;\n}\nbutton {\n  font: inherit;\n  padding: 12px 24px;\n  background-color: #FF9600;\n  color: #14213D;\n  border: none;\n  border-radius: 8px;\n}\n\nSame font as the page, comfortable boxes, and a big orange button with dark text.' },
      notes: [
        'Form controls don\'t always take the page\'s font: font: inherit fixes that.',
        'Group input, select and textarea in one rule.',
        'The send button should be big, clear and high-contrast.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'The styled booking form',
      caption: 'One rule styles every box; another styles the button.',
      code: '<style>\n  * { box-sizing: border-box; }\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  form { max-width: 420px; }\n  label { display: block; margin: 16px 0 4px; }\n  input, select, textarea { font: inherit; width: 100%; padding: 12px; border: 2px solid #1F2E52; border-radius: 8px; }\n  button { font: inherit; margin-top: 16px; padding: 12px 24px; background-color: #FF9600; color: #14213D; border: none; border-radius: 8px; }\n</style>\n<form>\n  <label for="name">Your name (required)</label>\n  <input id="name" name="name" required>\n  <label for="kind">Type of event</label>\n  <select id="kind" name="kind"><option value="party">Party</option><option value="wedding">Wedding</option></select>\n  <button type="submit">Send booking request</button>\n</form>\n',
      challenge: 'Delete font: inherit from the boxes. Does the font change in your browser?',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'input, select, textarea { font: inherit; } is the first line of every styled form.',
    },
  ],
  apply: {
    scenario: 'The 2003 tax form.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why might the boxes use a different font from the rest of the page?',
        options: [
          { text: 'Browsers often give form controls their own font instead of inheriting it' },
          { text: 'The font is broken', why: 'Form controls just don\'t always inherit.' },
          { text: 'Boxes can only use one font', why: 'font: inherit lets them use the page\'s.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Style all the boxes in one rule: input, select, textarea get width 100% and padding 12px',
        starter: '<style>\n\n</style>\n<form><input id="name" name="name"><select id="kind" name="kind"><option>Party</option></select><textarea id="details" name="details"></textarea></form>\n',
        solution: '<style>\n  input, select, textarea { width: 100%; padding: 12px; }\n</style>\n<form><input id="name" name="name"><select id="kind" name="kind"><option>Party</option></select><textarea id="details" name="details"></textarea></form>\n',
        hint: 'input, select, textarea { width: 100%; padding: 12px; }',
        checks: [
          { message: 'Inputs styled', dom: { selector: 'input', style: 'padding-top', styleValue: '12px' } },
          { message: 'Selects styled', dom: { selector: 'select', style: 'width', styleValue: '100%' } },
          { message: 'Textareas styled', dom: { selector: 'textarea', style: 'padding-left', styleValue: '12px' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps the form, or hurts it?',
        groups: ['Helps', 'Hurts'],
        items: [
          { text: 'font: inherit on the boxes', group: 0 },
          { text: 'Light grey text on a white box', group: 1 },
          { text: 'A big, high-contrast send button', group: 0 },
          { text: 'Tiny 20px-tall boxes', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to its job.',
        pairs: [
          ['font: inherit', 'Use the page\'s font'],
          ['width: 100%', 'Full-width boxes'],
          ['padding: 12px', 'Comfortable to tap'],
          ['background-color: #FF9600', 'A send button that stands out'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'Can the button be pink with white text? It\'d look nice.',
        options: [
          { text: 'White on that pink is too faint for text. Orange with night-blue text reads clearly.' },
          { text: 'Yes, any colours.', why: 'Contrast matters on buttons too.' },
          { text: 'Make it the same as the page.', why: 'Then nobody can find it.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the rule that leaves the textarea unstyled.',
        language: 'css',
        lines: ['input, select { font: inherit; padding: 12px; }', 'button { font: inherit; padding: 12px 24px; }', 'label { display: block; }'],
        bug: 0,
        explanation: 'textarea is missing from the list, so the "Anything else?" box looks different.',
        fix: 'input, select, textarea { font: inherit; padding: 12px; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does the button look like?',
        code: 'button { padding: 12px 24px; background-color: #FF9600; color: #14213D; border: none; border-radius: 8px; }',
        language: 'css',
        options: [
          { text: 'A big orange button with dark text and soft corners' },
          { text: 'A tiny grey rectangle', why: 'That\'s the default before styling.' },
          { text: 'Invisible', why: 'It has an orange background.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Give the boxes the page\'s font.',
        language: 'css',
        template: 'input, select, textarea { font: [[1]]; }',
        blanks: [['inherit']],
        distractors: ['default', 'none', 'Verdana'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which value makes a form box use the same font as the page? (one word)',
        answers: ['inherit'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'Style the send button: background-color #FF9600, color #14213D, padding 12px 24px',
        starter: '<style>\n\n</style>\n<form><button type="submit">Send booking request</button></form>\n',
        solution: '<style>\n  button { background-color: #FF9600; color: #14213D; padding: 12px 24px; }\n</style>\n<form><button type="submit">Send booking request</button></form>\n',
        hint: 'button { background-color: #FF9600; color: #14213D; padding: 12px 24px; }',
        checks: [
          { message: 'Orange button', dom: { selector: 'button', style: 'background-color', styleValue: '#FF9600' } },
          { message: 'Dark text', dom: { selector: 'button', style: 'color', styleValue: '#14213D' } },
          { message: 'Big enough to tap', dom: { selector: 'button', style: 'padding-top', styleValue: '12px' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Does your own form look like it belongs to your site? What would make it match?',
    starters: ['It looks...', 'I\'ll change...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Add input, select, textarea { font: inherit; width: 100%; padding: 12px; } and a big, high-contrast button to your form.',
  },
  notes: 'Form controls don\'t inherit font by default in most user-agent stylesheets; font: inherit is a common reset. font shorthand isn\'t page-checked because engines report it inconsistently. The button element is explained in lesson 13.',
};

export default lesson;
