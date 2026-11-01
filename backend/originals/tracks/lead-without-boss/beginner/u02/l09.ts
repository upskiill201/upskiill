import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9. Tap to explore: Remi's pilot proposal to Wanjiku, marked up. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Line check: the pilot proposal',
  summary: 'Friday evening, Week 2. Remi sends Wanjiku a one-paragraph proposal. She forwards it to her boss, the Finance Director, with "I think we should try this." Tap through to see every Chapter 2 tool in one paragraph.',
  minutes: 11,
  outcomes: [
    'See every Chapter 2 tool in one short proposal',
    'Write a proposal that\'s easy for a cautious person to say yes to',
    'Give someone the words to sell it upwards',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Remi to Wanjiku, Week 2, Friday',
      text: 'Wanjiku, here\'s your idea, written up. For two weeks, we sample-check one in five refunds under KSh 5,000, and you keep hand-checking everything bigger or flagged. Zanele will track every result, so audit sees more evidence than today, not less. Your team gets about three hours a week back. If any sampled refund is wrong, we stop and go back to full checks. Could you share this with your Director? I\'m happy to join if it helps.',
      hotspots: [
        { phrase: 'here\'s your idea, written up', note: 'It IS her idea, from Chapter 2 lesson 1. Credit makes it hers to defend.' },
        { phrase: 'For two weeks', note: 'A small test, not forever. Easier for a careful person to say yes to.' },
        { phrase: 'you keep hand-checking everything bigger or flagged', note: 'Her interest (a clean audit) protected, in writing.' },
        { phrase: 'audit sees more evidence than today, not less', note: 'Turns her biggest fear into a benefit.' },
        { phrase: 'Your team gets about three hours a week back.', note: 'Her currency: time back for the big checks.' },
        { phrase: 'If any sampled refund is wrong, we stop', note: 'A clear safety exit. It lowers the risk of saying yes.' },
        { phrase: 'Could you share this with your Director?', note: 'One specific ask. And she now has the words to sell it upwards.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A proposal a cautious person can say yes to: their idea, a small test, their interest protected, their currency, a safety exit, one ask.',
    },
  ],
  apply: {
    scenario: 'Line check, the proposal.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Wanjiku forward it to her Director?',
        options: [
          { text: 'Remi asked Brian to tell her to', why: 'No sponsor needed.' },
          { text: 'It was long and detailed', why: 'It\'s one paragraph.' },
          { text: 'It was her idea, it protected her audit, and it had a safety exit' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 2 tool is it?',
        groups: ['Interests', 'Currencies', 'Small test'],
        items: [
          { text: 'Keep hand-checking big refunds', group: 0 },
          { text: 'Three hours a week back', group: 1 },
          { text: 'For two weeks', group: 2 },
          { text: 'More evidence for audit', group: 0 },
          { text: '"Your idea, written up"', group: 1 },
          { text: '"If any is wrong, we stop"', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'wanjiku',
        message: 'The Director will ask: why should Finance take any risk for this?',
        prompt: 'Remi\'s best reply?',
        options: [
          { text: 'Because Finance gets more evidence for audit, three hours back, and a stop rule. And Mama Mboga is our biggest customer.' },
          { text: 'Because Kamau wants it.', why: 'Borrowed authority, again.' },
          { text: 'There\'s no risk at all.', why: 'Not true, and the Director knows it.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A clear way out if things go wrong is a safety ___. (one word)',
        answers: ['exit', 'Exit', 'net', 'valve'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why call it "your idea"?',
        options: [
          { text: 'To blame her if it fails', why: 'Credit, not blame.' },
          { text: 'It was, and people defend ideas they own' },
          { text: 'Politeness only', why: 'It also gives her ownership.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Draft 1. Which line would scare a cautious Director?',
        lines: [
          'For two weeks, sample-check refunds under KSh 5,000.',
          'If it works, we\'ll roll it out to all refunds, any size, next month.',
          'If any sampled refund is wrong, we stop.',
        ],
        bug: 1,
        fix: 'After two weeks, we review the results together.',
        explanation: 'Jumping to "all refunds, any size" turns a small test into a big risk.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the proposal in order.',
        lines: ['Credit their idea', 'Describe the small test', 'Protect their interest', 'Add a safety exit', 'Make one ask'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to the research.',
        pairs: [
          ['"Your idea"', 'Ownership'],
          ['"Keep hand-checking the big ones"', 'Interests, not positions'],
          ['"Three hours back"', 'Currencies'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Small [[1]]. Their interest [[2]]. A safety [[3]].',
        blanks: [['test'], ['protected'], ['exit']],
        distractors: ['promise', 'ignored'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Wanjiku\'s forward.',
        tiles: ['I', 'think', 'we', 'should', 'try', 'this.'],
        distractors: ['never'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of something you want a cautious person to agree to. How could you make it a small test with a safety exit?',
    starters: ['I want them to agree to...', 'As a small test: ...'],
  },
  deepen: {
    title: 'Add a stop rule',
    summary: 'Next time you propose a change, add one line: "If X happens, we stop." Watch how much easier the yes becomes.',
  },
  notes: 'Synthesis of Chapter 2 tools: interests (Fisher & Ury), currencies (Cohen & Bradford), small tests with clear exit criteria, credit and ownership. Fictional figures.',
};

export default lesson;
