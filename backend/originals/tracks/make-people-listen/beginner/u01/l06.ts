import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6. "Rewind" (Before/After): forty messages vs one. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Rewind: forty messages vs one',
  summary: 'Tey FM\'s Rewind segment: the producer plays back Clinton\'s original 63-message invitation, then the version that finally got replies. Same event. Completely different result.',
  minutes: 12,
  outcomes: [
    'See exactly what changes between a message people skip and one they act on',
    'Use the "send once, then listen" rule',
    'Know when one follow-up helps and when it hurts',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Rewind: the study-session invitation',
      before: {
        label: 'The original (messages 1 to 7 of 63)',
        text: 'guys / GUYS / exam is soon we need to study / like seriously / who\'s free / I\'m thinking library or maybe someone\'s house / WHO\'S COMING',
      },
      after: {
        label: 'The version that worked',
        text: 'Exam in two weeks. Study session: library, Sunday 4 p.m. What topics are you stuck on? I\'ll plan around them.',
      },
      notes: [
        'Seven messages (and 56 more) became one.',
        'A vague "soon" became a date, a time and a place.',
        '"WHO\'S COMING" (a demand) became "What topics are you stuck on?" (a real question).',
        '"I\'ll plan around them" promises to listen, which is why people replied.',
      ],
    },
    {
      kind: 'text',
      html: "<p><strong>Why the original failed:</strong> every extra message lowered the value of each one. After a while, people's brains file the sender as \"noise\" and stop opening.</p><p><strong>The rule: send once, then listen.</strong> One complete message with everything people need. Then wait, and respond to replies.</p><p><strong>One follow-up is fine</strong>, if it adds something: \"Reminder: library tomorrow at 4. Brenda's bringing the integrals questions.\" That's new information. \"???\" is not.</p>",
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Before sending a follow-up, ask: does this add new information? If not, don\'t send it.',
    },
  ],
  apply: {
    scenario: 'Tey FM, the Rewind segment.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does each extra message make people less likely to read any of them?',
        options: [
          { text: 'People start filing the sender as noise and stop opening' },
          { text: 'Phones block repeated messages', why: 'They don\'t. People do.' },
          { text: 'It doesn\'t; more messages always help', why: 'Clinton has the data: forty mutes.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Useful follow-up, or noise?',
        groups: ['Useful follow-up', 'Noise'],
        items: [
          { text: 'Reminder: library tomorrow at 4, room changed to B12.', group: 0 },
          { text: '???', group: 1 },
          { text: 'GUYS', group: 1 },
          { text: 'Brenda\'s bringing the integrals questions, see you at 4.', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the original to the fix.',
        pairs: [
          ['"exam is soon"', '"Exam in two weeks"'],
          ['"library or maybe someone\'s house"', '"Library, Sunday 4 p.m."'],
          ['"WHO\'S COMING"', '"What topics are you stuck on?"'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Only three people replied in an hour. Can I send "???" to wake them up?',
        prompt: 'Producer\'s advice?',
        options: [
          { text: 'Yes, "???" works every time.', why: '"???" adds nothing but pressure.' },
          { text: 'Three replies in an hour is great. If you follow up tomorrow, add something new.' },
          { text: 'Send "GUYS" eleven times.', why: 'Clinton.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The rule: send ___, then listen. (one word)',
        answers: ['once'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Clinton\'s message. Which line makes it vague again?',
        lines: [
          'Study session: library, Sunday 4 p.m.',
          'Or maybe Saturday, or someone\'s house, let\'s see.',
          'What topics are you stuck on?',
        ],
        bug: 1,
        fix: 'Delete it: one time, one place.',
        explanation: 'Options after a clear plan make it unclear again. Decide, or ask, but don\'t do both.',
      },
      {
        kind: 'mcq',
        prompt: 'What does "I\'ll plan around them" add to the message?',
        options: [
          { text: 'Extra length', why: 'It\'s short and it changes the tone.' },
          { text: 'Nothing', why: 'It\'s the reason people answered.' },
          { text: 'A promise to listen, which makes people want to reply' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['One-point test', 'One or two sentences, an action, their reason'],
          ['Goldfish myth', 'There\'s no 8-second attention span'],
          ['Listen first', 'Ask, use answers, say names'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A good follow-up.',
        template: '[[1]]: library tomorrow at 4. Room changed to [[2]].',
        blanks: [['Reminder'], ['B12']],
        distractors: ['???', 'GUYS'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the test before any follow-up.',
        tiles: ['Does', 'this', 'add', 'new', 'information?'],
        distractors: ['???', 'GUYS'],
      },
    ],
  },
  reflect: {
    prompt: 'Look at a group chat you\'re in. Find a message that got ignored (yours or someone else\'s). Rewrite it as one complete message.',
    starters: ['The original was...', 'Rewritten: ...'],
  },
  deepen: {
    title: 'The one-message week',
    summary: 'For one week, whenever you need something from a group, send one complete message: what, when, where, and a question. No "???", no "guys". Count the replies.',
  },
  notes: 'Practical messaging advice; "noise" filing is a plain-language description of habituation to frequent low-value signals, not a cited study.',
};

export default lesson;
