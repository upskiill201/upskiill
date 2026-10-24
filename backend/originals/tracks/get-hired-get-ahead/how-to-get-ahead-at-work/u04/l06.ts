import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 4 · Lesson 6 — Clinton's values, ranked. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'What matters to Clinton',
  summary: 'Miracle asks Clinton to rank what matters most in his work, not what should matter. He writes five lines, rewrites them twice, and finally keeps this version. Tap each line.',
  minutes: 11,
  outcomes: ['Rank your work values honestly', 'See how values shape career choices', 'Spot values that pull against each other'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each of Clinton\'s values',
      text: '1. Building things real people rely on, like my mum\'s njangi.\n2. Learning fast from people better than me.\n3. Enough money to support my mum and save.\n4. Staying in Cameroon, near family.\n5. A title that sounds impressive.',
      hotspots: [
        { phrase: 'Building things real people rely on', note: 'His top value, and it matches his energy audit: drivers, support, the njangi tracker. A strong clue to his direction.' },
        { phrase: 'Learning fast from people better than me.', note: 'Why he chose Njangi Pay over Kmer, and why he turned down the Yaoundé title.' },
        { phrase: 'Enough money to support my mum and save.', note: '"Enough", not "the most". Honest about money without letting it decide everything.' },
        { phrase: 'Staying in Cameroon, near family.', note: 'A real constraint. It rules some options out, and that\'s useful to know before planning.' },
        { phrase: 'A title that sounds impressive.', note: 'Ranked last, honestly. Admitting it\'s there, but low, helps him notice when he\'s tempted by titles.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Rank what actually matters, not what should. Your top values point to a direction; your constraints narrow it.',
    },
  ],
  apply: {
    scenario: 'Clinton ranks his values.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why rank what actually matters, not what "should"?',
        options: [
          { text: 'To look humble', why: 'Honesty makes the plan useful.' },
          { text: 'A plan built on fake values won\'t guide real choices' },
          { text: 'No reason', why: 'Fake values mislead.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'A value, or a constraint?',
        groups: ['Value', 'Constraint'],
        items: [
          { text: 'Building things people rely on', group: 0 },
          { text: 'Staying in Cameroon', group: 1 },
          { text: 'Learning from better people', group: 0 },
          { text: 'Needing to support his mum', group: 1 },
          { text: 'An impressive title', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each value to a past choice.',
        pairs: [
          ['Learning from better people', 'Chose Njangi Pay over Kmer'],
          ['Building things people rely on', 'The njangi tracker'],
          ['Title ranked last', 'Turned down the Yaoundé offer'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Is it bad that "impressive title" is on my list at all?',
        options: [
          { text: 'Yes, delete it and pretend.', why: 'Honesty helps.' },
          { text: 'Make it number one.', why: 'Rank it where it really is.' },
          { text: 'No: admitting it, and ranking it low, helps me notice when it tempts me.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the dishonest ranking.',
        lines: ['1. Building things people rely on.', '1. Money doesn\'t matter to me at all. (he needs to support his mum)', '4. Staying near family.'],
        bug: 1,
        explanation: 'Money matters to him. "Enough" is honest; "not at all" isn\'t.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s values in his order.',
        lines: ['Building things people rely on', 'Learning from better people', 'Enough money', 'Staying near family', 'An impressive title'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What does his top value match?',
        options: [
          { text: 'His energy audit: users, support, deciding what to build' },
          { text: 'Nothing', why: 'It matches the audit.' },
          { text: 'His salary', why: 'It matches his energy audit.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Values point to a [[1]]. Constraints [[2]] it.',
        blanks: [['direction'], ['narrow']],
        distractors: ['title', 'widen', 'hide'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Where does Clinton want to stay? (one word)',
        answers: ['cameroon'],
        placeholder: 'A country',
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest or performed?',
        groups: ['Honest', 'Performed'],
        items: [
          { text: 'Enough money matters', group: 0 },
          { text: 'I only care about changing the world', group: 1 },
          { text: 'A title tempts me a bit', group: 0 },
          { text: 'Nothing matters but passion', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write your top five work values, honestly ranked. Which one surprised you?',
    starters: ['1.', 'The surprise:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Rank five work values honestly. Next to each, write one past choice it explains.',
  },
  notes: 'Values clarification is a standard career-planning exercise.',
};

export default lesson;
