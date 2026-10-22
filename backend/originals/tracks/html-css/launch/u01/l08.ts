import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 1 · Lesson 8 — textarea for longer answers, select/option for a short fixed list. Card deck (text). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Long answers and short lists',
  summary: 'Two questions don\'t fit in a one-line box: "Tell me about the event" needs room to write, and "Type of event" has only a few possible answers. Tey shows the two elements made for them.',
  minutes: 11,
  outcomes: ['Use textarea for longer answers', 'Use select and option for a short list of choices', 'Label both properly'],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>textarea: room to write.</strong> An input is one line. A textarea is a box for several lines. rows="4" sets how tall it starts. Unlike input, it has a closing tag: &lt;textarea&gt;&lt;/textarea&gt;.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>select: pick from a list.</strong> When there are only a few possible answers, like Wedding, Party, Club night, Other, a select shows a drop-down menu. Each choice is an <strong>option</strong>. The option\'s value is what gets sent.</p>',
    },
    {
      kind: 'check',
      question: 'The question is "Anything else I should know?" Which element fits?',
      options: ['input', 'textarea', 'select'],
      answer: 1,
      explanation: 'It needs room for a few sentences: a textarea.',
    },
    {
      kind: 'text',
      html: '<p><strong>Both still need labels.</strong> A label with for, and the element with the matching id and a name, exactly like an input.</p>',
    },
    {
      kind: 'tryIt',
      title: 'A list and a big box',
      caption: 'Open the drop-down, then type a few lines in the big box.',
      code: '<style>\n  * { box-sizing: border-box; }\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  label { display: block; margin: 12px 0 4px; }\n  select, textarea { width: 100%; padding: 12px; font-size: 1rem; }\n</style>\n<form>\n  <label for="kind">Type of event</label>\n  <select id="kind" name="kind">\n    <option value="wedding">Wedding</option>\n    <option value="party">Party</option>\n    <option value="club">Club night</option>\n    <option value="other">Other</option>\n  </select>\n  <label for="details">Anything else I should know?</label>\n  <textarea id="details" name="details" rows="4"></textarea>\n</form>\n',
      challenge: 'Add an option: Campus event, with value campus.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Longer answers: textarea. A few fixed choices: select with options. Both need a label.',
    },
  ],
  apply: {
    scenario: 'Long answers and short lists.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each question to its element.',
        pairs: [
          ['Your name', 'input'],
          ['Anything else I should know?', 'textarea'],
          ['Type of event (4 choices)', 'select'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Add a textarea for "Anything else I should know?" with id and name details and rows 4',
        starter: '<form>\n  <label for="details">Anything else I should know?</label>\n\n</form>\n',
        solution: '<form>\n  <label for="details">Anything else I should know?</label>\n  <textarea id="details" name="details" rows="4"></textarea>\n</form>\n',
        hint: '<textarea id="details" name="details" rows="4"></textarea>',
        checks: [
          { message: 'A textarea', dom: { selector: 'textarea#details', count: 1 } },
          { message: 'With a name', dom: { selector: 'textarea#details', attr: 'name', attrValue: 'details' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'When an option is chosen, what gets sent?',
        options: [
          { text: 'The words on screen', why: 'The value is sent, if there is one.' },
          { text: 'Its value attribute' },
          { text: 'The select\'s id', why: 'The select\'s name plus the option\'s value.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'select or textarea?',
        groups: ['select', 'textarea'],
        items: [
          { text: 'Type of event: 4 choices', group: 0 },
          { text: 'Directions to the venue', group: 1 },
          { text: 'How did you hear about me? (5 choices)', group: 0 },
          { text: 'Songs you\'d love to hear', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Should "City" be a select with every city in Ghana?',
        options: [
          { text: 'Yes, list them all.', why: 'Long lists are slow to scroll.' },
          { text: 'Use a textarea.', why: 'A city is one short line.' },
          { text: 'That\'s a huge list. A text box is quicker for people to type into.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the broken line.',
        language: 'html',
        lines: ['<label for="details">Anything else?</label>', '<textarea id="details" name="details" rows="4">', '<select id="kind" name="kind"><option value="party">Party</option></select>'],
        bug: 1,
        explanation: 'textarea needs a closing tag: </textarea>. Without it, everything after becomes part of the box.',
        fix: '<textarea id="details" name="details" rows="4"></textarea>',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Someone picks "Club night". What is sent?',
        code: '<select name="kind">\n  <option value="party">Party</option>\n  <option value="club">Club night</option>\n</select>',
        language: 'html',
        options: [
          { text: 'kind = Club night', why: 'The value is sent.' },
          { text: 'kind = club' },
          { text: 'club = kind', why: 'name, then the value.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the drop-down.',
        language: 'html',
        template: '<[[1]] id="kind" name="kind">\n  <[[2]] value="wedding">Wedding</option>\n</select>',
        blanks: [['select'], ['option']],
        distractors: ['input', 'list', 'choice'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which element gives room for several lines of text? (tag name)',
        answers: ['textarea', '<textarea>'],
        placeholder: 'A tag',
      },
      {
        kind: 'writeCode',
        prompt: 'Add an option "Campus event" with value campus to the select',
        starter: '<form>\n  <label for="kind">Type of event</label>\n  <select id="kind" name="kind">\n    <option value="party">Party</option>\n\n  </select>\n</form>\n',
        solution: '<form>\n  <label for="kind">Type of event</label>\n  <select id="kind" name="kind">\n    <option value="party">Party</option>\n    <option value="campus">Campus event</option>\n  </select>\n</form>\n',
        hint: '<option value="campus">Campus event</option>',
        checks: [
          { message: 'Two options', dom: { selector: 'select option', count: 2 } },
          { message: 'A campus option', dom: { selector: 'option', attr: 'value', attrValue: 'campus' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which of your form\'s questions need a textarea or a select?',
    starters: ['A textarea for...', 'A select for...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Add one select and one textarea to your form, both with labels, ids and names.',
  },
  notes: 'textarea and select/option per HTML spec. Long selects are slower than typing (common form usability guidance).',
};

export default lesson;
