import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 4 · Lesson 16 — career-planning myths. Myth or Fact. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Career plan myths',
  summary: '"You must find your one true passion first." "Plans are pointless; life is random." "If you change direction, you wasted your time." Clinton\'s friends disagree loudly. Myth or fact?',
  minutes: 11,
  outcomes: ['Spot career-planning myths', 'See plans as flexible tools', 'Value skills that carry across directions'],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'You must find your one true passion before you can plan.', isFact: false, explain: 'Interest often grows from doing and getting good at things. An energy audit and small experiments work better than waiting for a passion to appear.' },
        { text: 'Plans are pointless because life is unpredictable.', isFact: false, explain: 'Plans guide choices now, and you update them. Unpredictability is a reason to review often, not to have no plan.' },
        { text: 'Skills from one direction often carry into another.', isFact: true, explain: 'Clinton\'s engineering skills make him a stronger product person: he understands what\'s possible.' },
        { text: 'Changing direction means your earlier work was wasted.', isFact: false, explain: 'Earlier experience usually becomes an advantage. Most careers have turns.' },
        { text: 'Simple if-then plans can help you follow through.', isFact: true, explain: 'Research on implementation intentions suggests "If X, then I\'ll Y" helps people act on goals.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Interest grows from doing. Plans are updatable. Skills carry over. Turns aren\'t waste.',
    },
  ],
  apply: {
    scenario: 'Clinton\'s friends argue about plans.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Fact', 'Myth'],
        items: [
          { text: 'Skills carry across directions', group: 0 },
          { text: 'Find your one passion first', group: 1 },
          { text: 'If-then plans can help', group: 0 },
          { text: 'Changing direction wastes past work', group: 1 },
          { text: 'Plans are pointless', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'I don\'t know my passion. Maybe I picked the wrong career.',
        options: [
          { text: 'Yes, quit.', why: 'Explore within it first.' },
          { text: 'Interest often grows from doing. Try an energy audit and a few experiments in medicine first.' },
          { text: 'Passion is everything; wait for it.', why: 'It often grows from doing.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Why does unpredictability not make plans pointless?',
        options: [
          { text: 'Because life is predictable', why: 'It isn\'t; that\'s why you update.' },
          { text: 'It does make them pointless', why: 'Update them instead.' },
          { text: 'Plans guide choices now, and you update them often' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the myth.',
        lines: ['Engineering makes me a better product person.', 'If I switch, my engineering year was wasted.', 'I\'ll review my plan each quarter.'],
        bug: 1,
        explanation: 'Earlier experience usually becomes an advantage.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['Find your passion first', 'Interest grows from doing'],
          ['Plans are pointless', 'Update them often'],
          ['Turns are waste', 'Skills carry over'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'How do Clinton\'s engineering skills help in product?',
        options: [
          { text: 'He understands what\'s possible to build' },
          { text: 'They don\'t', why: 'They help a lot.' },
          { text: 'He can skip user research', why: 'He still needs it.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Interest grows from [[1]]. Skills [[2]] over.',
        blanks: [['doing'], ['carry']],
        distractors: ['waiting', 'fall', 'wear'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Do most careers have turns? (yes or no)',
        answers: ['yes'],
        placeholder: 'Yes or no',
      },
      {
        kind: 'sortGroups',
        prompt: 'Helpful belief, or harmful?',
        groups: ['Helpful', 'Harmful'],
        items: [
          { text: 'I can test a direction safely', group: 0 },
          { text: 'One wrong turn ruins everything', group: 1 },
          { text: 'My skills travel with me', group: 0 },
          { text: 'It\'s too late to change', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'A friend says plans are for boring people. What do you say?',
        options: [
          { text: 'True, I\'ll stop planning.', why: 'Plans guide choices.' },
          { text: 'Plans must be rigid.', why: 'They should be updatable.' },
          { text: 'A good plan is just a few choices I update. It actually gives me more freedom.' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which career myth has held you back? What will you try instead?',
    starters: ['I believed...', 'Instead I\'ll...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask someone ten years into their career how many turns it has taken. Notice how earlier work helped later.',
  },
  notes: 'The "interest grows from doing" idea aligns with research on developing interests (e.g., O\'Keefe, Dweck & Walton, 2018) and Newport (2012). Kept qualitative.',
};

export default lesson;
