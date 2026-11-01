import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 8. Tap to explore: GitHub, the backup off your laptop. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'GitHub: a copy nobody can rain on',
  summary: 'Ruth\'s question still bothers Hazel: "What if your laptop gets stolen?" Git lives on the laptop. GitHub keeps a copy online. One setup, then one command after each commit.',
  minutes: 12,
  outcomes: [
    'Explain what GitHub adds to git',
    'Put a project on GitHub as a private repository',
    'Push your commits up after you make them',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Putting the band\'s site on GitHub',
      text:
        '1. Make a free account at github.com.\n2. Install GitHub\'s command-line tool, gh, from cli.github.com. Then log in:\n   gh auth login\n3. In your project folder, create a private copy and send your commits:\n   gh repo create esplanade-site --private --source=. --push\n4. After each new commit:\n   git push',
      hotspots: [
        { phrase: 'github.com', note: 'GitHub is a website that stores git repositories. A free account is enough for this course.' },
        { phrase: 'gh auth login', note: 'Logs the gh tool into your GitHub account, through your browser. Once per computer.' },
        { phrase: '--private', note: 'Only you (and people you invite) can see it. Start private. Public means anyone on the internet can read your code.' },
        { phrase: '--source=.', note: 'The dot means "this folder": the project you\'re in.' },
        { phrase: '--push', note: 'Sends all your existing commits up straight away.' },
        { phrase: 'git push', note: 'Sends new commits to GitHub. Commit, then push. If your laptop dies, the copy is there.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'You can ask Claude Code: "Put this project on GitHub as a private repository using gh." It will show you each command to approve. You do the browser login yourself.',
    },
  ],
  apply: {
    scenario: 'The backup off the laptop.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does GitHub add that git alone doesn\'t?',
        options: [
          { text: 'A copy of your commits off your laptop, online' },
          { text: 'It makes the AI smarter', why: 'It stores code; it doesn\'t change the AI.' },
          { text: 'It replaces commits', why: 'It stores your commits.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Private or public repository?',
        groups: ['Private', 'Fine to be public'],
        items: [
          { text: 'The band\'s app, while it\'s being built', group: 0 },
          { text: 'A practice project you want to show employers', group: 1 },
          { text: 'Anything that might contain a mistake with a password', group: 0 },
          { text: 'A tutorial you wrote for others', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'First time on GitHub, in order.',
        lines: [
          'Make a GitHub account',
          'Install gh and run gh auth login',
          'gh repo create esplanade-site --private --source=. --push',
          'Check the repository page on github.com',
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'After each commit.',
        template: 'git commit -m "Add deposit rule"\ngit [[1]]',
        blanks: [['push']],
        distractors: ['pull', 'init'],
        language: 'bash',
      },
      {
        kind: 'chatReply',
        from: 'ruth',
        message: 'So if the laptop is stolen tonight?',
        prompt: 'Hazel\'s answer?',
        options: [
          { text: 'I lose everything.', why: 'Not any more: the commits are on GitHub.' },
          { text: 'I get a new laptop, log in to GitHub, and download the latest pushed version.' },
          { text: 'The thief gets GitHub too.', why: 'Not without her password.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which flag keeps a new repository visible only to you?',
        answers: ['--private', 'private'],
        placeholder: '--...',
      },
      {
        kind: 'findBug',
        prompt: 'Which step would expose the band\'s project to everyone?',
        lines: [
          'gh auth login',
          'gh repo create esplanade-site --public --source=. --push',
          'git push',
        ],
        bug: 1,
        fix: 'Use --private.',
        explanation: 'Public repositories can be read by anyone. Start private.',
        language: 'bash',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the command to its job.',
        pairs: [
          ['git commit', 'Save a version on your laptop'],
          ['git push', 'Send saved versions to GitHub'],
          ['gh auth login', 'Log in to GitHub, once'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Hazel committed three times today but never pushed. What\'s on GitHub?',
        options: [
          { text: 'All three commits', why: 'Commits stay on the laptop until you push.' },
          { text: 'Only what she pushed before today' },
          { text: 'Nothing ever', why: 'Her earlier pushes are there.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Review: why add the GitHub login yourself, not through the AI?',
        options: [
          { text: 'The AI can\'t type', why: 'It\'s about who handles your password.' },
          { text: 'It\'s slower', why: 'It\'s about safety.' },
          { text: 'Passwords and logins are yours: never give them to the AI or paste them in a chat' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'What else in your life exists in only one place (photos, notes, documents)? Where could its "GitHub" be?',
  },
  deepen: {
    title: 'On your computer: push to GitHub',
    summary: 'Make a free GitHub account. Install gh from cli.github.com and run gh auth login. In your project: gh repo create my-site --private --source=. --push. Open the repository on github.com and find your commit messages.',
  },
  notes: 'GitHub CLI (cli.github.com): `gh auth login`; `gh repo create <name> --private --source=. --push` creates a repo from the current directory, adds the remote and pushes. Free GitHub accounts include unlimited private repositories (GitHub plans, 2026).',
};

export default lesson;
