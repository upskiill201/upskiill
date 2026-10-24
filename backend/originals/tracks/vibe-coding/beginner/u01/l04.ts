import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4. Walkthrough: installing Claude Code. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Install it',
  summary: 'Sunday night. Hazel pastes one line into PowerShell and gets a red error: "irm is not recognized". Ten minutes later it\'s installed. Here\'s exactly how, and what that error meant.',
  minutes: 12,
  outcomes: [
    'Install Claude Code on Mac, Linux or Windows',
    'Check it installed with claude --version',
    'Fix the most common install mistake',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Installing Claude Code',
      steps: [
        { title: '1. Open your terminal', body: 'Mac or Linux: Terminal. Windows: PowerShell (not "Command Prompt"). On Windows, the line should start with PS.' },
        { title: '2a. Mac or Linux: paste this line', body: 'It downloads Anthropic\'s official installer and runs it. Press Enter.', code: 'curl -fsSL https://claude.ai/install.sh | bash', language: 'bash' },
        { title: '2b. Windows (PowerShell): paste this line instead', body: 'Same installer, the Windows version. Press Enter.', code: 'irm https://claude.ai/install.ps1 | iex', language: 'bash' },
        { title: '3. Close the terminal and open a new one', body: 'A new window picks up the newly installed command.' },
        { title: '4. Check it worked', body: 'This prints a version number. Any number means it\'s installed.', code: 'claude --version', language: 'bash' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: '"irm is not recognized" means you\'re in Command Prompt, not PowerShell. Open PowerShell and paste again. Only ever paste install lines from the official docs at code.claude.com.',
    },
    {
      kind: 'check',
      question: 'Hazel is on Windows. Which window should she paste the install line into?',
      options: ['Command Prompt', 'PowerShell', 'Her web browser'],
      answer: 1,
      explanation: 'The Windows line (irm ... | iex) is a PowerShell command.',
    },
  ],
  apply: {
    scenario: 'Sunday night install.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put Hazel\'s install steps in order.',
        lines: [
          'Open PowerShell',
          'Paste the install line from the official docs',
          'Close it and open a new PowerShell window',
          'Type claude --version',
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which line installs Claude Code on a Mac?',
        options: [
          { text: 'irm https://claude.ai/install.ps1 | iex', why: 'That\'s the Windows PowerShell line.' },
          { text: 'install claude please', why: 'Not a real command.' },
          { text: 'curl -fsSL https://claude.ai/install.sh | bash' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Hazel\'s terminal. Which line shows the problem?',
        lines: [
          'C:\\Users\\Hazel> irm https://claude.ai/install.ps1 | iex',
          '\'irm\' is not recognized as an internal or external command',
          'C:\\Users\\Hazel>',
        ],
        bug: 1,
        fix: 'She\'s in Command Prompt. Open PowerShell (the prompt starts with PS) and paste again.',
        explanation: 'irm is a PowerShell command, so Command Prompt doesn\'t know it.',
        language: 'bash',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Type the command that checks Claude Code is installed.',
        answers: ['claude --version', 'claude -v'],
        placeholder: 'claude ...',
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'I found a faster install line on a random forum. Paste that one?',
        prompt: 'Hazel\'s best reply?',
        options: [
          { text: 'No. Install lines run programs on my computer, so I only use the ones from the official docs.' },
          { text: 'Sure, faster is better.', why: 'An install line runs whatever it downloads. Only trust the official source.' },
          { text: 'Only if it has lots of likes.', why: 'Likes don\'t make a download safe.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the Mac line to what it does.',
        pairs: [
          ['curl ...', 'Downloads the installer'],
          ['https://claude.ai/install.sh', 'The official installer\'s address'],
          ['| bash', 'Runs what was downloaded'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'After installing, Hazel types claude --version in the same window and gets "command not found". What should she try first?',
        options: [
          { text: 'Reinstall Windows', why: 'Much too far.' },
          { text: 'Close the terminal, open a new one, and try again' },
          { text: 'Buy a new laptop', why: 'Nothing\'s wrong with the laptop.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the check.',
        template: '[[1]] --[[2]]',
        blanks: [['claude'], ['version']],
        distractors: ['install', 'help'],
        language: 'bash',
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe install habit, or risky?',
        groups: ['Safe', 'Risky'],
        items: [
          { text: 'Copying the line from code.claude.com', group: 0 },
          { text: 'Pasting a line from a stranger\'s comment', group: 1 },
          { text: 'Checking with claude --version afterwards', group: 0 },
          { text: 'Downloading "Claude Code Pro Free.exe" from a random site', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'hazel',
        message: 'It printed 2.something. Does that mean it worked?',
        prompt: 'Tey\'s answer?',
        options: [
          { text: 'No, it needs to say 100.', why: 'Any version number means it\'s installed.' },
          { text: 'Only if the screen turns green.', why: 'There\'s no colour test.' },
          { text: 'Yes: any version number means Claude Code is installed. Next: a folder for your project.' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'When something technical goes wrong (like a red error), what do you usually do? What will you try first now?',
    starters: ['Usually I...', 'Now I\'ll first...'],
  },
  deepen: {
    title: 'On your computer: install it',
    summary: 'Follow the steps above with the line for your computer, from code.claude.com. Then run claude --version. Stuck? Copy the exact error message: you\'ll learn to use it in Chapter 6.',
  },
  notes: 'Install commands from code.claude.com/docs (quickstart and setup), checked October 2026: Mac/Linux/WSL `curl -fsSL https://claude.ai/install.sh | bash`; Windows PowerShell `irm https://claude.ai/install.ps1 | iex`; CMD has its own line; "irm is not recognized" means CMD. Verify with `claude --version`. Native installs auto-update. Git for Windows is recommended (optional) on Windows; we install git in Chapter 4.',
};

export default lesson;
