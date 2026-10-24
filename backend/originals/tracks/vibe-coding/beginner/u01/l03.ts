import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/**
 * Chapter 1 · Lesson 3. Card deck: what you need (computer, plan, terminal).
 * THE ONLY PLACE IN THE COURSE WITH PRICES. Update here when they change.
 */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'What you need',
  summary: 'Hazel opens her laptop, a five-year-old Windows machine with a sticker of a pelican on it. Is that enough? Here\'s the whole shopping list, honestly.',
  minutes: 11,
  outcomes: [
    'Check your computer is ready',
    'Know which plan you need, and what it costs',
    'Open a terminal and know the two commands you\'ll use most',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>1. A computer.</strong> Mac, Windows (10 or newer) or Linux. A normal laptop is plenty: the AI runs on Anthropic\'s computers, not yours. A phone or tablet won\'t do for building.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>2. A paid Claude plan.</strong> The free Claude plan doesn\'t include Claude Code. <strong>At the time of writing (October 2026)</strong>, the cheapest plan that does is <strong>Claude Pro, about $20 a month</strong> (a little less paid yearly). Bigger plans give more usage. Prices change, so check <strong>claude.com/pricing</strong> before you pay.</p><p>This course is designed so you can do all the building inside one month of the cheapest plan.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Can\'t pay right now? GitHub Copilot has a free plan with an agent mode inside VS Code (a free code editor), with a small monthly allowance. Keep doing the lessons: almost every skill transfers, and Chapter 8 shows how.',
    },
    {
      kind: 'text',
      html: '<p><strong>3. A terminal.</strong> A window where you type commands instead of clicking. Every computer has one:</p><ul><li><strong>Mac:</strong> open the app called Terminal.</li><li><strong>Windows:</strong> open <strong>PowerShell</strong> from the Start menu.</li><li><strong>Linux:</strong> open Terminal.</li></ul><p>You only need two commands to start. <code>cd</code> moves into a folder. <code>ls</code> lists what\'s in it (on Windows PowerShell, <code>ls</code> works too).</p>',
    },
    {
      kind: 'code',
      language: 'bash',
      code: 'cd Documents\nls',
      caption: 'Move into your Documents folder, then list what\'s there.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Prefer no terminal at all? The Claude desktop app (Mac and Windows) has a Code tab that does the same job with buttons. This course shows the terminal because it\'s the same on every computer.',
    },
  ],
  apply: {
    scenario: 'Hazel\'s shopping list.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Can Hazel use her five-year-old laptop?',
        options: [
          { text: 'No, she needs a gaming computer', why: 'The AI runs on Anthropic\'s computers. A normal laptop is fine.' },
          { text: 'Yes: Mac, Windows 10 or newer, or Linux is enough' },
          { text: 'Only if it\'s a Mac', why: 'Windows and Linux work too.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Needed, or not needed?',
        groups: ['Needed', 'Not needed'],
        items: [
          { text: 'A computer', group: 0 },
          { text: 'A paid Claude plan', group: 0 },
          { text: 'A computer science degree', group: 1 },
          { text: 'A terminal (or the desktop app)', group: 0 },
          { text: 'An expensive new laptop', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Hazel has a free Claude account. Can she use Claude Code with it?',
        options: [
          { text: 'Yes, the free plan includes everything', why: 'The free plan doesn\'t include Claude Code.' },
          { text: 'Yes, but only on weekends', why: 'Not a thing.' },
          { text: 'No: Claude Code needs a paid plan' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Where is the terminal?',
        pairs: [
          ['Mac', 'The Terminal app'],
          ['Windows', 'PowerShell from the Start menu'],
          ['No terminal wanted', 'The desktop app\'s Code tab'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which command moves you into a folder?',
        answers: ['cd'],
        placeholder: 'Two letters',
      },
      {
        kind: 'fillBlank',
        prompt: 'Move into Documents, then list what\'s inside.',
        template: '[[1]] Documents\n[[2]]',
        blanks: [['cd'], ['ls']],
        distractors: ['go', 'show'],
        language: 'bash',
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'My mom says she can\'t pay for an AI plan right now. Can I still do this?',
        prompt: 'Hazel\'s best reply?',
        options: [
          { text: 'No, sorry. Quit now.', why: 'There\'s a free route, and the lessons still teach.' },
          { text: 'Use your school login on my plan.', why: 'Sharing accounts breaks the rules and mixes up your work.' },
          { text: 'Keep doing the lessons. Copilot\'s free plan in VS Code has an agent mode, and the skills transfer.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Where should Hazel check today\'s price before paying?',
        options: [
          { text: 'On Anthropic\'s pricing page, claude.com/pricing' },
          { text: 'In a two-year-old video', why: 'Prices change. Check the official page.' },
          { text: 'Benny will know', why: 'Benny means well. The pricing page knows.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which step in Hazel\'s plan is wrong?',
        lines: [
          'Use my Windows laptop.',
          'Open PowerShell from the Start menu.',
          'Build everything on my phone.',
          'Pay for the cheapest plan that includes Claude Code.',
        ],
        bug: 2,
        fix: 'Build on the laptop; do the lessons on the phone.',
        explanation: 'The lessons work on a phone. The building needs a computer.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the command that moves you into a folder called band-site.',
        tiles: ['cd', 'band-site'],
        distractors: ['ls', 'open'],
        language: 'bash',
      },
    ],
  },
  reflect: {
    prompt: 'Which computer will you build on, and when in your week will you have 20 minutes for the "on your computer" steps?',
    starters: ['I\'ll use...', 'My building time is...'],
  },
  deepen: {
    title: 'On your computer',
    summary: 'Open your terminal (Terminal on Mac, PowerShell on Windows). Type cd Documents, press Enter, then ls and press Enter. You just used the terminal. If you\'re ready, pick a plan at claude.com/pricing.',
  },
  notes: 'PRICES LIVE ONLY HERE. Checked October 2026: code.claude.com setup docs: "Claude Code requires a Pro, Max, Team, Enterprise, or Console account. The free claude.ai plan does not include Claude Code access." Pro about $20/month, ~$17/month billed yearly (several 2026 pricing guides; verify at claude.com/pricing). Windows 10 1809+ minimum. GitHub Copilot Free includes limited agent mode/chat requests in VS Code (GitHub docs, 2026). Desktop app Code tab: Mac and Windows; Linux beta.',
};

export default lesson;
