import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: keep your head',
  summary: 'The pause, the balcony, tactics vs real constraints, and soft on people, hard on problems. A quick check before Arjun learns what to do with the anger in the room.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Pause and respond instead of reacting', 'Separate people, tactics and constraints'],
  learn: [
    {
      kind: 'story',
      title: 'Monday night',
      beats: [
        { speaker: 'arjun', text: 'No email sent. Walk-away worked out. Kavya has calmed down. Joel is still nervous.' },
        { speaker: 'grace', text: 'That\'s the hardest part done. Most people send the email.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: keep your head.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the balcony steps.',
        lines: ['Pause', 'Name the feeling', 'Name what they\'re doing', 'Remember your goal', 'Respond, don\'t react'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Tactic or real constraint?',
        groups: ['Tactic', 'Constraint'],
        items: [
          { text: 'A very low first offer', group: 0 },
          { text: 'A fixed launch date', group: 1 },
          { text: '"Others did it for less"', group: 0 },
          { text: 'Board-approved budget', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What are the three natural reactions to hardball, according to Ury?',
        options: [
          { text: 'Laugh, cry, or sleep', why: 'Not quite.' },
          { text: 'Strike back, give in, or break off' },
          { text: 'Ask, listen, trade', why: 'Those are good responses, not reactions.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'What if we take too long and they go elsewhere?',
        prompt: "Grace's best reply?",
        options: [
          { text: 'You\'re replying before Wednesday, calmly. Two days of thinking isn\'t too long.' },
          { text: 'Then accept now.', why: 'Panic is what the deadline is for.' },
          { text: 'Never reply.', why: 'They do need to reply by Wednesday.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to the principle.',
        pairs: [
          ['"Let me come back to you."', 'Pause'],
          ['"He\'s measured on savings."', 'Hard by design'],
          ['"Doesn\'t cover the work."', 'Hard on the problem'],
          ['"Thanks for the quick reply."', 'Soft on the person'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Two parts.',
        template: 'Be soft on the [[1]] and hard on the [[2]].',
        blanks: [['person', 'people'], ['problem']],
        distractors: ['price', 'phone'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A quote of £48,000 and an offer of £28,000. The offer is what percent of the quote? (Round to the nearest whole number.)',
        answers: ['58', '58%'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this reply mixes the person and the problem?',
        lines: [
          'Thanks for your offer.',
          'It doesn\'t cover the work we quoted.',
          'I\'m disappointed you\'d try this on us.',
          'Could we talk on Tuesday?',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'It accuses him personally.',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the best first step after a shocking offer?',
        options: [
          { text: 'Reply within five minutes', why: 'That\'s reacting.' },
          { text: 'Pause and work out your own numbers' },
          { text: 'Accept to keep the client', why: 'Check your walk-away first.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does Ury call stepping back before you act? Going to the...',
        answers: ['balcony', 'the balcony'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Which is hardest for you: pausing, naming the feeling, or being soft on the person? Why?',
    starters: ['The hardest is...', 'Because...'],
  },
  notes: 'Checkpoint for Chapter 1 lessons 1-4. 28,000 ÷ 48,000 ≈ 58%.',
};

export default lesson;
