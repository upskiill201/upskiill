import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 2 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9. Story beat: the njangi meeting. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: the njangi meeting',
  summary: 'Sunday afternoon, his mum\'s living room. Twelve women, one tracker, and Clinton holding the treasurer\'s phone. The first real test of the first real thing he\'s built. Careers, scope and case studies, mixed together.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Choose a portfolio piece for any career', 'Keep a project small enough to finish', 'Write a case study that leads with the problem'],
  learn: [
    {
      kind: 'story',
      title: 'Sunday, 3pm',
      beats: [
        { speaker: 'narrator', text: 'Sunday. Clinton\'s mum\'s living room, twelve chairs, a big pot of puff-puff. The njangi meeting.' },
        { speaker: 'narrator', text: 'The treasurer holds up her phone. "This month: eleven paid. Mama Bih, you\'re the only one." Mama Bih opens her mouth, looks at the screen, and closes it again. Then she pays.' },
        { speaker: 'narrator', text: 'For the first time in two years, nobody argues. The meeting finishes twenty minutes early.' },
        { speaker: 'clinton', text: 'Mum. MUM. It worked.' },
        { speaker: 'tey', text: 'Real users, a real result. Now let\'s make sure Clinton can explain it, and help his friends do the same.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: after the meeting.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the result line for Clinton\'s case study?',
        options: [
          { text: '"The meeting had puff-puff."', why: 'Delicious, but not the result of the project.' },
          { text: '"At the first meeting with the tracker: zero disputes, finished 20 minutes early."' },
          { text: '"I used React."', why: 'That\'s a tool, and it goes at the bottom.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each friend\'s career to a portfolio piece.',
        pairs: [
          ['Ngum (accounting)', 'A cash book for her netball club'],
          ['David (medicine)', 'A checked health leaflet for patients'],
          ['Clinton (software)', 'The Njangi Tracker case study'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Build now or later list, for version 2?',
        groups: ['Build now', 'Later list'],
        items: [
          { text: 'Whose turn it is to collect next month', group: 0 },
          { text: 'A custom font', group: 1 },
          { text: 'A monthly reminder the treasurer can send', group: 0 },
          { text: 'An animated intro', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the case-study line that breaks "problem first".',
        lines: ['Njangi Tracker: no more "I already paid".', 'Built with React and PostgreSQL with three tables.', 'My mum\'s 12-member njangi argued every month about payments.'],
        bug: 1,
        explanation: 'Tools in the second line. Move them to the bottom.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the case study parts in order.',
        lines: ['The problem', 'What I did', 'The result', 'What I learned'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Congrats! Now, what did you learn?',
        options: [
          { text: 'I wasted a week on login and dark mode. Next time I\'ll build the useful part first and test with users sooner.' },
          { text: 'Nothing, it was perfect.', why: 'There\'s always something. Saying it shows you grow.' },
          { text: 'That I\'m a genius.', why: 'Fun, but not a lesson a recruiter can use.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Why does a health leaflet need a supervisor to check it?',
        options: [
          { text: 'Health information must be accurate; mistakes can hurt people' },
          { text: 'To make it longer', why: 'It\'s about accuracy and safety.' },
          { text: 'It doesn\'t', why: 'Health information should always be checked by a qualified person.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s two rules.',
        template: 'Build the [[1]] part first. Problem first, tools [[2]].',
        blanks: [['useful'], ['last']],
        distractors: ['pretty', 'first', 'never'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many members are in Clinton\'s mum\'s njangi? (a number)',
        answers: ['12', 'twelve'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which sentence should open Clinton\'s case study?',
        options: [
          { text: '"My mum\'s 12-member savings group argued every month about who had paid."' },
          { text: '"I am a passionate developer."', why: 'An adjective claim. Open with the problem.' },
          { text: '"This uses React."', why: 'Tools last.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Proof the tracker worked, or not?',
        groups: ['Proof', 'Not proof'],
        items: [
          { text: 'Zero disputes at the meeting', group: 0 },
          { text: 'The treasurer\'s message: "Best meeting in two years"', group: 0 },
          { text: 'Clinton thinks it looks cool', group: 1 },
          { text: 'It has dark mode', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Clinton\'s first test happened in a living room with twelve people. Where could your portfolio piece get its first real test?',
    starters: ['My first users could be...', 'I\'d test it at...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask one person who uses your project (or would) for a one-line comment about it. Save it in your evidence bank. A real quote is proof.',
  },
  notes: 'Checkpoint 2 of Chapter 2 reviews l06–l09: portfolio pieces for every career, scope, case study, write-up order. Puff-puff is a fried dough snack common in Cameroon. Mama Bih is a named extra from l01.',
};

export default lesson;
