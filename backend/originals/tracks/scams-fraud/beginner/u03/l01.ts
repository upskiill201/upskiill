import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1. Story with a choice: the fraud team call. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The fraud team',
  summary: 'The caller knows Grace\'s name, her bank and the last four digits of her card. The number on screen is the bank\'s real one. Now they want her to read out a code they\'ve just texted her. What should she do?',
  minutes: 12,
  outcomes: [
    'Handle a call claiming to be your bank',
    'Know why one-time codes must never be shared',
    'Hang up and call back safely',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 6:17 p.m.',
      beats: [
        { speaker: 'narrator', text: '"We\'ve blocked two payments, £640 and £1,150. To stop more, I need to verify you. I\'ve sent a code to your phone. Can you read it back to me?"' },
        { speaker: 'narrator', text: 'Her phone buzzes. A text from the bank: "Your code is 482915. Never share this code with anyone, including us."' },
        { speaker: 'grace', text: '(reading it) "...including us." Hang on.' },
        { speaker: 'narrator', text: '"Mrs Grace, every second counts. If you hang up, the money could be gone."' },
        { speaker: 'tey', text: 'The text itself says never to share the code. The caller says hurry. What should Grace do?' },
      ],
      choice: {
        prompt: 'What should Grace do?',
        options: [
          { text: 'Read out the code; the caller knows her card details, so it must be the bank.', outcome: 'Details like your name and card digits can come from data leaks. The code is often what lets the scammer approve a payment or add your card to their phone. Reading it out hands them the key.' },
          { text: 'Hang up. Then call the number on the back of her card, from a different phone or after a few minutes, and check.', outcome: 'Yes. Her real bank says there are no suspicious payments, and thanks her for not sharing the code. A real bank will never be upset that you hung up.', best: true },
          { text: 'Stay on the line but refuse the code, and do whatever else they ask to "secure" the account.', outcome: 'Staying on gives them time to try another route: moving money to a "safe account", installing an app, or a different code. Hang up.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Never share a one-time code, PIN or password with anyone who contacts you, even if they sound exactly like your bank. Hang up and call the number on your card.',
    },
  ],
  apply: {
    scenario: 'The fraud team call.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did the bank\'s own text say about the code?',
        options: [
          { text: 'Share it with the caller', why: 'It said the opposite.' },
          { text: 'Never share it with anyone, including the bank' },
          { text: 'Nothing', why: 'It warned her clearly.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe action, or dangerous?',
        groups: ['Safe', 'Dangerous'],
        items: [
          { text: 'Hang up and call the number on the card', group: 0 },
          { text: 'Read out the code', group: 1 },
          { text: 'Use a different phone to call back', group: 0 },
          { text: 'Stay on the line to "help"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'jayden',
        message: 'How did they know your card digits though?',
        prompt: 'Grace\'s best reply?',
        options: [
          { text: 'They must be the bank.', why: 'Details can be leaked or bought.' },
          { text: 'Magic.', why: 'Leaks and stolen data.' },
          { text: 'Data leaks. Scammers buy details like that. Knowing them proves nothing.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Never share a one-time [[1]], PIN or [[2]] with anyone who contacts you.',
        blanks: [['code'], ['password']],
        distractors: ['email', 'address'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each caller tactic to its ingredient.',
        pairs: [
          ['"Every second counts"', 'Urgency'],
          ['"This is the fraud team"', 'Authority'],
          ['"The money could be gone"', 'Fear'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The caller claimed two payments of £640 and £1,150. Total, in pounds?',
        answers: ['1790', '1,790', '£1,790', '£1790'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which step in calling back isn\'t safe?',
        lines: [
          'Hang up.',
          'Use a different phone, or wait a few minutes.',
          'Call back the number that just rang me.',
        ],
        bug: 2,
        fix: 'Call the number on the back of the card.',
        explanation: 'The incoming number may be spoofed.',
      },
      {
        kind: 'mcq',
        prompt: 'What can a stolen one-time code let a scammer do?',
        options: [
          { text: 'Approve a payment or add your card to their device' },
          { text: 'Nothing at all', why: 'Codes approve actions.' },
          { text: 'Only read your balance', why: 'Often much more.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'How did Grace\'s real bank react when she called?',
        options: [
          { text: 'Angry she hung up', why: 'Banks want you to hang up and check.' },
          { text: 'Asked for the code', why: 'Real banks won\'t.' },
          { text: 'No suspicious payments, and thanked her for not sharing the code' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order what Grace does.',
        lines: ['Notice "never share this code"', 'Hang up', 'Wait or use another phone', 'Call the number on her card', 'Report the call'],
      },
    ],
  },
  reflect: {
    prompt: 'Do you read the full text of security code messages? What do yours say?',
    starters: ['Mine say...', 'From now on I\'ll...'],
  },
  deepen: {
    title: 'Why the line matters',
    summary: 'Some scammers stay on the line after you "hang up", so when you dial out you\'re still talking to them. Using a different phone, or waiting a few minutes, avoids this.',
  },
  notes: 'One-time passcode fraud and line-held-open: UK Finance guidance. No banks named. Jayden per CAST.',
};

export default lesson;
