import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 5 · Lesson 8 — learning a new topic fast. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Learning a new topic fast',
  summary: 'Ada knows design, not payments regulation. In one evening she needs to understand it well enough to ask the right questions. AI is a great tutor, if you use it like one.',
  minutes: 12,
  outcomes: [
    'Use AI as a tutor to learn a new topic',
    'Test your understanding instead of just reading',
    'Know when to switch to official sources',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Learn a topic in one evening',
      steps: [
        { title: '1. Get the map', body: '"I\'m new to payments regulation. Give me the 6 key ideas I need, in plain words, in the order to learn them."' },
        { title: '2. One idea at a time', body: '"Explain idea 1 with a simple example from small shops in Accra." Short answers you can actually take in.' },
        { title: '3. Explain it back', body: 'Write two sentences in your own words and ask: "Is my explanation right? What did I miss?"' },
        { title: '4. Let it quiz you', body: '"Ask me three questions about this, one at a time, and tell me if I\'m right." Recall makes it stick far better than re-reading.' },
        { title: '5. Check the facts that matter', body: 'Understanding comes from the tutor. Rules, numbers and dates come from official sources.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Map, one idea at a time, explain it back, get quizzed, then check key facts in official sources.',
    },
  ],
  apply: {
    scenario: 'Ada is learning payments regulation in one evening.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five steps.',
        lines: ['Get the map', 'One idea at a time', 'Explain it back', 'Let it quiz you', 'Check the facts that matter'],
      },
      {
        kind: 'mcq',
        prompt: 'Why ask the AI to quiz you?',
        options: [
          { text: 'To test the AI', why: 'It tests you.' },
          { text: 'Recalling answers makes learning stick better than re-reading' },
          { text: 'It\'s faster than reading', why: 'It\'s about memory, not speed.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which first request is best?',
        options: [
          { text: 'Explain payments regulation.', why: 'Too big; you\'ll get a wall of text.' },
          { text: 'I\'m new to payments regulation. Give me the 6 key ideas I need, in plain words, in the order to learn them.' },
          { text: 'Write me an essay on finance law.', why: 'Too broad, too long.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Learn from the AI tutor, or check in an official source?',
        groups: ['Tutor is fine', 'Official source'],
        items: [
          { text: 'What "e-money" means in general', group: 0 },
          { text: 'The exact licence categories in Ghana', group: 1 },
          { text: 'Why regulators care about customer funds', group: 0 },
          { text: 'The current capital requirement', group: 1 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s explain-it-back request.',
        tiles: ['Is', 'my', 'explanation', 'right?', 'What', 'did', 'I', 'miss?'],
        distractors: ['perfect'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'You learned all this last night? How do you know it\'s right?',
        prompt: 'Best reply?',
        options: [
          { text: 'The AI told me, so it\'s right.', why: 'Understanding yes; rules need checking.' },
          { text: 'I don\'t, really.', why: 'She checked the key facts.' },
          { text: 'The AI helped me understand the ideas. The specific rules and numbers I checked on the regulator\'s site.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: '[[1]] comes from the tutor. Rules and numbers come from [[2]] sources.',
        blanks: [['Understanding'], ['official']],
        distractors: ['Gossip', 'random'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step in Ada\'s evening plan won\'t help her learn?',
        lines: [
          'Ask for the 6 key ideas',
          'Read one idea at a time with an example',
          'Copy-paste all the answers into a doc and never read them again',
          'Let the AI quiz me',
        ],
        bug: 2,
        fix: 'Explain each idea back in my own words.',
        explanation: 'Saving text isn\'t learning. Explaining back is.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to its purpose.',
        pairs: [
          ['Get the map', 'See the whole topic first'],
          ['Explain it back', 'Find gaps in understanding'],
          ['Quiz', 'Make it stick'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many key ideas does Ada ask for?',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Active learning or passive?',
        groups: ['Active', 'Passive'],
        items: [
          { text: 'Explaining it in your own words', group: 0 },
          { text: 'Re-reading the same answer', group: 1 },
          { text: 'Answering quiz questions', group: 0 },
          { text: 'Highlighting a long reply', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why ask for examples from small shops in Accra?',
        options: [
          { text: 'Examples close to your work make ideas easier to understand and remember' },
          { text: 'The AI only knows Accra', why: 'It\'s about relevance to Ada.' },
          { text: 'No reason', why: 'Relevant examples help.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What topic do you need to learn fast for work? Write the first request you\'d give your AI tutor.',
    starters: ['The topic:', 'My first request:'],
  },
  deepen: { title: 'Try it today', summary: 'Pick a topic, ask AI for its 5 key ideas, and let it quiz you on the first one.' },
  notes: 'The testing effect (retrieval practice improves retention) is well established, e.g. Roediger & Karpicke (2006), Psychological Science.',
};

export default lesson;
