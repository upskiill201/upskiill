import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6. Tap to explore: a project folder and the first session. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'A folder and a first hello',
  summary: 'Hazel types claude in her home folder and it asks to read everything, including her tax returns. Ruth: "Give it a room, not the house." One folder per project, and your first session.',
  minutes: 11,
  outcomes: [
    'Make a folder for a project and move into it',
    'Start Claude Code inside that folder and log in',
    'Know how to stop it, get help and leave',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Hazel\'s first session',
      text:
        'cd Documents\nmkdir hazel-site\ncd hazel-site\nclaude\n\n> Do you trust the files in this folder?  Yes\n\n> hi! what can you do in this folder?\n\nThis folder is empty. I can create files here, like a web page, and run commands if you allow it.\n\n/help    Esc to stop    /exit to leave',
      hotspots: [
        { phrase: 'mkdir hazel-site', note: 'mkdir = "make directory". It makes a new, empty folder called hazel-site. One folder per project.' },
        { phrase: 'cd hazel-site', note: 'Move into the new folder. Claude Code works in whatever folder you start it in, so this matters.' },
        { phrase: 'claude', note: 'Starts Claude Code here. The first time, it opens your browser so you can log in with your Claude account.' },
        { phrase: 'Do you trust the files in this folder?', note: 'It asks before working in a new folder. Say yes only for your own project folders.' },
        { phrase: 'hi! what can you do in this folder?', note: 'You talk to it in plain words. No special syntax.' },
        { phrase: 'Esc to stop', note: 'Press Esc any time to stop what it\'s doing. You\'re always allowed to interrupt.' },
        { phrase: '/exit', note: 'Commands starting with / control the tool itself. /help lists them; /exit leaves.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Never start it in your home folder or Desktop. It can read the folder it starts in, so give it a project folder with only that project inside.',
    },
  ],
  apply: {
    scenario: 'Hazel\'s first session.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does mkdir hazel-site do?',
        options: [
          { text: 'Makes a new folder called hazel-site' },
          { text: 'Deletes a folder', why: 'mkdir makes; it never deletes.' },
          { text: 'Opens a website', why: 'It\'s about folders, not websites.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Start a new project, in order.',
        lines: ['cd Documents', 'mkdir band-app', 'cd band-app', 'claude'],
        language: 'bash',
      },
      {
        kind: 'chatReply',
        from: 'ruth',
        message: 'Why did you start it in your home folder? It could read your tax returns.',
        prompt: 'Hazel\'s fix?',
        options: [
          { text: 'It\'s fine, it\'s a robot.', why: 'It reads what\'s in the folder you start it in. Keep that small.' },
          { text: 'I\'ll delete my tax returns.', why: 'Keep the returns. Move the AI.' },
          { text: 'I\'ll make a project folder, move into it, and start it there.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the key or command to what it does.',
        pairs: [
          ['Esc', 'Stops what it\'s doing'],
          ['/help', 'Lists the commands'],
          ['/exit', 'Leaves Claude Code'],
          ['claude', 'Starts it in this folder'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The first time Hazel types claude, a browser window opens. Why?',
        options: [
          { text: 'It\'s an advert', why: 'It\'s the login.' },
          { text: 'To log in with her Claude account' },
          { text: 'Her laptop has a virus', why: 'Logging in through the browser is normal.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Hazel\'s rule.',
        template: 'One [[1]] per project. I start Claude Code [[2]] that folder, never in my home folder.',
        blanks: [['folder'], ['inside', 'in']],
        distractors: ['laptop', 'next to'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What do you type to leave Claude Code?',
        answers: ['/exit', 'exit'],
        placeholder: '/...',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good folder to start in, or bad?',
        groups: ['Good', 'Bad'],
        items: [
          { text: 'Documents/hazel-site', group: 0 },
          { text: 'Your whole home folder', group: 1 },
          { text: 'Documents/band-app', group: 0 },
          { text: 'Your Desktop with 300 files on it', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line makes this session start in the wrong place?',
        lines: ['cd Documents', 'mkdir band-app', 'claude'],
        bug: 2,
        fix: 'cd band-app first, then claude.',
        explanation: 'She made the folder but never moved into it, so Claude Code starts in Documents.',
        language: 'bash',
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'It\'s writing a huge answer and it\'s going the wrong way. Can I stop it?',
        prompt: 'Hazel\'s answer?',
        options: [
          { text: 'No, you have to wait.', why: 'You can always interrupt.' },
          { text: 'Close the laptop lid.', why: 'Works, but Esc is cleaner and keeps your session.' },
          { text: 'Press Esc. Then tell it what you actually want.' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'What will your first project folder be called? Pick a short name with no spaces, like my-site.',
    starters: ['My folder will be called...'],
  },
  deepen: {
    title: 'On your computer: first hello',
    summary: 'In your terminal: cd Documents, mkdir my-site, cd my-site, claude. Log in when the browser opens. Say yes to trusting the folder. Type: hi! what can you do in this folder? Then /exit.',
  },
  notes: 'From code.claude.com docs (October 2026): run `claude` in a project directory; first run prompts browser login; Esc interrupts; /help, /exit. The folder trust prompt appears for new folders (wording may vary by version, so the lesson paraphrases it). Claude Code reads files in its working directory.',
};

export default lesson;
