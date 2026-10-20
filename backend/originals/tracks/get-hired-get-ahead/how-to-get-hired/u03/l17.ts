import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 3 · Lesson 17 — story choice: the bus breaks down on interview morning. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'The bus breaks down',
  summary: 'Interview morning. Clinton took the early bus, exactly as planned. Forty minutes outside Douala, it stops with smoke coming from the engine. His interview is at 10am. It\'s 8:50.',
  minutes: 11,
  outcomes: ['Handle a problem on the day calmly', 'Contact the employer early', 'Recover your focus afterwards'],
  learn: [
    {
      kind: 'story',
      title: '8:50am',
      beats: [
        { speaker: 'narrator', text: '8:50am. Smoke from the engine. The driver says, "Thirty minutes, maybe an hour." Clinton\'s interview is at 10am, across the city.' },
        { speaker: 'clinton', text: 'I did everything right. I took the early bus. This can\'t be happening.' },
        { speaker: 'tey', text: 'Things go wrong on the day for lots of people. What employers remember is usually how you handled it, not that it happened.' },
      ],
      choice: {
        prompt: 'What should Clinton do?',
        options: [
          {
            text: 'Call Brenda now, explain briefly, give a realistic arrival time, and find another way there.',
            outcome: 'Brenda: "Thanks for letting me know so early. Take a moto-taxi if you can; we\'ll start at 10:20." He arrives at 10:12, a little dusty and completely calm.',
            best: true,
          },
          {
            text: 'Say nothing and hope he makes it.',
            outcome: 'He arrives at 10:35 with no warning. Brenda has already moved the next candidate into his slot.',
          },
          {
            text: 'Give up and go home: the day is ruined.',
            outcome: 'One broken bus becomes a lost interview. Brenda would have happily waited twenty minutes.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Problem on the day? Tell them early, briefly, with a realistic time. Then focus on getting there.',
    },
  ],
  apply: {
    scenario: 'Interview morning goes wrong.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What do employers usually remember about a problem on the day?',
        options: [
          { text: 'How you handled it' },
          { text: 'That it happened at all', why: 'Usually it\'s how you handled it.' },
          { text: 'Nothing', why: 'They notice how you handle it.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s steps in order.',
        lines: ['Call Brenda straight away', 'Explain in one sentence', 'Give a realistic arrival time', 'Find another way there'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s message to Brenda.',
        from: 'clinton',
        message: 'Brenda didn\'t answer the call. What do I text?',
        options: [
          { text: '"Hi Brenda, my bus broke down outside Douala. I\'m on my way by moto-taxi and expect to arrive about 10:15. Very sorry."' },
          { text: '"Bus broke, idk when I\'ll come lol"', why: 'Clear, polite and with a time.' },
          { text: 'Nothing.', why: 'Always let them know.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good handling or poor?',
        groups: ['Good', 'Poor'],
        items: [
          { text: 'Calling early with a new time', group: 0 },
          { text: 'Arriving late with no warning', group: 1 },
          { text: 'A short, calm apology', group: 0 },
          { text: 'A long story about the engine', group: 1 },
          { text: 'Going home', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that makes it worse.',
        lines: ['Sorry I\'m a little late; my bus broke down.', 'Honestly, your office is impossible to get to.', 'Thank you for waiting.'],
        bug: 1,
        explanation: 'Don\'t blame them. One short apology, then move on.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to its result.',
        pairs: [
          ['Call early', 'Interview moved to 10:20'],
          ['Say nothing', 'Slot given to the next candidate'],
          ['Go home', 'A lost interview'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'When Clinton arrives, how should he mention it?',
        options: [
          { text: 'One short apology, then focus on the interview' },
          { text: 'Ten minutes on the bus story', why: 'Short, then move on.' },
          { text: 'Pretend it didn\'t happen', why: 'Acknowledge it briefly.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Tell them [[1]], briefly, with a [[2]] time.',
        blanks: [['early'], ['realistic']],
        distractors: ['later', 'fake', 'never'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What time did Clinton arrive? (for example 10:12)',
        answers: ['10:12', '1012', '10.12'],
        placeholder: 'A time',
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps him refocus, or not?',
        groups: ['Helps', 'Doesn\'t'],
        items: [
          { text: 'Slow breathing in reception', group: 0 },
          { text: 'Replaying the breakdown in his head', group: 1 },
          { text: 'Glancing at his story bank', group: 0 },
          { text: 'Complaining to the receptionist', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time something went wrong at the worst moment. How did you handle it, and what would you do now?',
    starters: ['Once...', 'Now I\'d...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Save your next interviewer\'s or recruiter\'s phone number in your contacts before the day. Write a short "running late" text in advance.',
  },
  notes: 'Moto-taxis ("bend-skin") are common in Cameroonian cities. Brenda (CastId brenda) is shown via Clinton\'s narration here; she speaks in l20.',
};

export default lesson;
