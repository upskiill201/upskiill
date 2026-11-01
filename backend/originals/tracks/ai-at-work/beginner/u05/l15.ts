import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 5 · Lesson 15 — Checkpoint 3. Claims, decisions, briefs, citations. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: from research to a brief',
  summary: 'Trace a claim, know when to stop, write the one-page brief and cite it properly.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can check a claim at its source', 'Show you can turn research into a cited brief'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Checkpoint 3. Thursday night: the brief is due.', replies: ['Let\'s do it'] },
        { tey: 'Warm-up: a blog says "most traders refuse cash". First move?', replies: ['Find the original survey'] },
        { tey: 'Upstream, always. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: Thursday night.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the claim check.',
        lines: ['Find where the blog got it', 'Open the original', 'Compare the wording', 'Write it as the source says'],
      },
      {
        kind: 'findBug',
        prompt: 'Which version overstates the survey?',
        lines: [
          '54% of 300 traders in two markets prefer mobile money for big payments.',
          'A majority of traders surveyed preferred mobile money for larger payments.',
          'Cash is dead in Ghana.',
          'In two Accra markets, mobile money was preferred for payments over 100 cedis.',
        ],
        bug: 2,
        fix: 'Use an accurate version with its limits.',
        explanation: 'Not in the source at all.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Known, findable or unknowable for now?',
        groups: ['Known', 'Findable', 'Unknowable'],
        items: [
          { text: 'Partner bank in Accra (site)', group: 0 },
          { text: 'Licence timeline', group: 1 },
          { text: 'Will shops switch?', group: 2 },
          { text: 'Competitor reaction next year', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'When is research enough?',
        options: [
          { text: 'When you\'ve read everything', why: 'Never happens.' },
          { text: 'When more of it wouldn\'t change the decision' },
          { text: 'When you\'re tired', why: 'Decision-based, not energy-based.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the one-page brief.',
        lines: ['Question', 'Answer', 'Why', 'Biggest risk', 'Unknowns', 'Sources'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which drafting request is best?',
        options: [
          { text: 'Write a brief about Ghana.', why: 'Fills gaps from memory.' },
          { text: 'Using only my checked notes, draft a six-part brief with source numbers next to facts. Add nothing new.' },
          { text: 'Make it persuasive.', why: 'Honesty before persuasion.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which citation is not a source?',
        lines: ['Bank of Ghana report, p.41', 'Partner bank site, accessed 14 May', 'Chat with AI, 13 May', 'Trader survey, Table 2'],
        bug: 2,
        fix: 'Cite the document the AI pointed to, once opened.',
        explanation: 'Cite what you opened.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the citation part to its use.',
        pairs: [
          ['Publisher', 'Judge trust'],
          ['Page', 'Find it fast'],
          ['Date checked', 'Know when it was true'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Can we drop the "What we don\'t know" part? Carmen likes confident briefs.',
        prompt: 'Best reply?',
        options: [
          { text: 'Sure, I\'ll delete it.', why: 'Hiding unknowns isn\'t confidence.' },
          { text: 'Let\'s make the unknowns sound certain.', why: 'That\'s misleading.' },
          { text: 'It is confident: it shows what\'s solid and exactly what the pilot will answer. Hiding gaps would be riskier.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rules.',
        template: 'Follow claims [[1]]. Stop when more research wouldn\'t [[2]] the decision.',
        blanks: [['upstream'], ['change']],
        distractors: ['sideways', 'decorate'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the recommendation for an unknowable question.',
        tiles: ['Run', 'a', 'small', 'pilot', 'to', 'find', 'out'],
        distractors: ['huge'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep on the page or cut?',
        groups: ['Keep', 'Cut'],
        items: [
          { text: 'Biggest risk', group: 0 },
          { text: 'Every article read', group: 1 },
          { text: 'Sources', group: 0 },
          { text: 'History of payments since 2007', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Following a claim back to its first source is going ... (one word)',
        answers: ['upstream'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What usually happens to a claim as people repeat it?',
        options: [
          { text: 'It loses its limits and gets stronger' },
          { text: 'It gets more accurate', why: 'Usually the opposite.' },
          { text: 'Nothing', why: 'It drifts.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Where does the 54% come from? Carmen\'s asking right now.',
        prompt: 'Best reply?',
        options: [
          { text: 'Somewhere online.', why: 'The citation answers it.' },
          { text: 'The AI.', why: 'Cite the survey.' },
          { text: 'Source [3]: the 2024 trader survey, Table 2. 300 traders in two Accra markets. Link\'s in the brief.' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which of these four skills will make your next report more trustworthy?',
    starters: ['The skill:', 'Because...'],
  },
  notes: 'Checkpoint for Unit 5 lessons 11-14.',
};

export default lesson;
