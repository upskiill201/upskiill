import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: what did they mean?',
  summary: 'Short messages, tone in writing, the ladder of inference and intent vs impact. A quick check before Grace learns a simple way to check what someone meant.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Separate facts from stories', 'Separate intent from impact'],
  learn: [
    {
      kind: 'story',
      title: 'Friday',
      beats: [
        { speaker: 'grace', text: 'Two days of dread over one word. Femi\'s daughter is fine, by the way.' },
        { speaker: 'priya', text: 'Good. Ladder check: what did you actually see?' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: what did they mean?',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Fact or story?',
        groups: ['Fact', 'Story'],
        items: [
          { text: 'She didn\'t reply to my email', group: 0 },
          { text: 'She\'s ignoring me on purpose', group: 1 },
          { text: 'He wrote "OK."', group: 0 },
          { text: 'He\'s disappointed in me', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'In the email study, readers got the tone right about how often?',
        options: [
          { text: 'About 90%', why: 'Much lower.' },
          { text: 'About 78%', why: 'That\'s what writers predicted.' },
          { text: 'About 56% of the time' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the ladder of inference, bottom to top.',
        lines: ['What happened', 'What I noticed', 'What I think it means', 'My assumption', 'My conclusion', 'What I do'],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: 'Priya wrote "Can we talk tomorrow?" with no reason. I\'m panicking.',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Climb down: the fact is she wants to talk. Ask: "Sure! Anything I should prepare?"' },
          { text: 'You\'re probably being fired.', why: 'That\'s the top of the ladder.' },
          { text: 'Don\'t reply.', why: 'A quick question helps.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the term to its meaning.',
        pairs: [
          ['Intent', 'What you meant'],
          ['Impact', 'How it landed'],
          ['Egocentrism', 'Hearing your own tone in your head'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Judging.',
        template: 'We judge ourselves by [[1]] and others by [[2]].',
        blanks: [['intent', 'intentions'], ['impact']],
        distractors: ['salary', 'clothes'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this reply argues instead of repairing?',
        lines: [
          'Thanks for telling me.',
          'I meant it as a joke.',
          'You\'re too sensitive.',
          'I\'m sorry it hurt.',
        ],
        bug: 2,
        fix: 'I can see how it landed.',
        explanation: 'It blames them for the impact.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Writers predicted what percentage accuracy for their tone?',
        answers: ['78', '78%'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What is the best first move when a message feels cold?',
        options: [
          { text: 'Reply equally coldly', why: 'That starts a real cold war.' },
          { text: 'Tell others about it', why: 'Check with the person first.' },
          { text: 'Assume the generous reading and, if it matters, check' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Climbing down the ladder, or up?',
        groups: ['Down', 'Up'],
        items: [
          { text: '"What did she actually say?"', group: 0 },
          { text: '"She must be furious."', group: 1 },
          { text: '"What else could it mean?"', group: 0 },
          { text: '"Everyone hates my work."', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What message are you over-reading right now? Climb down the ladder: what\'s the fact?',
    starters: ['The fact is...', 'It could also mean...'],
  },
  notes: 'Checkpoint for Chapter 3 lessons 1-4.',
};

export default lesson;
