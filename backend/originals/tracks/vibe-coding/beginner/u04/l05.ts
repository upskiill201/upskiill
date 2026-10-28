import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 5. Checkpoint: lessons 1–4 of Chapter 4, plus review. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the morning after',
  summary: '8:45 a.m., fifteen minutes before the booster meeting. Principal Dupree asks Hazel how she knows the site won\'t "vanish again". Show her the safety nets.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Explain checkpoints and git', 'Make and read commits'],
  learn: [
    {
      kind: 'story',
      title: 'The principal\'s office, 8:45 a.m.',
      beats: [
        { speaker: 'narrator', text: 'Principal Dupree has heard about midnight. She wants to know if the band\'s site is safe to show the school board.' },
        { speaker: 'hazel', text: 'It is now. Let me show you how I\'d get it back.' },
        { speaker: 'tey', text: 'Fifteen minutes. Help Hazel prove it.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: the safety nets.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each safety net to when it helps.',
        pairs: [
          ['Rewind', 'Undo the AI\'s last few edits, fast'],
          ['A git commit', 'Go back to a version you chose'],
          ['git status', 'See what changed since that version'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The principal asks: "What if the AI deletes a file with a command?" Best answer?',
        options: [
          { text: 'Rewind will fix it', why: 'Checkpoints don\'t track changes made by commands.' },
          { text: 'It can\'t happen', why: 'It can, if a command is approved.' },
          { text: 'Git has the last commit, so I can get the file back from there' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Saving a new version, in order.',
        lines: ['git status', 'git add .', 'git commit -m "Add concert banner"', 'git log --oneline'],
        language: 'bash',
      },
      {
        kind: 'fillBlank',
        prompt: 'The rewind shortcut.',
        template: 'Press [[1]] twice, or type /[[2]].',
        blanks: [['Esc', 'escape'], ['rewind']],
        distractors: ['Enter', 'undo'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Hazel\'s explanation is wrong?',
        lines: [
          'Git saves a version when I commit.',
          'GitHub is the same as git.',
          'Rewind is a quick undo inside Claude Code.',
          'Each commit has a message saying what changed.',
        ],
        bug: 1,
        fix: 'GitHub is a website that stores a copy of the git versions.',
        explanation: 'Git is the tool; GitHub stores copies online.',
      },
      {
        kind: 'chatReply',
        from: 'ruth',
        message: 'And what if your laptop gets stolen?',
        prompt: 'Hazel\'s honest answer?',
        options: [
          { text: 'Git saves me.', why: 'Git lives on the laptop. A stolen laptop takes it too.' },
          { text: 'Right now I\'d lose it. Next step is a copy on GitHub.' },
          { text: 'Laptops don\'t get stolen.', why: 'They do.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which command shows new or changed files?',
        answers: ['git status'],
        placeholder: 'git ...',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good moment to commit, or not yet?',
        groups: ['Commit now', 'Not yet'],
        items: [
          { text: 'Tests all pass after a change', group: 0 },
          { text: 'Halfway through a change, page broken', group: 1 },
          { text: 'Before a big risky request', group: 0 },
          { text: 'Tests failing, not sure why', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 3: what makes a commit "the good version"?',
        options: [
          { text: 'You checked it: the diff read, the tests passing' },
          { text: 'It\'s the newest', why: 'Newest isn\'t always good. Midnight was newest.' },
          { text: 'It\'s the biggest', why: 'Size says nothing about quality.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Review from Chapter 2: what should the midnight request have been?',
        options: [
          { text: 'Make the whole site look more professional', why: 'That\'s what caused it.' },
          { text: 'Make the heading on index.html bold, in a serif font. Keep everything else the same.' },
          { text: 'Make everything better, but carefully', why: '"Everything" is still everything.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Explain git to someone who\'s never heard of it, in two sentences.',
  },
  deepen: {
    title: 'On your computer: commit a change',
    summary: 'Make one small change with Claude Code. Check it. Then git status, git add ., git commit with a clear message, and git log --oneline to see both versions.',
  },
  notes: 'Review of Chapter 4 lessons 1–4 and Chapters 2–3.',
};

export default lesson;
