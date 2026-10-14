import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 19 — your notes routine, explored as one annotated week. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Your notes routine',
  summary: "Kofi's notes week, start to finish. Tap each part to see which lesson it came from, and why it's there.",
  minutes: 12,
  outcomes: [
    'Put the whole chapter into one weekly routine',
    'Know which step to do in class, after class and at the weekend',
    'Adapt it to your own subjects',
  ],
  learn: [
    {
      kind: 'explore',
      title: "Kofi's notes week. Tap each part.",
      text: 'In class: Cornell layout, own words, question marks for anything unclear. Same evening: cue questions and a summary from memory, then ask the AI what is missing and add fixes in colour. Videos: pause every few minutes and write from memory. End of a topic: one-page sheet from a blank page, checked against the syllabus. Sunday: ten-minute tidy, index updated, two questions answered. Always: mark AI bits and check before sharing.',
      hotspots: [
        { phrase: 'Cornell layout, own words, question marks', note: 'Lessons 1, 6: process, don\'t transcribe; leave a question mark instead of copying what you don\'t get.' },
        { phrase: 'cue questions and a summary from memory', note: 'Lessons 3, 6: the cues turn notes into a quiz; the summary from memory is retrieval practice.' },
        { phrase: 'ask the AI what is missing and add fixes in colour', note: 'Lesson 2: you write, AI checks, you fix. The coloured bits are your weak spots.' },
        { phrase: 'pause every few minutes and write from memory', note: 'Lesson 11: active watching, not a video marathon.' },
        { phrase: 'one-page sheet from a blank page', note: 'Lesson 17: building the sheet IS the revision.' },
        { phrase: 'ten-minute tidy, index updated', note: 'Lesson 14: one home per subject, ordered by syllabus.' },
        { phrase: 'mark AI bits and check before sharing', note: 'Lessons 12, 18: so mistakes don\'t travel.' },
      ],
    },
    {
      kind: 'text',
      html: '<p>It looks like a lot, but most of it fits into time you already spend: the lesson itself, 15 minutes that evening, and 10 minutes on Sunday.</p><p>Not every subject needs every step. Ask: <em>"Here is my notes routine and my subjects: [list]. Which steps matter most for each subject?"</em> Then trim it to what you\'ll actually do. A small routine you keep beats a perfect one you drop.</p>',
    },
    {
      kind: 'check',
      question: 'When do you write the cue questions?',
      options: ['During the lesson', 'The same evening, after the lesson', 'The night before the exam'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi builds his weekly routine.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'When does this happen?',
        groups: ['In class', 'Same evening', 'Sunday'],
        items: [
          { text: 'Own words and question marks', group: 0 },
          { text: 'Cue questions and summary', group: 1 },
          { text: 'Index updated', group: 2 },
          { text: 'AI lists what is missing', group: 1 },
          { text: 'File loose photos into folders', group: 2 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order a single topic\'s life in Kofi\'s routine.',
        lines: ['Notes in class, own words', 'Cues and summary that evening', 'AI check, fixes in colour', 'One-page sheet at the end of the topic'],
      },
      {
        kind: 'mcq',
        prompt: 'Why trim the routine to fit your subjects?',
        options: [
          { text: 'A small routine you keep beats a perfect one you drop' },
          { text: 'Because the steps do not work', why: 'They work. Not all are needed for every subject.' },
          { text: 'To have less to do', why: 'The point is keeping it going.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request helps Kofi trim the routine?',
        options: [
          { text: 'Here is my notes routine and my subjects: [list]. Which steps matter most for each subject?' },
          { text: 'Do my notes routine for me.', why: 'It cannot do the thinking for him.' },
          { text: 'Is my routine good?', why: 'Too vague for useful help.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'david',
        message: 'This is too much. I can\'t do all of it every day.',
        prompt: 'What should Kofi say?',
        options: [
          { text: "You don't have to. Most of it fits in the lesson, 15 minutes that evening and 10 on Sunday. Start with the parts that help your hardest subject." },
          { text: 'Then do none of it.', why: 'Part of it is far better than none.' },
          { text: 'Do it all, no excuses.', why: 'A routine you drop does not help.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to the lesson it came from.',
        pairs: [
          ['Own words, question marks', "Why copying doesn't stick"],
          ['You write, AI checks, you fix', 'Make notes first'],
          ['Cover the right, answer the left', 'Cornell notes'],
          ['Check before you share', 'True to the source'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes is the Sunday tidy? (number)',
        answers: ['10', 'ten'],
        placeholder: 'Number',
      },
      {
        kind: 'findBug',
        prompt: "Which part of Clinton's routine has slipped?",
        lines: ['Cornell notes in class.', 'Cue questions that evening.', 'Revision sheet copied from the AI at the end of each topic.'],
        bug: 2,
        fix: 'Revision sheet built from a blank page, then checked by the AI.',
        explanation: 'Building it from memory is the revision.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the routine timing.',
        template: 'The lesson itself, [[1]] minutes that evening, and 10 minutes on [[2]].',
        blanks: [['15', 'fifteen'], ['Sunday']],
        distractors: ['90', 'Friday'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the routine rule.',
        tiles: ['A', 'small', 'routine', 'you', 'keep'],
        distractors: ['perfect', 'drop'],
      },
    ],
  },
  reflect: {
    prompt: 'Write your own notes routine for one week: what you will do in class, that evening and on Sunday.',
    starters: ['In class:', 'That evening:', 'Sunday:'],
  },
  deepen: {
    title: 'Run it for a week',
    summary: 'Run your trimmed routine for one week on your two hardest subjects. Next Sunday, check what you kept and what you dropped.',
  },
  notes: 'Consolidation lesson; no new claims.',
};

export default lesson;
