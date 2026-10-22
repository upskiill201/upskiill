import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 5 · Lesson 3 — "starting from zero" vs. bridging your experience. Before / After. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Not starting from zero',
  summary: 'Clinton worries that moving to product means throwing away a year of engineering. Miracle shows him two ways to describe the same move. One sounds like starting over. The other sounds like a promotion in a new direction.',
  minutes: 11,
  outcomes: ['Describe a change as a bridge, not a restart', 'Name what carries over', 'Show why your background is an advantage'],
  learn: [
    {
      kind: 'compare',
      title: 'Two ways to see the move',
      before: { label: 'Starting from zero', text: '"I\'m a developer who wants to try product. I don\'t have product experience, so I\'ll be a beginner again."\n\nIt sounds like a loss. It also isn\'t true.' },
      after: { label: 'A bridge', text: '"I\'ve spent a year building offline payments for drivers on basic phones. I\'ve run user research with support and drivers, written two specs, and joined the Bafoussam discovery workshop. I want to use that to decide what we build, not just how."\n\nSame person, same facts. Now his engineering year is the reason he\'d be good at product.' },
      notes: [
        'List what carries over: skills, knowledge, relationships.',
        'Show the experiments you\'ve already done.',
        'Frame the change as building on your past, not leaving it.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'You\'re not starting from zero. Show what carries over, what you\'ve tested, and why your past makes you good at the new thing.',
    },
  ],
  apply: {
    scenario: 'Clinton reframes his move.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is "starting from zero" untrue for Clinton?',
        options: [
          { text: 'It is true', why: 'Much carries over.' },
          { text: 'His engineering, research and relationships all carry over' },
          { text: 'Because he\'ll be paid the same', why: 'His skills and experience carry over.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Carries over to product, or not really?',
        groups: ['Carries over', 'Not really'],
        items: [
          { text: 'Knowing what\'s possible to build', group: 0 },
          { text: 'Relationships with support and drivers', group: 0 },
          { text: 'One specific test framework\'s quirks', group: 1 },
          { text: 'User research experience', group: 0 },
          { text: 'His favourite code editor theme', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the bridge story in order.',
        lines: ['What he\'s built', 'The product experiments he\'s done', 'What he wants to do next', 'Why his background helps'],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that undersells him.',
        lines: ['I\'ve run user research with drivers.', 'I\'m basically a beginner at everything.', 'I\'ve written two specs.'],
        bug: 1,
        explanation: 'Untrue and unhelpful. Show what carries over.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s best one-line summary.',
        from: 'clinton',
        message: 'How do I describe my move in one sentence?',
        options: [
          { text: '"I\'m bored of coding."', why: 'Frame it as building on the past.' },
          { text: '"I want a new title."', why: 'Show the bridge.' },
          { text: '"I\'ve built payments for drivers for a year; now I want to help decide what we build for them."' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each past experience to its product use.',
        pairs: [
          ['Building offline sync', 'Knows what\'s technically possible'],
          ['Support interviews', 'User research skills'],
          ['Bafoussam workshop', 'Discovery experience'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What makes the "bridge" version stronger?',
        options: [
          { text: 'It turns his engineering year into the reason he\'d be good at product' },
          { text: 'It\'s longer', why: 'It reframes his past as an advantage.' },
          { text: 'It hides his engineering', why: 'It uses it.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Build on your [[1]], don\'t [[2]] it.',
        blanks: [['past'], ['leave', 'erase']],
        distractors: ['future', 'hide', 'sell'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many product specs has Clinton written? (a number)',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Bridge framing or restart framing?',
        groups: ['Bridge', 'Restart'],
        items: [
          { text: 'My engineering helps me in product', group: 0 },
          { text: 'I\'m starting over', group: 1 },
          { text: 'I\'ve already tested this', group: 0 },
          { text: 'I know nothing about it', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'If you changed direction, what would carry over from what you do now?',
    starters: ['Skills that carry over:', 'Relationships that carry over:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write your own one-sentence bridge: what you\'ve done, what you want to do next, and why the first helps the second.',
  },
  notes: 'Bridging narrative aligns with Ibarra\'s "making sense" step (l02).',
};

export default lesson;
