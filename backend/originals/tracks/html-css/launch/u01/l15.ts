import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 1 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14 (radios, checkboxes, fieldset, submit, action, the full form). */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: under a minute',
  summary: 'The organiser fills in the whole booking form on her phone, waiting for a tro-tro. Fifty-two seconds. Every answer is in the right place. Quick checkpoint.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Use radios and checkboxes correctly', 'Group choices with fieldset and legend', 'Add a clear submit button'],
  learn: [
    {
      kind: 'story',
      title: 'Fifty-two seconds',
      beats: [
        { speaker: 'narrator', text: 'The organiser sends a screenshot: the filled-in form, with a timer showing 52 seconds.' },
        { speaker: 'kofi', text: 'Under a minute, at a bus stop.' },
        { speaker: 'tey', text: 'That\'s a good form. Let\'s check it all holds together.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: the full form.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Build the set-length question: a fieldset with legend "How long is the set?" and two radios (name length): 1 hour (value 1h) and 2 hours (value 2h), each labelled',
        starter: '<form>\n\n</form>\n',
        solution: '<form>\n  <fieldset>\n    <legend>How long is the set?</legend>\n    <input type="radio" id="length-1" name="length" value="1h"><label for="length-1">1 hour</label>\n    <input type="radio" id="length-2" name="length" value="2h"><label for="length-2">2 hours</label>\n  </fieldset>\n</form>\n',
        hint: 'A fieldset, a legend, then two radio + label pairs with name="length".',
        checks: [
          { message: 'A question in a fieldset', dom: { selector: 'fieldset legend', text: 'How long' } },
          { message: 'Two radios in one group', dom: { selector: 'fieldset input[type="radio"][name="length"]', count: 2 } },
          { message: 'Each with a label', dom: { selector: 'fieldset label', count: 2 } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Radio or checkbox?',
        groups: ['Radio', 'Checkbox'],
        items: [
          { text: 'How long is the set?', group: 0 },
          { text: 'Which extras? (pick any)', group: 1 },
          { text: 'Is there a sound system?', group: 0 },
          { text: 'Which styles? (pick any)', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Lights and MC are ticked. What is sent?',
        code: '<input type="checkbox" name="extras" value="lights">\n<input type="checkbox" name="extras" value="smoke">\n<input type="checkbox" name="extras" value="mc">',
        language: 'html',
        options: [
          { text: 'extras = lights and extras = mc' },
          { text: 'extras = mc only', why: 'Every ticked checkbox is sent.' },
          { text: 'All three', why: 'Only ticked ones are sent.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that breaks the radio group.',
        language: 'html',
        lines: ['<input type="radio" id="length-1" name="length" value="1h">', '<input type="radio" id="length-2" name="set-length" value="2h">', '<input type="radio" id="length-3" name="length" value="3h">'],
        bug: 1,
        explanation: 'A different name makes it its own group. All three need name="length".',
        fix: '<input type="radio" id="length-2" name="length" value="2h">',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to its job.',
        pairs: [
          ['fieldset', 'Groups related choices'],
          ['legend', 'Asks the group\'s question'],
          ['button type="submit"', 'Sends the form'],
          ['action', 'Where the answers go'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'The form still doesn\'t send anywhere real. Is it okay to publish?',
        options: [
          { text: 'Yes, with a clear "or email bookings@example.com" line under it, until I connect a form service.' },
          { text: 'Yes, nobody will notice.', why: 'Their bookings would vanish.' },
          { text: 'Never publish forms.', why: 'Just add a fallback for now.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Which button text is clearest?',
        options: [
          { text: 'Send booking request' },
          { text: 'Submit', why: 'Says what it is, not what happens.' },
          { text: 'Go', why: 'Go where?' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the send button.',
        language: 'html',
        template: '<button [[1]]="[[2]]">Send booking request</button>',
        blanks: [['type'], ['submit']],
        distractors: ['action', 'send', 'button'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which element asks the question for a group of radios or checkboxes? (tag name)',
        answers: ['legend', '<legend>'],
        placeholder: 'A tag',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the form\'s parts in order, top to bottom.',
        lines: ['Your name and email', 'Date and type of event', 'Sound system (radios)', 'Anything else? (textarea)', 'Send booking request (button)'],
      },
    ],
  },
  reflect: {
    prompt: 'Time someone filling in your form. How long did it take?',
    starters: ['It took...', 'The slowest part was...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Time a friend filling in your form on a phone. Remove or simplify whatever slowed them down.',
  },
  notes: 'Checkpoint 3. Reviews l11–l14.',
};

export default lesson;
