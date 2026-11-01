import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 11. Reading: thanking people properly — specific thanks, public credit, and answering thanks. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Thanking people properly',
  summary: 'The client call went well, thanks to Wanjiku\'s numbers and Felix\'s fix. Remi wants to say thank you. "Thx!" doesn\'t feel like enough. It isn\'t.',
  minutes: 12,
  outcomes: [
    'Write a thank-you that people remember',
    'Give credit in front of others',
    'Answer when someone thanks you',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The thank-you that gets remembered',
      html: "<p>Thursday, after the client call. Ms Wekesa ended it with \"Good. Send me the plan.\" from her, the closest thing to a smile. It worked because Wanjiku sent the right numbers in an hour and Felix fixed Remi's access from a beach.</p><p>Remi types \"thx!!\" to both. Then deletes it.</p><h3>Make it specific</h3><p>\"Thanks!\" is polite. \"Thanks for getting me the October numbers so fast. They were the first thing Ms Wekesa asked about\" is <em>memorable</em>. A specific thank-you says: I noticed exactly what you did, and here's why it mattered.</p><p>The formula: <strong>thanks + what they did + why it mattered</strong>.</p><h3>Say it where others can hear</h3><p>A private thank-you is kind. A public one is kinder, and it helps people's careers. Copy their manager in, or mention it in the team meeting: \"Wanjiku's numbers saved that call.\" It costs you nothing and people remember who gives credit.</p><h3>Match the size</h3><p>A small favour gets a short thanks: \"Thanks, much appreciated!\" A big one deserves more: a proper message, a mention to their manager, maybe a coffee. Felix fixed Remi's access on holiday. That's a coffee.</p><h3>When someone thanks you</h3><p>Don't brush it off with \"oh, it was nothing\". Accept it: <strong>\"You're welcome\"</strong>, <strong>\"Happy to help\"</strong>, <strong>\"My pleasure\"</strong>, or, more casual, <strong>\"No worries\"</strong> (common in Kenya, the UK and Australia) or <strong>\"Anytime\"</strong>.</p>",
    },
    {
      kind: 'check',
      question: 'Which thank-you is most memorable?',
      options: ['Thx!', 'Thanks so much!', 'Thanks for the numbers so fast. They were the first thing the client asked about.'],
      answer: 2,
      explanation: 'Thanks + what they did + why it mattered.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Thanks + what they did + why it mattered. And when you can, say it where their manager can hear.',
    },
  ],
  apply: {
    scenario: 'Thursday, 11:30. Two thank-yous to send.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Build Remi\'s thank-you to Wanjiku in order.',
        lines: ['Thanks, Wanjiku,', 'for getting me the October numbers so fast.', 'They were the first thing Ms Wekesa asked about.'],
      },
      {
        kind: 'mcq',
        prompt: 'Why copy Brian into the thank-you to Wanjiku?',
        options: [
          { text: 'To show off', why: 'It\'s about her, not Remi.' },
          { text: 'So her manager-level colleagues see the credit, which helps her' },
          { text: 'Brian makes all thank-yous official', why: 'No such rule.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Small thanks, or big thanks?',
        groups: ['Short "much appreciated"', 'Proper message (and maybe a coffee)'],
        items: [
          { text: 'Someone held the lift', group: 0 },
          { text: 'Felix fixed your access while on holiday', group: 1 },
          { text: 'A colleague sent a link you asked for', group: 0 },
          { text: 'Someone stayed late to help you hit a deadline', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'wanjiku',
        message: 'Thanks for the kind words, Remi! And for copying Brian in.',
        prompt: 'Best reply?',
        options: [
          { text: 'Oh it was nothing, really.', why: 'It was something. Accept the thanks.' },
          { text: 'k', why: 'A bit cold after a thank-you.' },
          { text: 'My pleasure. You saved that call!' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A short thank-you for a small favour: "Thanks, much ___!" (one word)',
        answers: ['appreciated'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s thank-you to Felix. Which line is too vague?',
        lines: [
          'Hi Felix,',
          'Thanks for the thing.',
          'Coffee is on me when you\'re back.',
        ],
        bug: 1,
        fix: 'Thanks for fixing my access from the beach. I couldn\'t have finished the KPI deck without it.',
        explanation: '"The thing" could be anything. Say what they did and why it mattered.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each answer to thanks to its register.',
        pairs: [
          ['My pleasure', 'Warm and polite'],
          ['You\'re welcome', 'Neutral, safe anywhere'],
          ['No worries', 'Casual and friendly'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'In the team meeting, what\'s the best way to credit Wanjiku?',
        options: [
          { text: '"Wanjiku\'s numbers saved the client call this morning. Thank you!"' },
          { text: 'Say nothing; she already got an email', why: 'Public credit matters too.' },
          { text: '"I did the client call." (and nothing else)', why: 'The call worked because of her numbers.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Own it, fix it, prevent it', 'A professional apology'],
          ['Thanks for your patience', 'Instead of "sorry for the delay"'],
          ['Could you...?', 'Everyday polite request'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a specific thank-you.',
        tiles: ['Thanks', 'for', 'the', 'fix.', 'It', 'saved', 'my', 'deadline.'],
        distractors: ['thx', 'thing'],
      },
    ],
  },
  reflect: {
    prompt: 'Who helped you recently at work, school or home? Write them a specific thank-you: what they did, and why it mattered. Then send it.',
    starters: ['Thanks, ..., for...', 'It mattered because...'],
  },
  deepen: {
    title: 'One specific thank-you a day',
    summary: 'For one week, send one specific thank-you a day. Copy in a manager when it fits. It\'s the cheapest way to build goodwill, and people remember.',
  },
  notes: 'Specific/public recognition is general management and workplace-relationships advice. "No worries" as a response to thanks: informal, common in Australian, British and Kenyan English.',
};

export default lesson;
