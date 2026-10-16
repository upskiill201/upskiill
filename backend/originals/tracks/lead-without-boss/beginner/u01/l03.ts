import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3. Myth or Fact: credibility (Kouzes & Posner). */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Credibility comes first',
  summary: 'Zanele has a theory: "People follow confident people. Just act like you know everything." Remi isn\'t sure. Tey: "Let\'s check that against forty years of research."',
  minutes: 11,
  outcomes: [
    'Know what people look for before they follow someone',
    'Know why "fake it till you make it" backfires',
    'Build credibility by doing what you say',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'People follow whoever sounds the most confident.', isFact: false, explain: 'Myth, mostly. Confidence gets attention, but it doesn\'t last if it isn\'t backed up. When Jim Kouzes and Barry Posner asked tens of thousands of people over decades what they look for in someone they\'d willingly follow, the top answers were consistent: honest, forward-looking, competent and inspiring.' },
        { text: 'Honesty is one of the qualities people value most in a leader.', isFact: true, explain: 'Fact. In Kouzes and Posner\'s surveys, honesty has consistently been at or near the top. People want to know the person is telling them the truth before they\'ll follow them anywhere.' },
        { text: 'Credibility is something you either have or you don\'t.', isFact: false, explain: 'Myth. Kouzes and Posner sum up how credibility is built: Do What You Say You Will Do. It\'s built, or lost, one small promise at a time.' },
        { text: 'Admitting what you don\'t know can make you more credible.', isFact: true, explain: 'Fact. "I don\'t know yet, I\'ll find out by Thursday" (and then doing it) builds more trust than a confident guess that turns out wrong.' },
        { text: 'Being new means you have to wait months to be credible.', isFact: false, explain: 'Myth. You can start this week: learn the details, keep small promises, and be honest about what you don\'t know. Credibility grows fast when people see you deliver.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Honest, forward-looking, competent, inspiring. Do what you say you will do. Say "I don\'t know yet" when you don\'t.',
    },
  ],
  apply: {
    scenario: 'Myth or fact, with Zanele.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which qualities did Kouzes and Posner find people want in someone they\'d follow?',
        options: [
          { text: 'Loud, confident, tall, funny', why: 'Not the research answer.' },
          { text: 'Senior, strict, rich, famous', why: 'None of those top the list.' },
          { text: 'Honest, forward-looking, competent, inspiring' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Confidence alone makes people follow', group: 0 },
          { text: 'Honesty is valued near the top', group: 1 },
          { text: 'You must wait months to be credible', group: 0 },
          { text: '"I don\'t know yet" can build trust', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Just act like you know everything. That\'s how I survived my first month.',
        prompt: 'What does Remi say?',
        options: [
          { text: 'Good plan, I\'ll bluff.', why: 'Bluffs get found out, and credibility drops.' },
          { text: 'Ha. I think I\'ll try "I don\'t know yet, I\'ll find out by Thursday", then actually find out.' },
          { text: 'You never knew anything?', why: 'Unkind, and she\'s a spreadsheet genius.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kouzes and Posner\'s rule: Do What You Say You Will ___. (one word)',
        answers: ['Do', 'do'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the quality to Remi\'s move.',
        pairs: [
          ['Honest', '"I don\'t know yet."'],
          ['Competent', 'Learns refunds inside out'],
          ['Forward-looking', '"Here\'s where we could be in six weeks."'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How is credibility built, mostly?',
        options: [
          { text: 'One small kept promise at a time' },
          { text: 'One big speech', why: 'Speeches help; kept promises matter more.' },
          { text: 'By job title', why: 'Remi has no title, and can still build it.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s week. Which line costs credibility?',
        lines: [
          'Tell Felix I\'ll send the refund data by Wednesday, and do it.',
          'Tell Wanjiku the fix will "definitely" take two weeks, without checking.',
          'Tell Njeri I don\'t know warehouse returns yet, and ask her.',
        ],
        bug: 1,
        fix: 'Tell Wanjiku I\'ll have a real estimate by Friday.',
        explanation: 'A confident guess that\'s wrong costs more than an honest "not yet".',
      },
      {
        kind: 'orderLines',
        prompt: 'Put building credibility in order.',
        lines: ['Make a small promise', 'Keep it', 'Make a bigger one', 'Keep that too'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Do what you [[1]] you will do. Say "I don\'t [[2]] yet" when you don\'t.',
        blanks: [['say'], ['know']],
        distractors: ['think', 'care'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s honest answer.',
        tiles: ['I\'ll', 'find', 'out', 'by', 'Thursday.'],
        distractors: ['maybe'],
      },
    ],
  },
  reflect: {
    prompt: 'Who\'s the most credible person you know? What do they do that makes you believe them?',
    starters: ['The most credible person I know...', 'They always...'],
  },
  deepen: {
    title: 'One kept promise',
    summary: 'Make one small promise today ("I\'ll send it by 3"), and keep it exactly. Notice how it feels to be the person who does what they say.',
  },
  notes: 'James M. Kouzes & Barry Z. Posner, The Leadership Challenge (1987; 7th ed. 2023) and Credibility (1993; 2011): characteristics of admired leaders survey (honest, forward-looking, competent, inspiring); "DWYSYWD: Do What You Say You Will Do".',
};

export default lesson;
