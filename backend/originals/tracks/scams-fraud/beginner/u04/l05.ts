import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 5. Checkpoint 1: lessons 1–4, plus review. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Jayden\'s group chat',
  summary: 'Jayden posts the scam file\'s "young people" page in his group chat. Three friends reply: "wait, that happened to me." Check what you know about mules, fake jobs, task scams and shopping scams.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Spot scams aimed at young people', 'Know the consequences of muling'],
  learn: [
    {
      kind: 'story',
      title: 'The group chat',
      beats: [
        { speaker: 'jayden', text: 'Posted it. Three people said it happened to them. One lost £90 on fake trainers.' },
        { speaker: 'grace', text: 'You\'re running a better session than I am, love.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: scams aimed at young people.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Scam or genuine?',
        groups: ['Scam', 'Genuine'],
        items: [
          { text: '"Let money pass through your account"', group: 0 },
          { text: 'A job that pays you after an interview', group: 1 },
          { text: '"Top up £50 to unlock tasks"', group: 0 },
          { text: 'Buying tickets from the official seller', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each scam to its hook.',
        pairs: [
          ['Money mule', '"Easy £500"'],
          ['Task scam', '"£300 a day from home"'],
          ['Ticket scam', 'Cheap seats for a sold-out gig'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What can happen to a money mule?',
        options: [
          { text: 'Account closed, a fraud marker for years, possible prosecution' },
          { text: 'Nothing', why: 'Serious consequences.' },
          { text: 'A bonus', why: 'Serious consequences.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'jayden',
        message: 'My mate lost £90 on fake trainers. Can he get it back?',
        prompt: 'Grace\'s best reply?',
        options: [
          { text: 'No chance, forget it.', why: 'Cards may offer chargebacks.' },
          { text: 'Message the seller asking nicely.', why: 'Go to the bank.' },
          { text: 'If he paid by card, call his bank now about a chargeback. Either way, report the seller.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Jobs.',
        template: 'Real jobs [[1]] you; fake ones make you [[2]].',
        blanks: [['pay'], ['pay']],
        distractors: ['call', 'wait'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ella paid top-ups of £50, £100 and £250. Total, in pounds?',
        answers: ['400', '£400'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which statement is wrong?',
        lines: [
          'Mule money usually comes from scam victims.',
          'Bank transfers are hard to reverse.',
          'If a seller has a profile with photos, it\'s safe to pay by bank transfer.',
        ],
        bug: 2,
        fix: 'Profiles can be fake or hacked.',
        explanation: 'Bank transfer to a stranger is the risk.',
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 3: your bank asks you to move money to a safe account. What is it?',
        options: [
          { text: 'Normal security', why: 'Banks never do this.' },
          { text: 'A scam: there\'s no such thing' },
          { text: 'A new product', why: 'It\'s a scam.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 3: what do you do with a one-time code someone asks for?',
        options: [
          { text: 'Never share it' },
          { text: 'Share it if they sound official', why: 'Never.' },
          { text: 'Share half of it', why: 'Never.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Review, Chapter 1: order the four ingredients.',
        lines: ['Urgency', 'Authority', 'Emotion', 'Secrecy'],
      },
    ],
  },
  reflect: {
    prompt: 'Which page of your own scam file would you share with your friends?',
    starters: ['I\'d share...'],
  },
  notes: 'Checkpoint for Chapter 4 lessons 1–4 with Chapter 1 and 3 review.',
};

export default lesson;
