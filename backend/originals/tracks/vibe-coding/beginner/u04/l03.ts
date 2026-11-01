import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 3. Myth or Fact: git in plain words. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Git in plain words',
  summary: 'Ruth says one word over breakfast: "git". Hazel thinks it\'s an insult. It\'s the tool almost every developer uses to save versions of their work. Myth or fact?',
  minutes: 11,
  outcomes: [
    'Explain git, a commit and a repository in plain words',
    'Know that git works with any AI tool',
    'Install git and check it\'s there',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Git is a tool that saves versions of your project, so you can go back to any of them.', isFact: true, explain: 'Like "save as" with a timeline: every version you save is kept, with a note on what changed.' },
        { text: 'Git and GitHub are the same thing.', isFact: false, explain: 'Git runs on your computer and saves versions. GitHub is a website that keeps a copy of them online. Lesson 8.' },
        { text: 'A "commit" is one saved version, with a short message saying what changed.', isFact: true, explain: '"Add pledge thermometer" is a commit message. You make commits on purpose, when something works.' },
        { text: 'Git saves automatically every few seconds.', isFact: false, explain: 'Git only saves when you commit. That\'s a feature: you choose the good moments.' },
        { text: 'Claude Code can run git commands for you, and you approve them like any command.', isFact: true, explain: '"Commit this with a clear message" works. You still need to know what git is doing, which is this chapter.' },
        { text: 'Git only works with Claude Code.', isFact: false, explain: 'Git is older than every AI tool. It works with all of them, and with no AI at all.' },
      ],
    },
    {
      kind: 'steps',
      title: 'Is git installed?',
      steps: [
        { title: 'Check', body: 'In your terminal, type this. A version number means yes.', code: 'git --version', language: 'bash' },
        { title: 'Mac: not installed?', body: 'Running git --version usually offers to install Apple\'s developer tools. Say yes.' },
        { title: 'Windows: not installed?', body: 'Download "Git for Windows" from git-scm.com (the official site) and install with the default options. Claude Code works better on Windows with it too.' },
        { title: 'Tell git who you are (once)', body: 'Your name and email go on every commit.', code: 'git config --global user.name "Hazel Broussard"\ngit config --global user.email "hazel@example.com"', language: 'bash' },
      ],
    },
  ],
  apply: {
    scenario: 'Breakfast with Ruth: what is git?',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each word to its plain meaning.',
        pairs: [
          ['Git', 'Saves versions of your project'],
          ['Commit', 'One saved version with a message'],
          ['Repository', 'A project folder git is tracking'],
          ['GitHub', 'A website that stores a copy online'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'When does git save a version?',
        options: [
          { text: 'Every few seconds', why: 'Only when you commit.' },
          { text: 'When you make a commit' },
          { text: 'When you close the laptop', why: 'Closing does nothing in git.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Type the command that checks git is installed.',
        answers: ['git --version', 'git -v'],
        placeholder: 'git ...',
      },
      {
        kind: 'sortGroups',
        prompt: 'Git, or GitHub?',
        groups: ['Git', 'GitHub'],
        items: [
          { text: 'Runs on your computer', group: 0 },
          { text: 'A website', group: 1 },
          { text: 'Makes commits', group: 0 },
          { text: 'Keeps a copy safe if your laptop dies', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'hazel',
        message: 'If Claude Code can run git for me, why learn it at all?',
        prompt: 'Tey\'s answer?',
        options: [
          { text: 'You don\'t need to.', why: 'You approve every git command, so you need to know what it does.' },
          { text: 'Because you approve every command it runs. You can\'t approve "git reset --hard" safely if you don\'t know it throws away work.' },
          { text: 'Because git is fun.', why: 'True for some. The real reason is safety.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Tell git who you are.',
        template: 'git [[1]] --global user.name "Hazel Broussard"',
        blanks: [['config']],
        distractors: ['commit', 'save'],
        language: 'bash',
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Benny\'s git notes is wrong?',
        lines: [
          'Git saves versions when you commit.',
          'Each commit has a message.',
          'GitHub and git are the same thing.',
          'Git works with any AI tool.',
        ],
        bug: 2,
        fix: 'Git is the tool; GitHub is a website that stores copies.',
        explanation: 'Mixing them up is the most common beginner confusion.',
      },
      {
        kind: 'mcq',
        prompt: 'Where should Hazel download Git for Windows from?',
        options: [
          { text: 'git-scm.com, the official site' },
          { text: 'A pop-up ad saying "Free Git Download"', why: 'Only install from official sources.' },
          { text: 'A file Benny emailed her', why: 'Get it from the official site.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a good commit message for the thermometer.',
        tiles: ['Add', 'pledge thermometer', 'with tests'],
        distractors: ['stuff', 'asdf'],
      },
      {
        kind: 'mcq',
        prompt: 'Review: rewind restored the thermometer. Why set up git anyway?',
        options: [
          { text: 'Rewind is enough', why: 'Rewind misses command changes and lives only in the tool.' },
          { text: 'Git is required by law', why: 'It\'s about safety, not law.' },
          { text: 'Git saves versions you choose, catches every kind of change, and can be copied off the laptop' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'If you had "commits" for your life this week, what would the last three messages say?',
    starters: ['1.', '2.', '3.'],
  },
  deepen: {
    title: 'On your computer: install git',
    summary: 'Run git --version. If it\'s missing, install it (Mac: accept the developer tools; Windows: Git for Windows from git-scm.com). Then run the two git config lines with your name and email.',
  },
  notes: 'git-scm.com is the official Git site. Mac: `git --version` prompts to install Xcode Command Line Tools if git is absent. Claude Code docs recommend Git for Windows on native Windows (October 2026). hazel@example.com uses the reserved example domain.',
};

export default lesson;
