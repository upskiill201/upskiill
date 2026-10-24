import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 6. Chat with Tey: commit little, commit often. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Commit little, commit often',
  summary: 'Hazel now commits once a week, "to be safe". Tey thinks that\'s like saving a video game once a week. Here\'s the rhythm that makes git actually useful.',
  minutes: 11,
  outcomes: [
    'Commit after every step that works',
    'Commit before every risky request',
    'Make committing part of the build rhythm',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Quick question: if you save a video game once a week and lose on Friday, where do you restart?', replies: ['Last Sunday?'] },
        { tey: 'Exactly. Git is the same. A commit is only useful if it\'s close to where you are. So: commit little, commit often.', replies: ['How often is often?'] },
        { tey: 'Two moments. One: every time a step works and the tests pass. Two: right before any request that feels big or risky ("restyle the page", "change how saving works").', replies: ['That\'s a lot of commits.'] },
        { tey: 'Ten a day is normal. Each one is cheap. And now your build rhythm grows: do one step, check it, commit it.', replies: ['Can Claude Code do the commits?'] },
        { tey: 'Yes. Add to CLAUDE.md: "After each step passes its checks, commit with a clear message." You still read the command. And here\'s the reward: with frequent commits, you can finally use Accept edits mode, because any change can be undone.', replies: ['Do one, check one, commit one.'] },
      ],
    },
    {
      kind: 'code',
      language: 'plaintext',
      code: '## Git\n- After each step passes its checks, commit with a clear message.\n- Before any big or risky change, tell me and commit first.\n- Never run git commands that throw away work (like reset --hard) without asking.',
      caption: 'Hazel\'s new CLAUDE.md section.',
    },
  ],
  apply: {
    scenario: 'The new rhythm.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is "commit once a week" risky?',
        options: [
          { text: 'Git deletes old commits', why: 'Git keeps them. The problem is the gap.' },
          { text: 'A week of work can be lost between commits' },
          { text: 'It costs money', why: 'Commits are free.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Commit now?',
        groups: ['Yes, commit', 'Not yet'],
        items: [
          { text: 'Step 2 works, tests pass', group: 0 },
          { text: 'About to ask "restyle the whole page"', group: 0 },
          { text: 'Halfway through a change, tests failing', group: 1 },
          { text: 'Fixed the comma bug, tests pass', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The full rhythm.',
        template: 'Do one, [[1]] one, [[2]] one.',
        blanks: [['check', 'test'], ['commit']],
        distractors: ['skip', 'delete'],
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'Ten commits a day? Won\'t git fill up the laptop?',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'Yes, so one a week.', why: 'Commits of small text files are tiny.' },
          { text: 'Only delete old ones.', why: 'No need. Keep them all.' },
          { text: 'Commits are tiny for files like ours. Ten a day is normal.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which CLAUDE.md git rule is dangerous?',
        lines: [
          '- Commit after each step passes its checks.',
          '- Commit before any big change.',
          '- If git gets confusing, run reset --hard.',
        ],
        bug: 2,
        fix: 'Never run commands that throw away work without asking.',
        explanation: 'reset --hard throws away uncommitted changes for good.',
      },
      {
        kind: 'mcq',
        prompt: 'Why can Hazel now use Accept edits mode?',
        options: [
          { text: 'Because frequent commits mean any change can be undone' },
          { text: 'Because the AI is safer now', why: 'Same AI. Hazel\'s safety net is better.' },
          { text: 'She still can\'t', why: 'With frequent commits it\'s reasonable, still reading commands.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Before a risky request, what do you do first? (One word.)',
        answers: ['commit'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'One step of the build, in order.',
        lines: ['Ask for one step', 'Read the diff', 'Run the tests', 'Commit with a clear message'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the moment to the commit message.',
        pairs: [
          ['Added the form', 'Add pledge form'],
          ['Fixed glued amounts', 'Fix: typed amounts now add up'],
          ['Before restyling', 'Save working version before restyle'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 1: in Accept edits mode, does Hazel still read commands?',
        options: [
          { text: 'No, nothing is shown', why: 'Commands still ask in Accept edits.' },
          { text: 'Only on weekends', why: 'Every time.' },
          { text: 'Yes: edits go through, but she still reads and approves most commands' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'What two moments in your build will you commit at? Write them as house rules.',
  },
  deepen: {
    title: 'On your computer: the git rules',
    summary: 'Add the three git rules to your CLAUDE.md. Do your next two small changes with the full rhythm: one step, check, commit. Run git log --oneline at the end.',
  },
  notes: 'git reset --hard discards uncommitted changes to tracked files. Accept edits mode (code.claude.com, October 2026) auto-approves file edits and common filesystem commands; other commands still prompt.',
};

export default lesson;
