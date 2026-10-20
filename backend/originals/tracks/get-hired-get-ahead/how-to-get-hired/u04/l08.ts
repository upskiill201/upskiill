import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 4 · Lesson 8 — turning feedback into a plan. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'From feedback to plan',
  summary: '"Light on testing." Clinton could feel bad about it, or he could fix it. With Miracle\'s help, he turns one line of feedback into a two-week plan, and a new story for his next interview.',
  minutes: 12,
  outcomes: ['Turn one piece of feedback into a small plan', 'Make the improvement visible', 'Create a new interview story from it'],
  learn: [
    {
      kind: 'steps',
      title: 'Feedback to plan in four steps',
      steps: [
        { title: '1. Make it specific', body: '"Light on testing" becomes "I don\'t write automated tests for my sync code."' },
        { title: '2. One small, real project', body: 'Add automated tests to the Kmer sync: what happens offline, when data returns, when the same confirmation arrives twice. Two weeks, evenings.' },
        { title: '3. Make it visible', body: 'Put the tests on GitHub with a short write-up. Add one line to his CV: "Added automated tests to offline sync; caught two bugs before release."' },
        { title: '4. Turn it into a story', body: 'Next interview: "A company told me I was light on testing. So I added tests to my sync code, and they caught two bugs before our drivers did." That\'s a great answer to "Tell me about feedback you received."' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Make it specific. Do one small project. Show it. Turn it into a story.',
    },
  ],
  apply: {
    scenario: 'Clinton acts on the feedback.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Make it specific', 'One small, real project', 'Make it visible', 'Turn it into a story'],
      },
      {
        kind: 'mcq',
        prompt: 'Why make "light on testing" more specific?',
        options: [
          { text: 'You can\'t act on something vague' },
          { text: 'To argue with it', why: 'To act on it.' },
          { text: 'It\'s already specific enough', why: 'Make it a concrete gap.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good response to the feedback, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Add tests to the Kmer sync', group: 0 },
          { text: 'Decide he\'s bad at coding', group: 1 },
          { text: 'Write a short GitHub write-up', group: 0 },
          { text: 'Take a 40-hour course and never build anything', group: 1 },
          { text: 'Add one CV line with a result', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the weak plan step.',
        lines: ['Add tests for offline, sync and duplicates.', 'Become the world\'s best tester by Friday.', 'Write a short GitHub write-up.'],
        bug: 1,
        explanation: 'Too big. One small, real project.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best interview answer.',
        from: 'clinton',
        message: 'Next interview: "Tell me about feedback you received." What do I say?',
        options: [
          { text: '"A company said I was light on testing, so I added tests to my sync, and they caught two bugs before our drivers did."' },
          { text: '"I\'ve never had feedback."', why: 'Use the real story.' },
          { text: '"A company rejected me unfairly."', why: 'Turn it into growth, not blame.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each step to Clinton\'s action.',
        pairs: [
          ['Make it specific', 'No automated tests for sync'],
          ['Make it visible', 'Tests on GitHub with a write-up'],
          ['Turn it into a story', 'Feedback answer for the next interview'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What CV line should Clinton add?',
        options: [
          { text: '"Added automated tests to offline sync; caught two bugs before release."' },
          { text: '"Good at testing."', why: 'Show it with a result.' },
          { text: 'Nothing', why: 'Show the improvement.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the plan.',
        template: 'Make it specific. Do one small [[1]]. Show it. Turn it into a [[2]].',
        blanks: [['project'], ['story']],
        distractors: ['excuse', 'complaint', 'course'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many bugs did the tests catch? (a number)',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Specific or vague?',
        groups: ['Specific', 'Vague'],
        items: [
          { text: 'No automated tests for my sync', group: 0 },
          { text: 'I\'m bad at stuff', group: 1 },
          { text: 'Tests for duplicate confirmations', group: 0 },
          { text: 'Get better generally', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Take one piece of feedback you\'ve received. What\'s one small, real project that would show you\'ve acted on it?',
    starters: ['The feedback was...', 'My small project:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write your own four-step plan for one piece of feedback. Put the small project in your calendar.',
  },
  notes: 'Automated tests for sync edge cases fit Clinton\'s JavaScript stack. The two caught bugs are story details.',
};

export default lesson;
