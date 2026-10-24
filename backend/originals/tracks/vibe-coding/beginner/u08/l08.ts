import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 8 · Lesson 8. Tap to explore: same skills, any tool. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Same skills, any tool',
  summary: 'Principal Dupree loves the app. "Next year the district is buying a different AI tool for every school. Will you have to start again?" Hazel looks at her brief card. No.',
  minutes: 12,
  outcomes: [
    'Map each skill from this course to other AI coding tools',
    'Move a project\'s house rules to another tool',
    'Know what changes and what doesn\'t',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Hazel\'s brief card, v8',
      text:
        'Goal, context, limits, done when\nPlan first, one step at a time\nRead the diff, run the tests yourself\nCommit little, push, branch for experiments\nEvidence before fixes\nNo secrets in code, chats or GitHub\nDatabase rules on every table\nCLAUDE.md for house rules',
      hotspots: [
        { phrase: 'Goal, context, limits, done when', note: 'Works in every AI tool: Codex, Cursor, Copilot, Gemini CLI, website builders. A brief is a brief.' },
        { phrase: 'Plan first, one step at a time', note: 'Other tools have their own plan modes or "ask" modes. If not, say "Plan first, don\'t write code yet."' },
        { phrase: 'Read the diff, run the tests yourself', note: 'Every tool can be confidently wrong. Checking is yours, whichever tool you use.' },
        { phrase: 'Commit little, push, branch for experiments', note: 'Git doesn\'t care which AI wrote the code. Your safety net comes with you.' },
        { phrase: 'Evidence before fixes', note: 'Fix loops happen in every tool. The exact error and a recipe work everywhere.' },
        { phrase: 'No secrets in code, chats or GitHub', note: 'Universal. So are database rules, safe text, and checking packages.' },
        { phrase: 'CLAUDE.md for house rules', note: 'The one name that changes. Many tools read AGENTS.md (OpenAI Codex and others); some have their own rules files. Same idea: copy your rules across and rename the file.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'What changes between tools: buttons, shortcuts, command names, file names, prices. What doesn\'t: everything on the card. That\'s why this course spent most of its time on the card.',
    },
  ],
  apply: {
    scenario: 'The district\'s new tool.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Changes with the tool, or stays the same?',
        groups: ['Changes', 'Stays the same'],
        items: [
          { text: 'The shortcut for plan mode', group: 0 },
          { text: 'Writing a brief with a done-when', group: 1 },
          { text: 'The name of the house-rules file', group: 0 },
          { text: 'Committing after each working step', group: 1 },
          { text: 'Keeping secrets out of chats', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The new tool reads AGENTS.md, not CLAUDE.md. What does Hazel do?',
        options: [
          { text: 'Copy her house rules into AGENTS.md' },
          { text: 'Write new rules from scratch', why: 'Same rules, new file name.' },
          { text: 'Skip house rules', why: 'Every tool benefits from them.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the Claude Code feature to the habit it stands for.',
        pairs: [
          ['Plan mode', 'Plan first'],
          ['Permission questions', 'Read before approving'],
          ['/rewind', 'A quick undo (git is the real one)'],
          ['CLAUDE.md', 'House rules every session'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'My cousin uses a website builder for everything. Did we waste our time?',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'Yes, we should switch.', why: 'The skills work there too, and we own our files.' },
          { text: 'No. Everything on the card works there too. And we understand and own every file of our app.' },
          { text: 'Website builders are illegal.', why: 'They\'re fine. Different trade-offs.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Many other tools read this file instead of CLAUDE.md.',
        template: '[[1]].md',
        blanks: [['AGENTS']],
        distractors: ['SECRETS', 'README2'],
      },
      {
        kind: 'mcq',
        prompt: 'Which skill from this course would you need LEAST in a different tool?',
        options: [
          { text: 'Reading diffs', why: 'Every tool can be wrong.' },
          { text: 'Writing briefs', why: 'Every tool needs a good brief.' },
          { text: 'Remembering Claude Code\'s exact keyboard shortcuts' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which tool saves your versions, whichever AI wrote the code?',
        answers: ['git'],
        placeholder: 'Three letters',
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Hazel\'s note to the principal is wrong?',
        lines: [
          'Briefs, plans and tests work in any AI tool.',
          'Git and GitHub stay the same.',
          'A new tool means the old app has to be rebuilt.',
          'Only the rules file name and shortcuts change.',
        ],
        bug: 2,
        fix: 'The app is ordinary files: any tool can work on it.',
        explanation: 'That\'s the advantage of owning real files, the reason this course picked a tool that works on your own computer.',
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 1: why did this course choose one tool at all?',
        options: [
          { text: 'To learn real, specific steps on your own machine, while the habits transfer to any tool' },
          { text: 'Because the others are bad', why: 'They\'re not. One was chosen to be concrete.' },
          { text: 'Because it\'s free', why: 'It needs a paid plan.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'ruth',
        message: 'So what would you tell next year\'s band director, who\'s never coded?',
        prompt: 'Hazel\'s answer?',
        options: [
          { text: 'Get the most expensive tool.', why: 'The tool matters less than the card.' },
          { text: 'Don\'t bother, it\'s too hard.', why: 'Hazel did it in eight weeks.' },
          { text: 'Pick a tool, then learn the card: brief, plan, check, test, commit, fix with evidence, keep it safe.' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Write your own brief card, v8, in your words. Which line do you need to practise most?',
  },
  deepen: {
    title: 'Try another tool (optional)',
    summary: 'If you want, try a second AI coding tool on a copy of your project (many have free tiers). Copy CLAUDE.md to the file that tool reads (often AGENTS.md). Give it one brief from your card. Notice what\'s different, and what isn\'t.',
  },
  notes: 'AGENTS.md is an open instruction-file convention read by OpenAI Codex and several other agents (checked October 2026); Cursor and Copilot also support project rules/instruction files. Tool names given as examples only, not rankings.',
};

export default lesson;
