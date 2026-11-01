import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3. Chat with Tey: the Pixar pitch (story spine). */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'The Pixar pitch',
  summary: 'Tey: "Ada, Arjun remembered one thing from all your pitches: Tunde swearing he paid. That\'s a story. Let\'s build your whole pitch around one, Pixar-style."',
  minutes: 12,
  outcomes: [
    'Use the six-sentence Pixar story structure',
    'Turn your pitch into a short story',
    'Keep the story under 30 seconds',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: "Pixar's storytellers use a simple six-sentence pattern. It starts: \"Once upon a time...\" Who's the hero, and where?",
          replies: ['Once upon a time, there was an office in Lagos with a savings group of ten people.'],
        },
        {
          tey: "\"Every day...\" What normally happens?",
          replies: ['Every month, they paid into the pot, and Ada wrote it in a notebook.'],
        },
        {
          tey: "\"One day...\" What went wrong?",
          replies: ['One day, Tunde swore he\'d paid in March. The notebook said he hadn\'t. The office split into two teams.'],
        },
        {
          tey: "Ha! Drama. \"Because of that...\"",
          replies: ['Because of that, Ada learned Python and built an app that records every payment and reminds everyone.'],
        },
        {
          tey: "\"Because of that...\" again: what changed?",
          replies: ['Because of that, the arguments stopped. Then a church group heard about it. Then a youth group.'],
        },
        {
          tey: "And \"Until finally...\"",
          replies: ['Until finally... 110 people trust it with their money, and I want to reach a hundred offices.'],
        },
        {
          tey: "That's a pitch people will repeat at dinner. Same facts as before. But now there's a hero, a villain (sorry, Tunde), a turning point and a happy ending. Stories give facts somewhere to live.",
        },
      ],
    },
    {
      kind: 'compare',
      title: 'Plain vs Pixar',
      before: {
        label: 'Plain',
        text: 'Most savings groups use a notebook. My app sends reminders and keeps a record.',
      },
      after: {
        label: 'Pixar',
        text: 'One day, Tunde swore he\'d paid in March. The notebook said he hadn\'t. The office split into two teams. So I learned Python and built an app that records every payment.',
      },
      notes: [
        'A real person and a real moment.',
        'Conflict people recognise, and a little humour.',
        'The app arrives as the answer to the problem, not a list of features.',
      ],
    },
  ],
  apply: {
    scenario: 'The Pixar pitch, with Tey.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the Pixar pattern in order.',
        lines: ['Once upon a time...', 'Every day...', 'One day...', 'Because of that...', 'Because of that...', 'Until finally...'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the Pixar line to Ada\'s story.',
        pairs: [
          ['Every day...', 'They paid in, and Ada wrote it in a notebook'],
          ['One day...', 'Tunde swore he\'d paid in March'],
          ['Until finally...', '110 people trust it with their money'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did the Pixar version stick when the plain version didn\'t?',
        options: [
          { text: 'It has more features', why: 'It has fewer.' },
          { text: 'It\'s longer', why: 'Barely, and length isn\'t why.' },
          { text: 'It has a person, a conflict and a turning point people can picture' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Is it okay to make Tunde the "villain"? He\'s my friend.',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Make him sound terrible.', why: 'Light and kind. Never mean.' },
          { text: 'Keep it light and kind, and ask him first. Tunde entered you into the competition; he\'ll probably love it.' },
          { text: 'Invent a fake villain.', why: 'The real story is better, and true.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The Pixar pattern ends with "Until ___..." (one word)',
        answers: ['finally'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Story, or plain information?',
        groups: ['Story', 'Plain information'],
        items: [
          { text: 'The office split into two teams', group: 0 },
          { text: 'The app has a payment log', group: 1 },
          { text: 'Tunde swore he\'d paid in March', group: 0 },
          { text: 'It supports monthly exports', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s Pixar draft. Which line breaks the story?',
        lines: [
          'One day, Tunde swore he\'d paid in March.',
          'Because of that, I built a SQLite schema with normalised tables.',
          'Because of that, the arguments stopped.',
        ],
        bug: 1,
        fix: 'Because of that, I built an app that records every payment.',
        explanation: 'Technical detail in the middle of a story breaks the spell. Keep it human.',
      },
      {
        kind: 'mcq',
        prompt: 'How long should Ada\'s Pixar part be in a 60-second pitch?',
        options: [
          { text: 'About 20–30 seconds, leaving room for proof and the ask' },
          { text: 'The full 60 seconds', why: 'Then there\'s no ask.' },
          { text: '5 seconds', why: 'Too short for a story.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Ada\'s "one day".',
        template: 'One day, Tunde [[1]] he\'d paid in [[2]]. The notebook said he [[3]].',
        blanks: [['swore'], ['March'], ['hadn\'t']],
        distractors: ['database', 'June'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the opening.',
        tiles: ['Once', 'upon', 'a', 'time,', 'in', 'a', 'Lagos', 'office...'],
        distractors: ['database'],
      },
    ],
  },
  reflect: {
    prompt: 'Write your own pitch as a Pixar story: once upon a time, every day, one day, because of that (twice), until finally.',
    starters: ['Once upon a time...', 'Every day...', 'One day...', 'Because of that...', 'Until finally...'],
  },
  deepen: {
    title: 'Tell it at dinner',
    summary: 'Tell your Pixar pitch to someone at dinner, as a story, not a pitch. If they ask a question afterwards, it worked.',
  },
  notes: 'The "story spine" (Once upon a time / Every day / One day / Because of that / Until finally) originates with Kenn Adams\'s improv work and is associated with Pixar story artist Emma Coats\'s widely shared "rules of storytelling"; popularised as the "Pixar pitch" by Daniel Pink (To Sell Is Human, 2012).',
};

export default lesson;
