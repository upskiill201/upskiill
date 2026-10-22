import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 2. Step-by-step: answering a question. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Answering a question',
  summary: 'Lucía practises the Puebla question with the team. Five steps keep each answer short, clear and calm.',
  minutes: 12,
  outcomes: [
    'Answer a question in five steps',
    'Repeat the question for the room',
    'Keep answers short and check they landed',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Five steps for any question',
      steps: [
        { title: '1. Listen to the end', body: 'Don\'t start answering in your head halfway through. Let them finish.' },
        { title: '2. Repeat it for the room', body: '"The question is: why Monterrey and not Puebla?" Everyone hears it, and you get a few seconds to think.' },
        { title: '3. Answer first', body: '"Because Monterrey is one deal: 1,200 stores in one chain. Puebla\'s stores are split across many small chains."' },
        { title: '4. Keep it short', body: 'Under 30 seconds. Add one fact if it helps: "Puebla is next, in spring."' },
        { title: '5. Check, then move on', body: '"Does that answer it?" Then look to the next hand. Don\'t keep talking.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Listen to the end, repeat it, answer first, keep it short, check and move on.',
    },
  ],
  apply: {
    scenario: 'Answering a question.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five steps.',
        lines: ['Listen to the end', 'Repeat it for the room', 'Answer first', 'Keep it short', 'Check, then move on'],
      },
      {
        kind: 'mcq',
        prompt: 'Why repeat the question?',
        options: [
          { text: 'To waste time', why: 'It helps the room and you.' },
          { text: 'To show you\'re annoyed', why: 'It helps the room.' },
          { text: 'Everyone hears it, and you get a few seconds to think' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many Monterrey stores are in the one chain?',
        answers: ['1200', '1,200'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good Q&A habit or bad one?',
        groups: ['Good', 'Bad'],
        items: [
          { text: '"Does that answer it?"', group: 0 },
          { text: 'Answering before they finish', group: 1 },
          { text: 'Repeating the question', group: 0 },
          { text: 'A three-minute answer', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to Lucía\'s words.',
        pairs: [
          ['Repeat', '"The question is: why not Puebla?"'],
          ['Answer first', '"Because Monterrey is one deal."'],
          ['Short fact', '"Puebla is next, in spring."'],
          ['Check', '"Does that answer it?"'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'What if someone asks a long, rambling question?',
        prompt: "Carmen\'s best reply?",
        options: [
          { text: 'Interrupt and tell them to get to the point.', why: 'Summarise kindly.' },
          { text: 'Repeat the core of it in one line: "So the question is about cost?" It helps them, the room and you.' },
          { text: 'Answer every part of it.', why: 'Find the core.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Step 5.',
        template: '[[1]] it landed, then [[2]] on.',
        blanks: [['Check'], ['move']],
        distractors: ['Hope', 'carry'],
      },
      {
        kind: 'mcq',
        prompt: 'When will Puebla get chili-lime?',
        options: [
          { text: 'In spring' },
          { text: 'In October', why: 'That\'s Monterrey.' },
          { text: 'Never', why: 'In spring.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line breaks the five steps?',
        lines: [
          '"The question is: why not Puebla?"',
          '"Because Monterrey is one deal."',
          '"And also, let me tell you about our whole history in Puebla since 2015..."',
          '"Does that answer it?"',
        ],
        bug: 2,
        fix: '"Puebla is next, in spring."',
        explanation: 'Step 4: keep it short.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'An answer should be under how many seconds?',
        answers: ['30', 'thirty'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Ask a friend one of your dreaded questions. Answer with the five steps. How long did it take?',
    starters: ['It took...', 'Next time...'],
  },
  deepen: {
    title: 'Short answers invite more',
    summary: 'A short answer lets more people ask. A long one uses up the time and can make you look less sure. If they want more, they\'ll follow up.',
  },
  notes: 'Q&A steps: common presentation practice. Fictional: Monterrey 1,200 stores in one chain; Puebla split across many small chains.',
};

export default lesson;
