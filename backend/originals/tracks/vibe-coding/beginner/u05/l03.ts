import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 3. Chat with Tey: choosing the stack, with the AI. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Choosing the stack',
  summary: 'Hazel asks the AI which tools to build with. It suggests seven, including two she can\'t pronounce. Tey\'s rule for beginners: the fewest moving parts that do the job. Here\'s the band\'s stack, and why.',
  minutes: 12,
  outcomes: [
    'Explain what a "stack" is',
    'Ask the AI for options and pick the simplest',
    'Install Node.js, the one new tool you need',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'A "stack" is the set of tools an app is built with. Ask an AI "what stack should I use?" and you\'ll get a confident list. It can\'t know what you can maintain.', replies: ['So how do I choose?'] },
        { tey: 'Give it your situation and one rule: "I\'m a beginner, one person, small app. Suggest the simplest stack with the fewest moving parts, and say why." Then you decide.', replies: ['What did Hazel pick?'] },
        { tey: 'Four pieces. Plain HTML, CSS and JavaScript for the pages (she knows them now). Vite, a small tool that runs the app on her laptop while she builds. Supabase for the database and logins. Vercel to put it live, in Chapter 8.', replies: ['Why not something fancier?'] },
        { tey: 'Every extra tool is one more thing that can break, and one more thing to understand when it does. Fancy can come later. Notice the stack is also very common, so the AI writes it well and help is easy to find.', replies: ['What do I install?'] },
        { tey: 'One new thing: Node.js, from nodejs.org (pick the LTS version). Vite runs on it. Check with node --version. Then let Claude Code set up the project, and read each command.', replies: ['Okay.'] },
      ],
    },
    {
      kind: 'code',
      language: 'plaintext',
      code: 'Set up a new Vite project in this folder with plain JavaScript (no framework).\nInstall the Supabase JavaScript library.\nExplain each command before you run it.',
      caption: 'Hazel\'s setup request. She reads each command before approving.',
    },
  ],
  apply: {
    scenario: 'Picking the band\'s stack.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a "stack"?',
        options: [
          { text: 'A pile of laptops', why: 'It\'s the set of tools.' },
          { text: 'The set of tools an app is built with' },
          { text: 'A kind of database', why: 'A database is one part of a stack.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each piece of the band\'s stack to its job.',
        pairs: [
          ['HTML, CSS, JavaScript', 'The pages'],
          ['Vite', 'Runs the app on the laptop while building'],
          ['Supabase', 'Database and logins'],
          ['Vercel', 'Puts it live on the internet'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Best way to ask the AI about a stack?',
        options: [
          { text: 'What\'s the best stack?', why: '"Best" for whom? It will list the fashionable ones.' },
          { text: 'Use the newest tools', why: 'Newest isn\'t simplest.' },
          { text: 'I\'m a beginner, one person, small app with sign-ups and logins. Suggest the simplest stack with the fewest moving parts, and say why.' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'My cousin says real devs use eight frameworks. Shouldn\'t we?',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'Every extra tool is something else to break and understand. We use the fewest that do the job.' },
          { text: 'Yes, let\'s use eight.', why: 'More tools, more ways to break.' },
          { text: 'Frameworks are banned.', why: 'Not banned. Just not needed yet.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which command checks Node.js is installed?',
        answers: ['node --version', 'node -v'],
        placeholder: 'node ...',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good reason to choose a tool, or bad?',
        groups: ['Good reason', 'Bad reason'],
        items: [
          { text: 'It\'s simple and does the job', group: 0 },
          { text: 'It\'s trending this week', group: 1 },
          { text: 'It\'s very common, so help is easy to find', group: 0 },
          { text: 'It has a cool logo', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The AI\'s setup commands. Which one should Hazel ask about before approving?',
        lines: [
          'npm create vite@latest band-app',
          'npm install @supabase/supabase-js',
          'npm install supabase-helper-pro-free',
        ],
        bug: 2,
        fix: 'Ask what it is and why it\'s needed. She asked only for Vite and Supabase.',
        explanation: 'An unknown package nobody asked for is a warning sign. Chapter 7 shows why.',
        language: 'bash',
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s stack rule.',
        template: 'The [[1]] moving parts that do the [[2]].',
        blanks: [['fewest'], ['job']],
        distractors: ['most', 'trend'],
      },
      {
        kind: 'mcq',
        prompt: 'Where should Hazel download Node.js from?',
        options: [
          { text: 'nodejs.org, the LTS version' },
          { text: 'A random download site', why: 'Only official sources.' },
          { text: 'The AI can email it', why: 'Download it from the official site.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 4: right after setup works, what should Hazel do?',
        options: [
          { text: 'Start building everything', why: 'Save the working setup first.' },
          { text: 'git init, commit "Set up Vite and Supabase", and push to a new private repo' },
          { text: 'Nothing', why: 'A working setup is a great commit.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s your app, in one line? Ask yourself: what\'s the fewest tools that could do it?',
  },
  deepen: {
    title: 'On your computer: set up the stack',
    summary: 'Install Node.js LTS from nodejs.org and check node --version. Make a new folder for your real app, start claude in it, and paste the setup request above. Read every command. Then run npm run dev and open the address it prints.',
  },
  notes: 'Stack: Vite (vite.dev; `npm create vite@latest`, vanilla template), @supabase/supabase-js, Vercel (Chapter 8). Node.js LTS from nodejs.org. "supabase-helper-pro-free" is a deliberately made-up package name. Vite dev server prints a localhost address (commonly port 5173).',
};

export default lesson;
