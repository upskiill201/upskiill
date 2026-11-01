import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 10. Chapter Challenge: never again. Build: repo on GitHub, a branch merged. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: never again',
  summary: 'The school board wants the band\'s site "redesigned for the website" by Friday, without losing the thermometer, the calculator or the tests. Branch, build, check, commit, merge, push.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Make a risky change safely with a branch', 'Keep a backup on GitHub'],
  learn: [
    {
      kind: 'story',
      title: 'Friday deadline',
      beats: [
        { speaker: 'narrator', text: 'Principal Dupree forwards an email: the school board wants the band pages to match the school\'s new website. Blue and white. By Friday.' },
        { speaker: 'hazel', text: 'Last time someone said "redesign", I lost the thermometer at midnight.' },
        { speaker: 'ruth', text: 'Last time you had no branch, no commits and no backup.' },
        { speaker: 'tey', text: 'Everything from Chapter 4. Redesign it, and lose nothing.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: the redesign.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'The safe redesign, in order.',
        lines: [
          'git status: everything committed',
          'git switch -c school-colours',
          'Ask for the redesign in plan mode, then build step by step',
          'Run tests.html and the checklist',
          'Commit, git switch main, git merge school-colours',
          'git push',
        ],
      },
      {
        kind: 'mcq',
        prompt: 'git status says there are uncommitted changes before she starts. What first?',
        options: [
          { text: 'Start the branch anyway', why: 'Commit the good work first so it\'s safe.' },
          { text: 'Check they\'re good, then commit them' },
          { text: 'git reset --hard', why: 'That throws them away.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Halfway through, the AI suggests these. Which must Hazel refuse?',
        lines: [
          'git add .',
          'git commit -m "School colours: header and buttons"',
          'git push --force',
        ],
        bug: 2,
        fix: 'Use a normal git push.',
        explanation: 'push --force can overwrite what\'s on GitHub. Normal push is all she needs.',
        language: 'bash',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which safety net fits?',
        groups: ['Rewind', 'Git'],
        items: [
          { text: 'Undo the AI\'s last edit a minute ago', group: 0 },
          { text: 'Go back to Tuesday\'s working version', group: 1 },
          { text: 'A file deleted by a terminal command', group: 1 },
          { text: 'Get the project onto a new laptop', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'The redesign broke the calculator on the branch. Is main broken too?',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'No: main hasn\'t seen the branch. We fix it here before merging.' },
          { text: 'Yes, everything\'s broken.', why: 'Branches keep main safe.' },
          { text: 'Merge it and fix it later.', why: 'Never merge something broken.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The full rhythm.',
        template: 'Do one, check one, [[1]] one. Then [[2]] it to GitHub.',
        blanks: [['commit'], ['push']],
        distractors: ['delete', 'email'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which redesign request is safest?',
        options: [
          { text: 'Redesign everything in school colours', why: '"Everything" again.' },
          { text: 'Make it blue', why: 'Which parts? Which blue?' },
          { text: 'Plan first: change the header, buttons and links to the school\'s blue and white. Don\'t change the thermometer logic, the calculator or tests.html.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which command sends the merged main to GitHub?',
        answers: ['git push'],
        placeholder: 'git ...',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the command to its moment.',
        pairs: [
          ['git switch -c', 'Start the redesign'],
          ['git revert', 'Undo a bad commit safely'],
          ['git merge', 'Bring the finished redesign into main'],
          ['git log --oneline', 'See the history'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 3: the AI says "Redesign done, all tests pass." Next?',
        options: [
          { text: 'Merge straight away', why: 'That\'s a claim. Check first.' },
          { text: 'Open tests.html and run the checklist herself, then merge' },
          { text: 'Ask it if it\'s sure', why: 'It will say yes. Check yourself.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'ruth',
        message: 'Show me it\'s backed up.',
        prompt: 'What does Hazel show her?',
        options: [
          { text: 'The project folder on her Desktop.', why: 'That\'s only on the laptop.' },
          { text: 'A screenshot.', why: 'A screenshot isn\'t a backup.' },
          { text: 'The repository on github.com, with today\'s commit at the top.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 2: why plan mode for the redesign?',
        options: [
          { text: 'To catch any step that touches the thermometer or tests before code changes' },
          { text: 'It\'s required for colours', why: 'It\'s required by good sense, not the tool.' },
          { text: 'To make it faster', why: 'It makes it safer.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Midnight in Chapter 4 lesson 1 vs today. What three things are different about how you work?',
    starters: ['1.', '2.', '3.'],
  },
  deepen: {
    title: 'Build it: never again',
    summary: 'Your project on GitHub, private, with at least five clear commits. Do one bigger change on a branch, check it, merge it into main, and push. Open github.com and see it there. Chapter 4 shipped.',
  },
  notes: 'Chapter 4 review. push --force can overwrite remote history.',
};

export default lesson;
