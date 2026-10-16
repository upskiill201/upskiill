import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 8. Chat with Tey: the night before, and the hardest question (handling a tough senior question). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'The hardest question',
  summary: 'Thursday, 11 p.m. Remi can\'t sleep. Everything is ready, except one thing. What if Kamau asks the question nobody can answer: "How do I know this will last?" He opens Tey.',
  minutes: 11,
  outcomes: [
    'Prepare for the hardest question before the meeting',
    'Answer a tough question honestly and briefly',
    'Stay calm when a senior person pushes',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'What\'s the question you\'re most scared of?',
          replies: ['"How do I know this will last?"', '"Why did it take six weeks?"'],
        },
        {
          tey: "Good. Naming it is half the work. Most people prepare their slides and hope the hard question doesn't come. Better: decide your answer now. Short, honest, and with evidence.",
          replies: ['But I DON\'T know it will last.'],
        },
        {
          tey: "Then don't pretend. Say what you've done and how you'll know: \"Every fix has a permanent owner, it's in their routine, and refund days will be on your monthly report. If it creeps above five, you'll see it before customers do.\" That's honest. It doesn't promise forever. It shows a system.",
          replies: ['What if he pushes harder?'],
        },
        {
          tey: "Breathe, slow down, and keep it short. Don't over-explain: long answers sound defensive. If you don't know something, say so and say when you'll find out. And remember: you can pass a question to the person who knows best. \"Wanjiku, do you want to take the audit side?\"",
          replies: ['Anything else?'],
        },
        {
          tey: "One thing. Kamau started in the warehouse 22 years ago. He'll like Njeri's story more than any chart. You're not there to be perfect. You're there to show him five people fixed something that had been broken for years. Go to sleep.",
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Name the scariest question. Decide your answer now: short, honest, with evidence. Don\'t promise forever; show the system. Pass it to the expert when that helps.',
    },
  ],
  apply: {
    scenario: 'Thursday night, with Tey.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the best way to prepare for the hardest question?',
        options: [
          { text: 'Hope it doesn\'t come up', why: 'It usually does.' },
          { text: 'Add more slides', why: 'Slides don\'t answer questions.' },
          { text: 'Name it and decide a short, honest answer now' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good answer to a hard question, or not?',
        groups: ['Good', 'Not'],
        items: [
          { text: 'Short, honest, with evidence', group: 0 },
          { text: 'A five-minute defensive explanation', group: 1 },
          { text: '"I\'ll find out and tell you by Monday."', group: 0 },
          { text: '"It will definitely last forever."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kamau',
        message: 'How do I know this will last?',
        prompt: 'Remi\'s best answer?',
        options: [
          { text: 'Every fix has a permanent owner, it\'s in their routine, and refund days will be on your monthly report. If it creeps up, you\'ll see it first.' },
          { text: 'Trust me, it will.', why: 'A promise, not evidence.' },
          { text: 'Honestly, I can\'t say.', why: 'True, but you can show the system.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Long answers to hard questions can sound ___. (one word)',
        answers: ['defensive', 'Defensive'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'When is it right to pass the question to someone else?',
        options: [
          { text: 'Whenever Remi is nervous', why: 'Only when they\'re the better expert.' },
          { text: 'When they know the answer best, like Wanjiku on audit' },
          { text: 'Never', why: 'Passing to the expert is a strength.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the hard question to Remi\'s approach.',
        pairs: [
          ['"Will it last?"', 'Show the system'],
          ['"Is audit safe?"', 'Pass to Wanjiku'],
          ['"What did it cost?"', '"I\'ll find out by Monday."'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s planned answer to "Why six weeks?". Which line is defensive?',
        lines: [
          'Five teams, and one IT freeze.',
          'And honestly, if people had replied faster in Week 1, it would have been four.',
          'Now each fix has an owner, so it should hold.',
        ],
        bug: 1,
        fix: 'It took time to get the fixes right, with the people who own them.',
        explanation: 'Blaming slow replies in front of the CEO undoes six weeks of credit.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put answering a hard question in order.',
        lines: ['Breathe and slow down', 'Give the short, honest answer', 'Add one piece of evidence', 'Stop talking'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Don\'t promise [[1]]. Show the [[2]].',
        blanks: [['forever'], ['system', 'plan']],
        distractors: ['nothing', 'slides'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Tey\'s last advice.',
        tiles: ['Go', 'to', 'sleep.'],
        distractors: ['Panic.'],
      },
    ],
  },
  reflect: {
    prompt: 'What\'s the question you most dread being asked about something you\'re working on? Write your short, honest answer now.',
    starters: ['The question I dread: ...', 'My answer: ...'],
  },
  deepen: {
    title: 'Answer it tonight',
    summary: 'Before your next important meeting, write down the one question you hope nobody asks. Then write a three-sentence answer. You\'ll walk in calmer.',
  },
  notes: 'Preparing for difficult questions in senior presentations (anticipation, brevity, honesty about unknowns, deferring to experts) reflects standard executive-communication guidance. Mr Kamau\'s background is fixed in CAST.md (started in the Synergix warehouse 22 years ago).',
};

export default lesson;
