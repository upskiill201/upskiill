import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 5 · Lesson 5 — Checkpoint 1. Search vs AI, questions, sources, comparison. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: research that holds up',
  summary: 'Search or AI, sharp questions, checkable sources and honest comparisons. Show you can set up research properly.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can plan research with AI', 'Show you can judge sources and build a fair comparison'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Unit 5, first Checkpoint. Day one of Ada\'s two-day research sprint.', replies: ['Ready'] },
        { tey: 'Warm-up: AI or search to find the current licence rules?', replies: ['Search, official site'] },
        { tey: 'Right. AI to plan, sources to verify. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: day one of the Ghana research.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Ask AI, or search?',
        groups: ['Ask AI', 'Search'],
        items: [
          { text: 'Explain how mobile money agents work', group: 0 },
          { text: 'Find the regulator\'s licence page', group: 1 },
          { text: 'Suggest research questions', group: 0 },
          { text: 'Find this month\'s fintech news', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps to good research questions.',
        lines: ['Write the decision', 'List what would change it', 'Make specific questions', 'Add how you\'d know', 'Ask AI what\'s missing'],
      },
      {
        kind: 'findBug',
        prompt: 'Which research question is too vague?',
        lines: ['What licence would we need?', 'How long does it take?', 'Is the market nice?', 'Who are the top three competitors?'],
        bug: 2,
        fix: 'How many small businesses already accept mobile payments?',
        explanation: '"Nice" has no answer or source.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order from strongest to weakest source.',
        lines: ['Regulator data', 'University study', 'News article', 'Anonymous blog'],
      },
      {
        kind: 'mcq',
        prompt: 'What do professional fact-checkers do with an unfamiliar site?',
        options: [
          { text: 'Leave it and check what others say about who runs it' },
          { text: 'Read every page closely', why: 'They read laterally instead.' },
          { text: 'Trust it if it looks professional', why: 'Design isn\'t evidence.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which comparison request is best?',
        options: [
          { text: 'Which country should we pick?', why: 'Hands over the decision.' },
          { text: 'Compare these three countries on our five criteria, with a source or "unknown" in every cell. Don\'t recommend.' },
          { text: 'Compare everything about them.', why: 'No criteria.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the area to a specific question.',
        pairs: [
          ['Rules', 'What licence, and how long?'],
          ['Customers', 'How many small shops use mobile money?'],
          ['Competitors', 'Which apps lead, and why?'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'The table has three "unknown" cells. Can you just fill them in with the AI\'s guesses?',
        prompt: 'Best reply?',
        options: [
          { text: 'I\'d rather keep them honest. I\'ll try to find real figures today; anything still unknown, we\'ll flag in the brief.' },
          { text: 'Sure, guesses are fine.', why: 'They\'d look like facts.' },
          { text: 'Delete those rows.', why: 'They may matter.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rules.',
        template: 'AI to [[1]], search to [[2]]. The table informs; you [[3]].',
        blanks: [['plan'], ['verify'], ['decide']],
        distractors: ['guess', 'decorate', 'sleep'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good table cell or needs work?',
        groups: ['Good', 'Needs work'],
        items: [
          { text: '"Licence: 6-12 months (regulator)"', group: 0 },
          { text: '"Market: big"', group: 1 },
          { text: '"Partner banks: unknown"', group: 0 },
          { text: '"Customers love it"', group: 1 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the question for any new site.',
        tiles: ['Who', 'runs', 'this,', 'and', 'who', 'funds', 'it?'],
        distractors: ['likes'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Judging a site by checking what others say about it is called ... reading (one word)',
        answers: ['lateral'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why should research start from the decision?',
        options: [
          { text: 'It tells you which questions matter and when you\'re done' },
          { text: 'It makes the brief longer', why: 'It keeps it focused.' },
          { text: 'It doesn\'t matter', why: 'Without it, research never ends.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which source should be used for ideas only?',
        lines: ['Central bank report', 'Statistics office data', 'Sponsored "Top 10 apps" list', 'Competitor annual report'],
        bug: 2,
        fix: 'Use it for ideas; get figures from official sources.',
        explanation: 'Sponsored lists are marketing.',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'The AI said Kenya is "clearly best". Should we just go with that?',
        prompt: 'Best reply?',
        options: [
          { text: 'It didn\'t know our priorities. Let\'s agree what matters most to us, then look at the table together.' },
          { text: 'Yes, it\'s clearly best.', why: 'It decided without your criteria.' },
          { text: 'No, Kenya is bad.', why: 'The point is who decides and how.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which part of research setup do you usually skip: the decision, the questions, the sources or the criteria?',
    starters: ['I usually skip...', 'Next time...'],
  },
  notes: 'Checkpoint for Unit 5 lessons 1-4.',
};

export default lesson;
