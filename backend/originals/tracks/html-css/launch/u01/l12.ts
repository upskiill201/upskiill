import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 1 · Lesson 12 — checkboxes for "pick any", radios for "pick one"; checked, value, name. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Pick one, or pick any?',
  summary: 'Next question: "Which kinds of music do you want?" Highlife, afrobeats, amapiano, hip hop. A crowd might want three of them. That\'s not a radio question. Tap each part to see the difference.',
  minutes: 11,
  outcomes: ['Use checkboxes when several answers can be true', 'Tell radios and checkboxes apart', 'Pre-select an answer with checked'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part',
      text: '<fieldset>\n  <legend>Which styles do you want? (pick any)</legend>\n  <input type="checkbox" id="style-highlife" name="styles" value="highlife" checked>\n  <label for="style-highlife">Highlife</label>\n  <input type="checkbox" id="style-amapiano" name="styles" value="amapiano">\n  <label for="style-amapiano">Amapiano</label>\n</fieldset>',
      hotspots: [
        { phrase: '(pick any)', note: 'Tell people they can choose more than one. The legend is the place.' },
        { phrase: 'type="checkbox"', note: 'A checkbox: tick as many as you like, or none. Radios are for exactly one.' },
        { phrase: 'name="styles"', note: 'Checkboxes in a group usually share a name too. Every ticked one is sent: styles = highlife, styles = amapiano.' },
        { phrase: 'checked', note: 'Ticked to start with. Use it for a sensible default, not to sneak in a "yes".' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Tick any',
      caption: 'Tick two or three styles. Unlike radios, they don\'t untick each other.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  fieldset { border: 2px solid #1F2E52; border-radius: 8px; padding: 12px; }\n  label { margin-right: 16px; }\n</style>\n<form>\n  <fieldset>\n    <legend>Which styles do you want? (pick any)</legend>\n    <input type="checkbox" id="style-highlife" name="styles" value="highlife" checked><label for="style-highlife">Highlife</label>\n    <input type="checkbox" id="style-afrobeats" name="styles" value="afrobeats"><label for="style-afrobeats">Afrobeats</label>\n    <input type="checkbox" id="style-amapiano" name="styles" value="amapiano"><label for="style-amapiano">Amapiano</label>\n    <input type="checkbox" id="style-hiphop" name="styles" value="hiphop"><label for="style-hiphop">Hip hop</label>\n  </fieldset>\n</form>\n',
      challenge: 'Change them all to type="radio". Now try to pick two.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Exactly one answer: radio. Any number of answers: checkbox. Say "(pick any)" or "(pick one)" in the legend.',
    },
  ],
  apply: {
    scenario: 'Pick one, or pick any?',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Radio or checkbox?',
        groups: ['Radio (one)', 'Checkbox (any)'],
        items: [
          { text: 'Is there a sound system? Yes / No / Not sure', group: 0 },
          { text: 'Which styles do you want?', group: 1 },
          { text: 'How long is the set? 1 hour / 2 hours / 3 hours', group: 0 },
          { text: 'Which extras? Lights / Smoke machine / MC', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Add an Amapiano checkbox: id style-amapiano, name styles, value amapiano, with a label',
        starter: '<form>\n  <fieldset>\n    <legend>Which styles? (pick any)</legend>\n    <input type="checkbox" id="style-highlife" name="styles" value="highlife"><label for="style-highlife">Highlife</label>\n\n  </fieldset>\n</form>\n',
        solution: '<form>\n  <fieldset>\n    <legend>Which styles? (pick any)</legend>\n    <input type="checkbox" id="style-highlife" name="styles" value="highlife"><label for="style-highlife">Highlife</label>\n    <input type="checkbox" id="style-amapiano" name="styles" value="amapiano"><label for="style-amapiano">Amapiano</label>\n  </fieldset>\n</form>\n',
        hint: '<input type="checkbox" id="style-amapiano" name="styles" value="amapiano"><label for="style-amapiano">Amapiano</label>',
        checks: [
          { message: 'Two checkboxes', dom: { selector: 'input[type="checkbox"][name="styles"]', count: 2 } },
          { message: 'Amapiano has a label', dom: { selector: 'label[for="style-amapiano"]', text: 'Amapiano' } },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Someone ticks Highlife and Amapiano. What is sent?',
        code: '<input type="checkbox" name="styles" value="highlife">\n<input type="checkbox" name="styles" value="amapiano">',
        language: 'html',
        options: [
          { text: 'Only the last one ticked', why: 'Every ticked checkbox is sent.' },
          { text: 'Nothing, checkboxes aren\'t sent', why: 'Ticked ones are sent.' },
          { text: 'styles = highlife and styles = amapiano' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each to what it does.',
        pairs: [
          ['type="radio"', 'Pick exactly one'],
          ['type="checkbox"', 'Pick any number'],
          ['checked', 'Ticked to start with'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Kofi should add a checkbox "Sign me up for the newsletter" that\'s already ticked. More sign-ups!',
        options: [
          { text: 'Great idea.', why: 'Pre-ticked consent isn\'t real consent.' },
          { text: 'Sneaking in a pre-ticked yes isn\'t honest, and in many places consent must be opt-in. Leave it unticked.' },
          { text: 'Hide the checkbox and tick it.', why: 'That\'s even worse.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the input that should be a radio, not a checkbox.',
        language: 'html',
        lines: ['<input type="checkbox" name="extras" value="lights">', '<input type="checkbox" name="length" value="2h">', '<input type="checkbox" name="styles" value="highlife">'],
        bug: 1,
        explanation: 'The set length has exactly one answer, so it should be a radio.',
        fix: '<input type="radio" name="length" value="2h">',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the best use of checked?',
        options: [
          { text: 'A sensible default, like the most common answer' },
          { text: 'Sneaking people into a newsletter', why: 'Consent should be the person\'s own choice.' },
          { text: 'Ticking every box', why: 'Let people choose.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the checkbox.',
        language: 'html',
        template: '<input type="[[1]]" id="style-hiphop" name="styles" [[2]]="hiphop">',
        blanks: [['checkbox'], ['value']],
        distractors: ['radio', 'name', 'checked'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which attribute makes a checkbox ticked from the start? (one word)',
        answers: ['checked'],
        placeholder: 'An attribute',
      },
      {
        kind: 'writeCode',
        prompt: 'Tell people they can choose several: put "(pick any)" in the legend',
        starter: '<form>\n  <fieldset>\n    <legend>Which styles do you want?</legend>\n    <input type="checkbox" id="style-highlife" name="styles" value="highlife"><label for="style-highlife">Highlife</label>\n  </fieldset>\n</form>\n',
        solution: '<form>\n  <fieldset>\n    <legend>Which styles do you want? (pick any)</legend>\n    <input type="checkbox" id="style-highlife" name="styles" value="highlife"><label for="style-highlife">Highlife</label>\n  </fieldset>\n</form>\n',
        hint: '<legend>Which styles do you want? (pick any)</legend>',
        checks: [
          { message: 'The legend says pick any', dom: { selector: 'legend', text: 'pick any' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Does your own form have a question with several possible answers?',
    starters: ['My question...', 'People might pick...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Add a checkbox group to your form, with "(pick any)" in its legend. Leave every box unticked unless there\'s a sensible default.',
  },
  notes: 'Checkbox groups submit each checked value under the shared name. Pre-ticked consent boxes are not valid consent under laws like the GDPR; kept general ("in many places").',
};

export default lesson;
