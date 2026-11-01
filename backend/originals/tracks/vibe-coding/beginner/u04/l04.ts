import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 4. Walkthrough: your first commit. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Your first commit',
  summary: '1 a.m., thermometer restored. Before she sleeps, Hazel makes her first commit, with Ruth on speakerphone. Four commands. After this, midnight can\'t hurt her.',
  minutes: 12,
  outcomes: [
    'Turn a folder into a git repository',
    'Check what changed with git status',
    'Save a version with git add and git commit',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Four commands, once',
      steps: [
        { title: '1. Start tracking the folder', body: 'Inside your project folder. This makes it a repository. Run it once per project.', code: 'git init -b main', language: 'bash' },
        { title: '2. See what git sees', body: 'Lists files that are new or changed since the last commit. You\'ll use this all the time.', code: 'git status', language: 'bash' },
        { title: '3. Choose what goes in the save', body: 'The dot means "everything in this folder". Always run git status first so you know what "everything" is.', code: 'git add .', language: 'bash' },
        { title: '4. Save it, with a message', body: 'The message says what this version is. Short, clear, past or present tense.', code: 'git commit -m "Thermometer with tests, working"', language: 'bash' },
        { title: 'Or ask Claude Code', body: '"Set up git in this folder and commit everything with a clear message." Read and approve each command it shows. Same four steps.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'git log --oneline shows your saved versions, newest first. One line each: an id, then your message.',
    },
  ],
  apply: {
    scenario: '1 a.m., Ruth on speakerphone.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Hazel\'s first commit, in order.',
        lines: ['git init -b main', 'git status', 'git add .', 'git commit -m "Thermometer with tests, working"'],
        language: 'bash',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the command to what it does.',
        pairs: [
          ['git init', 'Start tracking this folder'],
          ['git status', 'Show what\'s new or changed'],
          ['git add .', 'Choose everything for the save'],
          ['git commit -m', 'Save a version with a message'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why run git status before git add . ?',
        options: [
          { text: 'It\'s required, or git add breaks', why: 'git add works without it. Status is for you.' },
          { text: 'To speed up the computer', why: 'It shows information; it doesn\'t speed anything up.' },
          { text: 'To see exactly which files "everything" will include' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the save.',
        template: 'git [[1]] -m "Add gig-fee calculator"',
        blanks: [['commit']],
        distractors: ['save', 'push'],
        language: 'bash',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good commit message, or bad?',
        groups: ['Good', 'Bad'],
        items: [
          { text: 'Add gig-fee calculator', group: 0 },
          { text: 'stuff', group: 1 },
          { text: 'Fix: amounts typed as text now add up', group: 0 },
          { text: 'asdfgh', group: 1 },
          { text: 'changes', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ruth',
        message: 'What will your message say for tonight\'s commit?',
        prompt: 'Hazel\'s best answer?',
        options: [
          { text: '"Midnight disaster lol"', why: 'Future Hazel needs to know what\'s in it.' },
          { text: '"Thermometer with tests, working": so I know this is the good version.' },
          { text: '"Update"', why: 'Every commit is an update. Say which.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which command shows your saved versions, one per line?',
        answers: ['git log --oneline', 'git log'],
        placeholder: 'git log ...',
      },
      {
        kind: 'findBug',
        prompt: 'Which command is in the wrong place?',
        lines: ['git init -b main', 'git commit -m "First version"', 'git add .'],
        bug: 1,
        fix: 'git add . comes before git commit.',
        explanation: 'Commit saves what you\'ve added. Add first, then commit.',
        language: 'bash',
      },
      {
        kind: 'mcq',
        prompt: 'Claude Code offers to run git add . and git commit for her. What should she do?',
        options: [
          { text: 'Read each command, check the message makes sense, then approve' },
          { text: 'Refuse: only humans may commit', why: 'It\'s fine to let it run them, if you read them.' },
          { text: 'Approve without reading', why: 'Read every command, always.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Review: how often should Hazel run git init in one project?',
        options: [
          { text: 'Before every commit', why: 'Once is enough.' },
          { text: 'Every morning', why: 'Once per project.' },
          { text: 'Once, at the start' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'What version of your project would you most hate to lose right now? Write the commit message you\'ll give it.',
  },
  deepen: {
    title: 'On your computer: first commit',
    summary: 'In your project folder: git init -b main, git status, git add ., git commit -m "First working version". Then git log --oneline. (Or ask Claude Code to do it, and read every command before approving.)',
  },
  notes: '`git init -b main` sets the first branch name to main (Git 2.28+). Standard git workflow.',
};

export default lesson;
