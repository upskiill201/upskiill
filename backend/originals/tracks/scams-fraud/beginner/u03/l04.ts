import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4. Card deck: codes, PINs and remote access. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'The keys to your account',
  summary: 'Grace realises her account has several keys: passwords, PINs, one-time codes, and the phone itself. Three cards on which keys nobody should ever ask for.',
  minutes: 10,
  outcomes: [
    'Know what a genuine organisation will never ask for',
    'Understand the danger of remote access apps',
    'Protect your one-time codes',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Card 1: never asked for.</strong> Your bank will never ask for your full PIN, your full online banking password, or a one-time code by phone, text or email. If someone asks, it isn\'t your bank, whatever the caller ID says.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 2: read the code message.</strong> One-time codes usually come with words like "to approve a payment of £640 to..." or "to add your card to a new device". Read them. If the text says you\'re approving something you didn\'t start, stop. Codes are for you to type, never to read out.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 3: never let a caller into your device.</strong> Some scammers ask you to install a "support" or screen-sharing app so they can "fix" a problem. That lets them see your screen, your codes and your banking. A genuine bank or broadband company won\'t ask you to install one on an unexpected call.</p>',
    },
    {
      kind: 'check',
      question: 'A code text says "to add your card to a new device". You didn\'t ask for this. What does it mean?',
      options: ['Someone may be trying to use your card on their phone', 'Your bank is upgrading you', 'Nothing important'],
      answer: 0,
      explanation: 'Stop, don\'t share it, and call your bank on a trusted number.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Never share PINs, passwords or one-time codes. Read what each code is for. Never install an app a caller asks you to.',
    },
  ],
  apply: {
    scenario: 'Keys to the account.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Your bank might ask, or will never ask?',
        groups: ['Might ask', 'Will never ask'],
        items: [
          { text: 'To confirm a recent payment you made', group: 0 },
          { text: 'Your full PIN', group: 1 },
          { text: 'A one-time code read aloud', group: 1 },
          { text: 'To install a screen-sharing app', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why should you read the words in a code text?',
        options: [
          { text: 'They\'re just decoration', why: 'They describe the action.' },
          { text: 'They say what the code approves, so you can spot something you didn\'t start' },
          { text: 'To read them aloud', why: 'Never read codes aloud.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'A "broadband engineer" says my router is hacked and wants me to install an app so he can fix it.',
        prompt: 'Grace\'s best reply?',
        options: [
          { text: 'Install it quickly.', why: 'That gives him control.' },
          { text: 'Install it but don\'t open banking.', why: 'He could still see everything.' },
          { text: 'Hang up. That app would let him see your screen and your banking. Call your provider on their real number.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Codes.',
        template: 'Codes are for you to [[1]], never to read [[2]].',
        blanks: [['type'], ['out', 'aloud']],
        distractors: ['share', 'twice'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each key to its danger if shared.',
        pairs: [
          ['Online banking password', 'Full access to your account'],
          ['One-time code', 'Approves a payment or device'],
          ['Remote access app', 'They see your screen'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which statement is wrong?',
        lines: [
          'Banks never ask for your full PIN.',
          'Codes say what they approve.',
          'It\'s fine to read a code to someone if they called from the bank\'s number.',
        ],
        bug: 2,
        fix: 'Never read codes to anyone; numbers can be spoofed.',
        explanation: 'Caller ID proves nothing.',
      },
      {
        kind: 'mcq',
        prompt: 'A code text says "to approve £640 to J SMITH". You didn\'t make this payment. What do you do?',
        options: [
          { text: 'Approve it to see what happens', why: 'That sends £640.' },
          { text: 'Don\'t share or use it; call your bank on a trusted number' },
          { text: 'Ignore it forever', why: 'Tell your bank.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many cards about account keys are in this lesson?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what to do when a code arrives unexpectedly.',
        lines: ['Read what it\'s for', 'Don\'t share or use it', 'Call your bank on a trusted number', 'Change your password if needed'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the danger of screen-sharing apps on an unexpected call?',
        options: [
          { text: 'They slow your phone', why: 'The danger is access.' },
          { text: 'None', why: 'They give access.' },
          { text: 'The caller can see codes and banking on your screen' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Has anyone ever asked you for a code or to install an app? What would you say next time?',
    starters: ['I\'d say...'],
  },
  deepen: {
    title: 'SIM swap',
    summary: 'In a SIM swap, criminals persuade your phone network to move your number to their SIM, so your codes go to them. If your phone suddenly loses signal for no reason, contact your network and bank quickly.',
  },
  notes: 'UK Finance/Take Five: banks never ask for full PIN/password or to move money. Remote access scams: Action Fraud warnings. Femi per CAST.',
};

export default lesson;
