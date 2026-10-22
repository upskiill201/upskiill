import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9. Tap to explore: deal sheet v2, the tactic log. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Deal sheet v2: the tactic log',
  summary: 'Kavya\'s sticky note becomes part of the deal sheet: a tactic log. Every tactic spotted, and the calm answer ready for next time. Tap each line.',
  minutes: 11,
  outcomes: [
    'Keep a log of tactics and answers',
    'Link each answer to a lesson from this chapter',
    'Add a tactic log to your own deal sheet',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Arjun\'s deal sheet v2: tactic log',
      text: 'Flinch at £48,000: don\'t move, explain once. Extreme anchor £28,000: counter with scope, not their number. Good cop Ms Okafor-Lane: one team; ask what spring success looks like. Higher authority, finance limit £30,000: ask what finance needs; offer to explain. Deadline Friday: really finance approvals next week; send options Thursday. Ready for: nibbles (price every extra), take-it-or-leave-it (offer a path).',
      hotspots: [
        { phrase: 'Flinch at £48,000', note: 'Lesson 2: a gasp is not information about the work.' },
        { phrase: 'counter with scope, not their number', note: 'Lesson 2: don\'t bargain up from £28,000.' },
        { phrase: 'one team', note: 'Lesson 3: judge every offer on its numbers, whoever says it.' },
        { phrase: 'ask what finance needs', note: 'Lesson 6: a fixed budget means a fixed scope.' },
        { phrase: 'really finance approvals next week', note: 'Lesson 4: testing the deadline revealed the real date.' },
        { phrase: 'price every extra', note: 'Lesson 7: "Let me check what that involves."' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Log every tactic with its answer. Next time, you won\'t have to think under pressure.',
    },
  ],
  apply: {
    scenario: 'The tactic log.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the tactic to the logged answer.',
        pairs: [
          ['Flinch', 'Don\'t move, explain once'],
          ['Extreme anchor', 'Counter with scope'],
          ['Higher authority', 'Ask what finance needs'],
          ['Deadline', 'Test it; send options Thursday'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What did testing the Friday deadline reveal?',
        options: [
          { text: 'Friday was absolutely final', why: 'It turned out softer.' },
          { text: 'The real date was finance approvals next week' },
          { text: 'Nothing', why: 'It revealed the real driver.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Already used on Arjun, or still to come?',
        groups: ['Already used', 'Still to come'],
        items: [
          { text: 'Flinch', group: 0 },
          { text: 'Nibble', group: 1 },
          { text: 'Good cop', group: 0 },
          { text: 'Take it or leave it', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many tactics are logged as already used?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'Why write down tactics we already beat?',
        prompt: "Kavya's best reply?",
        options: [
          { text: 'No reason, delete it.', why: 'Tactics come back.' },
          { text: 'To send it to them.', why: 'It\'s an internal tool.' },
          { text: 'Because they\'ll use them again, and next time we\'ll answer without thinking.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Why log tactics.',
        template: 'So you won\'t have to [[1]] under [[2]].',
        blanks: [['think'], ['pressure']],
        distractors: ['sleep', 'water'],
      },
      {
        kind: 'mcq',
        prompt: 'What does "ask what spring success looks like" do with the good cop?',
        options: [
          { text: 'Flatters her', why: 'It\'s a genuine question.' },
          { text: 'Turns her warmth into real information about their needs' },
          { text: 'Nothing', why: 'It reveals interests.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this tactic log is wrong?',
        lines: [
          'Flinch: don\'t move.',
          'Anchor: counter with scope.',
          'Good cop: accept her offers, she\'s on our side.',
          'Deadline: test it.',
        ],
        bug: 2,
        fix: 'Good cop: one team; judge on numbers.',
        explanation: 'That\'s falling for the routine.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the finance limit in the log, in pounds?',
        answers: ['30000', '30,000', '£30,000'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the tactics as they happened on the call.',
        lines: ['Flinch', 'Good cop', 'Higher authority', 'Deadline', 'Other agencies'],
      },
    ],
  },
  reflect: {
    prompt: 'Start a tactic log for someone you negotiate with often. What do they usually do, and what will you say?',
    starters: ['They usually...', 'I will say...'],
  },
  notes: 'Deal sheet v2 (fictional) adds a tactic log from the Wednesday call.',
};

export default lesson;
