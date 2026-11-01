import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 9. Tap to explore: a test for every bug. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'A test for every bug',
  summary: 'The double sign-up bug is fixed. Two weeks later, a "small tidy-up" brings it back. Ruth\'s rule from the bank: every bug you fix gets a test, so it can never sneak back.',
  minutes: 12,
  outcomes: [
    'Turn a bug\'s recipe into a test',
    'Add a database rule that refuses duplicates',
    'Keep fixed bugs fixed',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Two guards for the double sign-up',
      text:
        'tests.md\n  Bug: double sign-ups (fixed Nov 3)\n  Recipe: log in, refresh twice, tap Drive.\n  Expected: exactly 1 new sign-up.\n\nDatabase rule (asked for in plain words):\n  "Make signups refuse a second row with the same gig_id, user_id and role."\n\nWhat a parent sees on a double tap now:\n  "You\'re already signed up to drive for this gig."',
      hotspots: [
        { phrase: 'Bug: double sign-ups (fixed Nov 3)', note: 'Every fixed bug gets an entry. Months later, you\'ll know why this test exists.' },
        { phrase: 'Recipe: log in, refresh twice, tap Drive.', note: 'The recipe from lesson 4 becomes the test. Run it after every change that touches sign-ups.' },
        { phrase: 'Expected: exactly 1 new sign-up.', note: 'An exact expected result. Two rows = FAIL.' },
        { phrase: 'refuse a second row with the same gig_id, user_id and role', note: 'A "unique" rule in the database itself. Even if the page has a bug, the database says no. Belt and braces.' },
        { phrase: 'You\'re already signed up to drive for this gig.', note: 'When the database refuses, the page shows a friendly message, not a scary error. Ask for that too.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ask the AI: "Add a test for this bug so it can\'t come back. Show me the test failing on the old code first, if you can." A test that never failed proves nothing.',
    },
  ],
  apply: {
    scenario: 'Keeping the bug dead.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why add a test after fixing a bug?',
        options: [
          { text: 'So the same bug can\'t sneak back unnoticed later' },
          { text: 'To make the project bigger', why: 'It\'s about catching the bug if it returns.' },
          { text: 'Tests are required for fixes', why: 'Not required. Very wise.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the guard to what it does.',
        pairs: [
          ['Test in tests.md', 'Catches the bug after any change'],
          ['Unique rule in the database', 'Refuses duplicates even if the page has a bug'],
          ['Friendly message', 'Tells the parent what happened'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The database rule.',
        template: 'Refuse a second row with the same gig_id, [[1]] and [[2]].',
        blanks: [['user_id'], ['role']],
        distractors: ['created_at', 'phone'],
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'We fixed it already. Why does it need a test AND a database rule?',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'It doesn\'t, delete both.', why: 'The bug already came back once.' },
          { text: 'The test tells us if the page breaks again. The rule stops duplicates even if it does.' },
          { text: 'Because Ruth likes rules.', why: 'There\'s a real reason: two layers of protection.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good bug test, or not?',
        groups: ['Good test', 'Not a test'],
        items: [
          { text: 'Refresh twice, tap Drive: exactly 1 new row', group: 0 },
          { text: 'Check it\'s fixed', group: 1 },
          { text: 'Tap Drive twice fast: second tap shows "already signed up"', group: 0 },
          { text: 'Hope it doesn\'t come back', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'One word: the kind of database rule that refuses duplicate rows.',
        answers: ['unique'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Which tests.md entry is missing its expected result?',
        lines: [
          'Bug: double sign-ups. Refresh twice, tap Drive. Expected: 1 new row.',
          'Bug: dates a day early. Open the Nov 7 gig. Expected: shows Nov 7.',
          'Bug: login emails. Send a link.',
        ],
        bug: 2,
        fix: 'Expected: one email; a second request within a minute shows "Please wait".',
        explanation: 'Without an expected result, it can\'t pass or fail.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Best request after a fix?',
        options: [
          { text: 'Cool, thanks', why: 'Nothing stops it coming back.' },
          { text: 'Fix it again but harder', why: 'It\'s fixed. Protect it.' },
          { text: 'Add a test for this bug to tests.html, and show it failing on the old code first if you can. Don\'t change any other tests.' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'I double-tapped Drive and the database said no. What should my mom see on her phone?',
        prompt: 'Hazel\'s answer?',
        options: [
          { text: 'A friendly message: "You\'re already signed up to drive for this gig."' },
          { text: 'The raw database error', why: 'Scary and confusing for parents.' },
          { text: 'Nothing at all', why: 'Then they\'ll tap again and wonder.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 3: why show the new test failing on the old code?',
        options: [
          { text: 'It looks dramatic', why: 'It proves something.' },
          { text: 'It proves the test can actually catch the bug' },
          { text: 'It\'s required', why: 'It\'s proof, not a rule.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s a mistake you\'ve made twice in life? What "test" could have caught the second one?',
  },
  deepen: {
    title: 'On your computer: guard a bug',
    summary: 'Take a bug you fixed this chapter. Add it to tests.md (recipe + expected), ask Claude Code to add an automated test for it, and, if it\'s about duplicates, a unique rule in Supabase. Commit.',
  },
  notes: 'Regression tests; Postgres UNIQUE constraints (Supabase) reject duplicate rows with an error the client can catch.',
};

export default lesson;
