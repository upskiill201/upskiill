import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10 — Unit Challenge: the second mixer, with a recruiter and a stranger. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the second mixer',
  summary: 'One more finalists\' mixer before pitch night. Ada walks in, takes a breath, and heads straight for the recruiter who walked away from her "just" last week.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Use every Chapter 2 tool in a live networking moment',
    'Introduce yourself to two different listeners',
    'Turn an intro into a conversation and a next step',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Wednesday, 6:30 p.m. The second mixer.',
      beats: [
        { speaker: 'narrator', text: 'The bank recruiter, Mrs Bassey, is by the small chops. She doesn\'t remember Ada. That\'s fine: a fresh first impression.' },
        { speaker: 'ada', text: '(to herself) Ask first. Present, past, future. Drop the "just". Follow up. Next step. Go.' },
        { speaker: 'narrator', text: 'Across the room, a quiet man in a suit is standing alone, holding a drink he isn\'t drinking. Ada will meet him too.' },
      ],
    },
  ],
  apply: {
    scenario: 'The second mixer.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Mrs Bassey: "Hi! So, what do you do?" What\'s Ada\'s best opening?',
        options: [
          { text: '"I make money apps simple enough that people actually use them. What about you?"' },
          { text: '"Oh, I\'m just a junior designer."', why: 'Last week\'s ending.' },
          { text: '"Let me tell you about my database."', why: 'The lift, again.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Mrs Bassey: "I hire designers for our banking app." Which door should Ada open?',
        options: [
          { text: 'The investor door: market size', why: 'She\'s a recruiter.' },
          { text: 'The journalist door: a long story', why: 'Not tonight\'s listener.' },
          { text: 'The recruiter door: skills and results' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'She said their banking app has terrible reviews: "Customers say it\'s confusing." What do I ask?',
        prompt: 'Your advice?',
        options: [
          { text: '"Mine isn\'t confusing!"', why: 'A bit smug, and no question.' },
          { text: 'Change the subject to Lagos traffic.', why: 'You just found the best hook.' },
          { text: 'A follow-up: "What do customers find most confusing?" Then connect it to what you do.' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Ada\'s chat with Mrs Bassey in order.',
        lines: ['A short intro and a question back', 'Follow up on "confusing"', 'Connect: "That\'s exactly what I work on"', 'A next step: connect on LinkedIn', 'Leave warmly'],
      },
      {
        kind: 'sortGroups',
        prompt: 'With Mrs Bassey: say it, or skip it?',
        groups: ['Say it', 'Skip it'],
        items: [
          { text: 'I built an app ten colleagues use every month', group: 0 },
          { text: 'I\'m only junior, so...', group: 1 },
          { text: 'What do customers find most confusing?', group: 0 },
          { text: 'My SQLite schema', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ada and Mrs Bassey agree to connect on LinkedIn. That\'s the next ___. (one word)',
        answers: ['step'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Now the quiet man standing alone. How should Ada start?',
        options: [
          { text: 'Launch straight into her 60-second app pitch', why: 'Ask first: you don\'t know who he is.' },
          { text: '"Hi, I\'m Ada. What brings you here tonight?"' },
          { text: 'Leave him alone', why: 'People standing alone often welcome a hello.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'He says: "I\'m a pastor. My church\'s youth group runs a savings scheme, and it\'s chaos." !!!',
        prompt: 'What should Ada do?',
        options: [
          { text: 'Find the connection: "I built an app for exactly that. What\'s the chaos like?"' },
          { text: 'Pitch all 14 features immediately', why: 'Follow up first; features never.' },
          { text: 'Say "Cool" and leave', why: 'This is the best hook of the night.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s goodbye to the pastor. Which line is a mistake?',
        lines: [
          'It was lovely to meet you, Pastor Edet.',
          'Could I send you a two-minute demo tomorrow?',
          'Anyway, it\'s just a small app, probably not good enough for you.',
        ],
        bug: 2,
        fix: 'I\'ll message you in the morning.',
        explanation: 'A shrinker at the end undoes a great chat. End with the next step.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each moment to the Chapter 2 tool.',
        pairs: [
          ['"I make money apps people use"', 'Problem solved, not title'],
          ['"What do customers find confusing?"', 'Follow-up question'],
          ['Skills for the recruiter', 'Tailor it'],
          ['"I\'ll message you in the morning"', 'A next step'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: '(texting Arjun at 9 p.m.) Mrs Bassey wants to interview me for a senior role. Pastor Edet wants the app for 60 young people. And nobody walked away. NOBODY.',
        prompt: 'What does Arjun reply?',
        options: [
          { text: 'Take the bank job and quit the competition.', why: 'One step at a time!' },
          { text: 'Last week: three "just"s, zero conversations. Tonight: two real opportunities. That\'s Chapter 2.' },
          { text: 'Go back and pitch everyone else too.', why: 'Quality, not quantity.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 2 in one line.',
        template: 'Drop the "[[1]]". Present, past, [[2]]. Then follow [[3]].',
        blanks: [['just'], ['future'], ['up']],
        distractors: ['title', 'only'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s opening to a stranger.',
        tiles: ['Hi,', 'I\'m', 'Ada.', 'What', 'brings', 'you', 'here?'],
        distractors: ['just'],
      },
    ],
  },
  reflect: {
    prompt: 'Plan your next networking moment: who will be there, which "door" you\'ll open for each, and what next step you\'d like.',
    starters: ['The event: ...', 'For ..., I\'ll lead with...', 'Next step I want: ...'],
  },
  deepen: {
    title: 'Next week: make it stick',
    summary: 'Arjun: "Your pitch is clear now. Your intro is great. So let me be honest. On yesterday\'s call I listened to your 60 seconds and... I zoned out at second 35. It\'s correct. It\'s just forgettable. Next week, we make it stick."',
  },
  notes: 'Unit Challenge: reviews Chapter 2. Mrs Bassey and Pastor Edet are fictional named extras (narrated).',
};

export default lesson;
