import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 4 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9. Story beat: Mrs Ewane hears the news. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: Mrs Ewane hears the news',
  summary: 'Clinton tells Mrs Ewane about Njangi Pay. She doesn\'t say sorry. She says, "Show me the feedback." Then she quizzes him. Reading feedback, self-talk, feedback to plan, and "not yet".',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Find the useful part of feedback', 'Answer harsh self-talk with facts', 'Turn feedback into a plan and a story'],
  learn: [
    {
      kind: 'story',
      title: 'The careers office',
      beats: [
        { speaker: 'narrator', text: 'The careers office. Clinton tells Mrs Ewane the news.' },
        { speaker: 'ewane', text: 'I am not going to say sorry, Mr Clinton. I am going to say: show me the feedback.' },
        { speaker: 'narrator', text: 'She reads Brenda\'s email, nods once, and picks up her pen.' },
        { speaker: 'ewane', text: '"Very close" and "light on testing". Good. That is a plan, not a funeral. Quiz.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: Mrs Ewane\'s quiz.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What are the three things to look for in feedback?',
        options: [
          { text: 'What went well, what\'s in your control, any open door' },
          { text: 'Who to blame, what to argue, what to ignore', why: 'None of these help.' },
          { text: 'Only the bad parts', why: 'Look for all three.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Fact or feeling?',
        groups: ['Fact', 'Feeling'],
        items: [
          { text: 'It was very close', group: 0 },
          { text: 'I\'m hopeless', group: 1 },
          { text: 'Light on testing', group: 0 },
          { text: 'Everyone else is ahead', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put feedback-to-plan in order.',
        lines: ['Make it specific', 'One small, real project', 'Make it visible', 'Turn it into a story'],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the verdict that ends the story.',
        lines: ['I didn\'t get it this time.', 'I\'m clearly not cut out for fintech.', 'I\'m adding tests to my sync.'],
        bug: 1,
        explanation: 'A verdict. Use "not yet" and a next step.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best answer to Mrs Ewane.',
        from: 'ewane',
        message: 'Tell me about a piece of feedback you received, as you would in an interview.',
        options: [
          { text: 'A company said I was light on testing, so I added tests to my sync, and they caught two bugs before our drivers did.' },
          { text: 'I was rejected unfairly.', why: 'Turn it into growth.' },
          { text: 'I\'ve never had feedback.', why: 'Use the real story.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line of Brenda\'s email to what it means.',
        pairs: [
          ['Very close', 'A real contender'],
          ['Light on testing', 'One fixable gap'],
          ['More roles later', 'An open door'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What\'s the "friend test"?',
        options: [
          { text: 'Talk to yourself like you\'d talk to a friend' },
          { text: 'Ask a friend to judge you', why: 'Be your own friend.' },
          { text: 'Compare yourself to friends', why: 'Usually makes it worse.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Mrs Ewane\'s line.',
        template: 'That is a [[1]], not a [[2]].',
        blanks: [['plan'], ['funeral']],
        distractors: ['party', 'verdict', 'joke'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Complete the phrase that keeps a setback story going: "Not ___." (one word)',
        answers: ['yet'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'In Clinton\'s control, or not?',
        groups: ['In control', 'Not'],
        items: [
          { text: 'Adding tests', group: 0 },
          { text: 'The other candidate\'s experience', group: 1 },
          { text: 'Checking back later', group: 0 },
          { text: 'Njangi Pay\'s budget', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What should a feedback plan include?',
        options: [
          { text: 'One small, real project you can show' },
          { text: 'A promise to be perfect', why: 'Small and real.' },
          { text: 'Nothing visible', why: 'Make it visible.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s one piece of feedback you could turn into a small project this month?',
    starters: ['The feedback:', 'The project:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Show your feedback (any kind) to someone like Mrs Ewane: a careers adviser, mentor or teacher. Ask them: "What\'s the plan here?"',
  },
  notes: 'Checkpoint 2. Reviews l06–l09.',
};

export default lesson;
