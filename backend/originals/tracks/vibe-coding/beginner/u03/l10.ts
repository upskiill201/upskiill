import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10. Chapter Challenge: Ruth signs off. Build: checklist + passing tests. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: Ruth signs off',
  summary: 'Ruth won\'t put the thermometer on the projector at the spring concert until she\'s seen proof. Diff, explanation, checklist, tests that can fail. Get Ruth\'s signature.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Check an AI change end to end', 'Prove it works with tests you trust'],
  learn: [
    {
      kind: 'story',
      title: 'The band room, Thursday',
      beats: [
        { speaker: 'ruth', text: 'Spring concert, three hundred people, your thermometer on the big screen. I sign off when I see proof, not promises.' },
        { speaker: 'hazel', text: 'Diff. Explain. Checklist. Tests. And I break one on purpose.' },
        { speaker: 'ruth', text: '(almost smiling) Go on, then.' },
        { speaker: 'tey', text: 'Everything from Chapter 3. Get her that signature.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: Ruth\'s sign-off.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Hazel\'s proof routine, in order.',
        lines: [
          'Read the diff: files, lines, anything removed',
          'Ask it to explain anything surprising',
          'Run the manual checklist',
          'Open tests.html: all PASS',
          'Break the code on purpose: a test turns FAIL',
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The last change\'s diff. Which line needs a "why?"',
        lines: [
          '+ <p class="concert">Spring Concert: help us reach $18,000!</p>',
          '- const GOAL = 18000;',
          '+ const GOAL = 1800;',
        ],
        bug: 2,
        fix: 'Put the goal back to 18000.',
        explanation: 'A wrong goal makes the bar fill ten times too fast, right on the big screen.',
        language: 'javascript',
      },
      {
        kind: 'mcq',
        prompt: 'The AI says: "Updated the banner. All tests pass." What\'s Ruth\'s first question?',
        options: [
          { text: '"Did you run them, or did it?"' },
          { text: '"Is the banner gold?"', why: 'Nice, but not proof.' },
          { text: '"Can we skip the tests tonight?"', why: 'Not before 300 people.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Edge case to test, or normal case?',
        groups: ['Edge', 'Normal'],
        items: [
          { text: 'Total of exactly $18,000', group: 0 },
          { text: 'A $40 pledge', group: 1 },
          { text: 'An amount typed as "1,200" with a comma', group: 0 },
          { text: 'A $25,000 pledge', group: 0 },
          { text: 'Two $100 pledges', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ruth',
        message: 'Your test for "1,200 with a comma" fails. What will you ask it?',
        prompt: 'Hazel\'s message?',
        options: [
          { text: 'Make the tests pass.', why: 'It might change the test.' },
          { text: 'Typing "1,200" should count as $1,200. That test fails. Fix totalOf, not the tests. Keep everything else the same.' },
          { text: 'Commas are illegal now.', why: 'Parents type commas. Handle it.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Hazel\'s note for Ruth.',
        template: 'All tests [[1]] when I run them, and test 3 [[2]] when I break the code on purpose.',
        blanks: [['pass'], ['fails']],
        distractors: ['seem okay', 'passes'],
      },
      {
        kind: 'mcq',
        prompt: 'tests.html shows 8 PASS. Yesterday there were 9 tests. What now?',
        options: [
          { text: 'Sign off', why: 'A test went missing.' },
          { text: 'Ask the AI to add a new test', why: 'Find the missing one first.' },
          { text: 'Find which test went missing and why, before signing off' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Pledges: $1,200, $600, $0.50. What should the total be? (Number only.)',
        answers: ['1800.50', '1800.5', '$1,800.50', '1,800.50', '$1800.50'],
        placeholder: 'Number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the check to what it catches.',
        pairs: [
          ['Reading the diff', 'A goal changed to 1800'],
          ['Two-pledge test', 'Glued-together amounts'],
          ['Breaking the code on purpose', 'A test that can\'t fail'],
          ['Counting the tests', 'A test that was removed'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which brief line protects the tests in future?',
        options: [
          { text: 'Be careful', why: 'Careful how?' },
          { text: 'Tests are optional', why: 'The opposite of protection.' },
          { text: 'Fix the code, not the tests. Never change tests.html unless I ask.' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'It looked fine on my phone, so can we skip the checklist?',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'Looking fine is how we got $1,200,600. Checklist, then tests, then Ruth.' },
          { text: 'Sure, phones are reliable.', why: 'Looking isn\'t testing.' },
          { text: 'Only the first item.', why: 'The bug was in item 2.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 1: the AI wants to run a command Hazel doesn\'t understand. What does she do?',
        options: [
          { text: 'Approve it, she\'s in a hurry', why: 'Never approve what you don\'t understand.' },
          { text: 'Ask what it does and why, before approving' },
          { text: 'Switch to a mode with no questions', why: 'That removes the check.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What would it take for you to sign off someone else\'s work? Write your own three-line sign-off rule.',
    starters: ['1.', '2.', '3.'],
  },
  deepen: {
    title: 'Build it: proof for your tool',
    summary: 'For your Chapter 2 tool: tests.md with normal and edge cases, a tests.html the AI wrote from it, all PASS when you run it, and one test you watched FAIL when the code was broken on purpose. Add "fix the code, not the tests" to CLAUDE.md. Chapter 3 shipped.',
  },
  notes: 'Chapter 3 review. 1200 + 600 + 0.5 = 1800.5.',
};

export default lesson;
