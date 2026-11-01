import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8. "Producer's Notes" (card deck): timing — when people can actually listen. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Producer\'s Notes: when people can actually listen',
  summary: 'Clinton sends his best-ever message at 2:47 a.m. Nobody reads it. "Producer\'s Notes," says Tey. "The right message at the wrong moment is the wrong message."',
  minutes: 11,
  outcomes: [
    'Choose a moment when people have room to listen',
    'Match the channel to the message',
    'Check "is now a good time?" before important conversations',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>Every radio producer knows it: the same song lands differently at 8 a.m. and 2 a.m. Messages are the same. Here are Tey FM's Producer's Notes on timing.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Note 1: Don't compete</h3><p>People can't listen while they're doing something urgent: rushing to class, in an exam, cooking dinner, in the middle of a crisis. Your message will lose. Wait for a gap.</p><h3>Note 2: Group chats have rush hours</h3><p>Messages sent when everyone is busy or asleep get buried by morning. Send when people are usually around: often early evening for students, and the start of the working day for colleagues.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Note 3: Big things need a proper moment</h3><p>Important or emotional conversations need time and attention. \"Can we talk tonight? Nothing bad, just something I want your view on\" gets a better hearing than blurting it at the door.</p><h3>Note 4: Ask first</h3><p>\"Is now a good time?\" is the cheapest way to get someone's full attention. If they say no, ask when.</p>",
    },
    {
      kind: 'check',
      question: 'Clinton wants to ask a classmate a big favour. She\'s rushing to an exam. What should he do?',
      options: ['Ask now, quickly', 'Wait until after her exam', 'Send ten messages during the exam'],
      answer: 1,
      explanation: 'People can\'t listen while they\'re doing something urgent. Wait for a gap.',
    },
    {
      kind: 'text',
      html: "<h3>Note 5: Match the channel</h3><p>Quick logistics: a group message. Something personal or complicated: talk, ideally in person or on a call. Something people need to keep: written. The wrong channel is another way of not being heard.</p>",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Right message, right moment, right channel. And when it matters: "Is now a good time?"',
    },
  ],
  apply: {
    scenario: 'Tey FM, Producer\'s Notes.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the message to the best channel.',
        pairs: [
          ['Study session time and place', 'A group message'],
          ['Telling a friend something personal', 'Talk, in person or on a call'],
          ['Exam timetable people need to keep', 'Written, so they can check it'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Clinton\'s 2:47 a.m. message get lost?',
        options: [
          { text: 'By morning it was buried under everything else' },
          { text: 'Messages sent at night don\'t deliver', why: 'They deliver. People just don\'t see them in time.' },
          { text: 'It was too short', why: 'The message was fine. The timing wasn\'t.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good moment, or bad moment?',
        groups: ['Good moment', 'Bad moment'],
        items: [
          { text: 'After the lecture, when people are chatting', group: 0 },
          { text: 'While someone is rushing to an exam', group: 1 },
          { text: 'Early evening in the group chat', group: 0 },
          { text: 'In the middle of someone\'s crisis', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'I want to tell my parents I\'m changing from Computer Science to Business. Should I just text them?',
        prompt: 'Producer\'s Note?',
        options: [
          { text: 'Yes, text it at 2 a.m.', why: 'Big news, wrong channel, wrong time.' },
          { text: 'That\'s a big one. Ask for a proper time to talk, ideally on a call or in person.' },
          { text: 'Put it in the class group chat.', why: 'Definitely not.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The cheapest way to get full attention: "Is now a good ___?" (one word)',
        answers: ['time', 'moment'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'A friend says, "Not now, sorry." What\'s the best response?',
        options: [
          { text: '"No problem. When\'s good for you?"' },
          { text: 'Tell them anyway, faster', why: 'They\'ve told you they can\'t listen right now.' },
          { text: 'Give up forever', why: 'Not now isn\'t never.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Clinton\'s plan for telling the group the exam room has changed. Which step is badly timed?',
        lines: [
          'Send it in the group chat the evening before.',
          'Pin the message so people can find it.',
          'Shout it across the exam hall during the exam.',
        ],
        bug: 2,
        fix: 'Remind people outside the room before it starts.',
        explanation: 'Nobody can listen during an exam, and nobody will thank you for trying.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Warm-up', '"Okay so, hi guys, basically"'],
          ['Point first', 'What, when, where in sentence one'],
          ['Send once, then listen', 'The message rule'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s timing rule.',
        template: 'Right message, right [[1]], right [[2]].',
        blanks: [['moment', 'time'], ['channel']],
        distractors: ['volume', 'capitals'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a request for a proper moment.',
        tiles: ['Can', 'we', 'talk', 'tonight?', 'Nothing', 'bad,', 'I', 'promise.'],
        distractors: ['URGENT'],
      },
    ],
  },
  reflect: {
    prompt: 'Is there something you\'ve been trying to say to someone at the wrong moment, or in the wrong channel? When and how could you say it instead?',
    starters: ['I\'ve been trying to tell...', 'A better moment would be...'],
  },
  deepen: {
    title: 'Book the moment',
    summary: 'For your next important conversation, book the moment: "Can we talk tonight / tomorrow at lunch?" Notice how much more of the other person\'s attention you get.',
  },
  notes: 'Timing and channel guidance is practical advice (no single study). "Rush hours" phrased as "often"; varies by group.',
};

export default lesson;
