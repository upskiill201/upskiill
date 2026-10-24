import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 6. Chat with Tey: stop the loop (rewind, git, fresh session). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Stop the loop',
  summary: 'Even with the real error, the session that made five wrong guesses keeps "remembering" them, and suggesting fix 6. Tey explains why a fresh start often fixes the fixer.',
  minutes: 11,
  outcomes: [
    'Get out of a fix loop: stop, go back, start fresh',
    'Use /clear for a fresh session',
    'Carry over only what matters into the new session',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'A long session remembers everything in it, including the five wrong guesses. They become part of what it\'s thinking with. So it keeps steering back toward them.', replies: ['So what do I do?'] },
        { tey: 'Three moves. One: stop. Two: get your files back to the last good version (rewind if it\'s recent, git if it\'s older). Three: start a fresh session with /clear, so the old guesses are gone.', replies: ['Won\'t it forget the project?'] },
        { tey: 'It forgets the chat, not the project. It still reads CLAUDE.md and your files. You just give it a clean, short summary: the real error, the recipe, what you\'ve ruled out.', replies: ['What about /compact?'] },
        { tey: '/compact squashes a long chat into a summary and keeps going. Handy when a long session is going well. When it\'s going badly, /clear is better: you don\'t want a summary of the mess.', replies: ['Stop, go back, start fresh.'] },
        { tey: 'Exactly. And notice: database settings you changed in Supabase aren\'t in git. If a guess changed something there, write it down and undo it there too.', replies: ['Fix 3...'] },
      ],
    },
    {
      kind: 'code',
      language: 'plaintext',
      code: 'Fresh start. The problem: login emails don\'t arrive.\nThe evidence: console shows "AuthApiError: email rate limit exceeded (429)".\nRuled out: the form code (works for the first email).\nExplain what to do for testing now, and for launch. Don\'t change code yet.',
      caption: 'Hazel\'s first message after /clear.',
    },
  ],
  apply: {
    scenario: 'Getting out of the loop.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Escaping a fix loop, in order.',
        lines: [
          'Stop asking for fixes',
          'Get files back to the last good version',
          'Note any settings changed outside the code',
          'Start a fresh session with /clear',
          'Give it a short summary: error, recipe, ruled out',
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why can a long, messy session keep suggesting bad fixes?',
        options: [
          { text: 'The wrong guesses are still in the chat it\'s thinking with' },
          { text: 'It\'s tired', why: 'It doesn\'t tire. The old guesses steer it.' },
          { text: 'It wants to annoy you', why: 'It\'s just working from a messy chat.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which command starts a fresh session with an empty chat?',
        answers: ['/clear', 'clear'],
        placeholder: '/...',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the command to when to use it.',
        pairs: [
          ['/clear', 'The session went badly: start clean'],
          ['/compact', 'A long session going well: shrink it'],
          ['/rewind', 'Undo the last few edits'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'hazel',
        message: 'If I /clear, does it forget my whole project?',
        prompt: 'Tey\'s answer?',
        options: [
          { text: 'Yes, start the project again.', why: 'Files and CLAUDE.md are still there.' },
          { text: 'It forgets the chat. It still reads your files and CLAUDE.md. Give it a short summary to start.' },
          { text: 'It deletes your files.', why: '/clear only clears the conversation.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Put in the fresh-start summary, or leave out?',
        groups: ['Put in', 'Leave out'],
        items: [
          { text: 'The exact error', group: 0 },
          { text: 'The recipe to reproduce it', group: 0 },
          { text: 'All five failed fixes in detail', group: 1 },
          { text: 'What you\'ve ruled out', group: 0 },
          { text: '"I\'m so frustrated"', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which escape step did Hazel nearly forget?',
        lines: [
          'git: back to the last good commit.',
          '/clear: fresh session.',
          'Fix 3 turned off a database setting in Supabase: still off.',
        ],
        bug: 2,
        fix: 'Turn it back on in Supabase. Git can\'t undo it.',
        explanation: 'Git only restores files. Settings changed in an online dashboard need undoing there.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s three moves.',
        template: 'Stop, go [[1]], start [[2]].',
        blanks: [['back'], ['fresh']],
        distractors: ['faster', 'louder'],
      },
      {
        kind: 'mcq',
        prompt: 'The session is long but going well. Hazel wants to keep going without starting over. Which command?',
        options: [
          { text: '/clear', why: 'That throws away a good chat.' },
          { text: '/exit', why: 'That leaves the tool.' },
          { text: '/compact' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 4: the last good version was two days ago. Rewind or git?',
        options: [
          { text: 'Git: go back to the commit from two days ago' },
          { text: 'Rewind, always', why: 'Rewind is for recent edits in this session.' },
          { text: 'Neither, rebuild', why: 'The good version is saved.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s a situation in your life where "starting fresh" would beat "one more try"?',
  },
  deepen: {
    title: 'On your computer: a clean restart',
    summary: 'Next time a session goes in circles: stop, git back to your last good commit, /clear, and start with a four-line summary (problem, evidence, recipe, ruled out). Note whether it gets there faster.',
  },
  notes: 'code.claude.com (October 2026): /clear starts a new conversation with empty context (aliases /reset, /new); /compact summarises the conversation to free context. CLAUDE.md is reloaded in new sessions.',
};

export default lesson;
