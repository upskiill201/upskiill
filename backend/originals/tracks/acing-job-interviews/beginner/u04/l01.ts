import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 1. Story: the founder's questions. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The founder\'s questions',
  summary: 'Mtaa Labs, round two, with the founder, Mr Njoroge. He\'s friendly and fast: "Biggest weakness? Salary expectations? Here\'s a problem: solve it." Remi has stories now, but not for these.',
  minutes: 11,
  outcomes: [
    'Recognise the classic hard questions',
    'See why they feel harder than they are',
    'Know what this chapter covers',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Round two',
      beats: [
        { speaker: 'narrator', text: 'Mr Njoroge, Mtaa Labs\' founder, leans back. "What\'s your biggest weakness?"' },
        { speaker: 'remi', text: '(in his head) Don\'t say perfectionist. Don\'t say perfectionist. (out loud) "I\'m... a perfectionist?"' },
        { speaker: 'narrator', text: 'Mr Njoroge smiles politely. "Everyone says that. Salary expectations?" Remi says "Anything is fine."' },
        { speaker: 'narrator', text: 'Then a coding problem: find duplicate orders in a list of a million. Remi goes silent for a full minute.' },
        { speaker: 'tey', text: 'This chapter: thinking out loud, real weaknesses, salary, questions that shouldn\'t be asked, and a cheat sheet for tricky ones.' },
      ],
      choice: {
        prompt: 'What would have been a better weakness answer?',
        options: [
          { text: 'A real weakness, with what he\'s doing about it', outcome: 'Right. Honest and improving beats a disguised boast.', best: true },
          { text: '"I don\'t have any weaknesses."', outcome: 'Nobody believes that, and it suggests low self-awareness.' },
          { text: '"I work too hard."', outcome: 'Another disguised boast. Interviewers hear it all the time.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Hard questions aren\'t traps. They test honesty, self-awareness and how you think under pressure.',
    },
  ],
  apply: {
    scenario: 'Round two.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'A classic hard question, or a routine one?',
        groups: ['Hard', 'Routine'],
        items: [
          { text: '"What\'s your biggest weakness?"', group: 0 },
          { text: '"What are your salary expectations?"', group: 0 },
          { text: '"When did you graduate from school?"', group: 1 },
          { text: '"Solve this problem now."', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why was "I\'m a perfectionist" a weak answer?',
        options: [
          { text: 'It\'s a disguised boast that interviewers hear constantly' },
          { text: 'It\'s too honest', why: 'It\'s the opposite.' },
          { text: 'It\'s a great answer', why: 'Mr Njoroge said everyone says it.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the hard question to what it tests.',
        pairs: [
          ['Biggest weakness', 'Honesty and self-awareness'],
          ['Salary expectations', 'Your research and confidence'],
          ['Solve this problem', 'How you think under pressure'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'I went silent for a whole minute on the coding problem.',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Silence hides your thinking. Talk them through it, even if you\'re stuck. They want to see how you approach it.' },
          { text: 'Silence is fine, take five minutes.', why: 'Long silence hides your process.' },
          { text: 'Say you can\'t do it and stop.', why: 'Show your approach.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The tip.',
        template: 'Hard questions test honesty, self-[[1]] and how you [[2]] under pressure.',
        blanks: [['awareness'], ['think']],
        distractors: ['esteem', 'sleep'],
      },
      {
        kind: 'mcq',
        prompt: 'What was wrong with "Anything is fine" for salary?',
        options: [
          { text: 'It shows no research and invites a low offer' },
          { text: 'It\'s rude', why: 'It\'s too passive.' },
          { text: 'Nothing', why: 'It hands the number to them.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many orders were in the coding problem? (one million: type the number)',
        answers: ['1000000', '1,000,000', 'a million', 'one million'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Remi\'s plan for next time is still a mistake?',
        lines: [
          'Prepare a real weakness and what I\'m doing about it.',
          'Research a salary range before the interview.',
          'If I\'m stuck on a problem, stay silent until I\'m sure.',
          'Ask a clarifying question before solving.',
        ],
        bug: 2,
        fix: 'If I\'m stuck, think out loud.',
        explanation: 'Silence hides his thinking.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what this chapter covers.',
        lines: ['Thinking out loud', 'Real weaknesses', 'Salary', 'Questions that shouldn\'t be asked', 'Tricky-question cheat sheet'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the founder\'s name? (Mr...)',
        answers: ['Njoroge', 'njoroge', 'Mr Njoroge'],
        placeholder: 'A name',
      },
    ],
  },
  reflect: {
    prompt: 'Which hard question scares you most? Why?',
    starters: ['The one that scares me is...', 'Because...'],
  },
  deepen: {
    title: 'Pressure is part of the test',
    summary: 'Some interviewers ask hard questions quickly on purpose. They want to see how you think and recover, not a perfect answer.',
  },
  notes: 'Fictional: Mtaa Labs founder Mr Njoroge (narrated); duplicate-orders coding problem.',
};

export default lesson;
