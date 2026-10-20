import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: from idea to guesses',
  summary: 'Excitement isn\'t evidence, "no market need" sinks most startups, problems come before solutions, and every idea is a list of guesses. Quick check before Clinton learns to tell kindness from commitment.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Spot excitement posing as evidence', 'Turn an idea into testable assumptions'],
  learn: [
    {
      kind: 'story',
      title: 'Eleven question marks',
      beats: [
        { speaker: 'narrator', text: 'Clinton pins his eleven assumptions above his desk, each with a question mark.' },
        { speaker: 'david', text: 'At least now you know what you don\'t know.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: from idea to guesses.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Excitement or evidence?',
        groups: ['Excitement', 'Evidence'],
        items: [
          { text: '"This is genius!"', group: 0 },
          { text: 'Three students paid in advance', group: 1 },
          { text: 'Forty likes', group: 0 },
          { text: 'A student asks to be the first customer and pays a deposit', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the most common reason failed startups give?',
        options: [
          { text: 'No market need' },
          { text: 'Bad office space', why: 'Not near the top.' },
          { text: 'Too many customers', why: 'The opposite problem.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its lesson.',
        pairs: [
          ['Forty fire emojis', 'Excitement, not evidence'],
          ['No market need', 'The top failure reason'],
          ['Problem first', 'Then the solution'],
          ['Eleven guesses', 'Assumptions to test'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A problem statement.',
        template: '[[1]] struggles with [[2]], and today they...',
        blanks: [['Who'], ['what']],
        distractors: ['Why', 'when'],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Can I just skip the assumptions and start building?',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'You can, but then you\'re betting your savings on eleven unchecked guesses. Test the riskiest one first; it might take a day.' },
          { text: 'Sure, assumptions are boring.', why: 'They\'re what decides whether the business works.' },
          { text: 'Never build anything.', why: 'Build once the key guesses are checked.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which assumption is written so it can\'t be tested?',
        lines: [
          'Students will pay 500 FCFA for delivery.',
          'Students like nice things.',
          'I can deliver in under 30 minutes.',
        ],
        bug: 1,
        fix: 'Students will pay for delivery instead of walking to the gate.',
        explanation: 'An assumption should be able to turn out wrong.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Problem or solution?',
        groups: ['Problem', 'Solution'],
        items: [
          { text: 'Kitchens close at 8 p.m.', group: 0 },
          { text: 'A delivery app', group: 1 },
          { text: 'Students skip dinner during exams', group: 0 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the start of validation.',
        lines: ['Write the idea', 'Find the problem underneath', 'List the assumptions', 'Pick the riskiest to test first'],
      },
      {
        kind: 'mcq',
        prompt: 'Which group is specific enough to go and talk to?',
        options: [
          { text: 'First-year students in the hostels near campus' },
          { text: 'Young Africans', why: 'Far too broad to find and test.' },
          { text: 'Hungry people', why: 'Everyone, so no one in particular.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What word means "something that must be true for the idea to work, not yet checked"?',
        answers: ['assumption', 'an assumption', 'hypothesis'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Look at your five assumptions from lesson 4. Which one, if wrong, would kill your idea?',
    starters: ['The one that would kill it is...', 'Because...'],
  },
  notes: 'Checkpoint for Chapter 1 lessons 1-4.',
};

export default lesson;
