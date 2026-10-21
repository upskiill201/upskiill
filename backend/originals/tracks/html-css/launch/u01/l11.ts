import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 1 · Lesson 11 — a one-of-a-few question: radio buttons grouped in fieldset/legend. Story choice. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Speakers, or not?',
  summary: 'Half of Kofi\'s gigs have a sound system; half need him to bring speakers, which costs more. He needs one clear question: "Is there a sound system?" Yes, No, or Not sure. Choose how to ask it.',
  minutes: 11,
  outcomes: ['Use radio buttons for one choice out of a few', 'Group them with fieldset and legend', 'Give every radio its own label'],
  learn: [
    {
      kind: 'story',
      title: 'Bring the speakers?',
      beats: [
        { speaker: 'narrator', text: 'Last month Kofi carried two speakers across Accra to a venue that already had a sound system. The week after, he arrived to a venue with none.' },
        { speaker: 'kofi', text: 'One question would have saved both trips: is there a sound system?' },
        { speaker: 'miracle', text: 'Three possible answers, pick exactly one. There\'s an element made for that.' },
      ],
      choice: {
        prompt: 'How should the form ask about the sound system?',
        options: [
          {
            text: 'Three radio buttons, Yes, No and Not sure, grouped under the question with fieldset and legend.',
            outcome: 'All three answers are visible at once, only one can be picked, and screen readers announce the question with each choice.',
            best: true,
          },
          {
            text: 'A text box: "Type yes or no".',
            outcome: 'He gets "yeah", "ya", "nope", "maybe?" and "ask the manager". Hard to read at a glance.',
          },
          {
            text: 'Three separate checkboxes.',
            outcome: 'Someone ticks both Yes and No. Checkboxes allow many answers; this question has one.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p><strong>Radio buttons: pick one.</strong> Each choice is an input type="radio". They share the same <strong>name</strong>, so picking one unticks the others, and each has its own <strong>value</strong> and label. Wrap the group in a <strong>fieldset</strong>, with a <strong>legend</strong> that asks the question.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Is there a sound system?',
      caption: 'Pick one, then pick another. Only one can be chosen, because they share name="sound".',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  fieldset { border: 2px solid #1F2E52; border-radius: 8px; padding: 12px; }\n  label { margin-right: 16px; }\n</style>\n<form>\n  <fieldset>\n    <legend>Is there a sound system at the venue?</legend>\n    <input type="radio" id="sound-yes" name="sound" value="yes">\n    <label for="sound-yes">Yes</label>\n    <input type="radio" id="sound-no" name="sound" value="no">\n    <label for="sound-no">No</label>\n    <input type="radio" id="sound-unsure" name="sound" value="unsure">\n    <label for="sound-unsure">Not sure</label>\n  </fieldset>\n</form>\n',
      challenge: 'Change the third radio\'s name to "sound2". Now you can pick it AND another one. Change it back.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Radios: same name, different values, one label each. fieldset groups them; legend asks the question.',
    },
  ],
  apply: {
    scenario: 'Bring the speakers?',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why do the three radios need the same name?',
        options: [
          { text: 'So they act as one group: picking one unticks the others' },
          { text: 'So they look the same', why: 'name makes them one group.' },
          { text: 'They don\'t; each needs a different name', why: 'Different names make separate groups.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Add the third choice: a radio with id sound-unsure, name sound, value unsure, and a label "Not sure"',
        starter: '<form>\n  <fieldset>\n    <legend>Is there a sound system?</legend>\n    <input type="radio" id="sound-yes" name="sound" value="yes"><label for="sound-yes">Yes</label>\n    <input type="radio" id="sound-no" name="sound" value="no"><label for="sound-no">No</label>\n\n  </fieldset>\n</form>\n',
        solution: '<form>\n  <fieldset>\n    <legend>Is there a sound system?</legend>\n    <input type="radio" id="sound-yes" name="sound" value="yes"><label for="sound-yes">Yes</label>\n    <input type="radio" id="sound-no" name="sound" value="no"><label for="sound-no">No</label>\n    <input type="radio" id="sound-unsure" name="sound" value="unsure"><label for="sound-unsure">Not sure</label>\n  </fieldset>\n</form>\n',
        hint: '<input type="radio" id="sound-unsure" name="sound" value="unsure"><label for="sound-unsure">Not sure</label>',
        checks: [
          { message: 'Three choices in one group', dom: { selector: 'input[type="radio"][name="sound"]', count: 3 } },
          { message: 'The new one has a label', dom: { selector: 'label[for="sound-unsure"]', text: 'Not sure' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to what happened.',
        pairs: [
          ['Radios in a fieldset', 'One clear answer'],
          ['A "type yes or no" box', '"yeah", "ya", "nope"'],
          ['Three checkboxes', 'Both Yes and No ticked'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of the group is it?',
        groups: ['fieldset / legend', 'Each radio'],
        items: [
          { text: 'The question "Is there a sound system?"', group: 0 },
          { text: 'value="yes"', group: 1 },
          { text: 'The border around the whole group', group: 0 },
          { text: 'Its own label', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Why the legend? There\'s already a heading above it.',
        options: [
          { text: 'The legend belongs to the group, so screen readers say the question with each choice: "Is there a sound system? Yes".' },
          { text: 'It\'s only for styling.', why: 'It ties the question to the choices.' },
          { text: 'It\'s not needed.', why: 'Without it, "Yes" has no question attached.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the radio that won\'t join the group.',
        language: 'html',
        lines: ['<input type="radio" id="sound-yes" name="sound" value="yes">', '<input type="radio" id="sound-no" name="speakers" value="no">', '<input type="radio" id="sound-unsure" name="sound" value="unsure">'],
        bug: 1,
        explanation: 'A different name makes it a separate group, so it can be picked alongside Yes.',
        fix: '<input type="radio" id="sound-no" name="sound" value="no">',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Someone picks "No". What is sent?',
        code: '<input type="radio" id="sound-no" name="sound" value="no">\n<label for="sound-no">No</label>',
        language: 'html',
        options: [
          { text: 'sound = no' },
          { text: 'sound-no', why: 'name and value are sent, not the id.' },
          { text: 'No = sound', why: 'name, then value.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Group the question.',
        language: 'html',
        template: '<[[1]]>\n  <[[2]]>Is there a sound system?</legend>\n  ...\n</fieldset>',
        blanks: [['fieldset'], ['legend']],
        distractors: ['form', 'label', 'caption'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which input type lets people pick exactly one of a few choices? (one word)',
        answers: ['radio'],
        placeholder: 'A type',
      },
      {
        kind: 'mcq',
        prompt: 'When are radio buttons better than a select?',
        options: [
          { text: 'When there are only a few choices, so all can be seen at once' },
          { text: 'When there are 50 choices', why: 'A long list suits a select or text box better.' },
          { text: 'Never', why: 'For a few choices, visible radios are quickest.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which question on your own form has a few fixed answers? Would radios suit it?',
    starters: ['My question...', 'has the answers...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Add a group of radio buttons to your form in a fieldset with a legend. Check that only one can be picked.',
  },
  notes: 'Radio groups share a name; fieldset/legend grouping per WAI forms tutorial (grouping controls). Screen readers commonly announce the legend with the first or each control.',
};

export default lesson;
