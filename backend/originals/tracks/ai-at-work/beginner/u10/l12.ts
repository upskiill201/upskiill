import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 10 · Lesson 12 — deepfakes and fake messages. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Deepfakes and fake messages',
  summary: 'A message arrives from "Tobi" on WhatsApp. Tap it to see the warning signs Ada spots before she does anything.',
  minutes: 12,
  outcomes: [
    'Spot warning signs in a fake message',
    'Know what to do when you\'re unsure',
    'Report fakes so others are protected',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'The message from "Tobi"',
      text: 'Hi Ada, it\'s Tobi, new number. In a meeting with investors, can\'t talk. Urgent: buy 5 gift cards for a client and send me the codes in 20 minutes. Don\'t tell anyone yet, it\'s a surprise. Thanks!',
      hotspots: [
        { phrase: 'new number', note: 'A classic sign. Check with Tobi on his known number before believing it.' },
        { phrase: 'can\'t talk', note: 'Stops you verifying by voice. That\'s the point.' },
        { phrase: 'gift cards', note: 'Real managers almost never ask for gift card codes. Scammers love them: hard to trace.' },
        { phrase: 'in 20 minutes', note: 'Time pressure stops you thinking.' },
        { phrase: 'Don\'t tell anyone', note: 'Secrecy stops you checking with colleagues.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'New number, can\'t talk, unusual payment, urgency, secrecy: stop. Verify on a known number. Report it to IT.',
    },
  ],
  apply: {
    scenario: 'The "Tobi" message.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Warning sign, or normal?',
        groups: ['Warning sign', 'Normal'],
        items: [
          { text: '"New number, can\'t talk"', group: 0 },
          { text: 'Tobi\'s usual Monday reminder', group: 1 },
          { text: '"Buy gift cards and send codes"', group: 0 },
          { text: '"Don\'t tell anyone"', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What should Ada do first?',
        options: [
          { text: 'Call Tobi on his known number, or ask him in person' },
          { text: 'Reply to the new number', why: 'That\'s the scammer.' },
          { text: 'Buy the cards quickly', why: 'Classic scam.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'I got a video message from "our CEO" asking me to approve a payment. It looked real.',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Don\'t approve anything yet. Call the CEO\'s office on the known number and tell IT. Video can be faked now.' },
          { text: 'If it looked real, approve it.', why: 'Deepfakes look real.' },
          { text: 'Reply to the video to ask.', why: 'Use a known channel.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Verify on a [[1]] number. [[2]] it to IT.',
        blanks: [['known'], ['Report']],
        distractors: ['new', 'Forward'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the sign to why scammers use it.',
        pairs: [
          ['New number', 'Avoids your saved contact'],
          ['Gift cards', 'Hard to trace'],
          ['Secrecy', 'Stops you checking'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which response is a mistake?',
        lines: [
          'Pause and don\'t reply',
          'Call Tobi on his known number',
          'Send one gift card code to test if it\'s real',
          'Report the message to IT',
        ],
        bug: 2,
        fix: 'Send nothing until verified.',
        explanation: 'Any code sent is money lost.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many gift cards did "Tobi" ask for?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s rule.',
        tiles: ['Stop,', 'verify,', 'report'],
        distractors: ['pay'],
      },
      {
        kind: 'mcq',
        prompt: 'Why report fakes to IT even if you didn\'t fall for it?',
        options: [
          { text: 'Others may get the same message, and IT can warn them' },
          { text: 'To get credit', why: 'To protect others.' },
          { text: 'No need', why: 'Others may fall for it.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Could be faked with AI, or harder to fake?',
        groups: ['Easy to fake', 'Harder to fake'],
        items: [
          { text: 'A voice note', group: 0 },
          { text: 'Calling the person on a number you saved yourself', group: 1 },
          { text: 'A video message', group: 0 },
          { text: 'Asking in person', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s response.',
        lines: ['Notice the warning signs', 'Don\'t reply or pay', 'Verify on a known number', 'Report to IT'],
      },
      {
        kind: 'mcq',
        prompt: 'What makes a deepfake dangerous at work?',
        options: [
          { text: 'It can look and sound exactly like someone you trust' },
          { text: 'It\'s always low quality', why: 'Often convincing.' },
          { text: 'Nothing', why: 'It can trick people.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Has anyone at your work received a fake "boss" message? What would you do now?',
    starters: ['I heard about...', 'I\'d...'],
  },
  deepen: { title: 'Try it today', summary: 'Save the real phone numbers of your manager and key colleagues so you can always verify.' },
  notes: 'Gift-card and "new number" impersonation scams are widely reported. Message fictional.',
};

export default lesson;
