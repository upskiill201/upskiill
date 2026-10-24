import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 4 · Lesson 7 — self-talk: a no to an application, not a no to you. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'The voice in your head',
  summary: 'At 1am Clinton\'s brain gets loud: "You\'re not as good as you thought." "Everyone else got jobs." Tey helps him notice that voice, and talk back to it with facts.',
  minutes: 11,
  outcomes: ['Notice unhelpful self-talk', 'Answer it with facts', 'Talk to yourself like you\'d talk to a friend'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'After a no, many people hear a harsh voice: "You\'re not good enough", "Everyone else is ahead". What\'s yours saying tonight?',
          replies: ['That I\'m not good enough', 'That everyone else has a job'],
        },
        {
          tey: 'Let\'s check it like a bug. Is it a fact or a feeling? Facts: it was "very close". Eleven drivers use your tool. Mr Tamba will be your reference. Several classmates don\'t have jobs yet either.',
          replies: ['So the voice is wrong?'],
        },
        {
          tey: 'It\'s exaggerating. Try this: what would you say to David if he got this email? Probably, "That was close, you\'ve got real proof, keep going." Say the same thing to yourself.',
          replies: ['That feels a bit silly'],
        },
        {
          tey: 'It often does at first. Write the voice\'s sentence down, then write the fact next to it. "I\'m not good enough" becomes "I was very close, and testing is the one thing to work on."',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Fact or feeling? Answer the harsh voice with facts. Talk to yourself like you\'d talk to a friend.',
    },
  ],
  apply: {
    scenario: 'Clinton answers the voice in his head.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Fact or feeling?',
        groups: ['Fact', 'Feeling'],
        items: [
          { text: 'Eleven drivers use my tool', group: 0 },
          { text: 'I\'m not good enough', group: 1 },
          { text: 'It was very close', group: 0 },
          { text: 'Everyone else is ahead', group: 1 },
          { text: 'Mr Tamba will be my reference', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the "friend test"?',
        options: [
          { text: 'Ask friends to agree you\'re bad', why: 'The opposite.' },
          { text: 'Say to yourself what you\'d say to a friend in the same spot' },
          { text: 'Compare yourself to friends', why: 'That usually makes it worse.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each harsh thought to a fact.',
        pairs: [
          ['I\'m not good enough', 'It was very close'],
          ['I have nothing to show', 'Eleven drivers use my tool'],
          ['Nobody will vouch for me', 'Mr Tamba will be my reference'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Everyone in my class has a job except me.',
        options: [
          { text: 'True, I\'m the worst.', why: 'Check: fact or feeling?' },
          { text: 'They probably cheated.', why: 'Blame doesn\'t help.' },
          { text: 'Is that a fact? Several haven\'t got one yet. And I have real proof and a reference.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the exaggeration.',
        lines: ['I didn\'t get this role.', 'I will never get any job, ever.', 'I need to get better at testing.'],
        bug: 1,
        explanation: '"Never" and "ever" are feelings, not facts.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the self-talk check in order.',
        lines: ['Notice the harsh sentence', 'Write it down', 'Ask: fact or feeling?', 'Write the fact next to it'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What would Clinton say to David in the same situation?',
        options: [
          { text: '"That was close, you\'ve got real proof, keep going."' },
          { text: '"You\'re useless."', why: 'He\'d never say that to a friend.' },
          { text: '"Give up."', why: 'He\'d encourage him.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s tip.',
        template: 'Fact or [[1]]? Talk to yourself like a [[2]].',
        blanks: [['feeling'], ['friend']],
        distractors: ['failure', 'judge', 'stranger'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Is "I will never get any job, ever" a fact or a feeling? (one word)',
        answers: ['feeling', 'a feeling'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Helpful self-talk, or harsh?',
        groups: ['Helpful', 'Harsh'],
        items: [
          { text: 'I was close; I\'ll work on testing', group: 0 },
          { text: 'I\'m a failure', group: 1 },
          { text: 'One no, many more chances', group: 0 },
          { text: 'I always mess things up', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What does your harsh voice usually say? Write one sentence, then the fact that answers it.',
    starters: ['The voice says...', 'The fact is...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Next time the harsh voice speaks, write its sentence down and answer it with one fact. Do it three times this week.',
  },
  notes: 'Fact-checking thoughts and self-compassion ("talk to yourself like a friend") are common, well-established coping techniques; presented as simple tools, not therapy.',
};

export default lesson;
