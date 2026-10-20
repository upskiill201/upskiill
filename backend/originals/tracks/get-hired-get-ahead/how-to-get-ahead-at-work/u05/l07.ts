import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 5 · Lesson 7 — telling the "Why the change?" story. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: '"Why the change?"',
  summary: 'Every interviewer for the APM role will ask the same question: "Why do you want to move from engineering to product?" Clinton\'s first answer is "I like talking to people." Tey helps him build a better one.',
  minutes: 11,
  outcomes: ['Tell a clear story about a career change', 'Move toward something, not away from something', 'Back the story with evidence'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: '"Why the change?" is really asking: is this a considered move or an escape? What\'s the difference between "I want product" and "I\'m tired of coding"?',
          replies: ['One is towards, one is away'],
        },
        {
          tey: 'Exactly. Interviewers trust stories about moving towards something. Clinton\'s could start with his mum\'s njangi: "I\'ve always cared most about who uses what I build."',
          replies: ['Then what?'],
        },
        {
          tey: 'Then evidence: "This year I ran user research, wrote two specs, joined the Bafoussam workshop and drafted our offline priorities. Each time, that was the part of my week I looked forward to most." That\'s the energy audit, in one sentence.',
          replies: ['And why stay at Njangi Pay?'],
        },
        {
          tey: 'End with why here: "I know our drivers and our system. I can start contributing in week one." And thank engineering: "I\'ll be a better PM because I\'ve built it." Never run down the role you\'re leaving.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Towards, not away. A thread from your past, evidence from your experiments, why here, and respect for where you\'ve been.',
    },
  ],
  apply: {
    scenario: 'Clinton prepares "Why the change?"',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is "Why the change?" really asking?',
        options: [
          { text: 'Is this a considered move or an escape?' },
          { text: 'Do you hate your team?', why: 'It\'s about considered vs escape.' },
          { text: 'How much do you want to earn?', why: 'It\'s about the move.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Towards or away?',
        groups: ['Towards', 'Away'],
        items: [
          { text: 'I care most about who uses what I build', group: 0 },
          { text: 'I\'m tired of coding', group: 1 },
          { text: 'User research is the part I look forward to', group: 0 },
          { text: 'My team is annoying', group: 1 },
          { text: 'I want to decide what we build', group: 0 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the change story in order.',
        lines: ['A thread from your past', 'Evidence from experiments', 'Why here', 'Respect for where you\'ve been'],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that hurts the story.',
        lines: ['I\'ve always cared who uses what I build.', 'Honestly, engineering here is boring.', 'I can contribute from week one.'],
        bug: 1,
        explanation: 'Never run down the role you\'re leaving.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s best answer.',
        from: 'clinton',
        message: 'Interviewer: "Why move from engineering to product?" What do I say?',
        options: [
          { text: '"I\'ve always cared most about who uses what I build. This year\'s research and specs were the parts I looked forward to most, and I\'ll be a better PM because I\'ve built our system."' },
          { text: '"I like talking to people."', why: 'Add the thread, evidence and why here.' },
          { text: '"Coding is boring."', why: 'Towards, not away.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each story part to Clinton\'s line.',
        pairs: [
          ['Thread from the past', 'Mum\'s njangi tracker'],
          ['Evidence', 'Research, specs, Bafoussam'],
          ['Why here', 'Contributing from week one'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What should Clinton say about engineering?',
        options: [
          { text: 'That it makes him a better PM' },
          { text: 'That it was a mistake', why: 'Respect where you\'ve been.' },
          { text: 'Nothing at all', why: 'Show it as an advantage.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s tip.',
        template: '[[1]], not away. Back it with [[2]].',
        blanks: [['Towards'], ['evidence']],
        distractors: ['Away', 'excuses', 'feelings'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What was Clinton\'s first project for his mum? A tracker for her ___. (one word)',
        answers: ['njangi'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Considered move, or escape?',
        groups: ['Considered', 'Escape'],
        items: [
          { text: 'Tested it with experiments', group: 0 },
          { text: 'Anything but this job', group: 1 },
          { text: 'Talked to three PMs first', group: 0 },
          { text: 'Decided after one bad week', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'If you changed direction, what thread from your past would explain it?',
    starters: ['The thread:', 'My evidence:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write your own "Why the change?" answer in four sentences: thread, evidence, why here, respect for the past.',
  },
  notes: 'Builds on the "Tell me about yourself" structure from How to Get Hired, Ch3.',
};

export default lesson;
