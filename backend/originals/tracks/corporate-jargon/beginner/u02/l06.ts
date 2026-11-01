import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6. Chat with Tey: how meetings start — Brian is late and Remi has to open the supplier sync. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'How meetings start',
  summary: 'Wednesday, 9:00. Supplier sync. Six people on the call, three from Lagos. Brian texts: "Running 10 min late, can you kick it off?" Remi has never started a meeting in his life.',
  minutes: 12,
  outcomes: [
    'Use the phrases that open almost every meeting',
    'Start a meeting in under a minute: welcome, purpose, plan',
    'Handle the awkward first 60 seconds of a video call',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: "8:59. Remi's phone: \"Running 10 min late, can you kick it off? Purpose is to agree the new delivery deadline. B.\" \"Kick it off\" means start it. Six faces are waiting. What does Remi say first?",
          replies: ['Um... hi?', 'I don\'t know, help.'],
        },
        {
          tey: "Every meeting opening has the same three parts: WELCOME, PURPOSE, PLAN. Start with the welcome, and buy yourself a few seconds while people join: \"Morning everyone, thanks for joining. Let's give it a minute for everyone to dial in.\"",
          replies: ['"Dial in"? Like an old phone?'],
        },
        {
          tey: "Ha. Yes, it's from phone calls, but people still say it for video calls: it just means join the call. Then, after a minute: \"Shall we get started?\" That's the most common meeting opener in the world.",
          replies: ['Then the purpose?'],
        },
        {
          tey: "Exactly. One sentence: \"Brian is running a few minutes late, so I'll kick us off. The purpose today is to agree the new delivery deadline.\" Now everyone knows why they're there.",
          replies: ['And the plan?'],
        },
        {
          tey: "Say what will happen, quickly: \"I'll share the supplier numbers, then we'll go round for any concerns, and Brian will lead the decision when he joins.\" Then one practical question: \"Could someone take notes?\" Done. Under a minute.",
          replies: ['That\'s... actually not scary.'],
        },
        {
          tey: "It never is, once you know the shape. Welcome, purpose, plan. And if you're sharing your screen, ask: \"Can everyone see my screen?\" Then wait for a yes. Nobody can read what's still on your desktop.",
        },
      ],
    },
    {
      kind: 'compare',
      title: 'Remi\'s opening, two versions',
      before: {
        label: 'Nervous',
        text: 'Um, hi, so, Brian isn\'t here, so I guess we just, um, talk about suppliers? Or wait for him? I don\'t know. Sorry.',
      },
      after: {
        label: 'Welcome, purpose, plan',
        text: 'Morning everyone, thanks for joining. Brian is running a few minutes late, so I\'ll kick us off. The purpose today is to agree the new delivery deadline. I\'ll share the numbers, then we\'ll hear any concerns. Could someone take notes?',
      },
      notes: [
        'A warm welcome instead of "um, hi".',
        'One sentence of purpose: everyone now knows why they\'re there.',
        'A plan, so people know what happens next.',
        'A practical ask (notes) makes it feel organised.',
      ],
    },
  ],
  apply: {
    scenario: 'Wednesday, 9:00. Remi kicks off the supplier sync.',
    items: [
      {
        kind: 'mcq',
        prompt: '"Can you kick it off?" What does Brian want?',
        options: [
          { text: 'Cancel the meeting', why: 'Kick off = start, not end.' },
          { text: 'Play football', why: 'The phrase comes from football, but here it just means start.' },
          { text: 'Start the meeting' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Remi\'s opening in order.',
        lines: ['Morning everyone, thanks for joining.', 'Brian is running late, so I\'ll kick us off.', 'The purpose today is to agree the new delivery deadline.', 'I\'ll share the numbers, then we\'ll hear any concerns.', 'Could someone take notes?'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the opener to what it does.',
        pairs: [
          ['"Let\'s give it a minute"', 'Wait for people to join'],
          ['"Shall we get started?"', 'Begin the meeting'],
          ['"The purpose today is..."', 'Say why we\'re here'],
          ['"Can everyone see my screen?"', 'Check the share works'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Running 10 min late, can you kick it off?',
        prompt: 'Best reply?',
        options: [
          { text: 'Will do! I\'ll open with the purpose and share the supplier numbers until you join.' },
          { text: 'Can\'t we just wait?', why: 'Six people waiting ten minutes is an hour of everyone\'s time.' },
          { text: 'Kick what?', why: 'Remi knows by now: kick it off = start it.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The three parts of a meeting opening: welcome, purpose, ... (one word)',
        answers: ['plan'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Zanele opens her meeting. Which line should she drop?',
        lines: [
          'Hi everyone, thanks for coming.',
          'Sorry, I\'m really bad at this, I\'ve never done it, it\'ll probably be a mess.',
          'Today we need to agree which courier costs to track.',
        ],
        bug: 1,
        fix: 'Delete it, and go straight to the purpose.',
        explanation: 'Apologising in advance tells people to expect a bad meeting. Just start.',
      },
      {
        kind: 'mcq',
        prompt: 'Remi shares his screen. What should he do next?',
        options: [
          { text: 'Start talking immediately', why: 'People might be looking at his desktop, or nothing at all.' },
          { text: 'Ask "Can everyone see my screen?" and wait for a yes' },
          { text: 'Close his camera', why: 'Not needed. Check the share first.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good opening, or not?',
        groups: ['Good opening', 'Weak opening'],
        items: [
          { text: 'The purpose today is to agree the deadline.', group: 0 },
          { text: 'So... yeah... suppliers?', group: 1 },
          { text: 'Shall we get started?', group: 0 },
          { text: 'I guess we\'ll just see what happens.', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 1 review.',
        pairs: [
          ['Touch base', 'Check in briefly'],
          ['Loop in', 'Add someone to the conversation'],
          ['On the same page', 'In agreement'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the most common meeting opener in the world.',
        tiles: ['Shall', 'we', 'get', 'started?'],
        distractors: ['kick', 'stop'],
      },
    ],
  },
  reflect: {
    prompt: 'Write the first 30 seconds you\'d say if you had to start a meeting, class presentation or group call tomorrow. Use welcome, purpose, plan.',
    starters: ['Welcome: ...', 'Purpose: ...', 'Plan: ...'],
  },
  deepen: {
    title: 'Practise out loud',
    summary: 'Say your welcome-purpose-plan opener out loud three times, timing yourself. Aim for under 40 seconds. It feels silly. It also works.',
  },
  notes: '"Kick off" (Cambridge: to start; from football kick-off). "Dial in" (Cambridge: to join a phone/video conference). Lagos colleagues: WAT, two hours behind.',
};

export default lesson;
