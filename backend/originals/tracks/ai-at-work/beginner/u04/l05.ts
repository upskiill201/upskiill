import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 4 · Lesson 5 — Checkpoint 1. Confidence, made-up sources, numbers, showing working. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: sure-sounding isn\'t true',
  summary: 'Confident tone, fake sources, slippery numbers and hidden assumptions. Show you can catch them.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can spot an unsupported claim', 'Show you can check numbers and assumptions'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Unit 4, first Checkpoint. Four lessons on not being fooled by a confident machine.', replies: ['Ready'] },
        { tey: 'Warm-up: the AI gives you a precise number with a report name. What do you do before using it?', replies: ['Open the report', 'Find the number in it'] },
        { tey: 'Both, in that order. Lead, then proof. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: Ada\'s launch deck, before noon.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why can an AI sound certain and be wrong?',
        options: [
          { text: 'It predicts likely text; its tone doesn\'t change with accuracy' },
          { text: 'It only sounds certain when it\'s right', why: 'Same tone either way.' },
          { text: 'It is being dishonest', why: 'No intent; just prediction.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Proof, or not yet?',
        groups: ['Proof', 'Not yet'],
        items: [
          { text: 'You opened the report and found the figure', group: 0 },
          { text: 'The AI gave a report name', group: 1 },
          { text: 'A link that works but you haven\'t read', group: 1 },
          { text: 'Your own sales data', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line doesn\'t add up?',
        lines: ['Users: 2,000', 'Paid: 500 (25%)', 'Free: 1,700 (75%)', 'Total: 2,000'],
        bug: 2,
        fix: 'Free: 1,500 (75%)',
        explanation: '500 + 1,700 is 2,200. 75% of 2,000 is 1,500.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is 75% of 2,000?',
        answers: ['1500', '1,500'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the problem to the fix.',
        pairs: [
          ['Fake report', 'Search the exact title'],
          ['Wrong total', 'Recalculate in a spreadsheet'],
          ['Hidden guess', 'Ask for assumptions'],
          ['Wrong weekday', 'Check a calendar'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Can you add a big number about Ghana\'s fintech market to slide 2? Any number.',
        prompt: 'Best reply?',
        options: [
          { text: 'Yes, from a source I can open and cite on the slide. If I can\'t find one by noon, I\'ll leave it out.' },
          { text: 'Sure, I\'ll ask the AI for one.', why: 'Without a source, that risks another invented figure.' },
          { text: 'Numbers aren\'t allowed on slides.', why: 'They are; they just need sources.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the two-minute source check.',
        lines: ['Search the exact title', 'Check it exists', 'Check who published it', 'Find the claim inside'],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the request.',
        template: 'Show your [[1]], list your [[2]], and tell me the weakest [[3]].',
        blanks: [['steps'], ['assumptions'], ['point']],
        distractors: ['mood', 'joke'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request is the most honest way to get a statistic?',
        options: [
          { text: 'Give me a statistic about mobile money in Ghana.', why: 'Invites an invented figure.' },
          { text: 'Find statistics about mobile money in Ghana with sources I can open. Say "unsure" if you can\'t name a real source.' },
          { text: 'Give me the most impressive number you can.', why: 'Rewards invention.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Recalculate, or fine as is?',
        groups: ['Recalculate', 'Fine'],
        items: [
          { text: 'A growth percentage the AI worked out', group: 0 },
          { text: 'A total the AI added up', group: 0 },
          { text: 'A figure you copied from your own report', group: 1 },
          { text: 'A synonym list', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Sign-ups went from 400 to 500. The AI says "125% growth". What\'s right?',
        options: [
          { text: '25% growth' },
          { text: '125% growth', why: '500 is 125% of 400; growth is 25%.' },
          { text: '100% growth', why: 'That would be 800.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the question that catches most made-up facts.',
        tiles: ['Where', 'exactly', 'does', 'this', 'come', 'from?'],
        distractors: ['Really?'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step in the AI\'s working is a guess?',
        lines: ['You told me: launch in Accra', 'I assumed: 3,000 users', 'Then: 3,000 x 10% = 300 tickets', 'So: 3 agents'],
        bug: 1,
        fix: 'Replace it with Lucía\'s forecast.',
        explanation: 'The AI says "I assumed". Check that first.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'A citation from AI is a ..., not proof (one word)',
        answers: ['lead', 'clue', 'starting point'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What does a missing number cost compared to a false one?',
        options: [
          { text: 'Far less; a false one can cost trust' },
          { text: 'More; decks need numbers', why: 'A gap is safer than a falsehood.' },
          { text: 'Nothing either way', why: 'False claims get repeated.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which of these four skills do you need most at work right now?',
    starters: ['The one I need most is...', 'Because...'],
  },
  notes: 'Checkpoint for Unit 4 lessons 1-4. All figures fictional.',
};

export default lesson;
