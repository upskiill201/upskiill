import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5. Checkpoint 1: lessons 1–4, plus review. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the code text',
  summary: 'On Monday Grace gets a code text she didn\'t ask for: "to add your card to a new device". This time she knows exactly what to do. Check what you know about fraud calls, safe accounts, phishing and account keys.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Handle impersonation calls and messages', 'Protect codes and passwords'],
  learn: [
    {
      kind: 'story',
      title: 'Monday',
      beats: [
        { speaker: 'narrator', text: 'A code text, unasked for: "to add your card to a new device". Grace doesn\'t share it. She calls the number on her card.' },
        { speaker: 'grace', text: 'They cancelled the card in two minutes. Someone had my details from somewhere.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: who\'s really calling?',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Scam sign, or genuine?',
        groups: ['Scam sign', 'Genuine'],
        items: [
          { text: '"Move your money to a safe account"', group: 0 },
          { text: 'Your bank asking about a big payment you\'re making', group: 1 },
          { text: '"Read me the code"', group: 0 },
          { text: '"Install this app so I can help"', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each term to its meaning.',
        pairs: [
          ['Phishing', 'Fake email'],
          ['Smishing', 'Fake text'],
          ['Vishing', 'Fake call'],
          ['Spoofing', 'Faked caller ID'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the single rule that defeats the safe-account scam?',
        options: [
          { text: 'Your bank will never ask you to move money to keep it safe' },
          { text: 'Only move half', why: 'Never move it.' },
          { text: 'Check the caller ID', why: 'Caller ID can be faked.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In the UK, what number can you call to reach many banks safely?',
        answers: ['159'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'jayden',
        message: 'A text says my parcel is held and to pay £1.20. Real or fake?',
        prompt: 'Grace\'s best reply?',
        options: [
          { text: 'It\'s only £1.20, pay it.', why: 'It\'s bait for card details.' },
          { text: 'Reply asking.', why: 'Don\'t engage.' },
          { text: 'Don\'t click. Check the delivery firm\'s app or site yourself. If it\'s real, it\'ll be there.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Calling back safely.',
        template: 'Hang up, wait or use another [[1]], and call the number on your [[2]].',
        blanks: [['phone'], ['card']],
        distractors: ['email', 'text'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step is wrong?',
        lines: [
          'Don\'t click links in unexpected texts.',
          'Forward scam texts to 7726.',
          'Tell the branch a fake reason for a transfer if the "bank" asks you to.',
        ],
        bug: 2,
        fix: 'Always tell your bank the truth.',
        explanation: 'Being told to lie to your bank is a sure sign of a scam.',
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 2: what\'s the giveaway in a fake trading platform?',
        options: [
          { text: 'It has an app', why: 'Real ones do too.' },
          { text: 'You must pay a fee to withdraw' },
          { text: 'It shows your balance', why: 'Real ones do too; the fee wall is the giveaway.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 2: where do you check a UK investment firm?',
        options: [
          { text: 'The FCA register, typed yourself' },
          { text: 'Its Instagram followers', why: 'Followers prove nothing.' },
          { text: 'Its own website', why: 'Check the regulator.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Review, Chapter 1: order the pause.',
        lines: ['Stop', 'Challenge', 'Protect'],
      },
    ],
  },
  reflect: {
    prompt: 'What would you do in the first two minutes if an unexpected code text arrived?',
    starters: ['In the first two minutes I\'d...'],
  },
  notes: 'Checkpoint for Chapter 3 lessons 1–4 with Chapter 1 and 2 review.',
};

export default lesson;
