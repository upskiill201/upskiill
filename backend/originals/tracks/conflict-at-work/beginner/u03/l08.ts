import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8. Chat with Tey: clearing it up. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Clearing it up',
  summary: 'Grace knows the truth about "Fine." now. But two days of coldness happened, on both sides. Tey helps her plan the five-minute conversation that clears it up for good.',
  minutes: 12,
  outcomes: [
    'Plan a short conversation to clear up a misunderstanding',
    'Share your side without blame',
    'Agree a habit that prevents the next one',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Start with care, not the misunderstanding: "How\'s your daughter doing?" That comes first.', replies: ['Then?'] },
        { tey: 'Then your side, owned: "I\'m embarrassed: I read your "Fine." as angry and went quiet for two days. That was my story, not yours."', replies: ['Won\'t that make it awkward?'] },
        { tey: 'For thirty seconds. Then it\'s a relief for both of you. He probably noticed you went quiet and wondered why.', replies: ['And to stop it happening again?'] },
        { tey: 'Agree one small habit: "If either of us reads something as off, we just ask." Simple, and it\'s the whole chapter in one sentence.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Clear it up: care first, own your story, hear theirs, agree one small habit for next time.',
    },
  ],
  apply: {
    scenario: 'The five-minute conversation.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order Grace\'s conversation.',
        lines: ['Ask about his daughter', 'Own her story', 'Hear his side', 'Agree a habit for next time'],
      },
      {
        kind: 'mcq',
        prompt: 'Why start with his daughter?',
        options: [
          { text: 'Care for the person comes before the misunderstanding' },
          { text: 'To soften him up', why: 'It\'s genuine care.' },
          { text: 'To avoid the topic', why: 'The topic comes next.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Owning her story, or blaming him?',
        groups: ['Owning', 'Blaming'],
        items: [
          { text: '"I read it as angry. That was my story."', group: 0 },
          { text: '"You made it sound angry."', group: 1 },
          { text: '"I went quiet for two days."', group: 0 },
          { text: '"You should have explained."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'Ha. I did notice you went quiet. I thought you were cross about the fix.',
        prompt: "Grace's best reply?",
        options: [
          { text: '"Well, I was."', why: 'She wasn\'t; she was worried.' },
          { text: '"Let\'s not talk about it."', why: 'They\'re nearly done clearing it.' },
          { text: '"So we both had stories! Shall we agree: if either of us reads something as off, we just ask?"' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part to its line.',
        pairs: [
          ['Care first', '"How\'s your daughter doing?"'],
          ['Own your story', '"That was my story, not yours."'],
          ['Agree a habit', '"If either of us reads something as off, we ask."'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The habit.',
        template: '"If either of us reads something as [[1]], we just [[2]]."',
        blanks: [['off', 'wrong'], ['ask']],
        distractors: ['funny', 'ignore'],
      },
      {
        kind: 'mcq',
        prompt: 'How long does Tey say the awkward bit lasts?',
        options: [
          { text: 'A week', why: 'Much shorter.' },
          { text: 'About thirty seconds' },
          { text: 'It never ends', why: 'It\'s brief, then a relief.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Grace\'s plan would undo the repair?',
        lines: [
          'How\'s your daughter doing?',
          'I read your "Fine." as angry. That was my story.',
          'But honestly, one-word replies are rude.',
          'Shall we just ask if something reads as off?',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'It turns her owned story back into blame.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes is the clearing-up conversation planned to take?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'A good habit to agree, or not?',
        groups: ['Good habit', 'Not'],
        items: [
          { text: 'Ask if something reads as off', group: 0 },
          { text: 'Never use chat again', group: 1 },
          { text: 'Call for sensitive topics', group: 0 },
          { text: 'Always reply within one minute', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Is there a misunderstanding you could clear up this week? Plan the four parts.',
    starters: ['Care first:...', 'My story:...', 'Our habit:...'],
  },
  deepen: {
    title: 'Repair attempts',
    summary: 'Gottman\'s research found that what separates stable relationships isn\'t fewer conflicts but more successful repair attempts: small moves that say "we\'re OK". The same works at work.',
  },
  notes: 'Repair attempts: Gottman & Silver, The Seven Principles for Making Marriage Work (1999). Applied to workplace relationships by analogy. Fictional dialogue.',
};

export default lesson;
