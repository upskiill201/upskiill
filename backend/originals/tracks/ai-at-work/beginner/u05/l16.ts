import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 5 · Lesson 16 — when AI can't know the answer. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'When AI can\'t know the answer',
  summary: 'Some questions no AI can answer: what your customers will do, private data, tomorrow\'s news. Spot them early, and find the people or tests that can.',
  minutes: 12,
  outcomes: [
    'Recognise questions AI can\'t answer',
    'Know who or what can answer them instead',
    'Ask AI to help you design the test, not guess the result',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Ada asked the AI: "Will shop owners in Makola market use our app?" It answered confidently. Should she trust that?', replies: ['Probably not?'] },
        { tey: 'Right. It has never met those shop owners. It can only guess from general patterns. Same for anything private, local, or in the future.', replies: ['So who can answer it?'] },
        { tey: 'The shop owners. Ten short conversations at the market will tell her more than any AI. Or a small pilot.', replies: ['Can AI help with that?'] },
        { tey: 'Yes: "Help me write 6 interview questions for shop owners that don\'t lead them to the answer I want." It designs the test; people give the answer.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'AI can\'t know your customers, your private data or the future. Ask it to help design the conversation or test, then ask real people.',
    },
  ],
  apply: {
    scenario: 'Ada needs to know if shop owners will switch apps.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Can AI know this?',
        groups: ['AI can help explain', 'AI can\'t know'],
        items: [
          { text: 'What mobile money is', group: 0 },
          { text: 'What Makola market shop owners think of our app', group: 1 },
          { text: 'Common reasons people switch apps', group: 0 },
          { text: 'Next month\'s exchange rate', group: 1 },
          { text: 'What\'s in our private sales database', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why can\'t the AI know what Makola shop owners will do?',
        options: [
          { text: 'It has never met them; it can only guess from general patterns' },
          { text: 'It\'s banned from talking about markets', why: 'It just has no data on them.' },
          { text: 'It can, if you ask nicely', why: 'Politeness doesn\'t add data.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request uses AI well here?',
        options: [
          { text: 'Will Makola shop owners use our app?', why: 'It can only guess.' },
          { text: 'Help me write 6 interview questions for Makola shop owners about how they take payments, without leading them toward our app.' },
          { text: 'Pretend to be 10 shop owners and answer for them.', why: 'Invented answers aren\'t research.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to who can really answer it.',
        pairs: [
          ['What shop owners want', 'Shop owners, in interviews'],
          ['What our users did last month', 'Our own data'],
          ['Whether a pilot will work', 'Running the pilot'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'The AI says 80% of shop owners will love our app. Great, right?',
        prompt: 'Best reply?',
        options: [
          { text: 'That\'s a guess; it\'s never met them. Let\'s talk to ten shop owners this week instead.' },
          { text: 'Amazing, let\'s put it in the brief.', why: 'Invented number.' },
          { text: 'Ask the AI again to be sure.', why: 'It still can\'t know.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'AI helps [[1]] the test. [[2]] people give the answer.',
        blanks: [['design'], ['Real']],
        distractors: ['skip', 'Imaginary'],
      },
      {
        kind: 'findBug',
        prompt: 'Which interview question leads the shop owner?',
        lines: [
          'How do customers usually pay you?',
          'What do you find hardest about your current payment app?',
          'Wouldn\'t you love a cheaper, better app like ours?',
          'What would make you try something new?',
        ],
        bug: 2,
        fix: 'What, if anything, would make you change how you take payments?',
        explanation: 'It tells them the answer you want.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s plan.',
        tiles: ['Ask', 'ten', 'shop', 'owners', 'this', 'week'],
        distractors: ['AI'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many shop owners does Tey suggest talking to?',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Real evidence about our customers, or a guess?',
        groups: ['Real evidence', 'A guess'],
        items: [
          { text: 'Notes from ten interviews', group: 0 },
          { text: 'AI "pretending to be" customers', group: 1 },
          { text: 'Pilot usage data', group: 0 },
          { text: 'An AI prediction of satisfaction', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s approach to an unknowable question.',
        lines: ['Notice the AI can\'t know', 'Decide who can', 'Use AI to design questions', 'Ask the real people'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s wrong with asking AI to "pretend to be 10 shop owners"?',
        options: [
          { text: 'The answers are invented, not real research' },
          { text: 'It takes too long', why: 'The problem is the answers are made up.' },
          { text: 'Nothing; it\'s the same as interviews', why: 'Real people can surprise you; simulations can\'t.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What question about your customers or colleagues have you been asking AI that only they can answer?',
    starters: ['The question:', 'Who can really answer it:'],
  },
  deepen: { title: 'Try it today', summary: 'Ask AI to help write five neutral interview questions for a real customer or colleague. Then ask them.' },
  notes: 'Makola is a real market in Accra; the interviews and figures are fictional.',
};

export default lesson;
