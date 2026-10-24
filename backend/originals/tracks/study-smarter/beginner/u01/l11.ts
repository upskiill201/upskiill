import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 11 — study myths that waste time (learning styles, rereading, highlighting, cramming). */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Study myths that waste your time',
  summary: 'Rereading feels like studying. Highlighting feels like studying. The research says they barely work. Here is what does.',
  minutes: 12,
  outcomes: [
    'Spot study habits that feel useful but barely work',
    'Name the two habits the research backs most',
    'Use AI to swap a weak habit for a strong one',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'You learn best when lessons match your learning style (visual, auditory, and so on).',
          isFact: false,
          explain: 'A popular idea, but researchers who reviewed the evidence found no good support for it. Most people learn better with words AND pictures, whatever their "style".',
        },
        {
          text: 'Rereading your notes several times is a strong way to revise.',
          isFact: false,
          explain: 'It feels good because the page looks familiar. But recognising something is not the same as remembering it in an exam. Large reviews rate rereading as low value.',
        },
        {
          text: 'Testing yourself is one of the most effective ways to learn.',
          isFact: true,
          explain: 'Pulling an answer out of your memory makes it stronger. This is called retrieval practice, and it has some of the strongest evidence in learning research.',
        },
        {
          text: 'Studying a little, often, beats one long session the night before.',
          isFact: true,
          explain: 'Spreading practice out over days (spaced practice) helps you remember for much longer than cramming does.',
        },
        {
          text: 'Highlighting most of the page helps you remember it.',
          isFact: false,
          explain: 'Highlighting is rated low value on its own. If everything is yellow, nothing stands out.',
        },
        {
          text: 'You can study well with your phone buzzing next to you.',
          isFact: false,
          explain: 'Every switch to a notification costs attention to come back. Phone away, or on do-not-disturb.',
        },
      ],
    },
    {
      kind: 'text',
      html: '<p>So here\'s the honest picture. The two habits with the strongest backing are:</p><ul><li><strong>Testing yourself</strong> (retrieval practice): closing the book and trying to remember.</li><li><strong>Spacing it out:</strong> short sessions over several days instead of one long one.</li></ul><p>And this is where AI really helps. It can turn any notes into questions in seconds, and it never gets bored of quizzing you. You\'ll go deep on both in Chapter 4. For now, one swap: <strong>every time you\'re about to reread, ask for questions instead.</strong></p>',
    },
    {
      kind: 'check',
      question: 'Kofi has 20 minutes before bed. What is the best use of it?',
      options: ['Reread his moles notes', 'Ask the AI to quiz him on moles', 'Highlight his textbook'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi checks his study habits against the evidence.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Strong habit or weak habit?',
        groups: ['Strong', 'Weak'],
        items: [
          { text: 'Testing yourself without notes', group: 0 },
          { text: 'Rereading the chapter three times', group: 1 },
          { text: 'Short sessions over several days', group: 0 },
          { text: 'Highlighting most of the page', group: 1 },
          { text: 'One long session the night before', group: 1 },
          { text: 'Explaining it in your own words', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does rereading feel like it works?',
        options: [
          { text: 'Because it does work best', why: 'The research rates it low value.' },
          { text: 'The page looks familiar, which feels like knowing it' },
          { text: 'Because it takes a long time', why: 'Time spent is not the same as learning.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: "I'm a visual learner, so I only watch videos. Reading doesn't work for me.",
        prompt: 'What is the most accurate reply?',
        options: [
          { text: "The learning styles idea isn't backed by evidence. Mix videos with testing yourself. That's what helps everyone." },
          { text: 'Yes, only watch videos then.', why: 'That is the myth.' },
          { text: 'Visual learners can\'t read.', why: 'Not true, and not kind.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Pulling an answer out of your memory is called ... practice (one word)',
        answers: ['retrieval'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Kofi was about to reread his notes. Which request swaps it for a strong habit?',
        options: [
          { text: 'Summarise my notes so I can reread them faster.', why: 'Still rereading, just shorter.' },
          { text: '[notes] Turn these into 8 questions. Ask them one at a time and wait for my answer.' },
          { text: 'Highlight the important parts of my notes.', why: 'Highlighting on its own is low value.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Swap the weak habit for a strong one.',
        pairs: [
          ['Rereading notes', 'Answering questions on them'],
          ['Cramming the night before', 'Short sessions over a week'],
          ['Highlighting everything', 'Writing one key question per page'],
        ],
      },
      {
        kind: 'findBug',
        prompt: "Which part of David's plan is the weak habit?",
        lines: ['Monday: 20 minutes of questions on vectors.', 'Wednesday: 20 more minutes of questions.', 'Thursday night: reread everything for 4 hours.'],
        bug: 2,
        fix: 'Thursday: 20 minutes of mixed questions.',
        explanation: 'Four hours of rereading is cramming and rereading together.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the one swap from this lesson.',
        template: 'Every time you are about to [[1]], ask for [[2]] instead.',
        blanks: [['reread'], ['questions', 'a quiz']],
        distractors: ['sleep', 'highlights'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the spaced practice rule.',
        tiles: ['A', 'little,', 'often,', 'beats', 'one', 'long', 'session'],
        distractors: ['never', 'cramming'],
      },
      {
        kind: 'mcq',
        prompt: 'What should Kofi do with his phone while he studies?',
        options: [
          { text: 'Keep notifications on in case of something important', why: 'Every buzz pulls his attention away.' },
          { text: 'Put it away or on do-not-disturb, except for the study chat' },
          { text: 'Check it after every question', why: 'That is a switch every minute.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Which weak habit do you rely on most? What will you swap it for this week?',
    starters: ['My weakest habit is...', 'I will swap it for...'],
  },
  deepen: {
    title: 'The research, if you are curious',
    summary: 'Look up "retrieval practice" and "spaced practice". Both have decades of research behind them, and both get a full lesson in Chapter 4.',
  },
  notes: 'Learning styles: Pashler, McDaniel, Rohrer & Bjork (2008), Psychological Science in the Public Interest 9(3), found no adequate evidence for the meshing hypothesis. Dunlosky et al. (2013): practice testing and distributed practice "high utility"; rereading and highlighting "low utility". Task switching cost is well established; stated generally.',
};

export default lesson;
