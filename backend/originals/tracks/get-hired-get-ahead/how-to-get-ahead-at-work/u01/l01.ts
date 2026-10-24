import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 1 · Lesson 1 — free. Opens How to Get Ahead at Work: day one at Njangi Pay. Story choice. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Day one',
  summary: 'Clinton\'s first day at Njangi Pay. A laptop, a badge, a desk next to Paul Tabi, the senior developer who knows everything. Paul says four words all morning: "The docs are there." How should Clinton spend his first week?',
  minutes: 11,
  outcomes: ['Explain why the first weeks of a job matter so much', 'Choose a smart first-week approach', 'Ask your manager what success looks like'],
  learn: [
    {
      kind: 'story',
      title: 'Monday, 8:45am',
      beats: [
        { speaker: 'narrator', text: 'Week one. Njangi Pay\'s fourth floor, Douala. Clinton has a laptop, a badge with a slightly terrible photo, and a desk next to Paul Tabi.' },
        { speaker: 'clinton', text: 'Morning, Paul! I\'m Clinton, the new graduate on the offline team. Where should I start?' },
        { speaker: 'paul', text: 'The docs are there.' },
        { speaker: 'narrator', text: 'Paul puts his headphones back on. At 10am, Ngozi Bate stops by: "Settling in? Let\'s have a proper chat on Thursday."' },
        { speaker: 'tey', text: 'The first weeks in a new job shape how people see you for a long time. The aim isn\'t to impress everyone by Friday. It\'s to learn fast and understand what "good" looks like here.' },
      ],
      choice: {
        prompt: 'How should Clinton spend week one?',
        options: [
          {
            text: 'Read the docs, take notes, and use Thursday to ask Ngozi what success looks like at 30, 60 and 90 days.',
            outcome: 'By Thursday he has 40 questions narrowed to 5. Ngozi gives clear answers, and adds: "Most new people never ask me that."',
            best: true,
          },
          {
            text: 'Ship something big by Friday to prove he deserves the job.',
            outcome: 'He changes code he doesn\'t understand yet. Paul has to undo it on Friday evening. Not the first impression he wanted.',
          },
          {
            text: 'Stay quiet and wait until someone gives him a task.',
            outcome: 'Polite, but by Friday he\'s learned little and nobody knows what he can do.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Week one: learn fast, take notes, and ask your manager what success looks like at 30, 60 and 90 days.',
    },
    {
      kind: 'text',
      html: '<p><strong>Welcome to How to Get Ahead at Work.</strong> You\'ve got the job. This course is about doing well in it: your first 90 days, becoming more valuable, asking for a promotion, building a career plan, and changing direction when you need to. Your kit: a 90-day plan, an impact record, a promotion case, a career plan and a change strategy.</p>',
    },
  ],
  apply: {
    scenario: 'Clinton\'s first week.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the main aim of the first weeks in a new job?',
        options: [
          { text: 'Impress everyone by Friday', why: 'Rushing to impress often backfires.' },
          { text: 'Learn fast and understand what "good" looks like here' },
          { text: 'Stay invisible', why: 'Quiet is fine; invisible isn\'t.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Smart week-one move, or not?',
        groups: ['Smart', 'Not smart'],
        items: [
          { text: 'Read the docs and take notes', group: 0 },
          { text: 'Change code he doesn\'t understand yet', group: 1 },
          { text: 'Ask what success looks like at 30/60/90 days', group: 0 },
          { text: 'Wait silently for tasks', group: 1 },
          { text: 'Learn people\'s names and roles', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Paul just said "The docs are there" and put his headphones on. Is he angry with me?',
        options: [
          { text: 'Yes, I\'ll avoid him.', why: 'Don\'t assume. Do your homework, then ask.' },
          { text: 'Tap his shoulder every ten minutes.', why: 'Read first, then ask one good question.' },
          { text: 'Probably just busy. I\'ll read the docs properly, then bring him one specific question.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the week-one plan that backfires.',
        lines: ['Take notes on how the team works.', 'Ship a big change by Friday to prove myself.', 'Ask Ngozi what success looks like.'],
        bug: 1,
        explanation: 'Changing things before you understand them often creates work for others.',
      },
      {
        kind: 'mcq',
        prompt: 'What did Ngozi say about Clinton\'s question?',
        options: [
          { text: '"Most new people never ask me that."' },
          { text: '"Don\'t ask me questions."', why: 'She appreciated it.' },
          { text: '"Ask Paul."', why: 'She answered it, and appreciated it.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each week-one choice to its result.',
        pairs: [
          ['Learn and ask about success', 'Clear answers from Ngozi'],
          ['Ship big by Friday', 'Paul undoes it on Friday evening'],
          ['Wait silently', 'Learns little, unseen'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the question for Ngozi.',
        template: 'What does [[1]] look like at 30, 60 and [[2]] days?',
        blanks: [['success'], ['90', 'ninety']],
        distractors: ['failure', '365', 'lunch'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the name of the senior developer next to Clinton? (one word)',
        answers: ['paul'],
        placeholder: 'A name',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'How should Clinton use his 40 questions?',
        options: [
          { text: 'Ask all 40 on Thursday', why: 'Narrow them first.' },
          { text: 'Throw them away', why: 'They\'re useful. Narrow them down.' },
          { text: 'Find answers in the docs, then bring the best few to Ngozi' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Builds a good first impression, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Arriving on time', group: 0 },
          { text: 'Breaking things to look busy', group: 1 },
          { text: 'Asking good questions', group: 0 },
          { text: 'Complaining about the docs', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of your first week somewhere new (a job, school, team). What did you do well? What would you do differently?',
    starters: ['I did well at...', 'Next time I\'d...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'If you\'re in a job or course now, ask the person in charge: "What would success look like for me in the next 90 days?" Write down the answer.',
  },
  notes: 'Opens How to Get Ahead at Work (Level 3, founder topic: How to Handle Your First 90 Days at Work). Paul Tabi (CastId paul) and Ngozi Bate (CastId ngozi) are course-only cast.',
};

export default lesson;
