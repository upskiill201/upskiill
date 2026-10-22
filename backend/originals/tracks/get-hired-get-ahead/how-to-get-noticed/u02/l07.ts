import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 2 · Lesson 7 — start small, finish: scope and the smallest useful version. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Start small, finish',
  summary: 'Two weeks in, Clinton\'s njangi tracker has a login page, a dark mode and a logo, and still can\'t show who paid. Tey explains the most important skill in building anything: deciding what NOT to build yet.',
  minutes: 11,
  outcomes: ['Define the smallest useful version of a project', 'Say no to features that can wait', 'Finish something people can use'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Two weeks into the njangi tracker. Clinton has: a login page, a dark mode, a logo, and animations. What can his mum do with it?',
          replies: ['Log in?', 'Admire the logo?'],
        },
        {
          tey: 'Log in, and admire the logo. She still can\'t see who paid. Clinton built the fun parts first and the useful part never. This is the most common way projects die.',
          replies: ['So what should he do?'],
        },
        {
          tey: 'Write one sentence: "The smallest version that solves the problem is..." For the njangi: "a list of the twelve members, a tick when someone pays this month, and whose turn it is to collect." That\'s it. Build only that.',
          replies: ['What about the logo?'],
        },
        {
          tey: 'Write it on a "later" list. Login, dark mode, reminders, charts: all later. A small thing that\'s finished and used beats a big thing that\'s "almost ready" forever. And finishing is itself a skill employers look for.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Build the useful part first. Everything else goes on a "later" list.',
    },
  ],
  apply: {
    scenario: 'Clinton cuts his project down.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Build now, or later list?',
        groups: ['Build now', 'Later list'],
        items: [
          { text: 'List of the twelve members', group: 0 },
          { text: 'Dark mode', group: 1 },
          { text: 'Tick when someone pays this month', group: 0 },
          { text: 'A logo', group: 1 },
          { text: 'Whose turn it is to collect', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the most common way projects die?',
        options: [
          { text: 'Finishing too early', why: 'Finishing early and improving is how projects survive.' },
          { text: 'Building the fun parts first and never finishing the useful part' },
          { text: 'Having too few features', why: 'The opposite. Too many features stop projects being finished.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s sentence.',
        template: 'The [[1]] version that solves the [[2]] is...',
        blanks: [['smallest'], ['problem']],
        distractors: ['prettiest', 'biggest', 'logo'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'But without a login, anyone could see the payments!',
        options: [
          { text: 'Then build the login for three more weeks.', why: 'There\'s a smaller safe option: keep it private to start.' },
          { text: 'Privacy doesn\'t matter.', why: 'It really does. Keep it simple AND private.' },
          { text: 'Good point. Smallest safe version: keep it on Mum\'s phone only for now, and add login later.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that breaks "start small".',
        lines: ['Week 1: members list and payment ticks.', 'Week 2: animations, dark mode and a logo before anyone uses it.', 'Week 3: show Mum and fix what confuses her.'],
        bug: 1,
        explanation: 'Polish before anyone has used the core. That can wait.',
      },
      {
        kind: 'mcq',
        prompt: 'Why is finishing a project a skill employers value?',
        options: [
          { text: 'Work is full of deadlines; finishing shows you can deliver' },
          { text: 'It isn\'t, only ideas matter', why: 'Ideas are cheap. Delivery is what teams need.' },
          { text: 'Because unfinished work is illegal', why: 'Ha. It\'s about showing you can deliver.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s new plan in order.',
        lines: ['Write the one-sentence smallest version', 'Build only that', 'Give it to Mum to use', 'Then add one thing from the later list'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each feature to where it belongs.',
        pairs: [
          ['Payment ticks', 'Build now'],
          ['Monthly reminders', 'Later list'],
          ['Members list', 'Build now, first'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Features that can wait go on the "___" list. (one word)',
        answers: ['later'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which sentence is the best "smallest version" for David\'s study-group tracker?',
        options: [
          { text: '"A full learning platform with quizzes, videos and leaderboards."', why: 'Far too big for a first version.' },
          { text: '"Something to help studying."', why: 'Too vague to build.' },
          { text: '"A shared list of topics, with a tick when the group has covered each one."' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'For your portfolio idea, write the one-sentence smallest version. Then write three things for your "later" list.',
    starters: ['The smallest version is...', 'Later: ...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Give your smallest version a deadline two weeks from today. Put it in your phone. Finished beats perfect.',
  },
  notes: 'Minimum viable product / scope-cutting principles, simplified (e.g. Eric Ries, The Lean Startup, 2011, for the MVP idea). Privacy note sets up l12 (keeping members\' data private).',
};

export default lesson;
