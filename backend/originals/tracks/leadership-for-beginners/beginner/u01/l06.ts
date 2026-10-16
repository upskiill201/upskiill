import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6. Step-by-step: your first team meeting (listen first; early wins, Watkins). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Your first team meeting',
  summary: 'Day 3, 10 a.m. Six chairs, one whiteboard, and Lucía at the front for the first time. Her first draft agenda had 14 changes on it. Tey crossed out 13.',
  minutes: 12,
  outcomes: [
    'Plan a first team meeting that builds trust',
    'Listen before you change things',
    'Find one small early win',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'The first meeting in five steps',
      steps: [
        { title: '1. Say it out loud', body: 'Name the change: "This is new for all of us. Yesterday I sat where you\'re sitting." People relax when the awkward thing is said.' },
        { title: '2. Say what won\'t change (yet)', body: 'People\'s first worry is "what happens to me?" Tell them: "I\'m not changing how we work this month. First I want to understand it."' },
        { title: '3. Ask, then really listen', body: 'Three questions: "What\'s working well? What slows you down? What would you change if you were me?" Write the answers where everyone can see them.' },
        { title: '4. Pick one early win', body: 'Choose one small, visible thing the team itself complained about, and fix it fast. In The First 90 Days, Michael Watkins argues that early wins build credibility and momentum for a new leader.' },
        { title: '5. Say how you\'ll work together', body: 'Explain what comes next: "I\'ll meet each of you one-on-one this week." Then end on time. A short meeting is a good first impression.' },
      ],
    },
    {
      kind: 'compare',
      title: 'Lucía\'s agenda, before and after',
      before: { label: 'Draft 1', text: '1. My vision. 2. New weekly reports. 3. New brand guide. 4. New posting schedule... (14 items, 90 minutes)' },
      after: { label: 'Draft 2', text: '1. This is new for all of us. 2. What won\'t change this month. 3. Your answers: working, slow, what would you change? 4. One quick fix. 5. One-on-ones this week. (30 minutes)' },
      notes: ['Fourteen changes became one quick fix.', 'Most of the meeting is the team talking.', 'Thirty minutes, and it ends on time.'],
    },
  ],
  apply: {
    scenario: 'Day 3, the first team meeting.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the meeting steps in order.',
        lines: ['Name the change', 'Say what won\'t change yet', 'Ask and listen', 'Pick one early win', 'Explain the one-on-ones'],
      },
      {
        kind: 'mcq',
        prompt: 'Why say what WON\'T change?',
        options: [
          { text: 'People\'s first worry is what happens to them; it calms that worry' },
          { text: 'To avoid making decisions', why: 'She\'ll decide later, once she understands.' },
          { text: 'Because nothing will ever change', why: 'Just not this month.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good first-meeting move, or not?',
        groups: ['Good move', 'Not yet'],
        items: [
          { text: 'Asking what slows people down', group: 0 },
          { text: 'Announcing 14 changes', group: 1 },
          { text: 'Fixing one thing the team complained about', group: 0 },
          { text: 'A 90-minute vision speech', group: 1 },
          { text: 'Ending on time', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'Honestly the worst thing is the shared drive. Nobody can find anything.',
        prompt: 'Lucía\'s best response?',
        options: [
          { text: 'That\'s not important right now.', why: 'It\'s a perfect early win: small, visible, theirs.' },
          { text: 'I\'ll reorganise the whole company\'s files.', why: 'Too big for week one.' },
          { text: 'Great example. Let\'s make that our first fix: I\'ll sort the folders with you by Friday.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A small, visible fix early on is an early ___. (one word)',
        answers: ['win'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What makes a good early win?',
        options: [
          { text: 'A big project only the boss wanted', why: 'It should matter to the team.' },
          { text: 'Something secret', why: 'Visible is the point.' },
          { text: 'Small, visible, and something the team itself cared about' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s meeting plan. Which item should go?',
        lines: [
          'Yesterday I sat where you\'re sitting.',
          'From today, everyone sends me a daily report by 5 p.m.',
          'What would you change if you were me?',
        ],
        bug: 1,
        fix: 'I\'m not changing how we work this month.',
        explanation: 'A new rule on Day 3, before she\'s listened, feels like control, not leadership.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to what it finds out.',
        pairs: [
          ['What\'s working?', 'What to protect'],
          ['What slows you down?', 'Possible early wins'],
          ['What would you change?', 'Their ideas'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The opening line.',
        template: 'This is [[1]] for all of us. Yesterday I [[2]] where you\'re [[3]].',
        blanks: [['new'], ['sat'], ['sitting']],
        distractors: ['boss', 'stood'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the promise.',
        tiles: ['First', 'I', 'want', 'to', 'understand', 'it.'],
        distractors: ['change'],
      },
    ],
  },
  reflect: {
    prompt: 'If you had to run a first meeting with a new team tomorrow, what three questions would you ask? What would you promise NOT to change yet?',
    starters: ['My three questions...', 'I wouldn\'t change...'],
  },
  deepen: {
    title: 'Find an early win',
    summary: 'Ask the people you work with: "What\'s one small thing that annoys you every week?" Pick one you can fix in a few days, and fix it. Small wins build big trust.',
  },
  notes: 'Michael D. Watkins, The First 90 Days (Harvard Business Review Press): securing early wins and accelerating learning in a new role. Listening-first first meetings are standard new-manager guidance.',
};

export default lesson;
