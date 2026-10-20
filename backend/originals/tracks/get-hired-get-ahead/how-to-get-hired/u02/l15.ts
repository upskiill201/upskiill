import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 2 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14. Story beat: Mrs Ewane's portfolio review. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: Mrs Ewane\'s portfolio review',
  summary: 'Mrs Ewane runs a portfolio review afternoon for final-year students. She has a red pen, a timer, and very little patience for borrowed work or real phone numbers. Honesty, privacy, feedback and other ways to get proof, mixed together.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Show work honestly, with credit', 'Keep other people\'s information private', 'Use feedback and other routes to build proof'],
  learn: [
    {
      kind: 'story',
      title: 'The red pen',
      beats: [
        { speaker: 'narrator', text: 'Wednesday, 2pm. The careers office, six students, one timer. Mrs Ewane reviews each portfolio in five minutes, red pen in hand.' },
        { speaker: 'ewane', text: 'Rules. One: if you can\'t explain it, it isn\'t yours. Two: if I can see a stranger\'s phone number, you fail. Three: if there\'s no result, it\'s a hobby, not proof. Clinton, you\'re first.' },
        { speaker: 'clinton', text: 'No pressure, then.' },
        { speaker: 'tey', text: 'Mrs Ewane\'s three rules are this chapter in a nutshell. Let\'s get Clinton through the red pen.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: Mrs Ewane\'s portfolio review.',
    items: [
      {
        kind: 'findBug',
        prompt: 'Rule one. Tap the piece Clinton can\'t honestly call his own.',
        lines: ['Njangi Tracker: built for my mum\'s savings group.', 'Budget Buddy: my budgeting app with charts.', 'Fixtures sheet: built for the faculty captains.'],
        bug: 1,
        fix: 'Budget Buddy: built on an open-source app; I added njangi contribution tracking.',
        explanation: 'He built on someone else\'s app. Credit it and say what he added.',
      },
      {
        kind: 'mcq',
        prompt: 'Rule two. A screenshot shows members\' real names. What should Clinton do?',
        options: [
          { text: 'Swap them for made-up names before sharing' },
          { text: 'Keep them, it looks more real', why: 'Real people\'s details must stay private.' },
          { text: 'Delete the whole project', why: 'Just anonymise the screenshot.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Rule three. Proof or hobby?',
        groups: ['Proof (has a result)', 'Hobby (no result)'],
        items: [
          { text: 'Tracker: zero disputes at the first meeting', group: 0 },
          { text: '"I like making apps"', group: 1 },
          { text: 'Volunteered at the clinic: queues halved', group: 0 },
          { text: '"I sometimes help at church"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'ewane',
        message: 'Two members couldn\'t find their names. What did you do about it?',
        options: [
          { text: 'I watched them use it, sorted the names alphabetically and added a search. Next meeting, everyone found theirs in seconds.' },
          { text: 'Nothing, they\'ll get used to it.', why: 'Mrs Ewane\'s pen is already moving. Feedback is a chance to improve.' },
          { text: 'I told them to try harder.', why: 'If users struggle, the design should change.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each place to the work it suits.',
        pairs: [
          ['GitHub with a README', 'Code'],
          ['A 2 to 4 page PDF', 'A role that asks for an attachment'],
          ['A shared folder', 'Designs and documents'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which feedback question would Mrs Ewane approve?',
        options: [
          { text: '"Do you like it?"', why: 'Everyone says yes. You learn nothing.' },
          { text: '"What did you try to do that didn\'t work?"' },
          { text: '"It\'s great, isn\'t it?"', why: 'A leading question.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good route to proof, or a trap?',
        groups: ['Good route', 'Trap'],
        items: [
          { text: 'A one-season volunteer project with a clear finish', group: 0 },
          { text: 'Free work "until we can afford you"', group: 1 },
          { text: 'A hackathon you didn\'t win', group: 0 },
          { text: 'Exposure with nothing to show', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Mrs Ewane\'s first rule.',
        template: 'If you can\'t [[1]] it, it isn\'t [[2]].',
        blanks: [['explain'], ['yours']],
        distractors: ['sell', 'mine', 'free'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Rule three: without a ___, it\'s a hobby, not proof. (one word)',
        answers: ['result', 'outcome'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'How should Clinton test his portfolio link before the review?',
        options: [
          { text: 'Open it in a private window, logged out' },
          { text: 'Open it on his own logged-in laptop', why: 'He\'d see private things others can\'t.' },
          { text: 'Ask Mrs Ewane to test it', why: 'Test it yourself first, so it works when it matters.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'ewane',
        message: 'Good. One piece is not a portfolio. What\'s your second?',
        options: [
          { text: 'The fixtures sheet for the captains: no more double-booked pitches. And I\'ve entered next month\'s hackathon.' },
          { text: 'Budget Buddy, as mine.', why: 'Rule one, Clinton.' },
          { text: 'I don\'t need a second one.', why: 'Two or three strong pieces is the goal.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Run Mrs Ewane\'s three rules on your own portfolio idea. Which rule would you be closest to breaking?',
    starters: ['Rule ___ worries me because...', 'I\'ll fix it by...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write Mrs Ewane\'s three rules on a sticky note and stick it where you work: explain it, protect people\'s details, show a result.',
  },
  notes: 'Checkpoint 3 of Chapter 2 reviews l11–l14: honest credit, privacy and where to host, feedback, other routes to proof. Mrs Ewane (course-only) runs the careers office.',
};

export default lesson;
