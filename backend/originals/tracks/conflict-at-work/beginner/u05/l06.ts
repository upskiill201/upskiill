import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 6. Reading: observation, feeling, need, request. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Observation, feeling, need, request',
  summary: 'Priya lends Grace a book she says changed how she talks to her team: Nonviolent Communication. Its four-part pattern is a simple way to ask for what you need without blame.',
  minutes: 12,
  outcomes: [
    'Use the four parts of Nonviolent Communication',
    'Separate an observation from a judgement',
    'Turn a complaint into a clear request',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Four parts',
      html: '<p>Psychologist Marshall Rosenberg\'s <em>Nonviolent Communication</em> suggests four parts for raising something difficult:</p><ol><li><strong>Observation:</strong> what happened, like a camera would record it. No judgement. "The car was gone on Tuesday and Wednesday, and I found out by text."</li><li><strong>Feeling:</strong> how you feel, not what you think they are. "I felt worried and stuck." (Not "I felt you were disrespectful", which is a judgement.)</li><li><strong>Need:</strong> what matters to you underneath. "I need to plan my mornings, and to know you\'re safe."</li><li><strong>Request:</strong> a clear, doable ask, not a demand. "Would you ask me the day before you need it?"</li></ol><p>The same works at work: <em>"In Monday\'s meeting, the report was called "just opinions" in front of the team (observation). I felt embarrassed (feeling). I need to be able to answer concerns properly (need). Could we raise concerns one-to-one first? (request)"</em></p><p>The hardest part is the observation: describing what happened without "always", "never" or labels.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Observation (what a camera would see), feeling (yours), need (underneath), request (clear and doable).',
    },
  ],
  apply: {
    scenario: 'Four parts.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the four parts.',
        lines: ['Observation', 'Feeling', 'Need', 'Request'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Observation or judgement?',
        groups: ['Observation', 'Judgement'],
        items: [
          { text: '"The car was gone on Tuesday and Wednesday."', group: 0 },
          { text: '"You\'re so selfish."', group: 1 },
          { text: '"I found out by text."', group: 0 },
          { text: '"You always do this."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which is a real feeling, not a judgement?',
        options: [
          { text: '"I felt you were disrespectful."', why: 'That\'s a judgement of him.' },
          { text: '"I felt ignored by you."', why: 'That\'s about what he did, not how she feels.' },
          { text: '"I felt worried."' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to Grace\'s line with Jayden.',
        pairs: [
          ['Observation', '"The car was gone two days running."'],
          ['Feeling', '"I felt worried and stuck."'],
          ['Need', '"I need to plan my mornings."'],
          ['Request', '"Would you ask the day before?"'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: 'Isn\'t "I felt embarrassed" too soft for work?',
        prompt: "Priya's best reply?",
        options: [
          { text: 'Yes, never mention feelings at work.', why: 'A brief feeling explains the impact.' },
          { text: 'It\'s honest and short. It tells Callum the impact without accusing him. You can say it calmly and move on.' },
          { text: 'Say you were furious.', why: 'Honest and calm works better.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The observation test.',
        template: 'Describe it as a [[1]] would record it. No [[2]].',
        blanks: [['camera'], ['judgement', 'judgment', 'labels']],
        distractors: ['friend', 'facts'],
      },
      {
        kind: 'mcq',
        prompt: 'What makes a request different from a demand?',
        options: [
          { text: 'It\'s louder', why: 'It\'s about choice.' },
          { text: 'Nothing', why: 'Demands leave no choice.' },
          { text: 'It\'s clear and doable, and the other person can say no or suggest another way' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which part of this four-part message is wrong?',
        lines: [
          'Observation: you never ask before taking the car.',
          'Feeling: I feel worried.',
          'Need: I need to plan my mornings.',
          'Request: would you ask the day before?',
        ],
        bug: 0,
        fix: 'Observation: the car was gone on Tuesday and Wednesday.',
        explanation: '"Never" is a judgement, not an observation.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many parts does Nonviolent Communication use?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'A request or a demand?',
        groups: ['Request', 'Demand'],
        items: [
          { text: '"Would you ask the day before?"', group: 0 },
          { text: '"You will ask from now on."', group: 1 },
          { text: '"Could we talk one-to-one first?"', group: 0 },
          { text: '"Never do that again."', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write a four-part message for something that\'s bothering you: observation, feeling, need, request.',
    starters: ['When...', 'I felt...', 'I need...', 'Would you...?'],
  },
  deepen: {
    title: 'Nonviolent Communication',
    summary: 'Rosenberg\'s approach is used in schools, workplaces and mediation. Its core idea: behind most conflict are unmet needs, and naming them clearly makes agreement easier.',
  },
  notes: 'Rosenberg, Nonviolent Communication: A Language of Life (1999/2003): observation, feeling, need, request. Fictional examples.',
};

export default lesson;
