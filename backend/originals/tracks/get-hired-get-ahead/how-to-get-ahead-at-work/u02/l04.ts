import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 2 · Lesson 4 — finding what your team is measured on. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'What are we measured on?',
  summary: 'Clinton realises he doesn\'t know what success looks like for his team, only for himself. Ngozi shows him where the team\'s goals live, and the one question that unlocks them.',
  minutes: 12,
  outcomes: ['Find your team\'s goals', 'Connect your work to them', 'Check your priorities against them'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps to find what matters',
      steps: [
        { title: '1. Look for the written goals', body: 'Many teams have quarterly goals, a roadmap or targets. At Njangi Pay they\'re in a shared doc called "Q3 Offline Goals". Read them.' },
        { title: '2. Ask the unlock question', body: '"What are we measured on this quarter?" Ask your manager. The answer often reveals the one or two numbers everyone actually watches.' },
        { title: '3. Draw the line from your work', body: 'For each task, ask: "Which goal does this move?" Sync status moves "fewer support calls". A new colour theme moves nothing.' },
        { title: '4. Re-rank your week', body: 'Put goal-moving work in your best hours. Keep the essential small stuff (reviews, helping others). Question the rest.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Find the goals. Ask "What are we measured on?" Draw a line from each task to a goal. Re-rank your week.',
    },
  ],
  apply: {
    scenario: 'Clinton finds his team\'s goals.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Look for the written goals', 'Ask "What are we measured on?"', 'Draw the line from your work', 'Re-rank your week'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the "unlock question"?',
        options: [
          { text: '"What are we measured on this quarter?"' },
          { text: '"When\'s lunch?"', why: 'Ask what you\'re measured on.' },
          { text: '"Am I doing well?"', why: 'Ask what the team is measured on.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Moves a goal, or not?',
        groups: ['Moves a goal', 'Doesn\'t'],
        items: [
          { text: 'Sync status (fewer support calls)', group: 0 },
          { text: 'A new colour theme', group: 1 },
          { text: 'Fixing failed confirmations', group: 0 },
          { text: 'Renaming files for fun', group: 1 },
          { text: 'Faster sync on old phones', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the re-ranking mistake.',
        lines: ['Goal work in his best morning hours.', 'Stop all code reviews to focus.', 'Question low-value meetings.'],
        bug: 1,
        explanation: 'Keep essential small work like reviews; teammates depend on it.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best question for Ngozi.',
        from: 'clinton',
        message: 'I read the Q3 goals doc. What else should I ask Ngozi?',
        options: [
          { text: '"Of these goals, which one number matters most to you this quarter?"' },
          { text: '"Why are there goals?"', why: 'Ask which matters most.' },
          { text: 'Nothing, I\'ve read the doc.', why: 'Ask which matters most.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each task to the goal it moves.',
        pairs: [
          ['Sync status for support', 'Fewer support calls'],
          ['Retry failed sync faster', 'Fewer failed confirmations'],
          ['Lighter app for old phones', 'More drivers using the app'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Where are Njangi Pay\'s team goals?',
        options: [
          { text: 'In a shared doc called "Q3 Offline Goals"' },
          { text: 'Nowhere', why: 'In the Q3 Offline Goals doc.' },
          { text: 'In Paul\'s head only', why: 'They\'re written down.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the question.',
        template: 'What are we [[1]] on this [[2]]?',
        blanks: [['measured'], ['quarter']],
        distractors: ['paid', 'lunch', 'decade'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which quarter are the goals for? Q___ (a number)',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Best hours, or fit around it?',
        groups: ['Best hours', 'Fit around'],
        items: [
          { text: 'Goal-moving feature work', group: 0 },
          { text: 'Routine admin', group: 1 },
          { text: 'Hard debugging on failed confirmations', group: 0 },
          { text: 'Reading general newsletters', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What is your team, class or organisation measured on? If you don\'t know, who could you ask?',
    starters: ['I think it\'s...', 'I could ask...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'List your tasks for next week. Next to each, write the goal it moves, or "none". Question the "none"s.',
  },
  notes: 'Many organisations use quarterly goals or OKRs; terminology varies.',
};

export default lesson;
