import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5 — Checkpoint. Reviews lessons 1–4 plus Chapter 1. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Felix says yes',
  summary: 'Thursday. Zanele sent Felix his 400 cleaned records at 4 p.m. At 4:20 Felix walks over. "Two days in Week 3. Don\'t make me regret it." Quick check before the hard one: Wanjiku\'s boss.',
  minutes: 11,
  milestone: 'CHECKPOINT',
  outcomes: ['Use currency, asking and giving tools without notes', 'Connect them to Chapter 1'],
  learn: [
    {
      kind: 'story',
      title: 'Week 2, Thursday, 4:20 p.m.',
      beats: [
        { speaker: 'felix', text: 'Two days in Week 3. And send me the refund ticket numbers, I want to see them go down.' },
        { speaker: 'remi', text: 'Deal. Thank you, Felix.' },
        { speaker: 'zanele', text: '(after he leaves) Four hundred records. Two hours. Best trade I\'ve never made.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: Week 2.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Felix say yes?',
        options: [
          { text: 'Brian told him to', why: 'Brian wasn\'t involved.' },
          { text: 'He got real help first, and the fix cuts his tickets' },
          { text: 'Remi apologised a lot', why: 'He kept it short.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put influencing Felix in order.',
        lines: ['Listen: learn his currency', 'Give first: clean his records', 'Ask in person, specifically', 'Deliver the ticket numbers'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which currency?',
        groups: ['Task', 'Position', 'Relationship'],
        items: [
          { text: 'Fewer IT tickets', group: 0 },
          { text: 'Credit in front of Kamau', group: 1 },
          { text: 'Being asked first', group: 2 },
          { text: 'Cleaned records', group: 0 },
          { text: 'Leading the customer message', group: 1 },
          { text: 'A thank-you note', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'felix',
        message: 'Don\'t make me regret it.',
        prompt: 'Remi\'s best reply?',
        options: [
          { text: 'You won\'t, trust me!', why: 'Show him instead.' },
          { text: 'You owe us anyway.', why: 'Turns a gift into a debt.' },
          { text: 'You\'ll get the ticket numbers every Friday, so you can see if it\'s worth it.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'People underestimate how often others say ___. (one word)',
        answers: ['yes', 'Yes'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What was behind Wanjiku\'s no?',
        options: [
          { text: 'Fear for her name in the audit report' },
          { text: 'Dislike of Remi', why: 'It was about audit.' },
          { text: 'Laziness', why: 'She checks every refund by hand.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s plan for Wanjiku. Which line breaks this chapter?',
        lines: [
          'Bring her sample-check idea back to her, written up.',
          'Tell her Felix said yes, so she has to as well.',
          'Show how it saves her three hours a week.',
        ],
        bug: 1,
        fix: 'Ask her what audit would need to see.',
        explanation: 'Pressure from others isn\'t her currency. Audit safety is.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the tool to what it means.',
        pairs: [
          ['Stakeholder map', 'Power and interest'],
          ['Currencies', 'What they value'],
          ['Credibility', 'Do what you say'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why was cleaning Felix\'s records a smart gift?',
        options: [
          { text: 'It was a trade', why: 'It was given freely.' },
          { text: 'Big for him, small for Zanele, and no strings' },
          { text: 'It took a week', why: 'Two hours.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 2 so far.',
        template: 'Find their [[1]]. Give [[2]]. Ask in [[3]].',
        blanks: [['currency'], ['first'], ['person']],
        distractors: ['boss', 'email'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s Friday promise.',
        tiles: ['Ticket', 'numbers,', 'every', 'Friday.'],
        distractors: ['maybe'],
      },
    ],
  },
  reflect: {
    prompt: 'Who helped you recently without being asked? How did it change how you feel about helping them?',
    starters: ['They helped me by...', 'Now I...'],
  },
  deepen: {
    title: 'Show the return',
    summary: 'If someone gave you their time, show them what it achieved: a number, a result, a thank-you with detail. It makes the next yes easier.',
  },
  notes: 'Checkpoint: reviews lessons 1–4 plus Chapter 1.',
};

export default lesson;
