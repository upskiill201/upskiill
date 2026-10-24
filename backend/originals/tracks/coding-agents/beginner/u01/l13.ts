import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 13 — Agents you'll meet (examples, not recommendations). */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Agents you\'ll meet',
  summary: 'Remi\'s friends all use different agents and argue about which is best. Tey sorts them by where they work, not by brand, because the brands change every few months.',
  minutes: 11,
  outcomes: [
    'Recognise the main places coding agents work',
    'Know that the habits matter more than the brand',
    'Ask the right questions about any new agent',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Where agents live',
      text: 'Some agents run in your terminal, such as Claude Code or Gemini CLI. Some live inside a code editor, such as Cursor or GitHub Copilot in VS Code. Some work in the cloud: you give them a task or an issue and they come back with a pull request, like the GitHub Copilot coding agent or OpenAI Codex. They all read, plan, act and check. Whatever you use, ask the same three questions.',
      hotspots: [
        { phrase: 'in your terminal', note: 'You type tasks in a command line; it edits files in your project folder and runs commands, asking permission as set up.' },
        { phrase: 'inside a code editor', note: 'You see its changes as you work, file by file, and accept or reject them.' },
        { phrase: 'in the cloud', note: 'It works on a copy of your project somewhere else and sends back a pull request for review (Chapter 9).' },
        { phrase: 'They all read, plan, act and check', note: 'Same loop, different window. Everything in this course works with any of them.' },
        { phrase: 'the same three questions', note: 'What can it see? What is it allowed to do without asking? How do I see exactly what it changed?' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Sort by where they work',
      caption: 'Examples only, checked October 2026. Names and features change often.',
      code: 'agents = {\n    "Claude Code": "terminal",\n    "Gemini CLI": "terminal",\n    "Cursor": "editor",\n    "GitHub Copilot coding agent": "cloud",\n    "OpenAI Codex": "cloud",\n}\nfor where in ["terminal", "editor", "cloud"]:\n    print(where, "->", [name for name, w in agents.items() if w == where])\n',
      challenge: 'Add the agent you use (or have heard of) to the list.',
    },
  ],
  apply: {
    scenario: 'Brands come and go.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the agents that work in the terminal, as a list',
        starter: 'agents = {\n    "Claude Code": "terminal",\n    "Gemini CLI": "terminal",\n    "Cursor": "editor",\n    "OpenAI Codex": "cloud",\n}\n',
        solution: 'agents = {\n    "Claude Code": "terminal",\n    "Gemini CLI": "terminal",\n    "Cursor": "editor",\n    "OpenAI Codex": "cloud",\n}\nprint([name for name, where in agents.items() if where == "terminal"])\n',
        hint: '[name for name, where in agents.items() if where == "terminal"]',
        checks: [{ message: "Print ['Claude Code', 'Gemini CLI']", outputEquals: "['Claude Code', 'Gemini CLI']" }],
      },
      {
        kind: 'mcq',
        prompt: 'Which matters most when you switch to a new agent?',
        options: [
          { text: 'Picking the most popular brand', why: 'Popularity changes; habits carry over.' },
          { text: 'Your habits: clear briefs, small steps, reading changes, running tests' },
          { text: 'Learning every setting first', why: 'Settings matter, but the habits matter more.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Terminal, editor or cloud?',
        groups: ['Terminal', 'Editor', 'Cloud'],
        items: [
          { text: 'You type a task in a command line', group: 0 },
          { text: 'You accept changes file by file as you code', group: 1 },
          { text: 'It sends back a pull request later', group: 2 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to what it protects you from.',
        pairs: [
          ['What can it see?', 'Secrets it shouldn\'t read'],
          ['What may it do without asking?', 'Surprise commands'],
          ['How do I see what changed?', 'Silent edits'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'My friend says his agent is way better than mine. Should I switch?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Yes, always use the newest one.', why: 'Habits matter more than the tool.' },
          { text: 'Never switch tools.', why: 'Tools improve; switching thoughtfully is fine.' },
          { text: 'Maybe one day. But the skills here work with any agent. Switching won\'t fix a one-line brief.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'agents = {"Claude Code": "terminal", "Cursor": "editor", "OpenAI Codex": "cloud"}\nprint(agents["Cursor"])',
        language: 'python',
        options: [
          { text: 'editor' },
          { text: 'Cursor', why: 'It prints the value for that key.' },
          { text: 'terminal', why: 'That\'s Claude Code\'s value.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many different places the agents in the dictionary work',
        starter: 'agents = {\n    "Claude Code": "terminal",\n    "Gemini CLI": "terminal",\n    "Cursor": "editor",\n    "OpenAI Codex": "cloud",\n}\n',
        solution: 'agents = {\n    "Claude Code": "terminal",\n    "Gemini CLI": "terminal",\n    "Cursor": "editor",\n    "OpenAI Codex": "cloud",\n}\nprint(len(set(agents.values())))\n',
        hint: 'len(set(agents.values()))',
        checks: [{ message: 'Print 3', outputEquals: '3' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'Same loop, different window.',
        template: 'Every agent reads, [[1]], acts and [[2]].',
        blanks: [['plans'], ['checks']],
        distractors: ['ships', 'guesses'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Remi\'s notes will go out of date fastest?',
        lines: [
          'Agents work in a terminal, an editor or the cloud.',
          'Always ask what it can see and what it may do.',
          'Agent X is the best one and always will be.',
          'Read every change and run the tests.',
        ],
        bug: 2,
        fix: 'Delete it: rankings change every few months.',
        explanation: 'Brands and rankings change; the habits don\'t.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Cloud agents usually send their work back as a pull ...?',
        answers: ['request', 'pull request', 'PR'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Have you switched apps for something (notes, chat, maps) and found your habits mattered more than the app? What carried over?',
    starters: ['I switched from...', 'What carried over was...'],
  },
  deepen: {
    title: 'Check before you choose',
    summary: 'Before using any agent at work, check: is it allowed by your company, where does your code go, and can you control what it runs? Chapter 8 covers this.',
  },
  notes: 'Examples, checked 2026-10 and liable to change: Claude Code (Anthropic, terminal), Gemini CLI (Google, terminal), Cursor (AI code editor), GitHub Copilot (editor assistance, plus a coding agent that works from issues and opens pull requests), OpenAI Codex (cloud/CLI coding agent). Named as examples of where agents work, not ranked or recommended.',
};

export default lesson;
