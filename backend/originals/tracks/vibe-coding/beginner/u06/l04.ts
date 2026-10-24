import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 4. Card deck: reproduce first. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Make it happen again',
  summary: 'Mrs Castillo\'s sign-up appears twice. Mr Nguyen\'s doesn\'t. Hazel can\'t fix what she can\'t make happen. Ruth\'s rule: "If you can\'t break it on purpose, you can\'t prove you fixed it."',
  minutes: 11,
  outcomes: [
    'Find steps that make a bug happen every time',
    'Write those steps down as the bug\'s "recipe"',
    'Use the recipe to prove a fix',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>To <strong>reproduce</strong> a bug means to find exact steps that make it happen every time. Those steps are its <strong>recipe</strong>.</p><p>Hazel tries: one sign-up, fine. Refresh, sign up for another gig: <strong>two rows</strong>. Refresh twice, sign up: <strong>three rows</strong>. Now she has a recipe:</p>',
    },
    {
      kind: 'code',
      language: 'plaintext',
      code: 'Recipe: double sign-ups\n1. Log in. Open the gig list.\n2. Tap "Refresh list" once.\n3. Tap "Drive" on any gig.\nExpected: 1 new sign-up.  Happens: 2 new sign-ups.\n(Each extra refresh adds one more.)',
      caption: 'A recipe the AI can follow, and a pattern it can explain.',
    },
    {
      kind: 'text',
      html: '<p>The pattern is the clue: <em>each refresh adds one more</em>. Hazel pastes the recipe and asks "Explain why before changing code." The AI: <em>"Every refresh attaches the click handler to the buttons again, so one tap runs it twice. Attach it once."</em></p><p>And the recipe is the proof: after the fix, follow it again. One row.</p>',
    },
  ],
  apply: {
    scenario: 'The double sign-ups.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does "reproduce a bug" mean?',
        options: [
          { text: 'Copy the bug into another app', why: 'It means making it happen on purpose.' },
          { text: 'Find exact steps that make it happen every time' },
          { text: 'Ask the AI to guess', why: 'Reproducing is the opposite of guessing.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the bug recipe in order.',
        lines: ['Log in and open the gig list', 'Tap "Refresh list" once', 'Tap "Drive" on any gig', 'Count the new sign-ups: 2'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Each refresh adds one more copy. After 3 refreshes, one tap makes how many sign-ups? (Number only.)',
        answers: ['4', 'four'],
        placeholder: 'Number',
      },
      {
        kind: 'chatReply',
        from: 'ruth',
        message: 'It only happened to Mrs Castillo. Maybe it\'s her phone?',
        prompt: 'Hazel\'s answer?',
        options: [
          { text: 'Probably, ignore it.', why: 'It happens whenever someone refreshes first. Not her phone.' },
          { text: 'I can make it happen on my laptop every time: refresh, then sign up. So it\'s the app, not her phone.' },
          { text: 'Ask her to buy a new phone.', why: 'The recipe shows it\'s the app.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Ruth\'s rule.',
        template: 'If you can\'t [[1]] it on purpose, you can\'t [[2]] you fixed it.',
        blanks: [['break'], ['prove']],
        distractors: ['ignore', 'hope'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good recipe step, or too vague?',
        groups: ['Good step', 'Too vague'],
        items: [
          { text: 'Tap "Refresh list" once', group: 0 },
          { text: 'Use the app a bit', group: 1 },
          { text: 'Tap "Drive" on the Nov 7 gig', group: 0 },
          { text: 'Do stuff until it breaks', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Hazel\'s report is missing what she expected?',
        lines: [
          'Steps: log in, refresh once, tap Drive.',
          'Happens: 2 new sign-ups.',
          'Expected: it should work.',
        ],
        bug: 2,
        fix: 'Expected: exactly 1 new sign-up.',
        explanation: '"Should work" isn\'t checkable. "Exactly 1" is.',
      },
      {
        kind: 'mcq',
        prompt: 'The AI says "Fixed!". How does Hazel prove it?',
        options: [
          { text: 'Follow the recipe again and see exactly one new sign-up' },
          { text: 'Trust it', why: '"Fixed" is a claim.' },
          { text: 'Ask Mrs Castillo next week', why: 'The recipe proves it today.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to why it matters.',
        pairs: [
          ['Find the recipe', 'Shows it\'s real and repeatable'],
          ['Spot the pattern', 'Points at the cause'],
          ['Follow it after the fix', 'Proves the fix'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Review from lesson 2: what goes at the end of the report with the recipe?',
        options: [
          { text: '"Do whatever."', why: 'That invites guessing.' },
          { text: '"Rewrite the app."', why: 'Much too big.' },
          { text: '"Explain why this happens before changing code."' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a "sometimes" problem in your life (a phone that only sometimes won\'t charge). What would its recipe be?',
  },
  deepen: {
    title: 'On your computer: write a recipe',
    summary: 'Find something in your app that sometimes goes wrong (or try odd orders of taps until something does). Write its recipe: steps, expected, happens. Paste it and ask for an explanation first.',
  },
  notes: 'Bug reproduction; duplicate event listeners attached on each re-render is a classic vanilla-JS bug.',
};

export default lesson;
