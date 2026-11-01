import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 8. Step-by-step: turning dead ends into next steps — "I don't know" → "Let me find out", "That's not my job" → "Let me find who can help". */
const lesson: OriginalLesson = {
  key: 'l08',
  title: '"I don\'t know" → "Let me find out"',
  summary: 'A visiting manager from the Johannesburg office asks Remi three questions in the corridor. His answers: "I don\'t know." "That\'s not my job." "I can\'t." All true. All wrong.',
  minutes: 12,
  outcomes: [
    'Turn "I don\'t know" into a next step',
    'Replace "not my job" and "I can\'t" with helpful alternatives',
    'Sound capable even when you don\'t have the answer',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Three dead ends, three next steps',
      steps: [
        {
          title: 'The corridor',
          body: 'Wednesday morning. A manager visiting from Synergix Johannesburg stops Remi. "Are you on the delivery project? When will the Mombasa numbers be ready? Can you send me last month\'s too?" Remi\'s answers: "I don\'t know." "That\'s not my job." "I can\'t." She nods and walks away. Everything he said was true.',
        },
        {
          title: '"I don\'t know" → "Let me find out"',
          body: 'Nobody expects you to know everything. They expect you to do something about it. "I\'m not sure, let me find out and come back to you by this afternoon." Same honesty, plus a next step and a time.',
        },
        {
          title: '"That\'s not my job" → "Let me find who can help"',
          body: 'It may not be your job, but you can be the person who connects. "That\'s Wanjiku in Finance. I\'ll introduce you by email." You\'ve helped without taking on the work.',
        },
        {
          title: '"I can\'t" → "What I can do is..."',
          body: 'Instead of a closed door, offer the open one. "I can\'t send last month\'s numbers, they\'re not mine to share, but what I can do is ask Brian to send them to you today."',
        },
        {
          title: 'The pattern',
          body: 'Every dead end becomes: honest + next step + (when). That\'s what people mean when they say someone is "professional": not that they know everything, but that nothing stops with them.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Honest + next step + when. "I\'m not sure. Let me find out and come back to you by 3."',
    },
  ],
  apply: {
    scenario: 'Wednesday morning. The corridor, take two.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each dead end to its upgrade.',
        pairs: [
          ['I don\'t know.', 'Let me find out and come back to you.'],
          ['That\'s not my job.', 'Let me find who can help.'],
          ['I can\'t.', 'What I can do is...'],
        ],
      },
      {
        kind: 'mcq',
        prompt: '"When will the Mombasa numbers be ready?" Remi doesn\'t know. Best answer?',
        options: [
          { text: '"I\'m not sure. Let me check with Emeka and come back to you by this afternoon."' },
          { text: '"I don\'t know."', why: 'Honest, but it ends the conversation.' },
          { text: '"Soon!"', why: 'Sounds like a guess, because it is one.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Build the pattern in order.',
        lines: ['Be honest: "I\'m not sure."', 'Give a next step: "Let me check with Emeka."', 'Give a time: "I\'ll come back to you by 3."'],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Someone from Sales just asked me about the warehouse budget. That\'s SO not my job. What do I say?',
        prompt: 'What does Remi suggest?',
        options: [
          { text: 'Tell them it\'s not your job.', why: 'True, but the person is still stuck.' },
          { text: 'Say: "That\'s Finance. I\'ll introduce you to Wanjiku."' },
          { text: 'Make up a number.', why: 'Never.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: '"I can\'t send that, but what I ___ do is ask Brian." (one word)',
        answers: ['can'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s reply to the visiting manager. Which line is still a dead end?',
        lines: [
          'Thanks for asking!',
          'The Mombasa numbers aren\'t my job, so I can\'t help.',
          'Brian will be in at 2 if that helps.',
        ],
        bug: 1,
        fix: 'Emeka owns the Mombasa numbers. I\'ll ask him for a date and let you know today.',
        explanation: 'Point to who can help, and add a next step.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Dead end, or next step?',
        groups: ['Dead end', 'Next step'],
        items: [
          { text: 'No idea.', group: 0 },
          { text: 'Let me find out.', group: 1 },
          { text: 'Not my department.', group: 0 },
          { text: 'I\'ll introduce you to the right person.', group: 1 },
          { text: 'What I can do is...', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What do people usually mean when they call someone "professional"?',
        options: [
          { text: 'They know everything', why: 'Nobody does.' },
          { text: 'They wear a suit', why: 'Not at Synergix on a Friday.' },
          { text: 'Nothing gets stuck with them: they always move things to a next step' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['gonna', 'going to'],
          ['Would you mind...?', 'Softer request'],
          ['Owner', 'The one person responsible'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s honest, professional answer.',
        tiles: ['I\'m', 'not', 'sure.', 'Let', 'me', 'find', 'out', 'by', '3.'],
        distractors: ['no', 'idea'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of the last time you said "I don\'t know", "not my job" or "I can\'t". Rewrite it with the honest + next step + when pattern.',
    starters: ['I said...', 'Now I\'d say...'],
  },
  deepen: {
    title: 'Nothing stops with you',
    summary: 'For one week, try to make sure no question or request stops with you: answer it, find out, or point to who can. It\'s the fastest way to build a reputation.',
  },
  notes: 'Teaching pattern (honest + next step + when) is general workplace communication advice. The visiting Johannesburg manager is unnamed.',
};

export default lesson;
