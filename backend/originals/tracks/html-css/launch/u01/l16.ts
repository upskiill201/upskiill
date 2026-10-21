import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 1 · Lesson 16 — form myths. Myth or fact. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Forms: myth or fact?',
  summary: 'Clinton is building a sign-up form for his football team and has collected some "rules". A few are right. Sort them before his teammates have to fill it in.',
  minutes: 11,
  outcomes: ['Separate form myths from facts', 'Explain why placeholders and colour aren\'t enough', 'Know what a form can and can\'t do on its own'],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'A placeholder can replace a label.', isFact: false, explain: 'It disappears as you type and is often too faint. Every box needs a real label.' },
        { text: 'An HTML form on its own sends answers to your email.', isFact: false, explain: 'It needs something on a server, or a form service, to receive the answers.' },
        { text: 'Radios in a group must share the same name.', isFact: true, explain: 'That\'s what makes them one group, where only one can be picked.' },
        { text: 'A red border is enough to show a field is required.', isFact: false, explain: 'Not everyone sees colour. Say "(required)" in words.' },
        { text: 'type="email" gives phone users a better keyboard.', isFact: true, explain: 'Phones show a keyboard with @ and often a .com key.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Words, not just colour',
      caption: 'The first field shows "required" only with a red border. The second says it in words too.',
      code: '<style>\n  * { box-sizing: border-box; }\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  label { display: block; margin: 12px 0 4px; }\n  input { font: inherit; width: 100%; padding: 12px; }\n  .only-colour { border: 3px solid red; }\n</style>\n<form>\n  <label for="team">Team name</label>\n  <input class="only-colour" id="team" name="team" required>\n  <label for="player">Player name (required)</label>\n  <input id="player" name="player" required>\n</form>\n',
      challenge: 'Imagine you can\'t see red. Which field tells you it\'s required?',
    },
  ],
  apply: {
    scenario: 'Clinton\'s form rules.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Placeholders can replace labels', group: 0 },
          { text: 'Radios share a name', group: 1 },
          { text: 'A form emails itself to you', group: 0 },
          { text: 'type="email" helps phone keyboards', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does a form need to actually deliver its answers?',
        options: [
          { text: 'Something on a server, or a form service, to receive them' },
          { text: 'Just a submit button', why: 'The button sends; something must receive.' },
          { text: 'A placeholder', why: 'That\'s just a hint in a box.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Don\'t rely on colour: change the label to "Team name (required)"',
        starter: '<form>\n  <label for="team">Team name</label>\n  <input id="team" name="team" required>\n</form>\n',
        solution: '<form>\n  <label for="team">Team name (required)</label>\n  <input id="team" name="team" required>\n</form>\n',
        hint: '<label for="team">Team name (required)</label>',
        checks: [
          { message: 'Required in words', dom: { selector: 'label[for="team"]', text: '(required)' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['"Placeholder = label"', 'It vanishes; use a label'],
          ['"Forms email themselves"', 'They need a receiver'],
          ['"Red means required"', 'Say it in words'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'I\'ll ask for everyone\'s home address and phone, just in case.',
        options: [
          { text: 'Only ask what you need. "Just in case" data is a risk to look after and a reason people give up.' },
          { text: 'Good, more data is better.', why: 'Extra data is extra risk.' },
          { text: 'Ask for their passwords too.', why: 'Never.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap Clinton\'s myth.',
        lines: ['Every input needs a label.', 'A placeholder is enough on its own.', 'Checkboxes allow more than one answer.'],
        bug: 1,
        explanation: 'Placeholders vanish when you type. Use a label.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Someone who can\'t see red reaches this field. What tells them it\'s required?',
        code: '<label for="team">Team name</label>\n<input id="team" style="border: 3px solid red" required>',
        language: 'html',
        options: [
          { text: 'Nothing visible, until the browser complains on send' },
          { text: 'The red border', why: 'They can\'t see the red.' },
          { text: 'The label', why: 'The label doesn\'t say required.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the facts.',
        template: 'Every box needs a [[1]]. Radios in a group share a [[2]].',
        blanks: [['label'], ['name']],
        distractors: ['placeholder', 'colour', 'id'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Is "radios in a group share a name" a myth or a fact? (one word)',
        answers: ['fact'],
        placeholder: 'Myth or fact',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the best way to check a form works for everyone?',
        options: [
          { text: 'Fill it in with only a keyboard, on a phone, and ask others to try it' },
          { text: 'Look at it once', why: 'Try it the ways people actually use it.' },
          { text: 'Trust the design', why: 'Test it.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which of these did you believe?',
    starters: ['I thought...', 'Now I know...'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Search "W3C WAI forms tutorial" and read the page on labelling controls.',
  },
  notes: 'WCAG 1.4.1 Use of Color, 3.3.2 Labels or Instructions. Keyboard-only form testing is introduced more fully in Chapter 3 (Everyone can use it).',
};

export default lesson;
