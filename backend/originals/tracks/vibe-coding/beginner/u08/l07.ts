import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 8 · Lesson 7. Chat with Tey: long sessions, context and models. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Long sessions and fresh starts',
  summary: 'Hazel\'s session has run all week: login, deploy, emails, a bug, a banner. Now it keeps mixing up last Tuesday\'s plan with today\'s. Tey explains context, the AI\'s short-term memory, and how to keep it clean.',
  minutes: 11,
  outcomes: [
    'Explain context in plain words',
    'Choose between /clear, /compact and a new session',
    'Know when to switch model with /model',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Everything in a session (your messages, its replies, the files it read) is its context: its short-term memory for this conversation. It has a size limit.', replies: ['What happens when it\'s full?'] },
        { tey: 'Long before it\'s full, it gets crowded. Old plans, old guesses, files from last Tuesday all compete with today\'s task. That\'s why it mixes things up.', replies: ['So what do I do?'] },
        { tey: 'One session per task. Finished the banner? /clear, then start the next task fresh. Your project rules are in CLAUDE.md, so nothing important is lost.', replies: ['And /compact?'] },
        { tey: '/compact squashes the chat into a summary and keeps going. Use it in the middle of one long task that\'s going well. Type /context if you want to see how full it is.', replies: ['What about /model?'] },
        { tey: '/model lets you pick the AI model. Bigger models are stronger at hard problems and use your limits faster; smaller ones are quicker for easy jobs. The default is fine for this course. Switch only with a reason.', replies: ['One task, one session.'] },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Before /clear on a long task, ask: "Write a short summary of where we are, what\'s done and what\'s next, into notes.md." Then the next session reads notes.md and picks up cleanly.',
    },
  ],
  apply: {
    scenario: 'The week-long session.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is "context" for an AI coding tool?',
        options: [
          { text: 'Everything in the current session that it\'s working from: messages, replies, files it read' },
          { text: 'Your computer\'s memory', why: 'It\'s the conversation\'s memory, not your laptop\'s.' },
          { text: 'Your CLAUDE.md only', why: 'CLAUDE.md is part of it, along with the whole chat.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the command to when to use it.',
        pairs: [
          ['/clear', 'Starting a new, unrelated task'],
          ['/compact', 'Mid-task, long but going well'],
          ['/context', 'See how full the context is'],
          ['/model', 'Pick a different model, with a reason'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'hazel',
        message: 'If I /clear, will it forget the house rules?',
        prompt: 'Tey\'s answer?',
        options: [
          { text: 'Yes, write them again every time.', why: 'CLAUDE.md is read in every new session.' },
          { text: 'No: the rules are in CLAUDE.md, which it reads at the start of every session.' },
          { text: 'It deletes CLAUDE.md.', why: '/clear only clears the chat.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: '/clear, or keep going?',
        groups: ['/clear', 'Keep going'],
        items: [
          { text: 'Banner done; next task is the email sender', group: 0 },
          { text: 'Halfway through a fix that\'s working', group: 1 },
          { text: 'It keeps mixing up old plans with today\'s', group: 0 },
          { text: 'Step 2 of 3 of the same feature, going well', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s rule.',
        template: 'One [[1]], one [[2]].',
        blanks: [['task'], ['session']],
        distractors: ['week', 'laptop'],
      },
      {
        kind: 'mcq',
        prompt: 'Before /clear on a big unfinished task, what should Hazel ask for?',
        options: [
          { text: 'A short summary of where they are, into notes.md' },
          { text: 'Nothing', why: 'A summary makes the next session start cleanly.' },
          { text: 'The whole chat copied into CLAUDE.md', why: 'CLAUDE.md is for short rules, not chats.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which command shows how full the context is?',
        answers: ['/context', 'context'],
        placeholder: '/...',
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Benny\'s notes is wrong?',
        lines: [
          '/clear starts a fresh chat.',
          '/compact squashes a long chat into a summary.',
          'Always use the biggest model for everything.',
          'CLAUDE.md is read in every session.',
        ],
        bug: 2,
        fix: 'Use the default; switch with a reason.',
        explanation: 'Bigger models use limits faster. For easy jobs, they\'re not needed.',
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 6: a session went in circles. /compact or /clear?',
        options: [
          { text: '/compact, to keep the circles', why: 'You don\'t want a summary of the mess.' },
          { text: '/clear, after getting files back to the last good version' },
          { text: 'Neither, keep going', why: 'Circles don\'t end by themselves.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Review from lesson 6: why does a fresh session use less of your plan?',
        options: [
          { text: 'It doesn\'t', why: 'A long chat is re-read with every message.' },
          { text: 'Fresh sessions are free', why: 'They\'re just lighter.' },
          { text: 'It has less old chat to carry with every message' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'How long has your current Claude Code session been running? Is it time for a fresh one?',
  },
  deepen: {
    title: 'On your computer: one task, one session',
    summary: 'Type /context to see how full your session is. Ask for a short summary into notes.md, then /clear and start your next task by saying "Read notes.md first."',
  },
  notes: 'code.claude.com commands (October 2026): /clear, /compact [instructions], /context, /model, /usage. Context window limits and model choice affect usage.',
};

export default lesson;
