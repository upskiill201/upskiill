import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 7. Before / After: undoing with git. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Undo with git',
  summary: 'Benny "improved" the calculator on Hazel\'s laptop, ran a cleanup command and committed it. Now gigs over three hours cost $0. Two ways to undo, and one way not to.',
  minutes: 12,
  outcomes: [
    'Throw away changes you haven\'t committed yet',
    'Undo a commit safely with git revert',
    'Avoid commands that throw away work',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Panic vs git',
      before: { label: 'Panic', text: 'Ask the AI: "undo whatever Benny did". It guesses which changes were Benny\'s, rewrites the calculator from memory, and the deposit rule disappears too.' },
      after: {
        label: 'Git',
        text: 'git log --oneline\n  a91c2f7 Benny: improve calculator\n  5d03e18 Add travel fee\n\ngit revert a91c2f7\n  → a new commit that undoes exactly Benny\'s change',
      },
      notes: [
        'git log shows exactly which commit is Benny\'s. No guessing.',
        'git revert makes a new commit that undoes that one commit, and keeps the history. Safe: nothing is thrown away.',
        'For changes not committed yet, git restore puts a file back to the last commit.',
      ],
    },
    {
      kind: 'code',
      language: 'bash',
      code: 'git restore gigs.html   # throw away uncommitted changes to this file\ngit revert a91c2f7      # undo one commit with a new commit',
      caption: 'The two everyday undos.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Commands like git reset --hard and git push --force can throw away work for good. If the AI suggests one, stop and ask why. You almost never need them.',
    },
  ],
  apply: {
    scenario: 'Undoing Benny\'s improvement.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Benny\'s change is already committed. Which command undoes it safely?',
        options: [
          { text: 'git revert with Benny\'s commit id' },
          { text: 'git reset --hard', why: 'That can throw away work. revert is the safe undo.' },
          { text: 'Delete the folder', why: 'You\'d lose everything, including the good work.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the situation to the undo.',
        pairs: [
          ['Changed a file, not committed', 'git restore'],
          ['Committed a bad change', 'git revert'],
          ['The AI\'s last edit, just now', 'Rewind'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which command shows the commit ids and messages?',
        answers: ['git log --oneline', 'git log'],
        placeholder: 'git log ...',
      },
      {
        kind: 'fillBlank',
        prompt: 'Undo Benny\'s commit.',
        template: 'git [[1]] a91c2f7',
        blanks: [['revert']],
        distractors: ['delete', 'reset'],
        language: 'bash',
      },
      {
        kind: 'chatReply',
        from: 'hazel',
        message: 'The AI wants to run "git reset --hard HEAD~3" to "clean things up". Okay?',
        prompt: 'Tey\'s answer?',
        options: [
          { text: 'Yes, cleaning is good.', why: 'This throws away the last three commits and any uncommitted work.' },
          { text: 'Only if it\'s late.', why: 'Late is when you\'d regret it most.' },
          { text: 'Stop. That throws away three commits. Ask what it\'s trying to fix, and use revert or restore instead.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe undo, or can throw work away?',
        groups: ['Safe', 'Can throw work away'],
        items: [
          { text: 'git revert', group: 0 },
          { text: 'git reset --hard', group: 1 },
          { text: 'git log', group: 0 },
          { text: 'git push --force', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'git log --oneline. Which commit broke the calculator?',
        lines: [
          'a91c2f7 Benny: improve calculator, cleanup',
          '5d03e18 Add travel fee',
          'c47e2a0 Add gig-fee calculator',
        ],
        bug: 0,
        fix: 'git revert a91c2f7',
        explanation: 'It\'s the newest, and the only one after the calculator last worked.',
      },
      {
        kind: 'mcq',
        prompt: 'Hazel changed gigs.html, hasn\'t committed, and wants the last committed version back. Which command?',
        options: [
          { text: 'git commit', why: 'That would save the bad change.' },
          { text: 'git restore gigs.html' },
          { text: 'git revert', why: 'revert undoes commits. This change isn\'t committed.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'ruth',
        message: 'How did you find Benny\'s commit so fast?',
        prompt: 'Hazel\'s answer?',
        options: [
          { text: '"Benny: improve calculator" made the bad commit easy to find' },
          { text: 'They didn\'t matter', why: 'They made the bad commit obvious.' },
          { text: 'Git requires them to be long', why: 'Short and clear is best.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 3: after reverting, what next?',
        options: [
          { text: 'Commit again', why: 'revert already made a commit.' },
          { text: 'Run the tests and try a 4-hour gig' },
          { text: 'Tell Benny off', why: 'Check the fix first.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'In real life, what\'s your "git revert" (an undo that keeps the record) and your "reset --hard" (an undo that loses things)?',
  },
  deepen: {
    title: 'On your computer: practise undo',
    summary: 'Make a silly change (rename your heading to "BANANA"). Don\'t commit: run git restore on that file. Then make the change again, commit it, and git revert it. Run git log --oneline to see the history.',
  },
  notes: 'git restore (Git 2.23+) discards working-tree changes; git revert creates an inverse commit; reset --hard and push --force can lose work. HEAD~3 = three commits back.',
};

export default lesson;
