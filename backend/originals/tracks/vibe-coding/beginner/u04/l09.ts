import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 9. Reading: branches, trying things safely. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Branches: try things safely',
  summary: 'Benny wants a "dark mode" thermometer. Hazel isn\'t sure. Ruth: "Try it on a branch. If you hate it, the real one never knew." Here\'s how a branch keeps experiments away from the working version.',
  minutes: 12,
  outcomes: [
    'Explain a branch in plain words',
    'Create a branch, switch between branches, and merge one',
    'Abandon an experiment without touching main',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'A parallel copy of your project',
      html:
        '<p>Your commits so far are on a branch called <strong>main</strong>: the working version.</p>' +
        '<p>A <strong>branch</strong> is a parallel line of commits. You can try anything on it. main doesn\'t change until you decide to bring the experiment in.</p>' +
        '<p><strong>Start an experiment:</strong></p><p><code>git switch -c dark-mode</code></p><p>Now you\'re on dark-mode. Ask Claude Code for the change, check it, commit it, as usual.</p>' +
        '<p><strong>Like it?</strong> Go back to main and bring it in:</p><p><code>git switch main</code><br><code>git merge dark-mode</code></p>' +
        '<p><strong>Hate it?</strong> Just go back to main. It never saw the experiment:</p><p><code>git switch main</code></p>' +
        '<p>Tell Claude Code which branch you\'re on, or add to CLAUDE.md: "For any experiment, make a new branch first."</p>' +
        '<p>Not sure where you are? <code>git status</code> says "On branch ..." on its first line.</p>',
    },
    {
      kind: 'check',
      question: 'Hazel is on dark-mode and hates it. What does main look like?',
      options: ['Dark, ruined', 'Exactly as it was before the experiment', 'Half dark'],
      answer: 1,
      explanation: 'main only changes when you merge into it.',
    },
  ],
  apply: {
    scenario: 'The dark-mode experiment.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a branch?',
        options: [
          { text: 'A backup on GitHub', why: 'That\'s pushing. A branch is a parallel line of commits.' },
          { text: 'A parallel line of commits where you can try things without changing main' },
          { text: 'A folder on your Desktop', why: 'Branches live inside git.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'A successful experiment, in order.',
        lines: [
          'git switch -c dark-mode',
          'Ask for the change, check it, commit it',
          'git switch main',
          'git merge dark-mode',
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Start a new branch.',
        template: 'git [[1]] -c new-banner',
        blanks: [['switch']],
        distractors: ['merge', 'commit'],
        language: 'bash',
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'Dark mode looks terrible. Did I ruin the thermometer?',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'Yes, we\'ll have to restore everything.', why: 'main never saw it.' },
          { text: 'No: git switch main and it\'s exactly as it was. That\'s what branches are for.' },
          { text: 'Merge it anyway.', why: 'Only merge what you like.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Do it on a branch, or straight on main?',
        groups: ['On a branch', 'Fine on main'],
        items: [
          { text: 'A whole new look', group: 0 },
          { text: 'Fix a typo', group: 1 },
          { text: 'Try a different way of saving pledges', group: 0 },
          { text: 'Change "$30" to "$35" after a price rise', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which command\'s first line tells you which branch you\'re on?',
        answers: ['git status', 'git branch'],
        placeholder: 'git ...',
      },
      {
        kind: 'findBug',
        prompt: 'Hazel wants dark-mode merged into main. Which line is wrong?',
        lines: ['git switch dark-mode', 'git merge main', 'git push'],
        bug: 1,
        fix: 'git switch main, then git merge dark-mode.',
        explanation: 'You merge INTO the branch you\'re on. Be on main, then merge the experiment.',
        language: 'bash',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the command to what it does.',
        pairs: [
          ['git switch -c dark-mode', 'Make a branch and move onto it'],
          ['git switch main', 'Go back to the working version'],
          ['git merge dark-mode', 'Bring the experiment into the branch you\'re on'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which CLAUDE.md rule keeps experiments safe?',
        options: [
          { text: 'Experiment freely on main', why: 'That\'s how midnight happened.' },
          { text: 'Never experiment', why: 'Experiments are good. On branches.' },
          { text: 'For any experiment, make a new branch first and tell me its name.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Review: before merging dark-mode, what should Hazel check?',
        options: [
          { text: 'Tests pass and the page works on the branch' },
          { text: 'Nothing, merging checks for you', why: 'Merging combines; it doesn\'t test.' },
          { text: 'That Benny likes it', why: 'Nice, but tests first.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s one risky idea for your project you\'d try on a branch?',
  },
  deepen: {
    title: 'On your computer: a branch',
    summary: 'git switch -c try-new-look. Ask Claude Code for a bold design change. Look at it. If you like it: commit, git switch main, git merge try-new-look, git push. If not: git switch main and check it\'s untouched.',
  },
  notes: '`git switch` (Git 2.23+). Unmerged branches can be left or deleted with `git branch -D` (not taught: deletes an experiment).',
};

export default lesson;
