import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2. Step-by-step: the safe-account scam. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'The "safe account"',
  summary: 'If Grace had stayed on the line, what would have come next? Her bank\'s fraud adviser explains the most damaging version of this call, step by step.',
  minutes: 11,
  outcomes: [
    'Explain how a safe-account scam unfolds',
    'Spot each step as it happens',
    'Know the single rule that defeats it',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'How the safe-account scam works',
      steps: [
        { title: '1. The alarm', body: 'A call, text or email "from your bank" or "the police": your account is compromised, money is at risk.' },
        { title: '2. The proof', body: 'They know your name, bank, maybe card digits. The number may look genuine. You start to believe them.' },
        { title: '3. The isolation', body: '"Don\'t tell anyone. A bank employee may be involved. If branch staff ask, say it\'s for a holiday."' },
        { title: '4. The instruction', body: '"Move your money to a new, safe account we\'ve set up for you." They give you account details.' },
        { title: '5. The coaching', body: 'They stay on the phone while you transfer, telling you what to say if your bank asks questions.' },
        { title: '6. The loss', body: 'The "safe account" belongs to the criminals. The money is moved on within minutes.' },
        { title: 'The single rule', body: 'Your bank will never ask you to move money to keep it safe. Never. Anyone who does is a criminal.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'There is no such thing as a "safe account". If anyone asks you to move money to protect it, hang up. And if anyone tells you to lie to your bank, that\'s a scam.',
    },
  ],
  apply: {
    scenario: 'The safe-account scam.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the scam.',
        lines: ['The alarm', 'The proof', 'The isolation', 'The instruction', 'The coaching', 'The loss'],
      },
      {
        kind: 'mcq',
        prompt: 'Why do they say "a bank employee may be involved"?',
        options: [
          { text: 'It\'s usually true', why: 'It\'s an isolation trick.' },
          { text: 'To stop you trusting the real bank staff who could save you' },
          { text: 'To be helpful', why: 'To isolate you.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each step to its ingredient.',
        pairs: [
          ['The alarm', 'Fear and urgency'],
          ['The proof', 'Authority'],
          ['The isolation', 'Secrecy'],
          ['The coaching', 'Control'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: 'What if the branch asks why I\'m moving £8,000?',
        prompt: 'What does the bank\'s fraud adviser say?',
        options: [
          { text: 'Tell them the truth. If anyone told you to lie to us, that\'s the scam. We ask because we\'re trying to protect you.' },
          { text: 'Say it\'s for a holiday.', why: 'That\'s the scammer\'s script.' },
          { text: 'Don\'t answer.', why: 'The question is there to protect you.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The single rule.',
        template: 'Your bank will never ask you to [[1]] money to keep it [[2]].',
        blanks: [['move', 'transfer'], ['safe']],
        distractors: ['save', 'growing'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Scam step, or genuine bank behaviour?',
        groups: ['Scam step', 'Genuine bank'],
        items: [
          { text: '"Move your money to this new account"', group: 0 },
          { text: 'Asking why you\'re making a big payment', group: 1 },
          { text: '"Tell the branch it\'s for a holiday"', group: 0 },
          { text: 'Happy for you to hang up and call back', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which thought would lead to a loss?',
        lines: [
          'My bank would never ask me to move money.',
          'Anyone telling me to lie to my bank is a scammer.',
          'The caller knows my details, so the safe account must be real.',
        ],
        bug: 2,
        fix: 'Details prove nothing; safe accounts don\'t exist.',
        explanation: 'Leaked details are used exactly to build this trust.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many steps does the scam have before "the single rule"?',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why do scammers stay on the phone while you transfer?',
        options: [
          { text: 'To be friendly', why: 'To control you.' },
          { text: 'To keep you in hot thinking and coach you past bank checks' },
          { text: 'It\'s required', why: 'It\'s control.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'How fast is money usually moved on from the "safe account"?',
        options: [
          { text: 'After a month', why: 'Usually minutes.' },
          { text: 'Never', why: 'It\'s moved on fast.' },
          { text: 'Within minutes' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Who in your family should hear the "no safe account" rule today?',
    starters: ['I\'ll tell...'],
  },
  deepen: {
    title: 'Police impersonation',
    summary: 'A variant: callers pretend to be police investigating your bank, and ask you to move money or withdraw cash to "help the investigation". Real police will never ask you to move money or hand over cash or cards.',
  },
  notes: 'Safe-account scams: UK Finance / Take Five; "no genuine organisation will ask you to move money to a safe account". £8,000 illustrative.',
};

export default lesson;
