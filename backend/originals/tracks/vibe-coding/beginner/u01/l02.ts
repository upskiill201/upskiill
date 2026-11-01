import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2. Reading: why this course uses Claude Code, and what transfers. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Why Claude Code?',
  summary: 'Benny sends Hazel nine links to nine AI coding tools. She has eight weeks and one laptop. Here\'s the one this course picks, why, and why it doesn\'t trap you.',
  minutes: 12,
  outcomes: [
    'Name the main kinds of AI coding tools',
    'Explain why this course uses Claude Code',
    'Know that the skills you learn work in other tools too',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'One tool, chosen on purpose',
      html:
        '<p>Benny\'s nine links fall into three kinds of tool:</p>' +
        '<ul><li><strong>Website builders</strong> (like Lovable, Bolt or Replit Agent). You type in a browser and an app appears. Fastest first demo. But the app lives on their platform, and the parts you need to fix and secure it are hidden.</li>' +
        '<li><strong>Editor helpers</strong> (like GitHub Copilot or Cursor). An AI inside a code editor. Great once you\'re comfortable in an editor.</li>' +
        '<li><strong>Coding agents</strong> (like Claude Code, OpenAI Codex or Gemini CLI). An AI that works in a folder on your computer: it reads your project, makes a plan, edits files, runs commands and tells you what it did.</li></ul>' +
        '<p>This course uses <strong>Claude Code</strong>, a coding agent made by Anthropic. Here\'s why:</p>' +
        '<ul><li><strong>Your computer, your files.</strong> What you build is ordinary files in a folder you own. You can open them, back them up and put them live anywhere.</li>' +
        '<li><strong>The way professionals work.</strong> Plan, edit, run, test, report. The habits you build here are the ones teams hire for.</li>' +
        '<li><strong>A gentle start.</strong> There\'s a desktop app with no terminal needed, and a terminal version that works on Mac, Windows and Linux. This course shows the terminal, because it\'s the same everywhere.</li>' +
        '<li><strong>Safe by default.</strong> It asks before it changes files or runs commands, it can plan without touching anything, and it keeps checkpoints you can rewind.</li></ul>' +
        '<p><strong>The honest downside:</strong> it isn\'t free. It needs a paid Claude plan. Next lesson covers exactly what you need, and a free option if cost is a blocker.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Tey\'s promise: about 85% of this course is habits, not buttons. Briefing, planning, checking, testing, git and security work the same in every AI coding tool. Chapter 8 shows you how to switch.',
    },
    {
      kind: 'check',
      question: 'What makes a coding agent different from a website builder?',
      options: ['It works on files in a folder on your own computer', 'It only makes websites', 'It doesn\'t use AI'],
      answer: 0,
      explanation: 'An agent works in your project on your machine: reading, editing and running things there.',
    },
  ],
  apply: {
    scenario: 'Hazel\'s kitchen table, nine browser tabs open.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Which kind of tool is each description?',
        groups: ['Website builder', 'Coding agent'],
        items: [
          { text: 'You type in a browser and an app appears on their site', group: 0 },
          { text: 'Works in a folder on your computer', group: 1 },
          { text: 'Runs commands and tests in your project', group: 1 },
          { text: 'The app lives on their platform', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which reason for choosing Claude Code is about owning your work?',
        options: [
          { text: 'It asks before changing files', why: 'That\'s about safety.' },
          { text: 'What you build is ordinary files on your own computer' },
          { text: 'It has a desktop app', why: 'That\'s about being easy to start.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'But Lovable made me an app in two minutes! Why not that?',
        prompt: 'A fair reply?',
        options: [
          { text: 'Website builders are bad and you should delete it.', why: 'They\'re great for quick demos. Tey isn\'t against them.' },
          { text: 'It\'s fast for a demo. We want files we own and understand, so we can fix, secure and move them.' },
          { text: 'Because Claude Code is free.', why: 'It isn\'t free. It needs a paid plan.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each reason to what it means for Hazel.',
        pairs: [
          ['Your files', 'She can back up the band\'s app herself'],
          ['Safe by default', 'It asks before it changes anything'],
          ['Gentle start', 'A desktop app, no terminal needed'],
          ['How pros work', 'Plan, edit, test, report'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Hazel\'s notes is wrong?',
        lines: [
          'Claude Code is a coding agent made by Anthropic.',
          'It works on files on my own computer.',
          'It\'s free, so I don\'t need a plan.',
          'It asks before it changes files.',
        ],
        bug: 2,
        fix: 'It needs a paid Claude plan.',
        explanation: 'Honest cost first: you need a paid plan. Lesson 3 covers the details.',
      },
      {
        kind: 'mcq',
        prompt: 'Hazel learns Claude Code, then her school buys a different AI tool. What happens to her skills?',
        options: [
          { text: 'She has to start from zero', why: 'Most of the course is habits that every tool needs.' },
          { text: 'They only work with Claude Code', why: 'Briefing, checking, testing and git work everywhere.' },
          { text: 'Most of them carry over: briefing, checking, testing, git and security work in any tool' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the description.',
        template: 'A coding [[1]] reads my project, makes a [[2]], edits files and runs commands.',
        blanks: [['agent'], ['plan']],
        distractors: ['website', 'guess'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which company makes Claude Code?',
        answers: ['anthropic'],
        placeholder: 'Company name',
      },
      {
        kind: 'sortGroups',
        prompt: 'Habit that works in any AI tool, or specific to one tool?',
        groups: ['Any tool', 'One tool'],
        items: [
          { text: 'Writing a clear brief', group: 0 },
          { text: 'The exact keyboard shortcut for plan mode', group: 1 },
          { text: 'Checking what changed', group: 0 },
          { text: 'Saving your work in git', group: 0 },
          { text: 'The name of its settings menu', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ruth',
        message: 'I wrote bank software for 32 years. Why should a band trust a robot that writes code?',
        prompt: 'Hazel\'s best answer?',
        options: [
          { text: 'Because it\'s always right.', why: 'Ruth would walk out. It\'s not always right.' },
          { text: 'We shouldn\'t trust it blindly. It asks before it changes things, and I\'m going to learn to check everything it does.' },
          { text: 'Because Benny said so.', why: 'Ruth wants reasons, not Benny.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What matters most to you in a tool: speed, cost, owning your work, or safety? Why?',
    starters: ['For me the most important thing is...', 'Because...'],
  },
  deepen: {
    title: 'Look around',
    summary: 'Search the web for "Claude Code docs" and open Anthropic\'s official page (code.claude.com). Read the first screen. Don\'t sign up yet: next lesson tells you exactly what you need.',
  },
  notes: 'Tool comparison checked on the web, October 2026: Lovable, Bolt, Replit Agent (browser builders, free tiers with credit limits); Cursor and GitHub Copilot (editor-based, both have agent modes); Claude Code, OpenAI Codex CLI, Gemini CLI (terminal agents). Claude Code facts from code.claude.com docs: desktop app Code tab (Mac, Windows; Linux beta), asks permission before edits/commands by default, plan mode, checkpoints. "About 85% habits" is Tey\'s estimate of this course\'s own lessons (68 of 80 are tool-neutral), not an external statistic. Course drafted by Claude; see the outline\'s neutrality note.',
};

export default lesson;
