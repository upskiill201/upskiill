import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 5 — Checkpoint. Reviews lessons 1–4 plus the course so far. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: five minutes to go',
  summary: 'Speaker 6 is on stage. A volunteer clips a microphone to Ada\'s collar. Tunde texts: "You\'ve got this. Also I\'m in row 3 with a sign." Five minutes. One last check.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Use the ask and Q&A tools without notes', 'Review the whole course in one quick check'],
  learn: [
    {
      kind: 'story',
      title: 'The side of the stage, 7:42 p.m.',
      beats: [
        { speaker: 'narrator', text: 'Tunde\'s text: "You\'ve got this. Also, I\'m in row 3 with a sign. It says NO HOSTAGES."' },
        { speaker: 'ada', text: '(laughing, then breathing out slowly) I\'m excited. Hook. Tunde. App. Treasurer. Numbers. Ask. Rhyme. Stop.' },
        { speaker: 'narrator', text: 'Five minutes. Let\'s run the checklist with her.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: five minutes to go.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Where should Ada\'s ask go?',
        options: [
          { text: 'At second 59', why: 'Speaker 4 tried that.' },
          { text: 'In the last 15 seconds, but before the closing line' },
          { text: 'At the very start', why: 'They don\'t know why to say yes yet.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Ada\'s beats in order.',
        lines: ['Hook', 'Tunde', 'App', 'Treasurer', 'Numbers', 'Ask', 'Rhyme'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good Q&A habit, or not?',
        groups: ['Good habit', 'Not great'],
        items: [
          { text: 'Pause, then answer', group: 0 },
          { text: 'Bluff a number', group: 1 },
          { text: 'Acknowledge, answer, bridge', group: 0 },
          { text: 'Call the question silly', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Quick: what makes an ask clear?',
        prompt: 'Your answer?',
        options: [
          { text: 'Asking for "any help at all".', why: 'Too vague.' },
          { text: 'Asking for everything at once.', why: 'Too big.' },
          { text: 'Specific, the right size, why them, and an easy next step.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'If you don\'t know an answer: say so, and say how you\'ll ___ out. (one word)',
        answers: ['find'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the chapter to its big idea.',
        pairs: [
          ['Chapter 1', 'One sentence and five boxes'],
          ['Chapter 3', 'Hook, story, rhyme'],
          ['Chapter 4', 'Prepared beats passionate'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s last-minute thoughts. Which one should she ignore?',
        lines: [
          'Breathe out slowly. I\'m excited.',
          'Maybe I should change the hook to something completely new.',
          'Ask in the last 15 seconds, then the rhyme.',
        ],
        bug: 1,
        fix: 'Trust the hook. It works.',
        explanation: 'Last-minute rewrites are how people go blank. Trust the rehearsed version.',
      },
      {
        kind: 'mcq',
        prompt: 'A judge challenges her: "You\'re very junior." What\'s the pattern?',
        options: [
          { text: 'Acknowledge, answer honestly, bridge to proof and the ask' },
          { text: 'Deny it', why: 'Honesty wins.' },
          { text: 'Apologise', why: 'No shrinkers.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the realistic goal of the whole pitch?',
        options: [
          { text: 'Explain every feature', why: 'Week one\'s mistake.' },
          { text: 'Earn the next conversation: someone who wants to help' },
          { text: 'Never be asked a question', why: 'Questions mean interest.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 5 so far.',
        template: 'A [[1]] ask. Answer [[2]], then one reason. If you don\'t know, say so [[3]].',
        blanks: [['clear', 'specific'], ['first'], ['honestly']],
        distractors: ['vague', 'bluff'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Tunde\'s sign.',
        tiles: ['NO', 'HOSTAGES'],
        distractors: ['DATABASE'],
      },
    ],
  },
  reflect: {
    prompt: 'Write your own five-minute checklist for before you pitch: your beats, your ask, your answers to the top two questions, and your nerves cue.',
    starters: ['Beats: ...', 'Ask: ...', 'Top questions: ...', 'Nerves cue: ...'],
  },
  deepen: {
    title: 'A checklist on your phone',
    summary: 'Save your five-minute checklist as a phone note. Read it once before any interview, meeting or event where you might pitch, then put the phone away.',
  },
  notes: 'Checkpoint: reviews lessons 1–4 plus the whole course.',
};

export default lesson;
