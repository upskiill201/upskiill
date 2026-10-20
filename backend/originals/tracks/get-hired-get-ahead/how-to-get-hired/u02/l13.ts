import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 2 · Lesson 13 — asking for feedback that's actually useful. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Asking for feedback',
  summary: 'Clinton asks Mr Tamba, "Any feedback?" Mr Tamba says, "No, all good!" and walks off. That\'s the most common answer to the most common question. Tey shows Clinton a better one.',
  minutes: 11,
  outcomes: ['Ask a feedback question people can actually answer', 'Listen without defending yourself', 'Act on feedback and show it'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: '"Any feedback?" is easy to answer with "All good!" It\'s too open, and most people don\'t want to criticise on the spot. Want a better question?',
          replies: ['Yes please'],
        },
        {
          tey: 'Make it specific and small: "What\'s one thing I could do better on the driver tests?" One thing is easy to give. It also tells him you actually want it.',
          replies: ['What if it hurts?'],
        },
        {
          tey: 'Then listen and say thank you. Don\'t explain or defend yet. Ask one follow-up if it\'s unclear: "Can you give me an example?" You can think about whether you agree later.',
          replies: ['Then what?'],
        },
        {
          tey: 'Act on it, and let them see it. Next week: "You said my test notes were hard to read, so I\'ve made a one-page summary." That loop, ask, act, show, is how people start to trust you with more.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Ask for one specific thing. Listen and thank them. Act on it. Show them you did.',
    },
  ],
  apply: {
    scenario: 'Clinton asks Mr Tamba for feedback.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does "Any feedback?" usually get "All good!"?',
        options: [
          { text: 'It\'s too open, and people avoid criticising on the spot' },
          { text: 'Clinton is perfect', why: 'Nobody is. The question is too open.' },
          { text: 'Mr Tamba doesn\'t care', why: 'He cares. The question is hard to answer.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Specific feedback question, or too open?',
        groups: ['Specific', 'Too open'],
        items: [
          { text: 'What\'s one thing I could do better on the driver tests?', group: 0 },
          { text: 'Any feedback?', group: 1 },
          { text: 'Was my Friday update clear enough?', group: 0 },
          { text: 'How am I doing?', group: 1 },
          { text: 'What would make my test notes more useful?', group: 0 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the feedback loop in order.',
        lines: ['Ask for one specific thing', 'Listen and say thank you', 'Act on it', 'Show them you did'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Mr Tamba says my test notes are hard to read. What do I say right now?',
        options: [
          { text: '"Thanks, that\'s useful. Could you show me which part was hardest?"' },
          { text: '"They\'re fine, you just read them too fast."', why: 'Don\'t defend. Listen.' },
          { text: 'Say nothing and look upset.', why: 'Thank him and ask for an example.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the step that breaks the loop.',
        lines: ['Asks for one thing to improve.', 'Argues that the feedback is unfair.', 'Makes a one-page summary next week.'],
        bug: 1,
        explanation: 'Listen first. Think about whether you agree later.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each step to Clinton\'s line.',
        pairs: [
          ['Ask', 'What\'s one thing I could do better?'],
          ['Listen', 'Thanks, can you give me an example?'],
          ['Show', 'I\'ve made a one-page summary'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'When should Clinton decide whether he agrees?',
        options: [
          { text: 'Later, after listening' },
          { text: 'Immediately, out loud', why: 'That turns into defending.' },
          { text: 'Never', why: 'You can disagree, after you\'ve listened.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the loop.',
        template: 'Ask, [[1]], show. That\'s how people trust you with [[2]].',
        blanks: [['act'], ['more']],
        distractors: ['argue', 'less', 'hide'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many things should a good feedback question ask for? (a number)',
        answers: ['1', 'one'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good response to feedback, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Thank you, that\'s useful', group: 0 },
          { text: 'That\'s not fair', group: 1 },
          { text: 'Can you give me an example?', group: 0 },
          { text: 'Everyone else does it too', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Who could give you useful feedback this week? What\'s the one specific thing you\'d ask them about?',
    starters: ['I\'d ask...', 'About...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask one person: "What\'s one thing I could do better at ___?" Write the answer down. Act on it, then tell them.',
  },
  notes: 'Specific, small feedback requests are common coaching advice. Where you live: directness of feedback varies a lot between cultures; adjust tone, keep the loop.',
};

export default lesson;
