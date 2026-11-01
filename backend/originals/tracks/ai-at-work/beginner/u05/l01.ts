import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 5 · Lesson 1 — searching vs asking AI. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Searching vs asking AI',
  summary: 'Lucía asks: "Should we launch in Ghana next?" Ada has two days. First decision: when to search, and when to ask an AI.',
  minutes: 12,
  outcomes: [
    'Explain the difference between searching and asking AI',
    'Pick the right one for each research task',
    'Combine them: AI to plan, search to verify',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Same question, two tools',
      before: {
        label: 'Web search',
        text: 'Ada searches "mobile money regulation Ghana". She gets ten links: the central bank, news articles, a law firm\'s guide. She has to read and judge them, but she can see exactly where each fact comes from.',
      },
      after: {
        label: 'Asking an AI',
        text: 'Ada asks an AI assistant the same thing. She gets a clear, organised overview in seconds, with suggested questions. But some details may be out of date or invented, and she can\'t always see where they came from.',
      },
      notes: [
        'Search finds sources. AI explains, organises and suggests.',
        'Use AI to plan the research and understand the topic.',
        'Use search, and official sources, to verify every fact you\'ll rely on.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'AI to plan and understand, search to find and verify. Most good research uses both.',
    },
  ],
  apply: {
    scenario: 'Ada has two days to answer Lucía\'s big question.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is web search better at than an AI chat?',
        options: [
          { text: 'Writing a tidy summary', why: 'That\'s the AI\'s strength.' },
          { text: 'Showing exactly where information comes from' },
          { text: 'Never being wrong', why: 'Web pages can be wrong too.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Better with AI, or with search?',
        groups: ['Ask AI', 'Search'],
        items: [
          { text: 'Explain mobile money in simple terms', group: 0 },
          { text: 'Find the central bank\'s current licensing rules', group: 1 },
          { text: 'Suggest questions to research', group: 0 },
          { text: 'Find this week\'s news about fintech in Accra', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Can\'t you just ask the AI "Should we launch in Ghana?" and send me the answer?',
        prompt: 'Best reply?',
        options: [
          { text: 'Sure, give me five minutes.', why: 'A big decision needs checked facts.' },
          { text: 'AI can\'t help with research at all.', why: 'It helps a lot with planning and understanding.' },
          { text: 'I\'ll use it to plan the research and explain things fast, then check the key facts in real sources before I recommend anything.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'AI to plan and [[1]], search to find and [[2]].',
        blanks: [['understand'], ['verify']],
        distractors: ['guess', 'decorate'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the tool to its strength.',
        pairs: [
          ['AI chat', 'Explains and organises fast'],
          ['Web search', 'Shows the original sources'],
          ['Official sites', 'Current rules and figures'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s research approach.',
        lines: ['Ask AI to explain the topic', 'Ask AI what questions matter', 'Search for sources', 'Verify key facts'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step in Ada\'s plan is risky?',
        lines: [
          'Day 1: ask AI to explain the Ghana market',
          'Day 1: list the key questions',
          'Day 2: copy the AI\'s licensing answer into the recommendation',
          'Day 2: write the brief',
        ],
        bug: 2,
        fix: 'Day 2: check licensing rules on the regulator\'s site.',
        explanation: 'Licensing is high stakes; verify it in an official source.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which first AI request is best for Ada?',
        options: [
          { text: 'Should we launch in Ghana?', why: 'Asks the AI to decide with no context.' },
          { text: 'I\'m researching whether a payments app should launch in Ghana next. Explain the key things I need to find out, and which official sources usually have the answers.' },
          { text: 'Tell me everything about Ghana.', why: 'Too broad to be useful.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Is this a fact to verify, or understanding?',
        groups: ['Verify in a source', 'Understanding is enough'],
        items: [
          { text: 'The licence fee for a payments company', group: 0 },
          { text: 'What a "mobile money agent" is', group: 1 },
          { text: 'The number of mobile money accounts', group: 0 },
          { text: 'Why interoperability matters', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many days does Ada have for the research?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s research rule.',
        tiles: ['Plan', 'with', 'AI,', 'verify', 'with', 'sources'],
        distractors: ['guess'],
      },
      {
        kind: 'mcq',
        prompt: 'Some AI tools can search the web. Does Ada still need to verify?',
        options: [
          { text: 'Yes; she should open the sources it found and check the claims' },
          { text: 'No, it already searched', why: 'It can still misread or use old pages.' },
          { text: 'Only for numbers over 100', why: 'Verify anything important.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of your last research task. Which parts would you give to AI, and which to search?',
    starters: ['AI could...', 'Search for...'],
  },
  deepen: { title: 'Try it today', summary: 'For your next research question, ask AI "what do I need to find out?", then search for the top two answers yourself.' },
  notes: 'General guidance. The Ghana launch question is fictional.',
};

export default lesson;
