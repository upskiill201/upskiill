import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 10. Chapter Challenge: the Friday bug. Build: one bug fixed + a test. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the Friday bug',
  summary: 'Friday, 5 p.m. The pledges page shows a total of $NaN. The big fundraiser dinner is tomorrow. No guessing, no loop: evidence, cause, one fix, a test. Get it done before dinner.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Debug a real bug from evidence to tested fix', 'Stay out of the fix loop under pressure'],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 5 p.m.',
      beats: [
        { speaker: 'narrator', text: 'The pledges page, moved into the database last week, says: Total: $NaN of $18,000.' },
        { speaker: 'benny', text: 'What\'s NaN? Is that a lot?' },
        { speaker: 'tey', text: 'NaN means "Not a Number". Somewhere, a sum hit something that isn\'t a number. Let\'s find it properly.' },
        { speaker: 'hazel', text: 'Recipe. Console. Report. Why first. One fix. Test.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: $NaN.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Hazel\'s Friday, in order.',
        lines: [
          'Find the recipe: which pledges make $NaN appear?',
          'Check the Console for red errors',
          'Report: did, expected, happened, error',
          'Ask why, and for options, before any code changes',
          'One fix, then follow the recipe again',
          'Add a test so it can\'t come back',
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The pledges from the database. Which one causes $NaN?',
        lines: ['Crescent Bakery · 200', 'Cajun Grill · 600', 'Ms Thibodeaux · (blank)', 'Marcus\'s grandma · 75'],
        bug: 2,
        fix: 'Treat a blank amount as 0 in the total, and stop blanks being saved.',
        explanation: 'Adding a blank (nothing) to numbers gives NaN. One bad row breaks the whole total.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which message does Hazel send?',
        options: [
          { text: 'Total is broken, fix it ASAP', why: 'Straight back into guessing.' },
          { text: 'Total shows $NaN. Recipe: any pledge with a blank amount. Expected: blanks ignored, total $875. Explain why, give 2 options. Don\'t change code yet.' },
          { text: 'Delete Ms Thibodeaux', why: 'Deleting data hides the bug and loses a pledge.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: '200 + 600 + 75, ignoring the blank. What should the total be? (Number only.)',
        answers: ['875', '$875'],
        placeholder: 'Number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of a real fix, or a hiding patch?',
        groups: ['Real fix', 'Hiding patch'],
        items: [
          { text: 'Count blank amounts as 0 in the total', group: 0 },
          { text: 'Show "$0" whenever the total is NaN', group: 1 },
          { text: 'Make the database refuse blank amounts', group: 0 },
          { text: 'Hide the total until Monday', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'Its first fix didn\'t work. Ask again?',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'Ask five more times.', why: 'That\'s the loop.' },
          { text: 'One failed fix: I\'ll check what it changed, then give it the new evidence. A second failure and I stop, go back and start fresh.' },
          { text: 'Give up on the total.', why: 'The dinner needs it.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The test for this bug.',
        template: 'Pledges 200, 600, blank and 75 give a total of [[1]], not [[2]].',
        blanks: [['875'], ['NaN']],
        distractors: ['0', '200600'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the tool to this bug.',
        pairs: [
          ['Recipe', 'A blank amount causes it'],
          ['Ask why', 'Blank + numbers = Not a Number'],
          ['Database rule', 'Refuse blank amounts'],
          ['Test', '200, 600, blank, 75 → 875'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'It\'s 6:30 p.m. and the session has gone in circles. Best move?',
        options: [
          { text: 'Back to the last good commit, /clear, and a short summary: error, recipe, ruled out' },
          { text: 'Keep going, it\'ll get there', why: 'Circles don\'t end by themselves.' },
          { text: 'Approve whatever it suggests next', why: 'Tired approvals caused fix 3.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Review from lesson 8: the fix is one word in one line, and Hazel can see it. What\'s fastest?',
        options: [
          { text: 'Ask the AI three more times', why: 'A tiny visible change: do it yourself.' },
          { text: 'Rebuild the page', why: 'Far too much for one word.' },
          { text: 'Commit, change it by hand, save, test' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'ruth',
        message: 'One more thing. Fix 3 from your 1 a.m. spiral. Did you ever turn those database rules back on?',
        prompt: 'Hazel\'s honest answer?',
        options: [
          { text: 'It\'s on my list. I\'ll do it first thing tomorrow.', why: 'Honest, but the next chapter shows why "tomorrow" is risky.' },
          { text: 'Git undid it.', why: 'Git can\'t undo a setting in Supabase.' },
          { text: '...No. I wrote it down and forgot. I\'m checking right now.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 4: the fix and the test pass. Last step?',
        options: [
          { text: 'Commit and push' },
          { text: 'Close the laptop', why: 'Save the fixed version first.' },
          { text: 'Ask for more features', why: 'Commit the fix first.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which debugging habit from this chapter will you use first next time: stop, the Console, the recipe, why-first, fresh session, taking over, or the test?',
  },
  deepen: {
    title: 'Build it: one bug, properly',
    summary: 'In your real app, take one bug from start to finish: recipe, Console error, three-line report, why and options first, one fix, recipe again, a test (and a database rule if it fits). Commit and push. Chapter 6 shipped.',
  },
  notes: 'Chapter 6 review. In JavaScript, adding undefined/NaN to numbers yields NaN; Number("") is 0 but null/undefined values from the database produce NaN in naive sums.',
};

export default lesson;
