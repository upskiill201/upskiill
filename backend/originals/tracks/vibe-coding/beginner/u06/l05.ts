import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 5. Checkpoint: lessons 1–4 of Chapter 6, plus review. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: double bookings',
  summary: 'Saturday\'s jazz brunch: the app says six drivers, but only three cars show up. Two sign-ups were doubled. Ruth hands Hazel the list. Find the truth without a single guess.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Debug from evidence: error, recipe, explanation', 'Avoid the fix loop'],
  learn: [
    {
      kind: 'story',
      title: 'Audubon Park, Saturday, 9 a.m.',
      beats: [
        { speaker: 'ruth', text: 'Six drivers on your screen. Three cars in the car park. Twenty-four kids and a tuba.' },
        { speaker: 'hazel', text: 'Three of them are doubles. I can make it happen. I\'m not going to guess.' },
        { speaker: 'tey', text: 'Evidence first. Show me how.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: the doubled drivers.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Hazel\'s debugging routine, in order.',
        lines: [
          'Stop: no guessing',
          'Find the recipe that makes it happen',
          'Check the Console for a red error',
          'Report: did, expected, happened, error',
          'Ask for an explanation before any code changes',
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which message to the AI is best?',
        options: [
          { text: 'Sign-ups are broken again, fix it', why: 'No evidence: back into the loop.' },
          { text: 'Steps: log in, refresh once, tap Drive. Expected 1 sign-up, got 2. No console errors. Explain why before changing code.' },
          { text: 'Try five different fixes and pick the best', why: 'Five guesses at once.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Evidence, or guess?',
        groups: ['Evidence', 'Guess'],
        items: [
          { text: 'The exact error from the Console', group: 0 },
          { text: '"Maybe it\'s the Wi-Fi"', group: 1 },
          { text: 'A recipe that makes it happen every time', group: 0 },
          { text: '"Probably the login library"', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Six drivers on screen, three real. How many doubled sign-ups? (Number only.)',
        answers: ['3', 'three'],
        placeholder: 'Number',
      },
      {
        kind: 'findBug',
        prompt: 'Which step in Benny\'s plan starts a fix loop?',
        lines: [
          'Write down the recipe.',
          'Copy the Console error.',
          'If the first fix fails, ask for another, and another.',
        ],
        bug: 2,
        fix: 'If a fix fails, stop, go back to the last good commit, and get more evidence.',
        explanation: 'Fix on top of fix is the loop.',
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'Where do I even find the error?',
        prompt: 'Hazel\'s answer?',
        options: [
          { text: 'Press F12, click Console, then tap the button again and watch for red.' },
          { text: 'In your email.', why: 'Page errors go to the Console.' },
          { text: 'There aren\'t any.', why: 'Look before saying so.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the tool to its job.',
        pairs: [
          ['Console', 'The page\'s errors'],
          ['Recipe', 'Make the bug happen on purpose'],
          ['Last good commit', 'Escape a fix loop'],
          ['"Explain before changing code"', 'Stop the guessing'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The three-line report.',
        template: 'What I [[1]]. What I expected. What [[2]].',
        blanks: [['did'], ['happened']],
        distractors: ['hoped', 'guessed'],
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 5: in the database, how could you stop a person signing up twice for the same gig and role, whatever the page does?',
        options: [
          { text: 'You can\'t', why: 'Databases can refuse duplicates.' },
          { text: 'A rule in the database that refuses a second identical sign-up' },
          { text: 'Hide the button', why: 'The page can be bypassed; the database is the real guard.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 4: during the loop, fix 3 turned off a database setting. Can git revert undo it?',
        options: [
          { text: 'No: it was changed in Supabase, not in a file git tracks' },
          { text: 'Yes, revert undoes everything', why: 'Git only tracks files in the project folder.' },
          { text: 'Only on Fridays', why: 'It\'s about where the change lives.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'When you\'re stuck and frustrated, what do you usually do? What will you do now instead?',
  },
  deepen: {
    title: 'On your computer: one evidence-first fix',
    summary: 'Pick one small bug in your app (or make one: a button that adds twice). Recipe, Console, three-line report, "explain before changing code". Then one fix, and follow the recipe to prove it.',
  },
  notes: 'Review of Chapter 6 lessons 1–4. Unique constraints (Supabase/Postgres) prevent duplicate rows; covered in lesson 9.',
};

export default lesson;
