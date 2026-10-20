import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 4 · Lesson 7 — when values pull against each other: trade-offs. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'When values clash',
  summary: 'A Lagos fintech posts a product role that sounds perfect for Clinton\'s top value. But it\'s in Lagos, and his fourth value is staying near family. Tey helps him think through trade-offs without pretending they don\'t exist.',
  minutes: 11,
  outcomes: ['Recognise when values conflict', 'Look for options that satisfy more than one', 'Decide which value leads, for now'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Values often pull against each other: learning vs money, impact vs location, stability vs adventure. Which two are pulling for you right now?',
          replies: ['Impact and staying near family'],
        },
        {
          tey: 'Good to name it. First, look for options that satisfy both. Could Clinton do product work at Njangi Pay, in Douala? Is there a remote product role? Often the clash isn\'t as total as it first looks.',
          replies: ['And if there\'s no option for both?'],
        },
        {
          tey: 'Then decide which value leads for this stage of life, not forever. "For the next two years, staying near family leads; I\'ll look for product work in Cameroon." That\'s a choice, not a failure.',
          replies: ['What if I regret it?'],
        },
        {
          tey: 'You might. Every path has costs. Writing down why you chose helps later: you can see it was reasonable with what you knew. And you can revisit it at your next review.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Name the clash. Look for options that satisfy both. If none, choose which value leads for now, and write down why.',
    },
  ],
  apply: {
    scenario: 'The Lagos product role.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What should Clinton do first when two values clash?',
        options: [
          { text: 'Look for options that satisfy both' },
          { text: 'Pick one forever', why: 'Look for both first; choose for now if needed.' },
          { text: 'Ignore the clash', why: 'Name it and work with it.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Satisfies both values (product + near family), or only one?',
        groups: ['Both', 'Only one'],
        items: [
          { text: 'Product work at Njangi Pay, Douala', group: 0 },
          { text: 'The Lagos role', group: 1 },
          { text: 'A remote product role from Douala', group: 0 },
          { text: 'Staying a developer forever', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s best decision line.',
        from: 'clinton',
        message: 'If I can\'t find product work at home, what do I decide?',
        options: [
          { text: '"For the next two years, staying near family leads. I\'ll build product skills here and review next year."' },
          { text: '"Values don\'t matter."', why: 'Choose which leads, for now.' },
          { text: '"I\'ll be miserable either way."', why: 'Choose and write down why.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the unhelpful thought.',
        lines: ['Maybe there\'s a remote option.', 'Any trade-off means I\'ve failed.', 'I can revisit this next year.'],
        bug: 1,
        explanation: 'Every path has costs. Choosing is not failing.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each common clash to an example.',
        pairs: [
          ['Learning vs money', 'Lower pay at a great team'],
          ['Impact vs location', 'The perfect role in another city'],
          ['Stability vs adventure', 'A steady job vs a start-up'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the trade-off steps in order.',
        lines: ['Name the clash', 'Look for options that satisfy both', 'If none, choose which leads for now', 'Write down why'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Why write down why you chose?',
        options: [
          { text: 'Later you can see it was reasonable with what you knew' },
          { text: 'To prove others wrong', why: 'It\'s for you, later.' },
          { text: 'It\'s required', why: 'It helps you later.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s point.',
        template: 'Choose which value [[1]] for this stage, not [[2]].',
        blanks: [['leads'], ['forever']],
        distractors: ['loses', 'today', 'never'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which city is the product role? (one word)',
        answers: ['lagos'],
        placeholder: 'A city',
      },
      {
        kind: 'sortGroups',
        prompt: 'Healthy way to handle a clash, or not?',
        groups: ['Healthy', 'Not healthy'],
        items: [
          { text: 'Revisit the choice next year', group: 0 },
          { text: 'Pretend one value doesn\'t exist', group: 1 },
          { text: 'Talk it through with family', group: 0 },
          { text: 'Decide in a panic at midnight', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which two of your values pull against each other right now? Is there an option that satisfies both?',
    starters: ['The clash:', 'An option for both:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write down one value clash in your career. List three options, and mark any that satisfy both values.',
  },
  notes: 'The Lagos fintech is unnamed. Trade-off thinking is general career-coaching practice.',
};

export default lesson;
