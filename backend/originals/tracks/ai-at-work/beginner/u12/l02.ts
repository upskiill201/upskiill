import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 12 · Lesson 2 — AI built into the tools you use. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'AI built into the tools you use',
  summary: 'Before buying a new tool, check what you already have. AI now sits inside email, documents, spreadsheets and meeting apps. Tap Ada\'s list.',
  minutes: 12,
  outcomes: [
    'Spot AI features in tools you already use',
    'Know when built-in AI beats a separate tool',
    'Check built-in AI against company rules too',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'AI already in Ada\'s tools',
      text: 'Email: suggested replies and thread summaries. Documents: drafting and rewriting. Spreadsheets: formula help and charts. Meeting app: transcripts and action items. Phone: voice typing.',
      hotspots: [
        { phrase: 'thread summaries', note: 'Great for catching up. The AI already sees the emails, so you don\'t paste anything.' },
        { phrase: 'drafting and rewriting', note: 'Works right where you write, with your formatting.' },
        { phrase: 'formula help', note: 'Often knows the actual sheet, so its formulas fit your columns.' },
        { phrase: 'transcripts and action items', note: 'Useful, but check: everyone on the call should know it\'s recording.' },
        { phrase: 'voice typing', note: 'Faster than typing on a phone. Read it back before sending.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Check the AI in tools you already have first. It often knows your files, so you paste less. It still follows company rules.',
    },
  ],
  apply: {
    scenario: 'Ada checks her existing tools before buying anything.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the tool to its built-in AI feature.',
        pairs: [
          ['Email', 'Thread summaries'],
          ['Spreadsheet', 'Formula help'],
          ['Meeting app', 'Transcripts and actions'],
          ['Phone', 'Voice typing'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why can built-in AI be safer and faster?',
        options: [
          { text: 'It\'s always free', why: 'Not always.' },
          { text: 'It never makes mistakes', why: 'It can.' },
          { text: 'It already sees your files, so you copy and paste less' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Try built-in AI first, or a separate tool?',
        groups: ['Built-in first', 'Separate tool'],
        items: [
          { text: 'Summarise a long email thread', group: 0 },
          { text: 'Brainstorm a campaign name from scratch', group: 1 },
          { text: 'Write a formula for your sheet', group: 0 },
          { text: 'Generate a cover illustration', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Should we buy a separate meeting-notes AI?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Yes, more tools is better.', why: 'Check what you have.' },
          { text: 'Check your meeting app first: many now do transcripts and action items. If it\'s approved and good enough, no extra tool.' },
          { text: 'Meeting notes don\'t need AI.', why: 'It can help a lot.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Check the AI in tools you already [[1]]. It still follows company [[2]].',
        blanks: [['have'], ['rules']],
        distractors: ['hate', 'jokes'],
      },
      {
        kind: 'findBug',
        prompt: 'Which built-in AI use needs care?',
        lines: [
          'Email thread summary for Ada\'s inbox',
          'Formula help in her own sheet',
          'Recording a client call without telling the client',
          'Voice typing a note to herself',
        ],
        bug: 2,
        fix: 'Tell everyone the call is recorded, and follow the client\'s rules.',
        explanation: 'People should know they\'re being recorded.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which built-in email AI request is best?',
        options: [
          { text: 'Summarise.', why: 'No purpose.' },
          { text: 'Summarise this thread: decisions made, what\'s asked of me, and any deadlines.' },
          { text: 'Reply to everyone.', why: 'Too risky without reading.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s rule.',
        tiles: ['Check', 'what', 'you', 'have', 'first'],
        distractors: ['buy'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many of Ada\'s tools already have AI in the list?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good built-in habit, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Read voice typing back before sending', group: 0 },
          { text: 'Send suggested replies unread', group: 1 },
          { text: 'Check transcript action items', group: 0 },
          { text: 'Record calls secretly', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s approach to a new need.',
        lines: ['Name the task', 'Check existing tools\' AI', 'Test it on the task', 'Only then consider a new tool'],
      },
      {
        kind: 'mcq',
        prompt: 'Does built-in AI skip company rules?',
        options: [
          { text: 'No; the same data and safety rules apply' },
          { text: 'Yes, it\'s already approved for everything', why: 'Check what\'s allowed.' },
          { text: 'Rules don\'t apply to AI', why: 'They do.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What AI features are already in the tools you use every day? Which have you never tried?',
    starters: ['My tools have...', 'I\'ll try...'],
  },
  deepen: { title: 'Try it today', summary: 'Try one built-in AI feature you\'ve never used, like an email thread summary.' },
  notes: 'Many productivity suites now include AI features; availability depends on plan and admin settings.',
};

export default lesson;
