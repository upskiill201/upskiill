import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 7 · Lesson 9. Chat with Tey: what the AI may run without asking. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'What it may do without asking',
  summary: 'Ruth reads Hazel\'s Claude Code history and counts: 212 "Allow?" questions this month, 211 yeses. "Then the questions aren\'t protecting you." Tey helps Hazel write permission rules instead.',
  minutes: 12,
  outcomes: [
    'Use /permissions to set allow, ask and deny rules',
    'Decide which commands always need you',
    'Block the AI from reading secret files',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: '211 yeses out of 212 means you\'re not reading anymore. So let\'s make the questions rarer and more important.', replies: ['How?'] },
        { tey: 'Type /permissions. You can write rules: allow (never ask), ask (always ask), deny (never allowed). Safe, boring things go in allow: running your tests, git status.', replies: ['What goes in ask?'] },
        { tey: 'Anything that changes the outside world or is hard to undo: git push, installing packages, deleting files, commands that touch Supabase. Those questions you\'ll actually read, because there are few of them.', replies: ['And deny?'] },
        { tey: 'Things it should never do. Reading .env files, so secrets never end up in the chat. Commands like git push --force or anything that downloads and runs a script from the internet.', replies: ['Is that bulletproof?'] },
        { tey: 'No single thing is. Rules, reading the important questions, git, database rules: layers. Ruth would call it defence in depth. One layer fails, the next catches it.', replies: ['Layers again.'] },
      ],
    },
    {
      kind: 'code',
      language: 'plaintext',
      code: 'Allow: run tests, git status, git diff, git log\nAsk:   git push, npm install, deleting files, anything touching Supabase\nDeny:  reading .env files, git push --force, git reset --hard',
      caption: 'Hazel\'s permission plan, in plain words, before she adds the rules.',
    },
  ],
  apply: {
    scenario: '211 yeses.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why are 211 yeses out of 212 a problem?',
        options: [
          { text: 'It means Hazel has stopped reading, so the questions protect nothing' },
          { text: 'It uses up her plan', why: 'The risk is not reading.' },
          { text: 'It isn\'t, yes is good', why: 'Yes without reading is no check at all.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Allow, or always ask?',
        groups: ['Allow', 'Always ask'],
        items: [
          { text: 'git status', group: 0 },
          { text: 'git push', group: 1 },
          { text: 'Running the tests', group: 0 },
          { text: 'npm install a new package', group: 1 },
          { text: 'Deleting files', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which command opens the permission rules?',
        answers: ['/permissions', 'permissions'],
        placeholder: '/...',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the rule type to what it means.',
        pairs: [
          ['Allow', 'Runs without asking'],
          ['Ask', 'Always asks you first'],
          ['Deny', 'Never allowed'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'Why deny reading .env? It\'s our own file.',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'So secrets never end up in the chat, where they could be logged or copied.' },
          { text: 'Because .env is broken.', why: 'It\'s about keeping secrets out of the conversation.' },
          { text: 'No reason.', why: 'There\'s a good one.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which rule in Benny\'s permission plan is dangerous?',
        lines: [
          'Allow: run tests',
          'Allow: git status',
          'Allow: anything with "curl" in it',
          'Ask: git push',
        ],
        bug: 2,
        fix: 'Ask (or deny) for curl: it downloads from the internet.',
        explanation: 'curl can download and run things from anywhere. Never on autopilot.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s idea.',
        template: 'Fewer questions, more [[1]] ones. And [[2]] of protection, not one.',
        blanks: [['important'], ['layers']],
        distractors: ['random', 'one wall'],
      },
      {
        kind: 'mcq',
        prompt: 'Which of these belongs in deny?',
        options: [
          { text: 'git log', why: 'Harmless: allow it.' },
          { text: 'Running the tests', why: 'Harmless: allow it.' },
          { text: 'git push --force' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Setting up permissions, in order.',
        lines: [
          'Write the plan in plain words: allow, ask, deny',
          'Type /permissions',
          'Add the rules',
          'Test: ask it to read .env and check it\'s refused',
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 1: which mode skips every question, and where is it meant for?',
        options: [
          { text: 'Ask mode, for laptops', why: 'Ask mode asks.' },
          { text: 'The bypass setting, only for throwaway sandboxes, never your own laptop' },
          { text: 'Plan mode, for everywhere', why: 'Plan mode changes nothing.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Which three commands would you never want an AI to run on your computer without asking you?',
    starters: ['1.', '2.', '3.'],
  },
  deepen: {
    title: 'On your computer: your rules',
    summary: 'Write your allow / ask / deny plan in plain words. In Claude Code, type /permissions and add them. Test one: ask it to read your .env file, and check it\'s refused.',
  },
  notes: 'Claude Code permissions (code.claude.com, October 2026): /permissions manages allow, ask and deny rules (stored in settings files); deny rules always apply. Example rule types (e.g. denying Read on .env files, asking for Bash git push) follow the docs\' rule syntax; exact syntax is not shown to learners because it may change.',
};

export default lesson;
