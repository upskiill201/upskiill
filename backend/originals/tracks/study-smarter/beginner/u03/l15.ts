import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14 with earlier material. Story beat: Clinton finds vectors in 30 seconds. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: vectors in 30 seconds',
  summary: "A week later, Miracle asks Clinton for his vectors notes again. Videos, gaps, subjects and systems, all mixed.",
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can take notes from any source and keep them organised', 'Mix it with the whole chapter'],
  learn: [
    {
      kind: 'story',
      title: 'The rematch',
      beats: [
        { speaker: 'miracle', text: 'Clinton. Vectors. Go.' },
        { speaker: 'narrator', text: 'Index page. Syllabus line 4.2. Amber. Page 31. Twenty-eight seconds.' },
        { speaker: 'clinton', text: "I'd like it noted that I am now the most organised person on this call." },
        { speaker: 'david', text: '(muted, but visibly laughing)' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: vectors in 30 seconds.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the video routine in order.',
        lines: ['Write what you know and one question', 'Watch a few minutes', 'Pause and write from memory', 'Predict what comes next', 'AI quiz at the end'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Kofi missed a lesson on enzymes. Which first request is best?',
        options: [
          { text: '[syllabus lines + my notes] Which syllabus lines do my notes not cover?' },
          { text: 'Write the enzyme notes I missed.', why: 'Find the gap, then fill it himself.' },
          { text: "Summarise Efua's notes.", why: 'Not his learning.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the subject to its note shape.',
        pairs: [
          ['Physics', 'Worked examples with reasons'],
          ['History', 'Cause → event → effect'],
          ['Biology', 'Drawn processes'],
          ['French', 'Phrases in sentences'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which source mark?',
        groups: ['T (textbook)', 'E (Efua)', 'AI'],
        items: [
          { text: 'From page 112', group: 0 },
          { text: '"Mrs Asante always asks this"', group: 1 },
          { text: 'An analogy from the chat', group: 2 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Enzymes at too high a temperature change shape and stop working. They are ... (one word)',
        answers: ['denatured'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        from: 'david',
        message: 'I paused the video 5 times and wrote notes each time. But I rewound and copied the screen each time.',
        prompt: 'What should Kofi say?',
        options: [
          { text: 'Nearly. Write from memory at each pause, without rewinding. Then check.' },
          { text: 'Perfect.', why: 'Rewinding to copy is copying.' },
          { text: 'Stop pausing.', why: 'Pausing is good. Copying at the pause is the problem.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: "Which line of Clinton's set-up should he fix?",
        lines: ['Index page: syllabus line, colour, page.', 'Notes ordered by the date he wrote them.', 'A questions page at the back.'],
        bug: 1,
        fix: 'Notes ordered by syllabus line.',
        explanation: 'Revision follows the syllabus, so notes should too.',
      },
      {
        kind: 'mcq',
        prompt: 'The AI gave Kofi a literature quote with no page number. What should he do?',
        options: [
          { text: 'Find it in his own copy of the book, or leave it out' },
          { text: 'Use it in his essay', why: 'It may be misquoted or invented.' },
          { text: 'Ask the AI if it is real', why: 'The book is the only real check.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the transcript request.',
        template: "Here's a transcript. Make 5 [[1]] to check I understood it. Don't [[2]] it.",
        blanks: [['questions'], ['summarise', 'summarize']],
        distractors: ['jokes', 'read'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good habit or weak habit?',
        groups: ['Good', 'Weak'],
        items: [
          { text: 'Ten-minute Sunday tidy', group: 0 },
          { text: 'Notes in a chat with yourself', group: 1 },
          { text: 'Writing from memory after each video chunk', group: 0 },
          { text: 'Sticking a friend\'s notes in your folder as yours', group: 1 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the system rule.',
        tiles: ['One', 'home', 'per', 'subject'],
        distractors: ['four', 'apps'],
      },
      {
        kind: 'mcq',
        prompt: 'Which of Kofi\'s notes should he double-check first before the mocks?',
        options: [
          { text: 'The bits marked AI' },
          { text: 'The bits from the textbook', why: 'Worth checking, but the AI bits are most likely to be off.' },
          { text: 'None, they are all fine', why: 'Checking the AI-marked bits is cheap insurance.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which habit from this chapter would save you the most time at revision? Why?',
    starters: ['The habit is...', 'It would save me...'],
  },
  deepen: { title: 'Keep going', summary: 'Do the Sunday tidy for one subject this week, and answer two items from your questions page.' },
  notes: 'Review only.',
};

export default lesson;
