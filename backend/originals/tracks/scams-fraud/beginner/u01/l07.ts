import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7. Chat with Tey: who scammers pretend to be. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'The many masks',
  summary: '"Hi Mum" is one mask. Grace asks Tey what other faces scammers wear. The list is longer than she expected, and the same recipe sits behind every one.',
  minutes: 12,
  outcomes: [
    'Name the most common people and organisations scammers impersonate',
    'See the same recipe behind each',
    'Know the one check that works for all of them',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Impersonation is the most common scam trick. Want the usual masks?', replies: ['Go on.'] },
        { tey: 'Family and friends: "Hi Mum", "I\'m stuck abroad", a hacked friend\'s account asking for money. Banks: "suspicious activity on your account". Delivery companies: "parcel held, pay a small fee".', replies: ['More?'] },
        { tey: 'Government: the tax office ("you\'re owed a refund" or "you owe a fine"), the police ("your account is part of an investigation"). Utility and phone companies: "your bill failed, update your details".', replies: ['And at work?'] },
        { tey: 'Bosses and suppliers. "It\'s the CEO, I need you to pay this invoice urgently and keep it quiet." Or a supplier\'s email that says their bank details have changed. You\'ll meet those at Kinwell soon.', replies: ['So what\'s the check?'] },
        { tey: 'The same check for every mask: contact the person or organisation through a channel you already trust, not one in the message. Their saved number. The number on your card. A website you type yourself.', replies: ['Why does that always work?'] },
        { tey: 'Because the scammer controls the message, the link and the number in it. They don\'t control your saved contacts or the back of your card.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Family, banks, delivery firms, government, police, bosses, suppliers: different masks, same recipe. One check works for all: contact them through a channel you already trust.',
    },
  ],
  apply: {
    scenario: 'The many masks.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each mask to a typical line.',
        pairs: [
          ['Family', '"Dropped my phone, new number"'],
          ['Bank', '"Suspicious activity on your account"'],
          ['Delivery firm', '"Parcel held, pay a small fee"'],
          ['Boss', '"Pay this invoice now, keep it quiet"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does checking through your own channel always work?',
        options: [
          { text: 'The scammer controls the message and its links, not your saved contacts' },
          { text: 'Scammers are lazy', why: 'It\'s about who controls the channel.' },
          { text: 'It doesn\'t always work', why: 'It\'s the one check that does.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Your own channel, or the scammer\'s?',
        groups: ['Your own channel', 'The scammer\'s'],
        items: [
          { text: 'Number on the back of your card', group: 0 },
          { text: '"Call us on this number" in the text', group: 1 },
          { text: 'Your boss\'s saved mobile', group: 0 },
          { text: 'A link in the email', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'The tax office emailed me saying I\'m owed a £326 refund. Nice!',
        prompt: 'Grace\'s best reply?',
        options: [
          { text: 'Click quickly before it expires.', why: 'Urgency + authority: check first.' },
          { text: 'Reply with your bank details.', why: 'Never.' },
          { text: 'Don\'t click. Log in to the official tax website by typing it yourself and check there.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The one check.',
        template: 'Contact them through a channel you [[1]] trust, not one in the [[2]].',
        blanks: [['already'], ['message']],
        distractors: ['never', 'newspaper'],
      },
      {
        kind: 'findBug',
        prompt: 'Which response to "This is the police; your account is part of an investigation" is wrong?',
        lines: [
          'Hang up.',
          'Call the police on their official number from a different phone, or wait a few minutes.',
          'Move your money where they tell you, to keep it safe.',
        ],
        bug: 2,
        fix: 'Real police never ask you to move money.',
        explanation: 'That\'s a classic impersonation scam.',
      },
      {
        kind: 'mcq',
        prompt: 'Why wait a few minutes or use another phone after a suspicious call?',
        options: [
          { text: 'To be polite', why: 'It\'s a security trick.' },
          { text: 'Some scammers keep the line open so your call goes back to them' },
          { text: 'No reason', why: 'Lines can be held open.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Femi\'s fake refund was for how many pounds?',
        answers: ['326', '£326'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the check for any mask.',
        lines: ['Don\'t use anything in the message', 'Find your own trusted contact for them', 'Contact them directly', 'Only then decide'],
      },
      {
        kind: 'mcq',
        prompt: 'What does every mask have in common?',
        options: [
          { text: 'The same recipe: urgency, authority, emotion, secrecy' },
          { text: 'Bad spelling', why: 'Many are well written.' },
          { text: 'They\'re always by text', why: 'Calls, emails and apps too.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which mask have you seen most often? What did it ask you to do?',
    starters: ['I\'ve seen...', 'It asked me to...'],
  },
  deepen: {
    title: 'Number spoofing',
    summary: 'Scammers can make a call or text appear to come from a real organisation\'s number. That\'s why "it came from the bank\'s number" isn\'t proof. Hang up and call back on a number you trust.',
  },
  notes: 'Impersonation categories per UK Finance / Action Fraud guidance. Line-held-open advice: UK Finance guidance. Femi per CAST. No organisations named.',
};

export default lesson;
