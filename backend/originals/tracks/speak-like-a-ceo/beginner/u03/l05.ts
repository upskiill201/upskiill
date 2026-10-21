import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: message and slides',
  summary: 'One message, the four steps to find it, and Mayer\'s three principles. A quick check before Lucía structures the talk.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Find one message', 'Make slides that help'],
  learn: [
    {
      kind: 'story',
      title: 'Down to 12',
      beats: [
        { speaker: 'lucia', text: 'I cut 42 slides to 12. Every title says its point. Not one bullet left.' },
        { speaker: 'carmen', text: 'And the message?' },
        { speaker: 'lucia', text: '"We listened, and it worked. Let\'s keep listening."' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: message and slides.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the steps to one message.',
        lines: ['Topic', 'What about it?', 'So what for them?', 'Short enough to repeat'],
      },
      {
        kind: 'mcq',
        prompt: 'Which principle says "don\'t read your slides aloud"?',
        options: [
          { text: 'Redundancy' },
          { text: 'Coherence', why: 'That\'s cutting extras.' },
          { text: 'Signalling', why: 'That\'s highlighting.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good slide or bad slide?',
        groups: ['Good', 'Bad'],
        items: [
          { text: 'A title that says the point', group: 0 },
          { text: 'Eight bullets read aloud', group: 1 },
          { text: 'One highlighted bar', group: 0 },
          { text: 'A dancing chip GIF', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many slides does Lucía have now?',
        answers: ['12', 'twelve'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'marta',
        message: 'My training talk is called "Overview of new processes". Is that a message?',
        prompt: "Lucía\'s best reply?",
        options: [
          { text: 'That\'s a topic. Ask "so what for them?" Maybe: "The new process saves you an hour a week."' },
          { text: 'Yes, perfect.', why: 'It\'s a topic.' },
          { text: 'Call it "Processes".', why: 'Still a topic.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Message first.',
        template: '[[1]] first, [[2]] last.',
        blanks: [['Message'], ['slides']],
        distractors: ['Fonts', 'jokes'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the principle to an example.',
        pairs: [
          ['Coherence', 'Cut the background music'],
          ['Signalling', 'Colour the key bar orange'],
          ['Redundancy', 'Say it, don\'t print it'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Marta\'s slide plan breaks a principle?',
        lines: [
          'Title: "The new process saves an hour a week"',
          'One diagram of the new steps.',
          'Paste the full 6-page procedure onto slide 2.',
          'Highlight the step that changed.',
        ],
        bug: 2,
        fix: 'Put the procedure in a handout.',
        explanation: 'Six pages on a slide breaks coherence.',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the bus-home test?',
        options: [
          { text: 'What one thing should they remember on the way home?' },
          { text: 'How long the bus takes', why: 'It finds your message.' },
          { text: 'Whether they liked the slides', why: 'It finds your message.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many slides did Lucía cut? (42 minus 12)',
        answers: ['30', 'thirty'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Write your next talk\'s message in one sentence and say it to a friend. Could they repeat it?',
    starters: ['My message:...', 'They repeated...'],
  },
  notes: 'Checkpoint for Chapter 3 lessons 1-4.',
};

export default lesson;
